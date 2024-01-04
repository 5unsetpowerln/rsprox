use std::{collections::HashMap, str::FromStr};

use anyhow::{Context, Result};
use bytes::Bytes;
use http::{header::CONTENT_ENCODING, HeaderMap, Response, StatusCode, Version};
use hyper::Body;
use serde::{Deserialize, Serialize};

use crate::proxy::{
    body::clone_body,
    headers::{HeaderMapUtil, VersionUtil},
};

use super::{
    body::{decode_body, encode_body},
    encode::Encoding,
    headers::Header,
    util::bytes_to_string,
};

#[derive(Serialize, Deserialize, Clone)]
pub struct ResponseForFrontend {
    id: usize,
    // headers: HashMap<String, String>,
    headers: Vec<Header>,
    status: u16,
    version: String,
    body: String,
    body_raw: Vec<u8>,
}

impl ResponseForFrontend {
    pub async fn from_hyper(response: Response<Body>, id: usize) -> Result<Self> {
        let (parts, body) = response.into_parts();

        let headers = parts
            .headers
            .to_header_vector()
            .context("Failed to create a vector from the headers")?;
        let status_string = parts.status.as_u16();
        let version_string = parts.version.to_string().unwrap();

        let encoding_header = parts.headers.get(CONTENT_ENCODING);
        let used_encoding =
            Encoding::from(encoding_header).context("Failed to determine the encoding type")?;
        let decoded_body_raw = decode_body(body, used_encoding)
            .await
            .context("Failed to decode a body")?;
        let decoded_body = bytes_to_string(&decoded_body_raw).await;

        Ok(Self {
            id,
            headers,
            status: status_string,
            body_raw: decoded_body_raw,
            body: decoded_body,
            version: version_string,
        })
    }

    pub fn to_hyper(self) -> Result<Response<Body>> {
        let headers = HeaderMap::from_header_vector(self.headers).unwrap();
        let status = StatusCode::from_u16(self.status).unwrap();

        let encoding_header = headers.get(CONTENT_ENCODING);
        let used_encoding =
            Encoding::from(encoding_header).context("Failed to determine the encoding type")?;
        let encoded_body =
            encode_body(&self.body_raw, used_encoding).context("Failed to encode a body")?;

        let version = Version::from_str(&self.version).unwrap();

        let mut response_builder = Response::builder();

        for (name, value) in headers {
            response_builder = response_builder.header(name.unwrap(), value);
        }

        let response = response_builder
            .status(status)
            .version(version)
            .body(encoded_body)
            .unwrap();

        Ok(response)
    }
}

#[inline]
pub async fn clone_response(response: Response<Body>) -> Result<(Response<Body>, Response<Body>)> {
    let (parts, body) = response.into_parts();

    let headers = parts.headers;
    let status = parts.status;
    let version = parts.version;
    let (body1, body2) = clone_body(body).await.context("Failed to clone body")?;

    let mut response_builder1 = Response::builder().status(&status).version(version.clone());
    let mut response_builder2 = Response::builder().status(&status).version(version);

    for (key, value) in &headers {
        response_builder1 = response_builder1.header(key, value);
    }
    for (key, value) in &headers {
        response_builder2 = response_builder2.header(key, value);
    }

    let response1 = response_builder1
        .body(body1)
        .context("Failed to build a response")?;
    let response2 = response_builder2
        .body(body2)
        .context("Failed to build a response")?;

    Ok((response1, response2))
}
