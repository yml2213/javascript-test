/*
随时聊 app             cron 22 8,12 * * *  shl.js


23/1/30      基本任务

-------------------  青龙-配置文件-复制区域  -------------------
# 随时聊
export shl=" phone # pwd  @  phone # pwd  "  


多账号用 换行 或 @ 分割  
tg频道: https://t.me/yml2213_tg  
*/
const $ = Env('随时聊')
const { MD5 } = require('crypto-js')
const crypto = require('crypto-js')
const notify = require('./sendNotify')

const envSplitor = ['\n', '&', '@']     //支持多种分割，但要保证变量里不存在这个字符
const ckNames = ['shl']                //支持多变量
//====================================================================================================
let DEFAULT_RETRY = 1           // 默认重试次数
//====================================================================================================






async function userTasks() {

    $.log('用户信息', { sp: true, console: false })  // 带分割的打印
    list = []
    for (let user of $.userList) {
        list.push(user.login())
    } await Promise.all(list)

    $.log('合成信息', { sp: true, console: false })
    list = []
    for (let user of $.userList) {
        if (user.ckFlog) {
            list.push(user.userInfo())
            // list.push(user.boxList())
        }
    } await Promise.all(list)

    $.log('购买', { sp: true, console: false })
    list = []
    for (let user of $.userList) {
        if (user.ckFlog) {
            list.push(user.buy_1())
            // list.push(user.boxList())
        }
    } await Promise.all(list)


    // $.log('积分查询', { sp: true, console: false })
    // list = []
    // for (let user of $.userList) {
    //     if (user.ckFlog) {
    //         list.push(user.points())
    //     }
    // } await Promise.all(list)

}


class UserClass {
    constructor(ck) {
        this.idx = `账号[${++$.userIdx}]`
        this.ckFlog = true
        this.ck = ck.split('#')
        this.phone = this.ck[0]
        this.pwd = this.ck[1]

        this.salt = 'SHL9L9JIRW5PCRBEU9FTKFGEY4HXLSHL'
        this.Random_str = $.randomString(8)
        this.ts = $.ts(10)
        this.hd1 = { // ts rs  salt
            'Api-Token': this.getApiToken(1, this.ts, this.Random_str),
            'Api-Timestamp': this.ts,
            'Api-Random-Str': this.Random_str,
            'Api-OS': '1',
            'Api-Version': '10803',
            'Api-Device': 'Xiaomi M2102J2SC',
            'Login-Token': '1zo61jdeqzyg6melbeuy03fvtdqv7htw',
        }
        this.hd2 = { // ts  salt rs  
            'Api-Token': this.getApiToken(2, this.ts, this.Random_str),
            'Api-Timestamp': this.ts,
            'Api-Random-Str': this.Random_str,
            'Api-OS': '1',
            'Api-Version': '10803',
            'Api-Device': 'Xiaomi M2102J2SC',
            'Login-Token': '1zo61jdeqzyg6melbeuy03fvtdqv7htw',
        }

    }




    async login() {
        let options = {
            fn: 'login',
            method: 'post',
            url: `https://api.liaozhuangkeji.com/member/v1/member/login`,
            headers: {
                'Api-Token': this.getApiToken('login', this.ts, this.Random_str),
                'Api-Timestamp': this.ts,
                'Api-Random-Str': this.Random_str,
                'Api-OS': '1',
                'Api-Version': '10803',
                'Api-Device': 'Xiaomi M2102J2SC',
                'Login-Token': '',
            },
            form: {
                'mobile': this.phone,
                'password': this.pwd
            }

        }
        console.log(options)
        let resp = await $.request(options)
        console.log(resp)
        if (resp.recode == 0) {
            this.hd['Login-Token'] = resp.data.token
            this.nickname = resp.data.member.nickname
            this.amount = resp.data.estimated_amount
            $.log(`${this.idx}: ${this.nickname}, 手机号 ${$.phoneNum(resp.data.member.mobile)}, 余额≈≈${this.amount}元`, { notify: true })
            this.ckFlog = true
        } else console.log(`${options.fn}: 失败, ${resp}`), this.ckFlog = false

    }

