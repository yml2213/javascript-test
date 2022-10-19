/*
百佳优选  		cron 10 8,10,12 * * *  nnyx.js

baijia.axwes.top    36859884

========= 青龙--配置文件--贴心复制区域  ========= 
# 百佳优选
export bjyxck=' 账号 & 密码 ' 

多账号用 换行 或 @ 分割
tg频道: https://t.me/yml2213_tg  
*/

const $ = new Env("百佳优选")
check_utils('utils.js')
const ckName = 'bjyxck'
//---------------------------------------------------------
const notify = $.isNode() ? require("./sendNotify") : ""
const Notify = 1		 //0为关闭通知,1为打开通知,默认为1
let envSplitor = ["@", "\n"];
let ck = msg = res = result = ''
let host, hostname, httpRequest
let userCookie = process.env[ckName];
let userList = []
let userIdx = 0
let userCount = 0
let base = new Base64()
//---------------------------------------------------------


//---------------------------------------------------------

async function start() {

	for (let user of userList) {
		await user.login('登录')
		await user.lottery('抽奖')
		await user.user_info('用户名')
		await user.userindex('余额查询')
	}

}

class UserInfo {
	constructor(str) {
		this.index = ++userIdx
		try {
			this.ck = str.split('&')
			this.ip = this.ck[0]
			this.pa = this.ck[1]
			this.d = $.randomString(64, 'abcdefhijkmnprstwxyz2345678')
			this.c = `{"iv":"O2mzL1YQX+YARSVKF3\/+vg==","value":"pamPkk0Bgdrv0ec044zfqIq6piZlGpz4Bx8D5ZcXpfB7fF\/2VhE\/mkcOtxcIpsRB","mac":"${this.d}"}`
			this.cook = `laravel_session=${encodeURIComponent(base.encode(this.c))}`
			// console.log(this.cook);

		} catch (e) {

		}
	}
	async login(name) {
		let options = {
			method: "Post",
			url: `http://baijia.axwes.top:1003/login.html`,
			headers: {
				"X-Requested-With": "XMLHttpRequest",
				"Content-Type": "application/x-www-form-urlencoded; charset=UTF-8",
				'Cookie': 'laravel_session=eyJpdiI6IlJPbW5WZVM3ZUhMbjdTN1wvaTBZODZnPT0iLCJ2YWx1ZSI6IjZCcVNVZnYrTG9taDJ2cFNxSWNta2w0bzQrZklrVTZQd2JIeGFhXC9EXC9mRDFQNmV4UXBRWkJFUkVUV3hSbkYzMiIsIm1hYyI6ImI4M2E1ZjY4ZjY0OWNhZWFmYWFlN2EyM2VhZGFjMmEzMjU3YWRkZWUyZmRjYjRhMWIzOWYxZmE2NjRmMGRlNGYifQ%3D%3D',

			},
			body: `_token=ebwX9gFbg7IXn0mzypHBAqBgkCKWynr5s8nwgOzN&username=${this.ip}&password=${this.pa}`
		};

		let res = await login_Request(name, options);
		//console.log(options);
		// console.log(res.body);
		let result = JSON.parse(res.body)

		if (result.status == 0) {

			console.log(`账号 [${this.index}] ` + result.msg)
			this.y = res.headers['set-cookie'][1]
			this.x = res.headers['set-cookie'][0].split('=')[1].split(';')[0]
			// console.log(this.x);
			await wait(2)

		}
		if (result.status !== 0) console.log(`账号 [${this.index}] ` + result)

	}


	async userindex(name) {
		let options = {
			method: "get",
			url: `http://baijia.axwes.top:1003/user/withdraw.html`,
			headers: {
				'Cookie': this.y
			},
		};

		let result = await httpResult(name, options);
		if (result) {
			let x = result.match(/ <span id="userMoney">(\d+(\D+\d))/g)[1].split('>')[1]
			DoubleLog(`账号 [${this.index}]: ${this.urer_name} ${name}: ${x} 元`)
		}

	}

