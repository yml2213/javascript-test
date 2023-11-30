/*
爱临安阅读抽奖
需要自己进APP提现到微信，一天1个微信只能提一次 ，红包可转发给小号提现

export yyqyck=accountId#sessionId

*/
const $ = new Env('爱临安')
const got = require('got')
const envPrefix = 'TK_SIGN_ID'
const envSplitor = ['\n', '@'] //支持多种分割，但要保证变量里不存在这个字符
const ckNames = [envPrefix + ''] //可以支持多变量
const MAX_THREAD = parseInt(process.env[envPrefix + 'Thread']) || 1 //默认最大并发数
const DEFAULT_TIMEOUT = 8000, DEFAULT_RETRY = 3
const crypto = require("crypto-js")
const axios = require("axios")
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
        this.ck = info[0]
        this.acToken = "71aa30fbd77ba90f68b53e541cfccc79ZXhwPTE3MDg4NTM2MjQmaWF0PTE2OTg4NTM2MjQmbmJmPTE2NjY5NDM4NTUmanRpPVY5MjZiOCZkYXRhJTVCdF9pZCU1RD02NCZkYXRhJTVCdF9pZF9pbiU1RD02NCZkYXRhJTVCdXNlcl9pZCU1RD0xNDI3MTA3OCZkYXRhJTVCdXNlcl9uYW1lJTVEPSVFOCVBRiVCQiVFNSU4RiU4Ql9XRFdLV1cmZGF0YSU1Qm5hbWUlNUQ9JUU4JUFGJUJCJUU1JThGJThCX1dEV0tXVw=="

        this.got = this.got.extend({
            headers: {},
        })
    }
    //做任务逻辑
    async userTask() {
        $.log(`\n============= 账号[${this.index}] =============`)
        await this.optionp_list()  //阅读1
        //await this.getLotteryItem()   //阅读抽奖
        //await this.getAppUserInfo1()  //阅读2
        //await this.getLotteryItem()   //阅读抽奖
    }

    async optionp_list() {
        try {
            let options = {
                fn: 'optionp_list',
                method: 'get',
                url: 'https://yapi.y-h5.iyunxh.com/api/aoslearnfoot/_optionp_list?activity_id=187',
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
                    await this.optionp_detail(task.id)
                }
            } else {
                this.log(JSON.stringify(result))
            }
        } catch (e) {
            console.error(e)
        }
    }


    async optionp_detail(a) {
        try {
            let optionp_detailid = a
            let options = {
                fn: 'optionp_detail',
                method: 'get',
                url: `https://yapi.y-h5.iyunxh.com/api/aoslearnfoot/optionp_detail?id=${optionp_detailid}`,
                headers: {
                    'Access-Token': this.acToken,
                    'Host': 'yapi.y-h5.iyunxh.com',
                },
            }
            //this.log(JSON.stringify(options));
            let { result } = await this.request(options)
            //this.log(JSON.stringify(result));
            if (result.code == 0) {
                let task = result.data // 获取任务对象
                await this.task_list(task.id)
            } else {
                this.log(JSON.stringify(result))
            }
        } catch (e) {
            console.log(e)
        }
    }

    async task_list(a) {
        try {
            this.activity_id = a
            let options = {
                fn: 'task_list',
                method: 'get',
                url: `https://yapi.y-h5.iyunxh.com/api/aosbasemodule/_task_list?offset=0&count=20&module_id=41603&activity_id=${this.activity_id}`,
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

    async ticket2() {
        let options = {
            fn: '获取ticket',
            method: 'POST',
            url: `http://119.96.239.11:8888/api/getcode`,
            headers: {
                'Content-Type': 'application/json',
            },
            form: {
                'timeout': "180",
                'type': "netease",
                'appid': "7cd08015659044f1abe8893feeb5f0ae",
                'token': this.token,
                'developeraccount': "yzcong",
            },
        }
        console.log(options)

        for (let i = 0; i < 5; i++) {
            let resp = await $.request(options)
            console.log(resp)
            if (resp.status === 200) {
                let code1 = resp.data.code
                this.code = code1
                await this.sign()
                break
            } else {
                console.log(`获取code失败, 稍后再试!`, { notify: true })
            }
        }
    }

    async sign1() {

        let options = {
            fn: '巨量签到',
            method: 'POST',
            url: `https://yapi.y-h5.iyunxh.com/api/aosbasemodule/intelverifcode_check`,
            headers: {
                'Host': 'yapi.y-h5.iyunxh.com',
                'Access-T-Id': '64',
                'Access-Api-Dt': '1126281b2292d4cbba1675b5b4cd93643fba',
                'Accept': '*/*',
                'Access-Api-Signature': 'linan;VDwf9hhuErLRld5howufUXQbHRidCfJZ;1700985039024;08a42b2a077a40d43fd9c04e6f2d7e8e',
                'Access-Wxclient-Type': 'wx_app',
                'Access-T-Id-In': '64',
                'Accept-Language': 'zh-cn',
                'Origin': 'https://linan.y-h5.iyunxh.com',
                'Access-Token': '71aa30fbd77ba90f68b53e541cfccc79ZXhwPTE3MDg4NTM2MjQmaWF0PTE2OTg4NTM2MjQmbmJmPTE2NjY5NDM4NTUmanRpPVY5MjZiOCZkYXRhJTVCdF9pZCU1RD02NCZkYXRhJTVCdF9pZF9pbiU1RD02NCZkYXRhJTVCdXNlcl9pZCU1RD0xNDI3MTA3OCZkYXRhJTVCdXNlcl9uYW1lJTVEPSVFOCVBRiVCQiVFNSU4RiU4Ql9XRFdLV1cmZGF0YSU1Qm5hbWUlNUQ9JUU4JUFGJUJCJUU1JThGJThCX1dEV0tXVw==',
                'User-Agent': 'Mozilla/5.0 (iPhone; CPU iPhone OS 14_2_1 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Mobile/15E148;;xsb;xsb_linan;1.3.3;Appstore;native_app',
                'Referer': 'https://linan.y-h5.iyunxh.com/module-study/pass-detail/pass-detail?pass_id=3745&activity_id=187',
                'Access-Api-Unique-Token': '1',
                'Access-User-Id': '14271078',
                'Content-Type': 'application/json',
                'Connection': 'keep-alive'
            },
            body: JSON.stringify({
                "validate": this.code,
                "verif_type": 3,
                "afs_uuid": ""
            })
        }
        console.log(options)
        let resp = await $.request(options)
        console.log(resp)
        console.log(resp['msg'])
    }

    async task_create(a) {
        try {
            this.activity_id = a
            let options = {
                fn: 'task_create',
                method: 'post',
                url: 'https://yapi.y-h5.iyunxh.com/api/aosbasemodule/task_create',
                headers: {
                    'Access-Token': this.acToken,
                    'Host': 'yapi.y-h5.iyunxh.com',
                },
                json: {
                    "task_id": a,
                }
            }
            //this.log(JSON.stringify(options));
            let { result } = await this.request(options)
            this.log(JSON.stringify(result))
            if (result.code == 0) {
                let task = result.data
                await this.task_done(task.task_record_id)
            } else {
                this.log(JSON.stringify(result))

            }
        } catch (e) {
            console.log(e)
        }
    }

    getSignature() {
        function md5(data) {
            return crypto.MD5(data).toString()
        }
        var e = '0e3b0af6a9e996fb42b0d96cabdeae08'
        var n = []
        var o = []

        for (var t = 0; t < e.length; t++) {
            if (t % 2 === 0) {
                o.push(e[t])
            } else {
                n.push(e[t])
            }
        }

        var o_str = o.join('')
        var n_str = n.join('')
        var final_str = o_str + n_str

        var m = md5(final_str)
        var t = 'linan'
        var r = randomString(32) // 这里需要保证random_string函数已经定义或者调用可用
        var s = Math.round(new Date().getTime())
        var d = md5(t + r + s.toString() + m)

        var signature = t + ';' + r + ';' + s.toString() + ';' + d
        return signature
    }

    async task_done(a) {
        let signature = this.getSignature()
        try {
            let options = {
                fn: 'task_done',
                method: 'post',
                url: 'https://yapi.y-h5.iyunxh.com/api/aosbasemodule/task_done',
                headers: {
                    'Host': 'yapi.y-h5.iyunxh.com',
                    'Access-Api-Dt': '"1020e9566f3f02b4174355603576d8d27588',
                    'Access-Api-Signature': signature,
                    'Access-Wxclient-Type': 'wx_app',
                    'Access-Token': this.acToken,
                    'User-Agent': 'Mozilla/5.0 (iPhone; CPU iPhone OS 14_2_1 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Mobile/15E148;;xsb;xsb_linan;1.3.3;Appstore;native_app',
                },
                json: {
                    "task_record_id": a,
                    "collect_info": "",
                    "afs_tokenid": "2f047c437732ca924c855252fc886586",
                    "device_token": "16978058163492074718"
                }

            }
            this.log(JSON.stringify(options))
            await $.wait(3000)
            let { result } = await this.request(options)

            if (result.code == 0) {
                this.log(`任务 [${a}] 完成：${result.msg}`)
            } else {
                this.log(JSON.stringify(result))

            }
        } catch (e) {
            console.log(e)
        }
    }

    async getLotteryItem() {     //抽奖
        try {
            let options = {
                fn: 'getLotteryItem',
                method: 'post',
                url: 'https://s.yqbtv.cn/index.php/Api/App/getLotteryItem',
                headers: {
                    'Host': 's.yqbtv.cn',
                }
            }
            //this.log(JSON.stringify(options));
            let { result } = await this.request(options)
            if (result.code == 1) {
                await this.getLotteryRes(result.data.token)
            } else {
                this.log(JSON.stringify(result))

            }
        } catch (e) {
            console.log(e)
        }
    }
    async getLotteryRes(a) {

        try {
            let options = {
                fn: 'getLotteryRes',
                method: 'post',
                url: 'https://s.yqbtv.cn/index.php/Api/App/getLotteryRes',
                headers: {
                    'Host': 's.yqbtv.cn',
                },
                form: {
                    'lotteryItem[0][fonts][0][text]': '8.8元红包',
                    'lotteryItem[0][fonts][0][fontSize]': '1.3rem',
                    'lotteryItem[0][fonts][0][top]': '10%',
                    token: a,
                    aid: '3',
                    'userInfo[accountId]': this.ck,
                    'userInfo[isLogin]': '1',
                    'userInfo[clientCode]': 'xsb_yueqing',
                    'userInfo[grade]': '6',
                    'userInfo[refCode]': 'BKFYR9'
                }

            }
            //this.log(JSON.stringify(options));
            let { result } = await this.request(options)
            if (result.code === 1) {
                const { name, wechattoken, points } = result.data
                const logMsg = `${result.msg}: ${name}\n${wechattoken ? wechattoken + '#' + points : ''}`
                this.log(logMsg, { notify: true })
            } else if (result.msg !== '很遗憾您没有抽到红包') {
                const logMsg = result.msg
                this.log(logMsg, { notify: false })
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

function randomString(length) {
    const lettersDigits =
        "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789"
    let result = ""
    for (let i = 0; i < length; i++) {
        result += lettersDigits.charAt(
            Math.floor(Math.random() * lettersDigits.length)
        )
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