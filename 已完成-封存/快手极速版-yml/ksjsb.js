/**
 * 脚本地址: https://raw.githubusercontent.com/yml2213/javascript/master/ksjsb/ksjsb.js
 * 转载请留信息,谢谢
 *
 * 快手极速版  请使用完整版ck
 *
 * cron 0-59/30 6-20 * * *  yml2213_javascript_master/gqcq.js
 *
 * 5-13    完成签到,宝箱信息功能 --脚本开源,欢迎 pr
 * 5-13    增加箱提示,增加分享任务
 *
 * 感谢所有测试人员
 * ========= 青龙--配置文件 =========
 * 变量格式: export ksjsb_data='xxxxx'  多个账号用 @分割 或者 换行分割
 *
 * 神秘代码: aHR0cHM6Ly90Lm1lL3ltbF90Zw==
 */
const $ = new Env("快手极速版");
const notify = $.isNode() ? require("./sendNotify") : "";
const Notify = 1 		//0为关闭通知，1为打开通知,默认为1
const debug = 1 		//0为关闭调试，1为打开调试,默认为0
///////////////////////////////////////////////////////////////////
let ckStr = process.env.ksjsb_data;
let msg = "";
let ck = "";
let ck_status = "";
let user_name = "";
let bind_type = "";
///////////////////////////////////////////////////////////////////
let VersionCheck = "1.1.1"
let thank = `\n 感谢 xx 的投稿`
let Change = '\n增加提现功能'
///////////////////////////////////////////////////////////////////

async function tips(ckArr) {

    let Version_latest = await Version_Check('ksjsb');
    let Version = `\n本地脚本:V1.0.1  远程仓库脚本:V${Version_latest}\n`
    console.log(Version);
    msg += `${Version}`
    console.log(`更新内容:${Change}`);
    msg += `${Change}`

    // console.log(thank);
    // msg += `${thank}`

    await wyy();
    console.log(`\n=================== 共找到 ${ckArr.length} 个账号 ===================`);
    debugLog(`【debug】 这是你的账号数组:\n ${ckArr}`);
}

!(async () => {
    let ckArr = await getCks(ckStr, "ksjsb_data");
    await tips(ckArr);
    for (let index = 0; index < ckArr.length; index++) {
        let num = index + 1;
        console.log(`\n========= 开始【第 ${num} 个账号】=========\n`);
        ck = ckArr[index].split("&");
        debugLog(`【debug】 这是你第 ${num} 账号信息:\n ${ck}`);
        await start();
    }
    await SendMsg(msg);
})()
    .catch((e) => $.logErr(e))
    .finally(() => $.done());


async function start() {


    console.log("开始 用户信息");
    await user_info(0);

    if (!ck_status) {
        console.log("开始 宝箱信息");
        await box_info();
        await $.wait(2 * 1000);


        if (local_hours() === 8) {
            console.log("开始 签到信息");
            await sign_info();
            await $.wait(5 * 1000);

            console.log("开始 分享");
            await do_Share();
            await $.wait(2 * 1000);
        } else {
            console.log("每天 8 点做 签到,分享 任务,时间不对跳过执行!");
        }

        console.log("开始 提现信息");
        await cashInfo();
        await $.wait(2 * 1000);

    }




}


/**
 * 用户信息    httpGet
 * https://nebula.kuaishou.com/rest/n/nebula/activity/earn/overview/basicInfo
 */
