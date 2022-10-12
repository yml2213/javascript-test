/*
汇源福利社  小程序 
cron 10 7 * * *  hyfls.js

10.11		完成签到,抽奖,抢购(自己添加自己的地址)

------------------------  青龙--配置文件-贴心复制区域  ---------------------- 
# 汇源福利社
export hyfls=" token  @ token  "

抓  https://huiyuan.timingmar.com  中的参数   token 
多账号用 换行 或 @ 分割

报错的自己下载 utils.js  放在脚本同级目录下

tg频道: https://t.me/yml2213_tg  

*/
const utils = require("./utils");
const $ = new Env("汇源福利社");
const alias_name = "hyfls";
// const request = require('request');
const notify = $.isNode() ? require("./sendNotify") : "";
const Notify = 1; 			//0为关闭通知,1为打开通知,默认为1
//---------------------------------------------------------------------------------------------------------
let ckStr = process.env[alias_name];
let msg, ck;
let ck_status = 1;
//---------------------------------------------------------------------------------------------------------
let VersionCheck = "0.1";
let Change = "\n报错的自己下载 utils.js  放在脚本同级目录下\n完成签到,抽奖";
let thank = `\n感谢 心雨大佬脚本\n`;
//---------------------------------------------------------------------------------------------------------

async function tips(ckArr) {
	// let Version_latest = await Version_Check(alias_name, '1');
	let Version = `\n📌 本地脚本: V ${VersionCheck}`;
	DoubleLog(`${Version}\n📌 🆙 更新内容: ${Change}`);
	// DoubleLog(`${thank}`);
	await utils.yiyan()
	DoubleLog(`\n========== 共找到 ${ckArr.length} 个账号 ==========`);
}

async function start() {
	const hyfls = new Hyfls(ck[0]);
	await hyfls.login("登录—刷新token");
	await hyfls.init("初始化");
	if (ck_status) {
		await hyfls.rush_lucky("抢购幸运产品");
		await hyfls.sign_info("签到查询");
		await hyfls.prize_Info("盲盒抽奖", 6);
		await hyfls.prize_Info("碎片抽奖", 8);
		await hyfls.coin_num("查询汇源币");
	}
}

let host, hostname, apiname, hyfls_hd, lucky_id, lucky_price, add_id, token;
class Hyfls {
	constructor(jsCode) {
		this.jsCode = jsCode;
	}


	// 登录—刷新token   get
	async login(name) {
		let options = {
			method: "post",
			url: `https://huiyuan.timingmar.com/hy-api/wechat/applet/login/new-login`,
			headers: {
				'Host': 'huiyuan.timingmar.com',
				'content-type': 'application/json'
			},
			body: JSON.stringify({
				"jsCode": this.jsCode,
				"inviterCode": ""
			})

		};
		let result = await network_request(name, options);

		if (result.code == 200) {
			DoubleLog(`${name}: ${result.message} , 欢迎 ${result.data.nickname}, 手机号 ${utils.phone_num(result.data.phoneNum)}\n    您的新token为(自行添加到易语言):\n${result.data.token}`);
			token = result.data.token
			await utils.wait(2);
		} else if (result.code == 9001) {
			DoubleLog(`${name}: ${result.message}`);
			ck_status = 0
		} else {
			DoubleLog(`${name}: 失败 ❌ 了呢,原因未知!`);
			console.log(result);
			ck_status = 0
		}
	}


	// 初始化
	async init(name) {
		if (!name) {
			name = /function\s*(\w*)/i.exec(arguments.callee.toString())[1];
		}
		DoubleLog(`\n开始 ${name}`);
		host = "huiyuan.timingmar.com";
		hostname = "https://" + host;
		apiname = `${hostname}/hy-api`
		hyfls_hd = {
			"Content-Type": "application/json",
			'Host': this.host,
			'access_token': token,
		}
	}




	// 签到信息   get
	async sign_info(name) {
		let options = {
			method: "get",
			url: `${apiname}/mc/eu/getSignInDays`,
			headers: hyfls_hd,
		};
		let result = await network_request(name, options);

		if (result.data.isSingIn == 0) {
			DoubleLog(`${name}: 未签到 ,去签到喽!`);
			await this.do_sign("签到")
		} else if (result.data.isSingIn == 1) {
			DoubleLog(`${name}: 已签到, 明天再来吧!`);
		} else {
			DoubleLog(`${name}: 失败 ❌ 了呢,原因未知!`);
			console.log(result);
		}
	}

