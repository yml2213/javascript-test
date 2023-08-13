require('dotenv').config()

const $ = new Env('乐音清扬')
const got = require('got')
const envPrefix = 'yyqy'
const envSplitor = ['\n', '@'] //支持多种分割，但要保证变量里不存在这个字符
const ckNames = [envPrefix + 'sjf'] //可以支持多变量
const MAX_THREAD = parseInt(process.env[envPrefix + 'Thread']) || 1 //默认最大并发数
const DEFAULT_TIMEOUT = 8000, DEFAULT_RETRY = 3
const crypto = require('crypto-js')
const axios = require('axios')
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
        this.SESSION = ck


        this.got = this.got.extend({
            headers: {},
        })
    }

    //做任务逻辑
    async userTask() {
        $.log(`\n============= 账号[${this.index}] =============`)
        //await this.getDutyNewsList()  //阅读
        await this.info()  //信息
        // await this.updateCart()  //大家来找茬
        // await this.updateCart()  //大家来找茬
    }

    async info() { // 信息
        let ts13 = $.ts(13)
        let reqid = `3bc70f69-a965-41ca-9d56-${$.randomString(12)}`
        // /api/user_mumber/account_detail&&64af616ed63fea5c0a0e9eea&&3bc70f69-a965-41ca-9d56-21cc61acab28&&1689230115318&&FR*r!isE5W&&41
        let data = `/api/user_mumber/account_detail&&${this.SESSION}&&${reqid}&&${ts13}&&FR*r!isE5W&&41`
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
                'X-TENANT-ID': '41',
                'User-Agent': '2.0.0;00000000-6641-8460-0000-000011944588;Xiaomi M2102J2SC;Android;12;xiaomi',
            },

        }
        // console.log(options)
        let resp = await $.request(options)
        // console.log(resp)
        if (resp.code == 0) {

            this.account_id = resp.data.rst.id
            $.log(`${this.idx}: ${resp.data.rst.nick_name}, 积分:${resp.data.rst.total_integral} -- sesioon:  ${this.SESSION}`)
            await $.wait(2000)
            await this.get_phpsession()  // 获取phpsession


        } else console.log(`${options.fn}: 失败,  ${JSON.stringify(resp)}`), this.ckFlog = false
    }
    async get_phpsession2() { // 获取phpsession

        let options = {
            fn: '获取phpsession',
            method: 'get',
            url: `'http://jf.yqcn.com/`,
            headers: {
                'Host': 'jf.yqcn.com',
                'Connection': 'keep-alive',
                'Pragma': 'no-cache',
                'Cache-Control': 'no-cache',
                'Upgrade-Insecure-Requests': '1',
                'User-Agent': 'Mozilla/5.0 (Linux; Android 12; XT2175-2 Build/S1RXC32.50-37-2; wv) AppleWebKit/537.36 (KHTML, like Gecko) Version/4.0 Chrome/99.0.4844.88 Mobile Safari/537.36;xsb_yueqing;xsb_yueqing;1.1.0',
                'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3;q=0.9',
                'X-Requested-With': 'com.zjonline.yueqing',
                'Sec-Fetch-Site': 'none',
                'Sec-Fetch-Mode': 'navigate',
                'Sec-Fetch-User': '?1',
                'Sec-Fetch-Dest': 'document',
                'Referer': 'http://jf.yqcn.com/',
                'Accept-Encoding': 'gzip, deflate',
                'Accept-Language': 'zh-CN,zh;q=0.9,en-US;q=0.8,en;q=0.7',

            }

        }
        console.log(options)
        let resp = await $.request(options, 'hd')
        console.log(resp)

        this.phpsession = resp['set-cookie'][0].split(';path')[0]
        this.hd.Cookie = this.phpsession

        // console.log(this.phpsession)
        await this.check_addr()  // 检测地址

    }


    async get_phpsession() {
        try {
            const url = 'http://jf.yqcn.com/'
            const headers = {
                'User-Agent': 'Mozilla/5.0 (Linux; Android 12; XT2175-2 Build/S1RXC32.50-37-2; wv) AppleWebKit/537.36 (KHTML, like Gecko) Version/4.0 Chrome/99.0.4844.88 Mobile Safari/537.36;xsb_yueqing;xsb_yueqing;1.1.0',
            }
            // console.log(options)
            const response = await axios.get(url, { headers })
            console.log(response.headers)
            // const cookie = response.headers['set-cookie'][0].split(';')[0].split('=')[1]
            // console.log(cookie)
            // this.phpsession = cookie // 将获取到的 PHPSESSID 值赋给 this.phpsession
            // console.log('PHPSESSID:', this.phpsession)

            // await this.save_unique_id()

            // 在这里对获取到的 PHPSESSID 进行处理

        } catch (error) {
            console.error('请求出错:', error.message)
        }
    }

    async save_unique_id() {
        try {
            let options = {
                fn: 'save_unique_id',
                method: 'post',
                url: 'http://jf.yqcn.com/save_unique_id.php',
                headers: {
                    'User-Agent': 'Mozilla/5.0 (Linux; Android 12; XT2175-2 Build/S1RXC32.50-37-2; wv) AppleWebKit/537.36 (KHTML, like Gecko) Version/4.0 Chrome/99.0.4844.88 Mobile Safari/537.36;xsb_yueqing;xsb_yueqing;1.1.0',
                    'Cookie': `PHPSESSID=${this.phpsession}`
                },
                form: {
                    step: 'updatecart',
                    sn: this.SESSION
                }
            }
            console.log(options)
            let response = await this.request(options)
            console.log(response)

            await this.save_account_id()  // 获取phpsession

            // 在这里对获取到的 PHPSESSID 进行处理

        } catch (error) {
            console.error('请求出错:', error.message)
        }
    }


    async save_account_id() {
        try {
            let options = {
                fn: 'save_account_id',
                method: 'post',
                url: 'http://jf.yqcn.com/save_account_id.php',
                headers: {
                    'User-Agent': 'Mozilla/5.0 (Linux; Android 12; XT2175-2 Build/S1RXC32.50-37-2; wv) AppleWebKit/537.36 (KHTML, like Gecko) Version/4.0 Chrome/99.0.4844.88 Mobile Safari/537.36;xsb_yueqing;xsb_yueqing;1.1.0',
                    'Cookie': `PHPSESSID=${this.phpsession}`
                },
                form: {
                    step: 'updatecart',
                    sn: this.account_id
                }
            }
            console.log(options)
            let response = await this.request(options)
            console.log(response)

            await this.updateCart()  // 获取phpsession

            // 在这里对获取到的 PHPSESSID 进行处理

        } catch (error) {
            console.error('请求出错:', error.message)
        }
    }


    async updateCart() {
        try {
            let options = {
                fn: 'updateCart',
                method: 'post',
                url: 'http://jf.yqcn.com/game/zc/ck.php',
                headers: {
                    'User-Agent': 'Mozilla/5.0 (Linux; Android 12; XT2175-2 Build/S1RXC32.50-37-2; wv) AppleWebKit/537.36 (KHTML, like Gecko) Version/4.0 Chrome/99.0.4844.88 Mobile Safari/537.36;xsb_yueqing;xsb_yueqing;1.1.0',
                    'Cookie': `PHPSESSID=${this.phpsession}`
                },
                form: {
                    step: 'updatecart',
                    txt: '32'
                }
            }
            //console.log(options);
            await $.wait(3000)
            let response = await this.request(options)
            console.log(response)
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
