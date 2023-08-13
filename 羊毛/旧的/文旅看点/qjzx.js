/*
文旅看点 app             cron 25 6-23 * * *  wlkd.js


23/2/23      密码登录 ,基本任务 感谢 蛋姨 脚本

-------------------  青龙-配置文件-复制区域  -------------------
# 文旅看点
export wlkd=" phone # pwd  @  phone # pwd   "  

多账号用 换行 或 @ 分割  

tg频道: https://t.me/yml2213_tg  
*/
const $ = Env('文旅看点')
const notify = require('./sendNotify')
const crypto = require('crypto-js')

const envSplit = ['\n', '&', '@']     //支持多种分割，但要保证变量里不存在这个字符
const ckNames = ['wlkd']                //支持多变量

//====================================================================================================
let DEFAULT_RETRY = 1           // 默认重试次数
let readNum = '20'              // 每次脚本运行阅读数量
//====================================================================================================


async function userTasks() {

    $.log('登录', { sp: true, console: false })  // 带分割的打印
    let list = []
    for (let user of $.userList) {
        list.push(user.login())
    }
    await Promise.all(list)


    $.log('任务', { sp: true, console: false })
    list = []
    for (let user of $.userList) {
        if (user.ckFlog) {
            list.push(user.doSign())
            list.push(user.task())
            list.push(user.share())
        }
    }
    await Promise.all(list)

    // $.log('积分查询', { sp: true, console: false })
    // list = []
    // for (let user of $.userList) {
    //     if (user.ckFlog) {
    //         list.push(user.check())
    //     }
    // }
    // await Promise.all(list)


}


class UserClass {
    constructor(ck) {
        this.idx = `账号[${++$.userIdx}]`
        this.ckFlog = true
        this.ck = JSON.parse(ck)
        this.token = this.ck.token
        this.userid = this.ck.userid
        this.brand = this.ck.brand
        this.model = this.ck.model
        this.appversion = this.ck.appversion
        this.appversioncode = this.ck.appversioncode




        this.ts = $.ts(10)
        // this.ts = '1678438424'
        this.salt = 'bKZ7WjF370'
        this.ck.optime = this.ts

        // console.log(this.ck)

        this.hd = {
            // 'x-requested-with': 'XMLHttpRequest',
            'content-type': 'application/json;charset=UTF-8',
            'user-agent': 'okhttp/4.9.0'
        }

    }


    async login() { // 登录
        let sppid = await this.get_sign(this.ts, this.token, this.brand, this.model)
        let options = {
            fn: '登录',
            method: 'post',
            url: `https://wlkdapi.zhongchuanjukan.com/login/appOpen`,
            headers: {
                'sppid': sppid,
                'user-agent': 'okhttp/4.9.0',
                'content-type': 'application/json; charset=UTF-8'
            },
            json: this.ck
        }
        // console.log(options)
        let resp = await $.request(options)
        // console.log(resp)
        if (resp.ret_code == 1) {
            this.token = resp.token
            this.ck.token = this.token
            $.log(`${this.idx}: ${options.fn} -- ok, 新token: ${this.token}`)
            this.ckFlog = true
            await $.wait(2)
        } else console.log(`${options.fn}: 失败,  ${JSON.stringify(resp)}`), this.ckFlog = false

    }


    async tasklist() { // 任务列表 
        let options = {
            fn: '任务中心',
            method: 'post',
            url: `https://wlkdapi.zhongchuanjukan.com/task/inread/info`,
            headers: this.hd,
            json: { "token": this.token, "sysname": "wlkd" }
        }
        // console.log(options)
        let resp = await $.request(options)
        // console.log(resp)
        if (resp.ret_code == 1) {
            let tasks = resp.readTaskData
            // console.log(tasks)
            for (const task of tasks) {
                // console.log(task)
                let { taskid, title, taskNum, finishReadNum, taskStatus } = task
                let num = taskNum - finishReadNum
                if (taskStatus == 0) {
                    if (title == '阅读文章') {
                        for (let index = 0; index < num; index++) {
                            // await this.read()
                        }
                    } else if (title == '获得3次分享奖励') {
                        for (let index = 0; index < num; index++) {
                            await this.share_3(title)
                        }
                    } else if (title == '获得1次分享奖励') {
                        for (let index = 0; index < num; index++) {
                            // await this.shareTaskOne(title)
                        }
                    }
                } else {
                    $.log(`${this.idx}: ${title} 已完成`)
                }
            }

        } else console.log(`${options.fn}: 失败, ${JSON.stringify(resp)} `)

    }


    async task() {
        for (let i = 0; i < readNum; i++) {
            await this.read()
        }

        let h = $.ts('h')
        console.log(h)
        if (h >= 17 && 17 < 20) {
            await this.box('evening')  // 晚间分享
        }
        if (h >= 5 && 17 < 10) {
            await this.box('morning')  // 早间分享
        }
        if (h >= 11 && 17 < 16) {
            await this.box('noon')  // 午间分享
        }
        if (h == 12) {
            await this.box('fastshare')  // 首次快捷分享
            await this.box('redbean')  // 每日领红豆
        }
    }


