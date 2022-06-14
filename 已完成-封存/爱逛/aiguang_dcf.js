const $ = new Env('爱逛')
const notify = $.isNode() ? require('./sendNotify') : '';
let status, no;
status = (status = ($.getval("agstatus") || "1")) > 1 ? `${status}` : ""; // 账号扩展字符
const agbdArr = []

//let agtk = $.getdata('agtk')
let agbd = $.getdata('agbd')
let num = 12
let tz = ($.getval('tz') || '1');//0关闭通知，1默认开启
const logs = 0;//0为关闭日志，1为开启


//CK运行
let isagck = typeof $request !== 'undefined'
if (isagck) {
	agck();
	$.done()
}
if ($.isNode()) {
	if (process.env.yltk && process.env.yltk.indexOf('#') > -1) {
		yltk = process.env.yltk.split('#');
		console.log(`您选择的是用"#"隔开\n`)
	}
	else if (process.env.yltk && process.env.yltk.indexOf('\n') > -1) {
		yltk = process.env.yltk.split('\n');
		console.log(`您选择的是用换行隔开\n`)
	} else {
		yltk = process.env.yltk.split()
	};

	console.log(`============ 脚本执行-国际标准时间(UTC)：${new Date().toLocaleString()}  =============\n`)
	console.log(`============ 脚本执行-北京时间(UTC+8)：${new Date(new Date().getTime() + 8 * 60 * 60 * 1000).toLocaleString()}  =============\n`)
} else {
	//agtkArr.push($.getdata('agtk'))
	agbdArr.push($.getdata('agbd'))

	let agcount = ($.getval('agcount') || '1');
	for (let i = 2; i <= agcount; i++) {
		agbdArr.push($.getdata(`agbd${i}`))
		//agtkArr.push($.getdata(`agtk${i}`))

	}
}



!(async () => {
	if (!agbdArr[0]) {
		$.msg($.name, '【提示】请先获取一cookie')
		return;
	}



	console.log(
		`\n\n=============================================== 脚本执行 - 北京时间(UTC+8)：${new Date(
			new Date().getTime() +
			new Date().getTimezoneOffset() * 60 * 1000 +
			8 * 60 * 60 * 1000
		).toLocaleString()} ===============================================\n`);
	console.log(`------------- 共${agbdArr.length}个账号----------------\n`)
	for (let i = 0; i < agbdArr.length; i++) {
		if (agbdArr[i]) {
			//agtk= agtkArr[i];
			agbd = agbdArr[i];
			$.index = i + 1;
			await $.wait(1000)
			console.log(`\n开始【账号${$.index}】`)
			console.log(`\n☁️开始签到☁️\n`)
			await agqd();
			await $.wait(1000);
			console.log(`\n☁️开始看直播☁️\n`)
			console.log(`\n第一次`)
			await agkzb1();
			await $.wait(1000);
			console.log(`\n第二次`)
			await agkzb2();
			await $.wait(1000);
			console.log(`\n第三次`)
			await agkzb3();
			await $.wait(1000);
			console.log(`\n第四次`)
			await agkzb4();
			await $.wait(1000);
			console.log(`\n第五次`)
			await agkzb5();
			await $.wait(1000);
			console.log(`\n第六次`)
			await agkzb6();
			await $.wait(1000);
			console.log(`\n☁️开始浏览分会场☁️\n`)
			console.log(`\n第一次`)
			await agllfhc1();
			await $.wait(1000);
			console.log(`\n第二次`)
			await agllfhc2();
			await $.wait(1000);
			console.log(`\n第三次`)
			await agllfhc3();
			await $.wait(1000);
			console.log(`\n第四次`)
			await agllfhc4();
			await $.wait(1000);
			console.log(`\n☁️开始抽奖☁️\n`)
			for (let j = 0; j < num; j++) {
				await agcj();
				await $.wait(3000);
			}

		}
	}

})()
	.catch((e) => $.logErr(e))
	.finally(() => $.done())




function agck() {
	if ($request.url.indexOf("live/home/tab-bar-status.json") >= -1) {
		const agbd = $request.headers['Extra-Data']
		if (agbd) $.setdata(agbd, `agbd${status}`)
		$.log(`[${$.jsname}] 获取hhsctk请求: 成功,agbd: ${agbd}`)
		$.msg($.name, "", `${status}` + 'agbd获取成功！')
	}
}




