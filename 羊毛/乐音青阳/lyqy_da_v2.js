/*
乐音清扬答题              lyqy_dt.js

-------------------  青龙-配置文件-复制区域  -------------------
# 乐音清扬答题
export lyqy_dt=" X-SESSION-ID @ X-SESSION-ID  "

抓 https://vapp.tmuyun.com/api/user_mumber/account_detail  的  X-SESSION-ID

多账号用 换行 或 @ 分割

tg频道: https://t.me/yml2213_tg
*/


const CodeName = "乐音清扬答题"
const env = "lyqy_dt"
const envSplit = ["\n", "&", "@"]
const fs = require("fs")
const CryptoJS = require("crypto-js")
require("dotenv").config()
let sendLog = []
const mode = 1    // 并发-2   顺序-1
const runMax = 3  // 最大并发数量
const ckFile = `lyqy_session.txt`
//====================================================================================================
const ck_ = ``  // 快速测试, 直接填入ck即可测试

const openid = `ommza4qBw75_Yzgl8Ekj_HalbQyE`  // openid  自己抓小程序的  删了  第一次进去抓   https://s.yqbtv.cn/index.php/Api/Wechat/redpackMiniProgramLogin  接口


//====================================================================================================


class User {
    constructor(str, id) {
        this.index = id
        this.ckFlog = true
        this.ck_ = str.split("#")

        this.SESSION = this.ck_[0]
        this.openid = openid

    }

    async userTask() {
        this.arrx = []
        await this.info()
        if (this.ckFlog) {
            // $.log(`\n-------------- 积分查询 --------------`)
            await this.lat()
            // await this.task()
            // await this.get_id()


        }

    }


    async info() {
        let ts13 = ts(13)
        let reqid = `3bc70f69-a965-41ca-9d56-${randomString(12)}`
        let data = `/api/user_mumber/account_detail&&${this.SESSION}&&${reqid}&&${ts13}&&FR*r!isE5W&&41`
        let sign = CryptoJS.SHA256(data).toString()

        const options = {
            method: "get",
            url: `https://vapp.tmuyun.com/api/user_mumber/account_detail`,
            headers: {
                'X-SESSION-ID': this.SESSION,
                'X-REQUEST-ID': reqid,
                'X-TIMESTAMP': ts13,
                'X-SIGNATURE': sign,
                'X-TENANT-ID': '41',
                'User-Agent': '2.0.0;00000000-6641-8460-0000-000011944588;Xiaomi M2102J2SC;Android;12;xiaomi',
            }
        }
        console.log(options)
        this.hd = options.headers
        let { res } = await requestPromise(options)
        console.log(res)
        if (res.code == 0) {

            this.account_id = res.data.rst.id
            this.phone = res.data.rst.mobile
            this.nick_name = res.data.rst.nick_name
            this.log(`${res.data.rst.nick_name}, 积分:${res.data.rst.total_integral} -- sesioon:  ${this.SESSION}`)

            this.token = this.getToken(this.account_id, ts(10))
            console.log(this.token)

            return this.ckFlog = true
        } else {
            this.log(res)
            return this.ckFlog = false
        }

    }

    // https://s.yqbtv.cn/index.php/Mobile/Active/appAnswer/tag/eyyqJBptZvCI6MX0nvis0'
    async lat() {
        const options = {
            method: "post",
            url: `https://s.yqbtv.cn/index.php/Mobile/Active/appAnswer/tag/eyyqJBptZvCI6MX0nvis0`,
            headers: {
                'Host': 's.yqbtv.cn',
                'Accept': 'application/json, text/javascript, */*; q=0.01',
                'X-Requested-With': 'XMLHttpRequest',
                'User-Agent': 'Mozilla/5.0 (Linux; Android 12; M2102J2SC Build/SKQ1.211006.001; wv) AppleWebKit/537.36 (KHTML, like Gecko) Version/4.0 Chrome/116.0.0.0 Mobile Safari/537.36;xsb_yueqing;xsb_yueqing;1.1.8;native_app',
                'Token': this.token,
                'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8',
                'Origin': 'https://s.yqbtv.cn',
                'Sec-Fetch-Site': 'same-origin',
                'Sec-Fetch-Mode': 'cors',
                'Sec-Fetch-Dest': 'empty',
                'Referer': 'https://s.yqbtv.cn/index.php/Mobile/Active/appAnswer/tag/eyyqJBptZvCI6MX0nvis0',
                'Accept-Language': 'zh-CN,zh;q=0.9,en-US;q=0.8,en;q=0.7'
            },
            form: {
                'id': 1,
                'accountId': this.account_id,
                'mobile': this.phone,
                'nickname': encodeURI(this.nick_name)
            }
        }
        // console.log(options)
        let { res } = await requestPromise(options)
        console.log(res)
        if (res.code == 40000) {
            this.log(res)
            this.token_ = res.token
            this.num = res.num
            this.log(`恭喜狗子: ${res.msg}`)
            await this.cash()

        } else {
            this.log(res)
        }

    }


    async cash() {
        let o = this.openid
        let n = ts(10)
        let token_sign = CryptoJS.MD5(`redpAkk.*${o}${n}`).toString()
        const options = {
            method: "post",
            url: `https://s.yqbtv.cn/index.php/Api/Wechat/takenRedpack`,
            headers: {
                'Host': 's.yqbtv.cn',
                'content-type': 'application/json',
                'Authorization': `Bearer ${token_sign}`,
                'User-Agent': 'Mozilla/5.0 (iPhone; CPU iPhone OS 14_2_1 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Mobile/15E148 MicroMessenger/8.0.31(0x18001f37) NetType/WIFI Language/zh_CN',
                'Referer': 'https://servicewechat.com/wx14898a7fcced1a4d/6/page-frame.html'
            },
            json: {
                "token": this.token_,
                "num": this.num,
                "tag": "wxanswer",
                "openid": this.openid,
                "timestamp": n
            }
        }
        // console.log(options)
        let { res } = await requestPromise(options)
        // console.log(res)
        if (res.code == 1) {

            this.log(`真的狗: 提现 ${this.num} 元, ${res.msg}`)
        } else {
            this.log(res)
        }

    }




    getToken(accountId, time) {
        let type = 1
        // let _0x4055b8 = Date['parse'](new Date()) / (0x389ee ^ 0x38a06)
        let _0x4055b8 = time
        // var _0x11ecb0 = 0x46a4f ^ 0x46a4f
        var _0x11ecb0 = type
        let _0x12c744 = accountId //accountId
        let t =
            'yy*/,REwsna'
            ['\u0073\u0070\u006c\u0069\u0074'](
                ''['split']('')['reverse']()['join'](''.split('').reverse().join(''))
            )
            ['reverse']()
            ['join']('') +
            _0x12c744 +
            _0x11ecb0 +
            _0x4055b8

        function md5(data) {
            return CryptoJS.MD5(data).toString()
        }

        let a = `Bearer ${time}&${type},${md5(t)}`
        return a
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
                UserData = UserData.concat(fs.readFileSync(`./${ckFile}`, "utf-8").split("\r\n") || [])
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
