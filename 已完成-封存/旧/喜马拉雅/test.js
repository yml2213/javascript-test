var request = require('request');
var options = {
    'method': 'POST',
    'url': 'http://hybrid.ximalaya.com/web-activity/signIn/v2/signIn',
    'headers': {
        'Content-Type': 'application/json',
        'Cookie': 'domain=.ximalaya.com; path=/; channel=ios-b1; 1&_device=iPhone&32866292-70F5-45A8-9F03-33A3DDEA3A94&9.0.22; impl=com.gemd.iting; XUM=32866292-70F5-45A8-9F03-33A3DDEA3A94; c-oper=%E8%81%94%E9%80%9A; net-mode=WIFI; res=1170%2C2532; 1&_token=230652218&497C23E0340C08D51383BE1B784794F0BC6D50F82B09F52FEA8D4A73F13AD896AA97DB615728147M825F3393CED220B_; idfa=32866292-70F5-45A8-9F03-33A3DDEA3A94; device_model=iPhone%2013%20Pro; XD=wrbjHmU5xnR+9Nz5Tx/zPg2yNxJSLDRQKe9VGyFxirbG6aQ5HmxbVGs0Mg17Xff92KG0ARPtymt8WsOejmP5VQ==; fp=009317647e2322q22164v05b2500000020211100200000001200001000; freeFlowType=0; minorProtectionStatus=0'
    },
    body: JSON.stringify({
        "aid": 87
    })

};
request(options, function (error, response) {
    if (error) throw new Error(error);
    console.log(response.body);
});
