/*
模板V3
@ Leaf
@ 2022.12.14
*/
const $ = Env('demo')
const got = require('got')

var DEFAULT_TIMEOUT = 8000, DEFAULT_RETRY = 3
process.env.env1 = 'jnasndlksadn&891237132&4&5&8&5&8&5&8&5&8'
const envSplitor = ['\n', '&', '@'] //支持多种分割，但要保证变量里不存在这个字符
const ckNames = ['env1', '变量名2'] //支持多变量

class BasicClass {
    constructor() { this.index = $.userIdx++; this.name = '' }
    log(msg, opt = {}) {
        let n = $.userCount.toString().length
        var m = ''
        if (this.index) m += `账号[${$.padStr(this.index, n)}]`
        if (this.name) m += `[${this.name}]`
        $.log(m + msg, opt)
    }
    async request(opt) {
        var resp = null, count = 0
        var fn = opt.fn || opt.url
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
        return Promise.resolve({ statusCode, headers, body })
    }
}
let http = new BasicClass() //公用http请求实例

class UserClass extends BasicClass {
    constructor(ck) {
        super()
        this.ck = ck
    }

    async some_api_404() {
        try {
            let options = {
                fn: 'some_api_404',
                method: 'get',
                url: 'https://gateway.kugou.com/mstc/musicsymbol/v1/user/info1',
            }
            let resp = await this.request(options)
            $.log(resp)
        } catch (e) {
            $.log(e)
        } finally {
            return Promise.resolve()
        }
    }

    async some_api_200() {
        try {
            let options = {
                fn: 'some_api_200',
                method: 'get',
                url: 'https://gateway.kugou.com/mstc/musicsymbol/v1/user/info',
            }
            let resp = await this.request(options)
            $.log(resp)
        } catch (e) {
            $.log(e)
        } finally {
            return Promise.resolve()
        }
    }

    async wait_task() {
        let rnd = 2000
        rnd += Math.random() * 15000 | 0
        this.log(`开始等待${rnd / 1000}秒`)
        await $.wait(rnd)
        this.log(`完成${rnd / 1000}秒等待`)
    }
}

!(async () => {
    $.read_env(UserClass)

    $.log('普通打印: $.log')
    $.log('带时间的打印', { time: true })
    $.log('带时间的打印，自定义时间格式', { time: true, fmt: 'yyyyMMdd hh:mm:ss' })
    $.log('加推送的打印', { notify: true })
    $.log('加推送的带时间的打印', { time: true, notify: true })
    $.log('不打印，只加推送', { notify: true, console: false })

    $.log('\nUserClass封装的user.log效果:')
    for (let user of $.userList) {
        user.log(` -- 这是没有设置name之前的user.log`)
        user.name = `账号${user.index}的名字`
        user.log(` -- 这是设置name之后的user.log`)
    }

    $.log('\n请求一个错误的url(返回404)')
    let options = {
        fn: 'helloWorld',
        method: 'get',
        url: 'https://gateway.kugou.com/mstc/musicsymbol/v1/user/info1',
    }
    let demo1 = await http.request(options)
    console.log(demo1)

    $.log('\n用user.request请求一个错误的url(返回404)')
    await $.userList[0].some_api_404()

    $.log('\n用user.request请求一个url的正常返回')
    await $.userList[0].some_api_200()

    $.log('\n3并发跑任务')
    await $.threadManager('wait_task', 3)
})()
    .catch((e) => $.log(e))
    .finally(() => $.exitNow())

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
            this.log(`[${this.name}]运行结束，共运行了${s}秒`)
            process.exit(0)
        }
    }(name)
}