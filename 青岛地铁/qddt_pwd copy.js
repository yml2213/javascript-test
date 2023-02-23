
const crypto = require('crypto-js')


function get_param(data) {
    let key = crypto.enc.Utf8.parse('1wTD3U39b53qv8ck')
    let iv = crypto.enc.Utf8.parse('XPX1fq1f65XBHl8i')
    let password = crypto.enc.Utf8.parse(data)
    let encrypted = crypto.AES.encrypt(password, key, { iv: iv, mode: crypto.mode.CBC, padding: crypto.pad.Pkcs7 }).toString() //crypto.pad.ZeroPadding
    return encrypted
}

let a = Encrypt('{ "phone": "15339956683", "password": "2e3cbc773e9f7a033c9effb76188d79a" }')

console.log(a)


function Encrypt(word) {
    let key = '1wTD3U39b53qv8ck'
    let iv = 'XPX1fq1f65XBHl8i'

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