/**
 * 夜贝网 
 * cron 0 * * * *  yml2213_javascript_master/ybw.js
 * 
 * 夜贝网 app  
 * 4-19  完成  任务    签到有空写 有bug及时反馈
 * 4-20  增加签到  查询积分  通知功能
 * 
 * 
 * 据说: 目前系统限制每小时能做25个任务，每天能做120个任务，根据实际情况后续后做出调整 ,AZ有效期可能是一天 还在测试
 * 暂时定时 一小时一次
 * 
 * 感谢群友提供
 * 感谢所有测试人员
 * ========= 青龙--配置文件 =========
 * 变量格式: export ybw_data='Authorization'   不推荐多账号
 * 多账号没用,限制 ip 不同手机可以开流量多账号
 * 
 * 抓包： 随便抓个有token的包就行了
 * 
 * 还是不会的请百度或者群里求助: QQ群: 884234287  tg: https://t.me/yml_tg  通知: https://t.me/yml2213_tg
 */

const $ = new Env("夜贝网");
const notify = $.isNode() ? require('./sendNotify') : '';
const Notify = 1; //0为关闭通知，1为打开通知,默认为1
const debug = 0; //0为关闭调试，1为打开调试,默认为0
//////////////////////
let ybw_dataArr = [];
let ybw_data = process.env.ybw_data;
let msg = '';


!(async () => {

	if (!(await Envs()))  //多账号分割 判断变量是否为空  初步处理多账号
		return;
	else {

		console.log(`\n本地脚本4-19`);

		//  console.log(`\n 脚本已恢复正常状态,请及时更新! `);
		console.log(`\n 脚本测试中,有bug及时反馈! \n`);
		console.log(`\n 脚本测试中,有bug及时反馈! \n`);
		console.log(`\n 脚本测试中,有bug及时反馈! \n`);

		console.log(`\n================================================\n脚本执行 - 北京时间(UTC+8): ${new Date(
			new Date().getTime() + new Date().getTimezoneOffset() * 60 * 1000 + 8 * 60 * 60 * 1000).toLocaleString()} \n================================================\n`);

		await wyy();


		console.log(`\n=================== 共找到 ${ybw_dataArr.length} 个账号 ===================`)
		if (debug) {
			console.log(`【debug】 这是你的账号数组:\n ${ybw_dataArr}`);
		}


		for (let index = 0; index < ybw_dataArr.length; index++) {


			let num = index + 1
			console.log(`\n========= 开始【第 ${num} 个账号】=========\n`)

			data = ybw_dataArr[index].split('&');
			if (debug) {
				console.log(`\n 【debug】 这是你第 ${num} 账号信息:\n ${data}\n`);
			}

			console.log('开始 获取任务列表');
			await task_list();
			await $.wait(2 * 1000);

			console.log('开始 查询余额');
			await user_info();
			await $.wait(2 * 1000);

			let myDate = new Date();
			h = myDate.getHours();
			// console.log(h);
			if (h == 8) {
				console.log('开始 签到');
				await signIn();
				await $.wait(2 * 1000);
			}



			await SendMsg(msg);


		}


	}

})()
	.catch((e) => $.logErr(e))
	.finally(() => $.done())



/**
 * 任务列表  task_list     get
 * http://back.h5.yebeiwang.com/apis/task/all
 */
