
const fs = require("fs");
if (fs.readdirSync(__dirname).indexOf(utils.js) > -1) {
    console.log(`当前目录 [${__dirname}] 依赖 ${utils.js} 文件状态正常!`);
    var utils = require("./utils");
} else {
    console.log(`当前目录 [${__dirname}] 未找到 ${utils.js} , 将下载到该目录!`);
    write_utils(utils.js);
}





var utils = require("./utils");

// console.log(typeof (utils));
console.log(utils);
// console.log(utils);