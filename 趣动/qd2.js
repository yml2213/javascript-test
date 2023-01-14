/*
软件:趣动Will Go 苹果安卓都有
抓取https://capi.wewillpro.com/开头的保里面找到 app_imei 和 token 用#连接，多账号用@隔开。
变量名:Qdck
*/
const $ = new Env("趣动")
let envSplitor = ['@', '\n']
let result, resurq, resurp, index, userList = [], usid = 0, userCount = 0, OooOo = 'Qdck'
let userCookie = ($.isNode() ? process.env[OooOo] : $.getdata(OooOo)) || ''
const getNowDate = () => { var e = new Date, t = e.getFullYear(), a = e.getMonth() + 1, g = e.getDate(); return a >= 1 && a <= 9 && (a = "0" + a), g >= 0 && g <= 9 && (g = "0" + g), t + "" + a + g }
///////////////////////////////////////////////////////////////////
let qd = [...Array(12)].map((a, _) => _ + 1), rd = [...Array(15)].map((a, _) => _ + 1)

let cashnum = '20000' //2元 自定义修改

class UserInfo {
    constructor(str) {
        this._ = ++usid, this.f = `账号 [${this._}] `, this.p = str.split('#')[1], this.i = $.randomString(32)
        //this.i=str.split('#')[0]
    }

    async task() {
        await this.goldWithdrawal() //提现2元 
        await this.uploadstep()     //上传步数                                                              
        await this.gettasklist()   //任务列表    

        for (let a of qd) {  //签到视频得金币12次
            this.vid = a
            await this.signvideo()
            await this.signvideofb()
            if (this.fx == 1) break
        }
        for (let a of rd) {              // 抽奖15次              
            await this.cj()
            if (this.b == 1) break
        }

    }
    async goldWithdrawal() {
        this.ts = Math.round(Date.now() / 1000), this.nyr = getNowDate()
        this.sign = MD5Encrypt(`{"app_imei":"${this.i}","app_type":"1","app_version":"3.0.0","brand":"OnePlus","model":"ONEPLUS A6000","num":"${cashnum}","os_version":"Android10","pay_type":"1","time_str":"${this.ts}","token":"${this.p}"}willgoapi_beijing_api_key`)

        this.data = `app_imei=${this.i}&app_type=1&app_version=3.0.0&num=${cashnum}&os_version=Android10&sign=${this.sign}&pay_type=1&model=ONEPLUS%20A6000&time_str=${this.ts}&brand=OnePlus&token=${this.p}
        `
        await httpRequest('post', popu(`https://capi.wewillpro.com/balance/goldWithdrawal`, this.data))
        result.code == 200 && console.log(`${this.f}[${cashnum * 0.0001}]元 提现成功`)
        result.code !== 200 && console.log(`${this.f}[${cashnum * 0.0001}]元 提现失败 ${result.msg}`)
    }


    async uploadstep() {
        this.ts = Math.round(Date.now() / 1000), this.nyr = getNowDate()
        this.sign = MD5Encrypt(`{"app_imei":"${this.i}","app_type":"2","app_version":"3.0.1","time_zone":"GMT%2B8","app_channel":"Apple_iPhone15%2C2_16.1","sport_type":"0","sport_ count":"10000","time_str":"${this.ts}","request_time":"${this.ts}","token":"${this.p}"}willgoapi_beijing_api_key`)
        this.data = `app_channel=Apple_iPhone15%2C2_16.1&app_imei=${this.i}&app_type=2&app_version=3.0.8&request_time=${this.ts}&sign=${this.sign}&sport_type=0&step_count=20480&time_str=${this.ts}&time_zone=GMT%2B8&token=${this.p}`
        await httpRequest('post', popu(`https://capi.wewillpro.com/sport/addSportRecord`, this.data))
        result.code == 200 && console.log(`${this.f}运动 上传成功`)
    }

