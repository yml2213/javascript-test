/*
厂拉拉 app             cron 0 1,6,12,18,22 * * *  cll.js

23/4/22    修脚本

-------------------  青龙-配置文件-复制区域  -------------------
# 厂拉拉
export cll=" unionid # token  # token-key # X-Rqr @ unionid # token  # token-key # X-Rqr"  

多账号用 换行 或 @ 分割  

抓 send.api.fiaohi.com.cn 的包  基本都要需要的变量

tg频道: https://t.me/yml2213_tg  
*/
const $ = Env('厂拉拉')
const notify = require('./sendNotify')
const crypto = require('crypto-js')

const envSplit = ['\n', '&', '@']     //支持多种分割，但要保证变量里不存在这个字符
const ckNames = ['cll']                //支持多变量

//====================================================================================================


//====================================================================================================


class UserClass {
    constructor(ck) {
        this.idx = `账号[${++$.userIdx}]`
        this.ckFlog = true
        this.ck = ck.split('#')
        this.unionid = this.ck[0]
        this.token = this.ck[1]
        this.token_key = this.ck[2]
        this.X_Rqr = this.ck[3]

        this.salt = '3C45FFEF47D7A9655579ADA26B23EBC1'
        this.salt2 = 'F73AB6187AA9009A3116FD9EBD373C08'


    }

    async userTask() { // 个人信息
        console.log(`\n=============== ${this.idx} ===============`)

        $.log(`\n-------------- 个人信息 --------------`)
        await this.info()

        if (this.ckFlog) {
            $.log(`\n-------------- 任务列表 --------------`)
            await this.getChooseGoods()
            await this.getPunchVersion()

        }
    }

    async info() { // 个人信息
        let options = {
            fn: '个人信息',
            method: 'post',
            url: `https://send.api.fiaohi.com.cn/api/Customer/getCustomer`,
            headers: this.get_hd(),
            form: { 'unionid': this.unionid }
        }
        // console.log(options)
        let resp = await $.request(options)
        // console.log(resp)
        if (resp.code == 0) {
            this.nickname = resp.data.nickname
            this.phone = resp.data.phone
            $.log(`${this.idx}: ${options.fn} ${this.nickname} 成功 🎉, 手机号${$.phoneNum(this.phone)}`)
            this.ckFlog = true
        } else console.log(`${options.fn}: 失败,  ${JSON.stringify(resp)}`), this.ckFlog = false

    }

    async getChooseGoods() { // 获取打卡商品
        let options = {
            fn: '获取打卡商品',
            method: 'post',
            url: `https://send.api.fiaohi.com.cn/api/Punch/getChooseGoods`,
            headers: this.get_hd(this.phone),
            body: 'https://send.api.fiaohi.com.cn/api/Punch/getChooseGoods'
        }
        // console.log(options)
        let resp = await $.request(options)
        // console.log(resp)
        if (resp.code == 0) {
            // console.log(resp)
            this.sid = resp.data[0].sign_id
            $.log(`${this.idx}: ${this.nickname} -- 当前选择商品 ${this.sid}：${resp.data[0].name}`)
        } else console.log(`${options.fn}: 失败,  ${JSON.stringify(resp)}`)

    }

    async getPunchVersion() { // 获取打卡信息
        let options = {
            fn: '获取打卡信息',
            method: 'post',
            url: `https://send.api.fiaohi.com.cn/api/v4.Punch/getPunchVersion`,
            headers: this.get_hd(this.phone),
            body: 'https://send.api.fiaohi.com.cn/api/v4.Punch/getPunchVersion'
        }
        // console.log(options)
        let resp = await $.request(options)
        // console.log(resp)
        if (resp.code == 0) {
            // console.log(resp)
            if (!resp.data[0].is_finish) {
                $.log(`${this.idx}: ${this.nickname} -- 今日打卡进度 ${resp.data[0].finish}, 还需打卡：${resp.data[0].less_day} 天`)
                for (let i = 0; i < resp.data[0].lists.length; i++) {
                    if (resp.data[0].lists[i].status == 0 | resp.data[0].lists[i].status == 1) {
                        await this.beginPunch(resp.data[0].lists[i].times)
                    }
                }
                // await this.beginPunch(2)

            } else {
                $.log(`${this.idx}: ${this.nickname} -- 已完成`)
            }
        } else console.log(`${options.fn}: 失败,  ${JSON.stringify(resp)}`)

    }

