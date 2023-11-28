const express = require('express')
const app = express()

async function httpRequest(options) {
	const request = require('request')

	return new Promise((resolve) => {

		request(options, function (error, response) {
			// if (error) throw new Error(error)
			// response.body
			let data = response.body
			try {
				// console.log(typeof (data));
				if (typeof data == 'string') {
					if (isJsonString(data)) {
						let result = JSON.parse(data)
						resolve(result)
					} else {
						let result = data
						resolve(result)
					}
					function isJsonString(str) {
						if (typeof str == 'string') {
							try {
								if (typeof JSON.parse(str) == 'object') {
									return true
								}
							} catch (e) {
								return false
							}
						}
						return false
					}
				} else {
					let result = data
					resolve(result)
				}
			} catch (e) {
				console.log(error, response)
				console.log(`\n 失败了!请稍后尝试!!`)
			} finally {
				resolve()
			}
		})
	})
}




// let uuid = '00000000000005042604A4ED04234B0400A63333EEE90A170095277195325010'

function get_uuid() {
	// console.log(uuid)
	return `00000000000005${randomString(50, {dx: true, sz: true})}`
}

async function get_usid(token) {
	const options = {
		method: 'get',
		url: `https://open.meituan.com/user/v1/info/auditting?fields=auditAvatarUrl%2CauditUsername`,
		headers: {
			'Connection': 'keep-alive',
			// 'Origin': 'https://mtaccount.meituan.com',
			'User-Agent': '%E7%BE%8E%E5%9B%A2/194292 CFNetwork/1485 Darwin/23.1.0',
			'token': token,
			'Referer': 'https://mtaccount.meituan.com/user/',
			'Accept-Encoding': 'gzip, deflate',
			'Accept-Language': 'zh-CN,en-US;q=0.9',
			'X-Requested-With': 'com.sankuai.meituan',
		}
	}
	// console.log(options)
	let res = await httpRequest(options)
	// console.log(res)
	if (res) {
		return [res.user.id, res.user.username]
	}


	// let uuid = `00000000000005${randomString(50, { dx: true, sz: true })}`
	// console.log(uuid)
	// return uuid
}




function randomString(length, options = { xx: true, dx: true, sz: true }) {
	let charset = ''
	if (options.xx) {
		charset += 'abcdefghijklmnopqrstuvwxyz'
	}
	if (options.dx) {
		charset += 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'
	}
	if (options.sz) {
		charset += '0123456789'
	}
	let res = ''
	for (let i = 0; i < length; i++) {
		let randomIndex = Math.floor(Math.random() * charset.length)
		res += charset.charAt(randomIndex)
	}
	return res
}



app.post('/tbyz', async (req, res) => {
	let parsedBody = ''
	req.on('data', (chunk) => parsedBody += chunk)
	req.on('end', async () => {
		console.log(parsedBody)
		try {
			parsedBody = JSON.parse(parsedBody)
			let token = parsedBody.token
			// console.log(token)
			let usid_data = await get_usid(token)
			let usid = usid_data[0]
			let name = usid_data[1]
			// {'msg': '登录成功 卡密剩余次数1643', 'name': '痞子林', 'usid': 1670908, 'uuid': '00000000000005042604A4ED04234B0400A63333EEE90A170095277195325010', 'token': 'AgG3IW_XiQeem7fySznkYJh9VA3ODoct5_Vp0pmzXmUTGGLYbXLJ99kPvlcHgJlBmDt6M-DMeXMGmgAAAABLGwAAfAcoLMQBvMZwwmrTWH-WBKb8S-xzDrtSahm_hs7ccYmVMLpaxhYN7EklUu6IQ5_j'}
			let aa = { 'msg': '登录成功 卡密剩余次数9999999', 'name': name, 'usid': usid, 'uuid': get_uuid(), 'token': token }
			console.log(aa)
			res.send(aa)
		} catch (error) {
			console.log(error)
		}
	})
})





app.get('/tbyz', (req, res) => {
	res.send('Hello, World!')
})

// app.get('/mt222', (req, res) => {
// 	let data = { 'msg': '登录成功 卡密剩余次数 9999999 ', 'name': '名字', 'usid': 1670908, 'uuid': get_uuid(), 'token': 'AgG3IW_XiQeem7fySznkYJh9VA3ODoct5_Vp0pmzXmUTGGLYbXLJ99kPvlcHgJlBmDt6M-DMeXMGmgAAAABLGwAAfAcoLMQBvMZwwmrTWH-WBKb8S-xzDrtSahm_hs7ccYmVMLpaxhYN7EklUu6IQ' }
// 	res.send(data)
// })

app.listen(1252, () => {
	console.log('服务器已启动')
})