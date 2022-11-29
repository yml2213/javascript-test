
const CryptoJS = require('crypto-js')

/**
 * 加密方法
 */
function encrypt(data) {
    if (typeof data === "object") {
        try {
            // eslint-disable-next-line no-param-reassign
            data = JSON.stringify(data)
        } catch (error) {
            console.log("encrypt error:", error)
        }
    }
    const dataHex = CryptoJS.enc.Utf8.parse(data)
    SECRET_KEY = "A736D84915CDD994"
    SECRET_IV = "8B1D0AC15A9E2596"
    const encrypted = CryptoJS.AES.encrypt(dataHex, SECRET_KEY, {
        iv: SECRET_IV,
        mode: CryptoJS.mode.CBC,
        padding: CryptoJS.pad.Pkcs7
    })
    return encrypted.ciphertext.toString()
}



// import { decrypt, encrypt } from "@/utils/encrypt"

const data = "asd123456|A736D84915CDD994"

const encryptText = encrypt(data)
console.log("加密", encryptText)

// const decryptText = decrypt(encryptText)
// console.log("解密", decryptText)