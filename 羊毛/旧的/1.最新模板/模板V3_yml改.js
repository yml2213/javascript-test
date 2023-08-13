/*
点众免费小说-快应用 app             cron 22 8,12 * * *  dzmfxs.js

12.16       修改最新模板

-------------------  青龙-配置文件-复制区域  -------------------
# 点众免费小说-快应用
export dzmfxs=" t # smdid @ t # smdid "  

抓 dzmfxs.kkyd.cn 的 t 和 smdid

多账号用 换行 或 @ 分割  
tg频道: https://t.me/yml2213_tg  

*/
const $ = Env('点众免费小说-快应用')
const notify = require('./sendNotify')

const envSplitor = ['\n', '&', '@']     //支持多种分割，但要保证变量里不存在这个字符
const ckNames = ['dzmfxs', '变量名2']      //支持多变量
//=======================================================================================================
let DEFAULT_RETRY = 1           // 默认重试次数
let MODE = 0                    // 并发控制 1-并发  0-顺序
//=======================================================================================================



class UserClass {
    constructor(ck) {
        this.idx = `账号[${++$.userIdx}]: `
        this.ck = ck.split('#')
        this.t = this.ck[0]
        this.smdid = this.ck[1]
    }

    async UserTasks() {
        $.log('上传阅读时间', { sp: true, console: false })  // 带分割的打印
        await this.readDuration()

        $.log('刷金币', { sp: true, console: false })  // 带分割的打印
        await this.tasks()

        $.log('查询', { sp: true, console: false })  // 带分割的打印
        await this.points()

    }


    getHeaders() {
        return {
            't': this.t,
            'pname': 'com.dianzhong.dzmfxs',
            'User-Agent': 'Mozilla/5.0 (Linux; Android 12; M2102J2SC Build/SKQ1.211006.001; wv) AppleWebKit/537.36 (KHTML, like Gecko) Version/4.0 Chrome/96.0.4664.104 Mobile Safari/537.36 hap/1.10/xiaomi com.miui.hybrid/1.10.0.0 com.dianzhong.dzmfxs/5.5.3.230 ({"packageName":"com.miui.home","type":"shortcut","extra":{"original":{"packageName":"com.tencent.mm","type":"url","extra":{}},"scene":"api"}})'
        }
    }



    async readDuration() {
        let options = {
            fn: 'readDuration',
            method: 'post',
            url: 'https://dzmfxs.kkyd.cn/glory/fastapp/2146?ver=5503230&appVer=5.5.3.230',
            headers: this.getHeaders(),
            json: {
                "taskId": 1148,
                "action": 36,
                "readDuration": 567,
                "bookId": "11010083047",
                "chapterId": "487625436"
            }
        }
        // console.log(options)
        let resp = await $.request(options)
        // console.log(resp)
        if (resp.retCode == 0 && resp.data.totalReadDuration) {
            $.log(`${this.idx} 上传阅读时间成功 当前阅读 ${resp.data.totalReadDuration}分钟`)
        } else if (resp.retCode == 0 && resp.data.totalReadDuration == 0) {
            $.log(`失败,稍后再试!`)
        } else console.log(`${options.fn}: 失败, ${resp}`)

    }

    async tasks() {
        let qd = [
            1001, 1042, 1043, 1044, 1062, 1068, 1069, 1070, 1071,
            1072, 1075, 1085, 1087, 1092, 1094, 1104, 1105, 1141,
            1142, 1148, 1149, 1150, 1151, 1152, 1153, 1154, 1156,
            1157, 1158, 1159, 1160, 1161, 1162, 1167, 1169, 1170,
            1171, 1173, 1174, 1176, 1177, 1179, 1180, 1187, 1193,
            1194, 1195, 1196, 1197, 1198, 1199, 1200, 1201, 1202,
            1203, 1204, 1205, 1206, 1207, 1208, 1209, 1210, 1218,
            1219, 1220, 1221, 1222, 1223, 1224, 1225, 1226, 1227,
            1228, 1229, 1236, 1240, 1244, 1245, 1247, 1248, 1249,
            1250, 1251, 1252, 1257, 1258, 1260, 1266, 1269, 1272,
            1278, 47
        ]

        for (let id of qd) {
            await this.dotask(id)
            await $.wait(2)
        }

    }
    async dotask(id) {
        let options = {
            fn: 'dotask',
            method: 'post',
            url: 'https://dzmfxs.kkyd.cn/glory/fastapp/2141?ver=5503230&appVer=5.5.3.230',
            headers: this.getHeaders(),
            json: { 'taskId': id },
        }
        // console.log(options)
        let resp = await $.request(options)
        // console.log(resp)
        if (resp.retCode == 0 && resp.data.message) {
            if (resp.data.code == 103 || 102) {
                $.log(`${this.idx}: ${resp.data.message}`)
            }
        } else console.log(`${options.fn}: 失败, ${resp}`)

    }



    async points() {
        let options = {
            fn: 'points',
            method: 'post',
            url: 'https://dzmfxs.kkyd.cn/glory/fastapp/2404?ver=5503230&appVer=5.5.3.230',
            headers: this.getHeaders(),
            json: { 'signText': 1 },
        }
        // console.log(options)
        let resp = await $.request(options)
        // console.(resp)
        if (resp.retCode == 0) this.coin = resp.data.glods
        // console.log(this.coin)
        options = resp = ''
        options = {
            fn: 'points',
            method: 'post',
            url: 'https://dzmfxs.kkyd.cn/glory/fastapp/2106?ver=5503230&appVer=5.5.3.230',
            headers: this.getHeaders(),
            json: {},
        }
        resp = await $.request(options)
        if (resp.retCode == 0) {
            $.log(`${this.idx} ${resp.data.user.nickName}, 金币:${this.coin}`)
        } else console.log(`${options.fn}: 失败, ${resp}`)

        if (this.coin >= 30000) {
            $.log(`${this.idx} 金币:${this.coin}, 去提现 3 元!`)
            await this.cash()
        }
    }

    async cash() {
        let options = {
            fn: 'cash',
            method: 'post',
            url: 'https://dzmfxs.kkyd.cn/glory/fastapp/2856?ver=5503230&appVer=5.5.3.230',
            headers: this.getHeaders(),
            json: { 'amountId': 13, 'smdid': this.smdid },
        }
        // console.log(options)
        let resp = await $.request(options)
        // console.log(resp)
        if (resp.retCode == 0 && resp.data.retCode == 1) {
            $.log(`提现3元:  ${resp.data.retMsg}`)
        } else console.log(`${options.fn}: 失败, ${resp}`)


    }

}


!(async () => {
    console.log(await $.yiyan())
    $.read_env(UserClass)
    if (MODE) {  // 并发模式
        list = []
        for (let user of $.userList) {
            list.push(user.UserTasks())
        }
        await Promise.all(list)

    } else {  // 顺序模式 
        for (let user of $.userList) {
            // $.log(`${user.idx}`, { sp: true, console: false })
            console.log(`\n\n====================  ${user.idx}  ====================`)
            await user.UserTasks()
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
            this.log(`[${this.name}]开始运行`, { time: true })

            this.notifyStr = []
            this.notifyFlag = false

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