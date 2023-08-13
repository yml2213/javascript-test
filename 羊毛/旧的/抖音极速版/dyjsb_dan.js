/*
@蛋炒饭
APP：抖音极速版（全功能版）
安卓、ios通用
变量名：dyjsbck
需要变量： sessionid#开宝箱url的？后面部分(搜treasure_task)#X-gorgon#X-khronos(可以直接用肥皂的)
所有任务每天分时段运行，建议定时：8-22点，每30分钟一次
*/
NAME = `🎵抖音极速版🎵`; VALY = ['dyjsbck']
LOGS = 0
CK = '24f7860beaf7d9998d9fbdce43b38c75#iid=2500717504108559&device_id=1869625912470847&ac=wifi&channel=360_dylite_0527&aid=2329&app_name=douyin_lite&version_code=220900&version_name=22.9.0&device_platform=android&os=android&ssmix=a&device_type=M2102J2SC&device_brand=Xiaomi&language=zh&os_api=31&os_version=12&manifest_version_code=220901&resolution=1080*2206&dpi=440&update_version_code=22909900&_rticket=1684150646500&package=com.ss.android.ugc.aweme.lite&mcc_mnc=46001&gold_container=0&cpu_support64=true&host_abi=armeabi-v7a&is_guest_mode=0&app_type=normal&minor_status=0&appTheme=dark&need_personal_recommend=1&is_android_pad=0&ts=1684150646&cdid=f8c851a9-e9b1-4337-b883-3a4b0036196d&rom=MIUI&has_alipay=1&p_switch=1&launch_method=enter_launch&rom_version=V130&luckydog_base=rSjOppqcVH-Qn4iYCghTnKtNVYpZCMaDEWeL982REQrkRo5PuTNMqq1ryVocXdqHsouReZnU-fp6kZYpkixeO77yURAezM_XiuyzPCxiayV5SwHEGqNQ4wdZsQNk_JVqm78O5ZpV1DdxtTA_nog-H5tcNdqyGMCagt3PyhX7LxK8b-2wVLHU7db2XUuAPqAp&luckydog_data=B-okGZDaCID9KscaEUoJefaWROTySLWSoRTTluJck7-Dx46SoBSqx1Z4zkzeLQb5xu8Rf3U4wG8rnu_k40HSLZgO-BENKzN3IG3ZRQ_zqYM&luckydog_token=JGvAiPKqXjX8zZ0Jgz2Fw2Fjzaw3V3b7HHiXUuYpAlj_WSttH17spzKJPKaZH_KW&luckydog_sdk_version=7.0.0-rc.9&luckydog_api_version=7.0.0-rc.9&luckydog_settings_version=49049&luckycat_version_name=7.0.0-rc.9&luckycat_version_code=700009&status_bar_height=32#0404c07c00016a54dd6011894d21e2fa8f4a63a42b9ea8724c89#1684150646'
this.h = Math.round(new Date().getHours()).toString()
this.m = Math.round(new Date().getMinutes()).toString()
usid = 0
Notify = 0

let view_num = 0
let eat_num = 0
class Bar {
    constructor(str) {
        this._ = ++usid
        this.idx = `小主 [${this._}] `
        this.sessionid = str.split("#")[0]
        this.uu = str.split("#")[1]
        this.xg = str.split("#")[2]
        this.xt = str.split("#")[3]
        this.bd = `{"amount":"23","inspire_modal_add_modal_manage":false,"cat_treasure_reward":0,"ad_rit":"12317","ad_inspire":"{"score_amount":"23","amount":"3","req_id":"20230515001312E8A456218C2359F6CBB6"}","task_key":"excitation_ad_treasure_box","stage_score_amount":[],"ad_alias_position":"box","need_reward":true,"finish_action":0,"params_for_special":"luckydog_sdk","static_settings_version":49,"dynamic_settings_version":49,"poll_settings_version":0,"aggr_income_id":""}`
        this.R = $.RT(50, 100)
        this.message = ''
        this.logs = true
    }
    //用户信息
    async userinfo() {
        let headers = {
            "Content-Type": "application/json",
            Cookie: "sessionid=" + this.sessionid,
            "User-Agent": "com.ss.android.ugc.aweme.lite/220901 (Linux; U; Android 10; zh_CN; 16s Pro; Build/QKQ1.191222.002; Cronet/TTNetVersion:6fe86402 2022-07-22 QuicVersion:47946d2a 2020-10-14)",
            "X-gorgon": this.xg,
            "X-khronos": this.xt
        }
        let datas = await $.task('get', `https://api3-normal-c.amemv.com/luckycat/aweme/v1/task/page?mode=done&update_version_code=16209900&os_api=29&device_platform=android&aid=2329&oaid=${$.SJS(16, 2)}&device_id=${$.SJS(11, 2)}&iid=${$.SJS(15, 2)}&ac=wifi&channel=bf_1007913_2329_47_3&aid=2329`, headers)
        if (resp.err_no == 0) {
            console.log(`${this.idx}登录成功,现有${resp.data.income_data.amount1}金币,现金余额：${resp.data.income_data.amount2 / 100}元`)
            this.message += `${this.idx}登录成功,现有${resp.data.income_data.amount1}金币,现金余额：${resp.data.income_data.amount2 / 100}元`
            this.logs = true
        } else {
            this.log = false
        }
    }
    // 签到
    async signin() {
        let headers = {
            "Content-Type": "application/json",
            Cookie: "sessionid=" + this.sessionid,
            "User-Agent": "com.ss.android.ugc.aweme.lite/220901 (Linux; U; Android 10; zh_CN; 16s Pro; Build/QKQ1.191222.002; Cronet/TTNetVersion:6fe86402 2022-07-22 QuicVersion:47946d2a 2020-10-14)",
            "X-gorgon": this.xg,
            "X-khronos": this.xt
        }
        let datas = await $.task('post', `https://api3-normal-c.amemv.com/luckycat/aweme/v1/task/done/sign_in?${this.uu}`, headers, `{}`)
        if (resp.err_no == 0) {
            console.log(`${this.idx}签到获得：${resp.data.amount}金币`)
            await this.signinvideo()
        }
    }

