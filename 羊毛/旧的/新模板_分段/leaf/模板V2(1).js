/*
酷狗音乐

*/
const $ = new Env("酷狗音乐");

const envSplitor = ['\n', '&', '@']; //支持多种分割
const ckNames = ['elmCookie', 'elmck']; //支持多变量

let userCookieList = ckNames.map(x => ($.isNode() ? process.env[x] : $.getdata(x)) || '');

let userList = [];
let userIdx = 0;
let userCount = 0;

const defaultContentType = 'application/json;charset=utf-8';
const defaultUA = 'Mozilla/5.0 (Linux; Android 9; MI 8 Build/PQ3A.190801.002; wv) AppleWebKit/537.36 (KHTML, like Gecko) Version/4.0 Chrome/89.0.4389.72 KugouBrowser/6.2 TBS/046010 Mobile Safari/537.36 GDTTangramMobSDK/8.455.2731 GDTMobSDK/8.455.2731';
const Referer = 'https://h5.kugou.com/';
const Origin = 'https://h5.kugou.com';
///////////////////////////////////////////////////////////////////
class UserInfo {
    constructor(str) {
        this.index = ++userIdx;
        this.name = this.index;
        this.valid = false;

        Object.assign(this, $.str2json(str));
    }

    async taskApi(paramIn = {}) {
        let paramOut = {};
        try {
            let host = paramIn.url.replace('//', '/').split('/')[1];
            let url = paramIn.url;
            if (paramIn.queryParam) url += '?' + $.json2str(paramIn.queryParam, '&', true);
            let urlObject = {
                url: url,
                headers: {
                    'Host': host,
                    'Connection': 'keep-alive',
                    'User-Agent': defaultUA,
                    'Referer': Referer,
                    'Origin': Origin,
                },
                timeout: 5000,
            };
            if (paramIn.body) {
                urlObject.headers['Content-Type'] = paramIn['Content-Type'] || defaultContentType;
                if (typeof paramIn.body === 'object') {
                    if (urlObject.headers['Content-Type'].includes('json')) {
                        urlObject.body = JSON.stringify(paramIn.body);
                    } else {
                        for (let key in paramIn.body) {
                            if (typeof paramIn.body[key] === 'object') {
                                paramIn.body[key] = JSON.stringify(paramIn.body[key]);
                            }
                        }
                        urlObject.body = $.json2str(paramIn.body, '&');
                    }
                } else {
                    urlObject.body = paramIn.body;
                }
                if ($.isNode()) {
                    urlObject.headers['Content-Length'] = urlObject.body ? Buffer.byteLength(urlObject.body, 'utf8') : 0;
                } else {
                    urlObject.headers['Content-Length'] = urlObject.body ? urlObject.body.length : 0;
                }
            }
            if (paramIn.urlObjectParam) Object.assign(urlObject, paramIn.urlObjectParam);
            if (paramIn.headerParam) Object.assign(urlObject.headers, paramIn.headerParam);
            if (paramIn.debug) console.log(urlObject);
            paramOut = Object.assign({}, await httpRequest(paramIn.method, urlObject));
            paramOut.statusCode = paramOut?.err?.response?.statusCode || paramOut?.resp?.statusCode;
            if (paramOut.statusCode != 200) {
                console.log(`[${paramIn.fn}]返回[${paramOut.statusCode}]`);
            }
            if (paramOut?.resp?.body) {
                if (typeof paramOut.resp.body === 'object') {
                    paramOut.result = paramOut.resp.body;
                } else {
                    try {
                        paramOut.result = JSON.parse(paramOut.resp.body);
                    } catch (e) {
                        //console.log(`[${paramIn.fn}]没有返回json数据`)
                        paramOut.result = paramOut.resp.body;
                    }
                }
            }
        } catch (e) {
            console.log(e);
        } finally {
            return Promise.resolve(paramOut);
        }
    }

    async getUserInfo() {
        let paramOut = {};
        try {
            let urlParam = {
                fn: 'getUserInfo',
                method: 'get',
                url: `https://gateway.kugou.com/mstc/musicsymbol/v1/user/info`,
            };
            paramOut = Object.assign({}, await this.taskApi(urlParam));
            let result = paramOut.result;
            //console.log(result)
            if (result.errcode == 0) {
                this.valid = true;
                this.name = result.data.base.nickname;
                this.coin = result.data.account.balance_coins;
                console.log(`[${this.name}]登录成功，金币：${this.coin}`);
            } else {
                console.log(`查询账户失败: ${result.error}`);
            }
        } catch (e) {
            console.log(e);
        } finally {
            return Promise.resolve(paramOut);
        }
    }

