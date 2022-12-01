/*
微信小程序：鲁班大课堂

变量为lbktopenid
查看请求头的openid值
多账号换行隔开  

*/
//定时 10 * * * *   0点必须执行，0-1点执行全部任务，1-23只执行刷时长任务
const $ = new Env('鲁班视频')
var request = require("request")
let status
status = (status = ($.getval("lbstatus") || "1")) > 1 ? `${status}` : "" // 账号扩展字符
let lbktopenidArr = [], lbcount = ''
const notify = $.isNode() ? require('./sendNotify') : ''
let lbktopenid = $.isNode() ? (process.env.lbktopenid ? process.env.lbktopenid : "") : ($.getdata('lbktopenid') ? $.getdata('lbktopenid') : "")


let allMessage = ''
let lbktopenids = ""
const logs = 0
const host1 = 'https://admin.lubanketang.com/'
var hours = new Date().getHours()
var s = new Date().getMinutes()

var timestamp = Math.round(new Date().getTime() / 1000).toString()
!(async () => {
    if (typeof $request !== "undefined") {

    } else {
        if (!$.isNode()) {
            lbktopenidArr.push($.getdata('lbktopenid'))
            let lbcount = ($.getval('lbcount') || '1')
            for (let i = 2; i <= lbcount; i++) {
                lbktopenidArr.push($.getdata(`lbktopenid${i}`))
            }
            console.log(`------------- 共${lbktopenidArr.length}个账号-------------\n`)
            for (let i = 0; i < lbktopenidArr.length; i++) {
                if (lbktopenidArr[i]) {
                    lbktopenid = lbktopenidArr[i]
                    $.index = i + 1

                }
            }
        } else {
            if (process.env.lbktopenid && process.env.lbktopenid.indexOf('\n') > -1) {
                lbktopenidArr = process.env.lbktopenid.split('\n')
                console.log(`您选择的是用"换行"隔开\n`)
            } else {
                lbktopenids = [process.env.lbktopenid]
            };
            Object.keys(lbktopenids).forEach((item) => {
                if (lbktopenids[item]) {
                    lbktopenidArr.push(lbktopenids[item])
                }
            })
            console.log(`共${lbktopenidArr.length}个cookie`)
            for (let k = 0; k < lbktopenidArr.length; k++) {
                $.message = ""
                lbktopenid = lbktopenidArr[k]
                $.index = k + 1

                console.log(`\n开始【账号${$.index}】`)
                await dl()
                await $.wait(1000)

                //dl
                function dl() {
                    return new Promise((resolve) => {

                        $.post(dlpost(`https://admin.lubanketang.com/LB/fsAdmin/api/wxapp/register2`, `referrer=0&openid=${lbktopenid}&session_key=G%2BmMs6vfIPKefKNzIzZZyQ%3D%3D&rawData=%255Bobject%2520Object%255D&encryptedData=BEiLYIhk6%252FI4UmqLJ2fDuaLAdi0MGrOYM%252FbEenWfvciotQeelh7S7BeP08MPFNf%252BkYn6OkFouVFigrQfnlnSZ0n8a5s9RtyMX7vZbqXM%252Bh6KEPLzFYxGnfyThfuCWmhbrTv0tFN6PW6XPY991V7RnDbkEhXel%252FEaq45CxhKs19lk6QK%252F%252BBExcegj7QG5RpfK2F7FwhlnLCoV8AXYM5s6BA%253D%253D&iv=NhykHHl5IJq2PjQr6WmMoA%253D%253D`), async (err, resp, data) => {

                            try {
                                if (err) {
                                    console.log(`${JSON.stringify(err)}`)
                                    console.log(`${$.name} API请求失败，请检查网路重试`)
                                }// else {
                                if (safeGet(data)) {
                                    data = JSON.parse(data)

                                    if (data.code == 1) {

                                        lbtk = data.data.userinfo.token

                                        await zccx()
                                        await $.wait(1000)
                                        await jrsc()
                                        await txcx()
                                        await $.wait(1000)
                                        await userid()
                                        await $.wait(1000)







                                    }
                                    else {
                                        console.log(JSON.stringify(data))
                                    }

                                }

                            } catch (e) {
                                $.logErr(e, resp)
                            } finally {
                                resolve(data)
                            }
                        })
                    })
                }







            }


        }
    }
    if ($.isNode() && allMessage) {
        await notify.sendNotify(`${$.name}`, `${allMessage}`)
    }






})()
    .catch((e) => $.logErr(e))
    .finally(() => $.done())






//获取用户id，时长需要

