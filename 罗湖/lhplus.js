/*
罗湖plus app             cron 47 6,12,18 * * *  lhplus.js


23/3/16    修改蛋姨脚本


-------------------  青龙-配置文件-复制区域  -------------------
# 罗湖
export lhplus="phone # pwd  @  phone # pwd "  

多账号用 换行 或 @ 分割  

tg频道: https://t.me/yml2213_tg  
*/
const $ = Env('罗湖')
const notify = require('./sendNotify')
const crypto = require('crypto-js')
const NodeRSA = require('node-rsa')

const envSplit = ['\n', '&', '@']     //支持多种分割，但要保证变量里不存在这个字符
const ckNames = ['lhplus']                //支持多变量

//====================================================================================================
let DEFAULT_RETRY = 1           // 默认重试次数
//====================================================================================================


async function userTasks() {


    $.log('登录', { sp: true, console: false })  // 带分割的打印
    let list = []
    for (let user of $.userList) {
        list.push(user.login())
    }
    await Promise.all(list)


    // $.log('用户信息', { sp: true, console: false })  // 带分割的打印
    // list = []
    // for (let user of $.userList) {
    //     list.push(user.doSign())
    //     list.push(user.user_info())
    // }
    // await Promise.all(list)


    $.log('任务', { sp: true, console: false })
    list = []
    for (let user of $.userList) {
        if (user.ckFlog) {
            list.push(user.tasklist())
        }
    }
    await Promise.all(list)


}


class UserClass {
    constructor(ck) {
        this.idx = `账号[${++$.userIdx}]`
        this.ckFlog = true
        this.ck = ck.split('#')
        this.key = '3dba799efb234bc49e85f7485d0324f6'
        this.uuid = '00000000-5e30-5391-ffff-ffffef05ac4a'
        this.phone = this.ck[0]
        this.pwd = this.AESEncrypt(this.ck[1])
        this.channel = ['5080752', '5399833', '4199516', '4461059', '4582253', '4699465', '4017058', '4114589', '1526625', '3009910']
        this.vchannel = ['7669700', '6491191', '7585646', '1933910', '9249792', '3789052']
        this.channelid = this.randomArr(this.channel)
        this.vchannelid = this.randomArr(this.vchannel)
        // this.pwd = this.AESEncrypt(this.ck[1])
        this.version = '2.37.5'
        this.pwd_en = encodeURIComponent(this.AESEncrypt(this.ck[1]))


    }


    async login() { // 登录
        let a = `${this.key}flag=1password=${this.pwd}username=${this.phone}version=${this.version}`
        // console.log(a)
        let sign = crypto.MD5(a).toString()

        let options = {
            fn: '登录',
            method: 'post',
            url: `https://luohuapp.sznews.com/jhxtapi//api.php?s=/Userv2/userLoginV2`,
            headers: {
                'Host': 'luohuapp.sznews.com',
                'User-Agent': 'Mozilla/5.0 (Linux; U; Android 12; zh-cn; M2102J2SC Build/SKQ1.211006.001) AppleWebKit/533.1 (KHTML, like Gecko) Version/4.0 Mobile Safari/533.1'
            },
            form: {
                password: this.pwd,
                flag: '1',
                username: this.phone,
                version: this.version,
                sign: sign
            }
        }
        // console.log(options)
        let resp = await $.request(options)
        // console.log(resp)
        if (resp.code == 200) {
            this.uid = resp.data.uid
            this.name = resp.data.nickname
            // console.log(this.uid, this.name)
            $.log(`${this.idx}: ${options.fn} -- ${this.name} 登陆成功 🎉, 手机号:${$.phoneNum(resp.data.mobile)}, 邀请码:${resp.data.invitcode}`, { notify: true })
            this.ckFlog = true
            await $.wait(2)
        } else if (resp.code == 210) {
            $.log(`${this.idx}: ${options.fn} -- ${resp.msg}`, { notify: true })
            this.ckFlog = false
        } else console.log(`${options.fn}: 失败,  ${JSON.stringify(resp)}`), this.ckFlog = false

    }






    async doSign() { // 签到 

        let ts_ = this.timenow()
        let SJS = $.randomString(32)

        let datasign = this.get_datasign()
        let sign = this.get_sign(SJS, ts_)

        let options = {
            fn: '签到',
            method: 'post',
            url: `https://activity.sznews.com/money/luoohupoints/index.php?s=/index/main/dailyCheckin`,
            headers: {
                'Host': 'activity.sznews.com',
            },
            formData: {
                'data': `{"data":"${datasign}","sign":"${sign}","nonceStr":"${SJS}","appid":"0af2398bebd1c86cfb868f50e0d06f73","timestamp":"${ts_}","avatar":"https://luohuapp.sznews.com/jhxtapi/Public/avatar/app_logon.png"}`
            }
        }
        // console.log(options)
        let resp = await this.httpRequest(options)
        // console.log(resp)
        if (resp.code == 200) {
            $.log(`${this.idx}: ${resp.msg}`)
            await $.wait(1)
        } else if (resp.code == 202) {
            $.log(`${this.idx}: ${resp.msg}`)
        } else console.log(`${options.fn}: 失败,  ${JSON.stringify(resp)}`)

    }


