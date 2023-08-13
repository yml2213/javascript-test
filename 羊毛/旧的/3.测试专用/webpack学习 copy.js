!function (t) {

    function m(object, e) {
        var t = Object.keys(object)
        if (Object.getOwnPropertySymbols) {
            var n = Object.getOwnPropertySymbols(object)

            e &&
                (n = n.filter(function (e) {
                    return Object.getOwnPropertyDescriptor(object, e).enumerable
                })),
                t.push.apply(t, n)
        }
        return t
    }
    console.log(111)
}()