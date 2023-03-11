var request = require('request')
var options = {
  'method': 'POST',
  'url': 'https://apigateway.oppein.com/customercenter/anonymous/auth/v2/oauthLogin',
  'headers': {
    'AppCode': 'GRZX',
    'SubAppCode': 'GRZXMP001',
    'platform': 'mp-weixin',
    'appid': 'wx3713b1d8b100b0be',
    'Oauth2-AccessToken': '',
    'User-Agent': 'Apifox/1.0.0 (https://www.apifox.cn)',
    'content-type': 'application/json;charset=utf-8'
  },
  body: '{\n    "authResult": {\n        "errno": 0,\n        "code": "053Ccc000CBQvP17Sx000mrHDq1Ccc0T",\n        "errMsg": "login:ok",\n        "clientInfo": {\n            "wxdataQueueTimestamp": 1677289018168,\n            "isConfirm": false,\n            "wxlibCallbackTimestamp": 1677289018368,\n            "beginCGITimestamp": 1677289018168,\n            "queueLength": 0,\n            "beginCGITimestampAfterConfirm": 18446744073709552000,\n            "wxdataDequeueTimestamp": 1677289018168,\n            "CGICallbackTimestampAfterConfirm": 18446744073709552000,\n            "CGICallbackTimestamp": 1677289018368\n        }\n    },\n    "mtdsUserId": "",\n    "appid": "wx3713b1d8b100b0be",\n    "platform": "MP_WEIXIN",\n    "sourceChannel": ""\n}'

}
request(options, function (error, response) {
  if (error) throw new Error(error)
  console.log(response.body)
})