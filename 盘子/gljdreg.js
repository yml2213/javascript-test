/**
 * 格林酒店-注册机
 * cron 10 7 * * *  gljd.js
 *
 * 9-18		盘子, 自己0薅玩, 坑了钱别来找我
 *
 * ========= 青龙--配置文件-贴心复制区域 =========
 
# 格林酒店
export gljd='xcx_openid & activeId的值 & 城市名'

 * 多账号用 换行 或 @ 分割
 * 抓包 kohler-mini.brandsh.cn , 找到 xcx_openid , activeId, 城市名汉字  即可
 * ====================================
 * tg频道: https://t.me/yml2213_tg  
 */


//-------------------- 配置区域 --------------------
const reg_num = '20'  //注册数量
const regcode = '7f8350' //邀请码
const pw = 'gljd123654'  //密码
// -----------------------------------------------


const $ = new Env("格林酒店-注册机");
const alias_name = 'gljd'
const notify = $.isNode() ? require("./sendNotify") : "";
const Notify = 1 		//0为关闭通知,1为打开通知,默认为1
const debug = 0		    //0为关闭调试,1为打开调试,默认为0
//---------------------------------------------------------------------------------------------------------
let ckStr = process.env[alias_name];
let msg, ck;
let ck_status = true;
let userinfo = ''
//---------------------------------------------------------------------------------------------------------
let VersionCheck = "0.0.1"
let Change = '领取每日任务!'
let thank = `\n感谢 群友 的投稿\n`
//---------------------------------------------------------------------------------------------------------

async function tips(ckArr) {
	// let Version_latest = await Version_Check(alias_name, '1');
	let Version = `\n📌 本地脚本: V ${VersionCheck}  `
	DoubleLog(`${Version}\n📌 🆙 更新内容: ${Change}`);
	// DoubleLog(`${thank}`);
	await wyy('网抑云');
	DoubleLog(`\n========== 共找到 ${ckArr.length} 个账号 ==========`);
	debugLog(`【debug】 这是你的账号数组:\n ${ckArr}`);
}



async function start() {
	for (let index = 0; index < reg_num; index++) {
		await gljdreg('开始注册');
	}
	console.log(`账号信息\n\n`);
	console.log(userinfo);
	console.log(`\n\n`);
}






// 注册
async function gljdreg(name) {
	console.log(`\n开始 第${index}次${name}`);
	await get_code('获取验证码');
	try {
		let url = `https://app.gelinjiudianzq.com/api/v1/user/register`
		phone_code = await phone('获取手机号')
		console.log(phone_code);
		let body = `{"captcha_code":"${code}","captcha_id":"${code_id}","password":"${pw}","reg_code":"${regcode}","tel":"${phone_code}"}`
		let urlObject = populateUrlObject(url, body)
		await httpRequest('post', urlObject, name)
		let result = httpResult;
		if (!result) return
		// console.log(result)
		if (result.expire_sec) {
			console.log(`注册成功`);
			userinfo += `${phone_code}&${pw}\n`
			console.log(`等待 10 s`);
			await wait(10)
			// console.log(`账号信息:    ${phone_code}&${pw}`);
		} else {
			console.log(`注册失败!`)
		}
	} catch (e) {
		console.log(e)
	}
}





// 获取验证码
async function get_code(name) {
	console.log(`\n开始 ${name}`);
	try {
		let url = `https://app.gelinjiudianzq.com/api/v1/captcha?`
		let urlObject = populateUrlObject(url)
		await httpRequest('get', urlObject, name)
		let result = httpResult;
		if (!result) return
		// console.log(result)
		if (result.id) {
			code_base64 = result.base64.split(',')[1]
			code_id = result.id
			// console.log(code_base64);
			console.log(`验证码获取成功`)
			await recognition_coed('识别验证码', code_base64)
		} else {
			console.log(`签到失败: ${result.msg}`)
		}
	} catch (e) {
		console.log(e)
	}
}

// 识别验证码
async function recognition_coed(name, code_base64) {
	console.log(`\n开始 ${name}`);
	try {
		let url = `http://81.70.196.85:9898/ocr/b64/json`
		let body = `${code_base64}`
		let urlObject = populateUrlObject(url, body)
		await httpRequest('post', urlObject, name)
		let result = httpResult;
		if (!result) return
		// console.log(result)
		if (result.status == 200 && result.msg == '') {
			code = result.result;
			if (code.length == 4) {
				DoubleLog(`识别成功:${code}`);
				return code
			} else {
				DoubleLog(`识别失败: ${result.msg}`)
			}
		} else if (result.msg != '') {
			DoubleLog(`识别失败: ${result.msg}`)
		} else {
			DoubleLog(`未知错误!`)
		}
	} catch (e) {
		console.log(e)
	}
}

