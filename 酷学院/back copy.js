let fwqyc = 350
const $ = Env('上官抢购')
const crypto = require('crypto-js')
const fs = require('fs')
const xpath = require('xpath')
const os = require('os')
    , XmldomParser = require('xmldom').DOMParser

const domParser = new XmldomParser({
    errorHandler: {}
})
const ckFile1 = 'sgxw.txt'
const envSplit = ['\n']     //支持多种分割，但要保证变量里不存在这个字符
const ckNames = [''] //可以支持多变量

let userCookie = []
try {
    userCookie = userCookie.concat(fs.readFileSync(`./${ckFile1}`, 'utf-8').split('\n') || [])
    $.log(`ck文件[ ${ckFile1} ]加载成功`, { time: true })
    this.mxr = true
} catch (e) {
    console.log(`未发现本地文件 调用青龙环境变量`)
    this.mxr = false
}
let mxr = this.mxr
if (this.mxr == false) {
    try {
        userCookie = userCookie.concat((($.isNode() ? process.env[ckNames] : $.getdata(ckNames)) || '')?.split('\n') || [])
        console.log(`环境变量[ ${ckNames} ]加载成功`)
    } catch (e) {
        //console.log(e)
    }
}
let userList = []
let userIdx = 0

//====================================================================================================
let DEFAULT_RETRY = 1           // 默认重试次数
//====================================================================================================


async function userTasks() {


    let list = []

    for (let user of userList) {
        list.push(user.main())
    }
    await Promise.all(list)

    console.log((1000 - fwqyc - $.time('S')) / 1000)

    await $.wait((1000 - fwqyc - $.time('S')) / 1000)
    list = []
    for (let user of userList) {
        list.push(user.xd())
    }
    await Promise.all(list)

}



class UserClass {
    constructor(ck) {

        this.idx = `账号[${++userIdx}]`
        this.ckFlog = true
        this.ck = ck.split('#')
        this.uid = this.ck[0]
        this.Cookie = this.ck[1]
        this.xdphone = this.ck[2]
        this.xdgsd = this.ck[3]
        this.xdyys = this.ck[4]
        this.appItemId = this.ck[5]
        this.itemId = this.ck[6]
        this.xdsp = this.ck[7]
    }


    async main() {
        let key = await this.html()
        let map = await this.getToken()
        this.token = map[key]

    }
    async html() {
        let options = {
            fn: 'html',
            method: 'get',
            url: `https://63373.activity-42.m.duiba.com.cn/mobile/detail?appItemId=${this.appItemId}&dbnewopen`,
            headers: {
                "Host": "63373.activity-42.m.duiba.com.cn",
                "Connection": "keep-alive",
                "Pragma": "no-cache",
                "Cache-Control": "no-cache",
                "Upgrade-Insecure-Requests": "1",
                "User-Agent": "Mozilla/5.0 (Linux; Android 10; V1824A Build/QP1A.190711.020; wv) AppleWebKit/537.36 (KHTML, like Gecko) Version/4.0 Chrome/74.0.3729.186 Mobile Safari/537.36 Shobserver/9.9.5",
                "Accept-Encoding": "gzip, deflate",
                "Accept-Language": "zh-CN,zh;q=0.9,en-US;q=0.8,en;q=0.7",
                Cookie: this.Cookie,
                "X-Requested-With": "com.shwatch.news"
            }
        }
        // console.log(options)
        let resp = await $.request(options)
        //  console.log(resp)
        //   console.log(JSON.stringify(resp))
        if (resp) {
            let key = getKey(resp)
            //     console.log(key)
            return key
            //  console.log(resp)
        } else console.log(`${options.fn}: 失败,  ${JSON.stringify(resp)}`)

    }

