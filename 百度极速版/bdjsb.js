/**
 * 百度极速版 
 * cron 10 8,12,17,23 * * *  yml2213_javascript_master/bdjsb.js
 * 
 * 百度极速版   入口：抖音点击"我"- "抖音商城" - "果园"   有的号可能没有 ，暂时不知道原因
 * 3-29    签到任务、新手彩蛋、每日免费领水滴、三餐礼包、宝箱、盒子领取  初步完成   脚本刚写完，难免有bug，请及时反馈  ；ck有效期测试中 
 * 3-29-2  更改签到逻辑 ， 修复每天免费水滴bug
 * 3-30    修改整体逻辑，简化通知
 * 3-30-2  修复时间判断bug,增加脚本版本号（一半功能）
 * 
 * 抓包记得先打开果园，然后再打开抓包软件，就能正常抓包了   关于抖音的任务都没网络，抓不到包
 * 
 * 感谢所有测试人员
 * ========= 青龙 =========
 * 变量格式：  
 * 必填变量：export bdjsb_data='账号1 ck @ 账号2 ck'  多个账号用 @分割 
 * 可选变量：export bdjsbUA='你的UA'
 * 
 * 抓 minigame.zijieapi.com  的包  浇一次水即可获取ck  
 * 
 * 还是不会的请百度或者群里求助：QQ群：1101401060  tg：https://t.me/yml_tg  通知：https://t.me/yml2213_tg
 */
const jsname = "百度极速版";
const $ = Env(jsname);
const notify = $.isNode() ? require('./sendNotify') : '';
const Notify = 1; //0为关闭通知，1为打开通知,默认为1
const debug = 1; //0为关闭调试，1为打开调试,默认为0
//////////////////////

let bdjsb_data = process.env.bdjsb_data;
let bdjsb_dataArr = [];
let msg = '';

// let user_id = '';
// let audio_id = '';
// let data = '';
// let AZ = '';
// let ts = Math.round(new Date().getTime() / 1000).toString();



!(async () => {

	if (!(await Envs()))  //多账号分割 判断变量是否为空  初步处理多账号
		return;
	else {

		console.log(`本地脚本4-6`);

		console.log(`\n\n=========================================    脚本执行 - 北京时间(UTC+8)：${new Date(
			new Date().getTime() + new Date().getTimezoneOffset() * 60 * 1000 +
			8 * 60 * 60 * 1000).toLocaleString()} =========================================\n`);

		await wyy();

		console.log(`\n=================== 共找到 ${bdjsb_dataArr.length} 个账号 ===================`)

		if (1) {
			console.log(`【debug】 这是你的全部账号数组:\n ${bdjsb_dataArr}`);
		}


		for (let index = 0; index < bdjsb_dataArr.length; index++) {


			let num = index + 1
			console.log(`\n========= 开始【第 ${num} 个账号】=========\n`)

			// ck = bdjsb_dataArr[index];
			// console.log(ck);

			data = bdjsb_dataArr[index].split('#');

			if (debug) {
				console.log(`\n 【debug】 这是你第 ${num} 账号信息:\n ${data}\n`);
			}




			console.log('开始 签到');
			await signin();
			await $.wait(2 * 1000);

			console.log('开始 开宝箱');
			await open_box();
			await $.wait(2 * 1000);

			
			console.log('领取 吃饭补贴');
			await eat(3, '关注');
			await $.wait(2 * 1000);

		

			console.log('开始 领金币');
			await coin();
			await $.wait(2 * 1000);

			


			await SendMsg(msg);
		}
	}

})()
	.catch((e) => $.logErr(e))
	.finally(() => $.done())

