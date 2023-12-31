use anyhow::{Context, Result};
use bytes::Bytes;
use hyper::Body;

use super::encode::Encoding;

#[inline]
pub async fn clone_body(body: Body) -> Result<(Body, Body)> {
    let body_bytes = hyper::body::to_bytes(body)
        .await
        .context("Failed to convert a body to bytes")?;
    let body1 = Body::from(body_bytes.clone());
    let body2 = Body::from(body_bytes.clone());
    Ok((body1, body2))
}

#[inline]
pub fn encode_body(body: &[u8], used_encoding: Encoding) -> Result<Body> {
    let encoded_body_raw = used_encoding
        .encode(body)
        .context("Failed to encode a data")?;
    let encoded_body = Body::from(encoded_body_raw);
    Ok(encoded_body)
}

#[inline]
pub async fn decode_body(body: Body, used_decoding: Encoding) -> Result<Vec<u8>> {
    let body_bytes = hyper::body::to_bytes(body)
        .await
        .context("Failed to convert a body to bytes")?;
    let decoded_body = used_decoding
        .decode(&body_bytes)
        .context("Failed to decode a data")?;
    Ok(decoded_body)
}