    //签到翻倍视频
    async signinvideo() {
        let headers = {
            "Content-Type": "application/json",
            Cookie: "sessionid=" + this.sessionid,
            "User-Agent": "com.ss.android.ugc.aweme.lite/220901 (Linux; U; Android 10; zh_CN; 16s Pro; Build/QKQ1.191222.002; Cronet/TTNetVersion:6fe86402 2022-07-22 QuicVersion:47946d2a 2020-10-14)",
            "X-gorgon": this.xg,
            "X-khronos": this.xt
        }
        let body = JSON.stringify(this.bd)
        let datas = await $.task('post', `https://api3-normal-c.amemv.com/luckycat/aweme/v1/task/done/excitation_ad_signin?${this.uu}`, headers, this.bd)
        if (resp.err_no == 10009) {
            await this.signinvideo()
        } else if (resp.err_no == 10002) {
            await this.signinvideo()
        } else if (resp.err_no == 0) {
            console.log(`${this.idx}观看签到视频获得：${resp.data.amount}金币`)
        } else {

        }
    }

    // 看广告视频  废了 金币溜走了
    async advideo() {
        let headers = {
            "Content-Type": "application/json",
            Cookie: "sessionid=" + this.sessionid,
            "User-Agent": "com.ss.android.ugc.aweme.lite/220901 (Linux; U; Android 10; zh_CN; 16s Pro; Build/QKQ1.191222.002; Cronet/TTNetVersion:6fe86402 2022-07-22 QuicVersion:47946d2a 2020-10-14)",
            "X-gorgon": this.xg,
            "X-khronos": this.xt
        }
        let body = JSON.stringify(this.bd)
        let datas = await $.task('post', `https://api3-normal-c.amemv.com/luckycat/aweme/v1/task/done/excitation_ad?${this.uu}`, headers, body)
        //  console.log(this.idx,datas)
        if (resp.err_tips == '今日看广告领金币已达到上限，休息一下~明天再来看吧') {
        } else if (resp.err_tips == '很遗憾，奖励溜走了') {
            await this.advideo()
        } else if (resp.err_no == 0) {
            console.log(`${this.idx}观看广告视频获得：${resp.data.amount}金币`)
        } else if (resp.err_no != 0) {
            console.log(datas)
            await this.advideo()
        }
    }
    // 逛街任务
    async gjvideostar() {
        let headers = {
            "Content-Type": "application/json",
            Cookie: "sessionid=" + this.sessionid,
            "User-Agent": "com.ss.android.ugc.aweme.lite/220901 (Linux; U; Android 10; zh_CN; 16s Pro; Build/QKQ1.191222.002; Cronet/TTNetVersion:6fe86402 2022-07-22 QuicVersion:47946d2a 2020-10-14)",
            "X-gorgon": this.xg,
            "X-khronos": this.xt
        }
        let datas = await $.task('post', `https://api3-normal-c.amemv.com/luckycat/aweme/v1/task/done/shopping_gold?mode=init&${this.uu}`, headers, `body=null`)
        let aa = $.RT(90000, 93000)
        console.log(`${this.idx} 开始逛街,随机等待 ${aa / 1000} 秒`)
        await $.wait(aa)
        await this.gjvideo()
    }
    async gjvideo() {
        let headers = {
            "Content-Type": "application/json",
            Cookie: "sessionid=" + this.sessionid,
            "User-Agent": "com.ss.android.ugc.aweme.lite/220901 (Linux; U; Android 10; zh_CN; 16s Pro; Build/QKQ1.191222.002; Cronet/TTNetVersion:6fe86402 2022-07-22 QuicVersion:47946d2a 2020-10-14)",
            "X-gorgon": this.xg,
            "X-khronos": this.xt
        }
        let datas = await $.task('post', `https://api3-normal-c.amemv.com/luckycat/aweme/v1/task/done/shopping_gold?mode=done&${this.uu}`, headers, `body=null`)
        if (resp.err_no == 10009) {
            await this.gjvideo()
        } else if (resp.err_no == 10002) {
            await this.gjvideo()
        } else if (resp.err_no == 0) {
            console.log(`${this.idx}完成逛街任务：${resp.data.reward_text}`)
        } else {

        }
    }
    // 上传步数
    async upstep() {
        let ts = $.time(10)
        let headers = {
            "Content-Type": "application/json",
            Cookie: "sessionid=" + this.sessionid,
            "User-Agent": "com.ss.android.ugc.aweme.lite/220901 (Linux; U; Android 10; zh_CN; 16s Pro; Build/QKQ1.191222.002; Cronet/TTNetVersion:6fe86402 2022-07-22 QuicVersion:47946d2a 2020-10-14)",
            "X-gorgon": this.xg,
            "X-khronos": this.xt
        }
        let datas = await $.task('post', `https://api5-normal-c-lq.amemv.com/luckycat/aweme/v1/task/walk/step_submit?${this.uu}`, headers, `{"submit_time":${ts},"step":11145}`)
        if (resp.err_no == 0) {
            console.log(`${this.idx}上传步数成功！开始领取奖励`)
            await this.goway()
        } else {
            console.log(`${this.idx}上传步数失败`)
        }
    }
    // 走路任务
    async goway() {
        let headers = {
            "Content-Type": "application/json",
            Cookie: "sessionid=" + this.sessionid,
            "User-Agent": "com.ss.android.ugc.aweme.lite/220901 (Linux; U; Android 10; zh_CN; 16s Pro; Build/QKQ1.191222.002; Cronet/TTNetVersion:6fe86402 2022-07-22 QuicVersion:47946d2a 2020-10-14)",
            "X-gorgon": this.xg,
            "X-khronos": this.xt
        }
        let datas = await $.task('post', `https://api5-normal-c-lq.amemv.com/luckycat/aweme/v1/task/walk/receive_step_reward?mode=done&${this.uu}`, headers, `{}`)
        // console.log(datas)
        if (resp.err_no == 10009 || 10002) {
            // await this.goway()
            // console.log(datas)

            if (resp.err_tips == '领取失败，请稍后再试') {
                // console.log(datas)
                console.log(`${this.idx} 走路任务: ${resp.err_tips}`)
            } else {
                await this.goway()
            }

        } else if (resp.err_no == 0) {
            console.log(`${this.idx}完成走路任务获得：${resp.data.reward_amount}金币`)
        }
    }
    //开宝箱
    async openbox() {
        let headers = {
            "Content-Type": "application/json",
            Cookie: "sessionid=" + this.sessionid,
            "User-Agent": "com.ss.android.ugc.aweme.lite/220901 (Linux; U; Android 10; zh_CN; 16s Pro; Build/QKQ1.191222.002; Cronet/TTNetVersion:6fe86402 2022-07-22 QuicVersion:47946d2a 2020-10-14)",
            "X-gorgon": this.xg,
            "X-khronos": this.xt
        }
        let datas = await $.task('post', `https://api5-normal-c-lq.amemv.com/luckycat/aweme/v1/task/done/treasure_task?${this.uu}`, headers, `{}`)
        //  console.log(this.idx,datas)
        if (resp.err_tips == '今日看广告领金币已达到上限，休息一下~明天再来看吧') {
        } else if (resp.err_tips == '很遗憾，奖励溜走了') {
            await this.openbox()
        } else if (resp.err_tips == '您已经开过宝箱了喔，请稍后再试') {
            console.log(`${this.idx} 您已经开过宝箱了喔，请稍后再试`)
        } else if (resp.err_no == 0) {
            this.score = resp.data.excitation_ad_info.score_amount
            this.reqid = resp.data.excitation_ad_info.req_id
            this.adid = resp.data.excitation_ad_info.ad_id
            console.log(`${this.idx}开宝箱获得：${resp.data.amount}金币`)
            await this.boxvideo()
        } else if (resp.err_no != 0) {
            await this.openbox()
        }
    }

