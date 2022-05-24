/**
 * 脚本地址: https://raw.githubusercontent.com/yml2213/javascript/master/jrttjsb/jrttjsb.js
 * 转载请留信息,谢谢
 *
 * 今日头条极速版
 *
 * cron 30 6 * * *  yml2213_javascript_master/jrttjsb.js
 *
 * 3-17   完成签到、评论、分享、回帖 任务
 * 5-22   听说黑号也能提现了   自己试试吧
 *
 * 感谢所有测试人员
 * ========= 青龙--配置文件 =========
 * 变量格式: export jrttjsb_data='cookie & cookie'  多个账号用 @ 或者 换行分割
 *
 * 神秘代码: aHR0cHM6Ly90Lm1lL3ltbF90Zw==
 */

const $ = new Env("今日头条极速版");
const notify = $.isNode() ? require("./sendNotify") : "";
const Notify = 1 		//0为关闭通知,1为打开通知,默认为1
const debug = 1 		//0为关闭调试,1为打开调试,默认为0
///////////////////////////////////////////////////////////////////
let ckStr = process.env.jrttjsb_data;
let msg = "";
let ck = "";
let host = "api5-normal-lf.toutiaoapi.com";
let hostname = "https://" + host;
let version = "88011";
///////////////////////////////////////////////////////////////////
let Version = '\nyml   2022/5/24     折腾下这个老毛吧,没好的新毛  '
let thank = `感谢 xxxx 的投稿`
let test = `脚本测试中,有bug及时反馈!     脚本测试中,有bug及时反馈!`

///////////////////////////////////////////////////////////////////

async function tips(ckArr) {

    console.log(`${Version}`);
    msg += `${Version}`

    // console.log(thank);
    // msg += `${thank}`

    // console.log(test);
    // msg += `${test}`

    // console.log(` 脚本已恢复正常状态,请及时更新! `);
    // msg += `脚本已恢复正常状态,请及时更新`

    console.log(`==================================================\n 脚本执行 - 北京时间(UTC+8): ${new Date(
        new Date().getTime() + new Date().getTimezoneOffset() * 60 * 1000 + 8 * 60 * 60 * 1000
    ).toLocaleString()} \n==================================================`);
    await wyy();

    console.log(`\n=================== 共找到 ${ckArr.length} 个账号 ===================`);
    debugLog(`【debug】 这是你的账号数组:\n ${ckArr}`);
}

!(async () => {
    let ckArr = await getCks(ckStr, "jrttjsb_data");
    await tips(ckArr);
    for (let index = 0; index < ckArr.length; index++) {
        jrttjsb_num = index + 1;
        console.log(`------------- 开始【第 ${jrttjsb_num} 个账号】-------------`);

        ck = ckArr[index].split("&");

        debugLog(`【debug】 这是你第 ${jrttjsb_num} 账号信息:\n ${ck}`);
        await start();
    }
    await SendMsg(msg);
})()
    .catch((e) => $.logErr(e))
    .finally(() => $.done());


async function start() {


    // console.log("开始 用户信息");
    // await user_info(1);
    // await $.wait(3 * 1000);

    // console.log("\n开始 睡觉状态");
    // await QuerySleepStatus();
    // await $.wait(3 * 1000);

    // console.log("\n开始 走路状态");
    // await QueryWalkInfo();
    // await $.wait(3 * 1000);

    let time_hours = local_hours();
    if (time_hours >= 5 && time_hours <= 9) {
        console.log("\n开始 早餐补贴");
        await EatInfo('早餐补贴', 0);
        await $.wait(3 * 1000);
    }
    if (time_hours >= 11 && time_hours <= 14) {
        console.log("\n开始 午餐补贴");
        await EatInfo('午餐补贴', 1);
        await $.wait(3 * 1000);
    }
    if (time_hours >= 17 && time_hours <= 20) {
        console.log("\n开始 晚餐补贴");
        await EatInfo('晚餐补贴', 2);
        await $.wait(3 * 1000);
    }
    if (time_hours >= 21 && time_hours <= 24) {
        console.log("\n开始 夜宵补贴");
        await EatInfo('夜宵补贴', 3);
        await $.wait(3 * 1000);
    }



    // for (let m = 1; m < 4; m++) {
    //     console.log(`开始 第 ${m} 次分享领红包`)
    //     await share();
    //     await $.wait(5 * 1000);
    // }

}


/**
 * 用户信息    httpGet
 */
