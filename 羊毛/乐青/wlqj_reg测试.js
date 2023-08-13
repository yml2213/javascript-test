/*
e览衢江注册机              elqj_reg.js

-------------------  青龙-配置文件-复制区域  -------------------
# e览衢江注册机 
export elqj_reg=" user # pwd @  user # pwd"  

多账号用 换行 或 @ 分割  

tg频道: https://t.me/yml2213_tg  
*/
const $ = Env('e览衢江注册机')
const fs = require('fs')
const envSplit = ['\n', '&', '@']     //支持多种分割，但要保证变量里不存在这个字符
const ckNames = ['elqj_reg']                //支持多变量
const crypto = require('crypto-js')

//====================================================================================================

let device_no = `00000000-6641-8460-0000-000011${$.randomString(6)}`
let api = 'api.haozhuma.com'
let api_back = 'api.6333600.com'

let hostName = `http://${api}`


let sid = '68175'  // 衢江传媒集团
//====================================================================================================


class UserClass {
    constructor(ck) {
        this.idx = `账号[${++$.userIdx}]`
        this.ckFlog = true
        this.ck = ck.split('#')
        this.user = this.ck[0]
        this.pwd = this.ck[1]

        this.client_id = '10035'

        this.hd = {
            'User-Agent': 'Mozilla/5.0 (Linux; Android 12; M2102J2SC Build/SKQ1.211006.001; wv) AppleWebKit/537.36 (KHTML, like Gecko) Version/4.0 Chrome/114.0.5735.196 Mobile Safari/537.36;xsb_qujiang;xsb_qujiang;2.0.0;native_app',
            'Cookie': ''
        }

    }

    async userTask() {
        console.log(`\n=============== ${this.idx} ===============`)



        // await this.get_img()

        $.log(`\n-------------- 开始 --------------`)
        await this.login() // 登录
        if (this.ckFlog) {
            $.log(`\n-------------- 任务列表 --------------`)

            // await this.start()
            await this.tt()

        }


    }


    async tt() {
        //  let signature_key = await this.get_signature_key()
        let signature_key = 'MvFzbzrbRQuCG4ZW8vYB'
        let aa1 = `post%%/web/security/send_security_code?client_id=10035&phone_number=16582963567%%76f6e4de-14e8-4efe-93c0-8b312145bda9%%`
        // let aa = `post%%/web/security/send_security_code?client_id=${this.client_id}&phone_number=${phone}%%76f6e4de-14e8-4efe-93c0-${$.randomString(12)}%%`
        let sign = crypto.HmacSHA256(aa1, signature_key).toString(crypto.enc.Hex)
        console.log(sign)
    }

    async start() {
        this.phone = await this.getPhone(sid)   // 获取手机号
        await this.checkPhone(this.phone) //检查手机号--是否注册

    }

    async checkPhone(phone) { // 检查手机号--是否注册
        let options = {
            fn: '检查手机号',
            method: 'get',
            url: `https://passport.tmuyun.com/web/account/check_phone_number?client_id=${this.client_id}&phone_number=${phone}`,
            headers: this.hd,

        }
        // console.log(options)
        let resp = await $.request(options)
        // console.log(resp)
        if (resp.code == 0 && resp.data.exist == true) {
            // this.account_id = resp.data.rst.id
            $.log(`${this.idx}: ${options.fn} ${phone} 已经被别人玩过了, 拉黑继续下一个`)
            await this.addBlacklist(sid, phone)
            await this.start()

        } else if (resp.code == 0 && resp.data.exist == false) {
            await this.get_img(phone)  // 获取本地验证码
        } else console.log(`${options.fn}: 失败,  ${JSON.stringify(resp)}`)
    }


    async get_img(phone) { // 获取本地验证码
        let options = {
            fn: '获取本地验证码',
            method: 'get',
            url: `https://passport.tmuyun.com/web/security/captcha_image`,
            headers: this.hd,
            responseType: 'buffer',

        }
        // console.log(options)
        let resp = await $.request(options)
        // console.log(resp)
        let img_base64 = resp.toString('base64')
        // console.log(img_base64)
        let bd_code = await this.recognition_coed(img_base64)  // 识别本地验证码
        await this.sendSmscode(bd_code, phone)

    }

    async recognition_coed(img_base64) { // 识别本地验证码
        let options = {
            fn: '识别验证码',
            method: 'post',
            url: `http://81.70.196.85:9898/ocr/b64/json`,
            headers: {
                "content-type": "application/json; charset=utf-8",
            },
            body: img_base64
        }
        // console.log(options)
        let resp = await $.request(options)
        // console.log(resp)
        if (resp.status == 200 && resp.msg == '') {
            let bd_code = resp.result
            if (bd_code.length == 4) {
                $.log(`识别成功:${bd_code}`)
                return bd_code
            } else {
                $.log(`识别失败1: ${resp.msg}`)
                await start()
            }
        } else if (resp.msg != '') {
            $.log(`识别失败2: ${resp.msg}`)
            await start()
        } else {
            $.log(`未知错误!`)
        }

    }

