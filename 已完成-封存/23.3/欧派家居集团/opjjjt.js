/*
欧派家居集团 小程序             cron 25 6,12 * * *  opjjjt.js


23/2/25      日常任务 ,积分换实物   没几个东西

-------------------  青龙-配置文件-复制区域  -------------------
# 欧派家居集团
export opjjjt="  token  @ token  "     

多账号用 换行 或 @ 分割   

tg频道: https://t.me/yml2213_tg  
*/
const $ = Env('欧派家居集团')
const notify = require('./sendNotify')
const crypto = require('crypto-js')

const envSplit = ['\n', '&', '@']     //支持多种分割，但要保证变量里不存在这个字符
const ckNames = ['opjjjt']                //支持多变量

//====================================================================================================
let DEFAULT_RETRY = 1           // 默认重试次数
//====================================================================================================


async function userTasks() {

    $.log('任务列表', { sp: true, console: false })
    list = []
    for (let user of $.userList) {
        if (user.ckFlog) {
            list.push(user.tasklist())
        }
    }
    await Promise.all(list)


    $.log('积分查询', { sp: true, console: false })
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
        this.token = ck

        this.appid = 'wx3713b1d8b100b0be'

        this.hd = {
            'AppCode': 'GRZX',
            'SubAppCode': 'GRZXMP001',
            'platform': 'mp-weixin',
            'appid': this.appid,
            'Oauth2-AccessToken': this.token,
            'content-type': 'application/json;charset=utf-8'
        }

    }

    async tasklist() { // 任务列表 
        await this.getToken()
        await this.getUserId()
        let options = {
            fn: '任务列表',
            method: 'post',
            url: `https://apigateway.oppein.com/pointscenter/pointIssueRule/getUserPointsIssueRules`,
            headers: this.hd,
            json: {
                "userId": this.userId,
                "appCode": "GRZX"
            }
        }
        // console.log(options)
        let resp = await $.request(options)
        // console.log(resp)
        if (resp.code == '100000') {
            let tasks = resp.data
            for (const task of tasks) {
                // console.log(task)
                let { name, eventCode, limitCount, triggerCount } = task
                let num = limitCount - triggerCount
                if (triggerCount < limitCount) {
                    if (name == '完善用户信息') {
                        // await this.dotask(name, eventCode)
                    } else {
                        for (let index = 0; index < num; index++) {
                            await this.dotask(name, eventCode)
                        }
                    }
                } else {
                    $.log(`${this.idx}: ${name} 已完成`)
                }

            }

        } else console.log(`${options.fn}: 失败, ${JSON.stringify(resp)} `)

    }



    async dotask(name, eventCode) { // 做任务 
        let options = {
            fn: '做任务',
            method: 'post',
            url: `https://apigateway.oppein.com/pointscenter/points/eventTrigger`,
            headers: this.hd,
            json: {
                "userId": this.userId,
                "appCode": "GRZX",
                "subAppCode": "GRZXMP001",
                "eventCode": eventCode,
                "userBizType": "CUSTOMER",
                "eventSubject": "Article"
            }
        }
        // console.log(options)
        let resp = await $.request(options)
        // console.log(resp)
        if (resp.code == '100000') {
            $.log(`${this.idx}: ${name}, ${resp.data.message}`)
            await $.wait($.randomInt(5, 10))
        } else console.log(`${options.fn}: 失败,  ${JSON.stringify(resp)}`)
    }


    async getUserId() {
        let options = {
            fn: '获取用户id',
            method: 'get',
            url: `https://apigateway.oppein.com/customercenter/auth/v2/getCurrentCustomer`,
            headers: this.hd,
        }
        // console.log(options)
        let resp = await $.request(options)
        // console.log(resp)
        if (resp.code == '100000') {
            this.userId = resp.data.customerId
        } else console.log(`${options.fn}: 失败,  ${JSON.stringify(resp)}`)
    }

    async check() { // 查询
        let options = {
            fn: '查询',
            method: 'get',
            url: `https://apigateway.oppein.com/pointscenter/points/getUserPoints?appCode=GRZX&userBizType=CUSTOMER&userBizId=${this.userId}`,
            headers: this.hd,
        }
        // console.log(options)
        let resp = await $.request(options)
        // console.log(resp)
        if (resp.code == '100000') {
            $.log(`${this.idx}: 共有积分 ==> ${resp.data.score}`, { notify: true })
        } else console.log(`${options.fn}: 失败,  ${JSON.stringify(resp)}`)

    }

    async getToken() {
        let options = {
            fn: '获取token',
            method: 'post',
            url: `https://apigateway.oppein.com/customercenter/anonymous/auth/v2/oauthLogin`,
            headers: this.hd,
            join: {
                "authResult": {
                    "errno": 0,
                    "code": "053Ccc000CBQvP17Sx000mrHDq1Ccc0T",
                    "errMsg": "login:ok",
                    "clientInfo": {
                        "wxdataQueueTimestamp": 1677289018168,
                        "isConfirm": false,
                        "wxlibCallbackTimestamp": 1677289018368,
                        "beginCGITimestamp": 1677289018168,
                        "queueLength": 0,
                        "beginCGITimestampAfterConfirm": 18446744073709552000,
                        "wxdataDequeueTimestamp": 1677289018168,
                        "CGICallbackTimestampAfterConfirm": 18446744073709552000,
                        "CGICallbackTimestamp": 1677289018368
                    }
                },
                "mtdsUserId": "",
                "appid": "wx3713b1d8b100b0be",
                "platform": "MP_WEIXIN",
                "sourceChannel": ""
            }
        }
        // console.log(options)
        let resp = await $.request(options)
        console.log(resp)
        if (resp.code == '100000') {
            this.token = resp.data
            console.log(this.token)
        } else console.log(`${options.fn}: 失败,  ${JSON.stringify(resp)}`)
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