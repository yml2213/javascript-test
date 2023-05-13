/*
臻农通 盘子            cron 22 8,12 * * *  znt.js

http://eguimo.com/mobile/login.html

12.1        自己实名认证后才能跑脚本       

------------------------  青龙--配置文件-贴心复制区域  ---------------------- 
# 臻农通
export znt=" 手机号 # 密码 " 

多账号用 换行 或 @ 分割
tg频道: https://t.me/yml2213_tg  
*/


//============================== 默认变量区域 ==============================
const $ = new Env("臻农通")
const CK_NAME = "znt"
const Notify = 1             // 通知控制
let ckFlog = 1               // ck状态
let msg = ''
//============================== 个人变量区域 ==============================
const Mode = 1               // 1 并发模式 ，0 普通顺序模式
const tgFlog = 0             // 是否tg脚本, 1 - tg脚本，将会tg单独发送通知； 0 - 正常脚本

//------------------------------------------------------------------------

// 这里写登录或者用户信息，   用来做判断账号是否失效的， 失效直接不进行下面的任务 
async function user_Info(userInfo) {
    await userInfo.get_Sessid()
    await userInfo.login()
}

// 这里是任务相关的， 直接全部写这里
async function task_Info(userInfo) {
    await userInfo.doSign()
    // await userInfo.getTaskList()

}

// 这里是查询余额 积分 个人信息 的地方
async function check_Info(userInfo) {
    await userInfo.getUserInfo()
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

            this.ck = str.split('#')
            this.phone = this.ck[0]
            this.pwd = this.ck[1]

        } catch (error) {
            console.log(error)
        }

    }



    async get_Sessid() {
        let name = "获取 Sessid"
        let options = {
            method: "get",
            url: `http://eguimo.com/mobile/login.html`,
            headers: {
                'Proxy-Connection': 'keep-alive',
                'Upgrade-Insecure-Requests': '1',
            },

        }
        // console.log(options)

        let res = await httpRequest_res(options)
        // console.log(res)
        this.cookie = res.headers["set-cookie"][0].split(';')[0]
    }

    async login() {
        let name = "登录"
        let options = {
            method: "post",
            url: `http://eguimo.com/mobile/login.html`,
            headers: {
                'Proxy-Connection': 'keep-alive',
                'Upgrade-Insecure-Requests': '1',
                'Cookie': this.cookie,
                'Content-Type': 'application/x-www-form-urlencoded'
            },
            form: {
                'account': this.phone,
                'password': this.pwd
            }
        }
        // console.log(options)

        let res = await httpRequest(options)
        this.cusLog(`${name}  ${res.split('console.log("')[1].split('");')[0]}`)

    }



    async doSign() {
        let name = "签到"
        let options = {
            method: "post",
            url: `http://eguimo.com/user/qiandao.html`,
            headers: {
                'Proxy-Connection': 'keep-alive',
                'X-Requested-With': 'XMLHttpRequest',
                'Cookie': this.cookie,
            },
            body: ''

        }
        // console.log(options);

        let res = await httpRequest(options)
        // console.log(res)
        if (res.code == 0) {
            this.cusLog(`${this.idx}  ${name}:  ${res.msg}`)
            await $.wait(2)
        } else if (res.code == '002') {
            this.cusLog(`${this.idx}  ${name}:  ${res.msg}`)
        } else this.cusLog(`${this.idx} ${name} 失败 ❌ 了呢`), console.log(res)
    }



    async getUserInfo() {
        let name = "个人信息"
        let options = {
            method: "get",
            url: `http://eguimo.com/user/persons.html`,
            headers: {
                'Proxy-Connection': 'keep-alive',
                'Upgrade-Insecure-Requests': '1',
                'Cookie': this.cookie,
            }
        }
        // console.log(options);

        let res = await httpRequest(options)
        // console.log(res)
        if (res) {
            this.name = res.split('class="bold">')[1].split('</i></')[0]
            this.cash = res.split('我的余额')[0].split('font-weight: bold;">')[1].split('</span>')[0]

            // console.log(this.name, this.cash)
            this.cusLog(`${this.idx}  ${this.name}, ${$.phoneNum(this.phone)}, 总余额 ${this.cash}`)

        } else this.cusLog(`${this.idx} ${name} 失败 ❌ 了呢`), console.log(res)

    }


    getFakeSign() {
        return `${this.randomString(32)}|${randomPattern('XXXXXXXX-XXXX-XXXX-XXXX-XXXXXXXXXXXX')}|${Date.now()}`

        function randomPattern(pattern, charset = 'abcdef0123456789') {
            let str = ''
            for (let chars of pattern) {
                if (chars == 'x') {
                    str += charset.charAt(Math.floor(Math.random() * charset.length))
                } else if (chars == 'X') {
                    str += charset.charAt(Math.floor(Math.random() * charset.length)).toUpperCase()
                } else {
                    str += chars
                }
            }
            return str
        }

    }

    randomString(len, charset = 'abcdef0123456789') {
        let str = ''
        for (let i = 0; i < len; i++) {
            str += charset.charAt(Math.floor(Math.random() * charset.length))
        }
        return str
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




function rsaEncrypt(encryptTxt) {

    var NodeRSA = require('node-rsa')
    var Key = 'MIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEAlm7VVIe3fiKOvNr9JK9R5hq8bQ1oifNg7tsBwaqO6RIhXgLlJSP7bQKdV6Q6JCWk5oUxSgFUoRZoHqYX8D9cbOgYCJXLbRcEiDl6WfLXEL3OPTibgZ55m+jy3nC/mVOi6zBIqIRgxOgXpnbyr/hQGY9jcXS+emWpGR2iTK4mzBVWf5zRHrmTnt4kbVy9AN4qFiow+jMmQ4UZFDSLcnG1RLfeuNnb+Oetxvr2mZ+A9dz7pdL7SXPaux85otHZ++QQf7PXMALfRxZon3NSxM19MrPc/tFo8HWviV04QKDYj/KNPpAMWLdSMJj5pwdz7oRyCZ77I34tONjeCJd9zJn2TwIDAQAB'
    //RSA加密
    let nodersa = new NodeRSA('-----BEGIN PUBLIC KEY-----\n' + Key + '\n-----END PUBLIC KEY-----')
    nodersa.setOptions({ encryptionScheme: 'pkcs1' })
    let decryptText = nodersa.encrypt(encryptTxt, 'base64', 'utf8')
    return decryptText

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
        $.doubleLog(`----------------- 登录 -----------------\n`)
        list = []
        users.forEach(async element => {
            list.push(user_Info(element))
        })
        await Promise.all(list)

        $.doubleLog(`----------------- 任务 -----------------\n`)
        list = []
        if (ckFlog) {
            users.forEach(async element => {
                list.push(task_Info(element))
            })
            await Promise.all(list)
        }

        $.doubleLog(`----------------- 查询 -----------------\n`)
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

async function httpRequest_res(options) {
    return new Promise((resolve) => {
        try {
            $.send(options, async (err, res_body, res_format, res) => {
                if (err) {
                    console.log(`错误, 检查点--4`); return
                }
                resolve(res)

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
