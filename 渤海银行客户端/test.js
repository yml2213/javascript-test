/**
 * 获取当前年份 2022
 */
function local_year() {
    let myDate = new Date();
    y = myDate.getFullYear();
    return y;
}

/**
 * 获取当前月份(数字)  5月
 */
function local_month() {
    let myDate = new Date();
    let m = myDate.getMonth();
    return m;
}


/**
* 获取当前月份(数字)  05月 补零
*/
function local_month_two() {
    let myDate = new Date();
    let m = myDate.getMonth();
    if (m.toString().length == 1) {
        m = `0${m}`
    }
    return m;
}

/**
* 获取当前天数(数字)  5日  
*/
function local_day() {
    let myDate = new Date();
    let d = myDate.getDate();
    return d;
}


/**
* 获取当前天数  05日 补零
*/
function local_day_two() {
    let myDate = new Date();
    let d = myDate.getDate();
    if (d.toString().length == 1) {
        d = `0${d}`
    }
    return d;
}

console.log(local_day());



aa={
	"rt": 0,
	"data": {
		"signInRecordsResults": [
			0,
			0,
			0,
			0,
			0,
			0,
			0,
			0,
			0,
			0,
			2,
			1,
			1,
			1,
			1,
			1,
			3,
			1,
			1,
			1,
			1,
			1,
			1,
			1,
			1,
			1,
			1,
			1,
			1,
			1
		],
		"totalSignInDayNums": 1,
		"getExtraRewardNeedDays": 6,
		"extraRewardValues": 20,
		"hasSignInToday": true,
		"continuousSignInRewardNeedDay": 7
	}
}