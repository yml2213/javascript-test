/**
 * 疯狂水晶 app (链接带邀请)  谢谢填写  
 * 下载地址: http://mmwk.mmwl.fun/download/9570691cce3dc93a?user=17803  
 * cron 10 8 * * *  yml2213_javascript_master/fksj.js
 * 
 * 疯狂水晶 app  
 * 4-26 完成 签到 , 观看视频 , 京喜红包 任务   有bug及时反馈
 * 4-26 更新随机时间间隔
 * 4-28 感谢大佬的指导.终于解决了md5的sign,变量简化,无需抓包了
 * 
 * 
 * 感谢所有测试人员
 * ========= 青龙 =========
 * 变量格式: export fksj_data='userid1 @ userid2'  多个账号用 @分割 
 * 
 * userid 找不到的可以告别羊毛了  在问自杀
 * 
 * 还是不会的请百度或者群里求助: tg: https://t.me/yml_tg  通知: https://t.me/yml2213_tg
 */


const $ = new Env("疯狂水晶");
const notify = $.isNode() ? require('./sendNotify') : '';
const Notify = 1; //0为关闭通知，1为打开通知,默认为1
const debug = 0; //0为关闭调试，1为打开调试,默认为0
//////////////////////
let fksj_data = process.env.fksj_data;
let fksj_dataArr = [];
let msg = '';
let ck = '';
let end_sign = '';
import underscore from "underscore"
/////////////////////////////////////////////////////////

!(async () => {

	if (!(await Envs()))  //多账号分割 判断变量是否为空  初步处理多账号
		return;
	else {

		console.log(`\n本地脚本4-28`);

		// console.log(`\n 脚本已恢复正常状态,请及时更新! `);
		console.log(`\n 脚本测试中,有bug及时反馈! \n`);
		console.log(`\n 脚本测试中,有bug及时反馈! \n`);
		console.log(`\n 脚本测试中,有bug及时反馈! \n`);

		console.log(`\n================================================\n脚本执行 - 北京时间(UTC+8): ${new Date(
			new Date().getTime() + new Date().getTimezoneOffset() * 60 * 1000 + 8 * 60 * 60 * 1000).toLocaleString()} \n================================================\n`);

		await wyy();


		console.log(`\n=================== 共找到 ${fksj_dataArr.length} 个账号 ===================`)
		if (debug) {
			console.log(`【debug】 这是你的账号数组:\n ${fksj_dataArr}`);
		}


		for (let index = 0; index < fksj_dataArr.length; index++) {


			let num = index + 1
			console.log(`\n========= 开始【第 ${num} 个账号】=========\n`)

			ck_data = fksj_dataArr[index].split('&');
			if (debug) {
				console.log(`\n 【debug】 这是你第 ${num} 账号信息:\n ${ck_data}\n`);
			}

			console.log('开始 签到');
			await signin();
			await $.wait(2 * 1000);

			// console.log('开始 观看视频');
			// await ad_video();
			// await $.wait(2 * 1000);



			// console.log('开始 京喜红包');
			// await gold_ad_video();
			// await $.wait(2 * 1000);

			await SendMsg(msg);

		}


	}

})()
	.catch((e) => $.logErr(e))
	.finally(() => $.done())




//============================================ 处理sign ============================================
function i(t, e) {
	var i = (65535 & t) + (65535 & e),
		a = (t >> 16) + (e >> 16) + (i >> 16);
	return a << 16 | 65535 & i
}

function a(t, e) {
	return t << e | t >>> 32 - e
}

function s(t, e, s, n, o, r) {
	return i(a(i(i(e, t), i(n, r)), o), s)
}

function n(t, e, i, a, n, o, r) {
	return s(e & i | ~e & a, t, e, n, o, r)
}

function o(t, e, i, a, n, o, r) {
	return s(e & a | i & ~a, t, e, n, o, r)
}

function r(t, e, i, a, n, o, r) {
	return s(e ^ i ^ a, t, e, n, o, r)
}

function c(t, e, i, a, n, o, r) {
	return s(i ^ (e | ~a), t, e, n, o, r)
}

