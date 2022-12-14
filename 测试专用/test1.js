let res = {
    "code": 20000,
    "message": null,
    "data": [{
        "id": 13,
        "taskName": "浏览首页8s",
        "taskCode": "SIGN_VIEW_INDEX_8_S",
        "frequency": 1,
        "currentFrequency": 1,
        "status": 1,
        "type": 1,
        "icon": "https://m-oss.yzw.cn/miniapp/lw-recruitment-miniapp/sign-in/task-view.png",
        "positionId": null,
        "rpPrize": 0.05
    }, {
        "id": 14,
        "taskName": "浏览职位详情5s",
        "taskCode": "SIGN_VIEW_POSITION_5_S",
        "frequency": 3,
        "currentFrequency": 3,
        "status": 1,
        "type": 1,
        "icon": "https://m-oss.yzw.cn/miniapp/lw-recruitment-miniapp/sign-in/task-view.png",
        "positionId": 48142,
        "rpPrize": 0.02
    }, {
        "id": 15,
        "taskName": "邀请新用户注册",
        "taskCode": "SIGN_INVITE",
        "frequency": 2,
        "currentFrequency": 2,
        "status": 1,
        "type": 1,
        "icon": "https://m-oss.yzw.cn/miniapp/lw-recruitment-miniapp/sign-in/task-invite.png",
        "positionId": null,
        "rpPrize": 0.3
    }, {
        "id": 18,
        "taskName": "分享职位给好友",
        "taskCode": "SIGN_SHARE_POSITION",
        "frequency": 2,
        "currentFrequency": 2,
        "status": 1,
        "type": 1,
        "icon": "https://m-oss.yzw.cn/miniapp/lw-recruitment-miniapp/sign-in/task-share.png",
        "positionId": null,
        "rpPrize": 0.02
    }, {
        "id": 16,
        "taskName": "评价已联系过的职位",
        "taskCode": "SIGN_EVALUATE",
        "frequency": 1,
        "currentFrequency": 0,
        "status": 0,
        "type": 1,
        "icon": "https://m-oss.yzw.cn/miniapp/lw-recruitment-miniapp/sign-in/task-evaluation.png",
        "positionId": null,
        "rpPrize": 0.05
    }]
}


let a = {
    "code": 20000,
    "message": null,
    "data": [{
        "id": 13,
        "taskName": "浏览首页8s",
        "taskCode": "SIGN_VIEW_INDEX_8_S",
        "frequency": 1,
        "currentFrequency": 1,
        "status": 1,
        "type": 1,
        "icon": "https://m-oss.yzw.cn/miniapp/lw-recruitment-miniapp/sign-in/task-view.png",
        "positionId": null,
        "rpPrize": 0.05
    }, {
        "id": 14,
        "taskName": "浏览职位详情5s",
        "taskCode": "SIGN_VIEW_POSITION_5_S",
        "frequency": 3,
        "currentFrequency": 3,
        "status": 1,
        "type": 1,
        "icon": "https://m-oss.yzw.cn/miniapp/lw-recruitment-miniapp/sign-in/task-view.png",
        "positionId": 48142,
        "rpPrize": 0.02
    }, {
        "id": 15,
        "taskName": "邀请新用户注册",
        "taskCode": "SIGN_INVITE",
        "frequency": 2,
        "currentFrequency": 2,
        "status": 1,
        "type": 1,
        "icon": "https://m-oss.yzw.cn/miniapp/lw-recruitment-miniapp/sign-in/task-invite.png",
        "positionId": null,
        "rpPrize": 0.3
    }, {
        "id": 18,
        "taskName": "分享职位给好友",
        "taskCode": "SIGN_SHARE_POSITION",
        "frequency": 2,
        "currentFrequency": 2,
        "status": 1,
        "type": 1,
        "icon": "https://m-oss.yzw.cn/miniapp/lw-recruitment-miniapp/sign-in/task-share.png",
        "positionId": null,
        "rpPrize": 0.02
    }, {
        "id": 16,
        "taskName": "评价已联系过的职位",
        "taskCode": "SIGN_EVALUATE",
        "frequency": 1,
        "currentFrequency": 0,
        "status": 0,
        "type": 1,
        "icon": "https://m-oss.yzw.cn/miniapp/lw-recruitment-miniapp/sign-in/task-evaluation.png",
        "positionId": null,
        "rpPrize": 0.05
    }]
}

let tasks = res.data
for (let index = 0; index < tasks.length; index++) {
    const element = tasks[index]

    console.log(element)

    // switch (element.id) {
    //     case 13: await this.viewHome()      //浏览首页8s
    //         break
    //     case 14: await this.viewJob()      // 浏览职位详情5s
    //         break
    //     case 15: await this.shareNew()      // 邀请新用户注册
    //         break
    //     case 16: await this.shareJob()      // 评价已联系过的职位
    //         break
    //     case 18: await this.shareFrind()      // 分享职位给好友
    //         break
    //     default:
    //         break
    // }

}