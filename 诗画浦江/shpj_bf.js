/*
诗画浦江  app

cron 10 8,10,12 * * *  shpj.js



========= 青龙--配置文件-贴心复制区域  ========= 
# 诗画浦江
export shpj=' phone# pwd ' 

多账号用 换行 或 @ 分割, 报错的自己下载 utils.js, 放在脚本同级目录下

tg频道: https://t.me/yml2213_tg  
*/
const $ = new Env("诗画浦江");
check_utils('utils.js')
const utils = require("./utils");
const ckName = 'shpj'
const fs = require('fs')
const notify = $.isNode() ? require("./sendNotify") : "";

let httpResult, httpReq, httpResp
let userCookie = process.env[ckName];
console.log(userCookie);
let userList = []
let userIdx = 0
let userCount = 0

let app_id = 14

let text = ''

///////////////////////////////////////////////////////////////////

async function start() {
	console.log('\n================== Login ==================\n')
	taskall = []
	for (let user of userList) {
		taskall.push(user.login())
	}
	await Promise.all(taskall)


	taskall = []
	for (let user of userList) {
		taskall.push(user.sign())
	}
	await Promise.all(taskall)

	console.log('\n================== Prize ==================\n')
	taskall = []
	for (let user of userList) {
		taskall.push(user.prizeLog())
	}
	await Promise.all(taskall)

}


class UserInfo {
	constructor(str) {
		this.index = ++userIdx
		this.ck = str.split('&')
		this.xs = this.ck[0]
		this.xr = this.ck[1]
		this.salt = 'FR*r!isE5W'
		this.ts = utils.ts13()
		this.id = app_id
	}

	async signin() { //签到
		try {
			let url = `https://vapp.tmuyun.com/api/user_mumber/sign`
			let body = `username=${this.ip}&password=${this.pa}`
			let h = {
				"X-SESSION-ID": this.xs,
				"X-REQUEST-ID": this.xr,
				"X-TIMESTAMP": this.ts,
				"X-SIGNATURE": this.get_sign('/api/user_mumber/sign'),
				"Cache-Control": `no-cache`,
				"X-TENANT-ID": `14`,
				Host: host,
			}
			let urlObject = popu(url, h, body)
			await httpRequest('post', urlObject)
			let result = httpResult;
			if (result.code == 0) this.token = result.data.token, await this.info()
			if (result.code !== 0) console.log(`用户[${this.index}] ` + result.msg)
		} catch (e) {
		} finally {
			return Promise.resolve(1);
		}
	}
	async info() {
		try {
			let url = `https://api.suofeitejiudianzgt.com//info`
			let body = ``
			let h = { 'Authorization': 'Bearer ' + this.token }
			let urlObject = popu(url, h, body)
			await httpRequest('get', urlObject)
			let result = httpResult;
			if (result.code == 0) this.phone = result.data.phone, await this.getcode(), await this.total()
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
			if (result.code == 0) this.code = result.data.code
		} catch (e) {
		} finally {
			return Promise.resolve(1);
		}
	}
	async total() {
		try {
			let url = `https://api.suofeitejiudianzgt.com//total`
			let body = ``
			let h = { 'Authorization': 'Bearer ' + this.token }
			let urlObject = popu(url, h, body)
			await httpRequest('get', urlObject)
			let result = httpResult;
			if (result.code == 0) console.log(`用户[${this.index}] 绑定 ${this.phone} 邀请码 ${this.code} 余额 ${result.data.total}`)
			if (result.code !== 0) console.log(`用户[${this.index}] ` + result.msg)
		} catch (e) {
		} finally {
			return Promise.resolve(1);
		}
	}
	async get_sign(path) {
		let _data = `${path}&&${this.xs}&&${this.xr}&&${this.ts}&&${this.salt}&&${this.id}`;
		sign = ''
		sign = sha256_Encrypt(_data)
	}

	async sign() {
		try {
			let url = `https://api.suofeitejiudianzgt.com//sign`
			let body = `integral=0`
			let h = { 'Authorization': 'Bearer ' + this.token }
			let urlObject = popu(url, h, body)
			await httpRequest('post', urlObject)
			let result = httpResult;
			if (result.code == 0) console.log(`用户[${this.index}] ${result.data}`)
			if (result.code !== 0) console.log(`用户[${this.index}] ` + result.msg)
		} catch (e) {
		} finally {
			return Promise.resolve(1);
		}
	}

