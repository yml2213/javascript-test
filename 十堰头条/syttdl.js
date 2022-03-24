var request = require('request');
var options = {
    'method': 'POST',
    'url': 'https://app.site.10yan.com.cn/index.php?s=/Api/Loginv3/signInv3&password=a12345678&username=15339956683&token=0d452ae88fc9e47871a38cdc69d81a626b38a784',
    'headers': {
    }
};
request(options, function (error, response) {
    if (error) throw new Error(error);
    console.log(response.body);
});
