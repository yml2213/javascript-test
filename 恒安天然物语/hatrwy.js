/*
恒安天然物语  小程序               cron 22 8,12,16,20 * * *  hatrwy.js

11.20       完成基本任务

------------------------  青龙--配置文件-贴心复制区域  ---------------------- 
# 恒安天然物语
export hatrwy="  token @ token " 

抓  community.hengan.cn  的 token

多账号用 换行 或 @ 分割
tg频道: https://t.me/yml2213_tg  
*/

const $ = new Env("恒安天然物语")
const CK_NAME = "hatrwy"
const Notify = 1         // 通知控制
const tgLogFlag = 1      // 是否tg发送通知, 偷撸车使用, 默认0--不发送
let msg = ''
//===========================================================================

//===========================================================================

async function main(userInfo) {


    await userInfo.userInfo()

    // await userInfo.task()

    // await userInfo.point()

    // await userInfo.Sendtg_bot()


}


class UserInfo {
    constructor(index, str) {
        this.user_log = `${$.name}\n`
        this.index = index + 1

        if (tgLogFlag) {
            try {
                this.token = str.split("##")[0]
                this.chatId = str.split("##")[1]
            } catch (error) {
                console.log(error)
            }
        }


    }


    async userInfo() {
        let name = "用户信息";
        let options = {
            method: "post",
            url: `https://community.hengan.cn/api/tree/user/info`,
            headers: {
                token: this.token,
                'Content-Type': 'application/json;charset=UTF-8'
            },
            body: `{"t":"${this.token}"}`
        };

        let res = await httpRequest(options);
        // console.log(res);
        if (res.code == 0) {
            let { nickName, mobile, drops, level, levelName, needExp, shareCode } = res.data
            this.cusLog(`账号 ${this.index}  ${name}:  ${nickName}: 手机号 ${mobile}, 当前等级${level}${levelName}, 升级还需要${needExp},  剩余水滴 ${drops}, 邀请码 ${shareCode}`)

            this.nickName = nickName

            await this.task()

        } else this.cusLog(`账号[${this.index}]  ${name} 失败 ❌ 了呢`), console.log(res);
    }

    async task() {
        let name = "任务列表";
        let options = {
            method: "post",
            url: `https://community.hengan.cn/api/tree/index/job/list`,
            headers: {
                token: this.token,
                'Content-Type': 'application/json;charset=UTF-8'
            },
            body: `{"t":"${this.token}"}`

        };

        let res = await httpRequest(options);
        // console.log(res);
        if (res.code == 0) {
            this.cusLog(`账号 ${this.index}  ${name}:  ${res.msg}`)

            let tasks = res.data
            console.log(tasks);
            for (const task of tasks) {
                let { jobName, dailyCompletion, jobCode, total, success } = task
                this.cusLog(`账号 ${this.index}  ${jobName}:  ${total}/${dailyCompletion}`)

                if (total < dailyCompletion) {

                    switch (jobCode) {
                        case 'A00001':  // 签到
                            await this.doTask(jobName, jobCode)
                            break;

                        case 'A00003':  // 限时福袋
                            await this.doTask(jobName, jobCode)
                            break;

                        case 'A00004':  // 分享
                            // await this.doTask(jobName, jobCode)
                            break;

                        case 'A00005':  // 社区浏览
                            await this.doTask(jobName, jobCode)
                            break;

                        case 'A00006':  // 发表帖子 +30
                            // await this.doTask(jobName, jobCode)
                            break;

                        case 'A00009':  // 浏览官方商城好物 +30
                            await this.doTask(jobName, jobCode)
                            break;

                        case 'A00012':  // 邀请新用户 +30
                            // await this.doTask(jobName, jobCode)
                            break;

                        case 'A00006':  // 好友互动 +10
                            // await this.doTask(jobName, jobCode)
                            break;

                        default:
                            break;
                    }
                }
            }

            await this.water()

        } else this.cusLog(`账号[${this.index}]  ${name} 失败 ❌ 了呢`), console.log(res);
    }

