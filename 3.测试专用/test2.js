const $ = new Env("厂拉拉")   // 1.名字改了
const ckName = "cllapp"           // 2. 英文名字改一下
const { log } = console
//-------------------- 一般不动变量区域 -------------------------------------      // 3. 不用管 
const notify = $.isNode() ? require("./sendNotify") : ""
const Notify = 1		 //0为关闭通知,1为打开通知,默认为1
let envSplitor = ["@", "\n"]
let ck = msg = ''
let userCookie = process.env[ckName]
let userList = []
let userIdx = 0
let userCount = 0
const debug = 0
const crypto = require('crypto-js')
//---------------------------------------------------------
function sjdd() {
    return randomInt(9000, 18000)
}
function sjdd1() {
    return randomInt(32000, 39000)
}
function getPunchBase64(num, num2) {
    const valueOf = BigInt(num)
    const valueOf2 = BigInt(num2)
    const str = (valueOf * valueOf2).toString()
    const encodeToString = Buffer.from(str.trim()).toString('base64')
    const encodeToString2 = Buffer.from(encodeToString.trim()).toString('base64')
    return encodeToString2.trim()
}
// 6. 一整个class   就是完整的任务 
class UserInfo {
    constructor(str) { 			// 7. 构造函数  处理变量等    用 this 挂在对象上
        this.index = ++userIdx
        this.userid = str
        this.salt = '3C45FFEF47D7A9655579ADA26B23EBC1'

    }
    async start() {
        try {
            console.log(`\n============= 账号[${this.index}] =============`)
            console.log(`\ud83c\udf7a获取账号信息\ud83c\udf7a`)
            await this.getCustomer()
            await this.getChooseGoods()
            await this.getPunchVersion()
        } catch (e) {
            console.log(e)
        } finally {
        }

    }
    async getCustomer() {
        let r = randomString(32)
        let t = ts13()
        let n = crypto.MD5(`${t}${r}${this.salt}`).toString()
        //let authorization=crypto.MD5(this.userid+this.sjh).toString()
        let urlobj = {
            url: `https://send.api.fiaohi.com.cn/api/Customer/getCustomer`,
            headers: {
                "Host": "send.api.fiaohi.com.cn",
                "zone": "clock",
                "t": t,
                "r": r,
                "n": n,
                "appid": "10002",
                "from": "app",
                "unionid": this.userid,
                "x-ver": "3.4.00",
                'token': '792b9ec5c2d5c8735ba905443db2885f',
                'token-key': 'NzI2ODcxNzQzODk5NjMyMzI=',
                "Content-Type": "application/x-www-form-urlencoded",
                "accept-encoding": "gzip",
                "user-agent": "okhttp/5.0.0-alpha.10"
            },
            body: ``
        }
        let resp = await httpRequest('post', urlobj)
        try {
            if (resp.code == 0) {
                this.name = resp.data.nickname
                this.sjh = resp.data.phone
                this.token = resp.data.token
                this.tokenkey = resp.data.token_key
                console.log(resp)
            }
            else {
                console.log(`账号[${this.name}]：${resp.message}`)
            }
        } catch (e) {
            console.log(e)
        } finally {
        }
    }


    async getChooseGoods() {
        let r = randomString(32)
        let t = ts13()
        let n = crypto.MD5(`${t}${r}A34E956BE902EE436ECE7B4B1F145654`).toString()
        let authorization = crypto.MD5(this.userid + this.sjh).toString()
        let urlobj = {
            url: `https://send.api.fiaohi.com.cn/api/Punch/getChooseGoods`,
            headers: {
                "Host": "send.api.fiaohi.com.cn",
                "zone": "clock",
                "t": t,
                "r": r,
                "n": n,
                "appid": "10002",
                "from": "app",
                "token": this.token,
                "token-key": this.tokenkey,
                "unionid": this.userid,
                "authorization": authorization,
                "x-ver": "2.9.00",
                "x-rqr": this.rqr,
                "Content-Type": "application/x-www-form-urlencoded",
                "accept-encoding": "gzip",
                "user-agent": "okhttp/5.0.0-alpha.10"
            },
            body: ``
        }
        let resp = await httpRequest('post', urlobj)
        try {
            if (resp.code == 0) {
                console.log(`账号[${this.name}]：当前选择商品：${resp.data[0].name}`)
                this.sid = resp.data[0].sign_id
            }
            else {
                console.log(`账号[${this.name}]：${resp.message}`)
            }
        } catch (e) {
            console.log(e)
        } finally {
        }
    }


