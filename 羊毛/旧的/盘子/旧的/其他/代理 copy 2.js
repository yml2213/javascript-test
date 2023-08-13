const axios = require("axios");
tunnel

axios('https://www.lilnong.top/cors/sf2', {
	proxy: false,
	httpsAgent: tunnel.httpsOverHttp({
		proxy: {
			host: '106.15.107.36',//代理服务器域名或者ip
			port: 3128 //代理服务器端口
		}
	})
})
	.then(v => console.log(JSON.stringify(v.data)))
	.catch(v => console.log(v.message))