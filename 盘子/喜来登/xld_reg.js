/**
 * 喜来登-注册机
 * cron 10 7 * * *  xld.js
 *
 * 9-18		盘子, 自己0薅玩, 坑了钱别来找我
 *
 * tg频道: https://t.me/yml2213_tg  
 */


//-------------------- 配置区域 --------------------
const reg_num = '20'  			//注册数量
let regcode = '6e8dd9' 			//邀请码  6e8dd9   7e9de2   8fbde2
let host = 'app.xilaidengjiudianbrs.com'
let hostname = 'https://' + host
// -----------------------------------------------


const $ = new Env("喜来登-注册机");
const alias_name = 'xld'
const Notify = 1 		//0为关闭通知,1为打开通知,默认为1
const debug = 0		    //0为关闭调试,1为打开调试,默认为0
//---------------------------------------------------------------------------------------------------------
let msg, ck, new_regcode;
let userinfo = ''
let code_status = true
//---------------------------------------------------------------------------------------------------------
let VersionCheck = "0.0.1"
let Change = '领取每日任务!'
//---------------------------------------------------------------------------------------------------------


async function start() {
	index = 0
	await xldreg('开始注册', index, regcode);
	for (index = 1; index < reg_num; index++) {
		await xldreg('开始注册', index, new_regcode);
	}
	console.log(`账号信息\n\n`);
	console.log(userinfo);
	console.log(`\n\n`);


}




// 注册
async function xldreg(name, index, regcode) {
	console.log(`\n================================================\n开始 第${index + 1}次${name} ,本次注册邀请码为 ${regcode}`);
	await get_code('获取验证码');
	let phone_code = phone();
	let pw = randomszxx(8);
	if (code_status) {
		try {
			let Options = {
				url: `${hostname}/api/v1/user/register`,
				headers: {
					"content-type": "application/json; charset=utf-8",
				},
				body: `{"captcha_code":"${code}","captcha_id":"${code_id}","password":"${pw}","reg_code":"${regcode}","tel":"${phone_code}"}`
			};
			let result = await httpPost(Options, name);

			// console.log(result);
			if (!result.hasOwnProperty('error')) {
				console.log(`注册成功 , ${phone_code}&${pw}`);
				userinfo += `${phone_code}&${pw}\n`
				console.log(`等待 5 s`);
				await wait(5);
				await login('登录-获取新邀请码', pw, phone_code);
				return new_regcode

			} else if (result.hasOwnProperty('error')) {
				console.log(`注册失败了，再试一次！`);
				DoubleLog(result.msg)
				await xldreg('开始注册', index, regcode);
			} else {
				console.log(`注册失败，未知原因!`)
			}
		} catch (e) {
			console.log(e)
		}
	}
}








// 登录   httpPost
async function login(name, pw, phone_code) {
	DoubleLog(`\n开始 ${name}`);
	try {
		let Options = {
			url: `https://app.xilaidengjiudianbrs.com/api/v1/user/login`,
			headers: {
				"content-type": "application/json; charset=utf-8",
			},
			body: `{"password":"${pw}","username":"${phone_code}"}`
		};
		let result = await httpPost(Options, name);

		// console.log(result);
		if (result.expire_sec) {
			DoubleLog(`${name}: 成功, 时间:${result.expire_time}}`);
			let Token = result.token
			await wait(3)
			await user_info('获取邀请码', Token);
			return new_regcode
		} else {
			DoubleLog(`${name}: 失败❌了呢`);
			console.log(result);
			return ck_status = false;
		}
	} catch (error) {
		console.log(error);
	}


}


