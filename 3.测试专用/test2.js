function padStr(num, length, opt = {}) {
    let padding = opt.padding || '0'
    let mode = opt.mode || 'l'
    let numStr = String(num)
    let numPad = (length > numStr.length) ? (length - numStr.length) : 0
    let pads = ''
    for (let i = 0; i < numPad; i++) {
        pads += padding
    }
    if (mode == 'r') {
        numStr = numStr + pads
    } else {
        numStr = pads + numStr
    }
    return numStr
}

console.log(padStr(5678, 23, mode = 'r'))