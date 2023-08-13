var request = require('request')
var options = {
    'method': 'POST',
    'url': 'https://activity.sznews.com/money/luoohupoints/index.php?s=/index/search/getUserinfo',
    'headers': {
        'Host': 'activity.sznews.com',
        'Accept': 'application/json, text/plain, */*',
        'User-Agent': 'Mozilla/5.0 (Linux; Android 12; M2102J2SC Build/SKQ1.211006.001; wv) AppleWebKit/537.36 (KHTML, like Gecko) Version/4.0 Chrome/96.0.4664.104 Mobile Safari/537.36lhapp/hdpage',
        'Origin': 'https://appatt.sznews.com',
        'X-Requested-With': 'com.luohunews',
        'Sec-Fetch-Site': 'same-site',
        'Sec-Fetch-Mode': 'cors',
        'Sec-Fetch-Dest': 'empty',
        'Referer': 'https://appatt.sznews.com/',
        'Accept-Language': 'zh-CN,zh;q=0.9,en-US;q=0.8,en;q=0.7'
    },
    formData: {
        'data': '{"data":"gln8ZNrqcCRwqCby-1pNZwj2oR1qq6XgbMk5ykMIsk1F7yPBn-Q-ILI5776_Jc_Sc8p1BdojzFeLCUD_6g9samvI_zn5-D6J8xjxGtYYTlVTCYdVpN3nglqS8FIAA4ZH1i7tyKOhjT-nR-JCGvyaow==","sign":"1ac3a2716f09e1d558cec08d195dbc88","nonceStr":"560d5aab40bf87bf62c003ccac6d2861","appid":"0af2398bebd1c86cfb868f50e0d06f73","timestamp":"20230316_102841","avatar":"https://luohuapp.sznews.com/jhxtapi/Public/avatar/app_logon.png"}'
    }
}
request(options, function (error, response) {
    if (error) throw new Error(error)
    console.log(response.body)
})



formData: {
    'data': `{"data":"${datasign}","sign":"${sign}","nonceStr":"${SJS}","appid":"0af2398bebd1c86cfb868f50e0d06f73","timestamp":"${ts_}","avatar":"https://luohuapp.sznews.com/jhxtapi/Public/avatar/app_logon.png"}`
}