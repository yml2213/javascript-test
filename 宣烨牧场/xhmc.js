/*
宣烨牧场  app

cron 10 8,10,12 * * *  xhmc.js

========= 青龙--配置文件--贴心复制区域  ========= 
# 宣烨牧场
export xhmc='phone & pwd ' 


多账号用 换行 或 @ 分割
tg频道: https://t.me/yml2213_tg  
*/

const $ = new Env("宣烨牧场");
check_utils("utils.js");
const ckName = "xhmc";
//---------------------------------------------------------
const notify = $.isNode() ? require("./sendNotify") : "";
const Notify = 1; //0为关闭通知,1为打开通知,默认为1
let envSplitor = ["@", "\n"];
let ck = (msg = "");
let host, hostname, httpRequest;
let userCookie = process.env[ckName];
let userList = [];
let userIdx = 0;
let userCount = 0;
//---------------------------------------------------------

let text = (sign = "");
//---------------------------------------------------------

async function start() {
	console.log("\n================== 登录 ==================\n");
	taskall = [];
	for (let user of userList) {
		taskall.push(user.login("登录"));
	}
	await Promise.all(taskall);

	// console.log('\n================== 签到 ==================\n')
	// taskall = []
	// for (let user of userList) {
	// 	taskall.push(user.signin('签到'))
	// }
	// await Promise.all(taskall)

	console.log('\n================== 领积分 ==================\n')
	taskall = []
	for (let user of userList) {
		taskall.push(user.getPrize('领积分'))
	}
	await Promise.all(taskall)
}

class UserInfo {
	constructor(str) {
		this.index = ++userIdx;
		this.ck = str.split("&");
		this.phone = this.ck[0];
		this.pwd = this.ck[1];
		this.salt = "999b82549a8e331b94bad3318117fe90";
		this.appkey = "4318317670";
		this.ts = utils.ts13();
	}

	async login(name) { // 登录
		let path = 'user/public/v1/login'
		let nonce = this.get_nonce();
		let ts = this.ts;
		let sign = this.get_sign(1, path, nonce, ts);
		// console.log(sign);
		let options = {
			method: "post",
			url: `https://jetta-app.mosc.faw-vw.com/user/public/v1/login?appkey=${this.appkey}&nonce=${nonce}&digitalSign=${sign}&signTimestamp=${ts}`,
			headers: {
				did: "EBO_APP_Xiaomi-M2102J2SC_1D028CED8DBE7E9989BCC35032492CF4_Android12_v2.3.14",
				"user-agent": "okhttp/4.9.0",
				"Content-Type": "application/json",
			},
			body: JSON.stringify({
				password: this.pwd,
				scope: "openid profile mbb",
				account: this.phone,
			}),
		};

		// console.log(options);
		let result = await httpResult(name, options);

		// console.log(result);
		if (result.returnStatus == "SUCCEED") {
			DoubleLog(`账号[${this.index}]  ${name}" ${result.returnStatus}`);
			this.token = result.data.accessToken;
			// console.log(this.token);
			await utils.wait(3);
		} else {
			DoubleLog(`账号[${this.index}]  ${name} 失败❌了呢`);
			console.log(result);
		}
	}

	// https://mg.jconnect.faw-vw.com/vehicle-market/public/signIn/signIn?token=${this.token}&signt=${ts}&sign=${sign}&appkey=${this.appkey}&nonce=${nonce}
	async signin(name) { //签到

		let path = 'vehicle-market/public/signIn/signIn'
		let nonce = this.get_nonce();
		let ts = this.ts;
		let sign = this.get_sign(2, path, nonce, ts);
		console.log(sign);

		let options = {
			method: "Get",
			url: `https://mg.jconnect.faw-vw.com/vehicle-market/public/signIn/signIn?token=Bearer%20${this.token}&signt=${ts}&sign=${sign}&appkey=${this.appkey}&nonce=${nonce}`,
			headers: {
				"Host": 'mg.jconnect.faw-vw.com',
				'User-Agent': "okhttp/4.9.0"
			}
		};
		console.log(options);
		let result = await httpResult(name, options);
		console.log(result);

		if (result.status == "SUCCEED") DoubleLog(`账号[${this.index}]  ${name}: ${result.status}, 获得积分 ${result.data}`), await utils.wait(3);
		else if (result.status == "FAILED") DoubleLog(`账号[${this.index}]  ${name}: ${result.errorMessage}`);
		else DoubleLog(`账号[${this.index}]  ${name} 失败❌了呢`), console.log(result)

	}

	async getPrize(name) { // 领积分
		let options = {
			method: "Get",
			url: `https://service-yy.jconnect.faw-vw.com/redpackbankv2/prize/getPrize`,
			headers: {
				"Host": 'service-yy.jconnect.faw-vw.com',
				'token': this.token,
			}
		};

		let result = await httpResult(name, options);

		if (result.status == "SUCCEED") DoubleLog(`账号[${this.index}]  ${name}: ${result.status}, 获得 ${result.data.todayPrize} 积分, 共有 ${result.data.allPrize} 积分`), await utils.wait(3);
		else if (result.status == "FAILED") DoubleLog(`账号[${this.index}]  ${name}: ${result.errorMessage}`);
		else DoubleLog(`账号[${this.index}]  ${name} 失败❌了呢`), console.log(result)
	}


	get_sign(type, path, nonce, ts) {
		if (type == 1) var _data = `${path}_appkey=${this.appkey}_nonce=${nonce}_signTimestamp=${ts}_${this.salt}`, sign = utils.MD5_Encrypt(encodeURIComponent(_data));
		if (type == 2) var _data = `${encodeURIComponent(path)}_appkey%3D${this.appkey}_nonce%3D${nonce}_signt%3D${ts}_token%3DBearer+${this.token}`, sign = utils.MD5_Encrypt(_data);;
		return sign;
	}


	get_nonce() {
		let nonce = `${utils.randomszxx(8)}-${utils.randomszxx(
			4
		)}-${utils.randomszxx(4)}-${utils.randomszxx(4)}-${utils.randomszxx(12)}`;
		return nonce;
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
