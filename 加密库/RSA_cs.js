var NodeRSA = require('node-rsa')
var rsakey = '这是粘贴你的rsa密钥'
//RSA加密
function encryptrsa(encryptTxt,Key) {
    let nodersa = new NodeRSA('-----BEGIN PUBLIC KEY-----\n'+Key+'\n-----END PUBLIC KEY-----');
    nodersa.setOptions({encryptionScheme: 'pkcs1'});
    let decryptText = nodersa.encrypt(encryptTxt, 'base64','utf8');
    return decryptText;
}
    
//RSA解密
function decryptrsa(encryptTxt,Key) {
    let nodersa = new NodeRSA('-----BEGIN PUBLIC KEY-----\n'+Key+'\n-----END PUBLIC KEY-----');
    let decryptText = nodersa.decryptPublic(encryptTxt, 'utf8');
    return decryptText;
}

//使用办法
//加密
var a = '这里改成你要加密的文本'
console.log(encryptrsa(a,rsakey))
//解密
var a = '这里改成你要解密的文本'
console.log(decryptrsa(a,rsakey))