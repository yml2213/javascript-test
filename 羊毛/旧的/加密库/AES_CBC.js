let crypto = require('crypto-js')
function Encrypt(word) {
    let key = '密钥要后后台一致'
    let iv = '偏移量要个后台一致'

    key = crypto.enc.Utf8.parse(key)
    iv = crypto.enc.Utf8.parse(iv)

    let srcs = crypto.enc.Utf8.parse(word)
    // 加密模式为CBC，补码方式为PKCS5Padding（也就是PKCS7）
    let encrypted = crypto.AES.encrypt(srcs, key, {
        iv: iv,
        mode: crypto.mode.CBC,
        padding: crypto.pad.Pkcs7
    })

    //返回base64
    return crypto.enc.Base64.stringify(encrypted.ciphertext)

}

function Decrypt(word) {

    let key = '密钥要后后台一致'
    let iv = '偏移量要个后台一致'

    key = crypto.enc.Utf8.parse(key)
    iv = crypto.enc.Utf8.parse(iv)

    let base64 = crypto.enc.Base64.parse(word)

    let src = crypto.enc.Base64.stringify(base64)

    // 解密模式为CBC，补码方式为PKCS5Padding（也就是PKCS7）
    let decrypt = crypto.AES.decrypt(src, key, {
        iv: iv,
        mode: crypto.mode.CBC,
        padding: crypto.pad.Pkcs7
    })

    let decryptedStr = decrypt.toString(crypto.enc.Utf8)
    return decryptedStr.toString()

}


pwd = Encrypt('{ "phone": "15339956683", "password": "2e3cbc773e9f7a033c9effb76188d79a" }', key, iv)

console.log(pwd);

