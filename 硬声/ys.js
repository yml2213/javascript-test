/**
 * 硬声 
 * cron 10 8,12,17,23 * * *  yml2213_javascript_master/yingyin.js
 * 
 * 硬声   入口：抖音点击"我"- "抖音商城" - "果园"   有的号可能没有 ，暂时不知道原因
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
 * 必填变量：export yingyinCookies='账号1 ck @ 账号2 ck'  多个账号用 @分割 
 * 可选变量：export yingyinUA='你的UA'
 * 
 * 抓 minigame.zijieapi.com  的包  浇一次水即可获取ck  
 * 
 * 还是不会的请百度或者群里求助：QQ群：1001401060  tg：https://t.me/yml_tg  通知：https://t.me/yml2213_tg
 */
const jsname = "硬声";
const $ = Env(jsname);
const notify = $.isNode() ? require('./sendNotify') : '';
const Notify = 1; //0为关闭通知，1为打开通知,默认为1
const debug = 1; //0为关闭调试，1为打开调试,默认为0


let yingyinCookies = ($.isNode() ? process.env.yingyinCookies : $.getdata('yingyinCookies')) || "";
let UA = ($.isNode() ? process.env.yingyinUA : $.getdata('yingyinUA')) || 'User-Agent: Mozilla/5.0 (iPhone; CPU iPhone OS 12_4_1 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Mobile/15E148';
// let AZ = ($.isNode() ? process.env.yingyin_AZ : $.getdata('yingyinAZ')) || '';
let AZ = '24ddf227f382f68654f06d0e01704049d06fe76f0ad9b8ffcd36883dd0b4ca73'


let yingyinCookiesArr = [];
let msg = '';
let ts = Math.round(new Date().getTime() / 1000).toString();
let params = `Authorization=${AZ}&date=&platform=h5&timestamp=${ts}`
let sign = sha1(`lw0270iBJzxXdJLRtePEENsauRzkHSqm${sha1(params)}${AZ}`)
// console.log(sign);


!(async () => {

	if (!(await Envs()))  //多账号分割 判断变量是否为空  初步处理多账号
		return;
	else {

		console.log(`本地脚本3-20-2 , 远程脚本xxxx(等我会写了加上，哈哈哈哈，自己根据本地判断吧！)`);

		console.log(
			`\n\n=========================================    脚本执行 - 北京时间(UTC+8)：${new Date(
				new Date().getTime() +
				new Date().getTimezoneOffset() * 60 * 1000 +
				8 * 60 * 60 * 1000
			).toLocaleString()} =========================================\n`);


		await wyy();
		await $.wait(2 * 1000);


		console.log(`\n=================== 共找到 ${yingyinCookiesArr.length} 个账号 ===================`)

		if (debug) {
			console.log(`【debug】 这是你的账号数组:\n ${yingyinCookiesArr}`);
		}

		if (debug) {
			console.log(`\n 【debug】 这是你的UA数据:\n ${UA}\n`);
		}

		for (let index = 0; index < yingyinCookiesArr.length; index++) {


			let num = index + 1
			console.log(`\n========= 开始【第 ${num} 个账号】=========\n`)
			// msg += `\n 【第 ${num} 个账号】`
			let ck = yingyinCookiesArr[index]

			if (debug) {
				console.log(`\n 【debug】 这是你第 ${num} 账号信息:\n ck:${ck}\n`);
			}
			// console.log('开始 签到');
			// await signin();
			// await $.wait(2 * 1000);

			console.log('开始 【获取直播列表');
			await live_list();
			await $.wait(2 * 1000);


			// console.log('开始 【戳鸭子】');
			// await touch_Duck(ck);
			// await $.wait(2 * 1000);


			// console.log('开始 【浇水】');
			// await watering(ck);
			// await $.wait(2 * 1000);

			await SendMsg(msg);
		}
	}

})()
	.catch((e) => $.logErr(e))
	.finally(() => $.done())