function userid() {
    return new Promise((resolve) => {

        $.get(xjget(`LB/fsAdmin/api/user/myInfo`), async (err, resp, data) => {

            try {
                if (err) {
                    console.log(`${JSON.stringify(err)}`)
                    console.log(`${$.name} API请求失败，请检查网路重试`)
                }// else {
                if (safeGet(data)) {
                    data = JSON.parse(data)

                    if (data.code == 1) {

                        uhid = data.data.id
                        zhye = data.data.money
                        zhjbye = data.data.consume_type_integral

                        await rwlb(uhid)
                        await $.wait(1000)


                        await pddhjb(uhid, zhjbye)
                        await $.wait(1000)





                    }


                }

            } catch (e) {
                $.logErr(e, resp)
            } finally {
                resolve(data)
            }
        })
    })
}


//获取用户id日常任务需要

function userid1() {
    return new Promise((resolve) => {

        $.get(xjget(`LB/fsAdmin/api/user/myInfo`), async (err, resp, data) => {

            try {
                if (err) {
                    console.log(`${JSON.stringify(err)}`)
                    console.log(`${$.name} API请求失败，请检查网路重试`)
                }// else {
                if (safeGet(data)) {
                    data = JSON.parse(data)

                    if (data.code == 1) {



                        uhid = data.data.id



                        console.log(`\n--------开始执行全部任务--------`)
                        await sign(uhid)
                        await $.wait(1000)



                        console.log(`\n--------开始观看广告任务--------`)
                        for (let x = 0; x < 10; x++) {
                            $.index = x + 1
                            console.log(`\n开始观看第${x + 1}个广告，等待40秒`)
                            await kgg(uhid)
                            await $.wait(40000)
                        }

                        min = 0
                        max = 23
                        n = randomInt2(min, max)


                        if (n >= 0 && n <= 3) {
                            zjid = 8
                            min = 75
                            max = 82
                            spis = randomInt(min, max)
                            await kspcs(zjid, spis)
                            await $.wait(1000)
                        } else if (n >= 4 && n <= 7) {
                            zjid = 9
                            min = 83
                            max = 94
                            spis = randomInt(min, max)
                            await kspcs(zjid, spis)
                            await $.wait(1000)
                        } else if (n >= 8 && n <= 11) {
                            zjid = 10
                            min = 95
                            max = 107
                            spis = randomInt(min, max)
                            await kspcs(zjid, spis)
                            await $.wait(1000)
                        } else if (n >= 12 && n <= 15) {
                            zjid = 14
                            min = 132
                            max = 136
                            spis = randomInt(min, max)
                            await kspcs(zjid, spis)
                            await $.wait(1000)
                        } else if (n >= 16 && n <= 19) {
                            zjid = 6
                            min = 40
                            max = 51
                            spis = randomInt(min, max)
                            await kspcs(zjid, spis)
                            await $.wait(1000)
                        } else if (n >= 20 && n <= 23) {
                            zjid = 1
                            min = 1
                            max = 11
                            spis = randomInt(min, max)
                            await kspcs(zjid, spis)
                            await $.wait(1000)
                        }


                        await lqmrspjl(uhid)
                        await $.wait(1000)
                        await zccx1()
                        await $.wait(1000)





                    }

                }

            } catch (e) {
                $.logErr(e, resp)
            } finally {
                resolve(data)
            }
        })
    })
}
//任务列表
function rwlb(uhi) {
    return new Promise((resolve) => {

        $.get(xjget(`LB/xxxx/lubanServer/api/user/eduUserTaskLog/queryUserTaskList/${uhi}`), async (err, resp, data) => {

            try {
                if (err) {
                    console.log(`${JSON.stringify(err)}`)
                    console.log(`${$.name} API请求失败，请检查网路重试`)
                }// else {
                if (safeGet(data)) {
                    data = JSON.parse(data)

                    if (data.data[0].completeCount == 0) {
                        await $.wait(1000)
                        await userid1()

                    } else if (data.data[0].completeCount == 1) {
                        console.log(`\n今日任务已完成`)

                    }


                }

            } catch (e) {
                $.logErr(e, resp)
            } finally {
                resolve(data)
            }
        })
    })
}

//查询最近一笔提现
function txcx() {
    return new Promise((resolve) => {

        $.get(xjget(`LB/fsAdmin/api/money/withdrawalLog?limit=10&page=1`), async (err, resp, data) => {

            try {
                if (err) {
                    console.log(`${JSON.stringify(err)}`)
                    console.log(`${$.name} API请求失败，请检查网路重试`)
                }// else {
                if (safeGet(data)) {
                    data = JSON.parse(data)

                    if (data.code == 1) {
                        console.log(`\n最近一笔提现金额：${data.data[0].money}元   提现状态：${data.data[0].status_text}`)
                    }
                    else { console.log(`\n最近没有任何提现记录`) }

                }

            } catch (e) {
                $.logErr(e, resp)
            } finally {
                resolve(data)
            }
        })
    })
}

