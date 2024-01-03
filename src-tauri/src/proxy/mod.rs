use anyhow::Result;
use http::{Request, Response};
use hyper::{Body, Server};
use hyper_tls::HttpsConnector;
use request::{clone_request, RequestForFrontend};
use response::{clone_response, ResponseForFrontend};
use std::sync::{Arc, Mutex};
use std::{convert::Infallible, io::Read, net::SocketAddr};
use tauri::{AppHandle, Manager};

pub async fn run_proxy_server(is_intercepted: Arc<Mutex<bool>>, app_handle: AppHandle) {
    let request_response_pair_id = Arc::new(Mutex::new(1 as usize));
    let addr = SocketAddr::from(([127, 0, 0, 1], 8080));
    let make_service = hyper::service::make_service_fn(move |_conn| {
        let app_handle_ = app_handle.clone();
        let is_intercepted_ = is_intercepted.clone();
        let request_response_pair_id_ = request_response_pair_id.clone();
        async move {
            Ok::<_, Infallible>(hyper::service::service_fn(
                move |request: hyper::Request<hyper::Body>| {
                    let app_handle__ = app_handle_.clone();
                    let is_intercepted__ = is_intercepted_.clone();
                    let request_response_pair_id__ = request_response_pair_id_.clone();
                    async move {
                        Ok::<_, Infallible>(
                            handle(
                                request,
                                is_intercepted__,
                                &app_handle__,
                                request_response_pair_id__,
                            )
                            .await,
                        )
                    }
                },
            ))
        }
    });
    let server = Server::bind(&addr).serve(make_service).await;

    if let Err(e) = server {
        println!("error: {}", e);
    }
}

async fn send_request_to_frontend(
    request: &RequestForFrontend,
    app_handle: &AppHandle,
) -> Result<()> {
    let request_json = serde_json::to_string(request).unwrap();
    app_handle
        .emit_all("proxy_send_request_to_frontend", request_json)
        .unwrap();
    Ok(())
}

async fn send_response_to_frontend(
    response: &ResponseForFrontend,
    app_handle: &AppHandle,
) -> Result<()> {
    let response_json = serde_json::to_string(response).unwrap();
    app_handle
        .emit_all("proxy_send_response_to_frontend", response_json)
        .unwrap();
    Ok(())
}

async fn handle(
    request: Request<Body>,
    is_intercepted: Arc<Mutex<bool>>,
    app_handle: &AppHandle,
    request_response_pair_id: Arc<Mutex<usize>>,
) -> Response<Body> {
    let is_intercepted_ = *is_intercepted.lock().unwrap();
    let request_response_pair_id_ = {
        let mut request_response_pair_id_locked = request_response_pair_id.lock().unwrap();
        *request_response_pair_id_locked += 1;
        *request_response_pair_id_locked - 1
    };

    let (request, cloned_request) = clone_request(request)
        .await
        .expect("Failed to clone request");
    let request_for_frontend =
        RequestForFrontend::from_hyper(cloned_request, request_response_pair_id_)
            .await
            .unwrap();
    send_request_to_frontend(&request_for_frontend, app_handle)
        .await
        .unwrap();

    if is_intercepted_ {
        // wait for modification
        todo!()
    }

    let response = {
        let https = HttpsConnector::new();
        let client = hyper::Client::builder().build::<_, hyper::Body>(https);
        let resp = client.request(request).await;
        if resp.is_err() {
            panic!("proxy error >>> {}", resp.unwrap_err());
        }
        resp.unwrap()
    };

    let (response, cloned_response) = clone_response(response)
        .await
        .expect("Failed to clone response");

    let response_for_frontend =
        ResponseForFrontend::from_hyper(cloned_response, request_response_pair_id_)
            .await
            .unwrap();

    send_response_to_frontend(&response_for_frontend, app_handle)
        .await
        .unwrap();

    if is_intercepted_ {
        todo!()
    }

    response
}

mod body;
mod encode;
mod headers;
mod request;
mod response;
