var request = require('request');
var options = {
  'method': 'POST',
  'url': 'https://qrappser.cheryev.cn/cheryev/crm/user/login',
  'headers': {
    'Host': 'qrappser.cheryev.cn',
    'Content-Type': 'application/json',
    'User-Agent': 'NewEnergy/1.0.5 (com.mychery.ev; build:094; iOS 15.4.1) Alamofire/5.4.3 version=1.0.5 buildVersion=094 systemName=iOS systemVersion=15.4.1 model=iPhone modelName=iPhone14,2',
    'Accept-Language': 'zh-Hans-CN;q=1.0, en-CN;q=0.9',
    'Cookie': 'HWWAFSESID=d229876dbe31a24088; HWWAFSESTIME=1651897088683'
  },
  body: JSON.stringify({
    "account": "13754650804",
    "password": "qr123456"
  })

};
request(options, function (error, response) {
  if (error) throw new Error(error);
  console.log(response.body);
});
