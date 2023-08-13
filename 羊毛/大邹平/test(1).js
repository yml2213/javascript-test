



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


let cookie = 'kpn=NEBULA; kpf=ANDROID_PHONE; userId=55077737; did=ANDROID_895dc8228456d484; c=XIAOMI; ver=11.4; appver=11.4.40.5686; language=zh-cn; countryCode=CN; sys=ANDROID_12; mod=Xiaomi%28M2102J2SC%29; deviceName=Xiaomi%28M2102J2SC%29; earphoneMode=1; isp=CUCC; ud=55077737; did_tag=0; egid=DFP6CDFB68C444FCC5267800EDB82A7E9EBC70DE183508C5779A45284786FCD0; thermal=10000; kcv=1507; app=0; bottom_navigation=true; oDid=ANDROID_8845bd91dbb06981; android_os=0; boardPlatform=kona; newOc=XIAOMI; androidApiLevel=31; slh=0; country_code=cn; nbh=44; hotfix_ver=; did_gt=1689077658660; keyconfig_state=2; cdid_tag=5; max_memory=256; oc=XIAOMI; sh=2340; deviceBit=0; browseType=3; ddpi=440; socName=Qualcomm+Snapdragon+8250; is_background=0; sw=1080; ftt=; apptype=22; abi=arm64; cl=0; userRecoBit=0; device_abi=arm64; totalMemory=11598; grant_browse_type=AUTHORIZED; iuid=; rdid=ANDROID_429e96b22fcf2bf5; sbh=90; darkMode=false; kuaishou.api_st=Cg9rdWFpc2hvdS5hcGkuc3QSoAESOtiZGX5nEzc9ETEYT45qO0H3LO7Gm9QDsivEzEkvryXu0ulEO4DhcNN_k80F7R7BzWDzCDcbpoFf1Nupk5zK3F_PIhBG9SW1Ct0yEeOWn3lT-PDtmaenEnJN1HMEzsFOHOmYdnRyRZhjcsR-kkROry0n3H3-BHBrhh10JfGY8_jJB2f2Nejw8JL4rWrdOB9MTW3RPOUJEW0n3vVyTNRpGhLbpnOX2M1IRKpGGeQvLfAmAo8iIFFxNLCy5f4p46deW1xxn63u5ANpyFRDBvh1iZWLmS1RKAUwAQ; token=Cg9rdWFpc2hvdS5hcGkuc3QSoAESOtiZGX5nEzc9ETEYT45qO0H3LO7Gm9QDsivEzEkvryXu0ulEO4DhcNN_k80F7R7BzWDzCDcbpoFf1Nupk5zK3F_PIhBG9SW1Ct0yEeOWn3lT-PDtmaenEnJN1HMEzsFOHOmYdnRyRZhjcsR-kkROry0n3H3-BHBrhh10JfGY8_jJB2f2Nejw8JL4rWrdOB9MTW3RPOUJEW0n3vVyTNRpGhLbpnOX2M1IRKpGGeQvLfAmAo8iIFFxNLCy5f4p46deW1xxn63u5ANpyFRDBvh1iZWLmS1RKAUwAQ; __NSWJ=; client_key=2ac2a76d; kuaishou.h5_st=Cg5rdWFpc2hvdS5oNS5zdBKgAV8FuIA9Fl9LmnPXAMq-FDHP5uNLkZrF-lTpa2TlXZ85iLzYzFMjPnM0tg0e_uz7095pNKmAIigtQYYktyELUr2vRSq1GZhO_cPTZJXOLFeMjQwKjN-08V8AIFsrp5oIG882Yvwsbfrg-3_Q5xCtvxfWJK9eAwAVnw_5JcMIiLLNkQSD27AvP4Bw1PXiZRdi7rXZOtSFJ5IShkKKveFBXk8aEvawlwd7NjDrfWCq1CR0LOvKaSIg2AP45TnmfYOsporlDS5R-UF4Sq56CwsFvh5-rOVSJGgoBTAB; net=WIFI; sid=856d643e-5185-4317-9c11-aa51b5cd4e01; cold_launch_time_ms=1690559232918'


const options = {
  method: 'post',
  body: { "taskIds": "[17590]", "subBizId": 3377 },
  cookie: cookie

}
let url = "https://encourage.kuaishou.com/rest/wd/zt/task/status?sigCatVer=1"


let result = getSig3Str(url, options)
console.log(result)



