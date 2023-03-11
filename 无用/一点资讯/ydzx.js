/*
一点资讯 app             cron 25 6-23 * * *  ydzx.js

23/2/3      基本任务

-------------------  青龙-配置文件-复制区域  -------------------
# 一点资讯
export ydzx=" cookie # yd_device_id  @  cookie # yd_device_id  "  

多账号用 换行 或 @ 分割  
tg频道: https://t.me/yml2213_tg  
*/
const $ = Env('一点资讯')
const notify = require('./sendNotify')
const crypto = require('crypto-js')

const envSplitor = ['\n', '&', '@']     //支持多种分割，但要保证变量里不存在这个字符
const ckNames = ['ydzx']                //支持多变量
//====================================================================================================
let DEFAULT_RETRY = 1           // 默认重试次数
//====================================================================================================




async function userTasks() {

    $.log('用户信息', { sp: true, console: false })  // 带分割的打印
    list = []
    for (let user of $.userList) {
        list.push(user.userInfo(1))
    } await Promise.all(list)


    $.log('任务列表', { sp: true, console: false })
    list = []
    for (let user of $.userList) {
        if (user.ckFlog) {
            list.push(user.tasklist())
            // list.push(user.sleep())
        }
    } await Promise.all(list)



    $.log('看广告', { sp: true, console: false })
    list = []
    for (let user of $.userList) {
        if (user.ckFlog) {
            list.push(user.watchAd(621))
        }
    } await Promise.all(list)


    // $.log('睡觉赚豆', { sp: true, console: false })
    // list = []
    // for (let user of $.userList) {
    //     if (user.ckFlog) {
    //         list.push(user.sleep())
    //     }
    // } await Promise.all(list)

    // $.log('开宝箱', { sp: true, console: false })
    // list = []
    // for (let user of $.userList) {
    //     if (user.ckFlog) {
    //         list.push(user.openBox())
    //     }
    // } await Promise.all(list)


    // $.log('里豆查询', { sp: true, console: false })
    // list = []
    // for (let user of $.userList) {
    //     if (user.ckFlog) {
    //         list.push(user.check())
    //     }
    // } await Promise.all(list)



}


class UserClass {
    constructor(ck) {
        this.idx = `账号[${++$.userIdx}]`
        this.ckFlog = true
        this.ck = ck.split('#')
        this.cookie = this.ck[0]
        this.yd_device_id = this.ck[1]

        this.hd = {
            'Cookie': this.cookie,
            'user-agent': 'Mozilla/5.0 (Linux; Android 12; M2102J2SC Build/SKQ1.211006.001; wv) AppleWebKit/537.36 (KHTML, like Gecko) Version/4.0 Chrome/96.0.4664.104 Mobile Safari/537.36',
        }
        this.appid = 'yidian'
        this.version = '029900'
        this.cv = '6.0.0.1'


    }


    async userInfo(type) { // 用户信息
        let params = {
            'yd_device_id': this.yd_device_id,
            'appid': this.appid,
            'version': this.version,
            'platform': '1',
            'cv': this.cv,
        }
        let qs = $.json2str(params, '&')
        let options = {
            fn: '用户信息',
            method: 'get',
            url: `https://a1.go2yd.com/Website/activity/task-center-info?${qs}`,
            headers: this.hd,
        }
        // console.log(options)
        let resp = await $.request(options)
        // console.log(resp)
        if (resp.code == 0) {
            this.coin = resp.result.token.score
            this.cash = resp.result.token.cash
            if (type == 1) {
                $.log(`${this.idx}: ${options.fn} ${resp.status}, 金币 ${this.coin} 个, 现金 ${this.cash / 100} 元`, { notify: true })
            } else if (type == 2) { // 宝箱查询
                if (resp.data.treasure.next_treasure_time == resp.data.treasure.current_time) {
                    await this.openBox()
                } else {
                    let cdTime = resp.data.treasure.next_treasure_time - resp.data.treasure.current_time
                    $.log(`${this.idx}: 开宝箱冷却时间还有 ${cdTime} 秒`)
                }
            } else if (type == 3) { // 签到查询
                if (!resp.result.game_list.signIn.status) {
                    await this.doSign()
                } else $.log(`${this.idx}: 今天已签到`)
            }
            this.ckFlog = true
        } else console.log(`${options.fn}: 失败,  ${JSON.stringify(resp)}`), this.ckFlog = false

    }

    async tasklist() { // 任务列表 
        await this.userInfo(3)  //签到查询

        // await this.userInfo(2)  //宝箱查询


    }

    async doSign() { // 签到
        let params = {
            'yd_device_id': this.yd_device_id,
            'appid': this.appid,
            'version': this.version,
            'platform': '1',
            'cv': this.cv,
        }
        let qs = $.json2str(params, '&')
        let options = {
            fn: '签到',
            method: 'get',
            url: `https://a1.go2yd.com/Website/activity/task-sign-in?${qs}`,
            headers: this.hd,
        }
        // console.log(options)
        let resp = await $.request(options)
        // console.log(resp)
        if (resp.code == 0) {
            $.log(`${this.idx}: ${resp.status}, 签到第 ${resp.result.score_list.sign_time} 天, 获得金币 ${resp.result.score_list.score_add} 个, ${resp.result.content.sub_title}`)
        } else if (resp.code == -1) {
            $.log(`${this.idx}: ${resp.reason}`)
        } else console.log(`${options.fn}: 失败,  ${JSON.stringify(resp)}`)

    }

