
/*
@随缘撸豆
瑞风汽车 app             cron 22 8,12 * * *  rfqc.js

11.27       完成基本任务

------------------------  青龙--配置文件-贴心复制区域  ---------------------- 
# 瑞风汽车app
export rfqc=" 手机号 # 密码 " 
注意密码不能有@和#这个两个符号！！！！
多账号用 换行 或 @ 分割
tg频道: https://t.me/yml2213_tg  
*/

const $ = new Env("思皓新能源")
const CK_NAME = "rfqc"
const Notify = 1         // 通知控制
const tgLogFlag = 1      // 是否tg发送通知, 偷撸车使用, 默认0--不发送
let msg = ''
//===========================================================================

//===========================================================================

async function main(userInfo) {


    await userInfo.login()

    //  await userInfo.Sendtg_bot()



}


class UserInfo {
    constructor(index, str) {
        this.user_log = `${$.name}\n`
        this.index = index + 1

        if (tgLogFlag) {
            try {
                this.mopenid = str.split("##")[0]
                this.chatId = str.split("##")[1]

                this.ck = str.split('#')
                this.user = this.ck[0]
                this.mima = MD5_Encrypt(`${this.ck[1]}`)
            } catch (error) {
                console.log(error)
            }
        }


    }
    // https://jacsupperapp.jac.com.cn/api/jac-admin/admin/userBaseInformation/userLogin

    async login() {
        let name = "登录"
        let options = {
            method: "post",
            url: `https://jacsupperapp.jac.com.cn/api/jac-admin/admin/userBaseInformation/userLogin`,
            headers: {
                "channelID": "5",
                "Content-Type": "application/json; charset\u003dutf-8",
                "Host": "jacsupperapp.jac.com.cn",
            },
            body: `{"password":"${this.mima}","userCode":"${this.user}"}`
        }
        // console.log(options);

        let resp = await httpRequest(options)
        // console.log(resp);
        if (resp.code == 0) {
            this.cusLog(`账号 ${this.index}  ${name}: 成功  ${resp.msg}`)
            this.token = resp.data.token
            this.no = resp.data.no
            await this.sign(), await this.ft(), await this.pl(), await this.zf()
            await this.grxx()
        } else if (resp.code == 50002) {
            this.cusLog(`账号 ${this.index}  ${name}:   ${resp.msg}`)
        } else this.cusLog(`账号[${this.index}]  ${name} 失败 ❌ 了呢`), console.log(resp)
    }

    async sign() {
        let name = "签到"
        let options = {
            method: "post",
            url: `https://jacsupperapp.jac.com.cn/api/pluto-membership/pluto-membership/integral-gather/addintegral-signIn`,
            headers: {
                "channelID": "5",
                "Content-Type": "application/json; charset\u003dutf-8",
                "Host": "jacsupperapp.jac.com.cn",
                "timaToken": `${this.token}`
            },
            body: `{"ruleStr":"SIGN_IN","serviceTypeStr":"SERVICE_FIXED","no":"${this.no}"}`
        }
        // console.log(options);

        let resp = await httpRequest(options)
        // console.log(resp);
        if (resp.code == 0) {
            this.cusLog(`账号 ${this.index}  ${name}: 获得积分  ${resp.data.integral}`)
        } else if (resp.code == 50002) {
            this.cusLog(`账号 ${this.index}  ${name}:   完成任务  收手吧阿祖！！！`)
        } else this.cusLog(`账号[${this.index}]  ${name} 失败 ❌ 了呢`), console.log(resp)
    }

    async zf() {
        let name = "转发"
        let options = {
            method: "post",
            url: `https://jacsupperapp.jac.com.cn/api/pluto-membership/pluto-membership/integral-gather/addintegral-sharingForwarding`,
            headers: {
                "channelID": "5",
                "Content-Type": "application/json; charset\u003dutf-8",
                "Host": "jacsupperapp.jac.com.cn",
                "timaToken": `${this.token}`
            },
            body: `{"ruleStr":"SHARING_FORWARDING","serviceTypeStr":"SERVICE_FIXED","no":"${this.no}","lid":"","shareflag":""}`
        }
        // console.log(options);

        let resp = await httpRequest(options)
        // console.log(resp);
        if (resp.code == 0) {
            this.cusLog(`账号 ${this.index}  ${name}: 获得积分  ${resp.data}`)
        } else if (resp.code == 50002) {
            this.cusLog(`账号 ${this.index}  ${name}:   完成任务  收手吧阿祖！！！`)
        } else this.cusLog(`账号[${this.index}]  ${name} 失败 ❌ 了呢`), console.log(resp)
    }

