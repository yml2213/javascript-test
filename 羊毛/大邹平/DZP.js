
/*
大邹平              dzp.js

-------------------  青龙-配置文件-复制区域  -------------------
# 大邹平 
export dzp=" name # pwd @ name # pwd "  

多账号用 换行 或 @ 分割  
抓 iehuangsecond/ga/public/api/login  的 body 里面的信息

tg频道: https://t.me/yml2213_tg  
*/

// process.env.dzp = ''

const $ = Env('大邹平')
const fs = require('fs')
const envSplit = ['\n', '&', '@']     //支持多种分割，但要保证变量里不存在这个字符
const ckNames = ['dzp']                //支持多变量
const CryptoJS = require('crypto-js')

//====================================================================================================


//====================================================================================================




class UserClass {
    constructor(ck) {
        this.idx = `账号[${++$.userIdx}]`
        this.ckFlog = true
        this.ck_ = ck.split('#')
        this.name = this.ck_[0]
        this.pwd = this.ck_[1]
        this.salt = 'c3bf2a59516c3c01ac3b7c5b1c1e1de016909'

        this.ts13 = $.ts(13)



    }

    async userTask() {
        console.log(`\n=============== ${this.idx} ===============`)

        $.log(`\n-------------- 开始 --------------`)
        await this.login()

        if (this.ckFlog) {
            $.log(`\n-------------- 任务 --------------`)
            await this.doSign()

            // await this.taskList()



        }


    }



    async login() {
        let nonce = $.randomString(32)
        let a = `{"encode":1,"password":"eW1sMTIzNDU2\n","black_box":"","username":"yml"}${nonce}${this.salt}${this.ts13.slice(-8)}`.replace(/\n/g, '\\n')
        let sign = CryptoJS.MD5(a).toString().toUpperCase()


        let fn = '登录'
        let url = `https://qfapi.dazouping.com/v5_0/user/login`
        let headers = {
            'codeSign': sign,
            'nonce': nonce,
            'User-Agent': 'QianFan;dzp;Android;M2102J2SCXiaomi31;',
            'timestamp': this.ts13,
            'device': 'ODYyYjNjYTc4ZDUwNGE4Ng==',
            'Content-Type': 'application/json',
            'system': '2',
        }
        let json = {
            "encode": 1,
            "password": `${Buffer.from(this.pwd).toString('base64')}\n`,
            "black_box": "",
            "username": this.name
        }

        // console.log(options)
        let res = await $.request(fn, url, headers, json)
        console.log(res)
        if (res.ret == 0) {

            this.user_id = res.data.user_id
            this.username = res.data.username
            this.phone = res.data.phone
            this.bearerToken = res.data.bearerToken
            this.wapToken = res.data.wapToken
            this.bbsCookieName = res.data.bbsCookieName
            this.bbsCookieValue = res.data.bbsCookieValue

            $.log(`${this.idx}: ${this.username}  ${fn} -- 成功`)

            this.hd = {
                'Authorization': `Bearer ${this.bearerToken}`,
                'X-Requested-With': 'com.dzp.forum',
                'Cookie': `${this.bbsCookieName}=${this.bbsCookieValue}`,
                'User-Agent': 'Mozilla/5.0 (Linux; Android 12; M2102J2SC Build/SKQ1.211006.001; wv) AppleWebKit/537.36 (KHTML, like Gecko) Version/4.0 Chrome/115.0.5790.138 Mobile Safari/537.36; QianFan;dzp;Android;M2102J2SCXiaomi31;'
            }

            this.ckFlog = true
        } else console.log(`${fn}: 失败,  ${JSON.stringify(res)}`), this.ckFlog = false
    }

    async checkSign() {
        let fn = '签到检查'
        let url = `https://qfapi.dazouping.com/store/assign/index`
        let headers = this.hd
        let json = ''

        let res = await $.request(fn, url, headers, json)
        // console.log(res)
        if (res.ret == 0) {
            res.data.assign.status ? $.log(`${this.idx}: ${this.username}  ${fn} -- 已签到`) : await this.doSign()
        } else console.log(`${fn}: 失败,  ${JSON.stringify(res)}`)
    }

    async doSign() {
        let fn = '签到'
        let url = `https://qfapi.dazouping.com/store/assign/sign`
        let headers = this.hd
        let json = ''

        let res = await $.request(fn, url, headers, json)
        // console.log(res)
        if (res.ret == 0) {
            $.log(`${this.idx}: ${this.username}, ${fn}--ok, 获得经验${res.data.reward.exp}, 获得金币${res.data.reward.gold} 个, 获得现金${res.data.reward.cash} 元, 连续签到${res.data.continue_days} 天`)
        } else if (res.ret == 1) {
            $.log(`${this.idx}: ${fn} -- ${res.text}`)
        } else console.log(`${fn}: 失败,  ${JSON.stringify(res)}`)
    }

