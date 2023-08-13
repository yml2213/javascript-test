/*
软件名:捷途汽车
做任务得积分，可以兑换礼物，很多实用的东西，自己看吧
变量名:jtqcck
自己抓包 mobile-consumer.jetour.com.cn 开头的链接，里面的access_token值，多账号用@或者换行隔开。
定时一天两次
*/
const $ = new Env("捷途汽车")
let envSplitor = ['@', '\n']
let result, resurq, resurp, userList = [], usid = 0, userCount = 0, OooOo = 'jtqcck'
let userCookie = ($.isNode() ? process.env[OooOo] : $.getdata(OooOo)) || ''
let sj = randomInt(1, 5)
///////////////////////////////////////////////////////////////////
class UserInfo {
    constructor(str) {
        this._ = ++usid
        this.f = `账号 [${this._}] `
        this.ck = str
        this.ts = Math.round(new Date().getTime()).toString()
        this.h = {
            'connection': `keep-alive`,
            'accept-encoding': `gzip, deflate`,
            'origin': `https://h5-app.jetour.com.cn`,
            'Content-type': `application/json;charset=UTF-8`,
            'user-agent': `Dart/2.15 (dart:io)`,
            'x-requested-with': `com.jetour.traveller`,
            'Host': `mobile-consumer.jetour.com.cn`,
            'accept-language': `zh-Hans-CN;q=1`,
            'accept': `*/*`
        }
    }

    async task() {
        await this.signin()
        await this.page()
    }
    //签到
    async signin() {
        this.data = `{"eventCode":"SJ50001"}`
        await httpRequest('post', popu(`https://mobile-consumer.jetour.com.cn/web/task/tasks/event-start?access_token=${this.ck}`, this.h, this.data))
        result.code = 200 && console.log(`${this.f}:已成功签到`)
        await $.wait(2000)
    }
    //用户信息
    async userinfo() {
        await httpRequest('get', popu(`https://mobile-consumer.jetour.com.cn/web/user/current/details?access_token=${this.ck}&sceneCode=signInScene&jumpUrlType=4&terminal=3`, this.h))
        this.acc = result.data.accountId
        this.dis = result.data.displayName
    }

    //文章列表
    async page() {
        await httpRequest('get', popu(`https://mobile-consumer.jetour.com.cn/web/community/contents/hot-content?pageNo=${sj}&pageSize=10&access_token=${this.ck}&terminal=3`, this.h))
        this.cid = result.data.data[sj].content2cVO.id
        this.cti = result.data.data[sj].content2cVO.title
        this.id = result.data.data[sj].content2cVO.authorId
        this.name = result.data.data[sj].content2cVO.authorName
        await this.view()
        await $.wait(5000)
        await this.share()
        await $.wait(5000)
        await this.text()
    }

    //浏览
    async view() {
        this.data = `{"eventCode":"SJ50006","properties":{"content_user_id":"${this.id}","content_user_name":"${this.name}","content_id":"${this.cid}","content_title":"${this.cti}","content_view_time":${this.ts},"content_duration":38},"terminal":3}`
        await httpRequest('post', popu(`https://mobile-consumer.jetour.com.cn/web/event/event-instances?access_token=${this.ck}&terminal=3`, this.h, this.data))
        result.status == 200 && console.log(`${this.f}:浏览成功`)
    }
    //分享
    async share() {
        this.data = `{"eventCode":"SJ50005","properties":{"share_user_id":"${this.acc}","share_user_name":"${this.dis}","share_time":${this.ts},"share_content_type":"动态","share_channel":"微信好友"},"terminal":3}`
        await this.userinfo()
        await httpRequest('post', popu(`https://mobile-consumer.jetour.com.cn/web/event/event-instances?access_token=${this.ck}&terminal=3`, this.h, this.data))
        result.status == 200 && console.log(`${this.f}:分享成功`)
    }

    //评论
    async text() {
        this.data = `{"commentContent":"捷途加油！捷途加油！捷途加油！捷途加油！捷途加油！捷途加油！","contentType":7,"contentId":"${this.cid}","terminal":3}`
        await httpRequest('post', popu(`https://mobile-consumer.jetour.com.cn/web/community/comments?access_token=${this.ck}&terminal=3`, this.h, this.data))
        result.status == 200 && console.log(`${this.f}:评论文章成功`)
    }

} !(async () => {
    if (!(await checkEnv())) return
    for (let user of userList) await user.task()
})()
    .catch((e) => console.log(e))
    .finally(() => $.done())
