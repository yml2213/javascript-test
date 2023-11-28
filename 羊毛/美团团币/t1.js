function randomString(length, options = { xx: true, dx: true, sz: true }) {
    let charset = ''
    console.log(options)
    if (options.xx)         charset += 'abcdefghijklmnopqrstuvwxyz'
    if (options.dx) charset += 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'
    if (options.sz)  charset += '0123456789'

    let res = ''
    console.log(charset)
    for (let i = 0; i < length; i++) {
        let randomIndex = Math.floor(Math.random() * charset.length)
        res += charset.charAt(randomIndex)
    }
    return res
}


let a=randomString(20,{dx:true,sz:true})
console.log(a)
