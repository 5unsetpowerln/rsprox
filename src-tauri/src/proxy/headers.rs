use std::{collections::HashMap, str::FromStr};

use anyhow::{anyhow, Result};
use http::{HeaderMap, HeaderName, HeaderValue, Version};

pub trait HeaderMapUtil {
    fn to_hashmap(&self) -> Result<HashMap<String, String>>;
    fn from_hashmap(map: HashMap<String, String>) -> Result<HeaderMap> {
        let mut headers = HeaderMap::new();

        for (key, value) in map {
            let name = HeaderName::from_str(&key).unwrap();
            let value = HeaderValue::from_str(&value).unwrap();
            headers.insert(name, value);
        }
        Ok(headers)
    }
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
