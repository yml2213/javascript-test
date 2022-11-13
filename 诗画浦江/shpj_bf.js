/*
诗画浦江  app

cron 10 8,10 * * *  shpj.js

========= 青龙--配置文件--贴心复制区域  ========= 
# 诗画浦江
export shpj=' x-session-id & x-request-id ' 


多账号用 换行 或 @ 分割
tg频道: https://t.me/yml2213_tg  
*/


const utils = require("yml2213-utils");
const $ = new Env("诗画浦江");
const ckName = "shpj";
//-------------------- 一般不动变量区域 -------------------------------------
const notify = $.isNode() ? require("./sendNotify") : ""
const Notify = 1		 //0为关闭通知,1为打开通知,默认为1
let envSplitor = ["@", "\n"];
let ck = msg = ''
let userCookie = process.env[ckName];
let userList = []
let userIdx = 0
let userCount = 0
//---------------------- 自定义变量区域 -----------------------------------
let app_id = 14;
let salt = 'FR*r!isE5W';
let text = sign = ''
//---------------------------------------------------------

async function start() {

	console.log('\n================== 用户信息 ==================\n')
	taskall = []
	for (let user of userList) {
		taskall.push(user.user_info('用户信息'))
	}
	await Promise.all(taskall)

	// console.log('\n================== 签到 ==================\n')
	// taskall = []
	// for (let user of userList) {
	// 	taskall.push(user.signin('签到'))
	// }
	// await Promise.all(taskall)


	console.log('\n================== 任务列表 ==================\n')
	taskall = []
	for (let user of userList) {
		taskall.push(user.task_list('任务列表'))
	}
	await Promise.all(taskall)



}


class UserInfo {
	constructor(str) {
		this.index = ++userIdx
		this.ck = str.split('&')
		this.xs = this.ck[0]
		this.xr = this.ck[1]
		this.salt = salt
		this.id = app_id
		this.ts = utils.ts13()
	}

	async signin(name) { //签到
		let path = '/api/user_mumber/sign'
		let sign = this.get_sign(path)

		let options = {
			method: "Get",
			url: `https://vapp.tmuyun.com${path}`,
			headers: {
				"X-SESSION-ID": this.xs,
				"X-REQUEST-ID": this.xr,
				"X-TIMESTAMP": this.ts,
				"X-SIGNATURE": sign,
				"Cache-Control": `no-cache`,
				"X-TENANT-ID": this.id,
				'Host': 'vapp.tmuyun.com',
			},
		};

		// console.log(options);
		let result = await httpRequest(name, options);

		// console.log(result);
		if (result.code == 0) {
			DoubleLog(`账号[${this.index}]  ${name}: ${result.data.reason}, 获得 ${result.data.signIntegral} 积分`);
			await wait(3);
		} else DoubleLog(`账号[${this.index}]  ${name} 失败❌了呢`), console.log(result);


	}

	async user_info(name) { //用户信息
		let path = '/api/user_mumber/account_detail'
		let sign = this.get_sign(path)

		let options = {
			method: "Get",
			url: `https://vapp.tmuyun.com${path}`,
			headers: {
				"X-SESSION-ID": this.xs,
				"X-REQUEST-ID": this.xr,
				"X-TIMESTAMP": this.ts,
				"X-SIGNATURE": sign,
				"Cache-Control": `no-cache`,
				"X-TENANT-ID": this.id,
				'Host': 'vapp.tmuyun.com',
			},
		};

		// console.log(options);
		let result = await httpRequest(name, options);

		// console.log(result);
		if (result.code == 0) {
			DoubleLog(`账号[${this.index}]  ${name}: ${result.data.rst.nick_name}, 手机号 ${utils.phone_num(result.data.rst.mobile)}, 积分 ${result.data.rst.total_integral} , 等级 ${result.data.rst.grade} ${result.data.rst.grade_name}`);
		} else DoubleLog(`账号[${this.index}]  ${name} 失败❌了呢`), console.log(result);

		let options = {
			method: "POST",
			url: `https://vapp.tmuyun.com${path}`,
			headers: {
				"X-SESSION-ID": this.xs,
				"X-REQUEST-ID": this.xr,
				"X-TIMESTAMP": this.ts,
				"X-SIGNATURE": sign,
				"Cache-Control": `no-cache`,
				"X-TENANT-ID": `14`,
				'Host': 'vapp.tmuyun.com',
				"Content-Type": `application/x-www-form-urlencoded`,
			},
			form: {
				'memberType': 6,
				'member_type': 6
			}
		};
		let result = await httpRequest(name, options);

		// console.log(result);
		if (result.code == 0) {
			DoubleLog(`账号[${this.index}]   ${name} : 成功 获得 ${result.data.score_notify.integral} 积分`);
			await wait(3);
		} else DoubleLog(`账号[${this.index}]  ${name} 失败❌了呢`), console.log(result);
	}

