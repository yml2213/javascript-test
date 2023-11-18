/*
乘龙之家              clzj.js

-------------------  青龙-配置文件-复制区域  -------------------
# 乘龙之家
export clzj=" openid @ openid "

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
const ck_ = `aa`  // 快速测试, 直接填入ck即可测试
let ua = 'Mozilla/5.0 (Linux; Android 12; M2102J2SC Build/SKQ1.211006.001; wv) AppleWebKit/537.36 (KHTML, like Gecko) Version/4.0 Chrome/118.0.0.0 Mobile Safari/537.36 AgentWeb/5.0.0  UCBrowser/11.6.4.950'

let goods = []

//====================================================================================================


class User {
    constructor(str, id) {
        this.index = id
        this.ckFlog = true
        this.ck_ = str.split("#")

        this.openid = this.ck_[0]

    }

    async userTask() {



        for (let i = 0; i < 130; i++) {
            await this.check_good(i)
        }


        let data = unique(goods)
        console.log(data)

        await w()

        async function w() {
            console.log(data.join('\n'))
            fs.writeFileSync('data.txt', data.join('\n'), (err) => {
                if (err) {
                    console.log(err)
                    throw err
                }
                console.log('数据已写入文件')
            })
        }



        function unique(arr) {
            return arr.filter(function (item, index, arr) {
                //当前元素，在原始数组中的第一个索引==当前索引值，否则返回当前元素
                return arr.indexOf(item, 0) === index
            })
        }


    }





    async check_good(page) {
        try {
            const options = {
                method: "post",
                url: `https://cvweixin-test.dflzm.com.cn/tg-cvcar-api/mini/goodsBelongGroup/searchByGoodsName`,
                headers: {
                    'Host': 'cvweixin-test.dflzm.com.cn',
                    'Accept': '*/*',
                    'Sec-Fetch-Site': 'same-origin',
                    'Accept-Language': 'zh-CN,zh-Hans;q=0.9',
                    'Sec-Fetch-Mode': 'cors',
                    'Content-Type': 'application/json',
                    'Origin': 'https://cvweixin-test.dflzm.com.cn',
                    'User-Agent': 'Mozilla/5.0 (iPhone; CPU iPhone OS 17_1_1 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Mobile/15E148',
                    'Referer': 'https://cvweixin-test.dflzm.com.cn/clzx/',
                    'Sec-Fetch-Dest': 'empty'
                },
                json: { "page": page, "size": 10, "params": { "goodsName": "", "groupCode": 1000, "code": "", "sort": 0, "integralRange": 0 } }
            }
            // console.log(options)
            let { res } = await requestPromise(options)
            // this.log(res)

            if (res.code == 200) {
                for (let i = 0; i < res.data.content.length; i++) {
                    const e = res.data.content[i].appGoodsOwnLabelViewList
                    // console.log(e);
                    for (let t = 0; t < e.length; t++) {
                        const element = e[t]
                        // console.log(element.goodsName, element.skuPrice)
                        goods.push(`${element.skuPrice} 积分 ---- ${element.goodsName}`)

                    }
                    // this.log(`${e.appGoodsOwnLabelViewList.skuPrice} 积分 ---- ${e.appGoodsOwnLabelViewList.goodsName}`)
                    // goods.push(`${e.appGoodsOwnLabelViewList.skuPrice} 积分 ---- ${e.appGoodsOwnLabelViewList.goodsName}`)
                }

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







    log(message, p = 0) {
        console.log(message, p)
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

function wait(min = 2, max = 4) {
    let a = Math.round(Math.random() * (max - min) + min)
    console.log(`请耐心等待 ${a} 秒`)
    return new Promise((resolve) => setTimeout(resolve, a * 1000))
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

async function writeToFile(fileName, data) {
    // 检查数据类型
    if (typeof data !== 'string' && !(data instanceof Buffer) && !(data instanceof TypedArray) && !(data instanceof DataView)) {
        throw new Error('数据类型必须为字符串、Buffer、TypedArray 或 DataView')
    }

    // 创建文件
    fs.open(fileName, 'w', (err, fileDescriptor) => {
        if (err) {
            throw err
        }

        // 将数据写入文件
        if (typeof data === 'string') {
            fs.writeFile(fileDescriptor, data, (err) => {
                if (err) {
                    throw err
                }

                // 关闭文件
                fs.close(fileDescriptor, (err) => {
                    if (err) {
                        throw err
                    }
                })
            })
        } else if (data instanceof Buffer) {
            fs.writeFile(fileDescriptor, data, (err) => {
                if (err) {
                    throw err
                }

                // 关闭文件
                fs.close(fileDescriptor, (err) => {
                    if (err) {
                        throw err
                    }
                })
            })
        } else if (data instanceof TypedArray || data instanceof DataView) {
            const dataBuffer = Buffer.from(data.buffer)
            fs.writeFile(fileDescriptor, dataBuffer, (err) => {
                if (err) {
                    throw err
                }

                // 关闭文件
                fs.close(fileDescriptor, (err) => {
                    if (err) {
                        throw err
                    }
                })
            })
        }
    })
}
