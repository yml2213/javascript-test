function CurentTime() {
    let now = new Date()
    let year = now.getFullYear() //年
    let month = now.getMonth() + 1 //月
    let day = now.getDate() //日
    let hh = now.getHours() //时
    let mm = now.getMinutes() //分
    let ss = now.getSeconds() //秒
    let ms = now.getMilliseconds()
    clock = year + "-"
    if (month < 10)
        clock += "0"
    clock += month + "-"
    if (day < 10)
        clock += "0"
    clock += day + " "

    if (hh < 10)
        clock += "0"
    clock += hh + ":"

    if (mm < 10)
        clock += '0'
    clock += mm + ":"

    if (ss < 10)
        clock += '0'
    clock += ss + ":"

    clock += ms


    // console.log(clock)
    return (clock)
}

CurentTime()


let sleepTime = '200'  // 间隔多久发包 单位 毫秒

let srartTime = '2022-12-06 23:44:53:402'

let endTime = '2022-12-07 09:01:00:100'





let timer = setInterval(function () {
    CurentTime()
    if (clock == srartTime) { // 当按钮可以点击时
        console.log('开始 抢购了')



    } else if (clock > endTime) {
        console.log(`${clock} 结束了`)
        clearInterval(timer)   // 停止计时器
    } else {
        console.log(`${clock} 等待 抢购...`)
    }
}, sleepTime)

插件是 copliot ，现在已经收费了