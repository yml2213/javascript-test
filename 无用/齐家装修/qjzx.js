/*
齐家装修 app             cron 25 6-23 * * *  qjzx.js


23/2/23      密码登录 ,基本任务 感谢 蛋姨 脚本

-------------------  青龙-配置文件-复制区域  -------------------
# 齐家装修
export qjzx=" phone # pwd  @  phone # pwd   "  

多账号用 换行 或 @ 分割  

tg频道: https://t.me/yml2213_tg  
*/
const $ = Env('齐家装修')
const notify = require('./sendNotify')
const crypto = require('crypto-js')

const envSplit = ['\n', '&', '@']     //支持多种分割，但要保证变量里不存在这个字符
const ckNames = ['qjzx']                //支持多变量

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


    $.log('任务列表', { sp: true, console: false })
    list = []
    for (let user of $.userList) {
        if (user.ckFlog) {
            // list.push(user.tasklist())
            list.push(user.create_diary('写日记'))
        }
    }
    await Promise.all(list)


    // $.log('积分查询', { sp: true, console: false })
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
        this.pwd = this.ck[1]
        this.device = $.randomString(16)
        this.appkey = '9bc33568bedfdab00b622016c9b41be9'
        this.key = '7513642281147258'
        this.iv = 'A-16-Byte-String'

        this.hd = {
            'appkey': this.appkey,
            'device-id': this.device,
            'app-version': '5.0.7',
            'user-agent': 'okhttp/3.14.9',
            'content-type': 'application/json; charset=UTF-8'
        }

    }


    async login() { // 登录
        let phone = this.aes_encrypt(this.phone)
        let options = {
            fn: '登录',
            method: 'post',
            url: `https://zxtt.jia.com/api/user/login-account`,
            headers: this.hd,
            json: {
                "remember": 1,
                "password": "qj123456",
                "mobile": phone
            }
        }
        // console.log(options)
        let resp = await $.request(options)
        // console.log(resp)
        if (resp.status_code == 200) {
            this.token = resp.session_id
            this.userId = resp.user_info.user_id
            this.nick_name = resp.user_info.nick_name
            this.cookie = `session_id=${this.token}`
            this.hd.cookie = this.cookie
            this.hd.userid = this.userId
            // console.log(this.hd)
            // console.log(this.token)
            $.log(`${this.idx}: ${options.fn} ${resp.msg}, ${this.nick_name}, 手机号 ${resp.user_info.phone}`)
            this.ckFlog = true
            await $.wait(2)
        } else console.log(`${options.fn}: 失败,  ${JSON.stringify(resp)}`), this.ckFlog = false

    }


    async tasklist() { // 任务列表 
        let options = {
            fn: '任务列表',
            method: 'get',
            url: `https://zxtt.jia.com/user/task/sign/center`,
            headers: this.hd,
        }
        // console.log(options)
        let resp = await $.request(options)
        // console.log(resp)
        if (resp.status_code == 200) {
            let tasks = resp.result.daily_tasks.task_list
            // console.log(tasks)
            for (const task of tasks) {
                // console.log(task)
                let { action_cn, total_count, finished_count, status } = task
                let num = total_count - finished_count
                if (status == 0) {
                    if (action_cn == '写日记') {
                        for (let index = 0; index < num; index++) {
                            await this.create_diary(action_cn)
                        }
                    } else if (action_cn == '发帖') {
                        for (let index = 0; index < num; index++) {
                            await this.create_top(action_cn)
                        }
                    } else if (action_cn == '评论') {
                        for (let index = 0; index < num; index++) {
                            // await this.create_com(action_cn)
                        }
                    }
                } else {
                    $.log(`${this.idx}: ${action_cn} 已完成`)
                }
            }

        } else console.log(`${options.fn}: 失败, ${JSON.stringify(resp)} `)

    }



    async create_diary(name) { // 写日记 
        let options = {
            fn: '写日记',
            method: 'post',
            url: `https://zxtt.jia.com/forum/diary/info/create`,
            headers: this.hd,
            json: {
                "house_city": "山东 滨州 ",
                "address": "在邹平同盛贸易有限公司附近",
                "stage": "聊风格",
                "channel": 1,
                "main_stage": "前期准备",
                "content": {
                    "text": "简约风格好喜欢",
                    "image_list": []
                },
                "status": 1
            }
        }
        // console.log(options)
        let resp = await $.request(options)
        // console.log(resp)
        if (resp.status_code == 200) {
            let id = resp.result.id
            $.log(`${this.idx}: ${name}-${id}, ok`)
            await $.wait(3)
            await this.delete_diary(id)
        } else console.log(`${options.fn}: 失败,  ${JSON.stringify(resp)}`)
    }

    async delete_diary(id) { // 删除日记 
        let options = {
            fn: '删除日记',
            method: 'get',
            url: `https://zxtt.jia.com/forum/diary/info/delete?id=${id}`,
            headers: this.hd,
        }
        // console.log(options)
        let resp = await $.request(options)
        // console.log(resp)
        if (resp.status_code == 200) {
            $.log(`${this.idx}: ${options.fn}-${id}, ok`)
        } else console.log(`${options.fn}: 失败,  ${JSON.stringify(resp)}`)
    }


    async create_top(name) { // 发帖 
        let options = {
            fn: '写日记',
            method: 'post',
            url: `https://zxtt.jia.com/forum/note/create`,
            headers: this.hd,
            json: {
                "address": "在邹平西收费站(G20青银高速入口)附近",
                "community_new_id": 10,
                "city": "滨州",
                "id": "",
                "title": "装修就选齐家",
                "type": 13,
                "image_content": {
                    "text": "齐家服务好呀",
                    "image_list": [{
                        "width": "200",
                        "url": "http://imgmall.tg.com.cn/zxtt/2023/2/26/04/VbGGtneMZeX3RylpJB6bVjSaszur.jpg",
                        "height": "200"
                    }]
                },
                "status": 1
            }
        }
        // console.log(options)
        let resp = await $.request(options)
        // console.log(resp)
        if (resp.status_code == 200) {
            let id = resp.records[0].id
            $.log(`${this.idx}: ${name}-${id}, ok`)
            await $.wait(3)
            await this.delete_top(id)
        } else console.log(`${options.fn}: 失败,  ${JSON.stringify(resp)}`)
    }

    // https://zxtt.jia.com/forum/note/delete?id=2125445
    async delete_top(id) { // 删除帖
        let options = {
            fn: '删除帖',
            method: 'get',
            url: `https://zxtt.jia.com/forum/note/delete?id=${id}`,
            headers: this.hd,
        }
        // console.log(options)
        let resp = await $.request(options)
        // console.log(resp)
        if (resp.status_code == 200) {
            $.log(`${this.idx}: ${options.fn}-${id}, ok`)
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
        let options = {
            fn: '查询',
            method: 'post',
            url: `https://api.qd-metro.com/ngscore/user/accInfo`,
            headers: this.hd,
            json: {
                "token": this.token,
                "deviceCoding": this.device,
            }
        }
        // console.log(options)
        let resp = await $.request(options)
        // console.log(resp)
        if (resp.code == '01') {
            $.log(`${this.idx}: 共有积分 ==> ${resp.data.totalScore}`, { notify: true })
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

    async get_sign(ts, id, doid) {
        let sign = this.SHA256withRSA(`${id}${doid}${ts}`).replace(/\_/g, '/').replace(/\-/g, '+')
        let signn = `${sign}` + '=='
        //返回base64
        return signn
    }

    aes_encrypt(word) { // aes 加密
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
        return crypto.enc.Base64.stringify(encrypted.ciphertext) //返回 b64
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
            this.log(`[${this.name}]开始运行`)

            this.notifyStr = []
            this.notifyFlag = true

            this.userIdx = 0
            this.userList = []
            this.userCount = 0
        }

        async request(opt, type = 'body') {
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