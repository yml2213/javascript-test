//添加账号后需要在后面添加一个逗号(英文输入法的),
//最后一个账号后面是没有逗号的
//变量不能使用单引号引起
module.exports = {
	"code": 200,
	"variable_data": {
		"kyin": [//这里是脚本标识,下面的 kyin 就是给快音脚本使用的标识
			"123456",//这是第一个账号
			"123456",//这是第二个账号
			"123456"//这是第三个账号
		]
	}
}

// device-id值&access-token值&refresh_token值
// 寻找方法:退出登录,开抓包,点微信登录成功后找 https://api.kaixinyf.cn/passport/UnionLogin 链接
// 注释: device-id值在请求头里面找,access-token值和refresh_token值在登录成功后 响应 里面找
// 84503033259df8d2&eyJleHAiOjE2NTE5MjY0MjUsImtpZCI6MCwiYWxnIjoiSFMyNTYifQ.eyJ1aWQiOiI5OTIwNDAzNiIsIm9wZW5pZCI6Im9ZYlZMeE1oUTR2d19RT3otQ253WWZPX1Y4RFUiLCJleHAiOjE2NTE5MjY0MjV9.Eyc0I1Rr0Swbp9ipXAoL4moFu7qoo-RMBJdwmmY032s&eyJleHAiOjE2NTk3MDA2MjUsImFsZyI6IkhTMjU2In0.eyJ1aWQiOiI5OTIwNDAzNiIsIm9wZW5pZCI6Im9ZYlZMeE1oUTR2d19RT3otQ253WWZPX1Y4RFUiLCJleHAiOjE2NTk3MDA2MjV9.9iXpTM9CoGZDjkgljAuWK2UgT_-VYyH1ZvSO80ROOkQ







aaaa = {
	"code": "0",
	"action": "toast",
	"message": "",
	"data": {
		"uid": "99204036",
		"nickname": "\u5feb\u97f3\u7528\u6237",
		"lz_openid": "56883ecb438c6882",
		"avatar": "https:\/\/static1.kaixinyf.cn\/img\/lza5f3f8dff0a9c6456082824.png",
		"referer_site": "kuaiyin_app_android_v5.15.05",
		"is_register": "0",
		"access_token": "eyJleHAiOjE2NTE5MjY0MjUsImtpZCI6MCwiYWxnIjoiSFMyNTYifQ.eyJ1aWQiOiI5OTIwNDAzNiIsIm9wZW5pZCI6Im9ZYlZMeE1oUTR2d19RT3otQ253WWZPX1Y4RFUiLCJleHAiOjE2NTE5MjY0MjV9.Eyc0I1Rr0Swbp9ipXAoL4moFu7qoo-RMBJdwmmY032s",
		"refresh_token": "eyJleHAiOjE2NTk3MDA2MjUsImFsZyI6IkhTMjU2In0.eyJ1aWQiOiI5OTIwNDAzNiIsIm9wZW5pZCI6Im9ZYlZMeE1oUTR2d19RT3otQ253WWZPX1Y4RFUiLCJleHAiOjE2NTk3MDA2MjV9.9iXpTM9CoGZDjkgljAuWK2UgT_-VYyH1ZvSO80ROOkQ",
		"redirect_uri": "https:\/\/h5.kaixinyf.cn\/red_envelopes",
		"gender": "\u672a\u77e5",
		"city": "",
		"birthday": "1970-01-01",
		"mobile": "",
		"age": 52,
		"register_time": 1651924581
	},
	"popup_windows": []
}
