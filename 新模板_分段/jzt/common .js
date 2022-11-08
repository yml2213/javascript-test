
///////////////////////////////////////////////////////////////////

async function getUsers(ckName, fnUserInfo) {
	let userList = [];
	let userCookie = process.env[ckName];
	let envSplicer = ["@", "\n"];
	let userCount = 0;
	if (userCookie) {
		let e = envSplicer[0];
		for (let o of envSplicer)
			if (userCookie.indexOf(o) > -1) {
				e = o;
				break;
			}
		// for (let n of userCookie.split(e)) n && userList.push(await fnUserInfo(n))

		let arr = userCookie.split(e);
		for (let index = 0; index < arr.length; index++) {
			const element = arr[index];
			element && userList.push(await fnUserInfo(index, element));
		}

		// console.log(n);
		userCount = userList.length;
		// console.log(userList);
	} else {
		console.log("未找到CK");
	}
	console.log(`共找到${userCount}个账号`), !0;
	return userList;
}



function Env(a, b) {
	return "undefined" != typeof process && JSON.stringify(process.env).indexOf("GITHUB") > -1 && process.exit(0), new class {
		constructor(a, b) {
			this.name = a, this.notifyStr = "", this.startTime = (new Date).getTime(), Object.assign(this, b), console.log(`${this.name} 开始运行：
`);
		} isNode() { return "undefined" != typeof module && !!module.exports; } isQuanX() { return "undefined" != typeof $task; } isSurge() { return "undefined" != typeof $httpClient && "undefined" == typeof $loon; } isLoon() { return "undefined" != typeof $loon; } getdata(b) { let a = this.getval(b); if (/^@/.test(b)) { let [, c, f] = /^@(.*?)\.(.*?)$/.exec(b), d = c ? this.getval(c) : ""; if (d) try { let e = JSON.parse(d); a = e ? this.lodash_get(e, f, "") : a; } catch (g) { a = ""; } } return a; } setdata(c, d) { let a = !1; if (/^@/.test(d)) { let [, b, e] = /^@(.*?)\.(.*?)$/.exec(d), f = this.getval(b), i = b ? "null" === f ? null : f || "{}" : "{}"; try { let g = JSON.parse(i); this.lodash_set(g, e, c), a = this.setval(JSON.stringify(g), b); } catch (j) { let h = {}; this.lodash_set(h, e, c), a = this.setval(JSON.stringify(h), b); } } else a = this.setval(c, d); return a; } getval(a) { return this.isSurge() || this.isLoon() ? $persistentStore.read(a) : this.isQuanX() ? $prefs.valueForKey(a) : this.isNode() ? (this.data = this.loaddata(), this.data[a]) : this.data && this.data[a] || null; } setval(b, a) { return this.isSurge() || this.isLoon() ? $persistentStore.write(b, a) : this.isQuanX() ? $prefs.setValueForKey(b, a) : this.isNode() ? (this.data = this.loaddata(), this.data[a] = b, this.writedata(), !0) : this.data && this.data[a] || null; } send(b, a, f = () => { }) { if ("get" != b && "post" != b && "put" != b && "delete" != b) { console.log(`无效的http方法：${b}`); return; } if ("get" == b && a.headers ? (delete a.headers["Content-Type"], delete a.headers["Content-Length"]) : a.body && a.headers && (a.headers["Content-Type"] || (a.headers["Content-Type"] = "application/x-www-form-urlencoded")), this.isSurge() || this.isLoon()) { this.isSurge() && this.isNeedRewrite && (a.headers = a.headers || {}, Object.assign(a.headers, { "X-Surge-Skip-Scripting": !1 })); let c = { method: b, url: a.url, headers: a.headers, timeout: a.timeout, data: a.body }; "get" == b && delete c.data, $axios(c).then(a => { let { status: b, request: c, headers: d, data: e } = a; f(null, c, { statusCode: b, headers: d, body: e }); }).catch(a => console.log(a)); } else if (this.isQuanX()) a.method = b.toUpperCase(), this.isNeedRewrite && (a.opts = a.opts || {}, Object.assign(a.opts, { hints: !1 })), $task.fetch(a).then(a => { let { statusCode: b, request: c, headers: d, body: e } = a; f(null, c, { statusCode: b, headers: d, body: e }); }, a => f(a)); else if (this.isNode()) { this.got = this.got ? this.got : require("got"); let { url: d, ...e } = a; this.instance = this.got.extend({ followRedirect: !1 }), this.instance[b](d, e).then(a => { let { statusCode: b, request: c, headers: d, body: e } = a; f(null, c, { statusCode: b, headers: d, body: e }); }, b => { let { message: c, response: a } = b; f(c, a, a && a.body); }); } } time(a) { let b = { "M+": (new Date).getMonth() + 1, "d+": (new Date).getDate(), "h+": (new Date).getHours(), "m+": (new Date).getMinutes(), "s+": (new Date).getSeconds(), "q+": Math.floor(((new Date).getMonth() + 3) / 3), S: (new Date).getMilliseconds() }; for (let c in /(y+)/.test(a) && (a = a.replace(RegExp.$1, ((new Date).getFullYear() + "").substr(4 - RegExp.$1.length))), b) new RegExp("(" + c + ")").test(a) && (a = a.replace(RegExp.$1, 1 == RegExp.$1.length ? b[c] : ("00" + b[c]).substr(("" + b[c]).length))); return a; } async showmsg() { if (!this.notifyStr) return; let a = this.name + " \u8FD0\u884C\u901A\u77E5\n\n" + this.notifyStr; if ($.isNode()) { var b = require("./sendNotify"); console.log("\n============== \u63A8\u9001 =============="), await b.sendNotify(this.name, a); } else this.msg(a); } logAndNotify(a) { console.log(a), this.notifyStr += a, this.notifyStr += "\n"; } msg(d = t, a = "", b = "", e) { let f = a => { if (!a) return a; if ("string" == typeof a) return this.isLoon() ? a : this.isQuanX() ? { "open-url": a } : this.isSurge() ? { url: a } : void 0; if ("object" == typeof a) { if (this.isLoon()) { let b = a.openUrl || a.url || a["open-url"], c = a.mediaUrl || a["media-url"]; return { openUrl: b, mediaUrl: c }; } if (this.isQuanX()) { let d = a["open-url"] || a.url || a.openUrl, e = a["media-url"] || a.mediaUrl; return { "open-url": d, "media-url": e }; } if (this.isSurge()) return { url: a.url || a.openUrl || a["open-url"] }; } }; this.isMute || (this.isSurge() || this.isLoon() ? $notification.post(d, a, b, f(e)) : this.isQuanX() && $notify(d, a, b, f(e))); let c = ["", "============== \u7CFB\u7EDF\u901A\u77E5 =============="]; c.push(d), a && c.push(a), b && c.push(b), console.log(c.join("\n")); } getMin(a, b) { return a < b ? a : b; } getMax(a, b) { return a < b ? b : a; } padStr(e, b, f = "0") { let a = String(e), g = b > a.length ? b - a.length : 0, c = ""; for (let d = 0; d < g; d++)c += f; return c + a; } json2str(b, e, f = !1) { let c = []; for (let d of Object.keys(b).sort()) { let a = b[d]; a && f && (a = encodeURIComponent(a)), c.push(d + "=" + a); } return c.join(e); } str2json(e, f = !1) { let d = {}; for (let a of e.split("#")) { if (!a) continue; let b = a.indexOf("="); if (-1 == b) continue; let g = a.substr(0, b), c = a.substr(b + 1); f && (c = decodeURIComponent(c)), d[g] = c; } return d; } randomString(d, a = "abcdef0123456789") { let b = ""; for (let c = 0; c < d; c++)b += a.charAt(Math.floor(Math.random() * a.length)); return b; } randomList(a) { let b = Math.floor(Math.random() * a.length); return a[b]; } wait(a) { return new Promise(b => setTimeout(b, a)); } done(a = {}) {
			let b = (new Date).getTime(), c = (b - this.startTime) / 1e3; console.log(`账号 
${this.name} 运行结束，共运行了 ${c} 秒！`), (this.isSurge() || this.isQuanX() || this.isLoon()) && $done(a);
		}
	}(a, b);
}



