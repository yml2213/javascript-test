var apple = {
	id: 1,
	name: "apple",
	price: 4
};

let dataArr = [
	{ '综合软件': 'b154ba5c095da7bd8353acb0a7af8eb0' },
	{ '综合游戏': 'a578d6963393a0d72a1c900de5f1f79a' },
	{ '美图写真': '4908a1e380e8da9d85442ced5a1f8ca5' },
	{ '沙雕天地': '041c2704ff667bb7dbf7cea2304761c0' },

	{ '夜间栏目': 'ae6a59074ad14f20f854f3eac466be27' },
	{ '番剧动漫': 'a7f8c91f8729761ac10b1fe158be4bd6' },
	{ '欧皇附体': '884907b7487d6f28f3772e100173a302' },
	{ '吹水混分': '45c6442d4f7a216b8cb6261d52eb60fd' },

	{ '官方公告': '3429ed0fec2353bf8fd8ded91ccf8976' },
	{ '求助专区': '2026a26be252af34d4c6737a34b14135' },
	{ '建议举报': '204cc7d5ab171066ac2f722badba4532' }
];


for (const item of dataArr) {
	// console.log(item)
	for (let key in item) { //数组对象遍历
		console.log(key); //获取key
		console.log(item[key]) //获取key的值

	}
}




// dataArr.forEach((value) => { //数组循环
// 	for (var pl in value) { //数组对象遍历
// 		console.log(pl); //获取key
// 		console.log(value[pl]) //获取key的值

// 	}

// })
