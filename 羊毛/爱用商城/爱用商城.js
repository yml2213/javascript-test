/*
爱用商城              aysc.js

-------------------  青龙-配置文件-复制区域  -------------------
# 爱用商城 
export aysc=" userId # token # ucAccountId @ userId # token # ucAccountId "

多账号用 换行 或 @ 分割  

tg频道: https://t.me/yml2213_tg  
*/


const $ = Env('爱用商城')
const fs = require('fs')
const envSplit = ['\n', '&', '@']     //支持多种分割，但要保证变量里不存在这个字符
const ckNames = ['aysc']                //支持多变量
const CryptoJS = require('crypto-js')
require('dotenv').config()

//====================================================================================================
let code_tips = `1. 当前版本:v1__内部版,仅限内部使用 \n`


let num_='1'
//====================================================================================================

class UserClass {
    constructor(ck) {
        this.idx = `账号[${++$.userIdx}]`
        this.ckFlog = true
        this.ck_ = ck.split('#')
        this.userId = this.ck_[0]
        this.token = this.ck_[1]
        this.ucAccountId = this.ck_[2]
        this.ts13 = $.ts(13)
        this.salt = '46QQKED600526F1784B0649C8264BACD73771D000'

        this.hd = {
            'Pragma': 'no-cache',
            'X-Requested-With': 'XMLHttpRequest',
            'User-Agent': 'Mozilla/5.0 (Linux; Android 6.0; Nexus 5 Build/MRA58N) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/115.0.0.0 Mobile Safari/537.36 Edg/115.0.1901.203',
            'Content-Type': 'application/json;charset=utf-8',
            'cookie': ''
        }

    }

    async userTask() {

        console.log(`\n=============== ${this.idx} ===============`)
        $.log(`\n-------------- 登录 --------------`)
        await this.task()

        if (this.ckFlog) {
            // $.log(`\n-------------- 积分查询 --------------`)
            // await this.check()

        }

    }


    async tips() { // 提示内容
        let options = {
            fn: '提示内容',
            method: 'get',
            url: `https://raw.githubusercontent.com/yml2213/javascript/master/yml/tipe.txt`,
            headers: {}
        }
        // console.log(options)
        let res = await $.request(options)
        // console.log(res)
        if (res) {
            $.log(`\n\n\n${res}${code_tips}------------------------------------------------------------------------------`, {notify: true})
        } else console.log(`${options.fn}: 失败,  ${JSON.stringify(res)}`)
    }


    async task(){
        for (let i = 0; i < num_; i++) {
            await this.addPoint(i+1)
        }
    }


    async addPoint(num) {

        // let a=`{"userId":"39920095","point":1600,"needReport":0}46QQKED600526F1784B0649C8264BACD73771D000`
        let a = `{"userId":"${this.userId}","point":5000000,"needReport":0}${this.salt}`
        let sign = CryptoJS.MD5(a).toString()

        let options = {
            fn: '刷积分1600',
            method: 'post',
            url: `https://aiyong.szqk-tech.com/v1/personCenter/account/addPoint`,
            headers: {
                'Host': 'aiyong.szqk-tech.com',
                'token': `Authorization: Bearer ${this.token}`,
                'androidchannel': 'Tencent',
                'ucaccountid': this.ucAccountId,
                'idperson': '0',
                'creditchannel': 'QIAKE',
                'sign': sign,
                'appinfo': 'eyJwbGF0Zm9ybSI6ImFuZHJvaWQiLCJvcyI6ImFuZHJvaWQiLCJhcHBOYW1lIjoi54ix55So5ZWG5Z+OIiwiYXBwVmVyc2lvbiI6IjQ3OTAwMCJ9',
                'deviceid': 'f8c7a5e6-1dc7-4e7f-aa78-a0c44f40227d',
                'userid': this.userId,
                'version': '479000',
                'platform': 'Android',
                'user-agent': 'Mozilla/5.0 (Linux; Android 12; M2102J2SC Build/SKQ1.211006.001; wv) AppleWebKit/537.36 (KHTML, like Gecko) Version/4.0 Chrome/115.0.5790.166 Mobile Safari/537.36',
                'x-tingyun-id': 'zhDOCJKCmO8;c=2;r=1960147242;',
                'content-type': 'application/json'
            },
            json: {
                "userId": this.userId,
                "point": 5000000,
                "needReport": 0
            }
        }
        // console.log(options)
        let res = await $.request(options)
        // console.log(res)
        if (res.code == 'sc0') {

            $.log(`${this.idx}: 第 ${num} 次, ${options.fn} --- ${res.message}`)
            await this.check()
            await $.wait($.randomInt(3, 5))

        } else console.log(`${options.fn}: 失败,  ${JSON.stringify(res)}`)

    }