    async getToken() {
        let ts13 = Math.round(new Date().getTime()).toString()
        let options = {
            fn: 'gettoken',
            method: 'post',
            url: `https://63373.activity-42.m.duiba.com.cn/gaw/ctoken/getToken?_=${ts13}`,
            headers: {
                "Host": "63373.activity-42.m.duiba.com.cn",
                "Connection": "keep-alive",
                "Pragma": "no-cache",
                "Cache-Control": "no-cache",
                "Upgrade-Insecure-Requests": "1",
                "User-Agent": "Mozilla/5.0 (Linux; Android 10; V1824A Build/QP1A.190711.020; wv) AppleWebKit/537.36 (KHTML, like Gecko) Version/4.0 Chrome/74.0.3729.186 Mobile Safari/537.36 Shobserver/9.9.5",
                "Accept": "text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3",
                "Accept-Encoding": "gzip, deflate",
                "Accept-Language": "zh-CN,zh;q=0.9,en-US;q=0.8,en;q=0.7",
                Cookie: this.Cookie,
                "X-Requested-With": "com.shwatch.news"
            }
        }
        // console.log(options)
        let resp = await $.request(options)
        // console.log(resp)
        if (resp) {
            let tokenStr = resp.token
            let tokenWindow = getTokenWindow(tokenStr)

            return tokenWindow
            //  console.log(resp)
        } else console.log(`${options.fn}: 失败,  ${JSON.stringify(resp)}`)

    }

    async xd() {
        let options = {
            fn: 'xd',
            method: 'post',
            url: `https://63373.activity-42.m.duiba.com.cn/phonebillExchange/exchange`,
            headers: {
                Host: '63373.activity-42.m.duiba.com.cn',
                Connection: 'keep-alive',
                Pragma: 'no-cache',
                'Cache-Control': 'no-cache',
                Accept: 'application/json',
                Origin: 'https://63373.activity-42.m.duiba.com.cn',
                'X-Requested-With': 'XMLHttpRequest',
                'User-Agent': 'Mozilla/5.0 (Linux; Android 8.1.0; MI 5X Build/OPM1.171019.019; wv) AppleWebKit/537.36 (KHTML, like Gecko) Version/4.0 Chrome/71.0.3578.99 Mobile Safari/537.36 Shobserver/9.9.5',
                'Content-Type': 'application/x-www-form-urlencoded',
                'Accept-Language': 'zh-CN,en-US;q=0.9',
                Cookie: this.Cookie,
                'content-type': 'application/x-www-form-urlencoded'
            },
            form: {
                appItemId: this.appItemId,
                itemId: this.itemId,
                phone: this.xdphone,
                degreeId: this.xdsp,
                phoneCatName: this.xdyys,
                phoneProvince: this.xdgsd,
                type: 'phonebillDingzhi',
                token: this.token
            }
        }
        // console.log(options)
        let resp = await $.request(options)
        //  $.log(`${JSON.stringify(resp)}`, {time:true})
        if (resp) {
            $.log(this.idx + `${JSON.stringify(resp)}`, { time: true })
            //   await this.xd2(resp.orderId)
            //  await this.main()
            //  console.log(resp)
        } else console.log(this.idx + `${options.fn}: 失败,  ${JSON.stringify(resp)}`, { time: true })


    }
    async xd2(a) {
        let options = {
            fn: 'xd2',
            method: 'post',
            url: `https://63373.activity-42.m.duiba.com.cn/mobile/orderStatusQuery/`,
            headers: {
                Host: '63373.activity-42.m.duiba.com.cn',
                Connection: 'keep-alive',
                Pragma: 'no-cache',
                'Cache-Control': 'no-cache',
                Accept: 'application/json',
                Origin: 'https://63373.activity-42.m.duiba.com.cn',
                'X-Requested-With': 'XMLHttpRequest',
                'User-Agent': 'Mozilla/5.0 (Linux; Android 8.1.0; MI 5X Build/OPM1.171019.019; wv) AppleWebKit/537.36 (KHTML, like Gecko) Version/4.0 Chrome/71.0.3578.99 Mobile Safari/537.36 Shobserver/9.9.5',
                'Content-Type': 'application/x-www-form-urlencoded',
                'Accept-Language': 'zh-CN,en-US;q=0.9',
                Cookie: this.Cookie,
                'content-type': 'application/x-www-form-urlencoded'
            },
            from: {
                orderId: a
            }
        }
        //  console.log(options)
        let resp = await $.request(options)
        // console.log(resp)
        if (resp) {
            $.log(this.idx + `${JSON.stringify(resp)} orderId:${a}`, { time: true })
            //  console.log(resp)
        } else console.log(this.idx + `${options.fn}: 失败,  ${JSON.stringify(resp)} orderId:${a}`, { time: true })

    }
    async get_param(word) {
        let key = this.key
        let iv = this.iv
        key = crypto.enc.Utf8.parse(key)
        iv = crypto.enc.Utf8.parse(iv)
        let srcs = crypto.enc.Utf8.parse(word)
        // 加密模式为CBC，补码方式为PKCS5Padding（也就是PKCS7）
        let encrypted = crypto.AES.encrypt(srcs, key, {
            iv: iv,
            mode: crypto.mode.CBC,
            padding: crypto.pad.Pkcs7
        })
        //返回base64
        return crypto.enc.Base64.stringify(encrypted.ciphertext)
    }

