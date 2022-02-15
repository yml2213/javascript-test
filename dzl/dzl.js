/*
cron "18 8 * * *"

2-15 发布第一版  视频宝箱完成

入口: https://github.com/yml2213/javascript/blob/master/dzl/dzl.jpg

注意事项 ： 一定要仔细阅读一下内容
=============青龙变量格式=============
export yml_dzl_data='xxx@xxx'
xxx :xxx是token 签到,抽奖token相同(感谢全体测试人员);  多账号使用 @ 分割
=============青龙变量实例=============
export yml_dzl_data='eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJVU0VSX0lEIjoiNjg5MDQ0MTYxMzE3NzU4OTc2MS1XRUIiLCJleHAiOjE2NDQ5OTE5NTl9.uZ-6fmExOsAQoqTl7aTpGy-uS38BPEV3RrR89YLVfuc@eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJVU0VSX0lEIjoiNjg5MDQ0MTYxMzE3NzU4OTc2MS1XRUIiLCJleHAiOjE2NDQ5OTQ2MzV9.72rW4JHQ4Y3NhXqp7J1-QMj9BLh1TyaD2AL3wskSLZ0'
=============变量解释==========
签到token: 可以从 关键词 integralSignIn 包里找到
抽奖token: 可以从 关键词 turntable/open 包里找到
=============变量获取==========
懒得写了，自己研究吧
不会的请百度或者群里求助：QQ群：1001401060  tg：https://t.me/yml_tg

*/
const $ = new Env('多走路');
const host = 'api-sport.chenglie.tech';
const notify = $.isNode() ? require('./sendNotify') : '';
let app_dzl_data = [];

// http://api-sport.chenglie.tech/reward/videoNotify


!(async () => {

    if ($.isNode()) {
        //$.isNode()环境执行部分  青龙执行
        if (!process.env.yml_dzl_data) {
            console.log(`\n【${$.name}】：未填写相应变量 yml_dzl_data`);
            return;
        }
        if (process.env.yml_dzl_data && process.env.yml_dzl_data.indexOf('@') > -1) {
            app_yml_dzl_data = process.env.yml_dzl_data.split('@');
            console.log(`您选择的是使用 '@' 分割多账号`)
        } else if (process.env.yml_dzl_data && process.env.yml_dzl_data.indexOf('\n') > -1) {
            app_yml_dzl_data = process.env.env.yml_dzl_data.split('\n');
        } else if (process.env.yml_dzl_data && process.env.yml_dzl_data.indexOf('#') > -1) {
            app_yml_dzl_data = process.env.yml_dzl_data.split('#');
        } else {
            app_yml_dzl_data = process.env.yml_dzl_data.split();
        }
        ;
    }

    console.log(`-------- 共 ${app_yml_dzl_data.length} 个账号 --------`)
    console.log(app_yml_dzl_data);
    console.log(
        `\n\n====== 脚本执行 - 北京时间(UTC+8)：${new Date(
            new Date().getTime() +
            new Date().getTimezoneOffset() * 60 * 1000 +
            8 * 60 * 60 * 1000
        ).toLocaleString()} ======\n`);


    await wyy();

    for (i = 0; i < app_yml_dzl_data.length; i++) {
        $.index = i + 1;
        console.log(`\n----- 开始【第 ${$.index} 个账号】-----`)
        console.log(`这里是分割后:${app_yml_dzl_data}`);
        ApiAuthKey = app_yml_dzl_data[i].split('&');
        body = app_yml_dzl_data[i].split('&');
        time = app_yml_dzl_data[i].split('&');

        console.log(ApiAuthKey[0]);
        console.log(time[1]);
        console.log(body[2]);

        //执行某个板块
        // await test();
        await box();
        await $.wait(2 * 1000);
        // await cj();
        // await $.wait(2 * 1000);


    }

})()
    .catch((e) => $.logErr(e))
    .finally(() => $.done())


//每日网抑云
function wyy(timeout = 3 * 1000) {
    return new Promise((resolve) => {
        let url = {
            url: `https://keai.icu/apiwyy/api`
        }
        $.get(url, async (err, resp, data) => {
            try {
                data = JSON.parse(data)
                $.log(`\n【网抑云时间】: ${data.content}  by--${data.music}`);

            } catch (e) {
                $.logErr(e, resp);
            } finally {
                resolve()
            }
        }, timeout)
    })
}