    async getPunchVersion() {
        let r = randomString(32)
        let t = ts13()
        let n = crypto.MD5(`${t}${r}A34E956BE902EE436ECE7B4B1F145654`).toString()
        let authorization = crypto.MD5(this.userid + this.sjh).toString()
        let urlobj = {
            url: `https://send.api.fiaohi.com.cn/api/v4.Punch/getPunchVersion`,
            headers: {
                "Host": "send.api.fiaohi.com.cn",
                "zone": "clock",
                "t": t,
                "r": r,
                "n": n,
                "appid": "10002",
                "from": "app",
                "token": this.token,
                "token-key": this.tokenkey,
                "unionid": this.userid,
                "authorization": authorization,
                "x-ver": "2.9.00",
                "x-rqr": this.rqr,
                "Content-Type": "application/x-www-form-urlencoded",
                "accept-encoding": "gzip",
                "user-agent": "okhttp/5.0.0-alpha.10"
            },
            body: ``
        }
        let resp = await httpRequest('post', urlobj)
        try {
            if (resp.code == 0) {
                console.log(`账号[${this.name}]：当前选择商品今日完成度：${resp.data[0].finish}`)
                console.log(`账号[${this.name}]：当前选择商品还需打卡：${resp.data[0].less_day}天`)
                for (let i = 0; i < resp.data[0].lists.length; i++) {
                    if (resp.data[0].lists[i].status == 0 | resp.data[0].lists[i].status == 1) {
                        await this.beginPunch(resp.data[0].lists[i].times)
                        await wait(sjdd())  // 等待
                    }
                }
                await this.getPunchVersion1()

            }
            else {
                console.log(`账号[${this.name}]：${resp.message}`)
            }
        } catch (e) {
            console.log(e)
        } finally {
        }
    }
    async getPunchVersion1() {
        let r = randomString(32)
        let t = ts13()
        let n = crypto.MD5(`${t}${r}A34E956BE902EE436ECE7B4B1F145654`).toString()
        let authorization = crypto.MD5(this.userid + this.sjh).toString()
        let urlobj = {
            url: `https://send.api.fiaohi.com.cn/api/v4.Punch/getPunchVersion`,
            headers: {
                "Host": "send.api.fiaohi.com.cn",
                "zone": "clock",
                "t": t,
                "r": r,
                "n": n,
                "appid": "10002",
                "from": "app",
                "token": this.token,
                "token-key": this.tokenkey,
                "unionid": this.userid,
                "authorization": authorization,
                "x-ver": "2.9.00",
                "x-rqr": this.rqr,
                "Content-Type": "application/x-www-form-urlencoded",
                "accept-encoding": "gzip",
                "user-agent": "okhttp/5.0.0-alpha.10"
            },
            body: ``
        }
        let resp = await httpRequest('post', urlobj)
        try {
            if (resp.code == 0) {

                if (resp.data[0].is_finish == 1) {
                    console.log(`账号[${this.name}]：今日打卡任务已完成`)
                }

            }
            else {
                console.log(`账号[${this.name}]：${resp.message}`)
            }
        } catch (e) {
            console.log(e)
        } finally {
        }
    }
    async beginPunch(times) {
        let r = randomString(32)
        let t = ts13()
        let n = crypto.MD5(`${t}${r}A34E956BE902EE436ECE7B4B1F145654`).toString()
        let userid = Buffer.from(this.userid, 'base64').toString('utf-8')
        let sign = crypto.MD5(`customer_id=${userid}mobile=${this.sjh}sign_id=${getPunchBase64(this.sid, 987)}times=${times}timestamp=${t}F6750FEAD59D7CDA3D84F9FCDDA5D611`).toString()
        let ss = sign.substring(2, 24)
        let sin = crypto.SHA1(ss).toString()
        let authorization = crypto.MD5(this.userid + this.sjh).toString()
        let urlobj = {
            url: `https://send.api.fiaohi.com.cn/api/v4.Punch/beginPunch`,
            headers: {
                "Host": "send.api.fiaohi.com.cn",
                "zone": "clock",
                "t": t,
                "r": r,
                "n": n,
                "appid": "10002",
                "from": "app",
                "token": this.token,
                "token-key": this.tokenkey,
                "unionid": this.userid,
                "authorization": authorization,
                "x-ver": "2.9.00",
                "x-rqr": this.rqr,
                "Content-Type": "application/x-www-form-urlencoded",
                "accept-encoding": "gzip",
                "user-agent": "okhttp/5.0.0-alpha.10"
            },
            body: `times=${times}&sign_id=${getPunchBase64(this.sid, 987)}&timestamp=${t}&sin=${sin}`
        }
        let resp = await httpRequest('post', urlobj)
        try {
            if (resp.code == 0) {
                console.log(`账号[${this.name}]：成功获取id`)
                await wait(sjdd1())
                await this.endPunch(resp.data)
            }
            else {
                console.log(`账号[${this.name}]：${resp.message}`)
            }
        } catch (e) {
            console.log(e)
        } finally {
        }
    }
    async endPunch(id) {
        let r = randomString(32)
        let t = ts13()
        let n = crypto.MD5(`${t}${r}A34E956BE902EE436ECE7B4B1F145654`).toString()
        let userid = Buffer.from(this.userid, 'base64').toString('utf-8')
        let sign = crypto.MD5(`customer_id=${userid}mobile=${this.sjh}sign_day_id=${getPunchBase64(id, 654)}sign_id=${getPunchBase64(this.sid, 987)}timestamp=${t}F6750FEAD59D7CDA3D84F9FCDDA5D611`).toString()
        let ss = sign.substring(2, 24)
        let sin = crypto.SHA1(ss).toString()
        let authorization = crypto.MD5(this.userid + this.sjh).toString()
        let urlobj = {
            url: `https://send.api.fiaohi.com.cn/api/v4.Punch/endPunch`,
            headers: {
                "Host": "send.api.fiaohi.com.cn",
                "zone": "clock",
                "t": t,
                "r": r,
                "n": n,
                "appid": "10002",
                "from": "app",
                "token": this.token,
                "token-key": this.tokenkey,
                "unionid": this.userid,
                "authorization": authorization,
                "x-ver": "2.9.00",
                "x-rqr": this.rqr,
                "Content-Type": "application/x-www-form-urlencoded",
                "accept-encoding": "gzip",
                "user-agent": "okhttp/5.0.0-alpha.10"
            },
            body: `sign_day_id=${getPunchBase64(id, 654)}&sign_id=${getPunchBase64(this.sid, 987)}&timestamp=${t}&sin=${sin}`
        }
        let resp = await httpRequest('post', urlobj)
        try {
            if (resp.code == 0) {
                console.log(`账号[${this.name}]：${resp.message}`)
            }
            else {
                console.log(`账号[${this.name}]：${resp.message}`)
            }
        } catch (e) {
            console.log(e)
        } finally {
        }
    }
}
function isJson(obj) {
    return typeof (obj) == "object" && Object.prototype.toString.call(obj).toLowerCase() === "[object object]" && !obj.length
}
async function httpRequest(method, url) {
    return new Promise((resolve) => {
        send1(method, url, async (err, req, resp) => {
            if (debug) {
                log(`\n【debug】=============== 这是  请求 url ===============`)
                log(JSON.stringify(url))
            }
            if (debug) {
                log(
                    `\n\n【debug】===============这是  返回data==============`
                )
                log(JSON.stringify(resp))
            }
            if (isJson(resp) == true) {
                if (resp.statusCode == 200) {
                    let resp = JSON.parse(resp.body)
                    resolve(resp)
                } else {
                    console.log(`请求失败，请检查网络`)
                    let resp = JSON.parse(`{"breturn":999}`)
                    resolve(resp)

                }
            } else {
                let resp = JSON.parse(`{"breturn":999}`)
                resolve(resp)
            }

        })
    })
}
function send1(m, t, e = (() => { })) {
    if (m != 'get' && m != 'post' && m != 'put' && m != 'delete') {
        console.log(`无效的http方法：${m}`)
        return
    }
    if (m == 'get' && t.headers) {
        delete t.headers["Content-Type"]
        delete t.headers["Content-Length"]
    } else if (t.body && t.headers) {
        if (!t.headers["Content-Type"]) t.headers["Content-Type"] = "application/json"
    }
    if (1 == 1) {
        this.got = this.got ? this.got : require("got")
        const {
            url: s,
            ...i
        } = t

        this.instance = this.got.extend({
            followRedirect: false
        })

        this.instance[m](s, i).then(t => {
            const {
                statusCode: i,
                request: q,
                headers: r,
                body: o
            } = t

            e(null, q, {
                statusCode: i,
                headers: r,
                body: o
            })

        },

            t => {
                const {
                    message: s,
                    request: q,
                    response: i
                } = t
                e(s, q, i)

            })
    }
}

