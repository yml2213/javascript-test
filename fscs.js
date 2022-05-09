const fs = require("fs");

const readLine = require("readline");

fs.stat("./YMRZ.txt", (err, stats) => {
    //先判断err是否为真(判断是否读取成功)
    if (err) {
        console.log("YMRZ.txt 该文件不存在！即将创建txt文本");
        fs.createWriteStream('YMRZ.txt')
        fs.open('YMRZ.txt','a',function (err,fd) {
            if (!err){
                fs.write(fd,'',10,function (err,bite,data) {
                  if (!err){
                      console.log('文件写入成功');
                  };
                  fs.close(fd,function (err) {
                    if (!err){
                        console.log('文件已关闭');
                    };
                  });
                });
            };
        });
                
                
            } else {
                //console.log("YMRZ.txt 该文件已存在！");
                
            }
            
        })
        
        fileName = './YMRZ.txt'
    

function readFileToArr(fileName, callback) {
    var arr = [];
    var readObj = readLine.createInterface({
        input: fs.createReadStream(fileName)
    });
    readObj.on('line', function (line) {
        arr.push(line);
    });
    readObj.on('close', function () {
        callback(arr);
    });

}
readFileToArr(fileName,async function (arr) {
    YYDQ = arr[arr.length - 8] //YY大全
    PLB = arr[arr.length - 7] //破零吧
    TTZ = arr[arr.length - 6] //天天赚
    MNZ = arr[arr.length - 5] //迷你赚
    AXW = arr[arr.length - 4] //安寻味
    XZW = arr[arr.length - 3] //小众网
    WKCP = arr[arr.length - 2] //微客测评
    AQSHW = arr[arr.length - 1] //爱Q生活网
    
})