    //看宝箱视频
    async boxvideo() {
        let headers = {
            "Content-Type": "application/json",
            Cookie: "sessionid=" + this.sessionid,
            "User-Agent": "com.ss.android.ugc.aweme.lite/220901 (Linux; U; Android 10; zh_CN; 16s Pro; Build/QKQ1.191222.002; Cronet/TTNetVersion:6fe86402 2022-07-22 QuicVersion:47946d2a 2020-10-14)",
            "X-gorgon": this.xg,
            "X-khronos": this.xt
        }
        let body = JSON.stringify(`{"amount":"${this.score}","inspire_modal_add_modal_manage":false,"cat_treasure_reward":0,"ad_rit":"12317","ad_inspire":"{"score_amount":"${this.score}","amount":"3","req_id":"${this.reqid}"}","task_key":"excitation_ad_treasure_box","stage_score_amount":[],"ad_alias_position":"box","need_reward":true,"finish_action":0,"params_for_special":"luckydog_sdk","static_settings_version":49,"dynamic_settings_version":49,"poll_settings_version":0,"aggr_income_id":""}`)
        let datas = await $.task('post', `https://api3-normal-c.amemv.com/luckycat/aweme/v1/task/done/excitation_ad_treasure_box?${this.uu}`, headers, body)
        // console.log(this.idx,datas)
        if (resp.err_tips == '今日看广告领金币已达到上限，休息一下~明天再来看吧') {
        } else if (resp.err_tips == '很遗憾，金币溜走了～') {
            await this.boxvideo()
        } else if (resp.err_tips == '服务异常，请稍后重试') {
            await this.boxvideo()
        } else if (resp.err_tips == '广告视频准备中，请稍后再试') {
            await this.boxvideo()
        } else if (resp.err_no == 0) {
            console.log(`${this.idx}看开宝箱视频获得：${resp.data.amount}金币`)
            await $.wait($.RT(3000, 8000))
        } else if (resp.err_no != 0) {
            await this.boxvideo()
        }
    }

    // 吃饭领金币
    async eatmeals() {
        if (this.h == 8 && this.m < 30) {
            this.mealid = 0
        } else if (this.h == 11 && this.m < 30) {
            this.mealid = 1
        } else if (this.h == 18 && this.m < 30) {
            this.mealid = 2
        } else if (this.h == 21 && this.m < 30) {
            this.mealid = 3
        }
        let headers = {
            "Content-Type": "application/json",
            Cookie: "sessionid=" + this.sessionid,
            "User-Agent": "com.ss.android.ugc.aweme.lite/220901 (Linux; U; Android 10; zh_CN; 16s Pro; Build/QKQ1.191222.002; Cronet/TTNetVersion:6fe86402 2022-07-22 QuicVersion:47946d2a 2020-10-14)",
            "X-gorgon": this.xg,
            "X-khronos": this.xt
        }
        let datas = await $.task('post', `https://minigame5-normal-hl.zijieapi.com/ttgame/meal/check_in?${this.uu}`, headers, `{"meal_index":${this.mealid}}`)
        console.log(this.idx, datas)
        if (resp.code == 10009) {
            // 吃饭领金币
            console.log(`${this.idx} 吃饭领金币 失败，即将重试`)
            eat_num++
            if (eat_num <= 5) {
                await this.eatmeals()
            }

        } else if (resp.code == 10002) {
        } else if (resp.code == 0) {
            console.log(`${this.idx}领取吃饭奖励获得：${resp.data.reward}金币`)
            await this.eatmealsvideofb()
        }
    }

