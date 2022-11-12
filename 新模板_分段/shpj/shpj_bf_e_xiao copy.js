const $ = new Env("诗画浦江");
const notify = require("./sendNotify");


const CK_NAME = "shpj";
let app_id = 14;


class UserInfo {
	constructor(index, str) {
		this.index = index + 1;
		this.ck = str.split('#');
		this.xs = this.ck[0];
		this.xr = this.ck[1];
		this.salt = 'FR*r!isE5W';
		this.id = app_id;
		this.ts = ts13();
	}

	get_sign(path) {
		let _data = `${path}&&${this.xs}&&${this.xr}&&${this.ts}&&${this.salt}&&${this.id}`;
		// console.log('_data: ', _data);
		let sign = SHA256_Encrypt(_data);
		return sign;
	}


}

class Task {
	constructor(userInfo, api) {
		this.userInfo = userInfo;
		this.api = api;
		this.fun = new Map([
			[133, this.signin],
			[134, this.read],
			[135, this.share],
			[136, this.comment],
			[137, this.like],
		]);

	}

	// 返回体 if 统一处理
	async executeIf(name, result) {

		return new Promise((resolve, reject) => {
			if (result.code == 0) {
				resolve(result);
			} else {
				console.log(`${name}: 失败 ❌ 了呢,原因未知!`);
				console.log(result);
				reject(result);
			}

		});
	}

	getSignOption(options) {
		let path = options.path;
		let index = path.indexOf('?');
		if (index != -1) {
			path = path.substring(0, index);
		}
		let sign = this.userInfo.get_sign(path);
		let obj = {
			headers: {
				"X-SIGNATURE": sign,
			}
		};
		return $.mergeObjs(options, obj);
	}

	async catchGet(name, options) {
		return this.catchMessage(name, this.api.catchGet(name, this.getSignOption(options)));
	}

	async catchPost(name, options) {
		return this.catchMessage(name, this.api.catchPost(name, this.getSignOption(options)));
	}

	async catchMessage(name, p) {
		return p.then(result => {
			return this.executeIf(name, result);
		});
	}


	async getUserInfo() {
		let path = '/api/user_mumber/account_detail';
		let options = {
			path: path,
		};
		let name = "用户信息";
		return this.catchGet(name, options).then(async (result) => {
			doubleLog(`账号[${this.userInfo.index}]   ${result.data.rst.nick_name}, 手机号: ${phone_num(result.data.rst.mobile)}, 积分 ${result.data.rst.total_integral}, 等级 ${result.data.rst.grade} ${result.data.rst.grade_name}`);
			this.userInfo.nickname = result.data.rst.nick_name;
			await this.doList();
		});
	}

	// 任务列表   completed 0 未完成	1 完成
	async doList() {
		let options = {
			path: '/api/user_mumber/numberCenter'
		};

		let name = "任务列表";
		return this.catchGet(name, options).then(async (result) => {
			let tasks = result.data.rst.user_task_list;
			// doubleLog(tasks)
			for (const task of tasks) {
				$.type(task)
				console.log(task);
				let task_name = task.name;
				let finish_times = task.finish_times;
				let frequency = task.frequency;
				console.log(`==============`);
				console.log(task_name, finish_times, frequency);
				// doubleLog(task)
				doubleLog(`账号 ${this.userInfo.nickname} : ${task_name}----${finish_times}/${frequency}`);
				if (task.completed == 0) {
					let num = frequency - finish_times;
					for (let index = 0; index < num; index++) {
						if (this.fun.has(task.id)) {
							await this.fun.get(task.id).bind(this)(task_name);
						}
					}
				}
			}

		});

	}


	async artic() { // 获取文章
		let name = "获取文章";
		return this.catchGet(name, {
			path: `/api/article/channel_list?channel_id=5cc2ccbe1b011b18ee37591d&isDiFangHao=false&is_new=true&list_count=${randomInt(1, 5) * 10}&size=10&start=${this.userInfo.ts}`,
		}).then(async (result) => {
			doubleLog(`账号[${this.userInfo.index}]   ${name}, ok`);
			let p = randomInt(0, 9);
			this.rid = result.data.article_list[p].id;

		});

	}

