/*
金翅膀

-------------------  青龙-配置文件-复制区域  -------------------
# 金翅膀
export jcb=" user # pwd @ user # pwd  "

多账号用 换行 或 @ 分割

tg频道: https://t.me/yml2213_tg
*/


const CodeName = "金翅膀"
const env = "jcb"
const envSplit = ["\n", "&", "@"]
const fs = require("fs")
const CryptoJS = require("crypto-js")
require("dotenv").config()
let sendLog = []
const mode = 1    // 并发-2   顺序-1
const runMax = 3  // 最大并发数量
const ckFile = `${env}.txt`
//====================================================================================================
// const ck_ = `372330199706166653#6653`  // 快速测试, 直接填入ck即可测试
const ck_ = `371324200308216114#6114
371328200405257036#7036
37098220031217272X#272X`  // 快速测试, 直接填入ck即可测试


//====================================================================================================


class User {
    constructor(str, id) {
        this.index = id
        this.ckFlog = true
        this.ck_ = str.split("#")

        this.user = this.ck_[0]
        this.pwd = this.ck_[1]

    }

    async userTask() {
        this.arrx = []
        await this.login()
        if (this.ckFlog) {
            // $.log(`\n-------------- 积分查询 --------------`)
            await this.big_taskList()
            // await this.task()
            // await this.get_id()


        }

    }

    // '{"username":"372330199706166653","password":"6653"}'
    // a9Lj/QaUpcnbCJlosPEruHDgC7NMu4S6N1B/ZfVd3dYwB71Lr3mg9V7vvqhvCNbE7gVMemS8K2rUPjzOTGsw5A==
    // koFqSy0jORNc8Q2wQtlJmGyhPCm+mw1QrZaXxsdCFSekGtTKyEylZpRaSE6DRE1o3xlsKyRHY1MhntRnLJaEGQ==
    async login() {
        const options = {
            method: "post",
            url: `https://jinchibang.taijieyun.com/index/Login/login`,
            headers: {
                'Host': 'jinchibang.taijieyun.com',
                'content-type': 'application/x-www-form-urlencoded',
                'accept': 'application/json, text/plain, */*',
                'sec-fetch-site': 'same-origin',
                'accept-language': 'zh-CN,zh-Hans;q=0.9',
                'sec-fetch-mode': 'cors',
                'origin': 'https://jinchibang.taijieyun.com',
                'user-agent': 'Mozilla/5.0 (iPhone; CPU iPhone OS 16_5_1 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Mobile/15E148 MicroMessenger/8.0.41(0x1800292f) NetType/WIFI Language/zh_CN',
                'referer': 'https://jinchibang.taijieyun.com/user/',
                'sec-fetch-dest': 'empty'
            },
            json: this.encryptAES(`{"username":"${this.user}","password":"${this.pwd}"}`)


        }
        // console.log(options)
        this.hd = options.headers

        let { res } = await requestPromise(options)
        // console.log(res)
        if (res.code === 200) {
            this.nickname = res.data.nickname
            this.token = res.data.token
            this.openid = res.data.openid
            this.applyid = res.data.apply[0].applyid
            this.log(`${this.nickname}--${res.msg}, applyid: ${res.data.apply[0].applyid}`)


            this.hd.membertoken = this.token
            return this.ckFlog = true
        } else {
            this.log(res)
            return this.ckFlog = false
        }

    }

    encryptAES(data) {

        const key = "536e48ab5fb4521d"
        const iv = "cfab93be63f03c83"

        const keyBytes = CryptoJS.enc.Utf8.parse(key)
        const ivBytes = CryptoJS.enc.Utf8.parse(iv)

        const encrypted = CryptoJS.AES.encrypt(data, keyBytes, {
            iv: ivBytes,
            mode: CryptoJS.mode.CBC,
            padding: CryptoJS.pad.ZeroPadding,
        })

        const encryptedBase64 = encrypted.toString()

        return encryptedBase64
    }


    async big_taskList() {
        const options = {
            method: "get",
            url: `https://jinchibang.taijieyun.com/index/material/mslist?msid=65&applyid=${this.applyid}&cate=%E7%90%86%E8%AE%BA`,
            headers: this.hd,

        }
        let { res } = await requestPromise(options)
        // console.log(JSON.stringify(res))
        // this.log(res)
        if (res.code == 200) {


            this.log(`共找到 ${res.data.length} 个 学习任务`)
            for (const data_ of res.data) {
                // this.log(data_)
                console.log(`${data_.title}, ${data_.kind} ---- 状态: ${data_.status}`)
                if (data_.status == '未学完') {
                    // console.log(data_)
                    await this.l_taskList(data_)
                } else {
                    console.log(`${data_.title}  ----- 已学完了`)
                }
            }


            // this.log(`${res.msg}, 账号: ${res.data.member_user}, 余额: ${res.data.member_balance} 元`)
        } else {
            this.log(res)
        }
    }



    async l_taskList(data) {

        // console.log(data)

        const options = {
            method: "get",
            url: `https://jinchibang.taijieyun.com/index/material/list?msid=${data.id}&file_type=&page=1&limit=100&applyid=${this.applyid}`,
            headers: this.hd,
        }
        // console.log(options)
        let { res } = await requestPromise(options)
        // console.log(JSON.stringify(res))
        // console.log(res)
        if (res.code == 200) {
            // this.log(res)
            this.log(`${data.title}, 共找到 ${res.data.count} 个小任务`)

            for (const list of res.data.list) {
                // this.log(list)
                if (list.done == 0) {
                    this.log(`${list.title}, 未完成, 开始学习`)
                    await this.doTask(list)
                }
            }

        } else {
            this.log(res)
        }
    }

    // {"mprogress":"1","mid":"18284","msid":"61b01ad185449","period":929,"done":1,"applyid":"13965","face":""}
    // {"mprogress":"0.00","mid":627,"msid":"61b01ad185449","period":1,"done":0,"applyid":null,"face":""}
    async doTask(list) {
        const options = {
            method: "post",
            url: `https://jinchibang.taijieyun.com/index/material/addlog`,
            headers: this.hd,
            json: this.encryptAES(`{"mprogress":"1","mid":"${list.id}","msid":"${list.material_subject}","period":929,"done":1,"applyid":"${this.applyid}","face":""}`)
        }
        let { res } = await requestPromise(options)
        // console.log(JSON.stringify(res))
        // console.log(`${id}: ${JSON.stringify(res)}`)
        // this.log(res)
        if (res.code === 200) {
            this.log(`${list.title}, 已完成`)
            // await this.doTask()
            await wait(randomInt(3, 5))
        } else {
            this.log(res)
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
