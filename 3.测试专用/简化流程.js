/*
二三里极速版 app             cron 25 6-23 * * *  jsfp.js


23/1/30      基本任务

-------------------  青龙-配置文件-复制区域  -------------------
# 二三里极速版
export esljsb=" phone # pwd  @  phone # pwd   "

多账号用 换行 或 @ 分割
tg频道: https://t.me/yml2213_tg
*/
const $ = Env('二三里极速版')
const notify = require('./sendNotify')
const crypto = require('crypto-js')
const got = require("got");

const envSplitor = ['\n', '&', '@']     //支持多种分割，但要保证变量里不存在这个字符
const ckNames = ['esljsb']                //支持多变量
// console.log(process.env)

let ckData = '1'   // ck数据
//====================================================================================================
let DEFAULT_RETRY = 1           // 默认重试次数
let cash_arr = []

//====================================================================================================


async function userTasks() {

    let userClass = new UserClass(ck)
    await userClass.task()


}


class UserClass {
    constructor(ck) {
        this.idx = `账号[${++$.userIdx}]`
        this.ckFlog = true
        this.ck = ck.split('#')

    }


    // let i = 1158227 ; i < 1160227;   ok

    async task() { // 登录  1171054  1266226  1076344

        await this.cash_info(67892)

    }

    async phone_info(id) { // 登录
        let options = {
            fn: 'cash_info',
            method: 'get',
            url: `https://wnl28.jiemengjia.com/api/my_integral_index?user_id=${id}&ver=1.8.6&appname=calendar_android`,
            headers: {
                'User-Agent': 'HYCalendar/3.6.5 (iPhone; iOS 16.3; Scale/3.00)',
            },
        }
        // console.log(options)
        let resp = await $.request(options)
        // console.log(resp)
        if (resp.code == 'E00000000') {
            let tasks = resp.data.task[0]
            if (tasks.title == '新手任务') {
                let lists = tasks.list
                // console.log(lists)
                let arr = []
                for (let list of lists) {
                    arr.push(list.id)
                }
                if (arr.indexOf(8) > -1) {
                    // console.log(`${id}, 没有绑定手机号`)
                } else {
                    console.log(`${id}, 绑定手机号`)
                    await this.check_cash(id)

                }

            }
        } else console.log(`${options.fn}: 失败,  ${JSON.stringify(resp)}`), this.ckFlog = false

    }


    async check_cash(id) {
        let options = {
            fn: 'cash_info',
            method: 'get',
            url: `https://wnl28.jiemengjia.com/api/my_cash_index?user_id=${id}`,
            headers: {
                'User-Agent': 'HYCalendar/3.6.5 (iPhone; iOS 16.3; Scale/3.00)',
            },

        }
        // console.log(options)
        let resp = await $.request(options)
        // console.log(resp)
        if (resp.code == 'E00000000') {
            let cash_num = resp.data.score_detail.cash_num
            console.log(id, `可提现 ${cash_num} 元`)
            if (cash_num > 0.5) {
                cash_arr.push(id)
                await this.cash_info(id)
            }
            // else if (cash_num > 0.4) {
            //     // console.log(cash_arr)
            //     await this.doTask(id)
            // }
            // await  this.cash(id)
        } else console.log(`${options.fn}: 失败,  ${JSON.stringify(resp)}`), this.ckFlog = false

    }

    // 任务
    async doTask(id) {
        let task_arr = []


        let a = `${id}Wh1y1hvGMOclMeug@4Y9Jbc0BUjmzXae`
        let sign = crypto.MD5(a).toString()

        let options = {
            fn: 'cash_info',
            method: 'post',
            url: `https://wnl28.jiemengjia.com/api/update_cash_info`,
            headers: {
                'User-Agent': 'HYCalendar/3.6.5 (iPhone; iOS 16.3; Scale/3.00)',
                'content-type': 'application/x-www-form-urlencoded'
            },
            form: {
                'device': 'android',
                'timestamp': '1675594689704',
                'ver': '1.8.6',
                'appname': 'calendar_android',
                'client': 'android',
                'idfa': 'android',
                'market': 'xiaomi',
                'openudid': '1c8493ec71d68197unknown',
                'dev_uuid': '1c8493ec71d68197',
                'user_id': id,
                'app_secret': sign,
                'cash_openid': 'otMA60c9k60K8Qygm3NHa930ygKk',
                'user_name': '杨梦磊',
                'cash_name': '东东机器人'
            }
        }
        // console.log(options)
        let resp = await $.request(options)
        // console.log(resp)
        if (resp.code == 'E00000000') {
            await this.cash(id)
        } else console.log(`${options.fn}: 失败,  ${JSON.stringify(resp)}`), this.ckFlog = false

    }