    async userTask() {
        let paramOut = {};
        try {
            console.log(`\n============= 账号[${this.index}] =============`);
            await this.getUserInfo();
            if (!this.valid) return Promise.resolve(paramOut);

        } catch (e) {
            console.log(e);
        } finally {
            return Promise.resolve(paramOut);
        }
    }
}

!(async () => {
    if (typeof $request !== "undefined") {
        await GetRewrite();
        return;
    }

    if (!checkEnv()) return;

    for (let user of userList) {
        await user.userTask();
    }
})()
    .catch((e) => console.log(e))
    .finally(() => $.done());

///////////////////////////////////////////////////////////////////
async function GetRewrite() {
    if ($request.url.includes(`v1/app/userAppInfo`)) {
        try {
            let id = $request.url.match(/v1\/app\/userAppInfo\/(\w+)/)[1];
            let auth = $request.headers.Authorization.match(/Bearer (\w+)/)[1];
            let ck = id + '#' + auth;

            let isFound = false;
            for (let ckName of ckNames) {
                let userCookie = ($.isNode() ? process.env[ckName] : $.getdata(ckName)) || '';
                let splitor = envSplitor[0];
                for (let sp of envSplitor) {
                    if (userCookie?.includes(sp)) {
                        splitor = sp;
                        break;
                    }
                }

                if (userCookie?.includes(id)) {
                    let ckList = userCookie.split(splitor);
                    for (let idx in ckList) {
                        console.log(idx);
                        if (ckList[idx]?.includes(id)) {
                            ckList[idx] = ck;
                            $.msg(`更新第${Number(idx) + 1}个账户CK成功，保存到变量[${ckName}]: ${ck}`);
                            isFound = true;
                            break;
                        }
                    }
                    userCookie = ckList.join(splitor);
                    $.setdata(userCookie, ckName);
                }
            }

            if (!isFound) {
                //默认保存到第一个变量里
                let ckName = ckNames[0];
                let userCookie = ($.isNode() ? process.env[ckName] : $.getdata(ckName)) || '';
                let splitor = envSplitor[0];
                for (let sp of envSplitor) {
                    if (userCookie?.includes(sp)) {
                        splitor = sp;
                        break;
                    }
                }

                let ckList = userCookie ? userCookie.split(splitor) : [];
                ckList.push(ck);
                userCookie = ckList.join(splitor);
                $.setdata(userCookie, ckName);
                $.msg(`获取第${ckList.length}个账户CK成功，保存到变量[${ckName}]: ${ck}`);
            }
        } catch (e) {
            console.log(e);
        }
    }
}