function agqd(timeout = 0) {
	return new Promise((resolve) => {
		let url = {
			url: `https://h5.guang.com/live/ump/roll-dice-general/post-finish-panel-task/dice`,
			headers: {
				'Accept-Encoding': `gzip,compress,br,deflate`,
				'Content-Type': `application/json`,
				'Connection': `keep-alive`,
				'Referer': `https://servicewechat.com/wxa2e624400134d690/876/page-frame.html`,
				'Host': `h5.guang.com`,
				'Extra-Data': `${agbd}`
			},
			body: `{"taskType": 100301}`,
		}

		$.post(url, async (error, response, data) => {
			try {
				result = JSON.parse(data);
				//console.log(data);
				if (result.code == 0) {
					$.log(`\n【🎉🎉🎉 恭喜你了 🎉🎉🎉】签到状态:(${result.msg}) ,明天继续吧  ✅ `)
					// await $.wait(3 * 1000)
				} else {
					$.log(`\n【🎉 高兴个蛋 🎉】签到状态:${result.msg},明天再来`)
				}
			} catch (e) {
				$.logErr(e, resp);
			} finally {
				resolve()
			}
		}, timeout)

	})
}


function agkzb1(timeout = 0) {
	return new Promise((resolve) => {
		let url = {
			url: `https://h5.guang.com/live/ump/roll-dice-general/post-finish-panel-task/dice`,
			headers: {
				'Accept-Encoding': `gzip,compress,br,deflate`,
				'Content-Type': `application/json`,
				'Connection': `keep-alive`,
				'Referer': `https://servicewechat.com/wxa2e624400134d690/876/page-frame.html`,
				'Host': `h5.guang.com`,
				'Extra-Data': `${agbd}`
			},
			body: `{
  "taskType": 100302,
  "bizId": 2739855
}`,
		}

		$.post(url, async (error, response, data) => {
			try {
				result = JSON.parse(data);
				//console.log(data);
				if (result.code == 0) {
					$.log(`\n【🎉🎉🎉 恭喜你了 🎉🎉🎉】完成状态:(${result.msg}) ,明天继续吧  ✅ `)
					// await $.wait(3 * 1000)
				} else {
					$.log(`\n【🎉 高兴个蛋 🎉】完成状态:${result.msg},明天再来`)
				}
			} catch (e) {
				$.logErr(e, resp);
			} finally {
				resolve()
			}
		}, timeout)

	})
}


function agkzb2(timeout = 0) {
	return new Promise((resolve) => {
		let url = {
			url: `https://h5.guang.com/live/ump/roll-dice-general/post-finish-panel-task/dice`,
			headers: {
				'Accept-Encoding': `gzip,compress,br,deflate`,
				'Content-Type': `application/json`,
				'Connection': `keep-alive`,
				'Referer': `https://servicewechat.com/wxa2e624400134d690/876/page-frame.html`,
				'Host': `h5.guang.com`,
				'Extra-Data': `${agbd}`
			},
			body: `{
  "taskType": 100302,
  "bizId": 2701988
}`,
		}

		$.post(url, async (error, response, data) => {
			try {
				result = JSON.parse(data);
				//console.log(data);
				if (result.code == 0) {
					$.log(`\n【🎉🎉🎉 恭喜你了 🎉🎉🎉】完成状态:(${result.msg}) ,明天继续吧  ✅ `)
					// await $.wait(3 * 1000)
				} else {
					$.log(`\n【🎉 高兴个蛋 🎉】完成状态:${result.msg},明天再来`)
				}
			} catch (e) {
				$.logErr(e, resp);
			} finally {
				resolve()
			}
		}, timeout)

	})
}

