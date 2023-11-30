/*
爱临安 

-------------------  青龙-配置文件-复制区域  -------------------
# 爱临安
export ala_data=" 备注 # uuid # sign @ 备注 # uuid # sign "

  
抓   域名 https://ala_data.jiiimo.cn  的  uuid  sign 就行  
多账号用 换行 或 @ 分割

tg频道: https://t.me/yml2213_tg
*/

const CodeName = "爱临安"
const env = "ala_data"
const envSplit = ["\n", "&", "@"]
const fs = require("fs")
const CryptoJS = require("crypto-js")
const { log } = require("console")
require("dotenv").config()
let sendLog = []
const mode = 1    // 并发-2   顺序-1
const runMax = 3  // 最大并发数量
const ckFile = `${env}.txt`
//====================================================================================================
const ck_ = ``



//====================================================================================================

class User {
    constructor(str, id) {
        this.index = id
        this.ckFlog = true
        this.ck_ = str.split("#")
        this.remark = this.ck_[0]
        this.uuid = this.ck_[1]
        this.sign = this.ck_[2]

    }

    async userTask() {



        await this.get_userinfo()     // 个人信息

        if (this.ckFlog) {
            // $.log(`\n-------------- 积分查询 --------------`)
            // await this.sign_in()  // 签到
            // await this.check_num()




        }

    }


    async get_userinfo() {  // 个人信息
        try {
            const options = {
                method: "post",
                url: `https://ala_data.jiiimo.cn/api/user/info`,
                headers: {
                    Host: 'ala_data.jiiimo.cn',
                    // Token: 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJ3ZW5ibyIsImF1ZCI6IndlbmJvbWluaSIsImlhdCI6MTcwMTA4NTE3OSwibmJmIjoxNzAxMDg1MTc4LCJleHAiOjE3MDEwODg3NzksImRhdGEiOnsidXNlcmlkIjoyMDI1OX19.bja4bByoyRIpPpxYFQQV-sa2r6L-ZHelpN6Cwe4ic0U',
                    'content-type': 'application/x-www-form-urlencoded',
                    'User-Agent': 'Mozilla/5.0 (iPhone; CPU iPhone OS 17_1_1 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Mobile/15E148 MicroMessenger/8.0.43(0x18002b2e) NetType/WIFI Language/zh_CN',
                    Referer: 'https://servicewechat.com/wx0607abd12886662b/28/page-frame.html'
                },
                form: {
                    uuid: this.uuid,
                    sign: this.sign,
                }

            }
            this.hd = options.headers
            // log(options)
            let { res } = await requestPromise(options)
            // this.log(res)
            if (res.code == 0) {
                this.log(`欢迎: ${res.data.nickname}, 积分: ${res.data.point}, 现金: ${res.data.balance} 元`, 1)
                if (res.data.balance > 0) {
                    await this.cash()
                }
            } else {
                this.log(res)
                return this.ckFlog = false
            }
        } catch (error) {
            console.log(error)
            return this.ckFlog = false
        }
    }



    async sign_in() {  // 签到
        try {
            const options = {
                method: "post",
                url: `https://ala_data.jiiimo.cn/api/user/agree`,
                headers: this.hd,
                form: {
                    uuid: this.uuid,
                    sign: this.sign,
                }
            }

            // log(options)
            let { res } = await requestPromise(options)
            // this.log(res)
            if (res.code == 0 && res.data == 1) {
                this.log(`签到成功`)
            } else {
                this.log(`已签到`)
            }
        } catch (error) {
            console.log(error)
        }
    }



    async check_num() {
        try {
            const options = {
                method: "post",
                url: `https://ala_data.jiiimo.cn/api/user/rule`,
                headers: this.hd,
                form: {
                    uuid: this.uuid,
                    sign: this.sign,
                }
            }

            // log(options)
            let { res } = await requestPromise(options)
            // this.log(res)
            if (res.code == 0) {
                this.log(`你当前 ${res.data.level}场, 剩余 ${res.data.number} 次, 距离本次循环结束还有: ${res.data.residualTime}`)
                this.lat_num = res.data.number
                await this.check_mid()
            } else {
                this.log(res)
            }
        } catch (error) {
            console.log(error)
        }
    }

    async check_mid() {   // 获取博物馆 id
        try {
            const options = {
                method: "post",
                url: `https://ala_data.jiiimo.cn/api/museum/list`,
                headers: this.hd,
                form: {
                    uuid: this.uuid,
                    sign: this.sign,
                }
            }

            // log(options)
            let { res } = await requestPromise(options)
            // this.log(res)
            if (res.code == 0) {

                this.log(`共找到 ${res.data.length} 个博物馆`)

                for (let i = 0; i < res.data.length; i++) {
                    let e = res.data[i]
                    if (e.status == 3) {
                        this.log(`${e.name} 已抽奖过了, 跳过!`)
                    } else if (e.status == 1) {
                        this.log(`开始参加 ${e.name} 答题!`)
                        // await this.start_qs(e.id)
                        await this.start_qs(e.id)
                        break
                    }
                }

            } else {
                this.log(res)
            }
        } catch (error) {
            console.log(error)
        }
    }