async function user_info(doTask) {
    let url = {
        url: `https://api5-normal-lf.toutiaoapi.com/luckycat/lite/v1/task/page_data/?aid=35`,
        headers: {
            'Host': 'api5-normal-lf.toutiaoapi.com',
            'Cookie': ck[0],
            'content-type': 'application/json'
        },
        // body: '',
    };
    let result = await httpGet(url, `用户信息`);

    if (result.err_no == 0) {
        if (!result.data.treasure) {
            console.log(`   用户${jrttjsb_num} 查询状态失败,CK失效 `)
            return;
        }
        if (doTask == 0) {
            console.log(`   账户信息:金币:${result.data.user_income.score_balance} ,现金:${result.data.user_income.cash_balance / 100}元 `)
        } else {
            if (result.data.treasure.next_treasure_time == result.data.treasure.current_time) {
                await OpenTreasureBox()
            } else {
                let cdTime = result.data.treasure.next_treasure_time - result.data.treasure.current_time
                console.log(`    宝箱状态: 开宝箱冷却时间还有 ${cdTime} 秒`);
                msg += `\n    宝箱状态: 开宝箱冷却时间还有 ${cdTime} 秒`;
            }
            if (result.data.signin_detail.today_signed == false) {
                await SignIn()
            } else {
                console.log(`    签到: 用户 ${jrttjsb_num} 今天已签到`);
                msg += `\n    签到: 用户 ${jrttjsb_num} 今天已签到`;
            }
        }
    } else {
        console.log(`   用户信息: 失败 ❌ 了呢,原因未知！  ${result} `);
        msg += `\n    用户信息: 失败 ❌ 了呢,原因未知!`;
        throw new Error(`${$.name}:喂  喂 ---  用户信息失败了,别睡了, 起来更新了喂!`);
    }
}





/**
 * 开宝箱    httpPost
 */
async function OpenTreasureBox() {
    let url = {
        url: `https://api5-normal-lf.toutiaoapi.com/score_task/v1/task/open_treasure_box/?aid=35`,
        headers: {
            'Host': 'api5-normal-lf.toutiaoapi.com',
            'Cookie': ck[0],
            'content-type': 'application/json'
        },
        body: JSON.stringify({
            "from": "task_page",
            "use_ecpm": 0,
            "rit": "coin",
            "enable_preload_exciting_video": 0,
            "open_treasure_box_enter_from": ""
        }),
    };
    let result = await httpPost(url, `开宝箱`);

    if (result.err_no == 0) {
        console.log(`   开宝箱: 获得 ${result.data.score_amount} 金币`);
        msg += `\n   开宝箱: 获得 ${result.data.score_amount} 金币`;
    } else {
        console.log(`   开宝箱: 失败 ❌ 了呢,原因未知！ ${result.err_tips} `);
        msg += `\n   开宝箱: 失败 ❌ 了呢,原因未知!`;
    }
}



/**
 * 签到    httpPost
 */
async function SignIn() {
    let url = {
        url: `https://api5-normal-lf.toutiaoapi.com/luckycat/lite/v1/sign_in/action?aid=35`,
        headers: {
            'Host': 'api5-normal-lf.toutiaoapi.com',
            'Cookie': ck[0],
            'content-type': 'application/json'
        },
        body: ''
    };
    let result = await httpPost(url, `签到`);

    if (result.err_no == 0) {
        console.log(`   签到: ${result.retinfo} ,获得 ${result.data.score_amount} 金币，已连续签到 ${result.data.sign_times} 天`);
        msg += `\n   签到: ${result.retinfo} ,获得 ${result.data.score_amount} 金币，已连续签到 ${result.data.sign_times} 天`;
    } else {
        console.log(`   签到: 失败 ❌ 了呢,原因未知！  ${result} `);
        msg += `\n   签到: 失败 ❌ 了呢,原因未知!`;
    }
}


/**
 * 睡觉状态    httpGet
 */
async function QuerySleepStatus() {

    let curHour = local_hours()
    let url = {
        url: `${hostname}/luckycat/lite/v1/sleep/status/?aid=35`,
        headers: {
            'Host': host,
            'Cookie': ck[0],
            'content-type': 'application/json'
        },
    };
    let result = await httpGet(url, `睡觉状态`);

    if (result.err_no == 0) {
        let sleepHour = Math.floor(result.data.sleep_last_time / 36) / 100;
        if (result.data.sleeping == true) {
            if (sleepHour >= 12) {
                await SleepStop()
            } else if (result.data.sleep_unexchanged_score == result.data.max_coin && curHour >= 7) {
                let rnd = Math.random()
                if (rnd > 0.95) {
                    await SleepStop()
                } else {
                    console.log(`    用户${jrttjsb_num}随机醒来时间，本次不进行醒来，已经睡了${sleepHour}小时，可以获得${result.data.sleep_unexchanged_score}金币`);
                    msg += `\n    用户${jrttjsb_num}随机醒来时间，本次不进行醒来，已经睡了${sleepHour}小时，可以获得${result.data.sleep_unexchanged_score}金币`;
                }
            } else {
                console.log(`    用户${jrttjsb_num}睡眠中，已经睡了${sleepHour}小时，可以获得${result.data.sleep_unexchanged_score}金币，上限${result.data.max_coin}金币`);
                msg += `\n    用户${jrttjsb_num}睡眠中，已经睡了${sleepHour}小时，可以获得${result.data.sleep_unexchanged_score}金币，上限${result.data.max_coin}金币`;
            }
        } else {
            if (result.data.history_amount > 0) {
                await SleepDone(result.data.history_amount)
            }
            if (curHour >= 22 || curHour < 2) {
                await SleepStart()
            } else if (curHour >= 20) {
                let rnd = Math.random()
                if (rnd > 0.95) {
                    await SleepStart()
                } else {
                    console.log(`    用户${jrttjsb_num}随机睡眠时间，本次不进行睡眠`);
                    msg += `\n    用户${jrttjsb_num}随机睡眠时间，本次不进行睡眠`;
                }
            } else {
                console.log(`    用户${jrttjsb_num}未到睡觉时间`);
                msg += `\n    用户${jrttjsb_num}随机睡眠时间，本次不进行睡眠`;
            }
        }
    } else {
        console.log(`    用户${jrttjsb_num}查询睡觉状态失败：${result.err_tips}`);
        msg += `\n    用户${jrttjsb_num}随机睡眠时间，本次不进行睡眠`;
    }
}