    async cash_info(id) {
        let a = `${id}Wh1y1hvGMOclMeug@4Y9Jbc0BUjmzXae`
        let sign = crypto.MD5(a).toString()

        let options = {
            fn: 'cash_info',
            method: 'post',
            url: `https://wnl28.jiemengjia.com/api/update_cash_info`,
            headers: {
                'User-Agent': 'HYCalendar/3.6.5 (iPhone; iOS 16.3; Scale/3.00)',
                'content-type': 'application/x-www-form-urlencoded'
            },
            form: {
                'device': 'android',
                'timestamp': '1675594689704',
                'ver': '1.8.6',
                'appname': 'calendar_android',
                'client': 'android',
                'idfa': 'android',
                'market': 'xiaomi',
                'openudid': '1c8493ec71d68197unknown',
                'dev_uuid': '1c8493ec71d68197',
                'user_id': id,
                'app_secret': sign,
                'cash_openid': $.randomString(28),
                'user_name': '杨梦磊',
                'cash_name': '东东机器人'
            }
        }
        // console.log(options)
        let resp = await $.request(options)
        // console.log(resp)
        if (resp.code == 'E00000000') {
            await this.cash(id)
        } else console.log(`${options.fn}: 失败,  ${JSON.stringify(resp)}`), this.ckFlog = false

    }

    async cash_info2(id) { // 随机
        let a = `${id}Wh1y1hvGMOclMeug@4Y9Jbc0BUjmzXae`
        let sign = crypto.MD5(a).toString()

        let options = {
            fn: 'cash_info',
            method: 'post',
            url: `https://wnl28.jiemengjia.com/api/update_cash_info`,
            headers: {
                'User-Agent': 'HYCalendar/3.6.5 (iPhone; iOS 16.3; Scale/3.00)',
                'content-type': 'application/x-www-form-urlencoded'
            },
            form: {
                'device': 'android',
                'timestamp': '1675594689704',
                'ver': '1.8.6',
                'appname': 'calendar_android',
                'client': 'android',
                'idfa': 'android',
                'market': 'xiaomi',
                'openudid': '1c8493ec71d68197unknown',
                'dev_uuid': '1c8493ec71d68197',
                'user_id': id,
                'app_secret': sign,
                'cash_openid': $.randomString(28),
                'user_name': '张三',
                'cash_name': '李四'
            }
        }
        // console.log(options)
        let resp = await $.request(options)
        // console.log(resp)
        if (resp.code == 'E00000000') {
        } else console.log(`${options.fn}: 失败,  ${JSON.stringify(resp)}`), this.ckFlog = false

    }


    async cash(id) {
        // let sign = await this.getSign(id)
        let a = `${id}1Wh1y1hvGMOclMeug@4Y9Jbc0BUjmzXae`
        let sign = crypto.MD5(a).toString()

        let options = {
            fn: 'test',
            method: 'post',
            url: `https://wnl28.jiemengjia.com/api/cash_out`,
            headers: {
                'User-Agent': 'HYCalendar/3.6.5 (iPhone; iOS 16.3; Scale/3.00)',
                'content-type': 'application/x-www-form-urlencoded'
            },
            form: {
                'app_secret': sign,
                'appname': 'wannianli_iphone',
                'client': 'iPhone',
                'device': 'iPhone',
                'idfa': '00000000-0000-0000-0000-000000000000',
                'market': 'appstore',
                'openudid': 'E07D0A35-FA64-44EC-B48B-0307F528DD98',
                'type': '1',
                'user_id': id,
                'ver': '3.6.5'
            }
        }
        // console.log(options)
        let resp = await $.request(options)
        // console.log(id,resp)
        if (resp.code == 'E00000001') { // 失败
            console.log(id, resp)
        } else if (resp.code == 'E00000000') { // 成功提现
            console.log(id, resp)
        } else console.log(`${options.fn}: 失败,  ${JSON.stringify(resp)}`)
        await this.cash_info2(id)
    }


}


!(async () => {
    console.log(await $.yiyan())
    if (ckData) {
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