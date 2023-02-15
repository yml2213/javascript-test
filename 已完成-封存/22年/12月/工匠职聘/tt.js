resp = {
    code: 20000,
    data: {
        continueDays: 0
    }
}


if (resp.code == 20000) {
    console.log(`${this.idx}: ${resp.data.continueDays ? '已签到' : '未签到,去签到'}`)
    if (!resp.data.continueDays) console.log('未签到, 去签到')
} else console.log(`${options.fn}: 失败, ${resp}`)