    async beginPunch(times) { // 看视频打卡
        let t = $.ts(13)
        let userid = Buffer.from(this.unionid, 'base64').toString('utf-8')
        let tem_sign1 = crypto.MD5(`customer_id=${userid}mobile=${this.phone}sign_id=${this.getPunchBase64(this.sid, 987)}times=${times}timestamp=${t}${this.salt2}`).toString()
        let tem_sign2 = tem_sign1.substring(2, 24)
        let sin = crypto.SHA1(tem_sign2).toString()

        let options = {
            fn: '看视频打卡',
            method: 'post',
            url: `https://send.api.fiaohi.com.cn/api/v4.Punch/beginPunch`,
            headers: this.get_hd(this.phone),
            form: {
                'times': times,
                'sign_id': this.getPunchBase64(this.sid, 987),
                'timestamp': t,
                'sin': sin
            }
        }
        // console.log(options)
        let resp = await $.request(options)
        // console.log(resp)
        if (resp.code == 0) {
            // console.log(resp)
            $.log(`${this.idx}: ${this.nickname} 看第 ${times} 个视频ok -- 视频id: ${resp.data}`)
            await $.wait($.randomInt(30, 50))
            await this.endPunch(resp.data)
        } else console.log(`${options.fn}: 失败,  ${JSON.stringify(resp)}`)

    }


    async endPunch(id) { // 结束看视频打卡
        let t = $.ts(13)
        let userid = Buffer.from(this.unionid, 'base64').toString('utf-8')
        let tem_sign1 = crypto.MD5(`customer_id=${userid}mobile=${this.phone}sign_day_id=${this.getPunchBase64(id, 654)}sign_id=${this.getPunchBase64(this.sid, 987)}timestamp=${t}${this.salt2}`).toString()
        let tem_sign2 = tem_sign1.substring(2, 24)
        let sin = crypto.SHA1(tem_sign2).toString()

        let options = {
            fn: '结束看视频打卡',
            method: 'post',
            url: `https://send.api.fiaohi.com.cn/api/v4.Punch/endPunch`,
            headers: this.get_hd(this.phone),
            form: {
                'sign_day_id': this.getPunchBase64(id, 654),
                'sign_id': this.getPunchBase64(this.sid, 987),
                'timestamp': t,
                'sin': sin
            }
        }
        // console.log(options)
        let resp = await $.request(options)
        // console.log(resp)
        if (resp.code == 0) {
            // console.log(resp)
            $.log(`${this.idx}: ${this.nickname} ${options.fn} -- ${resp.message}`)
            await $.wait($.randomInt(15, 20))
        } else console.log(`${options.fn}: 失败,  ${JSON.stringify(resp)}`)

    }

    getPunchBase64(num, num2) {
        const valueOf = BigInt(num)
        const valueOf2 = BigInt(num2)
        const str = (valueOf * valueOf2).toString()
        const encodeToString = Buffer.from(str.trim()).toString('base64')
        const encodeToString2 = Buffer.from(encodeToString.trim()).toString('base64')
        return encodeToString2.trim()
    }

    get_hd(phoen) {
        let t = $.ts(13)
        let r = $.randomString(32)
        let n = crypto.MD5(`${t}${r}${this.salt}`).toString()
        if (phoen) {
            let authorization = crypto.MD5(`${this.unionid}${this.phone}${r}`).toString()
            let hd = {
                'zone': 'clocks',
                't': t,
                'r': r,
                'n': n,
                'appid': '10002',
                'from': 'app',
                'token': this.token,
                'token-key': this.token_key,
                'unionid': this.unionid,
                'authorization': authorization,
                'X-Ver': '3.4.00',
                'X-Rqr': this.X_Rqr,
                'User-Agent': 'okhttp/5.0.0-alpha.10'
            }
            return hd
        } else {
            let hd = {
                'zone': 'clocks',
                't': t,
                'r': r,
                'n': n,
                'appid': '10002',
                'from': 'app',
                'token': this.token,
                'token-key': this.token_key,
                'unionid': this.unionid,
                'User-Agent': 'okhttp/5.0.0-alpha.10'
            }
            return hd
        }



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