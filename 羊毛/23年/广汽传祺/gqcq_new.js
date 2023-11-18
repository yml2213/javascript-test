/*
广汽传祺 app             cron 22 8,12 * * *  gqcq.js

4-13     	完成签到 抽奖 分享 发帖 评论 任务   有bug及时反馈
4-14     	修复已知bug  恢复正常使用
5-21     	更新通知,优化代码
6-10		更新模板,修改部分逻辑!
9-12        修复抽奖，增加签到宝箱开启
9-21        增加用户信息输出
9-22		修复开宝箱错误
9-28		修复删除帖子错误
9-29		增加了快递信息查询,不用来回看了
10-10		感谢 banxiaya 大佬修复
12.14       查询增加手机号
23/1/3      更换模版
23/11/18    更新大版本

-------------------  青龙-配置文件-复制区域  -------------------
# 广汽传祺
export gqcq=" token @ token "  

抓 https://next.gacmotor.com 的 token  （AT-xxxxxx）

多账号用 换行 或 @ 分割  
tg频道: https://t.me/yml2213_tg  
*/
const $ = Env('广汽传祺')
const { MD5 } = require('crypto-js')
const notify = require('./sendNotify')

const envSplitor = ['\n', '&', '@']     //支持多种分割，但要保证变量里不存在这个字符
const ckNames = ['gqcq']                //支持多变量
//====================================================================================================
let DEFAULT_RETRY = 2           // 默认重试次数

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
            // list.push(user.boxList())
            list.push(user.doLotteryInfo())

        }
    } await Promise.all(list)

    $.log('积分查询', { sp: true, console: false })
    list = []
    for (let user of $.userList) {
        if (user.ckFlog) {
            list.push(user.points())
        }
    } await Promise.all(list)


}



class UserClass {
    constructor(ck) {
        this.idx = `账号[${++$.userIdx}]`
        this.ckFlog = true
        this.token = ck
        this.ts = $.ts(13)
        this.version = '5.0.18'
        this.reqNonc = $.randomInt(100000, 999999)

        this.ua = `Mozilla/5.0 (iPhone; CPU iPhone OS 17_1_1 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Mobile/15E148 AliApp(GACClient/${this.version}) WindVane/8.6.1 StatusBarHeight/47 BottomBarHeight/34 Channel/GACClient 1170x2532 Winding(WV_14) WK`

        this.cq_headers = {
            'imsi': '',
            'verification': 'signature',
            'deviceType': 'iPhone 13 Pro',
            'platformNo': 'iOS',
            'deviceCode': 'c24f87f3728cf8f4e9a62ef8eec406cdc6e0458a',
            'channel': 'App Store',
            'imei': '794C79D0-5206-4BEE-A026-9D2ED855DFF0',
            'reqTs': this.ts,
            'version': this.version,
            'deviceId': '1a1018970a4f6e410cf',
            'deviceModel': 'iPhone 13 Pro',
            'reqSign': this.getSign(this.ts, this.reqNonc),
            'reqNonc': this.reqNonc,
            'osVersion': '17.1.1',
            'apptoken': this.token,
            'registrationID': '1a1018970a4f6e410cf',
        }
        this.cq_headers2 = {
            'deviceId': '160a3797c8e5a391c64',
            'dealerapptoken': '',
            'token': this.token,
            'apptoken': this.token,
            'X-Requested-With': 'com.cloudy.component',
            'User-Agent': this.ua,
            'content-type': 'application/x-www-form-urlencoded'
        }
    }



    async userInfo() {
        let options = {
            fn: 'userInfo',
            method: 'post',
            url: 'https://next.gacmotor.com/app/app-api/user/getLoginUser',
            headers: this.cq_headers,
            form: {
                'https://next.gacmotor.com/app/app-api/user/getLoginUser': ''
            }
        }
        // console.log(options)
        let resp = await $.request(options)
        // console.log(resp)
        if (resp.resultCode == 0) {
            $.log(`${this.idx}: 欢迎用户: ${resp.data.nickname}, 手机号：${resp.data.mobile}`)
            this.nickname = resp.data.nickname
            this.ckFlog = true
        } else console.log(`${options.fn}: 失败, ${resp}`), this.ckFlog = false

    }

