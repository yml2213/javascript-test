/*
资金盘!!!!  
咨环掌讯
注册地址 : qaz18.zihuanzhangxun68.cn
11.	16
------------------------  青龙--配置文件-贴心复制区域  ---------------------- 

export zhzzck=" 手机号&密码"


*/

const utils = require("yml2213-utils");
//const fs = require('fs')
const $ = new Env("咨环掌讯");
const ckName = "zhzxck";
//-------------------- 一般不动变量区域 -------------------------------------
const notify = $.isNode() ? require("./sendNotify") : "";
const Notify = 1; //0为关闭通知,1为打开通知,默认为1
let envSplitor = ["@", "\n"];
let ck = msg = "";
// let httpRequest
let userCookie = process.env[ckName];
let userList = [];
let userIdx = 0;
let userCount = 0;
let ck_status = 1;
//---------------------- 自定义变量区域 -----------------------------------

//let readPath = './sfz.txt'
//let sfzarr = fs.readFileSync(readPath,"utf8")


//---------------------------------------------------------------------------------------------------------
//---------------------------------------------------------------------------------------------------------

async function start() {

    if (userList.length > 0) {
        console.log("\n------- 登录 -------\n");
        taskall = [];
        for (let user of userList) {
            taskall.push(user.login("登录"));
        }
        await Promise.all(taskall);

        console.log("\n------- 余额查询 -------\n");
        taskall = [];
        for (let user of userList) {
            taskall.push(user.jfcx("余额查询"));
        }
        await Promise.all(taskall);
    }
}

class UserInfo {
    constructor(str) {
        this.nickname = ++userIdx;
        this.valid = false;
        ck = str.split("&");
        this.user = ck[0];
        this.mima = ck[1];
        this.PHPSESSID = MD5_Encrypt(`${ck[0]}`).slice(0, 26);
        //this.sfz=randomArr(sfzarr)
        this.ckValid = true;
    }


    // 登录
    async login(name) {
        let options = {
            method: "post",
            url: `https://qaz18.zihuanzhangxun68.cn/Login/index`,
            headers: {
                "Host": "qaz18.zihuanzhangxun68.cn",
                "content-length": "41",
                "accept": "application/json, text/javascript, */*; q\u003d0.01",
                "origin": "https://qaz18.zihuanzhangxun68.cn",
                "x-requested-with": "XMLHttpRequest",
                "sec-fetch-dest": "empty",
                "Content-Type": "application/x-www-form-urlencoded; charset\u003dUTF-8",
                "sec-fetch-site": "same-origin",
                "sec-fetch-mode": "cors",
                "referer": "https://qaz18.zihuanzhangxun68.cn/mobile/login.html",
                "accept-encoding": "gzip, deflate",
                "cookie": `PHPSESSID=${this.PHPSESSID}`
            },
            body: `account=${this.user}&password=${this.mima}`,
        };
        //	console.log(options);
        let result = await httpRequest(name, options);
        //	console.log(result);
        await this.sign("签到");
        if (result.code == 0) {
        } else {

        }
    }


    // 签到
    async sign(name) {
        let options = {
            method: "post",
            url: `https://qaz18.zihuanzhangxun68.cn/handle/daka`,
            headers: {
                "Host": "qaz18.zihuanzhangxun68.cn",
                "content-length": "7",
                "accept": "application/json, text/javascript, */*; q\u003d0.01",
                "origin": "https://qaz18.zihuanzhangxun68.cn",
                "x-requested-with": "XMLHttpRequest",
                "sec-fetch-dest": "empty",
                "content-type": "application/x-www-form-urlencoded; charset\u003dUTF-8",
                "sec-fetch-site": "same-origin",
                "sec-fetch-mode": "cors",
                "referer": "https://qaz18.zihuanzhangxun68.cn/mobile/index",
                "accept-encoding": "gzip, deflate",
                "accept-language": "zh-CN,zh;q\u003d0.9,en-US;q\u003d0.8,en;q\u003d0.7",
                "cookie": `PHPSESSID=${this.PHPSESSID}`
            },
            body: `phone=1`
        };
        let result = await httpRequest(name, options);

        //	 console.log(result);
        if (result.code == '000') {
            DoubleLog(`${name}: 账号 ${this.user}  ${result.msg}`);
        } else if (result.code == '002') {
            DoubleLog(`${name}: 账号 ${this.user}  ${result.msg}`);
        }
    }



