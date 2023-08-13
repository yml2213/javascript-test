


/**
 * DES/CBC/PKCS5Padding
 */
function encryptByDES(string, key, ivstr) {
	const CryptoJS = require("crypto-js");
	let KeyHex = CryptoJS.enc.Utf8.parse(key);
	let encrypted = CryptoJS.DES.encrypt(string,
		KeyHex, {
		mode: CryptoJS.mode.CBC,  // ecb模式不需要偏移量
		padding: CryptoJS.pad.Pkcs7,
		iv: CryptoJS.enc.Utf8.parse(ivstr)
	});

	let hexstr = encrypted.toString(); // 此方式返回base64
	// let hexstr = encrypted.ciphertext.toString() // 返回hex格式的密文
	return hexstr;
}
let data = 'fhkadjhfjkadhfkladjshfklashklj2';
aa = encryptByDES(data);
console.log(aa);