    async taskList() {
        let fn = '任务列表'
        let url = `https://share.dazouping.com/v5_0/encourage/task-list?position=1`
        let headers = {
            'X-Requested-With': 'com.dzp.forum',
            'Cookie': `XbIn_2132_auth=812fzt0OeZE8x5pKSly2Jrjj7bnLxBKiNdVHDazPFkDkU0FAjT2mR45ekAya5vXHFJqIHWbJXlLxpeINLDuVMS7DNw; XbIn_2132_saltkey=Q29Dn4dg; qianfan_appversion=6.6.0.0; qianfan_appcode=5.4.1; qianfan_deviceid=862b3ca78d504a86; uuid=604ea2e0a71d2d022c09fdd562d24ca0od; inner_version=6.6.0.0; _csrf=4b7a5478a829139e28068f3ad43167a581e4a25683012c8b86a51d286bafa193a%3A2%3A%7Bi%3A0%3Bs%3A5%3A%22_csrf%22%3Bi%3A1%3Bs%3A32%3A%22NlyYDi4vU_RtBzzUme8CAgDeqOaLNZ4B%22%3B%7D; third_app_token=b6ceWEUAoTiXpPSOC82ZFyI0CXEQJg%2BdoJZH6M8LTZsFuUpcENV12D7xhzF5cEUxpHNFlL%2FAgCMeOANnkwAnofHhTFri9Ga7MuCYKgnnZES6ofv%2BwaNzJEpoDxh98AVsN8DHgiM%2BrtMfuB%2B12qvTaSZs1NIdNF%2B%2BrfXqKyIi4Qz2ZeGq1%2FXxaQ0h%2FUlwPPWzz9GS%2F%2B65ar9LEkjO9FhDtm1KEMSoPb6WGdZMBfpJLgt3b6Pt5SsBUG6SeaMzzo7DNyjSHQzLyYRwD%2BzveCadhiMqjxtoSg8BwLjqJnrUPsrr830i9p6E8DdwaFX4Aag7bUsD3Z%2FGf%2FfB9EiQOSqtezjq8tp%2F0ZpICZQZTrXaHuBfC5qNKc%2BkdquXQ35v71UF%2FuCGLOa5lkBpL%2BCUrCraWPKdAKQoR%2BidNYH3xxdDUXR9pGsZnxbTLLL2%2Fsvi9nambZobzV81CldSgsbaoVvCwXSMlHGksQLQPcs6KgXPqLmommjFb6ZHgWL76284xgrHPPR4H6i4DIgfaFlRqdiP5FFjzYf5dT7C3LBCJ9DXSOU%2B3YcoSyEySk7dlzJwQ9B6xMiAnQ; wap_token=3085GFuQbqqLLJVKuAubsFz2twqqNHyLMc5U%2FC48qtCoYcKVKcG%2Bzb2qZ1sNa5JEKvaFHu4JbUH1SktWQTy7Vyj59k067vAKuw4vi%2BeFuAXTQWXdd2Yre%2Ff25JXFfx2czpAXJ0s81sxcgJGrZ%2BJ6OwWAXSjk5e1%2BuHYCXRANx2e34%2BJN1%2FZIVlBst3I`,
        }
        let json = ''

        console.log(fn, url, headers, json)
        let res = await $.request(fn, url, headers, json)
        // console.log(res)
        if (res.ret == 0) {

            let tasks = res.data.list

            for (const task of tasks) {  // 2-完成   3-进行中  0-未完成

                if (task.id == '3') {
                    task.type == 2 ? $.log(`${this.idx}: ${this.username} -- 已签到`) : await this.doSign()
                } else if (task.id == '2') { // 分享赚钱

                } else if (task.id == '6') { // 浏览有礼(2/5)
                    console.log(task)
                    if (task.type == '3') {
                        $.log(`${this.idx}: fn -- ${task.title}`)
                        // await this.view()
                    }
                }

            }


            // res.data.assign.status ? $.log(`${this.idx}: ${this.username}  ${fn} -- 已签到`) : await this.doSign()
        } else console.log(`${fn}: 失败,  ${JSON.stringify(res)}`)


    }


