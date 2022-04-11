/*
cron 10 8 * * * 

@miranda0111 xzy 4.10 东莞理工学院疫情打卡脚本
只适配了青龙，国外服务器打卡加强版
 
自行安装  axios  依赖；  自行安装  axios  依赖；  自行安装  axios  依赖；
青龙直接node中安装就行

========= 青龙 =========
变量格式：  
必填变量：export xzy_yqfk_ck='学号&密码@学号&密码'  学号和密码用&分割，多个账号用 @分割 
可选变量：export xzy_yffk_UA='你的UA'

还是不会的请百度或者QQ求助：QQ：591944012  无Q群

通知用青龙的，不适配单帐号单独通知
*/
const axios = require("axios");

const jsname = "东莞理工学院疫情打卡脚本2022.4.10版本";
const $ = Env(jsname);
const notify = $.isNode() ? require('./sendNotify') : '';
const Notify = 1; //0为关闭通知，1为打开通知,默认为1
const debug = 1; //0为关闭调试，1为打开调试,默认为0

let xzy_yqfk_ck = ($.isNode() ? process.env.xzy_yqfk_ck : $.getdata('xzy_yqfk_ck')) || "";
let UA = ($.isNode() ? process.env.xzy_yffk_UA : $.getdata('xzy_yffk_UA')) || 'Mozilla/5.0 (Linux; Android 10; BAH3-W09) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/98.0.4758.92 Safari/537.36';

let xzy_yqfk_ckArr = [];
let msg = '';

let user = '';
let pwd = '';
let Cookie = '';
let __token__ = '';
let dgut_token = '';
let dgut_access_token = '';
let authorization = '';

!(async () => {
    if (!(await Envs())) //多账号分割 判断变量是否为空  初步处理多账号
        return;
    else {
        console.log(
            `\n\n=========================================    脚本执行 - 北京时间(UTC+8)：${new Date(
				new Date().getTime() +
				new Date().getTimezoneOffset() * 60 * 1000 +
				8 * 60 * 60 * 1000
			).toLocaleString()} =========================================\n`);
        await wyy();
        await $.wait(2 * 1000);
        console.log(`\n=================== 共找到 ${xzy_yqfk_ckArr.length} 个账号 ===================`)
        if (debug) {
            console.log(`【debug】 这是你的账号数组:\n ${xzy_yqfk_ckArr}`);
        }
        for (let index = 0; index < xzy_yqfk_ckArr.length; index++) {
            let num = index + 1
            console.log(`\n========= 开始【第 ${num} 个账号】=========\n`)
            data = xzy_yqfk_ckArr[index].split('&');
            user = data[0];
            pwd = data[1];
            Cookie = '';
            __token__ = '';
            dgut_token = '';
            dgut_access_token = '';
            authorization = '';
            request_url = {
                url: '',
                headers: {
                    "Accept": "application/json, text/javascript, */*; q=0.01",
                    "Accept-Encoding": "gzip, deflate, br",
                    "Accept-Language": "zh-CN,zh;q=0.9",
                    "Connection": "keep-alive",
                    "Content-Type": "application/x-www-form-urlencoded; charset=UTF-8",
                    "Host": "cas.dgut.edu.cn",
                    "Origin": "http://cas.dgut.edu.cn",
                    "Referer": "https://cas.dgut.edu.cn/home/Oauth/getToken/appid/yqfkdaka/state/%2Fhome.html",
                    "User-Agent": UA,
                    "sec-ch-ua-platform": "\"Android\"",
                    "Cache-Control": "no-cache"
                },
            }
            if (debug) {
                console.log(`\n 【debug】 这是你第 ${num} 账号信息:\n user:${user}\n`);
            }

            // 如果请求花费时间 > 20000ms 就重新发送请求，直到请求成功才停止重试，资源消耗巨大，报错服务器容易崩
            // 国内服务器换用 await login_info();
            await retry(login_info, 15000).then(res => {
                console.log("res->", res);
            })
            await retry(login_token_info, 20000).then(res => {
                console.log("res->", res);
            })
            await $.wait(2 * 1000);
            await retry(getLink, 20000).then(res => {
                console.log("res->", res);
            })
            await $.wait(2 * 1000);
            await retry(get_access_token, 20000).then(res => {
                console.log("res->", res);
            })
            await $.wait(2 * 1000);
            await retry(getBaseInfo, 20000).then(res => {
                console.log("res->", res);
            })
            await $.wait(2 * 1000);
            await retry(submit, 20000).then(res => {
                console.log("res->", res);
            })

            await $.wait(2 * 1000);
            await submit();

            await SendMsg(msg);

        }
    }

})()
.catch((e) => $.logErr(e))
    .finally(() => $.done())