function test() {

    console.log(app_yml_dzl_data);

}


// 宝箱时间  16分钟  25分钟  15分钟
// http://api-sport.chenglie.tech/reward/videoNotify
// 赚赚页面 最上方宝箱 任务
function box(timeout = 0) {

    return new Promise((resolve) => {
        let url = {
            url: `http://${host}/reward/videoNotify`,
            headers: {
                /*'Content-Type': 'application/json',
                'uuid': '0DAA69F9-39AE-4751-930C-E9E5B86283BA',
                'version': 'v2',
                'channel': 'appStore',
                'idfa': '',
                'ApiAuthKey': ApiAuthKey[0],
                'Host': 'api-sport.chenglie.tech',
                'versionName': '2.1.1',
                'platform': 'ios',
                'token': '3e25bd454d8afddd30f1bacbf1dffa66',
                'versionCode': '4',
                'User-Agent': 'hongbao/2.1.1 (iPhone; iOS 15.3; Scale/3.00)',
                'ApiSourceId': '159005008400',
                'ApiAuthTime': time[1],*/
                'Content-Type': 'application/json',
                'uuid': '0DAA69F9-39AE-4751-930C-E9E5B86283BA',
                'version': 'v2',
                'channel': 'appStore',
                'idfa': '',
                'ApiAuthKey': ApiAuthKey[0],
                'Host': 'api-sport.chenglie.tech',
                'versionName': '2.1.1',
                'platform': 'ios',
                'token': '3e25bd454d8afddd30f1bacbf1dffa66',
                'versionCode': '4',
                'User-Agent': 'hongbao/2.1.1 (iPhone; iOS 15.3; Scale/3.00)',
                'ApiSourceId': '159005008400',
                'ApiAuthTime': time[1]


            },
            // body: body[2],
            // body: JSON.stringify(body[2]),
            // body: body[2],
            body: body[2],



        }
        console.log(url);

        $.post(url, async (err, resp, data) => {

            try {

                console.log(`输出data开始===================`);
                console.log(data);
                console.log(`输出data结束===================`);

                result = JSON.parse(data);
                if (result.data === "126") {
                    $.log(`\n【🎉🎉🎉 恭喜您鸭 🎉🎉🎉】视频宝箱领取: ${result.message} ✅ \n 获得金币 ${result.data} 枚呢! `)
                    await $.wait(3 * 1000)
                } else {
                    $.log(`\n【 哎鸭 】视频宝箱领取: 失败 ❌ 了呢 ,不要灰心! `)
                }
            } catch (e) {
                $.logErr(e, resp);
            } finally {
                resolve()
            }
        }, timeout)

    })
}


