/*
e览衢江              elqj_s.js


-------------------  青龙-配置文件-复制区域  -------------------
# e览衢江
export elqj_s_s=" X-SESSION-ID"  

多账号用 换行 或 @ 分割  

X-SESSION-ID 可以用之前的  抓 vapp.tmuyun.com 里面的


tg频道: https://t.me/yml2213_tg  
*/
const $ = Env('e览衢江')
const fs = require('fs')
const envSplit = ['\n', '&', '@']     //支持多种分割，但要保证变量里不存在这个字符
const ckNames = ['elqj_s']                //支持多变量
const crypto = require('crypto-js')

//====================================================================================================

let device_no = `00000000-6641-8460-0000-000011${$.randomString(6)}`

//====================================================================================================


class UserClass {
    constructor(ck) {
        this.idx = `账号[${++$.userIdx}]`
        this.ckFlog = true
        // this.ck = ck.split('#')
        // this.cookie = `PHPSESSID=${this.ck[0]};`
        this.SESSION = ck

        this.hd = {
            'User-Agent': 'Mozilla/5.0 (Linux; Android 12; M2102J2SC Build/SKQ1.211006.001; wv) AppleWebKit/537.36 (KHTML, like Gecko) Version/4.0 Chrome/114.0.5735.196 Mobile Safari/537.36;xsb_qujiang;xsb_qujiang;2.0.0;native_app',
            'Cookie': ''
        }

    }

    async userTask() { // 个人信息
        console.log(`\n=============== ${this.idx} ===============`)

        $.log(`\n-------------- 开始 --------------`)
        await this.info()


    }






    async info() { // 信息
        let ts13 = $.ts(13)
        let reqid = `3bc70f69-a965-41ca-9d56-${$.randomString(12)}`
        // /api/user_mumber/account_detail&&64af616ed63fea5c0a0e9eea&&3bc70f69-a965-41ca-9d56-21cc61acab28&&1689230115318&&FR*r!isE5W&&85
        let data = `/api/user_mumber/account_detail&&${this.SESSION}&&${reqid}&&${ts13}&&FR*r!isE5W&&85`
        let sign = crypto.SHA256(data).toString()

        let options = {
            fn: '信息',
            method: 'get',
            url: `https://vapp.tmuyun.com/api/user_mumber/account_detail`,
            headers: {
                'X-SESSION-ID': this.SESSION,
                'X-REQUEST-ID': reqid,
                'X-TIMESTAMP': ts13,
                'X-SIGNATURE': sign,
                'X-TENANT-ID': '85',
                'User-Agent': '2.0.0;00000000-6641-8460-0000-000011944588;Xiaomi M2102J2SC;Android;12;xiaomi',
            },

        }
        // console.log(options)
        let resp = await $.request(options)
        // console.log(resp)
        if (resp.code == 0) {

            this.account_id = resp.data.rst.id
            $.log(`${this.idx}: ${resp.data.rst.nick_name}, 积分:${resp.data.rst.total_integral}

            sesioon:  ${this.SESSION}

            `)

            await this.get_acw_tc()  // 获取acw_tc
            // await this.init()  // 初始化地址
            // for (let i = 0; i < 3; i++) {
            //     // await this.start(1)  // 开始答题
            //     // await this.init()  // 初始化地址

            // }


        } else console.log(`${options.fn}: 失败,  ${JSON.stringify(resp)}`), this.ckFlog = false
    }


    async get_acw_tc() {

        let options = {
            fn: '获取acw_tc',
            method: 'get',
            url: `https://foyguk1n.act.tmuact.com/answer/index.html`,
            headers: this.hd,

        }
        // console.log(options)
        let resp = await $.request(options, 'hd')
        // console.log(resp)

        this.acw_tc = resp['set-cookie'][0].split(';path')[0]
        await this.get_phpsession()  // 获取phpsession


    }


    async get_phpsession() { // 获取phpsession

        let options = {
            fn: '获取phpsession',
            method: 'get',
            url: `https://foyguk1n.act.tmuact.com/activity/api.php?m=public&subm=front`,
            headers: {
                'User-Agent': 'Mozilla/5.0 (Linux; Android 12; M2102J2SC Build/SKQ1.211006.001; wv) AppleWebKit/537.36 (KHTML, like Gecko) Version/4.0 Chrome/114.0.5735.196 Mobile Safari/537.36;xsb_qujiang;xsb_qujiang;2.0.0;native_app',
                'Cookie': this.acw_tc
            }

        }
        // console.log(options)
        let resp = await $.request(options, 'hd')
        // console.log(resp)

        this.phpsession = resp['set-cookie'][0].split(';path')[0]
        this.hd.Cookie = this.phpsession

        // console.log(this.phpsession)
        await this.check_addr()  // 检测地址

    }