//#region 固定代码
// ============================================变量检查============================================ \\
async function Envs() {
    if (xzy_yqfk_ck) {
        if (xzy_yqfk_ck.indexOf("@") != -1) {
            xzy_yqfk_ck.split("@").forEach((item) => {
                xzy_yqfk_ckArr.push(item);
            });
        } else {
            xzy_yqfk_ckArr.push(xzy_yqfk_ck);
        }
    } else {
        console.log(`\n 【${$.name}】：未填写变量 xzy_yqfk_ck`)
        return;
    }

    return true;
}
// ============================================发送消息============================================ \\
async function SendMsg(message) {
    if (!message)
        return;

    if (Notify > 0) {
        if ($.isNode()) {
            var notify = require('./sendNotify');
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
    for (i = 0; i < e; i++)
        n += t.charAt(Math.floor(Math.random() * a));
    return n
}
/**
 * 随机整数生成
 */
function randomInt(min, max) {
    return Math.round(Math.random() * (max - min) + min)
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
                console.log(`\n 【网抑云时间】: ${data.content}  by--${data.music}`);

            } catch (e) {
                $.logErr(e, resp);
            } finally {
                resolve()
            }
        }, timeout)
    })
}
// 超时检测函数
const timeOut = (delay) => {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            reject(false);
        }, delay);
    })
}

function retry(fn, delay) {
    return new Promise((resolve, reject) => {
        Promise.race([fn(), timeOut(delay)]).then(res => {
            resolve(res);
        }).catch(err => {
            reject("race 内部超时")
        })
    }).catch(err => {
        console.log(err);
        return retry(fn, delay)
    })
}
//#endregion

//loginPage https://yqfk-daka.dgut.edu.cn/ 提高连接速度
const login_info = function(timeout = 10 * 1000) {
    request_url.url = 'https://yqfk-daka.dgut.edu.cn/login';
    request_url.headers = {
        "Accept": "application/json, text/plain, */*",
        "Accept-Encoding": "gzip, deflate, br",
        "Connection": "keep-alive",
        "Host": "yqfk-daka-api.dgut.edu.cn",
        "Referer": "https://yqfk-daka.dgut.edu.cn/",
        "User-Agent": UA,
        "sec-ch-ua-platform": "\"Android\""
    };
    return new Promise((resolve) => {
        if (debug) {
            console.log(`\n 【debug】=============== 这是 login_info 请求 url ===============`);
            console.log(request_url);
        }
        $.get(request_url, async (error, response, data) => {
            try {
                if (debug) {
                    console.log(`\n\n 【debug】===============这是 login_info 返回data==============`);
                    console.log(data)
                    console.log(`======`)
                    console.log(JSON.parse(data))
                }
            } catch (e) {
                console.log(e)
            } finally {
                resolve();
            }
        }, timeout)
    })
}

//页面获取token https://cas.dgut.edu.cn/home/Oauth/getToken/appid/yqfkdaka/state/%2Fhome.html
const login_token_info = function(timeout = 20 * 1000) {
    request_url.url = 'https://cas.dgut.edu.cn/home/Oauth/getToken/appid/yqfkdaka/state/%2Fhome.html';
    request_url.headers = {
        "Accept": "text/html,application/xhtml",
        "Accept-Encoding": "gzip, deflate, br",
        "Connection": "keep-alive",
        "Host": "cas.dgut.edu.cn",
        "Referer": "https://yqfk-daka.dgut.edu.cn/",
        "User-Agent": UA,
        "sec-ch-ua-platform": "\"Android\"",
        "Cache-Control": "no-cache"
    };
    return new Promise((resolve) => {
        if (debug) {
            console.log(`\n 【debug】=============== 这是 login_token_info 请求 url ===============`);
            console.log(request_url);
        }
        $.get(request_url, async (error, response, data) => {
            try {
                if (debug) {
                    console.log(`\n\n 【debug】===============这是 login_token_info 返回data==============`);
                    console.log(data)
                    console.log(`======`)
                    //	console.log(JSON.parse(data))	
                }
                if (response.status == 200) {
                    console.log('\n========= token获取成功 =========\n');
                    __token__ = data.match(/(?<=token\s*=\s*")\S*(?=")/)[0];
                }

                let result1 = response.headers['set-cookie'];
                result1 = result1.toString();
                Cookie = result1.match(/(?<=PHPSESSID=)\S*(?=;)/)[0];
                Cookie = 'last_oauth_appid=yqfkdaka; last_oauth_state=home; PHPSESSID=' + Cookie
                // msg += `\n 【获取】${__token__} 了🎉   \n`;
                // msg += `\n 【获取】${Cookie} 了🎉   \n`;
                //console.log(Cookie);
                //console.log(__token__);              
            } catch (e) {
                console.log(e)
            } finally {
                resolve();
            }
        }, timeout)
    })
}

