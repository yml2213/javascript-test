/*
诗画浦江  app

cron 10 8,10 * * *  shpj.js

========= 青龙--配置文件--贴心复制区域  ========= 
# 诗画浦江
export shpj=' x-session-id # x-request-id @ x-session-id # x-request-id '  

抓  www.tubaobao.com  的 token

多账号用 换行 或 @ 分割
tg频道: https://t.me/yml2213_tg  
*/

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
		return mergeObjs(options, obj);
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
				let { task_name, finish_times, frequency } = task;
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




// ============================================================================================================================
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
		return date.toJSON().substr(0, 19).replace("T", " ");
	} else if (time.toString().length == 10) {
		time = time * 1000;
		var date = new Date(time + 8 * 3600 * 1000);
		return date.toJSON().substr(0, 19).replace("T", " ");
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
		m = `0${m}`;
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
		d = `0${d}`;
	}
	return d;
}


/**
 * RSA公钥加密  传参(数据,key) , 返回 base64格式
 */
function RSA_Encrypt(msg, key) {
	global.navigator = { appName: 'nodejs' }; // fake the navigator object
	global.window = {}; // fake the window object
	const JSEncrypt = require('jsencrypt');
	let enc = new JSEncrypt();
	enc.setPublicKey(key);
	return enc.encrypt(msg).toString();
}

/**
 * base64 编码  
 */
function base64_encode(data) {
	let a = Buffer.from(data, 'utf-8').toString('base64');
	return a;
}
/**
 * base64 解码  
 */
function base64_decode(data) {
	let a = Buffer.from(data, 'base64').toString('utf8');
	return a;
}


/**
 * SHA1 加密  
 */
