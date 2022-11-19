var end_sign = '';

import underscore from "underscore"


function MD5Encrypt(a){function b(a,b){return a<<b|a>>>32-b}function c(a,b){var c,d,e,f,g;return e=2147483648&a,f=2147483648&b,c=1073741824&a,d=1073741824&b,g=(1073741823&a)+(1073741823&b),c&d?2147483648^g^e^f:c|d?1073741824&g?3221225472^g^e^f:1073741824^g^e^f:g^e^f}function d(a,b,c){return a&b|~a&c}function e(a,b,c){return a&c|b&~c}function f(a,b,c){return a^b^c}function g(a,b,c){return b^(a|~c)}function h(a,e,f,g,h,i,j){return a=c(a,c(c(d(e,f,g),h),j)),c(b(a,i),e)}function i(a,d,f,g,h,i,j){return a=c(a,c(c(e(d,f,g),h),j)),c(b(a,i),d)}function j(a,d,e,g,h,i,j){return a=c(a,c(c(f(d,e,g),h),j)),c(b(a,i),d)}function k(a,d,e,f,h,i,j){return a=c(a,c(c(g(d,e,f),h),j)),c(b(a,i),d)}function l(a){for(var b,c=a.length,d=c+8,e=(d-d%64)/64,f=16*(e+1),g=new Array(f-1),h=0,i=0;c>i;)b=(i-i%4)/4,h=i%4*8,g[b]=g[b]|a.charCodeAt(i)<<h,i++;return b=(i-i%4)/4,h=i%4*8,g[b]=g[b]|128<<h,g[f-2]=c<<3,g[f-1]=c>>>29,g}function m(a){var b,c,d="",e="";for(c=0;3>=c;c++)b=a>>>8*c&255,e="0"+b.toString(16),d+=e.substr(e.length-2,2);return d}function n(a){a=a.replace(/\r\n/g,"\n");for(var b="",c=0;c<a.length;c++){var d=a.charCodeAt(c);128>d?b+=String.fromCharCode(d):d>127&&2048>d?(b+=String.fromCharCode(d>>6|192),b+=String.fromCharCode(63&d|128)):(b+=String.fromCharCode(d>>12|224),b+=String.fromCharCode(d>>6&63|128),b+=String.fromCharCode(63&d|128))}return b}var o,p,q,r,s,t,u,v,w,x=[],y=7,z=12,A=17,B=22,C=5,D=9,E=14,F=20,G=4,H=11,I=16,J=23,K=6,L=10,M=15,N=21;for(a=n(a),x=l(a),t=1732584193,u=4023233417,v=2562383102,w=271733878,o=0;o<x.length;o+=16)p=t,q=u,r=v,s=w,t=h(t,u,v,w,x[o+0],y,3614090360),w=h(w,t,u,v,x[o+1],z,3905402710),v=h(v,w,t,u,x[o+2],A,606105819),u=h(u,v,w,t,x[o+3],B,3250441966),t=h(t,u,v,w,x[o+4],y,4118548399),w=h(w,t,u,v,x[o+5],z,1200080426),v=h(v,w,t,u,x[o+6],A,2821735955),u=h(u,v,w,t,x[o+7],B,4249261313),t=h(t,u,v,w,x[o+8],y,1770035416),w=h(w,t,u,v,x[o+9],z,2336552879),v=h(v,w,t,u,x[o+10],A,4294925233),u=h(u,v,w,t,x[o+11],B,2304563134),t=h(t,u,v,w,x[o+12],y,1804603682),w=h(w,t,u,v,x[o+13],z,4254626195),v=h(v,w,t,u,x[o+14],A,2792965006),u=h(u,v,w,t,x[o+15],B,1236535329),t=i(t,u,v,w,x[o+1],C,4129170786),w=i(w,t,u,v,x[o+6],D,3225465664),v=i(v,w,t,u,x[o+11],E,643717713),u=i(u,v,w,t,x[o+0],F,3921069994),t=i(t,u,v,w,x[o+5],C,3593408605),w=i(w,t,u,v,x[o+10],D,38016083),v=i(v,w,t,u,x[o+15],E,3634488961),u=i(u,v,w,t,x[o+4],F,3889429448),t=i(t,u,v,w,x[o+9],C,568446438),w=i(w,t,u,v,x[o+14],D,3275163606),v=i(v,w,t,u,x[o+3],E,4107603335),u=i(u,v,w,t,x[o+8],F,1163531501),t=i(t,u,v,w,x[o+13],C,2850285829),w=i(w,t,u,v,x[o+2],D,4243563512),v=i(v,w,t,u,x[o+7],E,1735328473),u=i(u,v,w,t,x[o+12],F,2368359562),t=j(t,u,v,w,x[o+5],G,4294588738),w=j(w,t,u,v,x[o+8],H,2272392833),v=j(v,w,t,u,x[o+11],I,1839030562),u=j(u,v,w,t,x[o+14],J,4259657740),t=j(t,u,v,w,x[o+1],G,2763975236),w=j(w,t,u,v,x[o+4],H,1272893353),v=j(v,w,t,u,x[o+7],I,4139469664),u=j(u,v,w,t,x[o+10],J,3200236656),t=j(t,u,v,w,x[o+13],G,681279174),w=j(w,t,u,v,x[o+0],H,3936430074),v=j(v,w,t,u,x[o+3],I,3572445317),u=j(u,v,w,t,x[o+6],J,76029189),t=j(t,u,v,w,x[o+9],G,3654602809),w=j(w,t,u,v,x[o+12],H,3873151461),v=j(v,w,t,u,x[o+15],I,530742520),u=j(u,v,w,t,x[o+2],J,3299628645),t=k(t,u,v,w,x[o+0],K,4096336452),w=k(w,t,u,v,x[o+7],L,1126891415),v=k(v,w,t,u,x[o+14],M,2878612391),u=k(u,v,w,t,x[o+5],N,4237533241),t=k(t,u,v,w,x[o+12],K,1700485571),w=k(w,t,u,v,x[o+3],L,2399980690),v=k(v,w,t,u,x[o+10],M,4293915773),u=k(u,v,w,t,x[o+1],N,2240044497),t=k(t,u,v,w,x[o+8],K,1873313359),w=k(w,t,u,v,x[o+15],L,4264355552),v=k(v,w,t,u,x[o+6],M,2734768916),u=k(u,v,w,t,x[o+13],N,1309151649),t=k(t,u,v,w,x[o+4],K,4149444226),w=k(w,t,u,v,x[o+11],L,3174756917),v=k(v,w,t,u,x[o+2],M,718787259),u=k(u,v,w,t,x[o+9],N,3951481745),t=c(t,p),u=c(u,q),v=c(v,r),w=c(w,s);var O=m(t)+m(u)+m(v)+m(w);return O.toLowerCase()}


