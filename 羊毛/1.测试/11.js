// http://n.pailifan.com/2426_6qFC309h

let a = `http://n.pailifan.com/2426_`

let arr = []

for (let i = 0; i < 100; i++) {

    let b = `${a}${randomString(8)}`
    // console.log(b)
    arr.push(b)


}
console.log(arr)




function randomString(length, options = { xx: true, dx: true, sz: true }) {
    let charset = ""
    if (options.xx) {
        charset += "abcdefghijklmnopqrstuvwxyz"
    }
    if (options.dx) {
        charset += "ABCDEFGHIJKLMNOPQRSTUVWXYZ"
    }
    if (options.sz) {
        charset += "0123456789"
    }
    let res = ""
    for (let i = 0; i < length; i++) {
        let randomIndex = Math.floor(Math.random() * charset.length)
        res += charset.charAt(randomIndex)
    }
    return res
}

