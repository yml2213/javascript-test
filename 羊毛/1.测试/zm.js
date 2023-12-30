/*
战马能量星球              zm.js

-------------------  青龙-配置文件-复制区域  -------------------
# 战马能量星球
export clzj=" seaf @ seaf "

抓 zm.t7a.cn    的  seaf=后面的id就行   记得填上自己的ua  27行
多账号用 换行 或 @ 分割

tg频道: https://t.me/yml2213_tg
*/


const CodeName = "战马能量星球"
const env = "zm"
const envSplit = ["\n", "&", "@"]
const fs = require("fs")
const CryptoJS = require("crypto-js")
require("dotenv").config()
let sendLog = []
const mode = 1    // 并发-2   顺序-1
const runMax = 3  // 最大并发数量
const ckFile = `${env}.txt`
//====================================================================================================
const ck_ = `8131703595456733`  // 快速测试, 直接填入ck即可测试  3541703594970981
let ua = ''


let idarr = []

//====================================================================================================


class User {
    constructor(str, id) {
        this.index = id
        this.ckFlog = true
        this.ck = str

    }


    async userTask() {


        if (this.ckFlog) {

            // await this.sign()
            // await this.share()
            await this.test()
            // await this.getusercenter()
        }
    }


    async test() {

        for (let i = 0; i < 10000; i++) {
            try {
                let i = randomString(16, {xx: false, dx: false, sz: true})
                console.log(i)
                await this.getusercenter(i)
            } catch (error) {
                this.log(error);
            }
        }


    }

    async test1() {
        const batchSize = 100;
        const start = 4681687080190001;
        const end = 4681687080198731;

        try {
            for (let i = start; i < end; i += batchSize) {
                const batchIds = Array.from({length: batchSize}, (_, index) => i + index);
                const promises = batchIds.map(id => this.getusercenter(id));
                await Promise.all(promises);
            }
        } catch (error) {
            this.log(error);
        }
    }


    async sign() {
        try {
            const options = {
                method: "get",
                url: `https://zm.t7a.cn/api/checkin.php?safe=${this.ck}`,
                headers: {
                    "Host": "zm.t7a.cn",
                    "content-type": "application/x-www-form-urlencoded",
                },
            }
            // console.log(options)
            this.hd = options.headers
            let {res} = await requestPromise(options)
            // this.log(res)
            if (res.status == 1) {
                this.log(` ${res.msg}, 获得积分 ${res.checkscore}`)

            } else if (res.status == 0) {
                this.log(` ${res.msg}`)
            } else {
                this.log(res)
            }
        } catch (error) {
            this.log(error)
        }

    }

    async share() {
        try {
            const options = {
                method: "get",
                url: `https://zm.t7a.cn/api/share.php?safe=${this.ck}`,
                headers: this.hd,

            }
            // console.log(options)
            let {res} = await requestPromise(options)
            // this.log(res)
            if (res.status == 1) {
                this.log(` ${res.msg}`)

            } else if (res.status == 0) {
                this.log(` ${res.msg}`)
            } else {
                this.log(res)
            }
        } catch (error) {
            this.log(error)
        }

    }

    async horseeat() {
        try {
            const options = {
                method: "get",
                url: `https://zm.t7a.cn/api/horseeat.php?safe=${this.ck}`,
                headers: this.hd,

            }
            // console.log(options)
            let {res} = await requestPromise(options)
            // this.log(res)
            if (res.status == 1) {
                this.log(` 喂马${res.msg}`)

            } else if (res.status == 0) {
                this.log(` ${res.msg}`)
            } else {
                this.log(res)
            }
        } catch (error) {
            this.log(error)
        }

    }

    async getusercenter(i) {
        try {
            const options = {
                method: "get",
                url: `https://zm.t7a.cn/api/getusercenter.php?safe=${i}`,
                headers: this.hd,

            }
            // console.log(options)
            let {res} = await requestPromise(options)
            // this.log(res)
            if (res.status === 1) {
                this.log(` 用户 ${res.nickname}--${i}-积分${res.nowscore}`)
                idarr.push(i)

                if (idarr.length>0){
                    console.log(idarr)
                }

            } else if (res.includes("SQL") > -1) {
                this.log(`${i}-下一个`)
            } else {
                this.log(res)
            }
        } catch (error) {
            this.log(error)
        }

    }


    log(message, p = 0) {
        if (mode === 1 && !this.hasLogged) {
            console.log(`\n${"•".repeat(24)}  ${this.index} ${"•".repeat(24)}\n`)
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
                await user.userTask()
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


async function done(s, e) {
    const el = (e - s) / 1000
    console.log(`\n[任务执行完毕 ${CodeName}] 耗时：${el.toFixed(2)}秒`)
    await showmsg()

    async function showmsg() {
        if (!sendLog) return
        if (!sendLog.length) return
        let notify = require('./sendNotify')
        console.log('\n============== 本次推送--by_yml ==============')
        await notify.sendNotify(CodeName, sendLog.join('\n'))
    }

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
