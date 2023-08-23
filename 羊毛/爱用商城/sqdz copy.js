/*
台陆通              sqdz_pwd.js

-------------------  青龙-配置文件-复制区域  -------------------
# 台陆通 
export sqdz_pwd=" phone # pwd @ phone # pwd "  

多账号用 换行 或 @ 分割  

tg频道: https://t.me/yml2213_tg  
*/


const $ = Env('台陆通')
const fs = require('fs')
const envSplit = ['\n', '&', '@']     //支持多种分割，但要保证变量里不存在这个字符
const ckNames = ['sqdz_pwd']                //支持多变量
const CryptoJS = require('crypto-js')
require('dotenv').config()

//====================================================================================================
let code_tips = `1. 当前版本:v1__内部版,仅限内部使用 \n`

//====================================================================================================

class UserClass {
    constructor(ck) {
        this.idx = `账号[${++$.userIdx}]`
        this.ckFlog = true
        this.ck_ = ck.split('#')
        this.phone = this.ck_[0]
        this.pwd = this.ck_[1]
        this.ts13 = $.ts(13)

        this.hd = {
            'Pragma': 'no-cache',
            'X-Requested-With': 'XMLHttpRequest',
            'User-Agent': 'Mozilla/5.0 (Linux; Android 6.0; Nexus 5 Build/MRA58N) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/115.0.0.0 Mobile Safari/537.36 Edg/115.0.1901.203',
            'Content-Type': 'application/json;charset=utf-8',
            'cookie': ''
        }

    }

    async userTask() {

        console.log(`\n=============== ${this.idx} ===============`)
        $.log(`\n-------------- 登录 --------------`)
        await this.login_1()

        if (this.ckFlog) {
            // $.log(`\n-------------- 积分查询 --------------`)
            // await this.check()

        }

    }


    async tips() { // 提示内容
        let options = {
            fn: '提示内容',
            method: 'get',
            url: `https://raw.githubusercontent.com/yml2213/javascript/master/yml/tipe.txt`,
            headers: {}
        }
        // console.log(options)
        let res = await $.request(options)
        // console.log(res)
        if (res) {
            $.log(`\n\n\n${res}${code_tips}------------------------------------------------------------------------------`, { notify: true })
        } else console.log(`${options.fn}: 失败,  ${JSON.stringify(res)}`)
    }

    async login_1() {
        await this.getAesData()
        let ts13 = $.ts(13)
        let pwd = this.aesEncrypt(`${this.pwd}|${this.key}`, this.key, this.iv)
        let options = {
            fn: '登录1',
            method: 'post',
            url: `https://m-pass.svw-volkswagen.com/api/v1/thirdparty/idp/uaa/login?client_id=496e61a6649a4286be80ac3d7320d349&redirect_uri=https%3A%2F%2Fm-mall.svw-volkswagen.com%2FmyLogin%3FloginType%3DSSO&response_type=code&scope=openid&auth=&state=${ts13}`,
            headers: this.hd,
            json: { "username": "13754650804", "password": pwd, "source": 2 }
        }
        // console.log(options)
        let res = await $.request(options, 'all')
        // console.log(res)
        // console.log(res)
        this.redirectUri = res[0]['set-cookie'][5].split('redirectUri=')[1].split(';')[0]
        console.log(this.redirectUri)

        res = res[1]
        if (res.status == 200) {
            // console.log(res.data.redirectUrl.split('?')[1])
            let queryString = res.data.redirectUrl.split('?')[1]
            let params = new URLSearchParams(queryString)
            let code = params.get('code')

            if (code) {
                // console.log(code) // 输出提取到的 code 值
                $.log(`${this.idx}: ${options.fn}, ok, code: ${code}`)
                await this.az(code)
            } else {
                console.log("未找到 code 值")
            }

        } else console.log(`${options.fn}: 失败,  ${JSON.stringify(res)}`)

    }

