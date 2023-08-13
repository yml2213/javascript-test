/*
@jack 索菲特批量注册  
安装  fs  依赖
账号自动写入到同目录 asft.txt文件里面
自动创建文件  不需要新建
*/
const $ = new Env("索菲特批量注册");
let envSplitor = ['@', '\n']
let httpResult, httpReq, httpResp
const fs = require('fs')
let ckName = 'x'
let userCookie = ($.isNode() ? process.env[ckName] : $.getdata(ckName)) || 'x';
let userList = []
let userIdx = 0
let userCount = 0
let xc = 0

let num = 3  //注册数量  最多一次100个  //偶尔会停不下来 会在超出设定数量后 强制停止

let codex = '723018'  //  提供一个初始得邀请码  
///////////////////////////////////////////////////////////////////

class UserInfo {
	constructor(str) {
		this.index = ++userIdx
		try {
			this.ck = str.split('#')
			this.ip = this.ck[0]
			this.pa = this.ck[1]
		} catch (e) {

		}
	}

	async login() {
		try {
			let url = `https://api.suofeitejiudianzgt.com//login`
			let body = `username=${this.a}&password=${this.b}`
			let h = {}
			let urlObject = popu(url, h, body)
			await httpRequest('post', urlObject)
			let result = httpResult;
			if (result.code == 0) this.token = result.data.token, await this.getcode()
			if (result.code !== 0) console.log(`用户[${this.index}] ` + result.msg)
		} catch (e) {
		} finally {
			return Promise.resolve(1);
		}
	}

	async getcode() {
		try {
			let url = `https://api.suofeitejiudianzgt.com//getcode`
			let body = ``
			let h = { 'Authorization': 'Bearer ' + this.token }
			let urlObject = popu(url, h, body)
			await httpRequest('get', urlObject)
			let result = httpResult;
			if (result.code == 0) {
				this.code = result.data.code
				await this.verify()
			}
		} catch (e) {
		} finally {
			return Promise.resolve(1);
		}
	}
	async updata(a) {
		var content = a
		try {
			//var content = '\n'+content
			var content = `${content}\n`
			console.log(`写入 ${content}`)
			fs.appendFile('./asft.txt', content, { flag: 'a+' }, err => {
				if (err) {
					console.error(err)
					return
				}
			})
		} catch (e) {
		} finally {
			return Promise.resolve(1);
		}
	}

	async verify() {
		try {
			let url = `https://api.suofeitejiudianzgt.com//verify`
			let body = ``
			let h = { 'Authorization': 'Bearer ' + this.token }
			let urlObject = popu(url, h, body)
			await httpRequest('get', urlObject)
			let result = httpResult;
			if (result.code == 0) this.x = result.data.captcha, await this.register()
		} catch (e) {
		} finally {
			return Promise.resolve(1);
		}
	}

	async register() {
		try {
			if (xc == 0) this.code = codex
			if (xc > 0) this.code = this.code
			console.log(`使用邀请码 ${this.code} 注册`)
			let url = `https://api.suofeitejiudianzgt.com//register`
			this.a = getphone()
			this.b = $.randomString(8, '1234567890')
			let body = `username=${this.a}&captcha=${this.x}&password=${this.b}&password2=${this.b}&code=${this.code}`
			let h = { 'Authorization': 'Bearer ' + this.token }
			let urlObject = popu(url, h, body)
			await httpRequest('post', urlObject)
			let result = httpResult;
			if (result.code == 0) {
				let x = 1
				xc += x
				console.log(`\n注册成功第` + xc + `次`)
				let data = `${this.a}#${this.b}`
				await this.updata(data)
				if (xc >= num) this.fx = 1
				await this.login()
			} else console.log(result)
		} catch (e) {
		} finally {
			return Promise.resolve(1);
		}
	}
	async registerx() {
		try {
			let qq = [...Array(100)].map((a, index) => index + 1)
			for (let s of qq) {
				await this.verify()
				if (this.fx == 1) {
					console.log(`强行结束`)
					return false
				}
			}
		} catch (e) {
		} finally {
			return Promise.resolve(1);
		}
	}

	///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
	///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
	///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////


}

!(async () => {
	if (typeof $request !== "undefined") {
		await GetRewrite()
	} else {
		if (!(await checkEnv())) return;
		if (userList.length > 0) {
			console.log('\n================== Login ==================\n')
			for (let user of userList) {
				await user.registerx()
			}
		}
	}
})()
	.catch((e) => console.log(e))
	.finally(() => $.done())

