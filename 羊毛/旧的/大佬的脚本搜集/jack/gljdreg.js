/*

随机获取手机号 密码自己设置

账号密码会在运行结束后打印出来 

一个ip可以免费使用20次获取验证码

*/
const $ = new Env("酒店-注册机");
let envSplitor = ["@"];
let httpResult, httpReq, httpResp;

let savenum = "20"; //注册数量

let regcode = "7f8350"; //邀请码

let pw = "gljd123654"; //密码

let userCookie = "1";
let userList = [];
let userIdx = 0;
let userCount = 0;
let regid = [];
///////////////////////////////////////////////////////////////////
class UserInfo {
	constructor(a) {
		(this.index = ++userIdx),
			(this.name = this.index),
			(this.valid = !1),
			(this.cFlag = !0);
		try {
			(this.ck = a), (this.ckValid = !0);
		} catch (b) { }
	}
	async xbag() {
		try {
			let b;
			await httpRequest(
				"post",
				populateUrlObject(
					"http://www.bhshare.cn/imgcode/",
					`token=free&uri=${this.xurl}&type=online`
				)
			);
			let a = httpResult;
			(this.t = a.times),
				(this.d = a.data),
				console.log(`剩余对接次数 ${this.t} 对接获取的验证码 ${this.d}`);
		} catch (c) {
		} finally {
			return Promise.resolve(1);
		}
	}
	async regx() {
		try {
			let b;
			await httpRequest(
				"get",
				popu("https://app.gelinjiuidnaq.com/api/v1/captcha?", "")
			);
			let a = httpResult;
			(this.xurl = encodeURIComponent(a.base64)), (this.id = a.id);
		} catch (c) {
		} finally {
			return Promise.resolve(1);
		}
	}
	async reg() {
		try {
			for (let a = 0; a < savenum; a++)
				if (
					((this.mob = getMoble()),
						await this.regx(),
						await this.xbag(),
						await this.regcheck(),
						this.t <= 2)
				) {
					console.log(`次数已经快没了`);
					break;
				}
		} catch (b) {
		} finally {
			return Promise.resolve(1);
		}
	}
	async regcheck() {
		try {
			let b;
			await httpRequest(
				"post",
				popuxt(
					"https://app.gelinjiuidnaq.com/api/v1/user/register",
					`{"captcha_code":"${this.d}","captcha_id":"${this.id}","password":"${pw}","reg_code":"${regcode}","tel":"${this.mob}"}`
				)
			);
			let a = httpResult;
			3600 == a.expire_sec
				? (console.log(`${this.mob} 注册成功`), regid.push(`${this.mob}#${pw}`))
				: console.log(`${this.mob} ${JSON.stringify(a.msg)}`);
		} catch (c) {
		} finally {
			return Promise.resolve(1);
		}
	}
}

async function git() { }
async function checkEnv() {
	if (userCookie) {
		let a = envSplitor[0];
		for (let b of envSplitor)
			if (userCookie.indexOf(b) > -1) {
				a = b;
				break;
			}
		for (let c of userCookie.split(a)) c && userList.push(new UserInfo(c));
		userCount = userList.length;
	} else {
		console.log("\u672A\u627E\u5230CK");
		return;
	}
	return !0;
}
function populateUrlObject(a, b = "") {
	let d = a.replace("//", "/").split("/")[1],
		c = {
			url: a,
			headers: { "Content-Type": "application/x-www-form-urlencoded", Host: d },
			timeout: 5e3,
		};
	return b && (c.body = b), c;
}
function popu(a, b = "") {
	a.replace("//", "/").split("/")[1];
	let c = {
		url: a,
		headers: {
			Host: "app.xilaidengjiuag.com",
			"Access-Control_Allow_Origin": "*",
			Origin: "https://app.xilaidengjiudiana.com",
			t: "1661138634037",
			Connection: "keep-alive",
			Accept: "*/*",
			"User-Agent":
				"Mozilla/5.0 (iPhone; CPU iPhone OS 14_8 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/14.0 Mobile/15E148 Safari/604.1",
			Referer: "https://app.xilaidengjiudiana.com/",
			"Accept-Language": "zh-cn",
			"Accept-Encoding": "gzip, deflate, br",
		},
		timeout: 5e3,
	};
	return b && (c.body = b), c;
}
function popuxt(a, b = "") {
	a.replace("//", "/").split("/")[1];
	let c = {
		url: a,
		headers: {
			Host: "app.xilaidengjiuag.com",
			Accept: "*/*",
			"Accept-Encoding": "gzip, deflate, br",
			"Accept-Language": "zh-cn",
			"Content-Type": "application/json; charset=utf-8",
			Origin: "https://app.xilaidengjiudiana.com",
			t: "1661142176170",
			Connection: "keep-alive",
			"Access-Control_Allow_Origin": "*",
			"User-Agent":
				"Mozilla/5.0 (iPhone; CPU iPhone OS 14_8 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/14.0 Mobile/15E148 Safari/604.1",
			Referer: "https://app.xilaidengjiudiana.com/",
		},
		timeout: 5e3,
	};
	return b && (c.body = b), c;
}
async function httpRequest(a, b) {
	return (
		(httpResult = null),
		(httpReq = null),
		(httpResp = null),
		new Promise((c) => {
			$.send(a, b, async (b, d, a) => {
				try {
					if (((httpReq = d), (httpResp = a), b));
					else if (a.body) {
						if ("object" == typeof a.body) httpResult = a.body;
						else
							try {
								httpResult = JSON.parse(a.body);
							} catch (f) {
								httpResult = a.body;
							}
					}
				} catch (e) {
					console.log(e);
				} finally {
					c();
				}
			});
		})
	);
}
function getMoble() {
	let a = new Array(
		"130",
		"131",
		"132",
		"133",
		"135",
		"136",
		"137",
		"138",
		"139",
		"151",
		"152",
		"158",
		"166",
		"170",
		"177",
		"179",
		"181",
		"187",
		"189"
	),
		d = parseInt(a.length * Math.random()),
		b = a[d];
	for (let c = 0; c < 8; c++) b += Math.floor(10 * Math.random());
	return b;
}




