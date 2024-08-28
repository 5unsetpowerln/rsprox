use serde::{Deserialize, Serialize};

#[derive(Serialize, Deserialize, Clone)]
pub enum Method {
    GET,
    HEAD,
    POST,
    PUT,
    DELETE,
    CONNECT,
    OPTIONS,
    TRACE,
    PATCH,
}

impl Method {
    pub fn from_hyper(method: hyper::Method) -> Self {
        match method {
            hyper::Method::GET => return Method::GET,
            hyper::Method::POST => return Method::POST,
            hyper::Method::PUT => return Method::PUT,
            hyper::Method::DELETE => return Method::DELETE,
            hyper::Method::OPTIONS => return Method::OPTIONS,
            hyper::Method::PATCH => return Method::PATCH,
            hyper::Method::TRACE => return Method::TRACE,
            hyper::Method::CONNECT => return Method::CONNECT,
            hyper::Method::HEAD => return Method::HEAD,
            _ => unreachable!(),
        }
    }

    pub fn to_hyper(&self) -> hyper::Method {
        match self {
            Self::GET => return hyper::Method::GET,
            Self::POST => return hyper::Method::POST,
            Self::PUT => return hyper::Method::PUT,
            Self::DELETE => return hyper::Method::DELETE,
            Self::OPTIONS => return hyper::Method::OPTIONS,
            Self::PATCH => return hyper::Method::PATCH,
            Self::TRACE => return hyper::Method::TRACE,
            Self::CONNECT => return hyper::Method::CONNECT,
            Self::HEAD => return hyper::Method::HEAD,
        }
    }
}
