const fs = require("fs")
// 创建目录
fs.mkdir("./test", (err) => {
	// console.log(err);
	if (err && err.code === "EEXIST") {
		console.log("目录已经存在")
	}
})

// fs.writeFile("./test/aa.txt", "hello world", err => {
// 	console.log(err);
// })