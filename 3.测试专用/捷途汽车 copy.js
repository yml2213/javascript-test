const CryptoJS = require('crypto-js')


// let key = "A736D84915CDD994"
let iv = "8B1D0AC15A9E2596"


let pw_data = `asd123456|A736D84915CDD994`

function Encrypt(t) {
    var key = CryptoJS.enc.Utf8.parse("A736D84915CDD994")
    var plaintText = t
    var encryptedData = CryptoJS.AES.encrypt(plaintText, key, {
        iv: "8B1D0AC15A9E2596",
        mode: CryptoJS.mode.CBC,
        padding: CryptoJS.pad.Pkcs7
    })
    encryptedData = encryptedData.ciphertext.toString()
    return encryptedData
}





pwd = Encrypt(pw_data)



// let pwd = CryptoJS.AES.encrypt(pw_data, key, {
//     iv: iv,
//     mode: CryptoJS.mode.CBC,
//     padding: CryptoJS.pad.Pkcs7
// })
console.log(pwd)