/**
 * 睡觉醒来    httpPost
 */
async function SleepStop() {
    let url = {
        url: `${hostname}/api/news/feed/v78/?aid=35`,
        headers: {
            'Host': host,
            'Cookie': ck[0],
            'content-type': 'application/json'
        }, body: '',
    };
    let result = await httpPost(url, `睡觉醒来`);

    if (result.err_no == 0) {
        let sleepHour = result.data.sleep_last_time / 3600;
        console.log(`    用户${jrttjsb_num}结束睡眠，本次睡了${sleepHour}小时，可以领取${result.data.history_amount}金币`);
        msg += `\n    用户${jrttjsb_num}结束睡眠，本次睡了${sleepHour}小时，可以领取${result.data.history_amount}金币`;
        await SleepDone(result.data.history_amount)
    } else {
        console.log(`   睡觉醒来: 失败 ❌ 了呢,原因未知！  ${result} `);
        msg += `\n    睡觉醒来: 失败 ❌ 了呢,原因未知!`;
    }
}


/**
 * 睡觉醒来收金币    httpPost
 */
async function SleepDone(amount) {
    let timeInMS = ts13();
    let url = {
        url: `${hostname}/luckycat/lite/v1/sleep/done_task/?aid=35&_rticket=${timeInMS}`,
        headers: {
            'Host': host,
            'Cookie': ck[0],
            'content-type': 'application/json'
        }, body: `{"score_amount":${amount},"enable_preload_exciting_video":0}`,
    };
    let result = await httpPost(url, `睡觉醒来收金币`);

    if (result.err_no === 0) {
        console.log(`    领取睡觉金币奖励 ${amount} 金币成功`);
        msg += `\n    领取睡觉金币奖励 ${amount} 金币成功`;
    } else {
        console.log(`   睡觉醒来收金币: 失败 ❌ 了呢,原因未知!`);
        console.log(result);
        msg += `\n    睡觉醒来收金币: 失败 ❌ 了呢,原因未知!`;
    }
}



/**
 * 开始睡觉    httpPost
 */
async function SleepStart() {
    let url = {
        url: `${hostname}/luckycat/lite/v1/sleep/start/?aid=35`,
        headers: {
            'Host': host,
            'Cookie': ck[0],
            'content-type': 'application/json'
        }, body: '',
    };
    let result = await httpPost(url, `开始睡觉`);

    if (result.err_no == 0) {
        console.log(`    开始睡觉, ZZZzzz...`);
        msg += `\n    开始睡觉, ZZZzzz...`;
        await SleepDone(result.data.history_amount)
    } else {
        console.log(`   开始睡觉: 失败 ❌ 了呢,原因未知!`);
        console.log(result);
        msg += `\n    开始睡觉: 失败 ❌ 了呢,原因未知!`;
    }
}


/**
 * 查询走路状态    httpGet
 */
async function QueryWalkInfo() {
    let url = {
        url: `${hostname}/luckycat/lite/v1/walk/page_data/?aid=35`,
        headers: {
            'Host': host,
            'Cookie': ck[0],
            // 'content-type': 'application/json'
        },
    };
    let result = await httpGet(url, `查询走路状态`);

    if (result.err_no == 0) {
        if (result.data.can_get_amount > 0) await GetWalkBonus()
    } else {
        console.log(`   查询走路状态: 失败 ❌ 了呢,原因未知!`);
        console.log(result);
        msg += `\n    查询走路状态: 失败 ❌ 了呢,原因未知!`;
    }
}



/**
 * 走路奖励    httpPost  
 */
async function GetWalkBonus() {
    let nowtime = ts10();
    let url = {
        url: `${hostname}/luckycat/lite/v1/walk/bonus/?aid=35`,
        headers: {
            'Host': host,
            'Cookie': ck[0],
            'content-type': 'application/json'
        }, body: `{"task_id":136,"client_time":${nowtime},"rit":"coin","use_ecpm":0,"enable_preload_exciting_video":0}`,
    };
    let result = await httpPost(url, `走路奖励`);

    if (result.err_no == 0) {
        console.log(`    领取走路奖励获得 ${result.data.score_amount} 金币`);
        msg += `\n    领取走路奖励获得 ${result.data.score_amount} 金币`;
    } else {
        console.log(`   走路奖励: 失败 ❌ 了呢,原因未知!`);
        console.log(result);
        msg += `\n    走路奖励: 失败 ❌ 了呢,原因未知!`;
    }
}





/**
 * 查询吃饭补贴    httpGet
 */
async function EatInfo(eat_name, taskId) {
    let url = {
        url: `${hostname}/luckycat/lite/v1/eat/done_eat/?update_version_code=${version}&device_platform=android&aid=35`,
        headers: {
            'Host': host,
            'Cookie': ck[0],
            'content-type': 'application/json'
        },
    };
    let result = await httpGet(url, `${eat_name}`);

    if (result.err_no == 0) {
        if (taskId == 0) {
            if (esult.data.can_get_amount) {

            }

        }
        if (result.data.complete_status[taskId] == false) {
            await GetWalkBonus()
        }
    } else {
        console.log(`   查询吃饭补贴: 失败 ❌ 了呢,原因未知!`);
        console.log(result);
        msg += `\n    查询吃饭补贴: 失败 ❌ 了呢,原因未知!`;
    }
}





