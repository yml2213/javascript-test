/*
科技工作者之家              kjgzzzj.js

-------------------  青龙-配置文件-复制区域  -------------------
# 爱用商城
export kjgzzzj=" token @ token "

抓 https://7.meionetech.com/api/  的 token
多账号用 换行 或 @ 分割

tg频道: https://t.me/yml2213_tg
*/


const CodeName = "科技工作者之家"
const env = "kjgzzzj"
const envSplit = ["\n", "&", "@"]
const fs = require("fs")
const CryptoJS = require("crypto-js")
require("dotenv").config()
let sendLog = []
const mode = 1    // 并发-2   顺序-1
const runMax = 3  // 最大并发数量
const ckFile = `${env}.txt`
//====================================================================================================
const ck_ = `77d94ea7-1571-4354-b8eb-43fc9e816a1d`  // 快速测试, 直接填入ck即可测试

let idArr = []
let id_2Arr = []

let num = 5         // 无限刷运行次数

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
            url: `https://7.meionetech.com/api/account/wx/member/assets`,
            headers: {
                "Host": "7.meionetech.com",
                "authorization": `bearer ${this.token}`,
                "charset": "utf-8",
                "User-Agent": "Mozilla/5.0 (Linux; Android 12; M2102J2SC Build/SKQ1.211006.001; wv) AppleWebKit/537.36 (KHTML, like Gecko) Version/4.0 Chrome/111.0.5563.116 Mobile Safari/537.36 XWEB/5235 MMWEBSDK/20230504 MMWEBID/1858 MicroMessenger/8.0.37.2380(0x2800255B) WeChat/arm64 Weixin NetType/WIFI Language/zh_CN ABI/arm64 MiniProgramEnv/android",
                "Referer": "https://servicewechat.com/wx7d1403fe84339669/666/page-frame.html",
                "content-type": "application/json",
            },
        }
        // console.log(options)
        this.hd = options.headers
        let {res} = await requestPromise(options)
        // console.log(res)
        if (res.code === "000") {
            this.log(`积分: ${res.data.score}`)
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
        let ids = [1, 2, 3, 4, 5, 7, 9, 22, 23, 27, 28, 38]
        for (const id of ids) {
            await this.doTask(id)
        }

        // 无限刷运行次数
        for (let i = 0; i < num; i++) {
            let ids_2 = [10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 24, 25, 26, 29, 30, 31, 32, 33, 34, 35, 36, 37]
            for (const id of ids_2) {
                await this.doTask(id)
            }
        }


        // for (let i = 0; i < 40; i++) {
        //     await this.doTask(i + 1)
        //
        // }
        // console.log(idArr)
        // console.log(`===========`)
        // console.log(id_2Arr)
    }

    async doTask(id) {
        const options = {
            method: "post",
            url: `https://7.meionetech.com/api/operate/wx/rewards/task/done?taskId=${id}`,
            headers: this.hd,
            json: {
                "taskId": id,
            },
        }
        let {res} = await requestPromise(options)
        // console.log(JSON.stringify(res))
        console.log(`${id}: ${JSON.stringify(res)}`)
        // console.log(res)
        // if (res.code === "000") {
        //     this.log(`签到: ok`)
        // } else if (res.code === "999") {
        //     this.log(`签到: ${res.message}`)
        // }
        // await wait(1)
        if (res.code === "999" && res.message === "已经达到参与次数上限") {
            idArr.push(id)
        }
        if (res.code === "000") {
            id_2Arr.push(id)
        }
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
