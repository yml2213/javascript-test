// ##JS代码块
Java.perform(function () {
    //    let e = Java.use("ld7.e")
    //    e["h"].implementation = function (request, params) {
    //        console.log(`==========================================`)
    //        console.log(`e.h is called: 请求位=${request}, 参数是=${params}`)
    //        let result = this["h"](request, params)
    //        console.log(`e.h 结果是=${result}`)
    //        
    //        return result
    //    }

    // let k = Java.use("od7.k")
    // k["c"].implementation = function (request, map, map2) {
    //     console.log(`==========================================`)
    //     console.log(`k.c is called: 请求=${request}, map=${map}, map2=${map2}`)
    //     let result = this["c"](request, map, map2)
    //     console.log(`k.c result=${result}`)
    //     console.log(`================== end ====================`)
    //     return result
    // }

    let b = Java.use("com.inno.innosdk.b.b")
    b["a"].overload('[B', '[B', 'com.inno.innosdk.bean.BaseDevice').implementation = function (bArr, bArr2, baseDevice) {
        console.log(`b.a is called: bArr=${bArr}, bArr2=${bArr2}, baseDevice=${baseDevice}`)
        let result = this["a"](bArr, bArr2, baseDevice)
        console.log(`b.a result=${result}`)
        return result
    }











})