    async ft() {
        let name = "发帖"
        let options = {
            method: "post",
            url: `https://jacsupperapp.jac.com.cn/api/pluto-membership/pluto-membership/integral-gather/addpost_website`,
            headers: {
                "channelID": "5",
                "Content-Type": "application/json; charset\u003dutf-8",
                "Host": "jacsupperapp.jac.com.cn",
                "timaToken": `${this.token}`
            },
            body: `{"ruleStr":"POST_WEBSITE","serviceTypeStr":"SERVICE_FIXED","no":""}`
        }
        // console.log(options);

        let resp = await httpRequest(options)
        // console.log(resp);
        if (resp.code == 0) {
            this.cusLog(`账号 ${this.index}  ${name}: 获得积分  ${resp.data}`)
        } else if (resp.code == 50002) {
            this.cusLog(`账号 ${this.index}  ${name}:   完成任务  收手吧阿祖！！！`)
        } else this.cusLog(`账号[${this.index}]  ${name} 失败 ❌ 了呢`), console.log(resp)
    }

    async pl() {
        let name = "评论"
        let options = {
            method: "post",
            url: `https://jacsupperapp.jac.com.cn/api/pluto-membership/pluto-membership/integral-gather/comment`,
            headers: {
                "channelID": "5",
                "Content-Type": "application/json; charset\u003dutf-8",
                "Host": "jacsupperapp.jac.com.cn",
                "timaToken": `${this.token}`
            },
            body: `{"ruleStr":"COMMENT","serviceTypeStr":"SERVICE_FIXED","no":"${this.no}"}`
        }
        // console.log(options);

        let resp = await httpRequest(options)
        // console.log(resp);
        if (resp.code == 0) {
            this.cusLog(`账号 ${this.index}  ${name}: 获得积分  ${resp.data}`)
        } else if (resp.code == 50002) {
            this.cusLog(`账号 ${this.index}  ${name}:   完成任务  收手吧阿祖！！！`)
        } else this.cusLog(`账号[${this.index}]  ${name} 失败 ❌ 了呢`), console.log(resp)
    }
    async grxx() {
        let name = "个人信息"
        let options = {
            method: "post",
            url: `https://jacsupperapp.jac.com.cn/api/pluto-membership/plutomembership/integralCount/searchIntegralCountList`,
            headers: {
                "channelID": "5",
                "Content-Type": "application/json; charset\u003dutf-8",
                "Host": "jacsupperapp.jac.com.cn",
                "timaToken": `${this.token}`
            },
            body: `{"no":"${this.no}"}`
        }
        // console.log(options);

        let resp = await httpRequest(options)
        // console.log(resp);
        if (resp.code == 0) {
            this.cusLog(`账号 ${$.phoneNum(this.user)} 总积分  ${resp.data[0].count}`)
        } else if (resp.code == 50002) {
            this.cusLog(`账号 ${this.index}  ${name}:   完成任务  收手吧阿祖！！！`)
        } else this.cusLog(`账号[${this.index}]  ${name} 失败 ❌ 了呢`), console.log(resp)
    }













    async Sendtg_bot() {
        const TelegramBot = require('node-telegram-bot-api')
        const tg_token = process.env.tg_token
        // console.log(tg_token);
        let bot = new TelegramBot(tg_token)
        let msg = this.user_log
        // console.log(`=================`);
        // console.log(this.chatId, msg);
        await bot.sendMessage(this.chatId, msg)
    }


    cusLog(a) {
        if (tgLogFlag) {
            console.log(`    ${a}`)
            msg += `\n ${a}`
            this.user_log += `\n ${a}`
        } else {
            console.log(`    ${a}`)
            msg += `\n    ${a}`
        }
    }


}





///////////////////////////////////////////////////////////////////

// 入口
!(async () => {
    const notify = require("./sendNotify")
    $.doubleLog(await $.yiyan())
    let users = await getUsers(CK_NAME, async (index, element) => {
        let userInfo = new UserInfo(index, element)
        return userInfo
    })

    list = []
    users.forEach(async element => {
        list.push(main(element))
    })

    await Promise.all(list)

})()
    .catch((e) => console.log(e))
    .finally(() => $.done())


