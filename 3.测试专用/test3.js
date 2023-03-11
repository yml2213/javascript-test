const $ = Env('慢慢买')
const notify = require('./sendNotify')
const crypto = require('crypto-js')

const envSplitor = ['\n', '&', '@']     //支持多种分割，但要保证变量里不存在这个字符
//====================================================================================================


async function userTasks() {


    $.log('登录', { sp: true, console: false })  // 带分割的打印
    let list = []
    for (let user of $.userList) {
        list.push(user.login())
    }
    await Promise.all(list)

    $.log('任务列表', { sp: true, console: false })
    list = []
    for (let user of $.userList) {
        if (user.ckFlog) {
            list.push(user.task_1())
        }
    }
    await Promise.all(list)


}


class UserClass {
    constructor(ck) {
        this.idx = `账号[${++$.userIdx}]`
        this.ckFlog = true
        this.ck = ck.split('#')
        this.token = this.ck[0]
        this.ts = $.ts(13)
        this.code = '65'
        this.token = '1633660361038946305'
        this.version = '1.0.0'

        this.hd = {
            'charset': 'utf-8',
            'api_timestamp': this.ts,
            'api_token': this.token,
            'api_sign': '',
            'api_version': this.version,
            'api_client_code': this.code,
            'content-type': 'application/json'
        }
    }


    async login() { // 登录
        let options = {
            fn: '登录',
            method: 'post',
            url: `https://atom.musiyoujia.com/member/wechatlogin/selectuserinfo`,
            headers: this.hd,
            json: {
                "appId": "wx03527497c5369a2c",
                "appType": "WECHAT_MINI_PROGRAM",
                "openId": "oaVFg5BHw6Gk_vPVy5SWBhBsc2QY"
            }
        }
        // console.log(options)
        let resp = await $.request(options)
        // console.log(resp)
        if (resp.status_code == 200) {
            this.token = resp.session_id
            this.userId = resp.user_info.user_id
            this.nick_name = resp.user_info.nick_name
            this.cookie = `session_id=${this.token}`
            this.hd.cookie = this.cookie
            this.hd.userid = this.userId
            // console.log(this.hd)
            // console.log(this.token)
            $.log(`${this.idx}: ${options.fn} ${resp.msg}, ${this.nick_name}, 手机号 ${resp.user_info.phone}`)
            this.ckFlog = true
            await $.wait(2)
        } else console.log(`${options.fn}: 失败,  ${JSON.stringify(resp)}`), this.ckFlog = false

    }


    async task_1() {
        for (let index = 0; index < 100; index++) {
            await this.doTask(index)
        }
    }


    async jifen(id) { // 刷积分
        let options = {
            fn: 'jifen',
            method: 'post',
            url: `https://apph5.manmanbuy.com/h5/zhuanpan/index.aspx`,
            headers: {
                'Cookie': this.ck,
                'content-type': 'application/x-www-form-urlencoded'
            },
            form: {
                'action': 'get_award',
                'orderId': '2072789'
            }
        }
        // console.log(options)
        let resp = await $.request(options)
        // console.log(resp)
        if (resp.code == 1) {
            $.log(`${this.idx} 第${id + 1}次: 成功`)
            let n = $.randomInt(5, 8)
            $.log(`随机等待 ${n} 秒`)
            await $.wait(n)

        } else if (resp.code == 0) {
            $.log(`${this.idx} 第${id + 1}次: 失败`)
            let n = $.randomInt(20, 30)
            $.log(`随机等待 ${n} 秒`)
            await $.wait(n)

        } else console.log(`${options.fn}: 失败,  ${JSON.stringify(resp)}`), this.ckFlog = false

    }

    async doTask(id) { // 领 2 元e卡
        let options = {
            fn: 'doTask',
            method: 'post',
            url: `https://apph5.manmanbuy.com/h5/zhuanpan/index.aspx`,
            headers: this.hd,
            form: {
                'action': 'get_award',
                'orderId': '2072789'
            }
        }
        // console.log(options)
        let resp = await $.request(options)
        // console.log(resp)
        if (resp.code == 1) {
            $.log(`${this.idx} 第${id + 1}次: 成功`)
            let n = $.randomInt(5, 8)
            $.log(`随机等待 ${n} 秒`)
            await $.wait(n)

        } else if (resp.code == 0) {
            $.log(`${this.idx} 第${id + 1}次: 失败`)
            let n = $.randomInt(20, 30)
            $.log(`随机等待 ${n} 秒`)
            await $.wait(n)

        } else console.log(`${options.fn}: 失败,  ${JSON.stringify(resp)}`), this.ckFlog = false

    }



    get_sign(ts) {
        let a = `api_token=${this.token}&api_client_code=${this.code}&api_version=${this.version}&api_timestamp=${ts}`
        return crypto.MD5(stringify(a)).toString().toUpperCase()
    }


}


!(async () => {

    await userTasks()

})()
    .catch((e) => $.log(e))
    .finally(() => $.exitNow())


//===============================================================
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

        async request(opt) {
            const got = require('got')
            let DEFAULT_TIMEOUT = 8000      // 默认超时时间
            let resp = null, count = 0
            let fn = opt.fn || opt.url
            let resp_opt = opt.resp_opt || 'body'
            opt.timeout = opt.timeout || DEFAULT_TIMEOUT
            opt.retry = opt.retry || { limit: 0 }
            opt.method = opt?.method?.toUpperCase() || 'GET'
            resp = await got(opt)

            if (resp == null) return Promise.resolve({ statusCode: 'timeout', headers: null, body: null })
            let { statusCode, headers, body } = resp
            if (body) try {
                body = JSON.parse(body)
            } catch {
            }
            if (resp_opt == 'body') {
                return Promise.resolve(body)
            } else if (resp_opt == 'hd') {
                return Promise.resolve(headers)
            } else if (resp_opt == 'statusCode') {
                return Promise.resolve(statusCode)
            }

        }

        log(msg, options = {}) {
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
            if (opt.sp) {
                console.log(`\n-------------- ${msg} --------------`)
            }
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