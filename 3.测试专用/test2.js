/*
变量 yktapp 手机号#密码
*/
const $ = new Env('有看头')
const got = require('got')

const envPrefix = 'ykt'
const envSplitor = ['\n', '&', '@'] //支持多种分割，但要保证变量里不存在这个字符
const ckNames = [envPrefix + 'app'] //可以支持多变量

const MAX_THREAD = parseInt(process.env[envPrefix + 'Thread']) || 1 //默认最大并发数
const DEFAULT_TIMEOUT = 8000, DEFAULT_RETRY = 3

//这里配置了一些常量, 不需要后面每次重新写了
const default_UA = 'Mozilla/5.0 (Linux; Android 10; M2007J3SC Build/RKQ1.200826.002; wv) AppleWebKit/537.36 (KHTML, like Gecko) Version/4.0 Chrome/74.0.3729.186 Mobile Safari/537.36'
let jbtz = '1'  //金币通知  0关闭  1开启 
let jb = '50000'  //金币满足多少通知
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
        this.pwd = MD5_Encrypt(info[1])



        this.got = this.got.extend({
            headers: {
                'User-Agent': default_UA,
            },
        })
    }
    //做任务逻辑
    async userTask() {
        $.log(`\n============= 账号[${this.index}] =============`)
        await this.login()

        if (!this.valid) return
        await this.info()

    }
    async list() {
        this.valid = false
        try {
            let options = {
                fn: 'list',
                method: 'post',
                url: `https://trade.cloudlinks.cn/openapi/memberPoints/task/list`,
                json: {
                    "orderType": null,
                    "appVersion": "00.46.01.06",
                    "terminalOS": 3,
                    "pkgName": "com.yoosee",
                    "appName": "yoosee",
                    "language": "zh",
                    "timeZone": "28800",
                    "accessToken": this.atk,
                    "region": "CN",
                    "userId": this.uid
                },
            }
            let { result } = await this.request(options)
            if (result?.code == 0) {
                this.valid = true
                for (let task of (result?.data?.taskList || [])) {
                    switch (task.name) {
                        case '签到任务':
                            this.log(`签到总数：${task.totalSign}天   已连续签到：${task.continuedDays}天`)
                            let rnd_time = Math.floor(Math.random() * 1000) + 1000
                            this.log(`签到成功 随机等待${rnd_time / 1000}秒...`)
                            await $.wait(rnd_time) //随机等待
                            break

                        case '每日抽奖':
                            this.log(`开始进入紧张又刺激的每日抽奖环节`)
                            this.cjcs = task.surplusTimes
                            if (task.surplusTimes !== 0) {

                                for (var i = 0; i < this.cjcs; i++) {
                                    await this.spend()
                                    await $.wait(2000)
                                }
                            } else {
                                this.log(`抽奖次数剩余：${task.surplusTimes}次`)
                            }
                            break

                        // case '悬浮窗看视频赚金豆':
                        //     this.log(`悬浮窗看视频赚金币次数：${task.surplusTimes}次`)
                        //     this.spcs = task.surplusTimes
                        //     for (var i = 0; i < this.spcs; i++) {
                        //         if (task.surplusTimes !== 0) {

                        //             this.spcs1 = this.spcs - (i + 1)
                        //             await this.receive2()
                        //             await $.wait(47000)
                        //         }
                        //     }
                        //     break


                        // case '看广告领金豆':
                        //     var t = task.redPacketList.length

                        //     if (t == 0) {
                        //         this.log(`今日红包已拆完`)

                        //     } else {
                        //         for (var i = 0; i < t; i++) {
                        //             this.hbid = task.redPacketList[i]

                        //             this.log(`开始拆第${this.hbid}个红包`)
                        //             await this.receive()
                        //             await $.wait(47000)
                        //         }

                        //     }
                        //     break


                    }
                }
            } else {
                this.log(`查询账号任务失败`)
            }
        } catch (e) {
            console.log(e)
        }
    }

    async receive() {
        try {
            let options = {
                fn: 'receive',
                method: 'post',
                url: `https://trade.cloudlinks.cn/openapi/memberPoints/task/receive`,
                json: {
                    "type": 2,
                    "redPacketId": this.hbid,
                    "couponId": 602,
                    "appVersion": "00.46.01.06",
                    "terminalOS": 3,
                    "pkgName": "com.yoosee",
                    "appName": "yoosee",
                    "language": "zh",
                    "timeZone": "28800",
                    "accessToken": this.atk,
                    "region": "CN",
                    "userId": this.uid
                },
            }
            let { result } = await this.request(options)
            if (result?.code == 0) {
                this.log(`拆红包成功  获得：${result?.data.conins}金币  等待47秒...`)

            } else {
                this.log(`拆红包失败[${result?.code}]: ${result?.msg}`)
            }
        } catch (e) {
            console.log(e)
        }
    }
    async spend() {
        try {
            let options = {
                fn: 'spend',
                method: 'post',
                url: `https://trade.cloudlinks.cn/openapi/memberPoints/coin/spend`,
                json: {
                    "type": 5,
                    "promotionId": 41,
                    "appVersion": "00.46.01.06",
                    "terminalOS": 3,
                    "pkgName": "com.yoosee",
                    "appName": "yoosee",
                    "language": "zh",
                    "timeZone": "28800",
                    "accessToken": this.atk,
                    "region": "CN",
                    "userId": this.uid
                },
            }
            let { result } = await this.request(options)
            if (result?.code == 0) {

                if (result?.data.id == '-2') {
                    this.log(`抽奖成功 获得10积分`)

                } else if (result?.data.id == 513) {
                    this.log(`抽奖成功 获得：动态3天年卡兑换券`)

                } else if (result?.data.id == 512) {
                    this.log(`抽奖成功 获得：动态3天月卡兑换券`)

                } else if (result?.data.id == 509) {
                    this.log(`抽奖成功 获得：华为智选小豚当家摄像头`, { notify: true })

                } else if (result?.data.id == 510) {
                    this.log(`抽奖成功 获得：云服务年卡10元优惠券`)

                } else if (result?.data.id == 511) {
                    this.log(`抽奖成功 获得：云服务月卡2元优惠券`)

                } else if (result?.data.id == 508) {
                    this.log(`抽奖成功 获得：苹果13大奖`, { notify: true })

                } else {
                    console.log(result)
                }

            } else if (result?.code == 12003) {
                this.log(`抽奖成功 ${result?.msg}`)
            } else {
                console.log(result)
            }
        } catch (e) {
            console.log(e)
        }
    }
    async info() {
        try {
            let options = {
                fn: 'info',
                method: 'post',
                url: `https://openapi-iot.cloudlinks.cn/openapi/memberPoints/task/entrance`,
                json: {
                    "appVersion": "3014918",
                    "appName": "Yoosee",
                    "appToken": "60ded395c2bdad3a2610ac6150550f551bb911eb6e6f7106c40c3bb1457bb07d",
                    "channel": "china",
                    "language": "zh",
                    "accessToken": this.atk,
                    "userId": this.uid,
                    "platform": 1,
                    "apiVersion": 2,
                    "pkgName": "com.yoosee",
                    "appId": "adf33ae6eaa1439b48841fc330ffef11",
                    "terminalOS": 3,
                    "region": "CN"
                },
            }
            let { result } = await this.request(options)
            if (result?.code == 0) {

                let rnd_time = Math.floor(Math.random() * 1000) + 1000
                if (jbtz == 1) {
                    if (result?.data.coins >= jb) {
                        this.log(`金币余额：${result?.data.coins}`, { notify: true })
                    } else {
                        this.log(`金币余额：${result?.data.coins} 随机等待${rnd_time / 1000}秒...`)
                    }
                } else if (jbtz == 0) {
                    this.log(`金币余额：${result?.data.coins} 随机等待${rnd_time / 1000}秒...`)
                }



                await $.wait(rnd_time) //随机等待
                //await this.gflb();
                await this.list()
            } else {
                this.log(`金币余额查询失败[${result?.code}]: ${result?.msg}`)
            }
        } catch (e) {
            console.log(e)
        }
    }
    async receive2() {
        try {
            let options = {
                fn: 'receive2',
                method: 'post',
                url: `https://trade.cloudlinks.cn/openapi/memberPoints/task/receive`,
                json: {
                    "type": 10,
                    "appVersion": "00.46.01.06",
                    "terminalOS": 3,
                    "pkgName": "com.yoosee",
                    "appName": "yoosee",
                    "language": "zh",
                    "timeZone": "28800",
                    "accessToken": this.atk,
                    "region": "CN",
                    "userId": this.uid
                },
            }
            let { result } = await this.request(options)
            if (result?.code == 0) {
                this.log(`观看成功 获得：${result?.data.conins}金币 剩余${this.spcs1}次  等待47秒...`)

            } else {
                this.log(`观看失败[${result?.code}]: ${result?.msg}`)
            }
        } catch (e) {
            console.log(e)
        }
    }
    async receive3() {
        try {
            let options = {
                fn: 'receive3',
                method: 'post',
                url: `https://trade.cloudlinks.cn/openapi/memberPoints/task/receive`,
                json: {
                    "type": 14,
                    "redPacketId": null,
                    "couponId": 603,
                    "appVersion": "00.46.01.06",
                    "terminalOS": 3,
                    "pkgName": "com.yoosee",
                    "appName": "yoosee",
                    "language": "zh",
                    "timeZone": "28800",
                    "accessToken": this.atk,
                    "region": "CN",
                    "userId": this.uid
                },
            }
            let { result } = await this.request(options)
            if (result?.code == 0) {
                this.log(`看热搜成功 获得：${result?.data.conins}金币`)

            } else {
                this.log(`观看失败[${result?.code}]: ${result?.msg}`)
            }
        } catch (e) {
            console.log(e)
        }
    }
    async login() {
        this.valid = false
        try {
            let options = {
                fn: 'login',
                method: 'post',
                url: `https://openapi-iot.cloudlinks.cn/openapi/app/user/login/account`,

                json: {
                    "appVersion": "3014918",
                    "mobileArea": "+86",
                    "appName": "Yoosee",
                    "appToken": "60ded395c2bdad3a2610ac6150550f551bb911eb6e6f7106c40c3bb1457bb07d",
                    "mobile": this.phone,
                    "channel": "china",
                    "language": "zh",
                    "accessToken": "",
                    "loginMode": "mobile",
                    "platform": 1,
                    "accessId": 0,
                    "apiVersion": 2,
                    "pkgName": "com.yoosee",
                    "appId": "adf33ae6eaa1439b48841fc330ffef11",
                    "pwd": this.pwd,
                    "terminalOS": 3,
                    "region": "CN",
                    "uniqueId": "00000000-630a-99d3-ffff-ffffca01fdf4"
                },
            }

            let { result } = await this.request(options)
            if (result?.code == 0) {
                this.valid = true

                let info = result?.data
                if (info) {
                    this.name = info.nick || ''
                    this.atk = info.accessToken
                    this.uid = info.userId
                    this.aid = info.accessId

                    let rnd_time = Math.floor(Math.random() * 1000) + 4000
                    console.log(`账号：[${this.phone}]登陆成功 随机等待${rnd_time / 1000}秒...`)
                    await $.wait(rnd_time) //随机等待
                }
            } else {
                console.log(result)
                this.log(`登录失败[${result?.code}]: ${result?.msg}`)

            }
        } catch (e) {
            console.log(e)
        }
    }


}


