/*
cron "18 7 * * *"

*/

const $ = new Env('诸君梦幻盒');
// const host = 'sign.dftoutiao.com';
const notify = $.isNode() ? require('./sendNotify') : '';
// let dfttua = process.env.dfttua;
// let body = process.env.dfttqdbd;

//开始运行
!(async () => {
    await yml();


})()
    .catch((e) => $.logErr(e))
    .finally(() => $.done())


// https://sign2.dftoutiao.com/sign/signv4/new_user_sign
//这里是要执行的代码     ====== 如果有您不需要的  请自行注释  使用 // 注释就行 ========
async function yml() {
    await wyy();

    zhrj();
    zhyx();

    mtxz();
    sdtd();
    yjlm();

    fjdm();
    ohft();
    cshf();

    gfgg();
    qzzq();
    jyjb();

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
}



// 综合软件 签到
function zhrj(timeout = 0) {
    return new Promise((resolve) => {
        let url = {
            url: `http://api.xctd8.com/users/forum.json`,
            headers: {
                'Token': 'e03d3c6003783201',
                'Sign': 'b154ba5c095da7bd8353acb0a7af8eb0',
            },
            body: 'type=signIn&pid=34',
        }
        // console.log(url);

        $.post(url, async (err, resp, data) => {
            try {

                // console.log(`输出data开始===================`);
                // console.log(data);
                // console.log(`输出data结束===================`);

                result = JSON.parse(data);
                if (result.code === 1) {
                    $.log(`\n【🎉🎉🎉 恭喜您鸭 🎉🎉🎉】综合软件:${result.message} ✅ `);
                    await $.wait(5 * 1000);
                } else {
                    $.log(`\n【🎉 恭喜个屁 🎉】执行 综合软件 ,${result.message}`);
                    await $.wait(2 * 1000);

                }
            } catch (e) {
                $.logErr(e, resp);
            } finally {
                resolve()
            }
        }, timeout)

    })

}


// 综合游戏 签到
function zhyx(timeout = 0) {
    return new Promise((resolve) => {
        let url = {
            url: `http://api.xctd8.com/users/forum.json`,
            headers: {
                'Token': 'e03d3c6003783201',
                'Sign': 'a578d6963393a0d72a1c900de5f1f79a',
            },
            body: 'type=signIn&pid=27',
        }
        // console.log(url);

        $.post(url, async (err, resp, data) => {
            try {

                // console.log(`输出data开始===================`);
                // console.log(data);
                // console.log(`输出data结束===================`);

                result = JSON.parse(data);
                if (result.code === 1) {
                    $.log(`\n【🎉🎉🎉 恭喜您鸭 🎉🎉🎉】执行 综合游戏:${result.message} ✅ `);
                    await $.wait(5 * 1000);
                } else {
                    $.log(`\n【🎉 恭喜个屁 🎉】执行 综合游戏 ,${result.message}`);
                    await $.wait(2 * 1000);

                }
            } catch (e) {
                $.logErr(e, resp);
            } finally {
                resolve()
            }
        }, timeout)

    })

}




// 美图写真 签到
function mtxz(timeout = 0) {
    return new Promise((resolve) => {
        let url = {
            url: `http://api.xctd8.com/users/forum.json`,
            headers: {
                'Token': 'e03d3c6003783201',
                'Sign': '4908a1e380e8da9d85442ced5a1f8ca5',
            },
            body: 'type=signIn&pid=22',
        }
        // console.log(url);

        $.post(url, async (err, resp, data) => {
            try {

                // console.log(`输出data开始===================`);
                // console.log(data);
                // console.log(`输出data结束===================`);

                result = JSON.parse(data);
                if (result.code === 1) {
                    $.log(`\n【🎉🎉🎉 恭喜您鸭 🎉🎉🎉】执行 美图cos:${result.message} ✅ `);
                    await $.wait(5 * 1000);
                } else {
                    $.log(`\n【🎉 恭喜个屁 🎉】执行 美图cos ,${result.message}`);
                    await $.wait(2 * 1000);

                }
            } catch (e) {
                $.logErr(e, resp);
            } finally {
                resolve()
            }
        }, timeout)

    })

}