	// 签到    get  https://huiyuan.timingmar.com/hy-api/mc/eu/signIn
	async do_sign(name) {
		let options = {
			method: "get",
			url: `${apiname}/mc/eu/signIn`,
			headers: hyfls_hd,
		};
		let result = await network_request(name, options);

		if (result.code == 200) {
			DoubleLog(`${name}:${result.message}, 签到时间:${utils.tmtoDate(result.data.lastSignInTime)}, 累计签到天数:${result.data.signDays} 天`);
			utils.tmtoDate
			await utils.wait(3);
		} else if (result.code == 400) {
			DoubleLog(`${name}:${result.message}`);
		} else {
			DoubleLog(`${name}: 失败❌了呢`);
			console.log(result);
		}
	}


	// 幸运产品列表    get 开启时间:2022-10-11 23:00:00
	async lucky_list(name) {
		let options = {
			method: "get",
			url: `${apiname}/mc/lucky/goods/user/getTodayLuckyGoods`,
			headers: hyfls_hd,
		};
		let result = await network_request(name, options);

		if (result.code == 200) {
			DoubleLog(`${name}:${result.message}, 产品id:${result.data.id}, ${result.data.contentDescribe}\n    ${result.data.remark}--价格:${result.data.price}\n    开启时间:${utils.tmtoDate(result.data.openTime)}`);
			lucky_id = result.data.id
			lucky_price = result.data.price
			return lucky_id
		} else {
			DoubleLog(`${name}: 失败❌了呢`);
			console.log(result);
		}
	}

	// 获取地址id    get https://huiyuan.timingmar.com/hy-api/mc/eu/address/list
	async get_add_id(name) {
		let options = {
			method: "get",
			url: `${apiname}/mc/eu/address/list`,
			headers: hyfls_hd,
		};
		let result = await network_request(name, options);

		if (result.code == 200 && result.data.list.length > 0) {
			DoubleLog(`${name}: ${result.message}, 将使用该地址:${JSON.stringify(result.data.list[0])}`);
			add_id = result.data.list[0].id
			return add_id
		} else if (result.code == 200 && result.data.list.length == 0) {
			DoubleLog(`${name}: 请自行增加收货地址!`)
			return add_id = false
		} else {
			DoubleLog(`${name}: 失败❌了呢`);
			console.log(result);
		}
	}

	// 抢购幸运产品    post  https://huiyuan.timingmar.com/hy-api/mc/lucky/goods/user/submit/order
	async rush_lucky(name) {
		await this.lucky_list('幸运产品列表')
		await this.get_add_id('获取地址id')
		if (add_id) {
			let options = {
				method: "post",
				url: `${apiname}/mc/lucky/goods/user/submit/order`,
				headers: hyfls_hd,
				body: JSON.stringify({
					"luckyGoodsId": lucky_id,
					"quantity": "1",
					"euCouponId": null,
					"totalPayFee": lucky_price,
					"loader": true,
					"remarks": "",
					"addressId": add_id,
					"statusNow": 2
				})
			};
			let result = await network_request(name, options);

			if (result.code == 200) {
				DoubleLog(`${name}:可能成功了, 自己去列表看看吧!`);
				DoubleLog(`${name}:${result}`);
			} else if (result.code == 400) {
				DoubleLog(`${name}:${result.message}`);
			} else {
				DoubleLog(`${name}: 失败❌了呢`);
				console.log(result);
			}
		} else {
			DoubleLog(`${name}: 请自行增加收货地址!`)
		}

	}


	// 抽奖信息		get  https://huiyuan.timingmar.com/hy-api/lottery/activity/time?id=6&noLoad=true
	// https://huiyuan.timingmar.com/hy-api/lottery/activity/time?id=6&noLoad=true
	async prize_Info(name, type) {
		let options = {
			method: "get",
			url: `${apiname}/lottery/activity/time?id=${type}&noLoad=true`,
			headers: hyfls_hd,
		};
		let result = await network_request(name, options);

		// console.log(result);
		if (result.code == 201 && result.data.num > 0) {
			DoubleLog(`${name}, 抽奖次数 ${result.data.num} 次`)
			await this.do_prize(`开始 ${name}`, type)
		} else if (result.code == 201 && result.data.num == 0) {
			DoubleLog(`${name}：暂时无 ${name} 次数！`)
		} else {
			DoubleLog(`${name}: 失败❌了呢`);
			console.log(result);
		}
	}