    async gettasklist() {
        this.ts = Math.round(Date.now() / 1000), this.nyr = getNowDate()
        this.sign = MD5Encrypt(`{"app_imei":"${this.i}","app_type":"1","app_version":"3.0.1","brand":"xiaomi","model":"Redmi Note 7","os_version":"Android10","time_str":"${this.ts}","token":"${this.p}"}willgoapi_beijing_api_key`)
        this.data = `app_imei=${this.i}&app_type=1&app_version=3.0.1&os_version=Android10&sign=${this.sign}&model=Redmi%20Note%207&time_str=${this.ts}&brand=xiaomi&token=${this.p}`
        await httpRequest('post', popu(`https://capi.wewillpro.com/task/getTodayTaskList`, this.data))
        for (let a of result.data) {
            this.id = a.id
            this.task_id = a.task_id
            this.idnm = a.task_description
            await $.wait(1500)
            await this.dotask()
            await $.wait(1500)
        }
    }

    async dotask() {
        this.ts = Math.round(Date.now() / 1000), this.nyr = getNowDate()
        this.sign = MD5Encrypt(`{"app_imei":"${this.i}","app_type":"1","app_version":"3.0.1","brand":"xiaomi","date":"${this.nyr}","id":"${this.id}","model":"Redmi Note 7","os_version":"Android10","task_id":"${this.task_id}","time_str":"${this.ts}","token":"${this.p}"}willgoapi_beijing_api_key`)
        this.data = `date=${this.nyr}&app_imei=${this.i}&app_type=1&app_version=3.0.1&os_version=Android10&sign=${this.sign}&task_id=${this.task_id}&model=Redmi%20Note%207&id=${this.id}&time_str=${this.ts}&brand=xiaomi&token=${this.p}`
        await httpRequest('post', popu(`https://capi.wewillpro.com/task/pickTaskReward`, this.data))
        this.vfb = result.data.gold
        console.log(`${this.f}去完成 [${this.idnm}] ${result.msg}`)
        await $.wait(8500)
        await this.videotask()
    }

    async videotask() {
        this.ts = Math.round(Date.now() / 1000), this.nyr = getNowDate()
        this.sign = MD5Encrypt(`{"app_imei":"${this.i}","app_type":"1","app_version":"3.0.1","award_amount":"${this.vfb}","award_type":"gold","brand":"xiaomi","model":"Redmi Note 7","multi":"3","os_version":"Android10","task_id":"${this.task_id}","time_str":"${this.ts}","token":"${this.p}"}willgoapi_beijing_api_key`)
        this.data = `app_type=1&app_version=3.0.1&os_version=Android10&sign=${this.sign}&task_id=${this.task_id}&time_str=${this.ts}&award_type=gold&token=${this.p}&multi=3&app_imei=${this.i}&award_amount=${this.vfb}&model=Redmi%20Note%207&brand=xiaomi`
        await httpRequest('post', popu(`https://capi.wewillpro.com/task/viewAdComplete`, this.data))
        console.log(`${this.f}观看 [${this.idnm}]任务视频 ${result.msg}\n`)
        await $.wait(7500)
    }


    async signvideo() {
        this.ts = Math.round(Date.now() / 1000), this.nyr = getNowDate()
        this.sign = MD5Encrypt(`{"app_imei":"${this.i}","app_type":"2","app_version":"3.0.1","brand":"xiaomi","id":"${this.vid}","is_adv":"2","model":"Redmi Note 7","os_version":"Android10","time_str":"${this.ts}","token":"${this.p}"}willgoapi_beijing_api_key`)
        this.data = `is_adv=2&app_imei=${this.i}&app_type=2&app_version=3.0.1&os_version=Android10&sign=${this.sign}&model=Redmi%20Note%207&id=${this.vid}&time_str=${this.ts}&brand=xiaomi&token=${this.p}`
        await httpRequest('post', popu(`https://capi.wewillpro.com/gold/user_gold_sign`, this.data))
        await $.wait(7500)
        console.log(`${this.f}签到 ${result.msg}`)

        if (result.msg == '今日任务已经做完') this.fx = 1
    }