function i(t, e) {
    var i = (65535 & t) + (65535 & e),
        a = (t >> 16) + (e >> 16) + (i >> 16);
    return a << 16 | 65535 & i
}

function a(t, e) {
    return t << e | t >>> 32 - e
}

function s(t, e, s, n, o, r) {
    return i(a(i(i(e, t), i(n, r)), o), s)
}

function n(t, e, i, a, n, o, r) {
    return s(e & i | ~e & a, t, e, n, o, r)
}

function o(t, e, i, a, n, o, r) {
    return s(e & a | i & ~a, t, e, n, o, r)
}

function r(t, e, i, a, n, o, r) {
    return s(e ^ i ^ a, t, e, n, o, r)
}

function c(t, e, i, a, n, o, r) {
    return s(i ^ (e | ~a), t, e, n, o, r)
}

function l(t, e) {
    var a, s, l, u, d;
    t[e >> 5] |= 128 << e % 32, t[14 + (e + 64 >>> 9 << 4)] = e;
    var f = 1732584193,
        p = -271733879,
        _ = -1732584194,
        g = 271733878;
    for (a = 0; a < t.length; a += 16) s = f, l = p, u = _, d = g, f = n(f, p, _, g, t[a], 7, -680876936), g = n(g, f, p, _, t[a + 1], 12, -389564586), _ = n(_, g, f, p, t[a + 2], 17, 606105819), p = n(p, _, g, f, t[a + 3], 22, -1044525330), f = n(f, p, _, g, t[a + 4], 7, -176418897), g = n(g, f, p, _, t[a + 5], 12, 1200080426), _ = n(_, g, f, p, t[a + 6], 17, -1473231341), p = n(p, _, g, f, t[a + 7], 22, -45705983), f = n(f, p, _, g, t[a + 8], 7, 1770035416), g = n(g, f, p, _, t[a + 9], 12, -1958414417), _ = n(_, g, f, p, t[a + 10], 17, -42063), p = n(p, _, g, f, t[a + 11], 22, -1990404162), f = n(f, p, _, g, t[a + 12], 7, 1804603682), g = n(g, f, p, _, t[a + 13], 12, -40341101), _ = n(_, g, f, p, t[a + 14], 17, -1502002290), p = n(p, _, g, f, t[a + 15], 22, 1236535329), f = o(f, p, _, g, t[a + 1], 5, -165796510), g = o(g, f, p, _, t[a + 6], 9, -1069501632), _ = o(_, g, f, p, t[a + 11], 14, 643717713), p = o(p, _, g, f, t[a], 20, -373897302), f = o(f, p, _, g, t[a + 5], 5, -701558691), g = o(g, f, p, _, t[a + 10], 9, 38016083), _ = o(_, g, f, p, t[a + 15], 14, -660478335), p = o(p, _, g, f, t[a + 4], 20, -405537848), f = o(f, p, _, g, t[a + 9], 5, 568446438), g = o(g, f, p, _, t[a + 14], 9, -1019803690), _ = o(_, g, f, p, t[a + 3], 14, -187363961), p = o(p, _, g, f, t[a + 8], 20, 1163531501), f = o(f, p, _, g, t[a + 13], 5, -1444681467), g = o(g, f, p, _, t[a + 2], 9, -51403784), _ = o(_, g, f, p, t[a + 7], 14, 1735328473), p = o(p, _, g, f, t[a + 12], 20, -1926607734), f = r(f, p, _, g, t[a + 5], 4, -378558), g = r(g, f, p, _, t[a + 8], 11, -2022574463), _ = r(_, g, f, p, t[a + 11], 16, 1839030562), p = r(p, _, g, f, t[a + 14], 23, -35309556), f = r(f, p, _, g, t[a + 1], 4, -1530992060), g = r(g, f, p, _, t[a + 4], 11, 1272893353), _ = r(_, g, f, p, t[a + 7], 16, -155497632), p = r(p, _, g, f, t[a + 10], 23, -1094730640), f = r(f, p, _, g, t[a + 13], 4, 681279174), g = r(g, f, p, _, t[a], 11, -358537222), _ = r(_, g, f, p, t[a + 3], 16, -722521979), p = r(p, _, g, f, t[a + 6], 23, 76029189), f = r(f, p, _, g, t[a + 9], 4, -640364487), g = r(g, f, p, _, t[a + 12], 11, -421815835), _ = r(_, g, f, p, t[a + 15], 16, 530742520), p = r(p, _, g, f, t[a + 2], 23, -995338651), f = c(f, p, _, g, t[a], 6, -198630844), g = c(g, f, p, _, t[a + 7], 10, 1126891415), _ = c(_, g, f, p, t[a + 14], 15, -1416354905), p = c(p, _, g, f, t[a + 5], 21, -57434055), f = c(f, p, _, g, t[a + 12], 6, 1700485571), g = c(g, f, p, _, t[a + 3], 10, -1894986606), _ = c(_, g, f, p, t[a + 10], 15, -1051523), p = c(p, _, g, f, t[a + 1], 21, -2054922799), f = c(f, p, _, g, t[a + 8], 6, 1873313359), g = c(g, f, p, _, t[a + 15], 10, -30611744), _ = c(_, g, f, p, t[a + 6], 15, -1560198380), p = c(p, _, g, f, t[a + 13], 21, 1309151649), f = c(f, p, _, g, t[a + 4], 6, -145523070), g = c(g, f, p, _, t[a + 11], 10, -1120210379), _ = c(_, g, f, p, t[a + 2], 15, 718787259), p = c(p, _, g, f, t[a + 9], 21, -343485551), f = i(f, s), p = i(p, l), _ = i(_, u), g = i(g, d);
    return [f, p, _, g]
}






