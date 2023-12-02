/*
乘龙之家              clzj.js

-------------------  青龙-配置文件-复制区域  -------------------
# 乘龙之家
export clzj=" 备注 # openid @ 备注 # openid "

抓 https://cvweixin-test.dflzm.com.cn    的  openid 就行   记得填上自己的ua  27行
多账号用 换行 或 @ 分割

tg频道: https://t.me/yml2213_tg
*/


const CodeName = "乘龙之家"
const env = "clzj"
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
let ua = "Mozilla/5.0 (Linux; Android 12; M2102J2SC Build/SKQ1.211006.001; wv) AppleWebKit/537.36 (KHTML, like Gecko) Version/4.0 Chrome/118.0.0.0 Mobile Safari/537.36 AgentWeb/5.0.0  UCBrowser/11.6.4.950"


let out_log = ""

//====================================================================================================


class User {
    constructor(str, id) {
        this.index = id
        this.ckFlog = true
        this.ck_ = str.split("#")
        this.remark = this.ck_[0]

        this.openid = this.ck_[1]


    }

    async userTask() {


        let ids = [10009, 10010, 10011, 10012, 10013, 10014, 10015, 10017, 10018, 10100, 1000, 1004, 1005, 1006, 1008, 1009, 1010, 1104, 1201, 1202, 1203, 1204, 221201, 221202, 221203, 221204, 221205, 10015, 10017, 10018]
        for (let t = 0; t < ids.length; t++) {
            // console.log(t)
            await this.addIntegral(ids[t])
        }


        await this.check()

        // if (this.ckFlog) {
        //     // $.log(`\n-------------- 积分查询 --------------`)
        //     await this.check()
        //     // await this.task()
        //     // await this.get_id()


        // }

    }


    async task_list() {
        const options = {
            method: "get",
            url: `https://cvweixin-test.dflzm.com.cn/tg-cvcar-api/mini/integral_record/missionsCompleted?openid=${this.openid}`,
            headers: {
                "Host": "cvweixin-test.dflzm.com.cn",
                "sec-ch-ua": "\"Chromium\";v=\"118\", \"Android WebView\";v=\"118\", \"Not=A?Brand\";v=\"99\"",
                "sec-ch-ua-mobile": "?1",
                "User-Agent": ua,
                "sec-ch-ua-platform": "\"Android\"",
                "Accept": "*/*",
                "X-Requested-With": "cn.com.dfssi.dflzm.vehicleowner",
                "Sec-Fetch-Site": "same-origin",
                "Sec-Fetch-Mode": "cors",
                "Sec-Fetch-Dest": "empty",
                "Referer": "https://cvweixin-test.dflzm.com.cn/clzx/",
                "Accept-Language": "zh-CN,zh;q=0.9,en-US;q=0.8,en;q=0.7",
            },
        }
        // console.log(options)
        this.hd = options.headers
        let {res} = await requestPromise(options)
        // console.log(res)
        if (res.code === 200) {
            for (let i = 0; i < res.data.length; i++) {
                const e = res.data[i]
                // console.log(e.name, e.code, e.completed)
                if (e.completed) {
                    this.log(`${e.name} 已完成`)
                } else {
                    this.log(`开始执行 ${e.name}`)
                    if (e.code == 1007) {  // 1007 在线报修
                        break
                    } else {
                        await this.addIntegral(e.code)
                    }
                }
            }
        } else {
            this.log(res)
            return this.ckFlog = false
        }

    }


    async check() {
        try {
            const options = {
                method: "post",
                url: `https://cvweixin-test.dflzm.com.cn/tg-cvcar-api/mini/carMasterVip/findByOpenId`,
                headers: this.hd,
                body: this.openid,
            }
            // console.log(options)
            let {res} = await requestPromise(options)
            // this.log(res)
            if (res.code == 200) {
                this.log(` ${res.data.weChatPhone}, 微信${res.data.weChatNickName}, 积分 ${res.data.integral}`, 2)
                // await wait(randomInt(4, 7))
            } else if (res.data.code == 500) {
                this.log(` ${res.data.message}`)
            } else {
                this.log(res)
            }
        } catch (error) {
            this.log(error)
        }

    }

    async addIntegral(id) {
        try {
            const options = {
                method: "post",
                url: `https://cvweixin-test.dflzm.com.cn/tg-cvcar-api/mini/integral_record/addIntegral`,
                headers: this.hd,
                json: {"code": id, "openid": this.openid},
            }
            let {res} = await requestPromise(options)
            // this.log(res)
            if (res.data.code == 200) {
                this.log(`当前 ${id}, 执行 ${res.data.data.name}成功, 积分 +${res.data.data.quantity}`)
                await wait(randomInt(5, 10))
                await this.addIntegral(id)
            } else if (res.data.code == 500) {
                this.log(`当前 ${id}, ${res.data.message}`)
                await wait(randomInt(1, 2))
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
        console.log(`${this.index} -- ${this.remark},  ${typeof message === "object" ? JSON.stringify(message) : message}`)
        if (p === 1) {
            sendLog.push(`${this.index} ${message}`)
        } else if (p === 2) {
            sendLog.push(`${this.index} ${message}`)
            out_log += `${this.index} ${message}\n`

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
    console.log(`开始重要日志输出\n`)
    console.log(`${out_log}`)
    console.log(`结束重要日志输出\n`)

    const el = (e - s) / 1000
    console.log(`\n[任务执行完毕 ${CodeName}] 耗时：${el.toFixed(2)}秒`)
    await showmsg()

    async function showmsg() {
        if (!sendLog) return
        if (!sendLog.length) return
        let notify = require("./sendNotify")
        console.log("\n============== 本次推送--by_yml ==============")
        await notify.sendNotify(CodeName, sendLog.join("\n"))
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