function agkzb3(timeout = 0) {
	return new Promise((resolve) => {
		let url = {
			url: `https://h5.guang.com/live/ump/roll-dice-general/post-finish-panel-task/dice`,
			headers: {
				'Accept-Encoding': `gzip,compress,br,deflate`,
				'Content-Type': `application/json`,
				'Connection': `keep-alive`,
				'Referer': `https://servicewechat.com/wxa2e624400134d690/876/page-frame.html`,
				'Host': `h5.guang.com`,
				'Extra-Data': `${agbd}`
			},
			body: `{
  "taskType": 100302,
  "bizId": 2726811
}`,
		}

		$.post(url, async (error, response, data) => {
			try {
				result = JSON.parse(data);
				//console.log(data);
				if (result.code == 0) {
					$.log(`\n【🎉🎉🎉 恭喜你了 🎉🎉🎉】完成状态:(${result.msg}) ,明天继续吧  ✅ `)
					// await $.wait(3 * 1000)
				} else {
					$.log(`\n【🎉 高兴个蛋 🎉】完成状态:${result.msg},明天再来`)
				}
			} catch (e) {
				$.logErr(e, resp);
			} finally {
				resolve()
			}
		}, timeout)

	})
}


function agkzb4(timeout = 0) {
	return new Promise((resolve) => {
		let url = {
			url: `https://h5.guang.com/live/ump/roll-dice-general/post-finish-panel-task/dice`,
			headers: {
				'Accept-Encoding': `gzip,compress,br,deflate`,
				'Content-Type': `application/json`,
				'Connection': `keep-alive`,
				'Referer': `https://servicewechat.com/wxa2e624400134d690/876/page-frame.html`,
				'Host': `h5.guang.com`,
				'Extra-Data': `${agbd}`
			},
			body: `{
  "taskType": 100302,
  "bizId": 2720166
}`,
		}

		$.post(url, async (error, response, data) => {
			try {
				result = JSON.parse(data);
				//console.log(data);
				if (result.code == 0) {
					$.log(`\n【🎉🎉🎉 恭喜你了 🎉🎉🎉】完成状态:(${result.msg}) ,明天继续吧  ✅ `)
					// await $.wait(3 * 1000)
				} else {
					$.log(`\n【🎉 高兴个蛋 🎉】完成状态:${result.msg},明天再来`)
				}
			} catch (e) {
				$.logErr(e, resp);
			} finally {
				resolve()
			}
		}, timeout)

	})
}


function agkzb5(timeout = 0) {
	return new Promise((resolve) => {
		let url = {
			url: `https://h5.guang.com/live/ump/roll-dice-general/post-finish-panel-task/dice`,
			headers: {
				'Accept-Encoding': `gzip,compress,br,deflate`,
				'Content-Type': `application/json`,
				'Connection': `keep-alive`,
				'Referer': `https://servicewechat.com/wxa2e624400134d690/876/page-frame.html`,
				'Host': `h5.guang.com`,
				'Extra-Data': `${agbd}`
			},
			body: `{
  "taskType": 100302,
  "bizId": 2720167
}`,
		}

		$.post(url, async (error, response, data) => {
			try {
				result = JSON.parse(data);
				//console.log(data);
				if (result.code == 0) {
					$.log(`\n【🎉🎉🎉 恭喜你了 🎉🎉🎉】完成状态:(${result.msg}) ,明天继续吧  ✅ `)
					// await $.wait(3 * 1000)
				} else {
					$.log(`\n【🎉 高兴个蛋 🎉】完成状态:${result.msg},明天再来`)
				}
			} catch (e) {
				$.logErr(e, resp);
			} finally {
				resolve()
			}
		}, timeout)

	})
}


function agkzb6(timeout = 0) {
	return new Promise((resolve) => {
		let url = {
			url: `https://h5.guang.com/live/ump/roll-dice-general/post-finish-panel-task/dice`,
			headers: {
				'Accept-Encoding': `gzip,compress,br,deflate`,
				'Content-Type': `application/json`,
				'Connection': `keep-alive`,
				'Referer': `https://servicewechat.com/wxa2e624400134d690/876/page-frame.html`,
				'Host': `h5.guang.com`,
				'Extra-Data': `${agbd}`
			},
			body: `{
  "taskType": 100302,
  "bizId": 2720168
}`,
		}

		$.post(url, async (error, response, data) => {
			try {
				result = JSON.parse(data);
				//console.log(data);
				if (result.code == 0) {
					$.log(`\n【🎉🎉🎉 恭喜你了 🎉🎉🎉】完成状态:(${result.msg}) ,明天继续吧  ✅ `)
					// await $.wait(3 * 1000)
				} else {
					$.log(`\n【🎉 高兴个蛋 🎉】完成状态:${result.msg},明天再来`)
				}
			} catch (e) {
				$.logErr(e, resp);
			} finally {
				resolve()
			}
		}, timeout)

	})
}