    // 积分查询
    async jfcx(name) {
        let options = {
            method: "get",
            url: `https://qaz18.zihuanzhangxun68.cn/user/person`,
            headers: {
                "Host": "qaz18.zihuanzhangxun68.cn",
                "upgrade-insecure-requests": "1",
                "user-agent": "Mozilla/5.0 (Linux; Android 9; Mi Note 3 Build/PKQ1.181007.001; wv) AppleWebKit/537.36 (KHTML, like Gecko) Version/4.0 Chrome/80.0.3987.99 Mobile Safari/537.36  XiaoMi/MiuiBrowser/10.8.1 LT-APP/44/105/YM-RT/",
                "sec-fetch-dest": "document",
                "accept": "text/html,application/xhtml+xml,application/xml;q\u003d0.9,image/webp,image/apng,*/*;q\u003d0.8,application/signed-exchange;v\u003db3;q\u003d0.9",
                "x-requested-with": "cn.zihuanzhangxun68.qaz18",
                "sec-fetch-site": "same-origin",
                "sec-fetch-mode": "navigate",
                "sec-fetch-user": "?1",
                "referer": "https://qaz18.zihuanzhangxun68.cn/mobile/index.html",
                "accept-encoding": "gzip, deflate",
                "accept-language": "zh-CN,zh;q\u003d0.9,en-US;q\u003d0.8,en;q\u003d0.7",
                "cookie": `PHPSESSID=${this.PHPSESSID}`
            }

        };
        let result = await httpRequest(name, options);

        // console.log(result);

    }
}
function randomArr(arr) {
    return arr[parseInt(Math.random() * arr.length, 10)];
}

// #region ********************************************************  固定代码  ********************************************************

!(async () => {
    if (!(await checkEnv())) return;
    if (userList.length > 0) {
        await start();
    }
    await SendMsg(msg);
})()
    .catch((e) => console.log(e))
    .finally(() => $.done());

///////////////////////////////////////////////////////////////////

async function checkEnv() {
    if (userCookie) {
        let e = envSplitor[0];
        for (let o of envSplitor)
            if (userCookie.indexOf(o) > -1) {
                e = o;
                break;
            }
        for (let n of userCookie.split(e)) n && userList.push(new UserInfo(n));
        // console.log(n);
        userCount = userList.length;
        // console.log(userList);
    } else {
        console.log("未找到CK");
        return;
    }
    return console.log(`共找到${userCount}个账号`), !0;
}

