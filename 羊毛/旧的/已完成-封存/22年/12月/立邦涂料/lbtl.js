/*
立邦涂装俱乐部  公众号            cron 22 8,12 * * *  lbtl.js

12.15       签到任务  

1. 点击免费注册   注册  邀请码 13754650804
2. 点击获得专区--打卡领福利   抓包即可  （进去后我的积分需要有数据，不然就是没登录）

------------------------  青龙--配置文件-贴心复制区域  ---------------------- 
# 立邦涂料
export lbtl=" Cookie @ Cookie " 

多账号用 换行 或 @ 分割

抓 diyclub.nipponpaint.com.cn  里面的  Cookie   

tg频道: https://t.me/yml2213_tg

*/


//============================== 默认变量区域 ==============================
const $ = new Env("立邦涂料")
const CK_NAME = "lbtl"
const Notify = 1             // 通知控制
let ckFlog = 1               // ck状态
let msg = ''
//============================== 个人变量区域 ==============================
const Mode = 1               // 1 并发模式 ，0 普通顺序模式
const tgFlog = 1             // 是否tg脚本, 1 - tg脚本，将会tg单独发送通知； 0 - 正常脚本

//------------------------------------------------------------------------

// 这里写登录或者用户信息，   用来做判断账号是否失效的， 失效直接不进行下面的任务 
async function user_Info(userInfo) {
    await userInfo.dosign()
}

// 这里是任务相关的， 直接全部写这里
async function task_Info(userInfo) {
    // await userInfo.signInfo()

}

// 这里是查询余额 积分 个人信息 的地方
async function check_Info(userInfo) {
    // await userInfo.getUserInfo()
    //  await userInfo.Sendtg_bot()  // 这个是tg 机器人发送通知， 调试可以注释掉 
}

class UserInfo {
    constructor(index, str) {
        this.user_log = `${$.name}\n`
        this.index = index + 1
        this.idx = `账号 [${this.index}] `

        try {
            if (str.indexOf("##") > -1) {
                this.chatId = str.split("##")[1]
            }

            this.Cookie = str.split("##")[0]

        } catch (error) {
            console.log(error)
        }

    }



    async getDate() {
        let name = "获取签到所需数据"
        let options = {
            method: "get",
            url: `https://diyclub.nipponpaint.com.cn/wxdc/signIn/signInHome3`,
            headers: {
                'Upgrade-Insecure-Requests': '1',
                'X-Requested-With': 'com.tencent.mm',
                'Sec-Fetch-User': '?1',
                'Cookie': this.Cookie,
            }
        }
        // console.log(options)

        let res = await httpRequest(options)
        // console.log(res)
        let data = res.split('" id="formToken"')[0].split('id="tips">')[1].split('value="')[1]
        this.myIntegral = res.split('<h2 class="credit">')[1].split('</h2>')[0]
        return data
    }

    async dosign() {
        let name = "签到"
        let date = await this.getDate()
        let options = {
            method: "post",
            url: `https://diyclub.nipponpaint.com.cn/wxdc/signIn/signInViewType1Comfirm`,
            headers: {
                'X-Requested-With': 'XMLHttpRequest',
                'Cookie': this.Cookie,
                'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'
            },
            form: {
                'formToken': date
            }
        }
        // console.log(options)

        let res = await httpRequest(options)
        // console.log(res)
        await this.getDate()
        if (res.point) {
            this.cusLog(`${this.idx} ${name}:  ok, 获得 ${res.point} 积分, 总积分 ${this.myIntegral}`)
        } else if (res.success == 0) {
            this.cusLog(`${this.idx} ${name}:  ${res.errorMsg}, 总积分 ${this.myIntegral}`)
        } else this.cusLog(`${this.idx}  ${name} 失败 ❌ 了呢`), console.log(res)
    }




