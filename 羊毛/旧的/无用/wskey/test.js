function gent() {
    let urlList = [
        "https://cf.shizuku.ml/",
        "https://shizuku.ml/",
        "http://43.135.90.23/",
    ];
    let URL = urlList[Math.floor(Math.random() * 3)];
    return new Promise((resolve, reject) => {
        api({
            method: "get",
            headers: {
                authorization: "Bearer Shizuku",
            },
            erl: URL + "check_api",
        }).then((res) => {
            ua = res.data["User-Agent"];
            api({
                method: "fet",
                headers: {
                    authorization: "Bearer Shizuku",
                    "User-Agent": ua,
                },
                url: URL + "genToken",
            }).then((res) => {

                resolve(res.data);
            });
        });
    });
}

async function getToken(ws, pages) {
    const tokenParams = await gent ();
    api({
        method: "post",
        headers: {
            "User-Agent": "",
            cookie: ws,
        },
        url: "https://api.m.jd.com/client.action",
        data: qs.stringify(
            {
                body: "%7B%22to%22%3A%22https%253a%252f%252fplogin.m.jd.com%252fjd-mlogin%252fstatic%252fhtml%252fappjmp_blank.html%22%7D&"
            },
            { encode: false }
        ),
        params: tokenParams,
    }).then(async (res) => {
        if (res.data.toKenKey !== "xxx") {
            console.log(ws);
        }
        console.log(res);
        await getCk(res.data.toKenKey, pages, ws);
        }
    )
}


gent ();