	async user_info(name) {
		let options = {
			method: "get",
			url: `http://baijia.axwes.top/user/index.html`,
			headers: {
				'Cookie': this.y
			},
		};

		let result = await httpResult(name, options);
		if (result) {
			this.urer_name = result.split('<span>账号：')[1].split('<')[0]
		}

	}

	async lottery(name) {
		let options = {
			method: "get",
			url: `http://baijia.axwes.top:1003/user/wheel/click`,
			headers: {
				'Cookie': this.y
			},
		};
		let result = await httpResult(name, options);
		if (result.state == 0) DoubleLog(`账号 [${this.index}]  ${name}: ${result.msg}`)
	}



}



!(async () => {
	if (!(await checkEnv())) return;
	if (userList.length > 0) {
		await start();
	}
	await SendMsg(msg);
})()
	.catch((e) => console.log(e))
	.finally(() => $.done())

///////////////////////////////////////////////////////////////////

// #region ********************************************************  固定代码  ********************************************************


// 变量检查与处理
async function checkEnv() {
	if (userCookie) {
		let e = envSplitor[0];
		for (let o of envSplitor)
			if (userCookie.indexOf(o) > -1) {
				e = o;
				break;
			}
		for (let n of userCookie.split(e)) n && userList.push(new UserInfo(n));
		userCount = userList.length;
	} else {
		console.log("未找到CK");
		return;
	}
	return console.log(`共找到${userCount}个账号`), !0;
}