function SHA1_Encrypt(s) {
	var data = new Uint8Array(encodeUTF8(s));
	var i, j, t;
	var l = ((data.length + 8) >>> 6 << 4) + 16, s = new Uint8Array(l << 2);
	s.set(new Uint8Array(data.buffer)), s = new Uint32Array(s.buffer);
	for (t = new DataView(s.buffer), i = 0; i < l; i++)s[i] = t.getUint32(i << 2);
	s[data.length >> 2] |= 0x80 << (24 - (data.length & 3) * 8);
	s[l - 1] = data.length << 3;
	var w = [], f = [
		function () { return m[1] & m[2] | ~m[1] & m[3]; },
		function () { return m[1] ^ m[2] ^ m[3]; },
		function () { return m[1] & m[2] | m[1] & m[3] | m[2] & m[3]; },
		function () { return m[1] ^ m[2] ^ m[3]; }
	], rol = function (n, c) { return n << c | n >>> (32 - c); },
		k = [1518500249, 1859775393, -1894007588, -899497514],
		m = [1732584193, -271733879, null, null, -1009589776];
	m[2] = ~m[0], m[3] = ~m[1];
	for (i = 0; i < s.length; i += 16) {
		var o = m.slice(0);
		for (j = 0; j < 80; j++)
			w[j] = j < 16 ? s[i + j] : rol(w[j - 3] ^ w[j - 8] ^ w[j - 14] ^ w[j - 16], 1),
				t = rol(m[0], 5) + f[j / 20 | 0]() + m[4] + w[j] + k[j / 20 | 0] | 0,
				m[1] = rol(m[1], 30), m.pop(), m.unshift(t);
		for (j = 0; j < 5; j++)m[j] = m[j] + o[j] | 0;
	};
	t = new DataView(new Uint32Array(m).buffer);
	for (var i = 0; i < 5; i++)m[i] = t.getUint32(i << 2);

	var hex = Array.prototype.map.call(new Uint8Array(new Uint32Array(m).buffer), function (e) {
		return (e < 16 ? "0" : "") + e.toString(16);
	}).join("");
	return hex;
}
function encodeUTF8(s) {
	var i, r = [], c, x;
	for (i = 0; i < s.length; i++)
		if ((c = s.charCodeAt(i)) < 0x80) r.push(c);
		else if (c < 0x800) r.push(0xC0 + (c >> 6 & 0x1F), 0x80 + (c & 0x3F));
		else {
			if ((x = c ^ 0xD800) >> 10 == 0) //对四字节UTF-16转换为Unicode
				c = (x << 10) + (s.charCodeAt(++i) ^ 0xDC00) + 0x10000,
					r.push(0xF0 + (c >> 18 & 0x7), 0x80 + (c >> 12 & 0x3F));
			else r.push(0xE0 + (c >> 12 & 0xF));
			r.push(0x80 + (c >> 6 & 0x3F), 0x80 + (c & 0x3F));
		};
	return r;
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





/**
 * md5 加密
 */
function MD5_Encrypt(a) { function b(a, b) { return (a << b) | (a >>> (32 - b)); } function c(a, b) { var c, d, e, f, g; return ((e = 2147483648 & a), (f = 2147483648 & b), (c = 1073741824 & a), (d = 1073741824 & b), (g = (1073741823 & a) + (1073741823 & b)), c & d ? 2147483648 ^ g ^ e ^ f : c | d ? 1073741824 & g ? 3221225472 ^ g ^ e ^ f : 1073741824 ^ g ^ e ^ f : g ^ e ^ f); } function d(a, b, c) { return (a & b) | (~a & c); } function e(a, b, c) { return (a & c) | (b & ~c); } function f(a, b, c) { return a ^ b ^ c; } function g(a, b, c) { return b ^ (a | ~c); } function h(a, e, f, g, h, i, j) { return (a = c(a, c(c(d(e, f, g), h), j))), c(b(a, i), e); } function i(a, d, f, g, h, i, j) { return (a = c(a, c(c(e(d, f, g), h), j))), c(b(a, i), d); } function j(a, d, e, g, h, i, j) { return (a = c(a, c(c(f(d, e, g), h), j))), c(b(a, i), d); } function k(a, d, e, f, h, i, j) { return (a = c(a, c(c(g(d, e, f), h), j))), c(b(a, i), d); } function l(a) { for (var b, c = a.length, d = c + 8, e = (d - (d % 64)) / 64, f = 16 * (e + 1), g = new Array(f - 1), h = 0, i = 0; c > i;) (b = (i - (i % 4)) / 4), (h = (i % 4) * 8), (g[b] = g[b] | (a.charCodeAt(i) << h)), i++; return ((b = (i - (i % 4)) / 4), (h = (i % 4) * 8), (g[b] = g[b] | (128 << h)), (g[f - 2] = c << 3), (g[f - 1] = c >>> 29), g); } function m(a) { var b, c, d = "", e = ""; for (c = 0; 3 >= c; c++) (b = (a >>> (8 * c)) & 255), (e = "0" + b.toString(16)), (d += e.substr(e.length - 2, 2)); return d; } function n(a) { a = a.replace(/\r\n/g, "\n"); for (var b = "", c = 0; c < a.length; c++) { var d = a.charCodeAt(c); 128 > d ? (b += String.fromCharCode(d)) : d > 127 && 2048 > d ? ((b += String.fromCharCode((d >> 6) | 192)), (b += String.fromCharCode((63 & d) | 128))) : ((b += String.fromCharCode((d >> 12) | 224)), (b += String.fromCharCode(((d >> 6) & 63) | 128)), (b += String.fromCharCode((63 & d) | 128))); } return b; } var o, p, q, r, s, t, u, v, w, x = [], y = 7, z = 12, A = 17, B = 22, C = 5, D = 9, E = 14, F = 20, G = 4, H = 11, I = 16, J = 23, K = 6, L = 10, M = 15, N = 21; for (a = n(a), x = l(a), t = 1732584193, u = 4023233417, v = 2562383102, w = 271733878, o = 0; o < x.length; o += 16) (p = t), (q = u), (r = v), (s = w), (t = h(t, u, v, w, x[o + 0], y, 3614090360)), (w = h(w, t, u, v, x[o + 1], z, 3905402710)), (v = h(v, w, t, u, x[o + 2], A, 606105819)), (u = h(u, v, w, t, x[o + 3], B, 3250441966)), (t = h(t, u, v, w, x[o + 4], y, 4118548399)), (w = h(w, t, u, v, x[o + 5], z, 1200080426)), (v = h(v, w, t, u, x[o + 6], A, 2821735955)), (u = h(u, v, w, t, x[o + 7], B, 4249261313)), (t = h(t, u, v, w, x[o + 8], y, 1770035416)), (w = h(w, t, u, v, x[o + 9], z, 2336552879)), (v = h(v, w, t, u, x[o + 10], A, 4294925233)), (u = h(u, v, w, t, x[o + 11], B, 2304563134)), (t = h(t, u, v, w, x[o + 12], y, 1804603682)), (w = h(w, t, u, v, x[o + 13], z, 4254626195)), (v = h(v, w, t, u, x[o + 14], A, 2792965006)), (u = h(u, v, w, t, x[o + 15], B, 1236535329)), (t = i(t, u, v, w, x[o + 1], C, 4129170786)), (w = i(w, t, u, v, x[o + 6], D, 3225465664)), (v = i(v, w, t, u, x[o + 11], E, 643717713)), (u = i(u, v, w, t, x[o + 0], F, 3921069994)), (t = i(t, u, v, w, x[o + 5], C, 3593408605)), (w = i(w, t, u, v, x[o + 10], D, 38016083)), (v = i(v, w, t, u, x[o + 15], E, 3634488961)), (u = i(u, v, w, t, x[o + 4], F, 3889429448)), (t = i(t, u, v, w, x[o + 9], C, 568446438)), (w = i(w, t, u, v, x[o + 14], D, 3275163606)), (v = i(v, w, t, u, x[o + 3], E, 4107603335)), (u = i(u, v, w, t, x[o + 8], F, 1163531501)), (t = i(t, u, v, w, x[o + 13], C, 2850285829)), (w = i(w, t, u, v, x[o + 2], D, 4243563512)), (v = i(v, w, t, u, x[o + 7], E, 1735328473)), (u = i(u, v, w, t, x[o + 12], F, 2368359562)), (t = j(t, u, v, w, x[o + 5], G, 4294588738)), (w = j(w, t, u, v, x[o + 8], H, 2272392833)), (v = j(v, w, t, u, x[o + 11], I, 1839030562)), (u = j(u, v, w, t, x[o + 14], J, 4259657740)), (t = j(t, u, v, w, x[o + 1], G, 2763975236)), (w = j(w, t, u, v, x[o + 4], H, 1272893353)), (v = j(v, w, t, u, x[o + 7], I, 4139469664)), (u = j(u, v, w, t, x[o + 10], J, 3200236656)), (t = j(t, u, v, w, x[o + 13], G, 681279174)), (w = j(w, t, u, v, x[o + 0], H, 3936430074)), (v = j(v, w, t, u, x[o + 3], I, 3572445317)), (u = j(u, v, w, t, x[o + 6], J, 76029189)), (t = j(t, u, v, w, x[o + 9], G, 3654602809)), (w = j(w, t, u, v, x[o + 12], H, 3873151461)), (v = j(v, w, t, u, x[o + 15], I, 530742520)), (u = j(u, v, w, t, x[o + 2], J, 3299628645)), (t = k(t, u, v, w, x[o + 0], K, 4096336452)), (w = k(w, t, u, v, x[o + 7], L, 1126891415)), (v = k(v, w, t, u, x[o + 14], M, 2878612391)), (u = k(u, v, w, t, x[o + 5], N, 4237533241)), (t = k(t, u, v, w, x[o + 12], K, 1700485571)), (w = k(w, t, u, v, x[o + 3], L, 2399980690)), (v = k(v, w, t, u, x[o + 10], M, 4293915773)), (u = k(u, v, w, t, x[o + 1], N, 2240044497)), (t = k(t, u, v, w, x[o + 8], K, 1873313359)), (w = k(w, t, u, v, x[o + 15], L, 4264355552)), (v = k(v, w, t, u, x[o + 6], M, 2734768916)), (u = k(u, v, w, t, x[o + 13], N, 1309151649)), (t = k(t, u, v, w, x[o + 4], K, 4149444226)), (w = k(w, t, u, v, x[o + 11], L, 3174756917)), (v = k(v, w, t, u, x[o + 2], M, 718787259)), (u = k(u, v, w, t, x[o + 9], N, 3951481745)), (t = c(t, p)), (u = c(u, q)), (v = c(v, r)), (w = c(w, s)); var O = m(t) + m(u) + m(v) + m(w); return O.toLowerCase(); }


function Env(a, b) {
	return "undefined" != typeof process && JSON.stringify(process.env).indexOf("GITHUB") > -1 && process.exit(0), new class {
		constructor(a, b) {
			this.name = a, this.notifyStr = "", this.startTime = (new Date).getTime(), Object.assign(this, b), console.log(`${this.name} 开始运行：
`);
		} isNode() { return "undefined" != typeof module && !!module.exports; } isQuanX() { return "undefined" != typeof $task; } isSurge() { return "undefined" != typeof $httpClient && "undefined" == typeof $loon; } isLoon() { return "undefined" != typeof $loon; } getdata(b) { let a = this.getval(b); if (/^@/.test(b)) { let [, c, f] = /^@(.*?)\.(.*?)$/.exec(b), d = c ? this.getval(c) : ""; if (d) try { let e = JSON.parse(d); a = e ? this.lodash_get(e, f, "") : a; } catch (g) { a = ""; } } return a; } setdata(c, d) { let a = !1; if (/^@/.test(d)) { let [, b, e] = /^@(.*?)\.(.*?)$/.exec(d), f = this.getval(b), i = b ? "null" === f ? null : f || "{}" : "{}"; try { let g = JSON.parse(i); this.lodash_set(g, e, c), a = this.setval(JSON.stringify(g), b); } catch (j) { let h = {}; this.lodash_set(h, e, c), a = this.setval(JSON.stringify(h), b); } } else a = this.setval(c, d); return a; } getval(a) { return this.isSurge() || this.isLoon() ? $persistentStore.read(a) : this.isQuanX() ? $prefs.valueForKey(a) : this.isNode() ? (this.data = this.loaddata(), this.data[a]) : this.data && this.data[a] || null; } setval(b, a) { return this.isSurge() || this.isLoon() ? $persistentStore.write(b, a) : this.isQuanX() ? $prefs.setValueForKey(b, a) : this.isNode() ? (this.data = this.loaddata(), this.data[a] = b, this.writedata(), !0) : this.data && this.data[a] || null; } send(b, a, f = () => { }) { if ("get" != b && "post" != b && "put" != b && "delete" != b) { console.log(`无效的http方法：${b}`); return; } if ("get" == b && a.headers ? (delete a.headers["Content-Type"], delete a.headers["Content-Length"]) : a.body && a.headers && (a.headers["Content-Type"] || (a.headers["Content-Type"] = "application/x-www-form-urlencoded")), this.isSurge() || this.isLoon()) { this.isSurge() && this.isNeedRewrite && (a.headers = a.headers || {}, Object.assign(a.headers, { "X-Surge-Skip-Scripting": !1 })); let c = { method: b, url: a.url, headers: a.headers, timeout: a.timeout, data: a.body }; "get" == b && delete c.data, $axios(c).then(a => { let { status: b, request: c, headers: d, data: e } = a; f(null, c, { statusCode: b, headers: d, body: e }); }).catch(a => console.log(a)); } else if (this.isQuanX()) a.method = b.toUpperCase(), this.isNeedRewrite && (a.opts = a.opts || {}, Object.assign(a.opts, { hints: !1 })), $task.fetch(a).then(a => { let { statusCode: b, request: c, headers: d, body: e } = a; f(null, c, { statusCode: b, headers: d, body: e }); }, a => f(a)); else if (this.isNode()) { this.got = this.got ? this.got : require("got"); let { url: d, ...e } = a; this.instance = this.got.extend({ followRedirect: !1 }), this.instance[b](d, e).then(a => { let { statusCode: b, request: c, headers: d, body: e } = a; f(null, c, { statusCode: b, headers: d, body: e }); }, b => { let { message: c, response: a } = b; f(c, a, a && a.body); }); } } time(a) { let b = { "M+": (new Date).getMonth() + 1, "d+": (new Date).getDate(), "h+": (new Date).getHours(), "m+": (new Date).getMinutes(), "s+": (new Date).getSeconds(), "q+": Math.floor(((new Date).getMonth() + 3) / 3), S: (new Date).getMilliseconds() }; for (let c in /(y+)/.test(a) && (a = a.replace(RegExp.$1, ((new Date).getFullYear() + "").substr(4 - RegExp.$1.length))), b) new RegExp("(" + c + ")").test(a) && (a = a.replace(RegExp.$1, 1 == RegExp.$1.length ? b[c] : ("00" + b[c]).substr(("" + b[c]).length))); return a; } async showmsg() { if (!this.notifyStr) return; let a = this.name + " \u8FD0\u884C\u901A\u77E5\n\n" + this.notifyStr; if ($.isNode()) { var b = require("../sendNotify"); console.log("\n============== \u63A8\u9001 =============="), await b.sendNotify(this.name, a); } else this.msg(a); } logAndNotify(a) { console.log(a), this.notifyStr += a, this.notifyStr += "\n"; } msg(d = t, a = "", b = "", e) { let f = a => { if (!a) return a; if ("string" == typeof a) return this.isLoon() ? a : this.isQuanX() ? { "open-url": a } : this.isSurge() ? { url: a } : void 0; if ("object" == typeof a) { if (this.isLoon()) { let b = a.openUrl || a.url || a["open-url"], c = a.mediaUrl || a["media-url"]; return { openUrl: b, mediaUrl: c }; } if (this.isQuanX()) { let d = a["open-url"] || a.url || a.openUrl, e = a["media-url"] || a.mediaUrl; return { "open-url": d, "media-url": e }; } if (this.isSurge()) return { url: a.url || a.openUrl || a["open-url"] }; } }; this.isMute || (this.isSurge() || this.isLoon() ? $notification.post(d, a, b, f(e)) : this.isQuanX() && $notify(d, a, b, f(e))); let c = ["", "============== \u7CFB\u7EDF\u901A\u77E5 =============="]; c.push(d), a && c.push(a), b && c.push(b), console.log(c.join("\n")); } getMin(a, b) { return a < b ? a : b; } getMax(a, b) { return a < b ? b : a; } padStr(e, b, f = "0") { let a = String(e), g = b > a.length ? b - a.length : 0, c = ""; for (let d = 0; d < g; d++)c += f; return c + a; } json2str(b, e, f = !1) { let c = []; for (let d of Object.keys(b).sort()) { let a = b[d]; a && f && (a = encodeURIComponent(a)), c.push(d + "=" + a); } return c.join(e); } str2json(e, f = !1) { let d = {}; for (let a of e.split("#")) { if (!a) continue; let b = a.indexOf("="); if (-1 == b) continue; let g = a.substr(0, b), c = a.substr(b + 1); f && (c = decodeURIComponent(c)), d[g] = c; } return d; } randomString(d, a = "abcdef0123456789") { let b = ""; for (let c = 0; c < d; c++)b += a.charAt(Math.floor(Math.random() * a.length)); return b; } randomList(a) { let b = Math.floor(Math.random() * a.length); return a[b]; } wait(a) { return new Promise(b => setTimeout(b, a)); } done(a = {}) {
			let b = (new Date).getTime(), c = (b - this.startTime) / 1e3; console.log(`账号 
${this.name} 运行结束，共运行了 ${c} 秒！`), (this.isSurge() || this.isQuanX() || this.isLoon()) && $done(a);
		}
	}(a, b);
}


// 合并两个对象
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