// =========================================== 不懂不要动 =========================================================
function MD5_Encrypt(a) {
    function b(a, b) {
        return a << b | a >>> 32 - b;
    }

    function c(a, b) {
        var c, d, e, f, g;
        return e = 2147483648 & a,
            f = 2147483648 & b,
            c = 1073741824 & a,
            d = 1073741824 & b,
            g = (1073741823 & a) + (1073741823 & b),
            c & d ? 2147483648 ^ g ^ e ^ f : c | d ? 1073741824 & g ? 3221225472 ^ g ^ e ^ f : 1073741824 ^ g ^ e ^ f :
                g ^ e ^ f;
    }

    function d(a, b, c) {
        return a & b | ~a & c;
    }

    function e(a, b, c) {
        return a & c | b & ~c;
    }

    function f(a, b, c) {
        return a ^ b ^ c;
    }

    function g(a, b, c) {
        return b ^ (a | ~c);
    }

    function h(a, e, f, g, h, i, j) {
        return a = c(a, c(c(d(e, f, g), h), j)),
            c(b(a, i), e);
    }

    function i(a, d, f, g, h, i, j) {
        return a = c(a, c(c(e(d, f, g), h), j)),
            c(b(a, i), d);
    }

    function j(a, d, e, g, h, i, j) {
        return a = c(a, c(c(f(d, e, g), h), j)),
            c(b(a, i), d);
    }

    function k(a, d, e, f, h, i, j) {
        return a = c(a, c(c(g(d, e, f), h), j)),
            c(b(a, i), d);
    }

    function l(a) {
        for (var b, c = a.length, d = c + 8, e = (d - d % 64) / 64, f = 16 * (e + 1), g = new Array(f - 1), h = 0, i =
            0; c > i;)
            b = (i - i % 4) / 4,
                h = i % 4 * 8,
                g[b] = g[b] | a.charCodeAt(i) << h,
                i++;
        return b = (i - i % 4) / 4,
            h = i % 4 * 8,
            g[b] = g[b] | 128 << h,
            g[f - 2] = c << 3,
            g[f - 1] = c >>> 29,
            g;
    }

    function m(a) {
        var b, c, d = "",
            e = "";
        for (c = 0; 3 >= c; c++)
            b = a >>> 8 * c & 255,
                e = "0" + b.toString(16),
                d += e.substr(e.length - 2, 2);
        return d;
    }

    function n(a) {
        a = a.replace(/\r\n/g, "\n");
        for (var b = "", c = 0; c < a.length; c++) {
            var d = a.charCodeAt(c);
            128 > d ? b += String.fromCharCode(d) : d > 127 && 2048 > d ? (b += String.fromCharCode(d >> 6 | 192),
                b += String.fromCharCode(63 & d | 128)) : (b += String.fromCharCode(d >> 12 | 224),
                    b += String.fromCharCode(d >> 6 & 63 | 128),
                    b += String.fromCharCode(63 & d | 128));
        }
        return b;
    }

    var o, p, q, r, s, t, u, v, w, x = [],
        y = 7,
        z = 12,
        A = 17,
        B = 22,
        C = 5,
        D = 9,
        E = 14,
        F = 20,
        G = 4,
        H = 11,
        I = 16,
        J = 23,
        K = 6,
        L = 10,
        M = 15,
        N = 21;
    for (a = n(a),
        x = l(a),
        t = 1732584193,
        u = 4023233417,
        v = 2562383102,
        w = 271733878,
        o = 0; o < x.length; o += 16)
        p = t,
            q = u,
            r = v,
            s = w,
            t = h(t, u, v, w, x[o + 0], y, 3614090360),
            w = h(w, t, u, v, x[o + 1], z, 3905402710),
            v = h(v, w, t, u, x[o + 2], A, 606105819),
            u = h(u, v, w, t, x[o + 3], B, 3250441966),
            t = h(t, u, v, w, x[o + 4], y, 4118548399),
            w = h(w, t, u, v, x[o + 5], z, 1200080426),
            v = h(v, w, t, u, x[o + 6], A, 2821735955),
            u = h(u, v, w, t, x[o + 7], B, 4249261313),
            t = h(t, u, v, w, x[o + 8], y, 1770035416),
            w = h(w, t, u, v, x[o + 9], z, 2336552879),
            v = h(v, w, t, u, x[o + 10], A, 4294925233),
            u = h(u, v, w, t, x[o + 11], B, 2304563134),
            t = h(t, u, v, w, x[o + 12], y, 1804603682),
            w = h(w, t, u, v, x[o + 13], z, 4254626195),
            v = h(v, w, t, u, x[o + 14], A, 2792965006),
            u = h(u, v, w, t, x[o + 15], B, 1236535329),
            t = i(t, u, v, w, x[o + 1], C, 4129170786),
            w = i(w, t, u, v, x[o + 6], D, 3225465664),
            v = i(v, w, t, u, x[o + 11], E, 643717713),
            u = i(u, v, w, t, x[o + 0], F, 3921069994),
            t = i(t, u, v, w, x[o + 5], C, 3593408605),
            w = i(w, t, u, v, x[o + 10], D, 38016083),
            v = i(v, w, t, u, x[o + 15], E, 3634488961),
            u = i(u, v, w, t, x[o + 4], F, 3889429448),
            t = i(t, u, v, w, x[o + 9], C, 568446438),
            w = i(w, t, u, v, x[o + 14], D, 3275163606),
            v = i(v, w, t, u, x[o + 3], E, 4107603335),
            u = i(u, v, w, t, x[o + 8], F, 1163531501),
            t = i(t, u, v, w, x[o + 13], C, 2850285829),
            w = i(w, t, u, v, x[o + 2], D, 4243563512),
            v = i(v, w, t, u, x[o + 7], E, 1735328473),
            u = i(u, v, w, t, x[o + 12], F, 2368359562),
            t = j(t, u, v, w, x[o + 5], G, 4294588738),
            w = j(w, t, u, v, x[o + 8], H, 2272392833),
            v = j(v, w, t, u, x[o + 11], I, 1839030562),
            u = j(u, v, w, t, x[o + 14], J, 4259657740),
            t = j(t, u, v, w, x[o + 1], G, 2763975236),
            w = j(w, t, u, v, x[o + 4], H, 1272893353),
            v = j(v, w, t, u, x[o + 7], I, 4139469664),
            u = j(u, v, w, t, x[o + 10], J, 3200236656),
            t = j(t, u, v, w, x[o + 13], G, 681279174),
            w = j(w, t, u, v, x[o + 0], H, 3936430074),
            v = j(v, w, t, u, x[o + 3], I, 3572445317),
            u = j(u, v, w, t, x[o + 6], J, 76029189),
            t = j(t, u, v, w, x[o + 9], G, 3654602809),
            w = j(w, t, u, v, x[o + 12], H, 3873151461),
            v = j(v, w, t, u, x[o + 15], I, 530742520),
            u = j(u, v, w, t, x[o + 2], J, 3299628645),
            t = k(t, u, v, w, x[o + 0], K, 4096336452),
            w = k(w, t, u, v, x[o + 7], L, 1126891415),
            v = k(v, w, t, u, x[o + 14], M, 2878612391),
            u = k(u, v, w, t, x[o + 5], N, 4237533241),
            t = k(t, u, v, w, x[o + 12], K, 1700485571),
            w = k(w, t, u, v, x[o + 3], L, 2399980690),
            v = k(v, w, t, u, x[o + 10], M, 4293915773),
            u = k(u, v, w, t, x[o + 1], N, 2240044497),
            t = k(t, u, v, w, x[o + 8], K, 1873313359),
            w = k(w, t, u, v, x[o + 15], L, 4264355552),
            v = k(v, w, t, u, x[o + 6], M, 2734768916),
            u = k(u, v, w, t, x[o + 13], N, 1309151649),
            t = k(t, u, v, w, x[o + 4], K, 4149444226),
            w = k(w, t, u, v, x[o + 11], L, 3174756917),
            v = k(v, w, t, u, x[o + 2], M, 718787259),
            u = k(u, v, w, t, x[o + 9], N, 3951481745),
            t = c(t, p),
            u = c(u, q),
            v = c(v, r),
            w = c(w, s);
    var O = m(t) + m(u) + m(v) + m(w);
    return O.toLowerCase();
}
////////////////////////////////////////////////
function Env(name, e) { class s { constructor(name) { this.env = name; } } return new (class { constructor(name) { (this.name = name), (this.logs = []), (this.startTime = new Date().getTime()), this.log(`\n🔔${this.name}, 开始!`); } isNode() { return "undefined" != typeof module && !!module.exports; } log(...name) { name.length > 0 && (this.logs = [...this.logs, ...name]), console.log(name.join(this.logSeparator)); } done() { const e = new Date().getTime(), s = (e - this.startTime) / 1e3; this.log(`\n🔔${this.name}, 结束! 🕛 ${s} 秒`); } })(name, e); } async function httpRequest(name, options) { if (!name) { name = /function\s*(\w*)/i.exec(arguments.callee.toString())[1]; } try { let result = await utils.httpRequest(name, options); if (result) { return result; } { DoubleLog(`未知错误(1)`); } } catch (error) { console.log(error); } } async function SendMsg(message) { if (!message) return; if (Notify > 0) { if ($.isNode()) { var notify = require("./sendNotify"); await notify.sendNotify($.name, message); } else { console.log($.name, "", message); } } else { console.log(message); } } function wait(n) { return new Promise(function (resolve) { setTimeout(resolve, n * 1000); }); } function DoubleLog(data) { console.log(`    ${data}`); msg += `\n    ${data}`; }

//#endregion