function randomString(e) {
    e = e || 32
    var t = "qwertyuiopasdfghjklzxcvbnmQWERTYUIOPASDFGHJKLZXCVBNM0123456789",
        a = t.length,
        n = ""
    for (i = 0; i < e; i++) n += t.charAt(Math.floor(Math.random() * a))
    return n
}
function randomString1(e) {
    e = e || 32
    var t = "0123456789",
        a = t.length,
        n = ""
    for (i = 0; i < e; i++) n += t.charAt(Math.floor(Math.random() * a))
    return n
}
!(async () => {
    if (!(await checkEnv())) return
    for (let user of userList) {
        await user.start()
    }

    await SendMsg(msg)
})()
    .catch((e) => console.log(e))
    .finally(() => $.done())
async function SendMsg(message) {
    if (!message) return

    if (Notify > 0) {
        if ($.isNode()) {
            var notify = require("./sendNotify")
            await notify.sendNotify($.name, message)
        } else {
            $.msg(message)
        }
    } else {
        log(message)
    }
}

function ts13() {
    return Math.round(new Date().getTime()).toString()
}

function randomInt(min, max) {
    return Math.round(Math.random() * (max - min) + min)
}
function randomUUID() {
    return randomPattern('xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx')
}

function randomPattern(pattern, charset = 'abcdef0123456789') {
    let str = ''
    for (let chars of pattern) {
        str += chars == 'x' ? charset.charAt(Math.floor(Math.random() * charset.length)) : chars == 'X' ? charset.charAt(Math.floor(Math.random() * charset.length)).toUpperCase() : chars
    } return str
}