    // https://next.gacmotor.com/app/community-api/user/mission/getUserMissionList?place=1
    async taskList() {
        let options = {
            fn: 'taskList',
            method: 'get',
            url: 'https://next.gacmotor.com/app/community-api/user/mission/getUserMissionList?place=1',
            headers: this.cq_headers,


        }
        // console.log(options)
        let resp = await $.request(options)
        // console.log(resp)
        if (resp.resultCode == 0) {
            let tasks = resp.data
            for (let index = 0; index < tasks.length; index++) {
                const element = tasks[index]

                let itemType = element.itemType
                switch (itemType) {
                    case 0:
                        if (element.finishedNum == 0) {
                            $.log(`${this.idx}: ${this.nickname}, 未签到，去执行签到 ,顺便抽个奖`)
                            await this.signIn()
                            // await this.doLottery()
                        } else if (element.finishedNum == 1) {
                            $.log(`${this.idx}: ${this.nickname}, 今天已经签到过了鸭，明天再来吧！`)
                        }
                        break

                    case 1:
                        if (element.finishedNum < element.total) {
                            let num = element.total - element.finishedNum
                            for (let index = 0; index < num; index++) {
                                await this.postTopic()
                            }
                        } else if (element.finishedNum == 2) {
                            $.log(`${this.idx}: ${this.nickname}, 今天已经发帖了，明天再来吧!`)
                        }
                        break

                    case 3:
                        if (element.finishedNum < element.total) {
                            let num = element.total - element.finishedNum
                            for (let index = 0; index < num; index++) {
                                await this.share()
                            }
                        } else if (element.finishedNum == 2) {
                            $.log(`${this.idx}: ${this.nickname}, 今天已经分享过了鸭，明天再来吧!`)
                        }
                        break


                    default:
                        break
                }
            }

        } else console.log(`${options.fn}: 失败, ${resp}`)

    }

    // https://next.gacmotor.com/app/activity/shopDraw/getchances?activityCode=shop-draw
    async doLotteryInfo() {
        let options = {
            fn: 'doLotteryInfo',
            method: 'get',
            url: `https://next.gacmotor.com/app/activity/shopDraw/getchances?activityCode=shop-draw`,
            headers: this.cq_headers2,

        }
        // console.log(options)
        let resp = await $.request(options)
        // console.(resp)
        if (resp.resultCode == 0) {
            $.log(`${this.idx}: ${this.nickname}, 抽奖次数: ${resp.data}`)
            for (let i = 0; i < resp.data; i++) {
                await this.doLottery()
            }
        } else console.log(`${options.fn}: 失败, ${resp}`)

    }


    // https://next.gacmotor.com/app/activity/shopDraw/luckyDraw
    async doLottery() {
        let options = {
            fn: 'doLottery',
            method: 'post',
            url: 'https://next.gacmotor.com/app/activity/shopDraw/luckyDraw',
            headers: this.cq_headers,
            form: { "activityCode": "shop-draw", "repeatcheck": true }
        }
        // console.log(options)
        let resp = await $.request(options)
        // console.log(resp)
        if (resp.resultCode == 0) {
            $.log(`${this.idx}: ${this.nickname}, 抽奖:${resp.resultMsg} ,恭喜你获得 ${resp.data.medalName} 奖品为 ${resp.data.medalDescription}`)
            await $.wait(3)
        } else console.log(`${options.fn}: 失败, ${resp}`)

    }

