/*
上汽大众              sqdz.js

-------------------  青龙-配置文件-复制区域  -------------------
# 上汽大众
export sqdz=" openid @ openid "

抓 https://swj.ambermedia.club/xcx_request.php 的 openid
多账号用 换行 或 @ 分割

tg频道: https://t.me/yml2213_tg
*/


const CodeName = "上汽大众"
const env = "sqdz"
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
        this.openid = str
        this.index = id
        this.ckFlog = true
    }

    async task() {
        this.arrx = []
        await this.login()
        if (this.ckFlog) {
            // $.log(`\n-------------- 积分查询 --------------`)
            // await this.start()
            // if (ts("d") === 1) await this.pufaTask()    // 每月1号 跑一次
            // await this.check()

        }

    }


    async login() {
        const options = {
            method: "post",
            url: `https://api.mos.csvw.com/mos/security/api/v1/app/actions/pwdlogin`,
            headers: {
                "Host": "swj.ambermedia.club",
                "charset": "utf-8",
                "OS": " iOS",
                "User-Agent": "MosProject_Live/7 CFNetwork/1240.0.4 Darwin/20.6.0",
                "deviceId": "GMD3STEGQPJGW8ITO59RODVW1EC5MTTM",
                "Authorization": "",
                "TraceId": "GMD3STEGQPJGW8ITO59RODVW1EC5MTTM_sc_VW_APP_iPhone_q9e8mnjgmtdgm5ef85p2sb59d6o14n1q_14.8_2.7.01672305753196",
                "Did": "VW_APP_iPhone_q9e8mnjgmtdgm5ef85p2sb59d6o14n1q_14.8_2.7.0",
                "content-type": "application/json; charset=utf-8",
            },
            json: {
                "deviceType": "ios",
                "picTicket": "",
                "scope": "openid",
                "mobile": "18296202373",
                "picContent": "",
                "pwd": "March5231",
                "brand": "vw",
                "deviceId": "VW_APP_iPhone_q9e8mnjgmtdgm5ef85p2sb59d6o14n1q_14.8_2.7.0",
            },
        }
        // console.log(options)
        this.hd = options.headers
        let {res} = await requestPromise(options)
        console.log(res)
        // if (res.status === 1) {
        //     this.log(`积分: ${res.points}`)
        //     return this.ckFlog = true
        // } else {
        //     this.log(res)
        //     return this.ckFlog = false
        // }

    }


    async start() {
        const options = {
            method: "post",
            url: `https://swj.ambermedia.club/xcx_request.php?act=getQuestion`,
            headers: this.hd,
            form: {},
        }
        let {res} = await requestPromise(options)
        // this.log(res)
        if (res.status === 1) {
            this.log(`获取题目: ok`)
            let an_ = {openid: this.openid}
            for (let i = 0; i < res.list.length; i++) {
                let t = res.list[i]
                let an = t.question_tips
                let option_list = t.option_list
                let a = getOptionId(option_list, an)
                if (i + 1 === 1) {
                    an_.q1_id = t.question_id
                    an_.q1_sel = a
                } else if (i + 1 === 2) {
                    an_.q2_id = t.question_id
                    an_.q2_sel = a
                } else if (i + 1 === 3) {
                    an_.q3_id = t.question_id
                    an_.q3_sel = a
                }

                function getOptionId(option_list, an) {
                    for (const optionListElement of option_list) {
                        if (optionListElement.option_title === an) {
                            return optionListElement.option_id
                        }
                    }
                }
            }
            // console.log(an_)
            this.an_ = an_
            await wait(2)
            await this.setQuestion()
        } else this.log(res)
    }

    // https://swj.ambermedia.club/xcx_request.php?act=setQuestion
    async setQuestion() {
        const options = {
            method: "post",
            url: `https://swj.ambermedia.club/xcx_request.php?act=setQuestion`,
            headers: this.hd,
            form: this.an_,
        }
        // console.log(options)
        let {res} = await requestPromise(options)
        // this.log(res)
        if (res.status === 1) {
            console.log(`获得积分: ${res.getPoints}`)
        } else if (res.status === 0) {
            console.log(`获得积分: ${res.msg}`)
        } else this.log(res)

    }


    async pufaTask() {
        let num = Number(await this.getPufa())
        for (let i = 0; i < num; i++) {
            // let a = randomInt(1, num)
            await this.pufa(i)
        }
    }

    // openid=oP3Vv5LoDF9yeHE95LXlkLVoxSvo&pufa_id=32
    async pufa(id) {
        const options = {
            method: "post",
            url: `https://swj.ambermedia.club/xcx_request.php?act=setPufaRead`,
            headers: this.hd,
            form: {
                openid: this.openid,
                pufa_id: id,
            },
        }
        // console.log(options)
        let {res} = await requestPromise(options)
        // this.log(res)
        if (res.status === 1) {
            console.log(`学习普法: ${id} ---- ${res.msg}`)
        } else this.log(res)

    }

    async getPufa() {
        const options = {
            method: "post",
            url: `https://swj.ambermedia.club/xcx_request.php?act=getPufa`,
            headers: this.hd,
            form: {tpid: 1},
        }
        // console.log(options)
        let {res} = await requestPromise(options)
        // this.log(res)
        if (res.status === 1) {
            return res.list[0].pufa_id
            // console.log(`获得积分: ${res.mypoints}`)
        } else this.log(res)

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