//#region 固定代码
// ============================================变量检查============================================ \\
async function Envs() {
	if (yingyinCookies) {
		if (yingyinCookies.indexOf("@") != -1) {
			yingyinCookies.split("@").forEach((item) => {
				yingyinCookiesArr.push(item);
			});
		} else {
			yingyinCookiesArr.push(yingyinCookies);
		}
	} else {
		console.log(`\n 【${$.name}】：未填写变量 yingyinCookies`)
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
 * https://yingsheng.elecfans.com/webapi/wapi/activity/signin/signin 
 */
function signin(timeout = 3 * 1000) {
	return new Promise((resolve) => {
		let url = {
			url: 'https://yingsheng.elecfans.com/webapi/wapi/activity/signin/signin',
			headers: {

				"Origin": "https://yingsheng.elecfans.com",
				"Content-Type": "application/json;charset=utf-8",
				"Authorization": AZ,
				"platform": "h5",
				"Connection": "keep-alive",
				"Host": "yingsheng.elecfans.com",
				"User-Agent": "appAndroid_appIos_iphone_ipad_ios",
				"Referer": "https://yingsheng.elecfans.com/task?statusH=47&time=1648609702292&token=566e7559a26bc0879cfa215b2ac51c4c3dc067dc4a9dca8b9733f64f2988e309",
				"sign": sign,
				"timestamp": ts,
			},
			body: '{"date":""}',
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
				if (result.code == 0) {

					console.log(`\n 签到:${result.message}, 获得硬币 ${result.data.coins} 枚 \n`);


				} else if (result.code == 5000) {

					console.log(`\n 签到:${result.message}\n`);


				} else if (result.code === 1001) {

					console.log(`\n 签到:${result.message} \n `)

				} else {

					console.log(`\n 签到: 失败 ❌ 了呢,原因未知！\n `)

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
 * 关注
 * https://ysapi.elecfans.com/api/member/follow 
 */
function signin(timeout = 3 * 1000) {
	return new Promise((resolve) => {
		let url = {
			url: 'https://ysapi.elecfans.com/api/member/follow',
			headers: {

				"Host": "ysapi.elecfans.com",
				// "Cookie": "acw_tc=7250bb1716486363966277220e39707b2dad440ba2e7c4b6133ddbbd6a",
				"lang": "zh",
				// "user-agent": "HQHardVoice/2.3.1 (iPhone; iOS 15.4; Scale/3.00)",
				"appplatform": "ios_phone",
				"callid": "1648634499120",
				"country": "CN",
				"sysversion": "15.4",
				"version": "2.3.1",
				"sign": sign,
				"platform": "ios",
				"timestamp": ts,
				"authorization": AZ,
				"cv": "2.3.1",
				"accept-language": "zh-Hans-CN;q=1, en-CN;q=0.9",
				"timezone": "Asia/Shanghai",
				"model": "iPhone14,2",
				"accept": "application/json",
				"content-type": "application/x-www-form-urlencoded",

			},
			body: `type=1&user_id=u${ser_id}`,
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
				if (result.code == 0) {

					console.log(`\n 签到:${result.message}, 获得硬币 ${result.data.coins} 枚 \n`);


				} else if (result.code == 5000) {

					console.log(`\n 签到:${result.message}\n`);


				} else if (result.code === 1001) {

					console.log(`\n 签到:${result.message} \n `)

				} else {

					console.log(`\n 签到: 失败 ❌ 了呢,原因未知！\n `)

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
 * 获取直播列表-取用户id
 * https://ysapi.elecfans.com/api/live/list?limit=14&page=1
 */
function live_list(timeout = 3 * 1000) {
	return new Promise((resolve) => {
		num = randomInt(1, 10)
		// console.log(num);
		console.log(AZ);
		// let AZ = '24ddf227f382f68654f06d0e01704049d06fe76f0ad9b8ffcd36883dd0b4ca73'
		let params_live = `Authorization=${AZ}&limit=10&page=1&platform=android&timestamp=${ts}cnry8k3o4WdCGU1Tq09cRVOPCnfJzt7p`
		console.log(params_live);
		let sign_live = sha1(`cnry8k3o4WdCGU1Tq09cRVOPCnfJzt7p${sha1(params_live)}${AZ}`)

		let url = {
			url: `https://ysapi.elecfans.com/api/live/list?limit=10&page=1`,
			headers: {

				"Host": "ysapi.elecfans.com",
				"lang": "zh",
				// "User-Agent": "HQHardVoice/2.3.1 (iPhone; iOS 15.4; Scale/3.00)",
				"appplatform": "ios_phone",
				"callid": "1648634499120",
				"country": "CN",
				// "Cookie": "acw_tc=7250bb1916486506048825983e0f1e0a96e471e14b12d57a463c9cef16",
				"sysVersion": "15.4",
				"version": "2.3.1",
				"sign": sign_live,
				"platform": "ios",
				"timestamp": ts,
				"Authorization": AZ,
				"cv": "2.3.1",
				"Accept-Language": "zh-Hans-CN;q=1, en-CN;q=0.9",
				"timezone": "Asia/Shanghai",
				"model": "iPhone14,2",
				"Accept": "application/json",
				"Content-Type": "application/x-www-form-urlencoded"

			},
			// body: `type=1&user_id=u${ser_id}`,
		}

		if (debug) {
			console.log(`\n 【debug】=============== 这是 获取直播列表 请求 url ===============`);
			console.log(url);
		}
		$.get(url, async (error, response, data) => {
			try {
				if (debug) {
					console.log(`\n\n 【debug】===============这是 获取直播列表 返回data==============`);
					console.log(data)
					console.log(`======`)
					console.log(JSON.parse(data))
				}
				let result = JSON.parse(data);
				if (result.code == 0) {
					user_id = result.data[num].user_id
					console.log(user_id);

				} else if (result.code === 1001) { //签名错误

					console.log(`\n 签到:${result.message} \n `)

				} else {

					console.log(`\n 签到: 失败 ❌ 了呢,原因未知！\n `)

				}

			} catch (e) {
				console.log(e)
			} finally {
				resolve();
			}
		}, timeout)
	})
}














// ==============sha1加密==============
function encodeUTF8(s) {
	var i, r = [], c, x;
	for (i = 0; i < s.length; i++)
		if ((c = s.charCodeAt(i)) < 0x80) r.push(c);
		else if (c < 0x800) r.push(0xC0 + (c >> 6 & 0x1F), 0x80 + (c & 0x3F));
		else {
			if ((x = c ^ 0xD800) >> 10 == 0) //对四字节UTF-16转换为Unicode
				c = (x << 10) + (s.charCodeAt(++i) ^ 0xDC00) + 0x10000,
					r.push(0xF0 + (c >> 18 & 0x7), 0x80 + (c >> 12 & 0x3F));
			else r.push(0xE0 + (c >> 12 & 0xF));
			r.push(0x80 + (c >> 6 & 0x3F), 0x80 + (c & 0x3F));
		};
	return r;
}
function sha1(s) {
	var data = new Uint8Array(encodeUTF8(s))
	var i, j, t;
	var l = ((data.length + 8) >>> 6 << 4) + 16, s = new Uint8Array(l << 2);
	s.set(new Uint8Array(data.buffer)), s = new Uint32Array(s.buffer);
	for (t = new DataView(s.buffer), i = 0; i < l; i++)s[i] = t.getUint32(i << 2);
	s[data.length >> 2] |= 0x80 << (24 - (data.length & 3) * 8);
	s[l - 1] = data.length << 3;
	var w = [], f = [
		function () { return m[1] & m[2] | ~m[1] & m[3]; },
		function () { return m[1] ^ m[2] ^ m[3]; },
		function () { return m[1] & m[2] | m[1] & m[3] | m[2] & m[3]; },
		function () { return m[1] ^ m[2] ^ m[3]; }
	], rol = function (n, c) { return n << c | n >>> (32 - c); },
		k = [1518500249, 1859775393, -1894007588, -899497514],
		m = [1732584193, -271733879, null, null, -1009589776];
	m[2] = ~m[0], m[3] = ~m[1];
	for (i = 0; i < s.length; i += 16) {
		var o = m.slice(0);
		for (j = 0; j < 80; j++)
			w[j] = j < 16 ? s[i + j] : rol(w[j - 3] ^ w[j - 8] ^ w[j - 14] ^ w[j - 16], 1),
				t = rol(m[0], 5) + f[j / 20 | 0]() + m[4] + w[j] + k[j / 20 | 0] | 0,
				m[1] = rol(m[1], 30), m.pop(), m.unshift(t);
		for (j = 0; j < 5; j++)m[j] = m[j] + o[j] | 0;
	};
	t = new DataView(new Uint32Array(m).buffer);
	for (var i = 0; i < 5; i++)m[i] = t.getUint32(i << 2);

	var hex = Array.prototype.map.call(new Uint8Array(new Uint32Array(m).buffer), function (e) {
		return (e < 16 ? "0" : "") + e.toString(16);
	}).join("");
	return hex;
}










// prettier-ignore
function Env(t, e) { "undefined" != typeof process && JSON.stringify(process.env).indexOf("GITHUB") > -1 && process.exit(0); class s { constructor(t) { this.env = t } send(t, e = "GET") { t = "string" == typeof t ? { url: t } : t; let s = this.get; return "POST" === e && (s = this.post), new Promise((e, i) => { s.call(this, t, (t, s, r) => { t ? i(t) : e(s) }) }) } get(t) { return this.send.call(this.env, t) } post(t) { return this.send.call(this.env, t, "POST") } } return new class { constructor(t, e) { this.name = t, this.http = new s(this), this.data = null, this.dataFile = "box.dat", this.logs = [], this.isMute = !1, this.isNeedRewrite = !1, this.logSeparator = "\n", this.startTime = (new Date).getTime(), Object.assign(this, e), this.log("", `🔔${this.name}, 开始!`) } isNode() { return "undefined" != typeof module && !!module.exports } isQuanX() { return "undefined" != typeof $task } isSurge() { return "undefined" != typeof $httpClient && "undefined" == typeof $loon } isLoon() { return "undefined" != typeof $loon } toObj(t, e = null) { try { return JSON.parse(t) } catch { return e } } toStr(t, e = null) { try { return JSON.stringify(t) } catch { return e } } getjson(t, e) { let s = e; const i = this.getdata(t); if (i) try { s = JSON.parse(this.getdata(t)) } catch { } return s } setjson(t, e) { try { return this.setdata(JSON.stringify(t), e) } catch { return !1 } } getScript(t) { return new Promise(e => { this.get({ url: t }, (t, s, i) => e(i)) }) } runScript(t, e) { return new Promise(s => { let i = this.getdata("@chavy_boxjs_userCfgs.httpapi"); i = i ? i.replace(/\n/g, "").trim() : i; let r = this.getdata("@chavy_boxjs_userCfgs.httpapi_timeout"); r = r ? 1 * r : 20, r = e && e.timeout ? e.timeout : r; const [o, h] = i.split("@"), n = { url: `http://${h}/v1/scripting/evaluate`, body: { script_text: t, mock_type: "cron", timeout: r }, headers: { "X-Key": o, Accept: "*/*" } }; this.post(n, (t, e, i) => s(i)) }).catch(t => this.logErr(t)) } loaddata() { if (!this.isNode()) return {}; { this.fs = this.fs ? this.fs : require("fs"), this.path = this.path ? this.path : require("path"); const t = this.path.resolve(this.dataFile), e = this.path.resolve(process.cwd(), this.dataFile), s = this.fs.existsSync(t), i = !s && this.fs.existsSync(e); if (!s && !i) return {}; { const i = s ? t : e; try { return JSON.parse(this.fs.readFileSync(i)) } catch (t) { return {} } } } } writedata() { if (this.isNode()) { this.fs = this.fs ? this.fs : require("fs"), this.path = this.path ? this.path : require("path"); const t = this.path.resolve(this.dataFile), e = this.path.resolve(process.cwd(), this.dataFile), s = this.fs.existsSync(t), i = !s && this.fs.existsSync(e), r = JSON.stringify(this.data); s ? this.fs.writeFileSync(t, r) : i ? this.fs.writeFileSync(e, r) : this.fs.writeFileSync(t, r) } } lodash_get(t, e, s) { const i = e.replace(/\[(\d+)\]/g, ".$1").split("."); let r = t; for (const t of i) if (r = Object(r)[t], void 0 === r) return s; return r } lodash_set(t, e, s) { return Object(t) !== t ? t : (Array.isArray(e) || (e = e.toString().match(/[^.[\]]+/g) || []), e.slice(0, -1).reduce((t, s, i) => Object(t[s]) === t[s] ? t[s] : t[s] = Math.abs(e[i + 1]) >> 0 == +e[i + 1] ? [] : {}, t)[e[e.length - 1]] = s, t) } getdata(t) { let e = this.getval(t); if (/^@/.test(t)) { const [, s, i] = /^@(.*?)\.(.*?)$/.exec(t), r = s ? this.getval(s) : ""; if (r) try { const t = JSON.parse(r); e = t ? this.lodash_get(t, i, "") : e } catch (t) { e = "" } } return e } setdata(t, e) { let s = !1; if (/^@/.test(e)) { const [, i, r] = /^@(.*?)\.(.*?)$/.exec(e), o = this.getval(i), h = i ? "null" === o ? null : o || "{}" : "{}"; try { const e = JSON.parse(h); this.lodash_set(e, r, t), s = this.setval(JSON.stringify(e), i) } catch (e) { const o = {}; this.lodash_set(o, r, t), s = this.setval(JSON.stringify(o), i) } } else s = this.setval(t, e); return s } getval(t) { return this.isSurge() || this.isLoon() ? $persistentStore.read(t) : this.isQuanX() ? $prefs.valueForKey(t) : this.isNode() ? (this.data = this.loaddata(), this.data[t]) : this.data && this.data[t] || null } setval(t, e) { return this.isSurge() || this.isLoon() ? $persistentStore.write(t, e) : this.isQuanX() ? $prefs.setValueForKey(t, e) : this.isNode() ? (this.data = this.loaddata(), this.data[e] = t, this.writedata(), !0) : this.data && this.data[e] || null } initGotEnv(t) { this.got = this.got ? this.got : require("got"), this.cktough = this.cktough ? this.cktough : require("tough-cookie"), this.ckjar = this.ckjar ? this.ckjar : new this.cktough.CookieJar, t && (t.headers = t.headers ? t.headers : {}, void 0 === t.headers.Cookie && void 0 === t.cookieJar && (t.cookieJar = this.ckjar)) } get(t, e = (() => { })) { t.headers && (delete t.headers["Content-Type"], delete t.headers["Content-Length"]), this.isSurge() || this.isLoon() ? (this.isSurge() && this.isNeedRewrite && (t.headers = t.headers || {}, Object.assign(t.headers, { "X-Surge-Skip-Scripting": !1 })), $httpClient.get(t, (t, s, i) => { !t && s && (s.body = i, s.statusCode = s.status), e(t, s, i) })) : this.isQuanX() ? (this.isNeedRewrite && (t.opts = t.opts || {}, Object.assign(t.opts, { hints: !1 })), $task.fetch(t).then(t => { const { statusCode: s, statusCode: i, headers: r, body: o } = t; e(null, { status: s, statusCode: i, headers: r, body: o }, o) }, t => e(t))) : this.isNode() && (this.initGotEnv(t), this.got(t).on("redirect", (t, e) => { try { if (t.headers["set-cookie"]) { const s = t.headers["set-cookie"].map(this.cktough.Cookie.parse).toString(); s && this.ckjar.setCookieSync(s, null), e.cookieJar = this.ckjar } } catch (t) { this.logErr(t) } }).then(t => { const { statusCode: s, statusCode: i, headers: r, body: o } = t; e(null, { status: s, statusCode: i, headers: r, body: o }, o) }, t => { const { message: s, response: i } = t; e(s, i, i && i.body) })) } post(t, e = (() => { })) { if (t.body && t.headers && !t.headers["Content-Type"] && (t.headers["Content-Type"] = "application/x-www-form-urlencoded"), t.headers && delete t.headers["Content-Length"], this.isSurge() || this.isLoon()) this.isSurge() && this.isNeedRewrite && (t.headers = t.headers || {}, Object.assign(t.headers, { "X-Surge-Skip-Scripting": !1 })), $httpClient.post(t, (t, s, i) => { !t && s && (s.body = i, s.statusCode = s.status), e(t, s, i) }); else if (this.isQuanX()) t.method = "POST", this.isNeedRewrite && (t.opts = t.opts || {}, Object.assign(t.opts, { hints: !1 })), $task.fetch(t).then(t => { const { statusCode: s, statusCode: i, headers: r, body: o } = t; e(null, { status: s, statusCode: i, headers: r, body: o }, o) }, t => e(t)); else if (this.isNode()) { this.initGotEnv(t); const { url: s, ...i } = t; this.got.post(s, i).then(t => { const { statusCode: s, statusCode: i, headers: r, body: o } = t; e(null, { status: s, statusCode: i, headers: r, body: o }, o) }, t => { const { message: s, response: i } = t; e(s, i, i && i.body) }) } } time(t, e = null) { const s = e ? new Date(e) : new Date; let i = { "M+": s.getMonth() + 1, "d+": s.getDate(), "H+": s.getHours(), "m+": s.getMinutes(), "s+": s.getSeconds(), "q+": Math.floor((s.getMonth() + 3) / 3), S: s.getMilliseconds() }; /(y+)/.test(t) && (t = t.replace(RegExp.$1, (s.getFullYear() + "").substr(4 - RegExp.$1.length))); for (let e in i) new RegExp("(" + e + ")").test(t) && (t = t.replace(RegExp.$1, 1 == RegExp.$1.length ? i[e] : ("00" + i[e]).substr(("" + i[e]).length))); return t } msg(e = t, s = "", i = "", r) { const o = t => { if (!t) return t; if ("string" == typeof t) return this.isLoon() ? t : this.isQuanX() ? { "open-url": t } : this.isSurge() ? { url: t } : void 0; if ("object" == typeof t) { if (this.isLoon()) { let e = t.openUrl || t.url || t["open-url"], s = t.mediaUrl || t["media-url"]; return { openUrl: e, mediaUrl: s } } if (this.isQuanX()) { let e = t["open-url"] || t.url || t.openUrl, s = t["media-url"] || t.mediaUrl; return { "open-url": e, "media-url": s } } if (this.isSurge()) { let e = t.url || t.openUrl || t["open-url"]; return { url: e } } } }; if (this.isMute || (this.isSurge() || this.isLoon() ? $notification.post(e, s, i, o(r)) : this.isQuanX() && $notify(e, s, i, o(r))), !this.isMuteLog) { let t = ["", "==============📣系统通知📣=============="]; t.push(e), s && t.push(s), i && t.push(i), console.log(t.join("\n")), this.logs = this.logs.concat(t) } } log(...t) { t.length > 0 && (this.logs = [...this.logs, ...t]), console.log(t.join(this.logSeparator)) } logErr(t, e) { const s = !this.isSurge() && !this.isQuanX() && !this.isLoon(); s ? this.log("", `❗️${this.name}, 错误!`, t.stack) : this.log("", `❗️${this.name}, 错误!`, t) } wait(t) { return new Promise(e => setTimeout(e, t)) } done(t = {}) { const e = (new Date).getTime(), s = (e - this.startTime) / 1e3; this.log("", `🔔${this.name}, 结束! 🕛 ${s} 秒`), this.log(), (this.isSurge() || this.isQuanX() || this.isLoon()) && $done(t) } }(t, e) }