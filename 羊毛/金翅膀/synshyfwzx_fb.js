const CryptoJS = require("crypto-js")

function encryptAES(data) {

    const key = "536e48ab5fb4521d"
    const iv = "cfab93be63f03c83"

    const keyBytes = CryptoJS.enc.Utf8.parse(key)
    const ivBytes = CryptoJS.enc.Utf8.parse(iv)

    const encrypted = CryptoJS.AES.encrypt(data, keyBytes, {
        iv: ivBytes,
        mode: CryptoJS.mode.CBC,
        padding: CryptoJS.pad.ZeroPadding,
    })

    const encryptedBase64 = encrypted.toString()

    return encryptedBase64
}

// 测试
const plaintext = `{"username":"372330199706166653","password":"6653"}`


const ciphertext = encryptAES(plaintext)
console.log("加密后的结果:", ciphertext)
