/*
进山扶贫 盘子             cron 25 6-23 * * *  jsfp.js


23/1/30      签到

-------------------  青龙-配置文件-复制区域  -------------------
# 进山扶贫
export jsfp=" phone # pwd  @  phone # pwd   "  

多账号用 换行 或 @ 分割  
tg频道: https://t.me/yml2213_tg  
*/
const $ = Env('进山扶贫')
const notify = require('./sendNotify')
const crypto = require('crypto-js')

const envSplitor = ['\n', '&', '@']     //支持多种分割，但要保证变量里不存在这个字符
const ckNames = ['jsfp']                //支持多变量

//====================================================================================================
let DEFAULT_RETRY = 1           // 默认重试次数
//====================================================================================================


async function userTasks() {
    $.log('登录', {sp: true, console: false})  // 带分割的打印
    list = []
    for (let user of $.userList) {
        list.push(user.login())
    }
    await Promise.all(list)


    $.log('签到', {sp: true, console: false})
    list = []
    for (let user of $.userList) {
        if (user.ckFlog) {
            list.push(user.doSign())
        }
    }
    await Promise.all(list)


    $.log('余额查询', {sp: true, console: false})
    list = []
    for (let user of $.userList) {
        if (user.ckFlog) {
            list.push(user.check())
        }
    }
    await Promise.all(list)


}


class UserClass {
    constructor(ck) {
        this.idx = `账号[${++$.userIdx}]`
        this.ckFlog = true
        this.ck = ck.split('#')
        this.phone = this.ck[0]
        this.pwd = this.ck[1]
        this.salt = '9df3b01c1ed3a485'


    }


    async login() { // 登录
        let api = '/api/playervue/login'
        let options = {
            fn: '登录',
            method: 'post',
            url: `https://jins-api.jsfps.com/api/playervue/login?access_auth=${this.access_auth(api)}&server_sign=${this.get_server_sign(api)}&auth_key=${this.get_auth_key(api)}`,
            headers: this.hd,
            json: {
                "password": this.pwd,
                "username": this.phone,
                "checked": true,
                "show": false,
                "IsKeepPWD": false
            }
        }
        // console.log(options)
        let resp = await $.request(options)
        // console.log(resp)
        if (resp.code == 200) {
            this.token = resp.data.Token
            this.nickname = resp.data.UserName
            $.log(`${this.idx}: ${options.fn} ${resp.msg}, 欢迎 ${this.nickname}, 手机号 ${$.phoneNum(resp.data.User)}`, {notify: true})
            this.ckFlog = true
            await $.wait(2)
        } else console.log(`${options.fn}: 失败,  ${JSON.stringify(resp)}`), this.ckFlog = false

    }

    async tasklist() { // 任务列表 
        let params = {
            'userCookie': this.userCookie,
            'clientType': '3',
            'deviceId': this.deviceId,
            'appId': this.appId,
            'appVersion': this.appVersion,
            'osVersion': '12',
            'timestamp': this.ts,
            'nonce_str': this.rs,
            'location': this.location,
        }
        params.sign = await this.getSign(params)

        let options = {
            fn: '任务列表',
            method: 'post',
            url: `https://api.ersanli.cn/kilos/apis/user/task.action`,
            headers: this.hd,
            form: params
        }
        // console.log(options)
        let resp = await $.request(options)
        // console.log(resp)
        if (resp.code == 'A00000') {

            let tasks = resp.taskList
            for (const task of tasks) {
                // console.log(task)
                let {taskId, taskName, currentCount, maxCount} = task

                if (currentCount < maxCount) {
                    if (taskId == 1) $.log(`${this.idx}: ${taskName}--${currentCount}/${maxCount}`), await this.doSign()    // 每日签到
                    if (taskId == 11) $.log(`${this.idx}: ${taskName}--${currentCount}/${maxCount}`), await this.jsb(taskName)    // 往正式版 - 领取100里豆
                    if (taskId == 2) { // 浏览文章
                        let n = maxCount - currentCount
                        $.log(`${this.idx}: ${taskName}--${currentCount}/${maxCount}`)
                        for (let index = 0; index < n; index++) await this.read(taskName)
                    }

                } else {
                    $.log(`${this.idx}: ${taskName} 已完成`)
                }
            }

        } else console.log(`${options.fn}: 失败,  ${JSON.stringify(resp)}`)

    }

