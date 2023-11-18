/*
我的姜堰

export wdjy=手机号#密码

*/
const $ = new Env('我的姜堰')
const got = require('got')
const envPrefix = 'wdjy'
require('dotenv').config()
const envSplitor = ['\n', '@'] //支持多种分割，但要保证变量里不存在这个字符
const ckNames = [envPrefix + ''] //可以支持多变量
const MAX_THREAD = parseInt(process.env[envPrefix + 'Thread']) || 1 //默认最大并发数
const DEFAULT_TIMEOUT = 8000, DEFAULT_RETRY = 3
const crypto = require("crypto-js")
class BasicClass {
    constructor() {
        this.index = $.userIdx++
        this.name = ''
        this.valid = true

        //设置got的默认超时等参数
        this.got = got.extend({
            retry: { limit: 0 },
            timeout: DEFAULT_TIMEOUT,
            followRedirect: false,
        })
    }
    //给每个账户打印前面加上自己的名字
    log(msg, opt = {}) {
        var m = '', n = $.userCount.toString().length;;
        if (this.index) m += `账号[${$.padStr(this.index, n)}]`
        if (this.name) m += `[${this.name}]`
        $.log(m + msg, opt)
    }
    //使用自己的got实例发包,可以实现设置每个账号自己的默认UA等
    async request(opt) {
        var resp = null, count = 0
        var fn = opt.fn || opt.url
        opt.method = opt?.method?.toUpperCase() || 'GET'
        while (count++ < DEFAULT_RETRY) {
            try {
                var err = null
                const errcodes = ['ECONNRESET', 'EADDRINUSE', 'ENOTFOUND', 'EAI_AGAIN']
                await this.got(opt).then(t => {
                    resp = t
                }, e => {
                    err = e
                    resp = e.response
                })
                if (err) {
                    if (err.name == 'TimeoutError') {
                        this.log(`[${fn}]请求超时(${err.code})，重试第${count}次`)
                    } else if (errcodes.includes(err.code)) {
                        this.log(`[${fn}]请求错误(${err.code})，重试第${count}次`)
                    } else {
                        let statusCode = resp?.statusCode || -1
                        this.log(`[${fn}]请求错误(${err.message}), 返回[${statusCode}]`)
                        break
                    }
                } else {
                    break
                }
            } catch (e) {
                this.log(`[${fn}]请求错误(${e.message})，重试第${count}次`)
            };
        }
        let { statusCode = -1, headers = null, body = null } = resp
        if (body) try { body = JSON.parse(body) } catch { };
        return { statusCode, headers, result: body }
    }
}
let http = new BasicClass()

class UserClass extends BasicClass {
    constructor(ck) {
        super()
        let info = ck.split('#')
        this.phone = info[0]
        this.password = info[1]


        this.got = this.got.extend({
            headers: {},
        })
    }
    //做任务逻辑
    async userTask() {
        $.log(`\n============= 账号[${this.index}] =============`)
        await this.readnew()  //阅读1
        //await this.Login()  //阅读1
        //await this.getLotteryItem()   //阅读抽奖
        //await this.getAppUserInfo1()  //阅读2
        //await this.getLotteryItem()   //阅读抽奖
    }