async function user_info(todesk) {
    let url = {
        url: `https://nebula.kuaishou.com/rest/n/nebula/activity/earn/overview/basicInfo`,
        headers: {
            'Cookie': ck[0],
        },
    };
    let result = await httpGet(url, `用户信息`);

    if (result.result == 1) {
        if (todesk == 0) {
            console.log(`\n 用户信息: 欢迎光临 ${result.data.userData.nickname} 🎉  , 账户余额: ${result.data.totalCash} 元 ,金币: ${result.data.totalCoin}  枚 \n`);
            msg += `\n 用户信息: 欢迎光临 ${result.data.userData.nickname} 🎉  , 账户余额: ${result.data.totalCash} 元 ,金币: ${result.data.totalCoin}  枚 \n`;
            user_name = result.data.userData.nickname;
        } else if (todesk == 1) {
            if (result.data.totalCash > 0.3) {
                console.log(`    您当前有 ${result.data.totalCash} 元`);
                msg += `\n    您当前有 ${result.data.totalCash} 元`
            }
        }
        await $.wait(2 * 1000);
    } else {
        console.log(`\n 用户信息: 失败 ❌ 了呢,原因未知！  ${result} \n`);
        msg += `\n 用户信息: 失败 ❌ 了呢,原因未知！  ${JSON.parse(result)} \n `;
        return ck_status = false;
    }
}


/**
 * 签到信息    httpGet
 * https://nebula.kuaishou.com/rest/n/nebula/activity/earn/overview/basicInfo
 */
async function sign_info() {
    let url = {
        url: `https://nebula.kuaishou.com/rest/n/nebula/sign/queryPopup`,
        headers: {
            'Cookie': ck[0],
        },
    };
    let result = await httpGet(url, `签到信息`);

    if (result.data.nebulaSignInPopup.todaySigned === false) {
        console.log(`\n 签到信息: ${user_name} 今天未签到,去签到喽!\n`);
        msg += `\n 签到信息: ${user_name} 今天未签到,去签到喽!\n`;
        await $.wait(3 * 1000);
        await signin();
    } else if (result.data.nebulaSignInPopup.todaySigned === true) {
        console.log(`\n 签到信息: ${user_name} 今天已签到,明天再来吧!\n`);
        msg += `\n 签到信息: ${user_name} 今天已签到,明天再来吧!\n`;
    } else {
        console.log(`\n 签到信息: 失败 ❌ 了呢,原因未知！  ${result} \n`);
        msg += `\n 签到信息: 失败 ❌ 了呢,原因未知！  ${JSON.parse(result)} \n `;
    }
}


/**
 * 签到    httpGet
 * https://nebula.kuaishou.com/rest/n/nebula/sign/sign?source=activity
 */
async function signin() {
    let url = {
        url: `https://nebula.kuaishou.com/rest/n/nebula/sign/sign?source=activity`,
        headers: {
            'Cookie': ck[0],
        },
    };
    let result = await httpGet(url, `签到`);

    if (result.result == 1) {
        console.log(`\n 签到: ${result.data.toast} ,获得金币: ${result.data.totalCoin} 枚 \n`);
        msg += `\n 签到: ${result.data.toast} ,获得金币: ${result.data.totalCoin} 枚 \n`;
    } else if (result.result == 10901) {
        console.log(`\n 签到: ${result.error_msg} \n`);
        msg += `\n 签到: ${result.error_msg} \n`;
    } else {
        console.log(`\n 签到: 失败 ❌ 了呢,原因未知！  ${result} \n`);
        msg += `\n 签到: 失败 ❌ 了呢,原因未知！  ${JSON.parse(result)} \n `;
    }
}


/**
 * 宝箱信息    httpGet
 *
 * https://nebula.kuaishou.com/rest/n/nebula/box/explore?isOpen=false&isReadyOfAdPlay=true
 */