    async doTask(jobName, jobCode) {
        let options = {
            method: "post",
            url: `https://community.hengan.cn/api/tree/job/submit`,
            headers: {
                'token': this.token,
                'Content-Type': 'application/json; charset=UTF-8'
            },
            body: `{"jobCode":"${jobCode}","t":"${this.token}"}`
        };

        let res = await httpRequest(options);
        // console.log(res);
        if (res.code == 0) {
            this.cusLog(`账号 ${this.index}  ${jobName}:  成功, 获得 水滴 ${res.data.drops}`);
            await $.wait(5);
        } else this.cusLog(`账号[${this.index}]  ${jobName} 失败 ❌ 了呢`), console.log(res);
    }

    async water() {
        let name = "浇水";
        let options = {
            method: "post",
            url: `https://community.hengan.cn/api/tree/user/watering`,
            headers: {
                'token': this.token,
                'Content-Type': 'application/json; charset=UTF-8'
            },
            body: `{"t":"${this.token}"}`
        };

        let res = await httpRequest(options);
        // console.log(res);
        if (res.code == 0) {
            this.cusLog(`账号 ${this.index}  ${name}:  成功,剩余水滴${res.data.drops}, 累计浇水 ${res.data.expTotal}, 进度:等级${res.data.level}, ${res.data.exp}/${res.data.fruitExp}`);
            await $.wait(3)
            await this.water()
        } else if (res.code == 500) {
            this.cusLog(`账号 ${this.index}  ${name}:  ${res.msg}`);
        } else this.cusLog(`账号[${this.index}]  ${name} 失败 ❌ 了呢`), console.log(res);
    }



    async point() {
        let name = "查询分数";
        let options = {
            method: "get",
            url: `https://app.geely.com/apis/api/v1/point/available`,
            headers: {
                'token': this.token,
                'Content-Type': 'application/json'
            },
        };

        let res = await httpRequest(options);
        // console.log(res);
        if (res.code == 'success') {
            this.cusLog(`账号 ${this.index}  ${name}: : 积分 ${res.data.availablePoint}==${res.data.availablePoint / 10}元`);
        } else this.cusLog(`账号[${this.index}]  ${name} 失败 ❌ 了呢`), console.log(res);
    }

    async get_text() {
        let options = {
            method: "get",
            url: `https://keai.icu/apiwyy/api`,
            headers: {},
        };

        let res = await httpRequest(options);
        // console.log(res);
        if (res) {
            if (res.content.length >= 100) {
                await this.get_text();
            } else this.content_text = res.content;
        } else this.cusLog(`账号[${this.index}]   失败 ❌ 了呢`), console.log(res);
    }


    async Sendtg_bot() {
        const TelegramBot = require('node-telegram-bot-api');
        const tg_token = process.env.tg_token;
        // console.log(tg_token);
        let bot = new TelegramBot(tg_token);
        let msg = this.user_log;
        // console.log(`=================`);
        // console.log(this.chatId, msg);
        await bot.sendMessage(this.chatId, msg);
    }


    cusLog(a) {
        if (tgLogFlag) {
            console.log(`    ${a}`);
            msg += `\n ${a}`;
            this.user_log += `\n ${a}`;
        } else {
            console.log(`    ${a}`);
            msg += `\n    ${a}`;
        }
    }


}





///////////////////////////////////////////////////////////////////

// 入口
!(async () => {
    const notify = require("./sendNotify");
    $.doubleLog(await $.yiyan());
    let users = await getUsers(CK_NAME, async (index, element) => {
        let userInfo = new UserInfo(index, element);
        return userInfo;
    });

    list = [];
    users.forEach(async element => {
        list.push(main(element));
    });

    await Promise.all(list);

})()
    .catch((e) => console.log(e))
    .finally(() => $.done());


// ==============================================================================
async function getUsers(ckName, fnUserInfo) {
    let userList = [];
    let userCookie = process.env[ckName];
    let envSplicer = ["@", "\n", "&"];
    let userCount = 0;
    if (userCookie) {
        let e = envSplicer[0];
        for (let o of envSplicer)
            if (userCookie.indexOf(o) > -1) {
                e = o;
                break;
            }
        let arr = userCookie.split(e);
        for (let index = 0; index < arr.length; index++) {
            const element = arr[index];
            element && userList.push(await fnUserInfo(index, element));
        }
        userCount = userList.length;
    } else {
        console.log("未找到CK");
    }
    console.log(`共找到${userCount}个账号`), !0;
    return userList;
}

