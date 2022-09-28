const $ = new Env("辣椒视频扫码取值");
let envSplitor = ["@"];

let longin = 2; //普通是1   填任意不是1得数值  急速版本

let userCookie = "1",
	userList = [],
	userIdx = 0,
	userCount = 0,
	httpResult,
	httpReq,
	httpResp;
class UserInfo {
	constructor(a) {
		(this.index = ++userIdx), (this.valid = !1);
		try {
			(this.ck = a), (this.ckValid = !0);
		} catch (b) { }
	}
	async tklist() {
		try {
			for (let a = 0; a < 200; a++) await this.cashlist();
		} catch (b) {
		} finally {
			return Promise.resolve(1);
		}
	}
	async qrconnect() {
		try {
			1 !== longin && (this.appid = "wx3850ffaee30d5b01"),
				1 == longin && (this.appid = "wx2029305558832432");
			let a = `https://open.weixin.qq.com/connect/app/qrconnect?appid=${this.appid}&bundleid=(null)&scope=snsapi_userinfo&state=wx_oauth_authorization_state&pass_ticket=uEEBaQRZdGuSQiSgv58Sv1v9n2BXLgQn4ltK%2Fu6aOrRupBFYgtCB16mHfrA4Vc3W`,
				e;
			await httpRequest(
				"get",
				popu(
					a,
					{
						"User-Agent":
							"Mozilla/5.0 (iPhone; CPU iPhone OS 14_8 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Mobile/15E148 MicroMessenger/8.0.20(0x18001442) NetType/WIFI Language/zh_CN",
						Host: "open.weixin.qq.com",
						Connection: "keep-alive",
						"Accept-Language": "zh-cn",
						"Accept-Encoding": "gzip, deflate, br",
						Accept:
							"text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8",
					},
					""
				)
			);
			let b = httpResult,
				c = removeHTMLTag(b);
			this.idcode = c.substr(-45, 16);
			let d = `https://open.weixin.qq.com/connect/qrcode/${this.idcode}`;
			console.log(`
45秒内尽快扫描，复制网址到新建页面 扫码登录微信获取cookie值
`),
				console.log(d),
				await this.checking();
		} catch (f) {
		} finally {
			return Promise.resolve(1);
		}
	}
	async checking() {
		try {
			let b = `https://lp.open.weixin.qq.com/connect/l/qrconnect?uuid=${this.idcode
				}&f=url&_=${new Date().getTime()}`,
				c;
			await httpRequest(
				"get",
				popu(
					b,
					{
						"User-Agent":
							"Mozilla/5.0 (Windows NT 10.0; WOW64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/53.0.2785.116 Safari/537.36 QBCore/4.0.1326.400 QQBrowser/9.0.2524.400 Mozilla/5.0 (Windows NT 6.1; WOW64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/53.0.2875.116 Safari/537.36 NetType/WIFI MicroMessenger/7.0.20.1781(0x6700143B) WindowsWechat(0x63010200)",
						Host: "lp.open.weixin.qq.com",
						Connection: "Keep-Alive",
						"Accept-Encoding": "gzip",
					},
					""
				)
			);
			let a = httpResult;
			a && (this.t = JSON.stringify(a)),
				(this.datax = this.t.match(/window.wx_errcode=(\w+)/)[1]),
				404 == this.datax && (await $.wait(1300)),
				await this.checkingx();
		} catch (d) {
		} finally {
			return Promise.resolve(1);
		}
	}
	async checkingx() {
		try {
			let b = `https://lp.open.weixin.qq.com/connect/l/qrconnect?uuid=${this.idcode
				}&f=url&_=${new Date().getTime()}`,
				d;
			await httpRequest(
				"get",
				popu(
					b,
					{
						"User-Agent":
							"Mozilla/5.0 (Windows NT 10.0; WOW64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/53.0.2785.116 Safari/537.36 QBCore/4.0.1326.400 QQBrowser/9.0.2524.400 Mozilla/5.0 (Windows NT 6.1; WOW64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/53.0.2875.116 Safari/537.36 NetType/WIFI MicroMessenger/7.0.20.1781(0x6700143B) WindowsWechat(0x63010200)",
						Host: "lp.open.weixin.qq.com",
						Connection: "Keep-Alive",
						"Accept-Encoding": "gzip",
					},
					""
				)
			);
			let a = httpResult;
			a && (this.t = JSON.stringify(a)),
				(this.datax = this.t.match(/window.wx_errcode=(\w+)/)[1]),
				405 == this.datax &&
				((this.dataxx = this.t.match(/code=(\w+)/g)[1]),
					(this.code = this.dataxx.split("code=")[1]));
			var c = /[\u4e00-\u9fa5]+/g;
			(this.dataxt = this.t.match(c)),
				(this.wx_nickname = this.dataxt.join("")),
				await this.oauth2();
		} catch (e) {
		} finally {
			return Promise.resolve(1);
		}
	}
	async oauth2() {
		try {
			1 !== longin &&
				((this.appid = "wx3850ffaee30d5b01"),
					(this.secret = "464e83bf675294818b098ca093739267")),
				1 == longin &&
				((this.appid = "wx2029305558832432"),
					(this.secret = "b5aa8605dc52d9e6f941db0c2e2cddef"));
			let b = `https://api.weixin.qq.com/sns/oauth2/access_token?appid=${this.appid}&secret=${this.secret}&code=${this.code}&grant_type=authorization_code`,
				c;
			await httpRequest(
				"get",
				popu(
					b,
					{
						"User-Agent":
							"Dalvik/2.1.0 (Linux; U; Android 10; ONEPLUS A9000 Build/QKQ1.190716.003)",
						Host: "api.weixin.qq.com",
						Connection: "Keep-Alive",
						"Accept-Encoding": "gzip",
					},
					""
				)
			);
			let a = httpResult;
			(this.acctoken = a.access_token),
				(this.openid = a.openid),
				await this.userinfo();
		} catch (d) {
		} finally {
			return Promise.resolve(1);
		}
	}
	async userinfo() {
		try {
			let b = `https://api.weixin.qq.com/sns/userinfo?access_token=${this.acctoken}&openid=${this.openid}`,
				c;
			await httpRequest(
				"get",
				popu(
					b,
					{
						"User-Agent":
							"Dalvik/2.1.0 (Linux; U; Android 10; ONEPLUS A9000 Build/QKQ1.190716.003)",
						Host: "api.weixin.qq.com",
						Connection: "Keep-Alive",
						"Accept-Encoding": "gzip",
					},
					""
				)
			);
			let a = httpResult;
			(this.nickname = encodeURIComponent(a.nickname)),
				(this.unionid = a.unionid),
				(this.imgurl = encodeURIComponent(a.headimgurl)),
				(this.opid = a.openid),
				console.log(JSON.stringify(a)),
				await this.wxlogin();
		} catch (d) {
		} finally {
			return Promise.resolve(1);
		}
	}
	async wxlogin() {
		try {
			1 !== longin && (this.url = "http://8.134.48.148:8899/user/loginByWX"),
				1 == longin && (this.url = "http://121.40.77.78:8899/user/loginByWX");
			let b = this.url,
				c = `wxOpenId=${this.opid}&wxName=${this.nickname}&wxHeader=${this.imgurl}&unionId=${this.unionid}&sex=0`,
				e = c.length,
				f = b.replace("//", "/").split("/")[1];
			await httpRequest(
				"post",
				popu(
					b,
					{
						"Accept-Language": "zh-CN,zh;q=0.8",
						"User-Agent":
							"Mozilla/5.0 (Linux; U; Android 10; zh-cn; ONEPLUS A6000 Build/QKQ1.190716.003) AppleWebKit/533.1 (KHTML, like Gecko) Version/5.0 Mobile Safari/533.1",
						"Content-Type": "application/x-www-form-urlencoded",
						"Content-Length": e,
						Host: f,
						Connection: "Keep-Alive",
						"Accept-Encoding": "gzip",
						"Cache-Control": "no-cache",
					},
					c
				)
			);
			let a = httpResult;
			if (1 == longin) var d = "\u666E\u901A\u7248\u8FA3\u6912";
			else if (1 !== longin) var d = "\u6781\u901F\u7248\u8FA3\u6912";
			console.log(`
微信账号 ${a.data.username}  ${d} 登录成功 

账号数据 
a=${a.data.userId}&b=${a.data.token}`);
		} catch (g) {
		} finally {
			return Promise.resolve(1);
		}
	}
}
async function GetRewrite() { }
function removeHTMLTag(a) {
	return (a = (a = (a = (a = (a = (a = (a = (a = a.replace(
		/<\/?[^>]*>/g,
		""
	)).replace(/[ | ]*\n/g, "\n")).replace(/\n[\s| | ]*\r/g, "\n")).replace(
		/&nbsp;/gi,
		""
	)).replace(/\s/g, "")).replace(/微信登录/gi, "")).replace(
		/{{=wxNickname}}授权成功跳转中...请使用手机微信扫描二维码授权登录以下应用-->辣椒短视频软件扫码只用于授权，不会登录你的iPad微信获得你的公开信息（昵称、头像等）-->取消登录/gi,
		""
	)).replace(
		/WeixinJSBridge.on("onGetA8KeyUrl",function(a){getJsonDataAndInit(a.url)})}functionb(a){window.WeixinJSBridge?WeixinJSBridge.invoke("cache",{appId:appId,resourceList:[a]},function(a){}):c.push(a)}window.WeixinJSBridge?a():document.addEventListener&&document.addEventListener("WeixinJSBridgeReady",a,!1);varc=[];window.cacheAsyncLoadJs=b}();/gi,
		""
	));
}
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
	}
	return !0;
}
function popu(c, d, a = "") {
	let b = { url: c, headers: d, timeout: 45e3 };
	return a && (b.body = a), b;
}
(async () => {
	if ("undefined" != typeof $request) await GetRewrite();
	else {
		if (!(await checkEnv())) return;
		if (userList.length > 0) {
			for (let a of (console.log(
				"\n================== \u5F00\u59CB\u626B\u7801\u53D6\u503C =================="
			),
				(taskall = []),
				userList))
				taskall.push(a.qrconnect());
			await Promise.all(taskall);
		}
	}
})()
	.catch((a) => console.log(a))
	.finally(() => $.done());
