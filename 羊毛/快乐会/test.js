function getSign(url, obj) {

    let appSecret = '92e05790077d4bf1b3453296db38d308'
    let app_id = 'c100c389d381437d85ce1cc6b6634e5a'
    // 对 t 进行特定的位运算和转换
    function transformT(t) {
        t = parseInt(t)
        const tBytes = [
            t & 255,
            (t & 65280) >> 8,
            (t & 16711680) >> 16,
            (t & 4278190080) >> 24
        ]
        for (let i = 0; i < tBytes.length; i++) {
            tBytes[i] = ((tBytes[i] & 240) ^ 240) | (((tBytes[i] & 15) + 1) & 15)
        }
        return tBytes[3] | (tBytes[2] << 8) | (tBytes[1] << 16) | (tBytes[0] << 24)
    }

    url = (url.indexOf('?') === -1) ? (url + '?AppID=' + app_id) : (url + '&AppID=' + app_id)
    const check = url.substr(url.indexOf('//') + 2)
    const paths = check.split('/')
    const path = paths.slice(1).join('/') // 获取除主机名外的路径部分
    const keys = Object.keys(obj).sort() // 按键名排序
    const params = keys.map(key => key + obj[key]).join('')
    const t = Math.floor(Date.now() / 1000)
    // const t = 1698134792
    const tt = transformT(t)
    const strToHash = appSecret + '/' + path + params + t
    // console.log(strToHash)
    const sign = md5(strToHash)

    console.log({ TT: tt, Sign: sign })

    return { TT: tt, Sign: sign }
}