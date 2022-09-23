var request = require('request');
var options = {
   'method': 'POST',
   'url': 'https://api.hinan8.com/api/PlayerVue/Login?b8ef038bdc27fc47a5087ce0f63e7622=1663871556-eff63fe88d844043f7abd8e3fae53a9de9a4-0-3dd9186fffef544bbc9b4eabfaed60f2',
   'headers': {
      'authority': 'api.hinan8.com',
      'pragma': 'no-cache',
      'token': '',
      'x-requested-with': 'XMLHttpRequest',
      'content-type': 'application/json'
   },
   body: JSON.stringify({
      "password": "zjhn123456",
      "username": "15336657654",
      "checked": true,
      "show": false,
      "url": "https://hi-www.kinkino.com/DownApp",
      "IsKeepPWD": false
   })

};
request(options, function (error, response) {
   if (error) throw new Error(error);
   console.log(response.body);
});