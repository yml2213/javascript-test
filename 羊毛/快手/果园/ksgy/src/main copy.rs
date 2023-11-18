use reqwest::header::HeaderMap;
use reqwest::Client;
use serde_json::value::Value;
use std::collections::HashMap;

async fn get() -> Result<HashMap<String, String>, reqwest::Error> {
    let resp = Client::new()
        .get("https://httpbin.org/ip")
        .send()
        .await?
        .json::<HashMap<String, String>>()
        .await?;

    Ok(resp)
}

async fn post() -> Result<HashMap<String, Value>, reqwest::Error> {
    let mut headers = HeaderMap::new();
    headers.insert("Content-Type", "application/json".parse().unwrap());

    let mut data = HashMap::new();
    data.insert("user", "zhangsan");
    data.insert("password", "https://docs.rs/serde_json/1.0.59/serde_json/");

    let resp = Client::new()
        .post("https://httpbin.org/post")
        .headers(headers)
        .json(&data)
        .send()
        .await?
        .json::<HashMap<String, Value>>()
        .await?;

    Ok(resp)
}

#[tokio::main]
async fn main() {
    // calls to get and post
    if let Ok(resp) = get().await {
        println!("{:#?}", resp);
    }

    if let Ok(res) = post().await {
        println!("{:#?}", res);
    }
}
