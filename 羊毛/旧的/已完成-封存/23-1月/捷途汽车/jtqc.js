/*
捷途汽车 app             cron 22 8,12 * * *  jtqc.js


23/1/5      改 蛋佬 脚本

-------------------  青龙-配置文件-复制区域  -------------------
# 捷途汽车
export jtqc=" access_token @ access_token "  

抓 mobile-consumer.jetour.com.cn 的 access_token

多账号用 换行 或 @ 分割  
tg频道: https://t.me/yml2213_tg  
*/
const $ = Env('捷途汽车')
const notify = require('./sendNotify')

const envSplitor = ['\n', '&', '@']     //支持多种分割，但要保证变量里不存在这个字符
const ckNames = ['jtqc']                //支持多变量
//====================================================================================================
let DEFAULT_RETRY = 1           // 默认重试次数
//====================================================================================================


async function userTasks() {

    $.log('用户信息', { sp: true, console: false })  // 带分割的打印
    list = []
    for (let user of $.userList) {
        list.push(user.userInfo())
    } await Promise.all(list)

    $.log('任务列表', { sp: true, console: false })
    list = []
    // console.log(user.ckFlog)
    for (let user of $.userList) {
        if (user.ckFlog) {
            list.push(user.taskList())
        }
    } await Promise.all(list)

    // $.log('积分查询', { sp: true, console: false })
    // list = []
    // for (let user of $.userList) {
    //     if (user.ckFlog) {
    //         list.push(user.points())
    //     }
    // } await Promise.all(list)


}



class UserClass {
    constructor(ck) {
        this.idx = `账号[${++$.userIdx}]`
        this.ckFlog = true
        this.token = ck
        this.ts = $.ts(13)
        this.hd = {
            'x-requested-with': 'com.jetour.traveller',
            'content-type': 'application/json',
        }

    }

    async userInfo() {
        let options = {
            fn: 'userInfo',
            method: 'get',
            url: `https://mobile-consumer.jetour.com.cn/web/user/current/details?access_token=${this.token}&sceneCode=signInScene&jumpUrlType=4&terminal=3`,
            headers: { 'agent': 'android' }
        }
        // console.log(options)
        let resp = await $.request(options)
        // console.log(resp)
        if (resp.status == 200) {
            $.log(`${this.idx}:  欢迎用户:${$.phoneNum(resp.data.displayName)}, 积分 ${resp.data.payableBalance}`)
            this.ckFlog = true
        } else console.log(`${options.fn}: 失败, ${resp}`), this.ckFlog = false

    }

    // status 0 未完成  3 完成
    async taskList() {
        let options = {
            fn: 'taskList',
            method: 'get',
            url: `https://mobile-consumer.jetour.com.cn/web/taskCenter/task/userTaskDetails?access_token=${this.token}&type=2&terminal=4`,
            headers: this.hd,

        }
        // console.log(options)
        let resp = await $.request(options)
        // console.log(resp)
        if (resp.status == 200) {
            let tasks = resp.data
            for (let index = 0; index < tasks.length; index++) {
                const element = tasks[index]
                // console.log(element)

                let status = element.status
                if (!status) {
                    $.log(`${this.idx}: ${element.taskName}`)
                    switch (element.sort) {
                        case 1: // 签到
                            await this.signIn()
                            break
                        case 2: // 分享内容
                            await this.share()
                            break
                        case 3: // 浏览内容
                            await this.view()
                            break
                        default:
                            break
                    }
                } else $.log(`${this.idx}: ${element.taskName}, 已完成`)

            }

        } else console.log(`${options.fn}: 失败, ${resp}`)

    }


    async signIn() {
        let options = {
            fn: 'signIn',
            method: 'post',
            url: `https://mobile-consumer.jetour.com.cn/web/task/tasks/event-start?access_token=${this.token}`,
            headers: this.hd,
            json: { "eventCode": "SJ50001" }
        }
        // console.log(options)
        let resp = await $.request(options)
        // console.log(resp)
        if (resp.status == 200) {
            $.log(`${this.idx}: 已成功签到`)
        } else console.log(`${options.fn}: 失败, ${resp}`)

    }


    // 分享文章
    async share() {
        await this.ArticleList()
        let options = {
            fn: 'share',
            method: 'post',
            url: `https://mobile-consumer.jetour.com.cn/web/community/contents/sharing?access_token=${this.token}&terminal=3`,
            headers: {
                'agent': 'android',
                'content-type': 'application/json; charset=UTF-8'
            },
            json: { "contentId": this.cid, "contentType": "动态", "shareType": "微信好友", "terminal": 3 }
        }

        // console.log(options)
        let resp = await $.request(options)
        // console.log(resp)
        if (resp.status == 200) {
            $.log(`${this.idx}: 分享文章: ${resp.data}`)
            await $.wait(2)
        } else console.log(`${options.fn}: 失败, ${resp}`)

    }

    // 文章列表
    async ArticleList() {
        let sj = $.randomInt(1, 5)
        let options = {
            fn: 'ArticleList',
            method: 'get',
            url: `https://mobile-consumer.jetour.com.cn/web/community/contents/hot-content?pageNo=${sj}&pageSize=10&access_token=${this.token}&terminal=3`,
            headers: this.hd

        }
        // console.log(options)
        let resp = await $.request(options)
        // console.(resp)
        if (resp.status == 200) {
            this.cid = resp.data.data[sj].content2cVO.id
            this.cti = resp.data.data[sj].content2cVO.title
            this.id = resp.data.data[sj].content2cVO.authorId
            this.name = resp.data.data[sj].content2cVO.authorName
        } else console.log(`${options.fn}: 失败, ${resp}`)

    }




    // 浏览文章
    async view() {
        let options = {
            fn: 'view',
            method: 'post',
            url: `https://mobile-consumer.jetour.com.cn/web/event/event-instances?access_token=${this.token}&terminal=3`,
            headers: {
                'agent': 'android',
                'content-type': 'application/json; charset=UTF-8'
            },
            json: { "eventCode": "SJ50006", "properties": { "content_user_id": "1525575651666034688", "content_user_name": "捷小途", "content_id": "2971423508275775920", "content_title": "95后斜杠青年，电商圈里的“插画达人” ", "content_view_time": this.ts, "content_duration": 2 }, "terminal": 3 }
        }

        // console.log(options)
        let resp = await $.request(options)
        // console.log(resp)
        if (resp.status == 200) {
            $.log(`${this.idx}: 浏览文章: ${resp.message}`)
            await $.wait(2)
        } else console.log(`${options.fn}: 失败, ${resp}`)

    }



    getCommentText() {
        let add_comment_text_arr = ['捷途加油！捷途加油！捷途加油！捷途加油！捷途加油！捷途加油', '66666666', '非常好的车呀', '赞赞赞赞赞赞']
        let ranNum = $.randomInt(1, add_comment_text_arr.length)
        let text = add_comment_text_arr[ranNum]
        return text
    }


}


!(async () => {
    console.log(await $.yiyan())
    $.read_env(UserClass)

    await userTasks()

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
            if (body) try { body = JSON.parse(body) } catch { }
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