    async readnew() {
        let url1 = 'https://statistic.cm.jstv.com/api/ArticleStatistic/readnew'
        let url2 = 'https://statistic.cm.jstv.com/api/ArticleStatistic/readnew'

        // 给定的两个请求体
        const body1 = {
            articleLength: 4162,
            articleType: 10,
            globalId: '25639221',
            liveRoomId: '',
            readDuration: 1,
            readLength: 0,
            userBehavior: 2,
            videoDuration: 0
        }

        const body2 = {
            articleLength: 7270,
            articleType: 10,
            globalId: '25639167',
            liveRoomId: '',
            readDuration: 1,
            readLength: 0,
            userBehavior: 2,
            videoDuration: 0
        }



        const result1 = generateSign(url1, body1)
        const result2 = generateSign(url2, body2)
        console.log(result1)
        console.log(result2)
        console.log(result1.TT) // 输出 TT 的值
        console.log(result1.Sign) // 输出 Sign 的值
        try {
            let options = {
                fn: 'readnew',
                method: 'post',
                url: 'https://statistic.cm.jstv.com/api/ArticleStatistic/readnew',
                Params: {
                    'AppID': 'c100c389d381437d85ce1cc6b6634e5a',
                    'Sign': result1.Sign,
                    'tt': result1.TT,
                },
                headers: {
                    'Host': 'statistic.cm.jstv.com',
                    'authorization': 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJodHRwOi8vc2NoZW1hcy54bWxzb2FwLm9yZy93cy8yMDA1LzA1L2lkZW50aXR5L2NsYWltcy9uYW1lIjoiMzFmYzcyNWQ3N2U4NDZhM2E3Yjg1ZjU0ODIwMDkzNDAiLCJodHRwOi8vc2NoZW1hcy5taWNyb3NvZnQuY29tL3dzLzIwMDgvMDYvaWRlbnRpdHkvY2xhaW1zL3JvbGUiOiJwYXNzcG9ydCIsImlzcyI6IkFwaUF1dGgiLCJuYmYiOjE2OTc4NzE1NTksImV4cCI6MTY5ODQ3NjY1OSwiYXBwaWQiOiJjMTAwYzM4OWQzODE0MzdkODVjZTFjYzZiNjYzNGU1YSIsInVpZCI6IjMxZmM3MjVkNzdlODQ2YTNhN2I4NWY1NDgyMDA5MzQwIiwicGxhdGZvcm0iOiIxIn0.y0nTT8lAyQMj_rcYIolY0p7cLF7GnDV6Dt2DRajr65k',
                    'user-agent': 'Mozilla/5.0 (Linux; Android 12; XT2175-2 Build/S1RXC32.50-37-2; wv) AppleWebKit/537.36 (KHTML, like Gecko) Version/4.0 Chrome/99.0.4844.88 Mobile Safari/537.36 jsbcApp+convergedmedia+1.5',
                },
                json: {
                    "globalId": 25639221,
                    "articleType": 10,
                    "readDuration": 1,
                    "liveRoomId": '',
                    "userBehavior": 2,
                    "articleLength": 4162,
                    "readLength": 0,
                    "videoDuration": 0,
                }
            }
            this.log(JSON.stringify(options))
            let { result } = await this.request(options)
            this.log(JSON.stringify(result))
            if (result.code == 200) {
                this.log(`阅读成功`)
            } else {
                this.log(JSON.stringify(result))
            }
        } catch (e) {
            console.error(e)
        }
    }

    async Login() {
        try {
            let options = {
                fn: 'Login',
                method: 'post',
                url: 'https://user.cm.jstv.com/Auth/Login?AppID=c100c389d381437d85ce1cc6b6634e5a&TT=59294870&Sign=c807556eb26363cda5840bfc3c7b7cbd',
                headers: {
                    'Host': 'user.cm.jstv.com',
                    'accept': '*/*',
                    'authorization': 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJodHRwOi8vc2NoZW1hcy54bWxzb2FwLm9yZy93cy8yMDA1LzA1L2lkZW50aXR5L2NsYWltcy9uYW1lIjoiQzNFREVBMURGRTEwNEI1RUFERkU3MTFGMkIyRjMzNjgiLCJodHRwOi8vc2NoZW1hcy5taWNyb3NvZnQuY29tL3dzLzIwMDgvMDYvaWRlbnRpdHkvY2xhaW1zL3JvbGUiOiJndWVzdCIsImlzcyI6IkFwaUF1dGgiLCJuYmYiOjE2OTc4NzE0NDUsImV4cCI6MTY5ODQ3NjU0NSwiYXBwaWQiOiJjMTAwYzM4OWQzODE0MzdkODVjZTFjYzZiNjYzNGU1YSIsInVpZCI6IkMzRURFQTFERkUxMDRCNUVBREZFNzExRjJCMkYzMzY4IiwicGxhdGZvcm0iOiI1In0.2OpIWyOMVShTsKYOqcSaBdouB_m6gTgd6S2gUE5eEgA',
                    'user-agent': 'wo de jiang yan/1.4 (iPhone; iOS 14.2.1; Scale/3.00)',
                    'accept-language': 'zh-Hans-CN;q=1, zh-Hant-CN;q=0.9, en-CN;q=0.8',
                    'content-type': 'application/json',
                    'Connection': 'keep-alive'
                },
                json: {
                    "platform": 1,
                    "credentials": this.phone,
                    "password": md5_encode(this.password)
                }
            }
            //this.log(JSON.stringify(options));
            let { result } = await this.request(options)
            //this.log(JSON.stringify(result));
            if (result.code == 200) {
                let task = result.data
                this.accessToken = task.accessToken
                await this.jifen()
            } else {
                this.log(JSON.stringify(result))
            }
        } catch (e) {
            console.error(e)
        }
    }


