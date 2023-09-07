/*
秒开工              mkg.js

-------------------  青龙-配置文件-复制区域  -------------------
# 秒开工
export mkg=" user_id @ user_id "

抓 https://prod.api.craftsman.wpaini.com/user/getUserInfo  的  ueer ---- id
多账号用 换行 或 @ 分割

tg频道: https://t.me/yml2213_tg
*/


const CodeName = "秒开工"
const env = "mkg"
const envSplit = ["\n", "&", "@"]
const fs = require("fs")
const CryptoJS = require("crypto-js")
require("dotenv").config()
let sendLog = []
const mode = 1    // 并发-2   顺序-1
const runMax = 3  // 最大并发数量
const ckFile = `${env}.txt`
//====================================================================================================
const ck_ = `156180`  // 快速测试, 直接填入ck即可测试


//====================================================================================================


class User {
    constructor(str, id) {
        this.index = id
        this.ckFlog = true
        this.ck_ = str.split("#")

        this.user_id = this.ck_[0]

    }

    async userTask() {
        this.arrx = []
        await this.onClick()
        if (this.ckFlog) {
            // $.log(`\n-------------- 积分查询 --------------`)
            // await this.pt_login()
            // await this.task()
            await this.get_id()


        }

    }


    async onClick() {
        let ts13 = ts(13)
        const options = {
            method: "get",
            url: `https://prod.api.craftsman.wpaini.com/share/onClick?sharer_id=${this.user_id}&time_id=${ts13}`,
            headers: {
                'Host': 'prod.api.craftsman.wpaini.com',
                'authorization': 'Bearer',
                'charset': 'utf-8',
                'User-Agent': 'Mozilla/5.0 (Linux; Android 12; M2102J2SC Build/SKQ1.211006.001; wv) AppleWebKit/537.36 (KHTML, like Gecko) Version/4.0 Chrome/111.0.5563.116 Mobile Safari/537.36 XWEB/5235 MMWEBSDK/20230504 MMWEBID/1858 MicroMessenger/8.0.37.2380(0x2800255B) WeChat/arm64 Weixin NetType/WIFI Language/zh_CN ABI/arm64 MiniProgramEnv/android',
                'content-type': 'application/json',
                'Referer': 'https://servicewechat.com/wxb54711fb3325eae7/38/page-frame.html'
            }
        }
        // console.log(options)
        this.hd = options.headers
        let { res } = await requestPromise(options)
        // console.log(res)
        if (res.code === 200) {
            this.log(`点击邀请链接: ${res.msg}, 邀请id: ${this.user_id}`)
            return this.ckFlog = true
        } else {
            this.log(res)
            return this.ckFlog = false
        }

    }


