var request = require('request');
var options = {
  'method': 'GET',
  'url': 'https://xfsh.sinopec.com/javaComm/cap-api/rest/api/cms/news/list?access_token=49eb6dcb4228ac1ca22df98c8bdea344&fkPlugId=224&pageSize=10&fkCateId=1589&isPart=true&pageNum=1',
  'headers': {
    'Host': 'xfsh.sinopec.com',
    'Content-Type': 'application/json'
  }
};
request(options, function (error, response) {
  if (error) throw new Error(error);
  console.log(response.body);
});