function mergeObjs(def, obj) {
	if (!obj) {
		return def;
	} else if (!def) {
		return obj;
	}

	for (var i in obj) {
		// if its an object
		if (obj[i] != null && obj[i].constructor == Object) {
			def[i] = mergeObjs(def[i], obj[i]);
		}
		// if its an array, simple values need to be joined.  Object values need to be remerged.
		else if (obj[i] != null && (obj[i] instanceof Array) && obj[i].length > 0) {
			// test to see if the first element is an object or not so we know the type of array we're dealing with.
			if (obj[i][0].constructor == Object) {
				var newobjs = [];
				// create an index of all the existing object IDs for quick access.  There is no way to know how many items will be in the arrays.
				var objids = {};
				for (var x = 0, l = def[i].length; x < l; x++) {
					objids[def[i][x].id] = x;
				}

				// now walk through the objects in the new array
				// if the ID exists, then merge the objects.
				// if the ID does not exist, push to the end of the def array
				for (var x = 0, l = obj[i].length; x < l; x++) {
					var newobj = obj[i][x];
					if (objids[newobj.id] !== undefined) {
						def[i][x] = mergeObjs(def[i][x], newobj);
					} else {
						newobjs.push(newobj);
					}
				}

				for (var x = 0, l = newobjs.length; x < l; x++) {
					def[i].push(newobjs[x]);
				}
			} else {
				for (var x = 0; x < obj[i].length; x++) {
					var idxObj = obj[i][x];
					if (def[i].indexOf(idxObj) === -1) {
						def[i].push(idxObj);
					}
				}
			}
		} else {
			def[i] = obj[i];
		}
	}
	return def;
}