    async pt_login() {
        const options = {
            method: "post",
            url: `http://tiancaiapi.tablecando.cn/api/Member/login`,
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded'
            },
            form: {
                'member_user': 'Marchzl',
                'member_pwd': '9a001e37f3bb94ed3a23ec0e016ae960',
            },
        }
        let { res } = await requestPromise(options)
        // console.log(JSON.stringify(res))
        // this.log(res)
        if (res.status == 200) {
            this.log(`${res.msg}, 账号: ${res.data.member_user}, 余额: ${res.data.member_balance} 元`)
            this.pt_token = res.token
        } else {
            this.log(res)
        }
    }



    async task() {
        const options = {
            method: "post",
            url: `http://tiancaiapi.tablecando.cn/api/Order/CreateOrder`,
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded',
                'Authorization': this.pt_token
            },
            form: {
                'type': 11,
                'projectid': 6959,
                'Identifier': 'Marchzl',
            },
        }
        // console.log(options)
        let { res } = await requestPromise(options)
        console.log(JSON.stringify(res))
        console.log(res)
        if (res.status == 200) {
            this.log(res)
            this.log(`邀请注册:${res.msg}, 获取账号token: ${res.data.UserInfo}`)

            await wait(2)
            await this.view()

        } else {
            this.log(res)
        }
    }

    async get_id() {
        let n = randomInt(1, 20)
        const options = {
            method: "get",
            url: `https://prod.api.craftsman.wpaini.com/job/rcmdJobs?jobId=448418&pageNum=1&pageSize=20`,
            headers: {
                'Host': 'prod.api.craftsman.wpaini.com',
                'Authorization': `Bearer eyJkYXRhIjoie1wibmlja05hbWVcIjpcIumHjueZvuWQiOeahOaYpeWkqe6Mg1wiLFwiZ2VuZGVyXCI6MCxcImxhbmd1YWdlXCI6XCJ6aF9DTlwiLFwiY2l0eVwiOlwiXCIsXCJwcm92aW5jZVwiOlwiXCIsXCJjb3VudHJ5XCI6XCJcIixcImF2YXRhclVybFwiOlwiaHR0cHM6Ly90aGlyZHd4LnFsb2dvLmNuL21tb3Blbi92aV8zMi9IaWN3RFVWYTV0WThnT0F6SlNabUVhQm4yTThOTm5qUWx6NEE3RThTdmhNUXNvOGxJU1NmVmNTM1VXUmljQkQ3Z3ZtRXBpY3hzMXdzc0RKSlJQZ0N4WDE4US8xMzJcIn0iLCJzaWduYXR1cmUiOiI2ODdmMTMwN2JkZWE2N2ZlMWNhMjQ2ZjRhMmM2OWQ4ZGRkMjEyOThhIiwiZW5jcnlwdGVkRGF0YSI6InkvbUxwODNJcUw5Y0NLSUt2UnAvK1Y3UGhLSXZJeEM3aFF5alprWlV4M2FhYlppTE5ES2JlTzNMVG03bnNYbXdoNHNuRlhBem5XOEFIN1c3ekpzV2VPMkhsbWFQS3ErSnE3LzAwSDNseXA3Mnh4QWxQK2JEcTRRVksvaHB5bEcyTEhOdGh5LzgzRkY3dUpzN3RCbG1uZnpkMjBlOXFXdW9nV2g2d1F3UTJkellycjdNYnhEUW5KRDNZUEVVK2VVclcwMHM0QmhGM25QODk2Sk9hNmIwMmE0UGlCdVhMQUprR3FrR2xMcitzaWhueXlBYVZ0c1NLMUNnTGdtWGd5VXRDaUltWUM5T25NdWF0OU0zcEZIbmpTbGw2cnZxUlhBeERZUFRRSFpyMWVYQVF0d21mWmlnb2N1QkkwVnFGRXlRcFYrQmhjN3NKWDJ1aEFzNlNiRVVKQVFWVWpiRWg1Qk9ReUNqYTVsL3I3cFY3a2xaTEhwaHZjcWZ3NmNTSTMzQUkvSDFLZlpsNUIxdlR3UWRPYzV3UUN1NUttbFRPSkdJcml0ZHZPV0hXNFlURDBnMTAzRnBtSzFCRlFPdVM0elFCMC9zakxyOXlmR2xsWm5JcmhkdUdPUjRIdHlmdHFETDdwVUFjRGdQR1hJaHhvMzlmTWN3Q2EwRzgzYmtNaXFCMjF3ek1RZ0U4NU92ZXBRUzhXUmtkZz09IiwiaXYiOiJiK3RzTFMweFE5ZFFsTGhiam9nVXlRPT0iLCJjbG91ZF9pZCI6IjcyX0FOdGN6Mkc5V0JKVGE4QVl0Z2cxSlJLX09tX0NjSVBNaXQyR1FZQXVla0FPd0lvT1hMcTZLVVlRak1jIiwiZXJyX25vIjowfQ==`,
                'content-type': 'application/json',
                'User-Agent': 'Mozilla/5.0 (iPhone; CPU iPhone OS 16_5_1 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Mobile/15E148 MicroMessenger/8.0.40(0x18002831) NetType/WIFI Language/zh_CN',
                'Referer': 'https://servicewechat.com/wxb54711fb3325eae7/38/page-frame.html'
            },
        }
        let { res } = await requestPromise(options)
        // console.log(JSON.stringify(res))
        // console.log(`${id}: ${JSON.stringify(res)}`)
        console.log(res)
        // if (res.code === 1001 && res.result === '4') {
        //     this.log(`刷积分: 视听学习完整视频, 获得 ${res.result} 分`)
        //     // await this.doTask()
        //     await wait(2)
        //     return true
        // } else return false
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
            https: { rejectUnauthorized: false },
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
    return { headers, res }
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

function randomString(length, options = { xx: true, dx: true, sz: true }) {
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
