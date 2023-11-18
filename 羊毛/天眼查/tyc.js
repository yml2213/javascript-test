/*
天眼查              tyc.js

-------------------  青龙-配置文件-复制区域  -------------------
# 天眼查
export tyc=" openid @ openid "

抓 www.tianyancha.com   的  cookie 
多账号用 换行 或 @ 分割

tg频道: https://t.me/yml2213_tg
*/


const CodeName = "天眼查"
const env = "tyc"
const envSplit = ["\n", "&", "@"]
const fs = require("fs")
const CryptoJS = require("crypto-js")
require("dotenv").config()
let sendLog = []
const mode = 1    // 并发-2   顺序-1
const runMax = 3  // 最大并发数量
const ckFile = `${env}.txt`
//====================================================================================================
const ck_ = `TYCID=0ffab0604a5f11ee9fa49167ac1cc2af; ssuid=4393780896; _ga=GA1.2.781793943.1693748271; jsid=SEO-GOOGLE-ALL-SY-000001; sensorsdata2015jssdkcross=%7B%22distinct_id%22%3A%2233250700%22%2C%22first_id%22%3A%2218a5b43864a6d8-0fa4a93888825e-26031f51-2359296-18a5b43864b1f1a%22%2C%22props%22%3A%7B%22%24latest_traffic_source_type%22%3A%22%E8%87%AA%E7%84%B6%E6%90%9C%E7%B4%A2%E6%B5%81%E9%87%8F%22%2C%22%24latest_search_keyword%22%3A%22%E6%9C%AA%E5%8F%96%E5%88%B0%E5%80%BC%22%2C%22%24latest_referrer%22%3A%22https%3A%2F%2Fwww.google.com%2F%22%7D%2C%22%24device_id%22%3A%2218a5b43864a6d8-0fa4a93888825e-26031f51-2359296-18a5b43864b1f1a%22%2C%22identities%22%3A%22eyIkaWRlbnRpdHlfY29va2llX2lkIjoiMThhNWI0NWY4NjkxMDI4LTBkNTVlOWFhNzRiYTQyLTI2MDMxZjUxLTIzNTkyOTYtMThhNWI0NWY4NmEyMzEzIiwiJGlkZW50aXR5X2xvZ2luX2lkIjoiMzMyNTA3MDAifQ%3D%3D%22%2C%22history_login_id%22%3A%7B%22name%22%3A%22%24identity_login_id%22%2C%22value%22%3A%2233250700%22%7D%7D; bannerFlag=true; tyc-user-info=%7B%22state%22%3A%223%22%2C%22vipManager%22%3A%220%22%2C%22mobile%22%3A%2218149712227%22%2C%22userId%22%3A%2233250700%22%2C%22isExpired%22%3A%220%22%7D; tyc-user-info-save-time=1700264220491; auth_token=eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiIxODE0OTcxMjIyNyIsImlhdCI6MTcwMDI2NDIyMSwiZXhwIjoxNzAyODU2MjIxfQ.5Y7ABo5xCNNM9BZzobk_EsKiZEoN1QKjbPKt2q39g9WLQfBOpyxm52oHsbP0jqBZrAnMRUjxQ-EJsEYWXKCs2w; RTYCID=54114adf4e984377afa686ed0eb7380c; HWWAFSESID=6f5642927c7fd7c987a; HWWAFSESTIME=1700265465602; csrfToken=enuO4SL_bwJG1t9CbsHOXFQ9; Hm_lvt_e92c8d65d92d534b0fc290df538b4758=1700264074,1700265468; Hm_lpvt_e92c8d65d92d534b0fc290df538b4758=1700265477`  // 快速测试, 直接填入ck即可测试

let ua = 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/119.0.0.0 Safari/537.36'


let idarr = []
//====================================================================================================


class User {
    constructor(str, id) {
        this.index = id
        this.ckFlog = true
        this.ck_ = str.split("#")

        this.ck = this.ck_[0]

    }

    async userTask() {



        let names = ['北京慧衡高科科技有限公司', '北京中农怀丰农产品销售有限公司', '张家口三源农业开发有限公司', '北京凡尘居旅游文化有限公司', '北京爱琪佳种植专业合作社']
        for (let i = 0; i < names.length; i++) {
            const e = names[i]
            await this.check_by_name(e)

        }

        await this.check_by_name('张家口三源农业开发有限公司')

        // if (this.ckFlog) {
        //     // $.log(`\n-------------- 积分查询 --------------`)
        //     await this.check()
        //     // await this.task()
        //     // await this.get_id()


        // }

    }





