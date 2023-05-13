const crypto = require("crypto-js");
// let api = '/api/msgvue/msglist'
// console.log(Y(api))
let salt = '9df3b01c1ed3a485'
let token = '764ec8d568c8d112a95adcdd0d42c11e4e251ce4'

// console.log(get_auth_key(api))


function access_auth(n) {
    let d = salt
    z = function () {
        var n = Math.floor(Date.now() / 1e3);
        return Number(n + Number('2')).toString()
    }

    function C() {
        for (var n = [], e = "0123456789abcdef", i = 0; i < 36; i++)
            n[i] = e.substr(Math.floor(16 * Math.random()), 1);
        return n[14] = "4",
            n[19] = e.substr(3 & n[19] | 8, 1),
            n.join("")
    }

    function md5(a) {
        return crypto.MD5(a).toString()
    }

    var e = z()
        , i = C()
        , a = "0"
        , o = md5(n + "-" + e + "-" + i + "-" + a + "-" + d);
    return "".concat(e, "-").concat(i, "-").concat(a, "-").concat(o)
}

function get_server_sign(api) {
    z = function () {
        var n = Math.floor(Date.now() / 1e3);
        return Number(n + Number('2')).toString()
    }
    let ts = z()

    function md5(a) {
        return crypto.MD5(a).toString()
    }

    let a = `${api}${ts}${token}${salt}`
    let sign = `${ts}-${md5(a)}`
    return sign


}

function get_auth_key(api) {
    z = function () {
        var n = Math.floor(Date.now() / 1e3);
        return Number(n + Number('2')).toString()
    }
    let ts = z()
    let b = `${api}?access_auth=${access_auth()}&server_sign=${get_server_sign()}${ts}`
    let c = salt
    let a = crypto.HmacSHA256(b, c)
    let d = crypto.enc.Base64.stringify(a)
    let e = encodeURI(`${ts}-${d}`)
    return e


}


var request = require('request');
let api = '/api/playervue/login'
var options = {
    'method': 'POST',
    'url': `https://jins-api.jsfps.com/api/playervue/login?access_auth=${access_auth(api)}&server_sign=${get_server_sign(api)}&auth_key=${get_auth_key(api)}`,
    'headers': {
        'authority': 'jins-api.jsfps.com',
        'pragma': 'no-cache',
        'token': '',
        'x-forwarded-for': '112.224.162.167',
        'x-requested-with': 'XMLHttpRequest',
        'User-Agent': 'Apifox/1.0.0 (https://www.apifox.cn)',
        'content-type': 'application/json'
    },
    body: JSON.stringify({
        "password": "a18831916968",
        "username": "18831916968",
        "checked": true,
        "show": false,
        "IsKeepPWD": false
    })

};
request(options, function (error, response) {
    if (error) throw new Error(error);
    console.log(response.body);
});


