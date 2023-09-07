const crypto = require('crypto-js')
this.sign_key = "x3yh7kyz12zu3b62t7tpspmwqhhukydb"


function decrypt_body(t) { // 解密body
    var t = t.replace(/\"/g, "").replace(/\\\//g, "/")
    let e = 'R4U3aAlPsUQdueEA'
    var i = crypto.enc.Utf8.parse(e),
        a = crypto.AES.decrypt(t, i, {
            mode: crypto.mode.ECB,
            padding: crypto.pad.Pkcs7
        }),
        n = a.toString(crypto.enc.Utf8)
    return JSON.parse(n)
}
function decrypt(t) { // 解密
    // var t = this.decodeBase64(t);
    let e = 'R4U3aAlPsUQdueEA'
    var i = crypto.enc.Utf8.parse(e),
        a = crypto.AES.decrypt(t, i, {
            mode: crypto.mode.ECB,
            padding: crypto.pad.Pkcs7
        }),
        n = a.toString(crypto.enc.Utf8)
    n = decodeBase64(n)
    return n
}

function encrypt(t) {  // 加密
    let e = 'R4U3aAlPsUQdueEA'
    t = p.default.encode(t)
    var i = crypto.enc.Utf8.parse(e),
        a = crypto.AES.encrypt(t, i, {
            mode: crypto.mode.ECB,
            padding: crypto.pad.Pkcs7
        })
    return a.toString()
}


function decodeBase64(base64String) {
    const Buffer = require('buffer').Buffer
    const decodedBuffer = Buffer.from(base64String, 'base64')
    const decodedString = decodedBuffer.toString('utf8')
    return decodedString
}

function encodeBase64(string) {
    const Buffer = require('buffer').Buffer
    const encodedBuffer = Buffer.from(string, 'utf8')
    const encodedString = encodedBuffer.toString('base64')
    return encodedString
}

let a = 'lugaagkrRPer4uIxZ/JAV8g/4mxy9pOSznl3sBwl4h7XVp/5ROUK/YhBZxMtXI3L7KGwdYGzy0vVe1Vz/ssM/dcS5lRzKzh9oy7t7ipVx1hAZ0YjZS16OWGdQu7W0NRRU5I5ivpeRD1xQ/qE4nkHQDnruuvG8GlDKUMY8B4jeJBn6jVsttjAYEv/VgZW3KxB3QSS77xLmMny//GZGAwaiOTVe1DmrN7Ke+ENmIMtsYU='

let c = 'lugaagkrRPer4uIxZ/JAVyAFjhCJOdgMC0qGpkRoMD4JADv7aZ6rWjFAusdPBge6'

let b = decrypt_body(a)
console.log(b)

console.log(JSON.stringify(b))



d = decrypt_body(c)
console.log(d)