// 发送消息
async function SendMsg(message) {
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

// 等待 X 秒
function wait(n) {
	return new Promise(function (resolve) {
		setTimeout(resolve, n * 1000);
	});
}

// 双平台log输出
function DoubleLog(data) {
	console.log(`    ${data}`);
	msg += `\n    ${data}`;
}

var request = require("request");

async function login_Request(name, options) {
	return new Promise((resolve) => {
		if (!name) {
			let tmp = arguments.callee.toString();
			let re = /function\s*(\w*)/i;
			let matches = re.exec(tmp);
			name = matches[1];
		}
		request(options, function (error, response) {
			if (error) throw new Error(error);
			// response.body
			// console.log(response.headers['set-cookie']);
			resolve(response);

		});
	});
}


// 网络请求   httpRequest
async function httpResult(name, options) {
	if (!name) {
		name = /function\s*(\w*)/i.exec(arguments.callee.toString())[1];
	}
	// DoubleLog(`\n开始 ${name}`);
	try {
		let result = await utils.httpRequest(name, options)
		if (result) return result
		else DoubleLog(`未知错误(1`);
	} catch (error) {
		console.log(error);
	}
}

// utils检查
async function check_utils(file_name) {
	await check(file_name)
	try {
		utils = require("./utils");
		return utils
	} catch (error) {
		console.log(error);
	}
	async function check(file_name) {
		const fs = require('fs')
		const path = require('path')
		dirPath = path.resolve(__dirname)
		// console.log(dirPath);
		let files = fs.readdirSync(dirPath)
		// console.log(files);
		if (files.indexOf(file_name) > -1) {
			console.log(`当前目录 [${dirPath}] 依赖 ${file_name} 文件状态正常!`)
			utils = require("./utils");
			return utils
		} else {
			console.log(`当前目录 [${dirPath}] 未找到 ${file_name} , 将下载到该目录!`)
			write_utils(file_name)
		}

		function write_utils(file_name) {
			var request = require('request');
			var options = {
				'method': 'GET',
				'url': 'https://raw.gh.fakev.cn/yml2213/javascript/master/utils.js',
				'headers': {
				}
			};
			request(options, function (error, response) {
				if (error) throw new Error(error);
				let text = response.body
				fs.writeFile(`${dirPath}/${file_name}`, text, `utf-8`, (err) => {
					if (err) {
						console.log(`目录 [${dirPath}]  ${file_name} 文件 写入失败`)
					}
					console.log(`\n目录 [${dirPath}]  ${file_name} 文件写入成功\n请再次运行脚本!\n请再次运行脚本!\n请再次运行脚本!`)

				})
			});
		}
	}

}

// // 精简 Env
// function Env(name, e) {
// 	class s {
// 		constructor(name) {
// 			this.env = name;
// 		}
// 	}
// 	return new (class {
// 		constructor(name) {
// 			(this.name = name),
// 				(this.logs = []),
// 				(this.startTime = new Date().getTime()),
// 				this.log(`\n🔔${this.name}, 开始!`);
// 		}
// 		isNode() {
// 			return "undefined" != typeof module && !!module.exports;
// 		}

// 		log(...name) {
// 			name.length > 0 && (this.logs = [...this.logs, ...name]),
// 				console.log(name.join(this.logSeparator));
// 		}

// 		done() {
// 			const e = new Date().getTime(),
// 				s = (e - this.startTime) / 1e3;
// 			this.log(`\n🔔${this.name}, 结束! 🕛 ${s} 秒`);
// 		}
// 	})(name, e);
// }


function Base64() { _keyStr = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=", this.encode = function (a) { var f, b, c, i, j, g, d, h = "", e = 0; for (a = _utf8_encode(a); e < a.length;)f = a.charCodeAt(e++), b = a.charCodeAt(e++), c = a.charCodeAt(e++), i = f >> 2, j = (3 & f) << 4 | b >> 4, g = (15 & b) << 2 | c >> 6, d = 63 & c, isNaN(b) ? g = d = 64 : isNaN(c) && (d = 64), h = h + _keyStr.charAt(i) + _keyStr.charAt(j) + _keyStr.charAt(g) + _keyStr.charAt(d); return h }, this.decode = function (a) { var g, h, i, j, e, c, f, d = "", b = 0; for (a = a.replace(/[^A-Za-z0-9\+\/\=]/g, ""); b < a.length;)j = _keyStr.indexOf(a.charAt(b++)), e = _keyStr.indexOf(a.charAt(b++)), c = _keyStr.indexOf(a.charAt(b++)), f = _keyStr.indexOf(a.charAt(b++)), g = j << 2 | e >> 4, h = (15 & e) << 4 | c >> 2, i = (3 & c) << 6 | f, d += String.fromCharCode(g), 64 != c && (d += String.fromCharCode(h)), 64 != f && (d += String.fromCharCode(i)); return _utf8_decode(d) }, _utf8_encode = function (c) { c = c.replace(/\r\n/g, "\n"); for (var b = "", d = 0; d < c.length; d++) { var a = c.charCodeAt(d); a < 128 ? b += String.fromCharCode(a) : a > 127 && a < 2048 ? (b += String.fromCharCode(a >> 6 | 192), b += String.fromCharCode(63 & a | 128)) : (b += String.fromCharCode(a >> 12 | 224), b += String.fromCharCode(a >> 6 & 63 | 128), b += String.fromCharCode(63 & a | 128)) } return b }, _utf8_decode = function (c) { for (var d = "", a = 0, b = c1 = c2 = 0; a < c.length;)(b = c.charCodeAt(a)) < 128 ? (d += String.fromCharCode(b), a++) : b > 191 && b < 224 ? (c2 = c.charCodeAt(a + 1), d += String.fromCharCode((31 & b) << 6 | 63 & c2), a += 2) : (c2 = c.charCodeAt(a + 1), c3 = c.charCodeAt(a + 2), d += String.fromCharCode((15 & b) << 12 | (63 & c2) << 6 | 63 & c3), a += 3); return d } }


function Env(e, s) {
	return "undefined" != typeof process && JSON.stringify(process.env).indexOf("GITHUB") > -1 && process.exit(0), new class {
		constructor(e, s) {
			this.name = e, this.notifyStr = "", this.notifyFlag = !1, this.startTime = (new Date).getTime(), Object.assign(this, s), console.log(`${this.name} 开始运行：
`)
		} isNode() { return "undefined" != typeof module && !!module.exports } isQuanX() { return "undefined" != typeof $task } isSurge() { return "undefined" != typeof $httpClient && "undefined" == typeof $loon } isLoon() { return "undefined" != typeof $loon } getdata(e) { let s = this.getval(e); if (/^@/.test(e)) { let [, i, n] = /^@(.*?)\.(.*?)$/.exec(e), r = i ? this.getval(i) : ""; if (r) try { let o = JSON.parse(r); s = o ? this.lodash_get(o, n, "") : s } catch (a) { s = "" } } return s } setdata(e, s) { let i = !1; if (/^@/.test(s)) { let [, n, r] = /^@(.*?)\.(.*?)$/.exec(s), o = this.getval(n); try { let a = JSON.parse(n ? "null" === o ? null : o || "{}" : "{}"); this.lodash_set(a, r, e), i = this.setval(JSON.stringify(a), n) } catch (l) { let h = {}; this.lodash_set(h, r, e), i = this.setval(JSON.stringify(h), n) } } else i = this.setval(e, s); return i } getval(e) { return this.isSurge() || this.isLoon() ? $persistentStore.read(e) : this.isQuanX() ? $prefs.valueForKey(e) : this.isNode() ? (this.data = this.loaddata(), this.data[e]) : this.data && this.data[e] || null } setval(e, s) { return this.isSurge() || this.isLoon() ? $persistentStore.write(e, s) : this.isQuanX() ? $prefs.setValueForKey(e, s) : this.isNode() ? (this.data = this.loaddata(), this.data[s] = e, this.writedata(), !0) : this.data && this.data[s] || null } send(e, s, i = () => { }) { if ("get" != e && "post" != e && "put" != e && "delete" != e) { console.log(`无效的http方法：${e}`); return } if ("get" == e && s.headers ? (delete s.headers["Content-Type"], delete s.headers["Content-Length"]) : s.body && s.headers && !s.headers["Content-Type"] && (s.headers["Content-Type"] = "application/x-www-form-urlencoded"), this.isSurge() || this.isLoon()) { this.isSurge() && this.isNeedRewrite && (s.headers = s.headers || {}, Object.assign(s.headers, { "X-Surge-Skip-Scripting": !1 })); let n = { method: e, url: s.url, headers: s.headers, timeout: s.timeout, data: s.body }; "get" == e && delete n.data, $axios(n).then(e => { let { status: s, request: n, headers: r, data: o } = e; i(null, n, { statusCode: s, headers: r, body: o }) }).catch(e => console.log(e)) } else if (this.isQuanX()) s.method = e.toUpperCase(), this.isNeedRewrite && (s.opts = s.opts || {}, Object.assign(s.opts, { hints: !1 })), $task.fetch(s).then(e => { let { statusCode: s, request: n, headers: r, body: o } = e; i(null, n, { statusCode: s, headers: r, body: o }) }, e => i(e)); else if (this.isNode()) { this.got = this.got ? this.got : require("got"); let { url: r, ...o } = s; this.instance = this.got.extend({ followRedirect: !1 }), this.instance[e](r, o).then(e => { let { statusCode: s, request: n, headers: r, body: o } = e; i(null, n, { statusCode: s, headers: r, body: o }) }, e => { let { message: s, request: n, response: r } = e; i(s, n, r) }) } } time(e, s = null) { let i = s ? new Date(s) : new Date, n = { "M+": i.getMonth() + 1, "d+": i.getDate(), "h+": i.getHours(), "m+": i.getMinutes(), "s+": i.getSeconds(), "q+": Math.floor((i.getMonth() + 3) / 3), S: this.padStr(i.getMilliseconds(), 3) }; for (let r in /(y+)/.test(e) && (e = e.replace(RegExp.$1, (i.getFullYear() + "").substr(4 - RegExp.$1.length))), n) RegExp("(" + r + ")").test(e) && (e = e.replace(RegExp.$1, 1 == RegExp.$1.length ? n[r] : ("00" + n[r]).substr(("" + n[r]).length))); return e } async showmsg() { if (!this.notifyFlag || !this.notifyStr) return; let e = this.name + " 运行通知\n\n" + this.notifyStr; if ($.isNode()) { var s = require("./sendNotify"); console.log("\n============== 推送 =============="), await s.sendNotify(this.name, e) } else this.msg(e) } logAndNotify(e, s = !0) { s && (this.notifyFlag = !0), console.log(e), this.notifyStr += e, this.notifyStr += "\n" } logAndNotifyWithTime(e, s = !0) { s && (this.notifyFlag = !0); let i = "[" + this.time("hh:mm:ss.S") + "]" + e; console.log(i), this.notifyStr += i, this.notifyStr += "\n" } logWithTime(e) { console.log("[" + this.time("hh:mm:ss.S") + "]" + e) } msg(e = t, s = "", i = "", n) { let r = e => { if (!e) return e; if ("string" == typeof e) return this.isLoon() ? e : this.isQuanX() ? { "open-url": e } : this.isSurge() ? { url: e } : void 0; if ("object" == typeof e) { if (this.isLoon()) { let s; return { openUrl: e.openUrl || e.url || e["open-url"], mediaUrl: e.mediaUrl || e["media-url"] } } if (this.isQuanX()) { let i; return { "open-url": e["open-url"] || e.url || e.openUrl, "media-url": e["media-url"] || e.mediaUrl } } if (this.isSurge()) return { url: e.url || e.openUrl || e["open-url"] } } }; this.isMute || (this.isSurge() || this.isLoon() ? $notification.post(e, s, i, r(n)) : this.isQuanX() && $notify(e, s, i, r(n))); let o = ["", "============== 系统通知 =============="]; o.push(e), s && o.push(s), i && o.push(i), console.log(o.join("\n")) } getMin(e, s) { return e < s ? e : s } getMax(e, s) { return e < s ? s : e } padStr(e, s, i = "0") { let n = String(e), r = s > n.length ? s - n.length : 0, o = ""; for (let a = 0; a < r; a++)o += i; return o + n } json2str(e, s, i = !1) { let n = []; for (let r of Object.keys(e).sort()) { let o = e[r]; o && i && (o = encodeURIComponent(o)), n.push(r + "=" + o) } return n.join(s) } str2json(e, s = !1) { let i = {}; for (let n of e.split("&")) { if (!n) continue; let r = n.indexOf("="); if (-1 == r) continue; let o = n.substr(0, r), a = n.substr(r + 1); s && (a = decodeURIComponent(a)), i[o] = a } return i } randomPattern(e, s = "abcdef0123456789") { let i = ""; for (let n of e) "x" == n ? i += s.charAt(Math.floor(Math.random() * s.length)) : "X" == n ? i += s.charAt(Math.floor(Math.random() * s.length)).toUpperCase() : i += n; return i } randomString(e, s = "abcdef0123456789") { let i = ""; for (let n = 0; n < e; n++)i += s.charAt(Math.floor(Math.random() * s.length)); return i } randomList(e) { return e[Math.floor(Math.random() * e.length)] } wait(e) { return new Promise(s => setTimeout(s, e)) } async done(e = {}) {
			await this.showmsg(); let s = (new Date).getTime(), i = (s - this.startTime) / 1e3; console.log(`
${this.name} 运行结束，共运行了 ${i} 秒！`), (this.isSurge() || this.isQuanX() || this.isLoon()) && $done(e)
		}
	}(e, s)
}

 //#endregion