    async doSign() { // 签到
        let api = '/api/signvue/getsign'
        let options = {
            fn: '查询',
            method: 'post',
            url: `https://jins-api.jsfps.com/api/signvue/getsign?access_auth=${this.access_auth(api)}&server_sign=${this.get_server_sign(api)}&auth_key=${this.get_auth_key(api)}`,
            headers: this.get_hd(),
            json: {"isTrusted": true}
        }
        // console.log(options)
        let resp = await $.request(options)
        // console.log(resp)
        if (resp.code == 200) {
            $.log(`${this.idx}: ${resp.msg}`)
        } else if (resp.code == 404) {
            $.log(`${this.idx}: ${resp.msg}`)
        } else console.log(`${options.fn}: 失败,  ${JSON.stringify(resp)}`)

    }


    async check() { // 查询
        let api = '/api/minmetals/postuserinfo'
        let options = {
            fn: '查询',
            method: 'post',
            url: `https://jins-api.jsfps.com/api/minmetals/postuserinfo?access_auth=${this.access_auth(api)}&server_sign=${this.get_server_sign(api)}&auth_key=${this.get_auth_key(api)}`,
            headers: this.get_hd(),
            json: {}
        }
        // console.log(options)
        let resp = await $.request(options)
        // console.log(resp)
        if (resp.code == 200) {
            $.log(`${this.idx}: ${options.fn} ${resp.msg}, 余额 ${resp.data.freedAccount}`, {notify: true})
        } else console.log(`${options.fn}: 失败,  ${JSON.stringify(resp)}`)

    }

    get_hd() {
        let hd = {
            'authority': 'jins-api.jsfps.com',
            'pragma': 'no-cache',
            'token': this.token,
            'x-forwarded-for': '112.224.162.167',
            'x-requested-with': 'XMLHttpRequest',
            'User-Agent': 'Mozilla/5.0 (iPhone; CPU iPhone OS 13_2_3 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/13.0.3 Mobile/15E148 Safari/604.1'
        }
        return hd
    }

    access_auth(n) {
        let d = this.salt

        function z() {
            var n = Math.floor(Date.now() / 1e3);
            return Number(n + Number('2')).toString()
        }

        function C() {
            for (var n = [], e = "0123456789abcdef", i = 0; i < 36; i++)
                n[i] = e.substr(Math.floor(16 * Math.random()), 1);
            return n[14] = "4",
                n[19] = e.substr(3 & n[19] | 8, 1),
                n.join("")
        }

        function md5(a) {
            return crypto.MD5(a).toString()
        }

        var e = z()
            , i = C()
            , a = "0"
            , o = md5(n + "-" + e + "-" + i + "-" + a + "-" + d);
        return "".concat(e, "-").concat(i, "-").concat(a, "-").concat(o)
    }

    get_server_sign(api) {
        function z() {
            var n = Math.floor(Date.now() / 1e3);
            return Number(n + Number('2')).toString()
        }

        let ts = z()

        function md5(a) {
            return crypto.MD5(a).toString()
        }

        let a = `${api}${ts}${this.token}${this.salt}`
        let sign = `${ts}-${md5(a)}`
        return sign


    }

    get_auth_key(api) {
        function z() {
            var n = Math.floor(Date.now() / 1e3);
            return Number(n + Number('2')).toString()
        }

        let ts = z()
        let b = `${api}?access_auth=${this.access_auth()}&server_sign=${this.get_server_sign()}${ts}`
        let c = this.salt
        let a = crypto.HmacSHA256(b, c)
        let d = crypto.enc.Base64.stringify(a)
        let e = encodeURI(`${ts}-${d}`)
        return e


    }
}


!(async () => {
    console.log(await $.yiyan())
    if ($.read_env(UserClass)) {
        await userTasks()
    }


})()
    .catch((e) => $.log(e))
    .finally(() => $.exitNow())


//===============================================================
function Env(name) {
    return new class {
        constructor(name) {
            this.name = name
            this.startTime = Date.now()
            this.log(`[${this.name}]开始运行`, {time: true})

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
            opt.retry = opt.retry || {limit: 0}
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
            if (resp == null) return Promise.resolve({statusCode: 'timeout', headers: null, body: null})
            let {statusCode, headers, body} = resp
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
            let opt = {console: true}
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
                this.log(`未找到变量，请检查变量${ckNames.map(x => '[' + x + ']').join('或')}`, {notify: true})
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
            let taskConf = {idx: 0}
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