function agllfhc1(timeout = 0) {
	return new Promise((resolve) => {
		let url = {
			url: `https://h5.guang.com/live/ump/roll-dice-general/post-finish-panel-task/dice`,
			headers: {
				'Accept-Encoding': `gzip,compress,br,deflate`,
				'Content-Type': `application/json`,
				'Connection': `keep-alive`,
				'Referer': `https://servicewechat.com/wxa2e624400134d690/876/page-frame.html`,
				'Host': `h5.guang.com`,
				'Extra-Data': `${agbd}`
			},
			body: `{
  "taskType": 100304,
  "bizId": 2045
}`,
		}

		$.post(url, async (error, response, data) => {
			try {
				result = JSON.parse(data);
				//console.log(data);
				if (result.code == 0) {
					$.log(`\n【🎉🎉🎉 恭喜你了 🎉🎉🎉】完成状态:(${result.msg}) ,明天继续吧  ✅ `)
					// await $.wait(3 * 1000)
				} else {
					$.log(`\n【🎉 高兴个蛋 🎉】完成状态:${result.msg},明天再来`)
				}
			} catch (e) {
				$.logErr(e, resp);
			} finally {
				resolve()
			}
		}, timeout)

	})
}


function agllfhc2(timeout = 0) {
	return new Promise((resolve) => {
		let url = {
			url: `https://h5.guang.com/live/ump/roll-dice-general/post-finish-panel-task/dice`,
			headers: {
				'Accept-Encoding': `gzip,compress,br,deflate`,
				'Content-Type': `application/json`,
				'Connection': `keep-alive`,
				'Referer': `https://servicewechat.com/wxa2e624400134d690/876/page-frame.html`,
				'Host': `h5.guang.com`,
				'Extra-Data': `${agbd}`
			},
			body: `{
  "taskType": 100304,
  "bizId": 2043
}`,
		}

		$.post(url, async (error, response, data) => {
			try {
				result = JSON.parse(data);
				//console.log(data);
				if (result.code == 0) {
					$.log(`\n【🎉🎉🎉 恭喜你了 🎉🎉🎉】完成状态:(${result.msg}) ,明天继续吧  ✅ `)
					// await $.wait(3 * 1000)
				} else {
					$.log(`\n【🎉 高兴个蛋 🎉】完成状态:${result.msg},明天再来`)
				}
			} catch (e) {
				$.logErr(e, resp);
			} finally {
				resolve()
			}
		}, timeout)

	})
}


function agllfhc3(timeout = 0) {
	return new Promise((resolve) => {
		let url = {
			url: `https://h5.guang.com/live/ump/roll-dice-general/post-finish-panel-task/dice`,
			headers: {
				'Accept-Encoding': `gzip,compress,br,deflate`,
				'Content-Type': `application/json`,
				'Connection': `keep-alive`,
				'Referer': `https://servicewechat.com/wxa2e624400134d690/876/page-frame.html`,
				'Host': `h5.guang.com`,
				'Extra-Data': `${agbd}`
			},
			body: `{
  "taskType": 100304,
  "bizId": 2047
}`,
		}

		$.post(url, async (error, response, data) => {
			try {
				result = JSON.parse(data);
				//console.log(data);
				if (result.code == 0) {
					$.log(`\n【🎉🎉🎉 恭喜你了 🎉🎉🎉】完成状态:(${result.msg}) ,明天继续吧  ✅ `)
					// await $.wait(3 * 1000)
				} else {
					$.log(`\n【🎉 高兴个蛋 🎉】完成状态:${result.msg},明天再来`)
				}
			} catch (e) {
				$.logErr(e, resp);
			} finally {
				resolve()
			}
		}, timeout)

	})
}


function agllfhc4(timeout = 0) {
	return new Promise((resolve) => {
		let url = {
			url: `https://h5.guang.com/live/ump/roll-dice-general/post-finish-panel-task/dice`,
			headers: {
				'Accept-Encoding': `gzip,compress,br,deflate`,
				'Content-Type': `application/json`,
				'Connection': `keep-alive`,
				'Referer': `https://servicewechat.com/wxa2e624400134d690/876/page-frame.html`,
				'Host': `h5.guang.com`,
				'Extra-Data': `${agbd}`
			},
			body: `{
  "taskType": 100304,
  "bizId": 2048
}`,
		}

		$.post(url, async (error, response, data) => {
			try {
				result = JSON.parse(data);
				//console.log(data);
				if (result.code == 0) {
					$.log(`\n【🎉🎉🎉 恭喜你了 🎉🎉🎉】完成状态:(${result.msg}) ,明天继续吧  ✅ `)
					// await $.wait(3 * 1000)
				} else {
					$.log(`\n【🎉 高兴个蛋 🎉】完成状态:${result.msg},明天再来`)
				}
			} catch (e) {
				$.logErr(e, resp);
			} finally {
				resolve()
			}
		}, timeout)

	})
}


