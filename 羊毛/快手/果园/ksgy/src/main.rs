mod network;
use crate::network::RequestOptions;
use reqwest::header::HeaderMap;
use reqwest::header::HeaderValue;

#[tokio::main]
async fn main() {
    // let options = RequestOptions {
    //     method: "GET",
    //     url: "https://httpbin.org/ip",
    //     headers: Default::default(),
    //     body: Some("".to_string()),
    // };
    // if let Ok(resp) = network::get_request(options).await {
    //     println!("{:#?}", resp);
    // }

    // https://ug-fission.kuaishou.com/rest/n/darwin/orchard/water/watering?__NS_sig3=37276050b2a721010d6a6968c1b2217faab33515767674747b7a7963

    // let post_data = r#"{"user":"zhangsan"}"#;
    // let options = RequestOptions {
    //     method: "POST",
    //     url: "https://httpbin.org/post",
    //     headers: Default::default(),
    //     body: Some(post_data.to_string()),
    // };

    // if let Ok(resp) = network::post(options).await {
    //     // println!("Post request result: {:?}", resp);
    //     println!("{:#?}", resp)

    // }

    let post_data = r#"{"version":"2.0.2"}"#;
    let mut headers = HeaderMap::new();
    let value = HeaderValue::from_str("kpn=NEBULA; kpf=ANDROID_PHONE; userId=55077737; did=ANDROID_895dc8228456d484; c=XIAOMI; ver=11.4; appver=11.4.40.5686; language=zh-cn; countryCode=CN; sys=ANDROID_12; mod=Xiaomi%28M2102J2SC%29; deviceName=Xiaomi%28M2102J2SC%29; ud=55077737; did_tag=0; thermal=10000; kcv=1507; app=0; bottom_navigation=true; oDid=ANDROID_8845bd91dbb06981; android_os=0; boardPlatform=kona; newOc=XIAOMI; androidApiLevel=31; slh=0; country_code=cn; nbh=44; hotfix_ver=; did_gt=1689077658660; cdid_tag=5; max_memory=256; oc=XIAOMI; sh=2340; deviceBit=0; browseType=3; ddpi=440; socName=Qualcomm+Snapdragon+8250; sw=1080; ftt=; apptype=22; abi=arm64; cl=0; userRecoBit=0; device_abi=arm64; totalMemory=11598; grant_browse_type=AUTHORIZED; iuid=; rdid=ANDROID_429e96b22fcf2bf5; sbh=90; darkMode=false; __NSWJ=; client_key=2ac2a76d; earphoneMode=1; keyconfig_state=2; isp=CUCC; didv=1690782458000; net=WIFI; is_background=0; kuaishou.api_st=Cg9rdWFpc2hvdS5hcGkuc3QSoAGMPIXiOII7sTWXcBUQh6eDhS4LtXGXTihzSjspwxJaJ7go8m1RJzplspOrpfqLzky_VimITENxSCWgm_mgY_zmW1nwiXsTa_bqqfv4NaYWVSv74aGY0pp8a8Jg_eYI_q_ftB54tt4Oxr-agKxNqZ3q_jZL3ZCIHTCgu6WdmEjS1p1Pz8L7hHLXAXgpTgqK3Mi7G1QzJAbqxoTTOZv4KLAyGhJrNN-fL8lNH4AKLNFPdkh-L7kiIDmEUadwQ82aXL755oaWZtETppaZW0zz1_0rbfYgPp0rKAUwAQ; token=Cg9rdWFpc2hvdS5hcGkuc3QSoAGMPIXiOII7sTWXcBUQh6eDhS4LtXGXTihzSjspwxJaJ7go8m1RJzplspOrpfqLzky_VimITENxSCWgm_mgY_zmW1nwiXsTa_bqqfv4NaYWVSv74aGY0pp8a8Jg_eYI_q_ftB54tt4Oxr-agKxNqZ3q_jZL3ZCIHTCgu6WdmEjS1p1Pz8L7hHLXAXgpTgqK3Mi7G1QzJAbqxoTTOZv4KLAyGhJrNN-fL8lNH4AKLNFPdkh-L7kiIDmEUadwQ82aXL755oaWZtETppaZW0zz1_0rbfYgPp0rKAUwAQ; kuaishou.h5_st=Cg5rdWFpc2hvdS5oNS5zdBKgAUPLS9fHfH0UAJaRreAwAglKf-I34jfM_m0MG2bhxMwmzvIKvJxhs5sRu7Z9sn5-886M7-e65e3p0ZqVu35vWRXNZNmbAAgDDWBnwUGH0j86w56Pvw_LtuNrcVZs9ELoUK6-W6z5iXrh2tgHZexJ7_s-yJZp2HsuZScJrQBAMYCe25pwJwDh2PLGt3hFEKiTMWOWjEAPTro6Z-ISoOGGK-oaEooufAso8xyVGEw6W0zR158ubiIgy13TNyU_0q6MrSVJOjLCBBY70LoTuZ_CDtuKdsiVq8koBTAB; egid=DFP1854265734D1A6E3374617CC770A24970AFCB758ADC707BAEC68C6116A0D6; sid=c8a87d59-4a61-4674-88ff-8b229c3c36b9; cold_launch_time_ms=1699004866742").unwrap();
    headers.insert("Cookie", value);
    let options = RequestOptions {
        method: "POST",
        url: "https://ug-fission.kuaishou.com/rest/n/darwin/orchard/water/watering?__NS_sig3=37276050b2a721010d6a6968c1b2217faab33515767674747b7a7963",
        headers:headers,
        body: Some(post_data.to_string()),
    };

    if let Ok(resp) = network::post(options).await {
        // println!("Post request result: {:?}", resp);
        println!("{:#?}", resp);
        println!("{:#?}", resp.get("result"));
        println!("{:#?}", resp.get("data"));
    }
}
