// network.rs

use reqwest::header::HeaderMap;
use reqwest::Client;
use serde_json::Value;
use std::collections::HashMap;
use std::future::Future;

// Request options
pub struct RequestOptions {
    pub method: &'static str,
    pub url: &'static str,
    pub headers: HeaderMap,
    pub body: Option<String>,
}

// GET 请求
async fn get(options: RequestOptions) -> Result<HashMap<String, String>, reqwest::Error> {
    let client = Client::new();

    let resp = client
        .get(options.url)
        .headers(options.headers.clone())
        .send()
        .await?
        .json::<HashMap<String, String>>()
        .await?;

    Ok(resp)
}

// POST 请求
pub async fn post(options: RequestOptions) -> Result<HashMap<String, Value>, reqwest::Error> {
    let client = Client::new();

    let headers = options.headers.clone();

    let data = options.body.clone();

    let resp = client
        .post(options.url)
        .headers(headers)
        .json(&data)
        .send()
        .await?
        .json::<HashMap<String, Value>>()
        .await?;

    Ok(resp)
}

// 导出请求函数
pub fn request(
    options: RequestOptions,
) -> impl Future<Output = Result<HashMap<String, String>, reqwest::Error>> {
    get(options)
}
