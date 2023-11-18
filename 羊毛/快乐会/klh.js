/*
快乐会              klh.js

-------------------  青龙-配置文件-复制区域  -------------------
# 快乐会 
export klh=" 响应体 # 备注  @ 响应体 # 备注  "  
export klh_code="你买的码子 换行分割"     需要购买请前往: https://yml-git.tk  



多账号用 换行 或 @ 分割  
抓 https://klhadm2.kele-go.cn/klh-api/klhConsumer/getOpenIdAndSessionKey  的 响应体  作为参数

本活动范围为：
北京市、重庆市、甘肃省、青海省、宁夏回族自治区、河北省、黑龙江省、湖南省、内蒙古自治区、吉林省、辽宁省、贵州省、陕西省、山东省、山西省、四川省、天津市、新疆维吾尔自治区

tg频道: https://t.me/yml2213_tg  
*/


const $ = Env('快乐会')
const fs = require('fs')
const envSplit = ['\n', '&', '@']     //支持多种分割，但要保证变量里不存在这个字符
const ckNames = ['klh']                //支持多变量
const CryptoJS = require('crypto-js')
require('dotenv').config()
let klh_code = process.env.klh_code

//====================================================================================================
let code_tips = `1. 当前版本:最终版_v2,  优化输出\n2. 凡是倒卖卡密者,一律封卡密`

//====================================================================================================

class UserClass {
    constructor(ck) {
        this.idx = `账号[${++$.userIdx}]`
        this.ckFlog = true
        this.ck_ = ck.split('#')
        this.ck = this.ck_[0]
        this.u_name = this.ck_[1]
        this.key = 'qP2$bG9;vA0^uW0:'
        this.iv = 'qP2$bG9;vA0^uW0:'

        this.hd = {
            'Host': 'encourage.kuaishou.com',
            'User-Agent': this.ua,
            'X-Requested-With': 'com.kuaishou.nebula',
            'Sec-Fetch-Site': 'same-origin',
            'Sec-Fetch-Dest': 'empty',
            'Cookie': this.ck,
            'content-type': 'application/x-www-form-urlencoded;charset=UTF-8'
        }

    }

    async userTask() {
        console.log(`\n=============== ${this.idx} ===============`)
        $.log(`\n-------------- 开始任务 --------------`)
        await this.checkInfo()


        if (this.ckFlog) {
            $.log(`\n-------------- 开始检查码子 --------------`)
            await this.checkCode() // 开始检查码子


        }

    }


    async checkInfo() {
        // console.log(this.ck)
        // console.log(this.aes_de(this.ck))
        let res = JSON.parse(this.aes_de(this.ck))
        if (res.success == 1) {
            this.openId = res.result.openId
            this.userId = res.result.klhConsumer.userId
            this.orgId = res.result.klhConsumer.orgId
            this.mobile = res.result.klhConsumer.mobile
            this.name = res.result.klhConsumer.userName
            this.createTime = res.result.klhConsumer.createTime
            console.log(`${this.idx}, ${this.name} 信息获取成功`)
        }
    }

    async checkCode() {
        klh_code = klh_code.split('\n')
        if (klh_code.length > 0) {
            console.log(`本次共找到${klh_code.length}个码子`)
            this.t = 'next'
            for (let i = 0; i < klh_code.length; i++ && this.t == 'next') {
                let element = klh_code[i].split('?c=')[1]
                if (element.indexOf('http://u.kele-go.cn/ap/?c=' > -1) && this.t != 'stop') {
                    console.log(element)
                    console.log(`开始抽奖 ${element}`)
                    await this.draw(element)
                }
            }
        } else {
            console.log(`${this.idx}, 未找到码子, 请前往  https://yml-git.tk  购买吧!`)
        }

    }

    async draw(utcCode) { // 开始抽奖

        let options = {
            fn: '开始抽奖',
            method: 'post',
            url: `https://klhadm2.kele-go.cn/klh/fsj/lucky/draw/api/lucky/draw`,
            headers: {
                'Host': 'klhadm2.kele-go.cn',
                'content-type': 'application/json;charset=utf-8',
                'timestamp': this.aes_en($.ts(13)),
                'User-Agent': 'Mozilla/5.0 (iPhone; CPU iPhone OS 17_0 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Mobile/15E148 MicroMessenger/8.0.42(0x18002a2e) NetType/WIFI Language/zh_CN',
                'Referer': 'https://servicewechat.com/wx2ffe954c1d2e5369/836/page-frame.html'
            },
            json: {
                'data': this.aes_en(`{"userId":"${this.userId}","orgId":"${this.orgId}","utcCode":"${utcCode}","campaignId":"1000","lat":36.877131890190974,"lon":117.82177951388888,"mobile":"${this.mobile}","name":"${this.name}","createTime":"${this.createTime}","openId":"${this.openId}"}`)
            }

        }
        // console.log(options);
        let resp = await $.request(options)

        resp = JSON.parse(this.aes_de(resp))

        console.log(resp)
        if (resp.code == 200) {
            console.log(`恭喜你获得 ${resp.data.luckyDraws.length} 件物品`)
            for (let index = 0; index < resp.data.luckyDraws.length; index++) {
                console.log(resp.data.luckyDraws[index].name)
            }

        } else if (resp.code == 1000 && resp.message == '抱歉，您当日抽奖次数已达活动上限，明天再来吧') {
            console.log(resp.message)
            return this.t = 'stop'
        } else if (resp.code == 1911 && resp.message == '抱歉，当前二维码已使用，再试试其他的吧') {
            console.log(resp.message)
        } else {
            console.log(`${options.fn}: 失败,  ${JSON.stringify(resp)}`)
            return this.t = 'stop'
        }
        await $.wait($.randomInt(3, 5))
    }

    aes_en(data) {
        const CryptoJS = require('crypto-js')
        const key = CryptoJS.enc.Utf8.parse(this.key)
        const iv = CryptoJS.enc.Utf8.parse(this.iv)

        const ciphertext = CryptoJS.AES.encrypt(data, key, {
            iv: iv,
            mode: CryptoJS.mode.CBC,
            padding: CryptoJS.pad.Pkcs7
        })

        return ciphertext.toString()
    }




    aes_de(ciphertext) {
        const CryptoJS = require('crypto-js')
        const key = CryptoJS.enc.Utf8.parse(this.key)
        const iv = CryptoJS.enc.Utf8.parse(this.iv)

        const decrypted = CryptoJS.AES.decrypt(ciphertext, key, {
            iv: iv,
            mode: CryptoJS.mode.CBC,
            padding: CryptoJS.pad.Pkcs7
        })

        return decrypted.toString(CryptoJS.enc.Utf8)
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
                // console.log(resp)
                let { statusCode, headers, body } = resp
                if (body) try {
                    body = JSON.parse(body)
                } catch {
                }
                if (type == 'body') {
                    return Promise.resolve(body)
                } else if (type == 'cookie') {
                    return Promise.resolve(resp)
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