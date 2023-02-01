//base64加密
function base64_encode(code) {
    var str = CryptoJS.enc.Utf8.parse(code)
    return CryptoJS.enc.Base64.stringify(str)
}
//base64解密
function base64_decode(code) {
    var words = CryptoJS.enc.Base64.parse(code)
    return words.toString(CryptoJS.enc.Utf8)
}
