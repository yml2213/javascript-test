/*
全民消防学习平台              qmxfxxpt.js

-------------------  青龙-配置文件-复制区域  -------------------
# 全民消防学习平台
export qmxfxxpt=" token @ token "

抓 https://qmxfxx.119.gov.cn  的 token
多账号用 换行 或 @ 分割

tg频道: https://t.me/yml2213_tg
*/


const CodeName = "全民消防学习平台"
const env = "qmxfxxpt"
const envSplit = ["\n", "&", "@"]
const fs = require("fs")
const CryptoJS = require("crypto-js")
require("dotenv").config()
let sendLog = []
const mode = 1    // 并发-2   顺序-1
const runMax = 3  // 最大并发数量
const ckFile = `${env}.txt`
//====================================================================================================
const ck_ = ``  // 快速测试, 直接填入ck即可测试


//====================================================================================================


class User {
    constructor(str, id) {
        // [this.auth_code] = str.split("#")
        this.token = str
        this.index = id
        this.ckFlog = true
    }

    async task() {
        this.arrx = []
        await this.check()
        if (this.ckFlog) {
            // $.log(`\n-------------- 积分查询 --------------`)
            // await this.signIn()
            await this.do_task()
            await this.check()


        }

    }


    async check() {
        const options = {
            method: "get",
            url: `https://qmxfxx.119.gov.cn/alipay/mini/api/users/activeScore`,
            headers: {
                "Host": "qmxfxx.119.gov.cn",
                "Tinyapp-Intercept": "tiny",
                "Accept": "*/*",
                "Authorization": this.token,
                "Accept-Charset": "utf-8",
                "Accept-Language": "zh-CN,zh-Hans;q=0.9",
                "Content-Type": "application/json",
                "User-Agent": "Mozilla/5.0 (iPhone; CPU iPhone OS 16_5_1 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Mobile/20F75 ChannelId(8) Ariver/1.1.0 AliApp(AP/10.5.16.6000) Nebula WK RVKType(0) AlipayDefined(nt:WIFI,ws:390|780|3.0) AlipayClient/10.5.16.6000 Language/zh-Hans Region/CN NebulaX/1.0.0 XRiver/10.2.58.1",
                "Referer": "https://2021002177673260.hybrid.alipay-eco.com/2021002177673260/0.2.2308201131.50/index.html#pages/index/index",
                "Cookie": "",
            },
        }
        // console.log(options)
        this.hd = options.headers
        let {res} = await requestPromise(options)
        // console.log(res)
        if (res.code === 1001) {
            this.log(`积分: ${res.result}`)
            return this.ckFlog = true
        } else {
            this.log(res)
            return this.ckFlog = false
        }

    }


    async signIn() {
        const options = {
            method: "post",
            url: `https://7.meionetech.com/api/operate/wx/record/signIn`,
            headers: this.hd,
            json: {},
        }
        let {res} = await requestPromise(options)
        // console.log(JSON.stringify(res))
        if (res.code === "000") {
            this.log(`签到: ok`)
        } else if (res.code === "999") {
            this.log(`签到: ${res.message}`)
        }
    }


    async do_task() {


        for (let i = 0; i < 20; i++) {
            // await this.doTask2()
            if (!await this.doTask1()) {
                break
            }
        }

        for (let i = 0; i < 10; i++) {
            // await this.doTask2()
            if (!await this.doTask2()) {
                break
            }
        }

    }

    async doTask1() {
        let n = randomInt(1, 999)
        const options = {
            method: "get",
            url: `https://qmxfxx.119.gov.cn/alipay/mini/api/home/taskScord/completeTask?parameter1=${n}&parameter2=HTWKT&taskCode=CTWLAVTIME`,
            headers: this.hd,
        }
        let {res} = await requestPromise(options)
        // console.log(JSON.stringify(res))
        // console.log(`${id}: ${JSON.stringify(res)}`)
        // console.log(res)
        if (res.code === 1001 && res.result === "6") {
            this.log(`刷积分: ${res.result} 分 --- ok`)
            await wait(2)
            return true
        } else return false
    }

    async doTask2() {
        let n = randomInt(1, 300)
        const options = {
            method: "get",
            url: `https://qmxfxx.119.gov.cn/alipay/mini/api/home/taskScord/completeTask?parameter1=${n}&parameter2=HZAL&taskCode=CTWLAV`,
            headers: this.hd,
        }
        let {res} = await requestPromise(options)
        // console.log(JSON.stringify(res))
        // console.log(`${id}: ${JSON.stringify(res)}`)
        // console.log(res)
        if (res.code === 1001 && res.result === '4') {
            this.log(`刷积分: 视听学习完整视频, 获得 ${res.result} 分`)
            // await this.doTask()
            await wait(2)
            return true
        } else return false
    }

