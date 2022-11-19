var axios = require('axios');
var qs = require('qs');
var data = qs.stringify({
	'type': 'signIn',
	'pid': '34'
});
var config = {
	method: 'post',
	url: 'http://api.xctd8.com/users/forum.json',
	headers: {
		'Token': 'dcd37b51d94bb8ab',
		'Sign': 'b154ba5c095da7bd8353acb0a7af8eb0',
		// 'Content-Type': 'application/x-www-form-urlencoded'
	},
	data: data
};

axios(config)
	.then(function (response) {
		console.log(JSON.stringify(response.data));
	})
	.catch(function (error) {
		console.log(error);
	});