function l(t, e) {
	var a, s, l, u, d;
	t[e >> 5] |= 128 << e % 32, t[14 + (e + 64 >>> 9 << 4)] = e;
	var f = 1732584193,
		p = -271733879,
		_ = -1732584194,
		g = 271733878;
	for (a = 0; a < t.length; a += 16) s = f, l = p, u = _, d = g, f = n(f, p, _, g, t[a], 7, -680876936), g = n(g, f, p, _, t[a + 1], 12, -389564586), _ = n(_, g, f, p, t[a + 2], 17, 606105819), p = n(p, _, g, f, t[a + 3], 22, -1044525330), f = n(f, p, _, g, t[a + 4], 7, -176418897), g = n(g, f, p, _, t[a + 5], 12, 1200080426), _ = n(_, g, f, p, t[a + 6], 17, -1473231341), p = n(p, _, g, f, t[a + 7], 22, -45705983), f = n(f, p, _, g, t[a + 8], 7, 1770035416), g = n(g, f, p, _, t[a + 9], 12, -1958414417), _ = n(_, g, f, p, t[a + 10], 17, -42063), p = n(p, _, g, f, t[a + 11], 22, -1990404162), f = n(f, p, _, g, t[a + 12], 7, 1804603682), g = n(g, f, p, _, t[a + 13], 12, -40341101), _ = n(_, g, f, p, t[a + 14], 17, -1502002290), p = n(p, _, g, f, t[a + 15], 22, 1236535329), f = o(f, p, _, g, t[a + 1], 5, -165796510), g = o(g, f, p, _, t[a + 6], 9, -1069501632), _ = o(_, g, f, p, t[a + 11], 14, 643717713), p = o(p, _, g, f, t[a], 20, -373897302), f = o(f, p, _, g, t[a + 5], 5, -701558691), g = o(g, f, p, _, t[a + 10], 9, 38016083), _ = o(_, g, f, p, t[a + 15], 14, -660478335), p = o(p, _, g, f, t[a + 4], 20, -405537848), f = o(f, p, _, g, t[a + 9], 5, 568446438), g = o(g, f, p, _, t[a + 14], 9, -1019803690), _ = o(_, g, f, p, t[a + 3], 14, -187363961), p = o(p, _, g, f, t[a + 8], 20, 1163531501), f = o(f, p, _, g, t[a + 13], 5, -1444681467), g = o(g, f, p, _, t[a + 2], 9, -51403784), _ = o(_, g, f, p, t[a + 7], 14, 1735328473), p = o(p, _, g, f, t[a + 12], 20, -1926607734), f = r(f, p, _, g, t[a + 5], 4, -378558), g = r(g, f, p, _, t[a + 8], 11, -2022574463), _ = r(_, g, f, p, t[a + 11], 16, 1839030562), p = r(p, _, g, f, t[a + 14], 23, -35309556), f = r(f, p, _, g, t[a + 1], 4, -1530992060), g = r(g, f, p, _, t[a + 4], 11, 1272893353), _ = r(_, g, f, p, t[a + 7], 16, -155497632), p = r(p, _, g, f, t[a + 10], 23, -1094730640), f = r(f, p, _, g, t[a + 13], 4, 681279174), g = r(g, f, p, _, t[a], 11, -358537222), _ = r(_, g, f, p, t[a + 3], 16, -722521979), p = r(p, _, g, f, t[a + 6], 23, 76029189), f = r(f, p, _, g, t[a + 9], 4, -640364487), g = r(g, f, p, _, t[a + 12], 11, -421815835), _ = r(_, g, f, p, t[a + 15], 16, 530742520), p = r(p, _, g, f, t[a + 2], 23, -995338651), f = c(f, p, _, g, t[a], 6, -198630844), g = c(g, f, p, _, t[a + 7], 10, 1126891415), _ = c(_, g, f, p, t[a + 14], 15, -1416354905), p = c(p, _, g, f, t[a + 5], 21, -57434055), f = c(f, p, _, g, t[a + 12], 6, 1700485571), g = c(g, f, p, _, t[a + 3], 10, -1894986606), _ = c(_, g, f, p, t[a + 10], 15, -1051523), p = c(p, _, g, f, t[a + 1], 21, -2054922799), f = c(f, p, _, g, t[a + 8], 6, 1873313359), g = c(g, f, p, _, t[a + 15], 10, -30611744), _ = c(_, g, f, p, t[a + 6], 15, -1560198380), p = c(p, _, g, f, t[a + 13], 21, 1309151649), f = c(f, p, _, g, t[a + 4], 6, -145523070), g = c(g, f, p, _, t[a + 11], 10, -1120210379), _ = c(_, g, f, p, t[a + 2], 15, 718787259), p = c(p, _, g, f, t[a + 9], 21, -343485551), f = i(f, s), p = i(p, l), _ = i(_, u), g = i(g, d);
	return [f, p, _, g]
}


function u(t) {
	var e, i = "",
		a = 32 * t.length;
	for (e = 0; e < a; e += 8) i += String.fromCharCode(t[e >> 5] >>> e % 32 & 255);
	return i
}

function d(t) {
	var e, i = [];
	for (i[(t.length >> 2) - 1] = void 0, e = 0; e < i.length; e += 1) i[e] = 0;
	var a = 8 * t.length;
	for (e = 0; e < a; e += 8) i[e >> 5] |= (255 & t.charCodeAt(e / 8)) << e % 32;
	return i
}

function f(t) {
	return u(l(d(t), 8 * t.length))
}

function p(t, e) {
	var i, a, s = d(t),
		n = [],
		o = [];
	for (n[15] = o[15] = void 0, s.length > 16 && (s = l(s, 8 * t.length)), i = 0; i < 16; i += 1) n[i] = 909522486 ^ s[i], o[i] = 1549556828 ^ s[i];
	return a = l(n.concat(d(e)), 512 + 8 * e.length), u(l(o.concat(a), 640))
}

