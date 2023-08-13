/*
秒拼              miaopin.js


-------------------  青龙-配置文件-复制区域  -------------------
# 秒拼
export miaopin=" Api-Token @ Api-Token "  

多账号用 换行 或 @ 分割   

抓 api.miaopin.mobi 的包中的  Api-Token


tg频道: https://t.me/yml2213_tg  
*/
const $ = Env('秒拼')
const fs = require('fs')
const envSplit = ['\n', '&', '@']     //支持多种分割，但要保证变量里不存在这个字符
const ckNames = ['miaopin']                //支持多变量
const crypto = require('crypto-js')

//====================================================================================================


//====================================================================================================


class UserClass {
    constructor(ck) {
        this.idx = `账号[${++$.userIdx}]`
        this.ckFlog = true
        // this.ck = ck.split('#')
        this.token = ck

        this.aes_key = 'R4U3aAlPsUQdueEA'
        this.sign_key = "x3yh7kyz12zu3b62t7tpspmwqhhukydb"




    }

    async userTask() { // 个人信息
        console.log(`\n=============== ${this.idx} ===============`)

        $.log(`\n-------------- 开始 --------------`)
        // await this.send_code('15614832213')  // 短信验证码
        // await this.login('15614832213', '389359')  // 登录
        await this.sign_do(1)  // 签到
        // await this.sign_do(2)  // 签到

        // await this.init()

    }




    // 71c8e0134374c13a91e4dd8078ba0b7c5c64b2f2f46193bc39fdab343e3b2673,1689877997
    async send_code(phone) { // 发送短信验证码
        let ts10 = $.ts(10)
        // let ts10 = '1689877997'

        let a = `${ts10}mobile=${phone}&type=login`

        let sign = crypto.HmacSHA256(a, this.sign_key).toString(crypto.enc.Hex)
        sign = `${sign},${ts10}`

        let b = `type=login&mobile=${phone}`
        b = this.encodeBase64(b)
        let form_ = this.encrypt(b)


        let options = {
            fn: '发送短信验证码',
            method: 'post',
            url: `https://api.miaopin.mobi/mobile.send.code.do`,
            headers: {
                'Api-Ver': '1.2.4',
                'Api-Sign': sign,
                'user-agent': 'Mozilla/5.0 (Linux; Android 12; M2102J2SC Build/SKQ1.211006.001; wv) AppleWebKit/537.36 (KHTML, like Gecko) Version/4.0 Chrome/115.0.5790.85 Mobile Safari/537.36 uni-app Html5Plus/1.0 (Immersed/32.727272)'
            },
            form: {
                'x': form_
            }
        }
        console.log(options)
        let resp = await $.request(options)
        // console.log(resp)

        resp = this.decrypt_body(resp)
        console.log(resp)
        console.log(typeof resp)

        if (resp.code == 0) {

            $.log(`${this.idx}:${options.fn} -- ${resp.msg}`)
            // await this.login(phone)

        } else console.log(`${options.fn}: 失败,  ${JSON.stringify(resp)}`)
    }

    // 1689878006code=074052&invite_code=&mobile=15614832213
    async login(phone, code) { // 登录
        let ts10 = $.ts(10)
        let a = `${ts10}code=${code}&invite_code=&mobile=${phone}`
        let sign = crypto.HmacSHA256(a, this.sign_key).toString(crypto.enc.Hex)
        sign = `${sign},${ts10}`

        // mobile=15614832213&code=074052&invite_code=
        let b = `mobile=${phone}&code=${code}&invite_code=`
        b = this.encodeBase64(b)
        let form_ = this.encrypt(b)


        let options = {
            fn: '登录',
            method: 'post',
            url: `https://api.miaopin.mobi/login.do`,
            headers: {
                'Api-Ver': '1.2.4',
                'Api-Sign': sign,
                'user-agent': 'Mozilla/5.0 (Linux; Android 12; M2102J2SC Build/SKQ1.211006.001; wv) AppleWebKit/537.36 (KHTML, like Gecko) Version/4.0 Chrome/115.0.5790.85 Mobile Safari/537.36 uni-app Html5Plus/1.0 (Immersed/32.727272)'
            },
            form: {
                'x': form_
            }
        }
        console.log(options)
        let resp = await $.request(options)
        // console.log(resp)

        resp = this.decrypt_body(resp)
        console.log(resp)
        console.log(typeof resp)

        if (resp.code == 0) {

            this.token = resp.data.token
            this.invite_code = resp.data.user.invite_code
            this.nickname = resp.data.user.nickname
            $.log(`${this.idx}:  ${this.nickname}, ${options.fn} -- ${resp.msg}, token: ${resp.data.token}, invite_code: ${resp.data.user.invite_code}`)

        } else console.log(`${options.fn}: 失败,  ${JSON.stringify(resp)}`)
    }