    // https://www.tianyancha.com/search?key=%E5%8C%97%E4%BA%AC%E4%B8%AD%E5%86%9C%E6%80%80%E4%B8%B0%E5%86%9C%E4%BA%A7%E5%93%81%E9%94%80%E5%94%AE%E6%9C%89%E9%99%90%E5%85%AC%E5%8F%B8
    async check_by_name(name) {
        try {
            const options = {
                method: "get",
                url: `https://www.tianyancha.com/search?key=${encodeURIComponent(name)}`,
                headers: {
                    'Host': 'www.tianyancha.com',
                    'sec-ch-ua': '"Google Chrome";v="119", "Chromium";v="119", "Not?A_Brand";v="24"',
                    'sec-ch-ua-mobile': '?0',
                    'sec-ch-ua-platform': '"Windows"',
                    'Upgrade-Insecure-Requests': '1',
                    'User-Agent': ua,
                    'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3;q=0.7',
                    'Sec-Fetch-Site': 'same-origin',
                    'Sec-Fetch-Mode': 'navigate',
                    'Sec-Fetch-User': '?1',
                    'Sec-Fetch-Dest': 'document',
                    'Referer': 'https://www.tianyancha.com/',
                    'Accept-Language': 'zh-CN,zh;q=0.9,fr;q=0.8,de;q=0.7,en;q=0.6',
                    'Cookie': this.ck
                }
            }
            // console.log(options)
            let { res } = await requestPromise(options)
            // this.log(res)
            if (res) {
                let phoneList = res.split('"phoneList":')[1].split(',"phoneInfoList"')[0]
                // console.log(phoneList)
                let phoneNumbers = phoneList.match(/\d+/g)
                // console.log(phoneNumbers)
                let phone = print_arr(phoneNumbers)
                // console.log(phone)


                let emailList = res.split('"emailList":')[1].split(',"websites"')[0]
                // console.log(emailList)
                if (emailList == 'null') {
                    let data = `${name} ${phone} null`
                    this.log(data, 1)
                    await w(data)

                } else {
                    let emailAddresses = JSON.parse(emailList).map(email => email)
                    let email = print_arr(emailAddresses)
                    // console.log(email)
                    // console.log(`==========11=`)
                    let data = `${name} ${phone} ${email}`
                    this.log(data, 1)
                    await w(data)


                }

                async function w(data) {

                    try {
                        fs.writeFileSync('file.txt', data + '\n', { flag: 'a' })
                        // console.log('文件写入完成')
                    } catch (err) {
                        throw err
                    }


                    // console.log(data)
                    // console.log(data.join('\n'))
                    // fs.writeFileSync('data.txt', data.join('\n'), (err) => {
                    //     if (err) {
                    //         console.log(err)
                    //         throw err
                    //     }
                    //     console.log('数据已写入文件')
                    // })
                }


            }
            // if (res.code == 200) {
            //     this.log(` ${res.data.weChatPhone}, 微信${res.data.weChatNickName}, 积分 ${res.data.integral}`, 1)
            //     // await wait(randomInt(4, 7))
            // } else if (res.data.code == 500) {
            //     this.log(` ${res.data.message}`)
            // } else {
            //     this.log(res)
            // }


            function print_arr(arr) {
                if (arr == null) {
                    return
                } else if (arr.length == 1) {
                    return arr[0]
                } else if (arr.length > 1) {
                    let string = arr.join(',')
                    // console.log(string)
                    return string
                }
            }


        } catch (error) {
            this.log(error)
        }

    }



    encrypted(n) {
        let e = require("crypto-js")
        let d = "db1caeb548d6fe94e9e1bebf76cd26e1", r = "7421a305a49d5171ac20269be5765975"
        d = e.enc.Hex.parse(d)
        r = e.enc.Hex.parse(r)
        let t = e.AES.encrypt(n, d, {
            iv: r,
            mode: e.mode.ECB,
            padding: e.pad.ZeroPadding,
        })
        return (t = t.toString())
    }

    decrypted(n) {
        let e = require("crypto-js")
        let d = "db1caeb548d6fe94e9e1bebf76cd26e1", r = "7421a305a49d5171ac20269be5765975"
        d = e.enc.Hex.parse(d)
        r = e.enc.Hex.parse(r)
        let t = e.AES.decrypt(n, d, {
            iv: r,
            mode: e.mode.ECB,
            padding: e.pad.ZeroPadding,
        })
        return (t = e.enc.Utf8.stringify(t))
        // return t.toString(e.enc.Utf8).toString()

    }



    async addIntegral(id) {
        try {
            const options = {
                method: "post",
                url: `https://cvweixin-test.dflzm.com.cn/tg-cvcar-api/mini/integral_record/addIntegral`,
                headers: this.hd,
                json: { "code": id, "openid": this.openid },
            }
            let { res } = await requestPromise(options)
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