//密码登录 https://cas.dgut.edu.cn/home/Oauth/getToken/appid/yqfkdaka/state/%2Fhome.html
const getLink = function(timeout = 3 * 1000) {
    request_url.url = 'https://cas.dgut.edu.cn/home/Oauth/getToken/appid/yqfkdaka/state/%2Fhome.html';
    request_url.headers['Cookie'] = Cookie;
    request_url.body = "username=" + user + "&password=" + pwd + "&__token__=" + __token__ + "&wechat_verify=";
    return new Promise((resolve) => {
        if (debug) {
            console.log(`\n 【debug】=============== 这是 getLink 请求 url ===============`);
            console.log(request_url);
        }
        $.post(request_url, async (error, response, data) => {
            try {
                if (debug) {
                    console.log(`\n\n 【debug】===============这是 getLink 返回data==============`);
                    console.log(data)
                    console.log(`======`)
                    console.log(JSON.parse(data))
                    // console.log(response)			
                    console.log(`======`)
                    //   console.log(JSON.parse(response))	
                }
                let result = JSON.parse(data);
                if (result.code == 1) {
                    console.log(`\n========= 尝试登录： ${result.message} =========\n`)
                    dgut_token = data.match(/(?<=token=)\S*(?=&)/)[0];
                    console.log(`\n========= 获取dgut_token： ${dgut_token} =========\n`)
                } else {
                    console.log(`\n========= 登录失败，请检查 =========\n`)
                }
            } catch (e) {
                console.log(e)
            } finally {
                resolve();
            }
        }, timeout)
    })
}

//获取access_token https://yqfk-daka-api.dgut.edu.cn/auth
const get_access_token = function(timeout = 3 * 1000) {
    request_url.url = `https://yqfk-daka-api.dgut.edu.cn/auth`;
    request_url.headers = {
        'Host': 'yqfk-daka-api.dgut.edu.cn',
        'Connection': 'keep-alive',
        'Content-Length': '70',
        'Accept': 'application/json, text/plain, */*',
        'Origin': 'https://yqfk-daka.dgut.edu.cn',
        'User-Agent': UA,
        'Content-Type': 'application/json',
        'Referer': `https://yqfk-daka.dgut.edu.cn/login/dgut?token=${dgut_token}&state=home`,
        'Accept-Encoding': 'gzip, deflate',
        'Accept-Language': 'zh-CN,en-US;q=0.8'
    };
    request_url.body = `{"token":"${dgut_token}","state":"home"}\r\n`;
    return new Promise((resolve) => {
        if (debug) {
            console.log(`\n 【debug】=============== 这是 get_access_token 请求 url ===============`);
            console.log(request_url);
        }
        $.post(request_url, async (error, response, data) => {
            try {
                if (debug) {
                    console.log(`\n\n 【debug】===============这是 get_access_token 返回data==============`);
                    console.log(data)
                    console.log(`======`)
                    console.log(JSON.parse(data))
                }
                let result = JSON.parse(data);
                if (result.access_token != undefined) {
                    // console.log(result.access_token)
                    dgut_access_token = result.access_token;
                    console.log(`\n========= 获取access_token：${dgut_access_token} =========\n`)
                } else console.log(`\n========= 登录失败，请检查 =========\n`)
            } catch (e) {
                console.log(e)
            } finally {
                resolve();
            }
        }, timeout)
    })
}

