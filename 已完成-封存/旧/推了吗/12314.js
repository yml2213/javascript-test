// var myDate = new Date();

// aa = myDate.getHours();       //获取当前小时数(0-23)
// console.log(local_minutes());

a = 1 % 2

// a = local_hours() % 2
console.log(a);



/**
 * 获取当前小时数 
 */

function local_hours() {
	let myDate = new Date();
	h = myDate.getHours();
	return h;
}

/**
 * 获取当前分钟数 
 */

function local_minutes() {
	let myDate = new Date();
	m = myDate.getMinutes();
	return m;
}