/*
青岛地铁 app             cron 25 6-23 * * *  qddt.js


23/2/23      密码登录 ,基本任务 感谢 蛋姨 脚本

-------------------  青龙-配置文件-复制区域  -------------------
# 青岛地铁
export qddt=" phone # pwd  @  phone # pwd   "  

多账号用 换行 或 @ 分割  

tg频道: https://t.me/yml2213_tg  
*/
const $ = Env('青岛地铁')
const notify = require('./sendNotify')
const crypto = require('crypto-js')

const envSplit = ['\n', '&', '@']     //支持多种分割，但要保证变量里不存在这个字符
const ckNames = ['qddt']                //支持多变量

//====================================================================================================
let DEFAULT_RETRY = 1           // 默认重试次数
//====================================================================================================


async function userTasks() {

    $.log('登录', { sp: true, console: false })  // 带分割的打印
    let list = []
    for (let user of $.userList) {
        list.push(user.get_iv())
    }
    await Promise.all(list)


    $.log('任务列表', { sp: true, console: false })
    list = []
    for (let user of $.userList) {
        if (user.ckFlog) {
            list.push(user.tasklist())
        }
    }
    await Promise.all(list)




    // $.log('里豆查询', { sp: true, console: false })
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
        this.ck = ck.split('#')
        this.phone = this.ck[0]
        this.pwd = crypto.MD5(this.ck[1]).toString()
        this.device = $.randomString(16)
        this.version = '4.1.5_VersionCode_415'
        this.key = '1wTD3U39b53qv8ck'

        this.hd = {
            'Host': 'api.qd-metro.com',
            'User-Agent': 'okhttp/3.12.0'
        }
        this.pk = `-----BEGIN PRIVATE KEY-----
        MIIEvQIBADANBgkqhkiG9w0BAQEFAASCBKcwggSjAgEAAoIBAQC7iUFO+72knVUvymgXNvR7Tpv1
        J/krOQeV8pFxBkmtCvfVwkpu5nsthPyxt0rYlKnRQQZlFkVlr7cT62drLHZicDSi0ojvSmEhpNAQ
        lue9HWXPhob4dXgxpGsRmCSYiv8naHsyRiApR9O2lvzNa6WK4MP/Tfo9phVk5Ipa3HCiVZY3YSd7
        cWAImyrY9fsFSOvc1zd0k2vmkPE0nKAI+l5Mv7eAglPYfDw6oRXwGEjdGVtRduyfmy5YeyLEbNIR
        cFhHiHHoWcQvByEAgXbjOKG/Om3hsA3eeUw70f+9sMdv7uwZm6E1Y50TnQzsP03Co4WpPEVH0+zM
        VoAIigrjL0YNAgMBAAECggEAHphx8zTW57hTYYygFsl8cXGNuB1hZU/UkP4WBF6GPpj/ffxIsHch
        uXds0oGY0GTQn7cAGBXeFIzqTXGmWbHTTpQHwliexotX9WkyGMLF4/Cb35OPCZIAnfi5DxHHRqvG
        nONK1hTiwllZjPxtGgZp55Jr54cNQGmMK/2tJM26AoG0OtT+55/ZBxHTtm0j08DhfyYdjHPYGZJz
        nmZ/oQqjeI0eZQZe+h5ojKNqxGvhDiybgpIfkQvwVJhcbXiRYvQs1QnwxKOjm8dUCkn+do24H17x
        ouw4NML9sm3zCW48yXQwWcP45h27bvmu7z2iVhq1lo50sWg710EG9bBNfc1rcQKBgQDyDK6+sm7k
        NYO98A3xjp/GVmJ6Mp+6moWmI+fKDVEGb2chcdO5slKrBb1XX2TQRJS10K6yc0zntuTNVfJRAPpN
        lyQV9ndGvUbWwRFEu8DETW05NCnd9SQwgQoSG1TcS6fqUqpQV9wJvnoFUJSP9uRnxBiVGyyeSzte
        LMvjCpU33wKBgQDGWEFbK69u69QH3RsgI+V0Dthr+ySF+VTRaeprfrhFfuZzVhwqd3Cpjj8HpL/7
        XzTT4Gt33tZudbT02VY71QtzuPH2psoP5P2vP8XMbj1hM5Jgl71G+BnEKNUDlLqVn8zzE76Woi7y
        5Yj7U7ppCx94qDod7tuqEzvt4nbrponvkwKBgQCJ4gmlXhXncEi06Uu4IAwKOulsPOxaq22Y3/lJ
        U16lsM5p8eKvdNK8088xN4lBTt/71n298AqOMNST1/LqjAkKLCAFVtpJdMcmzOKeaen8qTKgFIQJ
        CX1tGAT5nZIwz/Q+eorEq9gPwO7XmjiW7gjcx4tNXSaEocyW8CPRGRU5twKBgGNUB0bVFcICr+hQ
        PilWUK5SUOeimaPOPT+yPwceKsICzv2rfed2cSE4bzAwvUPxZc9FcAxTuCcRI1ILFThZdKa7U9El
        rcNP9gsxcKjz/CEVZpSg6NUFokGuAR8N+HK92DFTDfr5tXFGqdbTE2NPgq818ATVfYQqpbR32P4i
        JKmpAoGAMUvAjv2uAf46ucQiTiABAhFKXMTIco3EJm9HTuWkB55RJ6RT08AT3ZdzlD9o4/kS2sFy
        /f2h6kU+FQeGSFufArfhDMgqQhTOBZGo+8lDQ8BqJgQEumSKjseWy2m8azPbmR9SvpR00104A1AY
        ZDX4+KE3pBYDhZiC44tDPOW99OI=
        -----END PRIVATE KEY-----`
    }


    // https://api.qd-metro.com/ngcustomer/Login/loginByPassword
    async login() { // 登录
        let param = await this.get_param(`{"phone":"${this.phone}","password":"${this.pwd}"}`)
        let options = {
            fn: '登录',
            method: 'post',
            url: `https://api.qd-metro.com/ngcustomer/Login/loginByPassword`,
            headers: this.hd,
            form: {
                'language': 'ZH',
                'deviceCoding': this.device,
                'model': 'M2102J2SC',
                'token': '',
                'version': this.version,
                'systemversion': '12',
                'platform': 'android',
                'phone': this.phone,
                'param': param
            }
        }
        // console.log(options)
        let resp = await $.request(options)
        // console.log(resp)
        if (resp.respcod == '01') {
            let data1 = await this.Decrypt(resp.data.param1)
            console.log(data1)
            this.token = data1.split('"token":"')[1].split('",')[0]
            this.userId = data1.split('"userId":"')[1].split('",')[0]
            console.log(this.token, this.userId)

            $.log(`${this.idx}: ${options.fn} ${resp.respmsg}}`, { notify: true })
            this.ckFlog = true
            await $.wait(2)
        } else console.log(`${options.fn}: 失败,  ${JSON.stringify(resp)}`), this.ckFlog = false

    }

    async get_iv() { // 获取iv
        let options = {
            fn: '获取iv',
            method: 'post',
            url: `https://api.qd-metro.com/ngcustomer/Login/loginRandom`,
            headers: this.hd,
            form: {
                'language': 'ZH',
                'deviceCoding': this.device,
                'model': 'M2102J2SC',
                'token': '',
                'version': this.version,
                'systemversion': '12',
                'platform': 'android',
                'needVerifyCode': 'false',
                'isLogin': 'false',
                'phone': this.phone
            }
        }
        // console.log(options)
        let resp = await $.request(options)
        // console.log(resp)
        if (resp.respcod == '01') {
            this.iv = resp.data.whatIsThis
            await this.login()
        } else console.log(`${options.fn}: 失败,  ${JSON.stringify(resp)}`)

    }

    async tasklist() { // 任务列表 
        let options = {
            fn: '任务列表',
            method: 'post',
            url: `https://api.qd-metro.com/ngscore/task/taskShowList`,
            headers: this.hd,
            json: {
                "token": this.token,
                "deviceCoding": this.device
            }
        }
        // console.log(options)
        let resp = await $.request(options)
        // console.log(resp)
        if (resp.code == '01') {
            let tasks = resp.data
            for (const task of tasks) {
                // console.log(task)
                let { name, status, id } = task
                if (status != 4) {
                    switch (name) {
                        case value: '使用钱包乘车'
                            await this.dotask(name, id, 2)
                            break
                        default:
                            await this.vive(name, id)
                            break
                    }
                } else {
                    $.log(`${this.idx}: ${name} 已完成`)
                }

            }

        } else console.log(`${options.fn}: 失败, ${JSON.stringify(resp)} `)

    }

    async vive(name, id) { // 取浏览id 
        let options = {
            fn: '取浏览id',
            method: 'post',
            url: `https://api.qd-metro.com/ngscore/task/getTaskBrowseConf`,
            headers: this.hd,
            json: {
                "token": this.token,
                "deviceCoding": this.device,
                "taskConfId": id
            }
        }
        // console.log(options)
        let resp = await $.request(options)
        // console.log(resp)
        let doid = resp.data.id
        await $.wait($.randomInt(15, 20))
        await this.dotask(name, id, doid)

    }

    async dotask(name, id, doid) { // 做任务 
        let ts = $.ts(13)
        let sign = await this.get_sign(ts, doid)
        let options = {
            fn: '做任务',
            method: 'post',
            url: `https://api.qd-metro.com/ngscore/task/getTaskBrowseConf`,
            headers: this.hd,
            json: {
                "token": this.token,
                "deviceCoding": this.device,
                "taskConfId": id,
                "documentId": doid,
                "createTime": ts,
                "sign": sign,
                "timestamp": ""
            }
        }
        // console.log(options)
        let resp = await $.request(options)
        // console.log(resp)
        if (resp.code == '01') {
            $.log(`${this.idx}: ${name}, 完成，开始领取奖励`)
            await this.finish(name, id)
        } else console.log(`${options.fn}: 失败,  ${JSON.stringify(resp)}`)
    }


    async finish(name, id) { // 领奖励 
        let options = {
            fn: '领奖励',
            method: 'post',
            url: `https://api.qd-metro.com/ngscore/task/finishTask`,
            headers: this.hd,
            json: {
                "token": this.token,
                "deviceCoding": this.device,
                "taskConfId": id,
            }
        }
        // console.log(options)
        let resp = await $.request(options)
        // console.log(resp)
        if (resp.code == '01') {
            $.log(`${this.idx}: ${name}, 奖励领取成功`)
        } else console.log(`${options.fn}: 失败,  ${JSON.stringify(resp)}`)
    }


    async check() { // 查询
        let params = {
            'userCookie': this.userCookie,
            'clientType': '3',
            'deviceId': this.deviceId,
            'appId': this.appId,
            'appVersion': this.appVersion,
            'osVersion': '12',
            'timestamp': this.ts,
            'nonce_str': this.rs,
            'location': this.location,
        }
        params.sign = await this.getSign(params)

        let options = {
            fn: '查询',
            method: 'post',
            url: `https://api.ersanli.cn/kilos/apis/user/wallet.action`,
            headers: this.hd,
            form: params
        }
        // console.log(options)
        let resp = await $.request(options)
        // console.log(resp)
        if (resp.code == '01') {
            $.log(`${this.idx}: ${this.nickname}, 共有豆豆 ${resp.data.gold}个, 今天获得 ${resp.data.withdrawToday}`, { notify: true })
        } else console.log(`${options.fn}: 失败,  ${JSON.stringify(resp)}`)

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

    async get_sign(ts, word) {

        let sign = this.SHA256withRSA(`${this.taskid}${this.doid}${ts}`).replace(/\_/g, '/').replace(/\-/g, '+')
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