    async signvideofb() {
        this.ts = Math.round(Date.now() / 1000), this.nyr = getNowDate()
        this.sign = MD5Encrypt(`{"app_imei":"${this.i}","app_type":"1","app_version":"3.0.1","brand":"xiaomi","id":"${this.vid}","is_adv":"1","model":"Redmi Note 7","os_version":"Android10","time_str":"${this.ts}","token":"${this.p}"}willgoapi_beijing_api_key`)
        this.data = `is_adv=1&app_imei=${this.i}&app_type=1&app_version=3.0.1&os_version=Android10&sign=${this.sign}&model=Redmi%20Note%207&id=${this.vid}&time_str=${this.ts}&brand=xiaomi&token=${this.p}`
        await httpRequest('post', popu(`https://capi.wewillpro.com/gold/user_gold_sign`, this.data))
        await $.wait(6500)
        console.log(`${this.f}观看签到视频 ${result.msg}`)

        //if (result.msg == '操作太频繁')this.fx=1
    }

    async cj() {
        this.data = `token=${this.p}`
        await httpRequest('post', popu(`https://capi.wewillpro.com/wheel/make_draw`, this.data))
        this.fb = result.data.award_amount
        this.bs = result.data.award_multi_num
        console.log(`${this.f}抽奖 ${result.msg}`)
        await $.wait(2500)
        await this.cjfb()
        //if (result.msg == '您今日抽奖机会已用完，暂时不能抽奖')this.b=1

    }

    async cjfb() {
        this.data = `token=${this.p}&award_type=gold&award_amount=${this.fb}&multi=${this.bs}`
        await httpRequest('post', popu(`https://capi.wewillpro.com/wheel/view_ad_complete`, this.data))
        this.fb = result.data.award_amount
        console.log(`${this.f}抽奖 ${result.msg}`)
        await $.wait(7500)
    }









} !(async () => {
    if (!(await checkEnv())) return
    for (let user of userList) await user.task()
})()
    .catch((e) => console.log(e))
    .finally(() => $.done())
function encrypt(e) { return CryptoJS.AES.encrypt(e, CryptoJS.enc.Utf8.parse(key), { iv: CryptoJS.enc.Utf8.parse(iv), mode: CryptoJS.mode.CBC, padding: CryptoJS.pad.ZeroPadding }).toString() } function decrypt(e) { return CryptoJS.AES.decrypt(e, CryptoJS.enc.Utf8.parse(key), { iv: CryptoJS.enc.Utf8.parse(iv), mode: CryptoJS.mode.CBC, padding: CryptoJS.pad.ZeroPadding }).toString(CryptoJS.enc.Utf8) }
/**
  * 随机整数生成
  */
