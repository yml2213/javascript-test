/*
红豆免费小说 app             cron 22 8,12 * * *  hdmfxs.js


23/1/30      基本任务

-------------------  青龙-配置文件-复制区域  -------------------
# 红豆免费小说
export hdmfxs=" token  @  token  "  

抓 capi.wewillpro.com 的 token 

多账号用 换行 或 @ 分割  
tg频道: https://t.me/yml2213_tg  
*/
const $ = Env('红豆免费小说')
const notify = require('./sendNotify')

const envSplitor = ['\n', '&', '@']     //支持多种分割，但要保证变量里不存在这个字符
const ckNames = ['hdmfxs']                //支持多变量
//====================================================================================================
let DEFAULT_RETRY = 1           // 默认重试次数
let cashnum = '20000'           //2元 自定义修改
let maxDrawNum = '100'          //默认最大抽奖次数
//====================================================================================================






async function userTasks() {

    $.log('用户信息', { sp: true, console: false })  // 带分割的打印
    list = []
    for (let user of $.userList) {
        list.push(user.userInfo())
    } await Promise.all(list)

    $.log('上传步数', { sp: true, console: false })
    list = []
    for (let user of $.userList) {
        if (user.ckFlog) {
            list.push(user.uploadstep())  // 上传步数 
        }
    } await Promise.all(list)

    $.log('任务列表', { sp: true, console: false })
    list = []
    for (let user of $.userList) {
        if (user.ckFlog) {
            list.push(user.tasklist())
            list.push(user.signTask())
        }
    } await Promise.all(list)

    $.log('抽奖', { sp: true, console: false })
    list = []
    for (let user of $.userList) {
        if (user.ckFlog) {
            list.push(user.drawTask())
        }
    } await Promise.all(list)

    $.log('钱包查询', { sp: true, console: false })
    list = []
    for (let user of $.userList) {
        if (user.ckFlog) {
            list.push(user.wallet())
        }
    } await Promise.all(list)


}


class UserClass {
    constructor(ck) {
        this.idx = `账号[${++$.userIdx}]`
        this.ckFlog = true
        this.token = ck
        this.ranNum = $.randomInt(5, 10)
        this.hd = {
            'appversion': '3.0.3',
            'brand': 'Xiaomi',
        }

    }

    async userInfo() {
        await this.getMoney()
        let options = {
            fn: 'userInfo',
            method: 'post',
            url: `https://capi.wewillpro.com/wallet/myWallet`,
            headers: this.hd,
            form: {
                'token': this.token,
            }
        }
        // console.log(options)
        let resp = await $.request(options)
        // console.log(resp)
        if (resp.code == 200) {
            let tasks = resp.data
            for (const task of tasks) {
                if (task.type == 'gold') this.wxnickname = task.wxnickname
                if (task.type == 'integral') this.holding_amount = task.holding_amount

            }
            $.log(`${this.idx}: ${this.wxnickname}, 余额≈≈${this.gold_money}元, 积分${this.holding_amount}`, { notify: true })
        } else console.log(`${options.fn}: 失败, ${resp} `)

    }

    async uploadstep() { // 上传步数 
        let ranNum = $.randomInt(10000, 20000)
        let options = {
            fn: 'uploadstep',
            method: 'post',
            url: `https://capi.wewillpro.com/sport/addSportRecord`,
            headers: {
                'appversion': '3.0.3',
                'brand': 'Xiaomi',
                'content-type': 'application/x-www-form-urlencoded'
            },
            form: {
                'step_count': ranNum,
                'token': this.token,
                'brand': 'Xiaomi'
            }
        }
        // console.log(options)
        let resp = await $.request(options)
        // console.log(resp)
        if (resp.code == 200) {
            $.log(`${this.idx}: 上传${ranNum}步: ${resp.msg}`)
        } else console.log(`${options.fn}: 失败, ${resp} `)

    }