	async signin(name) { //签到
		return this.catchGet(name, {
			path: '/api/user_mumber/sign'
		}).then(async (result) => {
			// doubleLog(result)
			doubleLog(`账号[${this.userInfo.index}]  ${name}" ${result.data.reason}, 获得积分 ${result.data.signIntegral}`);
			await wait(3);

		});

	}

	async read(name) { // 新闻资讯阅读
		await this.artic();

		return this.catchGet(name, {
			path: `/api/article/detail?id=${this.rid}`,
		}).then(async (result) => {
			doubleLog(`账号[${this.userInfo.index}]   ${name}, 文章ID${this.rid} ${result.data.article.list_title}`);
			await wait(3);

		});

	}

	async share(name) { // 分享资讯给好友
		await this.artic();

		return this.catchPost(name, {
			path: '/api/user_mumber/doTask',
			headers: {
				"Content-Type": `application/x-www-form-urlencoded`,
			},
			form: {
				'memberType': '3',
				'member_type': '3'
			}
		}).then(async (result) => {
			doubleLog(`账号[${this.userInfo.index}]   ${name} :文章ID ${this.rid}, ok}`);
			await wait(3);

		});

	}

	async comment(name) { // 新闻资讯评论
		await this.artic();

		return this.catchPost(name, {
			path: '/api/comment/create',
			form: {
				'channel_article_id': this.rid,
				'content': 1
			}
		}).then(async (result) => {
			doubleLog(`账号[${this.userInfo.index}]   ${name} :文章ID ${this.rid}, ok}`);
			await wait(3);

		});

	}

	async like(name) { // 新闻资讯点赞
		await this.artic();

		return this.catchPost(name, {
			path: '/api/favorite/like',
			headers: {
				"Content-Type": `application/x-www-form-urlencoded`,
			},
			form: {
				'id': this.rid,
				'action': true
			}
		}).then(async (result) => {
			doubleLog(`账号[${this.userInfo.index}]   ${name} :文章ID ${this.rid}, ok}`);
			await wait(3);

		});
	}


}

async function main(userInfo) {
	let host = `https://vapp.tmuyun.com`;
	let headers = {
		"X-SESSION-ID": userInfo.xs,
		"X-REQUEST-ID": userInfo.xr,
		"X-TIMESTAMP": userInfo.ts,
		// "X-SIGNATURE": sign,
		"Cache-Control": `no-cache`,
		"X-TENANT-ID": `14`,
		'Host': 'vapp.tmuyun.com',
	};
	let api = new Api(host, headers);
	let task = new Task(userInfo, api);
	await task.getUserInfo();
}
///////////////////////////////////////////////////////////////////