    async watchAd(id) { // 获取广告id
        let params = {
            'position': `[${id}]`,
            'is_ad_push': true,
            'yd_device_id': this.yd_device_id,
            'appid': this.appid,
            'version': this.version,
            'platform': '1',
            'cv': this.cv,
        }
        let qs = $.json2str(params, '&', 1)
        // console.log(qs)
        let options = {
            fn: '获取广告id',
            method: 'post',
            url: `https://a1.go2yd.com/Website/activity/task-center-info?${qs}`,
            headers: this.hd,
            json: { "clientInfo": "{\"clientInfo\":{\"deviceInfo\":{\"model\":\"M2102J2SC\",\"device\":\"thyme\",\"androidVersion\":\"12\",\"screenWidth\":1078,\"screenHeight\":2206,\"ppi\":440,\"brand\":\"Xiaomi\",\"manufacturer\":\"Xiaomi\",\"miuiVersion\":\"V13.0.6.0.SGACNXM\",\"userSpace\":0,\"UA\":\"Mozilla\\/5.0 (Linux; Android 12; M2102J2SC Build\\/SKQ1.211006.001; wv) AppleWebKit\\/537.36 (KHTML, like Gecko) Version\\/4.0 Chrome\\/96.0.4664.104 Mobile Safari\\/537.36\",\"updateMark\":\"6316083.835999998\",\"bootMark\":\"32efbfa6-dc7f-4566-beaf-35c84c8fa4e9\"},\"userInfo\":{\"imei\":\"5284047f4ffb4e04824a2fd1d1f0cd62\",\"imei_2\":\"194efae9c2eb139f44ceabef9e48df97\",\"oaId\":\"e998cb31be347dc0\",\"aaId\":\"5e6d8373-73e9-4e5f-ac6f-ee3ce667de8d\",\"udId\":\"\",\"vaId\":\"7f6a119018af523e\",\"mac\":\"02:00:00:00:00:00\",\"language\":\"zh\",\"country\":\"CN\",\"serviceProvider\":\"中国电信\",\"appVersion\":\"6.0.0.1\",\"androidId\":\"4260241008c2692e\",\"region\":\"\",\"cityCode\":\"\",\"adCode\":\"\",\"GPS\":\"\",\"businessarea\":[],\"AOI\":[]}}}" }
        }
        // console.log(options)
        let resp = await $.request(options)
        // console.log(resp)
        if (resp.code == 0) {
            // $.log(`${this.idx}: ${resp.msg}, 签到第 ${resp.data.sign} 天, 获得里豆 ${resp.data.money}`)
            // $.log(resp.result.game_list.advertise.ads)
            this.eid = resp.result.game_list.advertise.ads[id].eid
            this.aid = resp.result.game_list.advertise.ads[id].aid
            console.log(this.aid, this.eid)
            if (this.eid) {
                await this.doAd(this.aid, this.eid)
            } else {
                await $.wait(2)
                await this.watchAd(id)
            }

        } else console.log(`${options.fn}: 失败,  ${JSON.stringify(resp)}`)

    }

    async doAd(aid, eid) { // 领取广告奖励
        let params = {
            'app_name': '领任务',
            'id': `${aid}_${eid}`,
            'task_finish': 1,
            'extra_reward': 3,
            'request_source': 2,
            'dwell_time': 1,
            'code': '1afa34a7f984eeabdbb0a7d494132ee5',
            'yd_device_id': this.yd_device_id,
            'appid': this.appid,
            'version': this.version,
            'platform': '1',
            'cv': this.cv,
        }
        let qs = $.json2str(params, '&', 1)
        let options = {
            fn: '领取广告奖励',
            method: 'get',
            url: `https://a1.go2yd.com/Website/activity/task-center-ad-point?${qs}`,
            headers: this.hd,
        }
        // console.log(options)
        let resp = await $.request(options)
        // console.log(resp)
        if (resp.code == 0) {
            // $.log(`${this.idx}: ${resp.msg}, 签到第 ${resp.data.sign} 天, 获得里豆 ${resp.data.money}`)
            $.log(`${this.idx}: ${options.fn} ok, 获得 ${resp.ads.point} 元`)
        } else if (resp.code == 10) {
            $.log(`${this.idx}: ${resp.reason}`)
        } else console.log(`${options.fn}: 失败,  ${JSON.stringify(resp)}`)

    }



    async check() { // 查询
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
            fn: '查询',
            method: 'post',
            url: `https://api.ersanli.cn/kilos/apis/user/wallet.action`,
            headers: this.hd,
            form: params
        }
        // console.log(options)
        let resp = await $.request(options)
        // console.log(resp)
        if (resp.code == 'A00000') {
            $.log(`${this.idx}: ${this.nickname}, 共有豆豆 ${resp.data.gold}个, 今天获得 ${resp.data.withdrawToday}`, { notify: true })
        } else console.log(`${options.fn}: 失败,  ${JSON.stringify(resp)}`)

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
        json2str(obj, c, sort = false, encode = false) {
            if (!sort) {
                let ret = []
                for (let keys of Object.keys(obj).sort()) {
                    let v = obj[keys]
                    if (v && encode) v = encodeURIComponent(v)
                    ret.push(keys + '=' + v)
                }
                return ret.join(c)
            } else {
                // console.log(`===`)
                let a = new URLSearchParams(Object.entries(obj)).toString()
                return a
            }

        }
        qs2str(obj, c, encode = false) {
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