function _(t) {
	var e, i, a = "0123456789abcdef",
		s = "";
	for (i = 0; i < t.length; i += 1) e = t.charCodeAt(i), s += a.charAt(e >>> 4 & 15) + a.charAt(15 & e);
	return s
}

function g(t) {
	return unescape(encodeURIComponent(t))
}

function h(t) {
	return f(g(t))
}




function md5(t) {
	console.log("md5:" + t)
	return _(h(t))
}

function m(t, e) {
	return p(g(t), g(e))
}

function y(t, e) {
	return _(m(t, e))
}

function w(t, e, i) {
	// console.log(t)
	return e ? i ? m(e, t) : y(e, t) : i ? h(t) : md5(t)
}

function getUrlParam(url, paramName) {
	var i = new RegExp("(^|&)" + paramName + "=([^&]*)(&|$)"),
		a = url.split("?")[1].match(i);
	return null != a ? unescape(a[2]) : null
}

function getQuery(t) {
	var e = [];
	if (-1 != t.indexOf("?"))
		for (var i = t.split("?")[1], a = i.split("&"), s = 0; s < a.length; s++) a[s].split("=")[0] && unescape(a[s].split("=")[1]) && (e[s] = {
			name: a[s].split("=")[0],
			value: unescape(a[s].split("=")[1])
		});
	return e
}

function getSign(url, data, i) {
	var str = "",
		sign = getUrlParam(url, "sign");
	if (sign || data && data.sign) return !1;
	if (url && (str = getQuery(url)), data) {
		var r = [];
		for (var c in data)
			c && data[c] && (r = r.concat({
				name: c,
				value: data[c]
			}));
		str = str.concat(r)
	}
	str = underscore.sortBy(str, "name"), str = underscore.uniq(str, !0, "name");
	// console.log(str)
	for (var l = "", u = 0; u < str.length; u++) str[u] && str[u].name && str[u].value && (l += str[u].name + "=" + str[u].value, u < str.length - 1 && (l += "&"));
	// console.log(l)

	//md5(l) 32bit
	var token
	return i = i || token, sign = md5(l + i), sign
}





//============================================ 处理sign_end ============================================






/**
 * 签到   get
 * https://mmwk.zhilaiw.cn/index.php/Api/Index/index?i=2&t=0&v=1.0&from=wxapp&c=entry&a=wxapp&do=user&sign=42d86c74b19f06cd07b4e6ac737a9911&m=skai_tooln_c&dopost=make_sign&userid=17803
 */
function signin(timeout = 3 * 1000) {

	var test_url = "https://mmwk.zhilaiw.cn/index.php/Api/Index/index?i=2&t=0&v=1.0&from=wxapp&c=entry&a=wxapp&do=user"
	var data = { m: "skai_tooln_c", dopost: "make_sign", userid: ck_data }
	end_sign = getSign(test_url, data)

	console.log(end_sign)

	return new Promise((resolve) => {

		let url = {
			url: `https://mmwk.zhilaiw.cn/index.php/Api/Index/index?i=2&t=0&v=1.0&from=wxapp&c=entry&a=wxapp&do=user&sign=${end_sign}&m=skai_tooln_c&dopost=make_sign&userid=${data}`,
			headers: {

				'Content-Type': 'application/x-www-form-urlencoded',
				'Host': 'mmwk.zhilaiw.cn'

			},

		}

		if (debug) {
			console.log(`\n 【debug】=============== 这是 签到 请求 url ===============`);
			console.log(url);
		}
		$.get(url, async (error, response, data) => {
			try {
				if (debug) {
					console.log(`\n\n 【debug】===============这是 签到 返回data==============`);
					console.log(data)
					console.log(`======`)
					console.log(JSON.parse(data))
				}
				let result = JSON.parse(data);
				if (result.result == 'success') {

					console.log(`\n 签到:成功 🎉  您已经连续签到 ${result.sign_total} 天\n签到获得 能量 ${result.addpower} ,累计能量 ${result.power}\n`);

					// msg += `\n 签到:成功 🎉  您已经连续签到 ${result.sign_total} 天\n签到获得 能量 ${result.addpower} ,累计能量 ${result.power}\n`

				} else if (result.result == 'fail') {

					console.log(`\n 签到:${result.msg}\n`);

				} else {

					console.log(`\n 签到:  失败 ❌ 了呢,原因未知！\n ${result} \n `)

				}

			} catch (e) {
				console.log(e)
			} finally {
				resolve();
			}
		}, timeout)
	})
}



/**
 * 观看视频   get
 * https://mmwk.zhilaiw.cn/index.php/Api/Index/index?i=2&t=0&v=1.0&from=wxapp&c=entry&a=wxapp&do=user&sign=4ca5032b2f0f16e2423880292792e5fa&m=skai_tooln_c&dopost=get_some_power_ad_video&userid=17803
 */