    async view() { //circle=4&tid=26938
        let nonce = $.randomString(32)
        let a = `circle=4&tid=26938${nonce}${this.salt}${this.ts13.slice(-8)}`.replace(/\n/g, '\\n')
        let sign = CryptoJS.MD5(a).toString().toUpperCase()


        let fn = '浏览有礼'
        let url = `https://qfapi.dazouping.com/v5_0/encourage/task-view-complete`
        let headers = {
            'codeSign': sign,
            'nonce': nonce,
            'User-Agent': 'QianFan;dzp;Android;M2102J2SCXiaomi31;',
            'timestamp': this.ts13,
            'device': 'ODYyYjNjYTc4ZDUwNGE4Ng==',
            'Content-Type': 'application/json',
            'system': '2',
        }
        let json = {
            "circle": 4,
            "tid": 26938,
        }

        console.log(url, headers, json)
        let res = await $.request(fn, url, headers, json)
        // console.log(res)
        if (res.ret == 0) {

            this.user_id = res.data.user_id
            this.username = res.data.username
            this.phone = res.data.phone
            this.bearerToken = res.data.bearerToken
            this.bbsCookieName = res.data.bbsCookieName
            this.bbsCookieValue = res.data.bbsCookieValue

            $.log(`${this.idx}: ${this.username}  ${fn} -- 成功`)

            this.hd = {
                'Authorization': `Bearer ${this.bearerToken}`,
                'X-Requested-With': 'com.dzp.forum',
                'Cookie': `${this.bbsCookieName}=${this.bbsCookieValue}`,
                'User-Agent': 'Mozilla/5.0 (Linux; Android 12; M2102J2SC Build/SKQ1.211006.001; wv) AppleWebKit/537.36 (KHTML, like Gecko) Version/4.0 Chrome/115.0.5790.138 Mobile Safari/537.36; QianFan;dzp;Android;M2102J2SCXiaomi31;'
            }

            this.ckFlog = true
        } else console.log(`${fn}: 失败,  ${JSON.stringify(res)}`), this.ckFlog = false
    }


}


!(async () => {
    // console.log(await $.yiyan())
    if ($.read_env(UserClass)) {
        // await userTasks()
        for (let user of $.userList) {
            await user.userTask()
        }
    }


})()
    .catch((e) => console.log(e))
    .finally(() => $.exitNow())


