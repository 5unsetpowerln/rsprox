#[inline]
pub async fn bytes_to_string(bytes: &[u8]) -> String {
    let string = String::from_utf8_lossy(bytes).to_string();
    string
}
