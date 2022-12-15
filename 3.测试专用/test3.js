function l() {
    var e = (new Date).getTime()
        , t = "xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx".replace(/[x]/g, (function (t) {
            var i = (e + 16 * Math.random()) % 16 | 0
            return e = Math.floor(e / 16),
                ("x" === t ? i : 3 & i | 8).toString(16)
        }
        ))
    return t
}


console.log(l())

ts13 = 'xxx'
phone ='手机号'

let data = `undefinedly.dfn.h5.verifycode.get.v2${l()}${ts13}undefined{"appCode":"nissan","phone":"${phone}","projectType":"nissan","type":"regist"}`



