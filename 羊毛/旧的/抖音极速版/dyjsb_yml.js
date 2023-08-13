/*
抖音极速版 app

23/5/29    修改蛋姨脚本


-------------------  青龙-配置文件-复制区域  -------------------
# 抖音极速版
export dyjsb=" sessionid # 开宝箱url ?后的数据 # X-gorgon # X-khronos "  

多账号用 换行 或 @ 分割  

变量名: dyjsb
需要变量: sessionid#开宝箱url的？后面部分(搜treasure_task)#X-gorgon#X-khronos(可以直接用肥皂的)
所有任务每天分时段运行，建议定时: 8-22点，每 30 分钟一次


tg频道: https://t.me/yml2213_tg  
*/
const $ = Env('抖音极速版')
const notify = require('./sendNotify')
const crypto = require('crypto-js')

const envSplit = ['\n', '@']     //支持多种分割，但要保证变量里不存在这个字符
const ckNames = ['dyjsb', 'dyjsbck']                //支持多变量

//====================================================================================================
let hosts = ['api3-normal-c.amemv.com', 'api5-normal-c-lq.amemv.com', 'api5-normal-c-lf.amemv.com']

let box_num = 0
//====================================================================================================


class UserClass {
    constructor(ck) {
        this.idx = `账号[${++$.userIdx}]`
        this.ckFlog = true
        this.ck = ck.split('#')
        this.sessionid = this.ck[0]
        this.uu = this.ck[1]
        this.xg = this.ck[2]
        this.xt = this.ck[3]

        this.hd = {
            Cookie: "sessionid=" + this.sessionid,
            "User-Agent": "com.ss.android.ugc.aweme.lite/220901 (Linux; U; Android 10; zh_CN; 16s Pro; Build/QKQ1.191222.002; Cronet/TTNetVersion:6fe86402 2022-07-22 QuicVersion:47946d2a 2020-10-14)",
            "X-gorgon": this.xg,
            "X-khronos": this.xt
        }
        this.bd = `{"amount":"23","inspire_modal_add_modal_manage":false,"cat_treasure_reward":0,"ad_rit":"12317","ad_inspire":"{"score_amount":"23","amount":"3","req_id":"20230515001312E8A456218C2359F6CBB6"}","task_key":"excitation_ad_treasure_box","stage_score_amount":[],"ad_alias_position":"box","need_reward":true,"finish_action":0,"params_for_special":"luckydog_sdk","static_settings_version":49,"dynamic_settings_version":49,"poll_settings_version":0,"aggr_income_id":""}`

        this.h = $.ts('h')
        this.m = $.ts('m')

        this.version_code = '22909900'
        this.aid = '2329'
        this.device_type = 'M2102J2SC'
        this.os_api = '31'
    }

    async userTask() {
        console.log(`\n=============== ${this.idx} ===============`)

        $.log(`\n-------------- 随机host --------------`)
        this.host = await this.get_host()

        $.log(`\n-------------- 个人信息 --------------`)
        await this.userinfo()

        if (this.ckFlog) {
            $.log(`\n-------------- 任务列表 --------------`)
            await this.taskList()
            await this.timeTask()

            await this.openbox()        // 开宝箱
            await this.gjvideostar()        // 逛街任务


            // 下面的基本黑了
            // await this.viewvideo30()  // 刷视频 30 秒 
            // await this.shop15()     // 浏览商品15秒

        }


    }


    async timeTask() { // 其他时间触发任务

        if (this.h == 10 && this.m < 30 || this.h == 13 && this.m < 30 || this.h == 17 && this.m < 30 || this.h == 19 && this.m < 30 || this.h == 20 && this.m < 30) {
            await this.search()         // 搜索得金币
        }

        if (this.h == 8 && this.m < 30 || this.h == 9 && this.m < 30 || this.h == 10 && this.m < 30 || this.h == 11 && this.m < 30 || this.h == 12 && this.m < 30 || this.h == 13 && this.m < 30) {
            await this.comic()         // 漫画阅读

        }
        if (this.h == 20 && this.m < 30) {
            await this.upstep()         // 上传步数
        }


    }


    async get_host() { // 随机host
        let n = $.randomInt(0, hosts.length)
        if (hosts[n]) {
            $.log(`${this.idx}: 本次选用域名 [ ${hosts[n]} ]`)
            return hosts[n]
        } else {
            await this.get_host()
        }
    }

