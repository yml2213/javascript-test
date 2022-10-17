const http = require('https');
const fs = require('fs');
const path = require('path')
dirPath = path.resolve(__dirname)
url = 'https://raw.gh.fakev.cn/yml2213/javascript/master/utils.js'
downloadFileAsync(url, dirPath)

function downloadFileAsync(uri, dest) {
	return new Promise((resolve, reject) => {
		// 确保dest路径存在
		const file = fs.createWriteStream(dest);

		http.get(uri, (res) => {
			if (res.statusCode !== 200) {
				reject(response.statusCode);
				return;
			}

			res.on('end', () => {
				console.log('download end');
			});

			// 进度、超时等

			file.on('finish', () => {
				console.log('finish write file')
				file.close(resolve);
			}).on('error', (err) => {
				fs.unlink(dest);
				reject(err.message);
			})

			res.pipe(file);
		});
	});
}