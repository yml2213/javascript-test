
/*
金彩云

-------------------  青龙-配置文件-复制区域  -------------------
# 金彩云
export jcy=" 备注 # phone # pwd_MD5 #  备注 # phone # pwd_MD5  "

多账号用 换行 或 @ 分割
tg频道: https://t.me/yml2213_tg
*/

const CodeName = "金彩云"
const env = "jcy"
const envSplit = ["\n", "&", "@"]
const fs = require("fs")
const CryptoJS = require("crypto-js")
const {log} = require("console")
require("dotenv").config()
let sendLog = []
const mode = 1  // 并发-2   顺序-1
const runMax = 3  // 最大并发数量
const ckFile = `${env}.txt`
//====================================================================================================
const ck_ = `yml-0804#13754650804#d1f076e1b5f082fef1d91bd366587ba5`
// const ck_ = ``
// const ck_ = `梦里梦#13754650804#d1f076e1b5f082fef1d91bd366587ba5
// 梦里梦#15614832213#d1f076e1b5f082fef1d91bd366587ba5`

let device_id = '70a8848f-80f3-4e54-8ed3-8b83ee7ea44a'

//====================================================================================================

class User {
    constructor(str, id) {
        this.index = id
        this.ckFlog = true
        this.ck_ = str.split("#")
        this.remark = `${this.ck_[0]}-${CryptoJS.MD5('str').toString()}`
        this.phone = this.ck_[1]
        this.pwd = this.ck_[2]

        this.version = '6.2.4'
        this.push_device = "190e35f7e144fac8287"
        this.wx_app_id = "wxc097803934a957eb"
        this.appid = "PKVUIaj4wgDKYV9R"
        this.x_ip = `${randomInt(1, 150)}.172.${randomInt(1, 90)}.${randomInt(1, 220)}`
        this.device_id = device_id || `${randomString(8)}-${randomString(4)}-${randomString(4)}-${randomString(4)}-${randomString(12)}`

    }

    async userTask() {

        await this.get_cache()  // 获取缓存的变量
        await this.m_get_member()  // 测试缓存是否有效

        if (this.ckFlog) {
            // console.log(`\n-------------- 积分查询 --------------`)
            await this.login_h5()
            await this.onlinetask()  // 在线奖励
            await this.challenge_task()  // 阅读新闻奖励
            await this.boxtask()    // 宝箱
            await this.readtasklist()    // 新闻列表
            await this.welfare()


        }

    }

    async get_cache() {
        try {
            const options = {
                method: "get",
                url: `http://8.141.82.163:5710/study/cache/ck?userId=${this.remark}`,
                headers: {'content-type': 'application/json'},

            }

            // console.log(options)
            let {res} = await requestPromise(options)
            console.log(res)
            if (res.code === 200) {
                // console.log(res.data)
                let ck_ = res.data.split("#")
                this.token = ck_[1]
                this.account_id = ck_[2]
                this.log(`欢迎: ${this.remark}, 缓存有效, 开始任务了!\n${res.data}`)

            } else if (res.code === 1000) {
                // await this.get_capt_code()
                console.log(`${this.remark} 已过期, 开始登录刷新了鸭!`)
                await this.get_capt_code()  // 登录刷新
            } else {
                this.log(res)
                return this.ckFlog = false
            }
        } catch (error) {
            console.log(error)
            return this.ckFlog = false
        }
    }

    async set_cache(ck, timeout = 10) {
        try {
            const options = {
                method: "post",
                url: `http://8.141.82.163:5710/study/cache/ck`,
                headers: {'content-type': 'application/json'},
                json: {
                    userId: this.remark,
                    ck: ck,
                    hour: timeout
                },
            }
            // console.log(options)
            let {res} = await requestPromise(options)
            console.log(res)
            if (res.code === 200) {
                this.log(`欢迎: ${res.data.userId}, 缓存设置成功, 有效时间 ${res.data.hour} 小时!`)
                return true
            } else {
                this.log(res)
                return false
            }
        } catch (error) {
            console.log(error)
            return false
        }
    }


    async login() {
        try {
            let ts13 = ts(13)
            let noncestr = randomString(32)
            let longitude = `${randomInt(100, 130)}.81${randomInt(5700, 5705)}`
            let latitude = `${randomInt(28, 35)}.87${randomInt(6290, 6657)}`
            let str1 = `captcha_code=${this.v_code}&captcha_id=${this.captcha_id}&latitude=${latitude}&longitude=${longitude}&mobile=${this.phone}&noncestr=${noncestr}&push_device=${this.push_device}&pwd=${this.pwd}&timestamp=${ts13}`.trim()
            let sign = await this.get_sign(str1)

            const options = {
                method: "get",
                url: `https://mapi.jcy.jinhua.com.cn/api/member/login_with_pwd_v1`,
                params: {
                    mobile: this.phone,
                    pwd: this.pwd,
                    push_device: this.push_device,
                    longitude: longitude,
                    latitude: latitude,
                    captcha_id: this.captcha_id,
                    captcha_code: this.v_code,
                    timestamp: ts13,
                    noncestr: noncestr,
                    sign: sign
                },
                headers: this.hd
            }

            // console.log(options)
            let {res} = await requestPromise(options)
            // console.log(res)
            if (res.code === 0) {
                let token = res.data.member.token      // h5界面的 access-api-token
                let account_id = res.data.member.account_id  // h5界面的  access-auth-id
                let ck = `${this.remark}#${token}#${account_id}`
                await this.set_cache(ck, 10)  // 设置缓存  时间单位:小时

                if (await this.set_cache(ck, 10)) {

                    this.log(`欢迎: ${res.data.member.nick_name}, 登录切缓存设置成功!`)
                } else {
                    this.log(`欢迎: ${res.data.member.nick_name}, 登录成功, 缓存失败了`)
                }

            } else if (res.code === -1) {
                await this.get_capt_code()
            } else {
                this.log(res)
                return this.ckFlog = false
            }
        } catch (error) {
            console.log(error)
            return this.ckFlog = false
        }
    }




    async get_sign(str1) {
        try {
            const options = {
                method: "post",
                url: `http://81.70.196.85:5051/jcy/get_sign`,
                headers: {"Content-Type": "application/json"},
                json: {str1}
            }
            // log(options)
            let {res} = await requestPromise(options)
            // this.log(res)
            if (res.code === 1) {
                // this.log(`获取sign 成功`)
                return res.sign
            } else if (res.code === 2) {
                this.log(`获取sign 失败`)
                return false
            } else {
                this.log(`获取sign 失败`)
                return false
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
            https: {rejectUnauthorized: false},
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
    return {headers, res}
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

function randomString1(length, options = {xx: true, dx: true, sz: true}) {
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

function randomString(len, up = false, xx = true, sz = true) {
    let charset = ""
    if (xx) {
        charset += "abcdefghijklmnopqrstuvwxyz"
    }
    if (up) {
        charset += "ABCDEFGHIJKLMNOPQRSTUVWXYZ"
    }
    if (sz) {
        charset += "0123456789"
    }
    let res = ""
    for (let i = 0; i < len; i++) {
        let randomIndex = Math.floor(Math.random() * charset.length)
        res += charset.charAt(randomIndex)
    }
    return res
}