    // 签到 
    async signIn() {
        let options = {
            fn: 'signIn',
            method: 'get',
            url: 'https://next.gacmotor.com/app/app-api/sign/submit',
            headers: this.cq_headers,
        }
        // console.log(options)
        let resp = await $.request(options)
        // console.log(resp)
        if (resp.resultCode == 0) {
            $.log(`${this.idx}: ${this.nickname}, ${resp.resultMsg} ,你已经连续签到 ${resp.data.dayCount} 天 ,签到获得G豆 ${resp.data.operationValue} 个`)
        } else if (resp.resultCode == 200015) {
            $.log(`${this.idx}: ${this.nickname}, ${resp.resultMsg}`)
        } else console.log(`${options.fn}: 失败, ${resp}`)
    }

    // 积分查询
    async points() {
        let out_p = await this.out_points()
        let options = {
            fn: 'points',
            method: 'get',
            url: 'https://next.gacmotor.com/app/app-api/user/getUserGdou',
            headers: {
                'apptoken': this.token,
                'dealerapptoken': '',
                'token': this.token,
                'deviceId': '1a1018970a4f6e410cf',
                'User-Agent': this.ua,
                'Content-Type': 'application/json'
            }
        }
        // console.log(options)
        let resp = await $.request(options)
        // console.log(resp)
        if (resp.resultCode == 0) {
            $.log(`${this.idx}: ${this.nickname}, 积分查询:您当前有 ${resp.data} 积分, ${out_p}`, { notify: true })
        } else console.log(`${options.fn}: 失败, ${resp}`)
    }

    // 过期积分查询  https://next.gacmotor.com/app/app-api/user/willOutGdou
    async out_points() {
        let options = {
            fn: 'out_points',
            method: 'get',
            url: 'https://next.gacmotor.com/app/app-api/user/willOutGdou',
            headers: this.cq_headers2
        }
        // console.log(options)
        let resp = await $.request(options)
        // console.log(resp)
        if (resp.data !== null) {
            return resp.data
        } else return '没有即将过期的 G豆'

    }


   



    // 发布帖子  https://next.gacmotor.com/app/community-api/community/api/post/appsavepost
    async postTopic() {
        let options = {
            fn: 'postTopic',
            method: 'post',
            url: 'https://next.gacmotor.com/app/community-api/community/api/post/appsavepost',
            headers: this.cq_headers,
            json: { "contentWords": "传祺的车非常好鸭   强烈推荐", "channelInfoId": "", "contentImgNums": "1", "coverImg": "https:\/\/pic-gsp.gacmotor.com\/app\/b591bc18-a467-4720-9203-c68cd4c38c2e_TM.jpg", "customCover": "https:\/\/pic-gsp.gacmotor.com\/app\/b1437982-6eef-48f1-bf9f-aa7613a1efeb_T.jpg", "postType": "2", "topicId": "", "columnId": "", "postContent": "[{\"text\":\"传祺的车非常好鸭   强烈推荐\"}]" }


        }
        // console.log(options)
        let resp = await $.request(options)
        // console.log(resp)
        if (resp.resultCode == 0) {
            $.log(`${this.idx}: ${this.nickname},发布帖子:${resp.resultMsg} ,帖子ID: ${resp.data.postId}`)
            this.topic_id = resp.data.postId
            await $.wait(10)
            await this.addComment()
        } else console.log(`${options.fn}: 失败, ${resp}`)

    }

    // 评论帖子
    async addComment() {
        let options = {
            fn: 'addComment',
            method: 'post',
            url: 'https://next.gacmotor.com/app/community-api/community/api/comment/add',
            headers: this.cq_headers,
            json: {
                "commentType": 0,
                "postId": this.topic_id,
                "commentContent": this.getCommentText(),
                "isReplyComment": 1,
                "commentImg": ""
            }
        }
        // console.log(options)
        let resp = await $.request(options)
        // console.log(resp)
        if (resp.resultCode == 0) {
            $.log(`${this.idx}: ${this.nickname}, 评论帖子: 评论 ${this.topic_id} 帖子 ${resp.resultMsg}`)
            await $.wait(2)
            await this.deleteTopic('删除帖子')
        } else console.log(`${options.fn}: 失败, ${resp}`)

    }