    //吃饭翻倍视频
    async eatmealsvideofb() {
        let headers = {
            "Content-Type": "application/json",
            Cookie: "sessionid=" + this.sessionid,
            "User-Agent": "com.ss.android.ugc.aweme.lite/220901 (Linux; U; Android 10; zh_CN; 16s Pro; Build/QKQ1.191222.002; Cronet/TTNetVersion:6fe86402 2022-07-22 QuicVersion:47946d2a 2020-10-14)",
            "X-gorgon": this.xg,
            "X-khronos": this.xt
        }
        let datas = await $.task('post', `https://api5-normal-c-lq.amemv.com/luckycat/aweme/v1/task/done/excitation_ad/one_more?mode=done&${this.uu}`, headers, `{"task_key":"meal_excitation_ad","rit":"28038","creator_id":"12320000","one_more_round":0}`)
        if (resp.err_no == 10009) {
            await this.eatmealsvideofb()
        } else if (resp.err_no == 10002) {
            await this.eatmealsvideofb()
        } else if (resp.err_no == 0) {
            console.log(`${this.idx}领取吃饭翻倍视频奖励获得：${resp.data.amount}金币`)
        } else {

        }
    }
    // 漫画阅读
    async comic() {
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
        }
        let headers = {
            "Content-Type": "application/json",
            Cookie: "sessionid=" + this.sessionid,
            "User-Agent": "com.ss.android.ugc.aweme.lite/220901 (Linux; U; Android 10; zh_CN; 16s Pro; Build/QKQ1.191222.002; Cronet/TTNetVersion:6fe86402 2022-07-22 QuicVersion:47946d2a 2020-10-14)",
            "X-gorgon": this.xg,
            "X-khronos": this.xt
        }
        let datas = await $.task('post', `https://api3-normal-c.amemv.com/luckycat/novel_sdk/v1/comic/task/done/daily_read_comic_${this.readiid}?${this.uu}`, headers, `{"nameValuePairs":{}}`)
        if (resp.err_no == 10009) {
            await this.comic()
        } else if (resp.err_no == 10002) {
            await this.comic()
        } else if (resp.err_no == 0) {
            console.log(`${this.idx}看漫画奖励获得：${resp.data.amount}金币`)
        } else {

        }
    }
    //刷视频奖励
    async viewvideo1() {
        let headers = {
            "Content-Type": "application/json",
            Cookie: "sessionid=" + this.sessionid,
            "User-Agent": "com.ss.android.ugc.aweme.lite/220901 (Linux; U; Android 10; zh_CN; 16s Pro; Build/QKQ1.191222.002; Cronet/TTNetVersion:6fe86402 2022-07-22 QuicVersion:47946d2a 2020-10-14)",
            "X-gorgon": this.xg,
            "X-khronos": this.xt
        }
        let body = `{"task_key":"excitation_ad_signin"}`
        let datas = await $.task('post', `https://api5-normal-c-lq.amemv.com/luckycat/aweme/v1/task/done/excitation_ad/one_more?mode=done${this.uu}`, headers, body)
        //  console.log(this.idx,datas)
        if (resp.err_tips == '今日看广告领金币已达到上限，休息一下~明天再来看吧') {
            await this.viewvideo2()
        } else if (resp.err_no == 10002) {
            await this.viewvideo1()
        } else if (resp.err_no == 0) {
            console.log(`${this.idx}刷视频成功，获得${resp.data.amount}金币`)
            await this.viewvideo2()
        } else if (resp.err_no == 10009) {
            await this.viewvideo1()
        } else {
            await this.viewvideo2()
        }
    }

    async viewvideo2() {
        let headers = {
            "Content-Type": "application/json",
            Cookie: "sessionid=" + this.sessionid,
            "User-Agent": "com.ss.android.ugc.aweme.lite/220901 (Linux; U; Android 10; zh_CN; 16s Pro; Build/QKQ1.191222.002; Cronet/TTNetVersion:6fe86402 2022-07-22 QuicVersion:47946d2a 2020-10-14)",
            "X-gorgon": this.xg,
            "X-khronos": this.xt
        }
        let body = `{"task_key":"excitation_ad"}`
        let datas = await $.task('post', `https://api5-normal-c-lq.amemv.com/luckycat/aweme/v1/task/done/excitation_ad/one_more?mode=done${this.uu}`, headers, body)
        //  console.log(this.idx,datas)
        if (resp.err_tips == '今日看广告领金币已达到上限，休息一下~明天再来看吧') {
        } else if (resp.err_no == 10002) {
            await this.viewvideo2()
        } else if (resp.err_no == 0) {
            console.log(`${this.idx}刷视频成功，获得${resp.data.amount}金币`)
            await this.viewvideo3()
        } else if (resp.err_tips == '很遗憾，奖励溜走了～') {
            await this.viewvideo2()
        } else {
            await this.viewvideo3()
        }
    }
    async viewvideo3() {
        let headers = {
            "Content-Type": "application/json",
            Cookie: "sessionid=" + this.sessionid,
            "User-Agent": "com.ss.android.ugc.aweme.lite/220901 (Linux; U; Android 10; zh_CN; 16s Pro; Build/QKQ1.191222.002; Cronet/TTNetVersion:6fe86402 2022-07-22 QuicVersion:47946d2a 2020-10-14)",
            "X-gorgon": this.xg,
            "X-khronos": this.xt
        }
        let body = `{"task_key":"walk_excitation_ad"}`
        let datas = await $.task('post', `https://api5-normal-c-lq.amemv.com/luckycat/aweme/v1/task/done/excitation_ad/one_more?mode=done${this.uu}`, headers, body)
        // console.log(this.idx,datas)
        if (resp.err_tips == '今日看广告领金币已达到上限，休息一下~明天再来看吧') {

        } else if (resp.err_no == 10002) {
            await this.viewvideo3()
        } else if (resp.err_no == 0) {
            console.log(`${this.idx}刷视频成功，获得${resp.data.amount}金币`)
        } else if (resp.err_no == 10006) {
            await this.viewvideo3()
        } else if (resp.err_no == 10009) {
            await this.viewvideo3()
        }
    }
    // 看视频30秒
    async viewvideo30() {
        let headers = {
            "Content-Type": "application/json",
            Cookie: "sessionid=" + this.sessionid,
            "User-Agent": "com.ss.android.ugc.aweme.lite/220901 (Linux; U; Android 10; zh_CN; 16s Pro; Build/QKQ1.191222.002; Cronet/TTNetVersion:6fe86402 2022-07-22 QuicVersion:47946d2a 2020-10-14)",
            "X-gorgon": this.xg,
            "X-khronos": this.xt
        }
        let body = `{}`
        let datas = await $.task('post', `https://api5-normal-c-lq.amemv.com/luckycat/aweme/v1/task/done/read?${this.uu}`, headers, body)
        //  console.log(this.idx,datas)
        if (resp.err_no == 0) {
            console.log(`${this.idx} 刷视频30秒成功，获得${resp.data.score_amount}金币`)
        } else if (resp.err_no == 10009) {
            console.log(`${this.idx} 刷视频30秒 失败，原因 ${resp.err_tips}(被识别)`)
        } else if (resp.err_no != 0) {
            console.log(datas)
            console.log(`${this.idx}刷视频30秒 失败，即将重试`)
            view_num++
            if (view_num <= 3) {
                await this.viewvideo30()
            }
        }
    }
    // 商城签到
    async shopsignin() {
        let headers = {
            "Content-Type": "application/json",
            Cookie: "sessionid=" + this.sessionid,
            "User-Agent": "com.ss.android.ugc.aweme.lite/220901 (Linux; U; Android 10; zh_CN; 16s Pro; Build/QKQ1.191222.002; Cronet/TTNetVersion:6fe86402 2022-07-22 QuicVersion:47946d2a 2020-10-14)",
            "X-gorgon": this.xg,
            "X-khronos": this.xt
        }
        let body = `{}`
        let datas = await $.task('post', `https://api3-normal-c.amemv.com/aweme/lite/v1/ecom/newbie_channel/done_bubble_task?task_key=ecom_newbie_timing_bubble&request_tag_from=lynx&enter_from=task_page&${this.uu}`, headers, body)
        if (resp.err_no == 0) {
            console.log(`${this.idx}商城签到成功，获得${resp.data.score_amount}金币`)
        }
    }
    //浏览商品15秒
    async shop15() {
        let headers = {
            "Content-Type": "application/json",
            Cookie: "sessionid=" + this.sessionid,
            "User-Agent": "com.ss.android.ugc.aweme.lite/220901 (Linux; U; Android 10; zh_CN; 16s Pro; Build/QKQ1.191222.002; Cronet/TTNetVersion:6fe86402 2022-07-22 QuicVersion:47946d2a 2020-10-14)",
            "X-gorgon": this.xg,
            "X-khronos": this.xt
        }
        let body = `{}`
        let datas = await $.task('post', `https://api3-normal-c.amemv.com/aweme/lite/v1/ecom/newbie_channel/done_bubble_task?request_tag_from=lynx&task_key=ecom_newbie_read_bubble&${this.uu}`, headers, body)
        if (resp.err_no == 10009) {
            await this.shop15()
        } else if (resp.err_no == 10002) {
            await this.shop15()
        } else if (resp.err_no == 0) {
            console.log(`${this.idx}浏览商城成功，获得${resp.data.amount}金币`)
        } else if (resp.err_no == 10003) {
            console.log(`${this.idx}浏览商城结果，${resp.err_tips}`)
        }
    }
    //搜索得金币
    async search() {
        let headers = {
            "Content-Type": "application/json",
            Cookie: "sessionid=" + this.sessionid,
            "User-Agent": "com.ss.android.ugc.aweme.lite/220901 (Linux; U; Android 10; zh_CN; 16s Pro; Build/QKQ1.191222.002; Cronet/TTNetVersion:6fe86402 2022-07-22 QuicVersion:47946d2a 2020-10-14)",
            "X-gorgon": this.xg,
            "X-khronos": this.xt
        }
        let body = `search_source=recom_search`
        let datas = await $.task('post', `https://api3-normal-c.amemv.com/luckycat/aweme/v1/task/done/search_excitation?${this.uu}`, headers, body)
        if (resp.err_no == 10009 || 10002) {
            if (resp.err_tips == '设备或账号已参加过活动啦，请更换设备或账号再来尝试~') {
                // console.log(datas)
                console.log(`${this.idx} 搜索得金币 ${resp.err_tips}`)
            } else {
                await this.search()
            }
        } else if (resp.err_no == 0) {
            console.log(`${this.idx}完成搜索任务成功，获得${resp.data.amount}金币`)
        } else if (resp.err_no == 10003) {
            console.log(`${this.idx}完成搜索任务结果，${resp.err_tips}`)
        }
    }
    //看本地视频
    async localvideo() {
        let headers = {
            "Content-Type": "application/json",
            Cookie: "sessionid=" + this.sessionid,
            "User-Agent": "com.ss.android.ugc.aweme.lite/220901 (Linux; U; Android 10; zh_CN; 16s Pro; Build/QKQ1.191222.002; Cronet/TTNetVersion:6fe86402 2022-07-22 QuicVersion:47946d2a 2020-10-14)",
            "X-gorgon": this.xg,
            "X-khronos": this.xt
        }
        let body = `token=0a820169dec09b0add55f12598e0846f80d382db3a582f33cb9d97b3f43639fa308f81fe15834bd02f0a4063275fcb41786ff784d5f789ce481cff4732ae1dbfd670df0985c2032bc8024ca881b152a46a32df26b550248a6d5407ffe5847928ee680e34579f8f9ef8884760fa3d33e8805211ae5bcbc8b886649ef3a4c1372ed7edcfca171a4b0a3c0306161656ed82cceb5df3dad7ebca4175f1da5204fedd27c8637db88fc90f70c72382e52e8a2d0f8b5ad22cdee6e31e4891e0861eea226eeb9b66b910c5aab10d18bcb6f7c00520012201033eabb3d8`
        let datas = await $.task('post', `https://api3-normal-c.amemv.com/luckycat/aweme/v1/task/done/read_video_bonus?ac=4g&channel=xiaomi_2329_64_1104&aid=2329&app_name=douyin_lite&version_code=250300&version_name=25.3.0&device_platform=android&os=android&ssmix=a&device_type=2211133C&device_brand=Xiaomi&language=zh&os_api=33&os_version=13&openudid=94a58eb067e18bab&manifest_version_code=250301&resolution=1080*2252&dpi=440&update_version_code=25309900&_rticket=1684284091370&package=com.ss.android.ugc.aweme.lite&mcc_mnc=46011&gold_container=0&cpu_support64=true&host_abi=arm64-v8a&is_guest_mode=0&app_type=normal&minor_status=0&appTheme=light&need_personal_recommend=1&is_android_pad=0&ts=1684284092&oaid=94f2e28627155017&md=0`, headers, body)
        console.log(this.idx, datas)
        if (resp.err_no == 0) {
            console.log(`${this.idx}观看本地视频120s成功`)
        } else if (resp.err_no != 0) {
            await this.localvideo()
        }
    }







} $ = DD()
!(async () => {
    console.log(NAME)
    await $.ExamineCookie()
    if ($.cookie_list.length < 999) {
        await $.Multithreading('userinfo')
        if (this.h == 9 && this.m < 30) {
            await $.Multithreading('signin')  // 签到
            await $.Multithreading('shopsignin')  // 商城签到
        }
        if (this.h == 8 && this.m < 30 || this.h == 11 && this.m >= 30 || this.h == 18 && this.m < 30 || this.h == 21 && this.m < 30) {
            await $.Multithreading('eatmeals') // 吃饭领金币 后面翻倍
        }
        if (this.h == 10 && this.m < 30 || this.h == 13 && this.m < 30 || this.h == 17 && this.m < 30 || this.h == 19 && this.m < 30 || this.h == 20 && this.m < 30) {
            await $.Multithreading('search')  // 搜索得金币
        }
        if (this.h == 8 && this.m < 30 || this.h == 9 && this.m < 30 || this.h == 10 && this.m < 30 || this.h == 11 && this.m < 30 || this.h == 12 && this.m < 30 || this.h == 13 && this.m < 30) {
            await $.Multithreading('comic')  // 漫画阅读
        }
        if (this.h == 20 && this.m < 30) {
            await $.Multithreading('upstep') // 上传步数
        }

        await $.Multithreading('comic')   // 测试

        // await $.Multithreading('advideo')   // 看广告视频   废了 金币溜走了

        await $.Multithreading('openbox')  // 开宝箱


        await $.Multithreading('viewvideo30') // 刷视频30秒成功
        // await $.Multithreading('viewvideo1')

        await $.Multithreading('gjvideostar') // 逛街任务
        // await $.Multithreading('localvideo')
    } else {
        console.log(`账号数量超过限制，请减少账号数量后重试！`)
    }
    let message = []
    for (let user of $.cookie_list) {
        if (user.message) message.push(user.message)
    }
    if (message.length > 0) await $.SendMsg(message.join('\n'))
})()
    .catch(e => { console.log(e) })
    .finally(() => { })