//获取基本信息 https://yqfk-daka-api.dgut.edu.cn/record/
const getBaseInfo = function(timeout = 3 * 1000) {
    authorization = 'Bearer ' + dgut_access_token;
    let options = {
        'url': 'https://yqfk-daka-api.dgut.edu.cn/record/',
        'headers': {
            'Host': 'yqfk-daka-api.dgut.edu.cn',
            'Connection': 'keep-alive',
            'Accept': 'application/json, text/plain, */*',
            'Origin': 'https://yqfk-daka.dgut.edu.cn',
            'Authorization': authorization,
            'User-Agent': UA,
            'Referer': 'https://yqfk-daka.dgut.edu.cn/',
            'Accept-Encoding': 'gzip, deflate',
            'Accept-Language': 'zh-CN,en-US;q=0.8'
        }
    }
    return new Promise((resolve) => {
        if (debug) {
            console.log(`\n 【debug】=============== 这是 getBaseInfo 请求 url ===============`);
            console.log(request_url);
        }
        $.get(options, async (error, response, data) => {
            try {
                if (debug) {
                    console.log(`\n\n 【debug】===============这是 getBaseInfo 返回data==============`);
                    console.log(data)
                    console.log(`======`)
                    console.log(JSON.parse(data))
                }

                let result = JSON.parse(data);
                if (result.message != undefined) {
                    console.log(result.message);
                    msg += `\n 【${user}】${result.message} 了🎉  \n`;
                }
            } catch (e) {
                console.log(e)
            } finally {
                resolve();
            }
        }, timeout)
    })
}

//打卡 https://yqfk-daka-api.dgut.edu.cn/record/ 此方法token失效
// const submit = function (timeout = 3 * 1000){
//     request_url.url = `https://yqfk-daka-api.dgut.edu.cn/auth`;
//     request_url.headers = {
//         'Host': 'yqfk-daka-api.dgut.edu.cn',
//         'Connection': 'keep-alive',
//         'Accept': 'application/json, text/plain, */*',
//         'Origin': 'https://yqfk-daka.dgut.edu.cn',
//         'Authorization': authorization,
//         'User-Agent': UA,
//         'Content-Type': 'application/json',
//         'Referer': 'https://yqfk-daka.dgut.edu.cn/',
//         'Accept-Encoding': 'gzip, deflate',
//         'Accept-Language': 'zh-CN,en-US;q=0.8'
//     }; 
//   //  request_url.body = `{"data":{"submit_time":"","name":"","faculty_name":"","class_name":"","username":"","card_number":"","identity_type":"","remark":"","tel":"","body_temperature":"","connect_person":"","connect_tel":"","family_address_detail":"","current_country":"","current_province":"","current_city":"","current_district":"","latest_acid_test":"","huji_region":["","","",""],"family_region":["","","",""],"jiguan_region":["","","",""],"current_region":["","","",""],"huji_region_name":"","family_region_name":"","jiguan_region_name":"","current_region_name":"","card_type":"","campus":"","health_situation":"","have_gone_important_area":"","have_contact_hubei_people":"","have_contact_illness_people":"","have_isolation_in_dg":"","is_in_dg":"","have_go_out":"","is_specific_people":"","health_code_status":"","in_controllerd_area":"","completed_vaccination":"","is_in_school":"","have_stay_area":"","family_situation":[],"gps_country":"","gps_province":"","gps_city":"","gps_district":"","gps_country_name":"","gps_province_name":"","gps_city_name":"","gps_district_name":"","gps_address_name":""}}`;
//     return new Promise((resolve) => {
// 		if (debug) {
// 			console.log(`\n 【debug】=============== 这是 submit 请求 url ===============`);
// 			console.log(request_url);
// 		}
//         $.post(request_url, async (error, response, data) => {
// 			try {
// 				if (debug) {
// 					console.log(`\n\n 【debug】===============这是 submit 返回data==============`);
// 					console.log(data)
// 					console.log(`======`)
// 					console.log(JSON.parse(data))				
//                 }
//                 let result = JSON.parse(data);
//                 if (result.message != undefined) {
//                     console.log(result.message);
//                     msg += `\n 【${user}】${result.message} 了🎉  \n`;
//                 }
//         } catch (e) {
//             console.log(e)
//         } finally {
//             resolve();
//         }
//     }, timeout)
// })
// }