    // 删除帖子
    async deleteTopic() {
        let options = {
            fn: 'deleteTopic',
            method: 'post',
            url: `https://next.gacmotor.com/app/community-api/community/api/post/delete`,
            headers: this.cq_headers,
            json: {
                'postId': `${this.topic_id}`,
            }
        }
        // console.log(options)
        let resp = await $.request(options)
        // console.(resp)
        if (resp.resultCode == 0) {
            $.log(`${this.idx}: ${this.nickname},  删除帖子: 帖子ID: ${this.topic_id} , 执行删除 ${resp.resultMsg}`)
            await $.wait(2)
        } else console.log(`${options.fn}: 失败, ${resp}`)

    }

    // 分享文章
    async share() {
        this.postId = ''
        await this.ArticleList()
        let options = {
            fn: 'share',
            method: 'post',
            url: `https://next.gacmotor.com/app/community-api/community/api/post/forward`,
            headers: {
                'apptoken': this.token,
                'dealerapptoken': '',
                'token': this.token,
                'deviceId': '1a1018970a4f6e410cf',
                'User-Agent': this.ua,
                'Content-Type': 'application/json'
            },
            json: {
                'postId': this.postId,
            }
        }
        // console.log(options)
        let resp = await $.request(options)
        // console.log(resp)
        if (resp.resultCode == 0) {
            $.log(`${this.idx}: ${this.nickname}, 分享文章:${resp.resultMsg}`)
            await $.wait(2)
        } else console.log(`${options.fn}: 失败, ${resp}`)

    }

    // 文章列表
    async ArticleList() {
        let options = {
            fn: 'ArticleList',
            method: 'get',
            url: `https://next.gacmotor.com/app/community-api/community/api/post/applatestlist?pageNum=1&pageSize=20`,
            headers: this.cq_headers,

        }
        // console.log(options)
        let resp = await $.request(options)
        // console.log(resp)
        if (resp.resultCode == 0) {
            let num = $.randomInt(1, 19)

            $.log(`${this.idx}: ${this.nickname},  分享的文章: ${resp.data.list[num].contentTitle}  文章ID:${resp.data.list[num].itemId}`)
            this.postId = resp.data.list[num].itemId

        } else console.log(`${options.fn}: 失败, ${resp}`)

    }

    getSign(ts, reqNonc) {
        let salt = '17aaf8118ffb270b766c6d6774317a13'
        // console.log(`signature${reqNonc}${ts}${salt}`)
        let sign = MD5(`signature${reqNonc}${ts}${salt}${this.version}`).toString()
        return sign
    }

    getText() {
        let textarr = ['最简单的提高观赏性的办法就是把地球故事的部分剪辑掉半小时， emo的部分剪辑掉半小时。这样剩下的90分钟我们就看看外星人，看看月球，看看灾难片大场面就不错。', '顶着叛国罪的风险无比坚信前妻，这种还会离婚？', '你以为它是灾难片，其实它是科幻片；你以为它是科幻片，其实它是恐怖片；你以为它是恐怖片，其实它是科教片', '我的天，剧情真的好阴谋论，但是还算是能自圆其说', '大杂烩啊……我能理解这电影为什么在海外卖的不好了，因为核心创意真的已经太老套了', '一开始我以为这就是外国人看《流浪地球》时的感受啊，后来发现这不是我当初看《胜利号》的感受么']
        let ranNum = $.randomInt(1, textarr.length)
        let text = textarr[ranNum]
        return text
    }
    getCommentText() {
        let add_comment_text_arr = ['感谢推荐的电影呢', '有时间一定看看这个电影怎么样', '晚上就去看', '66666666666', '这部电影我看过，非常好看']
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