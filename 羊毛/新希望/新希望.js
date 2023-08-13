/*
新希望邀请  他信            新希望.js

-------------------  青龙-配置文件-复制区域  -------------------
# 新希望希望会
export xxw="authorization"  

他信账号密码在下方填写
多账号用 换行 或 @ 分割  

tg频道: https://t.me/yml2213_tg  
*/

require('dotenv').config()
const $ = Env('新希望邀请')
const fs = require('fs')
const envSplit = ['\n', '&', '@']     //支持多种分割，但要保证变量里不存在这个字符
const ckNames = ['xxw']                //支持多变量
const crypto = require('crypto-js')

//====================================================================================================

let api = 'api.my531.com'
let hostName = `http://${api}`


let sid = '32445'  // 新希望希望会

let user = 'yml2213'//他信账号
let pwd = 'yml123123'//他信密码
//====================================================================================================





class UserClass {
    constructor(ck) {
        this.idx = `账号[${++$.userIdx}]`
        this.ckFlog = true
        this.ck = ck

    }

    async userTask() {
        console.log(`\n=============== ${this.idx} ===============`)

        // await this.get_img()

        $.log(`\n-------------- 开始 --------------`)
        await this.info()
        if (this.ckFlog) {
            await this.sign()   //签到
            await this.find()   // 抽奖查询
            await this.poin()   // 邀请
            $.log(`\n-------------- 积分查询 --------------`)
            await this.userInfo()

        }

    }

    async info() {
        let options = {
            fn: '个人信息',
            method: 'get',
            url: `https://xwyapi.newhope.cn/customer/custom/info`,
            headers: {
                "Host": "xwyapi.newhope.cn",
                "authorization": `Bearer ${this.ck}`,
                "charset": "utf-8",
                "x-requested-with": "XMLHttpRequest",
                "Content-Type": "application/x-www-form-urlencoded",
            }
        }
        // console.log(options)
        let resp = await $.request(options)
        //  console.log(resp)
        if (resp.code == "0000") {
            this.customerId = resp.body.customerId  //个人id
            this.mobile = resp.body.mobile  //手机号
            this.ckFlog = true
        } else {
            console.log(`${options.fn}: 失败,  ${JSON.stringify(resp)}`), this.ckFlog = false
        }
    }
    async sign() {
        let options = {
            fn: '签到',
            method: 'post',
            url: `https://xwyapi.newhope.cn/customer/score/pointsIssuance`,
            headers: {
                "Host": "xwyapi.newhope.cn",
                "authorization": `Bearer ${this.ck}`,
                "charset": "utf-8",
                "x-requested-with": "XMLHttpRequest",
                "Content-Type": "application/json;charset=utf8",
            },
            json: {
                mobile: this.mobile,
                action: "signIn"
            }
        }
        // console.log(options)
        let resp = await $.request(options)
        //   console.log(resp)
        if (resp.body.ifSignIn == false) {
            $.log(`账号${this.mobile}:${options.fn} 获得积分${resp.body.integral}`)
        } else if (resp.body.ifSignIn == true) {
            $.log(`账号${this.mobile}:已${options.fn} `)
        } else {
            console.log(`${options.fn}: 失败,  ${JSON.stringify(resp)}`)
        }
    }
    async find() {
        let options = {
            fn: '抽奖查询',
            method: 'get',
            url: `https://xwyapi.newhope.cn/xwh-mall/xwhTurntableLottery/findTurntableTitle`,
            headers: {
                "Host": "xwyapi.newhope.cn",
                "authorization": `Bearer ${this.ck}`,
                "charset": "utf-8",
                "x-requested-with": "XMLHttpRequest",
                "Content-Type": "application/x-www-form-urlencoded",
            }
        }
        //   console.log(options)
        let resp = await $.request(options)
        //  console.log(resp)
        if (resp.code == "0000") {
            if (resp.body.remain == 3) {
                await this.cj()
            } else {
                $.log(`账号${this.mobile}:${options.fn}免费抽奖已用完 `)
            }
        } else {
            console.log(`${options.fn}: 失败,  ${JSON.stringify(resp)}`)
        }
    }
    async cj() {
        let options = {
            fn: '抽奖',
            method: 'get',
            url: `https://xwyapi.newhope.cn/xwh-mall/xwhTurntableLottery/draw`,
            headers: {
                "Host": "xwyapi.newhope.cn",
                "authorization": `Bearer ${this.ck}`,
                "charset": "utf-8",
                "x-requested-with": "XMLHttpRequest",
                "Content-Type": "application/json;charset\u003dutf8",
            }
        }
        // console.log(options)
        let resp = await $.request(options)
        //   console.log(resp)
        if (resp.code == "0000") {
            $.log(`账号${this.mobile}:${options.fn} 完成`)
        } else {
            console.log(`${options.fn}: 失败,  ${JSON.stringify(resp)}`)
        }
    }
    async poin() {
        let options = {
            fn: '',
            method: 'get',
            url: `https://xwyapi.newhope.cn/customer/score/pointsDetails?type=2`,
            headers: {
                "Host": "xwyapi.newhope.cn",
                "authorization": `Bearer ${this.ck}`,
                "charset": "utf-8",
                "x-requested-with": "XMLHttpRequest",
                "Content-Type": "application/x-www-form-urlencoded",
            }
        }
        // console.log(options)
        let resp = await $.request(options)
        //  console.log(resp)
        if (resp.code == "0000") {
            if (resp.body[0].changeValue == "28.0000") {
                $.log(`账号${this.mobile}:邀请完成 `)
            } else {
                $.log(`账号${this.mobile}:邀请未完成 `)
                await this.login()
            }
        } else {
            console.log(`${options.fn}: 失败,  ${JSON.stringify(resp)}`)
        }
    }
    async userInfo() {
        let options = {
            fn: '总积分',
            method: 'get',
            url: `https://xwyapi.newhope.cn/customer/xwh/userInfo`,
            headers: {
                "Host": "xwyapi.newhope.cn",
                "authorization": `Bearer ${this.ck}`,
                "charset": "utf-8",
                "x-requested-with": "XMLHttpRequest",
                "Content-Type": "application/x-www-form-urlencoded",
            }
        }
        // console.log(options)
        let resp = await $.request(options)
        //  console.log(resp)
        if (resp.code == "0000") {
            $.log(`账号${this.mobile}:总积分${resp.body.score}`, { notify: true })
        } else {
            console.log(`${options.fn}: 失败,  ${JSON.stringify(resp)}`)
        }
    }
    async sendSmscode() {
        this.phone = await this.getPhone(sid)   // 获取手机号
        let options = {
            fn: '发送短信验证码',
            method: 'get',
            url: `https://xwyapi.newhope.cn/customer/v2/login/send?mobile=${this.phone}`,
            headers: {
                "Host": "xwyapi.newhope.cn",
                "charset": "utf-8",
                "x-requested-with": "XMLHttpRequest",
                "Content-Type": "application/x-www-form-urlencoded",

            }

        }
        // console.log(options)
        let resp = await $.request(options)
        // console.log(resp)
        if (resp.code == "0000") {
            console.log(`${options.fn}: 成功!`)
            await this.getSmscode()

        } else {
            console.log(`${options.fn}: 失败,  ${JSON.stringify(resp)}`)

        }

    }