    async sendSmscode(bd_code, phone) { // 发送短信验证码  captcha=6455&client_id=this.client_id&phone_number=16236610591
        let signature_key = await this.get_signature_key()
        // post%%/web/security/send_security_code?client_id=10035&phone_number=16582963567%%76f6e4de-14e8-4efe-93c0-8b312145bda9%%
        let aa = `post%%/web/security/send_security_code?client_id=${this.client_id}&phone_number=${phone}%%76f6e4de-14e8-4efe-93c0-${$.randomString(12)}%%`
        let sign = crypto.HmacSHA256(aa, signature_key).toString()
        console.log('发送短信验证码', phone, bd_code)
        let options = {
            fn: '发送短信验证码',
            method: 'post',
            url: `https://passport.tmuyun.com/web/security/send_security_code`,
            headers: {
                'Cache-Control': 'no-cache',
                'User-Agent': 'ANDROID;12;10035;2.0.0;1.0;null;M2102J2SC',
                'X-SIGNATURE': sign,
                'Host': 'passport.tmuyun.com',
                'Cookie': '',
            },
            form: {
                'captcha': bd_code,
                'client_id': this.client_id,
                'phone_number': phone
            }

        }
        console.log(options)
        let resp = await $.request(options)
        // console.log(resp)
        if (resp.code == 0) {
            await this.getSmscode(phone)
        } else {
            console.log(`${options.fn}: 失败,  ${JSON.stringify(resp)}`)
            // await this.start(1)  // 开始答题

        }

    }


    async get_signature_key() { // 获取加密秘钥
        let options = {
            fn: '获取加密秘钥',
            method: 'get',
            url: `https://passport.tmuyun.com/web/init?client_id=${this.client_id}`,
            headers: this.hd,
        }
        // console.log(options)
        let resp = await $.request(options)
        // console.log(resp)
        if (resp.code == 0) {
            return resp.data.client.signature_key

        } else return false
    }

    async getSmscode(phone) { // 获取短信验证码
        this.smsCode = await this.getMessage(sid, phone)   // 获取验证码
        if (this.smsCode == 1) {
            for (let i = 0; i < 1; i++) {
                if (this.smsCode == 1) {
                    await $.wait(10)
                    await this.getMessage(sid, phone)
                } else if (this.smsCode.length == 6) {
                    // console.log(`================`)
                    console.log(this.smsCode)
                    await this.cancelRecv(phone) //释放手机号
                    break
                }
            }
            if (this.smsCode == 1) {
                console.log(`拉黑`)
                await this.addBlacklist(sid, phone)
                // await this.getPhone(sid)
            } else {
                await this.security_code_auth(this.smsCode, phone) //释放手机号

            }
        }
    }


    async security_code_auth(smsCode, phone) { // 获取登录code  
        let options = {
            fn: '获取登录code',
            method: 'post',
            url: `https://passport.tmuyun.com/web/oauth/security_code_auth`,
            headers: this.hd,
            form: {
                'captcha': smsCode,
                'client_id': this.client_id,
                'phone_number': phone
            }

        }
        // console.log(options)
        let resp = await $.request(options)
        // console.log(resp)
        if (resp.code == 0) {
            this.login_code = resp.data.authorization_code.code
            $.log(`${this.idx}: 登录code: ${this.login_code}`)
            await this.login_elqj(this.login_code)

        } else {
            console.log(`${options.fn}: 失败,  ${JSON.stringify(resp)}`)
            // await this.start(1)  // 开始答题

        }

    }



    async login_elqj(code) { // 登录
        let options = {
            fn: '登录',
            method: 'post',
            url: `https://vapp.tmuyun.com/api/zbtxz/login`,
            headers: this.hd,
            form: {
                'code': code,
                'token': '',
                'type': -1,
                'union_id': '',
            }

        }
        // console.log(options)
        let resp = await $.request(options)
        // console.log(resp)
        if (resp.code == 0) {
            this.SESSION = resp.data.session.id
            $.log(`${this.idx}: 登录: ${resp.message}, 你的session:${resp.message}`)
        } else {
            console.log(`${options.fn}: 失败,  ${JSON.stringify(resp)}`)
            // await this.start(1)  // 开始答题

        }

    }


