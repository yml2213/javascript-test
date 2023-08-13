
const $ = new Env("诗画浦江");



var options1 = {
	'method': 'GET',
	'url': 'https://api.telegram.org/bot5744956160:AAE2KjAs15b6sh4YimDPYPnsknz3Zcjtp3g/getWebhookInfo',
	'headers': {
		'User-Agent': 'Apifox/1.0.0 (https://www.apifox.cn)'
	}
};
var options3 = {
	'method': 'GET',
	'url': 'https://van.mama.cn/welfare/v6/welfare/task/taskListV51',
	'headers': {
		'Cookie': 'xkey=cd245d517e505036a010a41c2fcdf12d; user_id=106543772; app_passport_login_sid=84ev9r79mfjvrh69h3aq7ahcl7; pt_rel=2; pt_mode=2; pt_source=1; pt_version=12.10.1; pt_bb_birthday=2022-11-07; pt_prepare_pt_date=; pt_open_mmid=fd4196854db380b47caf9eb6ab396f2ea5; Hm_lvt_eb0574442ce2ba3b60f4105fa7df1e3c=1667835941; Hm_lvt_f2babe867b10ece0ff53079ad6c04981=1667835941; PHPSESSID=0a8e3adc13afe0022032643c60188be5; app_init_data=%7B%22app%22%3A%22pt%22%2C%22client%22%3A%22pt%22%2C%22pt_rel%22%3A%22%22%2C%22device%22%3A%22%22%7D; PPSID=84ev9r79mfjvrh69h3aq7ahcl7; Hm_lpvt_eb0574442ce2ba3b60f4105fa7df1e3c=1667836067; Hm_lpvt_f2babe867b10ece0ff53079ad6c04981=1667836067',
		'x-requested-with': 'cn.mama.pregnant',
		'User-Agent': 'Apifox/1.0.0 (https://www.apifox.cn)'
	}
};

var options = {
	'method': 'POST',
	'url': 'https://api.telegram.org/bot5744956160:AAE2KjAs15b6sh4YimDPYPnsknz3Zcjtp3g/setWebhook',
	'headers': {
		'User-Agent': 'Apifox/1.0.0 (https://www.apifox.cn)',
		'Content-type': 'application/json'
	},
	body: JSON.stringify({
		"url": "https://tg-bot-yml2213.vercel.app/api/webhook"
	})

};

async function t() {
	let res = await httpRequest(options3);
	// let res_format = await httpRequest(options3, 1);
	console.log(res);
	// console.log(res_format);
	console.log(await $.yiyan());

}

t();


async function httpRequest(options, type = false) {
	return new Promise((resolve) => {
		$.send(options, async (err, res_body, res_format, res) => {
			if (err) {
				console.log(`错误, 检查点2`); return;
			}
			if (!type) {
				resolve(res_body);
			} resolve(res_format);
		});
	});
}

// 新的 env 函数, 增加自定义功能 yml-11.12改  仅支持 node 青龙




