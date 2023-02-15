/*
返利 app

cron 4 7-20 * * *   fanli.js

========= 青龙--配置文件--贴心复制区域  ========= 
# 返利
export fanli='PHPSESSID @ PHPSESSID' 

取 huodong.fanli.com  域名的包, cookie中 PHPSESSID  只要这一个就行

10-21		完成基本任务， (新手任务不会做)

多账号用 换行 或 @ 分割
tg频道: https://t.me/yml2213_tg  
*/



const $ = new Env("返利");
check_utils("utils.js");
// const utils = require("./utils");
const ckName = "fanli";
//---------------------------------------------------------
const notify = $.isNode() ? require("./sendNotify") : "";
const Notify = 1; 			//0为关闭通知,1为打开通知,默认为1
let envSplitor = ["@", "\n"];
let ck = msg = ""
let host, hostname, httpRequest;
let userCookie = process.env[ckName];
let userList = [];
let userIdx = 0;
let userCount = 0;
//---------------------------------------------------------

let text = sign = ""
//---------------------------------------------------------

async function start() {

	for (let user of userList) {
		console.log("\n================== 签到 ==================\n");
		await user.do_sign('签到')
		console.log("\n================== 看视频得金币 ==================\n");
		await user.video('签到')
		console.log("\n================== 任务列表 ==================\n");
		await user.task_list('任务列表')
		console.log("\n================== 查金币 ==================\n");
		await user.check_coin('查金币')

	}


}

class UserInfo {
	constructor(str) {
		this.index = ++userIdx;
		this.PHPSESSID = str;
		this.headers = {
			"accept": "application/json, text/javascript, */*; q=0.01",
			"cookie": `PHPSESSID=${this.PHPSESSID}`,
			"User-Agent": "Mozilla/5.0 (Linux; Android 12; M2102J2SC Build/SKQ1.211006.001; wv) AppleWebKit/537.36 (KHTML, like Gecko) Version/4.0 Chrome/96.0.4664.104 Mobile Safari/537.36 Fanli/7.19.28.6 (ID:2-560135116-66740356908189-4-0; WVC:WV; SCR:1080*2340-2.75)",
		}
	}


	async do_sign(n) {
		try {
			let options = {
				method: "get",
				url: `https://huodong.fanli.com/sign82580/ajaxSetUserSign`,
				headers: this.headers
			};
			let result = await httpResult(n, options);
			// console.log(result);
			if (result.status == 1 && result.data.reward != 0) {
				DoubleLog(`账号[${this.index}]  ${n}: 成功, 获得金币:${result.data.reward}`);
				await wait(3)
			} else if (result.data.reward == 0) {
				DoubleLog(`账号[${this.index}]  ${n}:今天已签到,明天再来吧!`);
			} else {
				DoubleLog(`账号[${this.index}]  ${n}: 失败❌了呢`);
				console.log(result);
			}
		} catch (error) {

		}

	}

	async video(n) {
		try {
			let options = {
				method: "get",
				url: `https://huodong.fanli.com/sign82580/ajaxSetUserTask?id=19&pos=1`,
				headers: this.headers
			};
			let result = await httpResult(n, options);
			// console.log(result);
			if (result.status == 1) {
				DoubleLog(`账号[${this.index}]  ${n}: 成功, 等待100秒`);
				await wait(100)
				await this.video('看视频得金币')
			} else if (result.data.reward == 0) {
				DoubleLog(`账号[${this.index}]  ${n}: ${result.info}`);
			} else {
				DoubleLog(`账号[${this.index}]  ${n}: 失败❌了呢`);
				console.log(result);
			}
		} catch (error) {

		}

	}

	async task_list(n) {
		let options = {
			method: "get",
			url: `https://huodong.fanli.com/sign82580/ajaxMainInit`,
			headers: this.headers
		};
		let result = await httpResult(n, options);
		if (result.status == 1) {
			let task_list = result.data.task_list.daily_task
			for (const task of task_list) {
				this.title = task.title
				this.id = task.id
				if (task.id == 17) {
					let time_list = [7, 8, 9, 10, 11, 12, 13, 14, 17, 18, 19, 20]
					let h = utils.local_hours()
					if (time_list.indexOf(h)) {
						await this.do_task(this.title, this.id)
					}
				} else if (this.id != 17 && task.is_finish == 0) {
					DoubleLog(`${this.title}:未完成`)
					await this.do_task(this.title, this.id)
				} else {
					DoubleLog(`${this.title}:完成`)
				}
			}

		} else {
			DoubleLog(`账号[${this.index}]  ${n} 失败❌了呢`);
			console.log(result);
		}
	}

