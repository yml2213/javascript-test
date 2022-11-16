var request = require('request');
var options = {
    'method': 'POST',
    'url': 'https://p.cztv.com/api/activity/mall/points/action/add?platform=Android&appVersion=1.5.0',
    'headers': {
        'type': 'activity',
        'sessionid': 'S10418fdfed62da5c5369bc3b48c24f5087e7',
        'content-type': 'application/json; charset=utf-8'
    },
    body: '{"action":8001,"dataId":"339086","sourceId":41,"ts":"1668610053619","md5":"eb9b518e11c3abf605000278553f7a69"}'

};
request(options, function (error, response) {
    if (error) throw new Error(error);
    console.log(response.body);
});