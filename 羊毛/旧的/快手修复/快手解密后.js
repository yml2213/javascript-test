/*
 * 慢手龟速-低保版 每日每号平均收入1w+金币
 * yml 7.11 改
 * 
 * ksjsb:salt@cookie@boxsig3 只要值   
 * salt : kuaishou.api_client_salt  登录包返回值    cookie: nebula.kuaishou.com 里的就型  boxsig3:宝箱的 __NS_sig3
 * 一个did只能2个号 自己改机玩 黑了就重抓 重抓还黑就可以宣布黑号了 目前随机风控 一个ip貌似只能5个号  实际自测
 
 * 注意: 只有宝箱成功开启才会执行任务 同时消耗一次token次数 每个号每天消耗10次token
 * 
 *
 */

require("dotenv").config()
const $ = Env("快手极速版-低保版")

let ksjsb_ = ($.isNode() ? process.env.ksjsb : $.getdata("ksjsb")) || ""
let sigurl = ($.isNode() ? process.env.sigurl : $.getdata("sigurl")) || "http://8.130.93.189:9002/ks/getAll"
let userCount = []
let nicknameArr = []


!(async () => {

    if (!(await checkEnv())) return
    else {
        console.log("共找到" + userCount.length + "个账号")
        console.log("========= 获取账号信息 =========")
        for (let i = 0; i < userCount.length; i++) {
            $.index = i + 1
            let ck_data = userCount[i]
            let ck_ = ck_data.split("@")
            if (ck_[0] && ck_[1] && ck_[2]) {
                $.cookie = ck_[1]
                await cash_check()  // 提现检测
                await usrrInfo(false)
                $.nickname = nicknameArr.push($.nickname)
            } else {
                console.log("第[" + $.index + "]个账号cookie格式错误,请检查后重新运行")
                return
            }
        }
        for (let i = 0; i < userCount.length; i++) {
            $.index = i + 1
            let ckArr = userCount[i],
                ck = ckArr.split("@")
            if (ck[0] && ck[1] && ck[2]) {
                $.salt = ck[0]
                $.cookie = ck[1]
                $.boxsig3 = ck[2]

                let cookie_ = JSON.parse('{"' + ck[1].replace(/"/g, '\\"').replace(/; /g, '","').replace(/&/g, '","').replace(/=/g, '":"') + '"}')
                var _0x1e167d = /\((.+?)\)/g
                $.mod = cookie_.mod
                $.modS = _0x1e167d.exec(decodeURIComponent($.mod))[1]
                $.kcv = cookie_.kcv
                $.androidApiLevel = cookie_.androidApiLevel
                $.android_os = cookie_.android_os
                $.boardPlatform = cookie_.boardPlatform
                $.newOc = cookie_.newOc
                $.nbh = cookie_.nbh
                $.did_gt = cookie_.did_gt
                $.sys = cookie_.sys
                $.max_memory = cookie_.max_memory
                $.cold_launch_time_ms = cookie_.cold_launch_time_ms
                $.oc = cookie_.oc
                $.sh = cookie_.sh
                $.socName = cookie_.socName
                $.c = cookie_.c
                $.sw = cookie_.sw
                $.totalMemory = cookie_.totalMemory
                $.apist = cookie_["kuaishou.api_st"]
                $.did = cookie_.did
                $.nickname = nicknameArr[i]
                console.log("=====账号" + $.index + "[" + $.nickname + "]-" + $.did.match(/ANDROID_([\w\-]+)/)[1] + "=====")
                console.log("账号[" + $.nickname + "]" + $.salt)


                await open_box() // 开宝箱

                await other_task()  // 其他任务

            } else {
                console.log("第[" + $.index + "]个账号cookie格式错误,请检查后重新运行")
                return
            }
        }
        console.log("============ 结束任务 查询金币 ============")
        for (let i = 0; i < userCount.length; i++) {
            $.index = i + 1
            let ck_data = userCount[i]
            let ck_ = ck_data.split("@")
            if (ck_[1]) {
                $.cookie = ck_[1]
                await usrrInfo(true)   // 账号信息
                $.nickname = nicknameArr.push($.nickname)
            } else {
                console.log("第[" + $.index + "]个账号cookie格式错误,请检查后重新运行")
                return
            }
        }
    }
})()
    .catch((err) => {
        $.log("", "❌ " + $.name + ", 失败! 原因: " + err + "!", "")
    })
    .finally(() => {
        $.done()
    })




async function open_box(_0xc82573 = 0, timeout = 3000) { // 开宝箱
    return new Promise((resolve) => {
        let url = ""
        url = "https://nebula.kuaishou.com/rest/n/nebula/box/explore?__NS_sig3=" + $.boxsig3 + "&sigCatVer=1&isOpen=true&isReadyOfAdPlay=true"
        const headers = {
            "Accept-Encoding": "gzip, deflate",
            Cookie: $.cookie,
            Connection: "keep-alive",
            Accept: "*/*",
            Host: "nebula.kuaishou.com",
            "Accept-Language": "en-us",
            "content-type": "application/json",
            Connection: "keep-alive",
            "User-Agent": "Mozilla/5.0 (Linux; Android 13; RMX3562 Build/TP1A.220905.001; wv) AppleWebKit/537.36 (KHTML, like Gecko) Version/4.0 Chrome/103.0.5060.129 Mobile Safari/537.36 Yoda/3.0.8-rc6 ksNebula/11.0.11.5015 OS_PRO_BIT/64 MAX_PHY_MEM/11428 AZPREFIX/yz ICFO/0 StatusHT/36 TitleHT/205 NetType/WIFI ISLP/0 ISDM/0 ISLB/0 locale/zh-cn evaSupported/false CT/0 ISLM/-1",
            Referer: "https://nebula.kuaishou.com/nebula/task/earning?layoutType=4&hyId=nebula_earning&source=bottom_guide_first",
        },
            Option = { url: url, headers: headers }
        $.get(
            Option,
            async (_0x510801, _0xd951e7, resp) => {
                try {
                    resp = JSON.parse(resp)
                    if (resp.result == 1) {
                        if (resp.data.commonAwardPopup == null) {
                            let _0x7acbf2 = resp.data.openTime
                            if (_0x7acbf2 / 1000 == -0.001) {
                                console.log("账号[" + $.nickname + "]开宝箱失败:今日宝箱已开完!")
                            } else {
                                console.log("账号[" + $.nickname + "]开宝箱冷却时间还有" + _0x7acbf2 / 1000 + "秒")
                            }
                        } else {
                            resp.data.commonAwardPopup != null && resp.data.commonAwardPopup != "" && (
                                console.log("账号[" + $.nickname + "]开宝箱成功获得" + resp.data.commonAwardPopup.awardAmount + "金币")

                            )
                        }

                    } else
                        console.log("账号[" + $.nickname + "]开宝箱出现未知错误,错误代码:" + resp.error_msg)
                } catch (err) {
                    $.logErr(err, _0xd951e7)
                } finally {
                    resolve()
                }
            },
            timeout
        )
    })
}
async function cash_check(timeout = 3000) {  // 提现检测
    return new Promise((resolve) => {
        let _0x2c17a6 = {
            url: "https://csc.m.kuaishou.com/rest/csc/center/tool/withdraw-risk/status",
            headers: {
                "Accept-Encoding": "gzip, deflate",
                Cookie: $.cookie,
                Connection: "keep-alive",
                Accept: "*/*",
                "Accept-Language": "en-us",
                "User-Agent": "Kwai-android aegon/3.4.0",
                "Content-Type": "application/json",
            },
            body: '{"withdrawAppealType":1,"channel":20}',
        }
        $.post(
            _0x2c17a6,
            async (_0x22c615, _0x1dde67, resp) => {
                try {
                    resp = JSON.parse(resp)
                    resp.result == 1
                        ? resp.data.reply ==
                            "暂时无违规内容，可以点击下方按钮直接进行提现，具体行为准则可见<a href='https://ppg.m.etoote.com/doodle/QNILxtCw.html'>【极速版活动规则】</a>。"
                            ? (_0x573a21 = ",账号提现状态:正常")
                            : (_0x573a21 = ",账号提现状态:未知")
                        : (_0x573a21 = ",账号提现状态:服务繁忙")
                } catch (_0x36a5a8) {
                    $.logErr(_0x36a5a8, _0x1dde67)
                } finally {
                    resolve()
                }
            },
            timeout
        )
    })
}
async function usrrInfo(_0x367878, _0x249c98 = 3000) { // 用户信息
    return new Promise((_0x1c0bde) => {
        const _0xde1b1b = {
            url: "https://nebula.kuaishou.com/rest/n/nebula/activity/earn/overview/basicInfo",
            headers: {
                "Accept-Encoding": "gzip, deflate",
                Cookie: $.cookie,
                Connection: "keep-alive",
                Accept: "*/*",
                Host: "nebula.kuaishou.com",
                "Accept-Language": "en-us",
                "User-Agent": "Kwai-android aegon/3.4.0",
            },
        }
        $.get(
            _0xde1b1b,
            async (_0x2f91b3, _0x3caedf, resp) => {
                try {
                    resp = JSON.parse(resp)
                    if (resp.result == 1) {
                        $.nickname = resp.data.userData.nickname
                        if (_0x367878 == true) console.log("账号[" + resp.data.userData.nickname + "]账户余额" + resp.data.totalCash + "元," + resp.data.totalCoin + "金币")
                        else {
                            console.log("账号[*]账户余额" + resp.data.totalCash + "元," + resp.data.totalCoin + "金币" + _0x573a21)
                        }
                    }
                } catch (err) {
                    $.logErr(err, _0x3caedf)
                } finally {
                    _0x1c0bde()
                }
            },
            _0x249c98
        )
    })
}


async function other_task(timeout = 3000) { // 其他任务
    return (
        await do_task("box1"), (_0x2242a6 = ""), (_0x2242a7 = ""),

        new Promise((resolve) => {
            const Option = {
                url: "https://nebula.kuaishou.com/rest/n/nebula/activity/earn/overview/tasks?addressBookAccessStatus=true&pushNotificationStatus=false",
                headers: {
                    "Accept-Encoding": "gzip, deflate",
                    Cookie: $.cookie,
                    Connection: "keep-alive",
                    Accept: "*/*",
                    Host: "nebula.kuaishou.com",
                    "Accept-Language": "en-us",
                    "User-Agent": "Kwai-android aegon/3.4.0",
                },
            }
            $.get(
                Option,
                async (_0x13791f, _0x2b16d7, resp) => {
                    try {
                        resp = JSON.parse(resp)
                        if (resp.result == 1)
                            for (let i = 0; i < resp.data.dailyTasks.length; i++) {
                                if (resp.data.dailyTasks[i].id == 34) {
                                    _0x2242a6 = true
                                    console.log("账号[" + $.nickname + "]任务[" + resp.data.dailyTasks[i].name + "]完成情况" + resp.data.dailyTasks[i].completedStages + "/" + resp.data.dailyTasks[i].stages)
                                    if (resp.data.dailyTasks[i].completedStages < resp.data.dailyTasks[i].stages) {
                                        await do_task_byid("75")
                                        await do_task_byid("363")
                                        if (resp.data.dailyTasks[i].stages > 10)
                                            for (let i = 0; i < 2; i++) {
                                                await $.wait(10000)
                                                await do_task_byid("75")
                                            }
                                    } else _0x2242a6 = false
                                }
                                resp.data.dailyTasks[i].id == 17 && ((_0x2242a7 = true),
                                    console.log("账号[" + $.nickname + "]任务[" + resp.data.dailyTasks[i].name + "]完成情况" + resp.data.dailyTasks[i].completedStages + "/" + resp.data.dailyTasks[i].stages),
                                    resp.data.dailyTasks[i].completedStages < resp.data.dailyTasks[i].stages ? await do_task("shipin") : (_0x2242a7 = false))


                                if (resp.data.dailyTasks[i].id == 20006) {
                                    console.log("账号[" + $.nickname + "]任务[" + resp.data.dailyTasks[i].name + "]完成情况" + resp.data.dailyTasks[i].completedStages + "/" + resp.data.dailyTasks[i].stages)
                                }
                            }
                        else
                            console.log("账号[" + $.nickname + "]任务刷新失败,跳过执行此账号")
                    } catch (err) {
                        $.logErr(err, _0x2b16d7)
                    } finally {
                        resolve()
                    }
                },
                timeout
            )
        })
    )
}


async function do_task(type, timeout = 3000) {
    let ts13 = Math.round(new Date().getTime()).toString()
    let body_diy_data = ""
    let url = ""

    if (type == "box1") {
        url = "https://api.e.kuaishou.com/rest/r/ad/nebula/reward?mod=" + $.mod + "&appver=9.11.10.2507&isp=&language=zh-cn&ud=&did_tag=7&net=WIFI&kcv=" + $.kcv + "&app=0&kpf=ANDROID_PHONE&bottom_navigation=true&ver=10.1&oDid=TEST_" + $.did + "&android_os=1&boardPlatform=" + $.boardPlatform + "&kpn=NEBULA&androidApiLevel=" + $.androidApiLevel + "&newOc=" + $.c + "&slh=0&country_code=cn&nbh=" + $.nbh + "&hotfix_ver=&did_gt=" + $.did_gt + "&apiInvokeTiming=COLD_START&keyconfig_state=2&sys=" + $.sys + "&max_memory=" + $.max_memory + "&cold_launch_time_ms=" + $.cold_launch_time_ms + "&oc=" + $.c + "&sh=" + $.sh + "&app_status=3&ddpi=480&deviceBit=0&browseType=3&power_mode=0&socName=" + $.socName + "&is_background=0&c=" + $.c + "&sw=" + $.sw + "&ftt=&apptype=22&is_app_prelaunch=0&abi=arm64&userRecoBit=0&device_abi=arm64&totalMemory=" + $.totalMemory + "&grant_browse_type=AUTHORIZED&iuid=&rdid=" + $.did + "&sbh=72&darkMode=false&did=" + $.did


        let a = ""
        a = '{"creativeId":' + _0x3860c9(20000001997, 22999991997) + ',"extInfo":"","llsid":200' + _0x3860c9(1000553820678945, 8999953820679999) + ',"taskType":1}'
        body_diy_data = 'bizStr={"endTime":' + ts13 + ',"eventValue":-1,"rewardList":[' + a + '],"startTime":' + ts13 + ',"taskId":77}'
    } else if (type == "sign") {
        url = "https://api.e.kuaishou.com/rest/r/ad/nebula/reward?mod=" + $.mod + "&appver=9.11.10.2507&isp=&language=zh-cn&ud=&did_tag=7&net=WIFI&kcv=" + $.kcv + "&app=0&kpf=ANDROID_PHONE&bottom_navigation=true&ver=10.1&oDid=TEST_" + $.did + "&android_os=1&boardPlatform=" + $.boardPlatform + "&kpn=NEBULA&androidApiLevel=" + $.androidApiLevel + "&newOc=" + $.c + "&slh=0&country_code=cn&nbh=" + $.nbh + "&hotfix_ver=&did_gt=" + $.did_gt + "&apiInvokeTiming=COLD_START&keyconfig_state=2&sys=" + $.sys + "&max_memory=" + $.max_memory + "&cold_launch_time_ms=" + $.cold_launch_time_ms + "&oc=" + $.c + "&sh=" + $.sh + "&app_status=3&ddpi=480&deviceBit=0&browseType=3&power_mode=0&socName=" + $.socName + "&is_background=0&c=" + $.c + "&sw=" + $.sw + "&ftt=&apptype=22&is_app_prelaunch=0&abi=arm64&userRecoBit=0&device_abi=arm64&totalMemory=" + $.totalMemory + "&grant_browse_type=AUTHORIZED&iuid=&rdid=" + $.did + "&sbh=72&darkMode=false&did=" + $.did

        let a = ""
        a = '{"creativeId":' + _0x3860c9(20000001997, 22999991997) + ',"extInfo":"","llsid":200' + _0x3860c9(1000553820678945, 8999953820679999) + ',"taskType":1}'
        body_diy_data = 'bizStr={"endTime":' + ts13 + ',"eventValue":136,"rewardList":[' + a + '],"startTime":' + ts13 + ',"taskId":-1}'
    } else if (type == "shipin") {
        url = "https://api.e.kuaishou.com/rest/r/ad/nebula/reward?mod=" + $.mod + "&appver=9.11.10.2507&isp=&language=zh-cn&ud=&did_tag=7&net=WIFI&kcv=" + $.kcv + "&app=0&kpf=ANDROID_PHONE&bottom_navigation=true&ver=10.1&oDid=TEST_" + $.did + "&android_os=1&boardPlatform=" + $.boardPlatform + "&kpn=NEBULA&androidApiLevel=" + $.androidApiLevel + "&newOc=" + $.c + "&slh=0&country_code=cn&nbh=" + $.nbh + "&hotfix_ver=&did_gt=" + $.did_gt + "&apiInvokeTiming=COLD_START&keyconfig_state=2&sys=" + $.sys + "&max_memory=" + $.max_memory + "&cold_launch_time_ms=" + $.cold_launch_time_ms + "&oc=" + $.c + "&sh=" + $.sh + "&app_status=3&ddpi=480&deviceBit=0&browseType=3&power_mode=0&socName=" + $.socName + "&is_background=0&c=" + $.c + "&sw=" + $.sw + "&ftt=&apptype=22&is_app_prelaunch=0&abi=arm64&userRecoBit=0&device_abi=arm64&totalMemory=" + $.totalMemory + "&grant_browse_type=AUTHORIZED&iuid=&rdid=" + $.did + "&sbh=72&darkMode=false&did=" + $.did
        let a = ""
        a = '{"creativeId":' + _0x3860c9(20000001997, 22999991997) + ',"extInfo":"","llsid":200' + _0x3860c9(1000553820678945, 8999953820679999) + ',"taskType":1},{"creativeId":' + _0x3860c9(20000001997, 22999991997) + ',"extInfo":"","llsid":200' + _0x3860c9(1000553820678945, 8999953820679999) + ',"taskType":2},{"creativeId":' + _0x3860c9(20000001997, 22999991997) + ',"extInfo":"","llsid":200' + _0x3860c9(1000553820678945, 8999953820679999) + ',"taskType":3},{"creativeId":' + _0x3860c9(20000001997, 22999991997) + ',"extInfo":"","llsid":200' + _0x3860c9(1000553820678945, 8999953820679999) + ',"taskType":4},{"creativeId":' + _0x3860c9(20000001997, 22999991997) + ',"extInfo":"","llsid":200' + _0x3860c9(1000553820678945, 8999953820679999) + ',"taskType":5},{"creativeId":' + _0x3860c9(20000001997, 22999991997) + ',"extInfo":"","llsid":200' + _0x3860c9(1000553820678945, 8999953820679999) + ',"taskType":6},{"creativeId":' + _0x3860c9(20000001997, 22999991997) + ',"extInfo":"","llsid":200' + _0x3860c9(1000553820678945, 8999953820679999) + ',"taskType":7},{"creativeId":' + _0x3860c9(20000001997, 22999991997) + ',"extInfo":"","llsid":200' + _0x3860c9(1000553820678945, 8999953820679999) + ',"taskType":8},{"creativeId":' + _0x3860c9(20000001997, 22999991997) + ',"extInfo":"","llsid":200' + _0x3860c9(1000553820678945, 8999953820679999) + ',"taskType":9},{"creativeId":' + _0x3860c9(20000001997, 22999991997) + ',"extInfo":"","llsid":200' + _0x3860c9(1000553820678945, 8999953820679999) + ',"taskType":10}'
        body_diy_data = 'bizStr={"endTime":' + ts13 + ',"eventValue":-1,"rewardList":[' + a + '],"startTime":' + ts13 + ',"taskId":0}'
    } else if (type == "shipin") {
        url = "https://api.e.kuaishou.com/rest/r/ad/nebula/reward?mod=" + $.mod + "&appver=9.11.10.2507&isp=&language=zh-cn&ud=&did_tag=7&net=WIFI&kcv=" + $.kcv + "&app=0&kpf=ANDROID_PHONE&bottom_navigation=true&ver=10.1&oDid=TEST_" + $.did + "&android_os=1&boardPlatform=" + $.boardPlatform + "&kpn=NEBULA&androidApiLevel=" + $.androidApiLevel + "&newOc=" + $.c + "&slh=0&country_code=cn&nbh=" + $.nbh + "&hotfix_ver=&did_gt=" + $.did_gt + "&apiInvokeTiming=COLD_START&keyconfig_state=2&sys=" + $.sys + "&max_memory=" + $.max_memory + "&cold_launch_time_ms=" + $.cold_launch_time_ms + "&oc=" + $.c + "&sh=" + $.sh + "&app_status=3&ddpi=480&deviceBit=0&browseType=3&power_mode=0&socName=" + $.socName + "&is_background=0&c=" + $.c + "&sw=" + $.sw + "&ftt=&apptype=22&is_app_prelaunch=0&abi=arm64&userRecoBit=0&device_abi=arm64&totalMemory=" + $.totalMemory + "&grant_browse_type=AUTHORIZED&iuid=&rdid=" + $.did + "&sbh=72&darkMode=false&did=" + $.did
        let a = ""
        a = '{"creativeId":' + _0x3860c9(20000001997, 22999991997) + ',"extInfo":"","llsid":200' + _0x3860c9(1000553820678945, 8999953820679999) + ',"taskType":1},{"creativeId":' + _0x3860c9(20000001997, 22999991997) + ',"extInfo":"","llsid":200' + _0x3860c9(1000553820678945, 8999953820679999) + ',"taskType":2},{"creativeId":' + _0x3860c9(20000001997, 22999991997) + ',"extInfo":"","llsid":200' + _0x3860c9(1000553820678945, 8999953820679999) + ',"taskType":3},{"creativeId":' + _0x3860c9(20000001997, 22999991997) + ',"extInfo":"","llsid":200' + _0x3860c9(1000553820678945, 8999953820679999) + ',"taskType":4},{"creativeId":' + _0x3860c9(20000001997, 22999991997) + ',"extInfo":"","llsid":200' + _0x3860c9(1000553820678945, 8999953820679999) + ',"taskType":5},{"creativeId":' + _0x3860c9(20000001997, 22999991997) + ',"extInfo":"","llsid":200' + _0x3860c9(1000553820678945, 8999953820679999) + ',"taskType":6},{"creativeId":' + _0x3860c9(20000001997, 22999991997) + ',"extInfo":"","llsid":200' + _0x3860c9(1000553820678945, 8999953820679999) + ',"taskType":7},{"creativeId":' + _0x3860c9(20000001997, 22999991997) + ',"extInfo":"","llsid":200' + _0x3860c9(1000553820678945, 8999953820679999) + ',"taskType":8},{"creativeId":' + _0x3860c9(20000001997, 22999991997) + ',"extInfo":"","llsid":200' + _0x3860c9(1000553820678945, 8999953820679999) + ',"taskType":9},{"creativeId":' + _0x3860c9(20000001997, 22999991997) + ',"extInfo":"","llsid":200' + _0x3860c9(1000553820678945, 8999953820679999) + ',"taskType":10}'
        body_diy_data = 'bizStr={"endTime":' + ts13 + ',"eventValue":-1,"rewardList":[' + a + '],"startTime":' + ts13 + ',"taskId":0}'
    } else
        type == "guangjie" && (
            (
                url = "https://api.e.kuaishou.com/rest/r/reward/task/getActivityReward?mod=" + $.mod + "&appver=9.11.10.2507&isp=&language=zh-cn&ud=&did_tag=7&net=WIFI&kcv=" + $.kcv + "&app=0&kpf=ANDROID_PHONE&bottom_navigation=true&ver=10.1&oDid=TEST_" + $.did + "&android_os=1&boardPlatform=" + $.boardPlatform + "&kpn=NEBULA&androidApiLevel=" + $.androidApiLevel + "&newOc=" + $.c + "&slh=0&country_code=cn&nbh=" + $.nbh + "&hotfix_ver=&did_gt=" + $.did_gt + "&apiInvokeTiming=COLD_START&keyconfig_state=2&sys=" + $.sys + "&max_memory=" + $.max_memory + "&cold_launch_time_ms=" + $.cold_launch_time_ms + "&oc=" + $.c + "&sh=" + $.sh + "&app_status=3&ddpi=480&deviceBit=0&browseType=3&power_mode=0&socName=" + $.socName + "&is_background=0&c=" + $.c + "&sw=" + $.sw + "&ftt=&apptype=22&is_app_prelaunch=0&abi=arm64&userRecoBit=0&device_abi=arm64&totalMemory=" + $.totalMemory + "&grant_browse_type=AUTHORIZED&iuid=&rdid=" + $.did + "&sbh=72&darkMode=false&did=" + $.did
            ), (body_diy_data = "activityId=148")
        )



    let body_diy = ""
    body_diy = body_diy_data + "&cs=false&client_key=2ac2a76d&os=android&kuaishou.api_st=" + $.apist + "&uQaTag=2"


    let diy_api_arg1 = ""
    diy_api_arg1 = await sort_diy(
        "mod=" + decodeURIComponent($.mod) + "&appver=9.11.10.2507&isp=&language=zh-cn&ud=&did_tag=7&net=WIFI&kcv=" + $.kcv + "&app=0&kpf=ANDROID_PHONE&bottom_navigation=true&ver=10.1&oDid=TEST_" + $.did + "&android_os=1&boardPlatform=" + $.boardPlatform + "&kpn=NEBULA&androidApiLevel=" + $.androidApiLevel + "&newOc=" + $.c + "&slh=0&country_code=cn&nbh=" + $.nbh + "&hotfix_ver=&did_gt=" + $.did_gt + "&apiInvokeTiming=COLD_START&keyconfig_state=2&sys=" + $.sys + "&max_memory=" + $.max_memory + "&cold_launch_time_ms=" + $.cold_launch_time_ms + "&oc=" + $.c + "&sh=" + $.sh + "&app_status=3&ddpi=480&deviceBit=0&browseType=3&power_mode=0&socName=" + decodeURIComponent($.socName) + "&is_background=0&c=" + $.c + "&sw=" + $.sw + "&ftt=&apptype=22&is_app_prelaunch=0&abi=arm64&userRecoBit=0&device_abi=arm64&totalMemory=" + $.totalMemory + "&grant_browse_type=AUTHORIZED&iuid=&rdid=" + $.did + "&sbh=72&darkMode=false&did=" + $.did,

        body_diy
    )

    // console.log(diy_api_arg1)
    if (type == "guangjie") {
        $.sig3 = ""
        await diy_api(diy_api_arg1, "" + $.salt, "/rest/r/reward/task/getActivityReward")

        if ($.sig3 == "") {
            for (let i = 0; i < 50; i++) {
                console.log("账号[" + $.nickname + "]接口Api调用失败,等待10s后重试")
                await $.wait(10000)
                await getsig2(diy_api_arg1, "" + $.salt, "/rest/r/reward/task/getActivityReward")
                if ($.sig3 != "") {
                    break
                }
            }
        }
        $.sig3 == "" && (console.log("账号[" + $.nickname + "]接口Api调用失败,请检查接口后重新运行脚本"),
            process.exit(0))
    } else {
        $.sig3 = ""
        await diy_api(diy_api_arg1, "" + $.salt, "/rest/r/ad/nebula/reward")
        if ($.sig3 == "") {
            for (let _0x31dda6 = 0; _0x31dda6 < 50; _0x31dda6++) {
                console.log("账号[" + $.nickname + "]接口Api调用失败,等待10s后重试")
                await $.wait(10000)
                await getsig2(diy_api_arg1, "" + $.salt, "/rest/r/reward/task/getActivityReward")
                if ($.sig3 != "") {
                    break
                }
            }
        }
        $.sig3 == "" && (console.log("账号[" + $.nickname + "]接口Api调用失败,请检查接口后重新运行脚本"),
            process.exit(0))
    }
    url = url + "&sig=" + $.sig + "&__NS_sig3=" + $.sig3 + "&__NStokensig=" + $.tokensig
    const headers = {
        Host: "api.e.kuaishou.com",
        Connection: "keep-alive",
        "User-Agent": "kwai-android aegon/3.4.2",
        "Accept-Language": "zh-cn",
        "Content-Type": "application/x-www-form-urlencoded",
        "Accept-Encoding": "gzip, deflate, br",
        "X-Client-Info": "model=" + $.modS + ";os=Android;nqe-score=38;network=WIFI;signal-strength=4",
    },
        Option = { url: url, body: body_diy, headers: headers }
    return new Promise((_0x351a21) => {
        $.post(
            Option,
            async (_0x582ef3, _0x4e0007, resp) => {
                try {
                    resp = JSON.parse(resp)
                    if (resp.result == 1) {
                        if (type == "guangjie") {
                            console.log("账号[" + $.nickname + "]逛街获得" + resp.data.amount + "金币")
                            _0x2242a1 = true
                        } else {
                            if (resp.data.awardAmount > 500) {
                                if (type == "shipin") console.log("账号[" + $.nickname + "]看超级翻倍广告获得" + resp.data.awardAmount + "金币")
                                else {
                                    if (type == "box1") console.log("账号[" + $.nickname + "]看宝箱翻倍广告获得" + resp.data.awardAmount + "金币")
                                    else {
                                        if (type == "sign") {
                                            console.log("账号[" + $.nickname + "]看普通签到视频获得" + resp.data.awardAmount + "金币")
                                        }
                                    }
                                }
                            } else {
                                if (type == "shipin") console.log("账号[" + $.nickname + "]看普通视频广告获得" + resp.data.awardAmount + "金币")
                                else {
                                    if (type == "box1") console.log("账号[" + $.nickname + "]看宝箱翻倍广告获得" + resp.data.awardAmount + "金币")
                                    else type == "sign" && console.log("账号[" + $.nickname + "]看普通签到视频获得" + resp.data.awardAmount + "金币")
                                }
                            }
                        }

                    } else {
                        if (type == "guangjie") {
                            resp.error_msg == "风控失败" ? (console.log("账号[" + $.nickname + "]逛街失败:" + resp.error_msg), (_0x2242a1 = false)) : (_0x2242a1 = true)
                        }
                    }
                } catch (_0x8fff29) {
                    $.logErr(_0x8fff29, _0x4e0007)
                } finally {
                    _0x351a21()
                }
            },
            timeout
        )
    })
}


async function checkEnv() {
    if (ksjsb_)
        ksjsb_.indexOf("&") != -1
            ? ksjsb_.split("&").forEach((_0x30b2ee) => {
                _0x30b2ee && userCount.push(("" + _0x30b2ee).replace(/#/g, "@"))
            })
            : ksjsb_.indexOf("\n") != -1
                ? ksjsb_.split("\n").forEach((_0x2cafdc) => {
                    _0x2cafdc && userCount.push(("" + _0x2cafdc).replace(/#/g, "@"))
                })
                : ksjsb_ && userCount.push(("" + ksjsb_).replace(/#/g, "@"))
    else {
        console.log("\n 【" + $.name + "】：未填写变量 ksjsb")
        return
    }
    return true
}



async function get_info_id(_0x9371b6, _0x14b476 = 3000) {
    extInfo = ""
    creativeId = ""
    pageId = ""
    subPageId = ""
    liveStreamId = ""
    let url_ = "https://api2.e.kuaishou.com/rest/nebula/fanstop/earnCoin?mod=" + $.mod + "&appver=11.1.40.5218&isp=&language=zh-cn&ud=&did_tag=7&net=WIFI&kcv=" + $.kcv + "&app=0&kpf=ANDROID_PHONE&bottom_navigation=true&ver=10.1&oDid=TEST_" + $.did + "&android_os=1&boardPlatform=" + $.boardPlatform + "&kpn=NEBULA&androidApiLevel=" + $.androidApiLevel + "&newOc=" + $.c + "&slh=0&country_code=cn&nbh=" + $.nbh + "&hotfix_ver=&did_gt=" + $.did_gt + "&apiInvokeTiming=COLD_START&keyconfig_state=2&sys=" + $.sys + "&max_memory=" + $.max_memory + "&cold_launch_time_ms=" + $.cold_launch_time_ms + "&oc=" + $.c + "&sh=" + $.sh + "&app_status=3&ddpi=480&deviceBit=0&browseType=3&power_mode=0&socName=" + $.socName + "&is_background=0&c=" + $.c + "&sw=" + $.sw + "&ftt=&apptype=22&is_app_prelaunch=0&abi=arm64&userRecoBit=0&device_abi=arm64&totalMemory=" + $.totalMemory + "&grant_browse_type=AUTHORIZED&iuid=&rdid=" + $.did + "&sbh=72&darkMode=false&did=" + $.did

    let body_ = _0x9371b6 + "&os=android&token=" + $.apist + "&cs=false&client_key=2ac2a76d&kuaishou.api_st=" + $.apist + "&uQaTag=0#00000000000000000000", diy_api_arg1 = ""

    diy_api_arg1 = await sort_diy(
        "mod=" + decodeURIComponent($.mod) + "&appver=11.1.40.5218&isp=&language=zh-cn&ud=&did_tag=7&net=WIFI&kcv=" + $.kcv + "&app=0&kpf=ANDROID_PHONE&bottom_navigation=true&ver=10.1&oDid=TEST_" + $.did + "&android_os=1&boardPlatform=" + $.boardPlatform + "&kpn=NEBULA&androidApiLevel=" + $.androidApiLevel + "&newOc=" + $.c + "&slh=0&country_code=cn&nbh=" + $.nbh + "&hotfix_ver=&did_gt=" + $.did_gt + "&apiInvokeTiming=COLD_START&keyconfig_state=2&sys=" + $.sys + "&max_memory=" + $.max_memory + "&cold_launch_time_ms=" + $.cold_launch_time_ms + "&oc=" + $.c + "&sh=" + $.sh + "&app_status=3&ddpi=480&deviceBit=0&browseType=3&power_mode=0&socName=" + decodeURIComponent($.socName) + "&is_background=0&c=" + $.c + "&sw=" + $.sw + "&ftt=&apptype=22&is_app_prelaunch=0&abi=arm64&userRecoBit=0&device_abi=arm64&totalMemory=" + $.totalMemory + "&grant_browse_type=AUTHORIZED&iuid=&rdid=" + $.did + "&sbh=72&darkMode=false&did=" + $.did,
        body_
    )
    $.sig3 = ""
    await diy_api(diy_api_arg1, "" + $.salt, "/rest/nebula/fanstop/earnCoin"
    )
    if ($.sig3 == "")
        for (let i = 0; i < 50; i++) {
            console.log("账号[" + $.nickname + "]接口Api调用失败,等待10s后重试")
            await $.wait(10000)
            await getsig2(diy_api_arg1, "" + $.salt, "/rest/nebula/fanstop/earnCoin")
            if ($.sig3 != "") break
        }
    return (
        $.sig3 == "" &&
        (console.log("账号[" + $.nickname + "]接口Api调用失败,请检查接口后重新运行脚本"), process.exit(0)),
        (url_ = url_ + "&sig=" + $.sig + "&__NS_sig3=" + $.sig3 + "&__NStokensig=" + $.tokensig),
        new Promise((_0x1d3ed6) => {
            let opt = {
                url: url_,
                body: body_,
                headers: {
                    "Accept-Encoding": "gzip, deflate",
                    Connection: "keep-alive",
                    Accept: "*/*",
                    "Accept-Language": "en-us",
                    "User-Agent": "Kwai-android aegon/3.4.0",
                },
            }
            $.post(
                opt,
                async (_0x401347, _0x3e5099, resp) => {
                    try {
                        resp = JSON.parse(resp)
                        if (resp.result == 1) {
                            if (
                                resp.awards[0].feed.ad.adDataV2.inspireAdInfo.neoParams
                            ) {
                                llsid = resp.llsid
                                extInfo = resp.awards[0].feed.ad.adDataV2.inspireAdInfo.neoParams
                                creativeId = resp.awards[0].feed.ad.creativeId
                                pageId = resp.awards[0].feed.ad.pageId
                                subPageId = resp.awards[0].feed.ad.subPageId
                                liveStreamId = resp.awards[0].feed.liveStreamId
                            } else await get_info_id(_0x9371b6)
                        }
                    } catch (_0x5bf57e) {
                        $.logErr(_0x5bf57e, _0x3e5099)
                    } finally {
                        _0x1d3ed6()
                    }
                },
                _0x14b476
            )
        })
    )
}
async function do_task_byid(id, timeout = 3000) {
    let diy_api_arg1 = "",
        _0x3164a2 = ""
    id == "75" ? (await get_info_id(
        "awardType=0&pcursor=&refreshTimes=2&recoReportContext=%7B%22adClientInfo%22%3A%7B%22xiaomiCustomMarketInfo%22%3A%7B%22support%22%3Atrue%2C%22detailStyle%22%3A%221%2C2%2C3%2C5%2C100%2C101%22%7D%7D%7D&displayType=1&neoParams=&tabId=0&videoModelCrowdTag=1_73"
    ),
        (_0x3164a2 =
            'bizStr={"businessId":75,"endTime":0,"extParams":"","mediaScene":"live","neoInfos":[{"creativeId":' +
            creativeId +
            ',"extInfo":"' +
            extInfo +
            '","feedId":"' +
            liveStreamId +
            '","llsid":' +
            llsid +
            ',"taskType":1}],"pageId":' +
            pageId +
            ',"posId":2318,"startTime":0,"subPageId":' +
            subPageId +
            "}&cs=false&client_key=2ac2a76d&os=android&kuaishou.api_st=" +
            $.apist +
            "&uQaTag=2"),
        (diy_api_arg1 = await sort_diy(
            "mod=" +
            decodeURIComponent($.mod) +
            "&appver=9.11.10.2507&isp=&language=zh-cn&ud=&did_tag=7&net=WIFI&kcv=" +
            $.kcv +
            "&app=0&kpf=ANDROID_PHONE&bottom_navigation=true&ver=10.1&oDid=TEST_" +
            $.did +
            "&android_os=1&boardPlatform=" +
            $.boardPlatform +
            "&kpn=NEBULA&androidApiLevel=" +
            $.androidApiLevel +
            "&newOc=" +
            $.c +
            "&slh=0&country_code=cn&nbh=" +
            $.nbh +
            "&hotfix_ver=&did_gt=" +
            $.did_gt +
            "&apiInvokeTiming=COLD_START&keyconfig_state=2&sys=" +
            $.sys +
            "&max_memory=" +
            $.max_memory +
            "&cold_launch_time_ms=" +
            $.cold_launch_time_ms +
            "&oc=" +
            $.c +
            "&sh=" +
            $.sh +
            "&app_status=3&ddpi=480&deviceBit=0&browseType=3&power_mode=0&socName=" +
            decodeURIComponent($.socName) +
            "&is_background=0&c=" +
            $.c +
            "&sw=" +
            $.sw +
            "&ftt=&apptype=22&is_app_prelaunch=0&abi=arm64&userRecoBit=0&device_abi=arm64&totalMemory=" +
            $.totalMemory +
            "&grant_browse_type=AUTHORIZED&iuid=&rdid=" +
            $.did +
            "&sbh=72&darkMode=false&did=" +
            $.did,
            _0x3164a2
        )),
        (url =
            "https://api2.e.kuaishou.com/rest/r/ad/task/report?mod=" +
            $.mod +
            "&appver=9.11.10.2507&isp=&language=zh-cn&ud=&did_tag=7&net=WIFI&kcv=" +
            $.kcv +
            "&app=0&kpf=ANDROID_PHONE&bottom_navigation=true&ver=10.1&oDid=TEST_" +
            $.did +
            "&android_os=1&boardPlatform=" +
            $.boardPlatform +
            "&kpn=NEBULA&androidApiLevel=" +
            $.androidApiLevel +
            "&newOc=" +
            $.c +
            "&slh=0&country_code=cn&nbh=" +
            $.nbh +
            "&hotfix_ver=&did_gt=" +
            $.did_gt +
            "&apiInvokeTiming=COLD_START&keyconfig_state=2&sys=" +
            $.sys +
            "&max_memory=" +
            $.max_memory +
            "&cold_launch_time_ms=" +
            $.cold_launch_time_ms +
            "&oc=" +
            $.c +
            "&sh=" +
            $.sh +
            "&app_status=3&ddpi=480&deviceBit=0&browseType=3&power_mode=0&socName=" +
            $.socName +
            "&is_background=0&c=" +
            $.c +
            "&sw=" +
            $.sw +
            "&ftt=&apptype=22&is_app_prelaunch=0&abi=arm64&userRecoBit=0&device_abi=arm64&totalMemory=" +
            $.totalMemory +
            "&grant_browse_type=AUTHORIZED&iuid=&rdid=" +
            $.did +
            "&sbh=72&darkMode=false&did=" +
            $.did))
        : id == "363" &&
        (await get_info_id(
            "awardType=0&pcursor=&refreshTimes=1&recoReportContext=%7B%22adClientInfo%22%3A%7B%22xiaomiCustomMarketInfo%22%3A%7B%22support%22%3Atrue%2C%22detailStyle%22%3A%221%2C2%2C3%2C5%2C100%2C101%22%7D%7D%7D&displayType=1&neoParams=eyJwYWdlSWQiOjEwMDAxMjA2MCwic3ViUGFnZUlkIjoxMDAwMjA2OTQsImJ1c2luZXNzSWQiOjM2MywiZXh0UGFyYW1zIjoiYWM4NWNmYTc4NGNiOGNiNWQ2ZjZlMzE4NzRlZmU3ODFiNjU4OTJmZTMwMjkxMDJhZDdlMWZkY2YyNGQxODA0MTYyMjZhYWM0NjA5MjU1OGE0ODVkOWEwYTUxOGZhNmJiZTJiMTRiZGUwNmQ5YmQ5ODNhODIwNzJlMWE3NzVhYjlhYTA1YTcwODNlZDU2NWM2NTFmMjBkZWNjODE4NzA3MTZjMDIwNTQ5NDUwZDE4MDM3ZWM5MjY5MmZjNDQ3ZjYzIiwiY3VzdG9tRGF0YSI6eyJleGl0SW5mbyI6eyJ0b2FzdERlc2MiOm51bGwsInRvYXN0SW1nVXJsIjpudWxsfX0sInBlbmRhbnRUeXBlIjoxLCJkaXNwbGF5VHlwZSI6MSwiY2hhbm5lbCI6MCwiY291bnRkb3duUmVwb3J0IjpmYWxzZSwiYXV0b1JlcG9ydCI6dHJ1ZX0&tabId=0"
        ),
            (_0x3164a2 =
                'bizStr={"businessId":363,"endTime":0,"extParams":"1dd91aaf1c0e8d5d5b89cc7230750f97117e75813672bd11fba6a73dcd5876366519bb16b2245bd796b10e37c1bfb17751fb3bf8d1a9231cedbfa8ab3622f9433e07b5f2d37dbd2dffafa89c86beef41c2b7ea33731307fb6fe20042f8dcb94c","mediaScene":"live","neoInfos":[{"creativeId":' +
                creativeId +
                ',"extInfo":"' +
                extInfo +
                '","feedId":"' +
                liveStreamId +
                '","llsid":' +
                llsid +
                ',"taskType":1}],"pageId":' +
                pageId +
                ',"posId":15173,"startTime":0,"subPageId":' +
                subPageId +
                "}&cs=false&client_key=2ac2a76d&os=android&kuaishou.api_st=" +
                $.apist +
                "&uQaTag=2"),
            (diy_api_arg1 = await sort_diy(
                "mod=" +
                decodeURIComponent($.mod) +
                "&appver=10.6.10.3898&isp=&language=zh-cn&ud=&did_tag=7&net=WIFI&kcv=" +
                $.kcv +
                "&app=0&kpf=ANDROID_PHONE&bottom_navigation=true&ver=10.1&oDid=TEST_" +
                $.did +
                "&android_os=1&boardPlatform=" +
                $.boardPlatform +
                "&kpn=NEBULA&androidApiLevel=" +
                $.androidApiLevel +
                "&newOc=" +
                $.c +
                "&slh=0&country_code=cn&nbh=" +
                $.nbh +
                "&hotfix_ver=&did_gt=" +
                $.did_gt +
                "&apiInvokeTiming=COLD_START&keyconfig_state=2&sys=" +
                $.sys +
                "&max_memory=" +
                $.max_memory +
                "&cold_launch_time_ms=" +
                $.cold_launch_time_ms +
                "&oc=" +
                $.c +
                "&sh=" +
                $.sh +
                "&app_status=3&ddpi=480&deviceBit=0&browseType=3&power_mode=0&socName=" +
                decodeURIComponent($.socName) +
                "&is_background=0&c=" +
                $.c +
                "&sw=" +
                $.sw +
                "&ftt=&apptype=22&is_app_prelaunch=0&abi=arm64&userRecoBit=0&device_abi=arm64&totalMemory=" +
                $.totalMemory +
                "&grant_browse_type=AUTHORIZED&iuid=&rdid=" +
                $.did +
                "&sbh=72&darkMode=false&did=" +
                $.did,
                _0x3164a2
            )),
            (url =
                "https://api2.e.kuaishou.com/rest/r/ad/task/report?mod=" +
                $.mod +
                "&appver=10.6.10.3898&isp=&language=zh-cn&ud=&did_tag=7&net=WIFI&kcv=" +
                $.kcv +
                "&app=0&kpf=ANDROID_PHONE&bottom_navigation=true&ver=10.1&oDid=TEST_" +
                $.did +
                "&android_os=1&boardPlatform=" +
                $.boardPlatform +
                "&kpn=NEBULA&androidApiLevel=" +
                $.androidApiLevel +
                "&newOc=" +
                $.c +
                "&slh=0&country_code=cn&nbh=" +
                $.nbh +
                "&hotfix_ver=&did_gt=" +
                $.did_gt +
                "&apiInvokeTiming=COLD_START&keyconfig_state=2&sys=" +
                $.sys +
                "&max_memory=" +
                $.max_memory +
                "&cold_launch_time_ms=" +
                $.cold_launch_time_ms +
                "&oc=" +
                $.c +
                "&sh=" +
                $.sh +
                "&app_status=3&ddpi=480&deviceBit=0&browseType=3&power_mode=0&socName=" +
                $.socName +
                "&is_background=0&c=" +
                $.c +
                "&sw=" +
                $.sw +
                "&ftt=&apptype=22&is_app_prelaunch=0&abi=arm64&userRecoBit=0&device_abi=arm64&totalMemory=" +
                $.totalMemory +
                "&grant_browse_type=AUTHORIZED&iuid=&rdid=" +
                $.did +
                "&sbh=72&darkMode=false&did=" +
                $.did))
    $.sig3 = ""
    await diy_api(diy_api_arg1, "" + $.salt, "/rest/r/ad/task/report")
    if ($.sig3 == "") {
        for (let i = 0; i < 50; i++) {
            console.log("账号[" + $.nickname + "]接口Api调用失败,等待10s后重试")
            await $.wait(10000)
            await getsig2(diy_api_arg1, "" + $.salt, "/rest/r/ad/task/report")
            if ($.sig3 != "") {
                break
            }
        }
    }
    $.sig3 == "" && (console.log("账号[" + $.nickname + "]接口Api调用失败,请检查接口后重新运行脚本"),
        process.exit(0))
    url = url + "&sig=" + $.sig + "&__NS_sig3=" + $.sig3 + "&__NStokensig=" + $.tokensig
    const opt = {
        url: url,
        body: _0x3164a2,
        headers: {
            "Accept-Encoding": "gzip, deflate, br",
            "Content-Type": "application/x-www-form-urlencoded",
            Connection: "keep-alive",
            "X-Client-Info":
                "model=" +
                $.modS +
                ";os=Android;nqe-score=38;;network=WIFI;signal-strength=4",
            Host: "api2.e.kuaishou.com",
            "Accept-Language": "en-us",
            "User-Agent": "Kwai-android aegon/3.4.0",
        },
    }
    return new Promise((_0x3562cd) => {
        $.post(
            opt,
            async (_0x4a788b, _0x37ca8e, resp) => {
                try {
                    resp = JSON.parse(resp)
                    if (resp.result == 1) {
                        if (id == "75") console.log("账号[" + $.nickname + "]看直播获得" + resp.data.neoAmount + "金币")
                        else {
                            if (id == "363") {
                                console.log("账号[" + $.nickname + "]看直播2获得" + resp.data.neoAmount + "金币")
                            }
                        }
                    } else {
                        if (id == "75") console.log("账号[" + $.nickname + "]看直播失败:" + resp.error_msg)
                        else {
                            id == "363" && console.log("账号[" + $.nickname + "]看直播2失败:" + resp.error_msg)
                        }
                    }
                } catch (_0x23674e) {
                    $.logErr(_0x23674e, _0x37ca8e)
                } finally {
                    _0x3562cd()
                }
            },
            timeout
        )
    })
}

// 调用接口
async function diy_api(diy_api_arg1, api_salt, api_url, timeout = 3 * 1000) {
    return new Promise((resolve) => {
        let Option = {
            url: sigurl, //"http://8.130.93.189:9002/ks/getAll"
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
                body: diy_api_arg1,
                client_salt: api_salt,
                url: api_url,
                kstoken: "1",
            }),
        }
        $.post(
            Option,
            async (err, err_data, resp) => {
                try {
                    if (resp) {
                        resp = JSON.parse(resp)
                        resp.code == 200 && (resp.data.sig ? (($.sig = resp.data.sig), ($.sig3 = resp.data.sig3), ($.tokensig = resp.data.tokensig)) : await diy_api(diy_api_arg1, api_salt, api_url))
                    } else await diy_api(diy_api_arg1, api_salt, api_url)
                } catch (err) {
                    $.logErr(err, err_data)
                } finally {
                    resolve()
                }
            },
            timeout
        )
    })
}
async function sort_diy(_0x4fd694, body_diy) {  // (长, body_diy)
    let _0x5ec3f7 = [],
        _0x455b3 = ""
    _0x455b3 = _0x4fd694 + "&" + body_diy
    _0x5ec3f7 = _0x455b3.split("&")
    _0x5ec3f7.sort()
    let sort_end = ""
    for (let i = 0; i < _0x5ec3f7.length; i++) {
        sort_end += _0x5ec3f7[i]
    }
    // console.log(sort_end)
    return sort_end
}


function _0x3860c9(_0x21f667, _0xfc9db6) {
    return Math.round(Math.random() * _0xfc9db6 - _0x21f667 + _0x21f667)
}
function Env(_0x382bf9, _0x496b16) {  // 代码格式化检测1
    const _0x262010 = (function () {
        let _0x4ed0ec = true
        return function (_0x3f1ea8, _0x263c6b) {
            const _0x5a179c = _0x4ed0ec
                ? function () {
                    if (_0x263c6b) {

                        return (_0x4ed0ec = false), _0x5a179c

                        // const _0x4ad74d = _0x263c6b.apply(_0x3f1ea8, arguments)
                        // return (_0x263c6b = null), _0x4ad74d
                    }
                }
                : function () { }
            return (_0x4ed0ec = false), _0x5a179c
        }
    })(),
        _0x3055d1 = _0x262010(this, function () {
            return _0x3055d1
                .toString()
                .search("(((.+)+)+)+$")
                .toString()
                .constructor(_0x3055d1)
                .search("(((.+)+)+)+$")
        })
    _0x3055d1()
    "undefined" != typeof process &&
        JSON.stringify(process.env).indexOf("GITHUB") > -1 &&
        process.exit(0)
    class _0x49a84c {
        constructor(_0x415f73) {
            this.env = _0x415f73
        }
        ["send"](_0x18dfa0, _0x7b9099 = "GET") {
            _0x18dfa0 = "string" == typeof _0x18dfa0 ? { url: _0x18dfa0 } : _0x18dfa0
            let _0x1b9eea = this.get
            return (
                "POST" === _0x7b9099 && (_0x1b9eea = this.post),
                new Promise((_0x209ef4, _0x21ebe4) => {
                    _0x1b9eea.call(this, _0x18dfa0, (_0x34584c, _0x6242f8, _0xe03350) => {
                        _0x34584c ? _0x21ebe4(_0x34584c) : _0x209ef4(_0x6242f8)
                    })
                })
            )
        }
        ["get"](_0x52ca45) {
            return this.send.call(this.env, _0x52ca45)
        }
        ["post"](_0xff94d9) {
            return this.send.call(this.env, _0xff94d9, "POST")
        }
    }
    return new (class {
        constructor(_0x1b9c9a, _0x20f208) {
            this.name = _0x1b9c9a
            this.http = new _0x49a84c(this)
            this.data = null
            this.dataFile = "box.dat"
            this.logs = []
            this.isMute = false
            this.isNeedRewrite = false
            this.logSeparator = "\n"
            this.startTime = new Date().getTime()
            Object.assign(this, _0x20f208)
            this.log("", "🔔" + this.name + ", 开始!")
        }
        ["isNode"]() {
            return "undefined" != typeof module && !!module.exports
        }
        ["isQuanX"]() {
            return "undefined" != typeof $task
        }
        ["isSurge"]() {
            return "undefined" != typeof $httpClient && "undefined" == typeof $loon
        }
        ["isLoon"]() {
            return "undefined" != typeof $loon
        }
        ["toObj"](_0x8865e1, _0xba4965 = null) {
            try {
                return JSON.parse(_0x8865e1)
            } catch {
                return _0xba4965
            }
        }
        ["toStr"](_0x50a34e, _0x3adf44 = null) {
            try {
                return JSON.stringify(_0x50a34e)
            } catch {
                return _0x3adf44
            }
        }
        ["getjson"](_0x2522c6, _0x282f05) {
            let _0x496bd0 = _0x282f05
            const _0x4f9c9d = this.getdata(_0x2522c6)
            if (_0x4f9c9d)
                try {
                    _0x496bd0 = JSON.parse(this.getdata(_0x2522c6))
                } catch { }
            return _0x496bd0
        }
        ["setjson"](_0x49d894, _0x1442c2) {
            try {
                return this.setdata(JSON.stringify(_0x49d894), _0x1442c2)
            } catch {
                return false
            }
        }
        ["getScript"](_0x5dea64) {
            return new Promise((_0x5d0f76) => {
                const _0x197e84 = { url: _0x5dea64 }
                this.get(_0x197e84, (_0x1127a8, _0x1283dc, _0x38d85e) =>
                    _0x5d0f76(_0x38d85e)
                )
            })
        }
        ["runScript"](_0x34300f, _0x4ae540) {
            return new Promise((_0x35023a) => {
                let _0x3e94e7 = this.getdata("@chavy_boxjs_userCfgs.httpapi")
                _0x3e94e7 = _0x3e94e7 ? _0x3e94e7.replace(/\n/g, "").trim() : _0x3e94e7
                let _0x36d2e3 = this.getdata("@chavy_boxjs_userCfgs.httpapi_timeout")
                _0x36d2e3 = _0x36d2e3 ? 1 * _0x36d2e3 : 20
                _0x36d2e3 =
                    _0x4ae540 && _0x4ae540.timeout ? _0x4ae540.timeout : _0x36d2e3
                const _0x42a7e7 = {
                    script_text: _0x34300f,
                    mocookie_type: "cron",
                    timeout: _0x36d2e3,
                },
                    [_0x32ec40, _0x978683] = _0x3e94e7.split("@"),
                    _0x5ce45d = {
                        url: "http://" + _0x978683 + "/v1/scripting/evaluate",
                        body: _0x42a7e7,
                        headers: { "X-Key": _0x32ec40, Accept: "*/*" },
                    }
                this.post(_0x5ce45d, (_0x3fb2fc, _0x4f0b42, _0x847ef3) =>
                    _0x35023a(_0x847ef3)
                )
            }).catch((_0x1e07c8) => this.logErr(_0x1e07c8))
        }
        ["loaddata"]() {
            if (!this.isNode()) return {}
            {
                this.fs = this.fs ? this.fs : require("fs")
                this.path = this.path ? this.path : require("path")
                const _0x82467f = this.path.resolve(this.dataFile),
                    _0x3fa3b3 = this.path.resolve(process.cwd(), this.dataFile),
                    _0x36b8fc = this.fs.existsSync(_0x82467f),
                    _0x378936 = !_0x36b8fc && this.fs.existsSync(_0x3fa3b3)
                if (!_0x36b8fc && !_0x378936) return {}
                {
                    const _0x1c7190 = _0x36b8fc ? _0x82467f : _0x3fa3b3
                    try {
                        return JSON.parse(this.fs.readFileSync(_0x1c7190))
                    } catch (_0x4108d8) {
                        return {}
                    }
                }
            }
        }
        ["writedata"]() {
            if (this.isNode()) {
                this.fs = this.fs ? this.fs : require("fs")
                this.path = this.path ? this.path : require("path")
                const _0x2c1105 = this.path.resolve(this.dataFile),
                    _0x1bf11c = this.path.resolve(process.cwd(), this.dataFile),
                    _0x2780e3 = this.fs.existsSync(_0x2c1105),
                    _0x2b111d = !_0x2780e3 && this.fs.existsSync(_0x1bf11c),
                    _0x19b323 = JSON.stringify(this.data)
                _0x2780e3
                    ? this.fs.writeFileSync(_0x2c1105, _0x19b323)
                    : _0x2b111d
                        ? this.fs.writeFileSync(_0x1bf11c, _0x19b323)
                        : this.fs.writeFileSync(_0x2c1105, _0x19b323)
            }
        }
        ["lodash_get"](_0x161895, _0x33002, _0x443884) {
            const _0x32c96f = _0x33002.replace(/\[(\d+)\]/g, ".$1").split(".")
            let _0x2463d4 = _0x161895
            for (const _0x11d314 of _0x32c96f)
                if (((_0x2463d4 = Object(_0x2463d4)[_0x11d314]), void 0 === _0x2463d4))
                    return _0x443884
            return _0x2463d4
        }
        ["lodash_set"](_0x321404, _0x2ae3db, _0x250482) {
            return Object(_0x321404) !== _0x321404
                ? _0x321404
                : (Array.isArray(_0x2ae3db) ||
                    (_0x2ae3db = _0x2ae3db.toString().match(/[^.[\]]+/g) || []),
                    (_0x2ae3db
                        .slice(0, -1)
                        .reduce(
                            (_0x336e0d, _0xec7b0, _0x1474e1) =>
                                Object(_0x336e0d[_0xec7b0]) === _0x336e0d[_0xec7b0]
                                    ? _0x336e0d[_0xec7b0]
                                    : (_0x336e0d[_0xec7b0] =
                                        Math.abs(_0x2ae3db[_0x1474e1 + 1]) >> 0 ==
                                            +_0x2ae3db[_0x1474e1 + 1]
                                            ? []
                                            : {}),
                            _0x321404
                        )[_0x2ae3db[_0x2ae3db.length - 1]] = _0x250482),
                    _0x321404)
        }
        ["getdata"](_0x19cff1) {
            let _0x44f3de = this.getval(_0x19cff1)
            if (/^@/.test(_0x19cff1)) {
                const [, _0x186d12, _0x4458a9] = /^@(.*?)\.(.*?)$/.exec(_0x19cff1),
                    _0x338f58 = _0x186d12 ? this.getval(_0x186d12) : ""
                if (_0x338f58) {
                    try {
                        const _0x4e1ca2 = JSON.parse(_0x338f58)
                        _0x44f3de = _0x4e1ca2
                            ? this.lodash_get(_0x4e1ca2, _0x4458a9, "")
                            : _0x44f3de
                    } catch (_0x1e5e33) {
                        _0x44f3de = ""
                    }
                }
            }
            return _0x44f3de
        }
        ["setdata"](_0x4bd4a3, _0x525edf) {
            let _0x3b24c4 = false
            if (/^@/.test(_0x525edf)) {
                const [, _0x2e144c, _0x4ab3b5] = /^@(.*?)\.(.*?)$/.exec(_0x525edf),
                    _0x573be6 = this.getval(_0x2e144c),
                    _0x257eca = _0x2e144c
                        ? "null" === _0x573be6
                            ? null
                            : _0x573be6 || "{}"
                        : "{}"
                try {
                    const _0x2f9715 = JSON.parse(_0x257eca)
                    this.lodash_set(_0x2f9715, _0x4ab3b5, _0x4bd4a3)
                    _0x3b24c4 = this.setval(JSON.stringify(_0x2f9715), _0x2e144c)
                } catch (_0x249807) {
                    const _0x13772f = {}
                    this.lodash_set(_0x13772f, _0x4ab3b5, _0x4bd4a3)
                    _0x3b24c4 = this.setval(JSON.stringify(_0x13772f), _0x2e144c)
                }
            } else _0x3b24c4 = this.setval(_0x4bd4a3, _0x525edf)
            return _0x3b24c4
        }
        ["getval"](_0x4132e5) {
            return this.isSurge() || this.isLoon()
                ? $persistentStore.read(_0x4132e5)
                : this.isQuanX()
                    ? $prefs.valueForKey(_0x4132e5)
                    : this.isNode()
                        ? ((this.data = this.loaddata()), this.data[_0x4132e5])
                        : (this.data && this.data[_0x4132e5]) || null
        }
        ["setval"](_0x48def9, _0x35ed19) {
            return this.isSurge() || this.isLoon()
                ? $persistentStore.write(_0x48def9, _0x35ed19)
                : this.isQuanX()
                    ? $prefs.setValueForKey(_0x48def9, _0x35ed19)
                    : this.isNode()
                        ? ((this.data = this.loaddata()),
                            (this.data[_0x35ed19] = _0x48def9),
                            this.writedata(),
                            true)
                        : (this.data && this.data[_0x35ed19]) || null
        }
        ["initGotEnv"](_0x44bc9d) {
            this.got = this.got ? this.got : require("got")
            this.cktough = this.cktough ? this.cktough : require("tough-cookie")
            this.ckjar = this.ckjar ? this.ckjar : new this.cktough.CookieJar()
            _0x44bc9d &&
                ((_0x44bc9d.headers = _0x44bc9d.headers ? _0x44bc9d.headers : {}),
                    void 0 === _0x44bc9d.headers.Cookie &&
                    void 0 === _0x44bc9d.cookieJar &&
                    (_0x44bc9d.cookieJar = this.ckjar))
        }
        ["get"](_0x3ad4aa, _0xcb5dc7 = () => { }) {
            const _0x2b971e = { "X-Surge-Skip-Scripting": false },
                _0x27a056 = { hints: false }
            _0x3ad4aa.headers &&
                (delete _0x3ad4aa.headers["Content-Type"],
                    delete _0x3ad4aa.headers["Content-Length"])
            this.isSurge() || this.isLoon()
                ? (this.isSurge() &&
                    this.isNeedRewrite &&
                    ((_0x3ad4aa.headers = _0x3ad4aa.headers || {}),
                        Object.assign(_0x3ad4aa.headers, _0x2b971e)),
                    $httpClient.get(_0x3ad4aa, (_0x5571e4, _0x53012a, _0x21a57a) => {
                        !_0x5571e4 &&
                            _0x53012a &&
                            ((_0x53012a.body = _0x21a57a),
                                (_0x53012a.statusCode = _0x53012a.status))
                        _0xcb5dc7(_0x5571e4, _0x53012a, _0x21a57a)
                    }))
                : this.isQuanX()
                    ? (this.isNeedRewrite &&
                        ((_0x3ad4aa.opts = _0x3ad4aa.opts || {}),
                            Object.assign(_0x3ad4aa.opts, _0x27a056)),
                        $task.fetch(_0x3ad4aa).then(
                            (_0x3a9bf5) => {
                                const {
                                    statusCode: _0x50932a,
                                    statusCode: _0x146b2d,
                                    headers: _0x58d20c,
                                    body: _0x5b62d5,
                                } = _0x3a9bf5,
                                    _0x140f11 = {
                                        status: _0x50932a,
                                        statusCode: _0x146b2d,
                                        headers: _0x58d20c,
                                        body: _0x5b62d5,
                                    }
                                _0xcb5dc7(null, _0x140f11, _0x5b62d5)
                            },
                            (_0x2bf1f2) => _0xcb5dc7(_0x2bf1f2)
                        ))
                    : this.isNode() &&
                    (this.initGotEnv(_0x3ad4aa),
                        this.got(_0x3ad4aa)
                            .on("redirect", (_0x54c029, _0x515185) => {
                                try {
                                    if (_0x54c029.headers["set-cookie"]) {
                                        const _0x36f558 = _0x54c029.headers["set-cookie"]
                                            .map(this.cktough.Cookie.parse)
                                            .toString()
                                        _0x36f558 && this.ckjar.setCookieSync(_0x36f558, null)
                                        _0x515185.cookieJar = this.ckjar
                                    }
                                } catch (_0xec6354) {
                                    this.logErr(_0xec6354)
                                }
                            })
                            .then(
                                (_0x297e90) => {
                                    const {
                                        statusCode: _0x3ab85e,
                                        statusCode: _0x17218a,
                                        headers: _0x5f26ef,
                                        body: _0xb19cf6,
                                    } = _0x297e90,
                                        _0x4351a0 = {
                                            status: _0x3ab85e,
                                            statusCode: _0x17218a,
                                            headers: _0x5f26ef,
                                            body: _0xb19cf6,
                                        }
                                    _0xcb5dc7(null, _0x4351a0, _0xb19cf6)
                                },
                                (_0x1ecead) => {
                                    const { message: _0x3756d3, response: _0x322f45 } = _0x1ecead
                                    _0xcb5dc7(_0x3756d3, _0x322f45, _0x322f45 && _0x322f45.body)
                                }
                            ))
        }
        ["post"](_0x5caacf, _0x3812aa = () => { }) {
            const _0x1cd1c4 = { "X-Surge-Skip-Scripting": false },
                _0x55c604 = { hints: false }
            if (
                (_0x5caacf.body &&
                    _0x5caacf.headers &&
                    !_0x5caacf.headers["Content-Type"] &&
                    (_0x5caacf.headers["Content-Type"] =
                        "application/x-www-form-urlencoded"),
                    _0x5caacf.headers && delete _0x5caacf.headers["Content-Length"],
                    this.isSurge() || this.isLoon())
            ) {
                this.isSurge() &&
                    this.isNeedRewrite &&
                    ((_0x5caacf.headers = _0x5caacf.headers || {}),
                        Object.assign(_0x5caacf.headers, _0x1cd1c4))
                $httpClient.post(_0x5caacf, (_0x5d5c5e, _0x15415f, _0x1e0ee1) => {
                    !_0x5d5c5e &&
                        _0x15415f &&
                        ((_0x15415f.body = _0x1e0ee1),
                            (_0x15415f.statusCode = _0x15415f.status))
                    _0x3812aa(_0x5d5c5e, _0x15415f, _0x1e0ee1)
                })
            } else {
                if (this.isQuanX()) {
                    _0x5caacf.method = "POST"
                    this.isNeedRewrite &&
                        ((_0x5caacf.opts = _0x5caacf.opts || {}),
                            Object.assign(_0x5caacf.opts, _0x55c604))
                    $task.fetch(_0x5caacf).then(
                        (_0x53829b) => {
                            const {
                                statusCode: _0x4e9254,
                                statusCode: _0x56be77,
                                headers: _0x91d42,
                                body: _0xafe5fd,
                            } = _0x53829b,
                                _0x262b69 = {
                                    status: _0x4e9254,
                                    statusCode: _0x56be77,
                                    headers: _0x91d42,
                                    body: _0xafe5fd,
                                }
                            _0x3812aa(null, _0x262b69, _0xafe5fd)
                        },
                        (_0x59acae) => _0x3812aa(_0x59acae)
                    )
                } else {
                    if (this.isNode()) {
                        this.initGotEnv(_0x5caacf)
                        const { url: _0x52af1d, ..._0x34df66 } = _0x5caacf
                        this.got.post(_0x52af1d, _0x34df66).then(
                            (_0x3f872b) => {
                                const {
                                    statusCode: _0x78ea27,
                                    statusCode: _0x349ee7,
                                    headers: _0x341670,
                                    body: _0x4ed820,
                                } = _0x3f872b,
                                    _0x2b7aad = {
                                        status: _0x78ea27,
                                        statusCode: _0x349ee7,
                                        headers: _0x341670,
                                        body: _0x4ed820,
                                    }
                                _0x3812aa(null, _0x2b7aad, _0x4ed820)
                            },
                            (_0x23bf70) => {
                                const { message: _0x26772b, response: _0x750a7e } = _0x23bf70
                                _0x3812aa(_0x26772b, _0x750a7e, _0x750a7e && _0x750a7e.body)
                            }
                        )
                    }
                }
            }
        }
        ["time"](_0x34fa8b, _0x18db58 = null) {
            const _0x114081 = _0x18db58 ? new Date(_0x18db58) : new Date()
            let _0x246f90 = {
                "M+": _0x114081.getMonth() + 1,
                "d+": _0x114081.getDate(),
                "H+": _0x114081.getHours(),
                "m+": _0x114081.getMinutes(),
                "s+": _0x114081.getSeconds(),
                "q+": Math.floor((_0x114081.getMonth() + 3) / 3),
                S: _0x114081.getMilliseconds(),
            };
            /(y+)/.test(_0x34fa8b) &&
                (_0x34fa8b = _0x34fa8b.replace(
                    RegExp.$1,
                    (_0x114081.getFullYear() + "").substr(4 - RegExp.$1.length)
                ))
            for (let _0x41295a in _0x246f90)
                new RegExp("(" + _0x41295a + ")").test(_0x34fa8b) &&
                    (_0x34fa8b = _0x34fa8b.replace(
                        RegExp.$1,
                        1 == RegExp.$1.length
                            ? _0x246f90[_0x41295a]
                            : ("00" + _0x246f90[_0x41295a]).substr(
                                ("" + _0x246f90[_0x41295a]).length
                            )
                    ))
            return _0x34fa8b
        }
        ["msg"](_0x3a2013 = _0x382bf9, _0x52652c = "", _0x1e4b6e = "", _0x2d5334) {
            const _0xc91b7d = (_0x3af45a) => {
                if (!_0x3af45a) return _0x3af45a
                if ("string" == typeof _0x3af45a) {
                    return this.isLoon()
                        ? _0x3af45a
                        : this.isQuanX()
                            ? { "open-url": _0x3af45a }
                            : this.isSurge()
                                ? { url: _0x3af45a }
                                : void 0
                }
                if ("object" == typeof _0x3af45a) {
                    if (this.isLoon()) {
                        let _0x3b223c =
                            _0x3af45a.openUrl || _0x3af45a.url || _0x3af45a["open-url"],
                            _0xff3320 = _0x3af45a.mediaUrl || _0x3af45a["media-url"]
                        const _0x59f36f = { openUrl: _0x3b223c, mediaUrl: _0xff3320 }
                        return _0x59f36f
                    }
                    if (this.isQuanX()) {
                        let _0xb87850 =
                            _0x3af45a["open-url"] || _0x3af45a.url || _0x3af45a.openUrl,
                            _0x36d749 = _0x3af45a["media-url"] || _0x3af45a.mediaUrl
                        const _0x451e6e = { "open-url": _0xb87850, "media-url": _0x36d749 }
                        return _0x451e6e
                    }
                    if (this.isSurge()) {
                        let _0x1014c2 =
                            _0x3af45a.url || _0x3af45a.openUrl || _0x3af45a["open-url"]
                        const _0x51a102 = { url: _0x1014c2 }
                        return _0x51a102
                    }
                }
            }
            if (
                (this.isMute ||
                    (this.isSurge() || this.isLoon()
                        ? $notification.post(
                            _0x3a2013,
                            _0x52652c,
                            _0x1e4b6e,
                            _0xc91b7d(_0x2d5334)
                        )
                        : this.isQuanX() &&
                        $notify(_0x3a2013, _0x52652c, _0x1e4b6e, _0xc91b7d(_0x2d5334))),
                    !this.isMuteLog)
            ) {
                let _0x4a3b96 = ["", "==============📣系统通知📣=============="]
                _0x4a3b96.push(_0x3a2013)
                _0x52652c && _0x4a3b96.push(_0x52652c)
                _0x1e4b6e && _0x4a3b96.push(_0x1e4b6e)
                console.log(_0x4a3b96.join("\n"))
                this.logs = this.logs.concat(_0x4a3b96)
            }
        }
        ["log"](..._0x49a138) {
            _0x49a138.length > 0 && (this.logs = [...this.logs, ..._0x49a138])
            console.log(_0x49a138.join(this.logSeparator))
        }
        ["logErr"](_0x2ac7a6, _0x31b25b) {
            const _0x2d9200 = !this.isSurge() && !this.isQuanX() && !this.isLoon()
            _0x2d9200
                ? this.log("", "❗️" + this.name + ", 错误!", _0x2ac7a6.stack)
                : this.log("", "❗️" + this.name + ", 错误!", _0x2ac7a6)
        }
        ["wait"](_0x433260) {
            return new Promise((_0x27e34c) => setTimeout(_0x27e34c, _0x433260))
        }
        ["done"](_0x10f489 = {}) {
            const _0x3b5c65 = new Date().getTime(),
                _0x20b4a7 = (_0x3b5c65 - this.startTime) / 1000
            this.log("", "🔔" + this.name + ", 结束! 🕛 " + _0x20b4a7 + " 秒")
            this.log();
            (this.isSurge() || this.isQuanX() || this.isLoon()) && $done(_0x10f489)
        }
    })(_0x382bf9, _0x496b16)
}