    async Decrypt(word) {
        let key = this.key
        let iv = this.iv
        key = crypto.enc.Utf8.parse(key)
        iv = crypto.enc.Utf8.parse(iv)
        let base64 = crypto.enc.Base64.parse(word)
        let src = crypto.enc.Base64.stringify(base64)
        // 解密模式为CBC，补码方式为PKCS5Padding（也就是PKCS7）
        let decrypt = crypto.AES.decrypt(src, key, {
            iv: iv,
            mode: crypto.mode.CBC,
            padding: crypto.pad.Pkcs7
        })
        let decryptedStr = decrypt.toString(crypto.enc.Utf8)
        return decryptedStr.toString()

    }

    async get_sign(ts, id, doid) {
        let sign = this.SHA256withRSA(`${id}${doid}${ts}`).replace(/\_/g, '/').replace(/\-/g, '+')
        let signn = `${sign}` + '=='
        //返回base64
        return signn
    }


    //SHA256withRSA   
    SHA256withRSA(content) {
        let rs = require("jsrsasign")
        const key = rs.KEYUTIL.getKey(this.pk)
        const signature = new rs.KJUR.crypto.Signature({ alg: "SHA256withRSA" })
        signature.init(key)
        signature.updateString(content)
        const originSign = signature.sign()
        const sign64u = rs.hextob64u(originSign)
        return sign64u
    }


}


!(async () => {


    if (!(await checkEnv())) return
    if (userList.length > 0) {

        await userTasks()

    }


})()
    .catch((e) => $.log(e))
    .finally(() => $.exitNow())

//===============================================================

function getKey(html) {
    let doc = domParser.parseFromString(html)
    let nodes = xpath.select('//script', doc)
    //  console.log(nodes.length)
    //  console.log(nodes[5].textContent)
    let node = nodes[1].textContent
    let str = node

    // console.log(str)
    str = str.replaceAll(/eval/g, 'var babelStr=')
    str = str.replaceAll(/\\u0065\\u0076\\u0061\\u006c/g, 'var babelStr=')
    eval(str)
    // console.log(babelStr)
    let key = babelStr.match(/key = '(.*?)'/)[1]
    // console.log(babelStr)
    return key
}

function getTokenWindow(tokenStr) {
    eval('var window = {}; ' + tokenStr)
    // console.log(window)
    // console.log(tokenStr)

    return window
}
/////////////////////////////////////////////////////////////  
function checkEnv() {
    if (userCookie) {
        for (let userCookies of userCookie) {
            if (userCookies) userList.push(new UserClass(userCookies))
        }
        userCount = userList.length
    } else {
        console.log(`未找到CK`)
        return false
    }

    $.log(`\n共找到${userCount}个账号`, { time: true })
    return true
}
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
            let opt = { console: true }
            Object.assign(opt, options)

            if (opt.time) {
                let fmt = opt.fmt || 'hh:mm:ss:S'
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
            this.log(`[${this.name}]运行结束，共运行了${s}秒`, { time: true })
            process.exit(0)
        }
    }(name)
}
function getday() {
    let myDate = new Date()
    y = myDate.getFullYear()
    m = myDate.getMonth() + 1
    d = myDate.getDate()
    h = myDate.getHours()
    f = myDate.getMinutes()
    s = myDate.getSeconds()

    return h + '' + f + '' + s
} 