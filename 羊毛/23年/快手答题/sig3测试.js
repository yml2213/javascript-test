

let cookie = 'kpn=NEBULA; kpf=ANDROID_PHONE; userId=55077737; did=ANDROID_895dc8228456d484; c=XIAOMI; ver=11.4; appver=11.4.40.5686; language=zh-cn; countryCode=CN; sys=ANDROID_12; mod=Xiaomi%28M2102J2SC%29; deviceName=Xiaomi%28M2102J2SC%29; earphoneMode=1; isp=CUCC; ud=55077737; did_tag=0; egid=DFP6CDFB68C444FCC5267800EDB82A7E9EBC70DE183508C5779A45284786FCD0; thermal=10000; kcv=1507; app=0; bottom_navigation=true; oDid=ANDROID_8845bd91dbb06981; android_os=0; boardPlatform=kona; newOc=XIAOMI; androidApiLevel=31; slh=0; country_code=cn; nbh=44; hotfix_ver=; did_gt=1689077658660; keyconfig_state=2; cdid_tag=5; max_memory=256; oc=XIAOMI; sh=2340; deviceBit=0; browseType=3; ddpi=440; socName=Qualcomm+Snapdragon+8250; is_background=0; sw=1080; ftt=; apptype=22; abi=arm64; cl=0; userRecoBit=0; device_abi=arm64; totalMemory=11598; grant_browse_type=AUTHORIZED; iuid=; rdid=ANDROID_429e96b22fcf2bf5; sbh=90; darkMode=false; kuaishou.api_st=Cg9rdWFpc2hvdS5hcGkuc3QSoAESOtiZGX5nEzc9ETEYT45qO0H3LO7Gm9QDsivEzEkvryXu0ulEO4DhcNN_k80F7R7BzWDzCDcbpoFf1Nupk5zK3F_PIhBG9SW1Ct0yEeOWn3lT-PDtmaenEnJN1HMEzsFOHOmYdnRyRZhjcsR-kkROry0n3H3-BHBrhh10JfGY8_jJB2f2Nejw8JL4rWrdOB9MTW3RPOUJEW0n3vVyTNRpGhLbpnOX2M1IRKpGGeQvLfAmAo8iIFFxNLCy5f4p46deW1xxn63u5ANpyFRDBvh1iZWLmS1RKAUwAQ; token=Cg9rdWFpc2hvdS5hcGkuc3QSoAESOtiZGX5nEzc9ETEYT45qO0H3LO7Gm9QDsivEzEkvryXu0ulEO4DhcNN_k80F7R7BzWDzCDcbpoFf1Nupk5zK3F_PIhBG9SW1Ct0yEeOWn3lT-PDtmaenEnJN1HMEzsFOHOmYdnRyRZhjcsR-kkROry0n3H3-BHBrhh10JfGY8_jJB2f2Nejw8JL4rWrdOB9MTW3RPOUJEW0n3vVyTNRpGhLbpnOX2M1IRKpGGeQvLfAmAo8iIFFxNLCy5f4p46deW1xxn63u5ANpyFRDBvh1iZWLmS1RKAUwAQ; __NSWJ=; client_key=2ac2a76d; kuaishou.h5_st=Cg5rdWFpc2hvdS5oNS5zdBKgAV8FuIA9Fl9LmnPXAMq-FDHP5uNLkZrF-lTpa2TlXZ85iLzYzFMjPnM0tg0e_uz7095pNKmAIigtQYYktyELUr2vRSq1GZhO_cPTZJXOLFeMjQwKjN-08V8AIFsrp5oIG882Yvwsbfrg-3_Q5xCtvxfWJK9eAwAVnw_5JcMIiLLNkQSD27AvP4Bw1PXiZRdi7rXZOtSFJ5IShkKKveFBXk8aEvawlwd7NjDrfWCq1CR0LOvKaSIg2AP45TnmfYOsporlDS5R-UF4Sq56CwsFvh5-rOVSJGgoBTAB; net=WIFI; sid=856d643e-5185-4317-9c11-aa51b5cd4e01; cold_launch_time_ms=1690559232918'


const options = {
    method: 'post',
    body: { "roundId": "2DMtUKJl4WhSPQtPk7wllzqv7UZBPuoO", "index": 1, "scene": 2 },
    cookie: cookie

}
let url = "https://encourage.kuaishou.com/rest/n/encourage/game/quiz/round/prop/search?__NS_sig3=4f5f182866bddd787f121110d57f9039c2a9c96c0e0e0c0c0302011b&sigCatVer=1"


let result = getSig3Str(url, options)
console.log('sig3参数: ', result)



// let data11 = "abi=arm64androidApiLevel=31appver=11.4.40.5686browseType=3c=XIAOMIdevice_abi=arm64did=ANDROID_429e96b22fcf2bf5cfdid_tag=0egid=DFP1C792CE128CAFD8C92F000406EC317C7010E7DFC0BBC2597622F8B42CF40Fgrant_browse_type=AUTHORIZEDhello=123kpf=ANDROID_PHONEkpn=NEBULAlanguage=zh-cnmod=Xiaomi%28M2102J2SC%29newOc=XIAOMIoDid=ANDROID_8845bd91dbb06981ardid=ANDROID_a1f44b4f7f966a84sigCatVer=1socName=Qualcomm+Snapdragon+8250userId=55077737userRecoBit=0{}"

// // let data = "sigCatVer=1taskIds=[17590]subBizId=3377"
// let data = 'abi=arm64androidApiLevel=31appver=11.4.40.5686browseType=3c=XIAOMIdevice_abi=arm64did=ANDROID_895dc8228456d484did_tag=0egid=DFP6CDFB68C444FCC5267800EDB82A7E9EBC70DE183508C5779A45284786FCD0grant_browse_type=AUTHORIZEDkpf=ANDROID_PHONEkpn=NEBULAlanguage=zh-cnmod=Xiaomi%28M2102J2SC%29newOc=XIAOMIoDid=ANDROID_8845bd91dbb06981rdid=ANDROID_429e96b22fcf2bf5sigCatVer=1socName=Qualcomm+Snapdragon+8250userId=55077737userRecoBit=0{"taskIds":"[17590]","subBizId":3377}'


get_Sig3(result)
async function get_Sig3(data) {
    let sig3 = await getWebSig3(data)
    console.log(`==========================================================`)
    console.log(sig3)
    return sig3
}

