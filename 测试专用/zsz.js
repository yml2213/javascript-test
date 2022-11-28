/*
@jzack
应用商店搜索下载   早睡赚 无限刷 

改大b1的值就行了  

ID奖励 1000个ID 五毛钱

抓包www.zaoshuizhuan.com 域名

并解密 ua的值 

替换 this.da 和 this.si 的值

AES CBC ZeroPadding     加密方式
key ='80fHk81W8e3R8w26' 密钥
iv ='24f682Rh3H6Dw8j0'  偏移量


app_android|2.0.8|sleep_xiaomi|bef2ca24419fa994f340cf076ab6f7d8|754bca43917e47d986c1d6379fc6bbc8|1669552330000|12|Xiaomi|1080|2206|1a7eb94ca01d62b215889072a8239d3a


*/
const $ = new Env("早睡赚");
const CryptoJS = require('crypto-js')
let envSplitor = ['@', '\n']
let httpResult, httpReq, httpResp
let userCookie = '12312313133';
let userList = []
let userIdx = 0
let userCount = 0
let key = '80fHk81W8e3R8w26'
let iv = '24f682Rh3H6Dw8j0'
///////////////////////////////////////////////////////////////////

class UserInfo {
    constructor(str) {
        this.index = ++userIdx, this.idx = `账号 [${this.index}] `, this.time = Date.now()

        this.si = MD5Encrypt(`754bca43917e47d986c1d6379fc6bbc81596839836474540032${this.time}`)


        this.da = `app_android|2.0.8|sleep_xiaomi|bef2ca24419fa994f340cf076ab6f7d8|754bca43917e47d986c1d6379fc6bbc8|${this.time}|12|Xiaomi|1080|2206|${this.si}`
    }
    async signdata() {
        this.ua = encrypt(this.da)
        this.h = {
            "ua": this.ua,
            "Content-Type": "application/x-www-form-urlencoded",
            "Content-Length": "8",
            "Host": "www.zaoshuizhuan.com",
            "Connection": "Keep-Alive",
            "Accept-Encoding": "gzip",
            "User-Agent": "okhttp/3.10.0"
        }
        return this.h
    }
    async task() {
        let b1 = [...Array(1000)].map((a, _) => _ + 1), b = [...Array(1)].map((a, _) => _ + 1)
        for (let a of b) {
            this.id = Number(a)
            await this.wheel()   //刷 抽奖奖励
        }
        await this.withdraw()//提现
        await this.withdrawPage()//提现奖励
    }
    async waterx() {
        this.data = await this.signdata()
        await httpRequest('post', popu(`https://www.zaoshuizhuan.com/prodSleep/task/getReward`, this.data, `taskId=${this.id}`))
        let result = httpResult;
        if (result.ok !== 1) console.log(`刷任务 ${result.msg}`)
        if (result.ok == 1) console.log(result)
    }
    async withdrawPage() {
        this.data = await this.signdata()
        await httpRequest('post', popu(`https://www.zaoshuizhuan.com/prodSleep/home/getBackCoins`, this.data, `{}`))
        let result = httpResult;
        console.log(result)
    }
    async wheel() {
        this.data = await this.signdata()
        await httpRequest('post', popu(`https://www.zaoshuizhuan.com/prodSleep/wheel/getReward`, this.data, `rewardId=${this.id}&isDoubleGet=true`))
        let result = httpResult;
        if (result.ok == 1) console.log(`任务ID ${this.id} 金币增加 ${result.data.rewardCoins} 当前金币 ${result.data.userCoins} 当前余额 ${result.data.userAboutMoney}`)
        if (result.ok !== 1) console.log(`任务ID ${this.id} 刷奖励 ${result.msg}`)
    }
    async withdraw() {
        this.data = await this.signdata()
        await httpRequest('post', popu(`https://www.zaoshuizhuan.com/prodSleep/home/withdraw`, this.data, `withdrawCoins=3000`))
        let result = httpResult;
        if (result.ok) console.log(`提现3毛 ${result.msg}`)
    }
} !(async () => {
    if (!(await checkEnv())) return;
    let abcd = []
    if (userList.length > 0) {
        console.log('\n------- 运行 -------\n')
        for (let user of userList) {
            abcd.push(user.task())
        }
        await Promise.all(abcd)
    }
})()
    .catch((e) => console.log(e))
    .finally(() => $.done())