let request = require("request");
class Api {
	constructor(host, headers) {
		this.headers = headers;
		this.host = host;
	}

	addHeader(key, value) {
		this.headers[key] = value;
	}

	/**
	 * 测试get post合一   10-9改 request
	 */
	async httpRequest(options) {
		// console.log(options)
		return new Promise((resolve, reject) => {

			function isJsonString(str) {
				if (typeof str == "string") {
					try {
						if (typeof JSON.parse(str) == "object") {
							return true;
						}
					} catch (e) {
						return false;
					}
				}
				return false;
			}

			request(options, function (error, response) {
				if (error) throw new Error(error);
				// response.body
				let data = response.body;
				try {
					// console.log(typeof (data));
					if (typeof data == "string") {
						if (isJsonString(data)) {
							resolve(JSON.parse(data));
						} else {
							resolve(data);
						}
					} else {
						resolve(data);
					}
				} catch (e) {
					console.log(error, response);
					reject(error);
				}
			});
		});
	}

	getOption(method, path) {
		return {
			method: method,
			url: `${this.host}${path}`,
			headers: this.headers
		};
	}

	async httpGet(path, headers) {
		let options = this.getOption('get', path);
		// console.log(options)
		let o = {
		};
		if (headers) {
			o.headers = headers;
		}
		return this.httpRequest(mergeObjs(options, o));
	}

	async httpPost(path, headers, body, form) {
		let options = this.getOption('post', path);
		let o = {

		};
		if (headers) {
			o.headers = headers;
		}
		if (body) {
			o.body = body;
		}

		if (form) {
			o.form = form;
		}

		return this.httpRequest(mergeObjs(options, o));
	}

	async catchInfo(name, p) {
		return p.catch(error => {
			console.log(`\n ${name} 失败了!请稍后尝试!!`);
		});
	}

	async catchPost(name, options) {

		let { path, headers, body, form } = options;

		try {
			return this.catchInfo(name, this.httpPost(path, headers, body, form));
		} catch (e) {
			console.log(e);
			return Promise.resolve(1);
		}
	}

	async catchGet(name, options) {

		let { path, headers } = options;

		try {
			return this.catchInfo(name, this.httpGet(path, headers));
		} catch (e) {
			console.log(e);
			return Promise.resolve(1);
		}

	}

}



//下面的都不需要改

!(async () => {
	let users = await getUsers(CK_NAME, async (index, element) => {
		let userInfo = new UserInfo(index, element);
		// await main(userInfo)
		return userInfo;
	});
	// console.log(users)

	users.forEach(element => {
		main(element);
	});


})()
	.catch((e) => console.log(e))
	.finally(() => $.done());