async function getWebSig3(data) {
    const ksjsbWebSig3 = ''
    let window = {}
    let Jose = n2()
    function n2() {
        return (function (t) {
            var e = {}
            function r(n) {
                if (e[n]) return e[n].exports
                var o = (e[n] = { i: n, l: !1, exports: {} })
                return t[n].call(o.exports, o, o.exports, r), (o.l = !0), o.exports
            }
            return (
                (r.m = t),
                (r.c = e),
                (r.d = function (t, e, n) {
                    r.o(t, e) || Object.defineProperty(t, e, { enumerable: !0, get: n })
                }),
                (r.r = function (t) {
                    'undefined' != typeof Symbol &&
                        Symbol.toStringTag &&
                        Object.defineProperty(t, Symbol.toStringTag, { value: 'Module' }),
                        Object.defineProperty(t, '__esModule', { value: !0 })
                }),
                (r.t = function (t, e) {
                    if ((1 & e && (t = r(t)), 8 & e)) return t
                    if (4 & e && 'object' == typeof t && t && t.__esModule) return t
                    var n = Object.create(null)
                    if (
                        (r.r(n),
                            Object.defineProperty(n, 'default', { enumerable: !0, value: t }),
                            2 & e && 'string' != typeof t)
                    )
                        for (var o in t)
                            r.d(
                                n,
                                o,
                                function (e) {
                                    return t[e]
                                }.bind(null, o)
                            )
                    return n
                }),
                (r.n = function (t) {
                    var e =
                        t && t.__esModule
                            ? function () {
                                return t.default
                            }
                            : function () {
                                return t
                            }
                    return r.d(e, 'a', e), e
                }),
                (r.o = function (t, e) {
                    return Object.prototype.hasOwnProperty.call(t, e)
                }),
                (r.p = ''),
                r((r.s = 3))
            )
        })([
            function (t, e) {
                function r(t) {
                    return (r =
                        'function' == typeof Symbol && 'symbol' == typeof Symbol.iterator
                            ? function (t) {
                                return typeof t
                            }
                            : function (t) {
                                return t &&
                                    'function' == typeof Symbol &&
                                    t.constructor === Symbol &&
                                    t !== Symbol.prototype
                                    ? 'symbol'
                                    : typeof t
                            })(t)
                }
                ; (function () {
                    var t = Object.create,
                        n = [
                            'break',
                            'case',
                            'catch',
                            'continue',
                            'default',
                            'delete',
                            'do',
                            'else',
                            'finally',
                            'for',
                            'function',
                            'if',
                            'in',
                            'instanceof',
                            'new',
                            'return',
                            'switch',
                            'this',
                            'throw',
                            'try',
                            'typeof',
                            'var',
                            'void',
                            'while',
                            'with',
                            'let',
                            'enum',
                            'const',
                            'debugger',
                            'export',
                            'extends',
                            'import',
                            'super'
                        ]
                        ; (e.prototypeOf = function (t) {
                            return null == t ? null : t.__proto__
                        }),
                            (e.create = t),
                            (e.hasProp = function (t, e) {
                                return (
                                    Object.prototype.hasOwnProperty.call(t, e) ||
                                    ('object' === r(t[e]) && void 0 !== t[e])
                                )
                            }),
                            (e.isArray = function () {
                                if ('function' != typeof Array.isArray) return obj instanceof Array
                            }),
                            (e.defProp = function (t, e, r) {
                                return Object.defineProperty(t, e, r)
                            }),
                            (e.checkIdentifier = function (t) {
                                return n.includes(t)
                            }),
                            (e.isNaNP = function (t) {
                                return t != t
                            })
                }.call(this))
            },
            function (t, e, r) {
                ; (function () {
                    var t = r(8).VmError,
                        n = {}.hasOwnProperty,
                        o =
                            ((function (t, e) {
                                for (var r in e) n.call(e, r) && (t[r] = e[r])
                                function o() {
                                    this.constructor = t
                                }
                                ; (o.prototype = e.prototype),
                                    (t.prototype = new o()),
                                    (t.__super__ = e.prototype)
                            })(i, t),
                                (i.display = 'StopIteration'),
                                i)
                    function i(t, e) {
                        ; (this.value = t),
                            (this.message = null != e ? e : 'iterator has stopped')
                    }
                    function a(t) {
                        ; (this.elements = t), (this.index = 0)
                    }
                    ; (a.prototype.next = function () {
                        if (this.index >= this.elements.length) throw new o('array over')
                        return this.elements[this.index++]
                    }),
                        (t = a),
                        (e.StopIteration = o),
                        (e.ArrayIterator = t)
                }.call(this))
            },
            function (t, e, r) {
                function n(t) {
                    return (n =
                        'function' == typeof Symbol && 'symbol' == typeof Symbol.iterator
                            ? function (t) {
                                return typeof t
                            }
                            : function (t) {
                                return t &&
                                    'function' == typeof Symbol &&
                                    t.constructor === Symbol &&
                                    t !== Symbol.prototype
                                    ? 'symbol'
                                    : typeof t
                            })(t)
                }
                ; (function () {
                    var t = {}.hasOwnProperty,
                        o = r(0).isArray,
                        i =
                            ((a.prototype.run = function () {
                                for (
                                    var t = this.callStack[this.depth], e = t.error;
                                    0 <= this.depth && t && !this.paused;

                                )
                                    if (
                                        ((t = e ? this.unwind(e) : t).run(),
                                            (e = t.error) instanceof Error && this.injectStackTrace(e),
                                            t.done())
                                    ) {
                                        if (t.guards.length) {
                                            var r = t.guards.pop()
                                            if (r.finalizer) {
                                                ; (t.ip = r.finalizer), (t.exitIp = r.end), (t.paused = !1)
                                                continue
                                            }
                                        }
                                        !t.construct ||
                                            ('object' !== (r = n(this.rv)) &&
                                                'function' !== r &&
                                                (this.rv = t.scope.get(0))),
                                            (t = this.popFrame()) &&
                                            !e &&
                                            (t.evalStack.push(this.rv), (this.rv = void 0))
                                    } else e = (t = this.callStack[this.depth]).error
                                if (
                                    (this.timedOut() &&
                                        ((e = new Error(this)), this.injectStackTrace(e)),
                                        e)
                                )
                                    throw e
                            }),
                                (a.prototype.unwind = function (t) {
                                    for (var e = this.callStack[this.depth]; e;) {
                                        e.error = t
                                        var r = e.ip - 1,
                                            n = e.guards.length
                                        if (n && (n = e.guards[n - 1]).start <= r && r <= n.end) {
                                            if (null !== n.handler)
                                                if (r <= n.handler)
                                                    e.evalStack.push(t), (e.error = null), (e.ip = n.handler)
                                                else {
                                                    if (!(n.finalizer && e.ip <= n.finalizer)) {
                                                        e = this.popFrame()
                                                        continue
                                                    }
                                                    e.ip = n.finalizer
                                                }
                                            else e.ip = n.finalizer
                                            return (e.paused = !1), e
                                        }
                                        e = this.popFrame()
                                    }
                                    throw t
                                }),
                                (a.prototype.injectStackTrace = function (t) {
                                    var e,
                                        r,
                                        n,
                                        i,
                                        a,
                                        s,
                                        c,
                                        u = [],
                                        l = 0
                                    for (
                                        this.depth > this.maxTraceDepth &&
                                        (l = this.depth - this.maxTraceDepth),
                                        r = n = a = this.depth,
                                        s = l;
                                        a <= s ? n <= s : s <= n;
                                        r = a <= s ? ++n : --n
                                    )
                                        '<anonymous>' === (i = (e = this.callStack[r]).script.name) &&
                                            e.fname &&
                                            (i = e.fname),
                                            u.push({
                                                at: { name: i, filename: e.script.filename },
                                                line: e.line,
                                                column: e.column
                                            })
                                    if (t.trace) {
                                        for (c = t.trace; o(c[c.length - 1]);) c = c[c.length - 1]
                                        c.push(u)
                                    } else t.trace = u
                                    return (t.stack = t.toString())
                                }),
                                (a.prototype.pushFrame = function (t, e, r, n, o, i, a) {
                                    if (
                                        (null == i && (i = '<anonymous>'),
                                            null == a && (a = !1),
                                            this.checkCallStack())
                                    )
                                        return (
                                            (r = new p(r, t.localNames, t.localLength)).set(0, e),
                                            (e = new s(this, t, r, this.realm, i, a)),
                                            o && e.evalStack.push(o),
                                            n && e.evalStack.push(n),
                                            (this.callStack[++this.depth] = e)
                                        )
                                }),
                                (a.prototype.checkCallStack = function () {
                                    return (
                                        this.depth !== this.maxDepth ||
                                        ((this.callStack[this.depth].error = new Error(
                                            'maximum call stack size exceeded'
                                        )),
                                            this.pause(),
                                            !1)
                                    )
                                }),
                                (a.prototype.popFrame = function () {
                                    var t = this.callStack[--this.depth]
                                    return t && (t.paused = !1), t
                                }),
                                (a.prototype.pause = function () {
                                    return (this.paused = this.callStack[this.depth].paused = !0)
                                }),
                                (a.prototype.resume = function (t) {
                                    if (
                                        ((this.timeout = null != t ? t : -1),
                                            (this.paused = !1),
                                            (this.callStack[this.depth].paused = !1),
                                            this.run(),
                                            !this.paused)
                                    )
                                        return this.rexp
                                }),
                                (a.prototype.timedOut = function () {
                                    return 0 === this.timeout
                                }),
                                (a.prototype.send = function (t) {
                                    return this.callStack[this.depth].evalStack.push(t)
                                }),
                                (a.prototype.done = function () {
                                    return -1 === this.depth
                                }),
                                a)
                    function a(t, e) {
                        ; (this.realm = t),
                            (this.timeout = null != e ? e : -1),
                            (this.maxDepth = 1e3),
                            (this.maxTraceDepth = 50),
                            (this.callStack = []),
                            (this.evalStack = null),
                            (this.depth = -1),
                            (this.yielded = this.rv = void 0),
                            (this.paused = !1),
                            (this.r1 = this.r2 = this.r3 = null),
                            (this.rexp = null)
                    }
                    ; (c.prototype.run = function () {
                        for (
                            var t = this.script.instructions;
                            this.ip !== this.exitIp && !this.paused;

                        )
                            t[this.ip++].exec(this, this.evalStack, this.scope, this.realm)
                        var e = this.evalStack.len()
                        if (!this.paused && !this.error && 0 !== e)
                            throw new Error(
                                'Evaluation stack has ' + e + ' items after execution'
                            )
                    }),
                        (c.prototype.done = function () {
                            return this.ip === this.exitIp
                        }),
                        (c.prototype.setLine = function (t) {
                            this.line = t
                        }),
                        (c.prototype.setColumn = function (t) {
                            this.column = t
                        })
                    var s = c
                    function c(t, e, r, n, o, i) {
                        ; (this.fiber = t),
                            (this.script = e),
                            (this.scope = r),
                            (this.realm = n),
                            (this.fname = o),
                            (this.construct = null != i && i),
                            (this.evalStack = new u(this.script.stackSize, this.fiber)),
                            (this.ip = 0),
                            (this.exitIp = this.script.instructions.length),
                            (this.paused = !1),
                            (this.finalizer = null),
                            (this.guards = []),
                            (this.rv = void 0),
                            (this.line = this.column = -1)
                    }
                    ; (l.prototype.push = function (t) {
                        if (this.idx === this.array.length)
                            throw new Error('maximum evaluation stack size exceeded')
                        return (this.array[this.idx++] = t)
                    }),
                        (l.prototype.pop = function () {
                            return this.array[--this.idx]
                        }),
                        (l.prototype.top = function () {
                            return this.array[this.idx - 1]
                        }),
                        (l.prototype.len = function () {
                            return this.idx
                        }),
                        (l.prototype.clear = function () {
                            return (this.idx = 0)
                        })
                    var u = l
                    function l(t, e) {
                        ; (this.fiber = e), (this.array = new Array(t)), (this.idx = 0)
                    }
                    ; (f.prototype.get = function (t) {
                        return this.data[t]
                    }),
                        (f.prototype.set = function (t, e) {
                            return (this.data[t] = e)
                        }),
                        (f.prototype.name = function (e) {
                            var r,
                                n = this.names
                            for (r in n) if (t.call(n, r) && n[r] === e) return parseInt(r)
                            return -1
                        })
                    var p = f
                    function f(t, e, r) {
                        ; (this.parent = t), (this.names = e), (this.data = new Array(r))
                    }
                    ; (d.prototype.get = function (t) {
                        return this.object[t]
                    }),
                        (d.prototype.set = function (t, e) {
                            return (this.object[t] = e)
                        }),
                        (d.prototype.has = function (t) {
                            return t in this.object
                        })
                    var h = d
                    function d(t, e) {
                        ; (this.parent = t), (this.object = e)
                    }
                    ; (e.Fiber = i), (e.Scope = p), (e.WithScope = h)
                }.call(this))
            },
            function (t, e, r) {
                ; (r = new (r(4))()).eval(
                    '["<script>",0,[[22]8false,15,null17]anonymous[,29,31,46284527,3446[043923[331182121121,117"$encode"[,y7,-59-1066854035529307497780698750087959056264384779473905960893846826863465"atrue"isInNrequi"l"nr,"ostRegExp,"som,webdvenavigatowindow"teslguag<cun"[[___evlilir__futitc"fx_wrapped_enmnphmghtmaclPS_IDE_r"HeadssChr/","h"lo[[a-z0-9_-]+.(ku|kwai|gifsw)m|cn)/ifgNoSptObjeclno[ ]e rA["(ie|POS|AidWnc""_prexAsli"SHPD"yCovurtupR""urRgth5z["fmCrMiecAep"f,jmpOxs0pEIE"Oqsub0$""D3de7-fa2-4aac8LAaW"f"YBks-""b""jMk"N1YOiOPkgfHCL0P5'
                ),
                    (t.exports = r)
            },
            function (t, e, r) {
                ; (function (e) {
                    var n = r(5),
                        o = r(11),
                        i = r(2).Fiber,
                        a = r(14),
                        s = r(16)
                    function c(t) {
                        ; (this.realm = new n(t)),
                            (this.realm.global.startupRandom = Date.parse(new Date()) / 1e3),
                            // (this.realm.global.startupRandom = 'Date.parse(new Date()) / 1e3'),
                            (this.realm.global.count = 100),
                            new s().register()
                    }
                    ; (c.prototype.eval = function (t, e) {
                        return (t = new a().unzip(t)), this.run(c.fromJSON(JSON.parse(t)), e)
                    }),
                        (c.prototype.run = function (t, e) {
                            if (((t = this.createFiber(t, e)).run(), !t.paused)) return t.rexp
                        }),
                        (c.prototype.call = function (t, e) {
                            return this.realm.global[t].apply(this, e)
                        }),
                        (c.prototype.createFiber = function (t, e) {
                            return (e = new i(this.realm, e)).pushFrame(t, this.realm.global), e
                        }),
                        (c.fromJSON = o.fromJSON),
                        (t.exports = c)
                }.call(this))
            },
            function (e2, t2, g2) {
                ; (function (f2, l2, h2, y2) {
                    function d2(t) {
                        return (d2 =
                            'function' == typeof Symbol && 'symbol' == typeof Symbol.iterator
                                ? function (t) {
                                    return typeof t
                                }
                                : function (t) {
                                    return t &&
                                        'function' == typeof Symbol &&
                                        t.constructor === Symbol &&
                                        t !== Symbol.prototype
                                        ? 'symbol'
                                        : typeof t
                                })(t)
                    }
                    function w2(t, e, r) {
                        return (w2 = (function () {
                            if (
                                'undefined' != typeof Reflect &&
                                Reflect.construct &&
                                !Reflect.construct.sham
                            ) {
                                if ('function' == typeof Proxy) return 1
                                try {
                                    return (
                                        Boolean.prototype.valueOf.call(
                                            Reflect.construct(Boolean, [], function () { })
                                        ),
                                        1
                                    )
                                } catch (t) { }
                            }
                        })()
                            ? Reflect.construct.bind()
                            : function (t, e, r) {
                                var n = [null]
                                return (
                                    n.push.apply(n, e),
                                    (e = new (Function.bind.apply(t, n))()),
                                    r && o2(e, r.prototype),
                                    e
                                )
                            }).apply(null, arguments)
                    }
                    function o2(t, e) {
                        return (o2 = Object.setPrototypeOf
                            ? Object.setPrototypeOf.bind()
                            : function (t, e) {
                                return (t.__proto__ = e), t
                            })(t, e)
                    }
                    function m2(t) {
                        return (
                            (function (t) {
                                if (Array.isArray(t)) return r2(t)
                            })(t) ||
                            (function (t) {
                                if (
                                    ('undefined' != typeof Symbol && null != t[Symbol.iterator]) ||
                                    null != t['@@iterator']
                                )
                                    return Array.from(t)
                            })(t) ||
                            (function (t, e) {
                                if (t) {
                                    if ('string' == typeof t) return r2(t, e)
                                    var r = Object.prototype.toString.call(t).slice(8, -1)
                                    return 'Map' ===
                                        (r =
                                            'Object' === r && t.constructor ? t.constructor.name : r) ||
                                        'Set' === r
                                        ? Array.from(t)
                                        : 'Arguments' === r ||
                                            /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(r)
                                            ? r2(t, e)
                                            : void 0
                                }
                            })(t) ||
                            (function () {
                                throw new TypeError(
                                    'Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.'
                                )
                            })()
                        )
                    }
                    function r2(t, e) {
                        ; (null == e || e > t.length) && (e = t.length)
                        for (var r = 0, n = new Array(e); r < e; r++) n[r] = t[r]
                        return n
                    }
                    function b2(t, e, r) {
                        e in t
                            ? Object.defineProperty(t, e, {
                                value: r,
                                enumerable: !0,
                                configurable: !0,
                                writable: !0
                            })
                            : (t[e] = r)
                    }
                    ; (function () {
                        var i2 = {}.hasOwnProperty,
                            t3 = g2(0),
                            c2 = t3.prototypeOf,
                            u2 = t3.hasProp,
                            t3 = g2(1),
                            a2 = t3.ArrayIterator,
                            s2 = t3.StopIteration,
                            p2 = g2(9).proxyHandler
                        function n2(t4) {
                            b2(
                                (r3 = {
                                    window: 'undefined' == typeof window ? f2 : window,
                                    undefined: void 0,
                                    Object: Object,
                                    Function: Function,
                                    Number: Number,
                                    Boolean: Boolean,
                                    String: String,
                                    Array: Array,
                                    Date: Date,
                                    RegExp: RegExp,
                                    Error: Error,
                                    StopIteration: s2,
                                    Math: Math,
                                    JSON: JSON,
                                    console: console,
                                    encodeURIComponent: encodeURIComponent,
                                    unescape: unescape,
                                    Uint8Array: Uint8Array,
                                    parseInt: parseInt,
                                    escape: escape,
                                    decodeURIComponent: decodeURIComponent,
                                    isNaN: isNaN,
                                    Infinity: 1 / 0,
                                    NaN: NaN
                                }),
                                'parseInt',
                                parseInt
                            ),
                                b2(r3, 'parseFloat', parseFloat),
                                b2(r3, 'isFinite', isFinite),
                                b2(r3, 'encodeURI', encodeURI),
                                b2(r3, 'decodeURI', decodeURI),
                                b2(r3, 'TypeError', TypeError),
                                b2(r3, 'URIError', URIError),
                                b2(r3, 'SyntaxError', SyntaxError),
                                b2(r3, 'ReferenceError', ReferenceError),
                                b2(r3, 'RangeError', RangeError),
                                b2(r3, 'EvalError', EvalError),
                                b2(r3, 'eval', eval),
                                b2(r3, 'isInNode', !!(l2 && h2 && y2)),
                                b2(r3, 'require', g2(10)),
                                b2(r3, 'isDevTool', !1),
                                b2(r3, 'isWsInstance', !1)
                            var n3,
                                e3,
                                r3,
                                o3 = r3
                            for (n3 in (window &&
                                window.WebSocket &&
                                'function' == typeof window.Proxy &&
                                /native code/.test(window.Proxy.toString()) &&
                                (window.WebSocket = new window.Proxy(window.WebSocket, {
                                    construct: function (t, e) {
                                        return (
                                            (t = w2(t, m2(e))),
                                            (o3.isWsInstance = !0),
                                            new window.Proxy(t, p2)
                                        )
                                    }
                                })),
                                o3.isDevTool ||
                                (((r3 = /./).toString = function () {
                                    o3.isDevTool = !0
                                })),
                                (this.has = function (t, e) {
                                    return null != t && (!!u2(t, e) || this.has(c2(t), e))
                                }),
                                (this.get = function (t, e) {
                                    if (null != t) return t[e]
                                }),
                                (this.set = function (t, e, r) {
                                    var n = d2(t)
                                    return ('object' === n || 'function' === n) && (t[e] = r), r
                                }),
                                (this.del = function (t, e) {
                                    var r = d2(t)
                                    return ('object' !== r && 'function' !== r) || delete t[e]
                                }),
                                (this.instanceOf = function (t, e) {
                                    var r
                                    return (
                                        null != e &&
                                        ('object' === (r = d2(e)) || 'function' === r) &&
                                        e instanceof t
                                    )
                                }),
                                (this.enumerateKeys = function (t) {
                                    var e,
                                        r = []
                                    for (e in t) '__mdid__' !== e && r.push(e)
                                    return new a2(r)
                                }),
                                t4))
                                i2.call(t4, n3) && ((e3 = t4[n3]), (o3[n3] = e3))
                            this.global = o3
                        }
                        ; (n2.prototype.inv = function (t) {
                            return -t
                        }),
                            (n2.prototype.lnot = function (t) {
                                return !t
                            }),
                            (n2.prototype.ladd = function (t) {
                                return +t
                            }),
                            (n2.prototype.not = function (t) {
                                return ~t
                            }),
                            (n2.prototype.inc = function (t) {
                                return ++t
                            }),
                            (n2.prototype.dec = function (t) {
                                return t - 1
                            }),
                            (n2.prototype.add = function (t, e) {
                                return e + t
                            }),
                            (n2.prototype.sub = function (t, e) {
                                return e - t
                            }),
                            (n2.prototype.mul = function (t, e) {
                                return e * t
                            }),
                            (n2.prototype.div = function (t, e) {
                                return e / t
                            }),
                            (n2.prototype.mod = function (t, e) {
                                return e % t
                            }),
                            (n2.prototype.shl = function (t, e) {
                                return e << t
                            }),
                            (n2.prototype.sar = function (t, e) {
                                return e >> t
                            }),
                            (n2.prototype.shr = function (t, e) {
                                return e >>> t
                            }),
                            (n2.prototype.or = function (t, e) {
                                return e | t
                            }),
                            (n2.prototype.and = function (t, e) {
                                return e & t
                            }),
                            (n2.prototype.xor = function (t, e) {
                                return e ^ t
                            }),
                            (n2.prototype.ceq = function (t, e) {
                                return e == t
                            }),
                            (n2.prototype.cneq = function (t, e) {
                                return e != t
                            }),
                            (n2.prototype.cid = function (t, e) {
                                return e === t
                            }),
                            (n2.prototype.cnid = function (t, e) {
                                return e !== t
                            }),
                            (n2.prototype.lt = function (t, e) {
                                return e < t
                            }),
                            (n2.prototype.lte = function (t, e) {
                                return e <= t
                            }),
                            (n2.prototype.gt = function (t, e) {
                                return t < e
                            }),
                            (n2.prototype.gte = function (t, e) {
                                return t <= e
                            }),
                            (e2.exports = n2)
                    }.call(this))
                }.call(this, g2(6), g2(7), '/', '/index.js'))
            },
            function (t, e) {
                function r(t) {
                    return (r =
                        'function' == typeof Symbol && 'symbol' == typeof Symbol.iterator
                            ? function (t) {
                                return typeof t
                            }
                            : function (t) {
                                return t &&
                                    'function' == typeof Symbol &&
                                    t.constructor === Symbol &&
                                    t !== Symbol.prototype
                                    ? 'symbol'
                                    : typeof t
                            })(t)
                }
                var n = (function () {
                    return this
                })()
                try {
                    n = n || new Function('return this')()
                } catch (o) {
                    'object' === ('undefined' == typeof window ? 'undefined' : r(window)) &&
                        (n = window)
                }
                t.exports = n
            },
            function (t, e) {
                var r, n
                function o() {
                    throw new Error('setTimeout has not been defined')
                }
                function i() {
                    throw new Error('clearTimeout has not been defined')
                }
                t = t.exports = {}
                try {
                    r = 'function' == typeof setTimeout ? setTimeout : o
                } catch (m) {
                    r = o
                }
                try {
                    n = 'function' == typeof clearTimeout ? clearTimeout : i
                } catch (m) {
                    n = i
                }
                function a(t) {
                    if (r === setTimeout) return setTimeout(t, 0)
                    if ((r === o || !r) && setTimeout) return (r = setTimeout)(t, 0)
                    try {
                        return r(t, 0)
                    } catch (e) {
                        try {
                            return r.call(null, t, 0)
                        } catch (n) {
                            return r.call(this, t, 0)
                        }
                    }
                }
                var s,
                    c = [],
                    u = !1,
                    l = -1
                function p() {
                    u &&
                        s &&
                        ((u = !1), s.length ? (c = s.concat(c)) : (l = -1), c.length && f())
                }
                function f() {
                    if (!u) {
                        for (var t = a(p), e = ((u = !0), c.length); e;) {
                            for (s = c, c = []; ++l < e;) s && s[l].run()
                                ; (l = -1), (e = c.length)
                        }
                        ; (s = null),
                            (u = !1),
                            (function (t) {
                                if (n === clearTimeout) return clearTimeout(t)
                                if ((n === i || !n) && clearTimeout) return (n = clearTimeout)(t)
                                try {
                                    n(t)
                                } catch (e) {
                                    try {
                                        return n.call(null, t)
                                    } catch (r) {
                                        return n.call(this, t)
                                    }
                                }
                            })(t)
                    }
                }
                function h(t, e) {
                    ; (this.fun = t), (this.array = e)
                }
                function d() { }
                ; (t.nextTick = function (t) {
                    var e = new Array(arguments.length - 1)
                    if (1 < arguments.length)
                        for (var r = 1; r < arguments.length; r++) e[r - 1] = arguments[r]
                    c.push(new h(t, e)), 1 !== c.length || u || a(f)
                }),
                    (h.prototype.run = function () {
                        this.fun.apply(null, this.array)
                    }),
                    (t.title = 'browser'),
                    (t.browser = !0),
                    (t.env = {}),
                    (t.argv = []),
                    (t.version = ''),
                    (t.versions = {}),
                    (t.on = d),
                    (t.addListener = d),
                    (t.once = d),
                    (t.off = d),
                    (t.removeListener = d),
                    (t.removeAllListeners = d),
                    (t.emit = d),
                    (t.prependListener = d),
                    (t.prependOnceListener = d),
                    (t.listeners = function (t) {
                        return []
                    }),
                    (t.binding = function (t) {
                        throw new Error('process.binding is not supported')
                    }),
                    (t.cwd = function () {
                        return '/'
                    }),
                    (t.chdir = function (t) {
                        throw new Error('process.chdir is not supported')
                    }),
                    (t.umask = function () {
                        return 0
                    })
            },
            function (t, e, r) {
                var n = r(0).isArray,
                    o = function t(e, r) {
                        null == r && (r = ''), (r += '    ')
                        for (var o = '', i = 0; i < e.length; i++) {
                            var a,
                                s,
                                c,
                                u = e[i]
                            n(u)
                                ? (o = (o += '\n\n' + r + 'Rethrown:') + t(u, r))
                                : ((a = u.line),
                                    (s = u.column),
                                    (c = u.at.name),
                                    (u = u.at.filename),
                                    (o += c
                                        ? '\n' + r + 'at ' + c + ' (' + u + ':' + a + ':' + s + ')'
                                        : '\n' + r + 'at ' + u + ':' + a + ':' + s))
                        }
                        return o
                    }
                function i(t) {
                    ; (this.trace = null), (this.message = t)
                }
                ; (i.prototype.toString = function () {
                    var t = this.constructor.display + ': ' + this.message
                    return this.trace && (t += o(this.trace)), t
                }),
                    (i.prototype.stackTrace = function () {
                        return this.toString()
                    }),
                    (e.VmError = i)
            },
            function (t, e) {
                ; (function () {
                    e.proxyHandler = {
                        get: function (t, e) {
                            return 'function' == typeof (e = t[e]) ? e.bind(t) : e
                        },
                        set: function (t, e, r) {
                            var n
                            return (
                                'onmessage' === e &&
                                ((n = r),
                                    (r = function (t) {
                                        n(t)
                                    })),
                                (t[e] = r)
                            )
                        }
                    }
                }.call(this))
            },
            function (t, e) {
                function r(t) {
                    throw (
                        (((t = new Error("Cannot find module '" + t + "'")).code =
                            'MODULE_NOT_FOUND'),
                            t)
                    )
                }
                ; (r.keys = function () {
                    return []
                }),
                    ((t.exports = r.resolve = r).id = 10)
            },
            function (t, e, r) {
                ; (function () {
                    var e = r(12),
                        n = function (t) {
                            for (var r = [], n = 0; n < t.length; n++) {
                                for (
                                    var o = t[n], i = e[o[0]], a = [], s = 1, c = 1, u = o.length;
                                    1 <= u ? c < u : u < c;
                                    s = 1 <= u ? ++c : --c
                                )
                                    a.push(o[s])
                                        ; (i = new i(a.length ? a : null)), r.push(i)
                            }
                            return r
                        },
                        o = function (t) {
                            var e = t.lastIndexOf('/'),
                                r = t.slice(0, e)
                            return (e = t.slice(e + 1)), new RegExp(r, e)
                        },
                        i =
                            ((a.fromJSON = function t(e) {
                                for (
                                    var r = n(e[2]), a = [], s = e[3], c = 0;
                                    c < s.length;
                                    c++
                                ) {
                                    var u = s[c]
                                    a.push(t(u))
                                }
                                for (
                                    var l = e[4], p = l.length, f = [], h = e[5], d = 0;
                                    d < h.length;
                                    d++
                                ) {
                                    var m = h[d]
                                    f.push({
                                        start: -1 !== m[0] ? m[0] : null,
                                        handler: -1 !== m[1] ? m[1] : null,
                                        finalizer: -1 !== m[2] ? m[2] : null,
                                        end: -1 !== m[3] ? m[3] : null
                                    })
                                }
                                for (
                                    var _ = e[6], y = e[7], g = [], v = e[8], b = 0;
                                    b < v.length;
                                    b++
                                ) {
                                    var w = v[b]
                                    g.push(o(w))
                                }
                                return new i(null, null, r, a, l, p, f, _, y, g, null)
                            }),
                                a)
                    function a(t, e, r, n, o, i, a, s, c, u, l) {
                        ; (this.filename = t),
                            (this.name = e),
                            (this.instructions = r),
                            (this.scripts = n),
                            (this.localNames = o),
                            (this.localLength = i),
                            (this.guards = a),
                            (this.stackSize = s),
                            (this.strings = c),
                            (this.regexps = u),
                            (this.source = l)
                    }
                    t.exports = i
                }.call(this))
            },
            function (module, exports, __webpack_require__) {
                function _typeof(t) {
                    return (_typeof =
                        'function' == typeof Symbol && 'symbol' == typeof Symbol.iterator
                            ? function (t) {
                                return typeof t
                            }
                            : function (t) {
                                return t &&
                                    'function' == typeof Symbol &&
                                    t.constructor === Symbol &&
                                    t !== Symbol.prototype
                                    ? 'symbol'
                                    : typeof t
                            })(t)
                }
                ; (function () {
                    var ref = __webpack_require__(1),
                        StopIteration = ref.StopIteration,
                        ref1 = __webpack_require__(0)
                    ref1.defProp
                    var hasProp = ref1.hasProp,
                        ref3 = __webpack_require__(2),
                        Fiber = ref3.Fiber,
                        Scope = ref3.Scope,
                        WithScope = ref3.WithScope,
                        OpcodeClassFactory =
                            ((o2 = 0),
                                function (t, e, r) {
                                    var n
                                    return (
                                        ((n = function (t) {
                                            t && (this.args = t)
                                        }).prototype.id = o2++),
                                        (n.prototype.exec = e),
                                        (n.prototype.calculateFactor =
                                            r ||
                                            function () {
                                                return 2
                                            }),
                                        n
                                    )
                                }),
                        RegExpProxy = __webpack_require__(13),
                        Op = function (t, e, r) {
                            return OpcodeClassFactory(t, e, r)
                        },
                        opcodes = [
                            new Op('', function (t, e, r) {
                                return ret(t)
                            }),
                            new Op('', function (t, e, r) {
                                return e.pop()
                            }),
                            new Op('', function (t, e, r) {
                                return e.push(e.top())
                            }),
                            new Op('', function (t, e, r) {
                                var n = e.pop(),
                                    o = e.pop()
                                return e.push(n), e.push(o)
                            }),
                            new Op('', function (t, e, r) {
                                return (t.fiber.rv = e.pop()), ret(t)
                            }),
                            new Op('', function (t, e) {
                                return (t.paused = !0)
                            }),
                            new Op('', function (t, e) {
                                return (t.fiber.yielded = e.pop()), t.fiber.pause()
                            }),
                            new Op('', function (t, e, r) {
                                return throwErr(t, e.pop())
                            }),
                            new Op('', function (t) {
                                return t.guards.push(t.script.guards[this.args[0]])
                            }),
                            new Op('', function (t) {
                                var e = t.guards[t.guards.length - 1]
                                if (t.script.guards[this.args[0]] === e) return t.guards.pop()
                            }),
                            new Op('', function (t, e, r) {
                                return (t.fiber.r1 = e.pop())
                            }),
                            new Op('', function (t, e, r) {
                                return (t.fiber.r2 = e.pop())
                            }),
                            new Op('', function (t, e, r) {
                                return (t.fiber.r3 = e.pop())
                            }),
                            new Op('', function (t, e, r) {
                                return e.push(t.fiber.r1)
                            }),
                            new Op('', function (t, e, r) {
                                return e.push(t.fiber.r2)
                            }),
                            new Op('', function (t, e, r) {
                                return e.push(t.fiber.r3)
                            }),
                            new Op('', function (t, e, r) {
                                return e.push(+t.fiber.r3)
                            }),
                            new Op('', function (t, e, r) {
                                return (e.fiber.rexp = e.pop())
                            }),
                            new Op('', function (t, e, r) {
                                return callm(t, 0, 'iterator', e.pop())
                            }),
                            new Op('', function (t, e, r, n) {
                                return e.push(n.enumerateKeys(e.pop()))
                            }),
                            new Op('', function (t, e, r) {
                                if (
                                    (callm(t, 0, 'next', e.pop()), t.error instanceof StopIteration)
                                )
                                    return (t.error = null), (t.paused = !1), (t.ip = this.args[0])
                            }),
                            new Op('', function (t, e, r) {
                                if ((r.set(1, e.pop()), (e = e.pop()), this.args[0]))
                                    return r.set(2, e)
                            }),
                            new Op('', function (t, e, r, n) {
                                return e.push(n.global)
                            }),
                            new Op('', function (t, e, r, n) {
                                var o = this.args[0],
                                    i = this.args[1],
                                    a = r.get(1)
                                if (o < a.length)
                                    return r.set(i, Array.prototype.slice.call(a, o))
                            }),
                            new Op('', function (t, e, r) {
                                return call(t, this.args[0], e.pop(), null, null, !0)
                            }),
                            new Op('', function (t, e, r) {
                                return call(t, this.args[0], e.pop(), null, this.args[1])
                            }),
                            new Op('', function (t, e, r) {
                                return callm(t, this.args[0], e.pop(), e.pop(), this.args[1])
                            }),
                            new Op('', function (t, e, r, n) {
                                var o = e.pop(),
                                    i = e.pop()
                                return null == o
                                    ? throwErr(
                                        t,
                                        new TypeError("Cannot read property '" + i + "' of " + o)
                                    )
                                    : 'function' == typeof o &&
                                        'length' === i &&
                                        void 0 !== o.originFnLength
                                        ? e.push(n.get(o, 'originFnLength'))
                                        : e.push(n.get(o, i))
                            }),
                            new Op('', function (t, e, r, n) {
                                var o = e.pop(),
                                    i = e.pop(),
                                    a = e.pop()
                                return null == o
                                    ? throwErr(
                                        t,
                                        new TypeError("Cannot set property '" + i + "' of " + o)
                                    )
                                    : Object.isExtensible(o) || '__proto__' !== i
                                        ? e.push(n.set(o, i, a))
                                        : throwErr(
                                            t,
                                            new Error(
                                                '#<Object> is not extensible at set __proto__[as __proto__]'
                                            )
                                        )
                            }),
                            new Op('', function (t, e, r, n) {
                                var o = e.pop(),
                                    i = e.pop()
                                return null == o
                                    ? throwErr(t, new Error('Cannot convert null to object'))
                                    : e.push(n.del(o, i))
                            }),
                            new Op('', function (t, e, r) {
                                try {
                                    for (var n = this.args[0], o = this.args[1], i = r; n--;)
                                        i = i.parent
                                    return e.push(i.get(o))
                                } catch (a) {
                                    return throwErr(t, a)
                                }
                            }),
                            new Op('', function (t, e, r) {
                                for (var n = this.args[0], o = this.args[1], i = r; n--;)
                                    i = i.parent
                                return e.push(i.set(o, e.pop()))
                            }),
                            new Op('', function (t, e, r, n) {
                                try {
                                    for (var o, i = this.args[0]; r instanceof WithScope;) {
                                        if (r.has(i)) return e.push(r.get(i))
                                        r = r.parent
                                    }
                                    for (; r instanceof Scope;) {
                                        if (0 <= (o = r.name(i))) return e.push(r.get(o))
                                        r = r.parent
                                    }
                                    return hasProp(n.global, i) || this.args[1]
                                        ? e.push(n.global[i])
                                        : throwErr(t, new Error(i + ' is not defined'))
                                } catch (a) {
                                    return throwErr(t, a)
                                }
                            }),
                            new Op('', function (t, e, r, n) {
                                try {
                                    for (
                                        var o, i = this.args[0], a = e.pop();
                                        r instanceof WithScope;

                                    ) {
                                        if (r.has(i)) return e.push(r.set(i, a))
                                        r = r.parent
                                    }
                                    for (; r instanceof Scope;) {
                                        if (0 <= (o = r.name(i))) return e.push(r.set(o, a))
                                        r = r.parent
                                    }
                                    return e.push((n.global[i] = a))
                                } catch (s) {
                                    return throwErr(t, s)
                                }
                            }),
                            new Op('', function (t, e, r, n) {
                                return hasProp(n.global, this.args[0]) || this.args[1]
                                    ? e.push(n.global[this.args[0]])
                                    : 'this' === this.args[0]
                                        ? e.push(n.global)
                                        : throwErr(t, new Error(this.args[0] + ' is not defined'))
                            }),
                            new Op('', function (t, e, r, n) {
                                try {
                                    return e.push((n.global[this.args[0]] = e.pop()))
                                } catch (o2) {
                                    return throwErr(t, o2)
                                }
                            }),
                            new Op('', function (t) {
                                return (t.scope = new Scope(
                                    t.scope,
                                    t.script.localNames,
                                    t.script.localLength
                                ))
                            }),
                            new Op('', function (t) {
                                return (t.scope = t.scope.parent)
                            }),
                            new Op('', function (t, e) {
                                return (t.scope = new WithScope(t.scope, e.pop()))
                            }),
                            new Op('', function (t, e, r, n) {
                                try {
                                    return e.push(n.inv(e.pop()))
                                } catch (o2) {
                                    return throwErr(t, o2)
                                }
                            }),
                            new Op('', function (t, e, r, n) {
                                try {
                                    return e.push(n.lnot(e.pop()))
                                } catch (o2) {
                                    return throwErr(t, o2)
                                }
                            }),
                            new Op('', function (t, e, r, n) {
                                try {
                                    return e.push(n.ladd(e.pop()))
                                } catch (o2) {
                                    return throwErr(t, o2)
                                }
                            }),
                            new Op('', function (t, e, r, n) {
                                try {
                                    return e.push(n.not(e.pop()))
                                } catch (o2) {
                                    return throwErr(t, o2)
                                }
                            }),
                            new Op('', function (t, e, r, n) {
                                try {
                                    return e.push(n.inc(e.pop()))
                                } catch (o2) {
                                    return throwErr(t, o2)
                                }
                            }),
                            new Op('', function (t, e, r, n) {
                                try {
                                    return e.push(n.dec(e.pop()))
                                } catch (o2) {
                                    return throwErr(t, o2)
                                }
                            }),
                            new Op('', function (t, e, r, n) {
                                try {
                                    return e.push(n.add(e.pop(), e.pop()))
                                } catch (o2) {
                                    return throwErr(t, o2)
                                }
                            }),
                            new Op('', function (t, e, r, n) {
                                try {
                                    return e.push(n.sub(e.pop(), e.pop()))
                                } catch (o2) {
                                    return throwErr(t, o2)
                                }
                            }),
                            new Op('', function (t, e, r, n) {
                                try {
                                    return e.push(n.mul(e.pop(), e.pop()))
                                } catch (o2) {
                                    return throwErr(t, o2)
                                }
                            }),
                            new Op('', function (t, e, r, n) {
                                try {
                                    return e.push(n.div(e.pop(), e.pop()))
                                } catch (o2) {
                                    return throwErr(t, o2)
                                }
                            }),
                            new Op('', function (t, e, r, n) {
                                try {
                                    return e.push(n.mod(e.pop(), e.pop()))
                                } catch (o2) {
                                    return throwErr(t, o2)
                                }
                            }),
                            new Op('', function (t, e, r, n) {
                                try {
                                    return e.push(n.shl(e.pop(), e.pop()))
                                } catch (o2) {
                                    return throwErr(t, o2)
                                }
                            }),
                            new Op('', function (t, e, r, n) {
                                try {
                                    return e.push(n.sar(e.pop(), e.pop()))
                                } catch (o2) {
                                    return throwErr(t, o2)
                                }
                            }),
                            new Op('', function (t, e, r, n) {
                                try {
                                    return e.push(n.shr(e.pop(), e.pop()))
                                } catch (o2) {
                                    return throwErr(t, o2)
                                }
                            }),
                            new Op('', function (t, e, r, n) {
                                try {
                                    return e.push(n.or(e.pop(), e.pop()))
                                } catch (o2) {
                                    return throwErr(t, o2)
                                }
                            }),
                            new Op('', function (t, e, r, n) {
                                try {
                                    return e.push(n.and(e.pop(), e.pop()))
                                } catch (o2) {
                                    return throwErr(t, o2)
                                }
                            }),
                            new Op('', function (t, e, r, n) {
                                try {
                                    return e.push(n.xor(e.pop(), e.pop()))
                                } catch (o2) {
                                    return throwErr(t, o2)
                                }
                            }),
                            new Op('', function (t, e, r, n) {
                                try {
                                    return e.push(n.ceq(e.pop(), e.pop()))
                                } catch (o2) {
                                    return throwErr(t, o2)
                                }
                            }),
                            new Op('', function (t, e, r, n) {
                                try {
                                    return e.push(n.cneq(e.pop(), e.pop()))
                                } catch (o2) {
                                    return throwErr(t, o2)
                                }
                            }),
                            new Op('', function (t, e, r, n) {
                                try {
                                    return e.push(n.cid(e.pop(), e.pop()))
                                } catch (o2) {
                                    return throwErr(t, o2)
                                }
                            }),
                            new Op('', function (t, e, r, n) {
                                try {
                                    return e.push(n.cnid(e.pop(), e.pop()))
                                } catch (o2) {
                                    return throwErr(t, o2)
                                }
                            }),
                            new Op('', function (t, e, r, n) {
                                try {
                                    return e.push(n.lt(e.pop(), e.pop()))
                                } catch (o2) {
                                    return throwErr(t, o2)
                                }
                            }),
                            new Op('', function (t, e, r, n) {
                                try {
                                    return e.push(n.lte(e.pop(), e.pop()))
                                } catch (o2) {
                                    return throwErr(t, o2)
                                }
                            }),
                            new Op('', function (t, e, r, n) {
                                try {
                                    return e.push(n.gt(e.pop(), e.pop()))
                                } catch (o2) {
                                    return throwErr(t, o2)
                                }
                            }),
                            new Op('', function (t, e, r, n) {
                                try {
                                    return e.push(n.gte(e.pop(), e.pop()))
                                } catch (o2) {
                                    return throwErr(t, o2)
                                }
                            }),
                            new Op('', function (t, e, r, n) {
                                try {
                                    return e.push(n.has(e.pop(), e.pop()))
                                } catch (o2) {
                                    return throwErr(t, o2)
                                }
                            }),
                            new Op('', function (t, e, r, n) {
                                try {
                                    return e.push(n.instanceOf(e.pop(), e.pop()))
                                } catch (o2) {
                                    return throwErr(t, o2)
                                }
                            }),
                            new Op('', function (t, e, r, n) {
                                try {
                                    return e.push(_typeof(e.pop()))
                                } catch (o2) {
                                    return throwErr(t, o2)
                                }
                            }),
                            new Op('', function (t, e) {
                                return e.pop(), e.push(void 0)
                            }),
                            new Op('', function (t, e, r) {
                                return (t.ip = this.args[0])
                            }),
                            new Op('', function (t, e, r) {
                                if (e.pop()) return (t.ip = this.args[0])
                            }),
                            new Op('', function (t, e, r) {
                                if (!e.pop()) return (t.ip = this.args[0])
                            }),
                            new Op('', function (t, e) {
                                return e.push(void 0)
                            }),
                            new Op('', function (t, e, r) {
                                return e.push(this.args[0])
                            }),
                            new Op('', function (t, e, r) {
                                return e.push(this.args[0] ? 1 / 0 : -1 / 0)
                            }),
                            new Op('', function (t, e, r) {
                                return e.push(NaN)
                            }),
                            new Op('', function (t, e, r) {
                                return e.push(-0)
                            }),
                            new Op('', function (t, e, r) {
                                return e.push(t.script.strings[this.args[0]])
                            }),
                            new Op('', function (t, e, r, n) {
                                return e.push(new RegExpProxy(t.script.regexps[this.args[0]], n))
                            }),
                            new Op('', function (t, e, r, n) {
                                for (var o = this.args[0], i = {}; o--;) {
                                    var a = e.pop(),
                                        s = e.pop()
                                    i.hasOwnProperty(a) || n.set(i, a, s)
                                }
                                return e.push(i)
                            }),
                            new Op('', function (t, e, r, n) {
                                for (var o = this.args[0], i = new Array(o); o--;) i[o] = e.pop()
                                return e.push(i)
                            }),
                            new Op('', function (t, e, r, n) {
                                var o = this.args[0]
                                return e.push(
                                    createFunction(t.script.scripts[o], r, n, this.args[1])
                                )
                            }),
                            new Op('', function (t) {
                                return t.setLine(this.args[0])
                            }),
                            new Op('', function (t) {
                                return t.setColumn(this.args[0])
                            }),
                            new Op('', function (t, e, r) {
                                return debug()
                            })
                        ],
                        callm = function (t, e, r, n, o) {
                            var i = t.evalStack,
                                a = t.realm
                            if (null == n)
                                return throwErr(
                                    t,
                                    new Error(
                                        "Cannot call method '" +
                                        r +
                                        "' of " +
                                        (void 0 === n ? 'undefined' : 'null')
                                    )
                                )
                            var s = n.constructor.name || 'Object'
                            return (a = a.get(n, r)) instanceof Function
                                ? call(t, e, a, n)
                                : null == a
                                    ? (i.pop(),
                                        throwErr(
                                            t,
                                            new Error('Object #<' + s + "> has no method '" + r + "'")
                                        ))
                                    : (i.pop(),
                                        throwErr(
                                            t,
                                            new Error(
                                                "Property '" +
                                                r +
                                                "' of object #<" +
                                                s +
                                                '> is not a function'
                                            )
                                        ))
                        },
                        call = function (t, e, r, n, o, i) {
                            if ('function' != typeof r)
                                return throwErr(t, new Error('object is not a function'))
                            for (
                                var a = t.evalStack,
                                s = t.fiber,
                                c = t.realm,
                                u = { length: e, callee: r };
                                e;

                            )
                                u[--e] = a.pop()
                                    ; (n = void 0 === n ? c.global : n),
                                        (u = Array.prototype.slice.call(u))
                            try {
                                var l = i ? createNativeInstance(r, u) : r.apply(n, u)
                                if (!s.paused) return a.push(l)
                            } catch (p) {
                                throwErr(t, p)
                            }
                        },
                        createFunction = function (t, e, r, n, o) {
                            var i
                            return (
                                ((i = function n() {
                                    var o,
                                        i,
                                        a,
                                        s = !1
                                    if (
                                        ((i = n.__fiber__)
                                            ? ((i.callStack[i.depth].paused = !0),
                                                (n.__fiber__ = null),
                                                (o = n.__construct__),
                                                (n.__construct__ = null))
                                            : ((i = new Fiber(r)), (s = !0)),
                                            (a = n.__callname__ || t.name),
                                            (n.__callname__ = null),
                                            i.pushFrame(t, this, e, arguments, n, a, o),
                                            s)
                                    )
                                        return i.run(), i.rv
                                }).originFnLength = o),
                                i
                            )
                        },
                        callArrayConstructor = function (t) {
                            return 1 === t.length && (0 | t[0]) === t[0]
                                ? new Array(t[0])
                                : t.slice()
                        },
                        callRegExpConstructor = function (t) {
                            return 1 === t.length ? new RegExp(t[0]) : new RegExp(t[0], t[1])
                        },
                        createNativeInstance = function (t, e) {
                            var r
                            return t === Array
                                ? callArrayConstructor(e)
                                : t === Date
                                    ? 0 === e.length
                                        ? new Date()
                                        : new Date(e[0])
                                    : t === RegExp
                                        ? callRegExpConstructor(e)
                                        : t === Number
                                            ? 0 === e.length
                                                ? new Number()
                                                : new Number(e[0])
                                            : t === Boolean
                                                ? 0 === e.length
                                                    ? new Boolean()
                                                    : new Boolean(e[0])
                                                : t === Uint8Array
                                                    ? new Uint8Array(e[0])
                                                    : t === String
                                                        ? new String(e[0] || '')
                                                        : (((r = function () {
                                                            return t.apply(this, e)
                                                        }).prototype = t.prototype),
                                                            new r())
                        },
                        ret = function (t) {
                            return t.evalStack.clear(), (t.exitIp = t.ip)
                        },
                        throwErr = function (t, e) {
                            return (t.error = e), (t.paused = !0)
                        },
                        debug = function debug() {
                            eval('debugger;')
                        },
                        o2
                    module.exports = opcodes
                }.call(this))
            },
            function (t, e) {
                t.exports = function (t, e) {
                    ; (this.__proto__ = Object.create(RegExp.prototype)),
                        Object.defineProperties(this, {
                            global: { value: t.global },
                            ignoreCase: { value: t.ignoreCase },
                            multiline: { value: t.multiline },
                            source: { value: t.source },
                            hasIndices: { value: t.hasIndices },
                            dotAll: { value: t.dotAll },
                            flags: { value: t.flags },
                            sticky: { value: t.sticky },
                            unicode: { value: t.unicode }
                        })
                }
            },
            function (t, e, r) {
                var n, o
                    ; (o = r(15)),
                        ((n = function () { }).prototype.zip = function (t) {
                            return o.encode(t)
                        }),
                        (n.prototype.unzip = function (t) {
                            return o.decode(t)
                        }),
                        (t.exports = n)
            },
            function (t, e) {
                function r(t, e) {
                    ; (null == e || e > t.length) && (e = t.length)
                    for (var r = 0, n = new Array(e); r < e; r++) n[r] = t[r]
                    return n
                }
                ; (t.exports.encode = function (t) {
                    try {
                        var e,
                            r = {},
                            n = [],
                            o = t[0],
                            i = 57344
                        t = (t + '').split('')
                        for (var a = 1; a < t.length; a++)
                            null != r[o + (e = t[a])] && o + e !== 'toString'
                                ? (o += e)
                                : (n.push(1 < o.length ? r[o] : o.codePointAt(0)),
                                    (r[o + e] = i),
                                    i++,
                                    (o = e))
                        return (
                            n.push(1 < o.length ? r[o] : o.codePointAt(0)),
                            n
                                .map(function (t) {
                                    return String.fromCodePoint(t)
                                })
                                .join('')
                        )
                    } catch (s) {
                        throw new Error(s)
                    }
                }),
                    (t.exports.decode = function (t) {
                        try {
                            for (
                                var e = (function (t) {
                                    return (
                                        (function (t) {
                                            if (Array.isArray(t)) return r(t)
                                        })(t) ||
                                        (function (t) {
                                            if (
                                                ('undefined' != typeof Symbol &&
                                                    null != t[Symbol.iterator]) ||
                                                null != t['@@iterator']
                                            )
                                                return Array.from(t)
                                        })(t) ||
                                        (function (t, e) {
                                            if (t) {
                                                if ('string' == typeof t) return r(t, e)
                                                var n = Object.prototype.toString.call(t).slice(8, -1)
                                                return 'Map' ===
                                                    (n =
                                                        'Object' === n && t.constructor
                                                            ? t.constructor.name
                                                            : n) || 'Set' === n
                                                    ? Array.from(t)
                                                    : 'Arguments' === n ||
                                                        /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)
                                                        ? r(t, e)
                                                        : void 0
                                            }
                                        })(t) ||
                                        (function () {
                                            throw new TypeError(
                                                'Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.'
                                            )
                                        })()
                                    )
                                })(t).map(function (t) {
                                    return t.codePointAt(0)
                                }),
                                n = {},
                                o = String.fromCodePoint(e[0]),
                                i = o,
                                a = [o],
                                s = 57344,
                                c = 1;
                                c < e.length;
                                c++
                            ) {
                                var u,
                                    l = e[c]
                                    ; (a += u =
                                        l < 57344 ? String.fromCodePoint(e[c]) : n[l] || i + o),
                                        (o = u[0]),
                                        (n[s] = i + o),
                                        s++,
                                        (i = u)
                            }
                            return a
                        } catch (p) {
                            throw new Error(p)
                        }
                    })
            },
            function (t, e) {
                var r, n
                    ; (n = function (t, e, r, n) {
                        for (var o, i, a, s, c, u, l, p, f, h, d = 0, m = 147, _ = 42; ;) {
                            switch (_) {
                                case 236 ^ d:
                                    ; (d = 121), (_ &= 151)
                                    continue
                                case 42:
                                    ; (d = 97), (_ |= 47)
                                    continue
                                case 13:
                                    ; (d = 152), (_ -= 8)
                                    continue
                                case 80 ^ d:
                                    if (29 < (30 ^ d) % 35)
                                        for (var y = 0, g = 90; ;) {
                                            switch (g) {
                                                case 59 ^ y:
                                                    ; (y = 129), (g |= 21)
                                                    continue
                                                case -84 ^ y:
                                                    ; (c = t[4]), (g -= (y ^ m) % 11)
                                                    continue
                                                case 188:
                                                    ; (y = 168), (g -= 63)
                                                    continue
                                                case 187 ^ y:
                                                    ; (y = 155), (g ^= 29)
                                                    continue
                                                case 212 ^ y:
                                                    ; (33 ^ y) % 37 < 17 && (i = t[1]), (g -= 27)
                                                    continue
                                                case 180 ^ y:
                                                    ; (y = 41), (g -= 151)
                                                    continue
                                                case -12 ^ y:
                                                    ; (y = 54), (g &= 25)
                                                    continue
                                                case -46 ^ y:
                                                    13 < (44 ^ y) % 30 && (u = t[5]), (g += 7 | y)
                                                    continue
                                                case 213 ^ y:
                                                    ; (s = t[3]), (g &= ('31' ^ y) % 31)
                                                    continue
                                                case -80:
                                                    g |= 3
                                                    continue
                                                case 131 ^ y:
                                                    ; (y = 71), (g -= 46)
                                                    continue
                                                case -72 ^ y:
                                                    for (; (31 ^ y) % 4 < 3;) {
                                                        l = t[6]
                                                        break
                                                    }
                                                    g -= 11 | y
                                                    continue
                                                case 188 ^ y:
                                                    1 < (33 ^ y) % 7 && (a = t[2]), (g ^= 19 | y)
                                                    continue
                                                case 90:
                                                    ; (y = 107), (g ^= 2)
                                                    continue
                                                case 17:
                                                    for (; (33 ^ y) % 31 < 28;) {
                                                        p = t[7]
                                                        break
                                                    }
                                                    g |= (y ^ m) % 24
                                                    continue
                                                case 51 ^ y:
                                                    ; (o = t[0]), (g ^= (y ^ m) % 15)
                                                    continue
                                                case -6:
                                                    g |= 15
                                                    continue
                                                case -133:
                                                    ; (y = 171), (g ^= 2)
                                                    continue
                                            }
                                            break
                                        }
                                    _ -= (d ^ m) % 11
                                    continue
                                case 78 ^ d:
                                    for (; 3 < (45 ^ d) % 14;) {
                                        h = 4294967295
                                        break
                                    }
                                    _ -= 3
                                    continue
                                case 125 ^ d:
                                    if ((22 | d) < 132) return t
                                    _ -= 3 | d
                                    continue
                                case 127 ^ d:
                                    for (; 0 < (39 ^ d) % 4;) {
                                        for (f = 0; f < 64; f++)
                                            for (var v = 0, b = 95; ;) {
                                                switch (b) {
                                                    case 183 ^ v:
                                                        ; (v = 152), (b |= 16)
                                                        continue
                                                    case -12:
                                                        b -= 151
                                                        continue
                                                    case 95:
                                                        ; (v = 169), (b -= 47)
                                                        continue
                                                    case -147 ^ v:
                                                        ; (v = 54), (b &= 2)
                                                        continue
                                                    case 31 ^ v:
                                                        if ((30 ^ v) % 12 < 12)
                                                            for (var w, E, O, S, A, R, $, x = 0, k = 34; ;) {
                                                                switch (k) {
                                                                    case 68 ^ x:
                                                                        3 < (34 ^ x) % 5 && (S = (c & u) ^ (~c & l)),
                                                                            (k ^= 151)
                                                                        continue
                                                                    case 18 ^ x:
                                                                        ; (O = N ^ C ^ E), (k |= 4 | x)
                                                                        continue
                                                                    case 69 ^ x:
                                                                        ; (x = 95), (k += 159)
                                                                        continue
                                                                    case 154:
                                                                        k |= 6
                                                                        continue
                                                                    case 34:
                                                                        ; (x = 135), (k -= 2)
                                                                        continue
                                                                    case 467 ^ x:
                                                                        ; ($ = A + R), (k |= ('50' ^ x) % 29)
                                                                        continue
                                                                    case 87 ^ x:
                                                                        ; (x = 168), (k += 44)
                                                                        continue
                                                                    case 158 ^ x:
                                                                        ; (x = 60), (k += 16)
                                                                        continue
                                                                    case 233 ^ x:
                                                                        ; -1 < (27 ^ x) % 22 && (R = r[f] + n[f]),
                                                                            (k ^= 12 | x)
                                                                        continue
                                                                    case 211 ^ x:
                                                                        ; (x = 66), (k |= 7)
                                                                        continue
                                                                    case 2 ^ x:
                                                                        ; (x = 74), (k &= 15)
                                                                        continue
                                                                    case 158:
                                                                        ; (E = D | w), (k &= 62)
                                                                        continue
                                                                    case 84 ^ x:
                                                                        0 < (36 ^ x) % 33 && (A = p + O + S),
                                                                            (k -= (x ^ m) % 4)
                                                                        continue
                                                                    case 167 ^ x:
                                                                        for (; 2 < (41 ^ x) % 24;) {
                                                                            w = c << 7
                                                                            break
                                                                        }
                                                                        k |= 18 | x
                                                                        continue
                                                                    case 159:
                                                                        k &= 54
                                                                        continue
                                                                    case 48 ^ x:
                                                                        ; (x = 128), (k -= 29)
                                                                        continue
                                                                }
                                                                break
                                                            }
                                                        b -= 59
                                                        continue
                                                    case 153 ^ v:
                                                        if ((22 ^ v) % 19 < 3)
                                                            for (var P, T, N, I, L, C, D, M = 0, j = 92; ;) {
                                                                switch (j) {
                                                                    case 88 ^ M:
                                                                        ; (P = c >>> 6), (j -= 31)
                                                                        continue
                                                                    case 4:
                                                                        ; (M = 137), (j |= 2)
                                                                        continue
                                                                    case 60 ^ M:
                                                                        10 < (24 ^ M) % 25 && (T = c << 26), (j &= 6)
                                                                        continue
                                                                    case 134 ^ M:
                                                                        ; (D = c >>> 25), (j ^= ('21' ^ M) % 34)
                                                                        continue
                                                                    case 74 ^ M:
                                                                        ; (64 ^ M) % 21 < 11 && (C = I | L),
                                                                            (j |= 17 | M)
                                                                        continue
                                                                    case 63 ^ M:
                                                                        ; (M = 145), (j |= 1)
                                                                        continue
                                                                    case 92:
                                                                        ; (M = 147), (j ^= 151)
                                                                        continue
                                                                    case 100 ^ M:
                                                                        ; (I = c >>> 11), (j ^= (M ^ m) % 18)
                                                                        continue
                                                                    case 147 ^ M:
                                                                        for (; ;) {
                                                                            M = 91
                                                                            break
                                                                        }
                                                                        j |= 47
                                                                        continue
                                                                    case 123 ^ M:
                                                                        ; (M = 115), (j ^= 9)
                                                                        continue
                                                                    case 105 ^ M:
                                                                        17 < (62 ^ M) % 33 && (L = c << 21),
                                                                            (j ^= (M ^ m) % 20)
                                                                        continue
                                                                    case 102 ^ M:
                                                                        ; (M = 73), (j -= 29)
                                                                        continue
                                                                    case 59:
                                                                        j ^= 2
                                                                        continue
                                                                    case 6:
                                                                        j |= 29
                                                                        continue
                                                                    case 150 ^ M:
                                                                        ; (N = P | T), (j &= 58)
                                                                        continue
                                                                    case 8 ^ M:
                                                                        ; (M = 132), (j &= 2)
                                                                        continue
                                                                }
                                                                break
                                                            }
                                                        b &= 9 | v
                                                        continue
                                                    case 54 ^ v:
                                                        for (; (60 ^ v) % 7 < 8;) {
                                                            for (var F, U, V, H, q, K, B, Y = 0, W = 48; ;) {
                                                                switch (W) {
                                                                    case 68:
                                                                        ; (q = o & i), (W ^= 63)
                                                                        continue
                                                                    case 52:
                                                                        ; (36 ^ Y) % 3 < 4 &&
                                                                            (V = (o >>> 22) | (o << 10)),
                                                                            (W |= 155)
                                                                        continue
                                                                    case 48:
                                                                        ; (Y = 76), (W |= 41)
                                                                        continue
                                                                    case 186:
                                                                        ; (H = F ^ U ^ V), (W -= 3 | Y)
                                                                        continue
                                                                    case 112 ^ Y:
                                                                        ; (Y = 147), (W ^= 1)
                                                                        continue
                                                                    case 117 ^ Y:
                                                                        for (; (64 ^ Y) % 15 < 14;) {
                                                                            F = (o >>> 2) | (o << 30)
                                                                            break
                                                                        }
                                                                        W ^= ('36' ^ Y) % 11
                                                                        continue
                                                                    case 37 ^ Y:
                                                                        ; (K = o & a), (W -= (Y ^ m) % 37)
                                                                        continue
                                                                    case 44 ^ Y:
                                                                        ; (Y = 80), (W -= 6)
                                                                        continue
                                                                    case 172 ^ Y:
                                                                        ; (Y = 48), (W -= 11)
                                                                        continue
                                                                    case 93:
                                                                        ; (Y = 87), (W ^= 25)
                                                                        continue
                                                                    case 59:
                                                                        W |= 20
                                                                        continue
                                                                    case 107:
                                                                        ; (Y = 140), (W |= 7)
                                                                        continue
                                                                    case 174 ^ Y:
                                                                        2 < (24 ^ Y) % 15 &&
                                                                            (U = (o >>> 13) | (o << 19)),
                                                                            (W ^= ('50' ^ Y) % 31)
                                                                        continue
                                                                    case 95:
                                                                        W -= 2
                                                                        continue
                                                                    case 143 ^ Y:
                                                                        ; (Y = 89), (W -= 5)
                                                                        continue
                                                                    case 111:
                                                                        ; (B = i & a), (W &= 63)
                                                                        continue
                                                                }
                                                                break
                                                            }
                                                            break
                                                        }
                                                        b |= ('39' ^ v) % 19
                                                        continue
                                                    case 107 ^ v:
                                                        for (var z = 0, Q = 70; ;) {
                                                            switch (Q) {
                                                                case -115 ^ z:
                                                                    ; (34 ^ z) % 30 < 30 && (s = a), (Q -= 61)
                                                                    continue
                                                                case -169 ^ z:
                                                                    ; (z = 54), (Q ^= 6)
                                                                    continue
                                                                case -62 ^ z:
                                                                    ; (z = 100), (Q |= 39)
                                                                    continue
                                                                case -142 ^ z:
                                                                    ; (z = 123), (Q |= 6)
                                                                    continue
                                                                case -146 ^ z:
                                                                    ; (30 ^ z) % 14 < 7 && (c = (s + $) & h), (Q ^= 28)
                                                                    continue
                                                                case -213 ^ z:
                                                                    1 < (26 ^ z) % 38 && (o = ($ + G) & h), (Q ^= 55)
                                                                    continue
                                                                case -37 ^ z:
                                                                    ; (10 | z) < 112 && (a = i), (Q -= 155)
                                                                    continue
                                                                case -174 ^ z:
                                                                    7 < (31 ^ z) % 15 && (i = o), (Q -= (z ^ m) % 11)
                                                                    continue
                                                                case 70:
                                                                    Q |= 63
                                                                    continue
                                                                case 127:
                                                                    ; (z = 130), (Q -= 147)
                                                                    continue
                                                                case -192 ^ z:
                                                                    ; (z = 76), (Q -= 6)
                                                                    continue
                                                            }
                                                            break
                                                        }
                                                        b += (v ^ m) % 21
                                                        continue
                                                    case 137 ^ v:
                                                        ; (v = 48), (b += 15)
                                                        continue
                                                    case 248 ^ v:
                                                        for (var J, G, X = 0, Z = 47; ;) {
                                                            switch (Z) {
                                                                case 117 ^ X:
                                                                    19 < (38 ^ X) % 38 && (J = q ^ K ^ B),
                                                                        (Z ^= 19 | X)
                                                                    continue
                                                                case 36:
                                                                    Z -= 147
                                                                    continue
                                                                case -72 ^ X:
                                                                    ; (X = 111), (Z &= 0)
                                                                    continue
                                                                case 47:
                                                                    ; (X = 69), (Z ^= 31)
                                                                    continue
                                                                case 81:
                                                                    ; (68 ^ X) % 31 < 17 && (G = H + J), (Z -= 13 | X)
                                                                    continue
                                                                case 111 ^ X:
                                                                    ; (15 | X) < 115 && (p = l), (Z -= 25)
                                                                    continue
                                                                case -120 ^ X:
                                                                    ; (X = 92), (Z -= 45)
                                                                    continue
                                                                case 34 ^ X:
                                                                    ; (X = 41), (Z -= 22)
                                                                    continue
                                                                case -26 ^ X:
                                                                    ; (l = u), (Z |= 59)
                                                                    continue
                                                                case -25 ^ X:
                                                                    for (; ;) {
                                                                        X = 167
                                                                        break
                                                                    }
                                                                    Z ^= 3
                                                                    continue
                                                                case -225 ^ X:
                                                                    27 < (25 ^ X) % 32 && (u = c), (Z ^= 155)
                                                                    continue
                                                            }
                                                            break
                                                        }
                                                        b += 55
                                                        continue
                                                    case 39 ^ v:
                                                        ; (v = 84), (b += 155)
                                                        continue
                                                }
                                                break
                                            }
                                        break
                                    }
                                    _ += (d ^ m) % 38
                                    continue
                                case 150 ^ d:
                                    ; (d = 92), (_ &= 12)
                                    continue
                                case 20 ^ d:
                                    ; (d = 160), (_ |= 14)
                                    continue
                                case 95 ^ d:
                                    ; (d = 64), (_ |= 63)
                                    continue
                                case 44:
                                    _ -= 31
                                    continue
                                case 157 ^ d:
                                    for (f = e; f < 64; f++)
                                        for (var tt = 0, et = 29; ;) {
                                            switch (et) {
                                                case -82 ^ tt:
                                                    if ((25 ^ tt) % 19 < 7)
                                                        for (var rt, nt, ot, it, at, st, ct = 0, ut = 68; ;) {
                                                            switch (ut) {
                                                                case 68:
                                                                    ; (ct = 94), (ut += 31)
                                                                    continue
                                                                case 0:
                                                                    ut -= 30
                                                                    continue
                                                                case -178 ^ ct:
                                                                    for (; 15 < (34 ^ ct) % 23;) {
                                                                        at = vt + bt
                                                                        break
                                                                    }
                                                                    ut += (ct ^ m) % 14
                                                                    continue
                                                                case -146 ^ ct:
                                                                    ; (ct = 120), (ut -= 62)
                                                                    continue
                                                                case -46 ^ ct:
                                                                    ; (ct = 63), (ut += 33)
                                                                    continue
                                                                case -145 ^ ct:
                                                                    ; (ct = 59), (ut |= 29)
                                                                    continue
                                                                case -144 ^ ct:
                                                                    ; (ct = 129), (ut ^= 57)
                                                                    continue
                                                                case -62 ^ ct:
                                                                    ; (ct = 143), (ut &= 16)
                                                                    continue
                                                                case 195 ^ ct:
                                                                    ; (nt = n[f - 15] >>> 3), (ut &= (ct ^ m) % 5)
                                                                    continue
                                                                case -167 ^ ct:
                                                                    ; (35 ^ ct) % 21 < 16 && (st = ot + it), (ut ^= 55)
                                                                    continue
                                                                case 16:
                                                                    ut -= 6
                                                                    continue
                                                                case 28 ^ ct:
                                                                    ; (ct = 141), (ut |= 12)
                                                                    continue
                                                                case -192 ^ ct:
                                                                    ; (ct = 145), (ut |= 27)
                                                                    continue
                                                                case -12 ^ ct:
                                                                    for (; (53 ^ ct) % 24 < 13;) {
                                                                        n[f] &= h
                                                                        break
                                                                    }
                                                                    ut &= 17
                                                                    continue
                                                                case 133 ^ ct:
                                                                    ; (37 ^ ct) % 12 < 5 && (it = n[f - 16]),
                                                                        (ut -= 59)
                                                                    continue
                                                                case -60 ^ ct:
                                                                    ; (ot = Ot ^ rt ^ nt), (ut -= (ct ^ m) % 27)
                                                                    continue
                                                                case -55 ^ ct:
                                                                    ; (n[f] = at + st), (ut -= ('41' ^ ct) % 37)
                                                                    continue
                                                                case 61 ^ ct:
                                                                    for (; ;) {
                                                                        rt = St | At
                                                                        break
                                                                    }
                                                                    ut &= 22 | ct
                                                                    continue
                                                            }
                                                            break
                                                        }
                                                    et += 30
                                                    continue
                                                case -70 ^ tt:
                                                    ; (tt = 87), (et |= 41)
                                                    continue
                                                case 143 ^ tt:
                                                    for (; (21 ^ tt) % 10 < 6;) {
                                                        for (
                                                            var lt, pt, ft, ht, dt, mt, _t, yt = 0, gt = 91;
                                                            ;

                                                        ) {
                                                            switch (gt) {
                                                                case 80 ^ yt:
                                                                    ; (yt = 160), (gt -= 147)
                                                                    continue
                                                                case 167 ^ yt:
                                                                    ; (mt = ht | dt), (gt -= ('48' ^ yt) % 12)
                                                                    continue
                                                                case 159:
                                                                    gt += 47
                                                                    continue
                                                                case 42 ^ yt:
                                                                    ; (yt = 90), (gt += 155)
                                                                    continue
                                                                case -163 ^ yt:
                                                                    ; (65 ^ yt) % 4 < 1 && (_t = n[f - 2] >>> 10),
                                                                        (gt ^= ('36' ^ yt) % 27)
                                                                    continue
                                                                case 91:
                                                                    ; (yt = 101), (gt -= 10)
                                                                    continue
                                                                case 34 ^ yt:
                                                                    ; (yt = 164), (gt ^= 21)
                                                                    continue
                                                                case -165 ^ yt:
                                                                    ; (yt = 173), (gt -= 15)
                                                                    continue
                                                                case -41 ^ yt:
                                                                    ; (ft = lt | pt), (gt |= ('46' ^ yt) % 33)
                                                                    continue
                                                                case 54 ^ yt:
                                                                    ; (dt = n[f - 2] << 13), (gt |= (yt ^ m) % 29)
                                                                    continue
                                                                case 176 ^ yt:
                                                                    19 < (32 ^ yt) % 25 && (pt = n[f - 2] << 15),
                                                                        (gt &= ('36' ^ yt) % 29)
                                                                    continue
                                                                case 52 ^ yt:
                                                                    ; (lt = n[f - 2] >>> 17), (gt -= (yt ^ m) % 4)
                                                                    continue
                                                                case -33 ^ yt:
                                                                    ; (yt = 116), (gt &= 159)
                                                                    continue
                                                                case 107 ^ yt:
                                                                    ; (ht = n[f - 2] >>> 19), (gt |= 147)
                                                                    continue
                                                                case 206:
                                                                    gt &= 55
                                                                    continue
                                                                case 114 ^ yt:
                                                                    for (; ;) {
                                                                        yt = 52
                                                                        break
                                                                    }
                                                                    gt &= 3
                                                                    continue
                                                            }
                                                            break
                                                        }
                                                        break
                                                    }
                                                    et += (tt ^ m) % 4
                                                    continue
                                                case 29:
                                                    ; (tt = 144), (et |= 22)
                                                    continue
                                                case 178 ^ tt:
                                                    ; (tt = 99), (et -= 28)
                                                    continue
                                                case -81 ^ tt:
                                                    if ((25 ^ tt) % 16 < 13)
                                                        for (
                                                            var vt, bt, wt, Et, Ot, St, At, Rt = 0, $t = 97;
                                                            ;

                                                        ) {
                                                            switch ($t) {
                                                                case 97:
                                                                    ; (Rt = 136), ($t |= 10)
                                                                    continue
                                                                case 253 ^ Rt:
                                                                    ; (Rt = 119), ($t |= 14)
                                                                    continue
                                                                case 127:
                                                                    ; (bt = n[f - 7]), ($t ^= 22)
                                                                    continue
                                                                case 53 ^ Rt:
                                                                    ; (Rt = 105), ($t ^= 1)
                                                                    continue
                                                                case 254 ^ Rt:
                                                                    ; (vt = ft ^ mt ^ _t), ($t ^= (Rt ^ m) % 24)
                                                                    continue
                                                                case 138 ^ Rt:
                                                                    ; (Rt = 167), ($t &= 23)
                                                                    continue
                                                                case 131 ^ Rt:
                                                                    ; (35 ^ Rt) % 34 < 32 && (Ot = wt | Et),
                                                                        ($t ^= ('32' ^ Rt) % 30)
                                                                    continue
                                                                case -57 ^ Rt:
                                                                    ; (At = n[f - 15] << 14), ($t ^= (Rt ^ m) % 18)
                                                                    continue
                                                                case -166 ^ Rt:
                                                                    ; (Rt = 42), ($t -= 16)
                                                                    continue
                                                                case 107:
                                                                    $t += 11
                                                                    continue
                                                                case 105:
                                                                    $t -= 39
                                                                    continue
                                                                case 38 ^ Rt:
                                                                    ; (Rt = 138), ($t += 29)
                                                                    continue
                                                                case 67:
                                                                    ; (wt = n[f - 15] >>> 7), ($t |= ('43' ^ Rt) % 27)
                                                                    continue
                                                                case 230 ^ Rt:
                                                                    ; (Et = n[f - 15] << 25), ($t |= 11 | Rt)
                                                                    continue
                                                                case 166 ^ Rt:
                                                                    for (; (23 ^ Rt) % 33 < 13;) {
                                                                        St = n[f - 15] >>> 18
                                                                        break
                                                                    }
                                                                    $t -= (Rt ^ m) % 16
                                                                    continue
                                                                case 101 ^ Rt:
                                                                    ; (Rt = 67), ($t ^= 47)
                                                                    continue
                                                            }
                                                            break
                                                        }
                                                    et ^= ('34' ^ tt) % 22
                                                    continue
                                                case 6:
                                                    et -= 58
                                                    continue
                                            }
                                            break
                                        }
                                    _ ^= (d ^ m) % 17
                                    continue
                                case 254 ^ d:
                                    for (; -2 < (31 ^ d) % 4;) {
                                        for (var xt = 0, kt = 96; ;) {
                                            switch (kt) {
                                                case 96:
                                                    ; (xt = 37), (kt += 12)
                                                    continue
                                                case 70 ^ xt:
                                                    for (; (15 | xt) < 99;) {
                                                        t[1] = (t[1] + i) & h
                                                        break
                                                    }
                                                    kt ^= (xt ^ m) % 36
                                                    continue
                                                case -27 ^ xt:
                                                    ; (t[3] = (t[3] + s) & h), (kt -= ('49' ^ xt) % 21)
                                                    continue
                                                case -203 ^ xt:
                                                    ; (xt = 72), (kt |= 31)
                                                    continue
                                                case 68 ^ xt:
                                                    ; (23 ^ xt) % 13 < 10 && (t[7] = (t[7] + p) & h),
                                                        (kt ^= ('37' ^ xt) % 20)
                                                    continue
                                                case 163 ^ xt:
                                                    ; -1 < (47 ^ xt) % 6 && (t[6] = (t[6] + l) & h),
                                                        (kt |= 155)
                                                    continue
                                                case -70 ^ xt:
                                                    9 < (34 ^ xt) % 37 && (t[4] = (t[4] + c) & h),
                                                        (kt ^= 13 | xt)
                                                    continue
                                                case -9 ^ xt:
                                                    27 < (40 ^ xt) % 33 && (t[5] = (t[5] + u) & h), (kt &= 31)
                                                    continue
                                                case 56 ^ xt:
                                                    ; (t[2] = (t[2] + a) & h), (kt -= 31)
                                                    continue
                                                case 187:
                                                    ; (xt = 58), (kt -= 61)
                                                    continue
                                                case -39 ^ xt:
                                                    ; (xt = 147), (kt ^= 151)
                                                    continue
                                                case 74 ^ xt:
                                                    ; (xt = 56), (kt -= 25)
                                                    continue
                                                case 71:
                                                    kt -= 3
                                                    continue
                                                case 31:
                                                    kt += 31
                                                    continue
                                                case 118 ^ xt:
                                                    ; (xt = 147), (kt ^= 14)
                                                    continue
                                                case -12 ^ xt:
                                                    ; (xt = 130), (kt -= 47)
                                                    continue
                                                case 97 ^ xt:
                                                    ; (xt = 83), (kt -= 47)
                                                    continue
                                                case 73 ^ xt:
                                                    ; (t[0] = (t[0] + o) & h), (kt -= 4 | xt)
                                                    continue
                                            }
                                            break
                                        }
                                        break
                                    }
                                    _ -= ('38' ^ d) % 29
                                    continue
                            }
                            break
                        }
                    }),
                        ((r = function () { }).prototype.register = function () {
                            Object.defineProperty(Object, 'jmpOnw_sxw', {
                                writable: !0,
                                configurable: !0,
                                value: n
                            })
                        }),
                        (t.exports = r)
            }
        ])
    }
    // console.log('传入参数: ', data)
    return new Promise((resolve, reject) => {
        Jose.realm.global.$encode(data, {
            suc: function (e, r) {
                resolve(e)
            },
            err: function (t) {
                resolve(e)
            }
        })
    })

}