async function getUsers(ckName, fnUserInfo) {
	let userList = [];
	let userCookie = process.env[ckName];
	let envSplicer = ["@", "\n", "&"];
	let userCount = 0;
	if (userCookie) {
		let e = envSplicer[0];
		for (let o of envSplicer)
			if (userCookie.indexOf(o) > -1) {
				e = o;
				break;
			}
		let arr = userCookie.split(e);
		for (let index = 0; index < arr.length; index++) {
			const element = arr[index];
			element && userList.push(await fnUserInfo(index, element));
		}
		userCount = userList.length;
	} else {
		console.log("未找到CK");
	}
	console.log(`共找到${userCount}个账号`), !0;
	return userList;
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
					// console.log(data);
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


function doubleLog(...args) {
	console.log(...args);
}



// 新的 env 函数, 增加自定义功能 yml-11.12改
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
		mergeObjs(def, obj) {
			if (!obj) {
				return def;
			} else if (!def) {
				return obj;
			}
			for (var i in obj) {
				if (obj[i] != null && obj[i].constructor == Object) {
					def[i] = $.mergeObjs(def[i], obj[i]);
				}
				else if (obj[i] != null && (obj[i] instanceof Array) && obj[i].length > 0) {
					if (obj[i][0].constructor == Object) {
						var newobjs = [];
						var objids = {};
						for (var x = 0, l = def[i].length; x < l; x++) {
							objids[def[i][x].id] = x;
						}
						for (var x = 0, l = obj[i].length; x < l; x++) {
							var newobj = obj[i][x];
							if (objids[newobj.id] !== undefined) {
								def[i][x] = $.mergeObjs(def[i][x], newobj);
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
			const e = (new Date).getTime(), s = (e - this.startTime) / 1e3;
			console.log(`\n${this.name} 运行结束，共运行了 ${s} 秒！`);
		}
	}(name, env);
}



/**
 * 等待 X 秒
 */
function wait(n) {
	return new Promise(function (resolve) {
		setTimeout(resolve, n * 1000);
	});
}



/**
 * 手机号中间遮挡
 */
function phone_num(phone_num) {
	if (phone_num.length == 11) {
		let data = phone_num.replace(/(\d{3})\d{4}(\d{4})/, "$1****$2");
		return data;
	} else {
		return phone_num;
	}
}



/**
 * 随机整数生成
 */
function randomInt(min, max) {
	return Math.round(Math.random() * (max - min) + min);
}

/**
 * 时间戳 13位
 */
function ts13() {
	return Math.round(new Date().getTime()).toString();
}











/**
 * SHA256 加密  
 */
function SHA256_Encrypt(data) {
	sha256_init();
	sha256_update(data, data.length);
	sha256_final();
	return sha256_encode_hex();
}
/* SHA256 logical functions */ function rotateRight(n, x) { return (x >>> n) | (x << (32 - n)); } function choice(x, y, z) { return (x & y) ^ (~x & z); } function majority(x, y, z) { return (x & y) ^ (x & z) ^ (y & z); } function sha256_Sigma0(x) { return rotateRight(2, x) ^ rotateRight(13, x) ^ rotateRight(22, x); } function sha256_Sigma1(x) { return rotateRight(6, x) ^ rotateRight(11, x) ^ rotateRight(25, x); } function sha256_sigma0(x) { return rotateRight(7, x) ^ rotateRight(18, x) ^ (x >>> 3); } function sha256_sigma1(x) { return rotateRight(17, x) ^ rotateRight(19, x) ^ (x >>> 10); } function sha256_expand(W, j) { return (W[j & 0x0f] += sha256_sigma1(W[(j + 14) & 0x0f]) + W[(j + 9) & 0x0f] + sha256_sigma0(W[(j + 1) & 0x0f])); } /* Hash constant words K: */ var K256 = new Array(0x428a2f98, 0x71374491, 0xb5c0fbcf, 0xe9b5dba5, 0x3956c25b, 0x59f111f1, 0x923f82a4, 0xab1c5ed5, 0xd807aa98, 0x12835b01, 0x243185be, 0x550c7dc3, 0x72be5d74, 0x80deb1fe, 0x9bdc06a7, 0xc19bf174, 0xe49b69c1, 0xefbe4786, 0x0fc19dc6, 0x240ca1cc, 0x2de92c6f, 0x4a7484aa, 0x5cb0a9dc, 0x76f988da, 0x983e5152, 0xa831c66d, 0xb00327c8, 0xbf597fc7, 0xc6e00bf3, 0xd5a79147, 0x06ca6351, 0x14292967, 0x27b70a85, 0x2e1b2138, 0x4d2c6dfc, 0x53380d13, 0x650a7354, 0x766a0abb, 0x81c2c92e, 0x92722c85, 0xa2bfe8a1, 0xa81a664b, 0xc24b8b70, 0xc76c51a3, 0xd192e819, 0xd6990624, 0xf40e3585, 0x106aa070, 0x19a4c116, 0x1e376c08, 0x2748774c, 0x34b0bcb5, 0x391c0cb3, 0x4ed8aa4a, 0x5b9cca4f, 0x682e6ff3, 0x748f82ee, 0x78a5636f, 0x84c87814, 0x8cc70208, 0x90befffa, 0xa4506ceb, 0xbef9a3f7, 0xc67178f2); /* global arrays */ var ihash, count, buffer; var sha256_hex_digits = "0123456789abcdef"; /* Add 32-bit integers with 16-bit operations (bug in some JS-interpreters: overflow) */ function safe_add(x, y) { var lsw = (x & 0xffff) + (y & 0xffff); var msw = (x >> 16) + (y >> 16) + (lsw >> 16); return (msw << 16) | (lsw & 0xffff); } /* Initialise the SHA256 computation */ function sha256_init() { ihash = new Array(8); count = new Array(2); buffer = new Array(64); count[0] = count[1] = 0; ihash[0] = 0x6a09e667; ihash[1] = 0xbb67ae85; ihash[2] = 0x3c6ef372; ihash[3] = 0xa54ff53a; ihash[4] = 0x510e527f; ihash[5] = 0x9b05688c; ihash[6] = 0x1f83d9ab; ihash[7] = 0x5be0cd19; } /* Transform a 512-bit message block */ function sha256_transform() { var a, b, c, d, e, f, g, h, T1, T2; var W = new Array(16); /* Initialize registers with the previous intermediate value */ a = ihash[0]; b = ihash[1]; c = ihash[2]; d = ihash[3]; e = ihash[4]; f = ihash[5]; g = ihash[6]; h = ihash[7]; /* make 32-bit words */ for (var i = 0; i < 16; i++) W[i] = buffer[(i << 2) + 3] | (buffer[(i << 2) + 2] << 8) | (buffer[(i << 2) + 1] << 16) | (buffer[i << 2] << 24); for (var j = 0; j < 64; j++) { T1 = h + sha256_Sigma1(e) + choice(e, f, g) + K256[j]; if (j < 16) T1 += W[j]; else T1 += sha256_expand(W, j); T2 = sha256_Sigma0(a) + majority(a, b, c); h = g; g = f; f = e; e = safe_add(d, T1); d = c; c = b; b = a; a = safe_add(T1, T2); } /* Compute the current intermediate hash value */ ihash[0] += a; ihash[1] += b; ihash[2] += c; ihash[3] += d; ihash[4] += e; ihash[5] += f; ihash[6] += g; ihash[7] += h; } /* Read the next chunk of data and update the SHA256 computation */ function sha256_update(data, inputLen) { var i, index, curpos = 0; /* Compute number of bytes mod 64 */ index = (count[0] >> 3) & 0x3f; var remainder = inputLen & 0x3f; /* Update number of bits */ if ((count[0] += inputLen << 3) < inputLen << 3) count[1]++; count[1] += inputLen >> 29; /* Transform as many times as possible */ for (i = 0; i + 63 < inputLen; i += 64) { for (var j = index; j < 64; j++) buffer[j] = data.charCodeAt(curpos++); sha256_transform(); index = 0; } /* Buffer remaining input */ for (var j = 0; j < remainder; j++) buffer[j] = data.charCodeAt(curpos++); } /* Finish the computation by operations such as padding */ function sha256_final() { var index = (count[0] >> 3) & 0x3f; buffer[index++] = 0x80; if (index <= 56) { for (var i = index; i < 56; i++) buffer[i] = 0; } else { for (var i = index; i < 64; i++) buffer[i] = 0; sha256_transform(); for (var i = 0; i < 56; i++) buffer[i] = 0; } buffer[56] = (count[1] >>> 24) & 0xff; buffer[57] = (count[1] >>> 16) & 0xff; buffer[58] = (count[1] >>> 8) & 0xff; buffer[59] = count[1] & 0xff; buffer[60] = (count[0] >>> 24) & 0xff; buffer[61] = (count[0] >>> 16) & 0xff; buffer[62] = (count[0] >>> 8) & 0xff; buffer[63] = count[0] & 0xff; sha256_transform(); } /* Split the internal hash values into an array of bytes */ function sha256_encode_bytes() { var j = 0; var output = new Array(32); for (var i = 0; i < 8; i++) { output[j++] = (ihash[i] >>> 24) & 0xff; output[j++] = (ihash[i] >>> 16) & 0xff; output[j++] = (ihash[i] >>> 8) & 0xff; output[j++] = ihash[i] & 0xff; } return output; } /* Get the internal hash as a hex string */ function sha256_encode_hex() { var output = new String(); for (var i = 0; i < 8; i++) { for (var j = 28; j >= 0; j -= 4) output += sha256_hex_digits.charAt((ihash[i] >>> j) & 0x0f); } return output; }




