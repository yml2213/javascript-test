/*
卡嘉 app             cron 0 1,6,12,18,22 * * *  kajia.js

23/4/3    修改蛋姨脚本

-------------------  青龙-配置文件-复制区域  -------------------
# 卡嘉
export kajia=" phone # pwd  @  phone # pwd "  

多账号用 换行 或 @ 分割  


tg频道: https://t.me/yml2213_tg  
*/
const $ = Env('卡嘉')
const notify = require('./sendNotify')
const crypto = require('crypto-js')

const envSplit = ['\n', '&', '@']     //支持多种分割，但要保证变量里不存在这个字符
const ckNames = ['kajia']                //支持多变量

//====================================================================================================


//====================================================================================================


class UserClass {
    constructor(ck) {
        this.idx = `账号[${++$.userIdx}]`
        this.ckFlog = true
        this.ck = ck.split('#')
        this.phone = this.ck[0]
        this.pwd = crypto.MD5(this.ck[1]).toString()

        this.hd = {
            'channelID': '3',
            'Host': 'jacsupperapp.jac.com.cn',
            'User-Agent': 'okhttp/3.10.0',
            'Content-Type': 'application/json; charset=utf-8'
        }

    }

    async userTask() { // 个人信息
        console.log(`\n=============== ${this.idx} ===============`)

        $.log(`\n-------------- 登陆 --------------`)
        await this.login()

        if (this.ckFlog) {
            $.log(`\n-------------- 任务列表 --------------`)
            await this.signin()
            await this.share()
            for (let i = 0; i < 4; i++) {
                await this.moment()
                await this.comment()
            }
            $.log(`\n-------------- 查询 --------------`)
            await this.userinfo()


        }
    }

    async login() { // 登陆
        let options = {
            fn: '登陆',
            method: 'post',
            url: `https://jacsupperapp.jac.com.cn/zkapi/jac-admin/admin/userBaseInformation/userLogin`,
            headers: this.hd,
            json: { "password": this.pwd, "userCode": this.phone }
        }
        // console.log(options)
        let resp = await $.request(options)
        // console.log(resp)
        if (resp.code == 0) {
            this.no = resp.data.no
            this.userName = resp.data.userName
            this.hd.timaToken = resp.data.token
            $.log(`${this.idx}: ${options.fn} ${this.userName} 成功 🎉`)
            this.ckFlog = true
        } else console.log(`${options.fn}: 失败,  ${JSON.stringify(resp)}`), this.ckFlog = false

    }



    async signin() { // 签到
        try {
            let options = {
                fn: '签到',
                method: 'post',
                url: `https://jacsupperapp.jac.com.cn/zkapi/pluto-membership/pluto-membership/integral-gather/addintegral-signIn`,
                headers: this.hd,
                json: { "ruleStr": "SIGN_IN", "serviceTypeStr": "SERVICE_FIXED", "no": this.no }
            }
            // console.log(options)
            let resp = await $.request(options)
            // console.log(resp)
            if (resp.code == 0) {
                $.log(`${this.idx}: ${this.userName}, 签到成功`)
            } else if (resp.code == 50002) {
                $.log(`${this.idx}: ${options.fn} -- ${resp.msg}`)
            } else console.log(`${options.fn}: 失败,  ${JSON.stringify(resp)}`)
        } catch (e) {
            console.log(e)
        }
    }


    async moment() { // 发布动态
        try {
            await this.dailyoneword()
            let options = {
                fn: '发布动态',
                method: 'post',
                url: `https://jacsupperapp.jac.com.cn/zkapi/dk-dm-portal-api/moment/add`,
                headers: this.hd,
                json: { "uid": this.no, "message": `"#打卡##${this.word}"`, "imgUrls": "" }
            }
            // console.log(options)
            let resp = await $.request(options)
            // console.log(resp)
            if (resp.status == 1 && resp.data.code != 50002) {
                $.log(`${this.idx}: ${this.userName}, 发布动态成功`)
                await $.wait(6)
            } else if (resp.data.code == 50002) {
                $.log(`${this.idx}: ${options.fn} -- ${resp.data.msg}`)
            } else console.log(`${options.fn}: 失败,  ${JSON.stringify(resp)}`)
        } catch (e) {
            console.log(e)
        }
    }