/**
 * 吃饭补贴    httpPost  
 * https://api5-normal-lf.toutiaoapi.com/luckycat/lite/v1/eat/done_eat/?update_version_code=88011&device_platform=android&aid=35
 */
async function DoneEat() {
    let url = {
        url: `${hostname}/luckycat/lite/v1/eat/done_eat/?update_version_code=${version}&device_platform=android&aid=35`,
        headers: {
            'Host': host,
            'Cookie': ck[0],
            'content-type': 'application/json'
        }, body: '{"enable_preload_exciting_video":0}',
    };
    let result = await httpPost(url, `吃饭补贴`);

    if (result.err_no == 0) {
        console.log(`    领取吃饭补贴获得 ${result.data.score_amount} 金币`);
        msg += `\n    领取吃饭补贴获得 ${result.data.score_amount} 金币`;
    } else if (result.err_no == 1071) {
        console.log(`    领取吃饭补贴 ${result.err_tips}`);
        msg += `\n    领取吃饭补贴获得 ${result.err_tips}`;
    } else {
        console.log(`   吃饭补贴: 失败 ❌ 了呢,原因未知!`);
        console.log(result);
        msg += `\n    吃饭补贴: 失败 ❌ 了呢,原因未知!`;
    }
}
















//#region 固定代码
// ============================================变量检查============================================ \\

async function getCks(ck, str) {


    return new Promise((resolve) => {

        let ckArr = []
        if (ck) {
            if (ck.indexOf("@") !== -1) {

                ck.split("@").forEach((item) => {
                    ckArr.push(item);
                });
            } else if (ck.indexOf("\n") !== -1) {

                ck.split("\n").forEach((item) => {
                    ckArr.push(item);
                });
            } else {
                ckArr.push(ck);
            }
            resolve(ckArr)
        } else {
            console.log(` 【${$.name}】:未填写变量 ${str}`)
        }

    }
    )
}

// ============================================发送消息============================================ \\

async function SendMsg(message) {
    if (!message) return;

    if (Notify > 0) {
        if ($.isNode()) {
            let notify = require("./sendNotify");
            await notify.sendNotify($.name, message);
        } else {
            $.msg(message);
        }
    } else {
        console.log(message);
    }
}

/**
 * 随机数生成
 */

function randomString(e) {
    e = e || 32;
    let t = "QWERTYUIOPASDFGHJKLZXCVBNM1234567890",
        a = t.length,
        n = "";

    for (i = 0; i < e; i++) n += t.charAt(Math.floor(Math.random() * a));
    return n;
}

/**
 * 随机整数生成
 */

function randomInt(min, max) {
    return Math.round(Math.random() * (max - min) + min);
}


/**
 * 时间戳 13位
 */

function ts13() {
    return Math.round(new Date().getTime()).toString();
}

/**
 * 时间戳 10位
 */

function ts10() {
    return Math.round(new Date().getTime() / 1000).toString();
}

/**
 * 获取当前小时数
 */

function local_hours() {
    let myDate = new Date();
    h = myDate.getHours();
    return h;
}

/**
 * 获取当前分钟数
 */

function local_minutes() {
    let myDate = new Date();
    m = myDate.getMinutes();
    return m;
}


//每日网抑云
function wyy(timeout = 3 * 1000) {
    return new Promise((resolve) => {
        let url = {
            url: `https://keai.icu/apiwyy/api`
        }
        $.get(url, async (err, resp, data) => {
            try {
                data = JSON.parse(data)
                console.log(` 【网抑云时间】: ${data.content}  by--${data.music}`);

            } catch (e) {
                $.logErr(e, resp);
            } finally {
                resolve()
            }
        }, timeout
        )
    })
}


// ============================================ get请求 ============================================ \\
async function httpGet(getUrlObject, tip, timeout = 3 * 1000) {
    return new Promise((resolve) => {
        let url = getUrlObject;
        if (!tip) {
            let tmp = arguments.callee.toString();
            let re = /function\s*(\w*)/i;
            let matches = re.exec(tmp);
            tip = matches[1];
        }
        if (debug) {
            console.log(`\n 【debug】=============== 这是 ${tip} 请求 url ===============`);
            console.log(url);
        }

        $.get(
            url,
            async (err, resp, data) => {
                try {
                    if (debug) {
                        console.log(`\n\n 【debug】===============这是 ${tip} 返回data==============`);
                        console.log(data);
                        console.log(`======`);
                        console.log(JSON.parse(data));
                    }
                    let result = JSON.parse(data);
                    if (!result) return;
                    resolve(result);
                } catch (e) {
                    console.log(err, resp);
                    console.log(`\n ${tip} 失败了!请稍后尝试!!`);
                    msg += `\n ${tip} 失败了!请稍后尝试!!`
                } finally {
                    resolve();
                }
            },
            timeout
        );
    });
}