function DD() {
    return new (class {
        constructor() {
            this.cookie_list = []
            this.message = ''
            this.CryptoJS = require('crypto-js')
            this.NodeRSA = require('node-rsa')
            this.request = require('request')
            this.Sha_Rsa = require('jsrsasign')
        }
        //多线程
        async Multithreading(taskName, id, thread) {
            let workGroup = []
            if (!thread) {
                thread = 1
            }
            while (thread--) {
                for (let user of $.cookie_list) {
                    workGroup.push(user[taskName](id))
                }
            }
            await Promise.allSettled(workGroup)
        }
        //变量检查
        ExamineCookie() {
            let ckStr = process.env[VALY] || CK
            let userCount = 0
            if (ckStr) {
                for (let userCookies of ckStr.split('\n').filter(x => !!x)) {
                    $.cookie_list.push(new Bar(userCookies))
                }
                userCount = $.cookie_list.length
            } else {
                console.log(`\n【${NAME}】：未填写变量: ${VALY}`)
            }
            console.log(`共找到${userCount}个账号`)
            return $.cookie_list
        }
        // 运行模块 get post put delete patch head options
        task(method, taskurl, taskheader, taskbody, taskhost) {
            if (method == 'delete') {
                method = method.toUpperCase()
            } else {
                method = method
            }
            if (method == 'post') {
                delete taskheader['content-type']
                delete taskheader['Content-type']
                delete taskheader['content-Type']
                if ($.safeGet(taskbody)) {
                    taskheader['Content-Type'] = 'application/json;charset=UTF-8'
                } else {
                    taskheader['Content-Type'] = 'application/x-www-form-urlencoded'
                }
                if (taskbody) {
                    taskheader['Content-Length'] = $.lengthInUtf8Bytes(taskbody)
                }
            }
            if (method == 'get') {
                delete taskheader['content-type']
                delete taskheader['Content-type']
                delete taskheader['content-Type']
                delete taskheader['Content-Length']
            }
            taskheader['Host'] = taskurl['replace']('//', '/')['split']('/')[1]
            return new Promise(async resolve => {
                if (method.indexOf('T') < 0) {
                    var httpget = {
                        url: taskurl,
                        headers: taskheader,
                        body: taskbody,
                        timeout: 6000,
                        proxy: 'http://' + taskhost,
                    }
                } else {
                    var httpget = {
                        url: taskurl,
                        headers: taskheader,
                        form: JSON.parse(taskbody),
                        timeout: 6000,
                        proxy: 'http://' + taskhost,
                    }
                }
                if (!taskhost) {
                    delete httpget['proxy']
                }
                this.request[method.toLowerCase()](httpget, (err, response, data) => {
                    try {
                        if (data) {
                            if (LOGS == 1) {
                                console.log(`================ 请求 ================`)
                                console.log(httpget)
                                console.log(`================ 返回 ================`)
                                if ($.safeGet(data)) {
                                    console.log(JSON.parse(data))
                                } else {
                                    console.log(data)
                                }
                            }
                        }
                    } catch (e) {
                        console.log(e, taskurl + '\n' + taskheader)
                    } finally {
                        let datas = ''
                        if (!err) {
                            if ($.safeGet(data)) {
                                datas = JSON.parse(data)
                            } else if (data.indexOf('/') != -1 && data.indexOf('+') != -1) {
                                datas = $.decrypts(data)
                            } else {
                                datas = data
                            }
                        } else {
                            datas = taskurl + '   API请求失败，请检查网络重试\n' + err
                        }
                        return resolve(datas)
                    }
                })
            })
        }
        async httpRequest(options) {
            delete options.fn
            var request = require('request')
            return new Promise((resolve) => {
                request(options, function (error, response) {
                    if (error) throw new Error(error)
                    let data = response.body
                    resolve(data)
                })
            })
        }
        async SendMsg(message) {
            if (!message) return
            if (Notify == 1) {
                var notify = require("../3.测试专用/sendNotify")
                await notify.sendNotify(NAME, message)
            } else {
                //  console.log(message);
            }
        }

        //解密
        decrypts(data) {
            //使用方法：DecryptCrypto(`0`,`AES`, `ECB`, `Pkcs7`, data, 'key', 'iv')
            try {
                return JSON.parse($.DecryptCrypto(0, `AES`, `ECB`, `Pkcs7`, data, this.key1, this.iv))
            } catch (e) {
                return JSON.parse($.DecryptCrypto(0, `AES`, `ECB`, `Pkcs7`, data, this.key2, this.iv))
            }
        }
        //body长度
        lengthInUtf8Bytes(str) {
            let m = encodeURIComponent(str).match(/%[89ABab]/g)
            return str.length + (m ? m.length : 0)
        }
        //随机数组
        randomArr(arr) {
            return arr[parseInt(Math.random() * arr.length, 10)]
        }
        //延迟
        wait(t) {
            return new Promise(e => setTimeout(e, t))
        }
        //当前时间戳s=10位时间戳或13位时间戳
        time(s) {
            if (s == 10) {
                return Math.round(+new Date() / 1000)
            } else {
                return +new Date()
            }
        }
        //时间戳格式化日期
        timenow(str) {
            let date = new Date()
            if (str == undefined) {
                let date = new Date(),
                    N = date.getFullYear() + '-',
                    Y = (date.getMonth() + 1 < 10 ? '0' + (date.getMonth() + 1) : date.getMonth() + 1) + '-',
                    R = date.getDate() + ' ',
                    S = date.getHours() + ':',
                    F = date.getMinutes() + ':',
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
        //数据检查
        safeGet(data) {
            try {
                if (typeof JSON.parse(data) == 'object') {
                    return true
                }
            } catch (e) {
                return false
            }
        }
        //随机字符
        SJS(len, t) {
            if (t == 0) {
                let chars = 'QWERTYUIOPASDFGHJKLZXCVBNM01234567890123456789'
                let maxLen = chars.length
                let str = ''
                for (let i = 0; i < len; i++) {
                    str += chars.charAt(Math.floor(Math.random() * maxLen))
                }
                return str
            } else if (t == 1) {
                let chars = 'qwertyuiopasdfghjklzxcvbnm0123456789'
                let maxLen = chars.length
                let str = ''
                for (let i = 0; i < len; i++) {
                    str += chars.charAt(Math.floor(Math.random() * maxLen))
                }
                return str
            } else {
                let chars = '0123456789'
                let maxLen = chars.length
                let str = ''
                for (let i = 0; i < len; i++) {
                    str += chars.charAt(Math.floor(Math.random() * maxLen))
                }
                return str
            }
        }
        //随机$.udid  0=大写  1=小写
        udid(str) {
            function S4() {
                return (((1 + Math.random()) * 0x10000) | 0).toString(16).substring(1)
            }
            let uuid = S4() + S4() + '-' + S4() + '-' + S4() + '-' + S4() + '-' + S4() + S4() + S4()
            if (str == 0) {
                return uuid.toUpperCase()
            } else {
                return uuid.toLowerCase()
            }
        }
        //  .toUpperCase()  转化大写
        //  .toLowerCase()  转化小写
        //console.log(...new Set(arr))去重
        //KEY = [...new Set(KEY.filter(item => !!item))]
        //filter(item => !!item) 过滤1!=1
        //Array.from()方法就是将一个类数组对象或者可遍历对象转换成一个真正的数组。
        //es编码  escape("中文")
        //es解码  unescape("%u4E2D%u6587")
        //URI编码  encodeURI("中文") 不完全
        //URI解码  decodeURI("%E4%B8%AD%E6%96%87")  不完全
        //URIC编码  encodeURIComponent("中文")
        //URIC解码  decodeURIComponent("%E4%B8%AD%E6%96%87")
        //str编码
        encodeUnicode(str) {
            var res = []
            for (var i = 0; i < str.length; i++) {
                res[i] = ('00' + str.charCodeAt(i).toString(16)).slice(-4)
            }
            return '\\u' + res.join('\\u')
        }
        //str解码
        decodeUnicode(str) {
            str = str.replace(/\\u/g, '%u')
            return unescape(unescape(str))
        }
        RT(X, Y) {
            return Math.round(Math.random() * (Y - X) + X)
        }
        //去除数组空值 console.log($.arrNull(['A', '', 'B', null, undefined, 'C', '  ']))
        arrNull(arr) {
            var r = arr.filter(s => {
                return s && s.trim()
            })
            return r
        }
        //国际标准时间
        nowtime() {
            return new Date(new Date().getTime() + new Date().getTimezoneOffset() * 60 * 1000 + 8 * 60 * 60 * 1000)
        }
        //日期格式化时间戳
        timecs() {
            let newtime = $.nowtime()
            if (JSON.stringify(newtime).indexOf(' ') >= 0) {
                newtime = newtime.replace(' ', 'T')
            }
            return new Date(newtime).getTime() - 8 * 60 * 60 * 1000
        }
        //键值对转json  $.rtjson(str, '&', '=',1)
        rtjson(input, apart, apart2, i) {
            if (i == 0) {
                return JSON.stringify(
                    input.split(apart).reduce((sum, item) => {
                        let temp = item.split(apart2)
                        sum[temp[0].trim()] = temp[1].trim()
                        return sum
                    }, {})
                )
            } else {
                return input.split(apart).reduce((sum, item) => {
                    let temp = item.split(apart2)
                    sum[temp[0].trim()] = temp[1].trim()
                    return sum
                }, {})
            }
        }
        //md5加密 0=32位小写,1=32位大写,2=中间16位小写,3=中间16位大写
        MD5Encrypt(i, str) {
            if (i == 0) {
                return this.CryptoJS.MD5(str).toString().toLowerCase()
            } else if (i == 1) {
                return this.CryptoJS.MD5(str).toString().toUpperCase()
            } else if (i == 2) {
                return this.CryptoJS.MD5(str).toString().substring(8, 24).toLowerCase()
            } else if (i == 3) {
                return this.CryptoJS.MD5(str).toString().substring(8, 24).toUpperCase()
            }
        }
        //SHA类：SHA1,SHA3,SHA224,SHA256,SHA384,SHA512,RIPEMD160
        //SHA类加密方式  使用：SHA_Encrypt(0, 'SHA1', str) 或 SHA_Encrypt(1,'SHA256', str)
        //0表示加密后编码，1直接使用hex格式
        SHA_Encrypt(i, Encrypt, str) {
            if (i == 0) {
                return this.CryptoJS[Encrypt](str).toString(this.CryptoJS.enc.Base64)
            } else {
                return this.CryptoJS[Encrypt](str).toString()
            }
        }
        //HmacSHA类：HmacSHA1,HmacSHA3,HmacSHA224,HmacSHA256,HmacSHA384,HmacSHA512,HmacRIPEMD160
        //0表示加密后编码，1直接使用hex格式
        //SHA类加密方式  使用：SHA_Encrypt(0,'HmacSHA1', str,key) 或 SHA_Encrypt(1,'HmacSHA256', str,key)
        HmacSHA_Encrypt(i, Encrypt, str, key) {
            if (i == 0) {
                return this.CryptoJS[Encrypt](str, key).toString(this.CryptoJS.enc.Base64)
            } else {
                return this.CryptoJS[Encrypt](str, key).toString()
            }
        }
        //Base64 0=编码 1=解码
        Base64(i, str) {
            if (i == 0) {
                return this.CryptoJS.enc.Base64.stringify(this.CryptoJS.enc.Utf8.parse(str))
            } else {
                return this.CryptoJS.enc.Utf8.stringify(this.CryptoJS.enc.Base64.parse(str))
            }
        }
        //AES/DES加解密 0=加密  1=解密
        //使用方法：DecryptCrypto(`0`,`AES`, `ECB`, `Pkcs7`, data, 'key', 'iv')
        DecryptCrypto(i, method, mode, padding, data, key, iv) {
            if (i == 0) {
                const encrypted = this.CryptoJS[method].encrypt(this.CryptoJS.enc.Utf8.parse(data), this.CryptoJS.enc.Utf8.parse(key), {
                    iv: this.CryptoJS.enc.Utf8.parse(iv),
                    mode: this.CryptoJS.mode[mode],
                    padding: this.CryptoJS.pad[padding],
                })
                return encrypted.toString()
            } else {
                const decrypt = this.CryptoJS[method].decrypt(data, this.CryptoJS.enc.Utf8.parse(key), {
                    iv: this.CryptoJS.enc.Utf8.parse(iv),
                    mode: this.CryptoJS.mode[mode],
                    padding: this.CryptoJS.pad[padding],
                })
                return decrypt.toString(this.CryptoJS.enc.Utf8)
            }
        }
        //RSA加密
        RSA(msg, Key) {
            const NodeRSA = require('node-rsa')
            let nodersa = new NodeRSA('-----BEGIN PUBLIC KEY-----\n' + Key + '\n-----END PUBLIC KEY-----')
            nodersa.setOptions({ encryptionScheme: 'pkcs1' })
            return nodersa.encrypt(msg, 'base64', 'utf8')
        }
        SHA_RSA(str, Keys) {
            let key = this.Sha_Rsa.KEYUTIL.getKey('-----BEGIN PRIVATE KEY-----\n' + $.getNewline(Keys, 76) + '\n-----END PRIVATE KEY-----')
            let signature = new this.Sha_Rsa.KJUR.crypto.Signature({ alg: 'SHA256withRSA' })
            signature.init(key)
            signature.updateString(str)
            let originSign = signature.sign()
            let sign64u = this.Sha_Rsa.hextob64u(originSign)
            return sign64u
        }
    })()
}