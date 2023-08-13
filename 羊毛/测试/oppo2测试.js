/*
oppo              oppo_ck.js

-------------------  青龙-配置文件-复制区域  -------------------
# oppo 
export oppo_ck=" user # pwd @  user # pwd"  

多账号用 换行 或 @ 分割  
抓 iehuangsecond/ga/public/api/login  的 body 里面的信息

tg频道: https://t.me/yml2213_tg  
*/
const $ = Env('oppo')
const fs = require('fs')
const envSplit = ['\n', '&', '@']     //支持多种分割，但要保证变量里不存在这个字符
const ckNames = ['oppo_ck']                //支持多变量
const CryptoJS = require('crypto-js')

//====================================================================================================
var NodeRSA = require('node-rsa')


//====================================================================================================





class UserClass {
    constructor(ck) {
        this.idx = `账号[${++$.userIdx}]`
        this.ckFlog = true
        this.ck = ck.split('#')
        this.thirdId = this.ck[0]
        this.wid = this.ck[1]

        this.rsa_key = `-----BEGIN RSA PUBLIC KEY-----
        MIIBCAKCAQEAxMpgMdWl6UFsSA+/TdpdUgRYziF3J4i94QDhFancKIqjxQD7eDio
        Pf0WVEDhBVYyJrgR3+LhjWYUSAEe/y1N0samYulkO5fp0a8OQHsYuJdQ0EkrbuIw
        hhnCSSwjhr0aBRz97IYAiTcUBuJvLnEF/il7M7YMSkItwDdbRv9sJzs/Zz0LzNKu
        GvV+2KSOaM7PXTysdWuVhD6gl2Wol3g6aNLbzNhU6v1PnOlJlw/Ps6J1+XCK5LMy
        8cKwtRWgbOnhXLyIuHwwa5lhHxau2nyAjow4piGYjXqynIsIb5quOb6oUk1pAntt
        3QU4yOdXEtQFv/SBR5vreJ6wUX2lCUaDuwIBAw==
        -----END RSA PUBLIC KEY-----`

        this.hd = {
            'Host': 'oppo_ck-apig.xiaoyisz.com',
            'User-Agent': 'Mozilla/5.0 (Linux; Android 12; M2102J2SC Build/SKQ1.211006.001; wv) AppleWebKit/537.36 (KHTML, like Gecko) Version/4.0 Chrome/111.0.5563.116 Mobile Safari/537.36 XWEB/5175 MMWEBSDK/20230504 MMWEBID/1858 MicroMessenger/8.0.37.2380(0x2800255B) WeChat/arm64 Weixin NetType/WIFI Language/zh_CN ABI/arm64 miniProgram/wx532ecb3bdaaf92f9',
            'X-Requested-With': 'com.tencent.mm',
        }

    }

    async userTask() {
        console.log(`\n=============== ${this.idx} ===============`)

        $.log(`\n-------------- 开始 --------------`)
        await this.login() // 登录
        if (this.ckFlog) {
            $.log(`\n-------------- 任务 --------------`)
            // await this.dailyInfo() // 收取阳光 -- 跳过
            // await this.taskList()

        }


    }






