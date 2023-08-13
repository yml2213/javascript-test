var request = require('request');
var options = {
  'method': 'POST',
  'url': 'https://h5.guang.com/live/ump/roll-dice-general/post-finish-panel-task/dice',
  'headers': {
    'Host': 'h5.guang.com',
    'charset': 'utf-8',
    'content-type': 'application/json',
    'extra-data': '{"guangSid":"985856407649955840fnCE42m4","appId":"wxa2e624400134d690","is_weapp":1,"version":"3.1.19","sid":"YZ985856407113715712YZe7pNHcVV"}',
  },
  body: JSON.stringify({
    "taskType": 100301
  })

};
request(options, function (error, response) {
  if (error) throw new Error(error);
  console.log(response.body);
});