    // http://服务器地址/sms/?api=login&user=用户名&pass=密码  GET/POST 都行
    async login() { // 登录
        let options = {
            fn: '登录',
            method: 'get',
            url: `${hostName}/sms/?api=login&user=${this.user}&pass=${this.pwd}`,
            headers: {},

        }
        // console.log(options)
        let resp = await $.request(options)
        // console.log(resp)
        if (resp.code == 0) {
            // this.account_id = resp.data.rst.id
            $.log(`${this.idx}: ${options.fn} ${resp.msg}, token :${resp.token}`)
            this.token = resp.token
            await this.userInfo(1) ? this.ckFlog = true : this.ckFlog = false
        } else console.log(`${options.fn}: 失败,  ${JSON.stringify(resp)}`), this.ckFlog = false
    }

    // http://服务器地址/sms/?api=getSummary&token=令牌  GET/POST 都行
    async userInfo(type) { // 个人信息  type: 1 打印余额 2 直接判断
        let options = {
            fn: '个人信息',
            method: 'get',
            url: `${hostName}/sms/?api=getSummary&token=${this.token}`,
            headers: {},

        }
        // console.log(options)
        let resp = await $.request(options)
        // console.log(resp)
        if (resp.code == 0) {
            if (type == 1) {
                this.money = resp.money
                $.log(`${this.idx}: 余额:${resp.money} 元`)
                if (this.money < 0.13) {
                    $.log(`${this.idx}: 余额:${resp.money} 元, 没钱了, 快去充值吧!`)
                    return false
                } else {
                    $.log(`${this.idx}: 余额:${resp.money} 元, 挺有钱呀, 不说给我发个红包!`)
                    return true
                }
            } else {
                this.money = resp.money
                $.log(`${this.idx}: 余额:${resp.money} 元`)
                if (this.money < 0.13) {
                    return false
                } else return true
            }


        } else console.log(`${options.fn}: 失败,  ${JSON.stringify(resp)}`)
    }

    // http://服务器地址/sms/?api=getPhone&token=用户令牌&sid=项目ID&Province=省份  GET/POST 都行
    async getPhone(sid) { // 获取手机号
        let options = {
            fn: '获取手机号',
            method: 'get',
            url: `${hostName}/sms/?api=getPhone&token=${this.token}&sid=${sid}`,
            headers: {},
        }
        // console.log(options)
        let resp = await $.request(options)
        // console.log(resp)
        if (resp.code == 0) {
            this.phone = resp.phone
            $.log(`${options.fn}: 当前手机号:${resp.phone}, 当前项目:${resp.sid}--${resp.shop_name}, 其他信息:${resp.phone_gsd}-${resp.sp}`)
            return this.phone
        } else console.log(`${options.fn}: 失败,  ${JSON.stringify(resp)}`)
    }


    // http://服务器地址/sms/?api=getMessage&token=用户令牌&sid=项目ID&phone=手机号
    async getMessage(sid, phone) { // 获取验证码  成功返回验证吗, 失败返回 false 
        let options = {
            fn: '获取验证码',
            method: 'get',
            url: `${hostName}/sms/?api=getMessage&token=${this.token}&sid=${sid}&phone=${phone}`,
            headers: {},
        }
        // console.log(options)
        let resp = await $.request(options)
        console.log(resp)
        if (resp.code == 0) {
            $.log(`${options.fn}: 当前手机号:${phone}, 验证吗为:${resp.yzm}, 完整信息:${resp.sms}`)

            return this.smsCode = resp.yzm
        } else if (resp.code == -1 && resp.msg == '等待') {

            return 1
        }
    }

    // http://服务器地址/sms/?api=cancelRecv&token=用户令牌&sid=项目ID&country_code=国家代码&phone=手机号  GET/POST 都行
    async cancelRecv(phone) { // 释放手机号
        let options = {
            fn: '释放手机号',
            method: 'get',
            url: `${hostName}/sms/?api=cancelRecv&token=${this.token}&country_code=+86&phone=${phone}`,
            headers: {},
        }
        // console.log(options)
        let resp = await $.request(options)
        // console.log(resp)
        if (resp.code == 0) {
            this.phone = resp.phone
            $.log(`${options.fn}: 释放手机号: ${phone}--${resp.msg}`)

        } else console.log(`${options.fn}: 失败,  ${JSON.stringify(resp)}`)
    }

    // http://服务器地址/sms/?api=addBlacklist&token=用户令牌&sid=项目ID&country_code=国家代码&phone=手机号
    async addBlacklist(sid, phone) { // 拉黑手机号
        let options = {
            fn: '拉黑手机号',
            method: 'get',
            url: `${hostName}/sms/?api=addBlacklist&token=${this.token}&sid=${sid}&country_code=+86&phone=${phone}`,
            headers: {},
        }
        // console.log(options)
        let resp = await $.request(options)
        // console.log(resp)
        if (resp.code == 0) {
            this.phone = resp.phone
            $.log(`${options.fn}: 拉黑手机号: ${phone}--${resp.msg}`)
        } else console.log(`${options.fn}: 失败,  ${JSON.stringify(resp)}`)
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