//=================================================================固定板块，无需动=========================================================================
function Env(t, e) {
    class s {
        constructor(t) {
            this.env = t
        }

        send(t, e = "GET") {
            t = "string" == typeof t ? {url: t} : t;
            let s = this.get;
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
            this.name = t, this.http = new s(this), this.data = null, this.dataFile = "box.dat", this.logs = [], this.isMute = !1, this.isNeedRewrite = !1, this.logSeparator = "\n", this.encoding = "utf-8", this.startTime = (new Date).getTime(), Object.assign(this, e), this.log("", `\ud83d\udd14${this.name}, \u5f00\u59cb!`)
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

        isShadowrocket() {
            return "undefined" != typeof $rocket
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
            let s = e;
            const i = this.getdata(t);
            if (i) try {
                s = JSON.parse(this.getdata(t))
            } catch {
            }
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
                this.get({url: t}, (t, s, i) => e(i))
            })
        }

        runScript(t, e) {
            return new Promise(s => {
                let i = this.getdata("@chavy_boxjs_userCfgs.httpapi");
                i = i ? i.replace(/\n/g, "").trim() : i;
                let r = this.getdata("@chavy_boxjs_userCfgs.httpapi_timeout");
                r = r ? 1 * r : 20, r = e && e.timeout ? e.timeout : r;
                const [o, h] = i.split("@"), n = {
                    url: `http://${h}/v1/scripting/evaluate`,
                    body: {script_text: t, mock_type: "cron", timeout: r},
                    headers: {"X-Key": o, Accept: "*/*"}
                };
                this.post(n, (t, e, i) => s(i))
            }).catch(t => this.logErr(t))
        }

        loaddata() {
            if (!this.isNode()) return {};
            {
                this.fs = this.fs ? this.fs : require("fs"), this.path = this.path ? this.path : require("path");
                const t = this.path.resolve(this.dataFile), e = this.path.resolve(process.cwd(), this.dataFile),
                    s = this.fs.existsSync(t), i = !s && this.fs.existsSync(e);
                if (!s && !i) return {};
                {
                    const i = s ? t : e;
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
                this.fs = this.fs ? this.fs : require("fs"), this.path = this.path ? this.path : require("path");
                const t = this.path.resolve(this.dataFile), e = this.path.resolve(process.cwd(), this.dataFile),
                    s = this.fs.existsSync(t), i = !s && this.fs.existsSync(e), r = JSON.stringify(this.data);
                s ? this.fs.writeFileSync(t, r) : i ? this.fs.writeFileSync(e, r) : this.fs.writeFileSync(t, r)
            }
        }

        lodash_get(t, e, s) {
            const i = e.replace(/\[(\d+)\]/g, ".$1").split(".");
            let r = t;
            for (const t of i) if (r = Object(r)[t], void 0 === r) return s;
            return r
        }

        lodash_set(t, e, s) {
            return Object(t) !== t ? t : (Array.isArray(e) || (e = e.toString().match(/[^.[\]]+/g) || []), e.slice(0, -1).reduce((t, s, i) => Object(t[s]) === t[s] ? t[s] : t[s] = Math.abs(e[i + 1]) >> 0 == +e[i + 1] ? [] : {}, t)[e[e.length - 1]] = s, t)
        }

        getdata(t) {
            let e = this.getval(t);
            if (/^@/.test(t)) {
                const [, s, i] = /^@(.*?)\.(.*?)$/.exec(t), r = s ? this.getval(s) : "";
                if (r) try {
                    const t = JSON.parse(r);
                    e = t ? this.lodash_get(t, i, "") : e
                } catch (t) {
                    e = ""
                }
            }
            return e
        }

        setdata(t, e) {
            let s = !1;
            if (/^@/.test(e)) {
                const [, i, r] = /^@(.*?)\.(.*?)$/.exec(e), o = this.getval(i),
                    h = i ? "null" === o ? null : o || "{}" : "{}";
                try {
                    const e = JSON.parse(h);
                    this.lodash_set(e, r, t), s = this.setval(JSON.stringify(e), i)
                } catch (e) {
                    const o = {};
                    this.lodash_set(o, r, t), s = this.setval(JSON.stringify(o), i)
                }
            } else s = this.setval(t, e);
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

        get(t, e = (() => {
        })) {
            if (t.headers && (delete t.headers["Content-Type"], delete t.headers["Content-Length"]), this.isSurge() || this.isLoon()) this.isSurge() && this.isNeedRewrite && (t.headers = t.headers || {}, Object.assign(t.headers, {"X-Surge-Skip-Scripting": !1})), $httpClient.get(t, (t, s, i) => {
                !t && s && (s.body = i, s.statusCode = s.status), e(t, s, i)
            }); else if (this.isQuanX()) this.isNeedRewrite && (t.opts = t.opts || {}, Object.assign(t.opts, {hints: !1})), $task.fetch(t).then(t => {
                const {statusCode: s, statusCode: i, headers: r, body: o} = t;
                e(null, {status: s, statusCode: i, headers: r, body: o}, o)
            }, t => e(t)); else if (this.isNode()) {
                let s = require("iconv-lite");
                this.initGotEnv(t), this.got(t).on("redirect", (t, e) => {
                    try {
                        if (t.headers["set-cookie"]) {
                            const s = t.headers["set-cookie"].map(this.cktough.Cookie.parse).toString();
                            s && this.ckjar.setCookieSync(s, null), e.cookieJar = this.ckjar
                        }
                    } catch (t) {
                        this.logErr(t)
                    }
                }).then(t => {
                    const {statusCode: i, statusCode: r, headers: o, rawBody: h} = t;
                    e(null, {status: i, statusCode: r, headers: o, rawBody: h}, s.decode(h, this.encoding))
                }, t => {
                    const {message: i, response: r} = t;
                    e(i, r, r && s.decode(r.rawBody, this.encoding))
                })
            }
        }

        post(t, e = (() => {
        })) {
            const s = t.method ? t.method.toLocaleLowerCase() : "post";
            if (t.body && t.headers && !t.headers["Content-Type"] && (t.headers["Content-Type"] = "application/x-www-form-urlencoded"), t.headers && delete t.headers["Content-Length"], this.isSurge() || this.isLoon()) this.isSurge() && this.isNeedRewrite && (t.headers = t.headers || {}, Object.assign(t.headers, {"X-Surge-Skip-Scripting": !1})), $httpClient[s](t, (t, s, i) => {
                !t && s && (s.body = i, s.statusCode = s.status), e(t, s, i)
            }); else if (this.isQuanX()) t.method = s, this.isNeedRewrite && (t.opts = t.opts || {}, Object.assign(t.opts, {hints: !1})), $task.fetch(t).then(t => {
                const {statusCode: s, statusCode: i, headers: r, body: o} = t;
                e(null, {status: s, statusCode: i, headers: r, body: o}, o)
            }, t => e(t)); else if (this.isNode()) {
                let i = require("iconv-lite");
                this.initGotEnv(t);
                const {url: r, ...o} = t;
                this.got[s](r, o).then(t => {
                    const {statusCode: s, statusCode: r, headers: o, rawBody: h} = t;
                    e(null, {status: s, statusCode: r, headers: o, rawBody: h}, i.decode(h, this.encoding))
                }, t => {
                    const {message: s, response: r} = t;
                    e(s, r, r && i.decode(r.rawBody, this.encoding))
                })
            }
        }

        time(t, e = null) {
            const s = e ? new Date(e) : new Date;
            let i = {
                "M+": s.getMonth() + 1,
                "d+": s.getDate(),
                "H+": s.getHours(),
                "m+": s.getMinutes(),
                "s+": s.getSeconds(),
                "q+": Math.floor((s.getMonth() + 3) / 3),
                S: s.getMilliseconds()
            };
            /(y+)/.test(t) && (t = t.replace(RegExp.$1, (s.getFullYear() + "").substr(4 - RegExp.$1.length)));
            for (let e in i) new RegExp("(" + e + ")").test(t) && (t = t.replace(RegExp.$1, 1 == RegExp.$1.length ? i[e] : ("00" + i[e]).substr(("" + i[e]).length)));
            return t
        }

        msg(e = t, s = "", i = "", r) {
            const o = t => {
                if (!t) return t;
                if ("string" == typeof t) return this.isLoon() ? t : this.isQuanX() ? {"open-url": t} : this.isSurge() ? {url: t} : void 0;
                if ("object" == typeof t) {
                    if (this.isLoon()) {
                        let e = t.openUrl || t.url || t["open-url"], s = t.mediaUrl || t["media-url"];
                        return {openUrl: e, mediaUrl: s}
                    }
                    if (this.isQuanX()) {
                        let e = t["open-url"] || t.url || t.openUrl, s = t["media-url"] || t.mediaUrl;
                        return {"open-url": e, "media-url": s}
                    }
                    if (this.isSurge()) {
                        let e = t.url || t.openUrl || t["open-url"];
                        return {url: e}
                    }
                }
            };
            if (this.isMute || (this.isSurge() || this.isLoon() ? $notification.post(e, s, i, o(r)) : this.isQuanX() && $notify(e, s, i, o(r))), !this.isMuteLog) {
                let t = ["", "==============\ud83d\udce3\u7cfb\u7edf\u901a\u77e5\ud83d\udce3=============="];
                t.push(e), s && t.push(s), i && t.push(i), console.log(t.join("\n")), this.logs = this.logs.concat(t)
            }
        }

        log(...t) {
            t.length > 0 && (this.logs = [...this.logs, ...t]), console.log(t.join(this.logSeparator))
        }

        logErr(t, e) {
            const s = !this.isSurge() && !this.isQuanX() && !this.isLoon();
            s ? this.log("", `\u2757\ufe0f${this.name}, \u9519\u8bef!`, t.stack) : this.log("", `\u2757\ufe0f${this.name}, \u9519\u8bef!`, t)
        }

        wait(t) {
            return new Promise(e => setTimeout(e, t))
        }

        done(t = {}) {
            const e = (new Date).getTime(), s = (e - this.startTime) / 1e3;
            this.log("", `\ud83d\udd14${this.name}, \u7ed3\u675f! \ud83d\udd5b ${s} \u79d2`), this.log(), (this.isSurge() || this.isQuanX() || this.isLoon()) && $done(t)
        }
    }(t, e)
}