function encrypt(text) {
    return CryptoJS.AES.encrypt(text, CryptoJS.enc.Utf8.parse(key), {
        iv: CryptoJS.enc.Utf8.parse(iv),
        mode: CryptoJS.mode.CBC,
        padding: CryptoJS.pad.ZeroPadding
    }).toString()
}

function decrypt(text) {
    let decrypted = CryptoJS.AES.decrypt(text, CryptoJS.enc.Utf8.parse(key), {
        iv: CryptoJS.enc.Utf8.parse(iv),
        mode: CryptoJS.mode.CBC,
        padding: CryptoJS.pad.ZeroPadding
    });
    return decrypted.toString(CryptoJS.enc.Utf8)
}
function MD5Encrypt(_) { function $(_, $) { return _ << $ | _ >>> 32 - $ } function r(_, $) { var r, n, o, t, e; return o = 2147483648 & _, t = 2147483648 & $, r = 1073741824 & _, n = 1073741824 & $, e = (1073741823 & _) + (1073741823 & $), r & n ? 2147483648 ^ e ^ o ^ t : r | n ? 1073741824 & e ? 3221225472 ^ e ^ o ^ t : 1073741824 ^ e ^ o ^ t : e ^ o ^ t } function n(_, n, o, t, e, u, a) { var f, C; return _ = r(_, r(r((f = n) & (C = o) | ~f & t, e), a)), r($(_, u), n) } function o(_, n, o, t, e, u, a) { var f, C, c; return _ = r(_, r(r((f = n, C = o, f & (c = t) | C & ~c), e), a)), r($(_, u), n) } function t(_, n, o, t, e, u, a) { var f, C; return _ = r(_, r(r((f = n) ^ (C = o) ^ t, e), a)), r($(_, u), n) } function e(_, n, o, t, e, u, a) { var f, C; return _ = r(_, r(r((f = n, (C = o) ^ (f | ~t)), e), a)), r($(_, u), n) } function u(_) { var $, r = "", n = ""; for ($ = 0; 3 >= $; $++)r += (n = "0" + (_ >>> 8 * $ & 255).toString(16)).substr(n.length - 2, 2); return r } var a, f, C, c, h, i, v, d, g, m = []; for (m = function (_) { for (var $, r = _.length, n = r + 8, o = 16 * ((n - n % 64) / 64 + 1), t = Array(o - 1), e = 0, u = 0; r > u;)$ = (u - u % 4) / 4, e = u % 4 * 8, t[$] = t[$] | _.charCodeAt(u) << e, u++; return $ = (u - u % 4) / 4, e = u % 4 * 8, t[$] = t[$] | 128 << e, t[o - 2] = r << 3, t[o - 1] = r >>> 29, t }(_ = function (_) { _ = _.replace(/\r\n/g, "\n"); for (var $ = "", r = 0; r < _.length; r++) { var n = _.charCodeAt(r); 128 > n ? $ += String.fromCharCode(n) : n > 127 && 2048 > n ? ($ += String.fromCharCode(n >> 6 | 192), $ += String.fromCharCode(63 & n | 128)) : ($ += String.fromCharCode(n >> 12 | 224), $ += String.fromCharCode(n >> 6 & 63 | 128), $ += String.fromCharCode(63 & n | 128)) } return $ }(_)), i = 1732584193, v = 4023233417, d = 2562383102, g = 271733878, a = 0; a < m.length; a += 16)f = i, C = v, c = d, h = g, i = n(i, v, d, g, m[a + 0], 7, 3614090360), g = n(g, i, v, d, m[a + 1], 12, 3905402710), d = n(d, g, i, v, m[a + 2], 17, 606105819), v = n(v, d, g, i, m[a + 3], 22, 3250441966), i = n(i, v, d, g, m[a + 4], 7, 4118548399), g = n(g, i, v, d, m[a + 5], 12, 1200080426), d = n(d, g, i, v, m[a + 6], 17, 2821735955), v = n(v, d, g, i, m[a + 7], 22, 4249261313), i = n(i, v, d, g, m[a + 8], 7, 1770035416), g = n(g, i, v, d, m[a + 9], 12, 2336552879), d = n(d, g, i, v, m[a + 10], 17, 4294925233), v = n(v, d, g, i, m[a + 11], 22, 2304563134), i = n(i, v, d, g, m[a + 12], 7, 1804603682), g = n(g, i, v, d, m[a + 13], 12, 4254626195), d = n(d, g, i, v, m[a + 14], 17, 2792965006), v = n(v, d, g, i, m[a + 15], 22, 1236535329), i = o(i, v, d, g, m[a + 1], 5, 4129170786), g = o(g, i, v, d, m[a + 6], 9, 3225465664), d = o(d, g, i, v, m[a + 11], 14, 643717713), v = o(v, d, g, i, m[a + 0], 20, 3921069994), i = o(i, v, d, g, m[a + 5], 5, 3593408605), g = o(g, i, v, d, m[a + 10], 9, 38016083), d = o(d, g, i, v, m[a + 15], 14, 3634488961), v = o(v, d, g, i, m[a + 4], 20, 3889429448), i = o(i, v, d, g, m[a + 9], 5, 568446438), g = o(g, i, v, d, m[a + 14], 9, 3275163606), d = o(d, g, i, v, m[a + 3], 14, 4107603335), v = o(v, d, g, i, m[a + 8], 20, 1163531501), i = o(i, v, d, g, m[a + 13], 5, 2850285829), g = o(g, i, v, d, m[a + 2], 9, 4243563512), d = o(d, g, i, v, m[a + 7], 14, 1735328473), v = o(v, d, g, i, m[a + 12], 20, 2368359562), i = t(i, v, d, g, m[a + 5], 4, 4294588738), g = t(g, i, v, d, m[a + 8], 11, 2272392833), d = t(d, g, i, v, m[a + 11], 16, 1839030562), v = t(v, d, g, i, m[a + 14], 23, 4259657740), i = t(i, v, d, g, m[a + 1], 4, 2763975236), g = t(g, i, v, d, m[a + 4], 11, 1272893353), d = t(d, g, i, v, m[a + 7], 16, 4139469664), v = t(v, d, g, i, m[a + 10], 23, 3200236656), i = t(i, v, d, g, m[a + 13], 4, 681279174), g = t(g, i, v, d, m[a + 0], 11, 3936430074), d = t(d, g, i, v, m[a + 3], 16, 3572445317), v = t(v, d, g, i, m[a + 6], 23, 76029189), i = t(i, v, d, g, m[a + 9], 4, 3654602809), g = t(g, i, v, d, m[a + 12], 11, 3873151461), d = t(d, g, i, v, m[a + 15], 16, 530742520), v = t(v, d, g, i, m[a + 2], 23, 3299628645), i = e(i, v, d, g, m[a + 0], 6, 4096336452), g = e(g, i, v, d, m[a + 7], 10, 1126891415), d = e(d, g, i, v, m[a + 14], 15, 2878612391), v = e(v, d, g, i, m[a + 5], 21, 4237533241), i = e(i, v, d, g, m[a + 12], 6, 1700485571), g = e(g, i, v, d, m[a + 3], 10, 2399980690), d = e(d, g, i, v, m[a + 10], 15, 4293915773), v = e(v, d, g, i, m[a + 1], 21, 2240044497), i = e(i, v, d, g, m[a + 8], 6, 1873313359), g = e(g, i, v, d, m[a + 15], 10, 4264355552), d = e(d, g, i, v, m[a + 6], 15, 2734768916), v = e(v, d, g, i, m[a + 13], 21, 1309151649), i = e(i, v, d, g, m[a + 4], 6, 4149444226), g = e(g, i, v, d, m[a + 11], 10, 3174756917), d = e(d, g, i, v, m[a + 2], 15, 718787259), v = e(v, d, g, i, m[a + 9], 21, 3951481745), i = r(i, f), v = r(v, C), d = r(d, c), g = r(g, h); return (u(i) + u(v) + u(d) + u(g)).toLowerCase() }
///////////////////////////////////////////////////////////////////
async function checkEnv() {
    if (userCookie) {
        let splitor = envSplitor[0];
        for (let sp of envSplitor) {
            if (userCookie.indexOf(sp) > -1) {
                splitor = sp;
                break;
            }
        }
        for (let userCookies of userCookie.split(splitor)) {
            if (userCookies)
                userList.push(new UserInfo(userCookies))
        }
        userCount = userList.length
    } else {
    }
    console.log(`找到 ${userCount}个账号`)
    return true
}