    // 任务列表  finish_status 0-未完成  1-完成
    async tasklist() {
        let options = {
            fn: 'tasklist',
            method: 'post',
            url: `https://capi.wewillpro.com/task/getTodayTaskList`,
            headers: this.hd,
            form: { 'token': this.token }
        }
        // console.log(options)
        let resp = await $.request(options)
        // console.log(resp)
        if (resp.code == 200 && resp.data) { // finish_status 0-未完成  1-完成
            // console.log(resp.data)
            // console.log(resp.data.length)
            let tasks = resp.data
            for (const task of tasks) {
                // console.log(task)
                let { id, task_id, task_description, finish_status } = task
                if (!finish_status) {
                    $.log(`${this.idx}: ${task_description} 未完成`)
                    // await this.reward(id, task_id, task_description)
                } else {
                    $.log(`${this.idx}: ${task_description} 已完成`)
                    await this.reward(id, task_id, task_description)
                }
            }
            // this.taskId = resp.data
            // $.log(`${this.idx}: ${resp.info}, 当前任务id:${this.taskId}`)
            // await $.wait(this.ranNum)
            // await this.getOrder()
        } else if (resp.data == '') {
            this.taskId = resp.data
            $.log(`${this.idx}: ${resp.msg}`)
        } else console.log(`${options.fn}: 失败, ${resp}`)

    }

    async reward(id, task_id, task_description) { // 领取奖励
        let options = {
            fn: 'reward',
            method: 'post',
            url: `https://capi.wewillpro.com/task/pickTaskReward`,
            headers: this.hd,
            form: {
                'id': id,
                'task_id': task_id,
                'token': this.token
            }
        }
        // console.log(options)
        let resp = await $.request(options)
        // console.log(resp)
        if (resp.code == 200 && resp.data) { // finish_status 0-未完成  1-完成
            $.log(`${this.idx}: 领取 ${task_description} ${resp.msg}, 获得 ${resp.data.gold} 金币, 当前 ${resp.data.gold_count} 金币≈≈${resp.data.gold_money}元`)
            await $.wait($.randomInt(5, 10))
        } else if (resp.code == 1000) {
            $.log(`${this.idx}: ${resp.msg}`)
        } else console.log(`${options.fn}: 失败, ${resp}`)

    }



    async drawTask() { // 抽奖相关
        let options = {
            fn: 'drawTask',
            method: 'get',
            url: `https://capi.wewillpro.com/wheel/get_user_status?token=${this.token}`,
            headers: this.hd,
        }
        // console.log(options)
        let resp = await $.request(options)
        // console.log(resp)
        if (resp.code == 200 && resp.data) {
            let num = resp.data.user_daily_draw_remains
            let num_r = num < this.holding_amount ? num : this.holding_amount
            num_r = num_r < maxDrawNum ? num_r : maxDrawNum
            $.log(`${this.idx}: 您当前 抽奖次数 ${num} 次, 积分${this.holding_amount}, 最大限制次数为 ${maxDrawNum} 次, 您本次实际抽奖次数为 ${num_r} 次`)
            if (num > 100) {
                for (let index = 0; index < num_r; index++) {
                    await this.draw()
                    if (this.drawFlog) break
                }
            } else {
                await this.drawNum()
                await this.drawTask()
            }

            let { user_brs_adt_5_info, user_brs_adt_10_info, user_brs_adt_20_info } = resp.data
            if (user_brs_adt_5_info == '0') await this.draw_ew(5)
            if (user_brs_adt_10_info == '0') await this.draw_ew(10)
            if (user_brs_adt_20_info == '0') await this.draw_ew(20)

        } else console.log(`${options.fn}: 失败, ${resp}`)
    }

    async drawNum() { // 刷抽奖次数
        let ranNum = $.randomInt(100, 200)
        let options = {
            fn: 'drawNum',
            method: 'post',
            url: `https://capi.wewillpro.com/wheel/view_ad_complete`,
            headers: {
                'pragma': 'no-cache',
                'x-requested-with': 'com.ruidonghy.will',
                'content-type': 'application/x-www-form-urlencoded;charset=UTF-8'
            },
            form: {
                'token': this.token,
                'award_type': 'draw',
                'award_amount': ranNum,
                'multi': '1'
            }
        }
        // console.log(options)
        let resp = await $.request(options)
        // console.log(resp)
        if (resp.code == 200) {
            $.log(`${this.idx}: 增加${ranNum}次抽奖: ${resp.msg}`)
        } else console.log(`${options.fn}: 失败, ${resp} `)

    }

