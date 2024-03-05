use anyhow::{Context, Result};
use encoding_rs::{UTF_16LE, UTF_8};
use hyper::Body;
use serde::{Deserialize, Serialize};

use super::compression::CompressionEncoding;

#[derive(Serialize, Deserialize, Clone)]
pub struct BodyForFrontend {
    str: String,
    raw: Vec<u8>,
    charset: Charset,
}

#[derive(Serialize, Deserialize, Clone)]
pub enum Charset {
    UTF_8,
    UTF_16LE,
    UTF_16BE,
}

impl BodyForFrontend {
    #[inline]
    pub fn new(raw: Vec<u8>) -> Self {
        let (encoding_used, _) = match encoding_rs::Encoding::for_bom(&raw) {
            Some(encoding_and_size) => encoding_and_size,
            None => (UTF_8, 0),
        };

        let (cow, _, had_errors) = encoding_used.decode(&raw);

        let str = cow.to_string();

        let charset = if *encoding_used == *UTF_8 {
            Charset::UTF_8
        } else if *encoding_used == *UTF_16LE {
            Charset::UTF_16LE
        } else {
            Charset::UTF_16BE
        };

        Self { raw, str, charset }
    }

    #[inline]
    pub fn encode_body(&self, used_encoding: CompressionEncoding) -> Result<Body> {
        let encoded_body_raw = used_encoding
            .encode(&self.raw)
            .context("Failed to encode a data")?;
        let encoded_body = Body::from(encoded_body_raw);
        Ok(encoded_body)
    }
}

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
pub async fn decode_body(body: Body, used_decoding: CompressionEncoding) -> Result<Vec<u8>> {
    let body_bytes = hyper::body::to_bytes(body)
        .await
        .context("Failed to convert a body to bytes")?;
    let decoded_body = used_decoding
        .decode(&body_bytes)
        .context("Failed to decode a data")?;
    Ok(decoded_body)
}
