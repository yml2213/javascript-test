/*
诗画浦江  app

cron 10 8,10,12 * * *  shpj.js

========= 青龙--配置文件--贴心复制区域  ========= 
# 诗画浦江
export shpj=' x-session-id & x-request-id ' 


多账号用 换行 或 @ 分割
tg频道: https://t.me/yml2213_tg  
*/


const $ = new Env("诗画浦江")
check_utils('utils.js')
const ckName = 'shpj'
//---------------------------------------------------------
const notify = $.isNode() ? require("./sendNotify") : ""
const Notify = 1		 //0为关闭通知,1为打开通知,默认为1
let envSplitor = ["@", "\n"];
let ck = msg = ''
let host, hostname, httpRequest
let userCookie = process.env[ckName];
let userList = []
let userIdx = 0
let userCount = 0
//---------------------------------------------------------

let app_id = 14
let text = sign = ''
//---------------------------------------------------------

async function start() {

	console.log('\n================== 签到 ==================\n')
	taskall = []
	for (let user of userList) {
		taskall.push(user.signin('签到'))
	}
	await Promise.all(taskall)


	// taskall = []
	// for (let user of userList) {
	// 	taskall.push(user.sign())
	// }
	// await Promise.all(taskall)

	// console.log('\n================== Prize ==================\n')
	// taskall = []
	// for (let user of userList) {
	// 	taskall.push(user.prizeLog())
	// }
	// await Promise.all(taskall)

}


class UserInfo {
	constructor(str) {
		this.index = ++userIdx
		this.ck = str.split('&')
		this.xs = this.ck[0]
		this.xr = this.ck[1]
		this.salt = 'FR*r!isE5W'
		this.id = app_id
		this.ts = utils.ts13()
	}

	async signin(name) { //签到
		let path = '/api/user_mumber/sign'
		let sign = this.get_sign(path)

		let options = {
			method: "Get",
			url: `https://vapp.tmuyun.com/api/user_mumber/sign`,
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

		console.log(options);
		let result = await httpResult(name, options);

		console.log(result);
		if (result.code == 0) {
			DoubleLog(`账号[${this.index}]  ${name}" ${result.data.reason}, 获得积分 ${result.data.signIntegral}`);
			await utils.wait(3);
		} else {
			DoubleLog(`账号[${this.index}]  ${name} 失败❌了呢`);
			console.log(result);
		}



	}



	get_sign(path) {
		let _data = `${path}&&${this.xs}&&${this.xr}&&${this.ts}&&${this.salt}&&${this.id}`;
		console.log('_data: ', _data);
		sign = utils.SHA256_Encrypt(_data)
		return sign
	}




}

!(async () => {
	if (!(await checkEnv())) return;
	if (userList.length > 0) {
		await start();
	}
	await SendMsg(msg);
})()
	.catch((e) => console.log(e))
	.finally(() => $.done())

///////////////////////////////////////////////////////////////////

// #region ********************************************************  固定代码  ********************************************************


// 变量检查与处理
async function checkEnv() {
	if (userCookie) {
		// console.log(userCookie);
		let e = envSplitor[0];
		for (let o of envSplitor)
			if (userCookie.indexOf(o) > -1) {
				e = o;
				break;
			}
		for (let n of userCookie.split(e)) n && userList.push(new UserInfo(n));
		userCount = userList.length;
	} else {
		console.log("未找到CK");
		return;
	}
	return console.log(`共找到${userCount}个账号`), !0;
}


// 发送消息
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

// 等待 X 秒
function wait(n) {
	return new Promise(function (resolve) {
		setTimeout(resolve, n * 1000);
	});
}

// 双平台log输出
function DoubleLog(data) {
	console.log(`    ${data}`);
	msg += `\n    ${data}`;
}

// 网络请求   httpRequest
async function httpResult(name, options) {
	if (!name) {
		name = /function\s*(\w*)/i.exec(arguments.callee.toString())[1];
	}
	// DoubleLog(`\n开始 ${name}`);
	try {
		let result = await utils.httpRequest(name, options);
		if (result) {
			return result;
		}
		{
			DoubleLog(`未知错误(1`);
		}
	} catch (error) {
		console.log(error);
	}
}

// utils检查
async function check_utils(file_name) {
	await check(file_name)
	try {
		utils = require("./utils");
		return utils
	} catch (error) {
		console.log(error);
	}
	async function check(file_name) {
		const fs = require('fs')
		const path = require('path')
		dirPath = path.resolve(__dirname)
		// console.log(dirPath);
		let files = fs.readdirSync(dirPath)
		// console.log(files);
		if (files.indexOf(file_name) > -1) {
			console.log(`当前目录 [${dirPath}] 依赖 ${file_name} 文件状态正常!`)
			utils = require("./utils");
			return utils
		} else {
			console.log(`当前目录 [${dirPath}] 未找到 ${file_name} , 将下载到该目录!`)
			write_utils(file_name)
		}

		function write_utils(file_name) {
			var request = require('request');
			var options = {
				'method': 'GET',
				'url': 'https://raw.gh.fakev.cn/yml2213/javascript/master/utils.js',
				'headers': {
				}
			};
			request(options, function (error, response) {
				if (error) throw new Error(error);
				text = response.body
				fs.writeFile(`${dirPath}/${file_name}`, text, `utf-8`, (err) => {
					if (err) {
						console.log(`目录 [${dirPath}]  ${file_name} 文件 写入失败`)
					}
					console.log(`\n目录 [${dirPath}]  ${file_name} 文件写入成功\n请再次运行脚本!\n请再次运行脚本!\n请再次运行脚本!`)

				})
			});
		}
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
			this.log(`\n🔔${this.name}, 结束! 🕛 ${s} 秒`);
		}
	})(name, e);
}



 //#endregion