    async draw() { // 抽奖红包
        let options = {
            fn: 'draw',
            method: 'post',
            url: `https://capi.wewillpro.com/wheel/make_draw`,
            headers: this.hd,
            form: {
                'token': this.token,
            }
        }
        // console.log(options)
        let resp = await $.request(options)
        // console.log(resp)
        if (resp.code == 200 && resp.data) {
            let { award_multi_num, award_amount, award_type } = resp.data
            $.log(`${this.idx}: 抽奖 ${resp.msg}, 类型 ${resp.data.award_type}, 数量 ${award_amount}, id ${award_multi_num}`)
            await $.wait($.randomInt(3, 5))
            await this.draw_fb(award_multi_num, award_amount, award_type)
        } else if (resp.code == 1000) {
            $.log(`${this.idx}: ${resp.msg}`)
        } else console.log(`${options.fn}: 失败, ${resp}`)

    }

    async draw_ew(id) { // 抽奖额外奖励
        let options = {
            fn: 'draw',
            method: 'post',
            url: `https://capi.wewillpro.com/wheel/view_ad_complete`,
            headers: {
                'pragma': 'no-cache',
                'x-requested-with': 'com.ruidonghy.will',
                'content-type': 'application/x-www-form-urlencoded;charset=UTF-8'
            },
            form: {
                'token': this.token,
                'award_type': 'gold',
                'award_amount': '0',
                'multi': '0',
                'draw_times': id
            }
        }
        // console.log(options)
        let resp = await $.request(options)
        // console.log(resp)
        if (resp.code == 200 && resp.data) {
            $.log(`${this.idx}:  抽奖额外奖励 ${resp.msg}, 获得金币 ${resp.data.num}`)
            await $.wait($.randomInt(20, 30))
        } else if (resp.code == 1000) {
            $.log(`${this.idx}: ${resp.msg}`)
        } else console.log(`${options.fn}: 失败, ${resp}`)

    }

    async draw_fb(award_multi_num, award_amount, award_type) { // 抽奖翻倍
        let options = {
            fn: 'draw_fb',
            method: 'post',
            url: `https://capi.wewillpro.com/wheel/view_ad_complete`,
            headers: this.hd,
            form: {
                'token': this.token,
                'award_type': award_type,
                'award_amount': award_amount,
                'multi': award_multi_num,
            }
        }
        // console.log(options)
        let resp = await $.request(options)
        // console.log(resp)
        if (resp.code == 200 && resp.data) {
            $.log(`${this.idx}: 抽奖翻倍 ${resp.msg}, 获得 ${resp.data.num} 金币`)
            await $.wait($.randomInt(10, 20))
        } else if (resp.code == 1000) {
            $.log(`${this.idx}: ${resp.msg}`)
            await $.wait($.randomInt(3, 5))
        } else console.log(`${options.fn}: 失败, ${resp}`)

    }

