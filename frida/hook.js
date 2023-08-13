// ##JS代码块
Java.perform(function () {
    // Java.use('com.autohome.ahkit.utils.SecurityUtil').encodeMD5.implementation = function (data) {          ///function里面的data是要劫持的函数 
    //     ///com.autohome.ahkit.utils <文件名 package>
    //     ///SecurityUtil <类名 class> 
    //     ///encodeMD5 <函数名 调用的方法名>
    //     console.log(data) ///打印此函数
    //     return this.encodeMD5(data)///劫持完代码看一下怎么个事就给你反回去
    // }

    let e = Java.use("ld7.e")
    e["h"].implementation = function (request, params) {
        console.log(`e.h is called: request=${request}, params=${params}`)
        let result = this["h"](request, params)
        console.log(`e.h result=${result}`)
        return result
    }
})


