

/**
 * RSA公钥加密
 */
function RSA(msg, key) {
	global.navigator = { appName: 'nodejs' }; // fake the navigator object
	global.window = {}; // fake the window object
	const JSEncrypt = require('jsencrypt')
	let enc = new JSEncrypt();
	enc.setPublicKey(key)
	return enc.encrypt(msg).toString();
}

let data = 'test';
let rsa_key = `MIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEAvEvISr3NNYWXI/6kkmoXqdtmRe7nN5qA
s7Fs3ZmujiIH+Z4GaIO7xQOrVxM5FsH5Kdlx4E/AN7MTZexjOlSt8jPBmuRSirUhHhbG6GdUmG5c
OTRZIbP/FpJSFbSayf5XHsrKqKQWALy7akl/kYb58v39Q6vSEw6PRofYJT2rZMQR7FCDFwWkR4Qz
BLm1kgre9kxdrPWtrOy6IoyNfff78wnChQ8wRNk9WmIyEr1AqsOxyIPJO63t/3saRBX+CHIxcLWO
e22dAbXAeeaSTOuNEnUPzWx3W7EFKJMliorkeZMfMMzKSaK06HgR74dyXA4NhUZJMwsgEDku2xcv
gXvWnQIDAQAB`;
RSA_data = RSA(data, rsa_key);

console.log(RSA_data);