function randomInt(min, max) {
    return Math.round(Math.random() * (max - min) + min)
}
function MD5Encrypt(_) { function $(_, $) { return _ << $ | _ >>> 32 - $ } function r(_, $) { var r, n, o, t, e; return o = 2147483648 & _, t = 2147483648 & $, r = 1073741824 & _, n = 1073741824 & $, e = (1073741823 & _) + (1073741823 & $), r & n ? 2147483648 ^ e ^ o ^ t : r | n ? 1073741824 & e ? 3221225472 ^ e ^ o ^ t : 1073741824 ^ e ^ o ^ t : e ^ o ^ t } function n(_, n, o, t, e, u, a) { var f, C; return _ = r(_, r(r((f = n) & (C = o) | ~f & t, e), a)), r($(_, u), n) } function o(_, n, o, t, e, u, a) { var f, C, c; return _ = r(_, r(r((f = n, C = o, f & (c = t) | C & ~c), e), a)), r($(_, u), n) } function t(_, n, o, t, e, u, a) { var f, C; return _ = r(_, r(r((f = n) ^ (C = o) ^ t, e), a)), r($(_, u), n) } function e(_, n, o, t, e, u, a) { var f, C; return _ = r(_, r(r((f = n, (C = o) ^ (f | ~t)), e), a)), r($(_, u), n) } function u(_) { var $, r = "", n = ""; for ($ = 0; 3 >= $; $++)r += (n = "0" + (_ >>> 8 * $ & 255).toString(16)).substr(n.length - 2, 2); return r } var a, f, C, c, h, i, v, d, g, m = []; for (m = function (_) { for (var $, r = _.length, n = r + 8, o = 16 * ((n - n % 64) / 64 + 1), t = Array(o - 1), e = 0, u = 0; r > u;)$ = (u - u % 4) / 4, e = u % 4 * 8, t[$] = t[$] | _.charCodeAt(u) << e, u++; return $ = (u - u % 4) / 4, e = u % 4 * 8, t[$] = t[$] | 128 << e, t[o - 2] = r << 3, t[o - 1] = r >>> 29, t }(_ = function (_) { _ = _.replace(/\r\n/g, "\n"); for (var $ = "", r = 0; r < _.length; r++) { var n = _.charCodeAt(r); 128 > n ? $ += String.fromCharCode(n) : n > 127 && 2048 > n ? ($ += String.fromCharCode(n >> 6 | 192), $ += String.fromCharCode(63 & n | 128)) : ($ += String.fromCharCode(n >> 12 | 224), $ += String.fromCharCode(n >> 6 & 63 | 128), $ += String.fromCharCode(63 & n | 128)) } return $ }(_)), i = 1732584193, v = 4023233417, d = 2562383102, g = 271733878, a = 0; a < m.length; a += 16)f = i, C = v, c = d, h = g, i = n(i, v, d, g, m[a + 0], 7, 3614090360), g = n(g, i, v, d, m[a + 1], 12, 3905402710), d = n(d, g, i, v, m[a + 2], 17, 606105819), v = n(v, d, g, i, m[a + 3], 22, 3250441966), i = n(i, v, d, g, m[a + 4], 7, 4118548399), g = n(g, i, v, d, m[a + 5], 12, 1200080426), d = n(d, g, i, v, m[a + 6], 17, 2821735955), v = n(v, d, g, i, m[a + 7], 22, 4249261313), i = n(i, v, d, g, m[a + 8], 7, 1770035416), g = n(g, i, v, d, m[a + 9], 12, 2336552879), d = n(d, g, i, v, m[a + 10], 17, 4294925233), v = n(v, d, g, i, m[a + 11], 22, 2304563134), i = n(i, v, d, g, m[a + 12], 7, 1804603682), g = n(g, i, v, d, m[a + 13], 12, 4254626195), d = n(d, g, i, v, m[a + 14], 17, 2792965006), v = n(v, d, g, i, m[a + 15], 22, 1236535329), i = o(i, v, d, g, m[a + 1], 5, 4129170786), g = o(g, i, v, d, m[a + 6], 9, 3225465664), d = o(d, g, i, v, m[a + 11], 14, 643717713), v = o(v, d, g, i, m[a + 0], 20, 3921069994), i = o(i, v, d, g, m[a + 5], 5, 3593408605), g = o(g, i, v, d, m[a + 10], 9, 38016083), d = o(d, g, i, v, m[a + 15], 14, 3634488961), v = o(v, d, g, i, m[a + 4], 20, 3889429448), i = o(i, v, d, g, m[a + 9], 5, 568446438), g = o(g, i, v, d, m[a + 14], 9, 3275163606), d = o(d, g, i, v, m[a + 3], 14, 4107603335), v = o(v, d, g, i, m[a + 8], 20, 1163531501), i = o(i, v, d, g, m[a + 13], 5, 2850285829), g = o(g, i, v, d, m[a + 2], 9, 4243563512), d = o(d, g, i, v, m[a + 7], 14, 1735328473), v = o(v, d, g, i, m[a + 12], 20, 2368359562), i = t(i, v, d, g, m[a + 5], 4, 4294588738), g = t(g, i, v, d, m[a + 8], 11, 2272392833), d = t(d, g, i, v, m[a + 11], 16, 1839030562), v = t(v, d, g, i, m[a + 14], 23, 4259657740), i = t(i, v, d, g, m[a + 1], 4, 2763975236), g = t(g, i, v, d, m[a + 4], 11, 1272893353), d = t(d, g, i, v, m[a + 7], 16, 4139469664), v = t(v, d, g, i, m[a + 10], 23, 3200236656), i = t(i, v, d, g, m[a + 13], 4, 681279174), g = t(g, i, v, d, m[a + 0], 11, 3936430074), d = t(d, g, i, v, m[a + 3], 16, 3572445317), v = t(v, d, g, i, m[a + 6], 23, 76029189), i = t(i, v, d, g, m[a + 9], 4, 3654602809), g = t(g, i, v, d, m[a + 12], 11, 3873151461), d = t(d, g, i, v, m[a + 15], 16, 530742520), v = t(v, d, g, i, m[a + 2], 23, 3299628645), i = e(i, v, d, g, m[a + 0], 6, 4096336452), g = e(g, i, v, d, m[a + 7], 10, 1126891415), d = e(d, g, i, v, m[a + 14], 15, 2878612391), v = e(v, d, g, i, m[a + 5], 21, 4237533241), i = e(i, v, d, g, m[a + 12], 6, 1700485571), g = e(g, i, v, d, m[a + 3], 10, 2399980690), d = e(d, g, i, v, m[a + 10], 15, 4293915773), v = e(v, d, g, i, m[a + 1], 21, 2240044497), i = e(i, v, d, g, m[a + 8], 6, 1873313359), g = e(g, i, v, d, m[a + 15], 10, 4264355552), d = e(d, g, i, v, m[a + 6], 15, 2734768916), v = e(v, d, g, i, m[a + 13], 21, 1309151649), i = e(i, v, d, g, m[a + 4], 6, 4149444226), g = e(g, i, v, d, m[a + 11], 10, 3174756917), d = e(d, g, i, v, m[a + 2], 15, 718787259), v = e(v, d, g, i, m[a + 9], 21, 3951481745), i = r(i, f), v = r(v, C), d = r(d, c), g = r(g, h); return (u(i) + u(v) + u(d) + u(g)).toLowerCase() }
async function checkEnv() { if (userCookie) { let e = envSplitor[0]; for (let f of envSplitor) if (userCookie.indexOf(f) > -1) { e = f; break } for (let l of userCookie.split(e)) l && userList.push(new UserInfo(l)); userCount = userList.length } else console.log(`未找到任何账号`); return console.log(`找到 ${userCount}个账号`), !0 }
function popu(e, n = "") {
    e.replace("//", "/").split("/")[1]; let l = {
        url: e, headers: {
            'deviceid': this.i,
            'accept-encoding': `gzip`,
            'Content-Type': `application/x-www-form-urlencoded`,
            'appversion': `3.0.1`,
            'Host': `capi.wewillpro.com`,
            'brand': `xiaomi`,
            'Accept-Language': `zh-Hans-CN;q=1, ja-CN;q=0.9`
        }, timeout: 12e3
    }; return n && (l.body = n, l.headers["Content-Length"] = n?.length || 0), l
} async function httpRequest(e, t) { return result = null, resurq = null, resurp = null, new Promise(n => { $.send(e, t, async (e, t, l) => { try { if (resurq = t, resurp = l, e); else if (l.body) { if ("object" == typeof l.body) result = l.body; else try { result = JSON.parse(l.body) } catch (o) { result = l.body } } } catch (y) { console.log(y) } finally { n() } }) }) }
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