    async doSign() { // 签到 
        let options = {
            fn: '签到',
            method: 'post',
            url: `https://wlkdapi.zhongchuanjukan.com/usersign/sign`,
            headers: this.hd,
            json: { "token": this.token, "sysname": "wlkd" }
        }
        // console.log(options)
        let resp = await $.request(options)
        // console.log(resp)
        if (resp.ret_code == 0 && resp.profit != null) {
            $.log(`${this.idx}: ${options.fn}, ${resp.msg_desc}, 获得红豆 ${resp.profit}`)
            await $.wait(1)
        } else if (resp.ret_code == 0 && resp.profit == null) {
            $.log(`${this.idx}: ${options.fn}, ${resp.msg_desc}`)
        } else console.log(`${options.fn}: 失败,  ${JSON.stringify(resp)}`)
    }



    async read() { // 阅读文章 
        await this.get_artId()
        let sppid = await this.get_sign(this.ts, this.token, this.brand, this.model)
        let rm_1 = $.randomInt(5271181, 5571181)
        let rm_2 = $.randomInt(5271181, 5571181)
        let options = {
            fn: '阅读文章',
            method: 'post',
            url: `https://wlkdapi.zhongchuanjukan.com/article/read`,
            headers: {
                'sppid': sppid,
                'user-agent': 'okhttp/4.9.0',
                'content-type': 'application/json; charset=UTF-8'
            },
            json: {
                "artClassify": 0,
                "artId": this.artId,
                "sensorX": `-1.${rm_1}-4`,
                "sensorY": `-1.${rm_1}-4`,
                "sensorZ": `-3.${rm_2}-4`,
                "appversion": this.appversion,
                "appversioncode": this.appversioncode,
                "brand": this.brand,
                "channel": "SC_XIAOMI_A",
                "darkmode": 1,
                "device_userid": "",
                "imei": "",
                "model": this.model,
                "oaid": this.oaid,
                "optime": this.ts,
                "os": "android",
                "osversion": "12",
                "osversioncode": "31",
                "smid": "-1",
                "sysname": "wlkd",
                "token": this.token,
                "userid": this.userid
            }
        }
        // console.log(options)
        await $.wait($.randomInt(10, 19))
        let resp = await $.request(options)
        // console.log(resp)
        if (resp.ret_code == 1 && resp.profit != null) {
            $.log(`${this.idx}: ${options.fn}-${this.artId}:${this.artTitle} -- ok, 获得 ${resp.profit} 红豆`)
            await $.wait($.randomInt(5, 10))
        } else console.log(`${options.fn}: ${this.artId} 失败,  ${JSON.stringify(resp)}`)
    }

    async share() { // 分享文章 
        await this.share_info()
        let sppid = await this.get_sign(this.ts, this.token, this.brand, this.model)
        let options = {
            fn: '分享文章',
            method: 'post',
            url: `https://wlkdapi.zhongchuanjukan.com/share/info`,
            headers: {
                'sppid': sppid,
                'user-agent': 'okhttp/4.9.0',
                'content-type': 'application/json; charset=UTF-8'
            },
            json: { "artClassify": 0, "artTypeId": "36", "shareArtId": this.artId, "shareEntry": "detail", "shareExtra": this.ctxData, "sharePackage": "", "shareTarget": "weixin", "shareType": "article", "appversion": this.appversion, "appversioncode": this.appversioncode, "brand": this.brand, "channel": "SC_XIAOMI_A", "darkmode": 1, "device_userid": "", "imei": "", "model": this.model, "oaid": this.oaid, "optime": this.ts, "os": "android", "osversion": "12", "osversioncode": "31", "smid": "-1", "sysname": "wlkd", "token": this.token, "userid": this.userid },

        }
        // console.log(options)
        let resp = await $.request(options)
        // console.log(resp)
        if (resp.ret_code == 1) {
            $.log(`${this.idx}: ${options.fn}-${this.artId}:${this.artTitle} -- ok`)
            await $.wait($.randomInt(5, 10))
        } else console.log(`${options.fn}: ${this.artId} 失败,  ${JSON.stringify(resp)}`)
    }