//========================= 2023/06/19 ======================================
function Env(name) {
    return new class {
        constructor(name) {
            this.name = name
            this.startTime = Date.now()
            this.log(`[${this.name}]开始运行`)

            this.notifyStr = []
            this.notifyFlag = true

            this.userIdx = 0
            this.userList = []
            this.userCount = 0
        }

        async request(fun, url, hd, json, type = 'body') {
            try {
                const got = require('got')
                let method = ''
                if (json) { method = 'post' }
                else {
                    method = 'get'
                }
                let opt = { fn: fun, url, method, headers: hd, json }
                if (method == 'get') {
                    delete opt.json
                }
                // console.log(opt)
                let DEFAULT_TIMEOUT = 8 * 1000      // 默认超时时间
                let DEFAULT_RETRY = 2     // 默认重试次数--2
                let res = null, count = 0
                let fn = opt.fn || opt.url
                opt.timeout = opt.timeout || DEFAULT_TIMEOUT
                opt.retry = opt.retry || { limit: 0 }
                opt.method = opt?.method?.toUpperCase() || 'GET'
                while (count++ < DEFAULT_RETRY) {
                    try {
                        res = await got(opt)
                        break
                    } catch (e) {
                        if (e.name == 'TimeoutError') {
                            this.log(`[${fn}]请求超时，重试第${count}次`)
                        } else {
                            this.log(`[${fn}]请求错误(${e.message})，重试第${count}次`)
                        }
                    }
                }
                if (res == null) return Promise.resolve({ statusCode: 'timeout', headers: null, body: null })
                // console.log(res)
                let { statusCode, headers, body } = res
                if (body) try {
                    body = JSON.parse(body)
                } catch {
                }
                if (type == 'body') {
                    return Promise.resolve(body)
                } else if (type == 'cookie') {
                    return Promise.resolve(res)
                } else if (type == 'hd') {
                    return Promise.resolve(headers)
                } else if (type == 'all') {
                    return Promise.resolve([headers, body])
                } else if (type == 'statusCode') {
                    return Promise.resolve(statusCode)
                }
            } catch (error) {
                console.log(error)
            }

        }

        log(msg, options = {}) {
            if (typeof msg == 'object') {
                msg = JSON.stringify(msg)
            }
            let opt = { console: true }
            Object.assign(opt, options)

            if (opt.time) {
                let fmt = opt.fmt || 'hh:mm:ss'
                msg = `[${this.time(fmt)}]` + msg
            }
            if (opt.notify) {
                this.notifyStr.push(msg)
            }
            if (opt.console) {
                console.log(msg)
            }

        }

        read_env(Class) {
            require('dotenv').config()
            let envStrList = ckNames.map(x => process.env[x])
            for (let env_str of envStrList.filter(x => !!x)) {
                let sp = envSplit.filter(x => env_str.includes(x))
                let splitor = sp.length > 0 ? sp[0] : envSplit[0]
                for (let ck of env_str.split(splitor).filter(x => !!x)) {
                    this.userList.push(new Class(ck))
                }
            }
            this.userCount = this.userList.length
            if (!this.userCount) {
                this.log(`未找到变量，请检查变量${ckNames.map(x => '[' + x + ']').join('或')}`, { notify: true })
                return false
            }
            this.log(`共找到${this.userCount}个账号`)
            return true
        }


        time(t, x = null) {
            let xt = x ? new Date(x) : new Date
            let e = {
                "M+": xt.getMonth() + 1,
                "d+": xt.getDate(),
                "h+": xt.getHours(),
                "m+": xt.getMinutes(),
                "s+": xt.getSeconds(),
                "q+": Math.floor((xt.getMonth() + 3) / 3),
                S: this.padStr(xt.getMilliseconds(), 3)
            };
            /(y+)/.test(t) && (t = t.replace(RegExp.$1, (xt.getFullYear() + "").substr(4 - RegExp.$1.length)))
            for (let s in e)
                new RegExp("(" + s + ")").test(t) && (t = t.replace(RegExp.$1, 1 == RegExp.$1.length ? e[s] : ("00" + e[s]).substr(("" + e[s]).length)))
            return t
        }

        async showmsg() {
            if (!this.notifyFlag) return
            if (!this.notifyStr) return
            if (this.notifyStr.length) return
            let notify = require('./sendNotify')
            this.log('\n============== 推送 ==============')
            await notify.sendNotify(this.name, this.notifyStr.join('\n'))
        }

        padStr(num, length, opt = {}) {
            let padding = opt.padding || '0'
            let mode = opt.mode || 'l'
            let numStr = String(num)
            let numPad = (length > numStr.length) ? (length - numStr.length) : 0
            let pads = ''
            for (let i = 0; i < numPad; i++) {
                pads += padding
            }
            if (mode == 'r') {
                numStr = numStr + pads
            } else {
                numStr = pads + numStr
            }
            return numStr
        }

        json2str(obj, c, encode = false) {
            let ret = []
            for (let keys of Object.keys(obj).sort()) {
                let v = obj[keys]
                if (v && encode) v = encodeURIComponent(v)
                ret.push(keys + '=' + v)
            }
            return ret.join(c)
        }

        str2json(str, decode = false) {
            let ret = {}
            for (let item of str.split('&')) {
                if (!item) continue
                let idx = item.indexOf('=')
                if (idx == -1) continue
                let k = item.substr(0, idx)
                let v = item.substr(idx + 1)
                if (decode) v = decodeURIComponent(v)
                ret[k] = v
            }
            return ret
        }

        phoneNum(phone_num) {
            if (phone_num.length == 11) {
                let data = phone_num.replace(/(\d{3})\d{4}(\d{4})/, "$1****$2")
                return data
            } else {
                return phone_num
            }
        }

        randomInt(min, max) {
            return Math.round(Math.random() * (max - min) + min)
        }

        async yiyan() {
            const got = require('got')
            return new Promise((resolve) => {
                (async () => {
                    try {
                        const response = await got('https://v1.hitokoto.cn')
                        // console.log(response.body)
                        let data = JSON.parse(response.body)
                        let data_ = `[一言]: ${data.hitokoto}  by--${data.from}`
                        // console.log(data_)
                        resolve(data_)
                    } catch (error) {
                        console.log(error.response.body)
                    }
                })()
            })
        }

        ts(type = false, _data = "") {
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

        randomPattern(pattern, charset = 'abcdef0123456789') {
            let str = ''
            for (let chars of pattern) {
                if (chars == 'x') {
                    str += charset.charAt(Math.floor(Math.random() * charset.length))
                } else if (chars == 'X') {
                    str += charset.charAt(Math.floor(Math.random() * charset.length)).toUpperCase()
                } else {
                    str += chars
                }
            }
            return str
        }

        randomString(len, charset = 'abcdef0123456789') {
            let str = ''
            for (let i = 0; i < len; i++) {
                str += charset.charAt(Math.floor(Math.random() * charset.length))
            }
            return str
        }

        randomList(a) {
            let idx = Math.floor(Math.random() * a.length)
            return a[idx]
        }


        wait(t) {
            $.log(`随机等待 ${t} 秒 ...`)
            return new Promise(e => setTimeout(e, t * 1000))
        }

        async exitNow() {
            await this.showmsg()
            let e = Date.now()
            let s = (e - this.startTime) / 1000
            this.log(`[${this.name}]运行结束，共运行了${s}秒`)
            process.exit(0)
        }
    }(name)
}