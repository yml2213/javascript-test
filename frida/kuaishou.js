// frida -U  -f com.kuaishou.nebula -l kuaishou.js


function stringToBytes(str) {
    var ch, st, re = []
    for (var i = 0; i < str.length; i++) {
        ch = str.charCodeAt(i)
        st = []
        do {
            st.push(ch & 0xFF)
            ch = ch >> 8
        }
        while (ch)
        re = re.concat(st.reverse())
    }
    return re
}

function main() {
    Java.perform(function () {

        let e = Java.use("uua.e")
        e["P3"].implementation = function (aVar, activity, videoAwardParam, gVar) {
            console.log(`e.P3 is called: aVar=${aVar}, activity=${activity}, videoAwardParam=${videoAwardParam}, gVar=${gVar}`)
            this["P3"](aVar, activity, videoAwardParam, gVar)
        }


    })


}

setImmediate(main);