    async getSmscode() { // 获取短信验证码

        this.smsCode = await this.getMessage(sid,)   // 获取验证码
        if (this.smsCode == 1) {
            for (let i = 0; i < 5; i++) {
                if (this.smsCode == 1) {
                    await $.wait(10)
                    await this.getMessage(sid, this.phone)
                } else if (this.smsCode.length == 6) {
                    // console.log(`================`)
                    // console.log(this.smsCode)
                    // await this.cancelRecv(sid, this.phone) //释放手机号
                    break
                }
            }
            if (this.smsCode == 1) {
                console.log(`拉黑`)
                await this.addBlacklist(sid, this.phone)
                await this.sendSmscode()
            } else {
                await this.security_code_auth(this.smsCode, this.phone) //释放手机号

            }
        }
    }


    async security_code_auth(smsCode, phone) { // 获取登录code    client_id=10035&this.phone_number=16582963567&security_code=292419
        let options = {
            fn: '获取登录token',
            method: 'post',
            url: `https://xwyapi.newhope.cn/customer/v2/login/mobile`,
            headers: {
                "Host": "xwyapi.newhope.cn",
                "charset": "utf-8",
                "x-requested-with": "XMLHttpRequest",
                "Content-Type": "application/x-www-form-urlencoded",
            },
            form: {
                'mobile': this.phone,
                'verifyCode': this.smsCode
            }

        }
        //  console.log(options)
        let resp = await $.request(options)
        // console.log(resp)
        if (resp.code == "0000") {
            this.toke = resp.body.token
            let data = `${this.phone}-------${this.toke}`
            await this.updata(data)
            $.log(`${this.idx}: 获取token: ${resp.message} ${this.toke}   `)
            await this.login_elqj()

        } else {
            console.log(`${options.fn}: 失败,  ${JSON.stringify(resp)}`)

        }

    }
    async updata(a) {
        var content = a
        try {
            //var content = '\n'+content
            var content = `${content}\n`
            console.log(`写入 ${content}`)
            fs.appendFile('./xxw.txt', content, { flag: 'a+' }, err => {
                if (err) {
                    console.error(err)
                    return
                }
            })
        } catch (e) {
        } finally {
            return Promise.resolve(1)
        }
    }

