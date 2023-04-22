function getPunchBase64(num, num2) {
    const valueOf = BigInt(num)
    const valueOf2 = BigInt(num2)
    const str = (valueOf * valueOf2).toString()
    const encodeToString = Buffer.from(str.trim()).toString('base64')
    const encodeToString2 = Buffer.from(encodeToString.trim()).toString('base64')
    return encodeToString2.trim()
}


console.log(getPunchBase64(1, 45))