async function httpRequest(options, type = false) {
    return new Promise((resolve) => {
        try {
            $.send(options, async (err, res_body, res_format, res) => {
                if (err) {
                    console.log(`错误, 检查点--2`); return;
                }
                if (!type) {
                    resolve(res_body);
                } resolve(res_format);
            });
        } catch (error) {
            console.log(error);
        }

    });
}







// ============================================================================================================================

// 新的 env 函数, 增加自定义功能 yml-11.12改   合并
function Env(name, env) {
    "undefined" != typeof process &&
        JSON.stringify(process.env).indexOf("GITHUB") > -1 &&
        process.exit(0);
    return new (class {
        constructor(name, env) {
            this.name = name;
            this.notifyStr = "";
            this.notifyFlag = false;
            this.startTime = new Date().getTime();
            Object.assign(this, env);
            console.log(`${this.name} 开始运行: \n`);
        }
        isNode() {
            return "undefined" != typeof module && !!module.exports;
        }
        send(options, e = () => { }) {
            let m = options.method.toLowerCase();
            let t = options;
            if (m != "get" && m != "post" && m != "put" && m != "delete") {
                console.log(`无效的http方法: ${m}`);
                return;
            }
            if (m == "get" && t.headers) {
                // delete t.headers["Content-Type"];
                delete t.headers["Content-Length"];
            } else if (t.body && t.headers) {
                if (t.headers["content-type"]) {
                    let tem = t.headers["content-type"];
                    delete t.headers["content-type"];
                    t.headers["Content-Type"] = tem;
                } else if (t.body && t.headers) {
                    if (!t.headers["Content-Type"])
                        t.headers["Content-Type"] = "application/x-www-form-urlencoded";
                }
            }
            if (this.isNode()) {
                this.request = this.request ? this.request : require("request");
                this.request(options, function (error, response) {
                    if (error) throw new Error(error);
                    let res_body = response.body;
                    let res = response;
                    try {
                        if (typeof res_body == "string") {
                            if ($.isJsonStr(res_body)) {
                                res_body = JSON.parse(res_body);
                                let res_format = $.formatJson(response.body);
                                e(null, res_body, res_format, res);
                            } else e(null, res_body, res_format, res);
                        } else e(null, res_body, res_format, res);
                    } catch (error) {
                        console.log(error);
                        let a = `ENV -- request 请求错误, 检查点1\n${error}`;
                        e(a, null, null, null);
                    }
                });
            }
        }
        isJsonStr(str) {
            if (typeof str == "string") {
                try {
                    if (typeof JSON.parse(str) == "object") {
                        return true;
                    }
                } catch (e) {
                    return false;
                }
            }
            return false;
        }
        formatJson(value) {
            var json = value;
            var i = 0,
                len = 0,
                tab = "    ",
                targetJson = "",
                indentLevel = 0,
                inString = false,
                currentChar = null;
            for (i = 0, len = json.length; i < len; i += 1) {
                currentChar = json.charAt(i);
                switch (currentChar) {
                    case "{":
                    case "[":
                        if (!inString) {
                            targetJson += currentChar + "\n" + repeat(tab, indentLevel + 1);
                            indentLevel += 1;
                        } else {
                            targetJson += currentChar;
                        }
                        break;
                    case "}":
                    case "]":
                        if (!inString) {
                            indentLevel -= 1;
                            targetJson += "\n" + repeat(tab, indentLevel) + currentChar;
                        } else {
                            targetJson += currentChar;
                        }
                        break;
                    case ",":
                        if (!inString) {
                            targetJson += ",\n" + repeat(tab, indentLevel);
                        } else {
                            targetJson += currentChar;
                        }
                        break;
                    case ":":
                        if (!inString) {
                            targetJson += ": ";
                        } else {
                            targetJson += currentChar;
                        }
                        break;
                    case " ":
                    case "\n":
                    case "\t":
                        if (inString) {
                            targetJson += currentChar;
                        }
                        break;
                    case '"':
                        if (i > 0 && json.charAt(i - 1) !== "\\") {
                            inString = !inString;
                        }
                        targetJson += currentChar;
                        break;
                    default:
                        targetJson += currentChar;
                        break;
                }
            }
            function repeat(s, count) {
                return new Array(count + 1).join(s);
            }
            function repeat(s, count) {
                return new Array(count + 1).join(s);
            }
            return targetJson;
        }
        type(str) {
            if (this.strCode(str) > 20) {
                return console.log(`数据类型是: ${typeof str}`);
            }
            return console.log(`${str}数据类型是: ${typeof str}`);
        }
        strCode(str) {
            var count = 0;
            if (str) {
                let len = str.length;
                for (var i = 0; i < len; i++) {
                    if (str.charCodeAt(i) > 255) {
                        count += 2;
                    } else {
                        count++;
                    }
                }
                return count;
            } else return 0;
        }
        async SendMsg(message) {
            if (!message) return;
            if (Notify > 0) {
                if ($.isNode()) {
                    var notify = require("./sendNotify");
                    await notify.sendNotify($.name, message);
                } else {
                    console.log($.name, "", message);
                }
            } else {
                console.log(message);
            }
        }
        getMin(a, b) {
            return a < b ? a : b;
        }
        getMax(a, b) {
            return a < b ? b : a;
        }
        json2str(obj, c, encodeUrl = false) {
            let ret = [];
            for (let keys of Object.keys(obj).sort()) {
                let v = obj[keys];
                if (v && encodeUrl) v = encodeURIComponent(v);
                ret.push(keys + "=" + v);
            }
            return ret.join(c);
        }
        str2json(str, decodeUrl = false) {
            let ret = {};
            for (let item of str.split("&")) {
                if (!item) continue;
                let idx = item.indexOf("=");
                if (idx == -1) continue;
                let k = item.substr(0, idx);
                let v = item.substr(idx + 1);
                if (decodeUrl) v = decodeURIComponent(v);
                ret[k] = v;
            }
            return ret;
        }
        randomStr(len, up = false, charset = "abcdef0123456789") {
            let str = "";
            for (let i = 0; i < len; i++) {
                str += charset.charAt(Math.floor(Math.random() * charset.length));
            }
            if (!up) {
                return str;
            }
            return str.toUpperCase();
        }
        phoneNum(phone_num) {
            if (phone_num.length == 11) {
                let data = phone_num.replace(/(\d{3})\d{4}(\d{4})/, "$1****$2");
                return data;
            } else {
                return phone_num;
            }
        }
        randomInt(min, max) {
            return Math.round(Math.random() * (max - min) + min);
        }
        async yiyan() {
            this.request = this.request ? this.request : require("request");
            return new Promise((resolve) => {
                var options = {
                    method: "GET",
                    url: "https://v1.hitokoto.cn/",
                    headers: {},
                };
                this.request(options, function (error, response) {
                    let data = JSON.parse(response.body);
                    let data_ = `[一言]: ${data.hitokoto}  by--${data.from}`;
                    resolve(data_);
                });
            });
        }
        wait(t) {
            return new Promise((e) => setTimeout(e, t * 1000));
        }
        ts(type = false, _data = "") {
            let myDate = new Date();
            let a = "";
            switch (type) {
                case 10:
                    a = Math.round(new Date().getTime() / 1000).toString();
                    break;
                case 13:
                    a = Math.round(new Date().getTime()).toString();
                    break;
                case "h":
                    a = myDate.getHours();
                    break;
                case "m":
                    a = myDate.getMinutes();
                    break;
                case "y":
                    a = myDate.getFullYear();
                    break;
                case "h":
                    a = myDate.getHours();
                    break;
                case "mo":
                    a = myDate.getMonth();
                    break;
                case "d":
                    a = myDate.getDate();
                    break;
                case "ts2Data":
                    if (_data != "") {
                        time = _data;
                        if (time.toString().length == 13) {
                            let date = new Date(time + 8 * 3600 * 1000);
                            a = date.toJSON().substr(0, 19).replace("T", " ");
                        } else if (time.toString().length == 10) {
                            time = time * 1000;
                            let date = new Date(time + 8 * 3600 * 1000);
                            a = date.toJSON().substr(0, 19).replace("T", " ");
                        }
                    }
                    break;
                default:
                    a = "未知错误,请检查";
                    break;
            }
            return a;
        }
        doubleLog(a) {
            console.log(`    ${a}`);
            msg += `\n    ${a}`;
        }
        async done(t = {}) {
            await $.SendMsg(msg);
            const e = new Date().getTime(),
                s = (e - this.startTime) / 1e3;
            console.log(`\n${this.name} 运行结束，共运行了 ${s} 秒！`);
        }
    })(name, env);
}
