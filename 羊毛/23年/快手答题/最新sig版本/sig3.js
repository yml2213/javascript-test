
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




function getSig3Str(url, options) {
    let info = getRequestInfo(url, options)
    let requestType = 'json'
    return getRequestString(options.cookie, info.query, info.data, info.method, requestType)
}








let cookie = '__NSWJ=; apptype=2; appver=11.8.40.3263; bottom_navigation=1; browseType=3; c=a; cdidTag=0; cdid_tag=0; cl=0; client_key=63b2bdd7; countryCode=cn; country_code=cn; cs=false; darkMode=false; deviceBit=0; did=1903E4C4-A360-489B-9BE5-2180C7782552; didTag=0; did_tag=0; egid=DFP98BCA0EFF7CA0B3192083B3FBFE87B63DBC4942D55D5A569BFD2427B71ACD; foreign=0; ftt=; gid=; global_id=DFP47EDBDB7290F505EC263D0EA688871790343B103863D9666BB3C8C5DC7E37; grant_browse_type=AUTHORIZED; isp=CMCC; kpf=IPHONE; kpn=NEBULA; kuaishou.api_st=Cg9rdWFpc2hvdS5hcGkuc3QSoAH902SRmXgVrhQJWzCWqutg3YFlHYRkB5OT7ne_xDKYdAZLqgiGF98UzFBnViAwbRoUJR29vDkCHbRmB3h9ma0894w2wtzLszxBUHVAsBxGLb-sdfRBXt0MuZpFOMaGcTViyDQafeoN-CPtawWwOwzwtXZkMKShzkeKgpAHfMILXgOnPCOgbRjRBs7cOvLR5b-rcF6_hdHCdov9JbcWt9jAGhJQViwWWuREjLU9a7lIv7onMn4iILB6trLgJXOhbN_HOVB0Pl6IOoApSHNe4wTCFm2YH01aKAUwAQ; kuaishou.h5_st=Cg5rdWFpc2hvdS5oNS5zdBKgAZZwki4RzHNHoLGAQqYx8nnNfgAtoMS76BWpJuSerqGzyOriTzfONu2U7CgGLU2X5mejIRyKmgyq3nxcpqAibFYup1B6_Kityr-eR5JPzvOv9-yX9ASr4clAaLEu81uzAV2P3Ocl_m--xtpeoCuClXjmHaWzLXFNnTBusw_codUYprpXJihpGP479XZ0yvdFeEYf3pp31Sl6Sb5TbULVe-saEo3k5KRX4ULYkpGR6pyhS_hpIyIg_N2tfp5Ef_EQfvuNveIPtcyK02VYBQ7gOxwx7A5BsJYoBTAB; kuaishou.sixin.login_st=ChdrdWFpc2hvdS5zaXhpbi5sb2dpbi5zdBKgAUm1x6mlOJrN6E_SX3KhAGrQTFV2x2sAB3VRMONCqQ9GVuFkIL900-rZ3qq4vIaStqrb3ZrKemmSz6UVpn48518ft1TbPsU2QE6VDMfTGQyEXFupAy5cqd7KtUldWX2zAFS4ch4_Hx85CmRbbGu4mx3yOW4Fadvg5zJvyFcypLu0YwQKSfq2lqdlD2ZhcO6hTqcCE3boea73X0GFC1tBKTcaEv1KYUZGn0_VuhTGIhsynqd7ISIgs39dQV5A4HPSybGJALQEIa8LiDogdaQ9KM60XJNrGaMoBTAB; language=zh-Hans-CN%3Bq%3D1%2C%20en-CN%3Bq%3D0.9; lat=; lkvr=; ll=; ll_client_time=0; lon=; mcc=46002; mod=iPhone12%2C1; net=WIFI; oDid=; odid=; os=15.3; power_mode=0; randomDid=1903E4C4-A360-489B-9BE5-2180C7782552; rdid=1903E4C4-A360-489B-9BE5-2180C7782552; session_id=861C16AD-9CD6-4DA3-AE5E-0CD3F0F82D20; sh=1792; sid=861C16AD-9CD6-4DA3-AE5E-0CD3F0F82D20; sw=828; sys=iOS_15.3; thermal=10010; token=Cg9rdWFpc2hvdS5hcGkuc3QSoAH902SRmXgVrhQJWzCWqutg3YFlHYRkB5OT7ne_xDKYdAZLqgiGF98UzFBnViAwbRoUJR29vDkCHbRmB3h9ma0894w2wtzLszxBUHVAsBxGLb-sdfRBXt0MuZpFOMaGcTViyDQafeoN-CPtawWwOwzwtXZkMKShzkeKgpAHfMILXgOnPCOgbRjRBs7cOvLR5b-rcF6_hdHCdov9JbcWt9jAGhJQViwWWuREjLU9a7lIv7onMn4iILB6trLgJXOhbN_HOVB0Pl6IOoApSHNe4wTCFm2YH01aKAUwAQ; uQaTag=0%23; ud=2867931891; urlencode_mod=iPhone12%252C1; userId=2867931891; userRecoBit=0; ver=11.8; videoModelCrowdTag=1_100; weblogger_switch='







async function main() {
    const options = {
        method: 'post',
        body: {
            "roundId": "wYSnflALV_BuR7yAQRdkr1AMxgQDnXoW",
            "index": 0,
            "answer": 1
        },
        cookie: cookie

    }
    let url = "URL: https://encourage.kuaishou.com/rest/n/encourage/game/quiz/round/answer/upload?__NS_sig3=8898dfef1b2c22c85fd45cd7d0d128dfb56897ae32da41ca33d4c7c7c1c1c2c3fcdc&sigCatVer=1"


    let result = getSig3Str(url, options)
    console.log(result)
   
}

main()