async function box_info() {
    let url = {
        url: `https://nebula.kuaishou.com/rest/n/nebula/box/explore?isOpen=false&isReadyOfAdPlay=true`,
        headers: {
            'Cookie': ck[0],
        },
    };
    let result = await httpGet(url, `宝箱信息`);

    if (result.result == 1) {
        if (result.data.openTime === -1) {
            console.log(`\n 宝箱信息: 今天的宝箱开完了,明天再来吧! \n`);
            msg += `\n 宝箱信息: 今天的宝箱开完了,明天再来吧! \n`;
        } else if (result.data.openTime != 0) {
            console.log(`\n 宝箱信息: 宝箱冷却中, ${result.data.openTime / 1000 / 60} 分钟 后重试吧! \n`);
            msg += `\n 宝箱信息: 宝箱冷却中, ${result.data.openTime / 1000 / 60} 分钟 后重试吧! \n`;
        } else {
            console.log(`\n 宝箱信息:  ${user_name} 可以宝箱信息,去 开宝箱 喽! \n`);
            msg += `\n 宝箱信息:  ${user_name} 可以宝箱信息,去 开宝箱 喽! \n`;
            await $.wait(3 * 1000);
            await open_box();
        }

    } else if (result.result == 10901) {
        console.log(`\n 宝箱信息: ${result.error_msg} \n`);
        msg += `\n 宝箱信息: ${result.error_msg} \n`;
    } else {
        console.log(`\n 宝箱信息: 失败 ❌ 了呢,原因未知！  ${result} \n`);
        msg += `\n 宝箱信息: 失败 ❌ 了呢,原因未知！  ${JSON.parse(result)} \n `;
    }
}


/**
 * 开宝箱    httpGet
 * https://nebula.kuaishou.com/rest/n/nebula/box/explore?isOpen=true&isReadyOfAdPlay=true
 */
async function open_box() {
    let url = {
        url: `https://nebula.kuaishou.com/rest/n/nebula/box/explore?isOpen=true&isReadyOfAdPlay=true`,
        headers: {
            'Cookie': ck[0],
        },
    };
    let result = await httpGet(url, `开宝箱`);

    if (result.result == 1) {
        console.log(`\n 开宝箱: 获得 金币 ${result.data.commonAwardPopup.awardAmount} 枚!\n`);
        msg += `\n 开宝箱: 获得 金币 ${result.data.commonAwardPopup.awardAmount} 枚!\n`;

    } else {
        console.log(`\n 开宝箱: 失败 ❌ 了呢,原因未知！  ${result} \n`);
        msg += `\n 开宝箱: 失败 ❌ 了呢,原因未知！  ${JSON.parse(result)} \n `;
    }
}


/**
 * 分享获得 3000金币   httpGet
 */
async function do_Share() {


    let url = {
        url: `https://nebula.kuaishou.com/rest/n/nebula/account/withdraw/setShare`,
        headers: {
            'Cookie': ck[0],
        },
        body: '',
    };
    let result = await httpPost(url, `分享`);

    if (result.result == 1) {
        await $.wait(200);
        await Share(122);
    }
}


/**
 * 分享获得 3000金币   httpGet
 */
async function Share(id) {
    let url = {
        url: `https://nebula.kuaishou.com/rest/n/nebula/daily/report?taskId=${id}`,
        headers: {
            'Cookie': ck[0],
        },
    };
    let result = await httpGet(url, `分享`);

    if (result.result == 1) {
        console.log(`\n 分享: 获得 金币 ${result.data.amount} 枚!\n`);
        msg += `\n 分享: 获得 金币 ${result.data.amount} 枚!\n`;
    } else if (result.result == 14004) {
        console.log(`\n 分享: 今天已经分享过了,明天再来吧!\n`);
        msg += `\n 分享: 今天已经分享过了,明天再来吧!\n\n`;
    } else {
        console.log(`\n 分享: 失败 ❌ 了呢,原因未知！  ${result} \n`);
        msg += `\n 分享: 失败 ❌ 了呢,原因未知！  ${JSON.parse(result)} \n `;
    }
}




/**
 * 提现信息    httpGet
 */