function u(t) {
    var e, i = "",
        a = 32 * t.length;
    for (e = 0; e < a; e += 8) i += String.fromCharCode(t[e >> 5] >>> e % 32 & 255);
    return i
}

function d(t) {
    var e, i = [];
    for (i[(t.length >> 2) - 1] = void 0, e = 0; e < i.length; e += 1) i[e] = 0;
    var a = 8 * t.length;
    for (e = 0; e < a; e += 8) i[e >> 5] |= (255 & t.charCodeAt(e / 8)) << e % 32;
    return i
}

function f(t) {
    return u(l(d(t), 8 * t.length))
}

function p(t, e) {
    var i, a, s = d(t),
        n = [],
        o = [];
    for (n[15] = o[15] = void 0, s.length > 16 && (s = l(s, 8 * t.length)), i = 0; i < 16; i += 1) n[i] = 909522486 ^ s[i], o[i] = 1549556828 ^ s[i];
    return a = l(n.concat(d(e)), 512 + 8 * e.length), u(l(o.concat(a), 640))
}

function _(t) {
    var e, i, a = "0123456789abcdef",
        s = "";
    for (i = 0; i < t.length; i += 1) e = t.charCodeAt(i), s += a.charAt(e >>> 4 & 15) + a.charAt(15 & e);
    return s
}

function g(t) {
    return unescape(encodeURIComponent(t))
}

function h(t) {
    return f(g(t))
}

function MD5Encrypt(t) {
    console.log("这是md5:" + t)
    return _(h(t))
}


// function md5(t) {
//     console.log("md5:" + t)
//     return _(h(t))
// }

function m(t, e) {
    return p(g(t), g(e))
}

function y(t, e) {
    return _(m(t, e))
}

