const fs = require("fs")

fs.appendFile("./test/aa.txt", "\n我是下一行鸭", err => {
	console.log(err);
	if (err && err.code === "EEXIST") {
		console.log("目录已经存在")
	}
})

