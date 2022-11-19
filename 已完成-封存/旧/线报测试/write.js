const fs = require("fs")

fs.writeFile("./test/aa.txt", "hello world", err => {
	console.log(err);
})