function w(t, e, i) {
    // console.log(t)
    return e ? i ? m(e, t) : y(e, t) : i ? h(t) : MD5Encrypt(t)
}

function getUrlParam(url, paramName) {
    var i = new RegExp("(^|&)" + paramName + "=([^&]*)(&|$)"),
        a = url.split("?")[1].match(i);
    return null != a ? unescape(a[2]) : null
}

function getQuery(t) {
    var e = [];
    if (-1 != t.indexOf("?"))
        for (var i = t.split("?")[1], a = i.split("&"), s = 0; s < a.length; s++) a[s].split("=")[0] && unescape(a[s].split("=")[1]) && (e[s] = {
            name: a[s].split("=")[0],
            value: unescape(a[s].split("=")[1])
        });
    return e
}

function getSign(url, data, i) {
    var str = "",
        sign = getUrlParam(url, "sign");
    if (sign || data && data.sign) return !1;
    if (url && (str = getQuery(url)), data) {
        var r = [];
        for (var c in data)
            c && data[c] && (r = r.concat({
                name: c,
                value: data[c]
            }));
        str = str.concat(r)
    }
    str = underscore.sortBy(str, "name"), str = underscore.uniq(str, !0, "name");
    // console.log(str)
    for (var l = "", u = 0; u < str.length; u++) str[u] && str[u].name && str[u].value && (l += str[u].name + "=" + str[u].value, u < str.length - 1 && (l += "&"));
    // console.log(l)

    //md5(l) 32bit
    var token
    return i = i || token, sign = md5(l + i), sign
}

// // 签到
// //https://mmwk.zhilaiw.cn/index.php/Api/Index/index?i=2&t=0&v=1.0&from=wxapp&c=entry&a=wxapp&do=user&sign=6205d5bc286e355c89a6c28ae8021c7a&m=skai_tooln_c&dopost=make_sign&userid=17803

var test_url = "https://mmwk.zhilaiw.cn/index.php/Api/Index/index?i=2&t=0&v=1.0&from=wxapp&c=entry&a=wxapp&do=user"
// //&sign=42d86c74b19f06cd07b4e6ac737a9911
// var data = { m: "skai_tooln_c", dopost: "make_sign", userid: "17803" }
// end_sign = getSign(test_url, data)

// console.log(end_sign)





// // 查询信息
// //https://mmwk.zhilaiw.cn/index.php/Api/Index/index?i=2&t=0&v=1.0&from=wxapp&c=entry&a=wxapp&do=user&sign=feaf1b8bc80bb0b89b6484c6de308b3e&m=skai_tooln_c&dopost=get_user_data&userid=17803&get_offline_stone_status=1&get_index_friend_list=1

// var test_url = "https://mmwk.zhilaiw.cn/index.php/Api/Index/index?i=2&t=0&v=1.0&from=wxapp&c=entry&a=wxapp&do=user"
// //&sign=feaf1b8bc80bb0b89b6484c6de308b3e
// var data = { m: "skai_tooln_c", dopost: "get_user_data", userid: "17803", get_offline_stone_status: "1", get_index_friend_list: "1" }
// end_sign = getSign(test_url, data)

// console.log(end_sign)




// // 惊喜红包
// https://mmwk.zhilaiw.cn/index.php/Api/Index/index?i=2&t=0&v=1.0&from=wxapp&c=entry&a=wxapp&do=user&sign=13a6d7f8418c39085c261a91e9da665a&m=skai_tooln_c&dopost=get_some_gold_ad_video_full&userid=17803

// var test_url = "https://mmwk.zhilaiw.cn/index.php/Api/Index/index?i=2&t=0&v=1.0&from=wxapp&c=entry&a=wxapp&do=user"

// var data = { m: "skai_tooln_c", dopost: "get_some_gold_ad_video_full", userid: "17803" }
// end_sign = getSign(test_url, data)

// console.log(end_sign)


// 观看视频
// https://mmwk.zhilaiw.cn/index.php/Api/Index/index?i=2&t=0&v=1.0&from=wxapp&c=entry&a=wxapp&do=user&sign=4ca5032b2f0f16e2423880292792e5fa&m=skai_tooln_c&dopost=get_some_power_ad_video&userid=17803

// var data = { m: "skai_tooln_c", dopost: "get_some_power_ad_video", userid: "17803" }
// end_sign = getSign(test_url, data)

// console.log(end_sign)



// 升级
// https://mmwk.zhilaiw.cn/index.php/Api/Index/index?i=2&t=0&v=1.0&from=wxapp&c=entry&a=wxapp&do=user&sign=d1a53fca503869437cd14a2f0e9ab794&m=skai_tooln_c&dopost=update_grade&userid=17803

var data = { m: "skai_tooln_c", dopost: "update_grade", userid: "17803" }
end_sign = getSign(test_url, data)

console.log(end_sign);