function task_list(timeout = 3 * 1000) {
	let num = randomInt(5, 15)

	return new Promise((resolve) => {
		let url = {
			url: 'http://back.h5.yebeiwang.com/apis/task/all',
			headers: {

				'Host': 'back.h5.yebeiwang.com',
				'Content-Type': 'application/x-www-form-urlencoded',
				'Origin': 'http://h8.yebeiwang.com',
				'Accept': '*/*',
				'Authorization': data,
				'Referer': 'http://h8.yebeiwang.com/',
				'Accept-Language': 'zh-CN,zh-Hans;q=0.9',

			},
			// body: '',
		}

		if (debug) {
			console.log(`\n 【debug】=============== 这是 任务列表 请求 url ===============`);
			console.log(url);
		}
		$.get(url, async (error, response, data) => {
			try {
				if (debug) {
					console.log(`\n\n 【debug】===============这是 任务列表 返回data==============`);
					console.log(data)
					console.log(`======`)
					console.log(JSON.parse(data))
				}
				let result = JSON.parse(data);
				if (result.code == 200) {

					console.log(`\n 获取任务列表成功 🎉 准备执行任务\n`);
					if (result.data.length !== 0) {

						console.log(`\n共检测到 ${result.data.length} 个任务, 准备执行任务 \n`);

						// result.data.length
						for (let index = 0; index < result.data.length; index++) {
							task_num = index + 1;
							console.log(`\n开始执行第 ${task_num} 个任务\n`);
							console.log(`开始获取 opensite_id`);
							task_id = result.data[index].id;
							answer = JSON.parse(result.data[index].verification)[0].answer;
							// console.log(answer);
							grab();
							await $.wait(num * 1000);

							console.log(`开始打开 opensite_id `);
							openSite();
							await $.wait(num * 1000);
							await $.wait(20 * 1000);

							console.log(`开始 提交任务 `);
							submit();
							await $.wait(num * 1000);
							await $.wait(10 * 1000);

						}



					} else if (result.data.length == 0) {
						console.log(`\n暂时没有任务,等等更新吧!\n`);
					} else {
						console.log(`\n 获取任务列表:  失败 ❌ 了呢,原因未知！\n ${data} \n `)
					}


				} else {

					console.log(`\n 获取任务列表:  失败 ❌ 了呢,原因未知！\n ${data} \n `)

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
 * 获取 opensite_id    grab    post
 * http://back.h5.yebeiwang.com/apis/order/grab/33959
 */
function grab(timeout = 3 * 1000) {

	return new Promise((resolve) => {
		let url = {
			url: `http://back.h5.yebeiwang.com/apis/order/grab/${task_id}`,
			headers: {

				'Host': 'back.h5.yebeiwang.com',
				'Accept': '*/*',
				'Authorization': data,
				'Accept-Language': 'zh-CN,zh-Hans;q=0.9',
				'Origin': 'http://h8.yebeiwang.com',
				'Referer': 'http://h8.yebeiwang.com/'

			},
			body: '',
		}

		if (debug) {
			console.log(`\n 【debug】=============== 这是 获取 opensite_id 请求 url ===============`);
			console.log(url);
		}
		$.post(url, async (error, response, data) => {
			try {
				if (debug) {
					console.log(`\n\n 【debug】===============这是 获取 opensite_id 返回data==============`);
					console.log(data)
					console.log(`======`)
					console.log(JSON.parse(data))
				}
				let result = JSON.parse(data);
				if (result.code == 200) {
					opensite_id = result.data.id
					console.log(`\n 获取 opensite_id 成功 🎉 , opensite_id:${opensite_id} \n`);

				} else {

					console.log(`\n 获取 opensite_id:  失败 ❌ 了呢,原因未知！\n ${data} \n `)

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
 * 打开 opensite_id  然后就能提交  post
 * http://back.h5.yebeiwang.com/apis/order/openSite/676344645973659648
 */
function openSite(timeout = 3 * 1000) {

	return new Promise((resolve) => {
		let url = {
			url: `http://back.h5.yebeiwang.com/apis/order/openSite/${opensite_id}`,
			headers: {

				'Host': 'back.h5.yebeiwang.com',
				'Accept': '*/*',
				'Authorization': data,
				'Accept-Language': 'zh-CN,zh-Hans;q=0.9',
				'Content-Type': 'application/json',
				'Origin': 'http://h8.yebeiwang.com',
				'Referer': 'http://h8.yebeiwang.com/',

			},
			body: '',
		}

		if (debug) {
			console.log(`\n 【debug】=============== 这是 打开 opensite_id 请求 url ===============`);
			console.log(url);
		}
		$.post(url, async (error, response, data) => {
			try {
				if (debug) {
					console.log(`\n\n 【debug】===============这是 打开 opensite_id 返回data==============`);
					console.log(data)
					console.log(`======`)
					console.log(JSON.parse(data))
				}
				let result = JSON.parse(data);
				if (result.code == 200) {
					console.log(`\n 打开 opensite_id 成功  🎉\n`);

				} else {

					console.log(`\n 打开 opensite_id:  失败 ❌ 了呢,原因未知！\n ${data} \n `)

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
 * 提交任务  post
 * http://back.h5.yebeiwang.com/apis/order/submit/676344645973659648
 */
function submit(timeout = 3 * 1000) {

	return new Promise((resolve) => {
		let url = {
			url: `http://back.h5.yebeiwang.com/apis/order/submit/${opensite_id}`,
			headers: {

				'Host': 'back.h5.yebeiwang.com',
				'Accept': '*/*',
				'Authorization': data,
				'Accept-Language': 'zh-CN,zh-Hans;q=0.9',
				'Content-Type': 'application/json',
				'Origin': 'http://h8.yebeiwang.com',
				'Referer': 'http://h8.yebeiwang.com/',

			},
			body: `{ "orderId": "${opensite_id}", "answer": "${answer}" }`,
		}

		if (debug) {
			console.log(`\n 【debug】=============== 这是 提交任务 请求 url ===============`);
			console.log(url);
		}
		$.post(url, async (error, response, data) => {
			try {
				if (debug) {
					console.log(`\n\n 【debug】===============这是 提交任务 返回data==============`);
					console.log(data)
					console.log(`======`)
					console.log(JSON.parse(data))
				}
				let result = JSON.parse(data);
				if (result.code == 200) {
					console.log(`\n 提交任务 ${task_id} 成功 🎉 \n`);

				} else {

					console.log(`\n 提交任务:  失败 ❌ 了呢,原因未知！\n ${data} \n `)

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
 * 查询余额  get
 * http://back.h5.yebeiwang.com/apis/user/details
 */
function user_info(timeout = 3 * 1000) {

	return new Promise((resolve) => {
		let url = {
			url: `http://back.h5.yebeiwang.com/apis/user/details`,
			headers: {

				'Host': 'back.h5.yebeiwang.com',
				'Accept': '*/*',
				'Authorization': data,
				'Accept-Language': 'zh-CN,zh-Hans;q=0.9',
				'Content-Type': 'application/json',
				'Origin': 'http://h8.yebeiwang.com',
				'Referer': 'http://h8.yebeiwang.com/',

			},
		}

		if (debug) {
			console.log(`\n 【debug】=============== 这是 查询余额 请求 url ===============`);
			console.log(url);
		}
		$.get(url, async (error, response, data) => {
			try {
				if (debug) {
					console.log(`\n\n 【debug】===============这是 查询余额 返回data==============`);
					console.log(data)
					console.log(`======`)
					console.log(JSON.parse(data))
				}
				let result = JSON.parse(data);
				if (result.code == 200) {

					console.log(`\n 查询余额成功 🎉 \n你现在有 ${result.data.balance} 积分,折算人民币 ${result.data.balance / 1000} 元 \n 预计AZ过期时间:  ${result.data.lastUpdateTime}`);

					msg += `\n 查询余额成功 🎉 \n你现在有 ${result.data.balance} 积分,折算人民币 ${result.data.balance / 1000} 元 \n 预计AZ过期时间:  ${result.data.lastUpdateTime}`

				} else {

					console.log(`\n 查询余额:  失败 ❌ 了呢,原因未知！\n ${data} \n `)

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
 * 签到  post
 * http://back.h5.yebeiwang.com/apis/user/signIn
 */
function signIn(timeout = 3 * 1000) {

	return new Promise((resolve) => {
		let url = {
			url: `http://back.h5.yebeiwang.com/apis/user/signIn`,
			headers: {

				'Host': 'back.h5.yebeiwang.com',
				'Accept': '*/*',
				'Authorization': data,
				'Accept-Language': 'zh-CN,zh-Hans;q=0.9',
				'Content-Type': 'application/json',
				'Origin': 'http://h8.yebeiwang.com',
				'Referer': 'http://h8.yebeiwang.com/',

			},
			body: '',
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
				if (result.code == 200) {
					console.log(`\n 签到: 成功 🎉  获得金币 ${result.data.money} 个\n`);

				} else if (result.code == 342) {
					console.log(`\n 签到: ${result.msg} \n`);

				} else {

					console.log(`\n 签到:  失败 ❌ 了呢,原因未知！\n ${data} \n `)

				}

			} catch (e) {
				console.log(e)
			} finally {
				resolve();
			}
		}, timeout)
	})
}

































//#region 固定代码
// ============================================变量检查============================================ \\
async function Envs() {
	if (ybw_data) {
		if (ybw_data.indexOf("@") != -1) {
			ybw_data.split("@").forEach((item) => {
				ybw_dataArr.push(item);
			});
		} else {
			ybw_dataArr.push(ybw_data);
		}
	} else {
		console.log(`\n 【${$.name}】：未填写变量 ybw_data`)
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




// prettier-ignore
function Env(t, e) { "undefined" != typeof process && JSON.stringify(process.env).indexOf("GITHUB") > -1 && process.exit(0); class s { constructor(t) { this.env = t } send(t, e = "GET") { t = "string" == typeof t ? { url: t } : t; let s = this.get; return "POST" === e && (s = this.post), new Promise((e, i) => { s.call(this, t, (t, s, r) => { t ? i(t) : e(s) }) }) } get(t) { return this.send.call(this.env, t) } post(t) { return this.send.call(this.env, t, "POST") } } return new class { constructor(t, e) { this.name = t, this.http = new s(this), this.data = null, this.dataFile = "box.dat", this.logs = [], this.isMute = !1, this.isNeedRewrite = !1, this.logSeparator = "\n", this.startTime = (new Date).getTime(), Object.assign(this, e), this.log("", `🔔${this.name}, 开始!`) } isNode() { return "undefined" != typeof module && !!module.exports } isQuanX() { return "undefined" != typeof $task } isSurge() { return "undefined" != typeof $httpClient && "undefined" == typeof $loon } isLoon() { return "undefined" != typeof $loon } toObj(t, e = null) { try { return JSON.parse(t) } catch { return e } } toStr(t, e = null) { try { return JSON.stringify(t) } catch { return e } } getjson(t, e) { let s = e; const i = this.getdata(t); if (i) try { s = JSON.parse(this.getdata(t)) } catch { } return s } setjson(t, e) { try { return this.setdata(JSON.stringify(t), e) } catch { return !1 } } getScript(t) { return new Promise(e => { this.get({ url: t }, (t, s, i) => e(i)) }) } runScript(t, e) { return new Promise(s => { let i = this.getdata("@chavy_boxjs_userCfgs.httpapi"); i = i ? i.replace(/\n/g, "").trim() : i; let r = this.getdata("@chavy_boxjs_userCfgs.httpapi_timeout"); r = r ? 1 * r : 20, r = e && e.timeout ? e.timeout : r; const [o, h] = i.split("@"), n = { url: `http://${h}/v1/scripting/evaluate`, body: { script_text: t, mock_type: "cron", timeout: r }, headers: { "X-Key": o, Accept: "*/*" } }; this.post(n, (t, e, i) => s(i)) }).catch(t => this.logErr(t)) } loaddata() { if (!this.isNode()) return {}; { this.fs = this.fs ? this.fs : require("fs"), this.path = this.path ? this.path : require("path"); const t = this.path.resolve(this.dataFile), e = this.path.resolve(process.cwd(), this.dataFile), s = this.fs.existsSync(t), i = !s && this.fs.existsSync(e); if (!s && !i) return {}; { const i = s ? t : e; try { return JSON.parse(this.fs.readFileSync(i)) } catch (t) { return {} } } } } writedata() { if (this.isNode()) { this.fs = this.fs ? this.fs : require("fs"), this.path = this.path ? this.path : require("path"); const t = this.path.resolve(this.dataFile), e = this.path.resolve(process.cwd(), this.dataFile), s = this.fs.existsSync(t), i = !s && this.fs.existsSync(e), r = JSON.stringify(this.data); s ? this.fs.writeFileSync(t, r) : i ? this.fs.writeFileSync(e, r) : this.fs.writeFileSync(t, r) } } lodash_get(t, e, s) { const i = e.replace(/\[(\d+)\]/g, ".$1").split("."); let r = t; for (const t of i) if (r = Object(r)[t], void 0 === r) return s; return r } lodash_set(t, e, s) { return Object(t) !== t ? t : (Array.isArray(e) || (e = e.toString().match(/[^.[\]]+/g) || []), e.slice(0, -1).reduce((t, s, i) => Object(t[s]) === t[s] ? t[s] : t[s] = Math.abs(e[i + 1]) >> 0 == +e[i + 1] ? [] : {}, t)[e[e.length - 1]] = s, t) } getdata(t) { let e = this.getval(t); if (/^@/.test(t)) { const [, s, i] = /^@(.*?)\.(.*?)$/.exec(t), r = s ? this.getval(s) : ""; if (r) try { const t = JSON.parse(r); e = t ? this.lodash_get(t, i, "") : e } catch (t) { e = "" } } return e } setdata(t, e) { let s = !1; if (/^@/.test(e)) { const [, i, r] = /^@(.*?)\.(.*?)$/.exec(e), o = this.getval(i), h = i ? "null" === o ? null : o || "{}" : "{}"; try { const e = JSON.parse(h); this.lodash_set(e, r, t), s = this.setval(JSON.stringify(e), i) } catch (e) { const o = {}; this.lodash_set(o, r, t), s = this.setval(JSON.stringify(o), i) } } else s = this.setval(t, e); return s } getval(t) { return this.isSurge() || this.isLoon() ? $persistentStore.read(t) : this.isQuanX() ? $prefs.valueForKey(t) : this.isNode() ? (this.data = this.loaddata(), this.data[t]) : this.data && this.data[t] || null } setval(t, e) { return this.isSurge() || this.isLoon() ? $persistentStore.write(t, e) : this.isQuanX() ? $prefs.setValueForKey(t, e) : this.isNode() ? (this.data = this.loaddata(), this.data[e] = t, this.writedata(), !0) : this.data && this.data[e] || null } initGotEnv(t) { this.got = this.got ? this.got : require("got"), this.cktough = this.cktough ? this.cktough : require("tough-cookie"), this.ckjar = this.ckjar ? this.ckjar : new this.cktough.CookieJar, t && (t.headers = t.headers ? t.headers : {}, void 0 === t.headers.Cookie && void 0 === t.cookieJar && (t.cookieJar = this.ckjar)) } get(t, e = (() => { })) { t.headers && (delete t.headers["Content-Type"], delete t.headers["Content-Length"]), this.isSurge() || this.isLoon() ? (this.isSurge() && this.isNeedRewrite && (t.headers = t.headers || {}, Object.assign(t.headers, { "X-Surge-Skip-Scripting": !1 })), $httpClient.get(t, (t, s, i) => { !t && s && (s.body = i, s.statusCode = s.status), e(t, s, i) })) : this.isQuanX() ? (this.isNeedRewrite && (t.opts = t.opts || {}, Object.assign(t.opts, { hints: !1 })), $task.fetch(t).then(t => { const { statusCode: s, statusCode: i, headers: r, body: o } = t; e(null, { status: s, statusCode: i, headers: r, body: o }, o) }, t => e(t))) : this.isNode() && (this.initGotEnv(t), this.got(t).on("redirect", (t, e) => { try { if (t.headers["set-cookie"]) { const s = t.headers["set-cookie"].map(this.cktough.Cookie.parse).toString(); s && this.ckjar.setCookieSync(s, null), e.cookieJar = this.ckjar } } catch (t) { this.logErr(t) } }).then(t => { const { statusCode: s, statusCode: i, headers: r, body: o } = t; e(null, { status: s, statusCode: i, headers: r, body: o }, o) }, t => { const { message: s, response: i } = t; e(s, i, i && i.body) })) } post(t, e = (() => { })) { if (t.body && t.headers && !t.headers["Content-Type"] && (t.headers["Content-Type"] = "application/x-www-form-urlencoded"), t.headers && delete t.headers["Content-Length"], this.isSurge() || this.isLoon()) this.isSurge() && this.isNeedRewrite && (t.headers = t.headers || {}, Object.assign(t.headers, { "X-Surge-Skip-Scripting": !1 })), $httpClient.post(t, (t, s, i) => { !t && s && (s.body = i, s.statusCode = s.status), e(t, s, i) }); else if (this.isQuanX()) t.method = "POST", this.isNeedRewrite && (t.opts = t.opts || {}, Object.assign(t.opts, { hints: !1 })), $task.fetch(t).then(t => { const { statusCode: s, statusCode: i, headers: r, body: o } = t; e(null, { status: s, statusCode: i, headers: r, body: o }, o) }, t => e(t)); else if (this.isNode()) { this.initGotEnv(t); const { url: s, ...i } = t; this.got.post(s, i).then(t => { const { statusCode: s, statusCode: i, headers: r, body: o } = t; e(null, { status: s, statusCode: i, headers: r, body: o }, o) }, t => { const { message: s, response: i } = t; e(s, i, i && i.body) }) } } time(t, e = null) { const s = e ? new Date(e) : new Date; let i = { "M+": s.getMonth() + 1, "d+": s.getDate(), "H+": s.getHours(), "m+": s.getMinutes(), "s+": s.getSeconds(), "q+": Math.floor((s.getMonth() + 3) / 3), S: s.getMilliseconds() }; /(y+)/.test(t) && (t = t.replace(RegExp.$1, (s.getFullYear() + "").substr(4 - RegExp.$1.length))); for (let e in i) new RegExp("(" + e + ")").test(t) && (t = t.replace(RegExp.$1, 1 == RegExp.$1.length ? i[e] : ("00" + i[e]).substr(("" + i[e]).length))); return t } msg(e = t, s = "", i = "", r) { const o = t => { if (!t) return t; if ("string" == typeof t) return this.isLoon() ? t : this.isQuanX() ? { "open-url": t } : this.isSurge() ? { url: t } : void 0; if ("object" == typeof t) { if (this.isLoon()) { let e = t.openUrl || t.url || t["open-url"], s = t.mediaUrl || t["media-url"]; return { openUrl: e, mediaUrl: s } } if (this.isQuanX()) { let e = t["open-url"] || t.url || t.openUrl, s = t["media-url"] || t.mediaUrl; return { "open-url": e, "media-url": s } } if (this.isSurge()) { let e = t.url || t.openUrl || t["open-url"]; return { url: e } } } }; if (this.isMute || (this.isSurge() || this.isLoon() ? $notification.post(e, s, i, o(r)) : this.isQuanX() && $notify(e, s, i, o(r))), !this.isMuteLog) { let t = ["", "==============📣系统通知📣=============="]; t.push(e), s && t.push(s), i && t.push(i), console.log(t.join("\n")), this.logs = this.logs.concat(t) } } log(...t) { t.length > 0 && (this.logs = [...this.logs, ...t]), console.log(t.join(this.logSeparator)) } logErr(t, e) { const s = !this.isSurge() && !this.isQuanX() && !this.isLoon(); s ? this.log("", `❗️${this.name}, 错误!`, t.stack) : this.log("", `❗️${this.name}, 错误!`, t) } wait(t) { return new Promise(e => setTimeout(e, t)) } done(t = {}) { const e = (new Date).getTime(), s = (e - this.startTime) / 1e3; this.log("", `🔔${this.name}, 结束! 🕛 ${s} 秒`), this.log(), (this.isSurge() || this.isQuanX() || this.isLoon()) && $done(t) } }(t, e) }