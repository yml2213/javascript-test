const fs = require("fs")

fs.readFile("./test/aa.txt", "utf-8", (err,data) => {
	if (!err) {
		console.log(data);
	}
})

