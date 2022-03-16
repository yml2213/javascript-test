let request = require('request');
let headers = { };
let options = {
    url: 'https://app.site.10yan.com.cn/index.php?s=/Api/Article/index/&contentid=762529&page=1&uid=452326',
    headers: headers
};
function callback(error, response, body2) {
    if (!error && response.statusCode == 200) {
        // console.log(body2);
        var wzpl_data = JSON.parse(body2);
        for (let i = 0; i < wzpl_data.list.length; i++) {
            wzpl = wzpl_data.list[i].userid;
            console.log(wzpl)
            if (wzpl == 452326) {
                console.log(`====111=====`)
                console.log(wzpl_data.list[i].pid)
                console.log(`=====22=====`)
            }
        }

    }
}

request(options, callback);