    async login_elqj() {
        let ts13 = $.ts(13)

        let options = {
            fn: '邀请',
            method: 'post',
            url: `https://xwyapi.newhope.cn/customer/invite/save`,
            headers: {
                "Host": "xwyapi.newhope.cn",
                "authorization": `Bearer ${this.toke}`,
                "charset": "utf-8",
                "x-requested-with": "XMLHttpRequest",
                "Content-Type": "application/json;charset\u003dutf8",
            },
            json: {
                createTime: Number(ts13),
                type: 0,
                parentId: this.customerId
            }

        }
        // console.log(options)
        let resp = await $.request(options)
        //   console.log(resp)
        if (resp.code == "0000") {

            $.log(`${this.idx}: 邀请: ${resp.message}`)

        } else {
            console.log(`${options.fn}: 失败,  ${JSON.stringify(resp)}`)

        }

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
                await this.start_reg()
            }
        } else if (resp.msg != '') {
            $.log(`识别失败2: ${resp.msg}`)
            await this.start_reg()
        } else {
            $.log(`未知错误!`)
        }

    }

    // http://服务器地址/sms/?api=login&user=用户名&pass=密码  GET/POST 都行
    async login() { // 登录
        let options = {
            fn: '登录',
            method: 'get',
            url: `${hostName}/Login/?username=${user}&password=${pwd}&type=json`,
            headers: {},
        }
        //  console.log(options)
        let resp = await $.request(options)
        // console.log(resp)
        if (resp.code == 1) {
            // this.account_id = resp.data.rst.id
            $.log(`${this.idx}: ${options.fn} ${resp.message}, 余额:${resp.data.money}, token :${resp.data.token}`)
            this.token = resp.data.token
            await this.sendSmscode()
        } else console.log(`${options.fn}: 失败,  ${JSON.stringify(resp)}`), this.ckFlog = false
    }



    // http://api.my531.com/Login/?username=用户名&password=密码  GET/POST 都行
    async getPhone(sid) { // 获取手机号
        let options = {
            fn: '获取手机号',
            method: 'get',
            url: `${hostName}/GetPhone/?token=${this.token}&id=${sid}&type=json`,
            headers: {},
        }
        // console.log(options)
        let resp = await $.request(options)
        // console.log(resp)
        if (resp.code == 1) {
            this.phone = resp.data
            $.log(`${options.fn}: 当前手机号:${resp.data}`)
            return this.phone
        } else console.log(`${options.fn}: 失败,  ${JSON.stringify(resp)}`)
    }


    // http://服务器地址/sms/?api=getMessage&token=用户令牌&sid=项目ID&phone=手机号
    async getMessage(sid, phone) { // 获取验证码  
        let options = {
            fn: '获取验证码',
            method: 'get',
            url: `${hostName}/GetMsg/?token=${this.token}&id=${sid}&phone=${this.phone}&type=json&dev=Marchzl`,
            headers: {},
        }
        // console.log(options)
        let resp = await $.request(options)
        //  console.log(resp)
        if (resp.code == 1) {
            $.log(`${options.fn}: 当前手机号:${this.phone}, 短信为:${resp.data}`)

            this.smsCode = resp.data.split('验证码是')[1].split('（')[0]


            return this.smsCode
        } else if (resp.code == -1) {
            $.log(`${options.fn}: 当前手机号:${this.phone}, 验证吗还没来, 在等一下下.......`)
            return 1
        }
    }

    // http://服务器地址/sms/?api=cancelRecv&token=用户令牌&sid=项目ID&country_code=国家代码&this.phone=手机号  GET/POST 都行
    async cancelRecv(sid, phone) { // 释放手机号
        let options = {
            fn: '释放手机号',
            method: 'get',
            url: `${hostName}/Cancel/?token=${this.token}&id=${sid}&phone=${this.phone}&type=json`,
            headers: {},
        }
        // console.log(options)
        let resp = await $.request(options)
        // console.log(resp)
        if (resp.code == 200) {
            this.phone = resp.phone
            $.log(`${options.fn}: 释放手机号: ${this.phone}--${resp.msg}`)

        } else console.log(`${options.fn}: 失败,  ${JSON.stringify(resp)}`)
    }

    // http://服务器地址/sms/?api=addBlacklist&token=用户令牌&sid=项目ID&country_code=国家代码&phone=手机号
    async addBlacklist(sid, phone) { // 拉黑手机号
        let options = {
            fn: '拉黑手机号',
            method: 'get',
            url: `${hostName}/Addblack/?token=${this.token}&id=${sid}&phone=${this.phone}`,
            headers: {},
        }
        // console.log(options)
        let resp = await $.request(options)
        // console.log(resp)
        if (resp.code == 0) {
            this.phone = resp.phone
            $.log(`${options.fn}: 拉黑手机号: ${this.phone}--${resp.msg}\n继续获取手机号`)

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
    .catch((e) => {
        console.log(e)
        this.notifyStr.push(`出错了: 错误详情:\n${e}`)
    })
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


            // console.log(`=====================================`)
            // console.log(this.notifyStr)
            // console.log(`=====================================`)

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