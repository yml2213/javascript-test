var fs = require("fs");

// 异步读取
fs.readFile('线报测试/input.txt', function (err, data) {
	if (err) {
		return console.error(err);
	}
	console.log("异步读取: " + data.toString());
});

// 同步读取
var data = fs.readFileSync('线报测试/input.txt');
console.log("同步读取: " + data.toString());

console.log("程序执行完毕。");



// const fs = require('fs')

// fs.readFile('/Users/joe/test.txt', 'utf8', (err, data) => {
// 	if (err) {
// 		console.error(err)
// 		return
// 	}
// 	console.log(data)
// })
