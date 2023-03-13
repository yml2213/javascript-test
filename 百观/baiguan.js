/*
百观 app             cron 25 6-23 * * *  baiguan.js


5-30		完成 签到  资讯阅读  分享资讯  资讯点赞  本地服务 任务
5-31		增加社区任务,修复一个任务bug
6-1		    增加评论任务,基本完成所有任务,测试无 bug直接转正式基本
6-1		    修改运行逻辑 ,leaf大佬 nb ,破音
23/3/13     修复错误


-------------------  青龙-配置文件-复制区域  -------------------
# 百观
export baiguan="X-SESSION-ID  @  X-SESSION-ID   "  

多账号用 换行 或 @ 分割  

tg频道: https://t.me/yml2213_tg  
*/
const $ = Env('百观')
const notify = require('./sendNotify')
const crypto = require('crypto-js')
const NodeRSA = require('node-rsa')

const envSplit = ['\n', '&', '@']     //支持多种分割，但要保证变量里不存在这个字符
const ckNames = ['baiguan']                //支持多变量

//====================================================================================================
let DEFAULT_RETRY = 1           // 默认重试次数
let readNum = '20'              // 每次脚本运行阅读数量
//====================================================================================================


async function userTasks() {


    $.log('登录', { sp: true, console: false })  // 带分割的打印
    let list = []
    for (let user of $.userList) {
        list.push(user.credentialAuth())
    }
    await Promise.all(list)


    // $.log('用户信息', { sp: true, console: false })  // 带分割的打印
    // list = []
    // for (let user of $.userList) {
    //     list.push(user.user_info())
    // }
    // await Promise.all(list)


    // $.log('任务', { sp: true, console: false })
    // list = []
    // for (let user of $.userList) {
    //     if (user.ckFlog) {
    //         list.push(user.tasklist())
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
        this.ts = $.ts(13)
        this.salt = 'FR*r!isE5W'
        this.reqId = `${$.randomString(8)}-${$.randomString(4)}-${$.randomString(4)}-${$.randomString(4)}-${$.randomString(12)}`



    }


    async credentialAuth() { // 登录
        let encryptedPwd = this.aesencrypt(this.pwd)
        let qs = '/web/oauth/credential_auth'

        let options = {
            fn: '登录',
            method: 'post',
            url: `https://passport.tmuyun.com/web/oauth/credential_auth`,
            // headers: await this.get_hd2(qs),
            headers: {
                'Cache-Control': 'no-cache',
                'User-Agent': 'ANDROID;12;62;2.2.4;1.0;null;M2102J2SC',
                'X-REQUEST-ID': 'b3c002f1-12ce-4e3c-9043-c44f3e7c446d',
                'X-SIGNATURE': 'd2736dafdec2f6f7aac2d90a74e8d87564298dff422744c142726f07644ab06e',
                'Host': 'passport.tmuyun.com',
                'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8'
            },
            form: {
                client_id: '62',
                password: encodeURIComponent(encryptedPwd),
                phone_number: this.phone,
            }
        }
        console.log(options)
        let resp = await $.request(options)
        console.log(resp)
        if (resp.code == 0) {
            // $.log(`${this.idx}: ${options.fn} -- ${resp.data.rst.nick_name} 🎉, 手机号: ${$.phoneNum(resp.data.rst.mobile)}, 积分 ${resp.data.rst.total_integral}, 等级 ${resp.data.rst.grade}--${resp.data.rst.grade_name}`, { notify: true })
            // this.ckFlog = true
            // await $.wait(2)
        } else console.log(`${options.fn}: 失败,  ${JSON.stringify(resp)}`), this.ckFlog = false

    }


    // https://vapp.tmuyun.com/api/user_mumber/account_detail
    async user_info() { // 用户信息
        let qs = '/api/user_mumber/account_detail'
        let options = {
            fn: '用户信息',
            method: 'get',
            url: `https://vapp.tmuyun.com${qs}`,
            headers: await this.get_hd(qs),
        }
        // console.log(options)
        let resp = await $.request(options)
        // console.log(resp)
        if (resp.code == 0) {
            $.log(`${this.idx}: ${options.fn} -- ${resp.data.rst.nick_name} 🎉, 手机号: ${$.phoneNum(resp.data.rst.mobile)}, 积分 ${resp.data.rst.total_integral}, 等级 ${resp.data.rst.grade}--${resp.data.rst.grade_name}`, { notify: true })
            this.ckFlog = true
            await $.wait(2)
        } else console.log(`${options.fn}: 失败,  ${JSON.stringify(resp)}`), this.ckFlog = false

    }

    async tasklist() { // 任务列表
        let qs = '/api/user_mumber/numberCenter'
        let options = {
            fn: '任务列表',
            method: 'get',
            url: `https://vapp.tmuyun.com${qs}`,
            headers: await this.get_hd(qs),
        }
        // console.log(options)
        let resp = await $.request(options)
        // console.log(resp)
        if (resp.code == 0) {
            let taskArr = resp.data.rst.user_task_list
            // console.log(taskArr)
            for (const task of taskArr) {
                // console.log(task)
                let { id, name, finish_times, frequency, completed } = task
                let num = frequency - finish_times
                if (completed == 0) {
                    switch (name) {
                        case '每日签到':
                            await this.doSign()
                            break

                        case '新闻资讯阅读':
                            for (let i = 0; i < num; i++) {
                                await this.read()
                            }
                            break


                        case '新闻资讯评论':
                            for (let i = 0; i < num; i++) {
                                await this.com()
                            }
                            break


                        case '新闻资讯点赞':
                            for (let i = 0; i < num; i++) {
                                await this.like()
                            }
                            break

                        case '分享资讯给好友':
                            for (let i = 0; i < num; i++) {
                                await this.share(3)
                            }
                            break

                        default:
                            break
                    }
                } else {
                    $.log(`${this.idx}: ${name} -- 已完成`)
                }

            }

        } else console.log(`${options.fn}: 失败,  ${JSON.stringify(resp)}`)

    }



    async doSign() { // 签到 
        let qs = '/api/user_mumber/sign'
        let options = {
            fn: '签到',
            method: 'get',
            url: `https://vapp.tmuyun.com${qs}}`,
            headers: this.hd,
        }
        // console.log(options)
        let resp = await $.request(options)
        // console.log(resp)
        if (resp.code == 0) {
            $.log(`${this.idx}: ${options.fn}, ${resp.data.reason}, 获得积分 ${resp.data.signExperience}`)
            await $.wait(1)
        } else console.log(`${options.fn}: 失败,  ${JSON.stringify(resp)}`)
    }


    // https://vapp.tmuyun.com/api/article/detail?id=3085852
    async read() { // 阅读文章 
        await this.get_id()
        let qs = '/api/article/detail'
        let options = {
            fn: '阅读文章',
            method: 'get',
            url: `https://vapp.tmuyun.com${qs}?id=${this.id}`,
            headers: await this.get_hd(qs),
        }
        // console.log(options)
        let resp = await $.request(options)
        // console.log(resp)
        if (resp.code == 0) {
            $.log(`${this.idx}: ${options.fn}: ${resp.data.article.list_title}`)
            await $.wait($.randomInt(3, 7))
        } else console.log(`${options.fn}: ${this.artId} 失败,  ${JSON.stringify(resp)}`)
    }


    // https://vapp.tmuyun.com/api/comment/create
    async com() { // 评论文章 
        await this.get_id()
        let text = encodeURIComponent(this.get_text())
        let qs = '/api/comment/create'
        let options = {
            fn: '评论文章',
            method: 'post',
            url: `https://vapp.tmuyun.com${qs}`,
            headers: await this.get_hd(qs),
            form: {
                channel_article_id: this.id,
                content: text
            }
        }
        // console.log(options)
        let resp = await $.request(options)
        // console.log(resp)
        if (resp.code == 0) {
            $.log(`${this.idx}: ${options.fn}: ok`)
            await $.wait($.randomInt(3, 5))
        } else if (resp.code == 10410) {
            $.log(`${this.idx}: ${options.fn}: ${resp.message}, 自动换一篇`)
            await this.com()
        } else console.log(`${options.fn}: ${this.artId} 失败,  ${JSON.stringify(resp)}`)
    }

    // https://vapp.tmuyun.com/api/favorite/like
    async like() { // 点赞文章 
        await this.get_id()
        let qs = '/api/favorite/like'
        let options = {
            fn: '点赞文章',
            method: 'post',
            url: `https://vapp.tmuyun.com${qs}`,
            headers: await this.get_hd(qs),
            form: {
                action: true,
                id: this.id
            }
        }
        // console.log(options)
        let resp = await $.request(options)
        // console.log(resp)
        if (resp.code == 0) {
            $.log(`${this.idx}: ${options.fn}: ok`)
            await $.wait($.randomInt(3, 5))
        } else console.log(`${options.fn}: ${this.artId} 失败,  ${JSON.stringify(resp)}`)
    }


    async share(task_type) { // 分享文章 
        let qs = '/api/user_mumber/doTask'
        let options = {
            fn: '分享文章',
            method: 'post',
            url: `https://vapp.tmuyun.com${qs}`,
            headers: await this.get_hd(qs),
            form: {
                memberType: task_type,
                member_type: task_type
            }
        }
        // console.log(options)
        let resp = await $.request(options)
        // console.log(resp)
        if (resp.code == 0) {
            $.log(`${this.idx}: ${options.fn}: ok`)
            await $.wait($.randomInt(3, 5))
        } else console.log(`${options.fn}: ${this.artId} 失败,  ${JSON.stringify(resp)}`)
    }





    // https://vapp.tmuyun.com/api/article/channel_list?channel_id=606566eaad61a43e7054b600&isDiFangHao=false&is_new=true&list_count=0&size=10
    async get_id() { // 获取文章id 
        this.id = ''
        let qs = '/api/article/channel_list'
        let options = {
            fn: '用户信息',
            method: 'get',
            url: `https://vapp.tmuyun.com${qs}?channel_id=606566eaad61a43e7054b600&isDiFangHao=false&is_new=true&list_count=0&size=20`,
            headers: await this.get_hd(qs),
        }
        // console.log(options)
        let resp = await $.request(options)
        // console.log(resp)
        if (resp.code == 0) {
            let lists = resp.data.article_list
            let ran_n = $.randomInt(8, lists.length)
            this.id = lists[ran_n].id
        } else console.log(`${options.fn}: 失败,  ${JSON.stringify(resp)}`)
    }

    async get_text() { // 获取评论 
        let add_comment_text_arr = ['66666', '越来越好了', '安全第一', '赞赞赞', '加油加油']
        let ranNum = $.randomInt(1, add_comment_text_arr.length)
        let text = add_comment_text_arr[ranNum]
        return text
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



    async get_hd(data) {
        let headers = {
            'X-SESSION-ID': this.session,
            'X-REQUEST-ID': this.reqId,
            'X-TIMESTAMP': this.ts,
            'X-SIGNATURE': await this.get_sign(data, this.ts, this.reqId),
            'X-TENANT-ID': '44',
            'Host': 'vapp.tmuyun.com',
            'User-Agent': `2.2.4;00000000-6641-8460-ffff-${$.randomString(12)};Xiaomi M2102J2SC;Android;12;Release`
        }
        // console.log(headers)
        return headers
    }
    async get_hd2(data) {
        let headers = {
            'X-SESSION-ID': '6378302ab77d2e7e53d7da31',
            'X-REQUEST-ID': this.reqId,
            'X-TIMESTAMP': this.ts,
            'X-SIGNATURE': await this.get_sign2(data, this.ts, this.reqId),
            'Host': 'passport.tmuyun.com',
            'User-Agent': `ANDROID;12;62;2.2.4;1.0;null;M2102J2SC`
        }
        // console.log(headers)
        return headers
    }


    async get_sign(data, ts, reqId) {
        let a = `${data}&&${this.session}&&${reqId}&&${ts}&&${this.salt}&&44`
        // console.log(a)
        let sign = crypto.SHA256(a).toString()
        // console.log(sign)
        return sign
    }
    async get_sign2(data, ts, reqId) {
        let a = `${data}&&6378302ab77d2e7e53d7da31&&${reqId}&&${ts}&&${this.salt}&&44`
        // console.log(a)
        let sign = crypto.SHA256(a).toString()
        // console.log(sign)
        return sign
    }


    aesencrypt(data) {
        const publicKey = "-----BEGIN PUBLIC KEY-----MIGfMA0GCSqGSIb3DQEBAQUAA4GNADCBiQKBgQD6XO7e9YeAOs+cFqwa7ETJ+WXizPqQeXv68i5vqw9pFREsrqiBTRcg7wB0RIp3rJkDpaeVJLsZqYm5TW7FWx/iOiXFc+zCPvaKZric2dXCw27EvlH5rq+zwIPDAJHGAfnn1nmQH7wR3PCatEIb8pz5GFlTHMlluw4ZYmnOwg+thwIDAQAB-----END PUBLIC KEY-----"
        const nodersa = new NodeRSA(publicKey)
        nodersa.setOptions({ encryptionScheme: 'pkcs1' })
        const encrypted = nodersa.encrypt(data, 'base64')
        return encrypted
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