//查询今日阅读时长
function jrsc() {
    return new Promise((resolve) => {
        nf = local_year()

        $.get(xjget(`LB/fsAdmin/api/study/studyrili?yearm=${nf}`), async (err, resp, data) => {

            try {
                if (err) {
                    console.log(`${JSON.stringify(err)}`)
                    console.log(`${$.name} API请求失败，请检查网路重试`)
                }// else {
                if (safeGet(data)) {
                    data = JSON.parse(data)

                    if (data.code == 1) {
                        dsh = local_day()
                        console.log(`今日阅读时长：${data.data[dsh - 1].title}`)
                    }
                    else { console.log(`\n参数错误`) }

                }

            } catch (e) {
                $.logErr(e, resp)
            } finally {
                resolve(data)
            }
        })
    })
}


//查询阅读时长
function cxydsc() {
    return new Promise((resolve) => {

        $.get(xjget(`LB/fsAdmin/api/study/totals`), async (err, resp, data) => {

            try {
                if (err) {
                    console.log(`${JSON.stringify(err)}`)
                    console.log(`${$.name} API请求失败，请检查网路重试`)
                }// else {
                if (safeGet(data)) {
                    data = JSON.parse(data)

                    if (data.code == 1) {
                        console.log(`本月阅读时长：${data.data.benyueShi}分钟 本月学习课程：${data.data.benyueKe}节`)
                    }


                }

            } catch (e) {
                $.logErr(e, resp)
            } finally {
                resolve(data)
            }
        })
    })
}

//总资产查询

function zccx() {
    return new Promise((resolve) => {

        $.get(xjget(`LB/fsAdmin/api/user/myInfo`), async (err, resp, data) => {

            try {
                if (err) {
                    console.log(`${JSON.stringify(err)}`)
                    console.log(`${$.name} API请求失败，请检查网路重试`)
                }// else {
                if (safeGet(data)) {
                    data = JSON.parse(data)

                    if (data.code == 1) {
                        console.log(`\n【用户】${data.data.nickname}  余额：${data.data.indirect_promotion_money}   积分：${data.data.consume_type_integral}`)

                    }

                }

            } catch (e) {
                $.logErr(e, resp)
            } finally {
                resolve(data)
            }
        })
    })
}
//积分兑换现金前置

function zccx1() {
    return new Promise((resolve) => {

        $.get(xjget(`LB/fsAdmin/api/user/myInfo`), async (err, resp, data) => {

            try {
                if (err) {
                    console.log(`${JSON.stringify(err)}`)
                    console.log(`${$.name} API请求失败，请检查网路重试`)
                }// else {
                if (safeGet(data)) {
                    data = JSON.parse(data)

                    if (data.code == 1) {
                        console.log(`\n当前积分：${data.data.consume_type_integral}`)

                    }

                }

            } catch (e) {
                $.logErr(e, resp)
            } finally {
                resolve(data)
            }
        })
    })
}
//余额提现前置

function zccx2() {
    return new Promise((resolve) => {

        $.get(xjget(`LB/fsAdmin/api/user/myInfo`), async (err, resp, data) => {

            try {
                if (err) {
                    console.log(`${JSON.stringify(err)}`)
                    console.log(`${$.name} API请求失败，请检查网路重试`)
                }// else {
                if (safeGet(data)) {
                    data = JSON.parse(data)

                    if (data.code == 1) {
                        console.log(`\n当前余额：${data.data.indirect_promotion_money}`)

                    }

                }

            } catch (e) {
                $.logErr(e, resp)
            } finally {
                resolve(data)
            }
        })
    })
}








//金币兑换现金
function jbhxj(a, b) {
    return new Promise((resolve) => {

        $.get(xjget(`LB/xxxx/lubanServer/api/user/eduIntegralGoods/userIntegralExchangeBalance/${a}/${b}`), async (err, resp, data) => {

            try {
                if (err) {
                    console.log(`${JSON.stringify(err)}`)
                    console.log(`${$.name} API请求失败，请检查网路重试`)
                }// else {
                if (safeGet(data)) {
                    data = JSON.parse(data)

                    if (data.code == 200) {

                        console.log(`\n兑换现金成功 `)
                        await $.wait(5000)
                        await zccx2()



                    } else { console.log(`\n${data.message}`) }



                }

            } catch (e) {
                $.logErr(e, resp)
            } finally {
                resolve(data)
            }
        })
    })
}