    async tasklist() { // 任务列表

        try {
            let ts_ = this.timenow()
            let SJS = $.randomString(32)

            let datasign = this.get_datasign()
            let sign = this.get_sign(SJS, ts_)

            let options = {
                fn: '任务列表',
                method: 'post',
                url: `https://activity.sznews.com/money/luoohupoints/index.php?s=/index/search/getUserinfo`,
                headers: {
                    'Host': 'activity.sznews.com',
                },
                formData: {
                    'data': `{"data":"${datasign}","sign":"${sign}","nonceStr":"${SJS}","appid":"0af2398bebd1c86cfb868f50e0d06f73","timestamp":"${ts_}","avatar":"https://luohuapp.sznews.com/jhxtapi/Public/avatar/app_logon.png"}`
                }
            }
            // console.log(options)
            let resp = await this.httpRequest(options)
            // console.log(resp)
            if (resp.code == 200) {
                $.log(`${this.idx}: ${this.name} 总积分 ${resp.data.total} ==> 今日积分 ${resp.data.today}`)

                let { dailyCheckin, readcount, sharecount, watchcount, commentcount, openApp } = resp.data

                if (dailyCheckin == 0) { // 登录
                    await this.doSign()
                } else $.log(`${this.idx}: ${this.name} -- 已签到`)


                if (readcount < 10) { // 阅读
                    for (let c = sharecount; c < 10; c++) {
                        await this.dotask('readluohu')
                    }
                } else {
                    $.log(`${this.idx}: ${this.name} 阅读 -- 已完成`)
                }

                if (sharecount < 10) { // 分享
                    for (let c = sharecount; c < 10; c++) {
                        await this.dotask('share')
                    }
                } $.log(`${this.idx}: ${this.name} 分享 -- 已完成`)

                if (commentcount < 10) {  // 评论
                    for (let c = commentcount; c < 10; c++) {
                        await this.dotask('comment')
                    }
                } $.log(`${this.idx}: ${this.name} 评论 -- 已完成`)

                if (watchcount < 10) {
                    for (let c = watchcount; c < 10; c++) {
                        await this.video()
                    }
                } $.log(`${this.idx}: ${this.name} 视频 -- 已完成`)

                if (openApp < 2) { // 打开app
                    for (let c = watchcount; c < 2; c++) {
                        await this.open('openApp')
                    }
                } $.log(`${this.idx}: ${this.name} 打开app -- 已完成`)



            } else console.log(`${options.fn}: 失败,  ${JSON.stringify(resp)}`)
        } catch (error) {
            console.log(error)
        }



    }


    async readlist() { // 阅读列表 
        let n = $.randomInt(2, 5)
        let options = {
            fn: '阅读列表',
            method: 'get',
            url: `https://appatt.sznews.com/luohu/files/Public/news/json/463/463_${n}.json?${this.channelid}`,
            headers: {},
        }
        // console.log(options)
        let resp = await $.request(options)
        // console.log(resp)
        if (resp.code == 200) {
            this.readid = resp.data

        } else console.log(`${options.fn}: 失败,  ${JSON.stringify(resp)}`)

    }

    async dotask(taskid) { // 常规任务
        try {
            await this.readlist()
            let n = $.randomInt(0, 9)
            if (!this.readid[n].nid) {
                await this.readlist()
            }
            let nid = this.readid[n].nid
            let ts = $.ts(10)
            let signature = crypto.MD5(`oiadshasfdj${ts}nonce`).toString()
            let sign = crypto.MD5(`3dba799efb234bc49e85f7485d0324f6uid=${this.uid}newsid=${nid}`).toString()

            let options = {
                fn: '常规任务',
                method: 'post',
                url: `https://activity.sznews.com/money/luoohupoints/index.php?s=/index/main/${taskid}`,
                headers: {},
                json: {
                    signature: signature,
                    timestamp: ts,
                    nonce: 'nonce',
                    uid: this.uid,
                    newsid: nid,
                    sign: sign,
                }
            }
            // console.log(options)
            let resp = await this.httpRequest(options)
            // console.log(resp)
            if (resp != undefined) {
                if (resp.code == 200) {
                    $.log(`${this.idx}: ${resp.msg}`)
                    await $.wait($.randomInt(5, 10))
                } else console.log(`${options.fn}: ${taskid} 失败,  ${JSON.stringify(resp)}`)
            } else {
                console.log(taskid)
            }
        } catch (error) {
            console.log(error)
        }

    }



    async videolist() { // 视频列表 
        let n = $.randomInt(1, 5)
        let options = {
            fn: '视频列表',
            method: 'get',
            url: `https://appatt.sznews.com/luohu/files/Public/news/json/470/470_${n}.json?${this.vchannelid}`,
            headers: {},
        }
        // console.log(options)
        let resp = await $.request(options)
        // console.log(resp)
        if (resp.code == 200) {
            this.videoid = resp.data
        } else console.log(`${options.fn}: 失败,  ${JSON.stringify(resp)}`)

    }

