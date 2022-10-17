
method = 'Get'
let get_arr = ['get', 'Get', 'GET']
let post_arr = ['post', 'Post', 'POST']


if (get_arr.indexOf(method) > -1) {
	console.log(`==================444======`);


} else if (post_arr.indexOf(method) > -1) {
	console.log(`==================222======`);


} else {
	console.log(`未知请求类型，请自行排查！`);}