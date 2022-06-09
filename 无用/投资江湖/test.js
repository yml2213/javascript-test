var request = require('request');
var options = {
  'method': 'POST',
  'url': 'https://www.hatzjh.com/center/handle',
  'headers': {
    'Host': 'www.hatzjh.com',
    'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8',
    'Cookie': 'PHPSESSID=bt2soeovv3h9mi0ctfp6oinav5; PHPSESSID_NS_Sig=oenCV6mfy3oi7BO_'
  },
  body: '_csrf=sTSmrDIGNFA5XtbpVrIz9LwJCVjzBZok-sqTGDW8O_3EGcTld39jAQ0n46FnimyX7z1ECMpz32jJh-N7YNlutQ%3D%3D&type=sign'

};
request(options, function (error, response) {
  if (error) throw new Error(error);
  console.log(response.body);
});