    async login() { // 登录  
        let ts13 = $.ts(13)
        let randomToken = `${ts13}${$.randomInt(1111, 3456)}`

        let iv = '96B2A2588FB0D392108E3A72EC90FF6D'  //iv  L
        // let iv = this.random_en(32).toString().toUpperCase()  //iv  L
        let iv_ = CryptoJS.enc.Utf8.parse(iv).toString()

        let key = 'E7DB8E0C2C172AD452DD3ADDF88D96AF'  //key  P
        // let key = this.random_en(32).toString().toUpperCase()  //key P
        let key_ = CryptoJS.enc.Utf8.parse(key).toString()


        // {header: 'eyJ0eXBlIjoiSldUIiwiYWxnIjoiSFMyNTYifQ==', payload: 'eyJ1c2VybmFtZSI6ImFkbWluIiwiaWF0IjoiMTY4OTk1MDgwMzAzOCJ9'}  登录de 
        let jwt = this.encryptWithAESCTR(`{ header: 'eyJ0eXBlIjoiSldUIiwiYWxnIjoiSFMyNTYifQ==', payload: 'eyJ1c2VybmFtZSI6ImFkbWluIiwiaWF0IjoiMTY4OTk1MDgwMzAzOCJ9' }`, key_, iv_)

        console.log('iv', iv_)
        console.log('key', key_)


        let aes = this.encryptrsa(`${key_}.${iv_}`, this.rsa_key)
        // {"username":"admin","password":"8631bf7d1c89bcbf036c0f96641c631ccda7f941c69b0b61c3e319e52bf85e0f"}
        let date = this.encryptWithAESCTR('{"username":"admin","password":"8631bf7d1c89bcbf036c0f96641c631ccda7f941c69b0b61c3e319e52bf85e0f"}', key_, iv_)


        // console.log(iv, iv_, key, key_)

        let options = {
            fn: '登录',
            method: 'post',
            url: `http://192.168.99.1/api/userLoginCgi/userLogin`,
            headers: {
                'Accept': 'application/json, text/plain, */*',
                'Accept-Language': 'zh-CN,zh;q=0.9',
                'Cache-Control': 'no-cache',
                'Origin': 'http://192.168.99.1',
                'Pragma': 'no-cache',
                'Proxy-Connection': 'keep-alive',
                'Referer': 'http://192.168.99.1/login',
                'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/114.0.0.0 Safari/537.36',

            },
            json: {
                "AES": aes,
                "data": date,
                "JWT": jwt,
                "randomToken": randomToken,
                "sum": "3bfe6c8b8f0efa6b268d510ca4a1a923c528e60cbe71a1775641ae9b0faae809"
            }

        }
        console.log(options)
        // let resp = await $.request(options)
        // console.log(resp)
        // if (resp.code == 0) {
        //     this.auth = resp.data.token
        //     this.hd.Authorization = this.auth
        //     await this.userInfo()
        //     this.ckFlog = true
        // } else console.log(`${options.fn}: 失败,  ${JSON.stringify(resp)}`), this.ckFlog = false
    }

    random_en(count) {
        var alphabet = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789'
        var result = ''

        for (var i = 0; i < count; i++) {
            var randomIndex = Math.floor(Math.random() * alphabet.length)
            var randomLetter = alphabet.charAt(randomIndex)
            result += randomLetter
        }

        return result
    }
    encryptWithAESCTR(message, key, iv) {

        const keyHex = CryptoJS.enc.Hex.parse(key)
        const ivHex = CryptoJS.enc.Hex.parse(iv)

        const encrypted = CryptoJS.AES.encrypt(message, keyHex, {
            iv: ivHex,
            mode: CryptoJS.mode.CTR,
            padding: CryptoJS.pad.NoPadding
        })

        return encrypted.toString()
    }

    decryptWithAESCTR(ciphertext, key, iv) {
        const keyHex = CryptoJS.enc.Hex.parse(key)
        const ivHex = CryptoJS.enc.Hex.parse(iv)

        const decrypted = CryptoJS.AES.decrypt(ciphertext, keyHex, {
            iv: ivHex,
            mode: CryptoJS.mode.CTR,
            padding: CryptoJS.pad.NoPadding
        })

        return decrypted.toString(CryptoJS.enc.Utf8)
    }
    encryptrsa(encryptTxt, Key) {
        let nodersa = new NodeRSA('-----BEGIN PUBLIC KEY-----\n' + Key + '\n-----END PUBLIC KEY-----')
        nodersa.setOptions({ encryptionScheme: 'pkcs1' })
        let decryptText = nodersa.encrypt(encryptTxt, 'base64', 'utf8')
        return decryptText
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