    async jifen() {
        try {
            let options = {
                fn: 'jifen',
                method: 'get',
                url: 'https://user.cm.jstv.com/passportuser/userinfo/jifen',
                headers: {
                    'Host': 'user.cm.jstv.com',
                    'accept': '*/*',
                    'origin': 'https://jiangyan.cm.jstv.com',
                    'referer': 'https://jiangyan.cm.jstv.com/hd/score/index.html',
                    'accept-language': 'zh-cn',
                    'user-agent': 'Mozilla/5.0 (iPhone; CPU iPhone OS 14_2_1 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Mobile/15E148 jsbcApp+convergedmedia+1.4',
                    'authorization': `Bearer ${this.accessToken}`,
                    'Connection': 'keep-alive'
                },
            }
            //this.log(JSON.stringify(options));
            let { result } = await this.request(options)
            //this.log(JSON.stringify(result));
            if (result.code === 200) {
                this.jifen = result.data.jiFen
                this.todayJifen = result.data.todayJiFen
                console.log(`帐号:${this.phone} 总积分：${this.jifen}，今日积分：${this.todayJifen}`)

                for (let task of result.data.list) {
                    // 根据任务类型进行赋值
                    switch (task.dailyQuestType) {
                        case 1: // 每日登陆任务
                            this.mrrw = {
                                limit: task.limit,
                                count: task.count,
                                mcjiFen: task.jiFen
                            }
                            break
                        case 2: // 阅读文章任务
                            this.ydwz = {
                                limit: task.limit,
                                count: task.count,
                                mcjiFen: task.jiFen
                            }
                            break
                        case 3: // 看视频任务
                            this.ksp = {
                                limit: task.limit,
                                count: task.count,
                                mcjiFen: task.jiFen
                            }
                            break
                        case 11: // 分享任务
                            this.fxrw = {
                                limit: task.limit,
                                count: task.count,
                                mcjiFen: task.jiFen
                            }
                            break
                        default:
                        //console.log(`未知的任务类型：${task.dailyQuestType}`);
                    }
                }

                // 每日登陆任务日志
                if (this.mrrw.count === 1) {
                    console.log('今日已签到')
                } else {
                    console.log('今日未签到')
                }

                // 阅读文章任务日志
                console.log(`新闻资讯阅读 -- ${this.ydwz.count}/${this.ydwz.limit}，${this.ydwz.count === this.ydwz.limit ? '已完成' : '未完成'}`)

                // 看视频任务日志
                console.log(`看视频 -- ${this.ksp.count}/${this.ksp.limit}，${this.ksp.count === this.ksp.limit ? '已完成' : '未完成'}`)

                // 分享任务日志
                console.log(`分享资讯给好友 -- ${this.fxrw.count}/${this.fxrw.limit}，${this.fxrw.count === this.fxrw.limit ? '已完成' : '未完成'}`)
            } else {
                console.log(JSON.stringify(result))
            }
        } catch (e) {
            console.log(e)
        }
    }

    async task_list(a) {
        try {
            let activity_id = a
            let options = {
                fn: 'task_list',
                method: 'get',
                url: `https://yapi.y-h5.iyunxh.com/api/aosbasemodule/_task_list?offset=0&count=20&module_id=41603&activity_id=${activity_id}`,
                headers: {
                    'Access-Token': this.acToken,
                    'Host': 'yapi.y-h5.iyunxh.com',
                },
            }
            //this.log(JSON.stringify(options));
            let { result } = await this.request(options)
            //this.log(JSON.stringify(result));
            if (result.code == 0) {
                for (let task of result.data) {
                    if (task.user_done == "0") {
                        await this.task_create(task.id)
                    }
                }
            } else {
                this.log(JSON.stringify(result))

            }
        } catch (e) {
            console.log(e)
        }
    }

}


!(async () => {

    //封装的读取变量方法, 可以自己另外写也可以直接用, 读取到的账号会存入 $.userList 中
    $.read_env(UserClass)

    //正常的做任务流程
    for (let user of $.userList) {
        await user.userTask()
    }

    //封装的并发方法, 想试的把下面的//删掉
    //await $.threadTask('userTask',MAX_THREAD);

})()
    .catch((e) => $.log(e))
    .finally(() => $.exitNow())

const md5 = require('md5') // 使用 md5 库计算哈希值

// 原始密钥，需要根据实际情况修改
const appSecret = '92e05790077d4bf1b3453296db38d308'

// 对 t 进行特定的位运算和转换
function transformT(t) {
    t = parseInt(t)
    const tBytes = [
        t & 255,
        (t & 65280) >> 8,
        (t & 16711680) >> 16,
        (t & 4278190080) >> 24
    ]
    for (let i = 0; i < tBytes.length; i++) {
        tBytes[i] = ((tBytes[i] & 240) ^ 240) | (((tBytes[i] & 15) + 1) & 15)
    }
    return tBytes[3] | (tBytes[2] << 8) | (tBytes[1] << 16) | (tBytes[0] << 24)
}

