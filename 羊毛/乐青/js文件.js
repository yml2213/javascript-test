(function(root, factory) {
	'use strict';
	if (typeof define === 'function' && define.amd) {
		define([], function(vuecallback) {
			if (!root.CP) {
				factory(function(api) {
					if (!root.CP) {
						root.CP = api;
						root.cloudplate = root.CP._core;
						if (window) {
							window.CP = api;
							window.cloudplate = root.CP._core;
						}
						root.CP._init();
						vuecallback && vuecallback();
					}
				});
			}
		});
	} else if (typeof exports === 'object') {
		module.exports = function(vuecallback) {
			if (!root.CP) {
				factory(function(api) {
					if (!root.CP) {
						root.CP = api;
						root.cloudplate = root.CP._core;
						if (window) {
							window.CP = api;
							window.cloudplate = root.CP._core;
						}
						root.CP._init();
						vuecallback && vuecallback();
						return api;
					}
					return root.CP;
				});
			}
		};
	} else {
		if (!root.CP) {
			factory(function(api) {
				if (!root.CP) {
					root.CP = api;
					root.cloudplate = root.CP._core;
					if (window) {
						window.CP = api;
						window.cloudplate = root.CP._core;
					}
					root.CP.start = 1;
				}
			});
		}
	}
})(this, function(initcallback) {
	var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function(obj) {
			return typeof obj;
		} : function(obj) {
			return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj;
		};
	var _cp_config = {
		common_file_path: 'https://cdn-cp.tmuyun.com/jssdk/v1/',
		wx_api_url: 'https://api.tmuyun.com/home/wx/index',
		dd_api_url: 'https://g.alicdn.com/dingding/open-develop/1.9.0/dingtalk.js',
		version: 'tmcdn v1 2.30.32 TS',
		debug: false,
		yun_dun_url: {
			url: 'https://acstatic-dun.126.net/tool.min.js'
		},
		download_url: {
			harvestapp: 'https://harvest.tmuyun.com/download.html',
			zjxw: 'https://zj.zjol.com.cn/d',
			h24: navigator.userAgent.toLowerCase().match(/android/i) != "android" ? 'https://itunes.apple.com/us/app/zhe-jiang24xiao-shi/id566529085?mt=8' : 'http://a.app.qq.com/o/simple.jsp?pkgname=com.cmstop.qjwb',
			wx: 'http://sj.qq.com/myapp/detail.htm?apkName=com.tencent.mm',
			zjolapp: 'https://tm.zjol.com.cn/download.html',
			jxrb: '',
			zaxw: '',
			hbxw: navigator.userAgent.toLowerCase().match(/android/i) == "android" ? 'https://www.pgyer.com/zjnews_android' : 'https://www.pgyer.com/zjnews_ios',
			haishu: navigator.userAgent.toLowerCase().match(/android/i) == "android" ? 'https://sj.qq.com/appdetail/com.pailian.haishu' : 'https://itunes.apple.com/cn/app/id1487930727',
			xsb_keqiaotong: 'https://vapp.tmuyun.com/webDetails/download.html?tenant_id=2',
			xsb_iwenling: 'https://vapp.tmuyun.com/webDetails/download.html?tenant_id=3',
			xsb_jingning: 'http://app.jnbctv.com/webDetails/download.html?tenant_id=4',
			xsb_tiantai: 'http://app.ttcmzx.cn/client/download.html?&tenant_id=5',
			xsb_muguang: 'https://vapp.tmuyun.com/webDetails/download.html?tenant_id=6',
			xsb_haigang: 'https://vapp.tmuyun.com/webDetails/download.html?tenant_id=7',
			xsb_lishui: 'https://vapp.tmuyun.com/client/download.html?tenant_id=10',
			xsb_nanxun: 'https://vapp.tmuyun.com/client/download.html?tenant_id=11',
			xsb_nayong: 'https://vapp.tmuyun.com/webDetails/download.html?tenant_id=12',
			xsb_fuquan: 'https://vapp.tmuyun.com/client/download.html?tenant_id=13',
			xsb_pujiang: 'https://vapp.tmuyun.com/webDetails/download.html?tenant_id=14',
			xsb_jinsha: 'https://vapp.tmuyun.com/webDetails/download.html?tenant_id=15',
			xsb_jinhai: 'https://vapp.tmuyun.com/webDetails/download.html?tenant_id=16',
			xsb_zhijin: 'https://vapp.tmuyun.com/webDetails/download.html?tenant_id=17',
			xsb_changshan: '',
			xsb_beilun: 'http://d.maps9.com/l6j3',
			xsb_wuxin: 'https://vapp.tmuyun.com/webDetails/download.html?tenant_id=26',
			xsb_jiangshan: 'https://vapp.tmuyun.com/webDetails/download.html?tenant_id=24',
			xsb_jiaojiang: 'https://vapp.tmuyun.com/webDetails/download.html?tenant_id=23',
			xsb_daishan: 'https://vapp.tmuyun.com/webDetails/download.html?tenant_id=27',
			xsb_lucheng: 'https://vapp.tmuyun.com/webDetails/download.html?tenant_id=28',
			xsb_kecheng: '',
			xsb_shengzhou: 'https://vapp.tmuyun.com/webDetails/download.html?tenant_id=25',
			xsb_yuecheng: 'https://vapp.tmuyun.com/webDetails/download.html?tenant_id=31',
			xsb_weining: 'https://vapp.tmuyun.com/webDetails/download.html?tenant_id=32',
			xsb_panan: 'https://vapp.tmuyun.com/webDetails/download.html?tenant_id=30',
			xsb_dinghai: 'https://vapp.tmuyun.com/webDetails/download.html?tenant_id=22',
			xsb_linhai: 'https://vapp.tmuyun.com/webDetails/download.html?tenant_id=33',
			xsb_zhuji: 'https://vapp.tmuyun.com/webDetails/download.html?tenant_id=34',
			xsb_pingyang: 'https://vapp.tmuyun.com/webDetails/download.html?tenant_id=35',
			xsb_yongkang: 'https://vapp.tmuyun.com/webDetails/download.html?tenant_id=36',
			xsb_gdzj: 'https://vapp.tmuyun.com/webDetails/download.html?tenant_id=39',
			xsb_yueqing: 'https://vapp.tmuyun.com/webDetails/download.html?tenant_id=41',
			xsb_huangyan: 'https://vapp.tmuyun.com/webDetails/download.html?tenant_id=43',
			xsb_shangyu: 'https://vapp.tmuyun.com/webDetails/download.html?tenant_id=44',
			kxz: 'https://xiuzhou.jiaxingren.com/download',
			xsb_linpin: 'https://vapp.tmuyun.com/webDetails/download.html?tenant_id=45',
			xsb_miaody: 'https://vapp.tmuyun.com/webDetails/download.html?tenant_id=37',
			xsb_zjnx: 'https://vapp.tmuyun.com/webDetails/download.html?tenant_id=47',
			xsb_ruian: 'https://vapp.tmuyun.com/webDetails/download.html?tenant_id=48',
			xsb_dongyang: 'https://vapp.tmuyun.com/client/download.html?&tenant_id=49',
			xsb_yaojie: 'https://vapp.tmuyun.com/client/download.html?&tenant_id=50',
			xsb_longwan: 'https://vapp.tmuyun.com/client/download.html?&tenant_id=51',
			xsb_yijujiande: 'https://vapp.tmuyun.com/client/download.html?&tenant_id=53',
			xsb_shengsi: 'https://vapp.tmuyun.com/client/download.html?&tenant_id=54',
			xsb_quzhou: 'https://vapp.tmuyun.com/client/download.html?&tenant_id=55',
			xsb_linan: 'https://vapp.tmuyun.com/client/download.html?&tenant_id=56',
			xsb_nanhu: 'https://vapp.tmuyun.com/client/download.html?&tenant_id=57',
			xsb_longgangzaixian: 'https://vapp.tmuyun.com/client/download.html?&tenant_id=58',
			xsb_xiaosatonglu: 'https://vapp.tmuyun.com/client/download.html?&tenant_id=59',
			xsb_aihaiyan: 'https://vapp.tmuyun.com/client/download.html?&tenant_id=60',
			xsb_yinxiang: 'https://vapp.tmuyun.com/client/download.html?&tenant_id=61',
			xsb_xianju: 'https://vapp.tmuyun.com/client/download.html?&tenant_id=62',
			xsb_wangchao: 'https://vapp.tmuyun.com/client/download.html?&tenant_id=64',
			xsb_dujia: 'https://vapp.jiaxingren.com/client/download.html?tenant_id=46',
			uapphybridjs: '',
			xsb_putuo: 'https://vapp.tmuyun.com/client/download.html?&tenant_id=67',
			xsb_xiaoshanfabu: 'https://vapp.tmuyun.com/client/download.html?&tenant_id=66',
			xsb_diyangxinwen: 'https://vapp.tmuyun.com/webDetails/download.html?tenant_id=68',
			xsb_zssy: 'https://vapp.tmuyun.com/webDetails/download.html?tenant_id=69',
			xsb_baidaodongtou: 'https://vapp.tmuyun.com/webDetails/download.html?tenant_id=70',
			xsb_fenghua: 'https://vapp.tmuyun.com/webDetails/download.html?tenant_id=71',
			xsb_lanjingling: 'https://vapp.tmuyun.com/webDetails/download.html?tenant_id=72',
			xsb_wuyi: 'https://vapp.tmuyun.com/webDetails/download.html?tenant_id=73',
			xsb_cangnan: 'https://vapp.tmuyun.com/webDetails/download.html?tenant_id=74',
			xsb_yongjia: 'https://vapp.tmuyun.com/webDetails/download.html?tenant_id=75',
			xsb_xiangshan: 'https://vapp.tmuyun.com/webDetails/download.html?tenant_id=76',
			xsb_qingtian: 'https://vapp.tmuyun.com/webDetails/download.html?tenant_id=77',
			xsb_ouhai: 'https://vapp.tmuyun.com/webDetails/download.html?tenant_id=78',
			xsb_zhangshangqingyuan: 'https://vapp.tmuyun.com/webDetails/download.html?tenant_id=79',
			xsb_suiyue: 'https://vapp.tmuyun.com/webDetails/download.html?tenant_id=80',
			xsb_yunhe: 'https://vapp.tmuyun.com/webDetails/download.html?tenant_id=81',
			xsb_zhangshangjinyun: 'https://vapp.tmuyun.com/webDetails/download.html?tenant_id=82',
			xsb_jinpinghu: 'https://vapp.tmuyun.com/webDetails/download.html?tenant_id=83',
			xsb_aitongxiang: 'https://vapp.tmuyun.com/webDetails/download.html?tenant_id=84',
			xsb_qujiang: 'https://vapp.tmuyun.com/webDetails/download.html?tenant_id=85',
			xsb_zhenhai: 'https://vapp.tmuyun.com/webDetails/download.html?tenant_id=86',
			xsb_xihu: 'https://vapp.tmuyun.com/webDetails/download.html?tenant_id=87',
			xsb_tianxialongquan: 'https://vapp.tmuyun.com/webDetails/download.html?tenant_id=88',
			xsb_khhdf: 'https://vapp.tmuyun.com/webDetails/download.html?tenant_id=89'
		},
		_open_params: {
			zjxw: {
				link: ''
			},
			h24: {
				protocol: 'h24app',
				link: ''
			},
			wx: {},
			zjolapp: {},
			harvestapp: {
				protocol: 'shouhuo',
				link: 'harvest.tmuyun.com?url=',
				weidown: true,
				pkgname: 'com.zjonline.harvest'
			},
			jxrb: {},
			zaxw: '',
			haishu: {
				protocol: 'haishu',
				link: '',
				weidown: false,
				pkgname: '',
				wxappid: ''
			},
			xsb_keqiaotong: {
				protocol: 'zjonline',
				link: '',
				weidown: false,
				pkgname: '',
				wxopenappid: '',
				bundleid: '',
				tenantId: 2
			},
			xsb_nanxun: {
				protocol: 'zjonlinenanxun',
				link: '',
				weidown: true,
				pkgname: 'com.zjonline.nanxun',
				wxappid: 'wx0f83f10fd49a6dca',
				wxopenappid: 'wx0f83f10fd49a6dca',
				bundleid: '',
				tenantId: 11
			},
			xsb_muguang: {
				protocol: 'zjonlinemuguang',
				link: '',
				weidown: false,
				pkgname: 'com.zjonline.muguang',
				wxappid: 'wx359e278f825c977a',
				wxopenappid: 'wx359e278f825c977a',
				bundleid: '',
				tenantId: 6
			},
			xsb_iwenling: {
				protocol: 'wenling',
				link: '',
				weidown: true,
				pkgname: 'com.zjonline.iwenling',
				wxappid: 'wx132d0c96357b5636',
				wxopenappid: 'wxb7f2b76a74b6c24c',
				bundleid: 'com.zjdaily.zhwl',
				tenantId: 3
			},
			xsb_jingning: {
				protocol: 'zjonlinejingning',
				link: '',
				weidown: true,
				pkgname: 'com.zjonline.jingning',
				wxappid: 'wxaeda59d14ebab920',
				wxopenappid: 'wxaeda59d14ebab920',
				bundleid: '',
				tenantId: 4
			},
			xsb_tiantai: {
				protocol: 'zjonlinetiantai',
				link: '',
				weidown: true,
				pkgname: 'com.zjonline.tiantai',
				wxappid: 'wx4bf11317c0fdbcee',
				wxopenappid: 'wx4bf11317c0fdbcee',
				bundleid: '',
				tenantId: 5
			},
			xsb_haigang: {
				protocol: 'zjonlinehaigang',
				link: '',
				weidown: false,
				pkgname: 'com.zjonline.haigang',
				wxappid: 'wxe36d2719c5b40652',
				wxopenappid: 'wxe36d2719c5b40652',
				bundleid: '',
				tenantId: 7
			},
			xsb_lishui: {
				protocol: 'lishui',
				link: '',
				weidown: true,
				pkgname: 'com.zjonline.lsrb',
				wxappid: 'wx1adb47070e7667c4',
				wxopenappid: 'wx1adb47070e7667c4',
				bundleid: '',
				tenantId: 10
			},
			xsb_nayong: {
				protocol: 'zjonlinegtny',
				link: '',
				weidown: false,
				pkgname: 'com.zjonline.gtny',
				wxappid: 'wx548a928e91059d6b',
				wxopenappid: 'wx548a928e91059d6b',
				bundleid: '',
				tenantId: 12
			},
			xsb_pujiang: {
				protocol: 'pujiang',
				link: '',
				weidown: false,
				pkgname: 'com.zjonline.pujiang',
				wxappid: 'wxed3ed9b957dc3b88',
				wxopenappid: 'wxed3ed9b957dc3b88',
				bundleid: '',
				tenantId: 14
			},
			xsb_jinsha: {
				protocol: 'jinsha',
				link: '',
				weidown: false,
				pkgname: 'com.zjonline.jinsha',
				wxappid: 'wxcbb785b05388b37e',
				wxopenappid: 'wxcbb785b05388b37e',
				bundleid: '',
				tenantId: 15
			},
			xsb_jinhai: {
				protocol: 'jinhai',
				link: '',
				weidown: false,
				pkgname: 'com.zjonline.meilijinhai',
				wxappid: 'wx96d8592354c33a66',
				wxopenappid: 'wx96d8592354c33a66',
				bundleid: '',
				tenantId: 16
			},
			xsb_zhijin: {
				protocol: 'zhijin',
				link: '',
				weidown: false,
				pkgname: '',
				wxopenappid: '',
				bundleid: '',
				tenantId: 17
			},
			xsb_beilun: {
				protocol: 'lunchuan',
				link: '',
				weidown: true,
				pkgname: 'com.zjonline.lunchuan',
				wxappid: 'wxc63f9645ed3bdc54',
				wxopenappid: 'wxc63f9645ed3bdc54',
				bundleid: '',
				tenantId: 18
			},
			xsb_changshan: {
				protocol: 'changshan',
				link: '',
				weidown: true,
				pkgname: 'com.zjonline.changshan',
				wxappid: 'wxdd863bccf30ebabc',
				wxopenappid: 'wxdd863bccf30ebabc',
				bundleid: '',
				tenantId: 19
			},
			xsb_dinghai: {
				protocol: 'dinghai',
				link: '',
				weidown: true,
				pkgname: 'com.zjonline.dinghai',
				wxappid: 'wx0dd5010ca8dbd2d6',
				wxopenappid: 'wx0dd5010ca8dbd2d6',
				bundleid: '',
				tenantId: 22
			},
			xsb_jiaojiang: {
				protocol: 'zjonlinejiaojiang',
				link: '',
				weidown: false,
				pkgname: 'com.zjonline.jiaojiang',
				wxappid: 'wx8a11dfd3f1fa8181',
				wxopenappid: 'wx8a11dfd3f1fa8181',
				bundleid: '',
				tenantId: 23
			},
			xsb_jiangshan: {
				protocol: 'jiangshan',
				link: '',
				weidown: true,
				pkgname: 'com.zjonline.jiangshan',
				wxappid: 'wx691d0438d192adbe',
				wxopenappid: 'wx691d0438d192adbe',
				bundleid: '',
				tenantId: 24
			},
			xsb_shengzhou: {
				protocol: 'shengzhou',
				link: '',
				weidown: true,
				pkgname: 'com.zjonline.shengzhou',
				wxappid: 'wx7b5df03581ea09c5',
				wxopenappid: 'wx7b5df03581ea09c5',
				bundleid: '',
				tenantId: 25
			},
			xsb_wuxin: {
				protocol: 'wuxing',
				link: '',
				weidown: true,
				pkgname: 'com.zjonline.wuxing',
				wxappid: 'wx9dbca42102f9e2cb',
				wxopenappid: 'wx9dbca42102f9e2cb',
				bundleid: '',
				tenantId: 26
			},
			xsb_daishan: {
				protocol: 'daishan',
				link: '',
				weidown: true,
				pkgname: 'com.zjonline.daishan',
				wxappid: 'wx8b2ce57ab0148604',
				wxopenappid: 'wx8b2ce57ab0148604',
				bundleid: '',
				tenantId: 27
			},
			xsb_lucheng: {
				protocol: 'lucheng',
				link: '',
				weidown: true,
				pkgname: 'com.zjonline.lucheng',
				wxappid: 'wxafb0be171f615d65',
				wxopenappid: 'wxafb0be171f615d65',
				bundleid: '',
				tenantId: 28
			},
			xsb_kecheng: {
				protocol: 'kecheng',
				link: '',
				weidown: true,
				pkgname: 'com.zjonline.kecheng',
				wxappid: 'wxaaeb7ca0c8c1788c',
				wxopenappid: 'wxaaeb7ca0c8c1788c',
				bundleid: '',
				tenantId: 29
			},
			xsb_panan: {
				protocol: 'panan',
				link: '',
				weidown: true,
				pkgname: 'com.zjonline.panan',
				wxappid: 'wx606c3f396ce9540c',
				wxopenappid: 'wx606c3f396ce9540c',
				bundleid: '',
				tenantId: 30
			},
			xsb_yuecheng: {
				protocol: 'yuchengqu',
				link: '',
				weidown: true,
				pkgname: 'com.zjonline.yuecheng',
				wxappid: 'wx83ad1fccbf68f0e8',
				wxopenappid: 'wx83ad1fccbf68f0e8',
				bundleid: '',
				tenantId: 31
			},
			xsb_linhai: {
				protocol: 'zjonlinelinhai',
				link: '',
				weidown: false,
				pkgname: 'net.lh168.linhaizaixian',
				wxopenappid: '',
				bundleid: '',
				tenantId: 33
			},
			xsb_zhuji: {
				protocol: 'zjonlinezhuji',
				link: '',
				weidown: true,
				pkgname: 'com.zjonline.zhuji',
				wxappid: 'wxcede425e8ce94abc',
				wxopenappid: 'wxcede425e8ce94abc',
				bundleid: '',
				tenantId: 34
			},
			xsb_pingyang: {
				protocol: 'zjonlinepingyang',
				link: '',
				weidown: true,
				pkgname: 'com.zjonline.pingyang',
				wxappid: 'wx09185ef2a02a4d75',
				wxopenappid: 'wx09185ef2a02a4d75',
				bundleid: '',
				tenantId: 35
			},
			xsb_yongkang: {
				protocol: 'zjonlineyongkang',
				link: '',
				weidown: true,
				pkgname: 'com.zjonline.yongkang',
				wxappid: '',
				wxopenappid: 'wx4a8222cc8337feee',
				bundleid: '',
				tenantId: 36
			},
			xsb_gdzj: {
				protocol: 'zjonlinegdzj',
				link: '',
				weidown: true,
				pkgname: 'com.zjonline.gdzj',
				wxappid: 'wx879d48d0864a31cc',
				wxopenappid: 'wx879d48d0864a31cc',
				bundleid: '',
				tenantId: 39
			},
			xsb_yueqing: {
				protocol: 'zjonlineyueqing',
				link: '',
				weidown: true,
				pkgname: 'com.zjonline.yueqing',
				wxappid: 'wx1864ef5b35836316',
				wxopenappid: 'wx1864ef5b35836316',
				bundleid: '',
				tenantId: 41
			},
			xsb_huangyan: {
				protocol: 'zjonlinehuangyan',
				link: '',
				weidown: true,
				pkgname: 'com.zjonline.huangyan',
				wxappid: 'wxa61dbdb465654b21',
				wxopenappid: 'wxa61dbdb465654b21',
				bundleid: '',
				tenantId: 43
			},
			xsb_shangyu: {
				protocol: 'baiguanxinwen',
				link: '',
				weidown: false,
				pkgname: 'com.headline.ipn',
				wxappid: 'wx9a403cd87f62024f',
				wxopenappid: 'wx9a403cd87f62024f',
				bundleid: '',
				tenantId: 44
			},
			ohnews: {
				protocol: 'ohnews',
				link: 'web?link=',
				weidown: true,
				pkgname: 'net.ohnews.www'
			},
			xsb_linpin: {
				protocol: 'linpinapp',
				link: 'web?link=',
				weidown: true,
				pkgname: 'com.zjonline.linping',
				wxappid: 'wxa216792310d736fc',
				wxopenappid: 'wxa216792310d736fc',
				bundleid: '',
				tenantId: 45
			},
			xsb_miaody: {
				protocol: 'miaody',
				link: 'web?link=',
				weidown: true,
				pkgname: 'com.zjonline.diany',
				wxappid: 'wxe02510c32052b73a',
				wxopenappid: 'wxe02510c32052b73a',
				bundleid: '',
				tenantId: 37
			},
			xsb_zjnx: {
				protocol: 'xsbzjnx',
				link: 'web?link=',
				weidown: false,
				pkgname: 'com.zjonline.zjnx',
				wxappid: 'wx856068da861a2814',
				wxopenappid: 'wx856068da861a2814',
				bundleid: '',
				tenantId: 47
			},
			xsb_ruian: {
				protocol: 'ruianxinwen',
				link: 'web?link=',
				weidown: true,
				pkgname: 'com.test.android.app.ruian',
				wxappid: 'wx75f853080e977231',
				wxopenappid: 'wx75f853080e977231',
				bundleid: '',
				tenantId: 48
			},
			xsb_dongyang: {
				protocol: 'gehuadongyang',
				link: 'web?link=',
				weidown: true,
				pkgname: 'com.hoge.android.app.dongyang',
				wxappid: 'wx126e56269be37f86',
				wxopenappid: 'wx126e56269be37f86',
				bundleid: '',
				tenantId: 49
			},
			xsb_yaojie: {
				protocol: 'xsbyuyao',
				link: 'web?link=',
				weidown: true,
				pkgname: 'com.aheading.news.yaojiermt',
				wxappid: 'wxc83e150b8a00477d',
				wxopenappid: 'wxc83e150b8a00477d',
				bundleid: '',
				tenantId: 50
			},
			xsb_longwan: {
				protocol: 'yuelongwan',
				link: 'web?link=',
				weidown: true,
				pkgname: 'net.lwnews.www',
				wxappid: 'wxe880f3ed8154c1c1',
				wxopenappid: 'wx84a8a9a5498c909c',
				bundleid: '',
				tenantId: 51
			},
			xsb_yijujiande: {
				protocol: 'yijujiande',
				link: 'web?link=',
				weidown: true,
				pkgname: 'com.zjonline.jiande',
				wxappid: 'wx5acd6c9e4036f60c',
				wxopenappid: 'wx4fce544c4947530d',
				bundleid: 'com.zjonline.jiande',
				tenantId: 53
			},
			xsb_shengsi: {
				protocol: 'zhangshangshengsi',
				link: 'web?link=',
				weidown: false,
				pkgname: 'com.zyjc.ssplatform',
				wxappid: 'wx8e3f75154fbd22f9',
				wxopenappid: 'wxc1e3617d7eb90a45',
				bundleid: '',
				tenantId: 54
			},
			xsb_quzhou: {
				protocol: 'xsbquzhou',
				link: 'web?link=',
				weidown: true,
				pkgname: 'com.qzrb.qzapp',
				wxappid: 'wx9bfaad8202805f20',
				wxopenappid: 'wxcba5dcc3d405ba9c',
				bundleid: 'com.qzrb.qzapp',
				tenantId: 55
			},
			xsb_linan: {
				protocol: 'linan',
				link: 'web?link=',
				weidown: true,
				pkgname: 'com.meilianji.ailinan',
				wxappid: 'wx9c3d7240471e0c83',
				wxopenappid: 'wx9c3d7240471e0c83',
				bundleid: '',
				tenantId: 56
			},
			xsb_nanhu: {
				protocol: 'nanhushengyin',
				link: 'web?link=',
				weidown: true,
				pkgname: 'com.zsjx.nanhu',
				wxappid: 'wxc2c0946efcd2bb2b',
				wxopenappid: 'wxc2c0946efcd2bb2b',
				bundleid: '',
				tenantId: 57
			},
			xsb_longgangzaixian: {
				protocol: 'longgang',
				link: 'web?link=',
				weidown: true,
				pkgname: 'com.zjonline.longgang',
				wxappid: 'wx6e864a715acd3efe',
				wxopenappid: 'wxc3012192e11c1ffd',
				bundleid: 'com.hoge.WifiLonggang',
				tenantId: 58
			},
			xsb_xiaosatonglu: {
				protocol: 'xstonglu',
				link: 'web?link=',
				weidown: true,
				pkgname: 'com.chinamcloud.wangjie.b87d8fb20e29a0328c6e21045e8b500e',
				wxappid: 'wx6ad640d5655f5642',
				wxopenappid: 'wx4024730cf6409310',
				bundleid: '',
				tenantId: 59
			},
			xsb_aihaiyan: {
				protocol: 'aihaiyan',
				link: 'web?link=',
				weidown: true,
				pkgname: 'com.hoge.android.app.haiyan',
				wxappid: 'wx3033e999eda5c870',
				wxopenappid: 'wx4528bde4f05eef6b',
				bundleid: 'com.hoge.WifiHaiYan',
				tenantId: 60
			},
			xsb_yinxiang: {
				protocol: 'xsbyinzhou',
				link: 'web?link=',
				weidown: true,
				pkgname: 'com.founder.yinzhou',
				wxappid: 'wxcb0936125e917512',
				wxopenappid: 'wxcb0936125e917512',
				bundleid: 'com.founder.yinzhouxinwen',
				tenantId: 61
			},
			xsb_xianju: {
				protocol: 'xsbxianju',
				link: 'web?link=',
				weidown: true,
				pkgname: 'com.increator.cc.xianjusmk',
				wxappid: 'wx29f6bb748bf8e5f2',
				wxopenappid: 'wx530e54eef9762c38',
				bundleid: 'com.zjonline.xianju',
				tenantId: 62
			},
			xsb_wangchao: {
				protocol: 'wangchao',
				link: 'web?link=',
				weidown: true,
				pkgname: 'com.shangc.tiennews.taizhou',
				wxappid: 'wx24603f0479c565e1',
				wxopenappid: 'wx32c6abf49431c93e',
				bundleid: 'com.huidu.taizhounews',
				tenantId: 64
			},
			xsb_dujia: {
				protocol: 'dujia',
				link: 'web?link=',
				weidown: true,
				pkgname: 'com.hoge.android.app.hdd',
				wxappid: 'wxfb74880657e25289'
			},
			xsb_putuo: {
				protocol: 'xsbputuo',
				link: 'web?link=',
				weidown: true,
				pkgname: 'com.shixian.putuo',
				wxappid: 'wxcdc4dcbb13aa4e28',
				wxopenappid: 'wxcfe5728db90c64b5',
				bundleid: 'com.cztv.putuo',
				tenantId: 67
			},
			xsb_xiaoshanfabu: {
				protocol: 'xiaoshanfabu',
				link: 'web?link=',
				weidown: true,
				pkgname: 'com.wisexs.xstv',
				wxappid: 'wxef14ad0022d5b766',
				wxopenappid: 'wx5656247d9748cfee',
				bundleid: 'com.cztv.zhxs',
				tenantId: 66
			},
			xsb_diyangxinwen: {
				protocol: 'diyangxinwen',
				link: 'web?link=',
				weidown: true,
				pkgname: 'com.chinamcloud.wangjie.a3283eba9fbb2be252ff95aa8df491a9e',
				wxappid: 'wx3966eb11f7400c5c',
				wxopenappid: 'wx4af31588305767a9',
				bundleid: 'com.chinamcloud.wangjie.a3283eba9fbb2be252ff95aa8df491a9e',
				tenantId: 68
			},
			xsb_zssy: {
				protocol: 'zssongyang',
				link: 'web?link=',
				weidown: true,
				pkgname: 'com.shixian.songyang',
				wxappid: 'wx2b75e9596243fa60',
				wxopenappid: 'wxf0de36e04598a764',
				bundleid: '',
				tenantId: 69
			},
			xsb_baidaodongtou: {
				protocol: 'baidaodongtou',
				link: 'web?link=',
				weidown: true,
				pkgname: 'com.shixian.dongtou',
				wxappid: 'wx3ad4230e53cf9d5c',
				wxopenappid: 'wxb0eb13807e5b8eab',
				bundleid: 'com.dttv.dongtou',
				tenantId: 70
			},
			xsb_fenghua: {
				tenantId: "71",
				"link": "web?link=",
				pkgname: "com.hoge.android.app.fenghua",
				bundleid: "com.hoge.ios.fenghua",
				wxopenappid: "wx7bcf3a98fcbd14c0",
				wxappid: "wx0ca01ae4d5501543",
				weidown: true,
				protocol: "xsbfenghua"
			},
			xsb_lanjingling: {
				tenantId: "72",
				"link": "web?link=",
				pkgname: "com.shixian.lanxi",
				bundleid: "com.lxrmtzx.lanxi",
				wxopenappid: "wxfe1cec03eda46695",
				wxappid: "wxaa348b400e2a5e30",
				weidown: true,
				protocol: "lanjingling"
			},
			xsb_wuyi: {
				tenantId: "73",
				"link": "web?link=",
				pkgname: "com.shixian.wuyi",
				bundleid: "com.cztv.wuyi",
				wxopenappid: "wx7cd2008f2df75f23",
				wxappid: "wx9f971e2413733c1d",
				weidown: false,
				protocol: "xsbwuyi"
			},
			xsb_cangnan: {
				tenantId: "74",
				"link": "web?link=",
				pkgname: "com.shixian.cangnan",
				bundleid: "com.cangnantai.cangnan",
				wxopenappid: "wxc315bfd66920230c",
				wxappid: "wx8b51740e7a1f9360",
				weidown: false,
				protocol: "kancangnan"
			},
			xsb_yongjia: {
				tenantId: "75",
				"link": "web?link=",
				pkgname: "com.shixian.yongjia",
				bundleid: "com.cztv.yongjia",
				wxopenappid: "wx77be2d441cf65afa",
				wxappid: "wx7493dcc3aebcb585",
				weidown: true,
				protocol: "jryongjia"
			},
			xsb_xiangshan: {
				tenantId: "76",
				"link": "web?link=",
				pkgname: "com.aheading.news.xiangshanrb",
				bundleid: "hz.aheading.mobile.inewsread.xiangshan",
				wxopenappid: "wxaae687185fb297e5",
				wxappid: "wxafd411ba757062c3",
				weidown: true,
				protocol: "shanhaiwanxiang"
			},
			xsb_qingtian: {
				tenantId: "77",
				"link": "web?link=",
				pkgname: "com.shixian.qingtian",
				bundleid: "com.cztv.qingtian",
				wxopenappid: "wxa660e70d2eff5e31",
				wxappid: "wx8e10a76d69dfd990",
				weidown: true,
				protocol: "xsbqingtian"
			},
			xsb_ouhai: {
				tenantId: "78",
				"link": "web?link=",
				pkgname: "net.ohnews.www",
				bundleid: "net.ohnews.www",
				wxopenappid: "wx4f11e835849de2aa",
				wxappid: "wx25c83008203618f4",
				weidown: true,
				protocol: "xsbouhai"
			},
			xsb_zhangshangqingyuan: {
				tenantId: "79",
				"link": "web?link=",
				pkgname: "com.cztv.qingyuan",
				bundleid: "com.cztv.qingyuanNew",
				wxopenappid: "wx823ce1616438c080",
				wxappid: "wx222bcb2cc62cde5a",
				weidown: false,
				protocol: "zhangshangqingyuan"
			},
			xsb_suiyue: {
				tenantId: "80",
				"link": "web?link=",
				pkgname: "com.shixian.suichang",
				bundleid: "com.sctv.suichang",
				wxopenappid: "wxea39761601f35d30",
				wxappid: "wx5e0a19cc694c10f6",
				weidown: true,
				protocol: "suiyue"
			},
			xsb_yunhe: {
				tenantId: "81",
				"link": "web?link=",
				pkgname: "com.cztv.yunhe",
				bundleid: "com.cztv.yunhe",
				wxopenappid: "wxdf2b66db95038b9a",
				wxappid: "wx45058bb2cefe1ab6",
				weidown: true,
				protocol: "thyunhe"
			},
			xsb_zhangshangjinyun: {
				tenantId: "82",
				"link": "web?link=",
				pkgname: "com.shixian.jinyun",
				bundleid: "com.cztv.jinyun",
				wxopenappid: "wx0a925c2486d7ed01",
				wxappid: "wx46a3a234ca17a64c",
				weidown: false,
				protocol: "zhangshangjinyun"
			},
			xsb_jinpinghu: {
				tenantId: "83",
				"link": "web?link=",
				pkgname: "com.shixian.pinghu",
				bundleid: "com.hogesoft.xigotv",
				wxopenappid: "wx21676b59aaffc2e7",
				wxappid: "wxd80a1a2027371d0d",
				weidown: false,
				protocol: "jinpinghu"
			},
			xsb_aitongxiang: {
				tenantId: "84",
				"link": "web?link=",
				pkgname: "com.hoge.android.app.tongxiang",
				bundleid: "com.hoge.WifiTongxiang",
				wxopenappid: "wx77c1faf8c858a07e",
				wxappid: "wx800658acf14e1f58",
				weidown: true,
				protocol: "aitongxiang"
			},
			xsb_zhenhai: {
				tenantId: "86",
				"link": "web?link=",
				pkgname: "com.aheading.news.zhenhairb",
				bundleid: "hz.aheading.mobile.inewsread.jrzhbs",
				wxopenappid: "wx0c7a4369cac28025",
				wxappid: "wx42bb1c0386fac20b",
				weidown: true,
				protocol: "xsbzhenhai"
			},
			xsb_xihu: {
				tenantId: "87",
				"link": "web?link=",
				pkgname: "com.cztv.xihu",
				bundleid: "com.cztv.xihu",
				wxopenappid: "wxb103971a969b4bbd",
				wxappid: "wx9f971e2413733c1d",
				weidown: false,
				protocol: "xsbxihu"
			},
			xsb_tianxialongquan: {
				tenantId: "88",
				"link": "web?link=",
				pkgname: "com.cztv.longquan",
				bundleid: "com.cztv.longquan",
				wxopenappid: "wx536480c627bb7c94",
				wxappid: "wx983f61fc67bcb02e",
				weidown: true,
				protocol: "tianxialongquan"
			},
			xsb_qujiang: {
				tenantId: "85",
				"link": "web?link=",
				pkgname: "com.cztv.qujiang",
				bundleid: "com.cztv.yilangqujiang",
				wxopenappid: "wxb7186b6e9aba52ea",
				wxappid: "wx6133d292b500e7c1",
				weidown: true,
				protocol: "xsbqujiang"
			},
			xsb_khhdf: {
				tenantId: "89",
				"link": "web?link=",
				pkgname: "com.shixian.kaihua",
				bundleid: "com.cztv.kaihua",
				wxopenappid: "wxa7c40b517afc04ec",
				wxappid: "wxebc1593a8c8a6333",
				weidown: true,
				protocol: "xsbkhhdf"
			}
		},
		_custom_params: {
			uapphybridjsAccessKey: 'InBmHK71JJ'
		}
	};

	function timeout(callback, time) {
		var timer = null;
		if (typeof callback != 'function') {
			return timer;
		}
		timer = setTimeout(function() {
			callback();
		}, time || 0);
		return timer;
	}
	var Driver = function(readycallback) {
		var driverIsLoading = false;
		var drivers = {
			harvestapp: {
				driver_params: {},
				preloadfiles: [],
				check: function(callback) {},
				load: function(driver_params, callback) {
					Request._loadResource(this.preloadfiles, function() {
						callback(driver_params);
					});
				},
				init: function(options, client_info) {
					var driver_var = this;
					driver_var['_options'] = options;
					options.ready(client_info);
				},
				filterUrl: function(url) {
					return url;
				},
				delegate: function(event, data, client_info) {
					data = data ? data : '';
					var _options = this._options;
					if (!(typeof(ZBJTJSBridge) === 'object' && typeof ZBJTJSBridge.invoke == 'function')) {
						driverIncompatible(data, event, true);
						cloudplate.trigger(event, '');
						return;
					}
					switch (event) {
						case 'show_login':
							ZBJTJSBridge.invoke('login', '', Core.loadCallbackFunctions('show_login', function(sResult) {
								CP.tools.writelog('run callback_show_login', sResult);
								var client = {
									unique_id: '',
									account_id: '',
									'is_login': '0'
								};
								var request = 0;
								if (typeof data == 'string' && data) {
									try {
										data = JSON.parse(data);
										request = data.request ? 1 : 0;
									} catch (e) {
										Tools.setError({
											code: 101,
											msg: e.name,
											data: e
										});
									}
								}
								ZBJTJSBridge.invoke('getUserInfo', '{"signParaList":["id","nick_name","mobile"],"request":' + request + '}', Core.loadCallbackFunctions('show_login', function(cResult) {
									CP.tools.writelog('run callback_show_login_reset', cResult);
									if (typeof(cResult) == 'string' && cResult.indexOf("{") === 0) {
										cResult = JSON.parse(cResult);
									}
									if (cResult.code === '1') {
										client.unique_id = cResult.data.sessionId;
										client.account_id = cResult.data.accountId;
										client.is_login = cResult.data.login;
									}
									cloudplate.trigger('reset', client, '', data._cp_event.reset[0]);
								}));
							}));
							break;
						case 'is_login':
							var request = 0;
							if (typeof data == 'string' && data) {
								try {
									data = JSON.parse(data);
									request = data.request ? 1 : 0;
								} catch (e) {
									Tools.setError({
										code: 101,
										msg: e.name,
										data: e
									});
								}
							}
							ZBJTJSBridge.invoke('getUserInfo', '{"signParaList":["id","nick_name","mobile"],"request":' + request + '}', Core.loadCallbackFunctions('is_login', function(cResult) {
								CP.tools.writelog('run callback_is_login', result);
								if (typeof(cResult) == 'string' && cResult.indexOf("{") === 0) {
									cResult = JSON.parse(cResult);
								}
								var res = {
									is_login: cResult.data.login
								};
								cloudplate.trigger('is_login', res, '', data._cp_event.is_login[0]);
							}));
							break;
						case 'get_unique_id':
							var request = 0;
							if (typeof data == 'string' && data) {
								try {
									data = JSON.parse(data);
									request = data.request ? 1 : 0;
								} catch (e) {
									Tools.setError({
										code: 101,
										msg: e.name,
										data: e
									});
								}
							}
							ZBJTJSBridge.invoke('getUserInfo', '{"signParaList":["id","nick_name","mobile"],"request":' + request + '}', Core.loadCallbackFunctions('get_unique_id', function(cResult) {
								CP.tools.writelog('run callback_get_unique_id', cResult);
								if (typeof(cResult) == 'string' && cResult.indexOf("{") === 0) {
									cResult = JSON.parse(cResult);
								}
								var res = {
									unique_id: cResult.data.sessionId
								};
								cloudplate.trigger('get_unique_id', res, '', data._cp_event.get_unique_id[0]);
							}));
							break;
						case 'get_account_id':
							var request = 0;
							if (typeof data == 'string' && data) {
								try {
									data = JSON.parse(data);
									request = data.request ? 1 : 0;
								} catch (e) {
									Tools.setError({
										code: 101,
										msg: e.name,
										data: e
									});
								}
							}
							ZBJTJSBridge.invoke('getUserInfo', '{"signParaList":["id","nick_name","mobile"],"request":' + request + '}', Core.loadCallbackFunctions('get_account_id', function(cResult) {
								CP.tools.writelog('run callback_get_account_id', cResult);
								if (typeof(cResult) == 'string' && cResult.indexOf("{") === 0) {
									cResult = JSON.parse(cResult);
								}
								var accountId = cResult.data.accountId ? cResult.data.accountId : cResult.data.user.id;
								var res = {
									account_id: accountId
								};
								cloudplate.trigger('get_account_id', res, '', data._cp_event.get_account_id[0]);
							}));
							break;
						case 'get_client_info':
							ZBJTJSBridge.invoke('getAppInfo', '{"uuid":1}', Core.loadCallbackFunctions('get_client_info', function(cResult) {
								CP.tools.writelog('run callback_get_client_info', cResult);
								var res = {
									client_code: '',
									version: '',
									versionName: '',
									detail: ''
								};
								try {
									if (typeof(cResult) == 'string' && cResult.indexOf("{") === 0) {
										cResult = JSON.parse(cResult);
									}
									if (cResult.code == 1) {
										res.client_code = cResult.data.app;
										res.version = cResult.data.version;
										res.versionName = cResult.data.versionName ? cResult.data.versionName : cResult.data.version;
										res.detail = cResult.data;
									}
								} catch (e) {
									Tools.setError({
										code: 101,
										msg: e.name,
										data: e
									});
								}
								cloudplate.trigger('get_client_info', res, '', data._cp_event.get_client_info[0]);
							}));
							break;
						case 'get_device_info':
							ZBJTJSBridge.invoke('getAppInfo', JSON.stringify({
								uuid: 1
							}), Core.loadCallbackFunctions('get_device_info', function(cResult) {
								CP.tools.writelog('run callback_get_device_info', cResult);
								var result = {
									device_no: '',
									system: '',
									system_version: '',
									device_type: '',
									timestamp: '',
									signature: '',
									networkType: '',
									systemVersion: ''
								};
								var device_type = CP.tools.browser(true),
									system = '';
								if (typeof device_type === 'string') {
									if (device_type.indexOf('IOS') != -1 || device_type.indexOf('ios') != -1) {
										system = 'IOS';
									} else if (device_type.indexOf('ANDROID') != -1 || device_type.indexOf('android') != -1) {
										system = 'android';
									}
								}
								result.system = system;
								try {
									if (cResult && typeof cResult === 'string') {
										cResult = JSON.parse(cResult);
									}
									if (cResult.code == 1) {
										result.timestamp = cResult.data.timestamp;
										result.device_no = cResult.data.uuid;
										result.signature = cResult.data.signature;
										result.system_version = cResult.data.version;
										result.device_type = cResult.data.device;
										result.networkType = cResult.data.networkType;
										result.systemVersion = cResult.data.systemVersion;
										result.system = cResult.data.system ? cResult.data.system : system;
										result.versionName = cResult.data.versionName ? cResult.data.versionName : cResult.data.version;
									}
								} catch (e) {
									Tools.setError({
										code: 101,
										msg: e.name,
										data: e
									});
								}
								cloudplate.trigger('get_device_info', result, '', data._cp_event.get_device_info[0]);
							}));
							break;
						case 'reset':
							break;
						case 'get_css_mode':
							cloudplate.trigger('mode_change', {
								mode: 'day'
							});
							break;
						case 'show_share':
							if (typeof data == 'string') {
								try {
									data = JSON.parse(data);
								} catch (e) {
									Tools.setError({
										code: 101,
										msg: e.name,
										data: e
									});
								}
							}
							var shareTitle = data.title ? data.title : '',
								shareSummary = data.shareSummary ? data.shareSummary : '',
								shareLink = data.link ? data.link : '',
								shareImage = data.imgUrl ? data.imgUrl : '',
								uid = data.id ? data.id : '',
								uidType = data.type ? data.type : 9,
								videoUrl = data.videoUrl || '',
								audioUrl = data.audioUrl || '';
							var isPicShare = false;
							if (shareTitle == '' && shareSummary == '' && shareLink == '' && shareImage) {
								isPicShare = true;
							}
							ZBJTJSBridge.invoke('openAppShareMenu', JSON.stringify({
								title: shareTitle,
								desc: shareSummary,
								link: shareLink,
								imgUrl: shareImage,
								onlyImageShare: isPicShare == true ? 1 : 0,
								videoUrl: videoUrl,
								audioUrl: audioUrl,
								uidType: uidType
							}), Core.loadCallbackFunctions('show_share', function(cResult) {
								var result = {
									result: 'fail',
									shareTo: '',
									allow_alert: '1'
								};
								CP.tools.writelog('run callback_show_share', cResult);
								try {
									if (cResult && typeof cResult === 'string') {
										cResult = JSON.parse(cResult);
									}
									if (cResult.code === '1') {
										result.result = 'success';
									}
									var shareToMap = {
										"1": 'AppMessage',
										"2": 'Timeline',
										"3": 'DingDing',
										"4": 'ShareQQ',
										"5": 'WeiBo',
										"6": 'QQZone'
									};
									if (cResult && cResult.data && cResult.data.shareTo && shareToMap[cResult.data.shareTo]) {
										result.shareTo = shareToMap[cResult.data.shareTo];
									} else {
										if (cResult && cResult.data) {
											result.shareTo = cResult.data.shareTo;
										}
									}
								} catch (e) {
									Tools.setError({
										code: 101,
										msg: e.name,
										data: e
									});
									result.result = 'fail';
								}
								cloudplate.trigger('get_share_result', result, '', data._cp_event.get_share_result[0]);
							}));
							break;
						case 'get_location_info':
							ZBJTJSBridge.invoke('getLocation', '', Core.loadCallbackFunctions('get_location_info', function(cResult) {
								var result = {
									lat: '',
									lon: '',
									radius: '',
									city: '',
									addr: '',
									speed: '',
									accuracy: ''
								};
								CP.tools.writelog('run callback_zjxw_invoke_getLocation', cResult);
								try {
									if (cResult && typeof cResult === 'string') {
										cResult = JSON.parse(cResult);
									}
									if (cResult && cResult.data && cResult.code == 1) {
										result.lat = cResult.data.latitude;
										result.lon = cResult.data.lontitude;
										result.radius = cResult.data.accuracy;
										result.city = cResult.data.city;
										result.addr = cResult.data.address;
										result.speed = cResult.data.speed;
										result.time = cResult.data.timestamp;
									}
								} catch (e) {
									Tools.setError({
										code: 101,
										msg: e.name,
										data: e
									});
								}
								cloudplate.trigger('address_change', result, '', data._cp_event.address_change[0]);
							}));
							break;
						case 'get_customer_info':
							var request = 0;
							if (typeof data == 'string' && data) {
								try {
									data = JSON.parse(data);
									request = data.request ? 1 : 0;
								} catch (e) {
									Tools.setError({
										code: 101,
										msg: e.name,
										data: e
									});
								}
							}
							ZBJTJSBridge.invoke('getUserInfo', '{"signParaList":["id","nick_name","mobile"],"request":' + request + '}', Core.loadCallbackFunctions('get_customer_info', function(cResult) {
								CP.tools.writelog('run callback_zjxw_invoke_getUserInfo', cResult);
								var result = {};
								try {
									if (typeof(cResult) == 'string' && cResult.indexOf("{") === 0) {
										cResult = JSON.parse(cResult);
									}
									if (cResult && cResult.data.user) {
										result = {
											account_id: cResult.data.accountId,
											session_id: cResult.data.sessionId,
											username: cResult.data.user.nick_name,
											head_img: cResult.data.user.image_url,
											nick_name: cResult.data.user.nick_name,
											score: cResult.data.user.total_score,
											mobile: cResult.data.user.phone_number,
											ref_code: cResult.data.user.ref_code,
											ref_user_uid: cResult.data.user.ref_user_uid,
											ref_user_code: cResult.data.user.ref_user_code,
											invitation_number: cResult.data.user.invitation_number,
										};
										result.user = cResult.data.user;
									}
								} catch (e) {
									Tools.setError({
										code: 101,
										msg: e.name,
										data: e
									});
								}
								cloudplate.trigger('get_customer_info', result, '', data._cp_event.get_customer_info[0]);
							}));
							break;
						case 'get_download_info':
							cloudplate.trigger('get_download_info', {
								to_new_verison: function() {
									window.location.href = _cp_config.download_url.zjolapp;
								},
								alertinfo: '',
								downloadlink: _cp_config.download_url.zjolapp
							});
							break;
						case 'get_ip':
							driverIncompatible(data, 'get_ip');
							cloudplate.trigger('get_ip', '');
							break;
						case 'get_image':
							ZBJTJSBridge.invoke('selectImage', JSON.stringify(data), Core.loadCallbackFunctions('get_image', function(cResult) {
								CP.tools.writelog('run callback_get_image', cResult);
								var result = {};
								try {
									if (typeof(cResult) == 'string' && cResult.indexOf("{") === 0) {
										cResult = JSON.parse(cResult);
									}
									result = {
										address: cResult.data.imageList ? cResult.data.imageList : [],
										id: '',
										sizeType: data.sizeType ? data.sizeType : 'original',
										sourceType: data.sourceType ? data.sourceType : '',
										count: data.count ? data.count : 1,
										dataType: data.dataType ? data.dataType : 'addr',
										data: cResult.data.base64List && cResult.data.base64List.length ? cResult.data.base64List : []
									};
								} catch (e) {
									Tools.setError({
										code: 101,
										msg: e.name,
										data: e
									});
								}
								cloudplate.trigger('get_image', result, '', data._cp_event.get_image[0]);
							}));
							break;
						case 'get_voice':
							driverIncompatible(data, 'get_voice');
							cloudplate.trigger('get_voice', '');
							break;
						case 'start_voice':
							data.recordId = data.id;
							ZBJTJSBridge.invoke('startRecord', JSON.stringify(data), Core.loadCallbackFunctions('start_voice', function(cResult) {
								CP.tools.writelog('run callback_zjxw_invoke_startRecord', cResult);
								var result = {
									id: '',
									code: '',
									address: ''
								};
								try {
									if (typeof(cResult) == 'string' && cResult.indexOf("{") === 0) {
										cResult = JSON.parse(cResult);
									}
									if (cResult.data && cResult.code) {
										result['code'] = cResult.code;
										result['id'] = cResult.data.recordId ? cResult.data.recordId : '';
										if (cResult.code === '1') {
											result['address'] = cResult.data.audioPath;
										}
									}
								} catch (e) {
									Tools.setError({
										code: 101,
										msg: e.name,
										data: e
									});
								}
								cloudplate.trigger('stop_voice', JSON.stringify(result), '', data._cp_event.stop_voice[0]);
							}));
							break;
						case 'file_upload':
							data.serverUrl = data.serviceurl;
							data.localUrl = data.localfile;
							data.fileName = data.filename;
							data.inputName = data.inputname;
							ZBJTJSBridge.invoke('uploadFile', JSON.stringify(data), Core.loadCallbackFunctions('file_upload', function(cResult) {
								CP.tools.writelog('run callback_zjxw_invoke_uploadFile', cResult);
								var result = {
									requestcode: 0,
									'return': '',
									info: ''
								};
								try {
									if (typeof(cResult) == 'string' && cResult.indexOf("{") === 0) {
										cResult = JSON.parse(cResult);
									}
									if (cResult === 'undefined' || !cResult) {
										cResult = '';
										result.requestcode = -1;
									}
									cResult.code ? result.requestcode = cResult.code : '';
									if (cResult.code === 1 || cResult.code === '1') {
										result.requestcode = 0;
									}
									cResult.data && cResult.data.response ? result.
									return = cResult.data.response : '';
								} catch (e) {
									Tools.setError({
										code: 101,
										msg: e.name,
										data: e
									});
								}
								cloudplate.trigger('file_upload', JSON.stringify(result), '', data._cp_event.file_upload[0]);
							}));
							break;
						case 'stop_voice':
							driverIncompatible(data, 'stop_voice');
							cloudplate.trigger('stop_voice', '');
							break;
						case 'get_video':
							driverIncompatible(data, 'get_video');
							cloudplate.trigger('get_video', '');
							break;
						case 'get_scan_qr':
							driverIncompatible(data, 'get_scan_qr');
							cloudplate.trigger('get_scan_qr', '');
							break;
						case 'search_beacons':
							driverIncompatible(data, 'search_beacons');
							cloudplate.trigger('search_beacons', '');
							break;
						case 'shake':
							driverIncompatible(data, 'shake');
							cloudplate.trigger('shake', '');
							break;
						case 'close':
							ZBJTJSBridge.invoke('closeWindow', JSON.stringify(data), Core.loadCallbackFunctions('close', function(cResult) {
								cloudplate.trigger('close');
							}));
							break;
						case 'set_data':
							(data.storage === 0 || data.storage === '0') ? data.option = '0' : data.option = '1';
							ZBJTJSBridge.invoke('saveValueToLocal', JSON.stringify(data), Core.loadCallbackFunctions('set_data', function(cResult) {
								CP.tools.writelog('run callback_zjxw_invoke_saveValueToLocal', cResult);
								var result = {};
								try {
									if (typeof(cResult) == 'string' && cResult.indexOf("{") === 0) {
										cResult = JSON.parse(cResult);
									}
									result = {
										success: cResult.code ? '1' : '0',
									};
								} catch (e) {
									Tools.setError({
										code: 101,
										msg: e.name,
										data: e
									});
								}
								cloudplate.trigger('set_data', result, '', data._cp_event.set_data[0]);
							}));
							break;
						case 'get_data':
							var result = '';
							(data.storage === 0 || data.storage === '0') ? data.option = '0' : data.option = '1';
							ZBJTJSBridge.invoke('getValueFromLocal', JSON.stringify(data), Core.loadCallbackFunctions('set_data', function(cResult) {
								CP.tools.writelog('run callback_zjxw_invoke_getValueFromLocal', cResult);
								var result = {};
								try {
									if (typeof(cResult) == 'string' && cResult.indexOf("{") === 0) {
										if (cResult.indexOf('+zjxw+') !== -1) {
											cResult = cResult.replace('\+zjxw\+\\\"', '');
											cResult = cResult.replace('\\\"-zjxw-', '');
										}
										cResult = JSON.parse(cResult);
									}
									result = {
										success: cResult.code + '',
										key: cResult.data.key ? cResult.data.key : '',
										data: cResult.data.value ? cResult.data.value : '',
									};
								} catch (e) {
									Tools.setError({
										code: 101,
										msg: e.name,
										data: e
									});
								}
								cloudplate.trigger('get_data', result, '', data._cp_event.get_data[0]);
							}));
							break;
						case 'set_share':
							if (typeof data == 'string') {
								try {
									data = JSON.parse(data);
								} catch (e) {
									Tools.setError({
										code: 101,
										msg: e.name,
										data: e
									});
								}
							}
							var shareTitle = data.title ? data.title : '',
								shareSummary = data.shareSummary ? data.shareSummary : '',
								shareLink = data.link ? data.link : '',
								shareImage = data.imgUrl ? data.imgUrl : '',
								shareUrlScheme = data.shareUrlScheme ? data.shareUrlScheme : '',
								videoUrl = data.videoUrl || '',
								audioUrl = data.audioUrl || '',
								isPicShare = false;
							if (shareTitle == '' && shareSummary == '' && shareLink == '' && shareImage) {
								isPicShare = true;
							}
							var shareToMap = {
								"1": 'AppMessage',
								"2": 'Timeline',
								"3": 'DingDing',
								"4": 'ShareQQ',
								"5": 'WeiBo',
								"6": 'QQZone'
							};
							ZBJTJSBridge.invoke('updateAppShareData', JSON.stringify({
								title: shareTitle,
								desc: shareSummary,
								link: shareLink,
								imgUrl: shareImage,
								onlyImageShare: isPicShare == true ? 1 : 0,
								videoUrl: videoUrl,
								audioUrl: audioUrl,
								callback: Core.loadCallbackFunctions('set_share_success', function(cResult) {
									CP.tools.writelog('run callback_success_updateAppShareData', cResult);
									var result = {
										success: 0
									};
									try {
										if (typeof(cResult) == 'string' && cResult.indexOf("{") === 0) {
											cResult = JSON.parse(cResult);
										}
										result.success = cResult.code || 0;
										if (cResult && cResult.data.shareTo && shareToMap[cResult.data.shareTo]) {
											result.shareTo = shareToMap[cResult.data.shareTo];
										} else {
											result.shareTo = cResult.data.shareTo;
										}
									} catch (e) {
										Tools.setError({
											code: 101,
											msg: e.name,
											data: e
										});
									}
									cloudplate.trigger('set_share_success', result, '', data._cp_event.set_share_success[0]);
								})
							}), Core.loadCallbackFunctions('set_share', function(cResult) {
								var result = {
									success: 0
								};
								CP.tools.writelog('run callback_updateAppShareData', cResult);
								try {
									if (typeof(cResult) == 'string' && cResult.indexOf("{") === 0) {
										cResult = JSON.parse(cResult);
									}
									result.success = cResult.code || 0;
								} catch (e) {
									Tools.setError({
										code: 101,
										msg: e.name,
										data: e
									});
								}
								cloudplate.trigger('set_share', result, '', data._cp_event.set_share[0]);
							}));
							break;
						case 'play_voice':
							break;
						case 'pause_play_voice':
							break;
						case 'stop_play_voice':
							break;
						case 'url_redirect':
							var flag = false;
							var timer = setInterval(function() {
								if (!flag) {
									flag = true;
									window.location.href = data.url;
									clearInterval(timer);
								}
							}, 200);
							break;
						case 'check_js_api':
							ZBJTJSBridge.invoke('check_js_api', JSON.stringify(data), Core.loadCallbackFunctions('check_js_api', function(cResult) {
								var result = {
									checkResult: {},
									success: '1'
								};
								CP.tools.writelog('run callback_check_js_api', cResult);
								try {
									if (cResult && typeof cResult === 'string') {
										cResult = JSON.parse(cResult);
									}
									if (cResult.code == 1) {
										result = cResult.data.checkResult;
									}
								} catch (e) {
									Tools.setError({
										code: 101,
										msg: e.name,
										data: e
									});
								}
								cloudplate.trigger('check_js_api', result, '', data._cp_event.check_js_api[0]);
							}));
							break;
						case 'preview':
							ZBJTJSBridge.invoke('previewImage', JSON.stringify(data), Core.loadCallbackFunctions('preview', function(cResult) {
								var result = {
									checked: null,
									saved: null,
									success: '0'
								};
								CP.tools.writelog('run callback_preview', cResult);
								try {
									if (cResult && typeof cResult === 'string') {
										cResult = JSON.parse(cResult);
									}
									if (cResult.code && cResult.code == 1) {
										result.success = '1';
										result.checked = cResult.data.hasPreviewed ? cResult.data.hasPreviewed : null;
										result.saved = cResult.data.hasSaved ? cResult.data.hasSaved : null;
									}
								} catch (e) {
									Tools.setError({
										code: 101,
										msg: e.name,
										data: e
									});
								}
								cloudplate.trigger('preview', result, '', data._cp_event.preview[0]);
							}));
							break;
						case 'subscribe_event':
							if (typeof data == 'string') {
								try {
									data = JSON.parse(data);
								} catch (e) {
									Tools.setError({
										code: 101,
										msg: e.name,
										data: e
									});
								}
							}
							var result = {
								event: null,
								data: null,
								success: '0'
							};
							if (!data || !data.key) {
								Tools.setError({
									code: 101,
									msg: '参数报错',
									data: data
								});
								cloudplate.trigger('subscribe_set_event', result, '', data._cp_event.subscribe_set_event[0]);
							}
							var params = {
								event: data.key,
								callback: Core.loadCallbackFunctions('subscribe_event', function(cResult) {
									var successResult = {
										event: null,
										data: null,
										success: '0'
									};
									CP.tools.writelog('run callback_subscribe_event', cResult);
									try {
										if (cResult && typeof cResult === 'string') {
											cResult = JSON.parse(cResult);
										}
										CP.tools.writelog('run callback_subscribe_event333', cResult);
										if (cResult.event && cResult.data) {
											switch (cResult.event) {
												case 'sub_network_change':
													successResult.event = cResult.event;
													successResult.data = {
														network: cResult.data.status
													};
													successResult.success = '1';
													break;
												case 'sub_share':
													break;
												case 'defalut':
													break;
											}
										}
									} catch (e) {
										Tools.setError({
											code: 101,
											msg: e.name,
											data: e
										});
									}
									cloudplate.trigger('subscribe_event', successResult, '', data._cp_event.subscribe_event[0]);
								})
							};
							ZBJTJSBridge.invoke('listenAppEvent', JSON.stringify(params), Core.loadCallbackFunctions('subscribe_set_event', function(cResult) {
								CP.tools.writelog('run callback_subscribe_set_event', cResult);
								try {
									if (cResult && typeof cResult === 'string') {
										cResult = JSON.parse(cResult);
									}
									if (cResult.code && cResult.code == 1) {
										result.success = '1';
									}
								} catch (e) {
									Tools.setError({
										code: 101,
										msg: e.name,
										data: e
									});
								}
								if (data._cp_event.subscribe_set_event && data._cp_event.subscribe_set_event[0]) {
									cloudplate.trigger('subscribe_set_event', result, '', data._cp_event.subscribe_set_event[0]);
								}
							}));
							break;
						case 'request_api':
							var result = {
								requestcode: 0,
								'return': '',
								info: ''
							};
							if (!data || !data.path || data.parameters && typeof(data.parameters) !== 'string') {
								result.requestcode = '11002';
								cloudplate.trigger('request_api', result, '', data._cp_event.request_api[0]);
							}
							ZBJTJSBridge.invoke('requestAPI', JSON.stringify(data), Core.loadCallbackFunctions('request_api', function(cResult) {
								CP.tools.writelog('run request_api', cResult);
								try {
									if (typeof(cResult) == 'string' && cResult.indexOf("{") === 0) {
										cResult = JSON.parse(cResult);
									}
									if (cResult === 'undefined' || !cResult) {
										cResult = '';
										result.requestcode = -1;
									}
									cResult.code ? result.requestcode = cResult.code : '';
									if (cResult.code === 1 || cResult.code === '1') {
										result.requestcode = 0;
									}
									cResult.data && cResult.data.response ? result.
									return = cResult.data.response : '';
								} catch (e) {
									Tools.setError({
										code: 101,
										msg: e.name,
										data: e
									});
								}
								cloudplate.trigger('request_api', JSON.stringify(result), '', data._cp_event.request_api[0]);
							}));
							break;
						default:
							driverIncompatible(data, event);
							cloudplate.trigger(event, '');
							break;
					}
				}
			},
			zjolapp: {
				driver_params: {},
				preloadfiles: [],
				check: function(callback) {},
				load: function(driver_params, callback) {
					Request._loadResource(this.preloadfiles, function() {
						callback(driver_params);
					});
				},
				init: function(options, client_info) {
					var driver_var = this;
					driver_var['_options'] = options;
					options.ready(client_info);
				},
				filterUrl: function(url) {
					return url;
				},
				delegate: function(event, data, client_info) {
					data = data ? data : '';
					var _options = this._options;
					if (!(typeof(ZBJTJSBridge) === 'object' && typeof ZBJTJSBridge.invoke == 'function')) {
						driverIncompatible(data, event, true);
						cloudplate.trigger(event, '');
						return;
					}
					switch (event) {
						case 'show_login':
							ZBJTJSBridge.invoke('login', '', Core.loadCallbackFunctions('show_login', function(sResult) {
								CP.tools.writelog('run callback_show_login', sResult);
								var client = {
									unique_id: '',
									account_id: '',
									'is_login': '0'
								};
								var request = 0;
								if (typeof data == 'string' && data) {
									try {
										data = JSON.parse(data);
										request = data.request ? 1 : 0;
									} catch (e) {
										Tools.setError({
											code: 101,
											msg: e.name,
											data: e
										});
									}
								}
								ZBJTJSBridge.invoke('getUserInfo', '{"signParaList":["id","nick_name","mobile"],"request":' + request + '}', Core.loadCallbackFunctions('show_login', function(cResult) {
									CP.tools.writelog('run callback_show_login_reset', cResult);
									if (typeof(cResult) == 'string' && cResult.indexOf("{") === 0) {
										cResult = JSON.parse(cResult);
									}
									if (cResult.code === '1') {
										client.unique_id = cResult.data.sessionId;
										client.account_id = cResult.data.accountId;
										client.is_login = cResult.data.login;
									}
									cloudplate.trigger('reset', client, '', data._cp_event.reset[0]);
								}));
							}));
							break;
						case 'is_login':
							var request = 0;
							if (typeof data == 'string' && data) {
								try {
									data = JSON.parse(data);
									request = data.request ? 1 : 0;
								} catch (e) {
									Tools.setError({
										code: 101,
										msg: e.name,
										data: e
									});
								}
							}
							ZBJTJSBridge.invoke('getUserInfo', '{"signParaList":["id","nick_name","mobile"],"request":' + request + '}', Core.loadCallbackFunctions('is_login', function(cResult) {
								CP.tools.writelog('run callback_is_login', result);
								if (typeof(cResult) == 'string' && cResult.indexOf("{") === 0) {
									cResult = JSON.parse(cResult);
								}
								var res = {
									is_login: cResult.data.login
								};
								cloudplate.trigger('is_login', res, '', data._cp_event.is_login[0]);
							}));
							break;
						case 'get_unique_id':
							var request = 0;
							if (typeof data == 'string' && data) {
								try {
									data = JSON.parse(data);
									request = data.request ? 1 : 0;
								} catch (e) {
									Tools.setError({
										code: 101,
										msg: e.name,
										data: e
									});
								}
							}
							ZBJTJSBridge.invoke('getUserInfo', '{"signParaList":["id","nick_name","mobile"],"request":' + request + '}', Core.loadCallbackFunctions('get_unique_id', function(cResult) {
								CP.tools.writelog('run callback_get_unique_id', cResult);
								if (typeof(cResult) == 'string' && cResult.indexOf("{") === 0) {
									cResult = JSON.parse(cResult);
								}
								var res = {
									unique_id: cResult.data.sessionId
								};
								cloudplate.trigger('get_unique_id', res, '', data._cp_event.get_unique_id[0]);
							}));
							break;
						case 'get_account_id':
							var request = 0;
							if (typeof data == 'string' && data) {
								try {
									data = JSON.parse(data);
									request = data.request ? 1 : 0;
								} catch (e) {
									Tools.setError({
										code: 101,
										msg: e.name,
										data: e
									});
								}
							}
							ZBJTJSBridge.invoke('getUserInfo', '{"signParaList":["id","nick_name","mobile"],"request":' + request + '}', Core.loadCallbackFunctions('get_account_id', function(cResult) {
								CP.tools.writelog('run callback_get_account_id', cResult);
								if (typeof(cResult) == 'string' && cResult.indexOf("{") === 0) {
									cResult = JSON.parse(cResult);
								}
								var accountId = cResult.data.accountId ? cResult.data.accountId : cResult.data.user.id;
								var res = {
									account_id: accountId
								};
								cloudplate.trigger('get_account_id', res, '', data._cp_event.get_account_id[0]);
							}));
							break;
						case 'get_client_info':
							ZBJTJSBridge.invoke('getAppInfo', '{"uuid":1}', Core.loadCallbackFunctions('get_client_info', function(cResult) {
								CP.tools.writelog('run callback_get_client_info', cResult);
								var res = {
									client_code: '',
									version: '',
									versionName: '',
									detail: ''
								};
								try {
									if (typeof(cResult) == 'string' && cResult.indexOf("{") === 0) {
										cResult = JSON.parse(cResult);
									}
									if (cResult.code == 1) {
										res.client_code = cResult.data.app;
										res.version = cResult.data.version;
										res.versionName = cResult.data.versionName ? cResult.data.versionName : cResult.data.version;
										res.detail = cResult.data;
									}
								} catch (e) {
									Tools.setError({
										code: 101,
										msg: e.name,
										data: e
									});
								}
								cloudplate.trigger('get_client_info', res, '', data._cp_event.get_client_info[0]);
							}));
							break;
						case 'get_device_info':
							ZBJTJSBridge.invoke('getAppInfo', JSON.stringify({
								uuid: 1
							}), Core.loadCallbackFunctions('get_device_info', function(cResult) {
								CP.tools.writelog('run callback_get_device_info', cResult);
								var result = {
									device_no: '',
									system: '',
									system_version: '',
									device_type: '',
									timestamp: '',
									signature: '',
									networkType: '',
									systemVersion: ''
								};
								var device_type = CP.tools.browser(true),
									system = '';
								if (typeof device_type === 'string') {
									if (device_type.indexOf('IOS') != -1 || device_type.indexOf('ios') != -1) {
										system = 'IOS';
									} else if (device_type.indexOf('ANDROID') != -1 || device_type.indexOf('android') != -1) {
										system = 'android';
									}
								}
								result.system = system;
								try {
									if (cResult && typeof cResult === 'string') {
										cResult = JSON.parse(cResult);
									}
									if (cResult.code == 1) {
										result.timestamp = cResult.data.timestamp;
										result.device_no = cResult.data.uuid;
										result.signature = cResult.data.signature;
										result.system_version = cResult.data.version;
										result.device_type = cResult.data.device;
										result.networkType = cResult.data.networkType;
										result.systemVersion = cResult.data.systemVersion;
										result.system = cResult.data.system ? cResult.data.system : system;
										result.versionName = cResult.data.versionName ? cResult.data.versionName : cResult.data.version;
									}
								} catch (e) {
									Tools.setError({
										code: 101,
										msg: e.name,
										data: e
									});
								}
								cloudplate.trigger('get_device_info', result, '', data._cp_event.get_device_info[0]);
							}));
							break;
						case 'reset':
							break;
						case 'get_css_mode':
							cloudplate.trigger('mode_change', {
								mode: 'day'
							});
							break;
						case 'show_share':
							if (typeof data == 'string') {
								try {
									data = JSON.parse(data);
								} catch (e) {
									Tools.setError({
										code: 101,
										msg: e.name,
										data: e
									});
								}
							}
							var shareTitle = data.title ? data.title : '',
								shareSummary = data.shareSummary ? data.shareSummary : '',
								shareLink = data.link ? data.link : '',
								shareImage = data.imgUrl ? data.imgUrl : '',
								uid = data.id ? data.id : '',
								uidType = data.type ? data.type : 9,
								videoUrl = data.videoUrl || '',
								audioUrl = data.audioUrl || '';
							var isPicShare = false;
							if (shareTitle == '' && shareSummary == '' && shareLink == '' && shareImage) {
								isPicShare = true;
							}
							ZBJTJSBridge.invoke('openAppShareMenu', JSON.stringify({
								title: shareTitle,
								desc: shareSummary,
								link: shareLink,
								imgUrl: shareImage,
								onlyImageShare: isPicShare == true ? 1 : 0,
								videoUrl: videoUrl,
								audioUrl: audioUrl,
								uidType: uidType
							}), Core.loadCallbackFunctions('show_share', function(cResult) {
								var result = {
									result: 'fail',
									shareTo: '',
									allow_alert: '1'
								};
								CP.tools.writelog('run callback_show_share', cResult);
								try {
									if (cResult && typeof cResult === 'string') {
										cResult = JSON.parse(cResult);
									}
									if (cResult.code === '1') {
										result.result = 'success';
									}
									var shareToMap = {
										"1": 'AppMessage',
										"2": 'Timeline',
										"3": 'DingDing',
										"4": 'ShareQQ',
										"5": 'WeiBo',
										"6": 'QQZone'
									};
									if (cResult && cResult.data.shareTo && shareToMap[cResult.data.shareTo]) {
										result.shareTo = shareToMap[cResult.data.shareTo];
									} else {
										result.shareTo = cResult.data.shareTo;
									}
								} catch (e) {
									Tools.setError({
										code: 101,
										msg: e.name,
										data: e
									});
									result.result = 'fail';
								}
								cloudplate.trigger('get_share_result', result, '', data._cp_event.get_share_result[0]);
							}));
							break;
						case 'get_location_info':
							ZBJTJSBridge.invoke('getLocation', '', Core.loadCallbackFunctions('get_location_info', function(cResult) {
								var result = {
									lat: '',
									lon: '',
									radius: '',
									city: '',
									addr: '',
									speed: '',
									accuracy: ''
								};
								CP.tools.writelog('run callback_zjxw_invoke_getLocation', cResult);
								try {
									if (cResult && typeof cResult === 'string') {
										cResult = JSON.parse(cResult);
									}
									if (cResult && cResult.data && cResult.code == 1) {
										result.lat = cResult.data.latitude;
										result.lon = cResult.data.lontitude;
										result.radius = cResult.data.accuracy;
										result.city = cResult.data.city;
										result.addr = cResult.data.address;
										result.speed = cResult.data.speed;
										result.time = cResult.data.timestamp;
									}
								} catch (e) {
									Tools.setError({
										code: 101,
										msg: e.name,
										data: e
									});
								}
								cloudplate.trigger('address_change', result, '', data._cp_event.address_change[0]);
							}));
							break;
						case 'get_customer_info':
							var request = 0;
							if (typeof data == 'string' && data) {
								try {
									data = JSON.parse(data);
									request = data.request ? 1 : 0;
								} catch (e) {
									Tools.setError({
										code: 101,
										msg: e.name,
										data: e
									});
								}
							}
							ZBJTJSBridge.invoke('getUserInfo', '{"signParaList":["id","nick_name","mobile"],"request":' + request + '}', Core.loadCallbackFunctions('get_customer_info', function(cResult) {
								CP.tools.writelog('run callback_zjxw_invoke_getUserInfo', cResult);
								var result = {};
								try {
									if (typeof(cResult) == 'string' && cResult.indexOf("{") === 0) {
										cResult = JSON.parse(cResult);
									}
									if (cResult && cResult.data.user) {
										result = {
											account_id: cResult.data.accountId,
											session_id: cResult.data.sessionId,
											username: cResult.data.user.nick_name,
											head_img: cResult.data.user.image_url,
											nick_name: cResult.data.user.nick_name,
											score: cResult.data.user.total_score,
											mobile: cResult.data.user.phone_number,
											ref_code: cResult.data.user.ref_code,
											ref_user_uid: cResult.data.user.ref_user_uid,
											ref_user_code: cResult.data.user.ref_user_code,
											invitation_number: cResult.data.user.invitation_number,
										};
										result.user = cResult.data.user;
									}
								} catch (e) {
									Tools.setError({
										code: 101,
										msg: e.name,
										data: e
									});
								}
								cloudplate.trigger('get_customer_info', result, '', data._cp_event.get_customer_info[0]);
							}));
							break;
						case 'get_download_info':
							cloudplate.trigger('get_download_info', {
								to_new_verison: function() {
									window.location.href = _cp_config.download_url.zjolapp;
								},
								alertinfo: '',
								downloadlink: _cp_config.download_url.zjolapp
							});
							break;
						case 'get_ip':
							driverIncompatible(data, 'get_ip');
							cloudplate.trigger('get_ip', '');
							break;
						case 'get_image':
							ZBJTJSBridge.invoke('selectImage', JSON.stringify(data), Core.loadCallbackFunctions('get_image', function(cResult) {
								CP.tools.writelog('run callback_get_image', cResult);
								var result = {};
								try {
									if (typeof(cResult) == 'string' && cResult.indexOf("{") === 0) {
										cResult = JSON.parse(cResult);
									}
									result = {
										address: cResult.data.imageList ? cResult.data.imageList : [],
										id: '',
										sizeType: data.sizeType ? data.sizeType : 'original',
										sourceType: data.sourceType ? data.sourceType : '',
										count: data.count ? data.count : 1,
										dataType: data.dataType ? data.dataType : 'addr',
										data: cResult.data.base64List && cResult.data.base64List.length ? cResult.data.base64List : []
									};
								} catch (e) {
									Tools.setError({
										code: 101,
										msg: e.name,
										data: e
									});
								}
								cloudplate.trigger('get_image', result, '', data._cp_event.get_image[0]);
							}));
							break;
						case 'get_voice':
							driverIncompatible(data, 'get_voice');
							cloudplate.trigger('get_voice', '');
							break;
						case 'start_voice':
							data.recordId = data.id;
							ZBJTJSBridge.invoke('startRecord', JSON.stringify(data), Core.loadCallbackFunctions('start_voice', function(cResult) {
								CP.tools.writelog('run callback_zjxw_invoke_startRecord', cResult);
								var result = {
									id: '',
									address: ''
								};
								try {
									if (typeof(cResult) == 'string' && cResult.indexOf("{") === 0) {
										cResult = JSON.parse(cResult);
									}
									if (cResult.data && cResult.code === '1') {
										result = {
											id: cResult.data.recordId,
											address: cResult.data.audioPath
										};
									}
								} catch (e) {
									Tools.setError({
										code: 101,
										msg: e.name,
										data: e
									});
								}
								cloudplate.trigger('stop_voice', JSON.stringify(result), '', data._cp_event.stop_voice[0]);
							}));
							break;
						case 'file_upload':
							data.serverUrl = data.serviceurl;
							data.localUrl = data.localfile;
							data.fileName = data.filename;
							data.inputName = data.inputname;
							ZBJTJSBridge.invoke('uploadFile', JSON.stringify(data), Core.loadCallbackFunctions('file_upload', function(cResult) {
								CP.tools.writelog('run callback_zjxw_invoke_uploadFile', cResult);
								var result = {
									requestcode: 0,
									'return': '',
									info: ''
								};
								try {
									if (typeof(cResult) == 'string' && cResult.indexOf("{") === 0) {
										cResult = JSON.parse(cResult);
									}
									if (cResult === 'undefined' || !cResult) {
										cResult = '';
										result.requestcode = -1;
									}
									cResult.code ? result.requestcode = cResult.code : '';
									if (cResult.code === 1 || cResult.code === '1') {
										result.requestcode = 0;
									}
									cResult.data && cResult.data.response ? result.
									return = cResult.data.response : '';
								} catch (e) {
									Tools.setError({
										code: 101,
										msg: e.name,
										data: e
									});
								}
								cloudplate.trigger('file_upload', JSON.stringify(result), '', data._cp_event.file_upload[0]);
							}));
							break;
						case 'stop_voice':
							driverIncompatible(data, 'stop_voice');
							cloudplate.trigger('stop_voice', '');
							break;
						case 'get_video':
							driverIncompatible(data, 'get_video');
							cloudplate.trigger('get_video', '');
							break;
						case 'get_scan_qr':
							driverIncompatible(data, 'get_scan_qr');
							cloudplate.trigger('get_scan_qr', '');
							break;
						case 'search_beacons':
							driverIncompatible(data, 'search_beacons');
							cloudplate.trigger('search_beacons', '');
							break;
						case 'shake':
							driverIncompatible(data, 'shake');
							cloudplate.trigger('shake', '');
							break;
						case 'close':
							ZBJTJSBridge.invoke('closeWindow', JSON.stringify(data), Core.loadCallbackFunctions('close', function(cResult) {
								cloudplate.trigger('close');
							}));
							break;
						case 'set_data':
							(data.storage === 0 || data.storage === '0') ? data.option = '0' : data.option = '1';
							if (typeof data.value === 'string' && data.value.indexOf("{") === 0) {
								data.value = '+zjxw+' + JSON.stringify(data.value) + '-zjxw-';
							}
							ZBJTJSBridge.invoke('saveValueToLocal', JSON.stringify(data), Core.loadCallbackFunctions('set_data', function(cResult) {
								CP.tools.writelog('run callback_zjxw_invoke_saveValueToLocal', cResult);
								var result = {};
								try {
									if (typeof(cResult) == 'string' && cResult.indexOf("{") === 0) {
										cResult = JSON.parse(cResult);
									}
									result = {
										success: cResult.code ? '1' : '0',
									};
								} catch (e) {
									Tools.setError({
										code: 101,
										msg: e.name,
										data: e
									});
								}
								cloudplate.trigger('set_data', result, '', data._cp_event.set_data[0]);
							}));
							break;
						case 'get_data':
							var result = '';
							(data.storage === 0 || data.storage === '0') ? data.option = '0' : data.option = '1';
							ZBJTJSBridge.invoke('getValueFromLocal', JSON.stringify(data), Core.loadCallbackFunctions('set_data', function(cResult) {
								CP.tools.writelog('run callback_zjxw_invoke_getValueFromLocal', cResult);
								var result = {};
								try {
									if (typeof(cResult) == 'string' && cResult.indexOf("{") === 0) {
										if (cResult.indexOf('+zjxw+') !== -1) {
											cResult = data.replace("\"\+zjxw\+", '');
											cResult = data.replace('-zjxw-"', '');
										}
										cResult = JSON.parse(cResult);
									}
									result = {
										success: cResult.code + '',
										key: cResult.data.key ? cResult.data.key : '',
										data: cResult.data.value ? cResult.data.value : '',
									};
								} catch (e) {
									Tools.setError({
										code: 101,
										msg: e.name,
										data: e
									});
								}
								cloudplate.trigger('get_data', result, '', data._cp_event.get_data[0]);
							}));
							break;
						case 'set_share':
							if (typeof data == 'string') {
								try {
									data = JSON.parse(data);
								} catch (e) {
									Tools.setError({
										code: 101,
										msg: e.name,
										data: e
									});
								}
							}
							var shareTitle = data.title ? data.title : '',
								shareSummary = data.shareSummary ? data.shareSummary : '',
								shareLink = data.link ? data.link : '',
								shareImage = data.imgUrl ? data.imgUrl : '',
								shareUrlScheme = data.shareUrlScheme ? data.shareUrlScheme : '',
								videoUrl = data.videoUrl || '',
								audioUrl = data.audioUrl || '',
								isPicShare = false;
							if (shareTitle == '' && shareSummary == '' && shareLink == '' && shareImage) {
								isPicShare = true;
							}
							var shareToMap = {
								"1": 'AppMessage',
								"2": 'Timeline',
								"3": 'DingDing',
								"4": 'ShareQQ',
								"5": 'WeiBo',
								"6": 'QQZone'
							};
							ZBJTJSBridge.invoke('updateAppShareData', JSON.stringify({
								title: shareTitle,
								desc: shareSummary,
								link: shareLink,
								imgUrl: shareImage,
								onlyImageShare: isPicShare == true ? 1 : 0,
								videoUrl: videoUrl,
								audioUrl: audioUrl,
								callback: Core.loadCallbackFunctions('set_share_success', function(cResult) {
									CP.tools.writelog('run callback_success_updateAppShareData', cResult);
									var result = {
										success: 0
									};
									try {
										if (typeof(cResult) == 'string' && cResult.indexOf("{") === 0) {
											cResult = JSON.parse(cResult);
										}
										result.success = cResult.code || 0;
										if (cResult && cResult.data.shareTo && shareToMap[cResult.data.shareTo]) {
											result.shareTo = shareToMap[cResult.data.shareTo];
										} else {
											result.shareTo = cResult.data.shareTo;
										}
									} catch (e) {
										Tools.setError({
											code: 101,
											msg: e.name,
											data: e
										});
									}
									cloudplate.trigger('set_share_success', result, '', data._cp_event.set_share_success[0]);
								})
							}), Core.loadCallbackFunctions('set_share', function(cResult) {
								var result = {
									success: 0
								};
								CP.tools.writelog('run callback_updateAppShareData', cResult);
								try {
									if (typeof(cResult) == 'string' && cResult.indexOf("{") === 0) {
										cResult = JSON.parse(cResult);
									}
									result.success = cResult.code || 0;
								} catch (e) {
									Tools.setError({
										code: 101,
										msg: e.name,
										data: e
									});
								}
								cloudplate.trigger('set_share', result, '', data._cp_event.set_share[0]);
							}));
							break;
						case 'play_voice':
							break;
						case 'pause_play_voice':
							break;
						case 'stop_play_voice':
							break;
						case 'url_redirect':
							var flag = false;
							var timer = setInterval(function() {
								if (!flag) {
									flag = true;
									window.location.href = data.url;
									clearInterval(timer);
								}
							}, 200);
							break;
						case 'bindmobile':
							ZBJTJSBridge.invoke('openAppMobile', JSON.stringify({
								control: '0'
							}), Core.loadCallbackFunctions('bindmobile', function(cResult) {
								var result = {
									is_binded: '0',
									mobile: ''
								};
								CP.tools.writelog('run callback_zjxw_invoke_bindmobile', cResult);
								try {
									if (typeof(cResult) == 'string' && cResult.indexOf("{") === 0) {
										cResult = JSON.parse(cResult);
									}
									if (cResult.code == 1) {
										result.is_binded = 1;
										result.mobile = cResult.data.mobile;
									}
								} catch (e) {
									Tools.setError({
										code: 101,
										msg: e.name,
										data: e
									});
								}
								cloudplate.trigger('bindmobile', result, '', data._cp_event.bindmobile[0]);
							}));
							break;
						case 'is_bindmobile':
							var request = 0;
							if (typeof data == 'string' && data) {
								try {
									data = JSON.parse(data);
									request = data.request ? 1 : 0;
								} catch (e) {
									Tools.setError({
										code: 101,
										msg: e.name,
										data: e
									});
								}
							}
							ZBJTJSBridge.invoke('getUserInfo', JSON.stringify({
								signParaList: ["id", "nick_name", "mobile"],
								'request': request
							}), Core.loadCallbackFunctions('is_bindmobile', function(cResult) {
								CP.tools.writelog('run callback_zjxw_invoke_isBindmobile', cResult);
								var result = {
									is_binded: '0',
									mobile: ''
								};
								try {
									if (typeof(cResult) == 'string' && cResult.indexOf("{") === 0) {
										cResult = JSON.parse(cResult);
									}
									if (cResult && cResult.data) {
										result.is_binded = cResult.data.mobile ? '1' : '0';
										result.mobile = cResult.data.user ? cResult.data.user.phone_number : '';
									}
								} catch (e) {
									Tools.setError({
										code: 101,
										msg: e.name,
										data: e
									});
								}
								cloudplate.trigger('is_bindmobile', JSON.stringify(result), '', data._cp_event.is_bindmobile[0]);
							}));
							break;
						case 'redpacket_open_success':
							driverIncompatible(data, 'redpacket_open_success');
							cloudplate.trigger('redpacket_open_success', {
								success: '1'
							});
							break;
						case 'show_modify_mobile':
							ZBJTJSBridge.invoke('openAppMobile', JSON.stringify({
								control: 1
							}), Core.loadCallbackFunctions('show_modify_mobile', function(cResult) {
								var result = {
									is_binded: '0',
									mobile: ''
								};
								CP.tools.writelog('run callback_zjxw_invoke_openAppMobile', cResult);
								try {
									if (cResult && typeof cResult === 'string') {
										cResult = JSON.parse(cResult);
									}
									if (cResult.code == 1) {
										result.is_binded = 1;
										result.mobile = cResult.data.mobile;
									}
								} catch (e) {
									Tools.setError({
										code: 101,
										msg: e.name,
										data: e
									});
								}
								cloudplate.trigger('modify_mobile', result, '', data._cp_event.modify_mobile[0]);
							}));
							break;
						case 'modify_delivery_name':
							ZBJTJSBridge.invoke('modifyUserInfo', JSON.stringify({
								option: 'name'
							}), Core.loadCallbackFunctions('modify_delivery_name', function(cResult) {
								CP.tools.writelog('run callback_modify_delivery_name', cResult);
								var result = {
									success: '0',
									data: {
										delivery_name: ''
									}
								};
								try {
									if (typeof(cResult) == 'string' && cResult.indexOf("{") === 0) {
										cResult = JSON.parse(cResult);
									}
									if (cResult && cResult.data.option == 'name' && cResult.code == '1') {
										result.data.delivery_name = cResult.data.value;
									}
									if (cResult && cResult.code && cResult.code == '1') {
										result.success = cResult.code;
									}
									if (cResult && cResult.code && (cResult.code == '11001' || cResult.code == 11001)) {
										driverIncompatible(data, 'modify_delivery_name', false);
										cloudplate.trigger('modify_delivery_name', '');
									}
								} catch (e) {
									Tools.setError({
										code: 101,
										msg: e.name,
										data: e
									});
								}
								cloudplate.trigger('modify_delivery_name', JSON.stringify(result), '', data._cp_event.modify_delivery_name[0]);
							}));
							break;
						case 'open_address':
							ZBJTJSBridge.invoke('modifyUserInfo', JSON.stringify({
								option: 'address'
							}), Core.loadCallbackFunctions('modify_delivery_name', function(cResult) {
								CP.tools.writelog('run callback_open_address', cResult);
								var result = {
									success: '0',
									data: {
										userName: '',
										postalCode: '',
										provinceName: '',
										cityName: '',
										countryName: '',
										detailInfo: '',
										nationalCode: '',
										telNumber: '',
									}
								};
								try {
									if (typeof(cResult) == 'string' && cResult.indexOf("{") === 0) {
										cResult = JSON.parse(cResult);
									}
									if (cResult && cResult.data.option == 'address' && cResult.code == '1') {
										result.data.detailInfo = cResult.data.value;
									}
									if (cResult && cResult.code && cResult.code == '1') {
										result.success = cResult.code;
									}
									if (cResult && cResult.code && (cResult.code == '11001' || cResult.code == 11001)) {
										driverIncompatible(data, 'open_address', false);
										cloudplate.trigger('open_address', '');
									}
								} catch (e) {
									Tools.setError({
										code: 101,
										msg: e.name,
										data: e
									});
								}
								cloudplate.trigger('open_address', JSON.stringify(result), '', data._cp_event.open_address[0]);
							}));
							break;
						case 'check_js_api':
							ZBJTJSBridge.invoke('check_js_api', JSON.stringify(data), Core.loadCallbackFunctions('check_js_api', function(cResult) {
								var result = {
									checkResult: {},
									success: '1'
								};
								CP.tools.writelog('run callback_check_js_api', cResult);
								try {
									if (cResult && typeof cResult === 'string') {
										cResult = JSON.parse(cResult);
									}
									if (cResult.code == 1) {
										result = cResult.data.checkResult;
									}
								} catch (e) {
									Tools.setError({
										code: 101,
										msg: e.name,
										data: e
									});
								}
								cloudplate.trigger('check_js_api', result, '', data._cp_event.check_js_api[0]);
							}));
							break;
						case 'preview':
							ZBJTJSBridge.invoke('previewImage', JSON.stringify(data), Core.loadCallbackFunctions('preview', function(cResult) {
								var result = {
									checked: null,
									saved: null,
									success: '0'
								};
								CP.tools.writelog('run callback_preview', cResult);
								try {
									if (cResult && typeof cResult === 'string') {
										cResult = JSON.parse(cResult);
									}
									if (cResult.code && cResult.code == 1) {
										result.success = '1';
										result.checked = cResult.data.hasPreviewed ? cResult.data.hasPreviewed : null;
										result.saved = cResult.data.hasSaved ? cResult.data.hasSaved : null;
									}
								} catch (e) {
									Tools.setError({
										code: 101,
										msg: e.name,
										data: e
									});
								}
								cloudplate.trigger('preview', result, '', data._cp_event.preview[0]);
							}));
							break;
						case 'subscribe_event':
							if (typeof data == 'string') {
								try {
									data = JSON.parse(data);
								} catch (e) {
									Tools.setError({
										code: 101,
										msg: e.name,
										data: e
									});
								}
							}
							var result = {
								event: null,
								data: null,
								success: '0'
							};
							if (!data || !data.key) {
								Tools.setError({
									code: 101,
									msg: '参数报错',
									data: data
								});
								cloudplate.trigger('subscribe_set_event', result, '', data._cp_event.subscribe_set_event[0]);
							}
							var params = {
								event: data.key,
								callback: Core.loadCallbackFunctions('subscribe_event', function(cResult) {
									var successResult = {
										event: null,
										data: null,
										success: '0'
									};
									CP.tools.writelog('run callback_subscribe_event', cResult);
									try {
										if (cResult && typeof cResult === 'string') {
											cResult = JSON.parse(cResult);
										}
										CP.tools.writelog('run callback_subscribe_event333', cResult);
										if (cResult.event && cResult.data) {
											switch (cResult.event) {
												case 'sub_network_change':
													successResult.event = cResult.event;
													successResult.data = {
														network: cResult.data.status
													};
													successResult.success = '1';
													break;
												case 'sub_share':
													break;
												case 'defalut':
													break;
											}
										}
									} catch (e) {
										Tools.setError({
											code: 101,
											msg: e.name,
											data: e
										});
									}
									cloudplate.trigger('subscribe_event', successResult, '', data._cp_event.subscribe_event[0]);
								})
							};
							ZBJTJSBridge.invoke('listenAppEvent', JSON.stringify(params), Core.loadCallbackFunctions('subscribe_set_event', function(cResult) {
								CP.tools.writelog('run callback_subscribe_set_event', cResult);
								try {
									if (cResult && typeof cResult === 'string') {
										cResult = JSON.parse(cResult);
									}
									if (cResult.code && cResult.code == 1) {
										result.success = '1';
									}
								} catch (e) {
									Tools.setError({
										code: 101,
										msg: e.name,
										data: e
									});
								}
								if (data._cp_event.subscribe_set_event && data._cp_event.subscribe_set_event[0]) {
									cloudplate.trigger('subscribe_set_event', result, '', data._cp_event.subscribe_set_event[0]);
								}
							}));
							break;
						case 'show_authorize':
							ZBJTJSBridge.invoke('isRealPeopleAuthorization', '', Core.loadCallbackFunctions('show_authorize', function(cResult) {
								var result = {
									success: '0'
								};
								CP.tools.writelog('run show_authorize', cResult);
								try {
									if (cResult && typeof cResult === 'string') {
										cResult = JSON.parse(cResult);
									}
									if (cResult.hasOwnProperty('code')) {
										result.success = cResult.code;
									}
								} catch (e) {
									Tools.setError({
										code: 101,
										msg: e.name,
										data: e
									});
								}
								cloudplate.trigger('show_authorize', result, '', data._cp_event.show_authorize[0]);
							}));
							break;
						case 'show_alipay_authorize':
							var device_type = CP.tools.browser(true),
								system = '';
							if (typeof device_type === 'string') {
								if (device_type.indexOf('IOS') != -1 || device_type.indexOf('ios') != -1) {
									system = 'IOS';
								} else if (device_type.indexOf('ANDROID') != -1 || device_type.indexOf('android') != -1) {
									system = 'android';
								}
							}
							if (client_info && client_info.version && (system == 'android' && parseInt(client_info.version) < 20000 || system == 'IOS' && parseInt(client_info.version) < 10507)) {
								CP.tools.writelog('run alipayAuthorize');
								ZBJTJSBridge.invoke('alipayAuthorize', '', Core.loadCallbackFunctions('show_alipay_authorize', function(cResult) {
									var result = {
										success: '0'
									};
									CP.tools.writelog('run show_alipay_authorize', cResult);
									try {
										if (cResult && typeof cResult === 'string') {
											cResult = JSON.parse(cResult);
										}
										if (cResult.hasOwnProperty('code')) {
											result.success = cResult.code;
										}
									} catch (e) {
										Tools.setError({
											code: 101,
											msg: e.name,
											data: e
										});
									}
									cloudplate.trigger('show_alipay_authorize', result, '', data._cp_event.show_alipay_authorize[0]);
								}));
							} else {
								CP.tools.writelog('run apAuthorize');
								ZBJTJSBridge.invoke('apAuthorize', '', Core.loadCallbackFunctions('show_alipay_authorize', function(cResult) {
									var result = {
										success: '0'
									};
									CP.tools.writelog('run show_alipay_authorize', cResult);
									try {
										if (cResult && typeof cResult === 'string') {
											cResult = JSON.parse(cResult);
										}
										if (cResult.hasOwnProperty('code')) {
											result.success = cResult.code;
										}
									} catch (e) {
										Tools.setError({
											code: 101,
											msg: e.name,
											data: e
										});
									}
									cloudplate.trigger('show_alipay_authorize', result, '', data._cp_event.show_alipay_authorize[0]);
								}));
							}
							break;
						case 'request_api':
							var result = {
								requestcode: 0,
								'return': '',
								info: ''
							};
							if (!data || !data.path || data.parameters && typeof(data.parameters) !== 'string') {
								result.requestcode = '11002';
								cloudplate.trigger('request_api', result, '', data._cp_event.request_api[0]);
							}
							ZBJTJSBridge.invoke('requestAPI', JSON.stringify(data), Core.loadCallbackFunctions('request_api', function(cResult) {
								CP.tools.writelog('run request_api', cResult);
								try {
									if (typeof(cResult) == 'string' && cResult.indexOf("{") === 0) {
										cResult = JSON.parse(cResult);
									}
									if (cResult === 'undefined' || !cResult) {
										cResult = '';
										result.requestcode = -1;
									}
									cResult.code ? result.requestcode = cResult.code : '';
									if (cResult.code === 1 || cResult.code === '1') {
										result.requestcode = 0;
									}
									cResult.data && cResult.data.response ? result.
									return = cResult.data.response : '';
								} catch (e) {
									Tools.setError({
										code: 101,
										msg: e.name,
										data: e
									});
								}
								cloudplate.trigger('request_api', JSON.stringify(result), '', data._cp_event.request_api[0]);
							}));
							break;
						case 'convert_video':
							var result = {
								code: 0,
								address: ''
							};
							ZBJTJSBridge.invoke('convertVideo', JSON.stringify(data), Core.loadCallbackFunctions('convertVideo', function(cResult) {
								CP.tools.writelog('run convertVideo', cResult);
								try {
									if (typeof(cResult) == 'string' && cResult.indexOf("{") === 0) {
										cResult = JSON.parse(cResult);
									}
									if (cResult === 'undefined' || !cResult) {
										cResult = '';
										result.code = -1;
									}
									result = cResult;
								} catch (e) {
									Tools.setError({
										code: 101,
										msg: e.name,
										data: e
									});
								}
								cloudplate.trigger('convert_video', JSON.stringify(result), '', data._cp_event.request_api[0]);
							}));
							break;
						default:
							driverIncompatible(data, event);
							cloudplate.trigger(event, '');
							break;
					}
				}
			},
			zjxw: {
				driver_params: {},
				preloadfiles: [_cp_config.common_file_path + 'common/cp-zjxw-cloudplate.js'],
				check: function(callback) {
					if (typeof zjxw != "undefined") {
						driverIsLoading = true;
						var version = zjxw.zjxw_js_getAppVersionCode();
						callback({
							client_code: 'zjxw',
							version: version,
							versionName: version,
							detail: '',
							is_client: '1'
						});
					}
				},
				load: function(driver_params, callback) {
					Request._loadResource(this.preloadfiles, function() {
						callback(driver_params);
					});
				},
				init: function(options, client_info) {
					var driver_var = this;
					driver_var['_options'] = options;
					options.ready(client_info);
				},
				filterUrl: function(url) {
					return url;
				},
				delegate: function(event, data, client_info) {
					data = data ? data : '';
					var _options = this._options;
					if (typeof(zjxw) != 'object') {
						driverIncompatible(data, event);
					}
					switch (event) {
						case 'show_login':
							if (typeof(ZBJTJSBridge) === 'object' && typeof(ZBJTJSBridge.invoke) == 'function') {
								ZBJTJSBridge.invoke('login', '', 'callback_zjxw_invoke_login');
							} else if (typeof(zjxw.zjxw_js_login) == 'function') {
								zjxw.zjxw_js_login();
							} else {
								driverIncompatible(data, 'show_login', true);
								cloudplate.trigger('reset', '');
							}
							break;
						case 'is_login':
							if (typeof(ZBJTJSBridge) === 'object' && typeof ZBJTJSBridge.invoke == 'function') {
								ZBJTJSBridge.invoke('getUserInfo', '{"signParaList":["id","nick_name","mobile"]}', 'callback_zjxw_invoke_islogin');
							} else if (typeof(zjxw.zjxw_js_isUserRealLogin) == 'function') {
								var result = zjxw.zjxw_js_isUserRealLogin();
								var res_data = {
									is_login: '0'
								};
								if (result === true || result === false || result === 'true' || result === 'false') {
									res_data.is_login = result ? '1' : '0';
									if (typeof result == 'string') {
										res_data.is_login = 'true' ? '1' : '0';
									} else if (typeof result == 'boolean') {
										res_data.is_login = result === true ? '1' : '0';
									}
									cloudplate.trigger('is_login', res_data);
								}
							} else {
								driverIncompatible(data, 'is_login', true);
								cloudplate.trigger('is_login', '');
							}
							break;
						case 'get_unique_id':
							if (typeof(zjxw.zjxw_js_getRealSessionId) != 'function') {
								driverIncompatible(data, 'get_unique_id', true);
								cloudplate.trigger('get_unique_id', '');
							} else {
								zjxw.zjxw_js_getRealSessionId();
							}
							break;
						case 'get_account_id':
							if (typeof(zjxw.zjxw_js_getRealAccountId) != 'function') {
								driverIncompatible(data, 'get_account_id', true);
								cloudplate.trigger('get_account_id', '');
							} else {
								zjxw.zjxw_js_getRealAccountId();
							}
							break;
						case 'get_client_info':
							if (typeof(zjxw.zjxw_js_getAppVersionCode) == 'function') {
								var version = zjxw.zjxw_js_getAppVersionCode();
								cloudplate.trigger('get_client_info', {
									client_code: 'zjxw',
									version: version,
									versionName: version,
									detail: ''
								});
							} else if (typeof(ZBJTJSBridge) === 'object' && typeof ZBJTJSBridge.invoke == 'function') {
								ZBJTJSBridge.invoke('getAppInfo', JSON.stringify({
									uuid: 0
								}), 'callback_zjxw_invoke_getAppVersionCode');
							} else {
								driverIncompatible(data, 'get_client_info', true);
								cloudplate.trigger('get_client_info', '');
							}
							break;
						case 'get_device_info':
							if (typeof(ZBJTJSBridge) === 'object' && typeof ZBJTJSBridge.invoke === 'function') {
								ZBJTJSBridge.invoke('getAppInfo', JSON.stringify({
									uuid: 1
								}), 'callback_zjxw_invoke_getDeviceId');
							} else if (typeof(zjxw.zjxw_js_getDeviceId) != 'function') {
								driverIncompatible(data, 'get_device_info', true);
								cloudplate.trigger('get_device_info', '');
							} else {
								zjxw.zjxw_js_getDeviceId();
							}
							break;
						case 'reset':
							break;
						case 'get_css_mode':
							if (typeof(zjxw.zjxw_js_isAppOpenNightTheme) != 'function') {
								driverIncompatible(data, 'get_css_mode', true);
								cloudplate.trigger('mode_change', '');
							} else {
								zjxw.zjxw_js_isAppOpenNightTheme();
							}
							break;
						case 'show_share':
							if (typeof data == 'string') {
								try {
									data = JSON.parse(data);
								} catch (e) {
									Tools.setError({
										code: 101,
										msg: e.name,
										data: e
									});
								}
							}
							var shareTitle = data.title ? data.title : '',
								shareSummary = data.shareSummary ? data.shareSummary : '',
								shareLink = data.link ? data.link : '',
								shareImage = data.imgUrl ? data.imgUrl : '',
								uid = data.id ? data.id : '',
								uidType = data.type ? data.type : 9,
								videoUrl = data.videoUrl || '',
								audioUrl = data.audioUrl || '';
							isPicShare = false;
							if (shareTitle == '' && shareSummary == '' && shareLink == '' && shareImage) {
								isPicShare = true;
							}
							if (typeof(zjxw.zjxw_js_reweet) != 'function') {
								driverIncompatible(data, 'show_share', true);
								cloudplate.trigger('get_share_result', '');
								break;
							}
							if (client_info && client_info.version && /^50[0-4]+/.test(client_info.version)) {
								zjxw.zjxw_js_reweet(shareTitle, shareSummary, shareLink, shareImage, uid, uidType);
							} else {
								if (typeof(ZBJTJSBridge) === 'object' && typeof ZBJTJSBridge.invoke === 'function') {
									ZBJTJSBridge.invoke('openAppShareMenu', JSON.stringify({
										title: shareTitle,
										desc: shareSummary,
										link: shareLink,
										imgUrl: shareImage,
										onlyImageShare: isPicShare == true ? 1 : 0,
										videoUrl: videoUrl,
										audioUrl: audioUrl,
										uidType: uidType
									}), 'callback_zjxw_invoke_openAppShareMenu');
								} else {
									zjxw.zjxw_js_reweet(shareTitle, shareSummary, shareLink, shareImage, isPicShare);
								}
							}
							break;
						case 'get_location_info':
							if (typeof(ZBJTJSBridge) === 'object' && typeof ZBJTJSBridge.invoke === 'function') {
								ZBJTJSBridge.invoke('getLocation', '', 'callback_zjxw_invoke_getLocation');
							} else if (typeof(zjxw.zjxw_js_getLocationInfo) === 'function') {
								zjxw.zjxw_js_getLocationInfo();
							} else {
								driverIncompatible(data, 'get_location_info', true);
								cloudplate.trigger('address_change', '');
							}
							break;
						case 'get_customer_info':
							var customer_info = {
								account_id: '',
								username: '',
								head_img: '',
								nick_name: '',
								score: '',
								mobile: '',
								ref_code: '',
								ref_user_uid: '',
								ref_user_code: '',
								invitation_number: ''
							};

							function customerInfo() {
								if (customer_info && customer_info.account_id && customer_info.username) {
									Core.trigger('get_customer_info', customer_info);
								}
							}
							if (typeof(ZBJTJSBridge) === 'object' && typeof(ZBJTJSBridge.invoke) == 'function') {
								Core.register('get_customer_detail', function(data) {
									customer_info = data;
									customerInfo();
								}, true);
								ZBJTJSBridge.invoke('getUserInfo', '{"signParaList":["id","nick_name","mobile"]}', 'callback_zjxw_invoke_getUserInfo');
							} else if (client_info && client_info.version && /50[4-9]+/.test(client_info.version) && zjxw && typeof(zjxw.zjxw_js_getUserInfo) == 'function') {
								Core.register('get_account_id', function(data) {
									if (data && data.account_id) {
										customer_info.account_id = data.account_id;
									}
									customerInfo();
								}, true);
								Core.register('get_customer_detail', function(data) {
									data.account_id = customer_info.account_id;
									customer_info = data;
									customerInfo();
								}, true);
								zjxw.zjxw_js_getRealAccountId();
								zjxw.zjxw_js_getUserInfo();
							} else {
								if (typeof(zjxw.zjxw_js_getRealLoginName) != 'function') {
									driverIncompatible(data, 'get_customer_info', true);
									cloudplate.trigger('get_customer_info', '');
								} else {
									Core.register('get_account_id', function(data) {
										if (data && data.account_id) {
											customer_info.account_id = data.account_id;
										}
										customerInfo();
									}, true);
									Core.register('get_customer_name', function(data) {
										if (data && data.name) {
											customer_info.username = data.name;
										}
										customerInfo();
									}, true);
									zjxw.zjxw_js_getRealAccountId();
									zjxw.zjxw_js_getRealLoginName();
								}
							}
							break;
						case 'get_download_info':
							cloudplate.trigger('get_download_info', {
								to_new_verison: function() {
									window.location.href = _cp_config.download_url.zjxw;
								},
								alertinfo: '',
								downloadlink: _cp_config.download_url.zjxw
							});
							break;
						case 'get_ip':
							driverIncompatible(data, 'get_ip');
							cloudplate.trigger('get_ip', '');
							break;
						case 'get_image':
							if (typeof(ZBJTJSBridge) === 'object' && typeof(ZBJTJSBridge.invoke) == 'function') {
								ZBJTJSBridge.invoke('selectImage', JSON.stringify(data), 'callback_zjxw_invoke_selectImage');
							} else if (typeof(zjxw.zjxw_js_selectImage) != 'function') {
								driverIncompatible(data, 'get_image', true);
								cloudplate.trigger('get_image', '');
							} else {
								zjxw.zjxw_js_selectImage();
							}
							break;
						case 'get_voice':
							driverIncompatible(data, 'get_voice');
							cloudplate.trigger('get_voice', '');
							break;
						case 'start_voice':
							if (typeof(ZBJTJSBridge) === 'object' && typeof(ZBJTJSBridge.invoke) == 'function') {
								data.recordId = data.id;
								cloudplate.trigger('start_voice', data);
								ZBJTJSBridge.invoke('startRecord', JSON.stringify(data), 'callback_zjxw_invoke_startRecord');
							} else if (typeof(zjxw.zjxw_js_startRecord) == 'function') {
								cloudplate.trigger('start_voice', data);
								zjxw.zjxw_js_startRecord();
							}
							break;
						case 'file_upload':
							if (typeof(ZBJTJSBridge) === 'object' && typeof(ZBJTJSBridge.invoke) == 'function') {
								data.serverUrl = data.serviceurl;
								data.localUrl = data.localfile;
								data.fileName = data.filename;
								data.inputName = data.inputname;
								ZBJTJSBridge.invoke('uploadFile', JSON.stringify(data), 'callback_zjxw_invoke_uploadFile');
							} else if (typeof(zjxw.zjxw_js_fileUpload) != 'function') {
								driverIncompatible(data, 'file_upload', true);
								cloudplate.trigger('file_upload', '');
							} else {
								zjxw.zjxw_js_fileUpload(data.serviceurl, data.localfile, data.filename, data.inputname);
							}
							break;
						case 'stop_voice':
							driverIncompatible(data, 'stop_voice');
							cloudplate.trigger('stop_voice', '');
							break;
						case 'get_video':
							driverIncompatible(data, 'get_video');
							cloudplate.trigger('get_video', '');
							break;
						case 'get_scan_qr':
							driverIncompatible(data, 'get_scan_qr');
							cloudplate.trigger('get_scan_qr', '');
							break;
						case 'search_beacons':
							driverIncompatible(data, 'search_beacons');
							cloudplate.trigger('search_beacons', '');
							break;
						case 'shake':
							driverIncompatible(data, 'shake');
							cloudplate.trigger('shake', '');
							break;
						case 'close':
							if (typeof(ZBJTJSBridge) === 'object' && typeof(ZBJTJSBridge.invoke) == 'function') {
								ZBJTJSBridge.invoke('closeWindow', JSON.stringify(data), 'callback_zjxw_invoke_closeWindow');
							} else if (typeof(zjxw.zjxw_js_close) != 'function') {
								driverIncompatible(data, 'close', true);
								cloudplate.trigger('close', '');
							} else {
								zjxw.zjxw_js_close();
							}
							break;
						case 'set_data':
							if (data.storage !== 0 && data.storage !== '0' && data.storage !== 1 && data.storage !== '1') {
								Tools.setError({
									code: 105,
									msg: '参数传值不对',
									data: ''
								});
								cloudplate.trigger('set_data', '');
								return;
							}
							var result = '';
							if (typeof(ZBJTJSBridge) === 'object' && typeof(ZBJTJSBridge.invoke) == 'function') {
								(data.storage === 0 || data.storage === '0') ? data.option = '0' : data.option = '1';
								if (typeof data.value === 'string' && data.value.indexOf("{") === 0 && /^[6|7|8|9|10][0-9]{4}$/.test(client_info.version)) {
									data.value = '+zjxw+' + JSON.stringify(data.value) + '-zjxw-';
								}
								ZBJTJSBridge.invoke('saveValueToLocal', JSON.stringify(data), 'callback_zjxw_invoke_saveValueToLocal');
							} else if (typeof(zjxw.zjxw_js_setKeyValue) != 'function') {
								window.localStorage && window.localStorage.setItem(data.key, data.value);
								window.sessionStorage && window.sessionStorage.setItem(data.key, data.value);
								if (window.localStorage || window.sessionStorage) {
									result = {
										success: true
									};
								} else {
									result = {
										success: false
									};
								}
							} else {
								if (typeof data.value === 'string' && data.value.indexOf("{") === 0) {
									var ff = JSON.parse(data.value);
									for (var index in ff) {
										ff[index] = Tools.recursionTrform(ff[index]);
									}
									data.value = ff;
								}
								zjxw.zjxw_js_setKeyValue(data.storage, data.key, JSON.stringify(data.value));
							}
							cloudplate.trigger('set_data', result);
							break;
						case 'get_data':
							var result = '';
							if (data.storage !== 0 && data.storage !== '0' && data.storage !== 1 && data.storage !== '1') {
								Tools.setError({
									code: 105,
									msg: '参数传值不对',
									data: ''
								});
								cloudplate.trigger('get_data', '');
								break;
							}
							if (typeof(ZBJTJSBridge) === 'object' && typeof(ZBJTJSBridge.invoke) == 'function') {
								(data.storage === 0 || data.storage === '0') ? data.option = '0' : data.option = '1';
								ZBJTJSBridge.invoke('getValueFromLocal', JSON.stringify(data), 'callback_zjxw_invoke_getValueFromLocal');
							} else if (typeof(zjxw.zjxw_js_getKeyValue) != 'function') {
								window.localStorage ? result = window.localStorage.getItem(data.key) : '';
								window.sessionStorage && result === '' ? result = window.sessionStorage.getItem(data.key) : '';
								if (window.localStorage || window.sessionStorage) {
									result = {
										success: true,
										data: result
									};
								} else {
									result = {
										success: false,
										data: result
									};
								}
								cloudplate.trigger('get_data', result);
							} else {
								zjxw.zjxw_js_getKeyValue(data.storage, data.key);
							}
							break;
						case 'set_share':
							if (typeof data == 'string') {
								try {
									data = JSON.parse(data);
								} catch (e) {
									Tools.setError({
										code: 101,
										msg: e.name,
										data: e
									});
								}
							}
							var shareTitle = data.title ? data.title : '',
								shareSummary = data.shareSummary ? data.shareSummary : '',
								shareLink = data.link ? data.link : '',
								shareImage = data.imgUrl ? data.imgUrl : '',
								shareUrlScheme = data.shareUrlScheme ? data.shareUrlScheme : '',
								videoUrl = data.videoUrl || '',
								audioUrl = data.audioUrl || '',
								isPicShare = false;
							if (shareTitle == '' && shareSummary == '' && shareLink == '' && shareImage) {
								isPicShare = true;
							}
							var shareToMap = {
								"1": 'AppMessage',
								"2": 'Timeline',
								"3": 'DingDing',
								"4": 'ShareQQ',
								"5": 'WeiBo',
								"6": 'QQZone'
							};
							if (typeof(zjxw.zjxw_js_updateShareInfo) != 'function') {
								driverIncompatible(data, 'set_share', true);
								cloudplate.trigger('set_share', '');
							} else {
								if (client_info && client_info.version && /^50[0-4]+/.test(client_info.version)) {
									zjxw.zjxw_js_updateShareInfo(shareTitle, shareSummary, shareLink, shareImage, shareUrlScheme);
								} else {
									if (typeof(ZBJTJSBridge) === 'object' && typeof ZBJTJSBridge.invoke === 'function') {
										ZBJTJSBridge.invoke('updateAppShareData', JSON.stringify({
											title: shareTitle,
											desc: shareSummary,
											link: shareLink,
											imgUrl: shareImage,
											onlyImageShare: isPicShare == true ? 1 : 0,
											videoUrl: videoUrl,
											audioUrl: audioUrl,
											uidType: 9,
											callback: Core.loadCallbackFunctions('set_share_success', function(cResult) {
												CP.tools.writelog('run callback_success_updateAppShareData', cResult);
												var result = {
													success: 0
												};
												try {
													if (typeof(cResult) == 'string' && cResult.indexOf("{") === 0) {
														cResult = JSON.parse(cResult);
													}
													result.success = cResult.code || 0;
													if (cResult && cResult.data.shareTo && shareToMap[cResult.data.shareTo]) {
														result.shareTo = shareToMap[cResult.data.shareTo];
													} else {
														result.shareTo = cResult.data.shareTo;
													}
												} catch (e) {
													Tools.setError({
														code: 101,
														msg: e.name,
														data: e
													});
												}
												cloudplate.trigger('set_share_success', result, '', data._cp_event.set_share_success[0]);
											})
										}), 'callback_zjxw_invoke_updateAppShareData');
									} else {
										zjxw.zjxw_js_updateShareInfo(shareTitle, shareSummary, shareLink, shareImage, shareUrlScheme, isPicShare);
									}
								}
							}
							break;
						case 'play_voice':
							break;
						case 'pause_play_voice':
							break;
						case 'stop_play_voice':
							break;
						case 'url_redirect':
							var flag = false;
							var timer = setInterval(function() {
								if (!flag) {
									flag = true;
									window.location.href = data.url;
									clearInterval(timer);
								}
							}, 200);
							break;
						case 'bindmobile':
							if (typeof(zjxw.zjxw_js_bindmobile) != 'function') {
								driverIncompatible(data, 'bindmobile', true);
								cloudplate.trigger('bindmobile', '');
							} else if (typeof(ZBJTJSBridge) === 'object' && typeof ZBJTJSBridge.invoke === 'function') {
								ZBJTJSBridge.invoke('openAppMobile', JSON.stringify({
									control: '0'
								}), 'callback_zjxw_invoke_bindmobile');
							} else {
								zjxw.zjxw_js_bindmobile();
							}
							break;
						case 'is_bindmobile':
							if (typeof(ZBJTJSBridge) === 'object' && typeof ZBJTJSBridge.invoke === 'function') {
								ZBJTJSBridge.invoke('getUserInfo', JSON.stringify({
									signParaList: ["id", "nick_name", "mobile"]
								}), 'callback_zjxw_invoke_isBindmobile');
							} else if (typeof(zjxw.zjxw_js_isUserBindMobile) == 'function') {
								zjxw.zjxw_js_isUserBindMobile();
							} else {
								driverIncompatible(data, 'is_bindmobile', true);
								cloudplate.trigger('is_bindmobile', '');
							}
							break;
						case 'redpacket_open_success':
							driverIncompatible(data, 'shake');
							cloudplate.trigger('redpacket_open_success', {
								success: '1'
							});
							break;
						case 'show_modify_mobile':
							if (typeof(ZBJTJSBridge) === 'object' && typeof ZBJTJSBridge.invoke === 'function') {
								ZBJTJSBridge.invoke('openAppMobile', JSON.stringify({
									control: 1
								}), 'callback_zjxw_invoke_openAppMobile')
							} else if (typeof(zjxw.zjxw_js_modifyMobile) == 'function') {
								zjxw.zjxw_js_modifyMobile();
							} else {
								driverIncompatible(data, 'show_modify_mobile', true);
								cloudplate.trigger('modify_mobile', '');
							}
							break;
						case 'modify_delivery_name':
							if (typeof(ZBJTJSBridge) === 'object' && typeof(ZBJTJSBridge.invoke) == 'function') {
								ZBJTJSBridge.invoke('modifyUserInfo', JSON.stringify({
									option: 'name'
								}), 'callback_zjxw_invoke_modifyUserInfo_deliveryname');
							} else if (typeof(zjxw.zjxw_js_modifyDeliveryName) != 'function') {
								driverIncompatible(data, 'modify_delivery_name', true);
								cloudplate.trigger('modify_delivery_name', '');
								break;
							}
							zjxw.zjxw_js_modifyDeliveryName();
							break;
						case 'open_address':
							if (typeof(ZBJTJSBridge) === 'object' && typeof(ZBJTJSBridge.invoke) == 'function') {
								ZBJTJSBridge.invoke('modifyUserInfo', JSON.stringify({
									option: 'address'
								}), 'callback_zjxw_invoke_modifyUserInfo_deliveryaddress');
							} else if (typeof(zjxw.zjxw_js_modifyDeliveryAddress) != 'function') {
								driverIncompatible(data, 'open_address', true);
								cloudplate.trigger('open_address', '');
								break;
							}
							zjxw.zjxw_js_modifyDeliveryAddress();
							break;
						case 'check_js_api':
							if (typeof(ZBJTJSBridge) === 'object' && typeof ZBJTJSBridge.invoke === 'function') {
								ZBJTJSBridge.invoke('check_js_api', JSON.stringify(data), 'callback_zjxw_invoke_checkJSApi')
							} else {
								driverIncompatible(data, 'check_js_api', true);
								cloudplate.trigger('check_js_api', '');
							}
							break;
						case 'preview':
							if (typeof(ZBJTJSBridge) === 'object' && typeof ZBJTJSBridge.invoke === 'function') {
								ZBJTJSBridge.invoke('previewImage', JSON.stringify(data), 'callback_zjxw_invoke_previewImage')
							} else {
								driverIncompatible(data, 'preview', true);
								cloudplate.trigger('preview', '');
							}
							break;
						default:
							driverIncompatible(data, event);
							cloudplate.trigger(event, '');
							break;
					}
				}
			},
			xsb: {
				driver_params: {},
				preloadfiles: [],
				check: function(callback) {
					if (typeof xsb != "undefined") {
						driverIsLoading = true;
						Core.register('get_client_info', function(data) {
							callback({
								client_code: data.client_code,
								version: data.version,
								versionName: data.version,
								detail: data.detail,
								is_client: '1'
							});
						}, true);
						xsb.zjrb_cp_get_client_info();
					}
				},
				load: function(client_info, callback) {
					callback(client_info);
				},
				init: function(options, client_info) {
					var driver_var = this;
					driver_var['_options'] = options;
					options.ready(client_info);
				},
				filterUrl: function(url) {
					return url.replace(/\?zjxw_control=1101\//g, '');
				},
				delegate: function(event, data, client_info) {
					data = data ? data : '';
					var _options = this._options;
					switch (event) {
						case 'show_login':
							if (typeof(xsb) == 'object' && typeof(xsb.zjrb_cp_show_login) == 'function') {
								xsb.zjrb_cp_show_login();
							} else {
								driverIncompatible(data, 'show_login', true);
								cloudplate.trigger('reset', '');
							}
							break;
						case 'is_login':
							if (typeof(xsb) == 'object' && typeof(xsb.zjrb_cp_is_login) == 'function') {
								xsb.zjrb_cp_is_login();
							} else {
								driverIncompatible(data, 'is_login', true);
								cloudplate.trigger('is_login', '');
							}
							break;
						case 'get_unique_id':
							if (typeof(xsb) == 'object' && typeof(xsb.zjrb_cp_get_unique_id) == 'function') {
								xsb.zjrb_cp_get_unique_id();
							} else {
								driverIncompatible(data, 'get_unique_id', true);
								cloudplate.trigger('get_unique_id', '');
							}
							break;
						case 'get_account_id':
							if (typeof(xsb) == 'object' && typeof(xsb.zjrb_cp_get_account_id) == 'function') {
								xsb.zjrb_cp_get_account_id();
							} else {
								driverIncompatible(data, 'get_account_id', true);
								cloudplate.trigger('get_account_id', '');
							}
							break;
						case 'get_client_info':
							if (typeof(xsb) == 'object' && typeof(xsb.zjrb_cp_get_client_info) == 'function') {
								xsb.zjrb_cp_get_client_info();
							} else {
								driverIncompatible(data, 'get_client_info', true);
								cloudplate.trigger('get_client_info', '');
							}
							break;
						case 'get_device_info':
							if (typeof(xsb) == 'object' && typeof(xsb.zjrb_cp_get_device_info) == 'function') {
								xsb.zjrb_cp_get_device_info();
							} else {
								driverIncompatible(data, 'get_device_info', true);
								cloudplate.trigger('get_device_info', '');
							}
							break;
						case 'reset':
							cloudplate.trigger('reset', '');
							break;
						case 'get_css_mode':
							if (typeof(xsb) == 'object' && typeof(xsb.zjrb_cp_get_css_mode) == 'function') {
								xsb.zjrb_cp_get_css_mode();
							} else {
								driverIncompatible(data, 'get_css_mode', true);
								cloudplate.trigger('mode_change', '');
							}
							break;
						case 'show_share':
							!data.title ? data.title = '分享给你' : '';
							!data.shareTo ? data.shareTo = 'AppMessage' : '';
							!data.shareSummary ? data.shareSummary = '分享给你' : '';
							!data.id ? data.id = 0 : '';
							!data.type ? data.type = 'share' : '';
							!data.datatype ? data.datatype = 'link' : '';
							!data.dataUrl ? data.dataUrl = 0 : '';
							if (typeof(xsb) == 'object' && typeof(xsb.zjrb_cp_show_share) == 'function') {
								xsb.zjrb_cp_show_share(JSON.stringify(data));
							} else {
								driverIncompatible(data, 'show_share', true);
								cloudplate.trigger('get_share_result', '');
							}
							break;
						case 'get_location_info':
							if (typeof(xsb) == 'object' && typeof(xsb.zjrb_cp_get_location_info) == 'function') {
								xsb.zjrb_cp_get_location_info();
							} else {
								driverIncompatible(data, 'get_location_info', true);
								cloudplate.trigger('address_change', '');
							}
							break;
						case 'get_customer_info':
							if (typeof(xsb) == 'object' && typeof(xsb.zjrb_cp_get_customer_info) == 'function') {
								xsb.zjrb_cp_get_customer_info();
							} else {
								driverIncompatible(data, 'get_customer_info', true);
								cloudplate.trigger('get_customer_info', '');
							}
							break;
						case 'get_download_info':
							if (!_cp_config.download_url[client_info.client_code]) {
								driverIncompatible(data, 'get_customer_info', true);
								cloudplate.trigger('get_customer_info', '');
								break;
							}
							cloudplate.trigger('get_download_info', {
								to_new_verison: function() {
									window.location.href = _cp_config.download_url[client_info.client_code];
								},
								alertinfo: '',
								downloadlink: _cp_config.download_url[client_info.client_code]
							});
							break;
						case 'get_ip':
							if (typeof(xsb) == 'object' && typeof(xsb.zjrb_cp_get_ip) == 'function') {
								xsb.zjrb_cp_get_ip();
							} else {
								driverIncompatible(data, 'get_ip', true);
								cloudplate.trigger('get_ip', '');
							}
							break;
						case 'get_image':
							driverIncompatible(data, 'get_image');
							cloudplate.trigger('get_image', '');
							break;
						case 'get_voice':
							driverIncompatible(data, 'get_voice');
							cloudplate.trigger('get_voice', '');
							break;
						case 'start_voice':
							if (typeof xsb.zjrb_cp_start_voice == 'function') {
								xsb.zjrb_cp_start_voice(JSON.stringify({
									'id': data.id
								}));
							} else {
								driverIncompatible(data, 'start_voice');
								cloudplate.trigger('start_voice', '');
							}
							break;
						case 'file_upload':
							if (data && !data.uploadMode) {
								data.uploadMode = 'default';
							}
							if (typeof(xsb) == 'object' && typeof(xsb.zjrb_cp_fileUpload) == 'function') {
								xsb.zjrb_cp_fileUpload(JSON.stringify(data));
							} else {
								driverIncompatible(data, 'file_upload', true);
								cloudplate.trigger('file_upload', '');
							}
							break;
						case 'stop_voice':
							if (typeof xsb.zjrb_cp_stop_voice == 'function') {
								xsb.zjrb_cp_stop_voice({
									'id': data.id
								});
							} else {
								driverIncompatible(data, 'stop_voice');
								cloudplate.trigger('stop_voice', '');
							}
							break;
						case 'get_video':
							driverIncompatible(data, 'get_video');
							cloudplate.trigger('get_video', '');
							break;
						case 'search_beacons':
							driverIncompatible(data, 'search_beacons');
							cloudplate.trigger('search_beacons', '');
							break;
						case 'shake':
							driverIncompatible(data, 'shake');
							cloudplate.trigger('shake', '');
							break;
						case 'close':
							if (xsb && typeof xsb.zjrb_cp_close === 'function') {
								xsb.zjrb_cp_close();
							} else if (window && typeof(window.close) == 'function') {
								window.close();
							}
							timeout(function() {
								driverIncompatible(data, 'close');
							}, 500);
							break;
						case 'set_data':
							if (data.storage !== 0 && data.storage !== '0' && data.storage !== 1 && data.storage !== '1') {
								Tools.setError({
									code: 105,
									msg: '参数传值不对',
									data: ''
								});
								cloudplate.trigger('set_data', '');
								break;
							}
							if (typeof data != 'string') {
								data = JSON.stringify(data);
							}
							if (typeof(xsb) == 'object' && typeof(xsb.zjrb_cp_setdata) == 'function') {
								xsb.zjrb_cp_setdata(data);
							} else {
								driverIncompatible(data, 'set_data', true);
								cloudplate.trigger('set_data', '');
							}
							break;
						case 'get_data':
							if (data.storage !== 0 && data.storage !== '0' && data.storage !== 1 && data.storage !== '1') {
								Tools.setError({
									code: 105,
									msg: '参数传值不对',
									data: ''
								});
								cloudplate.trigger('get_data', '');
								break;
							}
							if (typeof data != 'string') {
								data = JSON.stringify(data);
							}
							if (typeof(xsb) == 'object' && typeof(xsb.zjrb_cp_getdata) == 'function') {
								xsb.zjrb_cp_getdata(data);
							} else {
								driverIncompatible(data, 'get_data', true);
								cloudplate.trigger('get_data', '');
							}
							break;
						case 'set_share':
							if (!data || !(data && data.link)) {
								Tools.setError({
									code: 105,
									msg: 'set_share 参数不正确',
									data: data
								});
								cloudplate.trigger('set_share', {
									success: '0'
								});
								break;
							}
							if (data['_cp_event'] && data['_cp_event'].set_share_success) {
								CP.subscribeEvent({
									completed: function(data) {
										CP.tools.writelog('已分享');
										cloudplate.trigger('set_share_success', {
											success: '1',
											shareTo: data.data.shareTo
										}, '', data['_cp_event'].set_share_success);
									},
									cpIncompatible: function() {
										CP.tools.writelog('', '此环境不支持此方法');
									},
									key: 'sub_share',
									once: false
								});
							}
							if (typeof(xsb) == 'object' && typeof(xsb.zjrb_cp_setshareinfo) == 'function') {
								xsb.zjrb_cp_setshareinfo(JSON.stringify(data));
							} else if (client_info && client_info.version) {
								window.xsb_msg_title = !data.title ? '' : data.title;
								window.xsb_msg_desc = !data.shareSummary ? '' : data.shareSummary;
								window.xsb_msg_cdn_url = !data.imgUrl ? '' : data.imgUrl;
								window.xsb_msg_link = data.link;
								window.msg_title = !data.title ? '' : data.title;
								window.msg_desc = !data.shareSummary ? '' : data.shareSummary;
								window.msg_cdn_url = !data.imgUrl ? '' : data.imgUrl;
								window.msg_link = data.link;
								cloudplate.trigger('set_share', {
									success: '1'
								});
							} else {
								driverIncompatible(data, 'set_share', true);
								cloudplate.trigger('set_share', {
									success: '0'
								});
							}
							break;
						case 'play_voice':
							break;
						case 'pause_play_voice':
							break;
						case 'stop_play_voice':
							break;
						case 'url_redirect':
							window.location.href = data.url;
							break;
						case 'bindmobile':
							if (typeof xsb.zjrb_cp_bindmobile == 'function') {
								xsb.zjrb_cp_bindmobile();
							} else {
								driverIncompatible(data, 'bindmobile');
								cloudplate.trigger('bindmobile', '');
							}
							break;
						case 'is_bindmobile':
							if (typeof xsb.zjrb_cp_isbindmobile == 'function') {
								xsb.zjrb_cp_isbindmobile();
							} else {
								driverIncompatible(data, 'is_bindmobile');
								cloudplate.trigger('is_bindmobile', '');
							}
							break;
						case 'redpacket_open_success':
							var result = {
								success: '1'
							};
							if (typeof(xsb) == 'object') {
								if (typeof(xsb.redPacketOpenSuccess) == 'function') {
									xsb.redPacketOpenSuccess();
								} else {
									driverIncompatible(data, 'redpacket_open_success', true);
									result = '';
									break;
								}
							} else {
								driverIncompatible(data, 'redpacket_open_success');
								result = '';
							}
							cloudplate.trigger('redpacket_open_success', result);
							break;
						case 'show_modify_mobile':
							if (typeof xsb.zjrb_cp_modify_mobile == 'function') {
								xsb.zjrb_cp_modify_mobile();
							} else {
								driverIncompatible(data, 'modify_mobile');
								cloudplate.trigger('modify_mobile', {
									success: '0'
								});
							}
							break;
						case 'define_menu':
							if (typeof xsb.zjrb_cp_define_menu == 'function') {
								xsb.zjrb_cp_define_menu(JSON.stringify(data));
							} else {
								driverIncompatible(data, 'define_menu');
								cloudplate.trigger('define_menu', {
									success: '0'
								});
							}
							break;
						case 'select_media':
							if (typeof xsb.zjrb_cp_select_media == 'function') {
								xsb.zjrb_cp_select_media(JSON.stringify(data));
							} else {
								driverIncompatible(data, 'select_media');
								cloudplate.trigger('select_media', {
									success: '0'
								});
							}
							break;
						case 'subscribe_event':
							var params = data;
							if (!data.events && data.key) {
								params['events'] = [{
									key: data.key,
									once: data.once
								}];
							}
							if (typeof xsb.zjrb_cp_subscribe_event == 'function') {
								xsb.zjrb_cp_subscribe_event(JSON.stringify(params));
							} else {
								driverIncompatible(data, 'subscribe_event');
								cloudplate.trigger('subscribe_event', {
									success: '0'
								});
							}
							break;
						case 'preview':
							if (typeof xsb.zjrb_cp_preview == 'function') {
								xsb.zjrb_cp_preview(JSON.stringify(data));
							} else {
								driverIncompatible(data, 'preview');
								cloudplate.trigger('preview', {
									success: '0'
								});
							}
							break;
						case 'get_scan_qr':
							data.scanType = ['qrCode'];
							if (!data.needResult) {
								data.needResult = 0;
							}
							if (typeof xsb.zjrb_cp_show_scan_qr == 'function') {
								xsb.zjrb_cp_show_scan_qr(JSON.stringify(data));
							} else {
								driverIncompatible(data, 'get_scan_qr');
								cloudplate.trigger('get_scan_qr', {
									success: '0'
								});
							}
							break;
						case 'behavior_set':
							if (typeof xsb.zjrb_cp_behavior_set == 'function') {
								xsb.zjrb_cp_behavior_set(JSON.stringify(data));
							} else {
								driverIncompatible(data, 'behavior_set');
								cloudplate.trigger('behavior_set', {
									success: '0'
								});
							}
							break;
						case 'create_shortcut':
							if (typeof xsb.zjrb_cp_create_shortcut == 'function') {
								xsb.zjrb_cp_create_shortcut(JSON.stringify(data));
							} else {
								driverIncompatible(data, 'create_shortcut');
								cloudplate.trigger('create_shortcut', {
									success: '0'
								});
							}
							break;
						case 'open_eye_cool_face':
							if (typeof xsb.zjrb_cp_open_eye_cool_face == 'function') {
								xsb.zjrb_cp_open_eye_cool_face(JSON.stringify(data));
							} else {
								driverIncompatible(data, 'open_eye_cool_face');
								cloudplate.trigger('open_eye_cool_face', {
									success: '0'
								});
							}
							break;
						case 'open_JXCCB_powerEnter':
							if (typeof xsb.zjrb_cp_open_JXCCB_powerEnter == 'function') {
								xsb.zjrb_cp_open_JXCCB_powerEnter(JSON.stringify(data));
							} else {
								driverIncompatible(data, 'open_JXCCB_powerEnter');
								cloudplate.trigger('open_JXCCB_powerEnter', {
									success: '0'
								});
							}
							break;
						case 'get_step_count':
							if (typeof xsb.zjrb_cp_get_step_count == 'function') {
								xsb.zjrb_cp_get_step_count(JSON.stringify(data));
							} else {
								driverIncompatible(data, 'get_step_count');
								cloudplate.trigger('get_step_count', {
									success: '0'
								});
							}
							break;
						default:
							driverIncompatible(data, event);
							cloudplate.trigger(event, '');
							break;
					}
				}
			},
			h24: {
				driver_params: {},
				preloadfiles: [],
				check: function(callback) {
					if (typeof h24 != "undefined") {
						driverIsLoading = true;
						Core.register('get_client_info', function(data) {
							callback({
								client_code: data.client_code,
								version: data.version,
								versionName: data.version,
								detail: data.detail,
								is_client: '1'
							});
						}, true);
						h24.zjrb_cp_get_client_info();
					}
				},
				load: function(driver_params, callback) {
					callback(driver_params);
				},
				init: function(options, client_info) {
					var driver_var = this;
					driver_var['_options'] = options;
					options.ready(client_info);
				},
				filterUrl: function(url) {
					return url.replace(/\?zjxw_control=1101\//g, '');
				},
				delegate: function(event, data, client_info) {
					data = data ? data : '';
					var _options = this._options;
					switch (event) {
						case 'show_login':
							if (typeof(h24) == 'object' && typeof(h24.zjrb_cp_show_login) == 'function') {
								h24.zjrb_cp_show_login();
							} else {
								driverIncompatible(data, 'show_login', true);
								cloudplate.trigger('reset', '');
							}
							break;
						case 'is_login':
							if (typeof(h24) == 'object' && typeof(h24.zjrb_cp_is_login) == 'function') {
								h24.zjrb_cp_is_login();
							} else {
								driverIncompatible(data, 'is_login', true);
								cloudplate.trigger('is_login', '');
							}
							break;
						case 'get_unique_id':
							if (typeof(h24) == 'object' && typeof(h24.zjrb_cp_get_unique_id) == 'function') {
								h24.zjrb_cp_get_unique_id();
							} else {
								driverIncompatible(data, 'get_unique_id', true);
								cloudplate.trigger('get_unique_id', '');
							}
							break;
						case 'get_account_id':
							if (typeof(h24) == 'object' && typeof(h24.zjrb_cp_get_account_id) == 'function') {
								h24.zjrb_cp_get_account_id();
							} else {
								driverIncompatible(data, 'get_account_id', true);
								cloudplate.trigger('get_account_id', '');
							}
							break;
						case 'get_client_info':
							if (typeof(h24) == 'object' && typeof(h24.zjrb_cp_get_client_info) == 'function') {
								h24.zjrb_cp_get_client_info();
							} else {
								driverIncompatible(data, 'get_client_info', true);
								cloudplate.trigger('get_client_info', '');
							}
							break;
						case 'get_device_info':
							if (typeof(h24) == 'object' && typeof(h24.zjrb_cp_get_device_info) == 'function') {
								h24.zjrb_cp_get_device_info();
							} else {
								driverIncompatible(data, 'get_device_info', true);
								cloudplate.trigger('get_device_info', '');
							}
							break;
						case 'reset':
							cloudplate.trigger('reset', '');
							break;
						case 'get_css_mode':
							if (typeof(h24) == 'object' && typeof(h24.zjrb_cp_get_css_mode) == 'function') {
								h24.zjrb_cp_get_css_mode();
							} else {
								driverIncompatible(data, 'get_css_mode', true);
								cloudplate.trigger('mode_change', '');
							}
							break;
						case 'show_share':
							!data.title ? data.title = '分享给你' : '';
							!data.shareSummary ? data.shareSummary = '分享给你' : '';
							!data.id ? data.id = 0 : '';
							!data.type ? data.type = 'share' : '';
							!data.datatype ? data.datatype = 'link' : '';
							!data.dataUrl ? data.dataUrl = 0 : '';
							!data.imgUrl ? data.imgUrl = '' : '';
							data['shareSummary'] = data.shareSummary;
							if (!(data.link && data.link.indexOf('http') !== -1)) {
								Tools.setError({
									code: 105,
									msg: '参数传值不对',
									data: ''
								});
								cloudplate.trigger('get_share_result', '');
								break;
							}
							if (typeof(h24) == 'object' && typeof(h24.zjrb_cp_show_share) == 'function') {
								h24.zjrb_cp_show_share(JSON.stringify(data));
							} else if (typeof(h24) == 'object' && typeof(h24.zjrb_common_share) == 'function') {
								h24.zjrb_common_share(JSON.stringify({
									title: data.title,
									summary: data.shareSummary,
									targetUrl: data.link,
									iconUrl: data.imgUrl
								}));
								cloudplate.trigger('get_share_result', {
									result: 'success',
									shareTo: '',
									allow_alert: '1'
								});
							} else {
								driverIncompatible(data, 'show_share', true);
								cloudplate.trigger('get_share_result', '');
							}
							break;
						case 'get_location_info':
							if (typeof(h24) == 'object' && typeof(h24.zjrb_cp_get_location_info) == 'function') {
								h24.zjrb_cp_get_location_info();
							} else {
								driverIncompatible(data, 'get_location_info', true);
								cloudplate.trigger('address_change', '');
							}
							break;
						case 'get_customer_info':
							if (typeof(h24) == 'object' && typeof(h24.zjrb_cp_get_customer_info) == 'function') {
								h24.zjrb_cp_get_customer_info();
							} else {
								driverIncompatible(data, 'get_customer_info', true);
								cloudplate.trigger('get_customer_info', '');
							}
							break;
						case 'get_download_info':
							cloudplate.trigger('get_download_info', {
								to_new_verison: function() {
									window.location.href = _cp_config.download_url.h24;
								},
								alertinfo: '',
								downloadlink: _cp_config.download_url.h24
							});
							break;
						case 'get_ip':
							if (typeof(h24) == 'object' && typeof(h24.zjrb_cp_get_ip) == 'function') {
								h24.zjrb_cp_get_ip();
							} else {
								driverIncompatible(data, 'get_ip', true);
								cloudplate.trigger('get_ip', '');
							}
							break;
						case 'get_image':
							!data.count ? data.count = 1 : '';
							!data.sizeType ? data.sizeType = 'compressed' : '';
							!data.size ? data.size = 20480 : '';
							!data.sourceType ? data.sourceType = 'album' : '';
							!data.dataType ? data.dataType = 'addr' : '';
							if (typeof(h24) == 'object' && typeof(h24.zjrb_cp_get_image) == 'function') {
								h24.zjrb_cp_get_image(JSON.stringify(data));
							} else {
								driverIncompatible(data, 'get_image', true);
								cloudplate.trigger('get_image', '');
							}
							break;
						case 'get_voice':
							driverIncompatible(data, 'get_voice');
							cloudplate.trigger('get_voice', '');
							break;
						case 'start_voice':
							driverIncompatible(data, 'start_voice');
							cloudplate.trigger('start_voice', '');
							break;
						case 'file_upload':
							(!data.type || typeof data.type == 'object' && data.type.length > 0) ? data.type = [] : data.type;
							if (typeof(h24) == 'object' && typeof(h24.zjrb_cp_fileUpload) == 'function') {
								h24.zjrb_cp_fileUpload(JSON.stringify(data));
							} else {
								driverIncompatible(data, 'file_upload', true);
								cloudplate.trigger('file_upload', '');
							}
							break;
						case 'stop_voice':
							driverIncompatible(data, 'stop_voice');
							cloudplate.trigger('stop_voice', '');
							break;
						case 'get_video':
							!data.count ? data.count = 1 : '';
							!data.type ? data.type = ['rm', 'rmvb', 'mpeg', 'mov', 'mtv', 'wmv', 'avi', '3gp', 'amv', 'dmv', 'flv', 'gif', 'mkv', 'mp4', 'mpg', 'swf', 'vob', 'rtsp'] : '';
							!data.size ? data.size = 20480 : '';
							!data.duration ? data.duration = 300 : '';
							if (typeof(h24) == 'object' && typeof(h24.zjrb_cp_get_video) == 'function') {
								h24.zjrb_cp_get_video(JSON.stringify(data));
							} else {
								driverIncompatible(data, 'get_video', true);
								cloudplate.trigger('get_video', '');
							}
							break;
						case 'get_scan_qr':
							driverIncompatible(data, 'get_scan_qr');
							cloudplate.trigger('get_scan_qr', '');
							break;
						case 'search_beacons':
							driverIncompatible(data, 'search_beacons');
							cloudplate.trigger('search_beacons', '');
							break;
						case 'shake':
							driverIncompatible(data, 'shake');
							cloudplate.trigger('shake', '');
							break;
						case 'close':
							if (window && typeof(window.close) == 'function') {
								window.close();
							}
							timeout(function() {
								driverIncompatible(data, 'close');
							}, 500);
							break;
						case 'set_data':
							if (data.storage !== 0 && data.storage !== '0' && data.storage !== 1 && data.storage !== '1') {
								Tools.setError({
									code: 105,
									msg: '参数传值不对',
									data: ''
								});
								cloudplate.trigger('set_data', '');
								break;
							}
							if (typeof data != 'string') {
								data = JSON.stringify(data);
							}
							if (typeof(h24) == 'object' && typeof(h24.zjrb_cp_setdata) == 'function') {
								h24.zjrb_cp_setdata(data);
							} else {
								driverIncompatible(data, 'set_data', true);
								cloudplate.trigger('set_data', '');
							}
							break;
						case 'get_data':
							if (data.storage !== 0 && data.storage !== '0' && data.storage !== 1 && data.storage !== '1') {
								Tools.setError({
									code: 105,
									msg: '参数传值不对',
									data: ''
								});
								cloudplate.trigger('get_data', '');
								break;
							}
							if (typeof data != 'string') {
								data = JSON.stringify(data);
							}
							if (typeof(h24) == 'object' && typeof(h24.zjrb_cp_getdata) == 'function') {
								h24.zjrb_cp_getdata(data);
							} else {
								driverIncompatible(data, 'get_data', true);
								cloudplate.trigger('get_data', '');
							}
							break;
						case 'set_share':
							if (!data || !(data && data.link)) {
								Tools.setError({
									code: 105,
									msg: 'set_share 参数不正确',
									data: data
								});
								cloudplate.trigger('set_share', {
									success: '0'
								});
								break;
							}
							if (typeof(h24) == 'object' && typeof(h24.zjrb_cp_setshareinfo) == 'function') {
								h24.zjrb_cp_setshareinfo(data);
							}
							if (client_info && client_info.version) {
								window.h24_msg_title = !data.title ? '' : data.title;
								window.h24_msg_desc = !data.shareSummary ? '' : data.shareSummary;
								window.h24_msg_cdn_url = !data.imgUrl ? '' : data.imgUrl;
								window.h24_msg_link = data.link;
								window.msg_title = !data.title ? '' : data.title;
								window.msg_desc = !data.shareSummary ? '' : data.shareSummary;
								window.msg_cdn_url = !data.imgUrl ? '' : data.imgUrl;
								window.msg_link = data.link;
								cloudplate.trigger('set_share', {
									success: '1'
								});
							} else {
								driverIncompatible(data, 'set_share', true);
								cloudplate.trigger('set_share', {
									success: '0'
								});
							}
							break;
						case 'play_voice':
							break;
						case 'pause_play_voice':
							break;
						case 'stop_play_voice':
							break;
						case 'url_redirect':
							window.location.href = data.url;
							break;
						case 'bindmobile':
							if (typeof(h24) == 'object' && typeof(h24.zjrb_cp_bindmobile) == 'function') {
								h24.zjrb_cp_bindmobile();
							} else {
								driverIncompatible(data, 'bindmobile');
								cloudplate.trigger('bindmobile', '');
							}
							break;
						case 'is_bindmobile':
							if (typeof(h24) == 'object' && typeof(h24.zjrb_cp_isbindmobile) == 'function') {
								h24.zjrb_cp_isbindmobile();
							} else {
								driverIncompatible(data, 'is_bindmobile');
								cloudplate.trigger('is_bindmobile', '');
							}
							break;
						case 'redpacket_open_success':
							var result = {
								success: '1'
							};
							if (typeof(h24) == 'object') {
								if (typeof(h24.redPacketOpenSuccess) == 'function') {
									h24.redPacketOpenSuccess();
								} else {
									driverIncompatible(data, 'redpacket_open_success', true);
									result = '';
									break;
								}
							} else {
								driverIncompatible(data, 'redpacket_open_success');
								result = '';
							}
							cloudplate.trigger('redpacket_open_success', result);
							break;
						case 'show_modify_mobile':
							driverIncompatible(data, 'modify_mobile');
							cloudplate.trigger('modify_mobile', {
								success: '0'
							});
							break;
						case 'convert_video':
							if (typeof(h24.zjrb_cp_convert_video) == 'function') {
								h24.zjrb_cp_convert_video(JSON.stringify(data));
							} else {
								driverIncompatible(data, 'convert_video', true);
								result = '';
								break;
							}
							break;
						case 'preview':
							if (typeof h24.zjrb_cp_preview == 'function') {
								h24.zjrb_cp_preview(JSON.stringify(data));
							} else {
								driverIncompatible(data, 'preview');
								cloudplate.trigger('preview', {
									success: '0'
								});
							}
							break;
						default:
							driverIncompatible(data, event);
							cloudplate.trigger(event, '');
							break;
					}
				}
			},
			hbxw: {
				driver_params: {},
				preloadfiles: [_cp_config.common_file_path + 'common/cp-local-cloudplate.js'],
				check: function(callback) {},
				load: function(driver_params, callback) {
					Request._loadResource(this.preloadfiles, function() {
						callback(driver_params);
					});
				},
				init: function(options, client_info) {
					var driver_var = this;
					driver_var['_options'] = options;
					options.ready(client_info);
				},
				filterUrl: function(url) {
					return url;
				},
				delegate: function(event, data, client_info) {
					data = data ? data : '';
					var _options = this._options;
					switch (event) {
						case 'show_login':
							if (typeof(JSNativeBridge) === 'object' && typeof(JSNativeBridge.invoke) == 'function') {
								JSNativeBridge.invoke('login', '', 'callback_local_invoke_login');
							} else {
								driverIncompatible(data, 'show_login', true);
								cloudplate.trigger('reset', '');
							}
							break;
						case 'is_login':
							if (typeof(JSNativeBridge) === 'object' && typeof JSNativeBridge.invoke == 'function') {
								JSNativeBridge.invoke('getUserInfo', '{"signParaList":["id","nick_name","mobile"]}', 'callback_local_invoke_islogin');
							} else {
								driverIncompatible(data, 'is_login', true);
								cloudplate.trigger('is_login', '');
							}
							break;
						case 'get_unique_id':
							if (typeof(localJS.local_js_getRealSessionId) != 'function') {
								driverIncompatible(data, 'get_unique_id', true);
								cloudplate.trigger('get_unique_id', '');
							} else {
								localJS.local_js_getRealSessionId();
							}
							break;
						case 'get_account_id':
							if (typeof(localJS.local_js_getRealAccountId) != 'function') {
								driverIncompatible(data, 'get_account_id', true);
								cloudplate.trigger('get_account_id', '');
							} else {
								localJS.local_js_getRealAccountId();
							}
							break;
						case 'get_client_info':
							if (typeof(localJS.local_js_getAppVersionCode) == 'function') {
								var version = localJS.local_js_getAppVersionCode();
								cloudplate.trigger('get_client_info', {
									client_code: 'hbxw',
									version: version,
									versionName: version,
									detail: ''
								});
							} else if (typeof(JSNativeBridge) === 'object' && typeof JSNativeBridge.invoke == 'function') {
								JSNativeBridge.invoke('getAppInfo', JSON.stringify({
									uuid: 0
								}), 'callback_local_invoke_getAppVersionCode');
							} else {
								driverIncompatible(data, 'get_client_info', true);
								cloudplate.trigger('get_client_info', '');
							}
							break;
						case 'get_device_info':
							if (typeof(JSNativeBridge) === 'object' && typeof JSNativeBridge.invoke === 'function') {
								JSNativeBridge.invoke('getAppInfo', JSON.stringify({
									uuid: 1
								}), 'callback_local_invoke_getDeviceId');
							} else {
								localJS.local_js_getDeviceId();
							}
							break;
						case 'reset':
							break;
						case 'get_css_mode':
							driverIncompatible(data, 'get_css_mode', true);
							cloudplate.trigger('mode_change', '');
							break;
						case 'show_share':
							if (typeof data == 'string') {
								try {
									data = JSON.parse(data);
								} catch (e) {
									Tools.setError({
										code: 101,
										msg: e.name,
										data: e
									});
								}
							}
							var shareTitle = data.title ? data.title : '',
								shareSummary = data.shareSummary ? data.shareSummary : '',
								shareLink = data.link ? data.link : '',
								shareImage = data.imgUrl ? data.imgUrl : '',
								uid = data.id ? data.id : '',
								uidType = data.type ? data.type : 9,
								videoUrl = data.videoUrl || '',
								audioUrl = data.audioUrl || '';
							isPicShare = false;
							if (shareTitle == '' && shareSummary == '' && shareLink == '' && shareImage) {
								isPicShare = true;
							}
							if (typeof(localJS.local_js_reweet) != 'function') {
								driverIncompatible(data, 'show_share', true);
								cloudplate.trigger('get_share_result', '');
								break;
							}
							if (typeof(JSNativeBridge) === 'object' && typeof JSNativeBridge.invoke === 'function') {
								JSNativeBridge.invoke('openAppShareMenu', JSON.stringify({
									title: shareTitle,
									desc: shareSummary,
									link: shareLink,
									imgUrl: shareImage,
									onlyImageShare: isPicShare == true ? 1 : 0,
									videoUrl: videoUrl,
									audioUrl: audioUrl,
									uidType: uidType
								}), 'callback_local_invoke_openAppShareMenu');
							} else {
								localJS.local_js_reweet(shareTitle, shareSummary, shareLink, shareImage, isPicShare);
							}
							break;
						case 'get_location_info':
							if (typeof(JSNativeBridge) === 'object' && typeof JSNativeBridge.invoke === 'function') {
								JSNativeBridge.invoke('getLocation', '', 'callback_local_invoke_getLocation');
							} else {
								driverIncompatible(data, 'get_location_info', true);
								cloudplate.trigger('address_change', '');
							}
							break;
						case 'get_customer_info':
							var customer_info = {
								account_id: '',
								username: '',
								head_img: '',
								nick_name: '',
								score: '',
								mobile: '',
								ref_code: '',
								ref_user_uid: '',
								ref_user_code: '',
								invitation_number: ''
							};

							function customerInfo() {
								if (customer_info && customer_info.account_id && customer_info.username) {
									Core.trigger('get_customer_info', customer_info);
								}
							}
							if (typeof(JSNativeBridge) === 'object' && typeof(JSNativeBridge.invoke) == 'function') {
								Core.register('get_customer_detail', function(data) {
									customer_info = data;
									customerInfo();
								}, true);
								JSNativeBridge.invoke('getUserInfo', '{"signParaList":["id","nick_name","mobile"]}', 'callback_local_invoke_getUserInfo');
							}
							break;
						case 'get_download_info':
							cloudplate.trigger('get_download_info', {
								to_new_verison: function() {
									window.location.href = _cp_config.download_url.hbxw;
								},
								alertinfo: '',
								downloadlink: _cp_config.download_url.hbxw
							});
							break;
						case 'get_ip':
							driverIncompatible(data, 'get_ip');
							cloudplate.trigger('get_ip', '');
							break;
						case 'get_image':
							if (typeof(JSNativeBridge) === 'object' && typeof(JSNativeBridge.invoke) == 'function') {
								JSNativeBridge.invoke('selectImage', JSON.stringify(data), 'callback_local_invoke_selectImage');
							}
							break;
						case 'get_voice':
							driverIncompatible(data, 'get_voice');
							cloudplate.trigger('get_voice', '');
							break;
						case 'start_voice':
							if (typeof(JSNativeBridge) === 'object' && typeof(JSNativeBridge.invoke) == 'function') {
								data.recordId = data.id;
								cloudplate.trigger('start_voice', data);
								JSNativeBridge.invoke('startRecord', JSON.stringify(data), 'callback_local_invoke_startRecord');
							}
							break;
						case 'file_upload':
							if (typeof(JSNativeBridge) === 'object' && typeof(JSNativeBridge.invoke) == 'function') {
								data.serverUrl = data.serviceurl;
								data.localUrl = data.localfile;
								data.fileName = data.filename;
								data.inputName = data.inputname;
								JSNativeBridge.invoke('uploadFile', JSON.stringify(data), 'callback_local_invoke_uploadFile');
							} else if (typeof(localJS.local_js_fileUpload) != 'function') {
								driverIncompatible(data, 'file_upload', true);
								cloudplate.trigger('file_upload', '');
							}
							break;
						case 'stop_voice':
							driverIncompatible(data, 'stop_voice');
							cloudplate.trigger('stop_voice', '');
							break;
						case 'get_video':
							driverIncompatible(data, 'get_video');
							cloudplate.trigger('get_video', '');
							break;
						case 'get_scan_qr':
							driverIncompatible(data, 'get_scan_qr');
							cloudplate.trigger('get_scan_qr', '');
							break;
						case 'search_beacons':
							driverIncompatible(data, 'search_beacons');
							cloudplate.trigger('search_beacons', '');
							break;
						case 'shake':
							driverIncompatible(data, 'shake');
							cloudplate.trigger('shake', '');
							break;
						case 'close':
							if (typeof(JSNativeBridge) === 'object' && typeof(JSNativeBridge.invoke) == 'function') {
								JSNativeBridge.invoke('closeWindow', JSON.stringify(data), 'callback_local_invoke_closeWindow');
							} else if (typeof(localJS.local_js_close) != 'function') {
								driverIncompatible(data, 'close', true);
								cloudplate.trigger('close', '');
							}
							break;
						case 'set_data':
							if (data.storage !== 0 && data.storage !== '0' && data.storage !== 1 && data.storage !== '1') {
								Tools.setError({
									code: 105,
									msg: '参数传值不对',
									data: ''
								});
								cloudplate.trigger('set_data', '');
								return;
							}
							var result = '';
							if (typeof(JSNativeBridge) === 'object' && typeof(JSNativeBridge.invoke) == 'function') {
								(data.storage === 0 || data.storage === '0') ? data.option = '0' : data.option = '1';
								if (typeof data.value === 'string' && data.value.indexOf("{") === 0 && /^[6|7|8|9|10][0-9]{4}$/.test(client_info.version)) {
									data.value = '+zjxw+' + JSON.stringify(data.value) + '-zjxw-';
								}
								JSNativeBridge.invoke('saveValueToLocal', JSON.stringify(data), 'callback_local_invoke_saveValueToLocal');
							}
							cloudplate.trigger('set_data', result);
							break;
						case 'get_data':
							var result = '';
							if (data.storage !== 0 && data.storage !== '0' && data.storage !== 1 && data.storage !== '1') {
								Tools.setError({
									code: 105,
									msg: '参数传值不对',
									data: ''
								});
								cloudplate.trigger('get_data', '');
								break;
							}
							if (typeof(JSNativeBridge) === 'object' && typeof(JSNativeBridge.invoke) == 'function') {
								(data.storage === 0 || data.storage === '0') ? data.option = '0' : data.option = '1';
								JSNativeBridge.invoke('getValueFromLocal', JSON.stringify(data), 'callback_local_invoke_getValueFromLocal');
							}
							break;
						case 'set_share':
							if (typeof data == 'string') {
								try {
									data = JSON.parse(data);
								} catch (e) {
									Tools.setError({
										code: 101,
										msg: e.name,
										data: e
									});
								}
							}
							var shareTitle = data.title ? data.title : '',
								shareSummary = data.shareSummary ? data.shareSummary : '',
								shareLink = data.link ? data.link : '',
								shareImage = data.imgUrl ? data.imgUrl : '',
								shareUrlScheme = data.shareUrlScheme ? data.shareUrlScheme : '',
								videoUrl = data.videoUrl || '',
								audioUrl = data.audioUrl || '',
								isPicShare = false;
							if (shareTitle == '' && shareSummary == '' && shareLink == '' && shareImage) {
								isPicShare = true;
							}
							var shareToMap = {
								"1": 'AppMessage',
								"2": 'Timeline',
								"3": 'DingDing',
								"4": 'ShareQQ',
								"5": 'WeiBo',
								"6": 'QQZone'
							};
							if (typeof(JSNativeBridge) === 'object' && typeof JSNativeBridge.invoke === 'function') {
								JSNativeBridge.invoke('updateAppShareData', JSON.stringify({
									title: shareTitle,
									desc: shareSummary,
									link: shareLink,
									imgUrl: shareImage,
									onlyImageShare: isPicShare == true ? 1 : 0,
									videoUrl: videoUrl,
									audioUrl: audioUrl,
									uidType: 9,
									callback: Core.loadCallbackFunctions('set_share_success', function(cResult) {
										CP.tools.writelog('run callback_success_updateAppShareData', cResult);
										var result = {
											success: 0
										};
										try {
											if (typeof(cResult) == 'string' && cResult.indexOf("{") === 0) {
												cResult = JSON.parse(cResult);
											}
											result.success = cResult.code || 0;
											if (cResult && cResult.data.shareTo && shareToMap[cResult.data.shareTo]) {
												result.shareTo = shareToMap[cResult.data.shareTo];
											} else {
												result.shareTo = cResult.data.shareTo;
											}
										} catch (e) {
											Tools.setError({
												code: 101,
												msg: e.name,
												data: e
											});
										}
										cloudplate.trigger('set_share_success', result, '', data._cp_event.set_share_success[0]);
									})
								}), 'callback_local_invoke_updateAppShareData');
							}
							break;
						case 'url_redirect':
							var flag = false;
							var timer = setInterval(function() {
								if (!flag) {
									flag = true;
									window.location.href = data.url;
									clearInterval(timer);
								}
							}, 200);
							break;
						case 'bindmobile':
							if (typeof(JSNativeBridge) === 'object' && typeof JSNativeBridge.invoke === 'function') {
								JSNativeBridge.invoke('openAppMobile', JSON.stringify({
									control: '0'
								}), 'callback_local_invoke_bindmobile');
							}
							break;
						case 'is_bindmobile':
							if (typeof(JSNativeBridge) === 'object' && typeof JSNativeBridge.invoke === 'function') {
								JSNativeBridge.invoke('getUserInfo', JSON.stringify({
									signParaList: ["id", "nick_name", "mobile"]
								}), 'callback_local_invoke_isBindmobile');
							} else {
								driverIncompatible(data, 'is_bindmobile', true);
								cloudplate.trigger('is_bindmobile', '');
							}
							break;
						case 'redpacket_open_success':
							driverIncompatible(data, 'shake');
							cloudplate.trigger('redpacket_open_success', {
								success: '1'
							});
							break;
						case 'show_modify_mobile':
							if (typeof(JSNativeBridge) === 'object' && typeof JSNativeBridge.invoke === 'function') {
								JSNativeBridge.invoke('openAppMobile', JSON.stringify({
									control: 1
								}), 'callback_local_invoke_openAppMobile')
							} else {
								driverIncompatible(data, 'show_modify_mobile', true);
								cloudplate.trigger('modify_mobile', '');
							}
							break;
						case 'modify_delivery_name':
							if (typeof(JSNativeBridge) === 'object' && typeof(JSNativeBridge.invoke) == 'function') {
								JSNativeBridge.invoke('modifyUserInfo', JSON.stringify({
									option: 'name'
								}), 'callback_local_invoke_modifyUserInfo_deliveryname');
							}
							break;
						case 'open_address':
							if (typeof(JSNativeBridge) === 'object' && typeof(JSNativeBridge.invoke) == 'function') {
								JSNativeBridge.invoke('modifyUserInfo', JSON.stringify({
									option: 'address'
								}), 'callback_local_invoke_modifyUserInfo_deliveryaddress');
							}
							break;
						case 'check_js_api':
							if (typeof(JSNativeBridge) === 'object' && typeof JSNativeBridge.invoke === 'function') {
								JSNativeBridge.invoke('check_js_api', JSON.stringify(data), 'callback_local_invoke_checkJSApi')
							}
							break;
						case 'preview':
							if (typeof(JSNativeBridge) === 'object' && typeof JSNativeBridge.invoke === 'function') {
								JSNativeBridge.invoke('previewImage', JSON.stringify(data), 'callback_local_invoke_previewImage')
							}
							break;
						default:
							driverIncompatible(data, event);
							cloudplate.trigger(event, '');
							break;
					}
				}
			},
			jxrb: {
				driver_params: {},
				preloadfiles: [],
				check: function(callback) {
					if (typeof jxrb != "undefined") {
						driverIsLoading = true;
						var key = Core.register('get_client_info', function(data) {
							callback({
								client_code: data.client_code,
								version: data.version,
								versionName: data.version,
								detail: data.detail,
								is_client: '1'
							});
						}, true);
						jxrb.zjrb_cp_get_client_info({
							_cp_event: {
								get_client_info: [key]
							}
						});
					}
				},
				load: function(client_info, callback) {
					callback(client_info);
				},
				init: function(options, client_info) {
					var driver_var = this;
					driver_var['_options'] = options;
					options.ready(client_info);
				},
				filterUrl: function(url) {
					return url.replace(/\?zjxw_control=1101\//g, '');
				},
				delegate: function(event, data, client_info) {
					data = data ? data : '';
					var _options = this._options;
					switch (event) {
						case 'show_login':
							if (typeof(jxrb) == 'object' && typeof(jxrb.zjrb_cp_show_login) == 'function') {
								jxrb.zjrb_cp_show_login(JSON.stringify(data));
							} else {
								driverIncompatible(data, 'show_login', true);
								cloudplate.trigger('reset', '');
							}
							break;
						case 'is_login':
							if (typeof(jxrb) == 'object' && typeof(jxrb.zjrb_cp_is_login) == 'function') {
								jxrb.zjrb_cp_is_login(JSON.stringify(data));
							} else {
								driverIncompatible(data, 'is_login', true);
								cloudplate.trigger('is_login', '');
							}
							break;
						case 'get_unique_id':
							if (typeof(jxrb) == 'object' && typeof(jxrb.zjrb_cp_get_unique_id) == 'function') {
								jxrb.zjrb_cp_get_unique_id(JSON.stringify(data));
							} else {
								driverIncompatible(data, 'get_unique_id', true);
								cloudplate.trigger('get_unique_id', '');
							}
							break;
						case 'get_account_id':
							if (typeof(jxrb) == 'object' && typeof(jxrb.zjrb_cp_get_account_id) == 'function') {
								jxrb.zjrb_cp_get_account_id(JSON.stringify(data));
							} else {
								driverIncompatible(data, 'get_account_id', true);
								cloudplate.trigger('get_account_id', '');
							}
							break;
						case 'get_client_info':
							if (typeof(jxrb) == 'object' && typeof(jxrb.zjrb_cp_get_client_info) == 'function') {
								jxrb.zjrb_cp_get_client_info(JSON.stringify(data));
							} else {
								driverIncompatible(data, 'get_client_info', true);
								cloudplate.trigger('get_client_info', '');
							}
							break;
						case 'get_device_info':
							if (typeof(jxrb) == 'object' && typeof(jxrb.zjrb_cp_get_device_info) == 'function') {
								jxrb.zjrb_cp_get_device_info(JSON.stringify(data));
							} else {
								driverIncompatible(data, 'get_device_info', true);
								cloudplate.trigger('get_device_info', '');
							}
							break;
						case 'reset':
							cloudplate.trigger('reset', '');
							break;
						case 'get_css_mode':
							if (typeof(jxrb) == 'object' && typeof(jxrb.zjrb_cp_get_css_mode) == 'function') {
								jxrb.zjrb_cp_get_css_mode(JSON.stringify(data));
							} else {
								driverIncompatible(data, 'get_css_mode', true);
								cloudplate.trigger('mode_change', '');
							}
							break;
						case 'show_share':
							!data.title ? data.title = '分享给你' : '';
							!data.shareTo ? data.shareTo = 'all' : '';
							!data.shareSummary ? data.shareSummary = '分享给你' : '';
							!data.id ? data.id = 0 : '';
							!data.type ? data.type = 'share' : '';
							!data.datatype ? data.datatype = 'link' : '';
							!data.dataUrl ? data.dataUrl = 0 : '';
							if (typeof(jxrb) == 'object' && typeof(jxrb.zjrb_cp_show_share) == 'function') {
								jxrb.zjrb_cp_show_share(JSON.stringify(data));
							} else {
								driverIncompatible(data, 'show_share', true);
								cloudplate.trigger('get_share_result', '');
							}
							break;
						case 'get_location_info':
							if (typeof(jxrb) == 'object' && typeof(jxrb.zjrb_cp_get_location_info) == 'function') {
								jxrb.zjrb_cp_get_location_info(JSON.stringify(data));
							} else {
								driverIncompatible(data, 'get_location_info', true);
								cloudplate.trigger('address_change', '');
							}
							break;
						case 'get_customer_info':
							if (typeof(jxrb) == 'object' && typeof(jxrb.zjrb_cp_get_customer_info) == 'function') {
								jxrb.zjrb_cp_get_customer_info(JSON.stringify(data));
							} else {
								driverIncompatible(data, 'get_customer_info', true);
								cloudplate.trigger('get_customer_info', '');
							}
							break;
						case 'get_download_info':
							if (!_cp_config.download_url[client_info.client_code]) {
								driverIncompatible(data, 'get_download_info', true);
								cloudplate.trigger('get_download_info', '');
								break;
							}
							cloudplate.trigger('get_download_info', {
								to_new_verison: function() {
									window.location.href = _cp_config.download_url[client_info.client_code];
								},
								alertinfo: '',
								downloadlink: _cp_config.download_url[client_info.client_code]
							});
							break;
						case 'get_ip':
							if (typeof(jxrb) == 'object' && typeof(jxrb.zjrb_cp_get_ip) == 'function') {
								jxrb.zjrb_cp_get_ip(JSON.stringify(data));
							} else {
								driverIncompatible(data, 'get_ip', true);
								cloudplate.trigger('get_ip', '');
							}
							break;
						case 'get_image':
							if (typeof(jxrb) == 'object' && typeof(jxrb.zjrb_cp_get_image) == 'function') {
								jxrb.zjrb_cp_get_image(JSON.stringify(data));
							} else {
								driverIncompatible(data, 'get_image', true);
								cloudplate.trigger('get_image', '');
							}
							break;
						case 'get_voice':
							driverIncompatible(data, 'get_voice');
							cloudplate.trigger('get_voice', '');
							break;
						case 'start_voice':
							if (typeof jxrb.zjrb_cp_start_voice == 'function') {
								jxrb.zjrb_cp_start_voice(JSON.stringify({
									'id': data.id
								}));
							} else {
								driverIncompatible(data, 'start_voice');
								cloudplate.trigger('start_voice', '');
							}
							break;
						case 'file_upload':
							if (typeof(jxrb) == 'object' && typeof(jxrb.zjrb_cp_fileUpload) == 'function') {
								jxrb.zjrb_cp_fileUpload(JSON.stringify(data));
							} else {
								driverIncompatible(data, 'file_upload', true);
								cloudplate.trigger('file_upload', '');
							}
							break;
						case 'stop_voice':
							if (typeof jxrb.zjrb_cp_stop_voice == 'function') {
								jxrb.zjrb_cp_stop_voice(JSON.stringify(data));
							} else {
								driverIncompatible(data, 'stop_voice');
								cloudplate.trigger('stop_voice', '');
							}
							break;
						case 'get_video':
							if (typeof(jxrb) == 'object' && typeof(jxrb.zjrb_cp_get_video) == 'function') {
								jxrb.zjrb_cp_get_video(JSON.stringify(data));
							} else {
								driverIncompatible(data, 'get_video', true);
								cloudplate.trigger('get_video', '');
							}
							break;
						case 'get_scan_qr':
							driverIncompatible(data, 'get_scan_qr');
							cloudplate.trigger('get_scan_qr', '');
							break;
						case 'search_beacons':
							driverIncompatible(data, 'search_beacons');
							cloudplate.trigger('search_beacons', '');
							break;
						case 'shake':
							driverIncompatible(data, 'shake');
							cloudplate.trigger('shake', '');
							break;
						case 'close':
							if (jxrb && typeof jxrb.zjrb_cp_close === 'function') {
								jxrb.zjrb_cp_close(JSON.stringify(data));
							} else if (window && typeof(window.close) == 'function') {
								window.close();
							}
							timeout(function() {
								driverIncompatible(data, 'close');
							}, 500);
							break;
						case 'set_data':
							if (data.storage !== 0 && data.storage !== '0' && data.storage !== 1 && data.storage !== '1') {
								Tools.setError({
									code: 105,
									msg: '参数传值不对',
									data: ''
								});
								cloudplate.trigger('set_data', '');
								break;
							}
							if (typeof data != 'string') {
								data = JSON.stringify(data);
							}
							if (typeof(jxrb) == 'object' && typeof(jxrb.zjrb_cp_setdata) == 'function') {
								jxrb.zjrb_cp_setdata(data);
							} else {
								driverIncompatible(data, 'set_data', true);
								cloudplate.trigger('set_data', '');
							}
							break;
						case 'get_data':
							if (data.storage !== 0 && data.storage !== '0' && data.storage !== 1 && data.storage !== '1') {
								Tools.setError({
									code: 105,
									msg: '参数传值不对',
									data: ''
								});
								cloudplate.trigger('get_data', '');
								break;
							}
							if (typeof data != 'string') {
								data = JSON.stringify(data);
							}
							if (typeof(jxrb) == 'object' && typeof(jxrb.zjrb_cp_getdata) == 'function') {
								jxrb.zjrb_cp_getdata(data);
							} else {
								driverIncompatible(data, 'get_data', true);
								cloudplate.trigger('get_data', '');
							}
							break;
						case 'set_share':
							if (!data || !(data && data.link)) {
								Tools.setError({
									code: 105,
									msg: 'set_share 参数不正确',
									data: data
								});
								cloudplate.trigger('set_share', {
									success: '0'
								});
								break;
							}
							if (typeof(jxrb) == 'object' && typeof(jxrb.zjrb_cp_setshareinfo) == 'function') {
								jxrb.zjrb_cp_setshareinfo(JSON.stringify(data));
							} else if (client_info && client_info.version) {
								window.jxrb_msg_title = !data.title ? '' : data.title;
								window.jxrb_msg_desc = !data.shareSummary ? '' : data.shareSummary;
								window.jxrb_msg_cdn_url = !data.imgUrl ? '' : data.imgUrl;
								window.jxrb_msg_link = data.link;
								window.msg_title = !data.title ? '' : data.title;
								window.msg_desc = !data.shareSummary ? '' : data.shareSummary;
								window.msg_cdn_url = !data.imgUrl ? '' : data.imgUrl;
								window.msg_link = data.link;
								cloudplate.trigger('set_share', {
									success: '1'
								});
							} else {
								driverIncompatible(data, 'set_share', true);
								cloudplate.trigger('set_share', {
									success: '0'
								});
							}
							break;
						case 'url_redirect':
							window.location.href = data.url;
							break;
						case 'bindmobile':
							if (typeof jxrb.zjrb_cp_bindmobile == 'function') {
								jxrb.zjrb_cp_bindmobile(JSON.stringify(data));
							} else {
								driverIncompatible(data, 'bindmobile');
								cloudplate.trigger('bindmobile', '');
							}
							break;
						case 'is_bindmobile':
							if (typeof jxrb.zjrb_cp_isbindmobile == 'function') {
								jxrb.zjrb_cp_isbindmobile(JSON.stringify(data));
							} else {
								driverIncompatible(data, 'is_bindmobile');
								cloudplate.trigger('is_bindmobile', '');
							}
							break;
						case 'show_modify_mobile':
							if (typeof jxrb.zjrb_cp_modify_mobile == 'function') {
								jxrb.zjrb_cp_modify_mobile(JSON.stringify(data));
							} else {
								driverIncompatible(data, 'modify_mobile');
								cloudplate.trigger('modify_mobile', {
									success: '0'
								});
							}
							break;
						case 'define_menu':
							if (typeof jxrb.zjrb_cp_define_menu == 'function') {
								jxrb.zjrb_cp_define_menu(JSON.stringify(data));
							} else {
								driverIncompatible(data, 'define_menu');
								cloudplate.trigger('define_menu', {
									success: '0'
								});
							}
							break;
						case 'select_media':
							if (typeof jxrb.zjrb_cp_select_media == 'function') {
								jxrb.zjrb_cp_select_media(JSON.stringify(data));
							} else {
								driverIncompatible(data, 'select_media');
								cloudplate.trigger('select_media', {
									success: '0'
								});
							}
							break;
						case 'subscribe_event':
							var params = data;
							if (!data.events && data.key) {
								params['events'] = [{
									key: data.key,
									once: data.once
								}];
							}
							if (typeof jxrb.zjrb_cp_subscribe_event == 'function') {
								jxrb.zjrb_cp_subscribe_event(JSON.stringify(params));
							} else {
								driverIncompatible(data, 'subscribe_event');
								cloudplate.trigger('subscribe_event', {
									success: '0'
								});
							}
							break;
						case 'preview':
							if (typeof jxrb.zjrb_cp_preview == 'function') {
								jxrb.zjrb_cp_preview(JSON.stringify(data));
							} else {
								driverIncompatible(data, 'preview');
								cloudplate.trigger('preview', {
									success: '0'
								});
							}
							break;
						case 'play_voice':
							data.action = 1;
							if (typeof jxrb.zjrb_cp_playOrPauseNews == 'function') {
								jxrb.zjrb_cp_playOrPauseNews(JSON.stringify(data));
							} else {
								driverIncompatible(data, 'play_voice');
								cloudplate.trigger('play_voice', {
									success: '0'
								});
							}
							break;
						case 'pause_play_voice':
							data.action = 2;
							if (typeof jxrb.zjrb_cp_playOrPauseNews == 'function') {
								jxrb.zjrb_cp_playOrPauseNews(JSON.stringify(data));
							} else {
								driverIncompatible(data, 'pause_play_voice');
								cloudplate.trigger('pause_play_voice', {
									success: '0'
								});
							}
							break;
						case 'stop_play_voice':
							data.action = 3;
							if (typeof jxrb.zjrb_cp_playOrPauseNews == 'function') {
								jxrb.zjrb_cp_playOrPauseNews(JSON.stringify(data));
							} else {
								driverIncompatible(data, 'stop_play_voice');
								cloudplate.trigger('stop_play_voice', {
									success: '0'
								});
							}
							break;
						default:
							driverIncompatible(data, event);
							cloudplate.trigger(event, '');
							break;
					}
				}
			},
			JinHua_JCY: {
				driver_params: {},
				preloadfiles: [_cp_config.common_file_path + 'common/jcy.js'],
				check: function(callback) {
					if (Tools.browser() == 'jcy') {
						driverIsLoading = true;
						if (typeof appJSBridge != "undefined") {
							var key = Core.register('get_client_info', function(data) {
								callback({
									client_code: "JinHua_JCY",
									version: data.version,
									versionName: data.version,
									detail: data.detail,
									is_client: '1'
								});
							}, true);
							appJSBridge.zjrb_cp_get_client_info(JSON.stringify({
								_cp_event: {
									get_client_info: [key]
								}
							}));
						} else if (typeof flutter_inappwebview == "undefined") {
							window.init = function() {
								var key = Core.register('get_client_info', function(data) {
									callback({
										client_code: 'JinHua_JCY',
										version: data.version,
										versionName: data.version,
										detail: data.detail,
										is_client: '1'
									});
								}, true);
								appJSBridge.zjrb_cp_get_client_info(JSON.stringify({
									_cp_event: {
										get_client_info: [key]
									}
								}));
							}
						} else if (typeof appJSBridge == "undefined") {
							callback({
								client_code: 'JinHua_JCY',
								version: '',
								versionName: '',
								detail: '',
								is_client: '1'
							});
						}
					}
				},
				load: function(client_info, callback) {
					Request._loadResource(this.preloadfiles, function() {
						callback(client_info);
					});
				},
				init: function(options, client_info) {
					var driver_var = this;
					driver_var['_options'] = options;
					options.ready(client_info);
				},
				filterUrl: function(url) {
					return url.replace(/\?zjxw_control=1101\//g, '');
				},
				delegate: function(event, data, client_info) {
					drivers['appJSBridge'].delegate(event, data, client_info);
				}
			},
			appJSBridge: {
				driver_params: {},
				preloadfiles: [],
				check: function(callback) {
					if (typeof appJSBridge != "undefined") {
						driverIsLoading = true;
						var key = Core.register('get_client_info', function(data) {
							callback({
								client_code: data.client_code,
								version: data.version,
								versionName: data.version,
								detail: data.detail,
								is_client: '1'
							});
						}, true);
						appJSBridge.zjrb_cp_get_client_info(JSON.stringify({
							_cp_event: {
								get_client_info: [key]
							}
						}));
					}
				},
				load: function(client_info, callback) {
					callback(client_info);
				},
				init: function(options, client_info) {
					var driver_var = this;
					driver_var['_options'] = options;
					options.ready(client_info);
				},
				filterUrl: function(url) {
					return url.replace(/\?zjxw_control=1101\//g, '');
				},
				delegate: function(event, data, client_info) {
					data = data ? data : '';
					var _options = this._options;
					switch (event) {
						case 'show_login':
							if (typeof(appJSBridge) == 'object' && typeof(appJSBridge.zjrb_cp_show_login) == 'function') {
								appJSBridge.zjrb_cp_show_login(JSON.stringify(data));
							} else {
								driverIncompatible(data, 'show_login', true);
								cloudplate.trigger('reset', '');
							}
							break;
						case 'is_login':
							if (typeof(appJSBridge) == 'object' && typeof(appJSBridge.zjrb_cp_is_login) == 'function') {
								appJSBridge.zjrb_cp_is_login(JSON.stringify(data));
							} else {
								driverIncompatible(data, 'is_login', true);
								cloudplate.trigger('is_login', '');
							}
							break;
						case 'get_unique_id':
							if (typeof(appJSBridge) == 'object' && typeof(appJSBridge.zjrb_cp_get_unique_id) == 'function') {
								appJSBridge.zjrb_cp_get_unique_id(JSON.stringify(data));
							} else {
								driverIncompatible(data, 'get_unique_id', true);
								cloudplate.trigger('get_unique_id', '');
							}
							break;
						case 'get_account_id':
							if (typeof(appJSBridge) == 'object' && typeof(appJSBridge.zjrb_cp_get_account_id) == 'function') {
								appJSBridge.zjrb_cp_get_account_id(JSON.stringify(data));
							} else {
								driverIncompatible(data, 'get_account_id', true);
								cloudplate.trigger('get_account_id', '');
							}
							break;
						case 'get_client_info':
							if (typeof(appJSBridge) == 'object' && typeof(appJSBridge.zjrb_cp_get_client_info) == 'function') {
								appJSBridge.zjrb_cp_get_client_info(JSON.stringify(data));
							} else {
								driverIncompatible(data, 'get_client_info', true);
								cloudplate.trigger('get_client_info', '');
							}
							break;
						case 'get_device_info':
							if (typeof(appJSBridge) == 'object' && typeof(appJSBridge.zjrb_cp_get_device_info) == 'function') {
								appJSBridge.zjrb_cp_get_device_info(JSON.stringify(data));
							} else {
								driverIncompatible(data, 'get_device_info', true);
								cloudplate.trigger('get_device_info', '');
							}
							break;
						case 'reset':
							cloudplate.trigger('reset', '');
							break;
						case 'get_css_mode':
							if (typeof(appJSBridge) == 'object' && typeof(appJSBridge.zjrb_cp_get_css_mode) == 'function') {
								appJSBridge.zjrb_cp_get_css_mode(JSON.stringify(data));
							} else {
								driverIncompatible(data, 'get_css_mode', true);
								cloudplate.trigger('mode_change', '');
							}
							break;
						case 'show_share':
							!data.title ? data.title = '分享给你' : '';
							!data.shareTo ? data.shareTo = 'all' : '';
							!data.shareSummary ? data.shareSummary = '分享给你' : '';
							!data.id ? data.id = 0 : '';
							!data.type ? data.type = 'share' : '';
							!data.datatype ? data.datatype = 'link' : '';
							!data.dataUrl ? data.dataUrl = 0 : '';
							if (typeof(appJSBridge) == 'object' && typeof(appJSBridge.zjrb_cp_show_share) == 'function') {
								appJSBridge.zjrb_cp_show_share(JSON.stringify(data));
							} else {
								driverIncompatible(data, 'show_share', true);
								cloudplate.trigger('get_share_result', '');
							}
							break;
						case 'get_location_info':
							if (typeof(appJSBridge) == 'object' && typeof(appJSBridge.zjrb_cp_get_location_info) == 'function') {
								appJSBridge.zjrb_cp_get_location_info(JSON.stringify(data));
							} else {
								driverIncompatible(data, 'get_location_info', true);
								cloudplate.trigger('address_change', '');
							}
							break;
						case 'get_customer_info':
							if (typeof(appJSBridge) == 'object' && typeof(appJSBridge.zjrb_cp_get_customer_info) == 'function') {
								appJSBridge.zjrb_cp_get_customer_info(JSON.stringify(data));
							} else {
								driverIncompatible(data, 'get_customer_info', true);
								cloudplate.trigger('get_customer_info', '');
							}
							break;
						case 'get_download_info':
							if (!_cp_config.download_url[client_info.client_code]) {
								driverIncompatible(data, 'get_download_info', true);
								cloudplate.trigger('get_download_info', '');
								break;
							}
							cloudplate.trigger('get_download_info', {
								to_new_verison: function() {
									window.location.href = _cp_config.download_url[client_info.client_code];
								},
								alertinfo: '',
								downloadlink: _cp_config.download_url[client_info.client_code]
							});
							break;
						case 'get_ip':
							if (typeof(appJSBridge) == 'object' && typeof(appJSBridge.zjrb_cp_get_ip) == 'function') {
								appJSBridge.zjrb_cp_get_ip(JSON.stringify(data));
							} else {
								driverIncompatible(data, 'get_ip', true);
								cloudplate.trigger('get_ip', '');
							}
							break;
						case 'get_image':
							if (typeof(appJSBridge) == 'object' && typeof(appJSBridge.zjrb_cp_get_image) == 'function') {
								appJSBridge.zjrb_cp_get_image(JSON.stringify(data));
							} else {
								driverIncompatible(data, 'get_image', true);
								cloudplate.trigger('get_image', '');
							}
							break;
						case 'get_voice':
							driverIncompatible(data, 'get_voice');
							cloudplate.trigger('get_voice', '');
							break;
						case 'start_voice':
							if (typeof appJSBridge.zjrb_cp_start_voice == 'function') {
								appJSBridge.zjrb_cp_start_voice(JSON.stringify({
									'id': data.id
								}));
							} else {
								driverIncompatible(data, 'start_voice');
								cloudplate.trigger('start_voice', '');
							}
							break;
						case 'file_upload':
							if (typeof(appJSBridge) == 'object' && typeof(appJSBridge.zjrb_cp_fileUpload) == 'function') {
								appJSBridge.zjrb_cp_fileUpload(JSON.stringify(data));
							} else {
								driverIncompatible(data, 'file_upload', true);
								cloudplate.trigger('file_upload', '');
							}
							break;
						case 'stop_voice':
							if (typeof appJSBridge.zjrb_cp_stop_voice == 'function') {
								appJSBridge.zjrb_cp_stop_voice(JSON.stringify(data));
							} else {
								driverIncompatible(data, 'stop_voice');
								cloudplate.trigger('stop_voice', '');
							}
							break;
						case 'get_video':
							if (typeof(appJSBridge) == 'object' && typeof(appJSBridge.zjrb_cp_get_video) == 'function') {
								appJSBridge.zjrb_cp_get_video(JSON.stringify(data));
							} else {
								driverIncompatible(data, 'get_video', true);
								cloudplate.trigger('get_video', '');
							}
							break;
						case 'get_scan_qr':
							driverIncompatible(data, 'get_scan_qr');
							cloudplate.trigger('get_scan_qr', '');
							break;
						case 'search_beacons':
							driverIncompatible(data, 'search_beacons');
							cloudplate.trigger('search_beacons', '');
							break;
						case 'shake':
							driverIncompatible(data, 'shake');
							cloudplate.trigger('shake', '');
							break;
						case 'close':
							if (appJSBridge && typeof appJSBridge.zjrb_cp_close === 'function') {
								appJSBridge.zjrb_cp_close(JSON.stringify(data));
							} else if (window && typeof(window.close) == 'function') {
								window.close();
							}
							timeout(function() {
								driverIncompatible(data, 'close');
							}, 1000);
							break;
						case 'set_data':
							if (data.storage !== 0 && data.storage !== '0' && data.storage !== 1 && data.storage !== '1') {
								Tools.setError({
									code: 105,
									msg: '参数传值不对',
									data: ''
								});
								cloudplate.trigger('set_data', '');
								break;
							}
							if (typeof data != 'string') {
								data = JSON.stringify(data);
							}
							if (typeof(appJSBridge) == 'object' && typeof(appJSBridge.zjrb_cp_setdata) == 'function') {
								appJSBridge.zjrb_cp_setdata(data);
							} else {
								driverIncompatible(data, 'set_data', true);
								cloudplate.trigger('set_data', '');
							}
							break;
						case 'get_data':
							if (data.storage !== 0 && data.storage !== '0' && data.storage !== 1 && data.storage !== '1') {
								Tools.setError({
									code: 105,
									msg: '参数传值不对',
									data: ''
								});
								cloudplate.trigger('get_data', '');
								break;
							}
							if (typeof data != 'string') {
								data = JSON.stringify(data);
							}
							if (typeof(appJSBridge) == 'object' && typeof(appJSBridge.zjrb_cp_getdata) == 'function') {
								appJSBridge.zjrb_cp_getdata(data);
							} else {
								driverIncompatible(data, 'get_data', true);
								cloudplate.trigger('get_data', '');
							}
							break;
						case 'set_share':
							if (!data || !(data && data.link)) {
								Tools.setError({
									code: 105,
									msg: 'set_share 参数不正确',
									data: data
								});
								cloudplate.trigger('set_share', {
									success: '0'
								});
								break;
							}
							if (typeof(appJSBridge) == 'object' && typeof(appJSBridge.zjrb_cp_setshareinfo) == 'function') {
								appJSBridge.zjrb_cp_setshareinfo(JSON.stringify(data));
							} else {
								driverIncompatible(data, 'set_share', true);
								cloudplate.trigger('set_share', {
									success: '0'
								});
							}
							break;
						case 'play_voice':
							break;
						case 'pause_play_voice':
							break;
						case 'stop_play_voice':
							break;
						case 'url_redirect':
							window.location.href = data.url;
							break;
						case 'bindmobile':
							if (typeof appJSBridge.zjrb_cp_bindmobile == 'function') {
								appJSBridge.zjrb_cp_bindmobile(JSON.stringify(data));
							} else {
								driverIncompatible(data, 'bindmobile');
								cloudplate.trigger('bindmobile', '');
							}
							break;
						case 'is_bindmobile':
							if (typeof appJSBridge.zjrb_cp_isbindmobile == 'function') {
								appJSBridge.zjrb_cp_isbindmobile(JSON.stringify(data));
							} else {
								driverIncompatible(data, 'is_bindmobile');
								cloudplate.trigger('is_bindmobile', '');
							}
							break;
						case 'show_modify_mobile':
							if (typeof appJSBridge.zjrb_cp_modify_mobile == 'function') {
								appJSBridge.zjrb_cp_modify_mobile(JSON.stringify(data));
							} else {
								driverIncompatible(data, 'modify_mobile');
								cloudplate.trigger('modify_mobile', {
									success: '0'
								});
							}
							break;
						case 'define_menu':
							if (typeof appJSBridge.zjrb_cp_define_menu == 'function') {
								appJSBridge.zjrb_cp_define_menu(JSON.stringify(data));
							} else {
								driverIncompatible(data, 'define_menu');
								cloudplate.trigger('define_menu', {
									success: '0'
								});
							}
							break;
						case 'select_media':
							if (typeof appJSBridge.zjrb_cp_select_media == 'function') {
								appJSBridge.zjrb_cp_select_media(JSON.stringify(data));
							} else {
								driverIncompatible(data, 'select_media');
								cloudplate.trigger('select_media', {
									success: '0'
								});
							}
							break;
						case 'subscribe_event':
							var params = data;
							if (!data.events && data.key) {
								params['events'] = [{
									key: data.key,
									once: data.once
								}];
							}
							if (typeof appJSBridge.zjrb_cp_subscribe_event == 'function') {
								appJSBridge.zjrb_cp_subscribe_event(JSON.stringify(params));
							} else {
								driverIncompatible(data, 'subscribe_event');
								cloudplate.trigger('subscribe_event', {
									success: '0'
								});
							}
							break;
						case 'preview':
							if (typeof appJSBridge.zjrb_cp_preview == 'function') {
								appJSBridge.zjrb_cp_preview(JSON.stringify(data));
							} else {
								driverIncompatible(data, 'preview');
								cloudplate.trigger('preview', {
									success: '0'
								});
							}
							break;
						case 'article_info':
							if (typeof appJSBridge.zjrb_cp_article_info == 'function') {
								appJSBridge.zjrb_cp_article_info(JSON.stringify(data));
							} else {
								driverIncompatible(data, 'article_info');
								cloudplate.trigger('article_info', {
									success: '0',
									url: ''
								});
							}
							break;
						default:
							driverIncompatible(data, event);
							cloudplate.trigger(event, '');
							break;
					}
				}
			},
			uapphybridjs: {
				driver_params: {},
				preloadfiles: ['https://csudt-1300708250.cos.ap-shanghai.myqcloud.com/APP_APK/JSBridge-1.0.1.js'],
				check: function(callback) {
					if (Tools.browser() == 'uapphybridjs') {
						driverIsLoading = true;
						callback({
							client_code: Tools.browser(false, true),
							version: '',
							versionName: '0',
							detail: '',
							is_client: '1'
						});
					};
				},
				load: function(driver_params, callback) {
					Request._loadResource(this.preloadfiles, function() {
						if (!uapp) {
							Tools.setError({
								code: 4,
								msg: 'js未完全加载，请刷新页面',
								data: ''
							});
						}
						callback(driver_params);
					});
				},
				init: function(options, client_info) {
					var driver_var = this;
					driver_var['_options'] = options;
					console && console.log('uapphybridjsAccessKey', _cp_config._custom_params.uapphybridjsAccessKey);
					uapp && uapp.auth.getPrivateKey({
						accessKey: _cp_config._custom_params.uapphybridjsAccessKey,
						success: function(result) {
							console && console.log('result', result);
							driver_var['_options'].uapphybridjsprivatekey = result.privatekey;
							uapp.runtime.getAppVersion({
								success: function(res) {
									options.ready({
										client_code: 'uapphybridjs',
										version: res.version,
										versionName: '0',
										detail: res,
										is_client: '1'
									});
								},
								error: function(error) {
									options.ready({
										client_code: 'uapphybridjs',
										version: "",
										versionName: '0',
										detail: "",
										is_client: '1'
									});
									Tools.setError({
										code: 105,
										msg: "",
										data: error
									});
								}
							});
						},
						error: function(error) {
							console && console.log('error-result', error);
							options.ready({
								client_code: 'uapphybridjs',
								version: "",
								versionName: '0',
								detail: "",
								is_client: '1'
							});
							Tools.setError({
								code: 104,
								msg: "爱常山初始化失败",
								data: error
							});
						}
					});
				},
				filterUrl: function(url) {
					return url;
				},
				delegate: function(event, data, client_info) {
					var driver_temp = this;
					var _options = this._options;
					data = data ? data : '';
					switch (event) {
						case 'show_login':
							var client = {
								unique_id: '',
								account_id: '',
								'is_login': '1'
							};
							uapp && uapp.auth.getUserInfo({
								privateKey: CP._driver['_options'].uapphybridjsprivatekey,
								success: function(res) {
									client = {
										unique_id: res.sessionId,
										account_id: res.accountId,
										'is_login': '1'
									};
									cloudplate.trigger('reset', client, '', data._cp_event.reset[0]);
								},
								error: function(error) {
									cloudplate.trigger('reset', client, '', data._cp_event.reset[0]);
									Tools.setError({
										code: 105,
										msg: '',
										data: error
									});
								}
							});
							break;
						case 'is_login':
							cloudplate.trigger('is_login', {
								'is_login': '1'
							});
							break;
						case 'get_unique_id':
							uapp && uapp.auth.getUserInfo({
								privateKey: CP._driver['_options'].uapphybridjsprivatekey,
								success: function(result) {
									cloudplate.trigger('get_unique_id', {
										unique_id: result.sessionId
									});
								},
								error: function(error) {
									cloudplate.trigger('get_unique_id', {
										unique_id: ''
									});
									Tools.setError({
										code: 105,
										msg: '',
										data: error
									});
								}
							});
							break;
						case 'get_account_id':
							uapp && uapp.auth.getUserInfo({
								privateKey: CP._driver['_options'].uapphybridjsprivatekey,
								success: function(res) {
									cloudplate.trigger('get_account_id', {
										account_id: res.accountId
									});
								},
								error: function(error) {
									cloudplate.trigger('get_account_id', {
										account_id: ""
									});
									Tools.setError({
										code: 105,
										msg: '',
										data: error
									});
								}
							});
							break;
						case 'get_client_info':
							uapp && uapp.runtime.getAppVersion({
								success: function(res) {
									cloudplate.trigger('get_client_info', {
										client_code: "uapphybridjs",
										version: res.version,
										versionName: '0',
										detail: '',
										is_client: '1'
									});
								},
								error: function(error) {
									cloudplate.trigger('get_client_info', {
										client_code: "uapphybridjs",
										version: "",
										versionName: '0',
										detail: '',
										is_client: '1'
									});
									Tools.setError({
										code: 105,
										msg: "",
										data: error
									});
								}
							});
							break;
						case 'get_device_info':
							var info = {
								device_no: "",
								system: "",
								system_version: "",
								device_type: "",
								timestamp: '',
								signature: '',
								app: '',
								version: '',
								networkType: '',
								statusBarHeight: ''
							}
							uapp && uapp.device.uuid({
								success: function(result) {
									info.device_no = result.deviceId;
									cloudplate.trigger('get_device_info', info);
								},
								error: function(error) {
									cloudplate.trigger('get_device_info', info);
									Tools.setError({
										code: 105,
										msg: '',
										data: error
									});
								}
							});
							break;
						case 'reset':
							break;
						case 'show_share':
							var result = {
								result: 'fail',
								shareTo: '',
								allow_alert: '1'
							};
							uapp && uapp.biz.share({
								title: data.title,
								text: data.shareSummary,
								url: data.link,
								imageUrl: data.imgUrl,
								platforms: ['WeChat', 'WeChatMoment', 'QQ', 'QQZone', 'WeiBo', 'WeiBoContact', 'Copy'],
								success: function(res) {
									if (res) result.result = 'success';
									cloudplate.trigger('show_share', result);
								},
								error: function(error) {
									cloudplate.trigger('show_share', result);
									Tools.setError({
										code: 105,
										msg: '',
										data: error
									});
								}
							});
							break;
						case 'get_location_info':
							var result = {};
							uapp && uapp.biz.getLocation({
								success: function(res) {
									result['lat'] = res.latitude;
									result['lon'] = res.longitude;
									result['radius'] = '';
									result['city'] = '';
									result['addr'] = res.address;
									result['speed'] = '';
									result['accuracy'] = '';
									cloudplate.trigger('address_change', result);
								},
								error: function(error) {
									cloudplate.trigger('address_change', result);
									Tools.setError({
										code: 105,
										msg: '',
										data: error
									});
								}
							});
							break;
						case 'get_customer_info':
							var result = {};
							uapp && uapp.auth.getUserInfo({
								privateKey: CP._driver['_options'].uapphybridjsprivatekey,
								success: function(res) {
									result = {
										account_id: res.accountId,
										session_id: res.sessionId,
										username: '',
										head_img: '',
										nick_name: '',
										score: '',
										mobile: '',
										ref_code: '',
										ref_user_uid: '',
										ref_user_code: '',
										invitation_number: '',
									};
									cloudplate.trigger('get_customer_info', result);
								},
								error: function(error) {
									cloudplate.trigger('get_customer_info', result);
									Tools.setError({
										code: 105,
										msg: '',
										data: error
									});
								}
							});
						case 'close':
							uapp && uapp.navigation.close({
								success: function(result) {
									cloudplate.trigger('close');
								},
								error: function(error) {
									Tools.setError({
										code: 105,
										msg: '',
										data: error
									});
								}
							});
							break;
						case 'set_data':
							if (data.storage !== 0 && data.storage !== '0' && data.storage !== 1 && data.storage !== '1') {
								Tools.setError({
									code: 105,
									msg: '参数传值不对',
									data: ''
								});
								cloudplate.trigger('set_data', '');
								break;
							}
							var result = '';
							uapp && uapp.cache.setStorage({
								key: data.key,
								data: data.value,
								success: function(res) {
									cloudplate.trigger('set_data', result);
								},
								error: function(error) {
									cloudplate.trigger('set_data', result);
									Tools.setError({
										code: 105,
										msg: '',
										data: error
									});
								}
							});
							break;
						case 'get_data':
							if (data.storage !== 0 && data.storage !== '0' && data.storage !== 1 && data.storage !== '1') {
								Tools.setError({
									code: 105,
									msg: '参数传值不对',
									data: ''
								});
								cloudplate.trigger('get_data', '');
								break;
							}
							var result = {
								success: false,
								data: ''
							};;
							uapp && uapp.cache.getStorage({
								key: data.key,
								success: function(res) {
									result.success = true;
									result.data = res;
									cloudplate.trigger('get_data', result);
								},
								error: function(error) {
									cloudplate.trigger('get_data', result);
									Tools.setError({
										code: 105,
										msg: '',
										data: error
									});
								}
							});
							break;
						case 'set_share':
							var result = {
								'result': 'error',
								'shareTo': data.shareTo,
								'allow_alert': '0',
							};
							uapp && uapp.biz.setShareParams({
								url: data.link,
								title: data.title,
								content: data.shareSummary,
								image: data.imgUrl,
								success: function(res) {
									result.result = 'success';
									cloudplate.trigger('set_share_success', result);
								},
								error: function(error) {
									cloudplate.trigger('set_share_success', result);
									Tools.setError({
										code: 105,
										msg: '',
										data: error
									});
								}
							});
							break;
						case 'open_in_app':
							if (!data.defaultClient) {
								cloudplate.trigger('open_in_app', {
									success: '0'
								});
							}
							Tools.callInApp(data, client_info.client_code);
							cloudplate.trigger('open_in_app', {
								success: '1'
							});
							break;
						default:
							driverIncompatible(data, event);
							cloudplate.trigger(event, '');
							break;
					}
				}
			},
			wx: {
				driver_params: {},
				preloadfiles: ['https://res.wx.qq.com/open/js/jweixin-1.6.0.js'],
				check: function(callback) {
					if (Tools.browser(true) == 'wx') {
						driverIsLoading = true;
						callback({
							client_code: 'wx',
							version: '0',
							versionName: '0',
							detail: '',
							is_client: '0'
						});
					};
				},
				load: function(driver_params, callback) {
					Request._loadResource(this.preloadfiles, function() {
						callback(driver_params);
					});
				},
				init: function(options, client_info) {
					if (!options.wxOption || !options.wxOption.appid) {
						Tools.writelog('模式：', '微信公众号未授权模式');
						options.ready(client_info);
						return;
					}
					var params = {
						'wx_appid': options.wxOption.appid,
						'method': options.wxOption.method,
						'url': encodeURIComponent(options.wxOption.redirect),
						'yun_callback': 'CP._jsonpCallback'
					};
					var driver_var = this;
					driver_var['_options'] = options.wxOption;
					if (options.wxOption.signUrl) {
						_cp_config.wx_api_url = options.wxOption.signUrl;
					}
					Core.register('sys_jsonp', function(data) {
						Request._is_jsonp_called = true;
						if (!data || typeof data !== 'object') {
							alert('获取微信签名失败（AUTH FAIL）');
							Tools.setError({
								code: 104,
								msg: '获取微信签名失败（AUTH FAIL）',
								data: data
							});
							return;
						}
						if (data && data.hasOwnProperty('code') && data.code != 0 || !wx || !wx.hasOwnProperty('config')) {
							Tools.setError({
								code: 104,
								msg: '微信初始化对象失败',
								data: data
							});
							return;
						}
						var data = data.msg;
						if (!options.wxOption || !data.appId || !data.signature || !data.nonceStr || !data.timestamp) {
							alert('微信配置不全');
							Tools.setError({
								code: 104,
								msg: '微信配置不全',
								data: data
							});
							return;
						}
						var wx_run = false;
						wx && wx.error(function(res) {
							if (res && res.errMsg == 'config:invalid url domain') {
								res.errCode = 1002;
							}
							Tools.setError(res);
						});
						wx && wx.ready(function() {
							wx_run = true;
							wx.checkJsApi && wx.checkJsApi({
								jsApiList: ['onMenuShareTimeline', 'onMenuShareAppMessage', 'onMenuShareQQ', 'onMenuShareQZone'],
								success: function(res) {
									_cp_config._custom_params['checkResult'] = res.checkResult;
									options.ready(client_info);
								}
							});
						});
						wx && wx.config({
							debug: options.wxOption.debug,
							appId: data.appId,
							timestamp: data.timestamp,
							nonceStr: data.nonceStr,
							signature: data.signature,
							jsApiList: options.wxOption.jsApiList
						});
						timeout(function() {
							if (!wx_run) {
								wx && wx.config({
									debug: options.wxOption.debug,
									appId: data.appId,
									timestamp: data.timestamp,
									nonceStr: data.nonceStr,
									signature: data.signature,
									jsApiList: options.wxOption.jsApiList
								});
							}
						}, 2000);
					}, true, 8000);
					Tools.ajax({
						url: _cp_config.wx_api_url,
						type: 'GET',
						data: params,
						dataType: 'jsonp',
						success: function(data) {},
						fail: function(data) {
							if (typeof(options.error) != 'function') {
								alert('微信获取签名失败，请检查重试');
							}
							var code = 1;
							if (data && data.hasOwnProperty('code')) {
								code = data.code;
							}
							Tools.setError({
								code: code,
								msg: '微信获取签名失败',
								data: data
							});
						}
					});
				},
				filterUrl: function(url) {
					return url;
				},
				delegate: function(event, data, client_info) {
					var driver_temp = this;
					var _options = this._options;
					data = data ? data : '';
					switch (event) {
						case 'show_login':
							driverIncompatible(data, 'show_login');
							cloudplate.trigger('show_login', '');
							break;
						case 'is_login':
							driverIncompatible(data, 'is_login');
							cloudplate.trigger('is_login', '');
							break;
						case 'get_unique_id':
							driverIncompatible(data, 'get_unique_id');
							cloudplate.trigger('get_unique_id', '');
							break;
						case 'get_account_id':
							driverIncompatible(data, 'get_account_id');
							cloudplate.trigger('get_account_id', '');
							break;
						case 'get_client_info':
							cloudplate.trigger('get_client_info', {
								client_code: 'wx',
								version: '1.0',
								versionName: '1.0',
								detail: ''
							});
							break;
						case 'get_device_info':
							driverIncompatible(data, 'get_device_info');
							cloudplate.trigger('get_device_info', '');
							break;
						case 'reset':
							cloudplate.trigger('reset', '');
							break;
						case 'get_css_mode':
							driverIncompatible(data, 'get_css_mode');
							cloudplate.trigger('get_css_mode', '');
							break;
						case 'show_share':
							driverIncompatible(data, 'show_share');
							cloudplate.trigger('show_share', '');
							break;
						case 'get_location_info':
							wx && wx.getLocation({
								type: 'wgs84',
								success: function(res) {
									var result = {};
									result['lat'] = res.latitude;
									result['lon'] = res.longitude;
									result['radius'] = '';
									result['city'] = '';
									result['addr'] = '';
									result['speed'] = res.speed;
									result['accuracy'] = res.accuracy;
									cloudplate.trigger('address_change', result);
								}
							});
							break;
						case 'get_customer_info':
							driverIncompatible(data, 'get_customer_info');
							cloudplate.trigger('get_customer_info', '');
							break;
						case 'get_download_info':
							cloudplate.trigger('get_download_info', {
								to_new_verison: function() {
									window.location.href = _cp_config.download_url.wx;
								}
							});
							break;
						case 'get_ip':
							driverIncompatible(data, 'get_ip');
							cloudplate.trigger('get_ip', '');
							break;
						case 'get_image':
							var count = data.count && data.count > 0 && data.count < 10 ? data.count : 1;
							wx && wx.chooseImage({
								count: count,
								sizeType: ['original', 'compressed'],
								sourceType: ['album', 'camera'],
								success: function(res) {
									Tools.writelog('get_image res', res);
									var result = {
										address: res.localIds,
										id: data.id,
										sizeType: 'original',
										sourceType: res.sourceType,
										count: count,
										dataType: 'addr',
										data: []
									};
									cloudplate.trigger('get_image', result);
								},
								fail: function(res) {
									Tools.writelog('chooseImage-fail', res);
									alert(JSON.stringify(res));
								}
							});
							break;
						case 'get_voice':
							driverIncompatible(data, 'get_voice');
							cloudplate.trigger('get_voice', '');
							break;
						case 'start_voice':
							wx && wx.onVoiceRecordEnd({
								complete: function(res) {
									Tools.writelog('onVoiceRecordEnd', res);
									var result = {
										id: data.id,
										address: res.localId
									};
									cloudplate.trigger('stop_voice', result);
								}
							});
							var result = {
								id: data.id,
								address: '',
								info: ''
							};
							Tools.writelog('startRecord ');
							wx && wx.startRecord({
								complete: function(res) {
									cloudplate.trigger('start_voice', result);
								},
								cancel: function(res) {
									result.info = res;
									cloudplate.trigger('stop_voice', res);
									Tools.writelog('wx startRecord cancel');
								}
							});
							break;
						case 'file_upload':
							var result = {
								requestcode: 200,
								'return': {},
								info: ''
							};
							var upload_urls = [];
							if (typeof(data.localfile) == 'object') {
								upload_urls = data.localfile;
							} else if (typeof(data.localfile) == 'string') {
								upload_urls = [data.localfile];
							}
							if (data.type) {
								if (data.type == 'voice') {
									wx && wx.uploadVoice({
										localId: upload_urls.toString(),
										isShowProgressTips: 1,
										success: function(res) {
											Tools.writelog('data type', res);
											res.wx_appid = driver_temp._options.appid;
											res.filename = data.filename;
											Tools.ajax({
												url: data.serviceurl,
												type: 'post',
												data: res,
												dataType: "json",
												success: function(data) {
													Tools.writelog('Tools data type', data);
													result.requestcode = 0;
													result.data = data;
													result.
													return = JSON.stringify(data);
													cloudplate.trigger('file_upload', result);
												},
												fail: function(error, code) {
													Tools.writelog('Tools data type error', data);
													result.requestcode = 400;
													result.data = error;
													Tools.setError({
														code: 1001,
														msg: '上传音频失败',
														data: {
															'code': code,
															'error': error
														}
													});
													cloudplate.trigger('file_upload', result);
												}
											});
										}
									});
								} else if (data.type == 'image') {
									wx && wx.uploadImage({
										localId: upload_urls.toString(),
										isShowProgressTips: 1,
										success: function(res) {
											res.wx_appid = driver_temp._options.appid;
											Tools.ajax({
												url: data.serviceurl,
												type: 'post',
												data: res,
												dataType: "json",
												success: function(data) {
													result.requestcode = 0;
													result.data = data;
													cloudplate.trigger('file_upload', result);
												},
												fail: function(data, code) {
													result.requestcode = 400;
													result.data = data;
													cloudplate.trigger('file_upload', result);
												}
											});
										},
										fail: function(res) {
											result.requestcode = 401, result.data = res, cloudplate.trigger('file_upload', result);
										}
									});
								} else {
									Tools.ajax({
										url: data.serviceurl,
										type: 'post',
										data: data,
										dataType: "json",
										success: function(data) {
											result.requestcode = 200, result.data = data, cloudplate.trigger('file_upload', result);
										},
										fail: function(error, code) {
											result.requestcode = 400;
											result.data = error;
											Tools.setError({
												code: 1001,
												msg: '上传数据失败',
												data: {
													'code': code,
													'error': error
												}
											});
											cloudplate.trigger('file_upload', result);
										}
									});
								}
							}
							break;
						case 'stop_voice':
							wx && wx.stopRecord({
								success: function(res) {
									var result = {
										id: data.id,
										address: res.localId
									};
									Core.trigger('stop_voice', result);
								},
								fail: function(res) {
									Tools.writelog('wx stopRecord fail', res);
								}
							});
							break;
						case 'get_video':
							driverIncompatible(data, 'get_video');
							cloudplate.trigger('get_video', '');
							break;
						case 'get_scan_qr':
							wx && wx.scanQRCode({
								desc: 'scanQRCode desc',
								needResult: 0,
								scanType: ["qrCode", "barCode"],
								success: function(res) {},
								error: function(res) {
									if (res.errMsg.indexOf('function_not_exist') > 0) {
										alert('版本过低请升级')
									}
								}
							});
							break;
						case 'search_beacons':
							driverIncompatible(data, 'search_beacons');
							cloudplate.trigger('search_beacons', '');
							break;
						case 'shake':
							driverIncompatible(data, 'shake');
							cloudplate.trigger('shake', '');
							break;
						case 'close':
							wx && wx.closeWindow();
							break;
						case 'set_data':
							if (data.storage !== 0 && data.storage !== '0' && data.storage !== 1 && data.storage !== '1') {
								Tools.setError({
									code: 105,
									msg: '参数传值不对',
									data: ''
								});
								cloudplate.trigger('set_data', '');
								break;
							}
							window.localStorage && window.localStorage.setItem(data.key, data.value);
							window.sessionStorage && window.sessionStorage.setItem(data.key, data.value);
							var result = '';
							if (window.localStorage || window.sessionStorage) {
								result = {
									success: true
								};
							} else {
								result = {
									success: false
								};
							}
							cloudplate.trigger('set_data', result);
							break;
						case 'get_data':
							if (data.storage !== 0 && data.storage !== '0' && data.storage !== 1 && data.storage !== '1') {
								Tools.setError({
									code: 105,
									msg: '参数传值不对',
									data: ''
								});
								cloudplate.trigger('get_data', '');
								break;
							}
							var result = '';
							window.localStorage ? result = window.localStorage.getItem(data.key) : '';
							window.sessionStorage && result === '' ? result = window.sessionStorage.getItem(data.key) : '';
							if (window.localStorage || window.sessionStorage) {
								result = {
									success: true,
									data: result
								};
							} else {
								result = {
									success: false,
									data: result
								};
							}
							cloudplate.trigger('get_data', result);
							break;
						case 'set_share':
							var checkResult = _cp_config._custom_params['checkResult'];
							data['shareTo'] = data.shareTo ? data.shareTo : 'all';

							function setShare(to, callback, success_callback) {
								success_callback = success_callback || function() {};
								if (to == 'Timeline') {
									wx && (!checkResult || checkResult.onMenuShareTimeline) && wx.onMenuShareTimeline({
										title: data.title,
										link: data.link,
										imgUrl: data.imgUrl,
										complete: function(res) {
											callback(res, 'Timeline');
										},
										success: function(res) {
											success_callback(res, 'Timeline');
										}
									});
									wx && checkResult && !checkResult.onMenuShareTimeline && wx.updateTimelineShareData({
										title: data.title,
										link: data.link,
										imgUrl: data.imgUrl,
										complete: function(res) {
											callback(res, 'Timeline');
										},
										success: function(res) {
											success_callback(res, 'Timeline');
										}
									});
								} else if (to == 'AppMessage') {
									wx && (!checkResult || checkResult.onMenuShareAppMessage) && wx.onMenuShareAppMessage && wx.onMenuShareAppMessage({
										title: data.title,
										desc: data.shareSummary,
										link: data.link,
										imgUrl: data.imgUrl,
										type: data.datatype,
										dataUrl: data.dataUrl,
										complete: function(res) {
											callback(res, 'AppMessage');
										},
										success: function(res) {
											success_callback(res, 'AppMessage');
										}
									});
								} else if (to == 'ShareQQ') {
									wx && checkResult && !checkResult.onMenuShareQQ && wx.updateAppMessageShareData && wx.updateAppMessageShareData({
										title: data.title,
										desc: data.shareSummary,
										link: data.link,
										imgUrl: data.imgUrl,
										complete: function(res) {
											callback(res, 'ShareQQ');
										},
										success: function(res) {
											success_callback(res, 'ShareQQ');
										}
									});
									wx && (!checkResult || checkResult.onMenuShareQQ) && wx.onMenuShareQQ && wx.onMenuShareQQ({
										title: data.title,
										desc: data.shareSummary,
										link: data.link,
										imgUrl: data.imgUrl,
										complete: function(res) {
											callback(res, 'ShareQQ');
										},
										success: function(res) {
											success_callback(res, 'ShareQQ');
										}
									});
								} else if (to == 'WeiBo') {
									wx && wx.onMenuShareWeibo({
										title: data.title,
										desc: data.shareSummary,
										link: data.link,
										imgUrl: data.imgUrl,
										complete: function(res) {
											callback(res, 'WeiBo');
										},
										success: function(res) {
											success_callback(res, 'WeiBo');
										}
									});
								} else if (to == 'QQZone') {
									wx && (!checkResult || checkResult.onMenuShareQZone) && wx.onMenuShareQZone({
										title: data.title,
										desc: data.shareSummary,
										link: data.link,
										imgUrl: data.imgUrl,
										complete: function(res) {
											callback(res, 'QQZone');
										},
										success: function(res) {
											success_callback(res, 'WeiBo');
										}
									});
								}
							}
							var result = {
								'result': 'success',
								'shareTo': data.shareTo,
								'allow_alert': '0',
							};
							var share_callback = function(res, channel) {
								if (res.errMsg && res.errMsg.indexOf(':ok') !== false) {
									result.result = 'success';
								} else {
									result.result = 'fail';
								}
								cloudplate.trigger('set_share', result);
							};
							var share_success_callback = function(res, channel) {
								if (res.errMsg && res.errMsg.indexOf(':ok') !== false) {
									result.result = 'success';
								} else {
									result.result = 'fail';
								}
								cloudplate.trigger('set_share_success', result);
							};
							if (data.shareTo === 'all') {
								setShare('Timeline', share_callback, share_success_callback);
								setShare('AppMessage', share_callback, share_success_callback);
								setShare('WeiBo', share_callback, share_success_callback);
								setShare('ShareQQ', share_callback, share_success_callback);
								setShare('QQZone', share_callback, share_success_callback);
							} else {
								setShare(data.shareTo, share_callback, share_success_callback);
							}
							break;
						case 'play_voice':
							var eleId = '';
							if (data['eleId']) {
								eleId = data['eleId'];
							}
							if (typeof(data.address) == 'string' && /^weixin:\/\/resourceid\/.+$/gi.test(data.address)) {
								wx && wx.playVoice({
									localId: data.address
								});
								return true;
							}
							if (!typeof(data.address) == 'string' || !/^(http|https):\/\/$/gi.test(data.address)) {
								return false;
							}
							if (!data['eleId']) {
								eleId = Tools.createAudioElement();
							}
							var audio = document.getElementById(eleId);
							audio.src = data['address'];
							audio.play();
							if (data['onPlayEnd'] != undefined) {
								var is_playFinish = setInterval(function() {
									if (audio.ended) {
										data['onPlayEnd']({
											'eleId': eleId
										});
										window.clearInterval(is_playFinish);
									}
								}, 10);
							}
							cloudplate.trigger('play_voice', {
								'eleId': eleId
							});
							return eleId;
							break;
						case 'pause_play_voice':
							wx && wx.pauseVoice({
								localId: data.address
							});
							cloudplate.trigger('pause_play_voice', {
								'eleId': ''
							});
							break
						case 'stop_play_voice':
							wx && wx.stopVoice({
								localId: data.address
							});
							cloudplate.trigger('stop_play_voice', {
								'eleId': ''
							});
							break;
						case 'url_redirect':
							window.location.href = data.url;
							break;
						case 'bindmobile':
							driverIncompatible(data, 'bindmobile');
							cloudplate.trigger('bindmobile', '');
							break;
						case 'is_bindmobile':
							driverIncompatible(data, 'is_bindmobile');
							cloudplate.trigger('is_bindmobile', '');
							break;
						case 'redpacket_open_success':
							driverIncompatible(data, 'redpacket_open_success');
							cloudplate.trigger('redpacket_open_success', {
								success: '1'
							});
							break;
						case 'show_modify_mobile':
							driverIncompatible(data, 'modify_mobile');
							cloudplate.trigger('modify_mobile', {
								success: '0'
							});
							break;
						case 'open_in_app':
							if (!data.defaultClient) {
								cloudplate.trigger('open_in_app', {
									success: '0'
								});
							}
							if (data.defaultClient && data.defaultClient.client_code) {
								Tools.callInApp(data, client_info.client_code);
							} else {
								driverIncompatible(data, 'open_in_app');
								cloudplate.trigger('open_in_app', {
									success: '0'
								});
							}
							break;
						case 'check_wx_js_api':
							var result = {
								success: '0',
								data: ''
							};
							wx && wx.checkJsApi({
								jsApiList: data.jsApiList,
								success: function(res) {
									result.success = '1';
									result.data = res;
									cloudplate.trigger('check_wx_js_api', result);
								},
								cancel: function(res) {
									result.success = '0';
									result.data = res;
									cloudplate.trigger('check_wx_js_api', result);
								},
								fail: function(res) {
									result.success = '0';
									cloudplate.trigger('check_wx_js_api', result);
								}
							});
							break;
						case 'preview':
							if (data.imageList && data.imageList.length > data.target) {
								wx && wx.previewImage({
									current: data.imageList[data.target],
									urls: data.imageList
								});
							}
							cloudplate.trigger('preview', {
								success: '1'
							});
							break;
						case 'download_image':
							wx && wx.downloadImage({
								serverId: data.serverId,
								isShowProgressTips: data.isShowProgressTips,
								success: function(res) {
									cloudplate.trigger('download_image', {
										success: '1',
										data: res
									});
								},
								cancel: function(res) {
									cloudplate.trigger('download_image', {
										success: '0',
										data: res
									});
								},
								fail: function(res) {
									cloudplate.trigger('download_image', {
										success: '0',
										data: res
									});
								}
							});
							break;
						case 'get_local_img_data':
							wx && wx.getLocalImgData({
								localId: data.localId,
								success: function(res) {
									cloudplate.trigger('get_local_img_data', {
										success: '1',
										data: res
									});
								},
								cancel: function(res) {
									cloudplate.trigger('get_local_img_data', {
										success: '0',
										data: res
									});
								},
								fail: function(res) {
									cloudplate.trigger('get_local_img_data', {
										success: '0',
										data: res
									});
								}
							});
							break;
						case 'download_voice':
							wx && wx.downloadVoice({
								serverId: data.serverId,
								isShowProgressTips: data.isShowProgressTips,
								success: function(res) {
									var localId = res.localId;
									cloudplate.trigger('download_voice', {
										success: '1',
										data: res
									});
								},
								cancel: function(res) {
									cloudplate.trigger('download_voice', {
										success: '0',
										data: res
									});
								},
								fail: function(res) {
									cloudplate.trigger('download_voice', {
										success: '0',
										data: res
									});
								}
							});
							break;
						case 'translate_voice':
							wx && wx.translateVoice({
								localId: data.localId,
								isShowProgressTips: data.isShowProgressTips,
								success: function(res) {
									cloudplate.trigger('translate_voice', {
										success: '1',
										data: res
									});
								},
								cancel: function(res) {
									cloudplate.trigger('translate_voice', {
										success: '0',
										data: res
									});
								},
								fail: function(res) {
									cloudplate.trigger('translate_voice', {
										success: '0',
										data: res
									});
								}
							});
							break;
						case 'get_network_type':
							wx && wx.getNetworkType({
								success: function(res) {
									var networkType = res.networkType;
									cloudplate.trigger('get_network_type', {
										success: '1',
										data: res
									});
								},
								cancel: function(res) {
									cloudplate.trigger('get_network_type', {
										success: '0',
										data: res
									});
								},
								fail: function(res) {
									cloudplate.trigger('get_network_type', {
										success: '0',
										data: res
									});
								}
							});
							break;
						case 'open_location':
							wx && wx.openLocation({
								latitude: data.latitude,
								longitude: data.longitude,
								name: data.name,
								address: data.address,
								scale: data.scale,
								infoUrl: data.infoUrl
							});
							cloudplate.trigger('open_location', {
								success: '1'
							});
							break;
						case 'start_search_beacons':
							wx && wx.startSearchBeacons({
								ticket: data.ticket,
								complete: function(argv) {
									cloudplate.trigger('start_search_beacons', {
										success: '1',
										data: argv
									});
								}
							});
							break;
						case 'stop_search_beacons':
							wx && wx.stopSearchBeacons({
								complete: function(res) {
									cloudplate.trigger('stop_search_beacons', {
										success: '1',
										data: res
									});
								}
							});
							break;
						case 'on_search_beacons':
							wx && wx.onSearchBeacons({
								complete: function(argv) {
									cloudplate.trigger('on_search_beacons', {
										success: '1',
										data: argv
									});
								}
							});
							break;
						case 'hide_menu_items':
							wx && wx.hideMenuItems({
								menuList: data.menuList
							});
							cloudplate.trigger('hide_menu_items', {
								success: '1'
							});
							break;
						case 'show_menu_items':
							wx && wx.showMenuItems({
								menuList: data.menuList
							});
							cloudplate.trigger('show_menu_items', {
								success: '1'
							});
							break;
						case 'hide_all_non_base_menu_item':
							wx && wx.hideAllNonBaseMenuItem();
							cloudplate.trigger('hide_all_non_base_menu_item', {
								success: '1'
							});
							break;
						case 'show_all_non_base_menu_item':
							wx && wx.showAllNonBaseMenuItem();
							cloudplate.trigger('show_all_non_base_menu_item', {
								success: '1'
							});
							break;
						case 'open_product_specific_view':
							wx && wx.openProductSpecificView({
								productId: data.productId,
								viewType: data.viewType
							});
							cloudplate.trigger('open_product_specific_view', {
								success: '1'
							});
							break;
						case 'choose_card':
							wx && wx.chooseCard({
								shopId: data.shopId,
								cardType: data.cardType,
								cardId: data.cardId,
								timestamp: data.timestamp,
								nonceStr: data.nonceStr,
								signType: data.signType,
								cardSign: data.cardSign,
								success: function(res) {
									var cardList = res.cardList;
									cloudplate.trigger('choose_card', {
										success: '1',
										data: res
									});
								},
								cancel: function(res) {
									cloudplate.trigger('choose_card', {
										success: '0',
										data: res
									});
								},
								fail: function(res) {
									cloudplate.trigger('choose_card', {
										success: '0',
										data: res
									});
								}
							});
							break;
						case 'add_card':
							wx && wx.addCard({
								cardList: data.cardList,
								success: function(res) {
									var cardList = res.cardList;
									cloudplate.trigger('add_card', {
										success: '1',
										data: res
									});
								},
								cancel: function(res) {
									cloudplate.trigger('add_card', {
										success: '0',
										data: res
									});
								},
								fail: function(res) {
									cloudplate.trigger('add_card', {
										success: '0',
										data: res
									});
								}
							});
							break;
						case 'open_card':
							wx && wx.openCard({
								cardList: data.cardList,
							});
							cloudplate.trigger('open_card', {
								success: '1'
							});
							break;
						case 'choose_wx_pay':
							wx && wx.chooseWXPay({
								timestamp: data.timestamp,
								nonceStr: data.nonceStr,
								package: data.package,
								signType: data.signType,
								paySign: data.paySign,
								success: function(res) {
									cloudplate.trigger('choose_wx_pay', {
										success: '1',
										data: res
									});
								},
								cancel: function(res) {
									cloudplate.trigger('choose_wx_pay', {
										success: '0',
										data: res
									});
								},
								fail: function(res) {
									cloudplate.trigger('choose_wx_pay', {
										success: '0',
										data: res
									});
								}
							});
							break;
						case 'open_address':
							wx && wx.openAddress({
								success: function(res) {
									cloudplate.trigger('open_address', {
										success: '1',
										data: res
									});
								},
								cancel: function(res) {
									cloudplate.trigger('open_address', {
										success: '0',
										data: res
									});
								},
								fail: function(res) {
									cloudplate.trigger('open_address', {
										success: '0',
										data: res
									});
								}
							});
							break;
						case 'article_info':
							driverIncompatible(data, 'article_info');
							cloudplate.trigger('article_info', {
								success: '0',
								url: ''
							});
							break;
						default:
							driverIncompatible(data, event);
							cloudplate.trigger(event, '');
							break;
					}
				}
			},
			qq: {
				driver_params: {},
				preloadfiles: [_cp_config.common_file_path + 'lib/qqapi.js'],
				check: function(callback) {
					if (Tools.browser() == 'qq') {
						driverIsLoading = true;
						callback({
							client_code: 'qq',
							version: '',
							versionName: '',
							detail: '',
							is_client: '0'
						});
					}
				},
				load: function(client_info, callback) {
					Request._loadResource(this.preloadfiles, function() {
						callback(client_info);
					});
				},
				init: function(options, client_info) {
					var driver_var = this;
					driver_var['_options'] = options;
					options.ready(client_info);
				},
				filterUrl: function(url) {
					return url;
				},
				delegate: function(event, data, client_info) {
					var _options = this._options;
					data = data ? data : '';
					switch (event) {
						case 'get_client_info':
							cloudplate.trigger('get_client_info', {
								client_code: 'qq',
								version: 'X',
								versionName: 'X',
								detail: ''
							});
							break;
						case 'close':
							if (window && typeof(window.close) == 'function') {
								window.close();
							} else {
								driverIncompatible(data, 'close');
							}
							break;
						case 'set_data':
							if (data.storage !== 0 && data.storage !== '0' && data.storage !== 1 && data.storage !== '1') {
								Tools.setError({
									code: 105,
									msg: '参数传值不对',
									data: ''
								});
								cloudplate.trigger('set_data', '');
								break;
							}
							window.localStorage && window.localStorage.setItem(data.key, data.value);
							window.sessionStorage && window.sessionStorage.setItem(data.key, data.value);
							var result = '';
							if (window.localStorage || window.sessionStorage) {
								result = {
									success: true
								};
							} else {
								result = {
									success: false
								};
							}
							cloudplate.trigger('set_data', result);
							break;
						case 'get_data':
							if (data.storage !== 0 && data.storage !== '0' && data.storage !== 1 && data.storage !== '1') {
								Tools.setError({
									code: 105,
									msg: '参数传值不对',
									data: ''
								});
								cloudplate.trigger('get_data', '');
								break;
							}
							var result = '';
							window.localStorage ? result = window.localStorage.getItem(data.key) : '';
							window.sessionStorage && result === '' ? result = window.sessionStorage.getItem(data.key) : '';
							if (window.localStorage || window.sessionStorage) {
								result = {
									success: true,
									data: result
								};
							} else {
								result = {
									success: false,
									data: result
								};
							}
							cloudplate.trigger('get_data', result);
							break;
						case 'set_share':
							!data.title ? data.title = '分享给你' : '';
							!data.shareSummary ? data.shareSummary = '分享给你' : '';
							!data.imgUrl ? data.imgUrl = '' : '';
							if (window.mqq) {
								window.mqq.invoke("data", "setShareInfo", {
									share_url: data.link,
									title: data.title,
									desc: data.shareSummary,
									image_url: data.imgUrl,
									imageUrl: data.imgUrl
								});
								cloudplate.trigger('set_share', {
									success: true
								});
							} else {
								cloudplate.trigger('set_share', {
									success: false
								});
							}
							break;
						case 'url_redirect':
							window.location.href = data.url;
							break;
						case 'open_in_app':
							if (!data.defaultClient) {
								cloudplate.trigger('open_in_app', {
									success: '0'
								});
							}
							if (data.defaultClient && data.defaultClient.client_code) {
								Tools.callInApp(data, client_info.client_code);
							} else {
								driverIncompatible(data, 'open_in_app');
								cloudplate.trigger('open_in_app', {
									success: '0'
								});
							}
							break;
						case 'article_info':
							driverIncompatible(data, 'article_info');
							cloudplate.trigger('article_info', {
								success: '0',
								url: ''
							});
							break;
						default:
							driverIncompatible(data, event);
							cloudplate.trigger(event, '');
							break;
					}
				}
			},
			dd: {
				driver_params: {},
				preloadfiles: [_cp_config.dd_api_url],
				check: function(callback) {
					if (Tools.browser() == 'dd') {
						driverIsLoading = true;
						var v = navigator.userAgent.toLowerCase();
						var dversion = v.match(/aliapp\(\w+\/([a-zA-Z0-9.-]+)\)/);
						null === dversion && (dversion = v.match(/dingtalk\/([a-zA-Z0-9.-]+)/));
						callback({
							client_code: 'dd',
							version: dversion && dversion[1],
							versionName: dversion && dversion[1],
							detail: '',
							is_client: '0'
						});
					}
				},
				load: function(client_info, callback) {
					Request._loadResource(this.preloadfiles, function() {
						callback(client_info);
					});
				},
				init: function(options, client_info) {
					var driver_var = this;
					driver_var['_options'] = options;
					driver_var.driver_params['set_share'] = function() {};
					dd && dd.ready(function() {
						options.ready(client_info);
					});
				},
				filterUrl: function(url) {
					return url;
				},
				delegate: function(event, data, client_info) {
					var _options = this._options;
					data = data ? data : '';
					switch (event) {
						case 'get_client_info':
							cloudplate.trigger('get_client_info', client_info);
							break;
						case 'close':
							if (window && typeof(window.close) == 'function') {
								window.close();
							} else {
								driverIncompatible(data, 'close');
							}
							break;
						case 'set_data':
							if (data.storage !== 0 && data.storage !== '0' && data.storage !== 1 && data.storage !== '1') {
								Tools.setError({
									code: 105,
									msg: '参数传值不对',
									data: ''
								});
								cloudplate.trigger('set_data', '');
								break;
							}
							window.localStorage && window.localStorage.setItem(data.key, data.value);
							window.sessionStorage && window.sessionStorage.setItem(data.key, data.value);
							var result = '';
							if (window.localStorage || window.sessionStorage) {
								result = {
									success: true
								};
							} else {
								result = {
									success: false
								};
							}
							cloudplate.trigger('set_data', result);
							break;
						case 'get_data':
							if (data.storage !== 0 && data.storage !== '0' && data.storage !== 1 && data.storage !== '1') {
								Tools.setError({
									code: 105,
									msg: '参数传值不对',
									data: ''
								});
								cloudplate.trigger('get_data', '');
								break;
							}
							var result = '';
							window.localStorage ? result = window.localStorage.getItem(data.key) : '';
							window.sessionStorage && result === '' ? result = window.sessionStorage.getItem(data.key) : '';
							if (window.localStorage || window.sessionStorage) {
								result = {
									success: true,
									data: result
								};
							} else {
								result = {
									success: false,
									data: result
								};
							}
							cloudplate.trigger('get_data', result);
							break;
						case 'set_share':
							!data.title ? data.title = '分享给你' : '';
							!data.shareSummary ? data.shareSummary = '分享给你' : '';
							!data.imgUrl ? data.imgUrl = '' : '';
							dd && dd.biz.navigation.setRight({
								show: true,
								control: true,
								text: '',
								onSuccess: function(result) {
									dd.biz.util.share({
										type: 0,
										url: data.link,
										content: data.shareSummary,
										title: data.title,
										image: data.imgUrl,
										onSuccess: function() {
											cloudplate.trigger('set_share', {
												success: true
											});
										},
										onFail: function(err) {
											cloudplate.trigger('set_share', {
												success: false
											});
										}
									});
								},
								onFail: function(err) {
									cloudplate.trigger('set_share', {
										success: false
									});
								}
							});
							break;
						case 'show_share':
							!data.title ? data.title = '分享给你' : '';
							!data.shareTo ? data.shareTo = 'all' : '';
							!data.shareSummary ? data.shareSummary = '分享给你' : '';
							!data.id ? data.id = 0 : '';
							!data.type ? data.type = 'share' : '';
							!data.datatype ? data.datatype = 'link' : '';
							!data.dataUrl ? data.dataUrl = 0 : '';
							dd && dd.biz.util.share({
								type: 0,
								url: data.link,
								content: data.shareSummary,
								title: data.title,
								image: data.imgUrl,
								onSuccess: function() {
									cloudplate.trigger('get_share_result', {
										success: true
									});
								},
								onFail: function(err) {
									cloudplate.trigger('get_share_result', {
										success: false
									});
								}
							});
							break;
						case 'url_redirect':
							window.location.href = data.url;
							break;
						case 'open_in_app':
							if (!data.defaultClient) {
								cloudplate.trigger('open_in_app', {
									success: '0'
								});
							}
							if (data.defaultClient && data.defaultClient.client_code) {
								Tools.callInApp(data, client_info.client_code);
							} else {
								driverIncompatible(data, 'open_in_app');
								cloudplate.trigger('open_in_app', {
									success: '0'
								});
							}
							break;
						default:
							driverIncompatible(data, event);
							cloudplate.trigger(event, '');
							break;
					}
				}
			},
			smartcity: {
				driver_params: {},
				preloadfiles: [_cp_config.common_file_path + 'common/smartcitysdk.js'],
				check: function(callback) {
					if (Tools.browser() == 'smartcity') {
						driverIsLoading = true;
						callback({
							client_code: Tools.browser(false, true),
							version: '',
							versionName: '0',
							detail: '',
							is_client: '1'
						});
					};
				},
				load: function(driver_params, callback) {
					Request._loadResource(this.preloadfiles, function() {
						if (!SmartCity) {
							Tools.setError({
								code: 4,
								msg: 'js未完全加载，请刷新页面',
								data: ''
							});
						}
						callback(driver_params);
					});
				},
				init: function(options, client_info) {
					var driver_var = this;
					driver_var['_options'] = options;
					options.ready({
						client_code: 'smartCity',
						version: '',
						versionName: '0',
						detail: '',
						is_client: '1'
					});
				},
				filterUrl: function(url) {
					return url;
				},
				delegate: function(event, data, client_info) {
					var driver_temp = this;
					var _options = this._options;
					data = data ? data : '';
					switch (event) {
						case 'show_login':
							SmartCity.goLogin();
							cloudplate.trigger('show_login', '');
							break;
						case 'is_login':
							SmartCity.getUserInfo(function(res) {
								if (res && res.userInfo) {
									cloudplate.trigger('is_login', {
										'is_login': '1'
									});
								} else {
									cloudplate.trigger('is_login', {
										'is_login': '0'
									});
								}
							});
							break;
						case 'get_unique_id':
							SmartCity.getUserInfo(function(res) {
								if (res && res.userInfo) {
									cloudplate.trigger('get_unique_id', {
										unique_id: res.userInfo.userTokenKey
									});
								} else {
									cloudplate.trigger('get_unique_id', '');
								}
							});
							break;
						case 'get_account_id':
							SmartCity.getUserInfo(function(res) {
								if (res && res.userInfo) {
									cloudplate.trigger('get_account_id', {
										account_id: res.userInfo.userid
									});
								} else {
									cloudplate.trigger('get_account_id', '');
								}
							});
							break;
						case 'get_client_info':
							SmartCity.getSystemInfo(function(res) {
								cloudplate.trigger('get_client_info', {
									client_code: res.deviceInfo.appid,
									version: res.deviceInfo.program_version,
									versionName: '0',
									detail: '',
									is_client: '1'
								});
							});
							break;
						case 'get_device_info':
							SmartCity.getSystemInfo(function(res) {
								cloudplate.trigger('get_device_info', {
									device_no: res.deviceInfo.device_token,
									system: res.deviceInfo.system,
									system_version: res.deviceInfo.system,
									device_type: res.deviceInfo.types,
									timestamp: '',
									signature: '',
									app: '',
									version: '',
									networkType: '',
									statusBarHeight: ''
								});
							});
							break;
						case 'reset':
							break;
						case 'show_share':
							SmartCity.onShareSuccess(function(res) {
								var result = {
									result: 'fail',
									shareTo: '',
									allow_alert: '1'
								};
								if (res) result.result = 'success';
								cloudplate.trigger('show_share', result);
							});
							SmartCity.shareTo({
								showShareButton: 1,
								updateShareData: 1,
								title: data.title,
								brief: data.shareSummary,
								contentURL: data.link,
								imageLink: data.imgUrl
							});
							break;
						case 'get_location_info':
							SmartCity.getLocation(function(res) {
								var result = {};
								result['lat'] = res.latitude;
								result['lon'] = res.longitude;
								result['radius'] = '';
								result['city'] = res.city;
								result['addr'] = res.address;
								result['speed'] = '';
								result['accuracy'] = '';
								cloudplate.trigger('address_change', result);
							});
							break;
						case 'get_customer_info':
							SmartCity.getUserInfo(function(res) {
								console.log(res);
								var result = {};
								if (res && res.userInfo) {
									result = {
										account_id: res.userInfo.userid,
										session_id: res.userInfo.userTokenKey,
										username: res.userInfo.real_name,
										head_img: res.userInfo.picurl,
										nick_name: res.userInfo.username,
										score: '',
										mobile: res.userInfo.telephone,
										ref_code: '',
										ref_user_uid: '',
										ref_user_code: '',
										invitation_number: '',
									};
									result.user = res.userInfo;
								}
								cloudplate.trigger('get_customer_info', result);
							});
							break;
						case 'get_image':
							var count = data.count && data.count > 0 && data.count < 10 ? data.count : 1;
							SmartCity.chooseImage({
								count: count
							}, function(res) {
								Tools.writelog('get_image res', res);
								var addr = [];
								var base64 = [];
								if (res && res.length) {
									for (var index in res) {
										addr.push(res[index].filePath);
										base64.push(res[index].imageData);
									}
								}
								var result = {
									address: addr,
									id: data.id,
									sizeType: 'original',
									sourceType: '',
									count: count,
									dataType: 'addr',
									data: base64
								};
								cloudplate.trigger('get_image', result);
							});
							break;
						case 'start_voice':
							Tools.writelog('startRecord ');
							if (!data.maxtime) data.maxtime = 60;
							SmartCity.startRecord(function(res) {
								timeout(function() {
									SmartCity.stopRecord(function(res2) {
										var result = {
											id: data.id,
											address: res2.localPath,
											info: res2.audioData
										};
										cloudplate.trigger('stop_voice', result);
									});
								}, data.maxtime);
								cloudplate.trigger('start_voice', '');
							});
							break;
						case 'file_upload':
							var result = {
								requestcode: 200,
								'return': {},
								info: ''
							};
							SmartCity.uploadFile({
								url: data.serviceurl,
								data: {
									file: data.localfile
								}
							}, function(res) {
								result.requestcode = 0;
								result.
								return = res;
								cloudplate.trigger('file_upload', result);
							});
							break;
						case 'stop_voice':
							SmartCity.stopRecord(function(res2) {
								var result = {
									id: data.id,
									address: res2.localPath,
									info: res2.audioData
								};
								cloudplate.trigger('stop_voice', result);
							});
							break;
						case 'get_scan_qr':
							SmartCity.scanQRCode(function(res) {
								var result = {
									scanType: '',
									needResult: '',
									data: res.resultStr
								};
								cloudplate.trigger('search_beacons', result);
							});
							break;
						case 'close':
							SmartCity.goAbort();
							break;
						case 'set_data':
							if (data.storage !== 0 && data.storage !== '0' && data.storage !== 1 && data.storage !== '1') {
								Tools.setError({
									code: 105,
									msg: '参数传值不对',
									data: ''
								});
								cloudplate.trigger('set_data', '');
								break;
							}
							window.localStorage && window.localStorage.setItem(data.key, data.value);
							window.sessionStorage && window.sessionStorage.setItem(data.key, data.value);
							var result = '';
							if (window.localStorage || window.sessionStorage) {
								result = {
									success: true
								};
							} else {
								result = {
									success: false
								};
							}
							cloudplate.trigger('set_data', result);
							break;
						case 'get_data':
							if (data.storage !== 0 && data.storage !== '0' && data.storage !== 1 && data.storage !== '1') {
								Tools.setError({
									code: 105,
									msg: '参数传值不对',
									data: ''
								});
								cloudplate.trigger('get_data', '');
								break;
							}
							var result = '';
							window.localStorage ? result = window.localStorage.getItem(data.key) : '';
							window.sessionStorage && result === '' ? result = window.sessionStorage.getItem(data.key) : '';
							if (window.localStorage || window.sessionStorage) {
								result = {
									success: true,
									data: result
								};
							} else {
								result = {
									success: false,
									data: result
								};
							}
							cloudplate.trigger('get_data', result);
							break;
						case 'set_share':
							SmartCity.shareTo({
								showShareButton: 1,
								updateShareData: 1,
								title: data.title,
								brief: data.shareSummary,
								contentURL: data.link,
								imageLink: data.imgUrl
							});
							var result = {
								'result': 'success',
								'shareTo': data.shareTo,
								'allow_alert': '0',
							};
							cloudplate.trigger('set_share_success', result);
							break;
						case 'open_in_app':
							if (!data.defaultClient) {
								cloudplate.trigger('open_in_app', {
									success: '0'
								});
							}
							SmartCity.linkToSubApp({
								innerLink: data.defaultClient.client_code
							});
							cloudplate.trigger('open_in_app', {
								success: '1'
							});
							break;
						case 'preview':
							SmartCity.previewImage({
								urls: data.imageList,
								index: data.imageList[data.target]
							});
							cloudplate.trigger('preview', {
								success: '1'
							});
							break;
						default:
							driverIncompatible(data, event);
							cloudplate.trigger(event, '');
							break;
					}
				}
			},
			phone_web: {
				driver_params: {},
				preloadfiles: ['https://static.mlinks.cc/scripts/dist/mlink.min.js'],
				check: function(callback) {
					if (Tools.browser() == 'phone') {
						driverIsLoading = true;
						callback({
							client_code: 'phone_web',
							version: '1.0',
							versionName: '1.0',
							detail: '',
							is_client: '0'
						});
					}
				},
				load: function(client_info, callback) {
					callback(client_info);
				},
				init: function(options, client_info) {
					var driver_var = this;
					driver_var['_options'] = options;
					options.ready(client_info);
				},
				filterUrl: function(url) {
					return url;
				},
				delegate: function(event, data, client_info) {
					data = data ? data : '';
					var _options = this._options;
					switch (event) {
						case 'show_login':
							driverIncompatible(data, 'show_login');
							cloudplate.trigger('show_login', '');
							break;
						case 'is_login':
							driverIncompatible(data, 'is_login');
							cloudplate.trigger('is_login', {
								is_login: ''
							});
							break;
						case 'get_unique_id':
							driverIncompatible(data, 'get_unique_id');
							cloudplate.trigger('get_unique_id', {
								unique_id: ''
							});
							break;
						case 'get_account_id':
							driverIncompatible(data, 'get_account_id');
							cloudplate.trigger('get_account_id', {
								account_id: ''
							});
							break;
						case 'get_client_info':
							cloudplate.trigger('get_client_info', {
								client_code: 'phone_web',
								version: '1.0',
								versionName: '1.0',
								detail: ''
							});
							break;
						case 'get_device_info':
							driverIncompatible(data, 'get_device_info');
							cloudplate.trigger('get_device_info', '');
							break;
						case 'reset':
							break;
						case 'get_css_mode':
							driverIncompatible(data, 'get_css_mode');
							cloudplate.trigger('get_css_mode', '');
							break;
						case 'show_share':
							driverIncompatible(data, 'show_share');
							cloudplate.trigger('show_share', '');
							break;
						case 'get_location_info':
							driverIncompatible(data, 'get_location_info');
							cloudplate.trigger('address_change', {
								speed: '',
								accuracy: '',
								lat: '',
								lon: '',
								radius: '',
								city: '',
								addr: ''
							});
							break;
						case 'get_customer_info':
							driverIncompatible(data, 'get_customer_info');
							cloudplate.trigger('get_customer_info', '');
							break;
						case 'get_download_info':
							driverIncompatible(data, 'get_download_info');
							cloudplate.trigger('get_download_info', '');
							break;
						case 'get_ip':
							driverIncompatible(data, 'get_ip');
							cloudplate.trigger('get_ip', '');
							break;
						case 'get_image':
							driverIncompatible(data, 'get_image');
							cloudplate.trigger('get_image', '');
							break;
						case 'get_voice':
							driverIncompatible(data, 'get_voice');
							cloudplate.trigger('get_voice', '');
							break;
						case 'start_voice':
							driverIncompatible(data, 'start_voice');
							cloudplate.trigger('start_voice', '');
							break;
						case 'file_upload':
							driverIncompatible(data, 'file_upload');
							cloudplate.trigger('file_upload', '');
							break;
						case 'stop_voice':
							driverIncompatible(data, 'stop_voice');
							cloudplate.trigger('stop_voice', '');
							break;
						case 'get_video':
							driverIncompatible(data, 'get_video');
							cloudplate.trigger('get_video', '');
							break;
						case 'get_scan_qr':
							driverIncompatible(data, 'get_scan_qr');
							cloudplate.trigger('get_scan_qr', '');
							break;
						case 'search_beacons':
							driverIncompatible(data, 'search_beacons');
							cloudplate.trigger('search_beacons', '');
							break;
						case 'shake':
							driverIncompatible(data, 'shake');
							cloudplate.trigger('shake', '');
							break;
						case 'close':
							if (window && typeof(window.close) == 'function') {
								window.close();
							} else {
								driverIncompatible(data, 'close');
							}
							break;
						case 'set_data':
							if (data.storage !== 0 && data.storage !== '0' && data.storage !== 1 && data.storage !== '1') {
								Tools.setError({
									code: 105,
									msg: '参数传值不对',
									data: ''
								});
								cloudplate.trigger('set_data', '');
								break;
							}
							window.localStorage && window.localStorage.setItem(data.key, data.value);
							window.sessionStorage && window.sessionStorage.setItem(data.key, data.value);
							var result = '';
							if (window.localStorage || window.sessionStorage) {
								result = {
									success: true
								};
							} else {
								result = {
									success: false
								};
							}
							cloudplate.trigger('set_data', result);
							break;
						case 'get_data':
							if (data.storage !== 0 && data.storage !== '0' && data.storage !== 1 && data.storage !== '1') {
								Tools.setError({
									code: 105,
									msg: '参数传值不对',
									data: ''
								});
								cloudplate.trigger('get_data', '');
								break;
							}
							var result = '';
							window.localStorage ? result = window.localStorage.getItem(data.key) : '';
							window.sessionStorage && result === '' ? result = window.sessionStorage.getItem(data.key) : '';
							if (window.localStorage || window.sessionStorage) {
								result = {
									success: true,
									data: result
								};
							} else {
								result = {
									success: false,
									data: result
								};
							}
							cloudplate.trigger('get_data', result);
							break;
						case 'set_share':
							driverIncompatible(data, 'set_share');
							cloudplate.trigger('set_share', '');
							break;
						case 'play_voice':
							break;
						case 'pause_play_voice':
							break;
						case 'stop_play_voice':
							break;
						case 'url_redirect':
							window.location.href = data.url;
							break;
						case 'bindmobile':
							driverIncompatible(data, 'bindmobile');
							cloudplate.trigger('bindmobile', '');
							break;
						case 'is_bindmobile':
							driverIncompatible(data, 'is_bindmobile');
							cloudplate.trigger('is_bindmobile', '');
							break;
						case 'redpacket_open_success':
							driverIncompatible(data, 'redpacket_open_success');
							cloudplate.trigger('redpacket_open_success', {
								success: '1'
							});
							break;
						case 'show_modify_mobile':
							driverIncompatible(data, 'modify_mobile');
							cloudplate.trigger('modify_mobile', {
								success: '0'
							});
							break;
						case 'open_in_app':
							if (!data.defaultClient) {
								cloudplate.trigger('open_in_app', {
									success: '0'
								});
							}
							if (data.defaultClient && data.defaultClient.client_code) {
								Tools.callInApp(data, client_info.client_code);
							} else {
								driverIncompatible(data, 'open_in_app');
								cloudplate.trigger('open_in_app', {
									success: '0'
								});
							}
							break;
						case 'article_info':
							driverIncompatible(data, 'article_info');
							cloudplate.trigger('article_info', {
								success: '0',
								url: ''
							});
							break;
						default:
							driverIncompatible(data, event);
							cloudplate.trigger(event, '');
							break;
					}
				}
			},
			web: {
				driver_params: {},
				preloadfiles: ['https://static.mlinks.cc/scripts/dist/mlink.min.js'],
				check: function(callback) {
					if (Tools.browser() == 'pc') {
						driverIsLoading = true;
						callback({
							client_code: 'web',
							version: '1.0',
							versionName: '1.0',
							detail: '',
							is_client: '0'
						});
					}
				},
				load: function(client_info, callback) {
					callback(client_info);
				},
				init: function(options, client_info) {
					var driver_var = this;
					driver_var['_options'] = options;
					options.ready(client_info);
				},
				filterUrl: function(url) {
					return url;
				},
				delegate: function(event, data, client_info) {
					var _options = this._options;
					data = data ? data : '';
					switch (event) {
						case 'show_login':
							driverIncompatible(data, 'show_login');
							cloudplate.trigger('show_login', '');
							break;
						case 'is_login':
							driverIncompatible(data, 'is_login');
							cloudplate.trigger('is_login', '');
							break;
						case 'get_unique_id':
							driverIncompatible(data, 'get_unique_id');
							cloudplate.trigger('get_unique_id', '');
							break;
						case 'get_account_id':
							driverIncompatible(data, 'get_account_id');
							cloudplate.trigger('get_account_id', '');
							break;
						case 'get_client_info':
							cloudplate.trigger('get_client_info', {
								client_code: 'web',
								version: '1.0',
								versionName: '1.0',
								detail: ''
							});
							break;
						case 'get_device_info':
							driverIncompatible(data, 'get_device_info');
							cloudplate.trigger('get_device_info', '');
							break;
						case 'reset':
							driverIncompatible(data, 'reset');
							cloudplate.trigger('reset', '');
							break;
						case 'get_css_mode':
							driverIncompatible(data, 'get_css_mode');
							cloudplate.trigger('get_css_mode', '');
							break;
						case 'show_share':
							driverIncompatible(data, 'show_share');
							cloudplate.trigger('show_share', '');
							break;
						case 'get_location_info':
							driverIncompatible(data, 'get_location_info');
							cloudplate.trigger('address_change', '');
							break;
						case 'get_customer_info':
							driverIncompatible(data, 'get_customer_info');
							cloudplate.trigger('get_customer_info', '');
							break;
						case 'get_download_info':
							driverIncompatible(data, 'get_download_info');
							cloudplate.trigger('get_download_info', '');
							break;
						case 'get_ip':
							driverIncompatible(data, 'get_ip');
							cloudplate.trigger('get_ip', '');
							break;
						case 'get_image':
							driverIncompatible(data, 'get_image');
							cloudplate.trigger('get_image', '');
							break;
						case 'get_voice':
							driverIncompatible(data, 'get_voice');
							cloudplate.trigger('get_voice', '');
							break;
						case 'start_voice':
							driverIncompatible(data, 'start_voice');
							cloudplate.trigger('start_voice', '');
							break;
						case 'file_upload':
							driverIncompatible(data, 'file_upload');
							cloudplate.trigger('file_upload', '');
							break;
						case 'stop_voice':
							driverIncompatible(data, 'stop_voice');
							cloudplate.trigger('stop_voice', '');
							break;
						case 'get_video':
							driverIncompatible(data, 'get_video');
							cloudplate.trigger('get_video', '');
							break;
						case 'get_scan_qr':
							driverIncompatible(data, 'get_scan_qr');
							cloudplate.trigger('get_scan_qr', '');
							break;
						case 'search_beacons':
							driverIncompatible(data, 'search_beacons');
							cloudplate.trigger('search_beacons', '');
							break;
						case 'shake':
							driverIncompatible(data, 'shake');
							cloudplate.trigger('shake', '');
							break;
						case 'close':
							if (window && typeof(window.close) == 'function') {
								window.close();
							} else {
								driverIncompatible(data, 'close');
							}
							break;
						case 'set_data':
							if (data.storage !== 0 && data.storage !== '0' && data.storage !== 1 && data.storage !== '1') {
								Tools.setError({
									code: 105,
									msg: '参数传值不对',
									data: ''
								});
								cloudplate.trigger('set_data', '');
								break;
							}
							window.localStorage && window.localStorage.setItem(data.key, data.value);
							window.sessionStorage && window.sessionStorage.setItem(data.key, data.value);
							var result = '';
							if (window.localStorage || window.sessionStorage) {
								result = {
									success: true
								};
							} else {
								result = {
									success: false
								};
							}
							cloudplate.trigger('set_data', result);
							break;
						case 'get_data':
							if (data.storage !== 0 && data.storage !== '0' && data.storage !== 1 && data.storage !== '1') {
								Tools.setError({
									code: 105,
									msg: '参数传值不对',
									data: ''
								});
								cloudplate.trigger('get_data', '');
								break;
							}
							var result = '';
							window.localStorage ? result = window.localStorage.getItem(data.key) : '';
							window.sessionStorage && result === '' ? result = window.sessionStorage.getItem(data.key) : '';
							if (window.localStorage || window.sessionStorage) {
								result = {
									success: true,
									data: result
								};
							} else {
								result = {
									success: false,
									data: result
								};
							}
							cloudplate.trigger('get_data', result);
							break;
						case 'set_share':
							driverIncompatible(data, 'set_share');
							cloudplate.trigger('set_share', '');
							break;
						case 'play_voice':
							break;
						case 'pause_play_voice':
							break;
						case 'stop_play_voice':
							break;
						case 'url_redirect':
							window.location.href = data.url;
							break;
						case 'bindmobile':
							driverIncompatible(data, 'bindmobile');
							cloudplate.trigger('bindmobile', '');
							break;
						case 'is_bindmobile':
							driverIncompatible(data, 'is_bindmobile');
							cloudplate.trigger('is_bindmobile', '');
							break;
						case 'redpacket_open_success':
							driverIncompatible(data, 'redpacket_open_success');
							cloudplate.trigger('redpacket_open_success', {
								success: '1'
							});
							break;
						case 'show_modify_mobile':
							driverIncompatible(data, 'modify_mobile');
							cloudplate.trigger('modify_mobile', {
								success: '0'
							});
							break;
						case 'open_in_app':
							if (!data.defaultClient) {
								cloudplate.trigger('open_in_app', {
									success: '0'
								});
							}
							if (data.defaultClient && data.defaultClient.client_code) {
								Tools.callInApp(data, client_info.client_code);
							} else {
								driverIncompatible(data, 'open_in_app');
								cloudplate.trigger('open_in_app', {
									success: '0'
								});
							}
							break;
						case 'article_info':
							driverIncompatible(data, 'article_info');
							cloudplate.trigger('article_info', {
								success: '0',
								url: ''
							});
							break;
						default:
							driverIncompatible(data, event);
							cloudplate.trigger(event, '');
							break;
					}
				}
			},
		};
		var driverIncompatible = function(data, fn_name, need_update) {
			fn_name = fn_name ? fn_name : '';
			need_update = need_update ? need_update : false;
			var error = {
				code: 3,
				msg: fn_name + ' 方法在此版本中不可用，请升级版本~',
				data: {
					'method': fn_name
				}
			};
			if (need_update) {
				error.msg = fn_name + ' 方法在此版本中不可用，请升级版本~';
			} else {
				error.msg = fn_name + ' 方法此环境不支持~';
			}
			Tools.setError(error);
			if (data.hasOwnProperty('cpIncompatible') && typeof(data.cpIncompatible) == 'function') {
				if (typeof(data['_cp_event']) == 'object') {
					for (var index in data['_cp_event']) {
						if (data['_cp_event'][index] && typeof(data['_cp_event'][index]) == 'object' && data['_cp_event'][index].length) {
							for (var key in data['_cp_event'][index]) {
								Core.remove(data['_cp_event'][index][key], index);
							}
						}
					}
				}
				data.cpIncompatible(error);
			}
		};
		var loadDriver = function(client_info, readycallback) {
			var index = client_info.client_code;
			if (client_info.client_code.indexOf('xsb_') !== -1) {
				index = 'xsb';
			}
			if (client_info.client_code.indexOf('smartcity_') !== -1) {
				index = 'smartcity';
			}
			if (typeof(appJSBridge) == 'object' && index !== 'JinHua_JCY') {
				index = 'appJSBridge';
			}
			if (!drivers[index]) {
				return false;
			}
			drivers[index].load(client_info, function(params) {
				drivers[index].driver_params = params ? params : {};
				readycallback(drivers[index], client_info);
			});
		};
		var checkDriver = function(readycallback) {
			if (drivers) {
				for (var index in drivers) {
					if (driverIsLoading) {
						return;
					}
					drivers[index].check(function(client_info) {
						loadDriver(client_info, readycallback);
					});
				}
			}
		};
		var getDriver = function(readycallback) {
			if (drivers) {
				console && console.log('browser', Tools.browser());
				console && console.log('version', _cp_config.version);
				if (typeof(ZBJTJSBridge) === 'object' && typeof(ZBJTJSBridge.invoke) == 'function' && typeof(h24) != 'object') {
					ZBJTJSBridge.invoke('getAppInfo', '{"uuid":0}', Core.loadCallbackFunctions('getAppInfo', function(res) {
						if (res && typeof res === 'string') {
							try {
								res = JSON.parse(res);
								if (res.code == 1) {
									var data = res.data;
									if (data.app && drivers[data.app]) {
										driverIsLoading = true;
										if (Tools.browser() == 'zjxw' && data.app == 'zjolapp' && data.version == '70000') {
											data.app = 'zjxw';
										}
										loadDriver({
											client_code: data.app,
											version: data.version,
											versionName: data.versionName ? data.versionName : data.version,
											detail: data.detail ? data.detail : '',
											is_client: '1'
										}, readycallback);
									}
								}
							} catch (e) {
								var error = {
									code: 5,
									msg: '客户端方法调用失败',
									data: {
										'method': 'getAppInfo'
									}
								};
								Tools.setError(error);
								checkDriver(readycallback);
							}
						} else {
							var error = {
								code: 5,
								msg: '客户端方法调用失败',
								data: {
									'method': 'getAppInfo'
								}
							};
							Tools.setError(error);
							checkDriver(readycallback);
						}
					}));
				} else if (typeof(JSNativeBridge) === 'object' && typeof(JSNativeBridge.invoke) == 'function') {
					JSNativeBridge.invoke('getAppInfo', '{"uuid":0}', Core.loadCallbackFunctions('getAppInfo', function(res) {
						if (res && typeof res === 'string') {
							try {
								res = JSON.parse(res);
								if (res.code == 1) {
									var data = res.data;
									if (data.app && drivers[data.app]) {
										driverIsLoading = true;
										loadDriver({
											client_code: data.app,
											version: data.version,
											versionName: data.versionName ? data.versionName : data.version,
											detail: data.detail ? data.detail : '',
											is_client: '1'
										}, readycallback);
									}
								}
							} catch (e) {
								var error = {
									code: 5,
									msg: '客户端方法调用失败',
									data: {
										'method': 'getAppInfo'
									}
								};
								Tools.setError(error);
								checkDriver(readycallback);
							}
						} else {
							var error = {
								code: 5,
								msg: '客户端方法调用失败',
								data: {
									'method': 'getAppInfo'
								}
							};
							Tools.setError(error);
							checkDriver(readycallback);
						}
					}));
				} else {
					checkDriver(readycallback);
				}
				return;
			}
		};
		getDriver(readycallback);
	};
	var Request = {
		_requestQueue: [],
		_resourcePool: {},
		_is_jsonp_called: false,
		_getStyle: function(src, func) {
			var cssstyle = document.createElement('link');
			cssstyle.async = "async";
			cssstyle.href = src;
			cssstyle.rel = 'stylesheet';
			cssstyle.type = 'text/css';
			cssstyle.charset = "UTF-8";
			if (func) {
				cssstyle.onload = func;
			}
			document.head.appendChild(cssstyle);
		},
		_getScript: function(src, func) {
			var script = document.createElement('script');
			script.async = "async";
			script.src = src;
			script.charset = "UTF-8";
			if (func) {
				script.onload = func;
			}
			document.body.appendChild(script);
		},
		_checkRequestQueue: function(resources) {
			for (var index in this._requestQueue) {
				var flag = true,
					current = false;
				if (!this._requestQueue[index]) {
					continue;
				}
				if (resources === this._requestQueue[index].resources) {
					current = true;
				}
				for (var k in this._requestQueue[index].resources) {
					if (this._resourcePool.hasOwnProperty(this._requestQueue[index].resources[k]) && this._resourcePool[this._requestQueue[index].resources[k]] !== 2) {
						flag = false;
					}
				}
				if (flag) {
					var done = this._requestQueue[index].callback;
					this._requestQueue[index] = null;
					timeout(done);
					if (current) {
						return true;
					}
				}
			}
			return false;
		},
		_loadResourcePool: function() {
			var request = this;
			for (var index in this._resourcePool) {
				if (!this._resourcePool[index]) {
					var ext_index = index.lastIndexOf(".");
					var ext = index.substr(ext_index + 1);
					if (ext === 'js' || ext === 'JS') {
						this._resourcePool[index] = 1;
						this._getScript(index, function() {
							request._resourcePool[index] = 2;
							request._checkRequestQueue();
						});
					} else if (ext === 'css' || ext === 'CSS') {
						this._getStyle(index);
						this._resourcePool[index] = 2;
					}
				}
			}
		},
		_loadResource: function(resources, callback, callbackparams) {
			var request = this;
			callbackparams = callbackparams ? callbackparams : '';
			var item = {
				resources: resources,
				callback: function() {
					typeof callback == 'function' && callback(callbackparams);
				}
			};
			request._requestQueue.push(item);
			for (var index in resources) {
				if (!request._resourcePool.hasOwnProperty(resources[index]) && typeof index == 'string' && (typeof resources[index] == 'string' && (resources[index].indexOf('http') > -1 || resources[index].indexOf('https') > -1))) {
					request._resourcePool[resources[index]] = 0;
				}
			}
			if (request._checkRequestQueue(resources)) {
				return true;
			}
			request._loadResourcePool();
		},
		loadContext: function(requires, callback) {
			var request = this;
			var ok = true;
			var checkpool = function(require_callback, option) {
				var flag = true;
				for (var i in request._resourcePool) {
					if (!request._resourcePool[i] || request._resourcePool[i] !== 2) {
						flag = flag && false;
					}
				}
				if (flag) {
					callback();
				}
			};
			if (!requires || requires === {}) {
				callback();
			}
			for (var index in requires) {
				var check_array = index.split(".");
				if (requires[index].hasOwnProperty('options') && requires[index]['options']['is_activity'] && (eval('typeof ' + check_array[0] + ' == "undefined";') || check_array[1] && eval('typeof ' + index + ' == "undefined";'))) {
					ok = false;
					this._loadResource(requires[index]['source'], function(key) {
						requires[key]['require_callback'](requires[key]['options']);
						checkpool();
					}, index);
				}
			}
			if (ok) {
				callback();
			}
		}
	};
	var Tools = {
		ajax: function() {
			var _options = {
				url: null,
				type: 'GET',
				data: null,
				dataType: 'text',
				jsonp: 'callback',
				jsonpCallback: 'jsonpCallback',
				async: true,
				cache: true,
				timeout: null,
				contentType: 'application/x-www-form-urlencoded',
				success: null,
				fail: null
			};
			var _param = function _param(data) {
				var str = '';
				if (!data || _empty(data)) {
					return str;
				}
				if (data instanceof FormData) {
					return data;
				}
				for (var key in data) {
					str += key + '=' + data[key] + '&';
				}
				str = str.slice(0, -1);
				return str;
			};
			var _empty = function _empty(obj) {
				for (var key in obj) {
					return false;
				}
				return true;
			};
			var _extend = function _extend(target, options) {
				if ((typeof target === 'undefined' ? 'undefined' : _typeof(target)) !== 'object' || (typeof options === 'undefined' ? 'undefined' : _typeof(options)) !== 'object') {
					return;
				}
				var copy, clone, name;
				for (name in options) {
					if (options.hasOwnProperty(name) && !target.hasOwnProperty(name)) {
						target[name] = options[name];
					}
				}
				return target;
			};
			var parseJSON = function parseJSON(text) {
				if (typeof text !== 'string') {
					return;
				}
				if (JSON && JSON.parse) {
					return JSON.parse(text);
				}
				return new Function('return ' + text)();
			};

			function _sendJsonpRequest(url, callbackName, succCallback, failCallback) {
				var script = document.createElement('script');
				script.type = "text/javascript";
				script.src = url;
				document.body.appendChild(script);
				window[callbackName] = window[callbackName] || succCallback;
				timeout(function() {
					if (!Request._is_jsonp_called) {
						failCallback();
					}
				}, 4000);
			}
			return function(options) {
				if (!options || !options.url) {
					throw '参数错误！';
				}
				options.type = options.type.toUpperCase();
				_extend(options, _options);
				var search = '';
				var param = _param(options.data);
				if (options.type === 'GET' && param) {
					search = (options.url.indexOf('?') > -1 ? '&' : '?') + param;
					if (!options.cache) {
						search += '&radom=' + Math.random();
					}
					param = null;
				}
				if (options.dataType === 'jsonp') {
					options.url = options.url + search;
					var jsonpUrl = options.url.indexOf('?') > -1 ? options.url : options.url + '?' + options.jsonp + '=' + options.jsonpCallback;
					_sendJsonpRequest(jsonpUrl, options.jsonpCallback, options.success, options.fail);
					return;
				}
				var xhr = new(window.XMLHttpRequest || ActiveXObject)('Microsoft.XMLHTTP');
				xhr.open(options.type, options.url + search, options.async);
				xhr.onreadystatechange = function() {
					if (xhr.readyState == 4) {
						if (xhr.status >= 200 && xhr.status < 300 || xhr.status == 304) {
							var text = xhr.responseText;
							if (options.dataType == 'json') {
								text = parseJSON(text);
							}
							if (typeof options.success === 'function') {
								options.success(text, xhr.status);
							}
						} else {
							if (typeof options.fail === 'function') {
								options.fail('获取失败', 500);
							}
						}
					}
				};
				if (options.contentType != 'multipart/form-data') {
					xhr.setRequestHeader('content-type', options.contentType);
				}
				xhr.send(param);
				if (typeof options.timeout === 'number') {
					if (xhr.timeout) {
						xhr.timeout = options.timeout;
					} else {
						setTimeout(function() {
							xhr.abort();
						}, options.timeout);
					}
				}
			};
		}(),
		random: function() {
			if (Math && Math.round) {
				return Math.round(Math.random() * 100000000000) + (new Date()).valueOf();
			}
			return false;
		},
		sleep: function(delay, extFun, callback) {
			extFun = extFun ? extFun : function() {
				return false;
			};
			callback = callback ? callback : function() {};
			var start = (new Date()).getTime();
			while (((new Date()).getTime() - start < delay) && !extFun()) {
				continue;
			}
			callback();
		},
		contains: function(arr, obj) {
			var i = arr.length;
			while (i--) {
				if (arr[i] === obj) {
					return true;
				}
			}
			return false;
		},
		writelog: function(key, $data, level) {
			$data = $data ? $data : '';
			level = level ? level : 'log';
			var date = '';
			if (typeof Date == 'function') {
				function CurentTime() {
					var now = new Date();
					var year = now.getFullYear();
					var month = now.getMonth() + 1;
					var day = now.getDate();
					var hh = now.getHours();
					var mm = now.getMinutes();
					var ss = now.getSeconds();
					var clock = year + "-";
					if (month < 10) clock += "0";
					clock += month + "-";
					if (day < 10) clock += "0";
					clock += day + " ";
					if (hh < 10) clock += "0";
					clock += hh + ":";
					if (mm < 10) clock += '0';
					clock += mm + ":";
					if (ss < 10) clock += '0';
					clock += ss;
					return (clock);
				}
				date = CurentTime();
			}
			if (CP && CP._options && CP._options.debug) {
				if (console && console.hasOwnProperty(level)) {
					console[level](date + ' ' + Date.now() + ' ' + key, $data);
				} else {
					var p = document.createElement("p");
					var content = '';
					if ((typeof $data == 'string') && $data.constructor == String || typeof $data == 'boolean') {
						content = $data;
					} else {
						content = JSON.stringify($data);
					}
					p.innerText = date + ' ' + key + ' : ' + content;
					document.body.appendChild(p);
				}
			} else {}
		},
		browser: function(system, detail) {
			if (!navigator || !navigator.userAgent) {
				return '';
			}
			var sUserAgent = navigator.userAgent.toLowerCase();
			var bIsIpad = sUserAgent.match(/ipad/i) == "ipad";
			var bIsIphoneOs = sUserAgent.match(/iphone os/i) == "iphone os";
			var bIsMidp = sUserAgent.match(/midp/i) == "midp";
			var bIsUc7 = sUserAgent.match(/rv:1.2.3.4/i) == "rv:1.2.3.4";
			var bIsUc = sUserAgent.match(/ucweb/i) == "ucweb";
			var bIsAndroid = sUserAgent.match(/android/i) == "android";
			var bIsCE = sUserAgent.match(/windows ce/i) == "windows ce";
			var bIsWM = sUserAgent.match(/windows mobile/i) == "windows mobile";
			var bIswx = sUserAgent.match(/micromessenger/i) == "micromessenger";
			var bIs24h = sUserAgent.match(/twentyfourhours/i) == "twentyfourhours";
			var bIsxsb = sUserAgent.match(/xsb/i) == "xsb";
			var bIsjxrb = sUserAgent.match(/jxrb/i) == "jxrb";
			var bIszjolapp = sUserAgent.match(/zjolapp/i) == "zjolapp";
			var bIsharvestapp = sUserAgent.match(/harvestapp/i) == "harvestapp";
			var bIszjxw = sUserAgent.match(/zjxw/i) == "zjxw";
			var bIshbxw = sUserAgent.match(/hbxw/i) == "hbxw";
			var bIsdd = sUserAgent.match(/dingtalk/) == "dingtalk";
			var bIsApp = sUserAgent.match(/cpapp/) == "cpapp";
			var bIuapphybridjs = sUserAgent.match(/uapphybridjs/i) == "uapphybridjs";
			var bIsqq = sUserAgent.match(/QQ/) == "QQ";
			if (!bIsqq) {
				bIsqq = sUserAgent.match(/\bqq\b/i) == "qq";
			}
			var bIssmartCity = sUserAgent.match(/m2osmartcity/i) == "m2osmartcity";
			var bIsqqbower = sUserAgent.match(/mqqbrowser/i) == "mqqbrowser";
			if (bIsqqbower && !bIswx && !bIuapphybridjs) {
				bIsqq = true;
			}
			var bIshaishu = sUserAgent.match(/haishu/) == "haishu";
			var bIsjcy = sUserAgent.match(/jinhua_jcy/) == "jinhua_jcy";
			if (system) {
				if (bIswx) {
					return 'wx';
				} else if (bIsIpad) {
					return 'ipad';
				} else if (bIsIphoneOs) {
					return 'iphone os';
				} else if (bIsMidp) {
					return 'midp';
				} else if (bIsUc7) {
					return 'UC7';
				} else if (bIsUc) {
					return 'ucweb';
				} else if (bIsAndroid) {
					return 'android';
				} else if (bIsCE) {
					return 'windows ce';
				} else if (bIsWM) {
					return 'windows mobile';
				}
			}
			if (bIsjcy) {
				return 'jcy';
			}
			if (detail) {
				return 'smartcity';
			}
			if (bIssmartCity) {
				return 'smartcity';
			}
			if (bIs24h) {
				return '24h';
			}
			if (bIsxsb) {
				return 'xsb';
			}
			if (bIsjxrb) {
				return 'jxrb';
			}
			if (bIszjxw) {
				return 'zjxw';
			}
			if (bIszjolapp) {
				return 'zjolapp';
			}
			if (bIsharvestapp) {
				return 'harvestapp';
			}
			if (bIshbxw) {
				return 'hbxw';
			}
			if (bIshaishu) {
				return 'haishu';
			}
			if (bIuapphybridjs) {
				return 'uapphybridjs';
			}
			if (bIsdd) {
				return 'dd';
			}
			if (bIsqq) {
				return 'qq';
			}
			if (bIswx) {
				return 'wx';
			}
			if (bIsApp) {
				return 'app';
			}
			if (bIsIpad || bIsIphoneOs || bIsMidp || bIsUc7 || bIsUc || bIsAndroid || bIsCE || bIsWM || bIswx || bIsdd || bIszjolapp || bIsqq || bIsjxrb || bIsApp || bIssmartCity || bIshbxw) {
				return 'phone';
			} else {
				return 'pc';
			}
		},
		createAudioElement: function(option) {
			var audio = document.createElement('audio');
			audio.id = 'audio_' + this.random() + '_' + new Date().getTime();
			audio.src = '';
			audio.style = 'width:0px;height:0px;border:none;margin:0px;padding:0px;'
			if (option && option.control) {
				audio.control = option.control;
			}
			if (option && option.style) {
				audio.style = option.style;
			}
			document.body.appendChild(audio);
			return audio.id;
		},
		getRequest: function() {
			var url = location.search;
			var theRequest = new Object();
			if (url.indexOf("?") != -1) {
				var str = url.substr(1);
				strs = str.split("&");
				for (var i = 0; i < strs.length; i++) {
					theRequest[strs[i].split("=")[0]] = unescape(strs[i].split("=")[1]);
				}
			}
			return theRequest;
		},
		callInApp: function(data, client_info) {
			if (!data.defaultClient || !data.defaultClient.client_code) {
				driverIncompatible(data, 'open_in_app');
				cloudplate.trigger('open_in_app', {
					success: '0'
				});
				return false;
			}
			if (data.defaultClient.client_code.toLowerCase() !== String(client_info.client_code).toLowerCase()) {
				var result = jump(data.defaultClient.client_code.toLowerCase(), data);
				cloudplate.trigger('open_in_app', {
					success: '1',
					'link': result
				});
			} else {
				driverIncompatible(data, 'open_in_app');
				cloudplate.trigger('open_in_app', {
					success: '0'
				});
			}

			function jump(client_code, data) {
				var user_agent = navigator.userAgent.toLowerCase();
				var is_android = user_agent.match(/android/ig);
				var is_ios = user_agent.match(/iphone|ipod|ipad/ig);
				var link_url = data.link_url ? data.link_url : window.location.href;
				var request_params = data.id ? data : Tools.getRequest();
				var openLink_android = '';
				var openLink_ios = '';
				var link = '';
				var weidown_url = 'https://a.app.qq.com/o/simple.jsp?pkgname=';
				var weidown = client_code && _cp_config._open_params[client_code] ? _cp_config._open_params[client_code]['weidown'] : false;
				var frist_url = '',
					schema_url = '';
				if (typeof(client_code) == 'string' && client_code.toLowerCase() === 'zjolapp') {
					var openLink_ios = 'zjol://tm.zjol.com.cn?url=' + encodeURIComponent(link_url);
					var openLink_android = 'zjol://tm.zjol.com.cn?url=' + (link_url);
					if (is_ios) {
						link = weidown_url + "cn.com.zjol&ios_scheme=" + encodeURIComponent(openLink_ios);
						window.location.href = link;
					} else if (is_android) {
						link = weidown_url + "cn.com.zjol&android_schema=" + escape(openLink_android);
						window.location.href = link;
					}
				} else if (typeof(client_code) == 'string' && client_code.toLowerCase() === 'zjxw') {
					var openLink_ios = 'mwzjxw://zj.zjol.com.cn?url=' + encodeURIComponent(link_url);
					var openLink_android = 'mwzjxw://zj.zjol.com.cn?url=' + link_url;
					if (is_ios) {
						link = weidown_url + "com.zhejiangdaily&ios_scheme=" + encodeURIComponent(openLink_ios);
					} else if (is_android) {
						link = weidown_url + "com.zhejiangdaily&android_schema=" + escape(openLink_android);
					}
				} else if (typeof(client_code) == 'string' && client_code.toLowerCase().indexOf('xsb') == 0) {
					if (weidown && _cp_config._open_params[client_code]['pkgname']) {
						frist_url = weidown_url + _cp_config._open_params[client_code]['pkgname']
					}
					var tenantId = _cp_config._open_params[client_code].hasOwnProperty('tenantId') ? _cp_config._open_params[client_code]['tenantId'] : 0;
					var sp = '';
					link_url.indexOf(':') === -1 ? sp = ':' : '';
					link_url.indexOf('//') === -1 ? sp += '//' : '';
					if (link_url) {
						link_url = link_url.replace('https://', '').replace('http://', '');
						link = _cp_config._open_params[client_code]['protocol'] + '://' + (link_url);
					} else if (request_params.id && request_params.tenantId) {
						link = _cp_config._open_params[client_code]['protocol'] + '://vapp.tmuyun.com/webDetails/link?id=' + request_params.id + '&tenantId=' + request_params.tenantId;
					} else {
						link = _cp_config._open_params[client_code]['protocol'] + sp + link_url.replace('https', '').replace('http', '');
					}
					if (is_ios && weidown) {
						schema_url = '&ios_scheme=';
						link = encodeURIComponent(link);
					} else if (is_android && weidown) {
						schema_url = '&android_schema=';
						link = escape(link);
					}
					var wxcalllink = frist_url + schema_url + encodeURIComponent(_cp_config._open_params[client_code]['protocol'] + '://' + (link_url));
					link = frist_url + schema_url + link;
					var is_qq = user_agent.match(/QQ/ig);
					if (!/iPhone OS 13_1/gi.test(user_agent) && is_ios && !is_qq && _cp_config._open_params[client_code]['wxappid']) {
						var origin = tenantId === 59 ? 'https://vcms.tmuyun.com' : 'https://vapp.tmuyun.com';
						var placehold = _cp_config._open_params[client_code].hasOwnProperty('bundleid') && _cp_config._open_params[client_code]['bundleid'] ? _cp_config._open_params[client_code]['bundleid'] : _cp_config._open_params[client_code]['wxopenappid'];
						link = origin + '/' + placehold + '/?url=' + encodeURIComponent(decodeURIComponent(wxcalllink));
					}
				} else if (typeof(client_code) == 'string' && client_code.toLowerCase() == 'h24') {
					var openLink_ios = 'h24app://com.cmstop.qjwb/web?url=' + link_url;
					var openLink_android = 'h24app://com.cmstop.qjwb/web?url=' + encodeURIComponent(link_url);
					if (is_ios) {
						link = weidown_url + "com.cmstop.qjwb&ios_scheme=" + encodeURIComponent(openLink_ios);
					} else if (is_android) {
						link = weidown_url + "com.cmstop.qjwb&android_schema=" + encodeURIComponent(openLink_android);
					}
				} else if (typeof(client_code) == 'string' && client_code.toLowerCase() == 'harvestapp') {
					var openLink_ios = 'shouhuo://harvest.tmuyun.com?url=' + encodeURIComponent(link_url);
					var openLink_android = 'shouhuo://harvest-api.tmuyun.com?url=' + encodeURIComponent(link_url);
					if (is_ios) {
						link = weidown_url + "com.zjonline.harvest&ios_scheme=" + encodeURIComponent(openLink_ios);
					} else if (is_android) {
						link = weidown_url + "com.zjonline.harvest&android_schema=" + encodeURIComponent(openLink_android);
					}
				} else if (typeof(client_code) == 'string' && client_code.toLowerCase() === 'hbxw') {
					var openLink_ios = 'hbrb://hbxwbeta.hebnews.cn?url=' + encodeURIComponent(link_url);
					var openLink_android = 'hbrb://hbxwbeta.hebnews.cn?url=' + link_url;
					if (is_ios) {
						link = weidown_url + "com.enterprise.hbrbts&ios_scheme=" + encodeURIComponent(openLink_ios);
					} else if (is_android) {
						link = weidown_url + "com.enterprise.hbrbts&android_schema=" + escape(openLink_android);
					}
				} else if (typeof(client_code) == 'string' && client_code.toLowerCase() === 'haishu') {
					link = 'haishu://app?type=web&webUrl=' + encodeURIComponent(link_url);
				} else if (typeof(client_code) == 'string' && client_code.toLowerCase() === 'uapphybridjs') {
					link = 'acsudtapp://h5?link_url=' + encodeURIComponent(link_url);
				} else if (weidown) {
					if (_cp_config._open_params[client_code]['pkgname']) {
						frist_url = weidown_url + _cp_config._open_params[client_code]['pkgname']
					}
					if (_cp_config._open_params[client_code]['protocol']) {
						link = _cp_config._open_params[client_code]['protocol'] + '://' + _cp_config._open_params[client_code]['link'] + encodeURIComponent(link_url);
					}
					if (is_ios) {
						schema_url = '&ios_scheme=';
						link = encodeURIComponent(link);
					} else {
						schema_url = '&android_schema=';
						link = escape(link);
					}
					link = frist_url + schema_url + link;
				}
				if (data.directJump) {
					if (_cp_config._open_params[client_code]) {
						!is_ios ? window.open(link) : window.location.replace(link);
					}
					timeout(function() {
						if (client_code && _cp_config.download_url && _cp_config.download_url.hasOwnProperty(client_code.toLowerCase())) {
							window.location.href = _cp_config.download_url[client_code.toLowerCase()];
						}
					}, 1500);
				} else {
					return link;
				}
			}
		},
		setError: function(data) {
			var code = '',
				msg = '';
			if (data && data.hasOwnProperty('code')) {
				code = data.code;
				msg = data.hasOwnProperty('msg') ? data.msg : '';
			}
			if (data && data.hasOwnProperty('errcode')) {
				code = data.errcode;
				msg = data.hasOwnProperty('errmsg') ? data.errmsg : '';
			}
			if (data && data.hasOwnProperty('errCode')) {
				code = data.errCode;
				msg = data.hasOwnProperty('errMsg') ? data.errMsg : '';
			}
			var client = CP._driver && CP._driver.client_info ? CP._driver.client_info : '';
			if (CP && CP._options && typeof(CP._options.error) == 'function') {
				CP._options.error({
					code: code,
					msg: msg,
					data: data,
					client: client
				});
			}
			this.writelog('SET ERROR:', {
				code: code,
				msg: msg,
				data: data,
				client: client
			}, 'error');
		},
		recursionTrform: function(value) {
			if (typeof value === 'string') {
				value = value.replace(/[\r\n]/g, '<br>');
				if (value.indexOf('"') !== -1) {
					value.indexOf('\\"') !== -1 ? value = value.replace(/"/g, '\\\\"') : value = value.replace(/"/g, '\\\"');
				}
			} else if (typeof value === 'object' && value !== null && !(value instanceof Array)) {
				for (var index in value) {
					value[index] = Tools.recursionTrform(value[index]);
				}
			}
			return value;
		},
		eventPatch: function(event, data) {
			if ('reset' == event && data.is_login !== 0 && data.is_login !== '0' && data.is_login !== 1 && data.is_login !== '1' && data.account_id && data.unique_id) {
				data.is_login = '1';
			}
			if ('get_device_info' === event && !data.version && CP && CP._driver.hasOwnProperty('client_info') && CP._driver['client_info'].version) {
				data.version = CP._driver['client_info'].version;
			}
			if ('file_upload' === event && data && data.
			return &&typeof data.
			return =='object') {
				try {
					data.
					return = JSON.stringify(data.
					return);
				} catch (e) {
					var error = {
						code: 5,
						msg: '客户端回调 ' + event + ' 调用失败',
						data: e
					};
					Tools.setError(error);
				}
			}
			return data;
		},
		_setChangShanLogin: function(token) {
			if (!uapp) return;
			var oldtoken = uapp.cache.getStorage({
				key: 'token',
				success: function(result) {},
				error: function(error) {}
			});
			if (!oldtoken) {
				uapp.cache.setStorage({
					key: 'token',
					data: token,
					success: function(result) {},
					error: function(error) {}
				});
			}
		},
		_clearChangShanLogin: function() {
			if (!uapp) return;
			uapp.cache.removeStorage({
				key: 'token',
				success: function(result) {},
				error: function(error) {}
			});
		}
	};
	var Core = {
		synkeys: {},
		timeoutKeys: {},
		callbackFunctions: {},
		events: {
			sys_is_init: {
				test: function(data) {
					Tools.writelog('sys_is_init 事件调用成功', data);
				}
			},
			sys_jsonp: {
				test: function(data) {
					Tools.writelog('sys_jsonp 事件调用成功', data);
				}
			},
			is_login: {
				test: function(data) {
					Tools.writelog('is_login 事件调用成功', data);
				}
			},
			get_unique_id: {
				test: function(data) {
					Tools.writelog('get_unique_id 事件调用成功', data);
				}
			},
			get_account_id: {
				test: function(data) {
					Tools.writelog('get_account_id 事件调用成功', data);
				}
			},
			get_client_info: {
				test: function(data) {
					Tools.writelog('get_client_info 事件调用成功', data);
				}
			},
			get_device_info: {
				test: function(data) {
					Tools.writelog('get_device_info 事件调用成功', data);
				}
			},
			reset: {
				test: function(data) {
					Tools.writelog('reset 事件调用成功', data);
				}
			},
			mode_change: {
				test: function(data) {
					Tools.writelog('mode_change 事件调用成功', data);
				}
			},
			get_share_result: {
				test: function(data) {
					Tools.writelog('get_share_result 事件调用成功', data);
				}
			},
			address_change: {
				test: function(data) {
					Tools.writelog('address_change 事件调用成功', data);
				}
			},
			get_customer_info: {
				test: function(data) {
					Tools.writelog('get_customer_info 事件调用成功', data);
				}
			},
			get_download_info: {
				test: function(data) {
					Tools.writelog('get_download_info 事件调用成功', data);
				}
			},
			get_ip: {
				test: function(data) {
					Tools.writelog('get_ip 事件调用成功', data);
				}
			},
			get_image: {
				test: function(data) {
					Tools.writelog('get_image 事件调用成功', data);
				}
			},
			get_voice: {
				test: function(data) {
					Tools.writelog('get_voice 事件调用成功', data);
				}
			},
			start_voice: {
				test: function(data) {
					Tools.writelog('start_voice 事件调用成功', data);
				}
			},
			file_upload: {
				test: function(data) {
					Tools.writelog('file_upload 事件调用成功', data);
				}
			},
			stop_voice: {
				test: function(data) {
					Tools.writelog('stop_voice 事件调用成功', data);
				}
			},
			auto_stop_voice: {
				test: function(data) {
					Tools.writelog('auto_stop_voice 事件调用成功', data);
				}
			},
			get_video: {
				test: function(data) {
					Tools.writelog('get_video 事件调用成功', data);
				}
			},
			get_scan_qr: {
				test: function(data) {
					Tools.writelog('get_scan_qr 事件调用成功', data);
				}
			},
			shake: {
				test: function(data) {
					Tools.writelog('shake 事件调用成功', data);
				}
			},
			close: {
				test: function(data) {
					Tools.writelog('close 事件调用成功', data);
				}
			},
			set_data: {
				test: function(data) {
					Tools.writelog('set_data 事件调用成功', data);
				}
			},
			get_data: {
				test: function(data) {
					Tools.writelog('get_data 事件调用成功', data);
				}
			},
			set_share: {
				test: function(data) {
					Tools.writelog('set_share 事件调用成功', data);
				}
			},
			play_voice: {
				test: function(data) {
					Tools.writelog('play_voice 事件调用成功', data);
				}
			},
			pause_play_voice: {
				test: function(data) {
					Tools.writelog('pause_play_voice 事件调用成功', data);
				}
			},
			stop_play_voice: {
				test: function(data) {
					Tools.writelog('stop_play_voice 事件调用成功', data);
				}
			},
			get_customer_name: {
				test: function(data) {
					Tools.writelog('get_customer_name 事件调用成功', data);
				}
			},
			bindmobile: {
				test: function(data) {
					Tools.writelog('bindmobile 事件调用成功', data);
				}
			},
			is_bindmobile: {
				test: function(data) {
					Tools.writelog('is_bindmobile 事件调用成功', data);
				}
			},
			get_customer_detail: {
				test: function(data) {
					Tools.writelog('get_customer_detail 事件调用成功', data);
				}
			},
			redpacket_open_success: {
				test: function(data) {
					Tools.writelog('redpacket_open_success 事件调用成功', data);
				}
			},
			modify_mobile: {
				test: function(data) {
					Tools.writelog('modify_mobile 事件调用成功', data);
				}
			},
			open_in_app: {
				test: function(data) {
					Tools.writelog('open_in_app 事件调用成功', data);
				}
			},
			ydun_get_token: {
				test: function(data) {
					Tools.writelog('ydun_get_token 事件调用成功', data);
				}
			},
			ydun_start: {
				test: function(data) {
					Tools.writelog('ydun_start 事件调用成功', data);
				}
			},
			ydun_stop: {
				test: function(data) {
					Tools.writelog('ydun_stop 事件调用成功', data);
				}
			},
			check_wx_js_api: {
				test: function(data) {
					Tools.writelog('check_wx_js_api 事件调用成功', data);
				}
			},
			download_image: {
				test: function(data) {
					Tools.writelog('download_image 事件调用成功', data);
				}
			},
			get_local_img_data: {
				test: function(data) {
					Tools.writelog('get_local_img_data 事件调用成功', data);
				}
			},
			download_voice: {
				test: function(data) {
					Tools.writelog('download_voice 事件调用成功', data);
				}
			},
			translate_voice: {
				test: function(data) {
					Tools.writelog('translate_voice 事件调用成功', data);
				}
			},
			get_network_type: {
				test: function(data) {
					Tools.writelog('get_network_type 事件调用成功', data);
				}
			},
			open_location: {
				test: function(data) {
					Tools.writelog('open_location 事件调用成功', data);
				}
			},
			start_search_beacons: {
				test: function(data) {
					Tools.writelog('start_search_beacons 事件调用成功', data);
				}
			},
			stop_search_beacons: {
				test: function(data) {
					Tools.writelog('stop_search_beacons 事件调用成功', data);
				}
			},
			on_search_beacons: {
				test: function(data) {
					Tools.writelog('on_search_beacons 事件调用成功', data);
				}
			},
			hide_menu_items: {
				test: function(data) {
					Tools.writelog('hide_menu_items 事件调用成功', data);
				}
			},
			show_menu_items: {
				test: function(data) {
					Tools.writelog('show_menu_items 事件调用成功', data);
				}
			},
			hide_all_non_base_menu_item: {
				test: function(data) {
					Tools.writelog('hide_all_non_base_menu_item 事件调用成功', data);
				}
			},
			show_all_non_base_menu_item: {
				test: function(data) {
					Tools.writelog('show_all_non_base_menu_item 事件调用成功', data);
				}
			},
			open_product_specific_view: {
				test: function(data) {
					Tools.writelog('open_product_specific_view 事件调用成功', data);
				}
			},
			choose_card: {
				test: function(data) {
					Tools.writelog('choose_card 事件调用成功', data);
				}
			},
			add_card: {
				test: function(data) {
					Tools.writelog('add_card 事件调用成功', data);
				}
			},
			open_card: {
				test: function(data) {
					Tools.writelog('open_card 事件调用成功', data);
				}
			},
			choose_wx_pay: {
				test: function(data) {
					Tools.writelog('choose_wx_pay 事件调用成功', data);
				}
			},
			open_address: {
				test: function(data) {
					Tools.writelog('open_address 事件调用成功', data);
				}
			},
			modify_delivery_name: {
				test: function(data) {
					Tools.writelog('modify_delivery_name 事件调用成功', data);
				}
			},
			define_menu: {
				test: function(data) {
					Tools.writelog('define_menu 事件调用成功', data);
				}
			},
			convert_video: {
				test: function(data) {
					Tools.writelog('convert_video 事件调用成功', data);
				}
			},
			check_js_api: {
				test: function(data) {
					Tools.writelog('check_js_api 事件调用成功', data);
				}
			},
			select_media: {
				test: function(data) {
					Tools.writelog('select_media 事件调用成功', data);
				}
			},
			subscribe_event: {
				test: function(data) {
					Tools.writelog('subscribe_event 事件调用成功', data);
				}
			},
			preview: {
				test: function(data) {
					Tools.writelog('preview 事件调用成功', data);
				}
			},
			set_share_success: {
				test: function(data) {
					Tools.writelog('set_share_success 事件调用成功', data);
				}
			},
			subscribe_set_event: {
				test: function(data) {
					Tools.writelog('subscribe_set_event 事件调用成功', data);
				}
			},
			article_info: {
				test: function(data) {
					Tools.writelog('article_info 事件调用成功', data);
				}
			},
			show_authorize: {
				test: function(data) {
					Tools.writelog('show_authorize 事件调用成功', data);
				}
			},
			show_alipay_authorize: {
				test: function(data) {
					Tools.writelog('show_alipay_authorize 事件调用成功', data);
				}
			},
			request_api: {
				test: function(data) {
					Tools.writelog('request_api 事件调用成功', data);
				}
			},
			behavior_set: {
				test: function(data) {
					Tools.writelog('behavior_set 事件调用成功', data);
				}
			},
			create_shortcut: {
				test: function(data) {
					Tools.writelog('create_shortcut 事件调用成功', data);
				}
			},
			open_eye_cool_face: {
				test: function(data) {
					Tools.writelog('open_eye_cool_face 事件调用成功', data);
				}
			},
			open_JXCCB_powerEnter: {
				test: function(data) {
					Tools.writelog('open_JXCCB_powerEnter 事件调用成功', data);
				}
			},
			get_step_count: {
				test: function(data) {
					Tools.writelog('get_step_count 事件调用成功', data);
				}
			}
		},
		synCheck: function(key) {},
		register: function(event, callback, once, timeoutcount, exclusive) {
			once = once === false ? '' : '_once';
			exclusive = exclusive ? '_exclusive' : '';
			if (!(Core.events[event] && Core.events[event])) {
				return false;
			}
			var key = event + Tools.random() + once + exclusive;
			if (timeoutcount) {
				var _timeout_fn = timeout(function() {
					var error = {
						code: 5,
						msg: event + ' 回调事件超时，请检查是否正确客户端或客户端方法是否实现',
						data: {
							'method': event
						}
					};
					Tools.setError(error);
					cloudplate.trigger(event, {
						success: '0',
						code: 5,
						msg: '回调超时'
					});
				}, timeoutcount);
				Core.timeoutKeys[key] = _timeout_fn;
			}
			Core.events[event][key] = callback;
			return key;
		},
		remove: function(key, event) {
			if (Core.events[event][key]) {
				Core.clearTimeoutKey(key);
				Core.events[event][key] = null;
			}
		},
		trigger: function(event, json_data, callback, event_unique_key) {
			if (!(Core.events && Core.events[event] && Core.events[event] !== {})) {
				return false;
			}
			try {
				if (typeof json_data == 'string') {
					var data = JSON.parse(json_data);
				} else {
					var data = json_data;
				}
			} catch (e) {
				var data = json_data;
			}
			try {
				if (data._cp_event && typeof data._cp_event === 'string') {
					data._cp_event = JSON.parse(data._cp_event);
				}
			} catch (e) {}
			if (data._cp_event && data._cp_event[event]) {
				event_unique_key = data._cp_event[event][0];
			}
			event_unique_key = event_unique_key ? event_unique_key : '';
			if (typeof(data) == 'object' && data.hasOwnProperty('error') && data.error !== 0 && data.error !== '0') {
				Tools.setError({
					code: 106,
					msg: '网络出错',
					data: data
				});
			}
			data = Tools.eventPatch(event, data);
			var error_key = '';
			try {
				for (var index in Core.events[event]) {
					error_key = index;
					if (typeof Core.events[event][index] !== 'function') {
						continue;
					}
					if ((event_unique_key && event_unique_key == index) || (!event_unique_key && !index.indexOf('_exclusive') != -1)) {
						var callback_handle = Core.events[event][index];
						Core.clearTimeoutKey(index);
						var result = callback_handle(data);
						if (typeof callback == 'function') {
							callback(result, data);
						}
						if (index && index.indexOf('_once') != -1) {
							Core.events[event][index] = null;
						}
					}
				}
			} catch (e) {
				Core.clearTimeoutKey(error_key);
				Tools.writelog('Error name:', e.name + '(' + event + ':' + error_key + ')');
				Tools.writelog('Error ', e.message);
				Tools.writelog('Error detail', e);
				Tools.setError({
					code: 102,
					msg: e.name,
					data: e
				});
			}
		},
		clearTimeoutKey: function(eventKey) {
			if (typeof Core.timeoutKeys[eventKey] == 'number') {
				clearTimeout(Core.timeoutKeys[eventKey]);
				Core.timeoutKeys[eventKey] = null;
			} else if (typeof Core.timeoutKeys[eventKey] == 'object' && Core.timeoutKeys[eventKey] && Core.timeoutKeys[eventKey].value) {
				clearTimeout(Core.timeoutKeys[eventKey].value);
				var relations = Core.timeoutKeys[eventKey]['relations'];
				Core.timeoutKeys[eventKey] = null;
				for (var index in relations) {
					Core.clearTimeoutKey(index);
				}
			}
		},
		addTimeoutRelation: function(event, relation_event) {
			var index = '';
			if (typeof Core.timeoutKeys[event] == 'number') {
				var key = Core.timeoutKeys[event];
				Core.timeoutKeys[event] = {
					value: key,
					relations: {}
				};
				if (typeof Core.timeoutKeys[relation_event] == 'number') {
					index = Core.timeoutKeys[relation_event];
				} else if (typeof Core.timeoutKeys[relation_event] == 'object') {
					index = Core.timeoutKeys[relation_event].value;
				}
				if (index && Core.timeoutKeys[relation_event]) {
					Core.timeoutKeys[event]['relations'][relation_event] = index;
				}
			} else if (typeof Core.timeoutKeys[event] == 'object') {
				if (typeof Core.timeoutKeys[relation_event] == 'number') {
					index = Core.timeoutKeys[relation_event];
				} else if (typeof Core.timeoutKeys[relation_event] == 'object') {
					index = Core.timeoutKeys[relation_event].value;
				}
				if (index && Core.timeoutKeys[relation_event]) {
					Core.timeoutKeys[event]['relations'][relation_event] = index;
				}
			}
		},
		loadCallbackFunctions: function(key, fn) {
			var name = key + Tools.random();
			Core.callbackFunctions[name] = fn;
			return 'CP._core.callbackFunctions.' + name;
		},
	};
	var CallService = function(initcallback) {
		var default_options = {
			is_ready: false,
			is_ready_done: false,
			debug: _cp_config.debug,
			es6Require: false,
			ydunOptions: {},
			wxOption: {},
			ready: null,
			shake: function() {},
			close: function() {},
			error: function(data) {}
		};
		var require_configs = {
			'JSON.stringify': {
				options: {
					is_activity: true,
				},
				optionkey: 'ready',
				source: [_cp_config.common_file_path + 'lib/json_parse_state.min.js', _cp_config.common_file_path + 'lib/json_parse.min.js', _cp_config.common_file_path + 'lib/json2.min.js'],
				require_callback: function(options) {
					return true;
				}
			},
			'Math.min': {
				options: {
					is_activity: true,
				},
				optionkey: 'ready',
				source: [_cp_config.common_file_path + 'lib/math.min.js'],
				require_callback: function(options) {
					return true;
				}
			},
			'Array.of': {
				options: {
					is_activity: false,
				},
				optionkey: 'es6Require',
				source: [_cp_config.common_file_path + 'lib/es6-shim.min.js'],
				require_callback: function(options) {
					return true;
				}
			},
			'VConsole': {
				options: {
					is_activity: false,
				},
				optionkey: 'debug',
				source: [_cp_config.common_file_path + 'lib/vconsole.min.js'],
				require_callback: function(options) {
					var vConsole = new VConsole();
					setTimeout(function() {
						Tools.writelog('window', window.location.href);
						Tools.writelog('userAgent', navigator.userAgent.toLowerCase());
					}, 3000);
					return true;
				}
			},
			'initWatchman': {
				options: {
					is_activity: false,
					productNumber: '',
					protocol: '',
					auto: '',
					onload: '',
					onerror: '',
				},
				optionkey: 'ydunOptions',
				source: [_cp_config.yun_dun_url.url],
				require_callback: function(options) {
					return true;
				}
			}
		};
		var optionLoadEvent = function(data, event, key) {
			var f_data = {};
			if (typeof(data) == 'string' && data.indexOf("{") === 0) {
				try {
					f_data = JSON.parse(data);
				} catch (e) {
					Tools.setError({
						code: 101,
						msg: e.name,
						data: e
					});
					return data;
				}
			} else if (typeof(data) == 'object') {
				f_data = data;
			}
			if (!f_data.hasOwnProperty('_cp_event')) {
				f_data['_cp_event'] = {};
			}
			if (!f_data._cp_event.hasOwnProperty(event)) {
				f_data._cp_event[event] = [];
			}
			f_data['_cp_event'][event].push(key);
			return f_data;
		};
		var filterParams = function(callback, once, data, cancelcallback, stopcallback) {
			if (typeof callback === 'object') {
				return callback;
			}
			var result = {};
			if (typeof data === 'string' && data.length > 0) {
				result = JSON.parse(data);
			} else if (typeof data === 'object') {
				result = data;
			}
			if (typeof result !== 'object') {
				result = {};
			}
			typeof callback === 'function' ? result['completed'] = callback : '';
			result['once'] = once;
			typeof cancelcallback === 'function' ? result['cancel'] = cancelcallback : '';
			typeof stopcallback === 'function' ? result['stop'] = stopcallback : '';
			return result;
		};
		try {
			var apis = {
				_params: {},
				_options: {},
				_driver: {
					delegate: function(key, data, client_info) {
						if (!apis._params.count) {
							apis._params['count'] = 1;
						}
						if (apis && apis._options && !apis._options.is_ready_done && (apis._params.count && apis._params.count < 10)) {
							setTimeout(function() {
								apis._params.count++;
								CP && CP._driver && CP._driver.delegate(key, data, client_info);
							}, 200);
						}
						if (apis._params.count >= 10) {
							Tools.setError({
								code: 4,
								msg: 'js未完全加载，请刷新页面',
								data: ''
							});
						}
					},
					init: function() {}
				},
				_core: Core,
				_request: Request,
				_jsonpCallback: function(data) {
					Core.trigger('sys_jsonp', data);
				},
				_init: function() {
					var api = this;
					if (!api.start || api.start !== 1) {
						Tools.setError({
							code: '6',
							msg: 'CP 对象重复加载',
							data: ''
						});
						return;
					}
					api.start++;

					function initDriver() {
						Driver(function(driver, client_info) {
							api._driver = driver;
							if (client_info.client_code) {
								client_info.client_code = client_info.client_code.toLowerCase();
							}
							api._driver['client_info'] = client_info;
							console.log('client_info', client_info);
							if (api._options.ready && typeof(api._options.ready) == 'function' && api._options && !api._options.is_ready) {
								api._options.is_ready = true;
								Core.trigger('sys_is_init', client_info, function() {
									api._options.is_ready_done = true;
								});
							}
						});
					}

					function loadRequire(options, config) {
						for (var index in config) {
							var is_activity = config[index]['options']['is_activity'];
							var optionkey = config[index]['optionkey'];
							if (options.hasOwnProperty(optionkey)) {
								if ('boolean' == typeof(options[optionkey])) {
									is_activity = options[optionkey];
								} else if ('object' != typeof(options[optionkey])) {
									config[index]['options'] = options[optionkey];
								}
								is_activity = (options[optionkey].hasOwnProperty('is_activity') ? options[optionkey]['is_activity'] : is_activity);
								config[index]['options']['is_activity'] = is_activity;
							}
						}
						return config;
					}
					Request.loadContext(loadRequire(api._options, require_configs), function() {
						Core.register('sys_is_init', api._ready, true, 10000);
						initDriver();
					});
				},
				_ready: function(data) {
					if (!apis._driver) {
						return;
					}
					var load_resource = [];
					apis._driver.init(apis._options, data);
				},
				tools: Tools,
				ready: function(options) {
					var api = this;
					for (var index in default_options) {
						if (options.hasOwnProperty(index)) {
							this._options[index] = options[index];
						} else {
							this._options[index] = default_options[index];
						}
					}
					api._init();
				},
				getVersion: function() {
					return _cp_config.version;
				},
				filterUrl: function(url) {
					return this._driver.filterUrl(url);
				},
				getUniqueId: function(callback, once, data) {
					data = filterParams(callback, once, data);
					var key = this._core.register('get_unique_id', data.completed, data.once, data.timeout);
					data = optionLoadEvent(data, 'get_unique_id', key);
					this._driver.delegate('get_unique_id', data, this._driver['client_info']);
				},
				getAccountId: function(callback, once, data) {
					data = filterParams(callback, once, data);
					var key = this._core.register('get_account_id', data.completed, data.once, data.timeout);
					data = optionLoadEvent(data, 'get_account_id', key);
					this._driver.delegate('get_account_id', data, this._driver['client_info']);
				},
				getClientInfo: function(callback, once, data) {
					data = filterParams(callback, once, data);
					var client_info = {
						client_code: '',
						version: '',
						versionName: '',
						detail: ''
					};
					var key = this._core.register('get_client_info', data.completed, data.once, data.timeout);
					data = optionLoadEvent(data, 'get_client_info', key);
					this._driver.delegate('get_client_info', data, this._driver['client_info']);
				},
				getDeviceInfo: function(callback, once, data) {
					data = filterParams(callback, once, data);
					var key = this._core.register('get_device_info', data.completed, data.once, data.timeout);
					data = optionLoadEvent(data, 'get_device_info', key);
					this._driver.delegate('get_device_info', data, this._driver['client_info']);
				},
				isLogin: function(callback, once, data) {
					data = filterParams(callback, once, data);
					var key = this._core.register('is_login', data.completed, data.once, data.timeout);
					data = optionLoadEvent(data, 'is_login', key);
					this._driver.delegate('is_login', data, this._driver['client_info']);
				},
				showLogin: function(callback, once, data) {
					data = filterParams(callback, once, data);
					var key = this._core.register('reset', data.completed, data.once, data.timeout);
					data = optionLoadEvent(data, 'reset', key);
					this._driver.delegate('show_login', data, this._driver['client_info']);
				},
				getCssMode: function(callback, once, data) {
					data = filterParams(callback, once, data);
					var key = this._core.register('mode_change', data.completed, data.once, data.timeout);
					data = optionLoadEvent(data, 'mode_change', key);
					this._driver.delegate('get_css_mode', data, this._driver['client_info']);
				},
				showShare: function(callback, once, data) {
					data = filterParams(callback, once, data);
					var key = this._core.register('get_share_result', data.completed, data.once, data.timeout);
					data = optionLoadEvent(data, 'get_share_result', key);
					this._driver.delegate('show_share', data, this._driver['client_info']);
				},
				getLocationInfo: function(callback, once, data) {
					data = filterParams(callback, once, data);
					var key = this._core.register('address_change', data.completed, data.once, data.timeout);
					data = optionLoadEvent(data, 'address_change', key);
					this._driver.delegate('get_location_info', data, this._driver['client_info']);
				},
				getCustomerInfo: function(callback, once, data) {
					data = filterParams(callback, once, data);
					var key = this._core.register('get_customer_info', data.completed, data.once, data.timeout);
					data = optionLoadEvent(data, 'get_customer_info', key);
					this._driver.delegate('get_customer_info', data, this._driver['client_info']);
				},
				getDownloadInfo: function(callback, once, data) {
					data = filterParams(callback, once, data);
					var key = this._core.register('get_download_info', data.completed, data.once, data.timeout);
					data = optionLoadEvent(data, 'get_download_info', key);
					this._driver.delegate('get_download_info', data, this._driver['client_info']);
				},
				getIp: function(callback, once, data) {
					data = filterParams(callback, once, data);
					var key = this._core.register('get_ip', data.completed, data.once, data.timeout);
					data = optionLoadEvent(data, 'get_ip', key);
					this._driver.delegate('get_ip', data, this._driver['client_info']);
				},
				getImage: function(callback, once, data) {
					data = filterParams(callback, once, data);
					var key = this._core.register('get_image', data.completed, data.once, data.timeout);
					data = optionLoadEvent(data, 'get_image', key);
					this._driver.delegate('get_image', data, this._driver['client_info']);
				},
				getVoice: function(callback, once, data) {
					data = filterParams(callback, once, data);
					var key = this._core.register('get_voice', data.completed, data.once, data.timeout);
					data = optionLoadEvent(data, 'get_voice', key);
					this._driver.delegate('get_voice', data, this._driver['client_info']);
				},
				startVoice: function(callback, cancelcallback, stopcallback, once, data) {
					data = filterParams(callback, once, data, cancelcallback, stopcallback);
					var key_start = this._core.register('start_voice', data.completed, data.once, data.timeout);
					var key_get = this._core.register('get_voice', data.stop ? data.stop : data.completed, data.once, data.timeout);
					var stop_key = this._core.register('stop_voice', data.stop ? data.stop : data.completed, data.once, data.timeout);
					var apis_temp = this;
					this._core.addTimeoutRelation(stop_key, key_get);
					this._core.addTimeoutRelation(key_get, stop_key);
					data = optionLoadEvent(data, 'start_voice', key_start);
					data = optionLoadEvent(data, 'stop_voice', stop_key);
					data = optionLoadEvent(data, 'get_voice', key_get);
					this._params.recording_key = stop_key;
					if (data && data.maxtime) {
						this._params.setTimeout_start_voice = setTimeout(function() {
							apis_temp._driver.delegate('stop_voice', data, this._driver['client_info']);
						}, data.maxtime);
					}
					this._driver.delegate('start_voice', data, this._driver['client_info']);
				},
				stopVoice: function(callback, once, data) {
					data = filterParams(callback, once, data);
					this._core.remove(this._params.recording_key, 'stop_voice');
					if (this._params && this._params.setTimeout_start_voice && typeof(this._params.setTimeout_start_voice) == 'number') {
						clearTimeout(this._params.setTimeout_start_voice);
					}
					var key = this._core.register('stop_voice', data.completed, data.once, data.timeout);
					data = optionLoadEvent(data, 'stop_voice', key);
					this._driver.delegate('stop_voice', data, this._driver['client_info']);
				},
				getVideo: function(callback, once, data) {
					data = filterParams(callback, once, data);
					var key = this._core.register('get_video', data.completed, data.once, data.timeout);
					data = optionLoadEvent(data, 'get_video', key);
					this._driver.delegate('get_video', data, this._driver['client_info']);
				},
				showScanQr: function(callback, once, data) {
					data = filterParams(callback, once, data);
					var key = this._core.register('get_scan_qr', data.completed, data.once, data.timeout);
					data = optionLoadEvent(data, 'get_scan_qr', key);
					this._driver.delegate('get_scan_qr', data, this._driver['client_info']);
				},
				searchBeacons: function(callback, once, data) {
					data = filterParams(callback, once, data);
					var key = this._core.register('search_beacons', data.completed, data.once, data.timeout);
					data = optionLoadEvent(data, 'search_beacons', key);
					this._driver.delegate('search_beacons', data, this._driver['client_info']);
				},
				fileUpload: function(callback, once, data) {
					data = filterParams(callback, once, data);
					var key = this._core.register('file_upload', data.completed, data.once, data.timeout);
					if (data.filename && typeof(data.filename) == 'string' && data.filename.indexOf('.') === -1) {
						var index1 = data.localfile.lastIndexOf(".");
						var index2 = data.localfile.length;
						var type = data.localfile.substring(index1, index2);
						data.filename = data.filename + type;
					}
					data = optionLoadEvent(data, 'file_upload', key);
					this._driver.delegate('file_upload', data, this._driver['client_info']);
				},
				setData: function(callback, once, data) {
					data = filterParams(callback, once, data);
					var key = this._core.register('set_data', data.completed, data.once, data.timeout);
					data = optionLoadEvent(data, 'set_data', key);
					this._driver.delegate('set_data', data, this._driver['client_info']);
				},
				getData: function(callback, once, data) {
					data = filterParams(callback, once, data);
					var key = this._core.register('get_data', data.completed, data.once, data.timeout);
					data = optionLoadEvent(data, 'get_data', key);
					this._driver.delegate('get_data', data, this._driver['client_info']);
				},
				setShare: function(callback, once, data) {
					data = filterParams(callback, once, data);
					var key = this._core.register('set_share', data.completed, data.once, data.timeout);
					var key_get = this._core.register('set_share_success', data.success, false, data.timeout);
					data = optionLoadEvent(data, 'set_share', key);
					data = optionLoadEvent(data, 'set_share_success', key_get);
					this._driver.delegate('set_share', data, this._driver['client_info']);
				},
				authValidate: function(options) {},
				playVoice: function(callback, once, options) {
					if (!options['address']) {
						return false;
					}
					var eleId = '';
					if (options['eleId']) {
						eleId = options['eleId'];
					}
					options = filterParams(callback, once, options);
					if (this._driver.driver_params && this._driver.driver_params.client_code == 'wx') {
						var key = this._core.register('play_voice', options.completed, options.once, options.timeout);
						options = optionLoadEvent(options, 'play_voice', key);
						this._driver.delegate('play_voice', options, this._driver['client_info']);
						return;
					} else if (this._driver.driver_params && this._driver.driver_params.client_code == 'jxrb') {
						var key = this._core.register('play_voice', options.completed, options.once, options.timeout);
						options = optionLoadEvent(options, 'play_voice', key);
						this._driver.delegate('play_voice', options, this._driver['client_info']);
						return;
					}
					if (!typeof(options.address) == 'string' || !/^(http|https):\/\/$/gi.test(options.address)) {
						return;
					}
					if (!options['eleId']) {
						eleId = this.tools.createAudioElement();
					}
					var audio = document.getElementById(eleId);
					audio.src = options['address'];
					audio.play();
					if (typeof(options['onPlayEnd']) === 'function') {
						var is_playFinish = setInterval(function() {
							if (audio.ended) {
								options['onPlayEnd']({
									'eleId': eleId
								});
								window.clearInterval(is_playFinish);
							}
						}, 10);
					}
					options.completed({
						'eleId': eleId
					});
					return eleId;
				},
				pausePlayVoice: function(callback, once, options) {
					options = filterParams(callback, once, options);
					if (this._driver.driver_params && this._driver.driver_params.client_code == 'wx') {
						var key = this._core.register('pause_play_voice', options.completed, options.once, options.timeout);
						options = optionLoadEvent(options, 'pause_play_voice', key);
						this._driver.delegate('pause_play_voice', options, this._driver['client_info']);
						return;
					} else if (this._driver.driver_params && this._driver.driver_params.client_code == 'jxrb') {
						var key = this._core.register('pause_play_voice', options.completed, options.once, options.timeout);
						options = optionLoadEvent(options, 'pause_play_voice', key);
						this._driver.delegate('pause_play_voice', options, this._driver['client_info']);
						return;
					}
					var audio = document.getElementById(options['eleId']);
					audio.pause();
					if (options['remove']) {
						audio.parentNode.removeChild(audio);
					}
					options.completed({
						'eleId': options['eleId']
					});
				},
				stopPlayVoice: function(callback, once, options) {
					options = filterParams(callback, once, options);
					if (this._driver.driver_params && this._driver.driver_params.client_code == 'wx') {
						var key = this._core.register('stop_play_voice', options.completed, options.once, options.timeout);
						options = optionLoadEvent(options, 'stop_play_voice', key);
						this._driver.delegate('stop_play_voice', options, this._driver['client_info']);
						return;
					} else if (this._driver.driver_params && this._driver.driver_params.client_code == 'jxrb') {
						var key = this._core.register('stop_play_voice', options.completed, options.once, options.timeout);
						options = optionLoadEvent(options, 'stop_play_voice', key);
						this._driver.delegate('stop_play_voice', options, this._driver['client_info']);
						return;
					}
					if (options.eleId) {
						var audio = document.getElementById(options['eleId']);
						audio.pause();
						audio.src = '';
						if (options['remove']) {
							audio.parentNode.removeChild(audio);
						}
						options.completed({
							'eleId': options['eleId']
						});
					}
				},
				closePage: function(callback, once, options) {
					options = filterParams(callback, once, options);
					this._driver.delegate('close', options, this._driver['client_info']);
				},
				urlRedirect: function(options) {
					this._driver.delegate('url_redirect', options, this._driver['client_info']);
				},
				bindMobile: function(callback, once, options) {
					options = filterParams(callback, once, options);
					var key = this._core.register('bindmobile', options.completed, options.once, options.timeout);
					options = optionLoadEvent(options, 'bindmobile', key);
					this._driver.delegate('bindmobile', options, this._driver['client_info']);
				},
				isBindMobile: function(callback, once, options) {
					options = filterParams(callback, once, options);
					var key = this._core.register('is_bindmobile', options.completed, options.once, options.timeout);
					options = optionLoadEvent(options, 'is_bindmobile', key);
					this._driver.delegate('is_bindmobile', options, this._driver['client_info']);
				},
				redpacketOpenSuccess: function(callback, once, options) {
					options = filterParams(callback, once, options);
					var key = this._core.register('redpacket_open_success', options.completed, options.once, options.timeout);
					options = optionLoadEvent(options, 'redpacket_open_success', key);
					this._driver.delegate('redpacket_open_success', options, this._driver['client_info']);
				},
				showModifyMobile: function(callback, once, options) {
					options = filterParams(callback, once, options);
					var key = this._core.register('modify_mobile', options.completed, options.once, (options.timeout ? options.timeout : 300000));
					options = optionLoadEvent(options, 'modify_mobile', key);
					this._driver.delegate('show_modify_mobile', options, this._driver['client_info']);
				},
				openInApp: function(callback, once, options) {
					options = filterParams(callback, once, options);
					var key = this._core.register('open_in_app', options.completed, options.once, options.timeout);
					options = optionLoadEvent(options, 'open_in_app', key);
					this._driver.delegate('open_in_app', options, this._driver['client_info']);
				},
				ydunInit: function(callback, once, options) {
					options = filterParams(callback, once, options);
					var option = this._options;
					var product_number = options.product_number ? options.product_number : option.product_number;
					console.log('ydun_options', options);
					var timer = null;
					var counter = 0;
					var init = function() {
						counter++;
						if (counter >= 20) {
							return;
						}
						if (typeof(initWatchman) != 'function') {
							timer = timeout(init, 100);
							return;
						}
						timer = null;
						console.log('ydun_product_number', product_number);
						console.log('option.protocol', option.protocol);
						console.log('option', option);
						var config = {
							productNumber: product_number,
							protocol: option.protocol ? option.protocol : 'https',
							auto: option.hasOwnProperty('auto') ? option.auto : true,
							onload: function(instance) {
								console.log('initWatchman success');
								Tools._ydun = instance;
								options.completed({
									success: '1'
								});
							},
							onerror: function(err) {
								Tools.setError({
									code: '2001',
									msg: err.message,
									data: err
								});
							}
						};
						console.log('config', config);
						initWatchman(config);
					};
					if (typeof(initWatchman) != 'function') {
						timer = timeout(init, 100);
					} else {
						init();
					}
				},
				ydunStart: function(callback, once, options) {
					options = filterParams(callback, once, options);
					var key = this._core.register('ydun_start', options.completed, options.once, options.timeout);
					var _this = this;
					var timer = null;
					var counter = 0;
					var run_ydun = function() {
						counter++;
						if (counter >= 10) {
							_this._core.trigger('ydun_start', {
								success: '0'
							});
							return;
						}
						if (!Tools._ydun) {
							timer = timeout(this, 100);
							return;
						}
						timer = null;
						Tools._ydun.start();
						_this._core.trigger('ydun_start', {
							success: '1'
						});
					};
					if (Tools._ydun) {
						Tools._ydun.start();
						_this._core.trigger('ydun_start', {
							success: '1'
						});
					} else {
						counter++;
						timer = timeout(run_ydun, 100);
					}
				},
				ydunStop: function(callback, once, options) {
					options = filterParams(callback, once, options);
					var key = this._core.register('ydun_start', options.completed, options.once, options.timeout);
					var _this = this;
					var timer = null;
					var counter = 0;
					var run_ydun = function() {
						counter++;
						if (counter >= 10) {
							_this._core.trigger('ydun_stop', {
								success: '0'
							});
							return;
						}
						if (!Tools._ydun) {
							timer = timeout(this, 100);
							return;
						}
						timer = null;
						Tools._ydun.stop();
						_this._core.trigger('ydun_stop', {
							success: '1'
						});
					};
					if (Tools._ydun) {
						Tools._ydun.stop();
						_this._core.trigger('ydun_stop', {
							success: '1'
						});
					} else {
						counter++;
						timer = timeout(run_ydun, 100);
					}
				},
				ydunGetToken: function(callback, once, options) {
					options = filterParams(callback, once, options);
					var key = this._core.register('ydun_get_token', options.completed, options.once, options.timeout);
					var _this = this;
					options.business_id = options.business_id ? options.business_id : '1';
					var timer = null;
					var counter = 0;
					var run_ydun = function() {
						counter++;
						if (counter >= 10) {
							_this._core.trigger('ydun_get_token', {
								success: '0',
								token: ''
							});
							return;
						}
						if (!Tools._ydun) {
							timer = timeout(run_ydun, 100);
							return;
						}
						Tools._ydun.getToken(options.business_id, function(data) {
							_this._core.trigger('ydun_get_token', {
								success: '1',
								token: data
							});
						});
					};
					if (Tools._ydun) {
						run_ydun();
					} else {
						counter++;
						timer = timeout(run_ydun, 100);
					}
				},
				checkWxJsApi: function(options) {
					var key = this._core.register('check_wx_js_api', options.completed, options.once, options.timeout);
					options = optionLoadEvent(options, 'check_wx_js_api', key);
					this._driver.delegate('check_wx_js_api', options, this._driver['client_info']);
				},
				wxDownloadImage: function(options) {
					var key = this._core.register('download_image', options.completed, options.once, options.timeout);
					options = optionLoadEvent(options, 'download_image', key);
					this._driver.delegate('download_image', options, this._driver['client_info']);
				},
				wxGetLocalImgData: function(options) {
					var key = this._core.register('get_local_img_data', options.completed, options.once, options.timeout);
					options = optionLoadEvent(options, 'get_local_img_data', key);
					this._driver.delegate('get_local_img_data', options, this._driver['client_info']);
				},
				wxDownloadVoice: function(options) {
					var key = this._core.register('download_voice', options.completed, options.once, options.timeout);
					options = optionLoadEvent(options, 'download_voice', key);
					this._driver.delegate('download_voice', options, this._driver['client_info']);
				},
				wxTranslateVoice: function(options) {
					var key = this._core.register('translate_voice', options.completed, options.once, options.timeout);
					options = optionLoadEvent(options, 'translate_voice', key);
					this._driver.delegate('translate_voice', options, this._driver['client_info']);
				},
				getNetworkType: function(options) {
					var key = this._core.register('get_network_type', options.completed, options.once, options.timeout);
					options = optionLoadEvent(options, 'get_network_type', key);
					this._driver.delegate('get_network_type', options, this._driver['client_info']);
				},
				openLocation: function(options) {
					var key = this._core.register('open_location', options.completed, options.once, options.timeout);
					options = optionLoadEvent(options, 'open_location', key);
					this._driver.delegate('open_location', options, this._driver['client_info']);
				},
				wxStartSearchBeacons: function(options) {
					var key = this._core.register('start_search_beacons', options.completed, options.once, options.timeout);
					options = optionLoadEvent(options, 'start_search_beacons', key);
					this._driver.delegate('start_search_beacons', options, this._driver['client_info']);
				},
				wxStopSearchBeacons: function(options) {
					var key = this._core.register('stop_search_beacons', options.completed, options.once, options.timeout);
					options = optionLoadEvent(options, 'stop_search_beacons', key);
					this._driver.delegate('stop_search_beacons', options, this._driver['client_info']);
				},
				wxOnSearchBeacons: function(options) {
					var key = this._core.register('on_search_beacons', options.completed, options.once, options.timeout);
					options = optionLoadEvent(options, 'on_search_beacons', key);
					this._driver.delegate('on_search_beacons', options, this._driver['client_info']);
				},
				wxHideMenuItems: function(options) {
					var key = this._core.register('hide_menu_items', options.completed, options.once, options.timeout);
					options = optionLoadEvent(options, 'hide_menu_items', key);
					this._driver.delegate('hide_menu_items', options, this._driver['client_info']);
				},
				wxShowMenuItems: function(options) {
					var key = this._core.register('show_menu_items', options.completed, options.once, options.timeout);
					options = optionLoadEvent(options, 'show_menu_items', key);
					this._driver.delegate('show_menu_items', options, this._driver['client_info']);
				},
				wxHideAllNonBaseMenuItem: function(options) {
					var key = this._core.register('hide_all_non_base_menu_item', options.completed, options.once, options.timeout);
					options = optionLoadEvent(options, 'hide_all_non_base_menu_item', key);
					this._driver.delegate('hide_all_non_base_menu_item', options, this._driver['client_info']);
				},
				wxShowAllNonBaseMenuItem: function(options) {
					var key = this._core.register('show_all_non_base_menu_item', options.completed, options.once, options.timeout);
					options = optionLoadEvent(options, 'show_all_non_base_menu_item', key);
					this._driver.delegate('show_all_non_base_menu_item', options, this._driver['client_info']);
				},
				wxOpenProductSpecificView: function(options) {
					var key = this._core.register('open_product_specific_view', options.completed, options.once, options.timeout);
					options = optionLoadEvent(options, 'open_product_specific_view', key);
					this._driver.delegate('open_product_specific_view', options, this._driver['client_info']);
				},
				wxChooseCard: function(options) {
					var key = this._core.register('choose_card', options.completed, options.once, options.timeout);
					options = optionLoadEvent(options, 'choose_card', key);
					this._driver.delegate('choose_card', options, this._driver['client_info']);
				},
				wxAddCard: function(options) {
					var key = this._core.register('add_card', options.completed, options.once, options.timeout);
					options = optionLoadEvent(options, 'add_card', key);
					this._driver.delegate('add_card', options, this._driver['client_info']);
				},
				wxOpenCard: function(options) {
					var key = this._core.register('open_card', options.completed, options.once, options.timeout);
					options = optionLoadEvent(options, 'open_card', key);
					this._driver.delegate('open_card', options, this._driver['client_info']);
				},
				wxChooseWXPay: function(options) {
					var key = this._core.register('choose_wx_pay', options.completed, options.once, options.timeout);
					options = optionLoadEvent(options, 'choose_wx_pay', key);
					this._driver.delegate('choose_wx_pay', options, this._driver['client_info']);
				},
				openAddress: function(options) {
					var key = this._core.register('open_address', options.completed, options.once, options.timeout);
					options = optionLoadEvent(options, 'open_address', key);
					this._driver.delegate('open_address', options, this._driver['client_info']);
				},
				modifyDeliveryName: function(options) {
					var key = this._core.register('modify_delivery_name', options.completed, options.once, options.timeout);
					options = optionLoadEvent(options, 'modify_delivery_name', key);
					this._driver.delegate('modify_delivery_name', options, this._driver['client_info']);
				},
				defineMenu: function(options) {
					var key = this._core.register('define_menu', options.completed, options.once, options.timeout);
					options = optionLoadEvent(options, 'define_menu', key);
					this._driver.delegate('define_menu', options, this._driver['client_info']);
				},
				convertVideo: function(options) {
					var key = this._core.register('convert_video', options.completed, options.once, options.timeout);
					options = optionLoadEvent(options, 'convert_video', key);
					this._driver.delegate('convert_video', options, this._driver['client_info']);
				},
				checkJsApi: function(options) {
					var key = this._core.register('check_js_api', options.completed, options.once, options.timeout);
					options = optionLoadEvent(options, 'check_js_api', key);
					this._driver.delegate('check_js_api', options, this._driver['client_info']);
				},
				selectMedia: function(options) {
					var key = this._core.register('select_media', options.completed, options.once, options.timeout);
					options = optionLoadEvent(options, 'select_media', key);
					this._driver.delegate('select_media', options, this._driver['client_info']);
				},
				subscribeEvent: function(options) {
					var setCompleted = '',
						callbackSuccess = '';
					if (options.success && options.completed) {
						setCompleted = options.completed;
						callbackSuccess = options.success;
					} else if (!options.success && options.completed) {
						setCompleted = '';
						callbackSuccess = options.completed;
					}
					var key = this._core.register('subscribe_event', callbackSuccess, options.once, null);
					var key_get = this._core.register('subscribe_set_event', setCompleted, options.once, null);
					options = optionLoadEvent(options, 'subscribe_event', key);
					options = optionLoadEvent(options, 'subscribe_set_event', key_get);
					this._driver.delegate('subscribe_event', options, this._driver['client_info']);
				},
				preview: function(options) {
					var key = this._core.register('preview', options.completed, true, options.timeout);
					options = optionLoadEvent(options, 'preview', key);
					this._driver.delegate('preview', options, this._driver['client_info']);
				},
				getArticleInfo: function(options) {
					var key = this._core.register('article_info', options.completed, true, options.timeout);
					options = optionLoadEvent(options, 'article_info', key);
					this._driver.delegate('article_info', options, this._driver['client_info']);
				},
				showAuthorize: function(options) {
					var key = this._core.register('show_authorize', options.completed, true, options.timeout);
					options = optionLoadEvent(options, 'show_authorize', key);
					this._driver.delegate('show_authorize', options, this._driver['client_info']);
				},
				showAlipayAuthorize: function(options) {
					var key = this._core.register('show_alipay_authorize', options.completed, true, options.timeout);
					options = optionLoadEvent(options, 'show_alipay_authorize', key);
					this._driver.delegate('show_alipay_authorize', options, this._driver['client_info']);
				},
				requestAPI: function(options) {
					var key = this._core.register('request_api', options.completed, true, options.timeout);
					options = optionLoadEvent(options, 'request_api', key);
					this._driver.delegate('request_api', options, this._driver['client_info']);
				},
				behaviorSet: function(options) {
					var key = this._core.register('behavior_set', options.completed, true, options.timeout);
					options = optionLoadEvent(options, 'behavior_set', key);
					this._driver.delegate('behavior_set', options, this._driver['client_info']);
				},
				createShortcut: function(options) {
					var key = this._core.register('create_shortcut', options.completed, true, options.timeout);
					options = optionLoadEvent(options, 'create_shortcut', key);
					this._driver.delegate('create_shortcut', options, this._driver['client_info']);
				},
				openEyeCoolFace: function(options) {
					var key = this._core.register('open_eye_cool_face', options.completed, true, options.timeout);
					options = optionLoadEvent(options, 'open_eye_cool_face', key);
					this._driver.delegate('open_eye_cool_face', options, this._driver['client_info']);
				},
				openJXCCBPowerEnter: function(options) {
					var key = this._core.register('open_JXCCB_powerEnter', options.completed, true, options.timeout);
					options = optionLoadEvent(options, 'open_JXCCB_powerEnter', key);
					this._driver.delegate('open_JXCCB_powerEnter', options, this._driver['client_info']);
				},
				getStepCount: function(options) {
					var key = this._core.register('get_step_count', options.completed, true, options.timeout);
					options = optionLoadEvent(options, 'get_step_count', key);
					this._driver.delegate('get_step_count', options, this._driver['client_info']);
				}
			};
			initcallback(apis);
		} catch (e) {
			Tools.writelog('Error name:', e.name);
			Tools.writelog('Error ', e.message);
			Tools.writelog('Error detail', e);
			Tools.setError({
				code: 103,
				msg: e.name,
				data: e
			});
		}
	};
	return CallService(initcallback);
});