    async userinfo() { // 个人信息
        let options = {
            fn: '个人信息',
            method: 'get',
            url: `https://${this.host}/luckycat/aweme/v1/task/page?support_resource=1&aid=${this.aid}&version_code=${this.version_code}&device_platform=android&device_type=${this.device_type}&os_api=${this.os_api}&update_version_code=${this.version_code}`,
            headers: this.hd
        }
        // console.log(options)
        let resp = await $.request(options)
        // console.log(resp)
        if (resp.err_no == 0) {
            this.amount1 = resp.data.income_data.amount1
            this.amount2 = resp.data.income_data.amount2

            $.log(`${this.idx}: ${options.fn} 现有: ${this.amount1}金币, 现金余额: ${this.amount2 / 100} 元`, { notify: true })
            this.ckFlog = true
        } else console.log(`${options.fn}: 失败,  ${JSON.stringify(resp)}`), this.ckFlog = false


    }

    async taskList() { // 任务列表

        let options = {
            fn: '任务列表',
            method: 'get',
            url: `https://${this.host}/luckycat/aweme/v1/task/page?support_resource=1&aid=${this.aid}&version_code=${this.version_code}&device_platform=android&device_type=${this.device_type}&os_api=${this.os_api}&update_version_code=${this.version_code}`,
            headers: this.hd
        }
        // console.log(options)
        let resp = await $.request(options)
        // console.log(resp)
        if (resp.err_no == 0) {
            let tasks = resp.data.resource_list[0].resource_data.task_list
            // console.log(tasks)
            for (const task of tasks) {
                // console.log(tasks)

                let { task_id, completed } = task
                if (task_id == '203') { // 签到
                    if (completed) {
                        $.log(`${this.idx}: 今日已签到`)
                    } else {
                        $.log(`${this.idx}: 未签到, 去签到`)
                        await this.sign()
                        await this.shopsignin() // 商城签到
                    }
                } else if (task_id == 1095) { // 吃饭
                    if (completed == false) {
                        $.log(`${this.idx}: 吃饭领金币 未完成`)

                        await this.eat_task()

                    } else {
                        $.log(`${this.idx}: 吃饭领金币 完成`)
                    }
                }
            }
            // this.amount2 = resp.data.income_data.amount2

            // $.log(`${this.idx}: ${options.fn} 现有: ${this.amount1}金币, 现金余额: ${this.amount2 / 100} 元`)
            // this.ckFlog = true
        } else console.log(`${options.fn}: 失败,  ${JSON.stringify(resp)}`)


    }

    async eat_task() { // 吃饭 任务调度

        if (this.h == 8 && this.m < 30 || this.h == 11 && this.m >= 30 || this.h == 18 && this.m < 30 || this.h == 21 && this.m < 30) {
            await this.eatmeals() // 吃饭领金币 后面翻倍
        } else {
            $.log(`${this.idx}: 不在吃饭时间, 跳过`)
        }


    }

    async sign() { // 签到 
        let options = {
            fn: '签到',
            method: 'post',
            url: `https://${this.host}/luckycat/aweme/v1/task/done/sign_in?${this.uu}`,
            headers: this.hd,
            json: {}
        }
        // console.log(options)
        let resp = await $.request(options)
        // console.log(resp)
        if (resp.err_no == 0) {
            // console.log(resp)
            $.log(`${this.idx}: ${options.fn}, 获得金币 ${resp.data.amount}`)
            await $.wait(2)
            await this.signinvideo()
        } else if (resp.err_no == 10006) {
            $.log(`${this.idx}: ${options.fn} -- ${resp.err_tips}`)
        } else console.log(`${options.fn}: 失败,  ${JSON.stringify(resp)}`)

    }
    async shopsignin() { // 商城签到 
        let options = {
            fn: '商城签到',
            method: 'post',
            url: `https://${this.host}/aweme/lite/v1/ecom/newbie_channel/done_bubble_task?task_key=ecom_newbie_timing_bubble&request_tag_from=lynx&enter_from=task_page&${this.uu}`,
            headers: this.hd,
            json: {}
        }
        // console.log(options)
        let resp = await $.request(options)
        // console.log(resp)
        if (resp.err_no == 0) {
            $.log(`${this.idx}: ${options.fn}, 获得金币 ${resp.data.amount}`)
            await $.wait(2)
        } else if (resp.err_no == 10006) {
            $.log(`${this.idx}: ${options.fn} -- ${resp.err_tips}`)
        } else console.log(`${options.fn}: 失败,  ${JSON.stringify(resp)}`)

    }
    async signinvideo() { // 签到翻倍视频
        let options = {
            fn: '签到翻倍视频',
            method: 'post',
            url: `https://${this.host}/luckycat/aweme/v1/task/done/excitation_ad_signin?${this.uu}`,
            headers: this.hd,
            json: this.bd
        }
        // console.log(options)
        let resp = await $.request(options)
        console.log(resp)
        if (resp.err_no == 0) {
            // console.log(resp)
            $.log(`${this.idx}: ${options.fn}, 获得金币 ${resp.data.amount}`)
            await $.wait(2)
        } else console.log(`${options.fn}: 失败,  ${JSON.stringify(resp)}`)

    }


