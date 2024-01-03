use anyhow::{Context, Result};
use http::header::CONTENT_ENCODING;
use hyper::{Body, HeaderMap, Method, Request, Uri, Version};
use serde::{Deserialize, Serialize};
use std::collections::HashMap;
use std::str::{self, FromStr};

use crate::proxy::body::clone_body;

use super::body::{decode_body, encode_body};
use super::encode::Encoding;
use super::headers::{HeaderMapUtil, VersionUtil};

#[derive(Serialize, Deserialize, Clone)]
pub struct Header {
    // id for table in frontend
    id: usize,
    name: String,
    value_raw: Vec<u8>,
    value: String,
}

impl Header {
    #[inline]
    pub fn new(id: usize, name: &str, value: &str, value_raw: &[u8]) -> Self {
        Self {
            id,
            name: name.to_string(),
            value: value.to_string(),
            value_raw: value_raw.to_vec(),
        }
    }

    #[inline]
    pub fn name(&self) -> String {
        self.name.clone()
    }

    #[inline]
    pub fn value_raw(&self) -> Vec<u8> {
        self.value_raw.clone()
    }
}

#[derive(Serialize, Deserialize, Clone)]
pub struct RequestForFrontend {
    pub id: usize,
    // pub headers: HashMap<String, String>,
    pub headers: Vec<Header>,
    pub uri: String,
    pub method: String,
    pub version: String,
    pub body: Vec<u8>,
}

impl RequestForFrontend {
    pub async fn from_hyper(request: Request<Body>, id: usize) -> Result<Self> {
        let (parts, body) = request.into_parts();

        let headers_vec = parts
            .headers
            .to_header_vector()
            .context("Failed to create a vector from the headers")?;

        let uri_string = parts.uri.to_string();
        let method_string = parts.method.to_string();
        let version_string = parts.version.to_string().unwrap();

        let encoding_header = parts.headers.get(CONTENT_ENCODING);
        let used_encoding =
            Encoding::from(encoding_header).context("Failed to determine the encoding type")?;
        let decoded_body = decode_body(body, used_encoding)
            .await
            .context("Failed to decode a body")?;

        Ok(Self {
            id,
            headers: headers_vec,
            uri: uri_string,
            method: method_string,
            version: version_string,
            body: decoded_body,
        })
    }

    pub async fn to_hyper(self) -> Result<Request<Body>> {
        let headers = HeaderMap::from_header_vector(self.headers).unwrap();
        let uri = self.uri.parse::<Uri>().unwrap();
        let method = Method::from_str(&self.method).unwrap();
        let version = Version::from_str(&self.version).unwrap();

        let encoding_header = headers.get(CONTENT_ENCODING);
        let used_encoding =
            Encoding::from(encoding_header).context("Failed to determine the encoding type")?;
        let encoded_body =
            encode_body(&self.body, used_encoding).context("Failed to encode a body")?;

        let mut request_builder = hyper::Request::builder();
        for (name, value) in headers {
            request_builder = request_builder.header(name.unwrap(), value);
        }
        let request = request_builder
            .uri(uri)
            .method(method)
            .version(version)
            .body(encoded_body)
            .unwrap();

        Ok(request)
    }
}

pub async fn clone_request(request: Request<Body>) -> Result<(Request<Body>, Request<Body>)> {
    let (parts, body) = request.into_parts();

    let headers = parts.headers;
    let uri = parts.uri;
    let method = parts.method;
    let version = parts.version;

    let (body1, body2) = clone_body(body).await.context("Failed to clone a body")?;

    let mut request_builder1 = Request::builder()
        .uri(&uri)
        .method(&method)
        .version(version.clone());
    let mut request_builder2 = Request::builder()
        .uri(&uri)
        .method(&method)
        .version(version);

    for (key, value) in &headers {
        request_builder1 = request_builder1.header(key, value);
    }

    for (key, value) in &headers {
        request_builder2 = request_builder2.header(key, value);
    }

    let request1 = request_builder1
        .body(body1)
        .context("Failed to build a request")?;
    let request2 = request_builder2
        .body(body2)
        .context("Failed to build a request")?;

    Ok((request1, request2))
}
