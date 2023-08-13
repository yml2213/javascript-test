
const CryptoJS = require('crypto-js')


let a = CryptoJS.SHA256(1111).toString()
console.log(a)
// let b = `${a}${ld}`
// let pwd = CryptoJS.HmacSHA256(b).toString()