async function cashInfo() {
    let url = {
        url: `https://nebula.kuaishou.com/rest/n/nebula/outside/withdraw/overview`,
        headers: {
            'Cookie': ck[0],
        },
    };
    let result = await httpGet(url, `提现信息`);

    if (result.result == 1) {
        console.log(`    提现信息: ${result.data.nickname} ,余额:${result.data.enWithdrawAmount}`);
        msg += `\n    提现信息: ${result.data.nickname} ,余额:${result.data.enWithdrawAmount}`;
        if (result.data.isLimit == false) {
            await bind_info();
            if (bind_type != false) {
                if (result.data.enWithdrawAmount < 0.3) {
                    console.log(`    提现信息: ${result.data.enWithdrawAmount} ,余额不足0.3元，不提现`);
                    msg += `\n    提现信息: ${result.data.enWithdrawAmount} ,余额不足0.3元，不提现`;
                } else if (0.3 <= result.data.enWithdrawAmount && result.data.enWithdrawAmount < 2) {
                    console.log(`    提现信息: ${result.data.enWithdrawAmount} ,准备提现 0.3 元!`);
                    msg += `\n    提现信息: ${result.data.enWithdrawAmount} ,准备提现 0.3 元!`;
                    await Docash('300', bind_type);
                } else if (2 <= result.data.enWithdrawAmount && result.data.enWithdrawAmount < 10) {
                    console.log(`    提现信息: ${result.data.enWithdrawAmount} ,准备提现 2 元!`);
                    msg += `\n    提现信息: ${result.data.enWithdrawAmount} ,准备提现 2 元!`;
                    await Docash('200', bind_type);
                } else if (10 <= result.data.enWithdrawAmount && result.data.enWithdrawAmount < 20) {
                    console.log(`    提现信息: ${result.data.enWithdrawAmount} ,准备提现 10 元!`);
                    msg += `\n    提现信息: ${result.data.enWithdrawAmount} ,准备提现 10 元!`;
                    await Docash('1000', bind_type);
                } else if (20 <= result.data.enWithdrawAmount && result.data.enWithdrawAmount < 50) {
                    console.log(`    提现信息: ${result.data.enWithdrawAmount} ,准备提现 20 元!`);
                    msg += `\n    提现信息: ${result.data.enWithdrawAmount} ,准备提现 20 元!`;
                    await Docash('2000', bind_type);
                } else if (result.data.enWithdrawAmount > 50) {
                    console.log(`    提现信息: ${result.data.enWithdrawAmount} ,准备提现 50 元!`);
                    msg += `\n    提现信息: ${result.data.enWithdrawAmount} ,准备提现 50 元!`;
                    await Docash('5000', bind_type);
                }
            } else {
                console.log(`    绑定查询: 未查询到当前账号绑定类型,停止提现!`);
                msg += `\n    绑定查询: 未查询到当前账号绑定类型,停止提现!`;
            }



        } else {
            console.log(`    提现信息: ${result.data.nickname} 今天已提现过了!`);
            msg += `\n    提现信息: ${result.data.nickname} 今天已提现过了!`;
        }

    } else {
        console.log(`\n 提现信息: 失败 ❌ 了呢,原因未知!`);
        console.log(result);
        msg += `\n 提现信息: 失败 ❌ 了呢,原因未知!`;
    }
}




/**
 * 绑定查询    httpPost
 */
async function bind_info() {
    let url = {
        url: `https://www.kuaishoupay.com/pay/account/h5/provider/bind_info`,
        headers: {
            'Cookie': ck[0],
        },
        form: {
            'account_group_key': 'NEBULA_CASH_ACCOUNT',
            'bind_page_type': '3'
        }
    };
    let result = await httpPost(url, `绑定查询`);

    if (result.code == 'SUCCESS') {
        if (result.wechat_bind == true) {
            console.log(`    绑定查询: 当前账号已绑定 微信`);
            msg += `\n    绑定查询: 当前账号已绑定 微信`;
            bind_type = 'WECHAT';
        } else if (result.alipay_bind == true) {
            console.log(`    绑定查询: 当前账号已绑定 支付宝`);
            msg += `\n    绑定查询: 当前账号已绑定 支付宝`;
            bind_type = 'ALIPAY';
        } else {
            console.log(`    绑定查询: 未查询到当前账号绑定类型,停止提现!`);
            msg += `\n    绑定查询: 未查询到当前账号绑定类型,停止提现!`;
            return bind_type = false;
        }
    } else {
        console.log(`\n 绑定查询: 失败 ❌ 了呢,原因未知!`);
        console.log(result);
        msg += `\n 绑定查询: 失败 ❌ 了呢,原因未知!`;
    }
}