    async readlist() { // 文章列表
        try {
            let options = {
                fn: '文章列表',
                method: 'post',
                url: `https://jacsupperapp.jac.com.cn/zkapi/dk-dm-portal-api/recommend/recommendList`,
                headers: this.hd,
                json: { "isNew": 1, "uid": this.no, "pageNo": `${$.randomInt(1, 50)}`, "length": 5, "labelIds": ["VB2018071807034444249"] }
            }
            // console.log(options)
            let resp = await $.request(options)
            // console.log(resp)
            if (resp.status == 1) {
                this.list = resp.data
            } else console.log(`${options.fn}: 失败,  ${JSON.stringify(resp)}`)
        } catch (e) {
            console.log(e)
        }
    }

    async share() { // 分享文章
        try {
            await this.readlist()
            let rid = this.list[$.randomInt(0, 4)].id
            let options = {
                fn: '分享文章',
                method: 'post',
                url: `https://jacsupperapp.jac.com.cn/zkapi/pluto-membership/pluto-membership/integral-gather/addintegral-sharingForwarding`,
                headers: this.hd,
                json: { "ruleStr": "SHARING_FORWARDING", "serviceTypeStr": "SERVICE_FIXED", "no": this.no, "lid": rid, "shareflag": "" }
            }
            // console.log(options)
            let resp = await $.request(options)
            // console.log(resp)
            if (resp.code == 0) {
                this.list = resp.data
            } else if (resp.code == 50002) {
                $.log(`${this.idx}: ${options.fn} -- ${resp.msg}`)
            } else console.log(`${options.fn}: 失败,  ${JSON.stringify(resp)}`)
        } catch (e) {
            console.log(e)
        }
    }


    async comment() { // 评论文章
        try {
            let commentid = ['学到了', '厉害', '加油哦', '牛', '666', '真的大开眼界了', '一定要好好学习', '惊呆', '格局打开了']
            let r = $.randomInt(0, commentid.length)
            let comtext = commentid[r]

            await this.readlist()
            let rid = this.list[$.randomInt(0, 4)].id
            let options = {
                fn: '评论文章',
                method: 'post',
                url: `https://jacsupperapp.jac.com.cn/zkapi/dk-dm-portal-api/userComment/informationComment`,
                headers: this.hd,
                json: { "uid": this.no, "lid": rid, "message": comtext }
            }
            // console.log(options)
            let resp = await $.request(options)
            // console.log(resp)
            if (resp.status == 1) {
                $.log(`${this.idx}: ${options.fn} -- ok`)
            } else console.log(`${options.fn}: 失败,  ${JSON.stringify(resp)}`)
        } catch (e) {
            console.log(e)
        }
    }

    async userinfo() { // 用户信息
        try {
            let options = {
                fn: '用户信息',
                method: 'post',
                url: `https://jacsupperapp.jac.com.cn/zkapi/pluto-membership/plutomembership/integralCount/searchIntegralCountList`,
                headers: this.hd,
                json: { "no": this.no }
            }
            // console.log(options)
            let resp = await $.request(options)
            // console.log(resp)
            if (resp.code == 0) {
                $.log(`${this.idx}: ${this.userName}  积分 -- ${resp.data[0].count}`, { notify: true })
            } else console.log(`${options.fn}: 失败,  ${JSON.stringify(resp)}`)
        } catch (e) {
            console.log(e)
        }
    }


    //每日一言
    async dailyoneword() {
        let options = {
            fn: '每日一言',
            method: 'get',
            url: `https://v1.jinrishici.com/all.json`,
            headers: {},
        }
        let resp = await $.request(options)
        // console.log(resp)
        this.word = resp.content
        // console.log(this.word)
    }






}


!(async () => {
    console.log(await $.yiyan())
    if ($.read_env(UserClass)) {
        // await userTasks()
        for (let user of $.userList) {
            await user.userTask()
        }
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
                let resp = null
                let fn = opt.fn || opt.url
                opt.timeout = opt.timeout || DEFAULT_TIMEOUT
                opt.retry = opt.retry || { limit: 0 }
                opt.method = opt?.method?.toUpperCase() || 'GET'
                try {
                    resp = await got(opt)
                } catch (e) {
                    console.log(e)
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
            $.log(`账号[${$.userIdx}]: 随机等待 ${t} 秒 ...`)
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