    // 1689904989type=2
    async sign_do(unm) { // 签到

        let ts10 = $.ts(10)
        let a = `${ts10}type=${unm}`
        let sign = crypto.HmacSHA256(a, this.sign_key).toString(crypto.enc.Hex)
        sign = `${sign},${ts10}`

        // mobile=15614832213&code=074052&invite_code=
        let b = `type=${unm}`
        b = this.encodeBase64(b)
        let form_ = this.encrypt(b)


        let options = {
            fn: '签到',
            method: 'post',
            url: `https://api.miaopin.mobi/member.signin.do`,
            headers: {
                'Api-Ver': '1.2.4',
                'Api-Sign': sign,
                'Api-Token': this.token,
                'user-agent': 'Mozilla/5.0 (Linux; Android 12; M2102J2SC Build/SKQ1.211006.001; wv) AppleWebKit/537.36 (KHTML, like Gecko) Version/4.0 Chrome/115.0.5790.85 Mobile Safari/537.36 uni-app Html5Plus/1.0 (Immersed/32.727272)'
            },
            form: {
                'x': form_
            }
        }
        // console.log(options)
        let resp = await $.request(options)
        // console.log(resp)

        resp = this.decrypt_body(resp)
        // console.log(resp)
        // console.log(typeof resp)
        if (resp.code == 0) {
            $.log(`${this.idx}: ${options.fn} -- ${resp.msg}, 获得金条: ${resp.data.data.golds}, 获得银条: ${resp.data.data.silvers}`, { notify: true })
        } else if (resp.code == 400) {
            $.log(`${this.idx}: ${options.fn} -- ${resp.msg}`, { notify: true })
        } else console.log(`${options.fn}: 失败,  ${JSON.stringify(resp)}`)
    }

    // https://api.miaopin.mobi/video.task.get
    async video() { // 视频

        let options = {
            fn: '视频',
            method: 'get',
            url: `https://api.miaopin.mobi/video.task.get`,
            headers: {
                'Api-Ver': '1.2.4',
                'Api-Token': this.token,
                'user-agent': 'Mozilla/5.0 (Linux; Android 12; M2102J2SC Build/SKQ1.211006.001; wv) AppleWebKit/537.36 (KHTML, like Gecko) Version/4.0 Chrome/115.0.5790.85 Mobile Safari/537.36 uni-app Html5Plus/1.0 (Immersed/32.727272)'
            },

        }
        // console.log(options)
        let resp = await $.request(options)
        // console.log(resp)

        resp = this.decrypt_body(resp)
        console.log(resp)
        // console.log(typeof resp)
        if (resp.code == 0) {
            await this.sign_do()  // 签到

        } else if (resp.code == 400) {
            $.log(`${this.idx}: ${options.fn} -- ${resp.msg}`, { notify: true })
        } else console.log(`${options.fn}: 失败,  ${JSON.stringify(resp)}`)
    }



    decrypt_body(t) { // 解密body
        var t = t.replace(/\"/g, "").replace(/\\\//g, "/")
        let e = this.aes_key
        var i = crypto.enc.Utf8.parse(e),
            a = crypto.AES.decrypt(t, i, {
                mode: crypto.mode.ECB,
                padding: crypto.pad.Pkcs7
            }),
            n = a.toString(crypto.enc.Utf8)
        return JSON.parse(n)
    }
    decrypt(t) { // 解密
        // var t = this.decodeBase64(t);
        let e = this.aes_key
        var i = crypto.enc.Utf8.parse(e),
            a = crypto.AES.decrypt(t, i, {
                mode: crypto.mode.ECB,
                padding: crypto.pad.Pkcs7
            }),
            n = a.toString(crypto.enc.Utf8)
        n = this.decodeBase64(n)
        return n
    }

    encrypt(t) {  // 加密
        let e = this.aes_key
        // t = p.default.encode(t)
        var i = crypto.enc.Utf8.parse(e),
            a = crypto.AES.encrypt(t, i, {
                mode: crypto.mode.ECB,
                padding: crypto.pad.Pkcs7
            })
        return a.toString()
    }


    decodeBase64(base64String) {
        const Buffer = require('buffer').Buffer
        const decodedBuffer = Buffer.from(base64String, 'base64')
        const decodedString = decodedBuffer.toString('utf8')
        return decodedString
    }

    encodeBase64(string) {
        const Buffer = require('buffer').Buffer
        const encodedBuffer = Buffer.from(string, 'utf8')
        const encodedString = encodedBuffer.toString('base64')
        return encodedString
    }




}


!(async () => {
    console.log(await $.yiyan())
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

        async request(opt, type = 'body') {
            try {
                const got = require('got')
                let DEFAULT_TIMEOUT = 20 * 1000      // 默认超时时间
                let resp = null
                let fn = opt.fn || opt.url
                opt.timeout = opt.timeout || DEFAULT_TIMEOUT
                opt.retry = opt.retry || { limit: 0 }
                opt.method = opt?.method?.toUpperCase() || 'GET'
                try {
                    resp = await got(opt)
                } catch (e) {
                    console.log(e)
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
            await this.showmsg()
            let e = Date.now()
            let s = (e - this.startTime) / 1000
            this.log(`[${this.name}]运行结束，共运行了${s}秒`)
            process.exit(0)
        }
    }(name)
}