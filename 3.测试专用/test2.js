! function (r, a, e) {
    var i, t, n, o
    try {
        "object" != typeof JSON && (JSON = {}), a.write(
            '<script type="text/javascript" src="https://dcdn.thecover.cn/md5.js"><\/script>'), (o = {
                applicationId: "coverwap",
                prefix: "_web_"
            }).validateHost = (n = r.location.hostname,
                /^(?=^.{3,255}$)[a-zA-Z0-9][-a-zA-Z0-9]{0,62}(\.[a-zA-Z0-9][-a-zA-Z0-9]{0,62})+$/.test(n) &&
                "m.thecover.cn" === n), o.loadScript = function (e, t) {
                    var n = a.createElement("script")
                    n.type = "text/javascript", n.readyState ? n.onreadystatechange = function () {
                        "loaded" != n.readyState && "complete" != n.readyState || (n.onreadystatechange = null, t && t())
                    } : n.onload = function () {
                        t && t()
                    }, n.src = e, a.body.appendChild(n)
                }, o.listen = function (e, t, n) {
                    e.addEventListener ? e.addEventListener(t, n, !1) : e.attachEvent && e.attachEvent("on" + t, n)
                }, o.isJson = function (e) {
                    if ("string" != typeof e) return !("object" != typeof e || !e)
                    try {
                        var t = JSON.parse(e)
                        return !("object" != typeof t || !t)
                    } catch (e) {
                        return !1
                    }
                }, o.xhr = function () {
                    if ("undefined" != typeof XMLHttpRequest) return new XMLHttpRequest
                    if ("undefined" == typeof ActiveXObject) throw new Error("No XHR object available.")
                    if ("string" != typeof arguments.callee.activeXString) {
                        var e, t, n = ["MSXML2.XMLHttp.6.0", "MSXML2.XMLHttp.3.0", "MSXML2.XMLHttp"]
                        for (e = 0, t = n.length; e < t; e++) try {
                            new ActiveXObject(n[e]), arguments.callee.activeXString = n[e]
                            break
                        } catch (e) {
                            console.log(e)
                        }
                    }
                    return new ActiveXObject(arguments.callee.activeXString)
                }, o._addURLParam = function (e, t, n) {
                    return e += -1 == e.indexOf("?") ? "?" : "&", e += encodeURIComponent(name) + "=" + encodeURIComponent(
                        n)
                }, o.getRandom = function (e) {
                    for (var t = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9], n = 10; 1 < n; n--) {
                        var a = Math.floor(10 * Math.random()),
                            r = t[a]
                        t[a] = t[n - 1], t[n - 1] = r
                    }
                    for (n = a = 0; n < 5; n++) a = 10 * a + t[n]
                    return (e || "") + (a + "") + +new Date
                }, o._parseParamsStr = function (e) {
                    var t = ""
                    for (var n in e) e.hasOwnProperty(n) && (t += "&" + encodeURIComponent(n) + "=" + encodeURIComponent(e[
                        n]))
                    return t.slice(1)
                }, o.ajax = function (e, t, n, a, r, o) {
                    var i = this._parseParamsStr(n),
                        s = null
                    "get" === e && n && (t = this._addURLParam(t, i)), (s = this.xhr()).onreadystatechange = function () {
                        var e = s.status,
                            t = s.responseText
                        try {
                            4 == s.readyState && (200 <= s.status && s.status < 300 || 304 == s.status ? r && r(t) : o &&
                                o(e))
                        } catch (e) {
                            s.onreadystatechange = null, s.onload = null
                        }
                    }, s.open(e, "https://yun.thecover.cn/fmio" + t, a || !0), "get" == e ? s.send(null) : (s.setRequestHeader(
                        "Content-type", "application/json; charset=UTF-8"), s.send(JSON.stringify(n)))
                }, o.getSID = function () {
                    try {
                        return sessionStorage.getItem(this.prefix + "did")
                    } catch (e) { }
                }, o.setSID = function (e) {
                    try {
                        var t = "dis" + hex_md5(e)
                        return sessionStorage.setItem(this.prefix + "did", t), t
                    } catch (e) { }
                }, o.getPerformanceTiming = function () {
                    var e = r.performance
                    if (e) {
                        var t = e.timing,
                            n = {}
                        return n.loadPage = (t.loadEventEnd - t.navigationStart) / 1e3, n.domReady = t.domComplete - t.responseEnd,
                            n.redirect = t.redirectEnd - t.redirectStart, n.lookupDomain = t.domainLookupEnd - t.domainLookupStart,
                            n.ttfb = t.responseStart - t.navigationStart, n.request = t.responseEnd - t.requestStart, n.loadEvent =
                            t.loadEventEnd - t.loadEventStart, n.appcache = t.domainLookupStart - t.fetchStart, n.unloadEvent =
                            t.unloadEventEnd - t.unloadEventStart, n.connect = t.connectEnd - t.connectStart, n.loadTime =
                            (t.domContentLoadedEventEnd - t.navigationStart) / 1e3, n
                    }
                    console.log("Your browser does not support the performance interface")
                }, o.getBrowserInfo = function () {
                    var e = r.navigator.userAgent.toLowerCase(),
                        t = "default",
                        n = "1.0.0"
                    return null != e.match(/msie/) || e.match(/trident/), null != e.match(/msie/) || null != e.match(
                        /trident/) ? (t = "IE", n = this._getIEVersion()) : r.opera || 0 < e.indexOf("opr") ? (t =
                            "Opera", n = this._getOperaVersion(e)) : 0 < e.indexOf("ubrowser") ? (t = "UC", n = e.match(
                                /ubrowser\/([\d.]+)/)[1]) : 0 < e.indexOf("bidubrowser") ? (t = "Baidu", n = e.match(
                                    /bidubrowser\/([\d.]+)/)[1]) : 0 < e.indexOf("metasr") || 0 < e.indexOf("se 2.x") ? (t =
                                        "Sougou", n = e.match(/metasr\/([\d.]+)/)[1]) : 0 < e.indexOf("tencenttraveler") ? (t = "QQ", n =
                                            e.match(/tencenttraveler\/([\d.]+)/)[1]) : 0 < e.indexOf("qqbrowser") ? (t = "QQ", n = e.match(
                                                /qqbrowser\/([\d.]+)/)[1]) : 0 < e.indexOf("maxthon") ? (t = "Maxthon", n = e.match(
                                                    /maxthon\/([\d.]+)/)[1]) : 0 < e.indexOf("firefox") ? (t = "Firefox", n = e.match(
                                                        /firefox\/([\d.]+)/)[1]) : 0 < e.indexOf("edge") ? (t = "Edge", n = e.match(/edge\/([\d.]+)/)[1]) :
                        0 < e.indexOf("chrome") ? this._validate360("type", "application/x360mmplugin") ? t = "360" : (t =
                            "Chrome", n = e.match(/chrome\/([\d.]+)/)[1]) : -1 < e.indexOf("Safari") && (t = "Safari", n =
                                e.match(/version\/([\d.]+)/)[1]), t + " " + n
                }, o._getIEVersion = function () {
                    var t = a.documentMode,
                        e = r.navigator.userAgent.toLowerCase(),
                        n = /(msie\s|trident.*rv:)([\w.]+)/.exec(e)
                    try {
                        return n[2]
                    } catch (e) {
                        return t
                    }
                }, o._getOperaVersion = function (e) {
                    try {
                        if (r.opera) return e.match(/opera.([\d.]+)/)[1]
                        if (0 < e.indexOf("opr")) return e.match(/opr\/([\d.]+)/)[1]
                    } catch (e) {
                        return 0
                    }
                }, o._validate360 = function (e, t) {
                    var n = r.navigator.mimeTypes
                    for (var a in n)
                        if (n[a][e] == t) return !0
                    return !1
                }, i = o
        var s = {
            appName: e.appName,
            appVersion: e.appVersion,
            ip: "",
            address: "",
            browserVersion: i.getBrowserInfo(),
            cpuClass: e.cpuClass,
            pagePath: r.location.href,
            pageRouter: r.location.pathname,
            pageTitle: a.title,
            domain: a.domain,
            host: r.location.hostname,
            referrer: a.referrer,
            screenWidth: r.screen.width,
            screenHeight: r.screen.height,
            loadTime: i.getPerformanceTiming(),
            language: (e.userLanguage || e.language).toLowerCase(),
            agent: (t = e.userAgent, {
                trident: -1 < t.indexOf("Trident"),
                presto: -1 < t.indexOf("Presto"),
                webKit: -1 < t.indexOf("AppleWebKit"),
                gecko: -1 < t.indexOf("Gecko") && -1 == t.indexOf("KHTML"),
                mobile: !!t.match(/AppleWebKit.*Mobile.*/),
                ios: !!t.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/),
                android: -1 < t.indexOf("Android") || -1 < t.indexOf("Linux"),
                iPhone: -1 < t.indexOf("iPhone"),
                iPad: -1 < t.indexOf("iPad"),
                webApp: -1 == t.indexOf("Safari"),
                weixin: -1 < t.indexOf("MicroMessenger"),
                qq: " qq" == t.match(/\sQQ/i)
            })
        },
            d = function () {
                this.baseInfo = s, this.userId = "", this.init = function (e) {
                    e.baseInfo.loadTime = i.getPerformanceTiming(), e.cookie = i.getSID() || i.setSID(e.baseInfo.browserVersion)
                }
            }
        d.prototype = {
            initLoad: function () {
                i.setSID(this.baseInfo.browserVersion), this.getIp()
            },
            getIp: function () {
                var n = this
                i.ajax("get", "/ip", "", !0, function (e) {
                    var t = JSON.parse(e)
                    n.baseInfo.ip = t.data.ip, n.baseInfo.address = t.data.address
                })
            },
            setUser: function (e, t, n, a) {
                if (i.validateHost) {
                    var r = n && i.isJson(n) ? n : new Object({
                        other: n
                    })
                    this.init(this), this.userId = e, i.ajax("post", "/web/login", {
                        applicationId: i.applicationId,
                        userId: e,
                        userName: t || "",
                        properties: JSON.stringify(r || {})
                    }, !0, function (e) {
                        a && a(e)
                    })
                }
            },
            track: function (e, t, n, a) {
                if (i.validateHost) {
                    var r = this,
                        o = n && i.isJson(n) ? n : new Object({
                            other: n
                        })
                    r.init(r), i.ajax("post", "/web/receive", {
                        userId: r.userId || "",
                        eventId: e,
                        eventKey: t,
                        eventTime: (new Date).valueOf(),
                        eventParam: o || {},
                        applicationId: i.applicationId,
                        distinctId: r.cookie,
                        ip: r.baseInfo.ip,
                        language: r.baseInfo.language,
                        pageUrl: r.baseInfo.pageRouter,
                        pageTitle: r.baseInfo.pageTitle,
                        userAgent: r.baseInfo.browserVersion,
                        address: r.baseInfo.address,
                        loadTime: r.baseInfo.loadTime.loadTime,
                        screenHigh: r.baseInfo.screenHeight,
                        screenWide: r.baseInfo.screenWidth
                    }, !0, function (e) {
                        a && a(e)
                    })
                }
            }
        }
    } catch (e) {
        if ("object" == typeof console && console.log) try {
            console.log(e)
        } catch (e) { }
    }
    r.cio = new d, r.cio.initLoad(), i.listen(r, "load", function () {
        r.cio.track(0, "pageload", {
            refererUrl: a.referrer
        })
    })
}(window, document, navigator)