    // https://api.liaozhuangkeji.com/synthetic/v1/user/info
    async userInfo() {
        let options = {
            fn: 'userInfo',
            method: 'get',
            url: `https://api.liaozhuangkeji.com/synthetic/v1/user/info`,
            headers: this.hd2,
        }
        // console.log(options)
        let resp = await $.request(options)
        // console.log(resp)
        if (resp.recode == 0) {
            this.game_car = resp.data.game_car
            $.log(`${this.idx}: 等级${resp.data.level}级, 银币${resp.data.coin}, 现金${resp.data.wallet.money}元, 更新时间${resp.data.update_time}`, { notify: true })
            // console.log(this.game_car)
        } else console.log(`${options.fn}: 失败, ${resp}`)

    }

    // 买一级--100银币
    async buy_1() {
        let options = {
            fn: 'buy_1',
            method: 'post',
            url: `https://api.liaozhuangkeji.com/synthetic/v1/game/buy`,
            headers: {
                'Api-Token': this.getApiToken(2, this.ts, this.Random_str),
                'Api-Timestamp': this.ts,
                'Api-Random-Str': this.Random_str,
                'Accept-Language': 'zh-CN,zh;q=0.8',
                'User-Agent': 'Android/1.8.3/10803/XiaomiM2102J2SC/12/IMEI:72606f551c907d8b/246135',
                'Api-OS': '1',
                'Api-Version': '10803',
                'Api-Device': 'Xiaomi M2102J2SC',
                'Login-Token': '1zo61jdeqzyg6melbeuy03fvtdqv7htw',
                'Host': 'api.liaozhuangkeji.com',
                'Cache-Control': 'no-cache',
                'Content-Length': 0
            },
            form: {
                'https://api.liaozhuangkeji.com/synthetic/v1/game/buy': ''
            }
        }
        console.log(options)
        let resp = await $.request(options)
        console.log(resp)
        if (resp.recode == 0) {
            this.game_car = resp.data.game_car
            $.log(`${this.idx}: 购买 ${resp.msg}, 等级${resp.data.level}级, 剩余银币${resp.data.coin}, 奖券${resp.data.coupons}张, 更新时间${resp.data.update_time}`, { notify: true })
            console.log(this.game_car)
        } else console.log(`${options.fn}: 失败, ${resp}`)

    }







    getApiToken(type, ts, Random_str) { // 获取sign 
        if (type = 1) {
            let a = `${ts}${Random_str}${this.salt}`
            let sign = MD5(a).toString()
            return sign
        } else if (type = 2) {
            let a = `${ts}${this.salt}${Random_str}`
            let sign = MD5(a).toString()
            return sign
        }
    }

}


!(async () => {
    console.log(await $.yiyan())
    $.read_env(UserClass)

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
            this.log(`[${this.name}]开始运行`, { time: true })

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
            if (body) try { body = JSON.parse(body) } catch { }
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
        read_env(Class) {
            let envStrList = ckNames.map(x => process.env[x])
            for (let env_str of envStrList.filter(x => !!x)) {
                let sp = envSplitor.filter(x => env_str.includes(x))
                let splitor = sp.length > 0 ? sp[0] : envSplitor[0]
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
        async taskThread(taskName, conf, opt = {}) {
            while (conf.idx < $.userList.length) {
                let user = $.userList[conf.idx++]
                await user[taskName](opt)
            }
        }
        async threadManager(taskName, thread) {
            let taskAll = []
            let taskConf = { idx: 0 }
            while (thread--) {
                taskAll.push(this.taskThread(taskName, taskConf))
            }
            await Promise.all(taskAll)
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