function ad_video(timeout = 3 * 1000) {

	return new Promise((resolve) => {
		let url = {
			url: `https://mmwk.zhilaiw.cn/index.php/Api/Index/index?${data[1]}`,
			headers: {

				'Content-Type': 'application/x-www-form-urlencoded',
				'Host': 'mmwk.zhilaiw.cn'

			},

		}

		if (debug) {
			console.log(`\n 【debug】=============== 这是 观看视频 请求 url ===============`);
			console.log(url);
		}
		$.get(url, async (error, response, data) => {
			try {
				if (debug) {
					console.log(`\n\n 【debug】===============这是 观看视频 返回data==============`);
					console.log(data)
					console.log(`======`)
					console.log(JSON.parse(data))
				}
				let result = JSON.parse(data);
				if (result.result == 'success') {

					console.log(`\n 观看视频:成功 🎉  您今天已看: ${result.userdata.ad_video_num}/7 次, \n 观看视频 获得 能量 ${result.addpower} ,累计有能量 ${result.power}\n`);

					if (result.userdata.ad_video_num < 7) {
						let num = randomInt(40, 50);
						console.log(`\n 等待 ${num} s后,继续观看视频\n`);
						await $.wait(num * 1000);
						console.log('开始 观看视频');
						await ad_video();
					}

				} else if (result.result == 'fail') {

					console.log(`\n 观看视频:${result.msg}\n`);

				} else {

					console.log(`\n 观看视频:  失败 ❌ 了呢,原因未知！\n ${result} \n `)

				}

			} catch (e) {
				console.log(e)
			} finally {
				resolve();
			}
		}, timeout)
	})
}



/**
 * 京喜红包   get
 * https://mmwk.zhilaiw.cn/index.php/Api/Index/index?i=2&t=0&v=1.0&from=wxapp&c=entry&a=wxapp&do=user&sign=13a6d7f8418c39085c261a91e9da665a&m=skai_tooln_c&dopost=get_some_gold_ad_video_full&userid=17803
 */
function gold_ad_video(timeout = 3 * 1000) {

	return new Promise((resolve) => {
		let url = {
			url: `https://mmwk.zhilaiw.cn/index.php/Api/Index/index?${data[2]}`,
			headers: {

				'Content-Type': 'application/x-www-form-urlencoded',
				'Host': 'mmwk.zhilaiw.cn'

			},

		}

		if (debug) {
			console.log(`\n 【debug】=============== 这是 京喜红包 请求 url ===============`);
			console.log(url);
		}
		$.get(url, async (error, response, data) => {
			try {
				if (debug) {
					console.log(`\n\n 【debug】===============这是 京喜红包 返回data==============`);
					console.log(data)
					console.log(`======`)
					console.log(JSON.parse(data))
				}
				let result = JSON.parse(data);
				if (result.result == 'success') {

					console.log(`\n 京喜红包:成功 🎉  您今天已看: ${result.userdata.ad_videob_num}/5 次 \n 京喜红包 获得 金币 ${result.addgold} ,累计有 金币 ${result.gold} \n 京喜红包 获得 能量 ${result.addpower} ,累计有能量 ${result.power}\n`);

					if (result.userdata.ad_videob_num < 5) {

						let num = randomInt(40, 50);
						console.log(`\n 等待 ${num} s后,继续京喜红包\n`);
						await $.wait(num * 1000);
						console.log('开始 京喜红包');
						await gold_ad_video();
					}

				} else if (result.result == 'fail') {

					console.log(`\n 京喜红包:${result.msg}\n`);

				} else {

					console.log(`\n 京喜红包:  失败 ❌ 了呢,原因未知！\n ${result} \n `)

				}

			} catch (e) {
				console.log(e)
			} finally {
				resolve();
			}
		}, timeout)
	})
}





/**
 * 查询金币   get
 * https://mrobot.pcauto.com.cn/xsp/s/auto/info/nocache/task/getLoginUserInfo.xsp
 */
function user_info(timeout = 3 * 1000) {
	let reqNonc = randomInt(100000, 999999)
	// console.log(reqNonc);
	// let reqSign = MD5Encrypt(`signature${reqNonc}${ts}${salt}`)

	return new Promise((resolve) => {
		let url = {
			url: 'https://mrobot.pcauto.com.cn/xsp/s/auto/info/nocache/task/getLoginUserInfo.xsp',
			headers: {

				// 'Content-Type': 'text/plain',
				'Cookie': `common_session_id=${ck}`,

			},
		}

		if (debug) {
			console.log(`\n 【debug】=============== 这是 查询金币 请求 url ===============`);
			console.log(url);
		}
		$.get(url, async (error, response, data) => {
			try {
				if (debug) {
					console.log(`\n\n 【debug】===============这是 查询金币 返回data==============`);
					console.log(data)
					console.log(`======`)
					console.log(JSON.parse(data))
				}
				let result = JSON.parse(data);
				if (result.status == 0) {

					console.log(`\n 查询金币:成功 🎉 \n用户:${result.userName} id:${result.userId} , 现在有金币 ${result.goldCount} 枚\n`);
					// msg += `\n 查询金币:成功 🎉 \n用户 ${result.userName} id ${result.userId} 现在有金币 ${result.goldCount} 枚\n`

				} else {

					console.log(`\n 查询金币:  失败 ❌ 了呢,原因未知！\n ${result} \n `)

				}

			} catch (e) {
				console.log(e)
			} finally {
				resolve();
			}
		}, timeout)
	})
}















