// ============================================ post请求 ============================================ \\
async function httpPost(postUrlObject, tip, timeout = 3 * 1000) {
    return new Promise((resolve) => {
        let url = postUrlObject;
        if (!tip) {
            let tmp = arguments.callee.toString();
            let re = /function\s*(\w*)/i;
            let matches = re.exec(tmp);
            tip = matches[1];
        }
        if (debug) {
            console.log(`\n 【debug】=============== 这是 ${tip} 请求 url ===============`);
            console.log(url);
        }

        $.post(
            url,
            async (err, resp, data) => {
                try {
                    if (debug) {
                        console.log(`\n\n 【debug】===============这是 ${tip} 返回data==============`);
                        console.log(data);
                        console.log(`======`);
                        console.log(JSON.parse(data));
                    }
                    let result = JSON.parse(data);
                    if (!result) return;
                    resolve(result);
                } catch (e) {
                    console.log(err, resp);
                    console.log(`\n ${tip} 失败了!请稍后尝试!!`);
                    msg += `\n ${tip} 失败了!请稍后尝试!!`
                } finally {
                    resolve();
                }
            },
            timeout
        );
    });
}


// ============================================ debug调试 ============================================ \\
function debugLog(...args) {
    if (debug) {
        console.log(...args);
    }
}

//#endregion
function MD5Encrypt(a) {
    function b(a, b) {
        return a << b | a >>> 32 - b
    }

    function c(a, b) {
        var c, d, e, f, g;
        return e = 2147483648 & a, f = 2147483648 & b, c = 1073741824 & a, d = 1073741824 & b, g = (1073741823 & a) + (1073741823 & b), c & d ? 2147483648 ^ g ^ e ^ f : c | d ? 1073741824 & g ? 3221225472 ^ g ^ e ^ f : 1073741824 ^ g ^ e ^ f : g ^ e ^ f
    }

    function d(a, b, c) {
        return a & b | ~a & c
    }

    function e(a, b, c) {
        return a & c | b & ~c
    }

    function f(a, b, c) {
        return a ^ b ^ c
    }

    function g(a, b, c) {
        return b ^ (a | ~c)
    }

    function h(a, e, f, g, h, i, j) {
        return a = c(a, c(c(d(e, f, g), h), j)), c(b(a, i), e)
    }

    function i(a, d, f, g, h, i, j) {
        return a = c(a, c(c(e(d, f, g), h), j)), c(b(a, i), d)
    }

    function j(a, d, e, g, h, i, j) {
        return a = c(a, c(c(f(d, e, g), h), j)), c(b(a, i), d)
    }

    function k(a, d, e, f, h, i, j) {
        return a = c(a, c(c(g(d, e, f), h), j)), c(b(a, i), d)
    }

    function l(a) {
        for (var b, c = a.length, d = c + 8, e = (d - d % 64) / 64, f = 16 * (e + 1), g = new Array(f - 1), h = 0, i = 0; c > i;) b = (i - i % 4) / 4, h = i % 4 * 8, g[b] = g[b] | a.charCodeAt(i) << h, i++;
        return b = (i - i % 4) / 4, h = i % 4 * 8, g[b] = g[b] | 128 << h, g[f - 2] = c << 3, g[f - 1] = c >>> 29, g
    }

    function m(a) {
        var b, c, d = "", e = "";
        for (c = 0; 3 >= c; c++) b = a >>> 8 * c & 255, e = "0" + b.toString(16), d += e.substr(e.length - 2, 2);
        return d
    }

    function n(a) {
        a = a.replace(/\r\n/g, "\n");
        for (var b = "", c = 0; c < a.length; c++) {
            var d = a.charCodeAt(c);
            128 > d ? b += String.fromCharCode(d) : d > 127 && 2048 > d ? (b += String.fromCharCode(d >> 6 | 192), b += String.fromCharCode(63 & d | 128)) : (b += String.fromCharCode(d >> 12 | 224), b += String.fromCharCode(d >> 6 & 63 | 128), b += String.fromCharCode(63 & d | 128))
        }
        return b
    }

    var o, p, q, r, s, t, u, v, w, x = [], y = 7, z = 12, A = 17, B = 22, C = 5, D = 9, E = 14, F = 20, G = 4, H = 11,
        I = 16, J = 23, K = 6, L = 10, M = 15, N = 21;
    for (a = n(a), x = l(a), t = 1732584193, u = 4023233417, v = 2562383102, w = 271733878, o = 0; o < x.length; o += 16) p = t, q = u, r = v, s = w, t = h(t, u, v, w, x[o + 0], y, 3614090360), w = h(w, t, u, v, x[o + 1], z, 3905402710), v = h(v, w, t, u, x[o + 2], A, 606105819), u = h(u, v, w, t, x[o + 3], B, 3250441966), t = h(t, u, v, w, x[o + 4], y, 4118548399), w = h(w, t, u, v, x[o + 5], z, 1200080426), v = h(v, w, t, u, x[o + 6], A, 2821735955), u = h(u, v, w, t, x[o + 7], B, 4249261313), t = h(t, u, v, w, x[o + 8], y, 1770035416), w = h(w, t, u, v, x[o + 9], z, 2336552879), v = h(v, w, t, u, x[o + 10], A, 4294925233), u = h(u, v, w, t, x[o + 11], B, 2304563134), t = h(t, u, v, w, x[o + 12], y, 1804603682), w = h(w, t, u, v, x[o + 13], z, 4254626195), v = h(v, w, t, u, x[o + 14], A, 2792965006), u = h(u, v, w, t, x[o + 15], B, 1236535329), t = i(t, u, v, w, x[o + 1], C, 4129170786), w = i(w, t, u, v, x[o + 6], D, 3225465664), v = i(v, w, t, u, x[o + 11], E, 643717713), u = i(u, v, w, t, x[o + 0], F, 3921069994), t = i(t, u, v, w, x[o + 5], C, 3593408605), w = i(w, t, u, v, x[o + 10], D, 38016083), v = i(v, w, t, u, x[o + 15], E, 3634488961), u = i(u, v, w, t, x[o + 4], F, 3889429448), t = i(t, u, v, w, x[o + 9], C, 568446438), w = i(w, t, u, v, x[o + 14], D, 3275163606), v = i(v, w, t, u, x[o + 3], E, 4107603335), u = i(u, v, w, t, x[o + 8], F, 1163531501), t = i(t, u, v, w, x[o + 13], C, 2850285829), w = i(w, t, u, v, x[o + 2], D, 4243563512), v = i(v, w, t, u, x[o + 7], E, 1735328473), u = i(u, v, w, t, x[o + 12], F, 2368359562), t = j(t, u, v, w, x[o + 5], G, 4294588738), w = j(w, t, u, v, x[o + 8], H, 2272392833), v = j(v, w, t, u, x[o + 11], I, 1839030562), u = j(u, v, w, t, x[o + 14], J, 4259657740), t = j(t, u, v, w, x[o + 1], G, 2763975236), w = j(w, t, u, v, x[o + 4], H, 1272893353), v = j(v, w, t, u, x[o + 7], I, 4139469664), u = j(u, v, w, t, x[o + 10], J, 3200236656), t = j(t, u, v, w, x[o + 13], G, 681279174), w = j(w, t, u, v, x[o + 0], H, 3936430074), v = j(v, w, t, u, x[o + 3], I, 3572445317), u = j(u, v, w, t, x[o + 6], J, 76029189), t = j(t, u, v, w, x[o + 9], G, 3654602809), w = j(w, t, u, v, x[o + 12], H, 3873151461), v = j(v, w, t, u, x[o + 15], I, 530742520), u = j(u, v, w, t, x[o + 2], J, 3299628645), t = k(t, u, v, w, x[o + 0], K, 4096336452), w = k(w, t, u, v, x[o + 7], L, 1126891415), v = k(v, w, t, u, x[o + 14], M, 2878612391), u = k(u, v, w, t, x[o + 5], N, 4237533241), t = k(t, u, v, w, x[o + 12], K, 1700485571), w = k(w, t, u, v, x[o + 3], L, 2399980690), v = k(v, w, t, u, x[o + 10], M, 4293915773), u = k(u, v, w, t, x[o + 1], N, 2240044497), t = k(t, u, v, w, x[o + 8], K, 1873313359), w = k(w, t, u, v, x[o + 15], L, 4264355552), v = k(v, w, t, u, x[o + 6], M, 2734768916), u = k(u, v, w, t, x[o + 13], N, 1309151649), t = k(t, u, v, w, x[o + 4], K, 4149444226), w = k(w, t, u, v, x[o + 11], L, 3174756917), v = k(v, w, t, u, x[o + 2], M, 718787259), u = k(u, v, w, t, x[o + 9], N, 3951481745), t = c(t, p), u = c(u, q), v = c(v, r), w = c(w, s);
    var O = m(t) + m(u) + m(v) + m(w);
    return O.toLowerCase()
}

