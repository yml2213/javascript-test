/*
爱思百货_转赠  app

接受转增   每个号一天两次
转增别人   每个号一月两次

cron 10 8,10,12 * * *  asbh.js

10.12		看视频,换猫豆
10.13		优化流程，缩短任务间隔

------------------------  青龙--配置文件-贴心复制区域  ---------------------- 
# 爱思百货_转赠
export asbh=" phone & pwd @ phone & pwd   "

多账号用 换行 或 @ 分割


tg频道: https://t.me/yml2213_tg  

*/

//-------------------- 配置区域 -----------------------------------------
//  接受转赠的手机号  梦里梦:15614832213        yml:15339956683    机器人： 13754650804
const phone_code = '13754650804'  			
const zz_num = '5'  							//  转赠数量   0.3  1  5  10 更多自己看app
const zz_info = '16283181910&z3za8yg6'  	//  转赠的手机号和密码, 多账号用 换行 或 @ 分割
const token_zz = '99272bbd5c298800a8793d45e9946113'  	//  转赠账号的 token


//----------------------------------------------------------------------




const utils = require("./utils");
const $ = new Env("爱思百货_转赠");
const alias_name = "asbh";
const notify = $.isNode() ? require("./sendNotify") : "";
const Notify = 1; 			//0为关闭通知,1为打开通知,默认为1
//---------------------------------------------------------------------------------------------------------
let ckStr = zz_info
let msg, ck;
let ck_status = 1;
//---------------------------------------------------------------------------------------------------------
let VersionCheck = "0.2";
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
	const asbh = new Script(ck[0], ck[1]);
	await asbh.init("初始化");
	// await asbh.login("登录");
	if (ck_status) {
		await asbh.user_info("用户信息");
	}
}

let token, hostname, host, asbh_hd
class Script {
	constructor(phone, pwd) {
		this.phone = phone
		this.pwd = pwd
		this.token_zz = token_zz
	}
	// 初始化
	async init(name) {
		if (!name) {
			name = /function\s*(\w*)/i.exec(arguments.callee.toString())[1];
		}
		DoubleLog(`\n开始 ${name}`)
		host = "multi.mallgo.net.cn"
		hostname = "https://" + host

		asbh_hd = {
			'Host': 'multi.mallgo.net.cn',
			'content-type': 'application/json'
		}
	}


	// 登录   post
	async login(name) {
		let options = {
			method: "post",
			url: `${hostname}/api/account/login`,
			headers: asbh_hd,
			body: JSON.stringify({
				"mobile": this.phone,
				"password": this.pwd,
				"client": 6
			})
		};
		let result = await network_request(name, options);

		if (result.code == 1) {
			DoubleLog(`${name}: ${result.msg}`);
			token = result.data.token
			await utils.wait(2);
			ck_status = 1
		} else if (result.code == 0) {
			DoubleLog(`${name}: ${result.msg}`);
			ck_status = 0
		} else {
			DoubleLog(`${name}: 失败 ❌ 了呢,原因未知!`);
			console.log(result);
			ck_status = 0
		}
	}


	// 用户信息  get    https://multi.mallgo.net.cn/api/user/center
	async user_info(name) {
		let options = {
			method: "get",
			url: `${hostname}/api/user/center`,
			headers: {
				'Host': 'multi.mallgo.net.cn',
				'content-type': 'application/json',
				'token': this.token_zz
			},
		};
		let result = await network_request(name, options);

		// console.log(result);
		if (result.code == 1) {
			DoubleLog(`${name}: 欢迎 ${result.data.nickname}, 手机号 ${utils.phone_num(result.data.mobile)}, 余额 ${result.data.user_money}, 等级 ${result.data.level}, 邀请码 ${result.data.distribution_code}`);
			if (result.data.user_money >= zz_num) {
				DoubleLog(`转赠检查: 余额充足, 可以继续`)
				await this.transfer('转赠分配')
			} else {
				DoubleLog(`转赠检查: 余额不足, 转赠个屁!`)
			}

		} else {
			DoubleLog(`${name}: 失败 ❌ 了呢,原因未知!`);
			console.log(result);
		}
	}


	// 转赠   get  https://multi.mallgo.net.cn/api/user/transfer  https://multi.mallgo.net.cn/api/user/transfer
	async do_transfer(name, id) {
		let options = {
			method: "post",
			url: `https://multi.mallgo.net.cn/api/user/transfer`,
			headers: {
				'Host': 'multi.mallgo.net.cn',
				'content-type': 'application/json',
				'token': this.token_zz
			},
			body: JSON.stringify({
				"mobile": phone_code,
				"id": id
			})
		};
		console.log(options);
		let result = await network_request(name, options);

		console.log(result);
		if (result.code == 1) {
			DoubleLog(`${name}: ${result.msg}`);
		} else if (result.code == 0) {
			DoubleLog(`${name}: ${result.msg}`);
		} else {
			DoubleLog(`${name}: 失败 ❌ 了呢,原因未知!`);
			console.log(result);
		}
	}


	// 转赠分配     0.3  1  5  10 更多自己看app
	async transfer(name) {

		if (zz_num == 0.3) {
			await this.do_transfer('开始转赠', 1)
		} else if (zz_num == 1) {
			await this.do_transfer('开始转赠', 2)
		} else if (zz_num == 5) {
			await this.do_transfer('开始转赠', 3)
		} else if (zz_num == 10) {
			await this.do_transfer('开始转赠', 6)
		} else {
			DoubleLog(`更大数额没写, 自己搞吧!`)
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

