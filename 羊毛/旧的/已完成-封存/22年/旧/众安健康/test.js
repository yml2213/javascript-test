result = {
    code: "0",
    message: null,
    result: {
        amount: 10,
        remindStatus: false,
        count: 0,
        withdrawn: false,
        login: true,
        sumAllowWithdraw: 0,
        signInStatus: true,
        signInData: [
            { multiple: 1, status: true },
            { multiple: 2, status: false },
            { multiple: 1, status: false },
            { multiple: 1, status: false },
            { multiple: 3, status: false },
            { multiple: 1, status: false },
            { multiple: 6, status: false },
        ],
        holdChargePolicy: false,
        authSubscribeMessage: 0,
        valuableRewardList: [
            { amount: "+0.05", awardDetailId: 8719320, desc: "签到" },
        ],
        productRecommend: {
            G202202070005: {
                link: "https://ihealth.zhongan.com/insure/gt?channelCode=1000000004&channelSource=T202203150201070094&goodsCode=G202202070005&iseeTap=Y&sign=dCoB-REYo5yOkcTKT632WA&version=V1&taskId=110&activityCode=ONA20220411001",
                status: false,
            },
            G202112010002: {
                link: "https://ihealth.zhongan.com/insure/gt?channelCode=1000000004&channelSource=T202112130104385017&goodsCode=G202112010002&iseeTap=Y&sign=-SLKxJu_FmnKupUbatBhTw&version=V1&taskId=110&activityCode=ONA20220411001",
                status: false,
            },
            G202112290002: {
                link: "https://ihealth.zhongan.com/insure/gt?channelCode=1000000004&channelSource=T202201270105290018&goodsCode=G202112290002&iseeTap=Y&sign=_pW0z_hud2sy0B9sGpAhYQ&version=V1&taskId=110&activityCode=ONA20220411001",
                status: false,
            },
        },
        sumAward: 0,
    },
};



// console.log(result.result.valuableRewardList[0].awardDetailId);
let Arr = result.result.valuableRewardList;

if (result.result.valuableRewardList.length != 0) {
    for (let index = 0; index < Arr.length; index++) {
        // const element = array[index];
        if (Arr[index].desc == '签到') {
            id = Arr[index].awardDetailId;
            console.log(id);
            break;
        }

    }
}