function checkEnv() {
    for (let userCookie of userCookieList) {
        if (!userCookie) continue;
        let splitor = envSplitor[0];
        for (let sp of envSplitor) {
            if (userCookie.includes(sp)) {
                splitor = sp;
                break;
            }
        }
        for (let userCookies of userCookie.split(splitor).filter(x => !!x)) {
            userList.push(new UserInfo(userCookies));
        }
    }
    userCount = userList.length;

    if (!userCount) {
        console.log(`未找到CK，请检查变量${ckNames.join('或')}`);
        return false;
    }

    console.log(`共找到${userCount}个账号`);
    return true;
}
////////////////////////////////////////////////////////////////////
async function httpRequest(method, url) {
    return new Promise((resolve) => {
        $.send(method, url, async (err, req, resp) => {
            resolve({ err, req, resp });
        });
    });
}
////////////////////////////////////////////////////////////////////
function Env(name, env) {
    "undefined" != typeof process && JSON.stringify(process.env).indexOf("GITHUB") > -1 && process.exit(0);
    return new class {
        constructor(name, env) {
            this.name = name;
            this.notifyStr = '';
            this.notifyFlag = false;
            this.startTime = (new Date).getTime();
            Object.assign(this, env);
            console.log(`${this.name} 开始运行：\n`);
        }
        isNode() {
            return "undefined" != typeof module && !!module.exports;
        }
        isQuanX() {
            return "undefined" != typeof $task;
        }
        isSurge() {
            return "undefined" != typeof $httpClient && "undefined" == typeof $loon;
        }
        isLoon() {
            return "undefined" != typeof $loon;
        }
        getdata(t) {
            let e = this.getval(t);
            if (/^@/.test(t)) {
                const [, s, i] = /^@(.*?)\.(.*?)$/.exec(t),
                    r = s ? this.getval(s) : "";
                if (r)
                    try {
                        const t = JSON.parse(r);
                        e = t ? this.lodash_get(t, i, "") : e;
                    } catch (t) {
                        e = "";
                    }
            }
            return e;
        }
        setdata(t, e) {
            let s = !1;
            if (/^@/.test(e)) {
                const [, i, r] = /^@(.*?)\.(.*?)$/.exec(e),
                    o = this.getval(i),
                    h = i ? "null" === o ? null : o || "{}" : "{}";
                try {
                    const e = JSON.parse(h);
                    this.lodash_set(e, r, t),
                        s = this.setval(JSON.stringify(e), i);
                } catch (e) {
                    const o = {};
                    this.lodash_set(o, r, t),
                        s = this.setval(JSON.stringify(o), i);
                }
            }
            else {
                s = this.setval(t, e);
            }
            return s;
        }
        getval(t) {
            return this.isSurge() || this.isLoon() ? $persistentStore.read(t) : this.isQuanX() ? $prefs.valueForKey(t) : this.isNode() ? (this.data = this.loaddata(), this.data[t]) : this.data && this.data[t] || null;
        }
        setval(t, e) {
            return this.isSurge() || this.isLoon() ? $persistentStore.write(t, e) : this.isQuanX() ? $prefs.setValueForKey(t, e) : this.isNode() ? (this.data = this.loaddata(), this.data[e] = t, this.writedata(), !0) : this.data && this.data[e] || null;
        }
        send(m, t, e = (() => { })) {
            if (m != 'get' && m != 'post' && m != 'put' && m != 'delete') {
                console.log(`无效的http方法：${m}`);
                return;
            }
            if (m == 'get' && t.headers) {
                delete t.headers["Content-Type"];
                delete t.headers["Content-Length"];
            } else if (t.body && t.headers) {
                if (!t.headers["Content-Type"]) t.headers["Content-Type"] = "application/x-www-form-urlencoded";
            }
            if (this.isSurge() || this.isLoon()) {
                if (this.isSurge() && this.isNeedRewrite) {
                    t.headers = t.headers || {};
                    Object.assign(t.headers, { "X-Surge-Skip-Scripting": !1 });
                }
                let conf = {
                    method: m,
                    url: t.url,
                    headers: t.headers,
                    timeout: t.timeout,
                    data: t.body
                };
                if (m == 'get') delete conf.data;
                $axios(conf).then(t => {
                    const {
                        status: i,
                        request: q,
                        headers: r,
                        data: o
                    } = t;
                    e(null, q, {
                        statusCode: i,
                        headers: r,
                        body: o
                    });
                }).catch(err => console.log(err));
            } else if (this.isQuanX()) {
                t.method = m.toUpperCase(), this.isNeedRewrite && (t.opts = t.opts || {}, Object.assign(t.opts, {
                    hints: !1
                })),
                    $task.fetch(t).then(t => {
                        const {
                            statusCode: i,
                            request: q,
                            headers: r,
                            body: o
                        } = t;
                        e(null, q, {
                            statusCode: i,
                            headers: r,
                            body: o
                        });
                    }, t => e(t));
            } else if (this.isNode()) {
                this.got = this.got ? this.got : require("got");
                const {
                    url: s,
                    ...i
                } = t;
                this.instance = this.got.extend({
                    followRedirect: false
                });
                this.instance[m](s, i).then(t => {
                    const {
                        statusCode: i,
                        request: q,
                        headers: r,
                        body: o
                    } = t;
                    e(null, q, {
                        statusCode: i,
                        headers: r,
                        body: o
                    });
                }, t => {
                    const {
                        message: s,
                        request: q,
                        response: i
                    } = t;
                    e(s, q, i);
                });
            }
        }
        time(t, x = null) {
            let xt = x ? new Date(x) : new Date;
            let e = {
                "M+": xt.getMonth() + 1,
                "d+": xt.getDate(),
                "h+": xt.getHours(),
                "m+": xt.getMinutes(),
                "s+": xt.getSeconds(),
                "q+": Math.floor((xt.getMonth() + 3) / 3),
                S: this.padStr(xt.getMilliseconds(), 3)
            };
            /(y+)/.test(t) && (t = t.replace(RegExp.$1, (xt.getFullYear() + "").substr(4 - RegExp.$1.length)));
            for (let s in e)
                new RegExp("(" + s + ")").test(t) && (t = t.replace(RegExp.$1, 1 == RegExp.$1.length ? e[s] : ("00" + e[s]).substr(("" + e[s]).length)));
            return t;
        }
        async showmsg() {
            if (!this.notifyFlag) return;
            if (!this.notifyStr) return;
            let notifyBody = this.name + " 运行通知\n\n" + this.notifyStr;
            if ($.isNode()) {
                var notify = require('./sendNotify');
                console.log('\n============== 推送 ==============');
                await notify.sendNotify(this.name, notifyBody);
            } else {
                this.msg(notifyBody);
            }
        }
        logAndNotify(str, flag = true) {
            if (flag) this.notifyFlag = true;
            console.log(str);
            this.notifyStr += str;
            this.notifyStr += '\n';
        }
        logAndNotifyWithTime(str, flag = true) {
            if (flag) this.notifyFlag = true;
            let t = '[' + this.time('hh:mm:ss.S') + ']' + str;
            console.log(t);
            this.notifyStr += t;
            this.notifyStr += '\n';
        }
        logWithTime(str) {
            console.log('[' + this.time('hh:mm:ss.S') + ']' + str);
        }
        msg(e = t, s = "", i = "", r) {
            const o = t => {
                if (!t)
                    return t;
                if ("string" == typeof t)
                    return this.isLoon() ? t : this.isQuanX() ? {
                        "open-url": t
                    }
                        : this.isSurge() ? {
                            url: t
                        }
                            : void 0;
                if ("object" == typeof t) {
                    if (this.isLoon()) {
                        let e = t.openUrl || t.url || t["open-url"],
                            s = t.mediaUrl || t["media-url"];
                        return {
                            openUrl: e,
                            mediaUrl: s
                        };
                    }
                    if (this.isQuanX()) {
                        let e = t["open-url"] || t.url || t.openUrl,
                            s = t["media-url"] || t.mediaUrl;
                        return {
                            "open-url": e,
                            "media-url": s
                        };
                    }
                    if (this.isSurge()) {
                        let e = t.url || t.openUrl || t["open-url"];
                        return {
                            url: e
                        };
                    }
                }
            };
            this.isMute || (this.isSurge() || this.isLoon() ? $notification.post(e, s, i, o(r)) : this.isQuanX() && $notify(e, s, i, o(r)));
            let h = ["", "============== 系统通知 =============="];
            h.push(e),
                s && h.push(s),
                i && h.push(i),
                console.log(h.join("\n"));
        }
        getMin(a, b) {
            return ((a < b) ? a : b);
        }
        getMax(a, b) {
            return ((a < b) ? b : a);
        }
        padStr(num, length, padding = '0') {
            let numStr = String(num);
            let numPad = (length > numStr.length) ? (length - numStr.length) : 0;
            let retStr = '';
            for (let i = 0; i < numPad; i++) {
                retStr += padding;
            }
            retStr += numStr;
            return retStr;
        }
        json2str(obj, c, encodeUrl = false) {
            let ret = [];
            for (let keys of Object.keys(obj).sort()) {
                let v = obj[keys];
                if (v && encodeUrl) v = encodeURIComponent(v);
                ret.push(keys + '=' + v);
            }
            return ret.join(c);
        }
        str2json(str, decodeUrl = false) {
            let ret = {};
            for (let item of str.split('&')) {
                if (!item) continue;
                let idx = item.indexOf('=');
                if (idx == -1) continue;
                let k = item.substr(0, idx);
                let v = item.substr(idx + 1);
                if (decodeUrl) v = decodeURIComponent(v);
                ret[k] = v;
            }
            return ret;
        }
        randomPattern(pattern, charset = 'abcdef0123456789') {
            let str = '';
            for (let chars of pattern) {
                if (chars == 'x') {
                    str += charset.charAt(Math.floor(Math.random() * charset.length));
                } else if (chars == 'X') {
                    str += charset.charAt(Math.floor(Math.random() * charset.length)).toUpperCase();
                } else {
                    str += chars;
                }
            }
            return str;
        }
        randomString(len, charset = 'abcdef0123456789') {
            let str = '';
            for (let i = 0; i < len; i++) {
                str += charset.charAt(Math.floor(Math.random() * charset.length));
            }
            return str;
        }
        randomList(a) {
            let idx = Math.floor(Math.random() * a.length);
            return a[idx];
        }
        wait(t) {
            return new Promise(e => setTimeout(e, t));
        }
        async done(t = {}) {
            await this.showmsg();
            const e = (new Date).getTime(),
                s = (e - this.startTime) / 1e3;
            console.log(`\n${this.name} 运行结束，共运行了 ${s} 秒！`);
            if (this.isSurge() || this.isQuanX() || this.isLoon()) $done(t);
        }
    }(name, env);
}