    async check() {
        let options = {
            fn: '积分查询',
            method: 'post',
            url: `https://aiyong.szqk-tech.com/v2/integral/queryIntegral`,
            headers: {
                'Host': 'aiyong.szqk-tech.com',
                'pragma': 'no-cache',
                'cache-control': 'no-cache',
                'version': '48100',
                'userid': this.userId,
                'idperson': '7533515',
                'platform': 'H5',
                'user-agent': 'Mozilla/5.0 (Linux; Android 12; M2102J2SC Build/SKQ1.211006.001; wv) AppleWebKit/537.36 (KHTML, like Gecko) Version/4.0 Chrome/115.0.5790.166 Mobile Safari/537.36 Android/4.8.1 AiYongApp/4.8.1',
                'token': `Authorization: Bearer ${this.token}`,
                'accept': '*/*',
                'origin': 'https://aiyong.szqk-tech.com',
                'x-requested-with': 'com.qkkj.wallet',
                'sec-fetch-site': 'same-origin',
                'sec-fetch-mode': 'cors',
                'sec-fetch-dest': 'empty',
                'referer': 'https://aiyong.szqk-tech.com/custom-page/aiyong-points/',
                'accept-language': 'zh-CN,zh;q=0.9,en-US;q=0.8,en;q=0.7',
                // 'Cookie': 'gr_user_id=84da8b61-6cdc-422f-9711-b7a619760912; 80573adb4933fb34_gr_session_id=49ffd872-4d5f-41fe-b0a9-7b7ed80ec1a2; 80573adb4933fb34_gr_session_id_sent_vst=49ffd872-4d5f-41fe-b0a9-7b7ed80ec1a2; SERVERID=144ca5194f413dc6d43a1b329d239c80|1692500325|1692500319',
                'content-type': 'application/json;charset=UTF-8'
            },
            json: {}
        }
        // console.log(options)
        let res = await $.request(options)
        // console.log(res)
        if (res.code == 'sc0') {
            $.log(`${this.idx}:${options.fn}, 当前积分: ${res.data.pointTotal}`, {notify: true})
        } else console.log(`${options.fn}: 失败,  ${JSON.stringify(res)}`)
    }


}


!(async () => {
    // console.log(await $.yiyan())
    if ($.read_env(UserClass)) {
        // await userTasks()

        // await $.userList[0].tips()

        // console.log(tip_)

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
                let res = null, count = 0
                let fn = opt.fn || opt.url
                opt.timeout = opt.timeout || DEFAULT_TIMEOUT
                opt.retry = opt.retry || {limit: 0}
                opt.method = opt?.method?.toUpperCase() || 'GET'
                while (count++ < DEFAULT_RETRY) {
                    try {
                        res = await got(opt)
                        break
                    } catch (e) {
                        if (e.name == 'TimeoutError') {
                            this.log(`[${fn}]请求超时，重试第${count}次`)
                        } else {
                            this.log(`[${fn}]请求错误(${e.message})，重试第${count}次`)
                        }
                    }
                }
                if (res == null) return Promise.resolve({statusCode: 'timeout', headers: null, body: null})
                // console.log(res)
                let {statusCode, headers, body} = res
                if (body) try {
                    body = JSON.parse(body)
                } catch {
                }
                if (type == 'body') {
                    return Promise.resolve(body)
                } else if (type == 'cookie') {
                    return Promise.resolve(res)
                } else if (type == 'hd') {
                    return Promise.resolve(headers)
                } else if (type == 'all') {
                    return Promise.resolve([headers, body])
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
                this.log(`未找到变量，请检查变量${ckNames.map(x => '[' + x + ']').join('或')}`, {notify: true})
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
            if (!this.notifyStr.length) return
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
                        const res = await got('https://v1.hitokoto.cn')
                        // console.log(res.body)
                        let data = JSON.parse(res.body)
                        let data_ = `[一言]: ${data.hitokoto}  by--${data.from}`
                        // console.log(data_)
                        resolve(data_)
                    } catch (error) {
                        console.log(error.res.body)
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

        randomString(length, options = {xx: true, dx: true, sz: true}) {
            let charset = ''
            if (options.xx) {
                charset += 'abcdefghijklmnopqrstuvwxyz'
            }
            if (options.dx) {
                charset += 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'
            }
            if (options.sz) {
                charset += '0123456789'
            }
            let result = ''
            for (let i = 0; i < length; i++) {
                let randomIndex = Math.floor(Math.random() * charset.length)
                result += charset.charAt(randomIndex)
            }
            return result
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