function encrypt(e) { return CryptoJS.AES.encrypt(e, CryptoJS.enc.Utf8.parse(key), { iv: CryptoJS.enc.Utf8.parse(iv), mode: CryptoJS.mode.CBC, padding: CryptoJS.pad.ZeroPadding }).toString() } function decrypt(e) { return CryptoJS.AES.decrypt(e, CryptoJS.enc.Utf8.parse(key), { iv: CryptoJS.enc.Utf8.parse(iv), mode: CryptoJS.mode.CBC, padding: CryptoJS.pad.ZeroPadding }).toString(CryptoJS.enc.Utf8) }
function MD5Encrypt(_) { function $(_, $) { return _ << $ | _ >>> 32 - $ } function r(_, $) { var r, n, o, t, e; return o = 2147483648 & _, t = 2147483648 & $, r = 1073741824 & _, n = 1073741824 & $, e = (1073741823 & _) + (1073741823 & $), r & n ? 2147483648 ^ e ^ o ^ t : r | n ? 1073741824 & e ? 3221225472 ^ e ^ o ^ t : 1073741824 ^ e ^ o ^ t : e ^ o ^ t } function n(_, n, o, t, e, u, a) { var f, C; return _ = r(_, r(r((f = n) & (C = o) | ~f & t, e), a)), r($(_, u), n) } function o(_, n, o, t, e, u, a) { var f, C, c; return _ = r(_, r(r((f = n, C = o, f & (c = t) | C & ~c), e), a)), r($(_, u), n) } function t(_, n, o, t, e, u, a) { var f, C; return _ = r(_, r(r((f = n) ^ (C = o) ^ t, e), a)), r($(_, u), n) } function e(_, n, o, t, e, u, a) { var f, C; return _ = r(_, r(r((f = n, (C = o) ^ (f | ~t)), e), a)), r($(_, u), n) } function u(_) { var $, r = "", n = ""; for ($ = 0; 3 >= $; $++)r += (n = "0" + (_ >>> 8 * $ & 255).toString(16)).substr(n.length - 2, 2); return r } var a, f, C, c, h, i, v, d, g, m = []; for (m = function (_) { for (var $, r = _.length, n = r + 8, o = 16 * ((n - n % 64) / 64 + 1), t = Array(o - 1), e = 0, u = 0; r > u;)$ = (u - u % 4) / 4, e = u % 4 * 8, t[$] = t[$] | _.charCodeAt(u) << e, u++; return $ = (u - u % 4) / 4, e = u % 4 * 8, t[$] = t[$] | 128 << e, t[o - 2] = r << 3, t[o - 1] = r >>> 29, t }(_ = function (_) { _ = _.replace(/\r\n/g, "\n"); for (var $ = "", r = 0; r < _.length; r++) { var n = _.charCodeAt(r); 128 > n ? $ += String.fromCharCode(n) : n > 127 && 2048 > n ? ($ += String.fromCharCode(n >> 6 | 192), $ += String.fromCharCode(63 & n | 128)) : ($ += String.fromCharCode(n >> 12 | 224), $ += String.fromCharCode(n >> 6 & 63 | 128), $ += String.fromCharCode(63 & n | 128)) } return $ }(_)), i = 1732584193, v = 4023233417, d = 2562383102, g = 271733878, a = 0; a < m.length; a += 16)f = i, C = v, c = d, h = g, i = n(i, v, d, g, m[a + 0], 7, 3614090360), g = n(g, i, v, d, m[a + 1], 12, 3905402710), d = n(d, g, i, v, m[a + 2], 17, 606105819), v = n(v, d, g, i, m[a + 3], 22, 3250441966), i = n(i, v, d, g, m[a + 4], 7, 4118548399), g = n(g, i, v, d, m[a + 5], 12, 1200080426), d = n(d, g, i, v, m[a + 6], 17, 2821735955), v = n(v, d, g, i, m[a + 7], 22, 4249261313), i = n(i, v, d, g, m[a + 8], 7, 1770035416), g = n(g, i, v, d, m[a + 9], 12, 2336552879), d = n(d, g, i, v, m[a + 10], 17, 4294925233), v = n(v, d, g, i, m[a + 11], 22, 2304563134), i = n(i, v, d, g, m[a + 12], 7, 1804603682), g = n(g, i, v, d, m[a + 13], 12, 4254626195), d = n(d, g, i, v, m[a + 14], 17, 2792965006), v = n(v, d, g, i, m[a + 15], 22, 1236535329), i = o(i, v, d, g, m[a + 1], 5, 4129170786), g = o(g, i, v, d, m[a + 6], 9, 3225465664), d = o(d, g, i, v, m[a + 11], 14, 643717713), v = o(v, d, g, i, m[a + 0], 20, 3921069994), i = o(i, v, d, g, m[a + 5], 5, 3593408605), g = o(g, i, v, d, m[a + 10], 9, 38016083), d = o(d, g, i, v, m[a + 15], 14, 3634488961), v = o(v, d, g, i, m[a + 4], 20, 3889429448), i = o(i, v, d, g, m[a + 9], 5, 568446438), g = o(g, i, v, d, m[a + 14], 9, 3275163606), d = o(d, g, i, v, m[a + 3], 14, 4107603335), v = o(v, d, g, i, m[a + 8], 20, 1163531501), i = o(i, v, d, g, m[a + 13], 5, 2850285829), g = o(g, i, v, d, m[a + 2], 9, 4243563512), d = o(d, g, i, v, m[a + 7], 14, 1735328473), v = o(v, d, g, i, m[a + 12], 20, 2368359562), i = t(i, v, d, g, m[a + 5], 4, 4294588738), g = t(g, i, v, d, m[a + 8], 11, 2272392833), d = t(d, g, i, v, m[a + 11], 16, 1839030562), v = t(v, d, g, i, m[a + 14], 23, 4259657740), i = t(i, v, d, g, m[a + 1], 4, 2763975236), g = t(g, i, v, d, m[a + 4], 11, 1272893353), d = t(d, g, i, v, m[a + 7], 16, 4139469664), v = t(v, d, g, i, m[a + 10], 23, 3200236656), i = t(i, v, d, g, m[a + 13], 4, 681279174), g = t(g, i, v, d, m[a + 0], 11, 3936430074), d = t(d, g, i, v, m[a + 3], 16, 3572445317), v = t(v, d, g, i, m[a + 6], 23, 76029189), i = t(i, v, d, g, m[a + 9], 4, 3654602809), g = t(g, i, v, d, m[a + 12], 11, 3873151461), d = t(d, g, i, v, m[a + 15], 16, 530742520), v = t(v, d, g, i, m[a + 2], 23, 3299628645), i = e(i, v, d, g, m[a + 0], 6, 4096336452), g = e(g, i, v, d, m[a + 7], 10, 1126891415), d = e(d, g, i, v, m[a + 14], 15, 2878612391), v = e(v, d, g, i, m[a + 5], 21, 4237533241), i = e(i, v, d, g, m[a + 12], 6, 1700485571), g = e(g, i, v, d, m[a + 3], 10, 2399980690), d = e(d, g, i, v, m[a + 10], 15, 4293915773), v = e(v, d, g, i, m[a + 1], 21, 2240044497), i = e(i, v, d, g, m[a + 8], 6, 1873313359), g = e(g, i, v, d, m[a + 15], 10, 4264355552), d = e(d, g, i, v, m[a + 6], 15, 2734768916), v = e(v, d, g, i, m[a + 13], 21, 1309151649), i = e(i, v, d, g, m[a + 4], 6, 4149444226), g = e(g, i, v, d, m[a + 11], 10, 3174756917), d = e(d, g, i, v, m[a + 2], 15, 718787259), v = e(v, d, g, i, m[a + 9], 21, 3951481745), i = r(i, f), v = r(v, C), d = r(d, c), g = r(g, h); return (u(i) + u(v) + u(d) + u(g)).toLowerCase() }
async function checkEnv() { if (userCookie) { let e = envSplitor[0]; for (let f of envSplitor) if (userCookie.indexOf(f) > -1) { e = f; break } for (let l of userCookie.split(e)) l && userList.push(new UserInfo(l)); userCount = userList.length } else console.log(`未找到任何账号`); return console.log(`找到 ${userCount}个账号`), !0 }
function popu(e, t, n = "") { e.replace("//", "/").split("/")[1]; let l = { url: e, headers: t, timeout: 12e3 }; return n && (l.body = n, l.headers["Content-Length"] = n?.length || 0), l } async function httpRequest(e, t) { return result = null, resurq = null, resurp = null, new Promise(n => { $.send(e, t, async (e, t, l) => { try { if (resurq = t, resurp = l, e); else if (l.body) { if ("object" == typeof l.body) result = l.body; else try { result = JSON.parse(l.body) } catch (o) { result = l.body } } } catch (y) { console.log(y) } finally { n() } }) }) }
function randomInt(min, max) {
    return Math.round(Math.random() * (max - min) + min)
}
function SHA256(n) {
    const r = 8,
        t = 0

    function o(n, r) {
        const t = (65535 & n) + (65535 & r)
        return (n >> 16) + (r >> 16) + (t >> 16) << 16 | 65535 & t
    }

    function e(n, r) {
        return n >>> r | n << 32 - r
    }

    function u(n, r) {
        return n >>> r
    }

    function c(n, r, t) {
        return n & r ^ ~n & t
    }

    function f(n, r, t) {
        return n & r ^ n & t ^ r & t
    }

    function i(n) {
        return e(n, 2) ^ e(n, 13) ^ e(n, 22)
    }

    function h(n) {
        return e(n, 6) ^ e(n, 11) ^ e(n, 25)
    }

    function C(n) {
        return e(n, 7) ^ e(n, 18) ^ u(n, 3)
    }
    return function (n) {
        const r = t ? "0123456789ABCDEF" : "0123456789abcdef"
        let o = ""
        for (let t = 0; t < 4 * n.length; t++) o += r.charAt(n[t >> 2] >> 8 * (3 - t % 4) + 4 & 15) + r.charAt(n[t >> 2] >> 8 * (3 - t % 4) & 15)
        return o
    }(function (n, r) {
        const t = [1116352408, 1899447441, 3049323471, 3921009573, 961987163, 1508970993, 2453635748, 2870763221, 3624381080, 310598401, 607225278, 1426881987, 1925078388, 2162078206, 2614888103, 3248222580, 3835390401, 4022224774, 264347078, 604807628, 770255983, 1249150122, 1555081692, 1996064986, 2554220882, 2821834349, 2952996808, 3210313671, 3336571891, 3584528711, 113926993, 338241895, 666307205, 773529912, 1294757372, 1396182291, 1695183700, 1986661051, 2177026350, 2456956037, 2730485921, 2820302411, 3259730800, 3345764771, 3516065817, 3600352804, 4094571909, 275423344, 430227734, 506948616, 659060556, 883997877, 958139571, 1322822218, 1537002063, 1747873779, 1955562222, 2024104815, 2227730452, 2361852424, 2428436474, 2756734187, 3204031479, 3329325298],
            a = [1779033703, 3144134277, 1013904242, 2773480762, 1359893119, 2600822924, 528734635, 1541459225],
            g = new Array(64)
        let l, d, A, S, m, s, b, p, v, w, y, B
        for (n[r >> 5] |= 128 << 24 - r % 32, n[15 + (r + 64 >> 9 << 4)] = r, v = 0; v < n.length; v += 16) {
            for (l = a[0], d = a[1], A = a[2], S = a[3], m = a[4], s = a[5], b = a[6], p = a[7], w = 0; w < 64; w++) g[w] = w < 16 ? n[w + v] : o(o(o(e(D = g[w - 2], 17) ^ e(D, 19) ^ u(D, 10), g[w - 7]), C(g[w - 15])), g[w - 16]), y = o(o(o(o(p, h(m)), c(m, s, b)), t[w]), g[w]), B = o(i(l), f(l, d, A)), p = b, b = s, s = m, m = o(S, y), S = A, A = d, d = l, l = o(y, B)
            a[0] = o(l, a[0]), a[1] = o(d, a[1]), a[2] = o(A, a[2]), a[3] = o(S, a[3]), a[4] = o(m, a[4]), a[5] = o(s, a[5]), a[6] = o(b, a[6]), a[7] = o(p, a[7])
        }
        var D
        return a
    }(function (n) {
        const t = [],
            o = (1 << r) - 1
        for (let e = 0; e < n.length * r; e += r) t[e >> 5] |= (n.charCodeAt(e / r) & o) << 24 - e % 32
        return t
    }(n = function (n) {
        n = n.replace(/\r\n/g, "\n")
        let r = ""
        for (let t = 0; t < n.length; t++) {
            const o = n.charCodeAt(t)
            o < 128 ? r += String.fromCharCode(o) : o > 127 && o < 2048 ? (r += String.fromCharCode(o >> 6 | 192), r += String.fromCharCode(63 & o | 128)) : (r += String.fromCharCode(o >> 12 | 224), r += String.fromCharCode(o >> 6 & 63 | 128), r += String.fromCharCode(63 & o | 128))
        }
        return r
    }(n)), n.length * r))
}
function encryptrsa(encryptTxt, Key) {
    let nodersa = new NodeRSA('-----BEGIN PUBLIC KEY-----\n' + Key + '\n-----END PUBLIC KEY-----')
    nodersa.setOptions({ encryptionScheme: 'pkcs1' })
    let decryptText = nodersa.encrypt(encryptTxt, 'base64', 'utf8')
    return decryptText
}
function Env(e, s) {
    return "undefined" != typeof process && JSON.stringify(process.env).indexOf("GITHUB") > -1 && process.exit(0), new class {
        constructor(e, s) {
            this.name = e, this.notifyStr = "", this.startTime = (new Date).getTime(), Object.assign(this, s), console.log(`${this.name} 开始运行：
`)
        } isNode() { return "undefined" != typeof module && !!module.exports } isQuanX() { return "undefined" != typeof $task } isSurge() { return "undefined" != typeof $httpClient && "undefined" == typeof $loon } isLoon() { return "undefined" != typeof $loon } getdata(e) { let s = this.getval(e); if (/^@/.test(e)) { let [, i, n] = /^@(.*?)\.(.*?)$/.exec(e), r = i ? this.getval(i) : ""; if (r) try { let o = JSON.parse(r); s = o ? this.lodash_get(o, n, "") : s } catch (a) { s = "" } } return s } setdata(e, s) { let i = !1; if (/^@/.test(s)) { let [, n, r] = /^@(.*?)\.(.*?)$/.exec(s), o = this.getval(n); try { let a = JSON.parse(n ? "null" === o ? null : o || "{}" : "{}"); this.lodash_set(a, r, e), i = this.setval(JSON.stringify(a), n) } catch (l) { let h = {}; this.lodash_set(h, r, e), i = this.setval(JSON.stringify(h), n) } } else i = this.setval(e, s); return i } getval(e) { return this.isSurge() || this.isLoon() ? $persistentStore.read(e) : this.isQuanX() ? $prefs.valueForKey(e) : this.isNode() ? (this.data = this.loaddata(), this.data[e]) : this.data && this.data[e] || null } setval(e, s) { return this.isSurge() || this.isLoon() ? $persistentStore.write(e, s) : this.isQuanX() ? $prefs.setValueForKey(e, s) : this.isNode() ? (this.data = this.loaddata(), this.data[s] = e, this.writedata(), !0) : this.data && this.data[s] || null } send(e, s, i = () => { }) { if ("get" != e && "post" != e && "put" != e && "delete" != e) { console.log(`无效的http方法：${e}`); return } if ("get" == e && s.headers ? (delete s.headers["Content-Type"], delete s.headers["Content-Length"]) : s.body && s.headers && (s.headers["Content-Type"] || (s.headers["Content-Type"] = "application/x-www-form-urlencoded")), this.isSurge() || this.isLoon()) { this.isSurge() && this.isNeedRewrite && (s.headers = s.headers || {}, Object.assign(s.headers, { "X-Surge-Skip-Scripting": !1 })); let n = { method: e, url: s.url, headers: s.headers, timeout: s.timeout, data: s.body }; "get" == e && delete n.data, $axios(n).then(e => { let { status: s, request: n, headers: r, data: o } = e; i(null, n, { statusCode: s, headers: r, body: o }) }).catch(e => console.log(e)) } else if (this.isQuanX()) s.method = e.toUpperCase(), this.isNeedRewrite && (s.opts = s.opts || {}, Object.assign(s.opts, { hints: !1 })), $task.fetch(s).then(e => { let { statusCode: s, request: n, headers: r, body: o } = e; i(null, n, { statusCode: s, headers: r, body: o }) }, e => i(e)); else if (this.isNode()) { this.got = this.got ? this.got : require("got"); let { url: r, ...o } = s; this.instance = this.got.extend({ followRedirect: !1 }), this.instance[e](r, o).then(e => { let { statusCode: s, request: n, headers: r, body: o } = e; i(null, n, { statusCode: s, headers: r, body: o }) }, e => { let { message: s, response: n } = e; i(s, n, n && n.body) }) } } time(e) { let s = { "M+": (new Date).getMonth() + 1, "d+": (new Date).getDate(), "h+": (new Date).getHours(), "m+": (new Date).getMinutes(), "s+": (new Date).getSeconds(), "q+": Math.floor(((new Date).getMonth() + 3) / 3), S: (new Date).getMilliseconds() }; for (let i in /(y+)/.test(e) && (e = e.replace(RegExp.$1, ((new Date).getFullYear() + "").substr(4 - RegExp.$1.length))), s) RegExp("(" + i + ")").test(e) && (e = e.replace(RegExp.$1, 1 == RegExp.$1.length ? s[i] : ("00" + s[i]).substr(("" + s[i]).length))); return e } async showmsg() { if (!this.notifyStr) return; let e = this.name + " 运行通知\n\n" + this.notifyStr; if ($.isNode()) { var s = require("./sendNotify"); console.log("\n============== 推送 =============="), await s.sendNotify(this.name, e) } else this.msg(e) } logAndNotify(e) { console.log(e), this.notifyStr += e, this.notifyStr += "\n" } msg(e = t, s = "", i = "", n) { let r = e => { if (!e) return e; if ("string" == typeof e) return this.isLoon() ? e : this.isQuanX() ? { "open-url": e } : this.isSurge() ? { url: e } : void 0; if ("object" == typeof e) { if (this.isLoon()) { let s; return { openUrl: e.openUrl || e.url || e["open-url"], mediaUrl: e.mediaUrl || e["media-url"] } } if (this.isQuanX()) { let i; return { "open-url": e["open-url"] || e.url || e.openUrl, "media-url": e["media-url"] || e.mediaUrl } } if (this.isSurge()) return { url: e.url || e.openUrl || e["open-url"] } } }; this.isMute || (this.isSurge() || this.isLoon() ? $notification.post(e, s, i, r(n)) : this.isQuanX() && $notify(e, s, i, r(n))); let o = ["", "============== 系统通知 =============="]; o.push(e), s && o.push(s), i && o.push(i), console.log(o.join("\n")) } getMin(e, s) { return e < s ? e : s } getMax(e, s) { return e < s ? s : e } padStr(e, s, i = "0") { let n = String(e), r = s > n.length ? s - n.length : 0, o = ""; for (let a = 0; a < r; a++)o += i; return o + n } json2str(e, s, i = !1) { let n = []; for (let r of Object.keys(e).sort()) { let o = e[r]; o && i && (o = encodeURIComponent(o)), n.push(r + "=" + o) } return n.join(s) } str2json(e, s = !1) { let i = {}; for (let n of e.split("#")) { if (!n) continue; let r = n.indexOf("="); if (-1 == r) continue; let o = n.substr(0, r), a = n.substr(r + 1); s && (a = decodeURIComponent(a)), i[o] = a } return i } randomString(e, s = "abcdef0123456789") { let i = ""; for (let n = 0; n < e; n++)i += s.charAt(Math.floor(Math.random() * s.length)); return i } randomList(e) { return e[Math.floor(Math.random() * e.length)] } wait(e) { return new Promise(s => setTimeout(s, e)) } done(e = {}) {
            let s = ((new Date).getTime() - this.startTime) / 1e3; console.log(`
${this.name} 运行结束，共运行了 ${s} 秒！`), (this.isSurge() || this.isQuanX() || this.isLoon()) && $done(e)
        }
    }(e, s)
}
