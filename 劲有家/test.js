result = {
    "code": 200,
    "msg": "操作成功",
    "data": {
        "DINGXIANG": [{
            "id": 1450531,
            "activityId": 1,
            "activityType": "HEALTH_CARE",
            "custId": "1583508566839529472",
            "cardId": 9,
            "cardRecordId": 0,
            "cardName": "丁香卡",
            "cardType": "DINGXIANG",
            "recordType": 1,
            "taskType": null,
            "isUse": 0,
            "useTime": null,
            "cardUrl": null,
            "cardTextUrl": null,
            "cardNoTextUrl": null,
            "createTime": "2022-10-22 02:15:30"
        }],
        "HUANGQI": [{
            "id": 1450397,
            "activityId": 1,
            "activityType": "HEALTH_CARE",
            "custId": "1583508566839529472",
            "cardId": 7,
            "cardRecordId": 0,
            "cardName": "黄芪卡",
            "cardType": "HUANGQI",
            "recordType": 3,
            "taskType": null,
            "isUse": 0,
            "useTime": null,
            "cardUrl": null,
            "cardTextUrl": null,
            "cardNoTextUrl": null,
            "createTime": "2022-10-22 02:12:20"
        }],
        "ROUGUI": [{
            "id": 1450411,
            "activityId": 1,
            "activityType": "HEALTH_CARE",
            "custId": "1583508566839529472",
            "cardId": 8,
            "cardRecordId": 0,
            "cardName": "肉桂卡",
            "cardType": "ROUGUI",
            "recordType": 4,
            "taskType": 13,
            "isUse": 0,
            "useTime": null,
            "cardUrl": null,
            "cardTextUrl": null,
            "cardNoTextUrl": null,
            "createTime": "2022-10-22 02:12:39"
        }]
    }
}


let obj = result.data
let keysArr = Object.keys(obj)
let valuesArr = Object.values(obj)

for (const key of keysArr) {
    this.card_name = obj[key][0].cardName
    this.cardId = obj[key][0].cardId
    this.activityId = obj[key][0].activityId

    console.log(this.card_name, this.cardId, this.activityId);

}

// console.log(obj.DINGXIANG);

// console.log(keysArr,valuesArr);