    async box(type) { // box 
        let sppid = await this.get_sign(this.ts, this.token, this.brand, this.model)
        let options = {
            fn: 'box',
            method: 'post',
            url: `https://wlkdapi.zhongchuanjukan.com/hottask/profit`,
            headers: {
                'sppid': sppid,
                'user-agent': 'okhttp/4.9.0',
                'content-type': 'application/json; charset=UTF-8'
            },
            json: { "act_type": type, "appversion": this.appversion, "appversioncode": this.appversioncode, "brand": this.brand, "channel": "SC_XIAOMI_A", "darkmode": 1, "device_userid": "", "imei": "", "model": this.model, "oaid": this.oaid, "optime": this.ts, "os": "android", "osversion": "12", "osversioncode": "31", "smid": "-1", "sysname": "wlkd", "token": this.token, "userid": this.userid }

        }
        // console.log(options)
        let resp = await $.request(options)
        // console.log(resp)
        if (resp.ret_code == 1 && resp.profit != null) {
            $.log(`${this.idx}: ${resp.title}: ${resp.profit}`)
            await $.wait($.randomInt(5, 10))
        } else if (resp.ret_code == 0 && resp.profit == null) {
            $.log(`${this.idx}: ${options.fn}, ${type}: 已领过`)
        } else console.log(`${options.fn}: 失败,  ${JSON.stringify(resp)}`)
    }




    // https://wlkdapi.zhongchuanjukan.com/article/list
    async get_artId() { // 获取文章id 
        this.artId = ''
        this.artTitle = ''
        let sppid = await this.get_sign(this.ts, this.token, this.brand, this.model)
        let rm = $.randomInt(2, 5)
        let options = {
            fn: '获取文章id',
            method: 'post',
            url: `https://wlkdapi.zhongchuanjukan.com/article/list`,
            headers: {
                'sppid': sppid,
                'user-agent': 'okhttp/4.9.0',
                'content-type': 'application/json; charset=UTF-8'
            },
            json: { "classify": 0, "pageNo": rm, "pullAction": "footer", "sceneType": "list", "typeid": "36", "appversion": this.appversion, "appversioncode": this.appversioncode, "brand": this.brand, "channel": "SC_XIAOMI_A", "darkmode": 1, "device_userid": "", "imei": "", "model": this.model, "oaid": this.oaid, "optime": this.ts, "os": "android", "osversion": "12", "osversioncode": "31", "smid": "-1", "sysname": "wlkd", "token": this.token, "userid": this.userid }
        }
        // console.log(options)
        let resp = await $.request(options)
        // console.log(resp)
        if (resp.ret_code == 1) {
            let lists = resp.artlist
            let ran_n = $.randomInt(1, lists.length)
            this.artId = lists[ran_n].artId
            this.artTitle = lists[ran_n].artTitle
            // console.log(this.artId, this.artTitle)
        } else console.log(`${options.fn}: 失败,  ${JSON.stringify(resp)}`)
    }

    async share_info() { // 分享文章信息 
        let sppid = await this.get_sign(this.ts, this.token, this.brand, this.model)
        let rm = $.randomInt(2, 5)
        let options = {
            fn: '获取文章id',
            method: 'post',
            url: `https://wlkdapi.zhongchuanjukan.com/article/list`,
            headers: {
                'sppid': sppid,
                'user-agent': 'okhttp/4.9.0',
                'content-type': 'application/json; charset=UTF-8'
            },
            json: { "classify": 0, "pageNo": rm, "pullAction": "header", "sceneType": "taskshare", "typeid": "36", "appversion": this.appversion, "appversioncode": this.appversioncode, "brand": this.brand, "channel": "SC_XIAOMI_A", "darkmode": 2, "device_userid": "", "imei": "", "model": this.model, "oaid": this.oaid, "optime": this.ts, "os": "android", "osversion": "12", "osversioncode": "31", "smid": "-1", "sysname": "wlkd", "token": this.token, "userid": this.userid },


        }
        // console.log(options)
        let resp = await $.request(options)
        // console.log(resp)
        if (resp.ret_code == 1) {
            let lists = resp.artlist
            let ran_n = $.randomInt(1, lists.length)
            this.ctxData = lists[ran_n].ctxData
            this.artTitle = lists[ran_n].artTitle
            this.artId = lists[ran_n].artId

        } else console.log(`${options.fn}: 失败,  ${JSON.stringify(resp)}`)
    }





    async check() { // 查询
        let options = {
            fn: '查询',
            method: 'post',
            url: `https://api.qd-metro.com/ngscore/user/accInfo`,
            headers: this.hd,
            json: {
                "token": this.token,
                "deviceCoding": this.device,
            }
        }
        // console.log(options)
        let resp = await $.request(options)
        // console.log(resp)
        if (resp.code == '01') {
            $.log(`${this.idx}: 共有积分 ==> ${resp.data.totalScore}`, { notify: true })
        } else console.log(`${options.fn}: 失败,  ${JSON.stringify(resp)}`)

    }




    async get_sign(ts, token, brand, model) {
        let a = `${this.salt}${token}${brand}${model}${ts}${this.salt}`
        // console.log(a)
        let sign = crypto.MD5(a).toString()
        return sign
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

        async request(opt, type = 'body') {
            try {
                const got = require('got')
                let DEFAULT_TIMEOUT = 8000      // 默认超时时间
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