    async eatmeals() { // 吃饭领金币 
        if (this.h == 8 && this.m < 30) {
            this.mealid = 0
        } else if (this.h == 11 && this.m < 30) {
            this.mealid = 1
        } else if (this.h == 18 && this.m < 30) {
            this.mealid = 2
        } else if (this.h == 21 && this.m < 30) {
            this.mealid = 3
        }
        let options = {
            fn: '吃饭领金币',
            method: 'post',
            url: `https://minigame5-normal-hl.zijieapi.com/ttgame/meal/check_in?${this.uu}`,
            headers: this.hd,
            json: { "meal_index": this.mealid }
        }
        // console.log(options)
        let resp = await $.request(options)
        // console.log(resp)
        if (resp.code == 0) {
            $.log(`${this.idx}: ${options.fn} ok, 获得金币: ${resp.data.reward}`)
            await this.eatmealsvideofb()
        } else console.log(`${options.fn}: 失败,  ${JSON.stringify(resp)}`)

    }
    async eatmealsvideofb() { // 吃饭翻倍视频 
        let options = {
            fn: '吃饭翻倍视频',
            method: 'post',
            url: `https://${this.host}/luckycat/aweme/v1/task/done/excitation_ad/one_more?mode=done&${this.uu}`,
            headers: this.hd,
            json: { "task_key": "meal_excitation_ad", "rit": "28038", "creator_id": "12320000", "one_more_round": 0 }
        }
        // console.log(options)
        let resp = await $.request(options)
        // console.log(resp)
        if (resp.code == 0) {
            $.log(`${this.idx}: ${options.fn} ok, 获得金币: ${resp.data.reward}`)
        } else console.log(`${options.fn}: 失败,  ${JSON.stringify(resp)}`)

    }


    async search() { // 搜索得金币 
        let options = {
            fn: '搜索得金币',
            method: 'post',
            url: `https://${this.host}/luckycat/aweme/v1/task/done/search_excitation?${this.uu}`,
            headers: this.hd,
            json: { "search_source": "recom_search" }
        }
        // console.log(options)
        let resp = await $.request(options)
        // console.log(resp)
        if (resp.code == 0) {
            $.log(`${this.idx}: ${options.fn} ok, 获得金币: ${resp.data.reward}`)
        } else console.log(`${options.fn}: 失败,  ${JSON.stringify(resp)}`)

    }


    async comic() { // 漫画阅读 
        if (this.h == 8 && this.m < 30) {
            this.readiid = 1
        } else if (this.h == 9 && this.m < 30) {
            this.readiid = 3
        } else if (this.h == 10 && this.m < 30) {
            this.readiid = 5
        } else if (this.h == 11 && this.m < 30) {
            this.readiid = 10
        } else if (this.h == 12 && this.m < 30) {
            this.readiid = 15
        } else if (this.h == 13 && this.m < 30) {
            this.readiid = 25
        } else this.readiid = 25

        let options = {
            fn: '漫画阅读',
            method: 'post',
            url: `https://${this.host}/luckycat/novel_sdk/v1/comic/task/done/daily_read_comic_${this.readiid}?${this.uu}`,
            headers: this.hd,
            json: { "nameValuePairs": {} }
        }
        // console.log(options)
        let resp = await $.request(options)
        // console.log(resp)
        if (resp.err_no == 0) {
            $.log(`${this.idx}: ${options.fn} ok, 获得金币: ${resp.data.reward}`)
        } else console.log(`${options.fn}: 失败,  ${JSON.stringify(resp)}`)

    }


    async upstep() { // 上传步数 
        let ts = $.ts(10)
        let options = {
            fn: '上传步数',
            method: 'post',
            url: `https://${this.host}/luckycat/aweme/v1/task/walk/step_submit?${this.uu}`,
            headers: this.hd,
            json: { "submit_time": ts, "step": $.randomInt(11345, 15567) }
        }
        // console.log(options)
        let resp = await $.request(options)
        // console.log(resp)
        if (resp.err_no == 0) {
            $.log(`${this.idx}: ${options.fn} ok, 开始领取奖励`)
            await this.goway()
        } else console.log(`${options.fn}: 失败,  ${JSON.stringify(resp)}`)

    }
    async goway() { // 走路任务 
        let options = {
            fn: '走路任务',
            method: 'post',
            url: `https://${this.host}/luckycat/aweme/v1/task/walk/receive_step_reward?mode=done&${this.uu}`,
            headers: this.hd,
            json: {}
        }
        // console.log(options)
        let resp = await $.request(options)
        // console.log(resp)
        if (resp.err_no == 0) {
            $.log(`${this.idx}: ${options.fn} ok, 获得金币: ${resp.data.reward_amount}`)
        } else console.log(`${options.fn}: 失败,  ${JSON.stringify(resp)}`)

    }