//axios request submit
function submit(timeout = 3 * 1000) {
    let axios = require('axios');
    let data = '{"data":{"submit_time":"","name":"","faculty_name":"","class_name":"","username":"","card_number":"","identity_type":"","remark":"","tel":"","body_temperature":"","connect_person":"","connect_tel":"","family_address_detail":"","current_country":"","current_province":"","current_city":"","current_district":"","latest_acid_test":"","huji_region":["","","",""],"family_region":["","","",""],"jiguan_region":["","","",""],"current_region":["","","",""],"huji_region_name":"","family_region_name":"","jiguan_region_name":"","current_region_name":"","card_type":"","campus":"","health_situation":"","have_gone_important_area":"","have_contact_hubei_people":"","have_contact_illness_people":"","have_isolation_in_dg":"","is_in_dg":"","have_go_out":"","is_specific_people":"","health_code_status":"","in_controllerd_area":"","completed_vaccination":"","is_in_school":"","have_stay_area":"","family_situation":[],"gps_country":"","gps_province":"","gps_city":"","gps_district":"","gps_country_name":"","gps_province_name":"","gps_city_name":"","gps_district_name":"","gps_address_name":""}}';
    let config = {
        method: 'post',
        url: 'https://yqfk-daka-api.dgut.edu.cn/record/',
        headers: {
            'Host': 'yqfk-daka-api.dgut.edu.cn',
            'Connection': 'keep-alive',
            'Accept': 'application/json, text/plain, */*',
            'Origin': 'https://yqfk-daka.dgut.edu.cn',
            'Authorization': authorization,
            'User-Agent': UA,
            'Content-Type': 'application/json',
            'Referer': 'https://yqfk-daka.dgut.edu.cn/',
            'Accept-Encoding': 'gzip, deflate',
            'Accept-Language': 'zh-CN,en-US;q=0.8'
        },
        data: data
    };
    axios(config)
        .then(function(response) {
            console.log(`===========`) //没抓成功
            let result = response.match(/(?<=message:\s*')\S*(?=')/)[0];
            if (result != undefined) {
                console.log(result);
                msg += `\n 【${user}】${result} 🎉  \n`;
            }
        })
        .catch(function(error) {
            // console.log(error);
            // console.log(`===========`)
            // console.log(error.response);
            // console.log(`===========`)
            // console.log(error.response.data);
            // console.log(`===========`)
            // console.log(error.response.data.message);
            // console.log(JSON.stringify(error.data));
            let result = error.response.data.message;
            if (result != undefined) {
                console.log(result);
                msg += `\n 【${user}】${result} 🎉  \n`;
            }
        });
}