function agcj(timeout = 0) {
	return new Promise((resolve) => {
		let url = {
			url: `https://h5.guang.com/live/ump/roll-dice-general/post-roll-dice/dice`,
			headers: {
				'Accept-Encoding': `gzip,compress,br,deflate`,
				'Content-Type': `application/json`,
				'Connection': `keep-alive`,
				'Referer': `https://servicewechat.com/wxa2e624400134d690/876/page-frame.html`,
				'Host': `h5.guang.com`,
				'Extra-Data': `${agbd}`
			},
			body: ``,
		}

		$.post(url, async (error, response, data) => {
			try {
				result = JSON.parse(data);
				//console.log(data);
				if (result.data.resultType == 300) {
					$.log(`\n【🎉🎉🎉 恭喜你了 🎉🎉🎉】抽到了优惠券 ,继续抽吧  ✅ `)
					// await $.wait(3 * 1000)
				} else if (result.data.resultType == 1014) {
					$.log(`\n【🎉 高兴个蛋 🎉】抽到了废物,继续抽吧`)
				} else {
					$.log(`\n【🎉 高兴个蛋 🎉】抽奖次数不足，明天再来吧`)
				}
			} catch (e) {
				$.logErr(e, resp);
			} finally {
				resolve()
			}
		}, timeout)

	})
}








