var request = require('request');
var options = {
    'method': 'POST',
    'url': 'https://api.jds.codes/jd/jCommand',
    'headers': {},
    formData: {
        // 'code': '23:/￥J9VyLDShmP%'

        // 'code': ' 26:/！P7IXn6fSKa！'
        // 'code': ' ！HCkS176ulA！'
        'code': ' ！N9hON0Vcmx！'
    }
};
request(options, function (error, response) {

    if (error) throw new Error(error);
    console.log(response.body);
    console.log(response.body.activityId);

    result = JSON.parse(response.body);



    console.log(`======================`);
    // console.log(result);
    console.log(result.data.jumpUrl);
    aa = result.data.jumpUrl.split('/');
    console.log(aa);
    console.log(aa[2]);
    url = `'https://${aa[2]}/ `
    console.log(url);
    console.log(`=======开始11=========`)
    // console.log(aa[7]);
    bb = result.data.jumpUrl.split('=');
    console.log(bb[1]);
    cc = bb[1].split('&');
    console.log(cc[0])
    console.log(`==========end=======`)


    activityId = cc[0];

    console.log(`================终极测试============`)
    console.log(`activityId=${activityId}`);
    console.log(`url=${url}`);


});