    log(message, p = 0) {
        if (mode === 1 && !this.hasLogged) {
            console.log(`\n${"•".repeat(12)}  ${this.index} ${"•".repeat(12)}\n`)
            this.hasLogged = true
        }
        console.log(`${this.index} ${typeof message === "object" ? JSON.stringify(message) : message}`)
        if (p) {
            sendLog.push(`${this.index} ${message}`)
        }
    }
}

async function requestPromise(options) {
    const got = require("got")
    let response, body, headers, res
    try {
        if (options.method.toUpperCase() === "GET") delete options.json, options.body, options.from
        response = await got(options, {
            followRedirect: false,
            https: {rejectUnauthorized: false},
            timeout: 13000,
        })
    } catch (error) {
        response = error.response
    }
    if (response) {
        body = response.body
        headers = response.headers
        if (body) {
            try {
                res = JSON.parse(body)
            } catch (e) {
                res = body
            }
        }
    }
    return {headers, res}
}

class UserList {
    constructor(env) {
        this.env = env
        this.userList = []
        this.logPrefix = `\n[环境检测 ${this.env}]`
        this.mode = mode
    }

    1

    checkEnv() {
        try {
            let UserData = ""
            if (ckFile !== "" && fs.existsSync(ckFile)) {
                UserData = UserData.concat(fs.readFileSync(`./${ckFile}`, "utf-8").split("\n") || [])
                console.log(`ck文件[ ${ckFile} ]加载成功`)
            } else {
                console.log(`ck文件[ ${ckFile} ]不存在, 调用青龙环境变量`)
                UserData = process.env[env] || ck_
            }
            if (!UserData || UserData.trim() === "") {
                console.log(`${this.logPrefix} 没有找到账号信息`)
                return false
            }
            this.userList = UserData
                .split(new RegExp(envSplit.join("|")))
                .filter((cookie) => cookie.trim() !== "")
                .map((cookie, index) => new User(cookie.trim(), `账号[${index + 1}]`))
            const userCount = this.userList.length
            console.log(`${this.logPrefix} ${userCount > 0 ? `找到 ${userCount} 个账号\n` : "没有找到账号\n"}`)
            return true

        } catch (e) {
            console.log(e)
        }
    }

    async runTask() {
        if (!this.checkEnv()) {
            return
        }
        console.log(`[任务 ${CodeName}] 开始运行`)
        if (this.mode === 2) {  // 并发
            const taskQueue = []
            const concurrency = runMax
            for (const user of this.userList) {
                while (taskQueue.length >= concurrency) {
                    await Promise.race(taskQueue)
                }
                const promise = user.task()
                taskQueue.push(promise)
                promise.finally(() => {
                    taskQueue.splice(taskQueue.indexOf(promise), 1)
                })
                if (taskQueue.length < concurrency) {
                    continue
                }
                await Promise.race(taskQueue)
            }
            await Promise.allSettled(taskQueue)
        } else {
            for (const user of this.userList) {
                await user.task()
            }
        }
    }
}

(async () => {
    const s = Date.now()
    const userList = new UserList(env)
    await userList.runTask()
    const e = Date.now()
    await done(s, e)
})().catch(console.error)


function done(s, e) {
    const el = (e - s) / 1000
    console.log(`\n[任务执行完毕 ${CodeName}] 耗时：${el.toFixed(2)}秒`)
    process.exit(0)
}

function wait(seconds) {
    console.log(`等待 ${seconds} 秒`)
    return new Promise((resolve) => setTimeout(resolve, seconds * 1000))
}

function randomInt(min, max) {
    return Math.round(Math.random() * (max - min) + min)
}

function ts(type = false, _data = "") {
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

function randomString(length, options = {xx: true, dx: true, sz: true}) {
    let charset = ""
    if (options.xx) {
        charset += "abcdefghijklmnopqrstuvwxyz"
    }
    if (options.dx) {
        charset += "ABCDEFGHIJKLMNOPQRSTUVWXYZ"
    }
    if (options.sz) {
        charset += "0123456789"
    }
    let res = ""
    for (let i = 0; i < length; i++) {
        let randomIndex = Math.floor(Math.random() * charset.length)
        res += charset.charAt(randomIndex)
    }
    return res
}