function phone_num(phone_num) {
    if (phone_num.length == 11) {
        let data = phone_num.replace(/(\d{3})\d{4}(\d{4})/, "$1****$2")
        return data
    } else {
        return phone_num
    }
}
//时间差


function wait(n) {
    return new Promise(function (resolve) {
        setTimeout(resolve, n)
    })
}

// 变量检查与处理
async function checkEnv() {
    if (userCookie) {
        // console.log(userCookie);
        let e = envSplitor[0]
        for (let o of envSplitor)
            if (userCookie.indexOf(o) > -1) {
                e = o
                break
            }
        for (let n of userCookie.split(e)) n && userList.push(new UserInfo(n))
        userCount = userList.length
    } else {
        console.log("未找到CK")
        return
    }
    return console.log(`共找到${userCount}个账号`), !0
}
// =========================================== 不懂不要动 =========================================================
function Env(t, e) {
    class s {
        constructor(t) {
            this.env = t
        }
        send(t, e = "GET") {
            t = "string" == typeof t ? {
                url: t
            } : t
            let s = this.get
            return "POST" === e && (s = this.post), new Promise((e, i) => {
                s.call(this, t, (t, s, r) => {
                    t ? i(t) : e(s)
                })
            })
        }
        get(t) {
            return this.send.call(this.env, t)
        }
        post(t) {
            return this.send.call(this.env, t, "POST")
        }
    }
    return new class {
        constructor(t, e) {
            this.name = t, this.http = new s(this), this.data = null, this.dataFile = "box.dat", this.logs = [], this.isMute = !1, this.isNeedRewrite = !1, this.logSeparator = "\n", this.startTime = (new Date).getTime(), Object.assign(this, e), this.log("", `\ud83d\udd14${this.name}, \u5f00\u59cb!`)
        }
        isNode() {
            return "undefined" != typeof module && !!module.exports
        }
        isQuanX() {
            return "undefined" != typeof $task
        }
        isSurge() {
            return "undefined" != typeof $httpClient && "undefined" == typeof $loon
        }
        isLoon() {
            return "undefined" != typeof $loon
        }
        toObj(t, e = null) {
            try {
                return JSON.parse(t)
            } catch {
                return e
            }
        }
        toStr(t, e = null) {
            try {
                return JSON.stringify(t)
            } catch {
                return e
            }
        }
        getjson(t, e) {
            let s = e
            const i = this.getdata(t)
            if (i) try {
                s = JSON.parse(this.getdata(t))
            } catch { }
            return s
        }
        setjson(t, e) {
            try {
                return this.setdata(JSON.stringify(t), e)
            } catch {
                return !1
            }
        }
        getScript(t) {
            return new Promise(e => {
                this.get({
                    url: t
                }, (t, s, i) => e(i))
            })
        }
        runScript(t, e) {
            return new Promise(s => {
                let i = this.getdata("@chavy_boxjs_userCfgs.httpapi")
                i = i ? i.replace(/\n/g, "").trim() : i
                let r = this.getdata("@chavy_boxjs_userCfgs.httpapi_timeout")
                r = r ? 1 * r : 20, r = e && e.timeout ? e.timeout : r
                const [o, h] = i.split("@"), a = {
                    url: `http://${h}/v1/scripting/evaluate`,
                    body: {
                        script_text: t,
                        mock_type: "cron",
                        timeout: r
                    },
                    headers: {
                        "X-Key": o,
                        Accept: "*/*"
                    }
                }
                this.post(a, (t, e, i) => s(i))
            }).catch(t => this.logErr(t))
        }
        loaddata() {
            if (!this.isNode()) return {}; {
                this.fs = this.fs ? this.fs : require("fs"), this.path = this.path ? this.path : require("path")
                const t = this.path.resolve(this.dataFile),
                    e = this.path.resolve(process.cwd(), this.dataFile),
                    s = this.fs.existsSync(t),
                    i = !s && this.fs.existsSync(e)
                if (!s && !i) return {}; {
                    const i = s ? t : e
                    try {
                        return JSON.parse(this.fs.readFileSync(i))
                    } catch (t) {
                        return {}
                    }
                }
            }
        }
        writedata() {
            if (this.isNode()) {
                this.fs = this.fs ? this.fs : require("fs"), this.path = this.path ? this.path : require("path")
                const t = this.path.resolve(this.dataFile),
                    e = this.path.resolve(process.cwd(), this.dataFile),
                    s = this.fs.existsSync(t),
                    i = !s && this.fs.existsSync(e),
                    r = JSON.stringify(this.data)
                s ? this.fs.writeFileSync(t, r) : i ? this.fs.writeFileSync(e, r) : this.fs.writeFileSync(t, r)
            }
        }
        lodash_get(t, e, s) {
            const i = e.replace(/\[(\d+)\]/g, ".$1").split(".")
            let r = t
            for (const t of i)
                if (r = Object(r)[t], void 0 === r) return s
            return r
        }
        lodash_set(t, e, s) {
            return Object(t) !== t ? t : (Array.isArray(e) || (e = e.toString().match(/[^.[\]]+/g) || []), e.slice(0, -1).reduce((t, s, i) => Object(t[s]) === t[s] ? t[s] : t[s] = Math.abs(e[i + 1]) >> 0 == +e[i + 1] ? [] : {}, t)[e[e.length - 1]] = s, t)
        }
        getdata(t) {
            let e = this.getval(t)
            if (/^@/.test(t)) {
                const [, s, i] = /^@(.*?)\.(.*?)$/.exec(t), r = s ? this.getval(s) : ""
                if (r) try {
                    const t = JSON.parse(r)
                    e = t ? this.lodash_get(t, i, "") : e
                } catch (t) {
                    e = ""
                }
            }
            return e
        }
        setdata(t, e) {
            let s = !1
            if (/^@/.test(e)) {
                const [, i, r] = /^@(.*?)\.(.*?)$/.exec(e), o = this.getval(i), h = i ? "null" === o ? null : o || "{}" : "{}"
                try {
                    const e = JSON.parse(h)
                    this.lodash_set(e, r, t), s = this.setval(JSON.stringify(e), i)
                } catch (e) {
                    const o = {}
                    this.lodash_set(o, r, t), s = this.setval(JSON.stringify(o), i)
                }
            } else s = this.setval(t, e)
            return s
        }
        getval(t) {
            return this.isSurge() || this.isLoon() ? $persistentStore.read(t) : this.isQuanX() ? $prefs.valueForKey(t) : this.isNode() ? (this.data = this.loaddata(), this.data[t]) : this.data && this.data[t] || null
        }
        setval(t, e) {
            return this.isSurge() || this.isLoon() ? $persistentStore.write(t, e) : this.isQuanX() ? $prefs.setValueForKey(t, e) : this.isNode() ? (this.data = this.loaddata(), this.data[e] = t, this.writedata(), !0) : this.data && this.data[e] || null
        }
        initGotEnv(t) {
            this.got = this.got ? this.got : require("got"), this.cktough = this.cktough ? this.cktough : require("tough-cookie"), this.ckjar = this.ckjar ? this.ckjar : new this.cktough.CookieJar, t && (t.headers = t.headers ? t.headers : {}, void 0 === t.headers.Cookie && void 0 === t.cookieJar && (t.cookieJar = this.ckjar))
        }
        get(t, e = (() => { })) {
            t.headers && (delete t.headers["Content-Type"], delete t.headers["Content-Length"]), this.isSurge() || this.isLoon() ? (this.isSurge() && this.isNeedRewrite && (t.headers = t.headers || {}, Object.assign(t.headers, {
                "X-Surge-Skip-Scripting": !1
            })), $httpClient.get(t, (t, s, i) => {
                !t && s && (s.body = i, s.statusCode = s.status), e(t, s, i)
            })) : this.isQuanX() ? (this.isNeedRewrite && (t.opts = t.opts || {}, Object.assign(t.opts, {
                hints: !1
            })), $task.fetch(t).then(t => {
                const {
                    statusCode: s,
                    statusCode: i,
                    headers: r,
                    body: o
                } = t
                e(null, {
                    status: s,
                    statusCode: i,
                    headers: r,
                    body: o
                }, o)
            }, t => e(t))) : this.isNode() && (this.initGotEnv(t), this.got(t).on("redirect", (t, e) => {
                try {
                    if (t.headers["set-cookie"]) {
                        const s = t.headers["set-cookie"].map(this.cktough.Cookie.parse).toString()
                        this.ckjar.setCookieSync(s, null), e.cookieJar = this.ckjar
                    }
                } catch (t) {
                    this.logErr(t)
                }
            }).then(t => {
                const {
                    statusCode: s,
                    statusCode: i,
                    headers: r,
                    body: o
                } = t
                e(null, {
                    status: s,
                    statusCode: i,
                    headers: r,
                    body: o
                }, o)
            }, t => {
                const {
                    message: s,
                    response: i
                } = t
                e(s, i, i && i.body)
            }))
        }
        post(t, e = (() => { })) {
            if (t.body && t.headers && !t.headers["Content-Type"] && (t.headers["Content-Type"] = "application/x-www-form-urlencoded"), t.headers && delete t.headers["Content-Length"], this.isSurge() || this.isLoon()) this.isSurge() && this.isNeedRewrite && (t.headers = t.headers || {}, Object.assign(t.headers, {
                "X-Surge-Skip-Scripting": !1
            })), $httpClient.post(t, (t, s, i) => {
                !t && s && (s.body = i, s.statusCode = s.status), e(t, s, i)
            })
            else if (this.isQuanX()) t.method = "POST", this.isNeedRewrite && (t.opts = t.opts || {}, Object.assign(t.opts, {
                hints: !1
            })), $task.fetch(t).then(t => {
                const {
                    statusCode: s,
                    statusCode: i,
                    headers: r,
                    body: o
                } = t
                e(null, {
                    status: s,
                    statusCode: i,
                    headers: r,
                    body: o
                }, o)
            }, t => e(t))
            else if (this.isNode()) {
                this.initGotEnv(t)
                const {
                    url: s,
                    ...i
                } = t
                this.got.post(s, i).then(t => {
                    const {
                        statusCode: s,
                        statusCode: i,
                        headers: r,
                        body: o
                    } = t
                    e(null, {
                        status: s,
                        statusCode: i,
                        headers: r,
                        body: o
                    }, o)
                }, t => {
                    const {
                        message: s,
                        response: i
                    } = t
                    e(s, i, i && i.body)
                })
            }
        }
        time(t) {
            let e = {
                "M+": (new Date).getMonth() + 1,
                "d+": (new Date).getDate(),
                "H+": (new Date).getHours(),
                "m+": (new Date).getMinutes(),
                "s+": (new Date).getSeconds(),
                "q+": Math.floor(((new Date).getMonth() + 3) / 3),
                S: (new Date).getMilliseconds()
            };
            /(y+)/.test(t) && (t = t.replace(RegExp.$1, ((new Date).getFullYear() + "").substr(4 - RegExp.$1.length)))
            for (let s in e) new RegExp("(" + s + ")").test(t) && (t = t.replace(RegExp.$1, 1 == RegExp.$1.length ? e[s] : ("00" + e[s]).substr(("" + e[s]).length)))
            return t
        }
        msg(e = t, s = "", i = "", r) {
            const o = t => {
                if (!t) return t
                if ("string" == typeof t) return this.isLoon() ? t : this.isQuanX() ? {
                    "open-url": t
                } : this.isSurge() ? {
                    url: t
                } : void 0
                if ("object" == typeof t) {
                    if (this.isLoon()) {
                        let e = t.openUrl || t.url || t["open-url"],
                            s = t.mediaUrl || t["media-url"]
                        return {
                            openUrl: e,
                            mediaUrl: s
                        }
                    }
                    if (this.isQuanX()) {
                        let e = t["open-url"] || t.url || t.openUrl,
                            s = t["media-url"] || t.mediaUrl
                        return {
                            "open-url": e,
                            "media-url": s
                        }
                    }
                    if (this.isSurge()) {
                        let e = t.url || t.openUrl || t["open-url"]
                        return {
                            url: e
                        }
                    }
                }
            }
            this.isMute || (this.isSurge() || this.isLoon() ? $notification.post(e, s, i, o(r)) : this.isQuanX() && $notify(e, s, i, o(r)))
            let h = ["", "==============\ud83d\udce3\u7cfb\u7edf\u901a\u77e5\ud83d\udce3=============="]
            h.push(e), s && h.push(s), i && h.push(i), console.log(h.join("\n")), this.logs = this.logs.concat(h)
        }
        log(...t) {
            t.length > 0 && (this.logs = [...this.logs, ...t]), console.log(t.join(this.logSeparator))
        }
        logErr(t, e) {
            const s = !this.isSurge() && !this.isQuanX() && !this.isLoon()
            s ? this.log("", `\u2757\ufe0f${this.name}, \u9519\u8bef!`, t.stack) : this.log("", `\u2757\ufe0f${this.name}, \u9519\u8bef!`, t)
        }
        wait(t) {
            return new Promise(e => setTimeout(e, t))
        }
        done(t = {}) {
            const e = (new Date).getTime(),
                s = (e - this.startTime) / 1e3
            this.log("", `\ud83d\udd14${this.name}, \u7ed3\u675f! \ud83d\udd5b ${s} \u79d2`), this.log(), (this.isSurge() || this.isQuanX() || this.isLoon()) && $done(t)
        }
    }(t, e)
}