    async check_addr() { // 检测地址
        // `https://foyguk1n.act.tmuact.com/activity/api.php?m=front&subm=answer&action=quzhouregister&q=YunSLfvEi&account_id=${this.account_id}&sessionid=${this.SESSION}`,
        let options = {
            fn: '检测地址',
            method: 'get',
            url: `https://foyguk1n.act.tmuact.com/activity/api.php?m=front&subm=answer&action=init&q=YunSLfvEi&account_id=${this.account_id}&sessionid=${this.SESSION}&need_register=2`,
            headers: this.hd,

        }
        // console.log(options)
        let resp = await $.request(options)
        // console.log(resp)
        if (resp.code == 3001) {
            $.log(`${this.idx}: ${options.fn} -- ${resp.msg}, 检测地址成功， 开始答题`)
            await this.start(1)  // 开始答题

        } else if (resp.code == 5110) {
            $.log(`${this.idx}: ${options.fn} -- ${resp.msg}, 开始初始化地址`)
            await this.init2()  // 初始化地址

        } else {
            console.log(`${options.fn}: 失败,  ${JSON.stringify(resp)}`)
        }
    }
    async init2() { // 初始化地址

        let addArr = ["峡川镇", "上方镇", "灰坪乡", "杜泽镇", "太真乡", "双桥乡"]

        let a = $.randomInt(0, addArr.length - 1)

        let options = {
            fn: '初始化地址',
            method: 'post',
            url: `https://foyguk1n.act.tmuact.com/activity/api.php?m=front&subm=answer&action=quzhouregister&q=YunSLfvEi&account_id=${this.account_id}&sessionid=${this.SESSION}`,
            headers: this.hd,
            form: {
                'street': addArr[a]
            }
        }
        // console.log(options)
        let resp = await $.request(options)
        // console.log(resp)
        if (resp.code == 3001) {

            $.log(`${this.idx}:${options.fn},选择--${addArr[a]}  ${resp.msg}}`)
            await this.start(1)  // 开始答题
        } else {
            console.log(`${options.fn}: 失败,  ${JSON.stringify(resp)}`)
            // await this.start(1)  // 开始答题

        }
    }


    async start(num) { // 开始答题
        let options = {
            fn: '开始答题',
            method: 'get',
            url: `https://foyguk1n.act.tmuact.com/activity/api.php?m=front&subm=answer&action=answerinfo&answer_id=2218&answer_start=${num}`,
            headers: this.hd,

        }
        // console.log(options)
        let resp = await $.request(options)
        // console.log(resp)
        if (resp.code == 3001) {
            this.id = resp.data.list[0].id
            this.win_id = resp.data.list[0].win_id.toUpperCase()
            $.log(`${this.idx}: ${resp.msg}, 题目:${this.id}--${resp.data.list[0].title}, 获取答案:${this.win_id}`)

            // await $.wait($.randomInt(5, 8))

            await this.doSubm(num, this.id, this.win_id)

            // console.log(resp.data)

            this.ckFlog = true
        } else console.log(`${options.fn}: 失败,  ${JSON.stringify(resp)}`), this.ckFlog = false


    }


    // https://foyguk1n.act.tmuact.com/activity/api.php?m=front&subm=answer&action=answerdata&answer_id=2218
    async doSubm(num, id, win_id) { // 提交

        let last = ''
        if (num < 10) {
            last = 0
        } else if (num == 10) {
            last = 1
        }

        let options = {
            fn: '提交',
            method: 'post',
            url: `https://foyguk1n.act.tmuact.com/activity/api.php?m=front&subm=answer&action=answerdata&answer_id=2218`,
            headers: this.hd,
            form: {
                'id': id,
                'option': `["${win_id}"]`,
                'yongshi': $.randomInt(5, 10),
                'last': last
            }
        }

        // console.log(options)
        let resp = await $.request(options)
        // console.log(`================= ${num}===================`)
        // console.log(resp)
        // console.log(`====================================`)
        if (resp.code == 3001) {
            if (num < 10) {
                $.log(`${this.idx}: ${options.fn} ${resp.msg}, 继续, 第${num + 1}题`)
                await this.doAnswer(num + 1)
            } else if (num == 10) {
                // console.log(JSON.stringify(resp))
                if (resp.data.fin == 1) {
                    $.log(`${this.idx}: ${options.fn} ${resp.msg}, 完成答题, 准备提交`)
                    // console.log(resp.data.id)
                    this.endId = resp.data.id
                    await this.end(this.endId)
                } else {
                    $.log(`${this.idx}: ${options.fn}, 无ID,无法提交`)

                }
            }
        } else console.log(`${options.fn}: 失败,  ${JSON.stringify(resp)}`)


    }