///////////////////////////////////////////////////////////////////
async function GetRewrite() {

}
// 随机手机号

async function checkEnv() {
	if (userCookie) {
		let splitor = envSplitor[0];
		for (let sp of envSplitor) {
			if (userCookie.indexOf(sp) > -1) {
				splitor = sp;
				break;
			}
		}
		for (let userCookies of userCookie.split(splitor)) {
			if (userCookies)
				userList.push(new UserInfo(userCookies))

		}
		userCount = userList.length
	} else {
	}

	console.log(`找到${userCount}个账号`)


	return true
}

////////////////////////////////////////////////////////////////////
function popu(url, h, body = '') {
	let host = url.replace('//', '/').split('/')[1]
	let urlObject = {
		url: url,
		headers: h,
		timeout: 35000,
	}
	if (body) {
		urlObject.body = body
	}

	return urlObject;
}


async function httpRequest(method, url) {
	httpResult = null, httpReq = null, httpResp = null;
	return new Promise((resolve) => {
		$.send(method, url, async (err, req, resp) => {
			try {
				httpReq = req;
				httpResp = resp;
				if (err) {
				} else {
					if (resp.body) {
						if (typeof resp.body == "object") {
							httpResult = resp.body;
						} else {
							try {
								httpResult = JSON.parse(resp.body);
							} catch (e) {
								httpResult = resp.body;
							}
						}
					}
				}
			} catch (e) {
				console.log(e);
			} finally {
				resolve();
			}
		});
	});
}
function getphone() {
	let prefixArray = new Array("130", "131", "132", "133", "135", "136", "137", "138", "139", "151", "152", "158", "181", "187", "189");
	let i = parseInt(prefixArray.length * Math.random());
	let prefix = prefixArray[i];
	for (let j = 0; j < 8; j++) {
		prefix = prefix + Math.floor(Math.random() * 10);
	}
	return prefix;
}

function Base64() { _keyStr = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=", this.encode = function (a) { var f, b, c, i, j, g, d, h = "", e = 0; for (a = _utf8_encode(a); e < a.length;)f = a.charCodeAt(e++), b = a.charCodeAt(e++), c = a.charCodeAt(e++), i = f >> 2, j = (3 & f) << 4 | b >> 4, g = (15 & b) << 2 | c >> 6, d = 63 & c, isNaN(b) ? g = d = 64 : isNaN(c) && (d = 64), h = h + _keyStr.charAt(i) + _keyStr.charAt(j) + _keyStr.charAt(g) + _keyStr.charAt(d); return h }, this.decode = function (a) { var g, h, i, j, e, c, f, d = "", b = 0; for (a = a.replace(/[^A-Za-z0-9\+\/\=]/g, ""); b < a.length;)j = _keyStr.indexOf(a.charAt(b++)), e = _keyStr.indexOf(a.charAt(b++)), c = _keyStr.indexOf(a.charAt(b++)), f = _keyStr.indexOf(a.charAt(b++)), g = j << 2 | e >> 4, h = (15 & e) << 4 | c >> 2, i = (3 & c) << 6 | f, d += String.fromCharCode(g), 64 != c && (d += String.fromCharCode(h)), 64 != f && (d += String.fromCharCode(i)); return _utf8_decode(d) }, _utf8_encode = function (c) { c = c.replace(/\r\n/g, "\n"); for (var b = "", d = 0; d < c.length; d++) { var a = c.charCodeAt(d); a < 128 ? b += String.fromCharCode(a) : a > 127 && a < 2048 ? (b += String.fromCharCode(a >> 6 | 192), b += String.fromCharCode(63 & a | 128)) : (b += String.fromCharCode(a >> 12 | 224), b += String.fromCharCode(a >> 6 & 63 | 128), b += String.fromCharCode(63 & a | 128)) } return b }, _utf8_decode = function (c) { for (var d = "", a = 0, b = c1 = c2 = 0; a < c.length;)(b = c.charCodeAt(a)) < 128 ? (d += String.fromCharCode(b), a++) : b > 191 && b < 224 ? (c2 = c.charCodeAt(a + 1), d += String.fromCharCode((31 & b) << 6 | 63 & c2), a += 2) : (c2 = c.charCodeAt(a + 1), c3 = c.charCodeAt(a + 2), d += String.fromCharCode((15 & b) << 12 | (63 & c2) << 6 | 63 & c3), a += 3); return d } }
////////////////////////////////////////////////////////////////////
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