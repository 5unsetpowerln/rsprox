use async_trait::async_trait;
use bytes::Bytes;

pub async fn copy_body(body: hyper::Body) -> (hyper::Body, hyper::Body) {
    let ob = hyper::body::to_bytes(body).await.unwrap().clone();
    let cb1 = ob.clone();
    let cb2 = ob.clone();
    (hyper::Body::from(cb1), hyper::Body::from(cb2))
}