!(async () => {
    $.log(`最大并发数: ${MAX_THREAD}`)
    $.log('')

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
/**
 * md5 加密
 */
function MD5_Encrypt(a) { function b(a, b) { return (a << b) | (a >>> (32 - b)) } function c(a, b) { var c, d, e, f, g; return ((e = 2147483648 & a), (f = 2147483648 & b), (c = 1073741824 & a), (d = 1073741824 & b), (g = (1073741823 & a) + (1073741823 & b)), c & d ? 2147483648 ^ g ^ e ^ f : c | d ? 1073741824 & g ? 3221225472 ^ g ^ e ^ f : 1073741824 ^ g ^ e ^ f : g ^ e ^ f) } function d(a, b, c) { return (a & b) | (~a & c) } function e(a, b, c) { return (a & c) | (b & ~c) } function f(a, b, c) { return a ^ b ^ c } function g(a, b, c) { return b ^ (a | ~c) } function h(a, e, f, g, h, i, j) { return (a = c(a, c(c(d(e, f, g), h), j))), c(b(a, i), e) } function i(a, d, f, g, h, i, j) { return (a = c(a, c(c(e(d, f, g), h), j))), c(b(a, i), d) } function j(a, d, e, g, h, i, j) { return (a = c(a, c(c(f(d, e, g), h), j))), c(b(a, i), d) } function k(a, d, e, f, h, i, j) { return (a = c(a, c(c(g(d, e, f), h), j))), c(b(a, i), d) } function l(a) { for (var b, c = a.length, d = c + 8, e = (d - (d % 64)) / 64, f = 16 * (e + 1), g = new Array(f - 1), h = 0, i = 0; c > i;) (b = (i - (i % 4)) / 4), (h = (i % 4) * 8), (g[b] = g[b] | (a.charCodeAt(i) << h)), i++; return ((b = (i - (i % 4)) / 4), (h = (i % 4) * 8), (g[b] = g[b] | (128 << h)), (g[f - 2] = c << 3), (g[f - 1] = c >>> 29), g) } function m(a) { var b, c, d = "", e = ""; for (c = 0; 3 >= c; c++) (b = (a >>> (8 * c)) & 255), (e = "0" + b.toString(16)), (d += e.substr(e.length - 2, 2)); return d } function n(a) { a = a.replace(/\r\n/g, "\n"); for (var b = "", c = 0; c < a.length; c++) { var d = a.charCodeAt(c); 128 > d ? (b += String.fromCharCode(d)) : d > 127 && 2048 > d ? ((b += String.fromCharCode((d >> 6) | 192)), (b += String.fromCharCode((63 & d) | 128))) : ((b += String.fromCharCode((d >> 12) | 224)), (b += String.fromCharCode(((d >> 6) & 63) | 128)), (b += String.fromCharCode((63 & d) | 128))) } return b } var o, p, q, r, s, t, u, v, w, x = [], y = 7, z = 12, A = 17, B = 22, C = 5, D = 9, E = 14, F = 20, G = 4, H = 11, I = 16, J = 23, K = 6, L = 10, M = 15, N = 21; for (a = n(a), x = l(a), t = 1732584193, u = 4023233417, v = 2562383102, w = 271733878, o = 0; o < x.length; o += 16) (p = t), (q = u), (r = v), (s = w), (t = h(t, u, v, w, x[o + 0], y, 3614090360)), (w = h(w, t, u, v, x[o + 1], z, 3905402710)), (v = h(v, w, t, u, x[o + 2], A, 606105819)), (u = h(u, v, w, t, x[o + 3], B, 3250441966)), (t = h(t, u, v, w, x[o + 4], y, 4118548399)), (w = h(w, t, u, v, x[o + 5], z, 1200080426)), (v = h(v, w, t, u, x[o + 6], A, 2821735955)), (u = h(u, v, w, t, x[o + 7], B, 4249261313)), (t = h(t, u, v, w, x[o + 8], y, 1770035416)), (w = h(w, t, u, v, x[o + 9], z, 2336552879)), (v = h(v, w, t, u, x[o + 10], A, 4294925233)), (u = h(u, v, w, t, x[o + 11], B, 2304563134)), (t = h(t, u, v, w, x[o + 12], y, 1804603682)), (w = h(w, t, u, v, x[o + 13], z, 4254626195)), (v = h(v, w, t, u, x[o + 14], A, 2792965006)), (u = h(u, v, w, t, x[o + 15], B, 1236535329)), (t = i(t, u, v, w, x[o + 1], C, 4129170786)), (w = i(w, t, u, v, x[o + 6], D, 3225465664)), (v = i(v, w, t, u, x[o + 11], E, 643717713)), (u = i(u, v, w, t, x[o + 0], F, 3921069994)), (t = i(t, u, v, w, x[o + 5], C, 3593408605)), (w = i(w, t, u, v, x[o + 10], D, 38016083)), (v = i(v, w, t, u, x[o + 15], E, 3634488961)), (u = i(u, v, w, t, x[o + 4], F, 3889429448)), (t = i(t, u, v, w, x[o + 9], C, 568446438)), (w = i(w, t, u, v, x[o + 14], D, 3275163606)), (v = i(v, w, t, u, x[o + 3], E, 4107603335)), (u = i(u, v, w, t, x[o + 8], F, 1163531501)), (t = i(t, u, v, w, x[o + 13], C, 2850285829)), (w = i(w, t, u, v, x[o + 2], D, 4243563512)), (v = i(v, w, t, u, x[o + 7], E, 1735328473)), (u = i(u, v, w, t, x[o + 12], F, 2368359562)), (t = j(t, u, v, w, x[o + 5], G, 4294588738)), (w = j(w, t, u, v, x[o + 8], H, 2272392833)), (v = j(v, w, t, u, x[o + 11], I, 1839030562)), (u = j(u, v, w, t, x[o + 14], J, 4259657740)), (t = j(t, u, v, w, x[o + 1], G, 2763975236)), (w = j(w, t, u, v, x[o + 4], H, 1272893353)), (v = j(v, w, t, u, x[o + 7], I, 4139469664)), (u = j(u, v, w, t, x[o + 10], J, 3200236656)), (t = j(t, u, v, w, x[o + 13], G, 681279174)), (w = j(w, t, u, v, x[o + 0], H, 3936430074)), (v = j(v, w, t, u, x[o + 3], I, 3572445317)), (u = j(u, v, w, t, x[o + 6], J, 76029189)), (t = j(t, u, v, w, x[o + 9], G, 3654602809)), (w = j(w, t, u, v, x[o + 12], H, 3873151461)), (v = j(v, w, t, u, x[o + 15], I, 530742520)), (u = j(u, v, w, t, x[o + 2], J, 3299628645)), (t = k(t, u, v, w, x[o + 0], K, 4096336452)), (w = k(w, t, u, v, x[o + 7], L, 1126891415)), (v = k(v, w, t, u, x[o + 14], M, 2878612391)), (u = k(u, v, w, t, x[o + 5], N, 4237533241)), (t = k(t, u, v, w, x[o + 12], K, 1700485571)), (w = k(w, t, u, v, x[o + 3], L, 2399980690)), (v = k(v, w, t, u, x[o + 10], M, 4293915773)), (u = k(u, v, w, t, x[o + 1], N, 2240044497)), (t = k(t, u, v, w, x[o + 8], K, 1873313359)), (w = k(w, t, u, v, x[o + 15], L, 4264355552)), (v = k(v, w, t, u, x[o + 6], M, 2734768916)), (u = k(u, v, w, t, x[o + 13], N, 1309151649)), (t = k(t, u, v, w, x[o + 4], K, 4149444226)), (w = k(w, t, u, v, x[o + 11], L, 3174756917)), (v = k(v, w, t, u, x[o + 2], M, 718787259)), (u = k(u, v, w, t, x[o + 9], N, 3951481745)), (t = c(t, p)), (u = c(u, q)), (v = c(v, r)), (w = c(w, s)); var O = m(t) + m(u) + m(v) + m(w); return O.toLowerCase() }