    async login_2(code) {
        let ts13 = $.ts(13)
        let options = {
            fn: '登录2',
            method: 'get',
            url: `https://m-mall.svw-volkswagen.com/myLogin?loginType=SSO&code=${code}&state=${ts13}`,
            headers: {
                'Pragma': 'no-cache',
                'Upgrade-Insecure-Requests': '1',
                'Sec-Fetch-User': '?1',
            },
        }
        // console.log(options)
        let res = await $.request(options, 'all')
        // console.log(res)
        // console.log(res)
        this.acw_tc = res[0]['set-cookie'][0].split('acw_tc=')[1].split(';')[0]
        console.log(this.acw_tc)

        res = res[1]


        await this.az()


        // if (res.status == 200) {
        //     // // console.log(res.data.redirectUrl.split('?')[1])
        //     // let queryString = res.data.redirectUrl.split('?')[1]
        //     // let params = new URLSearchParams(queryString)
        //     // let code = params.get('code')

        //     // if (code) {
        //     //     // console.log(code) // 输出提取到的 code 值
        //     //     $.log(`${this.idx}: ${options.fn}, ok, code: ${code}`)
        //     //     await this.login_2(code)
        //     // } else {
        //     //     console.log("未找到 code 值")
        //     // }

        // } else console.log(`${options.fn}: 失败,  ${JSON.stringify(res)}`)

    }


    // https://m-pass.svw-volkswagen.com/api/v1/thirdparty/idp/uaa/authorize?source=2&client_id=496e61a6649a4286be80ac3d7320d349&redirect_uri=https%3A%2F%2Fm-mall.svw-volkswagen.com%2FmyLogin%3F%26loginType%3DSSO&response_type=code&scope=openid&auth=&state=1692349727086
    async az() {
        let ts13 = $.ts(13)

        let options = {
            fn: 'az认证',
            method: 'get',
            url: `https://m-pass.svw-volkswagen.com/api/v1/thirdparty/idp/uaa/authorize?source=2&client_id=496e61a6649a4286be80ac3d7320d349&redirect_uri=https%3A%2F%2Fm-mall.svw-volkswagen.com%2FmyLogin%3F%26loginType%3DSSO&response_type=code&scope=openid&auth=&state=${ts13}`,
            headers:  this.hd,
        }
        console.log(options)
        let res = await $.request(options)
        console.log(res)
        // if (res.status == 200) {
        //     // console.log(res.data.redirectUrl.split('?')[1])
        //     let queryString = res.data.redirectUrl.split('?')[1]
        //     let params = new URLSearchParams(queryString)
        //     let code = params.get('code')

        //     if (code) {
        //         // console.log(code) // 输出提取到的 code 值
        //         $.log(`${this.idx}: ${options.fn}, ok, code: ${cdoe}`)
        //     } else {
        //         console.log("未找到 code 值")
        //     }

        // } else console.log(`${options.fn}: 失败,  ${JSON.stringify(res)}`)

    }



    aesEncrypt(data, key, iv) {

        let key_ = CryptoJS.enc.Utf8.parse(key)
        let iv_ = CryptoJS.enc.Utf8.parse(iv)
        const encrypted = CryptoJS.AES.encrypt(data, key_, {
            iv: iv_,
            mode: CryptoJS.mode.CBC,
            padding: CryptoJS.pad.Pkcs7,
        })

        return CryptoJS.enc.Base64.stringify(encrypted.ciphertext)
    }

    async getAesData() {
        let options = {
            fn: '获取aes信息',
            method: 'post',
            url: `https://m-pass.svw-volkswagen.com/api/v1/common/secret?algorithm=AES`,
            headers: {
                'Pragma': 'no-cache',
                'X-Requested-With': 'XMLHttpRequest',
                'User-Agent': 'Mozilla/5.0 (Linux; Android 6.0; Nexus 5 Build/MRA58N) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/115.0.0.0 Mobile Safari/537.36 Edg/115.0.1901.203',
                'Content-Type': 'application/json;charset=utf-8'
            },
            json: { "username": "13754650804" }
        }
        // console.log(options)
        let res = await $.request(options, 'all')
        // console.log(res)

        this.UAASESSIONID = res[0]['set-cookie'][1].split('UAASESSIONID=')[1].split(';')[0]
        this['uaa-last-sid'] = res[0]['set-cookie'][2].split('uaa-last-sid=')[1].split(';')[0]
        console.log(this.UAASESSIONID)

        res = res[1]
        if (res.status == 200) {
            // console.log(res)
            this.key = res.data.random
            this.iv = res.data.iv
            $.log(`${this.idx}: ${options.fn}, key: ${this.key}, iv: ${this.iv}, UAASESSIONID: ${this.UAASESSIONID}`)
            this.hd.cookie = this.UAASESSIONID
        } else console.log(`${options.fn}: 失败,  ${JSON.stringify(res)}`)
    }



