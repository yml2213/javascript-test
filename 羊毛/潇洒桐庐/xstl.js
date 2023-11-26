/*
潇洒桐庐              xstl.js

-------------------  青龙-配置文件-复制区域  -------------------
# 潇洒桐庐
export xstl=" 备注 # sessionId @ 备注 # sessionId "

抓   的  sessionId 就行   记得填上自己的 ua  29行左右
多账号用 换行 或 @ 分割

tg频道: https://t.me/yml2213_tg
*/


const CodeName = "潇洒桐庐" 
const env = "xstl"
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


let ua = 'Mozilla/5.0 (Linux; Android 12; M2102J2SC Build/SKQ1.211006.001; wv) AppleWebKit/537.36 (KHTML, like Gecko) Version/4.0 Chrome/119.0.6045.67 Mobile Safari/537.36;xsb_xiaosatonglu;xsb_xiaosatonglu;1.0.60;native_app;6.5.1'


//====================================================================================================


class User {
    constructor(str, id) {
        this.index = id
        this.ckFlog = true
        this.ck_ = str.split("#")
        this.remark = this.ck_[0]


        this.sessionId = this.ck_[1]
        this.X_TENANT_ID = '59'
    }

    async userTask() {

        await this.get_aid()
        // await this.add_num()

        if (this.ckFlog) {
            // $.log(`\n-------------- 积分查询 --------------`)
            await this.check_num()
            await this.Choujiang()

        }

    }

    async get_aid() {
        try {

            let ts13 = ts(13)
            let X_REQUEST_ID = `${randomString(8)}-${randomString(4)}-${randomString(4)}-${randomString(4)}${randomString(12)}`
            let tem = `/api/user_mumber/account_detail&&${this.sessionId}&&${X_REQUEST_ID}&&${ts13}&&FR*r!isE5W&&${this.X_TENANT_ID}`
            let sign = CryptoJS.SHA256(tem).toString()


            const options = {
                method: "get",
                url: `https://vapp.tmuyun.com/api/user_mumber/account_detail`,
                headers: {
                    "X-SESSION-ID": this.sessionId,
                    "X-REQUEST-ID": X_REQUEST_ID,
                    "X-TIMESTAMP": ts13,
                    "X-SIGNATURE": sign,
                    "X-TENANT-ID": this.X_TENANT_ID,
                    "User-Agent": "1.0.60;00000000-6641-8460-0000-00005576aa51;Xiaomi M2102J2SC;Android;12;Release",
                    // "X-ACCOUNT-ID": this.accountId,
                    "Cache-Control": "no-cache",
                    "Host": "vapp.tmuyun.com"
                }
            }
            // console.log(options)
            let { res } = await requestPromise(options)
            // this.log(res)
            if (res.code == 0 && res.data) {
                this.log(`欢迎${res.data.rst.nick_name}, aid:${res.data.rst.id}, 手机号：${res.data.rst.mobile}`)
                this.accountId = res.data.rst.id
                this.nick_name = res.data.rst.nick_name
                await wait()
            } else {
                this.log(res)
            }
        } catch (error) {
            // this.log(error)
            console.log(error)
        }

    }


    async add_num() {
        try {
            const options = {
                method: "get",
                url: `https://wxapi.hoolo.tv/event/dtqp/index.php?s=/home/TmApi/addPrizenum&accountId=${this.accountId}&round=0&num=0&type='jsonp'`,
                headers: {
                    "Host": "wxapi.hoolo.tv",
                    "sec-ch-ua": "\"Android WebView\";v=\"119\", \"Chromium\";v=\"119\", \"Not?A_Brand\";v=\"24\"",
                    "accept": "application/json, text/javascript, */*; q=0.01",
                    "sec-ch-ua-mobile": "?1",
                    "user-agent": ua,
                    "sec-ch-ua-platform": "\"Android\"",
                    "origin": "https://tp.hoolo.tv",
                    "x-requested-with": "com.chinamcloud.wangjie.b87d8fb20e29a0328c6e21045e8b500e",
                    "sec-fetch-site": "same-site",
                    "sec-fetch-mode": "cors",
                    "sec-fetch-dest": "empty",
                    "referer": "https://tp.hoolo.tv/",
                    "accept-language": "zh-CN,zh;q=0.9,en-US;q=0.8,en;q=0.7"
                }
            }
            // console.log(options)
            let { res } = await requestPromise(options)
            // this.log(res)
            if (res.code == 0) {
                this.log(`增加抽奖次数 ${res.msg}`)
                await wait()
            } else {
                this.log(res)
                return this.ckFlog = false
            }
        } catch (error) {
            this.log(error)
            return this.ckFlog = false
        }
    }

