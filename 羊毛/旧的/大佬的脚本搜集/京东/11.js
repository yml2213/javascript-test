// console.log(process.env)

let ckName = 'gqcq'
async function qltask(type, eid) {
	const { getEnvs, getEnvById, DisableCk, EnableCk, getstatus, DisableCkByCk } = require('./ql_yml')
	if (type == 'getEnvs') {
		const envs = await getEnvs(ckName)
		console.log(envs)
		return envs
	} else if (type == 'getEnvById') {
		cookie = await getEnvById(ckName, eid)
		if (cookie) {
			console.log(cookie)

			return cookie
		} else return false
	} else if (type == 'DisableCk') {
		const DisableCkBody = await DisableCk(eid)
		if (DisableCkBody.code == 200) {
			console.log(`账号${eid}: 禁用成功  ❌`)
			return true
		} else return false
	} else if (type == 'DisableCkByCk') {
		const DisableCkByCkBody = await DisableCk(eid)
		if (DisableCkByCkBody.code == 200) {
			this.log(`账号${eid}: 禁用成功  ❌`)
			return true
		} else return false
	} else if (type == 'EnableCk') {
		const DisableCkBody = await EnableCk(eid)
		if (DisableCkBody.code == 200) {
			console.log(`账号${eid}: 启用成功 ✅`)
			return true
		} else return false
	} else if (type == 'getstatus') {
		const strnowstatus = await getstatus(ckName, eid)
		if (strnowstatus == 99) {
			console.log(`账号${eid}: 未知错误`)
		} else if (strnowstatus == 0) {
			console.log(`账号${eid}: 状态 -- 已启用 ✅`)
		} else if (strnowstatus == 1) {
			console.log(`账号${eid}: 状态 -- 已禁用 ❌`)
		}
	}

}



async function main() {
	// await qltask('getEnvs')
	// await qltask('DisableCk', 3)
	// await qltask('getstatus', 2)
	// await qltask('getstatus', 3)
	await qltask('DisableCkByCk', '1323aa')
}
main()