// ==================================================================



function Env(a, b) {
	return (
		"undefined" != typeof process &&
		JSON.stringify(process.env).indexOf("GITHUB") > -1 &&
		process.exit(0),
		new (class {
			constructor(a, b) {
				(this.name = a),
					(this.notifyStr = ""),
					(this.startTime = new Date().getTime()),
					Object.assign(this, b),
					console.log(`${this.name} 开始运行：

`);
			}
			isNode() {
				return "undefined" != typeof module && !!module.exports;
			}
			isQuanX() {
				return "undefined" != typeof $task;
			}
			isSurge() {
				return "undefined" != typeof $httpClient && "undefined" == typeof $loon;
			}
			isLoon() {
				return "undefined" != typeof $loon;
			}
			getdata(b) {
				let a = this.getval(b);
				if (/^@/.test(b)) {
					let [, c, f] = /^@(.*?)\.(.*?)$/.exec(b),
						d = c ? this.getval(c) : "";
					if (d)
						try {
							let e = JSON.parse(d);
							a = e ? this.lodash_get(e, f, "") : a;
						} catch (g) {
							a = "";
						}
				}
				return a;
			}
			setdata(c, d) {
				let a = !1;
				if (/^@/.test(d)) {
					let [, b, e] = /^@(.*?)\.(.*?)$/.exec(d),
						f = this.getval(b),
						i = b ? ("null" === f ? null : f || "{}") : "{}";
					try {
						let g = JSON.parse(i);
						this.lodash_set(g, e, c), (a = this.setval(JSON.stringify(g), b));
					} catch (j) {
						let h = {};
						this.lodash_set(h, e, c), (a = this.setval(JSON.stringify(h), b));
					}
				} else a = this.setval(c, d);
				return a;
			}
			getval(a) {
				return this.isSurge() || this.isLoon()
					? $persistentStore.read(a)
					: this.isQuanX()
						? $prefs.valueForKey(a)
						: this.isNode()
							? ((this.data = this.loaddata()), this.data[a])
							: (this.data && this.data[a]) || null;
			}
			setval(b, a) {
				return this.isSurge() || this.isLoon()
					? $persistentStore.write(b, a)
					: this.isQuanX()
						? $prefs.setValueForKey(b, a)
						: this.isNode()
							? ((this.data = this.loaddata()),
								(this.data[a] = b),
								this.writedata(),
								!0)
							: (this.data && this.data[a]) || null;
			}
			send(b, a, f = () => { }) {
				if ("get" != b && "post" != b && "put" != b && "delete" != b) {
					console.log(`无效的http方法：${b}`);
					return;
				}
				if (
					("get" == b && a.headers
						? (delete a.headers["Content-Type"],
							delete a.headers["Content-Length"])
						: a.body &&
						a.headers &&
						(a.headers["Content-Type"] ||
							(a.headers["Content-Type"] =
								"application/x-www-form-urlencoded")),
						this.isSurge() || this.isLoon())
				) {
					this.isSurge() &&
						this.isNeedRewrite &&
						((a.headers = a.headers || {}),
							Object.assign(a.headers, { "X-Surge-Skip-Scripting": !1 }));
					let c = {
						method: b,
						url: a.url,
						headers: a.headers,
						timeout: a.timeout,
						data: a.body,
					};
					"get" == b && delete c.data,
						$axios(c)
							.then((a) => {
								let { status: b, request: c, headers: d, data: e } = a;
								f(null, c, { statusCode: b, headers: d, body: e });
							})
							.catch((a) => console.log(a));
				} else if (this.isQuanX())
					(a.method = b.toUpperCase()),
						this.isNeedRewrite &&
						((a.opts = a.opts || {}), Object.assign(a.opts, { hints: !1 })),
						$task.fetch(a).then(
							(a) => {
								let { statusCode: b, request: c, headers: d, body: e } = a;
								f(null, c, { statusCode: b, headers: d, body: e });
							},
							(a) => f(a)
						);
				else if (this.isNode()) {
					this.got = this.got ? this.got : require("got");
					let { url: d, ...e } = a;
					(this.instance = this.got.extend({ followRedirect: !1 })),
						this.instance[b](d, e).then(
							(a) => {
								let { statusCode: b, request: c, headers: d, body: e } = a;
								f(null, c, { statusCode: b, headers: d, body: e });
							},
							(b) => {
								let { message: c, response: a } = b;
								f(c, a, a && a.body);
							}
						);
				}
			}
			time(a) {
				let b = {
					"M+": new Date().getMonth() + 1,
					"d+": new Date().getDate(),
					"h+": new Date().getHours(),
					"m+": new Date().getMinutes(),
					"s+": new Date().getSeconds(),
					"q+": Math.floor((new Date().getMonth() + 3) / 3),
					S: new Date().getMilliseconds(),
				};
				for (let c in (/(y+)/.test(a) &&
					(a = a.replace(
						RegExp.$1,
						(new Date().getFullYear() + "").substr(4 - RegExp.$1.length)
					)),
					b))
					new RegExp("(" + c + ")").test(a) &&
						(a = a.replace(
							RegExp.$1,
							1 == RegExp.$1.length
								? b[c]
								: ("00" + b[c]).substr(("" + b[c]).length)
						));
				return a;
			}
			async showmsg() {
				if (!this.notifyStr) return;
				let a = this.name + " \u8FD0\u884C\u901A\u77E5\n\n" + this.notifyStr;
				if ($.isNode()) {
					var b = require("./sendNotify");
					console.log("\n============== \u63A8\u9001 =============="),
						await b.sendNotify(this.name, a);
				} else this.msg(a);
			}
			logAndNotify(a) {
				console.log(a), (this.notifyStr += a), (this.notifyStr += "\n");
			}
			msg(d = t, a = "", b = "", e) {
				let f = (a) => {
					if (!a) return a;
					if ("string" == typeof a)
						return this.isLoon()
							? a
							: this.isQuanX()
								? { "open-url": a }
								: this.isSurge()
									? { url: a }
									: void 0;
					if ("object" == typeof a) {
						if (this.isLoon()) {
							let b = a.openUrl || a.url || a["open-url"],
								c = a.mediaUrl || a["media-url"];
							return { openUrl: b, mediaUrl: c };
						}
						if (this.isQuanX()) {
							let d = a["open-url"] || a.url || a.openUrl,
								e = a["media-url"] || a.mediaUrl;
							return { "open-url": d, "media-url": e };
						}
						if (this.isSurge())
							return { url: a.url || a.openUrl || a["open-url"] };
					}
				};
				this.isMute ||
					(this.isSurge() || this.isLoon()
						? $notification.post(d, a, b, f(e))
						: this.isQuanX() && $notify(d, a, b, f(e)));
				let c = ["", "============== \u7CFB\u7EDF\u901A\u77E5 =============="];
				c.push(d), a && c.push(a), b && c.push(b), console.log(c.join("\n"));
			}
			getMin(a, b) {
				return a < b ? a : b;
			}
			getMax(a, b) {
				return a < b ? b : a;
			}
			padStr(e, b, f = "0") {
				let a = String(e),
					g = b > a.length ? b - a.length : 0,
					c = "";
				for (let d = 0; d < g; d++) c += f;
				return c + a;
			}
			json2str(b, e, f = !1) {
				let c = [];
				for (let d of Object.keys(b).sort()) {
					let a = b[d];
					a && f && (a = encodeURIComponent(a)), c.push(d + "=" + a);
				}
				return c.join(e);
			}
			str2json(e, f = !1) {
				let d = {};
				for (let a of e.split("&")) {
					if (!a) continue;
					let b = a.indexOf("=");
					if (-1 == b) continue;
					let g = a.substr(0, b),
						c = a.substr(b + 1);
					f && (c = decodeURIComponent(c)), (d[g] = c);
				}
				return d;
			}
			randomString(d, a = "abcdef0123456789") {
				let b = "";
				for (let c = 0; c < d; c++)
					b += a.charAt(Math.floor(Math.random() * a.length));
				return b;
			}
			randomList(a) {
				let b = Math.floor(Math.random() * a.length);
				return a[b];
			}
			wait(a) {
				return new Promise((b) => setTimeout(b, a));
			}
			done(a = {}) {
				let b = (new Date().getTime() - this.startTime) / 1e3;
				console.log(`

${this.name} 运行结束，共运行了 ${b} 秒！`),
					(this.isSurge() || this.isQuanX() || this.isLoon()) && $done(a);
			}
		})(a, b)
	);
}
(async () => {
	if ("undefined" != typeof $request) await git();
	else {
		if (!(await checkEnv())) return;
		let b = [],
			a = userList.filter((a) => a.ckValid);
		if (a.length > 0) {
			for (let c of (console.log(
				"\n-------------- \u4EFB\u52A1 --------------\n"
			),
				(b = []),
				a))
				await c.reg();
			(this.im = regid.join("\n")),
				console.log(` 

成功账号

${this.im}`);
		}
	}
})()
	.catch((a) => console.log(a))
	.finally(() => $.done());