	async prizeLog() {
		try {
			let url = `https://api.suofeitejiudianzgt.com//prizeLog`
			let body = `prize=7&integral=3.00&remarks=七等奖`
			let h = { 'Authorization': 'Bearer ' + this.token }
			let urlObject = popu(url, h, body)
			await httpRequest('post', urlObject)
			let result = httpResult;
			if (result.code == 0) console.log(`用户[${this.index}] ${result.msg}`)
			if (result.code !== 0) console.log(`用户[${this.index}] ` + result.msg)
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
	if (!(await checkEnv())) return;
	if (userList.length > 0) {
		await start();
	}
})()
	.catch((e) => console.log(e))
	.finally(() => $.done())

///////////////////////////////////////////////////////////////////


function checkEnv() {
	if (userCookie) {
		for (let userCookies of userCookie) {
			if (userCookies) userList.push(new UserInfo(userCookies))
		}
		userCount = userList.length
	} else {
		console.log(`未找到CK`)
		return false;
	}

	console.log(`\n共找到${userCount}个账号`)
	return true
}

////////////////////////////////////////////////////////////////////
function popu(url, h, body = '') {
	let host = url.replace('//', '/').split('/')[1]
	let urlObject = {
		url: url,
		headers: h,
		timeout: 5000,
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



function check_utils(file_name) {
	const fs = require('fs')
	const path = require('path')
	dirPath = path.resolve(__dirname)
	// console.log(dirPath);
	let files = fs.readdirSync(dirPath)
	// console.log(files);
	if (files.indexOf(file_name) > -1) {
		console.log(`当前目录 [${dirPath}] 依赖 ${file_name} 文件状态正常!`)
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
			text = response.body
			fs.writeFile(`${dirPath}/${file_name}`, text, `utf-8`, (err) => {
				if (err) {
					console.log(`目录 [${dirPath}]  ${file_name} 文件 写入失败`)
				}
				console.log(`目录 [${dirPath}]  ${file_name} 文件写入成功`)
			})
		});
	}
}




















////////////////////////////////////////////////////////////////////
function Env(e, s) {
	return "undefined" != typeof process && JSON.stringify(process.env).indexOf("GITHUB") > -1 && process.exit(0), new class {
		constructor(e, s) {
			this.name = e, this.notifyStr = "", this.notifyFlag = !1, this.startTime = (new Date).getTime(), Object.assign(this, s), console.log(`${this.name} 开始运行：
`)
		} isNode() { return "undefined" != typeof module && !!module.exports } isQuanX() { return "undefined" != typeof $task } isSurge() { return "undefined" != typeof $httpClient && "undefined" == typeof $loon } isLoon() { return "undefined" != typeof $loon } getdata(e) { let s = this.getval(e); if (/^@/.test(e)) { let [, i, n] = /^@(.*?)\.(.*?)$/.exec(e), r = i ? this.getval(i) : ""; if (r) try { let o = JSON.parse(r); s = o ? this.lodash_get(o, n, "") : s } catch (a) { s = "" } } return s } setdata(e, s) { let i = !1; if (/^@/.test(s)) { let [, n, r] = /^@(.*?)\.(.*?)$/.exec(s), o = this.getval(n); try { let a = JSON.parse(n ? "null" === o ? null : o || "{}" : "{}"); this.lodash_set(a, r, e), i = this.setval(JSON.stringify(a), n) } catch (l) { let h = {}; this.lodash_set(h, r, e), i = this.setval(JSON.stringify(h), n) } } else i = this.setval(e, s); return i } getval(e) { return this.isSurge() || this.isLoon() ? $persistentStore.read(e) : this.isQuanX() ? $prefs.valueForKey(e) : this.isNode() ? (this.data = this.loaddata(), this.data[e]) : this.data && this.data[e] || null } setval(e, s) { return this.isSurge() || this.isLoon() ? $persistentStore.write(e, s) : this.isQuanX() ? $prefs.setValueForKey(e, s) : this.isNode() ? (this.data = this.loaddata(), this.data[s] = e, this.writedata(), !0) : this.data && this.data[s] || null } send(e, s, i = () => { }) { if ("get" != e && "post" != e && "put" != e && "delete" != e) { console.log(`无效的http方法：${e}`); return } if ("get" == e && s.headers ? (delete s.headers["Content-Type"], delete s.headers["Content-Length"]) : s.body && s.headers && !s.headers["Content-Type"] && (s.headers["Content-Type"] = "application/x-www-form-urlencoded"), this.isSurge() || this.isLoon()) { this.isSurge() && this.isNeedRewrite && (s.headers = s.headers || {}, Object.assign(s.headers, { "X-Surge-Skip-Scripting": !1 })); let n = { method: e, url: s.url, headers: s.headers, timeout: s.timeout, data: s.body }; "get" == e && delete n.data, $axios(n).then(e => { let { status: s, request: n, headers: r, data: o } = e; i(null, n, { statusCode: s, headers: r, body: o }) }).catch(e => console.log(e)) } else if (this.isQuanX()) s.method = e.toUpperCase(), this.isNeedRewrite && (s.opts = s.opts || {}, Object.assign(s.opts, { hints: !1 })), $task.fetch(s).then(e => { let { statusCode: s, request: n, headers: r, body: o } = e; i(null, n, { statusCode: s, headers: r, body: o }) }, e => i(e)); else if (this.isNode()) { this.got = this.got ? this.got : require("got"); let { url: r, ...o } = s; this.instance = this.got.extend({ followRedirect: !1 }), this.instance[e](r, o).then(e => { let { statusCode: s, request: n, headers: r, body: o } = e; i(null, n, { statusCode: s, headers: r, body: o }) }, e => { let { message: s, request: n, response: r } = e; i(s, n, r) }) } } time(e, s = null) { let i = s ? new Date(s) : new Date, n = { "M+": i.getMonth() + 1, "d+": i.getDate(), "h+": i.getHours(), "m+": i.getMinutes(), "s+": i.getSeconds(), "q+": Math.floor((i.getMonth() + 3) / 3), S: this.padStr(i.getMilliseconds(), 3) }; for (let r in /(y+)/.test(e) && (e = e.replace(RegExp.$1, (i.getFullYear() + "").substr(4 - RegExp.$1.length))), n) RegExp("(" + r + ")").test(e) && (e = e.replace(RegExp.$1, 1 == RegExp.$1.length ? n[r] : ("00" + n[r]).substr(("" + n[r]).length))); return e } async showmsg() { if (!this.notifyFlag || !this.notifyStr) return; let e = this.name + " 运行通知\n\n" + this.notifyStr; if ($.isNode()) { var s = require("../sendNotify"); console.log("\n============== 推送 =============="), await s.sendNotify(this.name, e) } else this.msg(e) } logAndNotify(e, s = !0) { s && (this.notifyFlag = !0), console.log(e), this.notifyStr += e, this.notifyStr += "\n" } logAndNotifyWithTime(e, s = !0) { s && (this.notifyFlag = !0); let i = "[" + this.time("hh:mm:ss.S") + "]" + e; console.log(i), this.notifyStr += i, this.notifyStr += "\n" } logWithTime(e) { console.log("[" + this.time("hh:mm:ss.S") + "]" + e) } msg(e = t, s = "", i = "", n) { let r = e => { if (!e) return e; if ("string" == typeof e) return this.isLoon() ? e : this.isQuanX() ? { "open-url": e } : this.isSurge() ? { url: e } : void 0; if ("object" == typeof e) { if (this.isLoon()) { let s; return { openUrl: e.openUrl || e.url || e["open-url"], mediaUrl: e.mediaUrl || e["media-url"] } } if (this.isQuanX()) { let i; return { "open-url": e["open-url"] || e.url || e.openUrl, "media-url": e["media-url"] || e.mediaUrl } } if (this.isSurge()) return { url: e.url || e.openUrl || e["open-url"] } } }; this.isMute || (this.isSurge() || this.isLoon() ? $notification.post(e, s, i, r(n)) : this.isQuanX() && $notify(e, s, i, r(n))); let o = ["", "============== 系统通知 =============="]; o.push(e), s && o.push(s), i && o.push(i), console.log(o.join("\n")) } getMin(e, s) { return e < s ? e : s } getMax(e, s) { return e < s ? s : e } padStr(e, s, i = "0") { let n = String(e), r = s > n.length ? s - n.length : 0, o = ""; for (let a = 0; a < r; a++)o += i; return o + n } json2str(e, s, i = !1) { let n = []; for (let r of Object.keys(e).sort()) { let o = e[r]; o && i && (o = encodeURIComponent(o)), n.push(r + "=" + o) } return n.join(s) } str2json(e, s = !1) { let i = {}; for (let n of e.split("&")) { if (!n) continue; let r = n.indexOf("="); if (-1 == r) continue; let o = n.substr(0, r), a = n.substr(r + 1); s && (a = decodeURIComponent(a)), i[o] = a } return i } randomPattern(e, s = "abcdef0123456789") { let i = ""; for (let n of e) "x" == n ? i += s.charAt(Math.floor(Math.random() * s.length)) : "X" == n ? i += s.charAt(Math.floor(Math.random() * s.length)).toUpperCase() : i += n; return i } randomString(e, s = "abcdef0123456789") { let i = ""; for (let n = 0; n < e; n++)i += s.charAt(Math.floor(Math.random() * s.length)); return i } randomList(e) { return e[Math.floor(Math.random() * e.length)] } wait(e) { return new Promise(s => setTimeout(s, e)) } async done(e = {}) {
			await this.showmsg(); let s = (new Date).getTime(), i = (s - this.startTime) / 1e3; console.log(`
${this.name} 运行结束，共运行了 ${i} 秒！`), (this.isSurge() || this.isQuanX() || this.isLoon()) && $done(e)
		}
	}(e, s)
}