// ==============================================================================
async function getUsers(ckName, fnUserInfo) {
    let userList = []
    let userCookie = process.env[ckName]
    let envSplicer = ["@", "\n", "&"]
    let userCount = 0
    if (userCookie) {
        let e = envSplicer[0]
        for (let o of envSplicer)
            if (userCookie.indexOf(o) > -1) {
                e = o
                break
            }
        let arr = userCookie.split(e)
        for (let index = 0; index < arr.length; index++) {
            const element = arr[index]
            element && userList.push(await fnUserInfo(index, element))
        }
        userCount = userList.length
    } else {
        console.log("未找到CK")
    }
    console.log(`共找到${userCount}个账号`), !0
    return userList
}

async function httpRequest(options, type = false) {
    return new Promise((respolve) => {
        try {
            $.send(options, async (err, resp_body, resp_format, resp) => {
                if (err) {
                    console.log(`错误, 检查点--2`); return
                }
                if (!type) {
                    respolve(resp_body)
                } respolve(resp_format)
            })
        } catch (error) {
            console.log(error)
        }

    })
}







// ============================================================================================================================
function MD5_Encrypt(a) { function b(a, b) { return (a << b) | (a >>> (32 - b)) } function c(a, b) { var c, d, e, f, g; return ((e = 2147483648 & a), (f = 2147483648 & b), (c = 1073741824 & a), (d = 1073741824 & b), (g = (1073741823 & a) + (1073741823 & b)), c & d ? 2147483648 ^ g ^ e ^ f : c | d ? 1073741824 & g ? 3221225472 ^ g ^ e ^ f : 1073741824 ^ g ^ e ^ f : g ^ e ^ f) } function d(a, b, c) { return (a & b) | (~a & c) } function e(a, b, c) { return (a & c) | (b & ~c) } function f(a, b, c) { return a ^ b ^ c } function g(a, b, c) { return b ^ (a | ~c) } function h(a, e, f, g, h, i, j) { return (a = c(a, c(c(d(e, f, g), h), j))), c(b(a, i), e) } function i(a, d, f, g, h, i, j) { return (a = c(a, c(c(e(d, f, g), h), j))), c(b(a, i), d) } function j(a, d, e, g, h, i, j) { return (a = c(a, c(c(f(d, e, g), h), j))), c(b(a, i), d) } function k(a, d, e, f, h, i, j) { return (a = c(a, c(c(g(d, e, f), h), j))), c(b(a, i), d) } function l(a) { for (var b, c = a.length, d = c + 8, e = (d - (d % 64)) / 64, f = 16 * (e + 1), g = new Array(f - 1), h = 0, i = 0; c > i;) (b = (i - (i % 4)) / 4), (h = (i % 4) * 8), (g[b] = g[b] | (a.charCodeAt(i) << h)), i++; return ((b = (i - (i % 4)) / 4), (h = (i % 4) * 8), (g[b] = g[b] | (128 << h)), (g[f - 2] = c << 3), (g[f - 1] = c >>> 29), g) } function m(a) { var b, c, d = "", e = ""; for (c = 0; 3 >= c; c++) (b = (a >>> (8 * c)) & 255), (e = "0" + b.toString(16)), (d += e.substr(e.length - 2, 2)); return d } function n(a) { a = a.replace(/\r\n/g, "\n"); for (var b = "", c = 0; c < a.length; c++) { var d = a.charCodeAt(c); 128 > d ? (b += String.fromCharCode(d)) : d > 127 && 2048 > d ? ((b += String.fromCharCode((d >> 6) | 192)), (b += String.fromCharCode((63 & d) | 128))) : ((b += String.fromCharCode((d >> 12) | 224)), (b += String.fromCharCode(((d >> 6) & 63) | 128)), (b += String.fromCharCode((63 & d) | 128))) } return b } var o, p, q, r, s, t, u, v, w, x = [], y = 7, z = 12, A = 17, B = 22, C = 5, D = 9, E = 14, F = 20, G = 4, H = 11, I = 16, J = 23, K = 6, L = 10, M = 15, N = 21; for (a = n(a), x = l(a), t = 1732584193, u = 4023233417, v = 2562383102, w = 271733878, o = 0; o < x.length; o += 16) (p = t), (q = u), (r = v), (s = w), (t = h(t, u, v, w, x[o + 0], y, 3614090360)), (w = h(w, t, u, v, x[o + 1], z, 3905402710)), (v = h(v, w, t, u, x[o + 2], A, 606105819)), (u = h(u, v, w, t, x[o + 3], B, 3250441966)), (t = h(t, u, v, w, x[o + 4], y, 4118548399)), (w = h(w, t, u, v, x[o + 5], z, 1200080426)), (v = h(v, w, t, u, x[o + 6], A, 2821735955)), (u = h(u, v, w, t, x[o + 7], B, 4249261313)), (t = h(t, u, v, w, x[o + 8], y, 1770035416)), (w = h(w, t, u, v, x[o + 9], z, 2336552879)), (v = h(v, w, t, u, x[o + 10], A, 4294925233)), (u = h(u, v, w, t, x[o + 11], B, 2304563134)), (t = h(t, u, v, w, x[o + 12], y, 1804603682)), (w = h(w, t, u, v, x[o + 13], z, 4254626195)), (v = h(v, w, t, u, x[o + 14], A, 2792965006)), (u = h(u, v, w, t, x[o + 15], B, 1236535329)), (t = i(t, u, v, w, x[o + 1], C, 4129170786)), (w = i(w, t, u, v, x[o + 6], D, 3225465664)), (v = i(v, w, t, u, x[o + 11], E, 643717713)), (u = i(u, v, w, t, x[o + 0], F, 3921069994)), (t = i(t, u, v, w, x[o + 5], C, 3593408605)), (w = i(w, t, u, v, x[o + 10], D, 38016083)), (v = i(v, w, t, u, x[o + 15], E, 3634488961)), (u = i(u, v, w, t, x[o + 4], F, 3889429448)), (t = i(t, u, v, w, x[o + 9], C, 568446438)), (w = i(w, t, u, v, x[o + 14], D, 3275163606)), (v = i(v, w, t, u, x[o + 3], E, 4107603335)), (u = i(u, v, w, t, x[o + 8], F, 1163531501)), (t = i(t, u, v, w, x[o + 13], C, 2850285829)), (w = i(w, t, u, v, x[o + 2], D, 4243563512)), (v = i(v, w, t, u, x[o + 7], E, 1735328473)), (u = i(u, v, w, t, x[o + 12], F, 2368359562)), (t = j(t, u, v, w, x[o + 5], G, 4294588738)), (w = j(w, t, u, v, x[o + 8], H, 2272392833)), (v = j(v, w, t, u, x[o + 11], I, 1839030562)), (u = j(u, v, w, t, x[o + 14], J, 4259657740)), (t = j(t, u, v, w, x[o + 1], G, 2763975236)), (w = j(w, t, u, v, x[o + 4], H, 1272893353)), (v = j(v, w, t, u, x[o + 7], I, 4139469664)), (u = j(u, v, w, t, x[o + 10], J, 3200236656)), (t = j(t, u, v, w, x[o + 13], G, 681279174)), (w = j(w, t, u, v, x[o + 0], H, 3936430074)), (v = j(v, w, t, u, x[o + 3], I, 3572445317)), (u = j(u, v, w, t, x[o + 6], J, 76029189)), (t = j(t, u, v, w, x[o + 9], G, 3654602809)), (w = j(w, t, u, v, x[o + 12], H, 3873151461)), (v = j(v, w, t, u, x[o + 15], I, 530742520)), (u = j(u, v, w, t, x[o + 2], J, 3299628645)), (t = k(t, u, v, w, x[o + 0], K, 4096336452)), (w = k(w, t, u, v, x[o + 7], L, 1126891415)), (v = k(v, w, t, u, x[o + 14], M, 2878612391)), (u = k(u, v, w, t, x[o + 5], N, 4237533241)), (t = k(t, u, v, w, x[o + 12], K, 1700485571)), (w = k(w, t, u, v, x[o + 3], L, 2399980690)), (v = k(v, w, t, u, x[o + 10], M, 4293915773)), (u = k(u, v, w, t, x[o + 1], N, 2240044497)), (t = k(t, u, v, w, x[o + 8], K, 1873313359)), (w = k(w, t, u, v, x[o + 15], L, 4264355552)), (v = k(v, w, t, u, x[o + 6], M, 2734768916)), (u = k(u, v, w, t, x[o + 13], N, 1309151649)), (t = k(t, u, v, w, x[o + 4], K, 4149444226)), (w = k(w, t, u, v, x[o + 11], L, 3174756917)), (v = k(v, w, t, u, x[o + 2], M, 718787259)), (u = k(u, v, w, t, x[o + 9], N, 3951481745)), (t = c(t, p)), (u = c(u, q)), (v = c(v, r)), (w = c(w, s)); var O = m(t) + m(u) + m(v) + m(w); return O.toLowerCase() }
// 新的 env 函数, 增加自定义功能 yml-11.12改   合并
function Env(name, env) {
    "undefined" != typeof process &&
        JSON.stringify(process.env).indexOf("GITHUB") > -1 &&
        process.exit(0)
    return new (class {
        constructor(name, env) {
            this.name = name
            this.notifyStr = ""
            this.notifyFlag = false
            this.startTime = new Date().getTime()
            Object.assign(this, env)
            console.log(`${this.name} 开始运行: \n`)
        }
        isNode() {
            return "undefined" != typeof module && !!module.exports
        }
        send(options, e = () => { }) {
            let m = options.method.toLowerCase()
            let t = options
            if (m != "get" && m != "post" && m != "put" && m != "delete") {
                console.log(`无效的http方法: ${m}`)
                return
            }
            if (m == "get" && t.headers) {
                // delete t.headers["Content-Type"];
                delete t.headers["Content-Length"]
            } else if (t.body && t.headers) {
                if (t.headers["content-type"]) {
                    let tem = t.headers["content-type"]
                    delete t.headers["content-type"]
                    t.headers["Content-Type"] = tem
                } else if (t.body && t.headers) {
                    if (!t.headers["Content-Type"])
                        t.headers["Content-Type"] = "application/x-www-form-urlencoded"
                }
            }
            if (this.isNode()) {
                this.request = this.request ? this.request : require("request")
                this.request(options, function (error, respponse) {
                    if (error) throw new Error(error)
                    let resp_body = respponse.body
                    let resp = respponse
                    try {
                        if (typeof resp_body == "string") {
                            if ($.isJsonStr(resp_body)) {
                                resp_body = JSON.parse(resp_body)
                                let resp_format = $.formatJson(respponse.body)
                                e(null, resp_body, resp_format, resp)
                            } else e(null, resp_body, resp_format, resp)
                        } else e(null, resp_body, resp_format, resp)
                    } catch (error) {
                        console.log(error)
                        let a = `ENV -- request 请求错误, 检查点1\n${error}`
                        e(a, null, null, null)
                    }
                })
            }
        }
        isJsonStr(str) {
            if (typeof str == "string") {
                try {
                    if (typeof JSON.parse(str) == "object") {
                        return true
                    }
                } catch (e) {
                    return false
                }
            }
            return false
        }
        formatJson(value) {
            var json = value
            var i = 0,
                len = 0,
                tab = "    ",
                targetJson = "",
                indentLevel = 0,
                inString = false,
                currentChar = null
            for (i = 0, len = json.length; i < len; i += 1) {
                currentChar = json.charAt(i)
                switch (currentChar) {
                    case "{":
                    case "[":
                        if (!inString) {
                            targetJson += currentChar + "\n" + repeat(tab, indentLevel + 1)
                            indentLevel += 1
                        } else {
                            targetJson += currentChar
                        }
                        break
                    case "}":
                    case "]":
                        if (!inString) {
                            indentLevel -= 1
                            targetJson += "\n" + repeat(tab, indentLevel) + currentChar
                        } else {
                            targetJson += currentChar
                        }
                        break
                    case ",":
                        if (!inString) {
                            targetJson += ",\n" + repeat(tab, indentLevel)
                        } else {
                            targetJson += currentChar
                        }
                        break
                    case ":":
                        if (!inString) {
                            targetJson += ": "
                        } else {
                            targetJson += currentChar
                        }
                        break
                    case " ":
                    case "\n":
                    case "\t":
                        if (inString) {
                            targetJson += currentChar
                        }
                        break
                    case '"':
                        if (i > 0 && json.charAt(i - 1) !== "\\") {
                            inString = !inString
                        }
                        targetJson += currentChar
                        break
                    default:
                        targetJson += currentChar
                        break
                }
            }
            function repeat(s, count) {
                return new Array(count + 1).join(s)
            }
            function repeat(s, count) {
                return new Array(count + 1).join(s)
            }
            return targetJson
        }
        type(str) {
            if (this.strCode(str) > 20) {
                return console.log(`数据类型是: ${typeof str}`)
            }
            return console.log(`${str}数据类型是: ${typeof str}`)
        }
        strCode(str) {
            var count = 0
            if (str) {
                let len = str.length
                for (var i = 0; i < len; i++) {
                    if (str.charCodeAt(i) > 255) {
                        count += 2
                    } else {
                        count++
                    }
                }
                return count
            } else return 0
        }
        async SendMsg(message) {
            if (!message) return
            if (Notify > 0) {
                if ($.isNode()) {
                    var notify = require("./sendNotify")
                    await notify.sendNotify($.name, message)
                } else {
                    console.log($.name, "", message)
                }
            } else {
                console.log(message)
            }
        }
        getMin(a, b) {
            return a < b ? a : b
        }
        getMax(a, b) {
            return a < b ? b : a
        }
        json2str(obj, c, encodeUrl = false) {
            let ret = []
            for (let keys of Object.keys(obj).sort()) {
                let v = obj[keys]
                if (v && encodeUrl) v = encodeURIComponent(v)
                ret.push(keys + "=" + v)
            }
            return ret.join(c)
        }
        str2json(str, decodeUrl = false) {
            let ret = {}
            for (let item of str.split("&")) {
                if (!item) continue
                let idx = item.indexOf("=")
                if (idx == -1) continue
                let k = item.substr(0, idx)
                let v = item.substr(idx + 1)
                if (decodeUrl) v = decodeURIComponent(v)
                ret[k] = v
            }
            return ret
        }
        randomStr(len, up = false, charset = "abcdef0123456789") {
            let str = ""
            for (let i = 0; i < len; i++) {
                str += charset.charAt(Math.floor(Math.random() * charset.length))
            }
            if (!up) {
                return str
            }
            return str.toUpperCase()
        }
        phoneNum(phone_num) {
            if (phone_num.length == 11) {
                let data = phone_num.replace(/(\d{3})\d{4}(\d{4})/, "$1****$2")
                return data
            } else {
                return phone_num
            }
        }
        randomInt(min, max) {
            return Math.round(Math.random() * (max - min) + min)
        }
        async yiyan() {
            this.request = this.request ? this.request : require("request")
            return new Promise((respolve) => {
                var options = {
                    method: "GET",
                    url: "https://v1.hitokoto.cn/",
                    headers: {},
                }
                this.request(options, function (error, respponse) {
                    let data = JSON.parse(respponse.body)
                    let data_ = `[一言]: ${data.hitokoto}  by--${data.from}`
                    respolve(data_)
                })
            })
        }
        wait(t) {
            return new Promise((e) => setTimeout(e, t * 1000))
        }
        ts(type = false, _data = "") {
            let myDate = new Date()
            let a = ""
            switch (type) {
                case 10:
                    a = Math.round(new Date().getTime() / 1000).toString()
                    break
                case 13:
                    a = Math.round(new Date().getTime()).toString()
                    break
                case "h":
                    a = myDate.getHours()
                    break
                case "m":
                    a = myDate.getMinutes()
                    break
                case "y":
                    a = myDate.getFullYear()
                    break
                case "h":
                    a = myDate.getHours()
                    break
                case "mo":
                    a = myDate.getMonth()
                    break
                case "d":
                    a = myDate.getDate()
                    break
                case "ts2Data":
                    if (_data != "") {
                        time = _data
                        if (time.toString().length == 13) {
                            let date = new Date(time + 8 * 3600 * 1000)
                            a = date.toJSON().substr(0, 19).replace("T", " ")
                        } else if (time.toString().length == 10) {
                            time = time * 1000
                            let date = new Date(time + 8 * 3600 * 1000)
                            a = date.toJSON().substr(0, 19).replace("T", " ")
                        }
                    }
                    break
                default:
                    a = "未知错误,请检查"
                    break
            }
            return a
        }
        doubleLog(a) {
            console.log(`    ${a}`)
            msg += `\n    ${a}`
        }
        async done(t = {}) {
            await $.SendMsg(msg)
            const e = new Date().getTime(),
                s = (e - this.startTime) / 1e3
            console.log(`\n${this.name} 运行结束，共运行了 ${s} 秒！`)
        }
    })(name, env)
}