// 用户信息  https://app.xilaidengjiudianbrs.com/api/v1/user/center?
async function user_info(name, Token) {
	DoubleLog(`\n开始 ${name}`);
	try {
		let Options = {
			url: `https://app.xilaidengjiudianbrs.com/api/v1/user/center?`,
			headers: {
				"content-type": "application/json; charset=utf-8",
				"authorization": `Bearer ${Token}`,
			},
		};
		let result = await httpGet(Options, name);

		// console.log(result);
		if (result.account) {
			DoubleLog(`${name}: 成功!\n    欢迎:${result.account} 邀请码:${(result.code)}`);
			new_regcode = result.code
			return new_regcode
		} else {
			DoubleLog(`${name}: 失败❌了呢`);
			console.log(result);
		}
	} catch (error) {
		console.log(error);
	}
}





// 获取验证码
async function get_code(name) {
	// console.log(`\n开始 ${name}`);
	try {
		let Options = {
			url: `${hostname}/api/v1/captcha?`,
			headers: {
				"content-type": "application/json; charset=utf-8",
			},
		};
		let result = await httpGet(Options, name);

		if (result.id) {
			code_base64 = result.base64.split(',')[1]
			code_id = result.id
			// console.log(code_base64);
			console.log(`验证码获取成功`)
			await recognition_coed('识别验证码', code_base64)
		} else {
			console.log(`签到失败: ${result.msg}`)
		}
	} catch (e) {
		console.log(e)
	}
}

// 识别验证码
async function recognition_coed(name, code_base64) {
	console.log(`\n开始 ${name}`);
	try {
		let Options = {
			url: `http://81.70.196.85:9898/ocr/b64/json`,
			headers: {
				"content-type": "application/json; charset=utf-8",
			},
			body: `${code_base64}`
		};
		let result = await httpPost(Options, name);

		if (result.status == 200 && result.msg == '') {
			code = result.result;
			if (code.length == 4) {
				DoubleLog(`识别成功:${code}`);
				return code
			} else {
				DoubleLog(`识别失败1: ${result.msg}`);
				await xldreg('开始注册', index, regcode);
				return code_status = false;
			}
		} else if (result.msg != '') {
			DoubleLog(`识别失败2: ${result.msg}`);
			await xldreg('开始注册', index, regcode);
			return code_status = false;
		} else {
			DoubleLog(`未知错误!`)
			return code_status = false;
		}
	} catch (e) {
		console.log(e)
	}
}

// 随机手机号
function phone() { let a = new Array( "130", "131", "132", "133", "135", "136", "137", "138", "139", "151", "152", "158", "166", "170", "177", "179", "181", "187", "189" ), d = parseInt(a.length * Math.random()), b = a[d]; for (let c = 0; c < 8; c++) b += Math.floor(10 * Math.random()); return b; }





// #region ********************************************************  固定代码  ********************************************************



/**
 * 账号处理
 */
!(async () => {
	await start();

})()
	.catch((e) => $.logErr(e))
	.finally(() => $.done());



/**
 * 双平台log输出
 */
function DoubleLog(data) {
	if ($.isNode()) {
		if (data) {
			console.log(`    ${data}`);
			msg += `\n    ${data}`;
		}
	} else {
		console.log(`    ${data}`);
		msg += `\n    ${data}`;
	}

}



/**
 * 随机 数字 + 小写字母 生成
 */
function randomszxx(e) {
	e = e || 32;
	var t = "qwertyuioplkjhgfdsazxcvbnm1234567890",
		a = t.length,
		n = "";

	for (i = 0; i < e; i++) n += t.charAt(Math.floor(Math.random() * a));
	return n;
}





/**
 * 等待 X 秒
 */
function wait(n) {
	return new Promise(function (resolve) {
		setTimeout(resolve, n * 1000);
	});
}



/**
 * get请求
 */
