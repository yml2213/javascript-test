var http = require('http')
var fs = require('fs');
const path = require('path')
dirPath = path.resolve(__dirname)
console.log(dirPath);


let path1 = 'http://niunai.mkjng.top:1003/captcha/flat?MpKTuXFp'
http.get(path1, function (req, res) {  //path为网络图片地址
	var imgData = '';
	req.setEncoding('binary');
	req.on('data', function (chunk) {
		imgData += chunk
	})
	req.on('end', function () {

		let path2 = `${dirPath}/code.png`
		fs.writeFile(path2, imgData, 'binary', function (err) {  //path为本地路径例如public/logo.png
			if (err) { console.log(`保存出错！,${err}`) } else {
				console.log('保存成功!')
			}
		})
	})
})