//判断是否可以积分兑换现金,现金是否可以提现
function pddhjb(uid, c) {
    return new Promise((resolve) => {

        $.get(xjget(`LB/xxxx/lubanServer/api/user/eduIntegralGoods/queryEduIntegralGoodsList/${uid}`), async (err, resp, data) => {

            try {
                if (err) {
                    console.log(`${JSON.stringify(err)}`)
                    console.log(`${$.name} API请求失败，请检查网路重试`)
                }// else {
                if (safeGet(data)) {
                    data = JSON.parse(data)

                    console.log(`\n=======判断是否可以积分兑换现金========`)

                    if (data.data.eduIntegralGoodsList[0].freeConvertNum >= 1) {

                        if (c >= 10000 && c <= 29999) {
                            console.log(`\n积分余额为${c}可兑换1元现金次数为${data.data.eduIntegralGoodsList[0].freeConvertNum}，开始兑换`)
                            await jbhxj(uid, 1)
                            await $.wait(1000)
                            console.log(`\n开始提现1元`)
                            await yetx(1.00)
                        } else if (c <= 9999) {
                            console.log(`\n积分不足兑换1元现金门槛，不执行兑换`)
                        }

                    } else if (data.data.eduIntegralGoodsList[0].freeConvertNum == 0) {
                        console.log(`\n积分兑换1元现金次数为零，不执行兑换`)
                    }



                    if (data.data.eduIntegralGoodsList[1].freeConvertNum >= 1) {

                        if (30000 <= c && c <= 99999) {
                            console.log(`\n积分余额为${c}可兑换3元现金次数为${data.data.eduIntegralGoodsList[1].freeConvertNum}，开始兑换`)
                            await jbhxj(uid, 2)
                            await $.wait(1000)
                            console.log(`\n开始提现3元`)
                            await yetx(3.00)
                        } else if (c <= 29999) {
                            console.log(`\n积分不足兑换3元现金门槛，不执行兑换`)
                        }
                    } else if (data.data.eduIntegralGoodsList[1].freeConvertNum == 0) {
                        console.log(`\n积分兑换3元现金次数为零，不执行兑换`)
                    }

                    if (data.data.eduIntegralGoodsList[2].freeConvertNum >= 1) {

                        if (100000 <= c && c <= 499999) {
                            console.log(`\n积分余额为${c}可兑换10元现金次数为${data.data.eduIntegralGoodsList[2].freeConvertNum}，开始兑换`)
                            await jbhxj(uid, 3)
                            await $.wait(1000)
                            console.log(`\n开始提现10元`)
                            await yetx(10.00)
                        } else if (c <= 99999) {
                            console.log(`\n积分不足兑换10元现金门槛，不执行兑换`)
                        }
                    } else if (data.data.eduIntegralGoodsList[2].freeConvertNum == 0) {
                        console.log(`\n积分兑换10元现金次数为零，不执行兑换`)
                    }

                    if (data.data.eduIntegralGoodsList[3].freeConvertNum >= 1) {

                        if (5000000 <= c) {
                            console.log(`\n积分余额为${c}可兑换50元现金次数为${data.data.eduIntegralGoodsList[3].freeConvertNum}，开始兑换`)
                            await jbhxj(uid, 4)
                            await $.wait(1000)
                            console.log(`\n开始提现50元`)
                            await yetx(50.00)
                        } else if (c < 499999) {
                            console.log(`\n积分不足兑换50元现金门槛，不执行兑换`)
                        }
                    } else if (data.data.eduIntegralGoodsList[3].freeConvertNum == 0) {
                        console.log(`\n积分兑换10元现金次数为零，不执行兑换`)
                    }



                }

            } catch (e) {
                $.logErr(e, resp)
            } finally {
                resolve(data)
            }
        })
    })
}

//余额提现
function yetx(txje) {
    return new Promise((resolve) => {

        $.post(txpost(`LB/fsAdmin/api/money/withdrawalAdd`, `money=${txje}`), async (err, resp, data) => {

            try {
                if (err) {
                    console.log(`${JSON.stringify(err)}`)
                    console.log(`${$.name} API请求失败，请检查网路重试`)
                }// else {
                if (safeGet(data)) {
                    data = JSON.parse(data)

                    if (data.code == 1) {

                        console.log(`\n${data.msg}`)



                    } else { console.log(`\n${data.msg}`) }



                }

            } catch (e) {
                $.logErr(e, resp)
            } finally {
                resolve(data)
            }
        })
    })
}





//获取刷时长id
function kspcs(a, iddd) {

    return new Promise((resolve) => {


        $.get(xjget(`LB/fsAdmin/api/study/studyLog?curriculum_id=${a}&curriculum_section_id=${iddd}`), async (err, resp, data) => {

            try {
                if (err) {
                    console.log(`${JSON.stringify(err)}`)
                    console.log(`${$.name} API请求失败，请检查网路重试`)
                }// else {
                if (safeGet(data)) {
                    data = JSON.parse(data)
                    if (data.code == 1) {
                        spid = data.data.study_log_id
                        min = 160
                        max = 300
                        wzs = randomInt1(min, max)
                        console.log(` \n开始观看专辑${a}编号${iddd}视频${(wzs) / 30}分钟，等待${(wzs) * 2}秒`)

                        for (let x = 0; x < wzs; x++) {
                            $.index = x + 1

                            await ssc(spid)
                            await $.wait(2000)

                        } console.log(`\n上传${(wzs) / 30}分钟观看时长成功`)

                    } else { console.log(`\n参数异常`) }


                }

            } catch (e) {
                $.logErr(e, resp)
            } finally {
                resolve(data)
            }
        })
    })
}