// 沙雕天地 签到
function sdtd(timeout = 0) {
    return new Promise((resolve) => {
        let url = {
            url: `http://api.xctd8.com/users/forum.json`,
            headers: {
                'Token': 'e03d3c6003783201',
                'Sign': '041c2704ff667bb7dbf7cea2304761c0',
            },
            body: 'type=signIn&pid=28',
        }
        // console.log(url);

        $.post(url, async (err, resp, data) => {
            try {

                // console.log(`输出data开始===================`);
                // console.log(data);
                // console.log(`输出data结束===================`);

                result = JSON.parse(data);
                if (result.code === 1) {
                    $.log(`\n【🎉🎉🎉 恭喜您鸭 🎉🎉🎉】执行 沙雕天地:${result.message} ✅ `);
                    await $.wait(5 * 1000);
                } else {
                    $.log(`\n【🎉 恭喜个屁 🎉】执行 沙雕天地,${result.message}`);
                    await $.wait(2 * 1000);

                }
            } catch (e) {
                $.logErr(e, resp);
            } finally {
                resolve()
            }
        }, timeout)

    })

}

// 夜间栏目 签到
function yjlm(timeout = 0) {
    return new Promise((resolve) => {
        let url = {
            url: `http://api.xctd8.com/users/forum.json`,
            headers: {
                'Token': 'e03d3c6003783201',
                'Sign': 'ae6a59074ad14f20f854f3eac466be27',
            },
            body: 'type=signIn&pid=30',
        }
        // console.log(url);

        $.post(url, async (err, resp, data) => {
            try {

                // console.log(`输出data开始===================`);
                // console.log(data);
                // console.log(`输出data结束===================`);

                result = JSON.parse(data);
                if (result.code === 1) {
                    $.log(`\n【🎉🎉🎉 恭喜您鸭 🎉🎉🎉】执行 夜间栏目:${result.message} ✅ `);
                    await $.wait(5 * 1000);
                } else {
                    $.log(`\n【🎉 恭喜个屁 🎉】执行 夜间栏目,${result.message}`);
                    await $.wait(2 * 1000);

                }
            } catch (e) {
                $.logErr(e, resp);
            } finally {
                resolve()
            }
        }, timeout)

    })

}



// 番剧动漫 签到
function fjdm(timeout = 0) {
    return new Promise((resolve) => {
        let url = {
            url: `http://api.xctd8.com/users/forum.json`,
            headers: {
                'Token': 'e03d3c6003783201',
                'Sign': 'a7f8c91f8729761ac10b1fe158be4bd6',
            },
            body: 'type=signIn&pid=32',
        }
        // console.log(url);

        $.post(url, async (err, resp, data) => {
            try {

                // console.log(`输出data开始===================`);
                // console.log(data);
                // console.log(`输出data结束===================`);

                result = JSON.parse(data);
                if (result.code === 1) {
                    $.log(`\n【🎉🎉🎉 恭喜您鸭 🎉🎉🎉】执行 番剧动漫:${result.message} ✅ `);
                    await $.wait(5 * 1000);
                } else {
                    $.log(`\n【🎉 恭喜个屁 🎉】执行 番剧动漫 ,${result.message}`);
                    await $.wait(2 * 1000);

                }
            } catch (e) {
                $.logErr(e, resp);
            } finally {
                resolve()
            }
        }, timeout)

    })

}

// 欧皇附体 签到
function ohft(timeout = 0) {
    return new Promise((resolve) => {
        let url = {
            url: `http://api.xctd8.com/users/forum.json`,
            headers: {
                'Token': 'e03d3c6003783201',
                'Sign': '884907b7487d6f28f3772e100173a302',
            },
            body: 'type=signIn&pid=31',
        }
        // console.log(url);

        $.post(url, async (err, resp, data) => {
            try {

                // console.log(`输出data开始===================`);
                // console.log(data);
                // console.log(`输出data结束===================`);

                result = JSON.parse(data);
                if (result.code === 1) {
                    $.log(`\n【🎉🎉🎉 恭喜您鸭 🎉🎉🎉】执行欧皇附体:${result.message} ✅ `);
                    await $.wait(5 * 1000);
                } else {
                    $.log(`\n【🎉 恭喜个屁 🎉】执行 欧皇附体 ,${result.message}`);
                    await $.wait(2 * 1000);

                }
            } catch (e) {
                $.logErr(e, resp);
            } finally {
                resolve()
            }
        }, timeout)

    })

}