    async viewvideo30() { // 刷视频 30 秒 
        let options = {
            fn: '刷视频 30 秒 ',
            method: 'post',
            url: `https://${this.host}/luckycat/aweme/v1/task/done/read?${this.uu}`,
            headers: this.hd,
            json: {}
        }
        // console.log(options)
        let resp = await $.request(options)
        // console.log(resp)
        if (resp.err_no == 0) {
            $.log(`${this.idx}: ${options.fn} ok, 获得金币: ${resp.data.score_amount}`)
        } else if (resp.err_no == 10009) {
            console.log(`${this.idx} ${options.fn} 失败，原因 ${resp.err_tips}(被识别)`)
        } else console.log(`${options.fn}: 失败,  ${JSON.stringify(resp)}`)

    }

    async gjvideostar() { // 逛街任务
        let options = {
            fn: '逛街任务',
            method: 'post',
            url: `https://${this.host}/luckycat/aweme/v1/task/done/shopping_gold?mode=init&${this.uu}`,
            headers: this.hd,
            json: {}
        }
        // console.log(options)
        let resp = await $.request(options)
        // console.log(resp)
        let aa = $.randomInt(90, 95)
        console.log(`${this.idx} 开始逛街,随机等待 ${aa} 秒`)
        await $.wait(aa)
        await this.gjvideo()
    }

    async gjvideo() { // 逛街视频
        let options = {
            fn: '逛街视频',
            method: 'post',
            url: `https://${this.host}/luckycat/aweme/v1/task/done/shopping_gold?mode=done&${this.uu}`,
            headers: this.hd,
            json: 'body=null'
        }
        // console.log(options)
        let resp = await $.request(options)
        // console.log(resp)
        if (resp.err_no == 0) {
            $.log(`${this.idx}: ${options.fn} ok, 获得金币: ${resp.data.reward_text}`)
        } else console.log(`${options.fn}: 失败,  ${JSON.stringify(resp)}`)

    }

    async openbox() { // 开宝箱
        let options = {
            fn: '开宝箱',
            method: 'post',
            url: `https://${this.host}/luckycat/aweme/v1/task/done/treasure_task?${this.uu}`,
            headers: this.hd,
            json: {}
        }
        // console.log(options)
        let resp = await $.request(options)
        // console.log(resp)
        if (resp.err_no == 0) {
            this.score = resp.data.excitation_ad_info.score_amount
            this.reqid = resp.data.excitation_ad_info.req_id
            this.adid = resp.data.excitation_ad_info.ad_id
            $.log(`${this.idx}: ${options.fn} ok, 获得金币: ${resp.data.amount}`)
            await this.boxvideo()
        } else console.log(`${options.fn}: 失败,  ${JSON.stringify(resp)}`)

    }

    async boxvideo() { // 宝箱视频
        let options = {
            fn: '宝箱视频',
            method: 'post',
            url: `https://${this.host}/luckycat/aweme/v1/task/done/excitation_ad_treasure_box?${this.uu}`,
            headers: this.hd,
            json: JSON.stringify(`{"amount":"${this.score}","inspire_modal_add_modal_manage":false,"cat_treasure_reward":0,"ad_rit":"12317","ad_inspire":"{"score_amount":"${this.score}","amount":"3","req_id":"${this.reqid}"}","task_key":"excitation_ad_treasure_box","stage_score_amount":[],"ad_alias_position":"box","need_reward":true,"finish_action":0,"params_for_special":"luckydog_sdk","static_settings_version":49,"dynamic_settings_version":49,"poll_settings_version":0,"aggr_income_id":""}`)
        }
        // console.log(options)
        let resp = await $.request(options)
        // console.log(resp)
        if (resp.err_no == 0) {
            $.log(`${this.idx}: ${options.fn} ok, 获得金币: ${resp.data.amount}`)
        } else if (resp.err_no == 10009) {
            $.log(`${this.idx}: ${options.fn} 失败,  重试ing...`)
            if (box_num < 4) {
                await this.boxvideo()
                box_num++
            }
        } else console.log(`${options.fn}: 失败,  ${JSON.stringify(resp)}`)
    }

    async shop15() { // 浏览商品15秒
        let options = {
            fn: '浏览商品15秒',
            method: 'post',
            url: `https://${this.host}/aweme/lite/v1/ecom/newbie_channel/done_bubble_task?request_tag_from=lynx&task_key=ecom_newbie_read_bubble&${this.uu}`,
            headers: this.hd,
            json: {}
        }
        // console.log(options)
        let resp = await $.request(options)
        // console.log(resp)
        if (resp.err_no == 0) {
            $.log(`${this.idx}: ${options.fn} ok, 获得金币: ${resp.data.amount}`)
        } else console.log(`${options.fn}: 失败,  ${JSON.stringify(resp)}`)

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
            if (typeof msg == 'object') {
                msg = JSON.stringify(msg)
            }
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