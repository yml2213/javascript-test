/*
思皓新能源 app             cron 0 1,6,12,18,22 * * *  sihao.js

23/5/16    修脚本

-------------------  青龙-配置文件-复制区域  -------------------
# 思皓新能源
export sihao="  手机号 # 密码   @ 手机号 # 密码  "  

多账号用 换行 或 @ 分割  


tg频道: https://t.me/yml2213_tg  
*/
const $ = Env('思皓新能源')
const notify = require('./sendNotify')
const crypto = require('crypto-js')

const envSplit = ['\n', '&', '@']     //支持多种分割，但要保证变量里不存在这个字符
const ckNames = ['sihao']                //支持多变量

//====================================================================================================


//====================================================================================================


class UserClass {
    constructor(ck) {
        this.idx = `账号[${++$.userIdx}]`
        this.ckFlog = true
        this.ck = ck.split('#')
        this.phone = this.ck[0]
        this.pwd = crypto.MD5(this.ck[1]).toString()
        this.d_ua = 'okhttp/3.10.0'
    }

    async userTask() { // 个人信息
        console.log(`\n=============== ${this.idx} ===============`)

        $.log(`\n-------------- 登录 --------------`)
        await this.login()

        if (this.ckFlog) {
            $.log(`\n-------------- 任务列表 --------------`)
            await this.doSign()
            // await this.lottery_num()
            // await this.check()
            // await this.do_lttery()

        }
    }

    async login() { // 登录
        let options = {
            fn: '登录',
            method: 'post',
            url: `https://jacsupperapp.jac.com.cn/api/jac-admin/admin/userBaseInformation/userLogin`,
            headers: {
                'channelID': '5',
                'Host': 'jacsupperapp.jac.com.cn',
                'User-Agent': this.d_ua
            },
            json: { "password": this.pwd, "userCode": this.phone }
        }
        // console.log(options)
        let resp = await $.request(options)
        // console.log(resp)
        if (resp.code == 0) {
            this.nickName = resp.data.userName
            this.no = resp.data.no
            this.token = resp.data.token
            $.log(`${this.idx}: ${options.fn} ${this.nickName} 成功 🎉`)
            this.ckFlog = true
        } else if (resp.code == 50002) {
            this.cusLog(`账号 ${this.index}:  ${resp.msg}`)
        } else console.log(`${options.fn}: 失败,  ${JSON.stringify(resp)}`), this.ckFlog = false


    }

    async doSign() { // 签到 

        let options = {
            fn: '签到',
            method: 'post',
            url: `https://jacsupperapp.jac.com.cn/api/pluto-membership/pluto-membership/integral-gather/addintegral-signIn`,
            headers: {
                "channelID": "5",
                "Host": "jacsupperapp.jac.com.cn",
                "timaToken": this.token
            },
            json: { "ruleStr": "SIGN_IN", "serviceTypeStr": "SERVICE_FIXED", "no": this.no }
        }
        // console.log(options)
        let resp = await $.request(options)
        // console.log(resp)
        if (resp.code == 0) {
            // console.log(resp)
            $.log(`${this.idx}: ${this.nickName} ${options.fn}, 获得积分${resp.data.integral}`)
        } else if (resp.code == 50002) {
            this.cusLog(`账号 ${this.index}  ${options.fn}:   完成 签到 任务  收手吧阿祖！！！`)
        } else console.log(`${options.fn}: 失败,  ${JSON.stringify(resp)}`)

    }

    async lottery_num() { // 抽奖次数 e3a04a305290e60b752fa652864cb253
        let options = {
            fn: '抽奖次数',
            method: 'get',
            url: `https://marketing-center-gateway.i.xgimi.com/lottery/query/credit/times/limit?promotionNo=1456570878320967773`,
            headers: {
                'source': '2',
                'token': this.token,
                'User-Agent': this.d_ua
            },
        }
        // console.log(options)
        let resp = await $.request(options)
        // console.log(resp)
        if (resp.code == 200) {
            // console.log(resp)
            this.l_num = resp.data.lotteryTimesLimit
            $.log(`${this.idx}: ${this.nickName} ${options.fn} -- ${this.l_num}`)
            if (this.l_num) {
                // await this.doLottery()
            }
        } else console.log(`${options.fn}: 失败,  ${JSON.stringify(resp)}`)

    }

    async check() { // 积分查询
        let ts = $.ts(13)
        let sign = crypto.MD5(`timestamp=${ts}&${this.salt}`).toString()
        let options = {
            fn: '积分查询',
            method: 'post',
            url: `https://mobile-api.xgimi.com/app/v4/integral/signinConfig`,
            headers: {
                'timestamp': ts,
                'openId': this.openId,
                'sign': sign,
                'channel': 'superApp',
                'accessToken': this.token,
                'User-Agent': this.d_ua
            },
            json: {}
        }
        // console.log(options)
        let resp = await $.request(options)
        // console.log(resp)
        if (resp.code == 'ok') {
            // console.log(resp)
            this.balance = resp.data.balance
            $.log(`${this.idx}: ${this.nickName} ${options.fn} -- ${this.balance}`, { notify: true })
            if (this.l_num > 0 && this.balance >= 50) {
                await this.lttery_info()
            } else {
                $.log(`${this.idx}: ${this.nickName} 不满足抽奖条件, 跳过`)

            }
        } else console.log(`${options.fn}: 失败,  ${JSON.stringify(resp)}`)

    }

    async lttery_info() { // 抽奖次数 e3a04a305290e60b752fa652864cb253
        let n = ''
        if (this.balance >= 150) {
            n = 3
        } else if (this.balance >= 100) {
            n = 2

        } else if (this.balance >= 50) {
            n = 1
        }
        for (let i = 0; i < n; i++) {
            await this.do_lttery()
        }

    }
    async do_lttery() { // 抽奖
        let options = {
            fn: '抽奖',
            method: 'post',
            url: `https://marketing-center-gateway.i.xgimi.com/lottery/draw`,
            headers: {
                'source': '2',
                'token': this.token,
                'User-Agent': this.d_ua
            },
            json: { "promotionNo": "1456570878320967773", "templateId": "4" }
        }
        // console.log(options)
        let resp = await $.request(options)
        // console.log(resp)
        if (resp.code == 200) {
            // console.log(resp)
            $.log(`${this.idx}: ${this.nickName} ${options.fn} -- ${JSON.stringify(resp.data)}`, { notify: true })
            await $.wait(5)
        } else if (resp.code == 100401 || 200119) {
            $.log(`${this.idx}: ${options.fn} -- ${resp.msg}`)
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

        async request(opt, type = 'body') {
            try {
                const got = require('got')
                let DEFAULT_TIMEOUT = 8000      // 默认超时时间
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
            $.log(`账号[${$.userIdx}]: 随机等待 ${t} 秒 ...`)
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