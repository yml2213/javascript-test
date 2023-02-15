/*
工匠职聘 app             cron 22 8,12 * * *  g'j'z'p.js

12.14       完成签到 浏览 任务
12.15       增加工分任务列表  兑换抽奖次数   
23/1/10     修复错误

-------------------  青龙-配置文件-复制区域  -------------------
# 工匠职聘
export gjzp=" authorization @ authorization "  

抓 api-recruitment.yzw.cn/v2/labor/app  里面的  authorization  不需要 Bearer

多账号用 换行 或 @ 分割  
tg频道: https://t.me/yml2213_tg  
*/
const $ = Env('工匠职聘')
const notify = require('./sendNotify')

const envSplitor = ['\n', '&', '@']     //支持多种分割，但要保证变量里不存在这个字符
const ckNames = ['gjzp']                //支持多变量
//====================================================================================================
let DEFAULT_RETRY = 2           // 默认重试次数
//====================================================================================================


async function userTasks() {

    $.log('用户信息', { sp: true, console: false })  // 带分割的打印
    list = []
    for (let user of $.userList) {
        list.push(user.userInfo(1))
    } await Promise.all(list)

    $.log('任务列表', { sp: true, console: false })
    list = []
    // console.log(user.ckFlog)
    for (let user of $.userList) {
        if (user.ckFlog) {
            list.push(user.signInfo())
            // list.push(user.commonTaskList())  // 工分任务列表
            // list.push(user.taskExchange())    // 兑换抽奖次数
            // list.push(user.lotteryNum())      // 抽奖次数
        }
    } await Promise.all(list)


}



class UserClass {
    constructor(ck) {
        this.idx = `账号[${++$.userIdx}]`
        this.ckFlog = true
        this.token = ck
        this.hd = {
            'authorization': `Bearer ${this.token}`,
            'content-type': 'application/json'
        }
    }



    async userInfo(type) {
        let options = {
            fn: 'userInfo',
            method: 'post',
            url: `https://api-recruitment.yzw.cn/v2/labor/app/user/getUserBaseInfo`,
            headers: this.hd,
            json: {}
        }
        // console.log(options)
        let resp = await $.request(options)
        // console.log(resp)
        if (resp.code == 20000 && resp.data != null) {
            if (type == 1) {
                $.log(`${this.idx}: 欢迎用户: ${resp?.data?.name}, 手机号:${$.phoneNum(resp?.data?.phone)}, 工分余额:${resp?.data?.totalScore}`, { notify: true })
                // this.nickname = resp.data.nickname
                this.totalScore = resp?.data?.totalScore
                this.userId = resp?.data?.userId
                this.ckFlog = true
            } else {
                this.totalScore = resp?.data?.totalScore
            }

        } else console.log(`${options.fn}: 失败, ${resp}`), this.ckFlog = false

    }

    // https://api-recruitment.yzw.cn/v2/labor/app/sign/mySignInfo
    async signInfo() {
        let options = {
            fn: 'signInfo',
            method: 'get',
            url: `https://api-recruitment.yzw.cn/v2/labor/app/sign/mySignInfo`,
            headers: this.hd,

        }
        // console.log(options)
        let resp = await $.request(options)
        // console.log(resp)
        if (resp.code == 20000) {
            $.log(`${this.idx}: ${resp.data.continueDays ? '已签到' : '未签到,去签到'}`)
            if (!resp.data.continueDays) await this.signIn()
        } else console.log(`${options.fn}: 失败, ${resp}`)

    }

    // 签到  https://api-recruitment.yzw.cn/v2/labor/app/sign/sign
    async signIn() {
        let options = {
            fn: 'signIn',
            method: 'get',
            url: `https://api-recruitment.yzw.cn/v2/labor/app/sign/sign`,
            headers: this.hd,
        }
        // console.log(options)
        let resp = await $.request(options)
        // console.log(resp)
        if (resp.code == 20000) {
            $.log(`${this.idx}: ${resp.data.msg}`)
        } else if (resp.code == 40005) {
            $.log(`${this.idx}: ${resp.message}`)
        } else console.log(`${options.fn}: 失败, ${resp}`)
    }