//#region 固定代码
// ============================================变量检查============================================ \\
async function Envs() {
	if (fksj_data) {
		if (fksj_data.indexOf("@") != -1) {
			fksj_data.split("@").forEach((item) => {
				fksj_dataArr.push(item);
			});
		} else {
			fksj_dataArr.push(fksj_data);
		}
	} else {
		console.log(`\n 【${$.name}】：未填写变量 fksj_data`)
		return;
	}

	return true;
}

// ============================================发送消息============================================ \\
async function SendMsg(message) {
	if (!message)
		return;

	if (Notify > 0) {
		if ($.isNode()) {
			var notify = require('./sendNotify');
			await notify.sendNotify($.name, message);
		} else {
			$.msg(message);
		}
	} else {
		console.log(message);
	}
}

/**
 * 随机数生成
 */
function randomString(e) {
	e = e || 32;
	var t = "QWERTYUIOPASDFGHJKLZXCVBNM1234567890",
		a = t.length,
		n = "";
	for (i = 0; i < e; i++)
		n += t.charAt(Math.floor(Math.random() * a));
	return n
}

/**
 * 随机整数生成
 */
function randomInt(min, max) {
	return Math.round(Math.random() * (max - min) + min)
}

//每日网抑云
function wyy(timeout = 3 * 1000) {
	return new Promise((resolve) => {
		let url = {
			url: `https://keai.icu/apiwyy/api`
		}
		$.get(url, async (err, resp, data) => {
			try {
				data = JSON.parse(data)
				console.log(`\n 【网抑云时间】: ${data.content}  by--${data.music}`);

			} catch (e) {
				$.logErr(e, resp);
			} finally {
				resolve()
			}
		}, timeout)
	})
}

//#endregion



