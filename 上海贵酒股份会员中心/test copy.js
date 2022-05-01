var request = require('request');
var options = {
  'method': 'POST',
  'url': 'https://mapi.weimob.com/api3/misc/sign/activity/c/signMainInfo',
  'headers': {
    'x-wx-token': 'jsc2skp.f3ccf6fb-4fbd-429a-9d7b-3122715bbc5c',
    'Content-Type': 'application/json'
  },
  body: JSON.stringify({
    "appid": "wxc8a4966e81ed5d22",
    "pid": "4002654669566",
    "source": 1
  })

};
request(options, function (error, response) {
  if (error) throw new Error(error);
  console.log(response.body);
});