//env模块    不要动  
function Env(t, e) { class s { constructor(t) { this.env = t } send(t, e = "GET") { t = "string" == typeof t ? { url: t } : t; let s = this.get; return "POST" === e && (s = this.post), new Promise((e, i) => { s.call(this, t, (t, s, r) => { t ? i(t) : e(s) }) }) } get(t) { return this.send.call(this.env, t) } post(t) { return this.send.call(this.env, t, "POST") } } return new class { constructor(t, e) { this.name = t, this.http = new s(this), this.data = null, this.dataFile = "box.dat", this.logs = [], this.isMute = !1, this.isNeedRewrite = !1, this.logSeparator = "\n", this.startTime = (new Date).getTime(), Object.assign(this, e), this.log("", `\ud83d\udd14${this.name}, \u5f00\u59cb!`) } isNode() { return "undefined" != typeof module && !!module.exports } isQuanX() { return "undefined" != typeof $task } isSurge() { return "undefined" != typeof $httpClient && "undefined" == typeof $loon } isLoon() { return "undefined" != typeof $loon } toObj(t, e = null) { try { return JSON.parse(t) } catch { return e } } toStr(t, e = null) { try { return JSON.stringify(t) } catch { return e } } getjson(t, e) { let s = e; const i = this.getdata(t); if (i) try { s = JSON.parse(this.getdata(t)) } catch { } return s } setjson(t, e) { try { return this.setdata(JSON.stringify(t), e) } catch { return !1 } } getScript(t) { return new Promise(e => { this.get({ url: t }, (t, s, i) => e(i)) }) } runScript(t, e) { return new Promise(s => { let i = this.getdata("@chavy_boxjs_userCfgs.httpapi"); i = i ? i.replace(/\n/g, "").trim() : i; let r = this.getdata("@chavy_boxjs_userCfgs.httpapi_timeout"); r = r ? 1 * r : 20, r = e && e.timeout ? e.timeout : r; const [o, h] = i.split("@"), a = { url: `http://${h}/v1/scripting/evaluate`, body: { script_text: t, mock_type: "cron", timeout: r }, headers: { "X-Key": o, Accept: "*/*" } }; this.post(a, (t, e, i) => s(i)) }).catch(t => this.logErr(t)) } loaddata() { if (!this.isNode()) return {}; { this.fs = this.fs ? this.fs : require("fs"), this.path = this.path ? this.path : require("path"); const t = this.path.resolve(this.dataFile), e = this.path.resolve(process.cwd(), this.dataFile), s = this.fs.existsSync(t), i = !s && this.fs.existsSync(e); if (!s && !i) return {}; { const i = s ? t : e; try { return JSON.parse(this.fs.readFileSync(i)) } catch (t) { return {} } } } } writedata() { if (this.isNode()) { this.fs = this.fs ? this.fs : require("fs"), this.path = this.path ? this.path : require("path"); const t = this.path.resolve(this.dataFile), e = this.path.resolve(process.cwd(), this.dataFile), s = this.fs.existsSync(t), i = !s && this.fs.existsSync(e), r = JSON.stringify(this.data); s ? this.fs.writeFileSync(t, r) : i ? this.fs.writeFileSync(e, r) : this.fs.writeFileSync(t, r) } } lodash_get(t, e, s) { const i = e.replace(/\[(\d+)\]/g, ".$1").split("."); let r = t; for (const t of i) if (r = Object(r)[t], void 0 === r) return s; return r } lodash_set(t, e, s) { return Object(t) !== t ? t : (Array.isArray(e) || (e = e.toString().match(/[^.[\]]+/g) || []), e.slice(0, -1).reduce((t, s, i) => Object(t[s]) === t[s] ? t[s] : t[s] = Math.abs(e[i + 1]) >> 0 == +e[i + 1] ? [] : {}, t)[e[e.length - 1]] = s, t) } getdata(t) { let e = this.getval(t); if (/^@/.test(t)) { const [, s, i] = /^@(.*?)\.(.*?)$/.exec(t), r = s ? this.getval(s) : ""; if (r) try { const t = JSON.parse(r); e = t ? this.lodash_get(t, i, "") : e } catch (t) { e = "" } } return e } setdata(t, e) { let s = !1; if (/^@/.test(e)) { const [, i, r] = /^@(.*?)\.(.*?)$/.exec(e), o = this.getval(i), h = i ? "null" === o ? null : o || "{}" : "{}"; try { const e = JSON.parse(h); this.lodash_set(e, r, t), s = this.setval(JSON.stringify(e), i) } catch (e) { const o = {}; this.lodash_set(o, r, t), s = this.setval(JSON.stringify(o), i) } } else s = this.setval(t, e); return s } getval(t) { return this.isSurge() || this.isLoon() ? $persistentStore.read(t) : this.isQuanX() ? $prefs.valueForKey(t) : this.isNode() ? (this.data = this.loaddata(), this.data[t]) : this.data && this.data[t] || null } setval(t, e) { return this.isSurge() || this.isLoon() ? $persistentStore.write(t, e) : this.isQuanX() ? $prefs.setValueForKey(t, e) : this.isNode() ? (this.data = this.loaddata(), this.data[e] = t, this.writedata(), !0) : this.data && this.data[e] || null } initGotEnv(t) { this.got = this.got ? this.got : require("got"), this.cktough = this.cktough ? this.cktough : require("tough-cookie"), this.ckjar = this.ckjar ? this.ckjar : new this.cktough.CookieJar, t && (t.headers = t.headers ? t.headers : {}, void 0 === t.headers.Cookie && void 0 === t.cookieJar && (t.cookieJar = this.ckjar)) } get(t, e = (() => { })) { t.headers && (delete t.headers["Content-Type"], delete t.headers["Content-Length"]), this.isSurge() || this.isLoon() ? (this.isSurge() && this.isNeedRewrite && (t.headers = t.headers || {}, Object.assign(t.headers, { "X-Surge-Skip-Scripting": !1 })), $httpClient.get(t, (t, s, i) => { !t && s && (s.body = i, s.statusCode = s.status), e(t, s, i) })) : this.isQuanX() ? (this.isNeedRewrite && (t.opts = t.opts || {}, Object.assign(t.opts, { hints: !1 })), $task.fetch(t).then(t => { const { statusCode: s, statusCode: i, headers: r, body: o } = t; e(null, { status: s, statusCode: i, headers: r, body: o }, o) }, t => e(t))) : this.isNode() && (this.initGotEnv(t), this.got(t).on("redirect", (t, e) => { try { if (t.headers["set-cookie"]) { const s = t.headers["set-cookie"].map(this.cktough.Cookie.parse).toString(); this.ckjar.setCookieSync(s, null), e.cookieJar = this.ckjar } } catch (t) { this.logErr(t) } }).then(t => { const { statusCode: s, statusCode: i, headers: r, body: o } = t; e(null, { status: s, statusCode: i, headers: r, body: o }, o) }, t => { const { message: s, response: i } = t; e(s, i, i && i.body) })) } post(t, e = (() => { })) { if (t.body && t.headers && !t.headers["Content-Type"] && (t.headers["Content-Type"] = "application/x-www-form-urlencoded"), t.headers && delete t.headers["Content-Length"], this.isSurge() || this.isLoon()) this.isSurge() && this.isNeedRewrite && (t.headers = t.headers || {}, Object.assign(t.headers, { "X-Surge-Skip-Scripting": !1 })), $httpClient.post(t, (t, s, i) => { !t && s && (s.body = i, s.statusCode = s.status), e(t, s, i) }); else if (this.isQuanX()) t.method = "POST", this.isNeedRewrite && (t.opts = t.opts || {}, Object.assign(t.opts, { hints: !1 })), $task.fetch(t).then(t => { const { statusCode: s, statusCode: i, headers: r, body: o } = t; e(null, { status: s, statusCode: i, headers: r, body: o }, o) }, t => e(t)); else if (this.isNode()) { this.initGotEnv(t); const { url: s, ...i } = t; this.got.post(s, i).then(t => { const { statusCode: s, statusCode: i, headers: r, body: o } = t; e(null, { status: s, statusCode: i, headers: r, body: o }, o) }, t => { const { message: s, response: i } = t; e(s, i, i && i.body) }) } } time(t) { let e = { "M+": (new Date).getMonth() + 1, "d+": (new Date).getDate(), "H+": (new Date).getHours(), "m+": (new Date).getMinutes(), "s+": (new Date).getSeconds(), "q+": Math.floor(((new Date).getMonth() + 3) / 3), S: (new Date).getMilliseconds() }; /(y+)/.test(t) && (t = t.replace(RegExp.$1, ((new Date).getFullYear() + "").substr(4 - RegExp.$1.length))); for (let s in e) new RegExp("(" + s + ")").test(t) && (t = t.replace(RegExp.$1, 1 == RegExp.$1.length ? e[s] : ("00" + e[s]).substr(("" + e[s]).length))); return t } msg(e = t, s = "", i = "", r) { const o = t => { if (!t) return t; if ("string" == typeof t) return this.isLoon() ? t : this.isQuanX() ? { "open-url": t } : this.isSurge() ? { url: t } : void 0; if ("object" == typeof t) { if (this.isLoon()) { let e = t.openUrl || t.url || t["open-url"], s = t.mediaUrl || t["media-url"]; return { openUrl: e, mediaUrl: s } } if (this.isQuanX()) { let e = t["open-url"] || t.url || t.openUrl, s = t["media-url"] || t.mediaUrl; return { "open-url": e, "media-url": s } } if (this.isSurge()) { let e = t.url || t.openUrl || t["open-url"]; return { url: e } } } }; this.isMute || (this.isSurge() || this.isLoon() ? $notification.post(e, s, i, o(r)) : this.isQuanX() && $notify(e, s, i, o(r))); let h = ["", "==============\ud83d\udce3\u7cfb\u7edf\u901a\u77e5\ud83d\udce3=============="]; h.push(e), s && h.push(s), i && h.push(i), console.log(h.join("\n")), this.logs = this.logs.concat(h) } log(...t) { t.length > 0 && (this.logs = [...this.logs, ...t]), console.log(t.join(this.logSeparator)) } logErr(t, e) { const s = !this.isSurge() && !this.isQuanX() && !this.isLoon(); s ? this.log("", `\u2757\ufe0f${this.name}, \u9519\u8bef!`, t.stack) : this.log("", `\u2757\ufe0f${this.name}, \u9519\u8bef!`, t) } wait(t) { return new Promise(e => setTimeout(e, t)) } done(t = {}) { const e = (new Date).getTime(), s = (e - this.startTime) / 1e3; this.log("", `\ud83d\udd14${this.name}, \u7ed3\u675f! \ud83d\udd5b ${s} \u79d2`), this.log(), (this.isSurge() || this.isQuanX() || this.isLoon()) && $done(t) } }(t, e) }
