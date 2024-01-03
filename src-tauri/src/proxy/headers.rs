use std::{collections::HashMap, str::FromStr};

use anyhow::{anyhow, Context, Result};
use http::{HeaderMap, HeaderName, HeaderValue, Version};

use super::request::Header;

pub trait HeaderMapUtil {
    fn to_hashmap(&self) -> Result<HashMap<String, String>>;
    fn from_hashmap(map: HashMap<String, String>) -> Result<HeaderMap>;
    fn to_header_vector(&self) -> Result<Vec<Header>>;
    fn from_header_vector(headers_vec: Vec<Header>) -> Result<HeaderMap>;
}

impl HeaderMapUtil for HeaderMap {
    fn to_hashmap(&self) -> Result<HashMap<String, String>> {
        let mut headers_hashmap = HashMap::new();

        for (key, value) in self {
            let key_str = key.to_string();
            let value_str = value.to_str().unwrap().to_string();

            headers_hashmap.insert(key_str, value_str);
        }

        Ok(headers_hashmap)
    }

    fn from_hashmap(map: HashMap<String, String>) -> Result<HeaderMap> {
        let mut headers = HeaderMap::new();

        for (key, value) in map {
            let name = HeaderName::from_str(&key).unwrap();
            let value = HeaderValue::from_str(&value).unwrap();
            headers.insert(name, value);
        }
        Ok(headers)
    }

    fn to_header_vector(&self) -> Result<Vec<Header>> {
        let mut headers_vec = Vec::new();

        for (i, (key, value)) in self.iter().enumerate() {
            let value_str = String::from_utf8_lossy(value.as_bytes()).to_string();
            let header = Header::new(i, key.as_str(), &value_str, value.as_bytes());
            headers_vec.push(header);
        }

        Ok(headers_vec)
    }

    fn from_header_vector(headers_vec: Vec<Header>) -> Result<HeaderMap> {
        let mut headers = HeaderMap::new();

        for header in headers_vec {
            let name = HeaderName::from_str(&header.name())
                .context("Failed to create header name from specified string")?;
            let value = HeaderValue::from_bytes(&header.value_raw())
                .context("Failed to create header value from specified bytes")?;
            headers.insert(name, value);
        }

        Ok(headers)
    }
}

pub trait VersionUtil {
    fn to_string(&self) -> Result<String>;
    fn from_str(s: &str) -> Result<Version>;
}

impl VersionUtil for Version {
    fn to_string(&self) -> Result<String> {
        match *self {
            hyper::Version::HTTP_09 => Ok("HTTP/0.9".to_string()),
            hyper::Version::HTTP_10 => Ok("HTTP/1.0".to_string()),
            hyper::Version::HTTP_11 => Ok("HTTP/1.1".to_string()),
            hyper::Version::HTTP_2 => Ok("HTTP/2.0".to_string()),
            hyper::Version::HTTP_3 => Ok("HTTP/3.0".to_string()),
            _ => unreachable!(),
        }
    }

    fn from_str(s: &str) -> Result<Version> {
        match s {
            "HTTP/0.9" => Ok(hyper::Version::HTTP_09),
            "HTTP/1.0" => Ok(hyper::Version::HTTP_10),
            "HTTP/1.1" => Ok(hyper::Version::HTTP_11),
            "HTTP/2.0" => Ok(hyper::Version::HTTP_2),
            "HTTP/3.0" => Ok(hyper::Version::HTTP_3),
            _ => Err(anyhow!("invalid version")),
        }
    }
}