// 生成签名
function generateSign(url, obj) {

    // 对 t 进行特定的位运算和转换
    function transformT(t) {
        t = parseInt(t)
        const tBytes = [
            t & 255,
            (t & 65280) >> 8,
            (t & 16711680) >> 16,
            (t & 4278190080) >> 24
        ]
        for (let i = 0; i < tBytes.length; i++) {
            tBytes[i] = ((tBytes[i] & 240) ^ 240) | (((tBytes[i] & 15) + 1) & 15)
        }
        return tBytes[3] | (tBytes[2] << 8) | (tBytes[1] << 16) | (tBytes[0] << 24)
    }

    url = (url.indexOf('?') === -1) ? (url + '?AppID=' + appSecret) : (url + '&AppID=' + appSecret)
    const check = url.substr(url.indexOf('//') + 2)
    const paths = check.split('/')
    const path = paths.slice(1).join('/') // 获取除主机名外的路径部分
    const keys = Object.keys(obj).sort() // 按键名排序
    const params = keys.map(key => key + obj[key]).join('')
    const t = Math.floor(Date.now() / 1000)
    const tt = transformT(t)
    const strToHash = appSecret + path + params + t
    const sign = md5(strToHash)

    return { TT: tt, Sign: sign }
}

// 给定的两个请求体
const body1 = {
    articleLength: 4162,
    articleType: 10,
    globalId: '25639221',
    liveRoomId: '',
    readDuration: 1,
    readLength: 0,
    userBehavior: 2,
    videoDuration: 0
}

const body2 = {
    articleLength: 7270,
    articleType: 10,
    globalId: '25639167',
    liveRoomId: '',
    readDuration: 1,
    readLength: 0,
    userBehavior: 2,
    videoDuration: 0
}

// 给定的两个 URL
let url1 = 'https://statistic.cm.jstv.com/api/ArticleStatistic/readnew'
let url2 = 'https://statistic.cm.jstv.com/api/ArticleStatistic/readnew'

function md5_encode(encode_data) {
    var md5 = crypto.MD5(encode_data) // CryptoJS是常见于JavaScript的开源加密算法库
    return md5.toString().toUpperCase()
}

function random_string(length) {
    var letters_digits = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789'

    var result = ''
    for (var i = 0; i < length; i++) {
        result += letters_digits.charAt(Math.floor(Math.random() * letters_digits.length))
    }

    return result
}
function Env(name) {
    return new class {
        constructor(name) {
            this.name = name
            this.startTime = Date.now()
            this.log(`[${this.name}]开始运行\n`, { time: true })
            this.notifyStr = []
            this.notifyFlag = true
            this.userIdx = 0
            this.userList = []
            this.userCount = 0
        }
        log(msg, options = {}) {
            let opt = { console: true }
            Object.assign(opt, options)
            if (opt.time) {
                let fmt = opt.fmt || 'hh:mm:ss'
                msg = `[${this.time(fmt)}]` + msg
            }
            if (opt.notify) this.notifyStr.push(msg)
            if (opt.console) console.log(msg)
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
        async threads(taskName, conf, opt = {}) {
            while (conf.idx < $.userList.length) {
                let user = $.userList[conf.idx++]
                if (!user.valid) continue
                await user[taskName](opt)
            }
        }
        async threadTask(taskName, thread) {
            let taskAll = []
            let taskConf = { idx: 0 }
            while (thread--) taskAll.push(this.threads(taskName, taskConf))
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
            for (let s in e) new RegExp("(" + s + ")").test(t) && (t = t.replace(RegExp.$1, 1 == RegExp.$1.length ? e[s] : ("00" + e[s]).substr(("" + e[s]).length)))
            return t
        }
        async showmsg() {
            if (!this.notifyFlag) return
            if (!this.notifyStr.length) return
            var notify = require('./sendNotify')
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
        getRandomInt(min, max) {
            // 使用 Math.floor() 和 Math.random() 函数生成指定区间内的随机整数
            return Math.floor(Math.random() * (max - min + 1) + min)
        }
        wait(t) {
            return new Promise(e => setTimeout(e, t))
        }
        async exitNow() {
            await this.showmsg()
            let e = Date.now()
            let s = (e - this.startTime) / 1000
            this.log('')
            this.log(`[${this.name}]运行结束，共运行了${s}秒`, { time: true })
            process.exit(0)
        }
    }
        (name)
}
function ts(type = false, _data = "") {
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

function getday() {
    let myDate = new Date()
    y = myDate.getFullYear()
    m = myDate.getMonth() + 1
    d = myDate.getDate()
    if (m.toString().length == 1) {
        m = `0${m}`
    }
    if (d.toString().length == 1) {
        d = `0${d}`
    }
    return y + '' + m + '' + d
} 