    async signTask() { // 签到相关
        let options = {
            fn: 'signTask',
            method: 'get',
            url: `https://capi.wewillpro.com/gold/get_gold_info?token=${this.token}`,
            headers: this.hd,
        }
        // console.log(options)
        let resp = await $.request(options)
        // console.log(resp)
        if (resp.code == 200 && resp.data) {

            let tasks = resp.data.sign_task_list
            // is_receive -1 未领取  2-已领取 
            // adv_status - 1 正常翻倍  2 - 大额 不能翻倍
            for (const task of tasks) {
                // console.log(task)
                let { is_receive, id, adv_status } = task
                if (is_receive == 1) {
                    $.log(`${this.idx}: 签到 ${id} -- 未完成`)
                    await this.signvideo(id, adv_status)
                } else {
                    $.log(`${this.idx}: 签到 ${id} -- 已完成`)
                }
            }

        } else console.log(`${options.fn}: 失败, ${resp}`)

    }
    async signvideo(id, adv_status) { // 签到 is_adv-2
        let options = {
            fn: 'signvideo',
            method: 'post',
            url: `https://capi.wewillpro.com/gold/user_gold_sign`,
            headers: this.hd,
            form: {
                'id': id,
                'token': this.token,
                'is_adv': '2'
            }
        }
        // console.log(options)
        let resp = await $.request(options)
        // console.log(resp)
        if (resp.code == 200 && resp.data) {
            $.log(`${this.idx}: 签到 ${id} ${resp.msg}, 获得 ${resp.data.num} 金币, 当前 ${resp.data.gold_num} 金币≈≈${resp.data.money_num}元`)
            await $.wait($.randomInt(20, 30))
            await this.signvideo_fb(id)
        } else if (resp.code == 1000) {
            $.log(`${this.idx}: ${id} -- ${resp.msg}`)
            await $.wait($.randomInt(10, 20))
        } else console.log(`${options.fn}: 失败, ${resp}`)

    }

    async signvideo_fb(id) { // 签到翻倍 is_adv-1
        let options = {
            fn: 'signvideo',
            method: 'post',
            url: `https://capi.wewillpro.com/gold/user_gold_sign`,
            headers: this.hd,
            form: {
                'id': id,
                'token': this.token,
                'is_adv': '1'
            }
        }
        // console.log(options)
        let resp = await $.request(options)
        // console.log(resp)
        if (resp.code == 200 && resp.data) {
            $.log(`${this.idx}: 签到翻倍 ${id} ${resp.msg}, 获得 ${resp.data.num} 金币, 当前 ${resp.data.gold_num} 金币≈≈${resp.data.money_num}元`)
            await $.wait($.randomInt(20, 30))
        } else if (resp.code == 1000) {
            $.log(`${this.idx}: ${id} -- ${resp.msg}`)
            await $.wait($.randomInt(10, 20))
        } else console.log(`${options.fn}: 失败, ${resp}`)

    }

    async getMoney() {
        let options = {
            fn: 'getMoney',
            method: 'get',
            url: `https://capi.wewillpro.com/user/get_member_integral_info?token=${this.token}`,
            headers: this.hd,
        }
        // console.log(options)
        let resp = await $.request(options)
        // console.log(resp)
        if (resp.code == 200) {
            this.gold_money = resp.data.gold_money
        } else console.log(`${options.fn}: 失败, ${resp} `)

    }

    async wallet() { // 钱包查询
        await this.getMoney()
        let options = {
            fn: 'wallet',
            method: 'post',
            url: `https://capi.wewillpro.com/wallet/myWallet`,
            headers: this.hd,
            form: {
                'token': this.token,
            }
        }
        // console.log(options)
        let resp = await $.request(options)
        // console.log(resp)
        if (resp.code == 200) {
            let tasks = resp.data
            for (const task of tasks) {
                if (task.type == 'gold') {
                    let { holding_amount, wxnickname } = task
                    this.wxnickname = wxnickname
                    $.log(`${this.idx}: ${this.wxnickname}, 余额≈≈${this.gold_money}元`, { notify: true })
                }

            }
            if (this.gold_money >= 2) {
                await this.chsh()
            } else $.log(`${this.idx}: ${this.wxnickname}, 小于 2 元,跳过提现!`, { notify: true })
        } else console.log(`${options.fn}: 失败, ${resp} `)

    }

    async chsh() { // 提现2元
        let options = {
            fn: 'chsh',
            method: 'post',
            url: `https://capi.wewillpro.com/balance/goldWithdrawal`,
            headers: this.hd,
            form: {
                'token': this.token,
                'num': cashnum,
            }
        }
        // console.log(options)
        let resp = await $.request(options)
        // console.log(resp)
        if (resp.code == 200) {
            $.log(`${this.idx}: 提现2元 ${resp.msg}, 提现时间:${resp.data.updated_at}`, { notify: true })
        } else console.log(`${options.fn}: 失败, ${resp} `)

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