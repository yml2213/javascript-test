// ##JS代码块
Java.perform(function () {
    // Java.use('com.autohome.ahkit.utils.SecurityUtil').encodeMD5.implementation = function (data) {          ///function里面的data是要劫持的函数 
    //     ///com.autohome.ahkit.utils <文件名 package>
    //     ///SecurityUtil <类名 class> 
    //     ///encodeMD5 <函数名 调用的方法名>
    //     console.log(data) ///打印此函数
    //     return this.encodeMD5(data)///劫持完代码看一下怎么个事就给你反回去
    // }

    let b = Java.use("com.inno.innosdk.b.b");
    b["a"].overload('[B', '[B', 'com.inno.innosdk.bean.BaseDevice').implementation = function (bArr, bArr2, baseDevice) {
        console.log(`b.a is called: bArr=${bArr}, bArr2=${bArr2}, baseDevice=${baseDevice}`);
        let result = this["a"](bArr, bArr2, baseDevice);
        console.log(`b.a result=${result}`);
        return result;
    };
    
})