    // 工分任务列表  status 0 未完成  1 完成
    async commonTaskList() {
        let options = {
            fn: 'commonTaskList',
            method: 'get',
            url: `https://api-recruitment.yzw.cn/v2/labor/app/common/tasks`,
            headers: {
                'version': '2.14.0',
                'authorization': `Bearer ${this.token}`,
            },
        }
        // console.log(options)
        let resp = await $.request(options)
        // console.log(resp)
        if (resp.code == 20000) {
            let tasks = resp.data.dailyTasks
            // console.log(tasks)
            for (let index = 0; index < tasks.length; index++) {
                const element = tasks[index]
                // console.log(element.status)
                if (element.status == 0) {
                    switch (element.code) {
                        case 'SCORE_VIEW_INDEX':  //浏览首页 工分
                            await this.viewHome_c(element.title)
                            await $.wait(10)
                            await this.viewHome_c(element.title)
                            break

                        case 'SCORE_VIEW_POSITION':  // 浏览职位详情 工分
                            for (let i = 0; i < 5; i++) {
                                await this.viewJob_c(element.title, element.positionId)
                                await $.wait(5)
                            }
                            break

                        default:
                            break
                    }
                } else {
                    $.log(`${this.idx} ${element.title}: 已完成`)
                }

            }


        } else console.log(`${options.fn}: 失败, ${resp}`)
    }

    // 浏览首页  工分
    async viewHome_c(name) {
        let options = {
            fn: 'viewHome_c',
            method: 'post',
            url: `https://api-recruitment.yzw.cn/v2/labor/app/browseCollectRecord/add`,
            headers: this.hd,
            json: { type: 1, recordType: 9 }
        }
        // console.log(options)
        let resp = await $.request(options)
        // console.log(resp)
        if (resp.code == 20000) {
            $.log(`${this.idx}: ${name}: ok`)
        } else console.log(`${options.fn}: 失败, ${resp}`)
    }

    // 浏览职位详情 工分
    async viewJob_c(name, positionId) {
        let options = {
            fn: 'viewJob_c',
            method: 'post',
            url: `https://api-recruitment.yzw.cn/v2/labor/app/browseCollectRecord/add`,
            headers: this.hd,
            json: { type: 1, recordType: 10, otherId: positionId }
        }
        // console.log(options)
        let resp = await $.request(options)
        // console.log(resp)
        if (resp.code == 20000) {
            $.log(`${this.idx}: ${name}: ok`)
        } else console.log(`${options.fn}: 失败, ${resp}`)
    }



    // 兑换抽奖次数  每天限制 5 次
    async taskExchange() {
        await this.userInfo(0)
        if (this.totalScore >= 5) {
            let num = parseInt(this.totalScore / 5)
            if (num > 5) num = 5
            $.log(`${this.idx} : 您当前有${this.totalScore} 工分, 将全部兑换成抽奖 ${num} 次`)
            let options = {
                method: "post",
                url: `https://api-recruitment.yzw.cn/v2/labor/app/lottery/lotteryUserInfo/exchangeTimes`,
                headers: this.hd,
                json: { "times": num },
            }
            // console.log(options)
            let resp = await $.request(options)
            // console.log(resp)
            if (resp.code == 20000) {
                $.log(`${this.idx} : ok`)
            } else if (resp.code == 40005 || resp.code == 50000) {
                $.log(`${this.idx} : ${resp.message}`)
            } else $.log(`${this.idx}   失败 ❌ 了呢`), console.log(resp)
        } else {
            $.log(`${this.idx} : 您当前只有 ${this.totalScore} 工分, 跳过兑换`)
        }
    }


    // 抽奖次数
    async lotteryNum() {
        let options = {
            fn: 'lotteryNum',
            method: 'post',
            url: `https://api-recruitment.yzw.cn/v2/labor/app/lottery/lotteryUserDrawRecord/resultAndTask`,
            headers: this.hd,
            json: {}
        }
        // console.log(options)
        let resp = await $.request(options)
        // console.log(resp)
        if (resp.code == 20000) {
            this.lotNum = resp.data.userInfo.usableTimes
            $.log(`${this.idx}: 剩余${this.lotNum}次`)
            for (let index = 0; index < this.lotNum; index++) {
                await this.doLottery()
            }
        } else console.log(`${options.fn}: 失败, ${resp}`)
    }



    async doLottery() {
        let options = {
            fn: 'doLottery',
            method: 'get',
            url: `https://api-recruitment.yzw.cn/v2/labor/app/lottery/lotteryAward/draw?drawSource=android-zhipin`,
            headers: this.hd,
        }
        // console.log(options)
        let resp = await $.request(options)
        // console.(resp)
        if (resp.code == 20000) {
            let { type, awardId, strategyDesc } = resp.data
            $.log(`${this.idx}: 获得${strategyDesc}, 类型:${type}, id:${awardId}`, { notify: true })
            await $.wait(5)
        } else console.log(`${options.fn}: 失败, ${resp}`)

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
            this.log(`[${this.name}]开始运行`, { time: true })

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