//看广告
function kgg(a) {
    return new Promise((resolve) => {

        $.get(xjget(`LB/xxxx/lubanServer/api/user/eduAwardTask/userLookAdvertisingGetIntegrate/${a}`), async (err, resp, data) => {

            try {
                if (err) {
                    console.log(`${JSON.stringify(err)}`)
                    console.log(`${$.name} API请求失败，请检查网路重试`)
                }// else {
                if (safeGet(data)) {
                    data = JSON.parse(data)

                    if (data.code == 200) {
                        console.log(`\n观看广告：${data.message}`)
                    }
                    else if (data.code == 500) { console.log(`\n观看广告：${data.message}`) }

                }

            } catch (e) {
                $.logErr(e, resp)
            } finally {
                resolve(data)
            }
        })
    })
}

//发朋友圈
function fpyq(a) {
    return new Promise((resolve) => {

        $.get(xjget(`LB/xxxx/lubanServer/api/user/eduAwardTask/shareWechatMoments/${a}`), async (err, resp, data) => {

            try {
                if (err) {
                    console.log(`${JSON.stringify(err)}`)
                    console.log(`${$.name} API请求失败，请检查网路重试`)
                }// else {
                if (safeGet(data)) {
                    data = JSON.parse(data)

                    if (data.code == 200) {
                        console.log(`\n分享朋友圈：${data.message}`)
                    }
                    else if (data.code == 500) { console.log(`\n分享朋友圈：${data.message}`) }

                }

            } catch (e) {
                $.logErr(e, resp)
            } finally {
                resolve(data)
            }
        })
    })
}




//签到
function sign(a) {
    return new Promise((resolve) => {

        $.get(xjget(`LB/xxxx/lubanServer/api/user/eduAwardTask/dailyAttendance/${a}`), async (err, resp, data) => {

            try {
                if (err) {
                    console.log(`${JSON.stringify(err)}`)
                    console.log(`${$.name} API请求失败，请检查网路重试`)
                }// else {
                if (safeGet(data)) {
                    data = JSON.parse(data)

                    if (data.code == 200) {
                        console.log(`\n签到：${data.message}`)
                    }
                    else if (data.code == 500) { console.log(`\n签到：${data.message}`) }

                }

            } catch (e) {
                $.logErr(e, resp)
            } finally {
                resolve(data)
            }
        })
    })
}






//刷时长

function ssc(ida) {
    return new Promise((resolve) => {

        $.get(xjget(`LB/fsAdmin/api/study/studyLogUpdate?study_log_id=${ida}&study_time=2&dytime=2.501`), async (err, resp, data) => {

            try {
                if (err) {
                    console.log(`${JSON.stringify(err)}`)
                    console.log(`${$.name} API请求失败，请检查网路重试`)
                }// else {
                if (safeGet(data)) {
                    data = JSON.parse(data)

                    if (data.code == 1) {





                    } else { console.log(JSON.stringify(data)) }

                }

            } catch (e) {
                $.logErr(e, resp)
            } finally {
                resolve(data)
            }
        })
    })
}


function lqmrspjl(a) {
    return new Promise((resolve) => {

        $.get(xjget(`LB/xxxx/lubanServer/api/user/eduAwardTask/TheCumulativeStudyTimeIsRewardedWithPoints/${a}`), async (err, resp, data) => {

            try {
                if (err) {
                    console.log(`${JSON.stringify(err)}`)
                    console.log(`${$.name} API请求失败，请检查网路重试`)
                }// else {
                if (safeGet(data)) {
                    data = JSON.parse(data)

                    if (data.data.userLearningTimeToday >= 300) {
                        console.log(`\n已达到每日首五分钟视频奖励要求奖励已领取`)
                    } else if (data.data.userLearningTimeToday <= 299) { console.log(`\n${data.message}`) }


                }

            } catch (e) {
                $.logErr(e, resp)
            } finally {
                resolve(data)
            }
        })
    })
}
/*获取随机数
*/
function randomInt(min, max) {

    return Math.round(Math.random() * (max - min) + min)

}

/*获取随机数
*/
function randomInt1(min, max) {

    return Math.round(Math.random() * (max - min) + min)

}

/*获取随机数
*/
function randomInt2(min, max) {

    return Math.round(Math.random() * (max - min) + min)

}
/**
* 获取当前天数(数字)  5日  
*/
function local_day() {
    let myDate = new Date()
    let d = myDate.getDate()
    return d
}

/**
 * 获取当前年份 
 */
function local_year() {
    let myDate = new Date()
    y = myDate.getFullYear()
    return y
}


//获取当前周几
function week() {
    let week_one = new Date().getDay()

    return week_one //返回的是周几0是周末
}

function local_hours1() {
    let myDate = new Date()
    let h = myDate.getHours()
    return h
}

