function gent () {
    let urlList = [
        "https：//cf.shizuku.ml/",
        "https://shizuku.ml/",
        "http://43.135.90.23/",

    ];

    let URL = urlList[Math.floor(Math.random() * 3)];
    return new Promise((resolve, reject) =>{
        api ({
            method: "get",
            headers: {
                authorization: "Bearer Shizuku",
            },
            erl: URL + "check_api",
        },





        )



    }

        api([

            method: "get", headers: [

        authorization: "Bearer Shizuku",

        url: URL + "check_api", )). then((res) => [

        ua = res.data["User-Agent"]; api(f

    method: "get", headers: [

        authorization: "Bearer Shizuku", "User-Agent": ua,

        url: URL + "genToken", )). then((res) =>[ resolve(res.data); A);

    J);







}