    // https://foyguk1n.act.tmuact.com/activity/api.php?m=front&subm=answer&action=answerinfo&answer_id=2218&page=10
    // https://foyguk1n.act.tmuact.com/activity/api.php?m=front&subm=answer&action=answerinfo&answer_id=2218&page=2
    async doAnswer(num) { // 答题
        let options = {
            fn: '答题',
            method: 'get',
            url: `https://foyguk1n.act.tmuact.com/activity/api.php?m=front&subm=answer&action=answerinfo&answer_id=2218&page=${num}`,
            headers: this.hd

        }
        // console.log(options)
        let resp = await $.request(options)
        // console.log(resp)
        if (resp.code == 3001) {
            this.id = resp.data.list[0].id
            this.win_id = resp.data.list[0].win_id.toUpperCase()
            $.log(`${this.idx}: ${resp.msg}, 题目:${this.id}--${resp.data.list[0].title}, 获取答案:${this.win_id}`)

            // 答题延迟
            await $.wait($.randomInt(1, 4))
            // await $.wait(1)

            await this.doSubm(num, this.id, this.win_id)

        } else console.log(`${options.fn}: 失败,  ${JSON.stringify(resp)}`)

    }


    async end(endId) { // 结束
        let options = {
            fn: '结束',
            method: 'get',
            url: `https://foyguk1n.act.tmuact.com/activity/api.php?m=front&subm=answer&action=answerresult&answer_id=2218&id=${endId}`,
            headers: this.hd,

        }
        // console.log(options)
        let resp = await $.request(options)
        // console.log(resp)
        if (resp.code == 3001) {

            if (resp.data.result == 1) {
                $.log(`${this.idx}: ${resp.msg}, 答题完成， 去抽奖了！`)
                await this.Lottery()
            } else {
                $.log(`${this.idx}: ${resp.msg}, 未知错误！`)
            }

        } else console.log(`${options.fn}: 失败,  ${JSON.stringify(resp)}`)

    }

    // https://favzevkg.act.tmuact.com/activity/api.php
    async Lottery() { // 抽奖
        let ts13 = $.ts(13)
        // 00000000-6641-8460-0000-000011944588&&1689223895018&&MJ<?TH4&9w^
        let data = `${device_no}&&${ts13}&&MJ<?TH4&9w^`
        let sign = crypto.SHA256(data).toString()
        // console.log(sign)

        let options = {
            fn: '抽奖',
            method: 'post',
            url: `https://favzevkg.act.tmuact.com/activity/api.php`,
            headers: this.hd,
            form: {
                'm': 'front',
                'subm': 'money',
                'action': 'open',
                'account_id': this.account_id,
                'session_id': this.SESSION,
                'token': '',
                'q': 'YunSLfvb9',
                'system': 'Android',
                'signature': sign,
                'appName': 'e览衢江',
                'system_version': '12',
                'device_no': device_no,
                'device_type': 'Xiaomi+M2102J2SC',
                'statusBarHeight': '33',
                'networkType': 'wifi',
                'timestamp': ts13,
                'version': '2.0.0',
                'detail': '',
                'client_code': 'xsb_qujiang'
            }
        }
        // console.log(options)
        let resp = await $.request(options)
        // console.log(resp)
        if (resp.code == 3001) {
            console.log(JSON.stringify(resp))
            $.log(`${this.idx}: ${options.fn} -- 恭喜你鸭, 获得${resp.data.suffix}: ${resp.data.name} 元`)
            // $.log(`${this.idx}: ${options.fn} -- 获得${resp.data.client_money_name}: ${resp.data.client_money} 元, 可提现:${resp.data.can_withdraw}`)
            // $.log(`${this.idx}: ${options.fn} -- 完成次数(限制三次): 设备:${resp.data.device_limit}, 手机号 :${resp.data.mobile_limit}`)
            await $.wait($.randomInt(1, 3))
            await this.yecx()

            await this.start(1)  // 开始答题


        } else if (resp.code == 5514 || 5012) {
            $.log(`${this.idx}: ${options.fn} -- ${resp.msg}`)
            await this.yecx()
        } else console.log(`${options.fn}: 失败,  ${JSON.stringify(resp)}`)
    }

    async yecx() { // 余额查询

        let options = {
            fn: '余额查询',
            method: 'post',
            url: `https://wallet.act.tmuact.com/activity/api.php`,
            headers: this.hd,
            form: {
                "m": "front",
                "subm": "money_wallet",
                "action": "wallet",
                "session_id": this.SESSION,
                "account_id": this.account_id,
                "app": "XSB_QUJIANG",
                "gaze_contro": 0
            }
        }
        // console.log(options)
        let resp = await $.request(options)
        // console.log(resp)
        if (resp.code == 3001) {
            $.log(`${this.idx}: ${options.fn} -- 余额 ${resp.data.total}`)
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