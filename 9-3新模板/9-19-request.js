// import got from 'got';
const got = require("got");

const { data } = got.get('https://baidu.com/', {
	// json: {
	// 	hello: 'world'
	// }
});

console.log(data);
//=> {"hello": "world"}