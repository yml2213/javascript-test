
const CryptoJS = require('crypto-js')



let r = '1690541224390:1234:undefined'


async function digestMessage(r) {
    let hash = CryptoJS.SHA256(r)
    const byteArray = CryptoJS.enc.Hex.parse(hash.toString())
    let byte32Array = CryptoJS.lib.WordArray.create(byteArray.words, 32).toString()
    console.log(byte32Array)
    let aa = Array.from(new Uint8Array(byte32Array)).map(a => a.toString(16).padStart(2, "0")).join("")
    return aa
}




async function tt() {
    let a = await digestMessage(r)
    console.log(a)
}
tt()