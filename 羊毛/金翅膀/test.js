
const CryptoJS = require("crypto-js")



d = function (r) {
    return CryptoJS.MD5(r).toString().toLocaleLowerCase()
}

f = function (r) {
    console.log(r)
    var W = At({
        // "t": Math.floor(new Date / 1e3),
        "t": '1694079077',
        "n": 'A8357D80'
    }, it)

    _ = (W.app_secret, function (r, W) {
        var _ = {}
        for (var $ in r)
            W.indexOf($) >= 0 || Object.prototype.hasOwnProperty.call(r, $) && (_[$] = r[$])
        return _
    }
        (W, ["app_secret"]))

    return At({}, _, {
        "sign": d(d(Object.values(W).join(""))).split("").reverse().join("")
    })
}

At = Object.assign || function (r) {
    for (var W = 1; W < arguments.length; W++) {
        var _ = arguments[W]
        for (var $ in _)
            Object.prototype.hasOwnProperty.call(_, $) && (r[$] = _[$])
    }
    return r
}
it = {
    "app_key": "KlZ4LqOF",
    "app_secret": "HoBJTYXdwn"
}



l = function (r) {
    var W = nt.a.entries(r).sort((function (r, W) {
        return r[0].charCodeAt(0) - W[0].charCodeAt(0)
    })),
        _ = {},
        $ = !0,
        tt = !1,
        et = void 0
    try {
        for (var rt, ot = W[Symbol.iterator](); !($ = (rt = ot.next()).done); $ = !0) {
            var ut = rt.value,
                ct = c(ut, 2),
                st = ct[0],
                dt = ct[1]
            _[st] = dt
        }
    } catch (r) {
        tt = !0,
            et = r
    }
    finally {
        try {
            !$ && ot.return && ot.return()
        }
        finally {
            if (tt)
                throw et
        }
    }
    return {
        "code": d(d(at.a.stringify(At({}, it, _)))).split("").reverse().join("")
    }
}

let a = f('/api/sign-in')
console.log(a)

let b = l('/api/sign-in')
console.log(`====code====`)
console.log(b)