// 随机手机号
async function phone() {
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













// #region ********************************************************  固定代码  ********************************************************




//  账号处理
!(async () => {
	let ckArr = await checkEnv(ckStr, alias_name);
	await tips(ckArr);
	for (let index = 0; index < ckArr.length; index++) {
		let num = index + 1;
		DoubleLog(`\n-------- 开始【第 ${num} 个账号】--------`);
		ck = ckArr[index].split("&");
		debugLog(`【debug】 这是你第 ${num} 账号信息:\n ${ck}`);
		await start();
	}
	await SendMsg(msg);
})()
	.catch((e) => console.log(e))
	.finally(() => $.done());







/**
 * 变量检查
 */
async function checkEnv(ck, Variables) {
	return new Promise((resolve) => {
		let ckArr = []
		if (ck) {
			if (ck.indexOf("@") !== -1) {

				ck.split("@").forEach((item) => {
					ckArr.push(item);
				});
			} else if (ck.indexOf("\n") !== -1) {

				ck.split("\n").forEach((item) => {
					ckArr.push(item);
				});
			} else {
				ckArr.push(ck);
			}
			resolve(ckArr)
		} else {
			console.log();
			console.log(` ${$.neme}:未填写变量 ${Variables} ,请仔细阅读脚本说明!`)
		}
	}
	)
}


/**
 * 获取远程版本
 * http://yml-gitea.ml:2233/yml/JavaScript-yml/raw/branch/master/${name}.js
 * https://raw.gh.fakev.cn/yml2213/javascript/master/${name}/${name}.js
 */
function Version_Check(name, type) {
	return new Promise((resolve) => {
		if (type == 1) {
			data = `https://raw.gh.fakev.cn/yml2213/javascript/master/${name}/${name}.js`
		} else if (type == 2) {
			data = `http://yml-gitea.ml:2233/yml/JavaScript-yml/raw/branch/master/${name}.js`
		}
		let url = {
			url: data,
		}
		$.get(url, async (err, resp, data) => {
			try {
				VersionCheck = resp.body.match(/VersionCheck = "([\d\.]+)"/)[1]
			} catch (e) {
				console.log(e)
			} finally {
				resolve(VersionCheck)
			}
		}, timeout = 3)
	})
}

/**
 * 发送消息
 */
async function SendMsg(message) {
	if (!message) return;
	if (Notify > 0) {
		if ($.isNode()) {
			var notify = require("./sendNotify");
			await notify.sendNotify($.name, message);
		} else {
			// $.msg(message);
			$.msg($.name, '', message)
		}
	} else {
		console.log(message);
	}
}

/**
 * 双平台log输出
 */
function DoubleLog(data) {
	if ($.isNode()) {
		if (data) {
			console.log(`    ${data}`);
			msg += `\n    ${data}`;
		}
	} else {
		console.log(`    ${data}`);
		msg += `\n    ${data}`;
	}

}

/**
 * 随机 数字 + 大写字母 生成
 */
function randomszdx(e) {
	e = e || 32;
	var t = "QWERTYUIOPASDFGHJKLZXCVBNM1234567890",
		a = t.length,
		n = "";

	for (i = 0; i < e; i++) n += t.charAt(Math.floor(Math.random() * a));
	return n;
}


/**
 * 随机 数字 + 小写字母 生成
 */
function randomszxx(e) {
	e = e || 32;
	var t = "qwertyuioplkjhgfdsazxcvbnm1234567890",
		a = t.length,
		n = "";

	for (i = 0; i < e; i++) n += t.charAt(Math.floor(Math.random() * a));
	return n;
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
 * 时间戳 10位
 */
function ts10() {
	return Math.round(new Date().getTime() / 1000).toString();
}


/**
 * 时间戳 转 日期
 */
function tmtoDate(time = +new Date()) {
	if (time.toString().length == 13) {
		var date = new Date(time + 8 * 3600 * 1000);
		return date.toJSON().substr(0, 19).replace('T', ' ');
	} else if (time.toString().length == 10) {
		time = time * 1000;
		var date = new Date(time + 8 * 3600 * 1000);
		return date.toJSON().substr(0, 19).replace('T', ' ');
	}
}

/**
 * 获取当前小时数
 */
function local_hours() {
	let myDate = new Date();
	let h = myDate.getHours();
	return h;
}

/**
 * 获取当前分钟数
 */
function local_minutes() {
	let myDate = new Date();
	let m = myDate.getMinutes();
	return m;
}


/**
 * 获取当前年份 2022
 */
function local_year() {
	let myDate = new Date();
	y = myDate.getFullYear();
	return y;
}

/**
 * 获取当前月份(数字)  5月
 */
function local_month() {
	let myDate = new Date();
	let m = myDate.getMonth();
	return m;
}


/**
* 获取当前月份(数字)  05月 补零
*/
function local_month_two() {
	let myDate = new Date();
	let m = myDate.getMonth();
	if (m.toString().length == 1) {
		m = `0${m}`
	}
	return m;
}

/**
* 获取当前天数(数字)  5日  
*/
function local_day() {
	let myDate = new Date();
	let d = myDate.getDate();
	return d;
}


/**
* 获取当前天数  05日 补零
*/
function local_day_two() {
	let myDate = new Date();
	let d = myDate.getDate();
	if (d.toString().length == 1) {
		d = `0${d}`
	}
	return d;
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
 * 每日网抑云
 */
async function wyy(name) {
	try {
		let url = `https://api.qqsuu.cn/api/comment`
		let urlObject = populateUrlObject(url)
		await httpRequest('get', urlObject, name)
		let result = httpResult;
		if (!result) return
		// console.log(result)
		if (result.code == 1) {
			content = result.data[0].content
			source = result.data[0].source
			msg = `[网抑云时间]: ${content}  by--${source}`
			DoubleLog(msg);
		} else {
			DoubleLog(`请求失败: ${result.msg}`)
		}
	} catch (e) {
		console.log(e)
	} finally { }
}



// url 填充
function populateUrlObject(url, body = '') {
	let host = url.replace('//', '/').split('/')[1]
	let urlObject = {
		url: url,
		headers: {
			'Host': host,
			'User-Agent': getUA(),
			'Connection': 'keep-alive',
		},
		timeout: 5000,
	}
	if (body) {
		urlObject.body = body
		urlObject.headers['Content-Type'] = 'application/x-www-form-urlencoded'
		urlObject.headers['Content-Length'] = urlObject.body ? urlObject.body.length : 0
	}
	return urlObject;
}



// 网络请求
async function httpRequest(method, url, name) {
	httpResult = null, httpReq = null, httpResp = null;
	return new Promise((resolve) => {
		$.send(method, url, async (err, req, resp) => {
			try {
				httpReq = req;
				httpResp = resp;
				if (debug) {
					console.log(`\n 【debug】=============== 这是 ${name} 请求 url ===============`);
					console.log(url);
				}
				if (err) {
					console.log(`${method}请求失败`);
					console.log(JSON.stringify(err));
				} else {
					if (debug) {
						console.log(`\n\n 【debug】===============这是 ${name} 返回data==============`);
						console.log(resp);
					}
					if (resp.body) {
						if (typeof resp.body == "object") {
							httpResult = resp.body;
						} else {
							try {
								httpResult = JSON.parse(resp.body);
							} catch (e) { }
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


function getUA() {
	$.UUID = randomString(40)
	const buildMap = {
		"167814": `10.1.4`,
		"167841": `10.1.6`,
		"167853": `10.2.0`
	}
	$.osVersion = `${randomNum(13, 14)}.${randomNum(3, 6)}.${randomNum(1, 3)}`
	let network = `network/${['4g', '5g', 'wifi'][randomNum(0, 2)]}`
	$.mobile = `iPhone${randomNum(9, 13)},${randomNum(1, 3)}`
	$.build = ["167814", "167841", "167853"][randomNum(0, 2)]
	$.appVersion = buildMap[$.build]
	return `jdapp;iPhone;${$.appVersion};${$.osVersion};${$.UUID};M/5.0;${network};ADID/;model/${$.mobile};addressid/;appBuild/${$.build};jdSupportDarkMode/0;Mozilla/5.0 (iPhone; CPU iPhone OS ${$.osVersion.replace(/\./g, "_")} like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Mobile/15E148;supportJDSHWK/1;`


	function randomString(min, max = 0) {
		var str = "", range = min, arr = [...Array(36).keys()].map(k => k.toString(36));

		if (max) {
			range = Math.floor(Math.random() * (max - min + 1) + min);
		}

		for (let i = 0; i < range;) {
			let randomString = Math.random().toString(16).substring(2)
			if ((range - i) > randomString.length) {
				str += randomString
				i += randomString.length
			} else {
				str += randomString.slice(i - range)
				i += randomString.length
			}
		}
		return str;
	}

	function randomNum(min, max) {
		if (arguments.length === 0) return Math.random()
		if (!max) max = 10 ** (Math.log(min) * Math.LOG10E + 1 | 0) - 1
		return Math.floor(Math.random() * (max - min + 1) + min);
	}
}




/**
 * debug调试
 */
function debugLog(...args) {
	if (debug) {
		console.log(...args);
	}
}



function Env(name, env) {
	"undefined" != typeof process && JSON.stringify(process.env).indexOf("GITHUB") > -1 && process.exit(0);
	return new class {
		constructor(name, env) {
			this.name = name
			this.notifyStr = ''
			this.startTime = (new Date).getTime()
			Object.assign(this, env)
			console.log(`${this.name} 开始运行：\n`)
		}
		isNode() {
			return "undefined" != typeof module && !!module.exports
		}
		isQuanX() {
			return "undefined" != typeof $task
		}
		isSurge() {
			return "undefined" != typeof $httpClient && "undefined" == typeof $loon
		}
		isLoon() {
			return "undefined" != typeof $loon
		}
		getdata(t) {
			let e = this.getval(t);
			if (/^@/.test(t)) {
				const [, s, i] = /^@(.*?)\.(.*?)$/.exec(t),
					r = s ? this.getval(s) : "";
				if (r)
					try {
						const t = JSON.parse(r);
						e = t ? this.lodash_get(t, i, "") : e
					} catch (t) {
						e = ""
					}
			}
			return e
		}
		setdata(t, e) {
			let s = !1;
			if (/^@/.test(e)) {
				const [, i, r] = /^@(.*?)\.(.*?)$/.exec(e),
					o = this.getval(i),
					h = i ? "null" === o ? null : o || "{}" : "{}";
				try {
					const e = JSON.parse(h);
					this.lodash_set(e, r, t),
						s = this.setval(JSON.stringify(e), i)
				} catch (e) {
					const o = {};
					this.lodash_set(o, r, t),
						s = this.setval(JSON.stringify(o), i)
				}
			}
			elses = this.setval(t, e);
			return s
		}
		getval(t) {
			return this.isSurge() || this.isLoon() ? $persistentStore.read(t) : this.isQuanX() ? $prefs.valueForKey(t) : this.isNode() ? (this.data = this.loaddata(), this.data[t]) : this.data && this.data[t] || null
		}
		setval(t, e) {
			return this.isSurge() || this.isLoon() ? $persistentStore.write(t, e) : this.isQuanX() ? $prefs.setValueForKey(t, e) : this.isNode() ? (this.data = this.loaddata(), this.data[e] = t, this.writedata(), !0) : this.data && this.data[e] || null
		}
		send(m, t, e = (() => { })) {
			if (m != 'get' && m != 'post' && m != 'put' && m != 'delete') {
				console.log(`无效的http方法：${m}`);
				return;
			}
			if (m == 'get' && t.headers) {
				delete t.headers["Content-Type"];
				delete t.headers["Content-Length"];
			} else if (t.body && t.headers) {
				if (!t.headers["Content-Type"]) t.headers["Content-Type"] = "application/x-www-form-urlencoded";
			}
			if (this.isSurge() || this.isLoon()) {
				if (this.isSurge() && this.isNeedRewrite) {
					t.headers = t.headers || {};
					Object.assign(t.headers, { "X-Surge-Skip-Scripting": !1 });
				}
				let conf = {
					method: m,
					url: t.url,
					headers: t.headers,
					timeout: t.timeout,
					data: t.body
				};
				if (m == 'get') delete conf.data
				$axios(conf).then(t => {
					const {
						status: i,
						request: q,
						headers: r,
						data: o
					} = t;
					e(null, q, {
						statusCode: i,
						headers: r,
						body: o
					});
				}).catch(err => console.log(err))
			} else if (this.isQuanX()) {
				t.method = m.toUpperCase(), this.isNeedRewrite && (t.opts = t.opts || {}, Object.assign(t.opts, {
					hints: !1
				})),
					$task.fetch(t).then(t => {
						const {
							statusCode: i,
							request: q,
							headers: r,
							body: o
						} = t;
						e(null, q, {
							statusCode: i,
							headers: r,
							body: o
						})
					}, t => e(t))
			} else if (this.isNode()) {
				this.got = this.got ? this.got : require("got");
				const {
					url: s,
					...i
				} = t;
				this.instance = this.got.extend({
					followRedirect: false
				});
				this.instance[m](s, i).then(t => {
					const {
						statusCode: i,
						request: q,
						headers: r,
						body: o
					} = t;
					e(null, q, {
						statusCode: i,
						headers: r,
						body: o
					})
				}, t => {
					const {
						message: s,
						response: i
					} = t;
					e(s, i, i && i.body)
				})
			}
		}
		time(t) {
			let e = {
				"M+": (new Date).getMonth() + 1,
				"d+": (new Date).getDate(),
				"h+": (new Date).getHours(),
				"m+": (new Date).getMinutes(),
				"s+": (new Date).getSeconds(),
				"q+": Math.floor(((new Date).getMonth() + 3) / 3),
				S: (new Date).getMilliseconds()
			};
			/(y+)/.test(t) && (t = t.replace(RegExp.$1, ((new Date).getFullYear() + "").substr(4 - RegExp.$1.length)));
			for (let s in e)
				new RegExp("(" + s + ")").test(t) && (t = t.replace(RegExp.$1, 1 == RegExp.$1.length ? e[s] : ("00" + e[s]).substr(("" + e[s]).length)));
			return t
		}
		async showmsg() {
			if (!this.notifyStr) return;
			let notifyBody = this.name + " 运行通知\n\n" + this.notifyStr
			if ($.isNode()) {
				var notify = require('../sendNotify');
				console.log('\n============== 推送 ==============')
				await notify.sendNotify(this.name, notifyBody);
			} else {
				this.msg(notifyBody);
			}
		}
		logAndNotify(str) {
			console.log(str)
			this.notifyStr += str
			this.notifyStr += '\n'
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
						}
					}
					if (this.isQuanX()) {
						let e = t["open-url"] || t.url || t.openUrl,
							s = t["media-url"] || t.mediaUrl;
						return {
							"open-url": e,
							"media-url": s
						}
					}
					if (this.isSurge()) {
						let e = t.url || t.openUrl || t["open-url"];
						return {
							url: e
						}
					}
				}
			};
			this.isMute || (this.isSurge() || this.isLoon() ? $notification.post(e, s, i, o(r)) : this.isQuanX() && $notify(e, s, i, o(r)));
			let h = ["", "============== 系统通知 =============="];
			h.push(e),
				s && h.push(s),
				i && h.push(i),
				console.log(h.join("\n"))
		}
		getMin(a, b) {
			return ((a < b) ? a : b)
		}
		getMax(a, b) {
			return ((a < b) ? b : a)
		}
		padStr(num, length, padding = '0') {
			let numStr = String(num)
			let numPad = (length > numStr.length) ? (length - numStr.length) : 0
			let retStr = ''
			for (let i = 0; i < numPad; i++) {
				retStr += padding
			}
			retStr += numStr
			return retStr;
		}
		json2str(obj, encodeUrl = false) {
			let ret = []
			for (let keys of Object.keys(obj).sort()) {
				let v = obj[keys]
				if (v && encodeUrl) v = encodeURIComponent(v)
				ret.push(keys + '=' + v)
			}
			return ret.join('&');
		}
		str2json(str, decodeUrl = false) {
			let ret = {}
			for (let item of str.split('&')) {
				if (!item) continue;
				let kv = item.split('=')
				if (kv.length < 2) continue;
				if (decodeUrl) {
					ret[kv[0]] = decodeURIComponent(kv[1])
				} else {
					ret[kv[0]] = kv[1]
				}
			}
			return ret;
		}
		randomString(len, charset = 'abcdef0123456789') {
			let str = '';
			for (i = 0; i < len; i++) {
				str += charset.charAt(Math.floor(Math.random() * charset.length));
			}
			return str;
		}
		wait(t) {
			return new Promise(e => setTimeout(e, t))
		}
		done(t = {}) {
			const e = (new Date).getTime(),
				s = (e - this.startTime) / 1e3;
			console.log(`\n${this.name} 运行结束，共运行了 ${s} 秒！`)
			if (this.isSurge() || this.isQuanX() || this.isLoon()) $done(t)
		}
	}(name, env)
}



  //#endregion