// 吹水混分 签到
function cshf(timeout = 0) {
    return new Promise((resolve) => {
        let url = {
            url: `http://api.xctd8.com/users/forum.json`,
            headers: {
                'Token': 'e03d3c6003783201',
                'Sign': '45c6442d4f7a216b8cb6261d52eb60fd',
            },
            body: 'type=signIn&pid=24',
        }
        // console.log(url);

        $.post(url, async (err, resp, data) => {
            try {

                // console.log(`输出data开始===================`);
                // console.log(data);
                // console.log(`输出data结束===================`);

                result = JSON.parse(data);
                if (result.code === 1) {
                    $.log(`\n【🎉🎉🎉 恭喜您鸭 🎉🎉🎉】执行交友扩列:${result.message} ✅ `);
                    await $.wait(5 * 1000)
                } else {
                    $.log(`\n【🎉 恭喜个屁 🎉】执行 吹水混分 ,${result.message}`);
                    await $.wait(2 * 1000);
                }
            } catch (e) {
                $.logErr(e, resp);
            } finally {
                resolve()
            }
        }, timeout)

    })

}



// 官方公告 签到
function gfgg(timeout = 0) {
    return new Promise((resolve) => {
        let url = {
            url: `http://api.xctd8.com/users/forum.json`,
            headers: {
                'Token': 'e03d3c6003783201',
                'Sign': '3429ed0fec2353bf8fd8ded91ccf8976',
            },
            body: 'type=signIn&pid=23',
        }
        // console.log(url);

        $.post(url, async (err, resp, data) => {
            try {

                // console.log(`输出data开始===================`);
                // console.log(data);
                // console.log(`输出data结束===================`);

                result = JSON.parse(data);
                if (result.code === 1) {
                    $.log(`\n【🎉🎉🎉 恭喜您鸭 🎉🎉🎉】执行交友扩列:${result.message} ✅ `);
                    await $.wait(5 * 1000)
                } else {
                    $.log(`\n【🎉 恭喜个屁 🎉】执行 官方公告 ,${result.message}`);
                    await $.wait(2 * 1000);
                }
            } catch (e) {
                $.logErr(e, resp);
            } finally {
                resolve()
            }
        }, timeout)

    })

}


// 求助专区 签到
function qzzq(timeout = 0) {
    return new Promise((resolve) => {
        let url = {
            url: `http://api.xctd8.com/users/forum.json`,
            headers: {
                'Token': 'e03d3c6003783201',
                'Sign': '2026a26be252af34d4c6737a34b14135',
            },
            body: 'type=signIn&pid=33',
        }
        // console.log(url);

        $.post(url, async (err, resp, data) => {
            try {

                // console.log(`输出data开始===================`);
                // console.log(data);
                // console.log(`输出data结束===================`);

                result = JSON.parse(data);
                if (result.code === 1) {
                    $.log(`\n【🎉🎉🎉 恭喜您鸭 🎉🎉🎉】执行交友扩列:${result.message} ✅ `);
                    await $.wait(5 * 1000)
                } else {
                    $.log(`\n【🎉 恭喜个屁 🎉】执行 求助专区 ,${result.message}`);
                    await $.wait(2 * 1000);
                }
            } catch (e) {
                $.logErr(e, resp);
            } finally {
                resolve()
            }
        }, timeout)

    })

}

// 建议举报 签到
function jyjb(timeout = 0) {
    return new Promise((resolve) => {
        let url = {
            url: `http://api.xctd8.com/users/forum.json`,
            headers: {
                'Token': 'e03d3c6003783201',
                'Sign': '204cc7d5ab171066ac2f722badba4532',
            },
            body: 'type=signIn&pid=35',
        }
        // console.log(url);

        $.post(url, async (err, resp, data) => {
            try {

                // console.log(`输出data开始===================`);
                // console.log(data);
                // console.log(`输出data结束===================`);

                result = JSON.parse(data);
                if (result.code === 1) {
                    $.log(`\n【🎉🎉🎉 恭喜您鸭 🎉🎉🎉】执行交友扩列:${result.message} ✅ `);
                    await $.wait(5 * 1000);
                } else {
                    $.log(`\n【🎉 恭喜个屁 🎉】执行 建议举报 ,${result.message}`);
                    await $.wait(2 * 1000);
                }
            } catch (e) {
                $.logErr(e, resp);
            } finally {
                resolve()
            }
        }, timeout)

    })

}