    async doSign() {
        let options = {
            fn: '签到',
            method: 'get',
            url: `https://api.heipimall.com/p/score/updateUserScore`,
            headers: {
                "Host": "api.heipimall.com",
                "locale": "zh_CN",
                "channel": "xiaomi",
                "authorization": this.accessToken_shop,
                "user-agent": "Mozilla/5.0 (Linux; Android 12; M2102J2SC Build/SKQ1.211006.001; wv) AppleWebKit/537.36 (KHTML, like Gecko) Version/4.0 Chrome/115.0.5790.166 Mobile Safari/537.36",
                "accept": "*/*",
                "origin": "https://h5.heipimall.com",
                "x-requested-with": "com.sirc.tlt",
                "sec-fetch-site": "same-site",
                "sec-fetch-mode": "cors",
                "sec-fetch-dest": "empty",
                "referer": "https://h5.heipimall.com/",
                "accept-language": "zh-CN,zh;q=0.9,en-US;q=0.8,en;q=0.7",
                "Accept-Encoding": "deflate, gzip"
            }
        }
        // console.log(options)
        let res = await $.request(options)
        // console.log(res)
        if (res.data == '领取积分成功') {
            $.log(`${this.idx}: ${options.fn}, ${res.data}!`)
        } else if (res.data == "今天已经签到过了，请明天再试！") {
            $.log(`${this.idx}: ${options.fn}, ${res.data}!`)
        } else console.log(`${options.fn}: 失败,  ${JSON.stringify(res)}`)
    }


    async check() {
        let options = {
            fn: '积分查询',
            method: 'get',
            url: `https://api.heipimall.com/p/user/getUserInfo`,
            headers: {
                "Host": "api.heipimall.com",
                "locale": "zh_CN",
                "channel": "xiaomi",
                "authorization": this.accessToken_shop,
                "user-agent": "Mozilla/5.0 (Linux; Android 12; M2102J2SC Build/SKQ1.211006.001; wv) AppleWebKit/537.36 (KHTML, like Gecko) Version/4.0 Chrome/115.0.5790.166 Mobile Safari/537.36",
                "accept": "*/*",
                "origin": "https://h5.heipimall.com",
                "x-requested-with": "com.sirc.tlt",
                "sec-fetch-site": "same-site",
                "sec-fetch-mode": "cors",
                "sec-fetch-dest": "empty",
                "referer": "https://h5.heipimall.com/",
                "accept-language": "zh-CN,zh;q=0.9,en-US;q=0.8,en;q=0.7",
                "Accept-Encoding": "deflate, gzip"
            }
        }
        // console.log(options)
        let res = await $.request(options)
        // console.log(res)
        if (res.data) {
            $.log(`${this.idx}:${this.phone} ${options.fn}, 当前积分: ${res.data.score}`, { notify: true })
        } else console.log(`${options.fn}: 失败,  ${JSON.stringify(res)}`)
    }


}


!(async () => {
    // console.log(await $.yiyan())
    if ($.read_env(UserClass)) {
        // await userTasks()

        // await $.userList[0].tips()

        // console.log(tip_)

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

        async request(opt, type = 'body') {
            try {
                const got = require('got')
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
            if (!this.notifyStr.length) return
            let notify = require('./sendNotify')
            this.log('\n============== 本次推送--by_yml ==============')
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
                        const res = await got('https://v1.hitokoto.cn')
                        // console.log(res.body)
                        let data = JSON.parse(res.body)
                        let data_ = `[一言]: ${data.hitokoto}  by--${data.from}`
                        // console.log(data_)
                        resolve(data_)
                    } catch (error) {
                        console.log(error.res.body)
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

        randomString(length, options = { xx: true, dx: true, sz: true }) {
            let charset = ''
            if (options.xx) {
                charset += 'abcdefghijklmnopqrstuvwxyz'
            }
            if (options.dx) {
                charset += 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'
            }
            if (options.sz) {
                charset += '0123456789'
            }
            let result = ''
            for (let i = 0; i < length; i++) {
                let randomIndex = Math.floor(Math.random() * charset.length)
                result += charset.charAt(randomIndex)
            }
            return result
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