function local_hours() {
    let myDate = new Date()
    let h = myDate.getHours()
    return h
}
function xjget(a) {
    return {

        url: `${host1}${a}`,
        headers: {
            "Host": "admin.lubanketang.com",
            "Connection": "keep-alive",
            "token": lbtk,
            "content-type": "application/x-www-form-urlencoded; charset=UTF-8",
            "Accept-Encoding": "gzip,compress,br,deflate",
            "User-Agent": "Mozilla/5.0 (Linux; Android 10; V1824A Build/QP1A.190711.020; wv) AppleWebKit/537.36 (KHTML, like Gecko) Version/4.0 Chrome/86.0.4240.99 XWEB/4343 MMWEBSDK/20220604 Mobile Safari/537.36 MMWEBID/8036 MicroMessenger/8.0.24.2180(0x28001853) WeChat/arm64 Weixin NetType/ctlte Language/zh_CN ABI/arm64 MiniProgramEnv/android",
            "Referer": "https://servicewechat.com/wx47029f6818be251d/57/page-frame.html"
        }
    }
}
function txpost(a, b) {
    return {

        url: `${host1}${a}`,
        body: `${b}`,
        headers: {
            "Host": "admin.lubanketang.com",
            "Connection": "keep-alive",
            "token": lbtk,
            "content-type": "application/x-www-form-urlencoded; charset=UTF-8",
            "Accept-Encoding": "gzip,compress,br,deflate",
            "User-Agent": "Mozilla/5.0 (Linux; Android 10; V1824A Build/QP1A.190711.020; wv) AppleWebKit/537.36 (KHTML, like Gecko) Version/4.0 Chrome/86.0.4240.99 XWEB/4343 MMWEBSDK/20220604 Mobile Safari/537.36 MMWEBID/8036 MicroMessenger/8.0.24.2180(0x28001853) WeChat/arm64 Weixin NetType/ctlte Language/zh_CN ABI/arm64 MiniProgramEnv/android",
            "Referer": "https://servicewechat.com/wx47029f6818be251d/57/page-frame.html"
        }
    }
}
function dlpost(a, b) {
    return {

        url: `${a}`,
        body: `${b}`,
        headers: {
            "Host": "admin.lubanketang.com",
            "Connection": "keep-alive",
            "content-type": "application/x-www-form-urlencoded; charset=UTF-8",
            "token": "",
            "Accept-Encoding": "gzip,compress,br,deflate",
            "User-Agent": "Mozilla/5.0 (Linux; Android 10; V1824A Build/QP1A.190711.020; wv) AppleWebKit/537.36 (KHTML, like Gecko) Version/4.0 Chrome/86.0.4240.99 XWEB/4343 MMWEBSDK/20220604 Mobile Safari/537.36 MMWEBID/8036 MicroMessenger/8.0.24.2180(0x28001853) WeChat/arm64 Weixin NetType/ctlte Language/zh_CN ABI/arm64 MiniProgramEnv/android",
            "Referer": "https://servicewechat.com/wx47029f6818be251d/57/page-frame.html"
        }
    }
}

function safeGet(data) {
    try {
        if (typeof JSON.parse(data) == "object") {
            return true
        }
    } catch (e) {
        console.log(e)
        console.log(`京东服务器访问数据为空，请检查自身设备网络情况`)
        return false
    }
}
function jsonParse(str) {
    if (typeof str == "string") {
        try {
            return JSON.parse(str)
        } catch (e) {
            console.log(e)
            $.msg($.name, '', '请勿随意在BoxJs输入框修改内容\n建议通过脚本去获取cookie')
            return []
        }
    }
}

