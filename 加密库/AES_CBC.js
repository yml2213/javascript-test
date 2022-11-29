
key = 'A736D84915CDD994'
iv = '8B1D0AC15A9E2596'

function aes_cbc(data, key, iv) {
    const CryptoJS = require('crypto-js')  //引用AES源码js
    key = CryptoJS.enc.Utf8.parse(key)
    iv = CryptoJS.enc.Utf8.parse(iv)
    let password = CryptoJS.enc.Utf8.parse(data)
    let encrypted = CryptoJS.AES.encrypt(password, key, { iv: iv, mode: CryptoJS.mode.CBC, padding: CryptoJS.pad.Pkcs7 })  //CryptoJS.pad.ZeroPadding
    return encrypted + ""
}

pwd = aes_cbc('asd123456|A736D84915CDD994', key, iv)

console.log(pwd);

