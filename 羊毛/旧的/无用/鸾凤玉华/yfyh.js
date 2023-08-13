/**
 * 脚本地址: https://raw.githubusercontent.com/yml2213/javascript/master/yfyh/yfyh.js
 * 转载请留信息,谢谢
 *
 * 鸾凤玉华
 *
 * cron 5 7 * * *  yml2213_javascript_master/yfyh.js
 *
 * 5-26     完成 签到 
 * 
 *
 * 感谢所有测试人员
 * ========= 青龙--配置文件 =========
 * 变量格式: export yfyh_data='sessionkey & sessionkey'  多个账号用 @ 或 换行分割
 * 
 * 抓  api.luanfengyuhua.cn 域名的包 找到  sessionkey 即可 
 * 自己更改定时
 * 
 * tg频道: https://t.me/yml2213_tg  
 * tg群组: https://t.me/yml_tg    
 * qq频道: https://qun.qq.com/qqweb/qunpro/share?_wv=3&_wwv=128&appChannel=share&inviteCode=1W4InjV&appChannel=share&businessType=9&from=181074&biz=ka&shareSource=5
 * 
 */

const $ = new Env("鸾凤玉华");
const notify = $.isNode() ? require("./sendNotify") : "";
const Notify = 1 		//0为关闭通知,1为打开通知,默认为1
const debug = 0 		//0为关闭调试,1为打开调试,默认为0
///////////////////////////////////////////////////////////////////
let ckStr = process.env.yfyh_data;
let msg = "";
let ck = "";
let ck_status = "";
let host = "api.luanfengyuhua.cn";
let hostname = "https://" + host;
///////////////////////////////////////////////////////////////////
let Version = '\nyml   2022/5/24     完成签到'
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
    msg += `\n =================== 共找到 ${ckArr.length} 个账号 ===================`
    debugLog(`【debug】 这是你的账号数组: \n ${ckArr} `);
}

!(async () => {
    let ckArr = await getCks(ckStr, "yfyh_data");
    await tips(ckArr);
    for (let index = 0; index < ckArr.length; index++) {
        yfyh_num = index + 1;
        console.log(`------------- 开始【第 ${yfyh_num} 个账号】------------- `);
        msg += `\n------------- 开始【第 ${yfyh_num} 个账号】------------- `

        ck = ckArr[index].split("&");

        debugLog(`【debug】 这是你第 ${yfyh_num} 账号信息: \n ${ck} `);
        await start();
    }
    await SendMsg(msg);
})()
    .catch((e) => $.logErr(e))
    .finally(() => $.done());


async function start() {

    console.log("开始 签到");
    await SignIn();
    await $.wait(3 * 1000);


}




/**
 * 签到    POST
 */
async function SignIn() {
    let options = {
        method: 'POST',
        url: `${hostname}/Api/Signin/submit`,
        headers: {
            'Host': host,
            'sessionkey': ck[0],
            'content-type': 'application/json',
        },
        body: ''
    };
    let result = await httpRequest(options, `签到`);

    if (result.status == 200) {
        console.log(`    签到: ${result.msg} ,获得 ${result.data.total_score} 积分 ,已连续签到 ${result.data.sign_day} 天`);
        msg += `\n    签到: ${result.msg} ,获得 ${result.data.total_score} 积分 ,已连续签到 ${result.data.sign_day} 天`;
    } else if (result.status == 100) {
        console.log(`    签到: ${result.msg}`);
        msg += `\n    签到: ${result.msg}`;
    } else {
        console.log(`    签到: 失败 ❌ 了呢,原因未知！  ${result} `);
        msg += `\n    签到: 失败 ❌ 了呢,原因未知!`;
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
            console.log(` :未填写变量 ${str}`)
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




/**
 * 每日网抑云    GET
 */
function wyy() {
    return new Promise((resolve) => {
        let request = require('request');
        let options = {
            'method': 'GET',
            'url': 'https://keai.icu/apiwyy/api',
            'headers': {
            }
        };

        request(options, function (error, response) {
            try {
                if (error) throw new Error(error);
                // console.log(response.body);
                data = JSON.parse(response.body)
                console.log(`    【网抑云时间】: ${data.content}  by--${data.music}`);

            } catch (e) {
                $.logErr(e, resp);
            } finally {
                resolve()
            }
        });
    })

}




// ======================================== 网络请求 (get, post等) ======================================== \\
async function httpRequest(postOptionsObject, tip, timeout = 3 * 1000) {
    return new Promise((resolve) => {

        let options = postOptionsObject;
        let request = require('request');
        if (!tip) {
            let tmp = arguments.callee.toString();
            let re = /function\s*(\w*)/i;
            let matches = re.exec(tmp);
            tip = matches[1];
        }
        if (debug) {
            console.log(`\n 【debug】=============== 这是 ${tip} 请求 信息 ===============`);
            console.log(options);
        }

        request(options, async (err, resp, data) => {
            try {
                if (debug) {
                    console.log(`\n\n 【debug】===============这是 ${tip} 返回数据==============`);
                    console.log(data);
                    console.log(`\n 【debug】=============这是 ${tip} json解析后数据============`);
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
        }), timeout

    });
}


// ============================================ debug调试 ============================================ \\
function debugLog(...args) {
    if (debug) {
        console.log(...args);
    }
}



function Env(t, e) {
    class s {
        constructor(t) {
            this.env = t
        }
    }
    return new class {
        constructor(t, e) {
            this.name = t, this.http = new s(this), this.data = null, this.dataFile = "box.dat", this.logs = [], this.isMute = !1, this.isNeedRewrite = !1, this.logSeparator = "\n", this.startTime = (new Date).getTime(), Object.assign(this, e), this.log("", `🔔${this.name}, 开始!`)
        }

        isNode() {
            return "undefined" != typeof module && !!module.exports
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

        log(...t) {
            t.length > 0 && (this.logs = [...this.logs, ...t]), console.log(t.join(this.logSeparator))
        }

        logErr(t, e) {
            s ? this.log("", `❗️${this.name}, 错误!`, t.stack) : this.log("", `❗️${this.name}, 错误!`, t)
        }

        wait(t) {
            return new Promise(e => setTimeout(e, t))
        }

        done(t = {}) {
            const e = (new Date).getTime(), s = (e - this.startTime) / 1e3;
            this.log("", `🔔${this.name}, 结束! 🕛 ${s} 秒`), this.log()
        }
    }(t, e)
}