function Env(t, e) {
    "undefined" != typeof process && JSON.stringify(process.env).indexOf("GITHUB") > -1 && process.exit(0);

    class s {
        constructor(t) {
            this.env = t
        }

        send(t, e = "GET") {
            t = "string" == typeof t ? { url: t } : t;
            let s = this.get;
            return "POST" === e && (s = this.post), new Promise((e, i) => {
                s.call(this, t, (t, s, r) => {
                    t ? i(t) : e(s)
                })
            })
        }

        get(t) {
            return this.send.call(this.env, t)
        }

        post(t) {
            return this.send.call(this.env, t, "POST")
        }
    }

    return new class {
        constructor(t, e) {
            this.name = t, this.http = new s(this), this.data = null, this.dataFile = "box.dat", this.logs = [], this.isMute = !1, this.isNeedRewrite = !1, this.logSeparator = "\n", this.startTime = (new Date).getTime(), Object.assign(this, e), this.log("", `🔔${this.name}, 开始!`)
        }

        isNode() {
            return "undefined" != typeof module && !!module.exports
        }

        isQuanX() {
            return "undefined" != typeof $task
        }

        isSurge() {
            return "undefined" != typeof $httpClient && "undefined" == typeof $loon
        }

        isLoon() {
            return "undefined" != typeof $loon
        }

        toObj(t, e = null) {
            try {
                return JSON.parse(t)
            } catch {
                return e
            }
        }

        toStr(t, e = null) {
            try {
                return JSON.stringify(t)
            } catch {
                return e
            }
        }

        getjson(t, e) {
            let s = e;
            const i = this.getdata(t);
            if (i) try {
                s = JSON.parse(this.getdata(t))
            } catch {
            }
            return s
        }

        setjson(t, e) {
            try {
                return this.setdata(JSON.stringify(t), e)
            } catch {
                return !1
            }
        }

        getScript(t) {
            return new Promise(e => {
                this.get({ url: t }, (t, s, i) => e(i))
            })
        }

        runScript(t, e) {
            return new Promise(s => {
                let i = this.getdata("@chavy_boxjs_userCfgs.httpapi");
                i = i ? i.replace(/\n/g, "").trim() : i;
                let r = this.getdata("@chavy_boxjs_userCfgs.httpapi_timeout");
                r = r ? 1 * r : 20, r = e && e.timeout ? e.timeout : r;
                const [o, h] = i.split("@"), n = {
                    url: `http://${h}/v1/scripting/evaluate`,
                    body: { script_text: t, mock_type: "cron", timeout: r },
                    headers: { "X-Key": o, Accept: "*/*" }
                };
                this.post(n, (t, e, i) => s(i))
            }).catch(t => this.logErr(t))
        }

        loaddata() {
            if (!this.isNode()) return {};
            {
                this.fs = this.fs ? this.fs : require("fs"), this.path = this.path ? this.path : require("path");
                const t = this.path.resolve(this.dataFile), e = this.path.resolve(process.cwd(), this.dataFile),
                    s = this.fs.existsSync(t), i = !s && this.fs.existsSync(e);
                if (!s && !i) return {};
                {
                    const i = s ? t : e;
                    try {
                        return JSON.parse(this.fs.readFileSync(i))
                    } catch (t) {
                        return {}
                    }
                }
            }
        }

        writedata() {
            if (this.isNode()) {
                this.fs = this.fs ? this.fs : require("fs"), this.path = this.path ? this.path : require("path");
                const t = this.path.resolve(this.dataFile), e = this.path.resolve(process.cwd(), this.dataFile),
                    s = this.fs.existsSync(t), i = !s && this.fs.existsSync(e), r = JSON.stringify(this.data);
                s ? this.fs.writeFileSync(t, r) : i ? this.fs.writeFileSync(e, r) : this.fs.writeFileSync(t, r)
            }
        }

        lodash_get(t, e, s) {
            const i = e.replace(/\[(\d+)\]/g, ".$1").split(".");
            let r = t;
            for (const t of i) if (r = Object(r)[t], void 0 === r) return s;
            return r
        }

        lodash_set(t, e, s) {
            return Object(t) !== t ? t : (Array.isArray(e) || (e = e.toString().match(/[^.[\]]+/g) || []), e.slice(0, -1).reduce((t, s, i) => Object(t[s]) === t[s] ? t[s] : t[s] = Math.abs(e[i + 1]) >> 0 == +e[i + 1] ? [] : {}, t)[e[e.length - 1]] = s, t)
        }

        getdata(t) {
            let e = this.getval(t);
            if (/^@/.test(t)) {
                const [, s, i] = /^@(.*?)\.(.*?)$/.exec(t), r = s ? this.getval(s) : "";
                if (r) try {
                    const t = JSON.parse(r);
                    e = t ? this.lodash_get(t, i, "") : e
                } catch (t) {
                    e = ""
                }
            }
            return e
        }

        setdata(t, e) {
            let s = !1;
            if (/^@/.test(e)) {
                const [, i, r] = /^@(.*?)\.(.*?)$/.exec(e), o = this.getval(i),
                    h = i ? "null" === o ? null : o || "{}" : "{}";
                try {
                    const e = JSON.parse(h);
                    this.lodash_set(e, r, t), s = this.setval(JSON.stringify(e), i)
                } catch (e) {
                    const o = {};
                    this.lodash_set(o, r, t), s = this.setval(JSON.stringify(o), i)
                }
            } else s = this.setval(t, e);
            return s
        }

        getval(t) {
            return this.isSurge() || this.isLoon() ? $persistentStore.read(t) : this.isQuanX() ? $prefs.valueForKey(t) : this.isNode() ? (this.data = this.loaddata(), this.data[t]) : this.data && this.data[t] || null
        }

        setval(t, e) {
            return this.isSurge() || this.isLoon() ? $persistentStore.write(t, e) : this.isQuanX() ? $prefs.setValueForKey(t, e) : this.isNode() ? (this.data = this.loaddata(), this.data[e] = t, this.writedata(), !0) : this.data && this.data[e] || null
        }

        initGotEnv(t) {
            this.got = this.got ? this.got : require("got"), this.cktough = this.cktough ? this.cktough : require("tough-cookie"), this.ckjar = this.ckjar ? this.ckjar : new this.cktough.CookieJar, t && (t.headers = t.headers ? t.headers : {}, void 0 === t.headers.Cookie && void 0 === t.cookieJar && (t.cookieJar = this.ckjar))
        }

        get(t, e = (() => {
        })) {
            t.headers && (delete t.headers["Content-Type"], delete t.headers["Content-Length"]), this.isSurge() || this.isLoon() ? (this.isSurge() && this.isNeedRewrite && (t.headers = t.headers || {}, Object.assign(t.headers, { "X-Surge-Skip-Scripting": !1 })), $httpClient.get(t, (t, s, i) => {
                !t && s && (s.body = i, s.statusCode = s.status), e(t, s, i)
            })) : this.isQuanX() ? (this.isNeedRewrite && (t.opts = t.opts || {}, Object.assign(t.opts, { hints: !1 })), $task.fetch(t).then(t => {
                const { statusCode: s, statusCode: i, headers: r, body: o } = t;
                e(null, { status: s, statusCode: i, headers: r, body: o }, o)
            }, t => e(t))) : this.isNode() && (this.initGotEnv(t), this.got(t).on("redirect", (t, e) => {
                try {
                    if (t.headers["set-cookie"]) {
                        const s = t.headers["set-cookie"].map(this.cktough.Cookie.parse).toString();
                        s && this.ckjar.setCookieSync(s, null), e.cookieJar = this.ckjar
                    }
                } catch (t) {
                    this.logErr(t)
                }
            }).then(t => {
                const { statusCode: s, statusCode: i, headers: r, body: o } = t;
                e(null, { status: s, statusCode: i, headers: r, body: o }, o)
            }, t => {
                const { message: s, response: i } = t;
                e(s, i, i && i.body)
            }))
        }

        post(t, e = (() => {
        })) {
            if (t.body && t.headers && !t.headers["Content-Type"] && (t.headers["Content-Type"] = "application/x-www-form-urlencoded"), t.headers && delete t.headers["Content-Length"], this.isSurge() || this.isLoon()) this.isSurge() && this.isNeedRewrite && (t.headers = t.headers || {}, Object.assign(t.headers, { "X-Surge-Skip-Scripting": !1 })), $httpClient.post(t, (t, s, i) => {
                !t && s && (s.body = i, s.statusCode = s.status), e(t, s, i)
            }); else if (this.isQuanX()) t.method = "POST", this.isNeedRewrite && (t.opts = t.opts || {}, Object.assign(t.opts, { hints: !1 })), $task.fetch(t).then(t => {
                const { statusCode: s, statusCode: i, headers: r, body: o } = t;
                e(null, { status: s, statusCode: i, headers: r, body: o }, o)
            }, t => e(t)); else if (this.isNode()) {
                this.initGotEnv(t);
                const { url: s, ...i } = t;
                this.got.post(s, i).then(t => {
                    const { statusCode: s, statusCode: i, headers: r, body: o } = t;
                    e(null, { status: s, statusCode: i, headers: r, body: o }, o)
                }, t => {
                    const { message: s, response: i } = t;
                    e(s, i, i && i.body)
                })
            }
        }

        time(t, e = null) {
            const s = e ? new Date(e) : new Date;
            let i = {
                "M+": s.getMonth() + 1,
                "d+": s.getDate(),
                "H+": s.getHours(),
                "m+": s.getMinutes(),
                "s+": s.getSeconds(),
                "q+": Math.floor((s.getMonth() + 3) / 3),
                S: s.getMilliseconds()
            };
            /(y+)/.test(t) && (t = t.replace(RegExp.$1, (s.getFullYear() + "").substr(4 - RegExp.$1.length)));
            for (let e in i) new RegExp("(" + e + ")").test(t) && (t = t.replace(RegExp.$1, 1 == RegExp.$1.length ? i[e] : ("00" + i[e]).substr(("" + i[e]).length)));
            return t
        }

        msg(e = t, s = "", i = "", r) {
            const o = t => {
                if (!t) return t;
                if ("string" == typeof t) return this.isLoon() ? t : this.isQuanX() ? { "open-url": t } : this.isSurge() ? { url: t } : void 0;
                if ("object" == typeof t) {
                    if (this.isLoon()) {
                        let e = t.openUrl || t.url || t["open-url"], s = t.mediaUrl || t["media-url"];
                        return { openUrl: e, mediaUrl: s }
                    }
                    if (this.isQuanX()) {
                        let e = t["open-url"] || t.url || t.openUrl, s = t["media-url"] || t.mediaUrl;
                        return { "open-url": e, "media-url": s }
                    }
                    if (this.isSurge()) {
                        let e = t.url || t.openUrl || t["open-url"];
                        return { url: e }
                    }
                }
            };
            if (this.isMute || (this.isSurge() || this.isLoon() ? $notification.post(e, s, i, o(r)) : this.isQuanX() && $notify(e, s, i, o(r))), !this.isMuteLog) {
                let t = ["", "==============📣系统通知📣=============="];
                t.push(e), s && t.push(s), i && t.push(i), console.log(t.join("\n")), this.logs = this.logs.concat(t)
            }
        }

        log(...t) {
            t.length > 0 && (this.logs = [...this.logs, ...t]), console.log(t.join(this.logSeparator))
        }

        logErr(t, e) {
            const s = !this.isSurge() && !this.isQuanX() && !this.isLoon();
            s ? this.log("", `❗️${this.name}, 错误!`, t.stack) : this.log("", `❗️${this.name}, 错误!`, t)
        }

        wait(t) {
            return new Promise(e => setTimeout(e, t))
        }

        done(t = {}) {
            const e = (new Date).getTime(), s = (e - this.startTime) / 1e3;
            this.log("", `🔔${this.name}, 结束! 🕛 ${s} 秒`), this.log(), (this.isSurge() || this.isQuanX() || this.isLoon()) && $done(t)
        }
    }(t, e)
}