////////////////////////////////////////////////////////////////////

//AES/DES加解密，CryptoJS
//Base64加解密
var Base64 = {
	_keyStr: "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=",
	encode: function (e) {
		var t = "";
		var n, r, i, s, o, u, a;
		var f = 0;
		e = Base64._utf8_encode(e);
		while (f < e.length) {
			n = e.charCodeAt(f++);
			r = e.charCodeAt(f++);
			i = e.charCodeAt(f++);
			s = n >> 2;
			o = ((n & 3) << 4) | (r >> 4);
			u = ((r & 15) << 2) | (i >> 6);
			a = i & 63;
			if (isNaN(r)) {
				u = a = 64;
			} else if (isNaN(i)) {
				a = 64;
			}
			t =
				t +
				this._keyStr.charAt(s) +
				this._keyStr.charAt(o) +
				this._keyStr.charAt(u) +
				this._keyStr.charAt(a);
		}
		return t;
	},
	decode: function (e) {
		var t = "";
		var n, r, i;
		var s, o, u, a;
		var f = 0;
		e = e.replace(/[^A-Za-z0-9+/=]/g, "");
		while (f < e.length) {
			s = this._keyStr.indexOf(e.charAt(f++));
			o = this._keyStr.indexOf(e.charAt(f++));
			u = this._keyStr.indexOf(e.charAt(f++));
			a = this._keyStr.indexOf(e.charAt(f++));
			n = (s << 2) | (o >> 4);
			r = ((o & 15) << 4) | (u >> 2);
			i = ((u & 3) << 6) | a;
			t = t + String.fromCharCode(n);
			if (u != 64) {
				t = t + String.fromCharCode(r);
			}
			if (a != 64) {
				t = t + String.fromCharCode(i);
			}
		}
		t = Base64._utf8_decode(t);
		return t;
	},
	_utf8_encode: function (e) {
		e = e.replace(/rn/g, "n");
		var t = "";
		for (var n = 0; n < e.length; n++) {
			var r = e.charCodeAt(n);
			if (r < 128) {
				t += String.fromCharCode(r);
			} else if (r > 127 && r < 2048) {
				t += String.fromCharCode((r >> 6) | 192);
				t += String.fromCharCode((r & 63) | 128);
			} else {
				t += String.fromCharCode((r >> 12) | 224);
				t += String.fromCharCode(((r >> 6) & 63) | 128);
				t += String.fromCharCode((r & 63) | 128);
			}
		}
		return t;
	},
	_utf8_decode: function (e) {
		var t = "";
		var n = 0;
		var r = (c1 = c2 = 0);
		while (n < e.length) {
			r = e.charCodeAt(n);
			if (r < 128) {
				t += String.fromCharCode(r);
				n++;
			} else if (r > 191 && r < 224) {
				c2 = e.charCodeAt(n + 1);
				t += String.fromCharCode(((r & 31) << 6) | (c2 & 63));
				n += 2;
			} else {
				c2 = e.charCodeAt(n + 1);
				c3 = e.charCodeAt(n + 2);
				t += String.fromCharCode(
					((r & 15) << 12) | ((c2 & 63) << 6) | (c3 & 63)
				);
				n += 3;
			}
		}
		return t;
	},
};
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
function number(d) {
	var b = parseFloat(d);
	if (isNaN(b)) return !1;
	var b = Math.round(100 * d) / 100,
		a = b.toString(),
		c = a.indexOf(".");
	for (c < 0 && ((c = a.length), (a += ".")); a.length <= c + 2;) a += "0";
	return a;
}

function number(d) {
	var b = parseFloat(d);
	if (isNaN(b)) return !1;
	var b = Math.round(100 * d) / 100,
		a = b.toString(),
		c = a.indexOf(".");
	for (c < 0 && ((c = a.length), (a += ".")); a.length <= c + 2;) a += "0";
	return a;
}
//SHA1
//=============================================================================================
//=============================================================================================
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
					console.log(`开始运行 ${this.name} ：
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
				let b = new Date().getTime(),
					c = (b - this.startTime) / 1e3;
				console.log(`
${this.name} 共运行了 ${c} 秒！`),
					(this.isSurge() || this.isQuanX() || this.isLoon()) && $done(a);
			}
		})(a, b)
	);
}
