





const $ = new Env("诗画浦江");
const notify = $.isNode() ? require("./sendNotify") : "";
const Notify = 1;


signin('签到');

function signin(name) { //签到
	let path = '/api/user_mumber/sign';
	let sign = this.get_sign(path);

	let options = {
		method: "Get",
		url: `https://vapp.tmuyun.com${path}`,
		headers: {
			"X-SESSION-ID": this.xs,
			"X-REQUEST-ID": this.xr,
			"X-TIMESTAMP": this.ts,
			"X-SIGNATURE": sign,
			"Cache-Control": `no-cache`,
			"X-TENANT-ID": `14`,
			'Host': 'vapp.tmuyun.com',
		},
	};

	// console.log(options);
	let result = httpRequest(name, options);

	// console.log(result);
	if (result.code == 0) {
		DoubleLog(`账号[${this.index}]  ${name}" ${result.data.reason}, 获得积分 ${result.data.signIntegral}`);
	} else DoubleLog(`账号[${this.index}]  ${name} 失败❌了呢`), console.log(result);




}



async function httpRequest(method, url) {
	return new Promise((resolve) => {
		$.send(method, url, async (err, req, resp) => {
			resolve({ err, req, resp });
		});
	});
}



function httpRequest(options) {

	// console.log(options)
	return new Promise((resolve) => {
		$.send(options, async (err, req, resp) => {
			resolve({ err, req, resp });
		});
	});



}