function getSig3Str(url, options) {


    var __defProp = Object.defineProperty,
        __defProps = Object.defineProperties,
        __getOwnPropDescs = Object.getOwnPropertyDescriptors,
        __getOwnPropSymbols = Object.getOwnPropertySymbols,
        __hasOwnProp = Object.prototype.hasOwnProperty,
        __propIsEnum = Object.prototype.propertyIsEnumerable,
        __defNormalProp = (t, e, r) =>
            e in t
                ? __defProp(t, e, {
                    enumerable: !0,
                    configurable: !0,
                    writable: !0,
                    value: r
                })
                : (t[e] = r),
        __spreadValues = (t, e) => {
            for (var r in e || (e = {}))
                __hasOwnProp.call(e, r) && __defNormalProp(t, r, e[r])
            if (__getOwnPropSymbols)
                for (var r of __getOwnPropSymbols(e))
                    __propIsEnum.call(e, r) && __defNormalProp(t, r, e[r])
            return t
        },
        __spreadProps = (t, e) => __defProps(t, __getOwnPropDescs(e)),
        __publicField = (t, e, r) => (
            __defNormalProp(t, 'symbol' != typeof e ? e + '' : e, r), r
        ),
        __async = (t, e, r) =>
            new Promise((n, o) => {
                var i = t => {
                    try {
                        s(r.next(t))
                    } catch (e) {
                        o(e)
                    }
                },
                    a = t => {
                        try {
                            s(r.throw(t))
                        } catch (e) {
                            o(e)
                        }
                    },
                    s = t => (t.done ? n(t.value) : Promise.resolve(t.value).then(i, a))
                s((r = r.apply(t, e)).next())
            }),
        _a,
        _b,
        _c,
        _d,
        _e,
        _f,
        _g,
        _h,
        _i,
        _j,
        _k,
        _l

    const
        sigCatVer = 1,
        ignoreKey = '__NS',
        cookieWhiteList = [
            'kpn',
            'kpf',
            'userId',
            'did',
            'c',
            'appver',
            'language',
            'mod',
            'did_tag',
            'egid',
            'oDid',
            'androidApiLevel',
            'newOc',
            'browseType',
            'socName',
            'ftt',
            'abi',
            'userRecoBit',
            'device_abi',
            'grant_browse_type',
            'iuid',
            'rdid'
        ]

    function getCookie(cookie) {
        var t
        return (null != (t = cookie.split(';')) ? t : [])
            .map(t => {
                const e = t.split('=')
                return [e[0].trim(), e.slice(1).join('=').trim()]
            })
            .filter(t => cookieWhiteList.includes(t[0]) && !!t[1])
            .reduce((t, e) => ((t[e[0]] = e[1]), t), {})
    }


    function isGetMethod(t) {
        return ['get', 'options', 'head'].includes(t.toLowerCase())
    }
    function makeString(t) {
        return Object.keys(t)
            .reduce(
                (e, r) => (r.startsWith(ignoreKey) || e.push(`${r}=${t[r]}`), e),
                []
            )
            .sort((t, e) => (t === e ? 0 : t < e ? -1 : 1))
            .join('')
    }



    function getRequestString(cookie, t = {}, e = null, r = 'get', n = 'json') {
        const o = getCookie(cookie)
        let i = __spreadValues(__spreadValues({ sigCatVer: sigCatVer }, o), t)
        if ('json' === n) {
            if (isGetMethod(r))
                return (i = __spreadValues(__spreadValues({}, i), e)), makeString(i)
            const t = e ? ('string' == typeof e ? e : JSON.stringify(e)) : ''
            return `${makeString(i)}${t}`
        }
        return (
            'form' === n && (i = __spreadValues(__spreadValues({}, i), e)),
            makeString(i)
        )
    }

    class SearchParams {
        constructor(t) {
            __publicField(this, '_entries', new Map())
            const e = (t.startsWith('?') ? t.substr(1) : t).split('&')
            for (const r of e) {
                const [t, e] = r.split('=')
                t &&
                    this._entries.set(
                        this.serializeParam(t),
                        this.serializeParam(null != e ? e : '')
                    )
            }
        }
        serializeParam(t) {
            return encodeURIComponent(t).replace(/%20/g, '+')
        }
        delete(t) {
            this._entries.delete(this.serializeParam(t))
        }
        append(t, e) {
            this._entries.set(
                this.serializeParam(t),
                this.serializeParam(null != e ? e : '')
            )
        }
        toString() {
            const t = [...this._entries.entries()]
            if (!t.length) return ''
            const e = t.reduce((t, e) => (t.push(`${e[0]}=${e[1]}`), t), [])
            return `${e.length ? '?' : ''}${e.join('&')}`
        }
        entries() {
            return [...this._entries.entries()].reduce((t, e) => {
                const [r, n] = e
                return (t[r] = n), t
            }, {})
        }
    }

    class BaseUrl {
        constructor(t) {
            __publicField(this, 'protocol', ''),
                __publicField(this, 'hostname', ''),
                __publicField(this, 'port', ''),
                __publicField(this, 'pathname', ''),
                __publicField(this, 'hash', ''),
                __publicField(this, 'searchParams', new SearchParams('')),
                this.parseUrl(t)
        }
        get search() {
            var t
            return (null == (t = this.searchParams) ? void 0 : t.toString()) || ''
        }
        get path() {
            return this.pathname + this.search
        }
        get host() {
            return this.port ? `${this.hostname}:${this.port}` : this.hostname
        }
        get href() {
            const t = this.host ? `//${this.host}` : '',
                e = `${this.pathname && !this.pathname.startsWith('/') ? '/' : ''}${this.pathname
                    }`
            return this.protocol + t + e + this.search + this.hash
        }
        parseUrl(t) {
            let e = t.trim()
            const r = /^([a-z0-9.+-]+:)\/\//i.exec(e)
            r && ((this.protocol = r[1].toLowerCase()), (e = e.substr(r[0].length)))
            const n = e.indexOf('#')
                ; -1 !== n && ((this.hash = e.substr(n)), (e = e.slice(0, n)))
            const o = e.indexOf('?')
                ; -1 !== o &&
                    ((this.searchParams = new SearchParams(e.substr(o))), (e = e.slice(0, o)))
            const i = e.split(/[/?#]/g),
                a = i.length ? i[0] : '',
                s = e.replace(a, '')
            this.pathname = s
            const c = /:([0-9]*)$/.exec(a)
            c && (this.port = c[1])
            const u = c ? a.length - c[0].length : a.length
            this.hostname = a.substr(0, u)
        }
    }

    function getUrlSearchParams(t = window.location.href) {
        return new BaseUrl(t).searchParams.entries()
    }

    function getRequestInfo(t, e) {
        var r, n, o, i, a
        let s = '/',
            c = 'GET',
            u = null
        return void 0 === e
            ? ('string' == typeof t
                ? (s = t)
                : t instanceof Request &&
                ((s = t.url),
                    (c = (null != (r = t.method) ? r : 'GET').toUpperCase()),
                    isGetMethod(c) || (u = t.body)),
                { url: s, method: c, query: getUrlSearchParams(s), data: u })
            : ('string' == typeof t
                ? ((s = t), (c = (null != (n = e.method) ? n : 'GET').toUpperCase()))
                : t instanceof Request &&
                ((s = null != (o = t.url) ? o : '/'),
                    (c = (
                        null != (a = null != (i = e.method) ? i : t.method) ? a : 'GET'
                    ).toUpperCase())),
                isGetMethod(c) || (u = e.body),
                { url: s, method: c, query: getUrlSearchParams(s), data: u })
    }


    let info = getRequestInfo(url, options)
    let requestType = 'json'
    return getRequestString(options.cookie, info.query, info.data, info.method, requestType)
}