function MD5Encrypt(a) { function b(a, b) { return a << b | a >>> 32 - b } function c(a, b) { var c, d, e, f, g; return e = 2147483648 & a, f = 2147483648 & b, c = 1073741824 & a, d = 1073741824 & b, g = (1073741823 & a) + (1073741823 & b), c & d ? 2147483648 ^ g ^ e ^ f : c | d ? 1073741824 & g ? 3221225472 ^ g ^ e ^ f : 1073741824 ^ g ^ e ^ f : g ^ e ^ f } function d(a, b, c) { return a & b | ~a & c } function e(a, b, c) { return a & c | b & ~c } function f(a, b, c) { return a ^ b ^ c } function g(a, b, c) { return b ^ (a | ~c) } function h(a, e, f, g, h, i, j) { return a = c(a, c(c(d(e, f, g), h), j)), c(b(a, i), e) } function i(a, d, f, g, h, i, j) { return a = c(a, c(c(e(d, f, g), h), j)), c(b(a, i), d) } function j(a, d, e, g, h, i, j) { return a = c(a, c(c(f(d, e, g), h), j)), c(b(a, i), d) } function k(a, d, e, f, h, i, j) { return a = c(a, c(c(g(d, e, f), h), j)), c(b(a, i), d) } function l(a) { for (var b, c = a.length, d = c + 8, e = (d - d % 64) / 64, f = 16 * (e + 1), g = new Array(f - 1), h = 0, i = 0; c > i;)b = (i - i % 4) / 4, h = i % 4 * 8, g[b] = g[b] | a.charCodeAt(i) << h, i++; return b = (i - i % 4) / 4, h = i % 4 * 8, g[b] = g[b] | 128 << h, g[f - 2] = c << 3, g[f - 1] = c >>> 29, g } function m(a) { var b, c, d = "", e = ""; for (c = 0; 3 >= c; c++)b = a >>> 8 * c & 255, e = "0" + b.toString(16), d += e.substr(e.length - 2, 2); return d } function n(a) { a = a.replace(/\r\n/g, "\n"); for (var b = "", c = 0; c < a.length; c++) { var d = a.charCodeAt(c); 128 > d ? b += String.fromCharCode(d) : d > 127 && 2048 > d ? (b += String.fromCharCode(d >> 6 | 192), b += String.fromCharCode(63 & d | 128)) : (b += String.fromCharCode(d >> 12 | 224), b += String.fromCharCode(d >> 6 & 63 | 128), b += String.fromCharCode(63 & d | 128)) } return b } var o, p, q, r, s, t, u, v, w, x = [], y = 7, z = 12, A = 17, B = 22, C = 5, D = 9, E = 14, F = 20, G = 4, H = 11, I = 16, J = 23, K = 6, L = 10, M = 15, N = 21; for (a = n(a), x = l(a), t = 1732584193, u = 4023233417, v = 2562383102, w = 271733878, o = 0; o < x.length; o += 16)p = t, q = u, r = v, s = w, t = h(t, u, v, w, x[o + 0], y, 3614090360), w = h(w, t, u, v, x[o + 1], z, 3905402710), v = h(v, w, t, u, x[o + 2], A, 606105819), u = h(u, v, w, t, x[o + 3], B, 3250441966), t = h(t, u, v, w, x[o + 4], y, 4118548399), w = h(w, t, u, v, x[o + 5], z, 1200080426), v = h(v, w, t, u, x[o + 6], A, 2821735955), u = h(u, v, w, t, x[o + 7], B, 4249261313), t = h(t, u, v, w, x[o + 8], y, 1770035416), w = h(w, t, u, v, x[o + 9], z, 2336552879), v = h(v, w, t, u, x[o + 10], A, 4294925233), u = h(u, v, w, t, x[o + 11], B, 2304563134), t = h(t, u, v, w, x[o + 12], y, 1804603682), w = h(w, t, u, v, x[o + 13], z, 4254626195), v = h(v, w, t, u, x[o + 14], A, 2792965006), u = h(u, v, w, t, x[o + 15], B, 1236535329), t = i(t, u, v, w, x[o + 1], C, 4129170786), w = i(w, t, u, v, x[o + 6], D, 3225465664), v = i(v, w, t, u, x[o + 11], E, 643717713), u = i(u, v, w, t, x[o + 0], F, 3921069994), t = i(t, u, v, w, x[o + 5], C, 3593408605), w = i(w, t, u, v, x[o + 10], D, 38016083), v = i(v, w, t, u, x[o + 15], E, 3634488961), u = i(u, v, w, t, x[o + 4], F, 3889429448), t = i(t, u, v, w, x[o + 9], C, 568446438), w = i(w, t, u, v, x[o + 14], D, 3275163606), v = i(v, w, t, u, x[o + 3], E, 4107603335), u = i(u, v, w, t, x[o + 8], F, 1163531501), t = i(t, u, v, w, x[o + 13], C, 2850285829), w = i(w, t, u, v, x[o + 2], D, 4243563512), v = i(v, w, t, u, x[o + 7], E, 1735328473), u = i(u, v, w, t, x[o + 12], F, 2368359562), t = j(t, u, v, w, x[o + 5], G, 4294588738), w = j(w, t, u, v, x[o + 8], H, 2272392833), v = j(v, w, t, u, x[o + 11], I, 1839030562), u = j(u, v, w, t, x[o + 14], J, 4259657740), t = j(t, u, v, w, x[o + 1], G, 2763975236), w = j(w, t, u, v, x[o + 4], H, 1272893353), v = j(v, w, t, u, x[o + 7], I, 4139469664), u = j(u, v, w, t, x[o + 10], J, 3200236656), t = j(t, u, v, w, x[o + 13], G, 681279174), w = j(w, t, u, v, x[o + 0], H, 3936430074), v = j(v, w, t, u, x[o + 3], I, 3572445317), u = j(u, v, w, t, x[o + 6], J, 76029189), t = j(t, u, v, w, x[o + 9], G, 3654602809), w = j(w, t, u, v, x[o + 12], H, 3873151461), v = j(v, w, t, u, x[o + 15], I, 530742520), u = j(u, v, w, t, x[o + 2], J, 3299628645), t = k(t, u, v, w, x[o + 0], K, 4096336452), w = k(w, t, u, v, x[o + 7], L, 1126891415), v = k(v, w, t, u, x[o + 14], M, 2878612391), u = k(u, v, w, t, x[o + 5], N, 4237533241), t = k(t, u, v, w, x[o + 12], K, 1700485571), w = k(w, t, u, v, x[o + 3], L, 2399980690), v = k(v, w, t, u, x[o + 10], M, 4293915773), u = k(u, v, w, t, x[o + 1], N, 2240044497), t = k(t, u, v, w, x[o + 8], K, 1873313359), w = k(w, t, u, v, x[o + 15], L, 4264355552), v = k(v, w, t, u, x[o + 6], M, 2734768916), u = k(u, v, w, t, x[o + 13], N, 1309151649), t = k(t, u, v, w, x[o + 4], K, 4149444226), w = k(w, t, u, v, x[o + 11], L, 3174756917), v = k(v, w, t, u, x[o + 2], M, 718787259), u = k(u, v, w, t, x[o + 9], N, 3951481745), t = c(t, p), u = c(u, q), v = c(v, r), w = c(w, s); var O = m(t) + m(u) + m(v) + m(w); return O.toLowerCase() }




