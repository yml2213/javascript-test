

// 输出运行目录

console.log(__dirname);



// 运行目录下读取 原始.txt



const fs = require('fs');

fs.readFile('./原始.txt', 'utf8', function (err, data) {


    console.log(data);
}
);


