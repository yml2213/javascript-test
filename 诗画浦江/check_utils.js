



async function check_utils(file_name) {
	await check(file_name)
	try {
		console.log(`=============2222========`);
		const utils = require("./utils");
		return utils
	} catch (error) {
		console.log(error);
	}
	async function check(file_name) {
		const fs = require('fs')
		const path = require('path')
		dirPath = path.resolve(__dirname)
		console.log(dirPath);
		let files = fs.readdirSync(dirPath)
		// console.log(files);
		if (files.indexOf(file_name) > -1) {
			console.log(`当前目录 [${dirPath}] 依赖 ${file_name} 文件状态正常!`)
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
					console.log(`目录 [${dirPath}]  ${file_name} 文件写入成功\n请再次运行脚本!`)
					console.log(`=============1111========`);

				})
			});
		}
	}

}

check_utils('utils.js')