// 新的 env 函数, 增加自定义功能 yml-11.12改  仅支持 node 青龙  未合并
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
		send(options, e = (() => { })) {
			let m = options.method.toLowerCase();
			let t = options;
			if (m != 'get' && m != 'post' && m != 'put' && m != 'delete') {
				console.log(`无效的http方法: ${m}`);
				return;
			}
			if (m == 'get' && t.headers) {
				delete t.headers["Content-Type"];
				delete t.headers["Content-Length"];
			} else if (t.body && t.headers) {
				if (t.headers["content-type"]) {
					let tem = t.headers["content-type"];
					delete t.headers["content-type"];
					t.headers["Content-Type"] = tem;
				} else if (t.body && t.headers) {
					if (!t.headers["Content-Type"]) t.headers["Content-Type"] = "application/x-www-form-urlencoded";
				}
			}
			if (this.isNode()) {
				this.request = this.request ? this.request : require("request");
				this.request(options, function (error, response) {
					if (error) throw new Error(error);
					let res_body = response.body;
					let res = response;
					try {
						if (typeof res_body == "string") {
							if ($.isJsonStr(res_body)) {
								res_body = JSON.parse(res_body);
								let res_format = $.formatJson(response.body);
								// console.log(res_body);
								// console.log(res_format);
								e(null, res_body, res_format, res);
							} else e(null, res_body, res_format, res);
						} else e(null, res_body, res_format, res);
					} catch (error) {
						console.log(error);
						let a = `ENV -- request 请求错误, 检查点1\n${error}`;
						e(a, null, null, null);
					}
				});
			}
		}

		isJsonStr(str) {
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

		
		formatJson(value) {
			var json = value;
			var i = 0,
				len = 0,
				tab = "    ",
				targetJson = '',
				indentLevel = 0,
				inString = false,
				currentChar = null;
			for (i = 0, len = json.length; i < len; i += 1) {
				currentChar = json.charAt(i);
				switch (currentChar) {
					case '{':
					case '[':
						if (!inString) {
							targetJson += currentChar + "\n" + repeat(tab, indentLevel + 1);
							indentLevel += 1;
						} else {
							targetJson += currentChar;
						}
						break;
					case '}':
					case ']':
						if (!inString) {
							indentLevel -= 1;
							targetJson += "\n" + repeat(tab, indentLevel) + currentChar;
						} else {
							targetJson += currentChar;
						}
						break;
					case ',':
						if (!inString) {
							targetJson += ",\n" + repeat(tab, indentLevel);
						} else {
							targetJson += currentChar;
						}
						break;
					case ':':
						if (!inString) {
							targetJson += ": ";
						} else {
							targetJson += currentChar;
						}
						break;
					case ' ':
					case "\n":
					case "\t":
						if (inString) {
							targetJson += currentChar;
						}
						break;
					case '"':
						if (i > 0 && json.charAt(i - 1) !== '\\') {
							inString = !inString;
						}
						targetJson += currentChar;
						break;
					default:
						targetJson += currentChar;
						break;
				}
			}
			function repeat(s, count) {
				return new Array(count + 1).join(s);
			}
			function repeat(s, count) {
				return new Array(count + 1).join(s);
			}
			return targetJson;
		}
		type(str) {
			if (this.strCode(str) > 20) {
				return console.log(`数据类型是: ${typeof (str)}`);
			} return console.log(`${str}数据类型是: ${typeof (str)}`);
		}
		strCode(str) {
			var count = 0;
			if (str) {
				let len = str.length;
				for (var i = 0; i < len; i++) {
					if (str.charCodeAt(i) > 255) {
						count += 2;
					} else {
						count++;
					}
				}
				return count;
			} else return 0;
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
		randomStr(len, up = false, charset = 'abcdef0123456789') {
			let str = '';
			for (let i = 0; i < len; i++) {
				str += charset.charAt(Math.floor(Math.random() * charset.length));
			}
			if (!up) {
				return str;
			} return str.toUpperCase();
		}
		phoneNum(phone_num) {
			if (phone_num.length == 11) {
				let data = phone_num.replace(/(\d{3})\d{4}(\d{4})/, "$1****$2");
				return data;
			} else {
				return phone_num;
			}
		}
		randomInt(min, max) {
			return Math.round(Math.random() * (max - min) + min);
		}
		async yiyan() {
			this.request = this.request ? this.request : require("request");
			return new Promise((resolve) => {
				var options = {
					method: "GET",
					url: "https://v1.hitokoto.cn/",
					headers: {},
				};
				this.request(options, function (error, response) {
					// console.log(response.body);
					let data = JSON.parse(response.body);
					let data_ = `[一言]: ${data.hitokoto}  by--${data.from}`;
					resolve(data_);
				});
			});
		}
		wait(t) {
			return new Promise(e => setTimeout(e, t * 1000));
		}
		ts(type = false, _data = '') {
			let myDate = new Date();
			let a = '';
			switch (type) {
				case 10:
					a = Math.round(new Date().getTime() / 1000).toString();
					break;
				case 13:
					a = Math.round(new Date().getTime()).toString();
					break;
				case 'h':
					a = myDate.getHours();
					break;
				case 'm':
					a = myDate.getMinutes();
					break;
				case 'y':
					a = myDate.getFullYear();
					break;
				case 'h':
					a = myDate.getHours();
					break;
				case 'mo':
					a = myDate.getMonth();
					break;
				case 'd':
					a = myDate.getDate();
					break;
				case 'ts2Data':
					if (_data != '') {
						time = _data;
						if (time.toString().length == 13) {
							let date = new Date(time + 8 * 3600 * 1000);
							a = date.toJSON().substr(0, 19).replace("T", " ");
						} else if (time.toString().length == 10) {
							time = time * 1000;
							let date = new Date(time + 8 * 3600 * 1000);
							a = date.toJSON().substr(0, 19).replace("T", " ");
						}
					}

					break;
				default:
					a = '未知错误,请检查';
					break;
			}
			return a;
		}
		async done(t = {}) {
			await this.showmsg();
			const e = (new Date).getTime(),
				s = (e - this.startTime) / 1e3;
			console.log(`\n${this.name} 运行结束，共运行了 ${s} 秒！`);
		}
	}(name, env);
}