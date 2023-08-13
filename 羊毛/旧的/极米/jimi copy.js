var request = require('request')
var options = {
    'method': 'POST',
    'url': 'https://mobile-api.xgimi.com/app/v4/user/refreshToken',
    'headers': {
        'sign': '17c37569f0eb5cfa2d48d9b2b4509f96',
        'accessToken': 'QkI2Wm5ySlVpNkJQRllibHRkK0VrMTFxNDhiV2RmUTM2STdDTmRsOXc1dVZnN3lMWWMvaUp1RDlLVGU0em5QTUdhNVprNmdVL1JGU2ZDNW96aGtyMmYxak1rU0VTRUpQZG1tUzk3SGhGVmRLNmJoWWpEM0VNMFNLM3lzNmJ6cXdqRFJxS0lNZmFSNTdyMGFOdzZONzFyMlA0bktRdTBaOEVYd1RlV1hUVWlSOStNR0ttOTQ0M1laYmtUSnUxMlUyNlRxRXhDVzJ6QT09',
        'timestamp': '1685505988527',
        'user-agent': 'Mozilla/5.0 (Linux; Android 12; M2102J2SC Build/SKQ1.211006.001; wv) AppleWebKit/537.36 (KHTML, like Gecko) Version/4.0 Chrome/89.0.4389.72 MQQBrowser/6.2 TBS/046247 Mobile Safari/537.36 uni-app Html5Plus/1.0 (Immersed/32.727272)',
        'Content-Type': 'application/json'
    },
    body: JSON.stringify({
        "refreshToken": "REpQWU9wOXpNSFhZT0dDOXRjbGNxUjA1dTZuMzYrMUNYODkzWnNuOTBuQmtPbzBOVEhHWmp1aUZVdkhVOGU5RHpsZW9VMVRoZWViVWJCWXNuMzZzbDN3bWFEM0VzWDMzblpvMmNUVXlMYk9ZWEs3a0FjY05hcit5cEVNVjh5WVFQOFZaNUxjd3RhTktmQUFoOVlzR2tZeE81a2JwRXJ5ZXNzZ3hGYlU9"
    })

}
request(options, function (error, response) {
    if (error) throw new Error(error)
    console.log(response.body)
})