// prettier-ignore
function Env(t, e) { "undefined" != typeof process && JSON.stringify(process.env).indexOf("GITHUB") > -1 && process.exit(0); class s { constructor(t) { this.env = t } send(t, e = "GET") { t = "string" == typeof t ? { url: t } : t; let s = this.get; return "POST" === e && (s = this.post), new Promise((e, i) => { s.call(this, t, (t, s, r) => { t ? i(t) : e(s) }) }) } get(t) { return this.send.call(this.env, t) } post(t) { return this.send.call(this.env, t, "POST") } } return new class { constructor(t, e) { this.name = t, this.http = new s(this), this.data = null, this.dataFile = "box.dat", this.logs = [], this.isMute = !1, this.isNeedRewrite = !1, this.logSeparator = "\n", this.startTime = (new Date).getTime(), Object.assign(this, e), this.log("", `🔔${this.name}, 开始!`) } isNode() { return "undefined" != typeof module && !!module.exports } isQuanX() { return "undefined" != typeof $task } isSurge() { return "undefined" != typeof $httpClient && "undefined" == typeof $loon } isLoon() { return "undefined" != typeof $loon } toObj(t, e = null) { try { return JSON.parse(t) } catch { return e } } toStr(t, e = null) { try { return JSON.stringify(t) } catch { return e } } getjson(t, e) { let s = e; const i = this.getdata(t); if (i) try { s = JSON.parse(this.getdata(t)) } catch { } return s } setjson(t, e) { try { return this.setdata(JSON.stringify(t), e) } catch { return !1 } } getScript(t) { return new Promise(e => { this.get({ url: t }, (t, s, i) => e(i)) }) } runScript(t, e) { return new Promise(s => { let i = this.getdata("@chavy_boxjs_userCfgs.httpapi"); i = i ? i.replace(/\n/g, "").trim() : i; let r = this.getdata("@chavy_boxjs_userCfgs.httpapi_timeout"); r = r ? 1 * r : 20, r = e && e.timeout ? e.timeout : r; const [o, h] = i.split("@"), n = { url: `http://${h}/v1/scripting/evaluate`, body: { script_text: t, mock_type: "cron", timeout: r }, headers: { "X-Key": o, Accept: "*/*" } }; this.post(n, (t, e, i) => s(i)) }).catch(t => this.logErr(t)) } loaddata() { if (!this.isNode()) return {}; { this.fs = this.fs ? this.fs : require("fs"), this.path = this.path ? this.path : require("path"); const t = this.path.resolve(this.dataFile), e = this.path.resolve(process.cwd(), this.dataFile), s = this.fs.existsSync(t), i = !s && this.fs.existsSync(e); if (!s && !i) return {}; { const i = s ? t : e; try { return JSON.parse(this.fs.readFileSync(i)) } catch (t) { return {} } } } } writedata() { if (this.isNode()) { this.fs = this.fs ? this.fs : require("fs"), this.path = this.path ? this.path : require("path"); const t = this.path.resolve(this.dataFile), e = this.path.resolve(process.cwd(), this.dataFile), s = this.fs.existsSync(t), i = !s && this.fs.existsSync(e), r = JSON.stringify(this.data); s ? this.fs.writeFileSync(t, r) : i ? this.fs.writeFileSync(e, r) : this.fs.writeFileSync(t, r) } } lodash_get(t, e, s) { const i = e.replace(/\[(\d+)\]/g, ".$1").split("."); let r = t; for (const t of i) if (r = Object(r)[t], void 0 === r) return s; return r } lodash_set(t, e, s) { return Object(t) !== t ? t : (Array.isArray(e) || (e = e.toString().match(/[^.[\]]+/g) || []), e.slice(0, -1).reduce((t, s, i) => Object(t[s]) === t[s] ? t[s] : t[s] = Math.abs(e[i + 1]) >> 0 == +e[i + 1] ? [] : {}, t)[e[e.length - 1]] = s, t) } getdata(t) { let e = this.getval(t); if (/^@/.test(t)) { const [, s, i] = /^@(.*?)\.(.*?)$/.exec(t), r = s ? this.getval(s) : ""; if (r) try { const t = JSON.parse(r); e = t ? this.lodash_get(t, i, "") : e } catch (t) { e = "" } } return e } setdata(t, e) { let s = !1; if (/^@/.test(e)) { const [, i, r] = /^@(.*?)\.(.*?)$/.exec(e), o = this.getval(i), h = i ? "null" === o ? null : o || "{}" : "{}"; try { const e = JSON.parse(h); this.lodash_set(e, r, t), s = this.setval(JSON.stringify(e), i) } catch (e) { const o = {}; this.lodash_set(o, r, t), s = this.setval(JSON.stringify(o), i) } } else s = this.setval(t, e); return s } getval(t) { return this.isSurge() || this.isLoon() ? $persistentStore.read(t) : this.isQuanX() ? $prefs.valueForKey(t) : this.isNode() ? (this.data = this.loaddata(), this.data[t]) : this.data && this.data[t] || null } setval(t, e) { return this.isSurge() || this.isLoon() ? $persistentStore.write(t, e) : this.isQuanX() ? $prefs.setValueForKey(t, e) : this.isNode() ? (this.data = this.loaddata(), this.data[e] = t, this.writedata(), !0) : this.data && this.data[e] || null } initGotEnv(t) { this.got = this.got ? this.got : require("got"), this.cktough = this.cktough ? this.cktough : require("tough-cookie"), this.ckjar = this.ckjar ? this.ckjar : new this.cktough.CookieJar, t && (t.headers = t.headers ? t.headers : {}, void 0 === t.headers.Cookie && void 0 === t.cookieJar && (t.cookieJar = this.ckjar)) } get(t, e = (() => { })) { t.headers && (delete t.headers["Content-Type"], delete t.headers["Content-Length"]), this.isSurge() || this.isLoon() ? (this.isSurge() && this.isNeedRewrite && (t.headers = t.headers || {}, Object.assign(t.headers, { "X-Surge-Skip-Scripting": !1 })), $httpClient.get(t, (t, s, i) => { !t && s && (s.body = i, s.statusCode = s.status), e(t, s, i) })) : this.isQuanX() ? (this.isNeedRewrite && (t.opts = t.opts || {}, Object.assign(t.opts, { hints: !1 })), $task.fetch(t).then(t => { const { statusCode: s, statusCode: i, headers: r, body: o } = t; e(null, { status: s, statusCode: i, headers: r, body: o }, o) }, t => e(t))) : this.isNode() && (this.initGotEnv(t), this.got(t).on("redirect", (t, e) => { try { if (t.headers["set-cookie"]) { const s = t.headers["set-cookie"].map(this.cktough.Cookie.parse).toString(); s && this.ckjar.setCookieSync(s, null), e.cookieJar = this.ckjar } } catch (t) { this.logErr(t) } }).then(t => { const { statusCode: s, statusCode: i, headers: r, body: o } = t; e(null, { status: s, statusCode: i, headers: r, body: o }, o) }, t => { const { message: s, response: i } = t; e(s, i, i && i.body) })) } post(t, e = (() => { })) { if (t.body && t.headers && !t.headers["Content-Type"] && (t.headers["Content-Type"] = "application/x-www-form-urlencoded"), t.headers && delete t.headers["Content-Length"], this.isSurge() || this.isLoon()) this.isSurge() && this.isNeedRewrite && (t.headers = t.headers || {}, Object.assign(t.headers, { "X-Surge-Skip-Scripting": !1 })), $httpClient.post(t, (t, s, i) => { !t && s && (s.body = i, s.statusCode = s.status), e(t, s, i) }); else if (this.isQuanX()) t.method = "POST", this.isNeedRewrite && (t.opts = t.opts || {}, Object.assign(t.opts, { hints: !1 })), $task.fetch(t).then(t => { const { statusCode: s, statusCode: i, headers: r, body: o } = t; e(null, { status: s, statusCode: i, headers: r, body: o }, o) }, t => e(t)); else if (this.isNode()) { this.initGotEnv(t); const { url: s, ...i } = t; this.got.post(s, i).then(t => { const { statusCode: s, statusCode: i, headers: r, body: o } = t; e(null, { status: s, statusCode: i, headers: r, body: o }, o) }, t => { const { message: s, response: i } = t; e(s, i, i && i.body) }) } } time(t, e = null) { const s = e ? new Date(e) : new Date; let i = { "M+": s.getMonth() + 1, "d+": s.getDate(), "H+": s.getHours(), "m+": s.getMinutes(), "s+": s.getSeconds(), "q+": Math.floor((s.getMonth() + 3) / 3), S: s.getMilliseconds() }; /(y+)/.test(t) && (t = t.replace(RegExp.$1, (s.getFullYear() + "").substr(4 - RegExp.$1.length))); for (let e in i) new RegExp("(" + e + ")").test(t) && (t = t.replace(RegExp.$1, 1 == RegExp.$1.length ? i[e] : ("00" + i[e]).substr(("" + i[e]).length))); return t } msg(e = t, s = "", i = "", r) { const o = t => { if (!t) return t; if ("string" == typeof t) return this.isLoon() ? t : this.isQuanX() ? { "open-url": t } : this.isSurge() ? { url: t } : void 0; if ("object" == typeof t) { if (this.isLoon()) { let e = t.openUrl || t.url || t["open-url"], s = t.mediaUrl || t["media-url"]; return { openUrl: e, mediaUrl: s } } if (this.isQuanX()) { let e = t["open-url"] || t.url || t.openUrl, s = t["media-url"] || t.mediaUrl; return { "open-url": e, "media-url": s } } if (this.isSurge()) { let e = t.url || t.openUrl || t["open-url"]; return { url: e } } } }; if (this.isMute || (this.isSurge() || this.isLoon() ? $notification.post(e, s, i, o(r)) : this.isQuanX() && $notify(e, s, i, o(r))), !this.isMuteLog) { let t = ["", "==============📣系统通知📣=============="]; t.push(e), s && t.push(s), i && t.push(i), console.log(t.join("\n")), this.logs = this.logs.concat(t) } } log(...t) { t.length > 0 && (this.logs = [...this.logs, ...t]), console.log(t.join(this.logSeparator)) } logErr(t, e) { const s = !this.isSurge() && !this.isQuanX() && !this.isLoon(); s ? this.log("", `❗️${this.name}, 错误!`, t.stack) : this.log("", `❗️${this.name}, 错误!`, t) } wait(t) { return new Promise(e => setTimeout(e, t)) } done(t = {}) { const e = (new Date).getTime(), s = (e - this.startTime) / 1e3; this.log("", `🔔${this.name}, 结束! 🕛 ${s} 秒`), this.log(), (this.isSurge() || this.isQuanX() || this.isLoon()) && $done(t) } }(t, e) }
