/*
爱临安阅读抽奖


export ala_data=" device_token  # Access-Token"
export ydhktoken="api_tone"

api_tone 是滑块验证的   token请前往 http://175.24.200.174/register 注册
 


*/


require("dotenv").config()
const $ = new Env('爱临安')
const got = require('got')
const envPrefix = 'ala_data'
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
        this.device_token = info[0]
        this.acToken = info[1]
        this.api_tone = process.env.ydhktoken

        this.got = this.got.extend({
            headers: {},
        })

    }
    //做任务逻辑
    async userTask() {
        $.log(`\n============= 账号[${this.index}] =============`)

        await this.get_dt()  // 获取 dt
        await this.optionp_list()  //阅读 

        await this.check_num()  // 查询抽奖次数

    }

    async get_dt() {
        try {
            let options = {
                fn: 'get_dt',
                method: 'get',
                url: 'https://yapi.y-h5.iyunxh.com/api/aosbase/_auth_dt',
                headers: {
                    Host: 'yapi.y-h5.iyunxh.com',
                    'sec-ch-ua': '"Android WebView";v="119", "Chromium";v="119", "Not?A_Brand";v="24"',
                    'sec-ch-ua-platform': '"Android"',
                    'Access-Api-Dt': this.device_token,
                    'sec-ch-ua-mobile': '?1',
                    'Access-T-Id-In': '64',
                    'User-Agent': 'Mozilla/5.0 (Linux; Android 12; M2102J2SC Build/SKQ1.211006.001; wv) AppleWebKit/537.36 (KHTML, like Gecko) Version/4.0 Chrome/119.0.6045.67 Mobile Safari/537.36;xsb_linan;xsb_linan;1.3.4;native_app',
                    'Access-Api-Unique-Token': '1',
                    'Access-T-Id': '64',
                    Accept: '*/*',
                    Origin: 'https://linan.y-h5.iyunxh.com',
                    'X-Requested-With': 'com.meilianji.ailinan',
                    'Sec-Fetch-Site': 'same-site',
                    'Sec-Fetch-Mode': 'cors',
                    'Sec-Fetch-Dest': 'empty',
                    Referer: 'https://linan.y-h5.iyunxh.com/',
                    'Accept-Language': 'zh-CN,zh;q=0.9,en-US;q=0.8,en;q=0.7'
                },
            }
            //console.log(options)
            //this.log(JSON.stringify(options));
            let { result } = await this.request(options)
            //console.log(result)
            //this.log(JSON.stringify(result));
            if (result.code == 0) {
                let dt = result.data.substring(32, 68)
                // console.log(dt)
                this.hd = {
                    'Host': 'yapi.y-h5.iyunxh.com',
                    'Access-Api-Dt': dt,
                    'Access-Api-Signature': this.getSignature(),
                    'Access-Wxclient-Type': 'wx_app',
                    'Access-Token': this.acToken,
                    'User-Agent': 'Mozilla/5.0 (iPhone; CPU iPhone OS 14_2_1 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Mobile/15E148;;xsb;xsb_linan;1.3.3;Appstore;native_app',
                }
                this.dt = dt
                return dt
            } else {
                this.log('获取 dt 失败')
            }
        } catch (e) {
            console.error(e)
        }
    }

    async optionp_list() {
        try {
            let options = {
                fn: 'optionp_list',
                method: 'get',
                url: 'https://yapi.y-h5.iyunxh.com/api/aoslearnfoot/_optionp_list?activity_id=187',
                headers: this.hd,
            }
            // console.log(options)
            //this.log(JSON.stringify(options));
            let { result } = await this.request(options)
            // console.log(result)
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

    async optionp_detail(id) {
        try {
            let options = {
                fn: 'optionp_detail',
                method: 'get',
                url: `https://yapi.y-h5.iyunxh.com/api/aoslearnfoot/optionp_detail?id=${id}`,
                headers: this.hd,
            }
            //this.log(JSON.stringify(options));
            let { result } = await this.request(options)
            // console.log(result)
            //this.log(JSON.stringify(result));
            if (result.code == 0) {
                let task = result.data // 获取任务对象
                console.log(`找到活动  ${task.id}--${task.title}, 开始!`)
                await this.task_list(task.id)
            } else {
                this.log(JSON.stringify(result))
            }
        } catch (e) {
            console.log(e)
        }
    }

    async task_list(id) {
        try {
            let options = {
                fn: 'task_list',
                method: 'get',
                url: `https://yapi.y-h5.iyunxh.com/api/aosbasemodule/_task_list?offset=0&count=20&module_id=41603&activity_id=${id}`,
                headers: this.hd
            }
            //this.log(JSON.stringify(options));
            let { result } = await this.request(options)
            // console.log(result)
            //this.log(JSON.stringify(result));
            if (result.code == 0) {

                this.afs_tokenid = await this.get_afs_tokenid()
                for (let task of result.data) {
                    if (task.user_done == 1) {
                        console.log(`任务 [${task.id}--${task.title}] 已完成! `)
                    } else if (task.user_done == 0) {
                        console.log(`任务 [${task.id}--${task.title}] 未完成, 开始`)
                        let news_id = task.rule.split('"news_id\":\"')[1].split('\"}')[0]
                        // await this.task_create(task.id)
                        // await this.task_done(task.task_record_id)
                        await this.read(task.task_record_id, news_id)
                    }
                }

            } else {
                this.log(JSON.stringify(result))

            }
        } catch (e) {
            console.log(e)
        }
    }


    async read(task_record_id, news_id) {
        try {
            let options = {
                fn: 'task_create',
                method: 'post',
                url: `https://vapp.tmuyun.com/api/article/detail?id=${news_id}`,
                headers: this.hd,
                json: {
                    "task_id": id,
                }
            }
            //this.log(JSON.stringify(options));
            let { result } = await this.request(options)
            console.log(result)
            // this.log(JSON.stringify(result))
            if (result.code == 0) {
                await this.task_done(result.data.task_record_id)
            } else {
                this.log(JSON.stringify(result))

            }
        } catch (e) {
            console.log(e)
        }
    }

    async task_create(id) {
        try {
            let options = {
                fn: 'task_create',
                method: 'post',
                url: 'https://yapi.y-h5.iyunxh.com/api/aosbasemodule/task_create',
                headers: this.hd,
                json: {
                    "task_id": id,
                }
            }
            //this.log(JSON.stringify(options));
            let { result } = await this.request(options)
            console.log(result)
            // this.log(JSON.stringify(result))
            if (result.code == 0) {
                await this.task_done(result.data.task_record_id)
            } else {
                this.log(JSON.stringify(result))

            }
        } catch (e) {
            console.log(e)
        }
    }



    async task_done(task_record_id) {
        try {
            let options = {
                fn: 'task_done',
                method: 'post',
                url: 'https://yapi.y-h5.iyunxh.com/api/aosbasemodule/task_done',
                headers: this.hd,
                json: {
                    "task_record_id": task_record_id,
                    "collect_info": "",
                    "afs_tokenid": this.afs_tokenid,
                    //"afs_tokenid": "e7ab55b75d9703e1f2ff532e98f0f89c",
                    "device_token": this.device_token
                }

            }
            // this.log(JSON.stringify(options))
            //console.log(options)
            // await $.wait(3000)
            let { result } = await this.request(options)
            //console.log(result)
            if (result.code == 0) {
                this.log(`任务 [${a}] 完成：${result.msg}`)
                await wait(8, 12)
            } else {
                console.log(result)
                await wait()

            }
        } catch (e) {
            console.log(e)
        }
    }



    async check_num() {
        try {
            let options = {
                fn: 'check_num',
                method: 'grt',
                url: 'https://yapi.y-h5.iyunxh.com/api/aoslottery/ac_lottery_times?id=3032',
                headers: this.hd,
            }
            // console.log(options)
            let { result } = await this.request(options)
            // console.log(result)
            if (result.code == 0) {
                let num = result.data.day_remain
                if (num > 0) {
                    this.log(`抽奖次数 [${num}], 开始抽奖了`)
                    await this.lottery()
                } else this.log(`抽奖次数 [${num}], 明天再来吧`)
            } else {
                console.log(result)
            }
        } catch (e) {
            console.log(e)
        }
    }

    async lottery() {     //抽奖
        try {
            let options = {
                fn: 'lottery',
                method: 'post',
                url: 'https://yapi.y-h5.iyunxh.com/api/aoslottery/ac_sub',
                headers: this.hd,
                form: {
                    'id': 3032,
                    'verif_uuid': "",
                    'verif_code': "",
                    'afs_tokenid': this.afs_tokenid,
                    'collect_info': "",
                    'longitude': 0,
                    'latitude': 0,
                    'device_token': this.device_token,
                }
            }
            //this.log(JSON.stringify(options));
            let { result } = await this.request(options)
            console.log(result)
            if (result.code == 1) {
                await this.getLotteryRes(result.data.token)
            } else if (result.code == 1007) {
                console.log(result.msg)
            } else {
                console.log(result)
            }
        } catch (e) {
            console.log(e)
        }
    }



    // https://yapi.y-h5.iyunxh.com/api/aosbasemodule/intelverifcode_check
    // 滑块
    async get_afs_tokenid() {
        let validate = await this.get_validate()
        let options = {
            fn: '获取afs_tokenid',
            method: 'POST',
            url: `https://yapi.y-h5.iyunxh.com/api/aosbasemodule/intelverifcode_check`,
            headers: {
                'Host': 'yapi.y-h5.iyunxh.com',
                'Access-T-Id': '64',
                'Access-Api-Dt': this.dt,
                'Accept': '*/*',
                'Access-Api-Signature': this.getSignature(),
                'Access-Wxclient-Type': 'wx_app',
                'Access-T-Id-In': '64',
                'Accept-Language': 'zh-cn',
                'Origin': 'https://linan.y-h5.iyunxh.com',
                'Access-Token': this.acToken,
                'User-Agent': 'Mozilla/5.0 (iPhone; CPU iPhone OS 14_2_1 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Mobile/15E148;;xsb;xsb_linan;1.3.3;Appstore;native_app',
                'Referer': 'https://linan.y-h5.iyunxh.com/module-study/pass-detail/pass-detail?pass_id=3745&activity_id=187',
                'Access-Api-Unique-Token': '1',
                'Access-User-Id': '14271078',
                'Content-Type': 'application/json',
                'Connection': 'keep-alive'
            },
            body: JSON.stringify({
                "validate": validate,
                "verif_type": 3,
                "afs_uuid": ""
            })
        }
        // console.log(options)
        let resp = await $.request(options)
        // console.log(resp)
        if (resp.code == 0) {
            console.log(`您的afs_tokenid: ${resp.data.tokenid}`)
            return resp.data.tokenid
        }
    }
    async get_validate() {
        let options = {
            fn: '获取ticket',
            method: 'POST',
            url: `http://119.96.239.11:8888/api/getcode`,
            headers: {
                'Content-Type': 'application/json',
            },
            form: {
                'timeout': "3000",
                'type': "netease",
                'appid': "7cd08015659044f1abe8893feeb5f0ae",
                'token': this.api_tone,
                'developeraccount': "yzcong",
            }
        }
        // console.log(options)
        for (let i = 0; i < 5; i++) {
            let resp = await $.request(options)
            // console.log(resp)
            if (resp.status === 200) {
                let code1 = resp.data.code
                this.code = code1
                return code1
            } else {
                console.log(`获取code失败, 稍后再试!`, { notify: true })
            }
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


function wait(min = 2, max = 3) {  //默认等待 2-3 秒， 自定义的话需要两个值
    let s = Math.round(Math.random() * (max - min) + min)
    console.log(`等待 ${s} 秒`)
    return new Promise((resolve) => setTimeout(resolve, s * 1000))
}
