

/**
 * RSA公钥加密
 */
function RSA(msg, key) {
	global.window = {}
	const JSEncrypt = require('jsencrypt')
	let enc = new JSEncrypt();
	enc.setPublicKey(key)
	return enc.encrypt(msg).toString();
}

let data = 'bjqc123456';
let rsa_key = `MIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEAlm7VVIe3fiKOvNr9JK9R5hq8bQ1oifNg7tsBwaqO6RIhXgLlJSP7bQKdV6Q6JCWk5oUxSgFUoRZoHqYX8D9cbOgYCJXLbRcEiDl6WfLXEL3OPTibgZ55m+jy3nC/mVOi6zBIqIRgxOgXpnbyr/hQGY9jcXS+emWpGR2iTK4mzBVWf5zRHrmTnt4kbVy9AN4qFiow+jMmQ4UZFDSLcnG1RLfeuNnb+Oetxvr2mZ+A9dz7pdL7SXPaux85otHZ++QQf7PXMALfRxZon3NSxM19MrPc/tFo8HWviV04QKDYj/KNPpAMWLdSMJj5pwdz7oRyCZ77I34tONjeCJd9zJn2TwIDAQAB`;
RSA_data = RSA(data, rsa_key);

console.log(RSA_data);