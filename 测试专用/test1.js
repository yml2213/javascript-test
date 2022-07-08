var request = require('request');
var options = {
  'method': 'POST',
  'url': 'https://wxa-tp.ezrpro.com/myvip/Vip/SignIn/SignIn',
  'headers': {
    'Host': 'wxa-tp.ezrpro.com',
    'Connection': 'keep-alive',
    'Content-Length': '36',
    'ezr-cop-id': '143',
    'charset': 'utf-8',
    'ezr-vuid': '83502527',
    'uber-trace-id': '53a3a62c359165a7:53a3a62c359165a7:0:1}',
    'ezr-sp': '2',
    'User-Agent': 'Mozilla/5.0 (Linux; Android 12; 22041211AC Build/SP1A.210812.016; wv) AppleWebKit/537.36 (KHTML, like Gecko) Version/4.0 Chrome/86.0.4240.99 XWEB/3171 MMWEBSDK/20211202 Mobile Safari/537.36 MMWEBID/3690 MicroMessenger/8.0.18.2061(0x28001240) Process/appbrand0 WeChat/arm64 Weixin GPVersion/1 NetType/WIFI Language/zh_CN ABI/arm64 MiniProgramEnv/android',
    'Accept-Encoding': 'gzip,compress,br,deflate',
    'ezr-source': 'weapp',
    'ezr-st': '1657245283381',
    'ezr-ss': '67d772578b8fe5fde7deb0b3a0d70e67781990c2',
    'ezr-userid': 'oMfWKs09zDDiGdi_wDfGrC_mAGgw',
    'ezr-sv': '1',
    'ezr-brand-id': '254',
    'content-type': 'application/json',
    'Referer': 'https://servicewechat.com/wx12e1cb3b09a0e6f0/72/page-frame.html'
  },
  body: JSON.stringify({
    "ActId": 784,
    "ActRemindStatus": true
  })

};
request(options, function (error, response) {
  if (error) throw new Error(error);
  console.log(response.body);
});