//#region 固定代码
// ============================================变量检查============================================ \\
async function Envs() {
	if (bdjsb_data) {
		if (bdjsb_data.indexOf("@") != -1) {
			bdjsb_data.split("@").forEach((item) => {
				bdjsb_dataArr.push(item);
			});
		} else {
			bdjsb_dataArr.push(bdjsb_data);
		}
	} else {
		console.log(`\n 【${$.name}】：未填写变量 bdjsb_data`)
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

//#endregion






/**
 * 签到
 * https://activity.baidu.com/incentive/signin
 */
function signin(timeout = 3 * 1000) {

	return new Promise((resolve) => {
		let url = {
			url: 'https://activity.baidu.com/incentive/signin',
			headers: {
				// "User-Agent": "Mozilla/5.0 (iPhone; CPU iPhone OS 15_4 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Mobile/15E148 SP-engine/2.44.0 immerse%2F1.0 baiduboxapp/13.6.0.10 (Baidu; P2 15.4)",
				"Cookie": data[0],
			},
			body: data[1],
		}

		if (debug) {
			console.log(`\n 【debug】=============== 这是 签到 请求 url ===============`);
			console.log(url);
		}
		$.post(url, async (error, response, data) => {
			try {
				if (debug) {
					console.log(`\n\n 【debug】===============这是 签到 返回data==============`);
					console.log(data)
					console.log(`======`)
					console.log(JSON.parse(data))
				}
				let result = JSON.parse(data);
				if (result.errno == 0) {

					console.log(`\n 签到: 成功了🎉\n您已连续签到 ${result.data.adys} 天, 签到获得金币 ${result.data.reward} 枚\n现有现金 ${result.money} 元 , 金币 ${result.coin} 枚\n `);

					msg += `\n 签到: 成功了🎉\n您已连续签到 ${result.data.adys} 天, 签到获得金币 ${result.data.reward} 枚\n现有现金 ${result.money} 元 , 金币 ${result.coin} 枚\n `


				} else if (result.errno == 2005) {

					console.log(`\n 签到:${result.errmsg}\n`);


				} else {

					console.log(`\n 签到:  失败 ❌ 了呢,原因未知！\n result \n `)

				}

			} catch (e) {
				console.log(e)
			} finally {
				resolve();
			}
		}, timeout)
	})
}


/**
 * 开宝箱
 * https://activity.baidu.com/incentive/box/add
 */
 function open_box(timeout = 3 * 1000) {

	return new Promise((resolve) => {
		let url = {
			url: 'https://activity.baidu.com/incentive/box/add',
			headers: {
				"Cookie": data[0],
			},
			body: data[2],
		}

		if (debug) {
			console.log(`\n 【debug】=============== 这是 开宝箱 请求 url ===============`);
			console.log(url);
		}
		$.post(url, async (error, response, data) => {
			try {
				if (debug) {
					console.log(`\n\n 【debug】===============这是 开宝箱 返回data==============`);
					console.log(data)
					console.log(`======`)
					console.log(JSON.parse(data))
				}
				let result = JSON.parse(data);
				if (result.data.openType == 1) {

					console.log(`\n 开宝箱: 成功了🎉\n恭喜你获得金币 ${result.data.rewardNum} 枚\n现有共有金币 ${result.coin} 枚\n `);

					msg += `\n 开宝箱: 成功了🎉\n恭喜你获得金币 ${result.data.rewardNum} 枚\n现有共有金币 ${result.coin} 枚\n `


				} else if (result.data.openType == 0) {

					console.log(`\n 开宝箱: 可能是已经开过了,自己去app看看吧! \n`);


				} else {

					console.log(`\n 开宝箱:  失败 ❌ 了呢,原因未知！\n ${result} \n `)

				}

			} catch (e) {
				console.log(e)
			} finally {
				resolve();
			}
		}, timeout)
	})
}



/**
 * 吃饭补贴
 * https://activity.baidu.com/incentive/eat/add?productid=2&position=eatList&type=1&zid=n2lYTmmGfgOrZQa0_bu1KekOF0QM8t7wOCCBsYLwfHPHYVUhyxHc1ZFZUrRzycIk_uINFxNvbNPg2CR-XxHjnqw&callback=jsonpCB_1649202830229_233
 */
 function eat(timeout = 3 * 1000) {

	return new Promise((resolve) => {
		let url = {
			url: `https://activity.baidu.com/incentive/eat/add${data[3]}`,
			headers: {
				"Cookie": data[0],
			},
			// body: data[2],
		}

		if (debug) {
			console.log(`\n 【debug】=============== 这是 吃饭补贴 请求 url ===============`);
			console.log(url);
		}
		$.get(url, async (error, response, data) => {
			try {
				if (debug) {
					console.log(`\n\n 【debug】===============这是 吃饭补贴 返回data==============`);
					console.log(data)
					console.log(`======`)
					console.log(JSON.parse(data))
				}
				let result = JSON.parse(data);
				if (result.errno == 0) {

					console.log(`\n 吃饭补贴: 成功了🎉\n恭喜你获得金币 ${result.data.coins} 枚\n`);

					msg += `\n 吃饭补贴: 成功了🎉\n恭喜你获得金币 ${result.data.coins} 枚\n`


				} else if (result.data.openType == 0) {

					console.log(`\n 吃饭补贴: \n`);


				} else {

					console.log(`\n 吃饭补贴:  失败 ❌ 了呢,原因未知！\n ${result} \n `)

				}

			} catch (e) {
				console.log(e)
			} finally {
				resolve();
			}
		}, timeout)
	})
}




/**
 * 领金币
 * https://activity.baidu.com/incentive/pigBank/addBubble
 */
 function coin(timeout = 3 * 1000) {

	return new Promise((resolve) => {
		let url = {
			url: `https://activity.baidu.com/incentive/pigBank/addBubble`,
			headers: {
				"Cookie": data[0],
			},
			body: data[4],
		}

		if (debug) {
			console.log(`\n 【debug】=============== 这是 领金币 请求 url ===============`);
			console.log(url);
		}
		$.get(url, async (error, response, data) => {
			try {
				if (debug) {
					console.log(`\n\n 【debug】===============这是 领金币 返回data==============`);
					console.log(data)
					console.log(`======`)
					console.log(JSON.parse(data))
				}
				let result = JSON.parse(data);
				if (result.errno == 0) {

					console.log(`\n 领金币: 成功了🎉\n恭喜你获得金币 ${result.data.coins} 枚\n`);

					msg += `\n 领金币: 成功了🎉\n恭喜你获得金币 ${result.data.coins} 枚\n`


				} else if (result.errno == 2900) {

					console.log(`\n 领金币: ${result.errmsg} \n`);


				} else {

					console.log(`\n 领金币:  失败 ❌ 了呢,原因未知！\n ${result} \n `)

				}

			} catch (e) {
				console.log(e)
			} finally {
				resolve();
			}
		}, timeout)
	})
}








// prettier-ignore
function Env(t, e) { "undefined" != typeof process && JSON.stringify(process.env).indexOf("GITHUB") > -1 && process.exit(0); class s { constructor(t) { this.env = t } send(t, e = "GET") { t = "string" == typeof t ? { url: t } : t; let s = this.get; return "POST" === e && (s = this.post), new Promise((e, i) => { s.call(this, t, (t, s, r) => { t ? i(t) : e(s) }) }) } get(t) { return this.send.call(this.env, t) } post(t) { return this.send.call(this.env, t, "POST") } } return new class { constructor(t, e) { this.name = t, this.http = new s(this), this.data = null, this.dataFile = "box.dat", this.logs = [], this.isMute = !1, this.isNeedRewrite = !1, this.logSeparator = "\n", this.startTime = (new Date).getTime(), Object.assign(this, e), this.log("", `🔔${this.name}, 开始!`) } isNode() { return "undefined" != typeof module && !!module.exports } isQuanX() { return "undefined" != typeof $task } isSurge() { return "undefined" != typeof $httpClient && "undefined" == typeof $loon } isLoon() { return "undefined" != typeof $loon } toObj(t, e = null) { try { return JSON.parse(t) } catch { return e } } toStr(t, e = null) { try { return JSON.stringify(t) } catch { return e } } getjson(t, e) { let s = e; const i = this.getdata(t); if (i) try { s = JSON.parse(this.getdata(t)) } catch { } return s } setjson(t, e) { try { return this.setdata(JSON.stringify(t), e) } catch { return !1 } } getScript(t) { return new Promise(e => { this.get({ url: t }, (t, s, i) => e(i)) }) } runScript(t, e) { return new Promise(s => { let i = this.getdata("@chavy_boxjs_userCfgs.httpapi"); i = i ? i.replace(/\n/g, "").trim() : i; let r = this.getdata("@chavy_boxjs_userCfgs.httpapi_timeout"); r = r ? 1 * r : 20, r = e && e.timeout ? e.timeout : r; const [o, h] = i.split("@"), n = { url: `http://${h}/v1/scripting/evaluate`, body: { script_text: t, mock_type: "cron", timeout: r }, headers: { "X-Key": o, Accept: "*/*" } }; this.post(n, (t, e, i) => s(i)) }).catch(t => this.logErr(t)) } loaddata() { if (!this.isNode()) return {}; { this.fs = this.fs ? this.fs : require("fs"), this.path = this.path ? this.path : require("path"); const t = this.path.resolve(this.dataFile), e = this.path.resolve(process.cwd(), this.dataFile), s = this.fs.existsSync(t), i = !s && this.fs.existsSync(e); if (!s && !i) return {}; { const i = s ? t : e; try { return JSON.parse(this.fs.readFileSync(i)) } catch (t) { return {} } } } } writedata() { if (this.isNode()) { this.fs = this.fs ? this.fs : require("fs"), this.path = this.path ? this.path : require("path"); const t = this.path.resolve(this.dataFile), e = this.path.resolve(process.cwd(), this.dataFile), s = this.fs.existsSync(t), i = !s && this.fs.existsSync(e), r = JSON.stringify(this.data); s ? this.fs.writeFileSync(t, r) : i ? this.fs.writeFileSync(e, r) : this.fs.writeFileSync(t, r) } } lodash_get(t, e, s) { const i = e.replace(/\[(\d+)\]/g, ".$1").split("."); let r = t; for (const t of i) if (r = Object(r)[t], void 0 === r) return s; return r } lodash_set(t, e, s) { return Object(t) !== t ? t : (Array.isArray(e) || (e = e.toString().match(/[^.[\]]+/g) || []), e.slice(0, -1).reduce((t, s, i) => Object(t[s]) === t[s] ? t[s] : t[s] = Math.abs(e[i + 1]) >> 0 == +e[i + 1] ? [] : {}, t)[e[e.length - 1]] = s, t) } getdata(t) { let e = this.getval(t); if (/^@/.test(t)) { const [, s, i] = /^@(.*?)\.(.*?)$/.exec(t), r = s ? this.getval(s) : ""; if (r) try { const t = JSON.parse(r); e = t ? this.lodash_get(t, i, "") : e } catch (t) { e = "" } } return e } setdata(t, e) { let s = !1; if (/^@/.test(e)) { const [, i, r] = /^@(.*?)\.(.*?)$/.exec(e), o = this.getval(i), h = i ? "null" === o ? null : o || "{}" : "{}"; try { const e = JSON.parse(h); this.lodash_set(e, r, t), s = this.setval(JSON.stringify(e), i) } catch (e) { const o = {}; this.lodash_set(o, r, t), s = this.setval(JSON.stringify(o), i) } } else s = this.setval(t, e); return s } getval(t) { return this.isSurge() || this.isLoon() ? $persistentStore.read(t) : this.isQuanX() ? $prefs.valueForKey(t) : this.isNode() ? (this.data = this.loaddata(), this.data[t]) : this.data && this.data[t] || null } setval(t, e) { return this.isSurge() || this.isLoon() ? $persistentStore.write(t, e) : this.isQuanX() ? $prefs.setValueForKey(t, e) : this.isNode() ? (this.data = this.loaddata(), this.data[e] = t, this.writedata(), !0) : this.data && this.data[e] || null } initGotEnv(t) { this.got = this.got ? this.got : require("got"), this.cktough = this.cktough ? this.cktough : require("tough-cookie"), this.ckjar = this.ckjar ? this.ckjar : new this.cktough.CookieJar, t && (t.headers = t.headers ? t.headers : {}, void 0 === t.headers.Cookie && void 0 === t.cookieJar && (t.cookieJar = this.ckjar)) } get(t, e = (() => { })) { t.headers && (delete t.headers["Content-Type"], delete t.headers["Content-Length"]), this.isSurge() || this.isLoon() ? (this.isSurge() && this.isNeedRewrite && (t.headers = t.headers || {}, Object.assign(t.headers, { "X-Surge-Skip-Scripting": !1 })), $httpClient.get(t, (t, s, i) => { !t && s && (s.body = i, s.statusCode = s.status), e(t, s, i) })) : this.isQuanX() ? (this.isNeedRewrite && (t.opts = t.opts || {}, Object.assign(t.opts, { hints: !1 })), $task.fetch(t).then(t => { const { statusCode: s, statusCode: i, headers: r, body: o } = t; e(null, { status: s, statusCode: i, headers: r, body: o }, o) }, t => e(t))) : this.isNode() && (this.initGotEnv(t), this.got(t).on("redirect", (t, e) => { try { if (t.headers["set-cookie"]) { const s = t.headers["set-cookie"].map(this.cktough.Cookie.parse).toString(); s && this.ckjar.setCookieSync(s, null), e.cookieJar = this.ckjar } } catch (t) { this.logErr(t) } }).then(t => { const { statusCode: s, statusCode: i, headers: r, body: o } = t; e(null, { status: s, statusCode: i, headers: r, body: o }, o) }, t => { const { message: s, response: i } = t; e(s, i, i && i.body) })) } post(t, e = (() => { })) { if (t.body && t.headers && !t.headers["Content-Type"] && (t.headers["Content-Type"] = "application/x-www-form-urlencoded"), t.headers && delete t.headers["Content-Length"], this.isSurge() || this.isLoon()) this.isSurge() && this.isNeedRewrite && (t.headers = t.headers || {}, Object.assign(t.headers, { "X-Surge-Skip-Scripting": !1 })), $httpClient.post(t, (t, s, i) => { !t && s && (s.body = i, s.statusCode = s.status), e(t, s, i) }); else if (this.isQuanX()) t.method = "POST", this.isNeedRewrite && (t.opts = t.opts || {}, Object.assign(t.opts, { hints: !1 })), $task.fetch(t).then(t => { const { statusCode: s, statusCode: i, headers: r, body: o } = t; e(null, { status: s, statusCode: i, headers: r, body: o }, o) }, t => e(t)); else if (this.isNode()) { this.initGotEnv(t); const { url: s, ...i } = t; this.got.post(s, i).then(t => { const { statusCode: s, statusCode: i, headers: r, body: o } = t; e(null, { status: s, statusCode: i, headers: r, body: o }, o) }, t => { const { message: s, response: i } = t; e(s, i, i && i.body) }) } } time(t, e = null) { const s = e ? new Date(e) : new Date; let i = { "M+": s.getMonth() + 1, "d+": s.getDate(), "H+": s.getHours(), "m+": s.getMinutes(), "s+": s.getSeconds(), "q+": Math.floor((s.getMonth() + 3) / 3), S: s.getMilliseconds() }; /(y+)/.test(t) && (t = t.replace(RegExp.$1, (s.getFullYear() + "").substr(4 - RegExp.$1.length))); for (let e in i) new RegExp("(" + e + ")").test(t) && (t = t.replace(RegExp.$1, 1 == RegExp.$1.length ? i[e] : ("00" + i[e]).substr(("" + i[e]).length))); return t } msg(e = t, s = "", i = "", r) { const o = t => { if (!t) return t; if ("string" == typeof t) return this.isLoon() ? t : this.isQuanX() ? { "open-url": t } : this.isSurge() ? { url: t } : void 0; if ("object" == typeof t) { if (this.isLoon()) { let e = t.openUrl || t.url || t["open-url"], s = t.mediaUrl || t["media-url"]; return { openUrl: e, mediaUrl: s } } if (this.isQuanX()) { let e = t["open-url"] || t.url || t.openUrl, s = t["media-url"] || t.mediaUrl; return { "open-url": e, "media-url": s } } if (this.isSurge()) { let e = t.url || t.openUrl || t["open-url"]; return { url: e } } } }; if (this.isMute || (this.isSurge() || this.isLoon() ? $notification.post(e, s, i, o(r)) : this.isQuanX() && $notify(e, s, i, o(r))), !this.isMuteLog) { let t = ["", "==============📣系统通知📣=============="]; t.push(e), s && t.push(s), i && t.push(i), console.log(t.join("\n")), this.logs = this.logs.concat(t) } } log(...t) { t.length > 0 && (this.logs = [...this.logs, ...t]), console.log(t.join(this.logSeparator)) } logErr(t, e) { const s = !this.isSurge() && !this.isQuanX() && !this.isLoon(); s ? this.log("", `❗️${this.name}, 错误!`, t.stack) : this.log("", `❗️${this.name}, 错误!`, t) } wait(t) { return new Promise(e => setTimeout(e, t)) } done(t = {}) { const e = (new Date).getTime(), s = (e - this.startTime) / 1e3; this.log("", `🔔${this.name}, 结束! 🕛 ${s} 秒`), this.log(), (this.isSurge() || this.isQuanX() || this.isLoon()) && $done(t) } }(t, e) }