// prettier-ignore
function Env(t, e) { "undefined" != typeof process && JSON.stringify(process.env).indexOf("GITHUB") > -1 && process.exit(0); class s { constructor(t) { this.env = t } send(t, e = "GET") { t = "string" == typeof t ? { url: t } : t; let s = this.get; return "POST" === e && (s = this.post), new Promise((e, i) => { s.call(this, t, (t, s, r) => { t ? i(t) : e(s) }) }) } get(t) { return this.send.call(this.env, t) } post(t) { return this.send.call(this.env, t, "POST") } } return new class { constructor(t, e) { this.name = t, this.http = new s(this), this.data = null, this.dataFile = "box.dat", this.logs = [], this.isMute = !1, this.isNeedRewrite = !1, this.logSeparator = "\n", this.startTime = (new Date).getTime(), Object.assign(this, e), this.log("", `🔔${this.name}, 开始!`) } isNode() { return "undefined" != typeof module && !!module.exports } isQuanX() { return "undefined" != typeof $task } isSurge() { return "undefined" != typeof $httpClient && "undefined" == typeof $loon } isLoon() { return "undefined" != typeof $loon } toObj(t, e = null) { try { return JSON.parse(t) } catch { return e } } toStr(t, e = null) { try { return JSON.stringify(t) } catch { return e } } getjson(t, e) { let s = e; const i = this.getdata(t); if (i) try { s = JSON.parse(this.getdata(t)) } catch { } return s } setjson(t, e) { try { return this.setdata(JSON.stringify(t), e) } catch { return !1 } } getScript(t) { return new Promise(e => { this.get({ url: t }, (t, s, i) => e(i)) }) } runScript(t, e) { return new Promise(s => { let i = this.getdata("@chavy_boxjs_userCfgs.httpapi"); i = i ? i.replace(/\n/g, "").trim() : i; let r = this.getdata("@chavy_boxjs_userCfgs.httpapi_timeout"); r = r ? 1 * r : 20, r = e && e.timeout ? e.timeout : r; const [o, h] = i.split("@"), n = { url: `http://${h}/v1/scripting/evaluate`, body: { script_text: t, mock_type: "cron", timeout: r }, headers: { "X-Key": o, Accept: "*/*" } }; this.post(n, (t, e, i) => s(i)) }).catch(t => this.logErr(t)) } loaddata() { if (!this.isNode()) return {}; { this.fs = this.fs ? this.fs : require("fs"), this.path = this.path ? this.path : require("path"); const t = this.path.resolve(this.dataFile), e = this.path.resolve(process.cwd(), this.dataFile), s = this.fs.existsSync(t), i = !s && this.fs.existsSync(e); if (!s && !i) return {}; { const i = s ? t : e; try { return JSON.parse(this.fs.readFileSync(i)) } catch (t) { return {} } } } } writedata() { if (this.isNode()) { this.fs = this.fs ? this.fs : require("fs"), this.path = this.path ? this.path : require("path"); const t = this.path.resolve(this.dataFile), e = this.path.resolve(process.cwd(), this.dataFile), s = this.fs.existsSync(t), i = !s && this.fs.existsSync(e), r = JSON.stringify(this.data); s ? this.fs.writeFileSync(t, r) : i ? this.fs.writeFileSync(e, r) : this.fs.writeFileSync(t, r) } } lodash_get(t, e, s) { const i = e.replace(/\[(\d+)\]/g, ".$1").split("."); let r = t; for (const t of i) if (r = Object(r)[t], void 0 === r) return s; return r } lodash_set(t, e, s) { return Object(t) !== t ? t : (Array.isArray(e) || (e = e.toString().match(/[^.[\]]+/g) || []), e.slice(0, -1).reduce((t, s, i) => Object(t[s]) === t[s] ? t[s] : t[s] = Math.abs(e[i + 1]) >> 0 == +e[i + 1] ? [] : {}, t)[e[e.length - 1]] = s, t) } getdata(t) { let e = this.getval(t); if (/^@/.test(t)) { const [, s, i] = /^@(.*?)\.(.*?)$/.exec(t), r = s ? this.getval(s) : ""; if (r) try { const t = JSON.parse(r); e = t ? this.lodash_get(t, i, "") : e } catch (t) { e = "" } } return e } setdata(t, e) { let s = !1; if (/^@/.test(e)) { const [, i, r] = /^@(.*?)\.(.*?)$/.exec(e), o = this.getval(i), h = i ? "null" === o ? null : o || "{}" : "{}"; try { const e = JSON.parse(h); this.lodash_set(e, r, t), s = this.setval(JSON.stringify(e), i) } catch (e) { const o = {}; this.lodash_set(o, r, t), s = this.setval(JSON.stringify(o), i) } } else s = this.setval(t, e); return s } getval(t) { return this.isSurge() || this.isLoon() ? $persistentStore.read(t) : this.isQuanX() ? $prefs.valueForKey(t) : this.isNode() ? (this.data = this.loaddata(), this.data[t]) : this.data && this.data[t] || null } setval(t, e) { return this.isSurge() || this.isLoon() ? $persistentStore.write(t, e) : this.isQuanX() ? $prefs.setValueForKey(t, e) : this.isNode() ? (this.data = this.loaddata(), this.data[e] = t, this.writedata(), !0) : this.data && this.data[e] || null } initGotEnv(t) { this.got = this.got ? this.got : require("got"), this.cktough = this.cktough ? this.cktough : require("tough-cookie"), this.ckjar = this.ckjar ? this.ckjar : new this.cktough.CookieJar, t && (t.headers = t.headers ? t.headers : {}, void 0 === t.headers.Cookie && void 0 === t.cookieJar && (t.cookieJar = this.ckjar)) } get(t, e = (() => { })) { t.headers && (delete t.headers["Content-Type"], delete t.headers["Content-Length"]), this.isSurge() || this.isLoon() ? (this.isSurge() && this.isNeedRewrite && (t.headers = t.headers || {}, Object.assign(t.headers, { "X-Surge-Skip-Scripting": !1 })), $httpClient.get(t, (t, s, i) => { !t && s && (s.body = i, s.statusCode = s.status), e(t, s, i) })) : this.isQuanX() ? (this.isNeedRewrite && (t.opts = t.opts || {}, Object.assign(t.opts, { hints: !1 })), $task.fetch(t).then(t => { const { statusCode: s, statusCode: i, headers: r, body: o } = t; e(null, { status: s, statusCode: i, headers: r, body: o }, o) }, t => e(t))) : this.isNode() && (this.initGotEnv(t), this.got(t).on("redirect", (t, e) => { try { if (t.headers["set-cookie"]) { const s = t.headers["set-cookie"].map(this.cktough.Cookie.parse).toString(); s && this.ckjar.setCookieSync(s, null), e.cookieJar = this.ckjar } } catch (t) { this.logErr(t) } }).then(t => { const { statusCode: s, statusCode: i, headers: r, body: o } = t; e(null, { status: s, statusCode: i, headers: r, body: o }, o) }, t => { const { message: s, response: i } = t; e(s, i, i && i.body) })) } post(t, e = (() => { })) { if (t.body && t.headers && !t.headers["Content-Type"] && (t.headers["Content-Type"] = "application/x-www-form-urlencoded"), t.headers && delete t.headers["Content-Length"], this.isSurge() || this.isLoon()) this.isSurge() && this.isNeedRewrite && (t.headers = t.headers || {}, Object.assign(t.headers, { "X-Surge-Skip-Scripting": !1 })), $httpClient.post(t, (t, s, i) => { !t && s && (s.body = i, s.statusCode = s.status), e(t, s, i) }); else if (this.isQuanX()) t.method = "POST", this.isNeedRewrite && (t.opts = t.opts || {}, Object.assign(t.opts, { hints: !1 })), $task.fetch(t).then(t => { const { statusCode: s, statusCode: i, headers: r, body: o } = t; e(null, { status: s, statusCode: i, headers: r, body: o }, o) }, t => e(t)); else if (this.isNode()) { this.initGotEnv(t); const { url: s, ...i } = t; this.got.post(s, i).then(t => { const { statusCode: s, statusCode: i, headers: r, body: o } = t; e(null, { status: s, statusCode: i, headers: r, body: o }, o) }, t => { const { message: s, response: i } = t; e(s, i, i && i.body) }) } } time(t, e = null) { const s = e ? new Date(e) : new Date; let i = { "M+": s.getMonth() + 1, "d+": s.getDate(), "H+": s.getHours(), "m+": s.getMinutes(), "s+": s.getSeconds(), "q+": Math.floor((s.getMonth() + 3) / 3), S: s.getMilliseconds() }; /(y+)/.test(t) && (t = t.replace(RegExp.$1, (s.getFullYear() + "").substr(4 - RegExp.$1.length))); for (let e in i) new RegExp("(" + e + ")").test(t) && (t = t.replace(RegExp.$1, 1 == RegExp.$1.length ? i[e] : ("00" + i[e]).substr(("" + i[e]).length))); return t } msg(e = t, s = "", i = "", r) { const o = t => { if (!t) return t; if ("string" == typeof t) return this.isLoon() ? t : this.isQuanX() ? { "open-url": t } : this.isSurge() ? { url: t } : void 0; if ("object" == typeof t) { if (this.isLoon()) { let e = t.openUrl || t.url || t["open-url"], s = t.mediaUrl || t["media-url"]; return { openUrl: e, mediaUrl: s } } if (this.isQuanX()) { let e = t["open-url"] || t.url || t.openUrl, s = t["media-url"] || t.mediaUrl; return { "open-url": e, "media-url": s } } if (this.isSurge()) { let e = t.url || t.openUrl || t["open-url"]; return { url: e } } } }; if (this.isMute || (this.isSurge() || this.isLoon() ? $notification.post(e, s, i, o(r)) : this.isQuanX() && $notify(e, s, i, o(r))), !this.isMuteLog) { let t = ["", "==============📣系统通知📣=============="]; t.push(e), s && t.push(s), i && t.push(i), console.log(t.join("\n")), this.logs = this.logs.concat(t) } } log(...t) { t.length > 0 && (this.logs = [...this.logs, ...t]), console.log(t.join(this.logSeparator)) } logErr(t, e) { const s = !this.isSurge() && !this.isQuanX() && !this.isLoon(); s ? this.log("", `❗️${this.name}, 错误!`, t.stack) : this.log("", `❗️${this.name}, 错误!`, t) } wait(t) { return new Promise(e => setTimeout(e, t)) } done(t = {}) { const e = (new Date).getTime(), s = (e - this.startTime) / 1e3; this.log("", `🔔${this.name}, 结束! 🕛 ${s} 秒`), this.log(), (this.isSurge() || this.isQuanX() || this.isLoon()) && $done(t) } }(t, e) }