function Env(name, env) {
	"undefined" != typeof process && JSON.stringify(process.env).indexOf("GITHUB") > -1 && process.exit(0);
	return new class {
		constructor(name, env) {
			this.name = name;
			this.notifyStr = '';
			this.notifyFlag = false;
			this.startTime = (new Date).getTime();
			Object.assign(this, env);
			console.log(`${this.name} 开始运行: \n`);
		}
		isNode() {
			return "undefined" != typeof module && !!module.exports;
		}



		request(options, e = (error, response) => {
			if (error) throw new Error(error);

			console.log(response.body);
			let data = response.body;
			// try {
			// 	// console.log(data);
			// 	// console.log(typeof (data));
			// 	if (typeof data == "string") {
			// 		if (this.isJsonString(data)) {
			// 			resolve(JSON.parse(data));
			// 		} else {
			// 			resolve(data);
			// 		}
			// 	} else {
			// 		resolve(data);
			// 	}
			// } catch (e) {
			// 	console.log(error, response);
			// 	reject(error);
			// }
		});

		// send(m, t, e = (() => { })) {
		// 	if (m != 'get' && m != 'post' && m != 'put' && m != 'delete') {
		// 		console.log(`无效的http方法: ${m}`);
		// 		return;
		// 	}
		// 	if (m == 'get' && t.headers) {
		// 		delete t.headers["Content-Type"];
		// 		delete t.headers["Content-Length"];
		// 	} else if (t.body && t.headers) {
		// 		if (!t.headers["Content-Type"]) t.headers["Content-Type"] = "application/x-www-form-urlencoded";
		// 	}

		// 	if (this.isNode()) {
		// 		this.got = this.got ? this.got : require("got");
		// 		const {
		// 			url: s,
		// 			...i
		// 		} = t;
		// 		this.instance = this.got.extend({
		// 			followRedirect: false
		// 		});
		// 		this.instance[m](s, i).then(t => {
		// 			const {
		// 				statusCode: i,
		// 				request: q,
		// 				headers: r,
		// 				body: o
		// 			} = t;
		// 			e(null, q, {
		// 				statusCode: i,
		// 				headers: r,
		// 				body: o
		// 			});
		// 		}, t => {
		// 			const {
		// 				message: s,
		// 				request: q,
		// 				response: i
		// 			} = t;
		// 			e(s, q, i);
		// 		});
		// 	}
		// }

		// isJsonString(str) {
		// 	if (typeof str == "string") {
		// 		try {
		// 			if (typeof JSON.parse(str) == "object") {
		// 				return true;
		// 			}
		// 		} catch (e) {
		// 			return false;
		// 		}
		// 	}
		// 	return false;
		// }



		time(t, x = null) {
			let xt = x ? new Date(x) : new Date;
			let e = {
				"M+": xt.getMonth() + 1,
				"d+": xt.getDate(),
				"h+": xt.getHours(),
				"m+": xt.getMinutes(),
				"s+": xt.getSeconds(),
				"q+": Math.floor((xt.getMonth() + 3) / 3),
				S: this.padStr(xt.getMilliseconds(), 3)
			};
			/(y+)/.test(t) && (t = t.replace(RegExp.$1, (xt.getFullYear() + "").substr(4 - RegExp.$1.length)));
			for (let s in e)
				new RegExp("(" + s + ")").test(t) && (t = t.replace(RegExp.$1, 1 == RegExp.$1.length ? e[s] : ("00" + e[s]).substr(("" + e[s]).length)));
			return t;
		}
		async showmsg() {
			if (!this.notifyFlag) return;
			if (!this.notifyStr) return;
			let notifyBody = this.name + " 运行通知\n\n" + this.notifyStr;
			if ($.isNode()) {
				var notify = require('./sendNotify');
				console.log('\n============== 推送 ==============');
				await notify.sendNotify(this.name, notifyBody);
			} else {
				this.msg(notifyBody);
			}
		}
		logAndNotify(str, flag = true) {
			if (flag) this.notifyFlag = true;
			console.log(str);
			this.notifyStr += str;
			this.notifyStr += '\n';
		}
		logAndNotifyWithTime(str, flag = true) {
			if (flag) this.notifyFlag = true;
			let t = '[' + this.time('hh:mm:ss.S') + ']' + str;
			console.log(t);
			this.notifyStr += t;
			this.notifyStr += '\n';
		}
		logWithTime(str) {
			console.log('[' + this.time('hh:mm:ss.S') + ']' + str);
		}
		msg(e = t, s = "", i = "", r) {
			const o = t => {
				if (!t)
					return t;
				if ("string" == typeof t)
					return this.isLoon() ? t : this.isQuanX() ? {
						"open-url": t
					}
						: this.isSurge() ? {
							url: t
						}
							: void 0;
				if ("object" == typeof t) {
					if (this.isLoon()) {
						let e = t.openUrl || t.url || t["open-url"],
							s = t.mediaUrl || t["media-url"];
						return {
							openUrl: e,
							mediaUrl: s
						};
					}
					if (this.isQuanX()) {
						let e = t["open-url"] || t.url || t.openUrl,
							s = t["media-url"] || t.mediaUrl;
						return {
							"open-url": e,
							"media-url": s
						};
					}
					if (this.isSurge()) {
						let e = t.url || t.openUrl || t["open-url"];
						return {
							url: e
						};
					}
				}
			};
			this.isMute || (this.isSurge() || this.isLoon() ? $notification.post(e, s, i, o(r)) : this.isQuanX() && $notify(e, s, i, o(r)));
			let h = ["", "============== 系统通知 =============="];
			h.push(e),
				s && h.push(s),
				i && h.push(i),
				console.log(h.join("\n"));
		}
		getMin(a, b) {
			return ((a < b) ? a : b);
		}
		getMax(a, b) {
			return ((a < b) ? b : a);
		}
		padStr(num, length, padding = '0') {
			let numStr = String(num);
			let numPad = (length > numStr.length) ? (length - numStr.length) : 0;
			let retStr = '';
			for (let i = 0; i < numPad; i++) {
				retStr += padding;
			}
			retStr += numStr;
			return retStr;
		}
		json2str(obj, c, encodeUrl = false) {
			let ret = [];
			for (let keys of Object.keys(obj).sort()) {
				let v = obj[keys];
				if (v && encodeUrl) v = encodeURIComponent(v);
				ret.push(keys + '=' + v);
			}
			return ret.join(c);
		}
		str2json(str, decodeUrl = false) {
			let ret = {};
			for (let item of str.split('&')) {
				if (!item) continue;
				let idx = item.indexOf('=');
				if (idx == -1) continue;
				let k = item.substr(0, idx);
				let v = item.substr(idx + 1);
				if (decodeUrl) v = decodeURIComponent(v);
				ret[k] = v;
			}
			return ret;
		}
		randomPattern(pattern, charset = 'abcdef0123456789') {
			let str = '';
			for (let chars of pattern) {
				if (chars == 'x') {
					str += charset.charAt(Math.floor(Math.random() * charset.length));
				} else if (chars == 'X') {
					str += charset.charAt(Math.floor(Math.random() * charset.length)).toUpperCase();
				} else {
					str += chars;
				}
			}
			return str;
		}
		randomString(len, charset = 'abcdef0123456789') {
			let str = '';
			for (let i = 0; i < len; i++) {
				str += charset.charAt(Math.floor(Math.random() * charset.length));
			}
			return str;
		}
		randomList(a) {
			let idx = Math.floor(Math.random() * a.length);
			return a[idx];
		}
		wait(t) {
			return new Promise(e => setTimeout(e, t));
		}
		async done(t = {}) {
			await this.showmsg();
			const e = (new Date).getTime(),
				s = (e - this.startTime) / 1e3;
			console.log(`\n${this.name} 运行结束，共运行了 ${s} 秒！`);
			if (this.isSurge() || this.isQuanX() || this.isLoon()) $done(t);
		}
	}(name, env);
}