/**
 * 提现    httpPost
 */
async function Docash(cash_num, bind_type) {
    let url = {
        url: `https://www.kuaishoupay.com/pay/account/h5/withdraw/apply`,
        headers: {
            'Cookie': ck[0],
        },
        form: {
            'account_group_key': 'NEBULA_CASH_ACCOUNT',
            'mobile_code': '',
            'fen': cash_num,
            'provider': bind_type,
            'total_fen': cash_num,
            'commission_fen': '0',
            'third_account': bind_type,
            'attach': '',
            // 'biz_content': '',
            'session_id': ''
        }

        // "account_group_key=NEBULA_CASH_ACCOUNT&mobile_code=&fen=" + p + "&provider=" + C + "&total_fen=" + p + "&commission_fen=0&third_account=" + C + "&attach=&biz_content=&session_id="
    };
    let result = await httpPost(url, `提现`);

    if (result.result == 'SUCCESS') {
        console.log(`    提现: 提现 ${cash_num} 成功 🎉`);
        msg += `\n    提现: 提现 ${cash_num} 成功 🎉`;
    } else if (result.result == WITHDRAW_VERIFY_SMS_CODE) {
        console.log(`    提现: ${result.msg}`);
        msg += `\n    提现: ${result.msg}`;
    } else {
        console.log(`\n 提现: 失败 ❌ 了呢,原因未知!`);
        console.log(result);
        msg += `\n 提现: 失败 ❌ 了呢,原因未知!`;
    }
}



















//#region ********************************固定代码********************************

/**
 * 变量检查
 */
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
            console.log(` :未填写变量 ${str}`)
        }
    }
    )
}


/**
 * 获取远程版本
 */
function Version_Check(name) {
    return new Promise((resolve) => {
        let url = {
            url: `https://raw.gh.fakev.cn/yml2213/javascript/master/${name}/${name}.js`,
        }
        $.get(url, async (err, resp, data) => {
            try {
                let VersionCheck = resp.body.match(/VersionCheck = "([\d\.]+)"/)[1]
            } catch (e) {
                $.logErr(e, resp);
            } finally {
                resolve(VersionCheck)
            }
        }, timeout = 3 * 1000)
    })
}

/**
 * 发送消息
 */
async function SendMsg(message) {
    if (!message) return;

    if (Notify > 0) {
        if ($.isNode()) {
            var notify = require("./sendNotify");
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
    var t = "QWERTYUIOPASDFGHJKLZXCVBNM1234567890",
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

/**
 * 每日网抑云
 */
function wyy() {
    return new Promise((resolve) => {
        let url = {
            url: `http://ovooa.com/API/wyrp/api.php`,
        }
        $.get(url, async (err, resp, data) => {
            try {
                data = JSON.parse(data)
                // console.log(data);
                console.log(`【网抑云时间】 ${data.data.Content}  by--${data.data.Music}`);

            } catch (e) {
                $.logErr(e, resp);
            } finally {
                resolve()
            }
        }, timeout = 3 * 1000)
    })
}

/**
 * get请求
 */
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
                    resolve(result);
                } catch (e) {
                    // console.log(err, resp);
                    // console.log(`\n ${tip} 失败了!请稍后尝试!!`);
                    // msg += `\n ${tip} 失败了!请稍后尝试!!`
                } finally {
                    resolve();
                }
            },
            timeout
        );
    });
}

/**
 * post请求
 */
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
                    resolve(result);
                } catch (e) {
                    // console.log(err, resp);
                    // console.log(`\n ${tip} 失败了!请稍后尝试!!`);
                    // msg += `\n ${tip} 失败了!请稍后尝试!!`
                } finally {
                    resolve();
                }
            },
            timeout
        );
    });
}




/**
 * debug调试
 */
function debugLog(...args) {
    if (debug) {
        console.log(...args);
    }
}

// 忽略
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

//#endregion


