function tt(t, e, i) {
    "use strict";
    (function (t) {
        var a = i("4ea4");
        Object.defineProperty(e, "__esModule", {
            value: !0
        }),
            e.default = void 0;
        var n = a(i("a34a")),
            s = a(i("9523")),
            r = a(i("c973")),
            o = i("420e"),
            c = i("ea92"),
            u = a(i("257c")),
            l = a(i("9c6b")),
            d = a(i("dec3")),
            f = a(i("7c8f")),
            p = a(i("12f9"));
        function h(t, e) {
            var i = Object.keys(t);
            if (Object.getOwnPropertySymbols) {
                var a = Object.getOwnPropertySymbols(t);
                e && (a = a.filter((function (e) {
                    return Object.getOwnPropertyDescriptor(t, e).enumerable;
                }))),
                    i.push.apply(i, a);
            }
            return i;
        }
        function _(t) {
            for (var e = 1; e < arguments.length; e++) {
                var i = null != arguments[e] ? arguments[e] : {};
                e % 2 ? h(Object(i), !0).forEach((function (e) {
                    (0, s.default)(t, e, i[e]);
                })) : Object.getOwnPropertyDescriptors ? Object.defineProperties(t, Object.getOwnPropertyDescriptors(i)) : h(Object(i)).forEach((function (e) {
                    Object.defineProperty(t, e, Object.getOwnPropertyDescriptor(i, e));
                }));
            }
            return t;
        }
        var g = null;
        function v() {
            return m.apply(this, arguments);
        }
        function m() {
            return m = (0, r.default)(n.default.mark((function t() {
                var e;
                return n.default.wrap((function (t) {
                    while (1)
                        switch (t.prev = t.next) {
                            case 0:
                                if (d.default.state.token) {
                                    t.next = 12;
                                    break;
                                }
                                if (!o.cache.get("userInfo")) {
                                    t.next = 10;
                                    break;
                                }
                                return t.next = 4,
                                    x(l.default.login, o.cache.get("userInfo"));
                            case 4:
                                if (e = t.sent, !e.token) {
                                    t.next = 10;
                                    break;
                                }
                                return o.cache.set("userData", e),
                                    o.cache.remove("pages_login"),
                                    d.default.commit("setToken", e.token),
                                    t.abrupt("return", !1);
                            case 10:
                                return (0, c.jumpLink)("link://goto/login"),
                                    t.abrupt("return", !0);
                            case 12:
                                return t.abrupt("return", !1);
                            case 13:
                            case "end":
                                return t.stop();
                        }
                }), t);
            }))),
                m.apply(this, arguments);
        }
        function y(t, e) {
            var i = f.default.enc.Utf8.parse(e),
                a = f.default.AES.decrypt(t, i, {
                    mode: f.default.mode.ECB,
                    padding: f.default.pad.Pkcs7
                }),
                n = a.toString(f.default.enc.Utf8);
            return JSON.parse(n);
        }
        function b(t, e) {
            t = p.default.encode(t);
            var i = f.default.enc.Utf8.parse(e),
                a = f.default.AES.encrypt(t, i, {
                    mode: f.default.mode.ECB,
                    padding: f.default.pad.Pkcs7
                });
            return a.toString();
        }
        function w(t) {
            if ("boolean" == typeof t)
                return t ? 1 : 0;
            if ("string" != typeof t)
                return t;
            t = (t + "").toString();
            var e = encodeURIComponent(t);
            return e = e.replace(/\+/g, "%20"),
                e = e.replace(/\!/g, "%21"),
                e = e.replace(/\'/g, "%27"),
                e = e.replace(/\(/g, "%28"),
                e = e.replace(/\)/g, "%29"),
                e = e.replace(/\*/g, "%2A"),
                e;
        }
        function x(e, i, a) {
            var s = function () {
                return o.cache.get("requestFile"),
                    o.cache.get("dominName"),
                    "".concat(o.cache.get("requestFile"), "://").concat(o.cache.get("dominName"));
            }
                (),
                l = (a || s) + "/" + e.url;
            !!e.canNotInputQuery && e.canNotInputQuery;
            e.queryKey instanceof Array && e.queryKey.length && (l += e.queryKey.map((function (t) {
                return "/".concat(i[t]);
            })).join(""));
            var p = d.default.state.appConfig,
                h = 0;
            p.timestamp && (h = p.timestamp);
            var m,
                x = u.default.version,
                C = "",
                $ = "";
            g && (C = g.deviceBrand || "", $ = g.deviceModel || "");
            var S = uni.getSystemInfoSync().platform;
            x = plus.runtime.version,
                m = plus.runtime.channel;
            var k = {
                url: l,
                header: {
                    "Api-UserAgent": "Platform/".concat(S, ", Channel/").concat(m, ", DeviceBrand/").concat(C, ", deviceModel/").concat($, ", Timestamp/").concat(h),
                    "Api-Ver": x
                },
                method: e.method.toUpperCase(),
                timeout: e.timeout || 3e3
            },
                L = o.cache.get("pushClientId") || "";
            L && (k.header["Api-PushId"] = L),
                o.cache.get("uuid") && (k.header["Api-SerialNumber"] = o.cache.get("uuid")),
                ("android" == S && o.cache.get("imei") || "ios" == S && o.cache.get("idfa")) && (k.header["Api-Udid"] = o.cache.get("imei"));
            var T = uni.getSystemInfoSync();
            k.header["Api-UserAgent"] += ", Brand/".concat(T.brand, ", Model/").concat(T.model),
                i && i.fileType ? (k.fileType = i.fileType, k.filePath = i.filePath, k.name = i.name, i = i.formData) : k.header["Content-Type"] = "application/x-www-form-urlencoded;charset=UTF-8";
            var P = e.method.toLowerCase();
            if ("post" == P) {
                if (h = parseInt(Date.now() / 1e3), k.header["Api-Sign"] = function (t, e) {
                    var i = "";
                    if (t)
                        for (var a = Object.keys(t).sort(), n = 0, s = a.length; n < s; n++) {
                            var r = a[n],
                                o = t[r];
                            "sign" != r && (o = w(o), i += 0 == n ? "".concat(r, "=").concat(o) : "&".concat(r, "=").concat(o));
                        }
                    var c = f.default.HmacSHA256(e + i, u.default.sign_key).toString();
                    return c;
                }
                    (i || [], h) + "," + h, i) {
                    var F = "";
                    Object.keys(i).forEach((function (t) {
                        F += "&".concat(t, "=").concat(w(i[t]));
                    })),
                        i = {
                            x: b(F.substr(1), u.default.aes_key)
                        },
                        k.fileType ? k.formData = e.canNotInputQuery ? "" : i : k.data = e.canNotInputQuery ? "" : i;
                }
            } else
                "get" == P && (k.data = i);
            return d.default.state.token && (k.header["Api-Token"] = d.default.state.token),
                u.default.debug && t("log", k, " at pages/api/index.js:227"),
                new Promise(function () {
                    var i = (0, r.default)(n.default.mark((function i(a, s) {
                        var r;
                        return n.default.wrap((function (i) {
                            while (1)
                                switch (i.prev = i.next) {
                                    case 0:
                                        if (i.t0 = void 0 === e.noAuth, !i.t0) {
                                            i.next = 5;
                                            break;
                                        }
                                        return i.next = 4,
                                            v();
                                    case 4:
                                        i.t0 = i.sent;
                                    case 5:
                                        if (!i.t0) {
                                            i.next = 7;
                                            break;
                                        }
                                        return i.abrupt("return", s({
                                            msg: "login"
                                        }));
                                    case 7:
                                        e.loading && (r = "\u52a0\u8f7d\u4e2d", e.loadTitle && (r = e.loadTitle), (0, o.Loading)(r)),
                                            k.success = function (e) {
                                                var i = e.header || {},
                                                    n = i["Api-ErrorCode"] || "",
                                                    r = i["Api-ErrorDesc"] || "";
                                                r && (r = decodeURIComponent(r));
                                                var l = i["Api-New-Token"] || "";
                                                l && (d.default.commit("setToken", l), o.cache.set("token", l));
                                                var f = {};
                                                if (k.fileType) {
                                                    var p = e.data.replace(/\"/g, "").replace(/\\\//g, "/");
                                                    if (f = y(p, u.default.aes_key), !f)
                                                        return;
                                                } else if (f = y(e.data, u.default.aes_key), !f)
                                                    return (0, o.Toast)("\u6570\u636e\u89e3\u6790\u5931\u8d25");
                                                switch (n || (n = f.code), r && "undefined" != r || (r = decodeURIComponent(f.msg)), u.default.debug && (t("log", i, " at pages/api/index.js:282"), t("log", f, " at pages/api/index.js:283")), n = parseInt(n), n) {
                                                    case 0:
                                                        a(f.data);
                                                        break;
                                                    case 1e4:
                                                    case 10003:
                                                    case 10004:
                                                    case 404:
                                                    case 400:
                                                        (0, o.Toast)(r),
                                                            s(f);
                                                        break;
                                                    case 401:
                                                    case 70:
                                                        (0, o.Modal)("\u6e29\u99a8\u63d0\u793a", r, {
                                                            showCancel: !0,
                                                            cancelText: "\u53d6\u6d88",
                                                            confirmText: "\u53bb\u5347\u7ea7"
                                                        }).then((function () {
                                                            (0, c.jumpLink)("link://goto/version");
                                                        })),
                                                            s(f);
                                                        break;
                                                    case 10001:
                                                    case 10002:
                                                        uni.hideLoading(),
                                                            (0, c.jumpLink)("link://goto/login");
                                                        break;
                                                    default:
                                                        break;
                                                }
                                            },
                                            k.fail = function (t) {
                                                s(t);
                                            },
                                            k.complete = function () {
                                                e.loading && (0, o.hideLoading)();
                                            },
                                            k.fileType ? uni.uploadFile(_({}, k)) : uni.request(_({}, k));
                                    case 12:
                                    case "end":
                                        return i.stop();
                                }
                        }), i);
                    })));
                    return function (t, e) {
                        return i.apply(this, arguments);
                    };
                }
                    ());
        }
        uni.getSystemInfo({
            success: function (t) {
                g = t;
            }
        });
        var C = x;
        e.default = C;
    }).call(this, i("0de9")["default"]);
}