//固定板块，无需动
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
            this.name = t, this.http = new s(this), this.data = null, this.dataFile = "box.dat", this.logs = [], this.isMute = !1, this.isNeedRewrite = !1, this.logSeparator = "\n", this.startTime = (new Date).getTime(), Object.assign(this, e), this.log("", `🔔${this.name}, 开始!`)
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
            t.headers && (delete t.headers["Content-Type"], delete t.headers["Content-Length"]), this.isSurge() || this.isLoon() ? (this.isSurge() && this.isNeedRewrite && (t.headers = t.headers || {}, Object.assign(t.headers, {"X-Surge-Skip-Scripting": !1})), $httpClient.get(t, (t, s, i) => {
                !t && s && (s.body = i, s.statusCode = s.status), e(t, s, i)
            })) : this.isQuanX() ? (this.isNeedRewrite && (t.opts = t.opts || {}, Object.assign(t.opts, {hints: !1})), $task.fetch(t).then(t => {
                const {statusCode: s, statusCode: i, headers: r, body: o} = t;
                e(null, {status: s, statusCode: i, headers: r, body: o}, o)
            }, t => e(t))) : this.isNode() && (this.initGotEnv(t), this.got(t).on("redirect", (t, e) => {
                try {
                    if (t.headers["set-cookie"]) {
                        const s = t.headers["set-cookie"].map(this.cktough.Cookie.parse).toString();
                        s && this.ckjar.setCookieSync(s, null), e.cookieJar = this.ckjar
                    }
                } catch (t) {
                    this.logErr(t)
                }
            }).then(t => {
                const {statusCode: s, statusCode: i, headers: r, body: o} = t;
                e(null, {status: s, statusCode: i, headers: r, body: o}, o)
            }, t => {
                const {message: s, response: i} = t;
                e(s, i, i && i.body)
            }))
        }

        post(t, e = (() => {
        })) {
            if (t.body && t.headers && !t.headers["Content-Type"] && (t.headers["Content-Type"] = "application/x-www-form-urlencoded"), t.headers && delete t.headers["Content-Length"], this.isSurge() || this.isLoon()) this.isSurge() && this.isNeedRewrite && (t.headers = t.headers || {}, Object.assign(t.headers, {"X-Surge-Skip-Scripting": !1})), $httpClient.post(t, (t, s, i) => {
                !t && s && (s.body = i, s.statusCode = s.status), e(t, s, i)
            }); else if (this.isQuanX()) t.method = "POST", this.isNeedRewrite && (t.opts = t.opts || {}, Object.assign(t.opts, {hints: !1})), $task.fetch(t).then(t => {
                const {statusCode: s, statusCode: i, headers: r, body: o} = t;
                e(null, {status: s, statusCode: i, headers: r, body: o}, o)
            }, t => e(t)); else if (this.isNode()) {
                this.initGotEnv(t);
                const {url: s, ...i} = t;
                this.got.post(s, i).then(t => {
                    const {statusCode: s, statusCode: i, headers: r, body: o} = t;
                    e(null, {status: s, statusCode: i, headers: r, body: o}, o)
                }, t => {
                    const {message: s, response: i} = t;
                    e(s, i, i && i.body)
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
                let t = ["", "==============📣系统通知📣=============="];
                t.push(e), s && t.push(s), i && t.push(i), console.log(t.join("\n")), this.logs = this.logs.concat(t)
            }
        }

        log(...t) {
            t.length > 0 && (this.logs = [...this.logs, ...t]), console.log(t.join(this.logSeparator))
        }

        logErr(t, e) {
            const s = !this.isSurge() && !this.isQuanX() && !this.isLoon();
            s ? this.log("", `❗️${this.name}, 错误!`, t.stack) : this.log("", `❗️${this.name}, 错误!`, t)
        }

        wait(t) {
            return new Promise(e => setTimeout(e, t))
        }

        done(t = {}) {
            const e = (new Date).getTime(), s = (e - this.startTime) / 1e3;
            this.log("", `🔔${this.name}, 结束! 🕛 ${s} 秒`), this.log(), (this.isSurge() || this.isQuanX() || this.isLoon()) && $done(t)
        }
    }(t, e)
}


