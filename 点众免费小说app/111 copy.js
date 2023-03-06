



function ts14() {
    let date = new Date()
    function up0(m) {
        if (m.toString().length == 1) {
            m = `0${m}`
        }
        return m
    }
    // 直接打印当前时间
    // console.log(date)
    let y = date.getFullYear()
    let mo = date.getMonth() + 1
    mo = up0(mo)
    let d = date.getDate()
    d = up0(d)
    let h = date.getHours() - 8
    h = up0(h)
    let m = date.getMinutes()
    m = up0(m)
    let s = date.getSeconds()
    s = up0(s)
    let aa = `${y}${mo}${d}${h}${m}${s}`
    console.log(aa)
    return aa

}

ts14()