////////////////////////////////////////////////////////////////////
function popu(url, h, body = '') {
    let host = url.replace('//', '/').split('/')[1]
    let urlObject = {
        url: url,
        headers: h,
        timeout: 12000,
    }
    if (body) {
        urlObject.body = body

        urlObject.headers['Content-Length'] = body?.length || 0

    }

    return urlObject;
}
async function httpRequest(method, url) {
    httpResult = null, httpReq = null, httpResp = null;
    return new Promise((resolve) => {
        $.send(method, url, async (err, req, resp) => {
            try {
                httpReq = req;
                httpResp = resp;
                if (err) {
                } else {
                    if (resp.body) {
                        if (typeof resp.body == "object") {
                            httpResult = resp.body;
                        } else {
                            try {
                                httpResult = JSON.parse(resp.body);
                            } catch (e) {
                                httpResult = resp.body;
                            }
                        }
                    }
                }
            } catch (e) {
                console.log(e);
            } finally {
                resolve();
            }
        });
    });
}
////////////////////////////////////////////////////////////////////
function Env(a, b) {
    return "undefined" != typeof process && JSON.stringify(process.env).indexOf("GITHUB") > -1 && process.exit(0), new class {
        constructor(a, b) {
            this.name = a, this.notifyStr = "", this.startTime = (new Date).getTime(), Object.assign(this, b), console.log(`${this.name} 开始运行：
`)
        } isNode() { return "undefined" != typeof module && !!module.exports } isQuanX() { return "undefined" != typeof $task } isSurge() { return "undefined" != typeof $httpClient && "undefined" == typeof $loon } isLoon() { return "undefined" != typeof $loon } getdata(b) { let a = this.getval(b); if (/^@/.test(b)) { let [, c, f] = /^@(.*?)\.(.*?)$/.exec(b), d = c ? this.getval(c) : ""; if (d) try { let e = JSON.parse(d); a = e ? this.lodash_get(e, f, "") : a } catch (g) { a = "" } } return a } setdata(c, d) { let a = !1; if (/^@/.test(d)) { let [, b, e] = /^@(.*?)\.(.*?)$/.exec(d), f = this.getval(b), i = b ? "null" === f ? null : f || "{}" : "{}"; try { let g = JSON.parse(i); this.lodash_set(g, e, c), a = this.setval(JSON.stringify(g), b) } catch (j) { let h = {}; this.lodash_set(h, e, c), a = this.setval(JSON.stringify(h), b) } } else a = this.setval(c, d); return a } getval(a) { return this.isSurge() || this.isLoon() ? $persistentStore.read(a) : this.isQuanX() ? $prefs.valueForKey(a) : this.isNode() ? (this.data = this.loaddata(), this.data[a]) : this.data && this.data[a] || null } setval(b, a) { return this.isSurge() || this.isLoon() ? $persistentStore.write(b, a) : this.isQuanX() ? $prefs.setValueForKey(b, a) : this.isNode() ? (this.data = this.loaddata(), this.data[a] = b, this.writedata(), !0) : this.data && this.data[a] || null } send(b, a, f = () => { }) { if ("get" != b && "post" != b && "put" != b && "delete" != b) { console.log(`无效的http方法：${b}`); return } if ("get" == b && a.headers ? (delete a.headers["Content-Type"], delete a.headers["Content-Length"]) : a.body && a.headers && (a.headers["Content-Type"] || (a.headers["Content-Type"] = "application/x-www-form-urlencoded")), this.isSurge() || this.isLoon()) { this.isSurge() && this.isNeedRewrite && (a.headers = a.headers || {}, Object.assign(a.headers, { "X-Surge-Skip-Scripting": !1 })); let c = { method: b, url: a.url, headers: a.headers, timeout: a.timeout, data: a.body }; "get" == b && delete c.data, $axios(c).then(a => { let { status: b, request: c, headers: d, data: e } = a; f(null, c, { statusCode: b, headers: d, body: e }) }).catch(a => console.log(a)) } else if (this.isQuanX()) a.method = b.toUpperCase(), this.isNeedRewrite && (a.opts = a.opts || {}, Object.assign(a.opts, { hints: !1 })), $task.fetch(a).then(a => { let { statusCode: b, request: c, headers: d, body: e } = a; f(null, c, { statusCode: b, headers: d, body: e }) }, a => f(a)); else if (this.isNode()) { this.got = this.got ? this.got : require("got"); let { url: d, ...e } = a; this.instance = this.got.extend({ followRedirect: !1 }), this.instance[b](d, e).then(a => { let { statusCode: b, request: c, headers: d, body: e } = a; f(null, c, { statusCode: b, headers: d, body: e }) }, b => { let { message: c, response: a } = b; f(c, a, a && a.body) }) } } time(a) { let b = { "M+": (new Date).getMonth() + 1, "d+": (new Date).getDate(), "h+": (new Date).getHours(), "m+": (new Date).getMinutes(), "s+": (new Date).getSeconds(), "q+": Math.floor(((new Date).getMonth() + 3) / 3), S: (new Date).getMilliseconds() }; for (let c in /(y+)/.test(a) && (a = a.replace(RegExp.$1, ((new Date).getFullYear() + "").substr(4 - RegExp.$1.length))), b) new RegExp("(" + c + ")").test(a) && (a = a.replace(RegExp.$1, 1 == RegExp.$1.length ? b[c] : ("00" + b[c]).substr(("" + b[c]).length))); return a } async showmsg() { if (!this.notifyStr) return; let a = this.name + " \u8FD0\u884C\u901A\u77E5\n\n" + this.notifyStr; if ($.isNode()) { var b = require("./sendNotify"); console.log("\n============== \u63A8\u9001 =============="), await b.sendNotify(this.name, a) } else this.msg(a) } logAndNotify(a) { console.log(a), this.notifyStr += a, this.notifyStr += "\n" } msg(d = t, a = "", b = "", e) { let f = a => { if (!a) return a; if ("string" == typeof a) return this.isLoon() ? a : this.isQuanX() ? { "open-url": a } : this.isSurge() ? { url: a } : void 0; if ("object" == typeof a) { if (this.isLoon()) { let b = a.openUrl || a.url || a["open-url"], c = a.mediaUrl || a["media-url"]; return { openUrl: b, mediaUrl: c } } if (this.isQuanX()) { let d = a["open-url"] || a.url || a.openUrl, e = a["media-url"] || a.mediaUrl; return { "open-url": d, "media-url": e } } if (this.isSurge()) return { url: a.url || a.openUrl || a["open-url"] } } }; this.isMute || (this.isSurge() || this.isLoon() ? $notification.post(d, a, b, f(e)) : this.isQuanX() && $notify(d, a, b, f(e))); let c = ["", "============== \u7CFB\u7EDF\u901A\u77E5 =============="]; c.push(d), a && c.push(a), b && c.push(b), console.log(c.join("\n")) } getMin(a, b) { return a < b ? a : b } getMax(a, b) { return a < b ? b : a } padStr(e, b, f = "0") { let a = String(e), g = b > a.length ? b - a.length : 0, c = ""; for (let d = 0; d < g; d++)c += f; return c + a } json2str(b, e, f = !1) { let c = []; for (let d of Object.keys(b).sort()) { let a = b[d]; a && f && (a = encodeURIComponent(a)), c.push(d + "=" + a) } return c.join(e) } str2json(e, f = !1) { let d = {}; for (let a of e.split("#")) { if (!a) continue; let b = a.indexOf("="); if (-1 == b) continue; let g = a.substr(0, b), c = a.substr(b + 1); f && (c = decodeURIComponent(c)), d[g] = c } return d } randomString(d, a = "abcdef0123456789") { let b = ""; for (let c = 0; c < d; c++)b += a.charAt(Math.floor(Math.random() * a.length)); return b } randomList(a) { let b = Math.floor(Math.random() * a.length); return a[b] } wait(a) { return new Promise(b => setTimeout(b, a)) } done(a = {}) {
            let b = (new Date).getTime(), c = (b - this.startTime) / 1e3; console.log(`
${this.name} 运行结束，共运行了 ${c} 秒！`), (this.isSurge() || this.isQuanX() || this.isLoon()) && $done(a)
        }
    }(a, b)
}
