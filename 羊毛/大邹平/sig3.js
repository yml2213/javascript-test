var request = require('request')
var options = {
    'method': 'POST',
    'url': 'https://qfapi.dazouping.com/v5_0/user/login',
    'headers': {
        'codeSign': '7F22F688D54776C9587987504AC977F2',
        'channel': 'yingyongbao',
        'nonce': '455658d494b74e8fad6dba24b595e08a',
        'User-Agent': 'QianFan;dzp;Android;M2102J2SCXiaomi31;',
        'timestamp': '1690970806366',
        // 'date': '2023-08-02 18:06:46',
        'version': '6.6.0.0',
        'product-version': '541',
        'platform': 'Xiaomi M2102J2SC',
        'network': '1',
        'device': 'ODYyYjNjYTc4ZDUwNGE4Ng==',
        'screen-height': '2206',
        'system': '2',
        'system-version': '31',
        'third-app-token': 'a6f9DcFRjYONjFZX1%2FoEJr4xGMaR2fYFiLUk62ByGkbMUSu2A0gzQ6wNCXDMnchip1GpLR%2FkwNQ6OhEmJljTF%2BeYZIxMz6oPkMl5SUsniZUNaO8Ou3k64U%2FNGhCqwmZZR%2Bs0Wib8wWlRwbUz846HOHgw4wzCcZpPVIJNcHCPZMLTdKsqTh2kd9xRpmNQFFjxCXyMVNjwrClmRDFERawGpRCd8HZmAvGMTt1ODGVjAvLCgYfRHUwzyQJVnbm44JVB4a%2BwfF9LcAt%2BVGgDgPbRSNmXFyevmsna8DGtAZ9aV4yQwAfzCKszzIF2Rvr%2BNhDvzO%2BmFOXj5aDkBVUVZATUYfCM%2B8IfPA',
        'inner-version': '6.6.0.0',
        'screen-width': '1080',
        'Host': 'qfapi.dazouping.com',
        'Content-Type': 'application/json; charset=UTF-8'
    },
    body: '{"encode":1,"password":"eW1sMTIzNDU2\\n","black_box":"","username":"yml"}'

}
request(options, function (error, response) {
    if (error) throw new Error(error)
    console.log(response.body)
})