    async getUserInfo() {
        let name = "查询余额"
        let options = {
            method: "get",
            url: `https://www.lbtlbaoxian.com/insurmarket/member/homepage?maState=${this.maState}&channelId=qiye_wx-huiyuantixi-push&sourceapp=wechat_miniprogram`,
            headers: {
                'Host': 'www.lbtlbaoxian.com',
                'charset': 'utf-8',
                'User-Agent': 'Mozilla/5.0 (Linux; Android 12; M2102J2SC Build/SKQ1.211006.001; wv) AppleWebKit/537.36 (KHTML, like Gecko) Version/4.0 Chrome/86.0.4240.99 XWEB/4375 MMWEBSDK/20220903 Mobile Safari/537.36 MMWEBID/8801 MicroMessenger/8.0.28.2240(0x28001C57) WeChat/arm64 Weixin NetType/WIFI Language/zh_CN ABI/arm64 MiniProgramEnv/android',
                'Referer': 'https://servicewechat.com/wxdde36ae788f0bd5c/86/page-frame.html',
                'Content-Type': 'application/json'
            },

        }
        // console.log(options)

        let res = await httpRequest(options)
        // console.log(res)

        if (res.resultCode == '000000') {
            this.cusLog(`${this.idx} ${name}:  ${res.resultMsg}, 金币:${res.bean.memberBaseInfo.goldBalance}`)
            // 成功返回ck状态 成功
        } else this.cusLog(`${this.idx}  ${name} 失败 ❌ 了呢`), console.log(res)

    }





    async Sendtg_bot() {
        if (tgFlog) {
            const TelegramBot = require('node-telegram-bot-api')
            const tg_token = process.env.tg_token
            // console.log(tg_token);
            let bot = new TelegramBot(tg_token)
            let msg = this.user_log
            // console.log(`=================`);
            // console.log(this.chatId, msg);
            await bot.sendMessage(this.chatId, msg)
        }
    }


    cusLog(a) {
        if (tgFlog) {
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

    if (Mode) {  // 并发模式
        $.doubleLog(`----------------- 签到 -----------------\n`)
        list = []
        users.forEach(async element => {
            list.push(user_Info(element))
        })
        await Promise.all(list)

        // $.doubleLog(`----------------- 任务 -----------------\n`)
        list = []
        if (ckFlog) {
            users.forEach(async element => {
                list.push(task_Info(element))
            })
            await Promise.all(list)
        }

        // $.doubleLog(`----------------- 查询 -----------------\n`)
        list = []
        if (ckFlog) {
            users.forEach(async element => {
                list.push(check_Info(element))
            })
            await Promise.all(list)
        }


    } else {  // 顺序模式 
        users.forEach(async element => {
            list.push(user_Info(element))

            if (ckFlog) {
                list.push(task_Info(element))

                list.push(check_Info(element))
            }
        })
    }

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
        $.doubleLog("未找到CK")
    }
    $.doubleLog(`共找到${userCount}个账号`), !0
    return userList
}

async function httpRequest(options, type = false) {
    return new Promise((resolve) => {
        try {
            $.send(options, async (err, res_body, res_format, res) => {
                if (err) {
                    console.log(`错误, 检查点--2`); return
                }
                if (!type) {
                    resolve(res_body)
                } resolve(res_format)
            })
        } catch (error) {
            console.log(error)
        }

    })
}







// ============================================================================================================================



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
                this.request(options, function (error, response) {
                    if (error) throw new Error(error)
                    let res_body = response.body
                    let res = response
                    let res_format = ''
                    try {
                        if (typeof res_body == "string") {
                            if ($.isJsonStr(res_body)) {
                                res_body = JSON.parse(res_body)
                                res_format = $.formatJson(response.body)
                                e(null, res_body, res_format, res)
                            } else e(null, res_body, res_format, res)
                        } else e(null, res_body, res_format, res)
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
            return new Promise((resolve) => {
                var options = {
                    method: "GET",
                    url: "https://v1.hitokoto.cn/",
                    headers: {},
                }
                this.request(options, function (error, response) {
                    let data = JSON.parse(response.body)
                    let data_ = `[一言]: ${data.hitokoto}  by--${data.from}`
                    resolve(data_)
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