function Env(t, e) { class s { constructor(t) { this.env = t } send(t, e = "GET") { t = "string" == typeof t ? { url: t } : t; let s = this.get; return "POST" === e && (s = this.post), new Promise((e, i) => { s.call(this, t, (t, s, r) => { t ? i(t) : e(s) }) }) } get(t) { return this.send.call(this.env, t) } post(t) { return this.send.call(this.env, t, "POST") } } return new class { constructor(t, e) { this.name = t, this.http = new s(this), this.data = null, this.dataFile = "box.dat", this.logs = [], this.isMute = !1, this.isNeedRewrite = !1, this.logSeparator = "\n", this.startTime = (new Date).getTime(), Object.assign(this, e), this.log("", `\ud83d\udd14${this.name}, \u5f00\u59cb!`) } isNode() { return "undefined" != typeof module && !!module.exports } isQuanX() { return "undefined" != typeof $task } isSurge() { return "undefined" != typeof $httpClient && "undefined" == typeof $loon } isLoon() { return "undefined" != typeof $loon } toObj(t, e = null) { try { return JSON.parse(t) } catch { return e } } toStr(t, e = null) { try { return JSON.stringify(t) } catch { return e } } getjson(t, e) { let s = e; const i = this.getdata(t); if (i) try { s = JSON.parse(this.getdata(t)) } catch { } return s } setjson(t, e) { try { return this.setdata(JSON.stringify(t), e) } catch { return !1 } } getScript(t) { return new Promise(e => { this.get({ url: t }, (t, s, i) => e(i)) }) } runScript(t, e) { return new Promise(s => { let i = this.getdata("@chavy_boxjs_userCfgs.httpapi"); i = i ? i.replace(/\n/g, "").trim() : i; let r = this.getdata("@chavy_boxjs_userCfgs.httpapi_timeout"); r = r ? 1 * r : 20, r = e && e.timeout ? e.timeout : r; const [o, h] = i.split("@"), a = { url: `http://${h}/v1/scripting/evaluate`, body: { script_text: t, mock_type: "cron", timeout: r }, headers: { "X-Key": o, Accept: "*/*" } }; this.post(a, (t, e, i) => s(i)) }).catch(t => this.logErr(t)) } loaddata() { if (!this.isNode()) return {}; { this.fs = this.fs ? this.fs : require("fs"), this.path = this.path ? this.path : require("path"); const t = this.path.resolve(this.dataFile), e = this.path.resolve(process.cwd(), this.dataFile), s = this.fs.existsSync(t), i = !s && this.fs.existsSync(e); if (!s && !i) return {}; { const i = s ? t : e; try { return JSON.parse(this.fs.readFileSync(i)) } catch (t) { return {} } } } } writedata() { if (this.isNode()) { this.fs = this.fs ? this.fs : require("fs"), this.path = this.path ? this.path : require("path"); const t = this.path.resolve(this.dataFile), e = this.path.resolve(process.cwd(), this.dataFile), s = this.fs.existsSync(t), i = !s && this.fs.existsSync(e), r = JSON.stringify(this.data); s ? this.fs.writeFileSync(t, r) : i ? this.fs.writeFileSync(e, r) : this.fs.writeFileSync(t, r) } } lodash_get(t, e, s) { const i = e.replace(/\[(\d+)\]/g, ".$1").split("."); let r = t; for (const t of i) if (r = Object(r)[t], void 0 === r) return s; return r } lodash_set(t, e, s) { return Object(t) !== t ? t : (Array.isArray(e) || (e = e.toString().match(/[^.[\]]+/g) || []), e.slice(0, -1).reduce((t, s, i) => Object(t[s]) === t[s] ? t[s] : t[s] = Math.abs(e[i + 1]) >> 0 == +e[i + 1] ? [] : {}, t)[e[e.length - 1]] = s, t) } getdata(t) { let e = this.getval(t); if (/^@/.test(t)) { const [, s, i] = /^@(.*?)\.(.*?)$/.exec(t), r = s ? this.getval(s) : ""; if (r) try { const t = JSON.parse(r); e = t ? this.lodash_get(t, i, "") : e } catch (t) { e = "" } } return e } setdata(t, e) { let s = !1; if (/^@/.test(e)) { const [, i, r] = /^@(.*?)\.(.*?)$/.exec(e), o = this.getval(i), h = i ? "null" === o ? null : o || "{}" : "{}"; try { const e = JSON.parse(h); this.lodash_set(e, r, t), s = this.setval(JSON.stringify(e), i) } catch (e) { const o = {}; this.lodash_set(o, r, t), s = this.setval(JSON.stringify(o), i) } } else s = this.setval(t, e); return s } getval(t) { return this.isSurge() || this.isLoon() ? $persistentStore.read(t) : this.isQuanX() ? $prefs.valueForKey(t) : this.isNode() ? (this.data = this.loaddata(), this.data[t]) : this.data && this.data[t] || null } setval(t, e) { return this.isSurge() || this.isLoon() ? $persistentStore.write(t, e) : this.isQuanX() ? $prefs.setValueForKey(t, e) : this.isNode() ? (this.data = this.loaddata(), this.data[e] = t, this.writedata(), !0) : this.data && this.data[e] || null } initGotEnv(t) { this.got = this.got ? this.got : require("got"), this.cktough = this.cktough ? this.cktough : require("tough-cookie"), this.ckjar = this.ckjar ? this.ckjar : new this.cktough.CookieJar, t && (t.headers = t.headers ? t.headers : {}, void 0 === t.headers.Cookie && void 0 === t.cookieJar && (t.cookieJar = this.ckjar)) } get(t, e = (() => { })) { t.headers && (delete t.headers["Content-Type"], delete t.headers["Content-Length"]), this.isSurge() || this.isLoon() ? (this.isSurge() && this.isNeedRewrite && (t.headers = t.headers || {}, Object.assign(t.headers, { "X-Surge-Skip-Scripting": !1 })), $httpClient.get(t, (t, s, i) => { !t && s && (s.body = i, s.statusCode = s.status), e(t, s, i) })) : this.isQuanX() ? (this.isNeedRewrite && (t.opts = t.opts || {}, Object.assign(t.opts, { hints: !1 })), $task.fetch(t).then(t => { const { statusCode: s, statusCode: i, headers: r, body: o } = t; e(null, { status: s, statusCode: i, headers: r, body: o }, o) }, t => e(t))) : this.isNode() && (this.initGotEnv(t), this.got(t).on("redirect", (t, e) => { try { if (t.headers["set-cookie"]) { const s = t.headers["set-cookie"].map(this.cktough.Cookie.parse).toString(); s && this.ckjar.setCookieSync(s, null), e.cookieJar = this.ckjar } } catch (t) { this.logErr(t) } }).then(t => { const { statusCode: s, statusCode: i, headers: r, body: o } = t; e(null, { status: s, statusCode: i, headers: r, body: o }, o) }, t => { const { message: s, response: i } = t; e(s, i, i && i.body) })) } post(t, e = (() => { })) { if (t.body && t.headers && !t.headers["Content-Type"] && (t.headers["Content-Type"] = "application/x-www-form-urlencoded"), t.headers && delete t.headers["Content-Length"], this.isSurge() || this.isLoon()) this.isSurge() && this.isNeedRewrite && (t.headers = t.headers || {}, Object.assign(t.headers, { "X-Surge-Skip-Scripting": !1 })), $httpClient.post(t, (t, s, i) => { !t && s && (s.body = i, s.statusCode = s.status), e(t, s, i) }); else if (this.isQuanX()) t.method = "POST", this.isNeedRewrite && (t.opts = t.opts || {}, Object.assign(t.opts, { hints: !1 })), $task.fetch(t).then(t => { const { statusCode: s, statusCode: i, headers: r, body: o } = t; e(null, { status: s, statusCode: i, headers: r, body: o }, o) }, t => e(t)); else if (this.isNode()) { this.initGotEnv(t); const { url: s, ...i } = t; this.got.post(s, i).then(t => { const { statusCode: s, statusCode: i, headers: r, body: o } = t; e(null, { status: s, statusCode: i, headers: r, body: o }, o) }, t => { const { message: s, response: i } = t; e(s, i, i && i.body) }) } } time(t) { let e = { "M+": (new Date).getMonth() + 1, "d+": (new Date).getDate(), "H+": (new Date).getHours(), "m+": (new Date).getMinutes(), "s+": (new Date).getSeconds(), "q+": Math.floor(((new Date).getMonth() + 3) / 3), S: (new Date).getMilliseconds() }; /(y+)/.test(t) && (t = t.replace(RegExp.$1, ((new Date).getFullYear() + "").substr(4 - RegExp.$1.length))); for (let s in e) new RegExp("(" + s + ")").test(t) && (t = t.replace(RegExp.$1, 1 == RegExp.$1.length ? e[s] : ("00" + e[s]).substr(("" + e[s]).length))); return t } msg(e = t, s = "", i = "", r) { const o = t => { if (!t) return t; if ("string" == typeof t) return this.isLoon() ? t : this.isQuanX() ? { "open-url": t } : this.isSurge() ? { url: t } : void 0; if ("object" == typeof t) { if (this.isLoon()) { let e = t.openUrl || t.url || t["open-url"], s = t.mediaUrl || t["media-url"]; return { openUrl: e, mediaUrl: s } } if (this.isQuanX()) { let e = t["open-url"] || t.url || t.openUrl, s = t["media-url"] || t.mediaUrl; return { "open-url": e, "media-url": s } } if (this.isSurge()) { let e = t.url || t.openUrl || t["open-url"]; return { url: e } } } }; if (this.isMute || (this.isSurge() || this.isLoon() ? $notification.post(e, s, i, o(r)) : this.isQuanX() && $notify(e, s, i, o(r))), !this.isMuteLog) { let t = ["", "==============\ud83d\udce3\u7cfb\u7edf\u901a\u77e5\ud83d\udce3=============="]; t.push(e), s && t.push(s), i && t.push(i), console.log(t.join("\n")), this.logs = this.logs.concat(t) } } log(...t) { t.length > 0 && (this.logs = [...this.logs, ...t]), console.log(t.join(this.logSeparator)) } logErr(t, e) { const s = !this.isSurge() && !this.isQuanX() && !this.isLoon(); s ? this.log("", `\u2757\ufe0f${this.name}, \u9519\u8bef!`, t.stack) : this.log("", `\u2757\ufe0f${this.name}, \u9519\u8bef!`, t) } wait(t) { return new Promise(e => setTimeout(e, t)) } done(t = {}) { const e = (new Date).getTime(), s = (e - this.startTime) / 1e3; this.log("", `\ud83d\udd14${this.name}, \u7ed3\u675f! \ud83d\udd5b ${s} \u79d2`), this.log(), (this.isSurge() || this.isQuanX() || this.isLoon()) && $done(t) } }(t, e) }
