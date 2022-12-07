var request = require('request');
var options = {
    'method': 'POST',
    'url': 'https://erp.5jingcai.com/signIn/signIn',
    'headers': {
        // 'User-Agent': 'Apifox/1.0.0 (https://www.apifox.cn)',
        'content-type': 'application/json'
    },
    body: JSON.stringify({
        "memberId": "595299",
        "token": "3fd3e6b27be6a679619402a83bb5c64120221116103007",
        "loginType": "wx",
        "fromType": "",
        "flag": "weixin"
    })

};
request(options, function (error, response) {
    if (error) throw new Error(error);
    console.log(response.body);
});