    async check_num() {
        try {
            const options = {
                method: "get",
                url: `https://wxapi.hoolo.tv/event/dtqp/index.php?s=/home/TmApi/getUserInformation&accountId=${this.accountId}&username=encodeURI(${this.nick_name})&type=jsonp`,
                headers: {
                    "Host": "wxapi.hoolo.tv",
                    "sec-ch-ua": "\"Android WebView\";v=\"119\", \"Chromium\";v=\"119\", \"Not?A_Brand\";v=\"24\"",
                    "accept": "application/json, text/javascript, */*; q=0.01",
                    "sec-ch-ua-mobile": "?1",
                    "user-agent": ua,
                    "sec-ch-ua-platform": "\"Android\"",
                    "origin": "https://tp.hoolo.tv",
                    "x-requested-with": "com.chinamcloud.wangjie.b87d8fb20e29a0328c6e21045e8b500e",
                    "sec-fetch-site": "same-site",
                    "sec-fetch-mode": "cors",
                    "sec-fetch-dest": "empty",
                    "referer": "https://tp.hoolo.tv/",
                    "accept-language": "zh-CN,zh;q=0.9,en-US;q=0.8,en;q=0.7"
                }
            }
            // console.log(options)
            this.hd = options.headers
            let { res } = await requestPromise(options)
            // this.log(res)
            if (res.code == 0) {
                let cnum = res.data.cnum
                this.userid = res.data.userid
                this.log(`抽奖次数 ${cnum}`)
                let add_num = 0
                if (cnum == 0) {
                    add_num = 3
                } else if (cnum == 1) {
                    add_num = 2
                }
                else if (cnum == 2) {
                    add_num = 1
                } else if (cnum > 2) {
                    add_num = 0
                    this.log(`开始抽奖 三次`)
                }

                for (let i = 0; i < add_num; i++) {
                    await this.add_num()
                }

            } else {
                this.log(res)
                return this.ckFlog = false
            }
        } catch (error) {
            this.log(error)
            return this.ckFlog = false
        }
    }




    // https://wxapi.hoolo.tv/event/dtqp/index.php?s=/Home/ChoujiangNew/apiChoujiang&callback=jQuery17105828794674129021_1700707443398&openId=655dcf1a6744791e6f8d3ead&action=cj&typeId=122&address=&userid=oXmiV6xSQt4d_WkW_EZC60OWi2no&_=1700707517464
    async Choujiang() {
        let ts1 = ts(13)
        let ts2 = ts(13)
        const options = {
            method: "get",
            url: `https://wxapi.hoolo.tv/event/dtqp/index.php?s=/Home/ChoujiangNew/apiChoujiang&callback=jQuery17105828794674129021_${ts1}&openId=${this.accountId}&action=cj&typeId=122&address=&userid=${this.userid}&_=${ts2}`,
            headers: this.hd
        }
        // console.log(options)
        let { res } = await requestPromise(options)
        res = JSON.parse(res.split("(")[1].split(")")[0])
        // console.log(res)
        if (res.code == 1) {
            this.log(`抽奖: ${res.msg}`, 1)
            await this.Choujiang()
        } else if (res.code == -3) {
            this.log(`抽奖: ${res.msg}, 应该黑号了 抬走吧!`, 1)
            await this.Choujiang()
        } else if (res.code == -200) {
            this.log(`抽奖: ${res.msg}`, 1)
        } else {
            this.log(res)
        }

    }




    async read(id) {
        try {
            const options = {
                method: "get",
                url: `https://wxapi.hoolo.tv/event/dtqp/index.php?s=home/baoming/postBaoming/&activityId=428&name=${this.accountId}&city=${id}&gender=1&type=jsonp`,
                headers: this.hd
            }
            let { res } = await requestPromise(options)
            // this.log(res)
            if (res.code == 0 && res.data) {
                this.log(`当前 ${id}, 执行 ${res.msg}`)
                await wait(3, 5)
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
