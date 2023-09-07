/*
工资查询              gzCheck.js

-------------------  青龙-配置文件-复制区域  -------------------
# 工资查询
export gzCheck=" user # pwd  "

抓 https://7.meionetech.com/api/  的 token
多账号用 换行 或 @ 分割

tg频道: https://t.me/yml2213_tg
*/


const CodeName = "工资查询"
const env = "gzCheck"
const envSplit = ["\n", "&", "@"]
const fs = require("fs")
const CryptoJS = require("crypto-js")
require("dotenv").config()
let sendLog = []
const mode = 1    // 并发-2   顺序-1
const runMax = 3  // 最大并发数量
const ckFile = `${env}.txt`
//====================================================================================================
const ck_ = `2202252#yml123456`  // 快速测试, 直接填入ck即可测试


let mo = ts('mo') + ''
const paddedMonth = mo.padStart(2, '0') // 使用 padStart 方法在前面补零
let check_data = `${ts('y')}${paddedMonth}`
console.log(check_data)
//====================================================================================================


class User {
    constructor(str, id) {
        this.ck_ = str.split("#")
        this.user = this.ck_[0]
        this.pwd = this.ck_[1]
        this.index = id
        this.ckFlog = true
    }

    async task() {
        this.arrx = []
        await this.login()
        if (this.ckFlog) {
            // $.log(`\n-------------- 积分查询 --------------`)
            await this.check()

        }

    }


    async login() {
        const options = {
            method: "post",
            url: `http://wage.wqcy-shop.top/index.aspx`,
            headers: {
                'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3;q=0.7',
                'Accept-Language': 'zh-CN,zh;q=0.9,fr;q=0.8,de;q=0.7,en;q=0.6',
                'Cache-Control': 'no-cache',
                'Connection': 'keep-alive',
                'Content-Type': 'application/x-www-form-urlencoded',
                'Cookie': '',
                'Origin': 'http://wage.wqcy-shop.top',
                'Pragma': 'no-cache',
                'Referer': 'http://wage.wqcy-shop.top/index.aspx',
                'Upgrade-Insecure-Requests': '1',
                'User-Agent': 'Mozilla/5.0 (iPhone; CPU iPhone OS 13_2_3 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/13.0.3 Mobile/15E148 Safari/604.1'
            },
            form: {
                '__VIEWSTATE': '/wEPDwUKLTY4NjE4MTUyOWRkBl/LGxzq9+3asPUL0Ac1eWxzuYUQMCFWAvVYq1wQzmc=',
                '__VIEWSTATEGENERATOR': '90059987',
                '__EVENTVALIDATION': '/wEdAAQuS59iRHoHzYda6HazEL2bKhoCyVdJtLIis5AgYZ/RYe4sciJO3Hoc68xTFtZGQEjN+DvxnwFeFeJ9MIBWR693Bawfr0paRy+movAPzdIBuHo6RaFtrbR10XLdIWQy9oo=',
                'username': this.user,
                'password': this.pwd,
                'Button1': '登录'
            },
        }
        // console.log(options)

        let { headers, res } = await requestPromise(options)
        console.log(res)
        console.log(headers)
        // console.log(headers['set-cookie'])
        let cookies = headers['set-cookie']
        const cookieWithWqcyXygbh = cookies.find(cookie => cookie.includes('wqcy_x_ygbh'))
        if (cookieWithWqcyXygbh) {
            const [, value] = cookieWithWqcyXygbh.split('=')
            // console.log(value.split(';')[0])
            this.cookie = `wqcy_x_ygbh=${value.split(';')[0]}`
            // console.log(this.cookie)
        } else {
            console.log('未找到包含 "wqcy_x_ygbh" 的 Cookie')
        }

        if (headers.location) {
            // console.log(headers.location.split('?id=')[1].split("',")[0])
            this.id = encodeURI(headers.location.split('?id=')[1].split("',")[0])
        }

    }


    // http://wage.wqcy-shop.top/myWageMore.aspx?id=5a+34+46+45+37+49+69+55+30+41+6f+3d
    async check() {
        const options = {
            method: "post",
            url: `http://wage.wqcy-shop.top/myWageMore.aspx?id=${this.id}`,
            headers: {
                'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3;q=0.7',
                'Accept-Language': 'zh-CN,zh;q=0.9,fr;q=0.8,de;q=0.7,en;q=0.6',
                'Cache-Control': 'no-cache',
                'Connection': 'keep-alive',
                'Content-Type': 'application/x-www-form-urlencoded',
                'Cookie': this.cookie,
                'Origin': 'http://wage.wqcy-shop.top',
                'Pragma': 'no-cache',
                'Referer': `http://wage.wqcy-shop.top/myWageMore.aspx?id=${this.id}`,
                'Upgrade-Insecure-Requests': '1',
                'User-Agent': 'Mozilla/5.0 (iPhone; CPU iPhone OS 13_2_3 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/13.0.3 Mobile/15E148 Safari/604.1'
            },
            form: {
                '__VIEWSTATE': '/wEPDwUKLTY4NjE4MTUyOWRkBl/LGxzq9+3asPUL0Ac1eWxzuYUQMCFWAvVYq1wQzmc=',
                '__VIEWSTATEGENERATOR': 'B566EE8C',
                '__EVENTVALIDATION': '/wEdAAQuS59iRHoHzYda6HazEL2bKhoCyVdJtLIis5AgYZ/RYe4sciJO3Hoc68xTFtZGQEjN+DvxnwFeFeJ9MIBWR693Bawfr0paRy+movAPzdIBuHo6RaFtrbR10XLdIWQy9oo=',
                'txt_x_tjyf': check_data,
                'Button1': '查询'
            },
        }
        // console.log(options)
        let { res } = await requestPromise(options)
        console.log(`==============`)
        // console.log(res)
        // console.log(res.includes('工资实发'))
        if (res.includes('工资实发')) {
            console.log(`======== 写文件 ${check_data}.html ========`)
            fs.writeFileSync(`${check_data}.html`, res, (err) => {
                if (err) {
                    console.error('无法写入文件:', err)
                } else {
                    console.log(`结果已成功写入到文件 ${check_data}.html`)
                }
            })
            const { JSDOM } = require('jsdom')
            const html = res

            // 使用 jsdom 解析 HTML
            const dom = new JSDOM(html)
            const document = dom.window.document

            const table = document.querySelector('div table')
            const rows = table.querySelectorAll('tr')
            const salaryInfo = {}
            rows.forEach(row => {
                const cells = row.querySelectorAll('td')
                if (cells.length === 4) {
                    const key = cells[0].textContent.trim()
                    const value = cells[1].textContent.trim()
                    salaryInfo[key] = value
                    const key2 = cells[2].textContent.trim()
                    const value2 = cells[3].textContent.trim()
                    salaryInfo[key2] = value2
                }
            })
            console.log(`月份: ${check_data}`)
            console.log(salaryInfo)


        } else {
            console.log(`查询失败: 只能查询最近3个月的数据`)
            // console.log(res)
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
