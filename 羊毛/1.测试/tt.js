/*
天瑞地安抢卷  

*/
const $ = Env('天瑞地安抢卷')
const fs = require('fs')
const envSplit = ['\n', '&', '@']     //支持多种分割，但要保证变量里不存在这个字符
const ckNames = ['trdaqj']                //支持多变量
const crypto = require('crypto-js')
const axios = require('axios')
var request = require('request')

const user_id = 2169 // 自定义的 user_id 值


let device_no = `00000000-6641-8460-0000-000011${$.randomString(6)}`


async function userTasks() {
    $.log(`\n-------------- 开始 --------------`)   // 并发运行
    list = []
    for (let user of $.userList) {
        if (user.ckFlog) list.push(user.info())
    } await Promise.all(list)
}

class UserClass {
    constructor(ck) {
        this.idx = `账号[${++$.userIdx}]`
        this.ckFlog = true
        this.SESSION = ck

        this.hd = {
            'User-Agent': 'Mozilla/5.0 (iPhone; CPU iPhone OS 14_2_1 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Mobile/15E148;;xsb;xsb_nanhu;1.0.2;Appstore;native_app',
            'Cookie': ''
        }

    }

    async userTask() { // 个人信息
        console.log(`\n=============== ${this.idx} ===============`)

        $.log(`\n-------------- 开始提现 --------------`)
        //await this.info()
        //await this.bandAipay()
        // await this.info()
        //await this.change_bandAipay()

    }

    async info() { // 信息
        let ts13 = $.ts(13)
        let reqid = `3bc70f69-a965-41ca-9d56-${$.randomString(12)}`
        let data = `/api/user_mumber/account_detail&&${this.SESSION}&&${reqid}&&${ts13}&&FR*r!isE5W&&48`
        let sign = crypto.SHA256(data).toString()

        let options = {
            fn: '信息',
            method: 'get',
            url: `https://vapp.tmuyun.com/api/user_mumber/account_detail`,
            headers: {
                'X-SESSION-ID': this.SESSION,
                'X-REQUEST-ID': reqid,
                'X-TIMESTAMP': ts13,
                'X-SIGNATURE': sign,
                'X-TENANT-ID': '48',
                'User-Agent': '1.2.1;82847DA5-42F5-47FF-A581-F2A071413224;iPhone13,2;IOS;14.2.1;Appstore',
            },

        }
        // console.log(options)
        let resp = await $.request(options)
        // console.log(resp)
        if (resp.code == 0) {

            this.account_id = resp.data.rst.id
            this.phone = resp.data.rst.phone_number
            this.nick_name = resp.data.rst.nick_name
            this.total_integral = resp.data.rst.total_integral
            this.ref_code = resp.data.rst.ref_code
            $.log(`${this.idx}: ${resp.data.rst.nick_name}, 积分:${resp.data.rst.total_integral} -- sesioon:  ${this.SESSION}`)

            await this.get_id()  // 获取id

        } else console.log(`${options.fn}: 失败,  ${JSON.stringify(resp)}`), this.ckFlog = false
    }



    async get_id() {
        var options = {
            'method': 'POST',
            'url': 'https://week.rabtv.cn/v1/user/init',
            'headers': {
                'User-Agent': 'Mozilla/5.0 (iPhone; CPU iPhone OS 14_2_1 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Mobile/15E148;;xsb;xsb_ruian;1.2.1;Appstore;native_app',
                'Content-Type': 'application/x-www-form-urlencoded'
            },
            form: {
                nick_name: this.nick_name,
                score: this.total_integral,
                mobile: this.phone,
                ref_code: this.ref_code,
                invitation_number: '0',
                ref_user_uid: '',
                ref_user_code: '',
                username: this.nick_name,
                head_img: 'https://img.tmuyun.com/assets/20230705/1688527387503_64a4e21b79f6be61f9bf56ca.png',
                account_id: this.account_id,
                sessionId: this.SESSION
            }
        }

        //console.log(options);

        try {
            let resp = await $.request(options)
            //console.log(resp);
            this.id = resp.data.id
            console.log('id:', this.id)
            this.access_token = resp.data.access_token
            console.log('access_token:', this.access_token)
            await this.kszl()  // 获取id
            request(options, function (error, response) {
                if (error) throw new Error(error)
                console.log(response.body)
            })
        } catch (error) {
            console.error(error)
            throw error
        }
    }

    async kszl() {
        const headers = {
            'Host': 'week.rabtv.cn',
            'Origin': 'https://app.rabtv.cn',
            'Content-Type': 'application/x-www-form-urlencoded',
            'Accept-Language': 'zh-cn',
            'Accept-Encoding': 'gzip, deflate, br',
            'Connection': 'keep-alive',
            'Accept': 'application/json, text/plain, */*',
            'User-Agent': 'Mozilla/5.0 (iPhone; CPU iPhone OS 14_2_1 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Mobile/15E148;;xsb;xsb_ruian;1.2.1;Appstore;native_app',
            'Authorization': `Bearer ${this.access_token}`,
            'Referer': 'https://app.rabtv.cn/apps/week-zl/index.html'
        }

        const data = `user_id=${user_id}`

        try {
            const response = await axios.post('https://week.rabtv.cn/v1/record/do', data, { headers })
            console.log('请求体:', data) // 打印请求体
            console.log('响应体:', response.data) // 打印响应体
        } catch (error) {
            console.log('错误信息:', error.response.data) // 输出错误信息
            throw new Error(error)
        }
    }

}



!(async () => {
    console.log(await $.yiyan())
    if ($.read_env(UserClass)) {
        await userTasks()
        // for (let user of $.userList) {
        //     await user.userTask()
        // }
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

        async request(opt, type = 'body') {
            try {
                const got = require('got')
                let DEFAULT_TIMEOUT = 8 * 1000      // 默认超时时间
                let DEFAULT_RETRY = 2     // 默认重试次数--2
                let resp = null, count = 0
                let fn = opt.fn || opt.url
                opt.timeout = opt.timeout || DEFAULT_TIMEOUT
                opt.retry = opt.retry || { limit: 0 }
                opt.method = opt?.method?.toUpperCase() || 'GET'
                while (count++ < DEFAULT_RETRY) {
                    try {
                        resp = await got(opt)
                        break
                    } catch (e) {
                        if (e.name == 'TimeoutError') {
                            this.log(`[${fn}]请求超时，重试第${count}次`)
                        } else {
                            this.log(`[${fn}]请求错误(${e.message})，重试第${count}次`)
                        }
                    }
                }
                if (resp == null) return Promise.resolve({ statusCode: 'timeout', headers: null, body: null })
                let { statusCode, headers, body } = resp
                if (body) try {
                    body = JSON.parse(body)
                } catch {
                }
                if (type == 'body') {
                    return Promise.resolve(body)
                } else if (type == 'hd') {
                    return Promise.resolve(headers)
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
            //await this.showmsg()
            let e = Date.now()
            let s = (e - this.startTime) / 1000
            this.log(`[${this.name}]运行结束，共运行了${s}秒`)
            process.exit(0)
        }
    }(name)
}