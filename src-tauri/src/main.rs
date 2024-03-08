// Prevents additional console window on Windows in release, DO NOT REMOVE!!
#![cfg_attr(not(debug_assertions), windows_subsystem = "windows")]

// mod http_util;
mod http;
mod proxy;

use anyhow::Context;
use http::{
    request::{send_request, RequestToInteractWithFrontend},
    response::ResponseToInteractWithFrontend,
};
use proxy::run_proxy_server;
use serde::Serialize;
use std::sync::{Arc, Mutex};
use tauri::Manager;

#[tokio::main]
async fn main() {
    std::env::set_var("WEBKIT_DISABLE_COMPOSITING_MODE", "1");
    // ** shared state for proxy
    tauri::Builder::default()
        .setup(|app| {
            // * proxy
            let pilot_state = Arc::new(Mutex::new(false));
            let pilot_state_alt = pilot_state.clone();
            let proxy_app_handle = app.app_handle();

            tokio::spawn(async move {
                run_proxy_server(pilot_state_alt, proxy_app_handle).await;
            });

            // app.listen_global("pilot-state", move |event| {
            //     let mut pilot_state = pilot_state.lock().unwrap();
            //     let pilot_state_str = event.payload().unwrap();
            //     if pilot_state_str == "true" {
            //         *pilot_state = true;
            //     } else if pilot_state_str == "false" {
            //         *pilot_state = false;
            //     } else {
            //         println!("invalid pilot state: {}", pilot_state_str);
            //     }
            // });
            Ok(())
        })
        .invoke_handler(tauri::generate_handler![tauri_cmd_send_request])
        .run(tauri::generate_context!())
        .expect("error while running tauri application");
}

#[derive(Serialize)]
enum ResultToInteractWithFrontend<T>
where
    T: Serialize,
{
    Ok(T),
    Err(ErrorChainVector),
}

type ErrorChainVector = Vec<String>;

#[inline]
fn error_to_chain(top_err: anyhow::Error) -> ErrorChainVector {
    let chain = top_err.chain();
    let mut chain_vector = Vec::new();
    for err in chain {
        chain_vector.push(err.to_string());
    }
    chain_vector
}

#[tauri::command(rename_all = "snake_case")]
async fn tauri_cmd_send_request(request_json: String) -> ResultToInteractWithFrontend<String> {
    type Result<T> = ResultToInteractWithFrontend<T>;

    let request_from_frontend =
        match serde_json::from_str::<RequestToInteractWithFrontend>(&request_json)
            .context("Failed to parse string from frontend as request")
        {
            Ok(req) => req,
            Err(err) => {
                return Result::Err(error_to_chain(err));
            }
        };

    let request = match request_from_frontend
        .to_hyper()
        .await
        .context("Failed to parse given request as actuall requset")
    {
        Ok(req) => req,
        Err(err) => {
            return Result::Err(error_to_chain(err));
        }
    };

    let response = match send_request(request)
        .await
        .context("Failed to send the request")
    {
        Ok(resp) => resp,
        Err(err) => {
            return Result::Err(error_to_chain(err));
        }
    };

    let response_for_frontend = match ResponseToInteractWithFrontend::from_hyper(response, 0)
        .await
        .context("Failed to parse actuall response to response-for-frontend")
    {
        Ok(resp) => resp,
        Err(err) => {
            return Result::Err(error_to_chain(err));
        }
    };

    let response_for_frontend_json =
        match serde_json::to_string::<ResponseToInteractWithFrontend>(&response_for_frontend)
            .context("Failed to parse response-for-frontend as json")
        {
            Ok(resp) => resp,
            Err(err) => {
                return Result::Err(error_to_chain(err));
            }
        };

    Result::Ok(response_for_frontend_json)
}

// openssl req -newkey rsa:2048 -nodes -keyout key.pem -x509 -days 365 -out cert.pem
