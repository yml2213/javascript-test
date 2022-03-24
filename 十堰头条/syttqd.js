var request = require('request');
var options = {
    'method': 'GET',
    'url': 'https://app.site.10yan.com.cn/index.php?s=/Api/Activityv1/sign&uid=452327',
    'headers': {
    }
};
request(options, function (error, response) {
    if (error) throw new Error(error);
    console.log(response.body);
});
