use anyhow::Context;
use anyhow::{anyhow, Result};
use bytes::Bytes;
use flate2::read::DeflateDecoder;
use flate2::read::DeflateEncoder;
use flate2::read::GzDecoder;
use flate2::read::GzEncoder;
use flate2::Compression;
use http::HeaderValue;
use std::io::prelude::*;

pub enum Encoding {
    Gzip,
    Deflate,
    Identity,
}

impl Encoding {
    pub fn from(encoding_header: Option<&HeaderValue>) -> Result<Self> {
        if encoding_header.is_none() {
            return Ok(Encoding::Identity);
        }
        match encoding_header.unwrap().to_str().unwrap() {
            "gzip" => Ok(Encoding::Gzip),
            "deflate" => Ok(Encoding::Deflate),
            "identity" => Ok(Encoding::Identity),
            "" => Ok(Encoding::Identity),
            _ => {
                panic!("unsupported encoding");
            }
        }
    }

    pub fn decode(&self, original_data: &[u8]) -> Result<Vec<u8>> {
        match self {
            Self::Gzip => {
                let mut gzip_decoder = GzDecoder::new(original_data);
                let mut buffer = Vec::<u8>::new();
                gzip_decoder
                    .read_to_end(&mut buffer)
                    .context("Failed to decode a data")?;
                Ok(buffer)
            }
            Self::Deflate => {
                let mut deflate_decoder = DeflateDecoder::new(original_data);
                let mut buffer = Vec::<u8>::new();
                deflate_decoder
                    .read_to_end(&mut buffer)
                    .context("Failed to decode a data")?;
                Ok(buffer)
            }
            Self::Identity => Ok(original_data.to_vec()),
        }
    }

    pub fn encode(&self, encoded_data: &[u8]) -> Result<Vec<u8>> {
        match self {
            Self::Gzip => {
                let mut gzip_encoder = GzEncoder::new(encoded_data, Compression::best());
                let mut buffer = Vec::new();
                gzip_encoder
                    .read_to_end(&mut buffer)
                    .context("Failed to encode a data")?;
                Ok(buffer)
            }
            Self::Deflate => {
                let mut deflate_encoder = DeflateEncoder::new(encoded_data, Compression::best());
                let mut buffer = Vec::new();
                deflate_encoder
                    .read_to_end(&mut buffer)
                    .context("Failed to encode a data");
                Ok(buffer)
            }
            Self::Identity => Ok(encoded_data.to_vec()),
        }
    }
}