    async start_qs(mid) {
        try {
            const options = {
                method: "post",
                url: `https://ala_data.jiiimo.cn/api/question/get`,
                headers: this.hd,
                form: {
                    mid: mid,
                    qid: randomInt(1, 1200),
                    uuid: this.uuid,
                    sign: this.sign,
                }
            }

            // log(options)
            let { res } = await requestPromise(options)
            // this.log(res)
            if (res.code == 0) {
                this.log(`第 ${res.data.number} 题, ${res.data.title}`)
                let as = as_arr[res.data.id]
                // console.log(as)
                await wait(5, 8)
                await this.qs_post(mid, res.data.id, as)
            } else if (res.code == 1) {
                this.log(res.msg)
            } else {
                this.log(res)
            }
        } catch (error) {
            console.log(error)
        }
    }

    async next_qs(mid) {
        try {
            const options = {
                method: "post",
                url: `https://ala_data.jiiimo.cn/api/question/get`,
                headers: this.hd,
                form: {
                    mid: mid,
                    qid: '',
                    uuid: this.uuid,
                    sign: this.sign,
                }
            }

            // log(options)
            let { res } = await requestPromise(options)
            // this.log(res)
            if (res.code == 0) {
                this.log(`第 ${res.data.number} 题, ${res.data.title}`)
                let as = as_arr[res.data.id]
                // console.log(as)
                await wait(5, 8)
                await this.qs_post(mid, res.data.id, as)
            } else if (res.code == 1) {
                this.log(res.msg)
            } else {
                this.log(res)
            }
        } catch (error) {
            console.log(error)
        }
    }


    async qs_post(mid, id, as) {
        try {
            const options = {
                method: "post",
                url: `https://ala_data.jiiimo.cn/api/question/post`,
                headers: this.hd,
                form: {
                    id: id,
                    select: as,
                    wyy: 0,
                    wyy_point: 0,
                    uuid: this.uuid,
                    sign: this.sign,
                }
            }
            // log(options)
            let { res } = await requestPromise(options)
            // this.log(res)
            if (res.code == 0 && res.data.end == 0) {
                this.log(`回答 ${res.msg}, 未完成, 继续!`)
                await this.next_qs(mid)
            } else if (res.code == 0 && res.data.end == 1) {
                this.log(`回答 ${res.msg}, 完成答题, 去抽奖!`)
                await this.lottery(mid)
            } else {
                this.log(res)
            }
        } catch (error) {
            console.log(error)
        }
    }






    async lottery(mid) {
        try {
            const options = {
                method: "post",
                url: `https://ala_data.jiiimo.cn/api/prize/get`,
                headers: this.hd,
                form: {
                    mid: mid,
                    uuid: this.uuid,
                    sign: this.sign,
                }
            }
            // log(options)
            let { res } = await requestPromise(options)
            // this.log(res)
            if (res.code == 0 && res.data.type == 1) {
                this.log(`恭喜获得现金 -- ${res.data.money} 元, 去提现了鸭!`, 1)
                await this.cash()
            } else if (res.code == 0 && res.data.type == 2) {
                this.log(`恭喜获得积分 -- ${res.data.money} !`, 1)
            } else if (res.code == 1) {
                this.log(res.msg)
            } else {
                this.log(res)
            }
        } catch (error) {
            console.log(error)
        }
    }

    async cash() {
        try {
            const options = {
                method: "post",
                url: `https://ala_data.jiiimo.cn/api/user/tixian`,
                headers: this.hd,
                form: {
                    // mid: mid,
                    uuid: this.uuid,
                    sign: this.sign,
                }
            }
            // log(options)
            let { res } = await requestPromise(options)
            this.log(res, 1)
            if (res.code == 1) {
                this.log(`提现: ${res.msg}`)
            } else {
                this.log(res)
            }
        } catch (error) {
            console.log(error)
        }
    }





    log(message, p = 0) {
        if (mode === 1 && !this.hasLogged) {
            console.log(`\n${"•".repeat(24)}  ${this.index} ${"•".repeat(24)}\n`)
            this.hasLogged = true
        }
        console.log(`${this.index}-${this.remark},  ${typeof message === "object" ? JSON.stringify(message) : message}`)
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
        if (options.params) {
            options.searchParams = options.params
            delete options.params
        }
        response = await got(options, {
            followRedirect: false,
            https: { rejectUnauthorized: false },
            timeout: 13000,
        })
    } catch (error) {
        response = error.response
        console.log(error)
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

function wait(min = 2, max = 3) {  //默认等待 2-3 秒， 自定义的话需要两个值
    let s = Math.round(Math.random() * (max - min) + min)
    console.log(`等待 ${s} 秒`)
    return new Promise((resolve) => setTimeout(resolve, s * 1000))
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
            a = myDate.getMonth() + 1
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
