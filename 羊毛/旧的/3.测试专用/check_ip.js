var date = Date.now()
console.log(date)//毫秒时间戳
console.log(date)
console.log(date)

const start = process.hrtime.bigint() //纳秒时间戳
// 191051479007711n

setTimeout(() => {
    const end = process.hrtime.bigint()
    // 191052633396993n

    console.log(`Benchmark took ${end - start} nanoseconds`)
    // Benchmark took 1154389282 nanoseconds
}, 1000)