async function httpGet(getUrlObject, tip, timeout = 3) {
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
						console.log(`\n 【debug】=============这是 ${tip} json解析后数据============`);
						console.log(JSON.parse(data));
					}
					let result = JSON.parse(data);
					if (result == undefined) {
						return;
					} else {
						resolve(result);
					}

				} catch (e) {
					console.log(err, resp);
					console.log(`\n ${tip} 失败了!请稍后尝试!!`);
					msg = `\n ${tip} 失败了!请稍后尝试!!`
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
async function httpPost(postUrlObject, tip, timeout = 3) {
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
						console.log(`\n 【debug】=============这是 ${tip} json解析后数据============`);
						console.log(JSON.parse(data));
					}
					let result = JSON.parse(data);
					if (result == undefined) {
						return;
					} else {
						resolve(result);
					}

				} catch (e) {
					console.log(err, resp);
					console.log(`\n ${tip} 失败了!请稍后尝试!!`);
					msg = `\n ${tip} 失败了!请稍后尝试!!`
				} finally {
					resolve();
				}
			},
			timeout
		);
	});
}








// 完整 Env
function Env(t, e) { "undefined" != typeof process && JSON.stringify(process.env).indexOf("GITHUB") > -1 && process.exit(0); class s { constructor(t) { this.env = t } send(t, e = "GET") { t = "string" == typeof t ? { url: t } : t; let s = this.get; return "POST" === e && (s = this.post), new Promise((e, i) => { s.call(this, t, (t, s, r) => { t ? i(t) : e(s) }) }) } get(t) { return this.send.call(this.env, t) } post(t) { return this.send.call(this.env, t, "POST") } } return new class { constructor(t, e) { this.name = t, this.http = new s(this), this.data = null, this.dataFile = "box.dat", this.logs = [], this.isMute = !1, this.isNeedRewrite = !1, this.logSeparator = "\n", this.startTime = (new Date).getTime(), Object.assign(this, e), this.log("", `🔔${this.name}, 开始!`) } isNode() { return "undefined" != typeof module && !!module.exports } isQuanX() { return "undefined" != typeof $task } isSurge() { return "undefined" != typeof $httpClient && "undefined" == typeof $loon } isLoon() { return "undefined" != typeof $loon } toObj(t, e = null) { try { return JSON.parse(t) } catch { return e } } toStr(t, e = null) { try { return JSON.stringify(t) } catch { return e } } getjson(t, e) { let s = e; const i = this.getdata(t); if (i) try { s = JSON.parse(this.getdata(t)) } catch { } return s } setjson(t, e) { try { return this.setdata(JSON.stringify(t), e) } catch { return !1 } } getScript(t) { return new Promise(e => { this.get({ url: t }, (t, s, i) => e(i)) }) } runScript(t, e) { return new Promise(s => { let i = this.getdata("@chavy_boxjs_userCfgs.httpapi"); i = i ? i.replace(/\n/g, "").trim() : i; let r = this.getdata("@chavy_boxjs_userCfgs.httpapi_timeout"); r = r ? 1 * r : 20, r = e && e.timeout ? e.timeout : r; const [o, h] = i.split("@"), n = { url: `http://${h}/v1/scripting/evaluate`, body: { script_text: t, mock_type: "cron", timeout: r }, headers: { "X-Key": o, Accept: "*/*" } }; this.post(n, (t, e, i) => s(i)) }).catch(t => this.logErr(t)) } loaddata() { if (!this.isNode()) return {}; { this.fs = this.fs ? this.fs : require("fs"), this.path = this.path ? this.path : require("path"); const t = this.path.resolve(this.dataFile), e = this.path.resolve(process.cwd(), this.dataFile), s = this.fs.existsSync(t), i = !s && this.fs.existsSync(e); if (!s && !i) return {}; { const i = s ? t : e; try { return JSON.parse(this.fs.readFileSync(i)) } catch (t) { return {} } } } } writedata() { if (this.isNode()) { this.fs = this.fs ? this.fs : require("fs"), this.path = this.path ? this.path : require("path"); const t = this.path.resolve(this.dataFile), e = this.path.resolve(process.cwd(), this.dataFile), s = this.fs.existsSync(t), i = !s && this.fs.existsSync(e), r = JSON.stringify(this.data); s ? this.fs.writeFileSync(t, r) : i ? this.fs.writeFileSync(e, r) : this.fs.writeFileSync(t, r) } } lodash_get(t, e, s) { const i = e.replace(/\[(\d+)\]/g, ".$1").split("."); let r = t; for (const t of i) if (r = Object(r)[t], void 0 === r) return s; return r } lodash_set(t, e, s) { return Object(t) !== t ? t : (Array.isArray(e) || (e = e.toString().match(/[^.[\]]+/g) || []), e.slice(0, -1).reduce((t, s, i) => Object(t[s]) === t[s] ? t[s] : t[s] = Math.abs(e[i + 1]) >> 0 == +e[i + 1] ? [] : {}, t)[e[e.length - 1]] = s, t) } getdata(t) { let e = this.getval(t); if (/^@/.test(t)) { const [, s, i] = /^@(.*?)\.(.*?)$/.exec(t), r = s ? this.getval(s) : ""; if (r) try { const t = JSON.parse(r); e = t ? this.lodash_get(t, i, "") : e } catch (t) { e = "" } } return e } setdata(t, e) { let s = !1; if (/^@/.test(e)) { const [, i, r] = /^@(.*?)\.(.*?)$/.exec(e), o = this.getval(i), h = i ? "null" === o ? null : o || "{}" : "{}"; try { const e = JSON.parse(h); this.lodash_set(e, r, t), s = this.setval(JSON.stringify(e), i) } catch (e) { const o = {}; this.lodash_set(o, r, t), s = this.setval(JSON.stringify(o), i) } } else s = this.setval(t, e); return s } getval(t) { return this.isSurge() || this.isLoon() ? $persistentStore.read(t) : this.isQuanX() ? $prefs.valueForKey(t) : this.isNode() ? (this.data = this.loaddata(), this.data[t]) : this.data && this.data[t] || null } setval(t, e) { return this.isSurge() || this.isLoon() ? $persistentStore.write(t, e) : this.isQuanX() ? $prefs.setValueForKey(t, e) : this.isNode() ? (this.data = this.loaddata(), this.data[e] = t, this.writedata(), !0) : this.data && this.data[e] || null } initGotEnv(t) { this.got = this.got ? this.got : require("got"), this.cktough = this.cktough ? this.cktough : require("tough-cookie"), this.ckjar = this.ckjar ? this.ckjar : new this.cktough.CookieJar, t && (t.headers = t.headers ? t.headers : {}, void 0 === t.headers.Cookie && void 0 === t.cookieJar && (t.cookieJar = this.ckjar)) } get(t, e = (() => { })) { t.headers && (delete t.headers["Content-Type"], delete t.headers["Content-Length"]), this.isSurge() || this.isLoon() ? (this.isSurge() && this.isNeedRewrite && (t.headers = t.headers || {}, Object.assign(t.headers, { "X-Surge-Skip-Scripting": !1 })), $httpClient.get(t, (t, s, i) => { !t && s && (s.body = i, s.statusCode = s.status), e(t, s, i) })) : this.isQuanX() ? (this.isNeedRewrite && (t.opts = t.opts || {}, Object.assign(t.opts, { hints: !1 })), $task.fetch(t).then(t => { const { statusCode: s, statusCode: i, headers: r, body: o } = t; e(null, { status: s, statusCode: i, headers: r, body: o }, o) }, t => e(t))) : this.isNode() && (this.initGotEnv(t), this.got(t).on("redirect", (t, e) => { try { if (t.headers["set-cookie"]) { const s = t.headers["set-cookie"].map(this.cktough.Cookie.parse).toString(); s && this.ckjar.setCookieSync(s, null), e.cookieJar = this.ckjar } } catch (t) { this.logErr(t) } }).then(t => { const { statusCode: s, statusCode: i, headers: r, body: o } = t; e(null, { status: s, statusCode: i, headers: r, body: o }, o) }, t => { const { message: s, response: i } = t; e(s, i, i && i.body) })) } post(t, e = (() => { })) { if (t.body && t.headers && !t.headers["Content-Type"] && (t.headers["Content-Type"] = "application/x-www-form-urlencoded"), t.headers && delete t.headers["Content-Length"], this.isSurge() || this.isLoon()) this.isSurge() && this.isNeedRewrite && (t.headers = t.headers || {}, Object.assign(t.headers, { "X-Surge-Skip-Scripting": !1 })), $httpClient.post(t, (t, s, i) => { !t && s && (s.body = i, s.statusCode = s.status), e(t, s, i) }); else if (this.isQuanX()) t.method = "POST", this.isNeedRewrite && (t.opts = t.opts || {}, Object.assign(t.opts, { hints: !1 })), $task.fetch(t).then(t => { const { statusCode: s, statusCode: i, headers: r, body: o } = t; e(null, { status: s, statusCode: i, headers: r, body: o }, o) }, t => e(t)); else if (this.isNode()) { this.initGotEnv(t); const { url: s, ...i } = t; this.got.post(s, i).then(t => { const { statusCode: s, statusCode: i, headers: r, body: o } = t; e(null, { status: s, statusCode: i, headers: r, body: o }, o) }, t => { const { message: s, response: i } = t; e(s, i, i && i.body) }) } } time(t, e = null) { const s = e ? new Date(e) : new Date; let i = { "M+": s.getMonth() + 1, "d+": s.getDate(), "H+": s.getHours(), "m+": s.getMinutes(), "s+": s.getSeconds(), "q+": Math.floor((s.getMonth() + 3) / 3), S: s.getMilliseconds() }; /(y+)/.test(t) && (t = t.replace(RegExp.$1, (s.getFullYear() + "").substr(4 - RegExp.$1.length))); for (let e in i) new RegExp("(" + e + ")").test(t) && (t = t.replace(RegExp.$1, 1 == RegExp.$1.length ? i[e] : ("00" + i[e]).substr(("" + i[e]).length))); return t } msg(e = t, s = "", i = "", r) { const o = t => { if (!t) return t; if ("string" == typeof t) return this.isLoon() ? t : this.isQuanX() ? { "open-url": t } : this.isSurge() ? { url: t } : void 0; if ("object" == typeof t) { if (this.isLoon()) { let e = t.openUrl || t.url || t["open-url"], s = t.mediaUrl || t["media-url"]; return { openUrl: e, mediaUrl: s } } if (this.isQuanX()) { let e = t["open-url"] || t.url || t.openUrl, s = t["media-url"] || t.mediaUrl; return { "open-url": e, "media-url": s } } if (this.isSurge()) { let e = t.url || t.openUrl || t["open-url"]; return { url: e } } } }; if (this.isMute || (this.isSurge() || this.isLoon() ? $notification.post(e, s, i, o(r)) : this.isQuanX() && $notify(e, s, i, o(r))), !this.isMuteLog) { let t = ["", "==============📣系统通知📣=============="]; t.push(e), s && t.push(s), i && t.push(i), console.log(t.join("\n")), this.logs = this.logs.concat(t) } } log(...t) { t.length > 0 && (this.logs = [...this.logs, ...t]), console.log(t.join(this.logSeparator)) } logErr(t, e) { const s = !this.isSurge() && !this.isQuanX() && !this.isLoon(); s ? this.log("", `❗️${this.name}, 错误!`, t.stack) : this.log("", `❗️${this.name}, 错误!`, t) } wait(t) { return new Promise(e => setTimeout(e, t)) } done(t = {}) { const e = (new Date).getTime(), s = (e - this.startTime) / 1e3; this.log("", `🔔${this.name}, 结束! 🕛 ${s} 秒`), this.log(), (this.isSurge() || this.isQuanX() || this.isLoon()) && $done(t) } }(t, e) }

    //#endregion
