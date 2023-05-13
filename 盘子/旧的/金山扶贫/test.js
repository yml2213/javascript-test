const crypto = require('crypto-js')


function t(e) {
    for (var t = 1; t < arguments.length; t++) {
        var n = null != arguments[t] ? arguments[t] : {};
        t % 2 ? o(Object(n), !0).forEach((function (t) {
                r(e, t, n[t])
            }
        )) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(n)) : o(Object(n)).forEach((function (t) {
                Object.defineProperty(e, t, Object.getOwnPropertyDescriptor(n, t))
            }
        ))
    }
    return e
}


function md5(a) {
    return crypto.MD5(a).toString()
}


X = function (n) {
    function v(n) {
        var e, i = !(arguments.length > 1 && void 0 !== arguments[1]) || arguments[1], a = "", o = n.url;
        return i && (o = n.url.toLocaleLowerCase()),
            a = "/" === (null === (e = n.url.toLocaleLowerCase()) || void 0 === e ? void 0 : e[0]) ? "/api" + o : "/api/" + o,
            a
    }

    var e = v(n, !1)
        , i = z()
        , a = e + i + n.headers.token + p
        , o = s()(a);
    return "".concat(i, "-").concat(o)
}

console.log(X())