    async video() { // 看视频
        await this.videolist()
        let n = $.randomInt(0, 39)
        let vid = this.videoid[n].nid
        let ts = $.ts(10)
        let signature = crypto.MD5(`oiadshasfdj${ts}nonce`).toString()
        let sign = crypto.MD5(`3dba799efb234bc49e85f7485d0324f6uid=${this.uid}newsid=${vid}`).toString()

        let options = {
            fn: '看视频',
            method: 'post',
            url: `https://activity.sznews.com/money/luoohupoints/index.php?s=/index/main/readluohu`,
            headers: {},
            json: {
                signature: signature,
                timestamp: ts,
                nonce: 'nonce',
                uid: this.uid,
                newsid: vid,
                sign: sign,
            }
        }
        // console.log(options)
        let resp = await this.httpRequest(options)
        // console.log(resp)
        if (resp.code == 200) {
            $.log(`${this.idx}: ${resp.msg}`)
            await $.wait($.randomInt(5, 10))
        } else console.log(`${options.fn}: 失败,  ${JSON.stringify(resp)}`)
    }







    get_sign(SJS, ts_) {
        let a = `appid=0af2398bebd1c86cfb868f50e0d06f73&appsecret=ca4b47a365f85c20964dc6a4f9a89177&mobile=${this.phone}&nonceStr=${SJS}&timestamp=${ts_}&uid=${this.uid}`
        // console.log(a)
        let sign = crypto.MD5(a).toString()
        // console.log(sign)
        return sign
    }
    get_datasign() {
        let a = `{"userInfo":"uid=${this.uid}&nickname=${this.name}&mobile=${this.phone}&uuid=${this.uuid}"}`
        // console.log(a)
        let datasign = this.AES_CBC(a)
        // let datasign = this.AESEncrypt(a).replace(/\+/g, '-').replace(/\//g, '_')
        // console.log('datasign', datasign)
        return datasign

    }

    // method, mode, padding, data, key, iv
    AESEncrypt(data) {
        let key = this.key
        const datas = crypto.enc.Utf8.parse(data)
        const KEY = crypto.enc.Utf8.parse(key)
        const encrypted = crypto.AES.encrypt(datas, KEY, {
            mode: crypto.mode.ECB,
            padding: crypto.pad.Pkcs7,
        })
        return encrypted.toString()
    }

    AES_CBC(word) {
        let key = '3ab79c8f13a1e7eb'
        let iv = 'aa5952b68e56293e'

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


    randomArr(arr) {
        return arr[parseInt(Math.random() * arr.length, 10)]
    }


    timenow(str) {
        let date = new Date()
        if (str == undefined) {
            let date = new Date(),
                N = date.getFullYear(),
                Y = (date.getMonth() + 1 < 10 ? '0' + (date.getMonth() + 1) : date.getMonth() + 1),
                R = date.getDate() + '_',
                S = date.getHours(),
                F = date.getMinutes() + 1 < 10 ? '0' + date.getMinutes() : date.getMinutes(),
                M = date.getSeconds() + 1 < 10 ? '0' + date.getSeconds() : date.getSeconds()
            return N + Y + R + S + F + M
        } else if (str == 0) {
            //年
            return date.getFullYear()
        } else if (str == 1) {
            //月
            return date.getMonth() + 1 < 10 ? '0' + (date.getMonth() + 1) : date.getMonth() + 1
        } else if (str == 2) {
            //日
            return date.getDate()
        } else if (str == 3) {
            //时
            return date.getHours()
        } else if (str == 4) {
            //分
            return date.getMinutes()
        } else if (str == 5) {
            //秒
            return date.getSeconds() + 1 < 10 ? '0' + date.getSeconds() : date.getSeconds()
        }
    }


    async httpRequest(options) {
        let fn_ = options.fn
        delete options.fn
        var request = require('request')
        return new Promise((resolve) => {
            request(options, function (error, response) {
                if (error) throw new Error(error)
                let data = response.body
                // console.log(data)
                try {
                    if (data.indexOf('"code":') > -1) {
                        let data_ = data.split('{"code"')[1]
                        let a = `{"code"${data_}`
                        let result = JSON.parse(a)
                        options.fn = fn_
                        resolve(result)
                    } else {
                        options.fn = fn_
                        resolve()
                    }
                } catch (error) {
                    console.log(error)
                }

            })
        })
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
            this.log(`[${this.name}]开始运行`)

            this.notifyStr = []
            this.notifyFlag = true

            this.userIdx = 0
            this.userList = []
            this.userCount = 0
        }

        async request(opt, type = 'body') {
            try {
                const got = require('got')
                let DEFAULT_TIMEOUT = 8000      // 默认超时时间
                let resp = null, count = 0
                let fn = opt.fn || opt.url
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
                if (type == 'body') {
                    return Promise.resolve(body)
                } else if (type == 'hd') {
                    return Promise.resolve(headers)
                } else if (type == 'statusCode') {
                    return Promise.resolve(statusCode)
                }
            } catch (error) {
                console.log(error)
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