	async task_list(name) { //任务列表
		let path = '/api/user_mumber/numberCenter'
		let sign = this.get_sign(path)

		let options = {
			method: "Get",
			url: `https://vapp.tmuyun.com${path}?is_new=1`,
			headers: {
				"X-SESSION-ID": this.xs,
				"X-REQUEST-ID": this.xr,
				"X-TIMESTAMP": this.ts,
				"X-SIGNATURE": sign,
				"Cache-Control": `no-cache`,
				"X-TENANT-ID": this.id,
				'Host': 'vapp.tmuyun.com',
			},
		};

		// console.log(options);
		let result = await httpRequest(name, options);

		// console.log(result);
		if (result.code == 0) {
			let task_lists = result.data.rst.user_task_list;
			for (const task of task_lists) {
				this.id = task.id;
				this.name = task.name;
				this.completed = task.completed;  // 是否完成
				this.member_task_type = task.member_task_type;
				this.finish_times = task.finish_times;  // 已完成次数
				this.frequency = task.frequency;        // 总次数
				// console.log(this.id, this.name, this.completed, this.member_task_type);
				let taak_num = this.frequency - this.finish_times;
				DoubleLog(`账号[${this.index}]  ${name}: ${this.name}----${this.finish_times}/${this.frequency}`)

			}
			
		} else DoubleLog(`账号[${this.index}]  ${name} 失败❌了呢`), console.log(result);


	}


	get_sign(path) {
		let _data = `${path}&&${this.xs}&&${this.xr}&&${this.ts}&&${this.salt}&&${this.id}`;
		// console.log('_data: ', _data);
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


// =========================================== 不懂不要动 =========================================================
function Env(name, e) { class s { constructor(name) { this.env = name; } } return new (class { constructor(name) { (this.name = name), (this.logs = []), (this.startTime = new Date().getTime()), this.log(`\n🔔${this.name}, 开始!`); } isNode() { return "undefined" != typeof module && !!module.exports; } log(...name) { name.length > 0 && (this.logs = [...this.logs, ...name]), console.log(name.join(this.logSeparator)); } done() { const e = new Date().getTime(), s = (e - this.startTime) / 1e3; this.log(`\n🔔${this.name}, 结束! 🕛 ${s} 秒`); } })(name, e); } async function httpRequest(name, options) { if (!name) { name = /function\s*(\w*)/i.exec(arguments.callee.toString())[1]; } try { let result = await utils.httpRequest(name, options); if (result) { return result; } { DoubleLog(`未知错误(1)`); } } catch (error) { console.log(error); } } async function SendMsg(message) { if (!message) return; if (Notify > 0) { if ($.isNode()) { var notify = require("./sendNotify"); await notify.sendNotify($.name, message); } else { console.log($.name, "", message); } } else { console.log(message); } } function wait(n) { return new Promise(function (resolve) { setTimeout(resolve, n * 1000); }); } function DoubleLog(data) { console.log(`    ${data}`); msg += `\n    ${data}`; }

// =========================================== 不懂不要动 =========================================================
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
async function httpRequest(name, options) {
  if (!name) {
    name = /function\s*(\w*)/i.exec(arguments.callee.toString())[1];
  }
  try {
    let result = await utils.httpRequest(name, options);
    if (result) {
      return result;
    }
    {
      DoubleLog(`未知错误(1)`);
    }
  } catch (error) {
    console.log(error);
  }
}
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
function wait(n) {
  return new Promise(function (resolve) {
    setTimeout(resolve, n * 1000);
  });
}
function DoubleLog(data) {
  console.log(`    ${data}`);
  msg += `\n    ${data}`;
}