	// 抽奖  https://huiyuan.timingmar.com/hy-api/lottery/activity/get-prize?id=8&noLoad=true&prizeChannel=1  碎片
	// https://huiyuan.timingmar.com/hy-api/lottery/activity/get-prize?id=6&noLoad=true&prizeChannel=1   盲盒
	async do_prize(name, type) {
		let options = {
			method: "get",
			url: `${apiname}/lottery/activity/get-prize?id=${type}&noLoad=true&prizeChannel=1`,
			headers: hyfls_hd,
		};
		let result = await network_request(name, options);

		// console.log(result);
		if (type == 6) {
			if (result.code == 201) {
				let gitBoxVO = result.data.gitBoxVO
				DoubleLog(`${name}: 获得爆爆珠: ${result.data.bullCoin} 个\n    获得 ${gitBoxVO.name} , 奖品别名: ${gitBoxVO.remark}, 奖品描述: ${gitBoxVO.priceDesc}`);
				await utils.wait(3)
			} else if (result.code == 400) {
				DoubleLog(`${name}: ${result.message}`);
			} else {
				DoubleLog(`${name}: 失败❌了呢`);
				console.log(result);
			}
		} else if (type == 8) {
			if (result.code == 201) {
				let fragmentsDrawVo = result.data.fragmentsDrawVo
				DoubleLog(`${name}:  获得爆爆珠: ${result.data.bullCoin} 个\n    获得 ${fragmentsDrawVo.fragmentsName} , 奖品id: ${fragmentsDrawVo.packageId}, 奖品名字: ${fragmentsDrawVo.prizeName}`);
				await utils.wait(3)
			} else if (result.code == 400) {
				DoubleLog(`${name}: ${result.message}`);
			} else {
				DoubleLog(`${name}: 失败❌了呢`);
				console.log(result);
			}
		}
	}


	// 查询汇源币		get   https://huiyuan.timingmar.com/hy-api/mc/eu/login/user/integral
	async coin_num(name) {
		let options = {
			method: "get",
			url: `${apiname}/mc/eu/login/user/integral`,
			headers: hyfls_hd,
		};
		let result = await network_request(name, options);

		// console.log(result);
		if (result.code == 200) {
			DoubleLog(`${name}, 现在有 ${result.data.integral} 汇源币`)
		} else {
			DoubleLog(`${name}: 失败❌了呢`);
			console.log(result);
		}
	}
}















// #region ********************************************************  固定代码  ********************************************************

/**
 * 账号处理
 */
!(async () => {
	let ckArr = await utils.checkEnv(ckStr, alias_name);
	await tips(ckArr);
	for (let index = 0; index < ckArr.length; index++) {
		let num = index + 1;
		DoubleLog(`\n-------- 开始【第 ${num} 个账号】--------`);
		ck = ckArr[index].split("&");
		await start();
	}
	await SendMsg(msg);
})()
	.catch((e) => console.log(e))
	.finally(() => $.done());

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
			console.log($.name, "", message);
		}
	} else {
		console.log(message);
	}
}

/**
 * 双平台log输出
 */
function DoubleLog(data) {
	console.log(`    ${data}`);
	msg += `\n    ${data}`;
}

// 网络请求   network_request
async function network_request(name, options) {
	if (!name) {
		name = /function\s*(\w*)/i.exec(arguments.callee.toString())[1];
	}
	DoubleLog(`\n开始 ${name}`);
	try {
		let result = await utils.httpRequest(name, options);
		if (result) {
			return result
		} {
			DoubleLog(`未知错误(1`)
		}
	} catch (error) {
		console.log(error);
	}
}


// 精简 Env
function Env(name, e) {
	class s {
		constructor(name) {
			this.env = name;
		}
	}
	return new (class {
		constructor(name) {
			(this.name = name),
				(this.logs = []),
				(this.startTime = new Date().getTime()),
				this.log(`\n🔔${this.name}, 开始!`);
		}
		isNode() {
			return "undefined" != typeof module && !!module.exports;
		}

		log(...name) {
			name.length > 0 && (this.logs = [...this.logs, ...name]),
				console.log(name.join(this.logSeparator));
		}

		done() {
			const e = new Date().getTime(),
				s = (e - this.startTime) / 1e3;
			this.log(`\n🔔${this.name}, 结束! 🕛 ${s} 秒`)
		}
	})(name, e);
}

//#endregion

