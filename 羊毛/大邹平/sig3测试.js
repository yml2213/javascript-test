// 导入crypto-js库
const CryptoJS = require('crypto-js')

let input = '{"encode":1,"password":"eW1sMTIzNDU2\n","black_box":"","username":"yml"}935afca6f732450caa9b79dfc53c9c0bc3bf2a59516c3c01ac3b7c5b1c1e1de01690971081652'

// 替换\n为\\n
input = input.replace(/\n/g, '\\n')

// 计算MD5值
let md5Hash = CryptoJS.MD5(input).toString()

console.log(md5Hash)