	async do_task(n, id) {
		let options = {
			method: "get",
			url: `https://huodong.fanli.com/sign82580/ajaxSetUserTask?id=${id}&pos=`,
			headers: this.headers
		};
		let result = await httpResult(n, options);
		if (result.status == 1) {
			DoubleLog(`账号[${this.index}] ${n}: ok `);
			await wait(5)
		} else if (result.status == 0) {
			DoubleLog(`账号[${this.index}] ${n}: ${result.info} `);
		}
		else {
			DoubleLog(`账号[${this.index}]  ${n}: 失败❌了呢`);
			console.log(result);
		}
	}

	async check_coin(n) {
		let options = {
			method: "get",
			url: `https://huodong.fanli.com/sign82580/ajaxMainInit`,
			headers: this.headers
		};
		let result = await httpResult(n, options);
		// console.log(result);
		if (result.status == 1) {
			this.userid = result.data.userid
			this.points = result.data.points
			DoubleLog(`账号[${this.index}]  ${n}: ${this.userid}, 金币余额:${this.points}`);
		} else {
			DoubleLog(`账号[${this.index}]  ${n} 失败❌了呢`);
			console.log(result);
		}
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
	.finally(() => $.done());

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


function Env(name, e) { class s { constructor(name) { this.env = name; } } return new (class { constructor(name) { (this.name = name), (this.logs = []), (this.startTime = new Date().getTime()), this.log(`\n🔔${this.name}, 开始!`); } isNode() { return "undefined" != typeof module && !!module.exports; } log(...name) { name.length > 0 && (this.logs = [...this.logs, ...name]), console.log(name.join(this.logSeparator)); } done() { const e = new Date().getTime(), s = (e - this.startTime) / 1e3; this.log(`\n🔔${this.name}, 结束! 🕛 ${s} 秒`); } })(name, e); } async function httpResult(name, options) { if (!name) { name = /function\s*(\w*)/i.exec(arguments.callee.toString())[1]; } try { let result = await utils.httpRequest(name, options); if (result) { return result; } { DoubleLog(`未知错误(1`); } } catch (error) { console.log(error); } } async function SendMsg(message) { if (!message) return; if (Notify > 0) { if ($.isNode()) { var notify = require("./sendNotify"); await notify.sendNotify($.name, message); } else { console.log($.name, "", message); } } else { console.log(message); } } function wait(n) { return new Promise(function (resolve) { setTimeout(resolve, n * 1000); }); } function DoubleLog(data) { console.log(`    ${data}`); msg += `\n    ${data}`; } async function check_utils(file_name) { await check(file_name); try { utils = require("./utils"); return utils; } catch (error) { console.log(error); } async function check(file_name) { const fs = require("fs"); const path = require("path"); dirPath = path.resolve(__dirname); let files = fs.readdirSync(dirPath); if (files.indexOf(file_name) > -1) { console.log(`当前目录 [${dirPath}] 依赖 ${file_name} 文件状态正常!`); utils = require("./utils"); return utils; } else { console.log(`当前目录 [${dirPath}] 未找到 ${file_name} , 将下载到该目录!`); write_utils(file_name); } function write_utils(file_name) { var request = require("request"); var options = { method: "GET", url: "https://raw.gh.fakev.cn/yml2213/javascript/master/utils.js", headers: {}, }; request(options, function (error, response) { if (error) throw new Error(error); text = response.body; fs.writeFile(`${dirPath}/${file_name}`, text, `utf-8`, (err) => { if (err) { console.log(`目录 [${dirPath}]  ${file_name} 文件 写入失败`); } console.log(`\n目录 [${dirPath}]  ${file_name} 文件写入成功\n请再次运行脚本!\n请再次运行脚本!\n请再次运行脚本!`); }); }); } } }

//#endregion
