/**
 * 脚本地址: https://raw.githubusercontent.com/yml2213/javascript/master/baiguan/baiguan.js
 * 转载请留信息,谢谢
 *
 * 百观  app (安卓最好下载  2.0.8 版本,ios随意)
 *
 * cron 10 6-22 * * *  yml2213_javascript_master/baiguan.js
 *
 *
 * 5-30		完成 签到  资讯阅读  分享资讯  资讯点赞  本地服务 任务
 *
 *
 * 感谢所有测试人员
 * ========= 青龙--配置文件 =========
 * 变量格式: export baiguan_data='X-SESSION-ID & X-REQUEST-ID @ X-SESSION-ID & X-REQUEST-ID'  多个账号用 换行 或 @分割
 * 
 * 抓包 vapp.tmuyun.com 这个域名 ,找到上面的变量即可
 *
 * tg频道: https://t.me/yml2213_tg  
 * tg群组: https://t.me/yml_tg    
 * qq频道: https://qun.qq.com/qqweb/qunpro/share?_wv=3&_wwv=128&appChannel=share&inviteCode=1W4InjV&appChannel=share&businessType=9&from=181074&biz=ka&shareSource=5
 * 
 */

var _0xod8 = 'jsjiami.com.v6', _0xod8_ = ['‮_0xod8'], _0x31a1 = [_0xod8, 'w73Cj8OLwpRz', 'ZTvCgg==', 'w5Anwqkt5Liz5YiA5Ymu6KGLQHzlprzotovCluKdl33kuLnlk7/CpOWMpOWbreafgOefve+9s8KQfA==', 'TBPCssOGwp8=', 'KmUZwrrmlYjplq3ot5Dor6bngarotLPCvsOD5aeC6LWhOuKcucKw5LmT5ZKgMuWMvOWZkeacvOedosOe', 'TcOYwrU=', 'w7onwqktw6jmlJHploLotafor5Xng6Xot5PClMKW5aSq6LW4wp/in5HCqOS4veWRr8OG5Y6H5ZqS5p6a5565FBo=', 'wrTCrw98CA==', 'w7vCn8Oad8Okw78efBk2U0hdLGhQwo1HbXrDjcObUg==', 'LGMNwq4=', 'wrApwrXDgDZxWHjDhEZ+A8OwwoXCoy/DvgLDhGLCiA==', 'wrHDnMOpcQ==', 'KGJ3w5rDgQ==', 'w6gpwqzDnQ==', 'wopiw4FawoA=', 'w67DlkwcZcKZS8KAw5TkuLXku5Dmt4forYvkvrHnl4gDwo9/wq7DlFhDCsOd', 'IMKxwrpvwpbnrZflip7DgFw=', 'f8KAwqwS', 'w4/CgDvDk2/DtA==', 'CsK96Iyt5b+Y56WZ5Yivwo4=', 'SsKUSDIpQcKjTTrCqllfa8OM', 'KXTDhcKl566X5Yquw641', 'eQAcwqzCqsOm', 'MsOX6I6F5b2B56Ws5YuEwpA=', 'JX1V', 'wr9ow6XCieetp+WItBE95aaH6LS8M+KcusK95Lmh5ZKkceWNjuWakeaeh+efoMOH', 'wrLCisOiTcKg', 'wrjCvMKiw5HDr8OkQcOucXVgw4TDjsOpwrXDgkHCrF5YwpnDuEvChMKXwrzCiw==', 'VClswq9B', '5peR56uj5Ymu6KKF', 'w5QcN0LCnw==', 'W8OPwo7Cgg==', 'wrkSLmIk', 'KEFLwpTCog==', 'KE0M', 'w4A2YQ==', 'wp3DhXrCgOaWh+epuuWJlOihhjvDluaIneWIjw==', 'w7onwqktw6jmlKbnqpnliLTooJJmwq3mir7liKk=', 'woTDhcKtw5M=', 'EUtdw6vDvg==', 'wpF1w71kwqvDjRx8FjXDvsOa', 'dBDCg8Kzwqc=', 'w7NxX8Oa5pag56mW5Yi+6KOhwp075aWw6LaAAOKdjjHkuYflk4HCqeWMhOWaj+aet+edpsKl', 'woXDtio=', 'w6vDg3V5F+aXhOeqreWKp+ijlFLCp+Wkhei2kSrinY1u5Lit5ZCHBOWNo+WYmOaeqeedmlXClA==', 'IEMfcA==', 'wqZ5JsOFw5LkvJTnlpvmnZflnp3mn7Pli6PDkcK6', 'wp3DjcKnw4wgSSVEw6o=', 'dcKvwowsUA==', 'I0zCvTQ=', 'BcOww6omwplIw5zCjhUHw5VrwqTDpksswrTCkMOhw4dPZ11iaXdULMKPwr9EwqzDssOHBMOeDMKgwp5vwrYC', '5pa66Za+6LW96Ky16Zu96K6t', 'w7sqV8KSwqU=', 'wpLDmMKFw5A=', 'wrrCisOSw5I=', 'wpxow64=', 'aCtC', 'w6vDg3V5F+aXs+mWtui3tOisk+mZreitvA7ClOWku+i0pG7in6dF5Lqu5ZKew5TljJzlmZ/mnZ7nnIzDqgU=', 'YMK7TsO/HA==', 'wpjDk8KCw7ts', 'w77CucKxw7bCiA==', 'ExPCsMOcw5Vyw6/DkMKPOcOKKcKrwpLCjE0Pw4w+VcOMw6XChsOfSg==', 'fkDDnhwp', 'Ljl/wrQAw5TCrcO6U8Oiw4I4w4rCsErDuATCpMO3B8Oiw6PCng==', 'w6McdsKmwpg=', 'w4sMwrbDpFQ=', 'wr8+GA==', 'KGTDl3rCj+WJqOS5mOi3rOiuuee7tOWmmuWOlknDiuWkqui3rB7in5hJ5LuR5ZOgYOWPjuWblOacvueciRs0', 'aTISwr7liqjkuoHotrroroznu57lpoHlj5nCrgzmi7/liaI=', 'NlLDoMKVw5rliIHkuLfot7HorZLnur/lp5rljpfDvMOQ5ou55Yqg', 'wqPCn8ODag==', 'AMKCLyYp', 'TivCkA==', 'XsOjw68q', 'w4fChgnDpmc=', 'Qy/ClsKzwro=', 'PcOHw6xH', 'wrTDn8KXw7lj', 'E8KsNcOmf2PChsKFWcKYw63Dois3HsKiVsK/', 'aDfCoMKBVw==', 'wpLDqcKtw508', 'OWFYw6nDqQ==', 'fsKUVQ==', 'AmTDl3rliqnku4XotrforIfnu4/lpZDljKxnUw==', 'WBPCtMOU', 'ai1Gw7BWw49/SsOZ', 'NHQN', 'aTISwr7mlJ7pl5Hotrrorozngr7otqIowrTmiLzlibA=', 'AUVdw7/DpeaUuOmUtOi2s+ith+eAhei3m0rDm+aIheWLrw==', 'w7DCmcKfw5HCqg==', 'wp91UAnmlYbplaLotIXorJzngLHotokLEuWmm+i0ljPinKdr5Lm75ZKgNeWMuuWbjuaduOeensOc', 'w6PCuW3DkgLmlIjpl4fotYvorq/ngJDot5k9KuWlrui0qcO+4p6rN+S5neWSqTrljaLlmY3mnJbnnrt2wq8=', 'WEnDkQMuHA==', 'FFTCtMKBwq5Xw51wR8OND8Kh', 'XcOOwpw=', 'W8KcRjsZWMK9dyzCokhQ', 'wofDlsKRw4UKfsOOWsKdCsKUw5Rnw4/Chg==', 'NSRYwr3ChC8LPw==', 'K8OPw6hdEA==', 'w7XCvMK7w5/CtcOkXQ==', 'ecKdeA==', 'wrfDmGfCnT3Cp34TPMOLMMKtwqLCs8K4wpjCtsKHFuWGhuaLnOWLpSg=', 'GcKCCBgcwrI=', 'w7Tku5Totozlj6nDq8K3UCRWVAMADXMwH8KfCTkgwp7DgA==', 'wqfku6LotqzljIYHwpMtwqJSwrPCk8Ozw5XDoMKfEVQpWTrCscKI', '44CUIEDDuXzDhuOAjwfovaXmmIjkvY7nm63otZXljaDml4nnu7fDlHbCnA==', 'dhLCuzvDlw==', 'OxfCskFnVDjDu8OcSgDDgT7CoAHlvrflpLXjga7nr5nCtA==', 'duS4qei1n+WMmuOCt8ObFsKFw5DCiMKUwrvDpcOtIcKVZhQI', 'IeS5sui0qeWMquOAvsKMw7PCsgzCkMKCYMKKw78CwqcGw63CuA==', '44Cxw5PCtzsXwpnjg6jDt+i8iOaYhuS9qOevtXI=', 'w7PotbfljojkvJvmgYjCjCPCqQ==', 'NWINwo7Djg==', 'fcKIwrYSTW1V', 'wrc+EcKf', 'w7MnwqI=', 'RcKRaMKuw4E=', 'R1vDrxxkDXjCo8KIEkPDgnDDokw=', 'dsKNwrEhSw==', 'U8KHLMO+GA==', 'fsKJDMODBQ==', '5L2D55el5p2p5Z6/5p2d5Yqk', 'KXIjexE=', 'FS9mw5zDoQ==', 'csKKwr4pQw==', 'FRrCt8KNw69Gw6B6QcO7BMKtwqzDosKxLhzCnn/Co8OMwoPDvXXDm1QLTi58w6w=', 'MsOYw61t', 'w6vCp8Ot', 'wpHCiiUBbg==', 'O3hKw5zDpg==', 'wp7DqcOAVig=', 'UDbCocOjwpc=', 'JGQFwrvnrbflipEkB+Wmjei0gg7inKVT5LiR5ZObH+WNseWanOaeluecsMKw', 'XCNZw43ChueuiOWIi8KSw53lppTotpzCtuKehMOg5LqK5ZOaZ+WOpuWbiOafiOednMOlwpE=', 'w4rDvsOX', 'O8OBw7hT5Lua5Yqg5Yi76KCEwqfDmeasmei/kuWHkeS6m8Kv', 'woMVf8KwwrPDu0zCgcO2', 'CvC7nJNvwpYFwo7mirHmnYbljpPCgy4=', 'O2FG', 'wrEkNlMYEQ==', 'w7nChMOkwodf5Luc5Yul5Yi+6KOnwpsO5q6t6Lyo5Yeg5LiEMQ==', 'RiXCgzs=', 'w7XCu8O+', 'w4jDuMOTwqpXwrZOw5/CgQ==', 'GvChvY7DhMOgH8Kz5omU5pyJ5Y2TU8O4', 'w5s0BEg=', 'wq44IA==', 'cBnDrHLDqwfCiAMWw5vCtQjDtcOR', 'YMKIRg==', 'IlAOYD/Cs8KUw5oO', 'UMKiIg==', 'VcOHRl/nrJbli6rClU4=', 'RcOWwqY4', 'JHAN', 'wrzDmsOufwMnw4LDh8Ok', 'JOadruetm+WKqynCjeWOpeetmeWKjOWWmg8=', 'DmQFwrsp56+f5YiuHcKc', 'EcKGEh4=', 'w54qcg==', 'bzFswrZww4/Cv8OyRA==', 'w7Tmn5Tnr5TliK7Dq8Km5Y+W562n5Ymb5ZeUHw==', '5b+h5aSodeesp+WIhw==', 'wqlfw4hJwoA=', 'wrbDksO5dQ==', 'TgHCtA==', 'YcKNwrwrSwZXwo7Dm0fDtsO3csOb', 'wokdaMK6', 'woTDhMKEw4d7fsOCXMKPIMKWwpN3w5Q=', 'wpZ1w6x8wr3DhBdAAw==', 'VsOJwonCjMOQw4gmwqTCrg==', 'Gn/DkMO2P+etj+WIi8KKw7c=', 'wpRmw71s', 'JOS6juWkjOS5vuWPg+evn+WIruS6ocKcC+aYoOWlgOWHvuafsuWSnhI=', 'wrwUGsK7aA==', 'YCVRw7o=', 'bsKSwr0BfnVNH8O2wqZXdcOrw5s=', 'WhvCrsOcwolvw4PDgcKUC8OCLw==', 'wqnCisOPw4c=', 'acKSwqw=', 'wpzDqijCgH3DjF18a8O2w6tueSs=', 'aTISwr7mlJ7pl5HotrrorozpmILorIcowrTov7fluYnDnQ==', 'wqh2LMKt', 'w6nCocOpwpp4w4Bxw7IK', 'LXNGw78=', 'w5TDosOE', 'wpgPecKpwrPDoUzCn8O4w5HCpDN0LQ==', 'wosVcsKywp/DvXLCmMO6w6PCrSk=', 'w4LDsMOEwqA=', 'IxRC', 'w5vClz/DkXXDvy1NeA==', 'w4Y3eMOsK+aWs+mXrei3lOisuOmbheisvMOuDei8ouW6nkc=', 'TsK+MQ==', 'wqJ+O8KnVG13w73Dsg==', 'CsK9wro=', 'JBRTw6jDn8OyVT7Ch8KkwqnDgT/CkA==', 'K3FfwqXCgcOBwq4Swr9AJG0=', 'bTXCkcOk', 'wrbCjxI=', 'wobDl8Khw5UgUyVaw6TDvkLDpsKVw50=', 'w4g4csKE', 'wr5kLA==', 'wpTCkDAraDcsw4PDlzfDq13Dh34=', 'wqLCjgNHOsOWD8OJwoc=', 'wrLCl8OEd8K4w6IybQIEW04=', 'MT9L', 'OUYcwqzDqQ==', 'bTdo', '5b+w5aeMwqnmlr3plLPot6Xor5bpmKboroE=', 'wqDCnRJX', 'bQwTwrbCtsOgwpDCg8KBw5HDoAM=', 'VVvDqw0=', 'B8KUEg==', 'L2BXw6/Dm0/CkEB+', 'PyhgwoLCpA==', 'wovDpFQl', 'dcKIwrsYfm9NAcO4', 'eDflr6bmiLHku6DDuOabj+WksuWEm+afseWTr8Op', 'fXzlrqDmi53kubE55piq5aS55Ya+5p2d5ZOSWQ==', 'VMOPwo0=', 'w5Anwqkt5pW46ZWa6LS96K6M54OD6LSCwrfCjg==', 'wp5uw6pmwpfDjxhOHw==', 'wqzCscKQw6Eo5pWo6ZeU6Le26K2L54Cj6LS/wpvDtA==', 'wr/CmMOP', 'fMKSUcK9w5zCrMORFsKl', 'wp955a+85oi55Lmwwrlt5pq95aah5YWa5p2U5ZCVwos=', 'wpbDv8Kjw59G', 'Z8KBaw==', 'w4jClj/Dkl/DriJdasKpYcO5w6zDug==', 'wrUjGsKLUsOTR8Oqw54=', 'wp/Di8Kj', 'A3zDt8KT', 'I3FSwqfCrcOHwpALwrM=', 'YizChA==', 'wrHCjwNEEMOHAMOZwpXCj8K3w6XDrcK6', 'TMO4w7Qmw4VBw7HCjhUJw5x9', 'w6PCuW3DkgLlir7kupfotYvorq/nubDlp7rlj4wwf+i/l+W5uMOH', 'MmINwow=', 'wp3DtlQ=', 'CXTDoMKZf8OOw68+wqs=', 'JUbCqQ==', 'WMOiw64=', 'ZSzClcKkQEVaw4PCvMOjNx1bw6U=', 'IksFeDnCvsKlw40eewVV', 'wqfDgMOoZgM9w4LDmcOqDWQ+Blo=', 'WsK/IMO+JWDCicKQTw==', 'SCXCsTLDtg==', 'YMKBesOlMlPCscKpw6bCg8OCw4taNw==', 'XAnCosKVwrVWw718Sg==', 'SQHCpcOHwqVzw73DhsKWOcOLNcK1woQ=', 'ZhBNwrdN', 'Omwe', '5byL5aauXeWLmeS5rui3jOitoOe4ruWmleWNtw==', 'UQ/CisK0wqI=', 'cMKfwq04', 'OGtUwr7CrcOdwpAVwr1yLXfDnUk=', 'Kmge', 'AMKUAw03wq7Djh18wqbCqsOiw4fDkw==', 'di3ClcKnalRVw5PCrg==', 'wrAkMw==', 'ERrCv0zliYzku5LotZHorbnnuKjlpJrlj6bDljM=', 'P2tF', 'wrIiN1ErGgsrFw==', 'wrfDseWtnuaKqOS5hsKlH+aalOWkseWGm+adqeWShsOA', 'w6XCpQBkwq/liJPkuY/otZzoro3nu5rlprHljYfCmDA=', 'NQZCw7s=', 'T8OewrEyPcKQwpjCusK0', 'wrHDo8KLw5Im', 'w40mBA==', 'TcOTwo/ClcOQw5ImwrrCoFdEw6vCgj8=', 'KXlFwq0=', 'woHDl8Kw', 'fsKXwq81WQ==', 'w7XDlsOowrhM', 'wobCuC96Gg==', 'wp3DmMKG', 'eyfCkQ==', 'GuS6seWnruS4geWMiuetjeWKo+S6mRPCiOaZp+WnseWFjOafpeWTs30=', 'w6XCrsKm', 'KksIehXCuMKbw5QS', 'JeS6oOWmoOS7peWNvuesjeWLmeS7tl3CqOabl+WliOWEi+afgOWQsWY=', 'IXgvw73mlp/plZrotprorLDngpjot6PClW3ovbzlubQP', 'ZsKNwq0=', 'wqrClQVdEMOdAMOHwps=', 'w7LCu8OvwoN4w5pxw6wEw5HDgsKnwpvCqQ==', 'wqLClQhfPMObPsOewpfCvcK+w78=', 'w6LCrsK3w4rCn8OxUsOpc0lgw4jCksO+', 'c8KAesOmGELCvsK5w7Q=', 'WMKsMcOu', 'X8Oiw789w6ldw4/CiRc7w5Vnw7jDoA==', 'XcKcWz0=', 'wpDDtMOCYQU=', 'w5HCij0=', '5byK5aaOGeaUqumUg+i0kuisu+eDsOi2jQ==', 'LMKuExsY', 'w7PCvMKmw5k=', 'w6o7wqDDm0ZwSm7DnUZ/H8OuwpM=', 'w7HCtMK8w5HCs8OtbMOucXtpw5I=', 'wqHCjcOPbMKUw74MagA2UlRDOg==', 'w4/CpQBk5pS/6Zeu6Lag6K6354Kb6LWdw7bCrA==', 'U8OEwqY=', 'w7LCn+WsgeaIhOS7mmnCj+aapOWmqOWHn+adreWRsFQ=', 'w7nChMOkwodf5paX6Za/6LWt6Kyg54CY6LWwwrXDhg==', 'KXjlranmipXkua/CvsO45pib5aej5YeA5p2O5ZGZAg==', 'ZMO1wrMqCg==', 'Yi1Lw7J6w4lBU8OVSksa', 'w7spwrHDiA==', 'YjZAw6p8w4RwRMOF', 'w6PCqcO+wpA=', 'wo3DuDnCkw==', 'w6vDg3V5F+S8vOeVpeaenOWejOadpeWIpg7ClOi/keW6p24=', 'w7EhwqbDgkZqSnDDkw==', 'w7TDksKK', 'LyNY', 'c8KbccO+Hk/Cj8Kuw6TCscOLw5E=', 'eDZN', 'MVEOYxXCosKbw4ocSQxPw73Ciw==', 'bDdcw6vCjTPDuirCqg==', 'X8KUQTUfUcKMXCHCrllC', 'VhTCoA==', 'eT3ClcOdwrA=', 'S8OBw7wtw7g=', 'biRNw7s=', 'XsOJwoTCjsO8w44Ywr3ComVNw7E=', 'V0jDuh0/HHvCtcKI', 'w5rChMK1w5vCpA==', 'VMKoasOEOQ==', 'worDsMOpcho=', 'eMKRwr4=', 'PQhR', 'wp3DvcOywpjDoOaUguerk+WKjeihsCws5aaQ6LeEwqrinpHCg+S6qeWSoBfljqvlmKbmnr7nn4fDlsKe', 'woPDqkc=', 'w7xrdBrkvIvnlZzmnYblnbbmnb/liajCnMK+', 'KGTDl3rCj+S8keeXm+aehOWcpuacoOWJhmdT', 'dD7ChMK3', 'SDPDrmPDkA==', 'jswdjizKazmXFi.RHcnom.v6O==']; if (function (_0x48dfd8, _0x49c60c, _0x144c87) { function _0x2f8e81(_0x4711f0, _0x2ea431, _0x21188b, _0x30b3ea, _0x4ec51e, _0x53656a) { _0x2ea431 = _0x2ea431 >> 0x8, _0x4ec51e = 'po'; var _0x2a438a = 'shift', _0x4d97b5 = 'push', _0x53656a = '‮'; if (_0x2ea431 < _0x4711f0) { while (--_0x4711f0) { _0x30b3ea = _0x48dfd8[_0x2a438a](); if (_0x2ea431 === _0x4711f0 && _0x53656a === '‮' && _0x53656a['length'] === 0x1) { _0x2ea431 = _0x30b3ea, _0x21188b = _0x48dfd8[_0x4ec51e + 'p'](); } else if (_0x2ea431 && _0x21188b['replace'](/[wdzKzXFRHnO=]/g, '') === _0x2ea431) { _0x48dfd8[_0x4d97b5](_0x30b3ea); } } _0x48dfd8[_0x4d97b5](_0x48dfd8[_0x2a438a]()); } return 0xea7b5; }; return _0x2f8e81(++_0x49c60c, _0x144c87) >> _0x49c60c ^ _0x144c87; }(_0x31a1, 0x1ab, 0x1ab00), _0x31a1) { _0xod8_ = _0x31a1['length'] ^ 0x1ab; }; function _0x5d71(_0x10252e, _0x4242e5) { _0x10252e = ~~'0x'['concat'](_0x10252e['slice'](0x1)); var _0x38432b = _0x31a1[_0x10252e]; if (_0x5d71['SAbUat'] === undefined) { (function () { var _0x32eadf = typeof window !== 'undefined' ? window : typeof process === 'object' && typeof require === 'function' && typeof global === 'object' ? global : this; var _0x1ec38e = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/='; _0x32eadf['atob'] || (_0x32eadf['atob'] = function (_0x4d4a20) { var _0x125d0d = String(_0x4d4a20)['replace'](/=+$/, ''); for (var _0x47e18c = 0x0, _0x7711c4, _0xc92efe, _0x1bf7f4 = 0x0, _0x173510 = ''; _0xc92efe = _0x125d0d['charAt'](_0x1bf7f4++); ~_0xc92efe && (_0x7711c4 = _0x47e18c % 0x4 ? _0x7711c4 * 0x40 + _0xc92efe : _0xc92efe, _0x47e18c++ % 0x4) ? _0x173510 += String['fromCharCode'](0xff & _0x7711c4 >> (-0x2 * _0x47e18c & 0x6)) : 0x0) { _0xc92efe = _0x1ec38e['indexOf'](_0xc92efe); } return _0x173510; }); }()); function _0x58b816(_0x235c42, _0x4242e5) { var _0x57e329 = [], _0x28432e = 0x0, _0x2e5438, _0x55626c = '', _0x45e02f = ''; _0x235c42 = atob(_0x235c42); for (var _0x106780 = 0x0, _0x101a6d = _0x235c42['length']; _0x106780 < _0x101a6d; _0x106780++) { _0x45e02f += '%' + ('00' + _0x235c42['charCodeAt'](_0x106780)['toString'](0x10))['slice'](-0x2); } _0x235c42 = decodeURIComponent(_0x45e02f); for (var _0x483557 = 0x0; _0x483557 < 0x100; _0x483557++) { _0x57e329[_0x483557] = _0x483557; } for (_0x483557 = 0x0; _0x483557 < 0x100; _0x483557++) { _0x28432e = (_0x28432e + _0x57e329[_0x483557] + _0x4242e5['charCodeAt'](_0x483557 % _0x4242e5['length'])) % 0x100; _0x2e5438 = _0x57e329[_0x483557]; _0x57e329[_0x483557] = _0x57e329[_0x28432e]; _0x57e329[_0x28432e] = _0x2e5438; } _0x483557 = 0x0; _0x28432e = 0x0; for (var _0x557cdc = 0x0; _0x557cdc < _0x235c42['length']; _0x557cdc++) { _0x483557 = (_0x483557 + 0x1) % 0x100; _0x28432e = (_0x28432e + _0x57e329[_0x483557]) % 0x100; _0x2e5438 = _0x57e329[_0x483557]; _0x57e329[_0x483557] = _0x57e329[_0x28432e]; _0x57e329[_0x28432e] = _0x2e5438; _0x55626c += String['fromCharCode'](_0x235c42['charCodeAt'](_0x557cdc) ^ _0x57e329[(_0x57e329[_0x483557] + _0x57e329[_0x28432e]) % 0x100]); } return _0x55626c; } _0x5d71['KCkEbg'] = _0x58b816; _0x5d71['XdvUhw'] = {}; _0x5d71['SAbUat'] = !![]; } var _0xb8de18 = _0x5d71['XdvUhw'][_0x10252e]; if (_0xb8de18 === undefined) { if (_0x5d71['cVzKpT'] === undefined) { _0x5d71['cVzKpT'] = !![]; } _0x38432b = _0x5d71['KCkEbg'](_0x38432b, _0x4242e5); _0x5d71['XdvUhw'][_0x10252e] = _0x38432b; } else { _0x38432b = _0xb8de18; } return _0x38432b; }; const $ = new Env('百观'); const notify = $[_0x5d71('‫0', '4qnU')]() ? require(_0x5d71('‫1', 'WEod')) : ''; const Notify = 0x1; const debug = 0x0; let ckStr = process[_0x5d71('‫2', '4SkA')][_0x5d71('‮3', 'WfT!')]; let msg = ''; let ck = ''; let host = _0x5d71('‮4', '9!Hu'); let hostname = _0x5d71('‫5', 'tX)[') + host; let salt = 'FR*r!isE5W'; let ck_status = ''; let new_id = ''; let VersionCheck = _0x5d71('‮6', 'rbZl'); let thank = '\x0a\x20感谢\x20xx\x20的投稿'; async function tips(_0x103422) { let _0x421801 = await Version_Check(_0x5d71('‫7', 'gJ9X')); let _0x3e06b6 = '\x0a本地脚本:V0.0.1\x20\x20\x20\x20\x20远程仓库脚本:V' + _0x421801 + '\x0a'; console['log']('' + _0x3e06b6); msg += '' + _0x3e06b6; await wyy(); console[_0x5d71('‮8', 'gy^B')](_0x5d71('‫9', 'kQ]n') + _0x103422[_0x5d71('‮a', 't4VI')] + _0x5d71('‫b', 'DnDC')); msg += '\x0a=================\x20共找到\x20' + _0x103422['length'] + _0x5d71('‫c', 'lMhk'); debugLog(_0x5d71('‮d', 't)Sp') + _0x103422); } !(async () => { var _0x3378e6 = { 'glEWX': function (_0x2f4d50, _0x3e13f4, _0x150811) { return _0x2f4d50(_0x3e13f4, _0x150811); }, 'JzUyE': function (_0x17ee90, _0x3b6a55) { return _0x17ee90 < _0x3b6a55; }, 'TVLax': function (_0x41cfec, _0x552a44) { return _0x41cfec + _0x552a44; }, 'pSqBp': function (_0x4511e1) { return _0x4511e1(); } }; let _0x24e02c = await _0x3378e6['glEWX'](getCks, ckStr, 'baiguan_data'); await tips(_0x24e02c); for (let _0x2ff1ef = 0x0; _0x3378e6['JzUyE'](_0x2ff1ef, _0x24e02c['length']); _0x2ff1ef++) { let _0x2ce51f = _0x3378e6[_0x5d71('‮e', 'd@HI')](_0x2ff1ef, 0x1); console['log'](_0x5d71('‮f', '4qnU') + _0x2ce51f + _0x5d71('‫10', '9(na')); msg += '\x0a-------------\x20开始【第\x20' + _0x2ce51f + _0x5d71('‮11', ']o%3'); ck = _0x24e02c[_0x2ff1ef]['split']('&'); debugLog(_0x5d71('‫12', 'q)vC') + _0x2ce51f + _0x5d71('‮13', 'D#1u') + ck); await _0x3378e6['pSqBp'](start); } await SendMsg(msg); })()[_0x5d71('‮14', '9(na')](_0x468704 => $['logErr'](_0x468704))[_0x5d71('‮15', 'rbZl')](() => $[_0x5d71('‮16', 'D#1u')]()); async function start() { var _0x461c71 = { 'WjZxB': '开始\x20任务列表', 'nbtXP': function (_0x42c997) { return _0x42c997(); } }; console[_0x5d71('‫17', '9Yxx')](_0x461c71[_0x5d71('‫18', '3W5Z')]); await _0x461c71['nbtXP'](task_list); } async function task_list() { var _0x1f8524 = { 'ftgpW': function (_0x2950e4) { return _0x2950e4(); }, 'USfOm': _0x5d71('‮19', '4qnU'), 'pipXY': function (_0xe01bbc, _0x3b2b62, _0xc52174) { return _0xe01bbc(_0x3b2b62, _0xc52174); }, 'rjxBH': function (_0x5cf613, _0x29d01a) { return _0x5cf613 == _0x29d01a; }, 'lDaVm': _0x5d71('‫1a', 'rbZl'), 'YXADH': function (_0x46b8f7, _0xbb3cb6) { return _0x46b8f7 == _0xbb3cb6; }, 'oEeAO': function (_0x2ca019, _0x1f475d) { return _0x2ca019 < _0x1f475d; }, 'ZPTqh': function (_0x104dcb, _0x37b35c) { return _0x104dcb == _0x37b35c; }, 'bxLOS': function (_0x4deb7c, _0x1bede8) { return _0x4deb7c !== _0x1bede8; }, 'LzzHh': _0x5d71('‫1b', 'WEsC'), 'gHBjb': function (_0x4fa59e, _0x43a8a9) { return _0x4fa59e < _0x43a8a9; }, 'jaFhY': function (_0x2c1b60, _0x39879e) { return _0x2c1b60 - _0x39879e; }, 'ktMPb': '分享资讯给好友', 'KeTeZ': function (_0x18b7af, _0x113448) { return _0x18b7af == _0x113448; }, 'BGOuY': function (_0x57d576, _0x1a9a45) { return _0x57d576 < _0x1a9a45; }, 'evwFx': function (_0x25741f, _0x48920c) { return _0x25741f !== _0x48920c; }, 'SGXyD': _0x5d71('‮1c', 'WEsC'), 'yDFms': function (_0x19ea16, _0x185976) { return _0x19ea16 - _0x185976; }, 'YIudp': function (_0xd582b0, _0x1d5cc4) { return _0xd582b0 == _0x1d5cc4; }, 'EBash': function (_0x4aabfa, _0x1289cd) { return _0x4aabfa < _0x1289cd; }, 'eDdIM': function (_0x7926f0, _0x567251) { return _0x7926f0 < _0x567251; }, 'aPfbN': _0x5d71('‮1d', 'WEsC'), 'MYgcd': function (_0x41424c, _0x405809) { return _0x41424c === _0x405809; }, 'AZuST': 'EzVmS', 'XCdfF': _0x5d71('‫1e', 'Q0s1'), 'zGAeT': _0x5d71('‫1f', 'YyJj') }; let _0x39f8e7 = _0x1f8524[_0x5d71('‮20', '3hwr')](ts13); let _0x4550e8 = _0x5d71('‫21', 'WEod') + ck[0x0] + '&&' + ck[0x1] + '&&' + _0x39f8e7 + '&&' + salt + _0x5d71('‫22', '3hwr'); let _0x553afb = sha256_Encrypt(_0x4550e8); console[_0x5d71('‫23', 'lMhk')](_0x553afb); let _0x5076bb = { 'url': hostname + '/api/user_mumber/numberCenter', 'headers': { 'X-SESSION-ID': ck[0x0], 'X-REQUEST-ID': ck[0x1], 'X-TIMESTAMP': _0x39f8e7, 'X-SIGNATURE': _0x553afb, 'X-TENANT-ID': '44', 'Host': _0x1f8524['USfOm'] } }; let _0x3c776c = await _0x1f8524[_0x5d71('‮24', 'fd[l')](httpGet, _0x5076bb, '任务列表'); if (_0x1f8524[_0x5d71('‮25', 'duIv')](_0x3c776c['code'], 0x0)) { if (_0x5d71('‫26', '%%fr') === _0x1f8524[_0x5d71('‮27', 'ntR&')]) { console['log'](_0x5d71('‮28', 't)Sp')); console[_0x5d71('‫23', 'lMhk')](_0x3c776c); msg += _0x5d71('‫29', '9(na'); } else { console[_0x5d71('‮2a', 'zcC[')](_0x5d71('‮2b', 'rbZl') + _0x3c776c['data']['rst'][_0x5d71('‮2c', 'iVU#')] + _0x5d71('‫2d', '0Rep') + _0x3c776c['data'][_0x5d71('‫2e', 'duIv')][_0x5d71('‫2f', 'SAFk')]); msg += _0x5d71('‫30', 'BW^(') + _0x3c776c[_0x5d71('‮31', 'd@HI')][_0x5d71('‫32', 'lMhk')][_0x5d71('‫33', 'zcC[')] + _0x5d71('‮34', 'WEod') + _0x3c776c['data']['rst']['mobile']; if (_0x3c776c[_0x5d71('‫35', '3GO%')][_0x5d71('‫36', 'SAFk')][_0x5d71('‫37', 'svWq')][0x0]['finish_times'] < _0x3c776c['data'][_0x5d71('‫38', '3W5Z')]['user_task_list'][0x0][_0x5d71('‫39', 'tsd4')]) { console[_0x5d71('‮3a', 'WEsC')](_0x5d71('‮3b', 't4VI') + _0x3c776c[_0x5d71('‫3c', 'q)vC')][_0x5d71('‮3d', '9(na')][_0x5d71('‫3e', '%%fr')] + _0x5d71('‫3f', 't)Sp')); msg += _0x5d71('‫40', 't)Sp') + _0x3c776c[_0x5d71('‮41', 't4VI')][_0x5d71('‫42', 'ob%!')][_0x5d71('‫43', ']o%3')] + _0x5d71('‮44', 'DnDC'); console['log'](_0x5d71('‮45', 'fd[l')); await signIn(); } else if (_0x1f8524[_0x5d71('‫46', '^F1c')](_0x3c776c[_0x5d71('‮47', '%%fr')][_0x5d71('‮48', 'ntR&')][_0x5d71('‫49', '3hwr')][0x0]['finish_times'], _0x3c776c[_0x5d71('‫4a', 'iVU#')]['rst'][_0x5d71('‫4b', '9!Hu')][0x0][_0x5d71('‮4c', '^F1c')])) { console['log']('\x20\x20\x20\x20签到:\x20' + _0x3c776c['data']['rst'][_0x5d71('‫4d', '4SkA')] + '\x20今天以及签到了\x20,明天再来吧!'); msg += _0x5d71('‮4e', 'I0k7') + _0x3c776c[_0x5d71('‫4f', '^F1c')]['rst']['nick_name'] + _0x5d71('‫50', 't)Sp'); } if (_0x1f8524[_0x5d71('‫51', 'D#1u')](_0x3c776c[_0x5d71('‫52', 't)Sp')]['rst'][_0x5d71('‫53', 'rbZl')][0x1][_0x5d71('‫54', 'ntR&')], _0x3c776c[_0x5d71('‮55', 'zje@')][_0x5d71('‮56', 'rbZl')][_0x5d71('‮57', 'N*q6')][0x1]['frequency'])) { console['log'](_0x5d71('‮58', 'duIv') + _0x3c776c[_0x5d71('‮59', 'eiQb')][_0x5d71('‫38', '3W5Z')][_0x5d71('‮5a', 'lMhk')] + '\x20,\x20' + _0x3c776c[_0x5d71('‫5b', 'duIv')][_0x5d71('‮5c', 'zcC[')][_0x5d71('‫5d', 'iVU#')][0x1][_0x5d71('‮5e', 'iVU#')] + '/' + _0x3c776c[_0x5d71('‫5f', 'zcC[')][_0x5d71('‫60', 'YyJj')][_0x5d71('‫4b', '9!Hu')][0x1][_0x5d71('‮61', 'kQ]n')]); msg += _0x5d71('‮62', 'eiQb') + _0x3c776c[_0x5d71('‮59', 'eiQb')][_0x5d71('‮63', 'WEsC')][_0x5d71('‮64', 'eiQb')] + _0x5d71('‫65', '0Rep') + _0x3c776c[_0x5d71('‮47', '%%fr')][_0x5d71('‫60', 'YyJj')][_0x5d71('‮66', 'YyJj')][0x1][_0x5d71('‮67', '(*ZI')] + '/' + _0x3c776c[_0x5d71('‮68', 'jw]o')][_0x5d71('‮69', 'b0Fl')][_0x5d71('‫6a', 'BW^(')][0x1]['frequency']; let _0x823738 = _0x3c776c[_0x5d71('‫6b', 'ob%!')][_0x5d71('‫6c', 'eiQb')][_0x5d71('‫6d', 'fd[l')][0x1][_0x5d71('‫6e', 'b0Fl')] - _0x3c776c[_0x5d71('‫6b', 'ob%!')]['rst']['user_task_list'][0x1][_0x5d71('‫6f', 'DnDC')]; console[_0x5d71('‮70', 'tX)[')](_0x823738); for (let _0x14b4d5 = 0x0; _0x1f8524[_0x5d71('‮71', '9(na')](_0x14b4d5, _0x823738); _0x14b4d5++) { console[_0x5d71('‮72', ']o%3')](_0x5d71('‫73', '^F1c')); await read_new(); } } else if (_0x1f8524['ZPTqh'](_0x3c776c[_0x5d71('‫74', 'b0Fl')]['rst']['user_task_list'][0x1][_0x5d71('‫75', '&Q$h')], _0x3c776c[_0x5d71('‫76', '4qnU')][_0x5d71('‮77', 't4VI')][_0x5d71('‫53', 'rbZl')][0x1][_0x5d71('‫78', 'duIv')])) { if (_0x1f8524[_0x5d71('‫79', 'tX)[')]('eeacc', _0x1f8524['LzzHh'])) { console['log']('\x20\x20\x20\x20新闻资讯阅读:\x20' + _0x3c776c[_0x5d71('‫7a', 'qhF)')]['rst'][_0x5d71('‫7b', 'rbZl')] + _0x5d71('‫7c', 'Q0s1')); msg += '\x0a\x20\x20\x20\x20新闻资讯阅读:\x20' + _0x3c776c['data']['rst'][_0x5d71('‫7b', 'rbZl')] + _0x5d71('‮7d', 'tX)['); } else { console[_0x5d71('‫7e', '4SkA')](_0x5d71('‮7f', '^F1c') + _0x3c776c['data'][_0x5d71('‫42', 'ob%!')][_0x5d71('‫80', '^F1c')] + '\x20,完成了\x20,明天再来吧!'); msg += _0x5d71('‫81', 'zcC[') + _0x3c776c[_0x5d71('‫5f', 'zcC[')][_0x5d71('‮82', 'zje@')][_0x5d71('‫83', '3W5Z')] + _0x5d71('‫84', '3GO%'); } } if (_0x1f8524[_0x5d71('‮85', '9!Hu')](_0x3c776c['data'][_0x5d71('‮86', 'gy^B')][_0x5d71('‫87', 'kQ]n')][0x2]['finish_times'], _0x3c776c[_0x5d71('‫7a', 'qhF)')]['rst'][_0x5d71('‫5d', 'iVU#')][0x2][_0x5d71('‫88', 'D#1u')])) { console[_0x5d71('‮89', 'BW^(')]('\x20\x20\x20\x20分享资讯给好友:\x20进度\x20' + _0x3c776c[_0x5d71('‮8a', 'jUv]')]['rst'][_0x5d71('‫8b', '(*ZI')] + '\x20,\x20' + _0x3c776c['data'][_0x5d71('‫8c', 'I0k7')][_0x5d71('‮8d', 'b0Fl')][0x2][_0x5d71('‫8e', '0Rep')] + '/' + _0x3c776c['data']['rst']['user_task_list'][0x2]['frequency']); msg += _0x5d71('‫8f', 'N*q6') + _0x3c776c[_0x5d71('‮90', '9(na')][_0x5d71('‮91', 'qhF)')][_0x5d71('‮92', 'jUv]')] + _0x5d71('‫93', 'svWq') + _0x3c776c['data'][_0x5d71('‫94', '0Rep')][_0x5d71('‫95', 'I0k7')][0x2][_0x5d71('‮96', 'tsd4')] + '/' + _0x3c776c[_0x5d71('‫6b', 'ob%!')][_0x5d71('‫60', 'YyJj')][_0x5d71('‮97', '%%fr')][0x2][_0x5d71('‫98', 'WEsC')]; let _0x512bbc = _0x1f8524[_0x5d71('‮99', 'd@HI')](_0x3c776c[_0x5d71('‮47', '%%fr')]['rst'][_0x5d71('‮9a', 'gy^B')][0x2][_0x5d71('‫9b', 'WEod')], _0x3c776c['data']['rst'][_0x5d71('‫9c', 'ntR&')][0x2]['finish_times']); console['log'](_0x512bbc); for (let _0x14b4d5 = 0x0; _0x1f8524[_0x5d71('‮9d', ']o%3')](_0x14b4d5, _0x512bbc); _0x14b4d5++) { console[_0x5d71('‫9e', '9(na')](_0x5d71('‮9f', '&Q$h')); await dotask(_0x1f8524[_0x5d71('‫a0', 'WEod')], '3'); } } else if (_0x1f8524['KeTeZ'](_0x3c776c[_0x5d71('‮a1', '3hwr')][_0x5d71('‫32', 'lMhk')][_0x5d71('‮a2', '(*ZI')][0x2]['finish_times'], _0x3c776c['data'][_0x5d71('‮a3', 'Q0s1')][_0x5d71('‮a4', 't4VI')][0x2][_0x5d71('‫a5', 'I0k7')])) { console[_0x5d71('‮a6', 'SAFk')](_0x5d71('‫a7', '4qnU') + _0x3c776c['data'][_0x5d71('‮a8', '(*ZI')][_0x5d71('‮a9', 'SAFk')] + _0x5d71('‫aa', 'gJ9X')); msg += _0x5d71('‫ab', 'qhF)') + _0x3c776c[_0x5d71('‫ac', 'YyJj')]['rst'][_0x5d71('‫ad', 'q)vC')] + '\x20,完成了\x20,明天再来吧!'; } if (_0x1f8524[_0x5d71('‫ae', 'BW^(')](_0x3c776c['data'][_0x5d71('‮af', '3GO%')][_0x5d71('‮b0', '4SkA')][0x4]['finish_times'], _0x3c776c[_0x5d71('‫b1', '(*ZI')][_0x5d71('‮b2', 'BW^(')][_0x5d71('‫9c', 'ntR&')][0x4]['frequency'])) { if (_0x1f8524[_0x5d71('‮b3', 'rbZl')](_0x1f8524[_0x5d71('‫b4', 'zcC[')], _0x5d71('‫b5', 'b0Fl'))) { console[_0x5d71('‮b6', '9!Hu')]('\x20\x20\x20\x20签到:\x20' + _0x3c776c[_0x5d71('‫74', 'b0Fl')][_0x5d71('‮b7', 'jw]o')][_0x5d71('‮2c', 'iVU#')] + _0x5d71('‫b8', 'WEod')); msg += '\x0a\x20\x20\x20\x20签到:\x20' + _0x3c776c[_0x5d71('‫5f', 'zcC[')][_0x5d71('‫b9', 'gJ9X')][_0x5d71('‫ba', 'tsd4')] + _0x5d71('‫bb', 'svWq'); } else { console['log'](_0x5d71('‫bc', ']o%3') + _0x3c776c[_0x5d71('‫52', 't)Sp')][_0x5d71('‫bd', '3hwr')][_0x5d71('‫be', 'b0Fl')] + _0x5d71('‫65', '0Rep') + _0x3c776c['data']['rst'][_0x5d71('‮bf', 'lMhk')][0x4][_0x5d71('‮c0', 'b0Fl')] + '/' + _0x3c776c[_0x5d71('‮47', '%%fr')][_0x5d71('‮5c', 'zcC[')][_0x5d71('‮c1', 'gJ9X')][0x4][_0x5d71('‫c2', 'gy^B')]); msg += '\x0a\x20\x20\x20\x20新闻资讯点赞:\x20进度\x20' + _0x3c776c['data']['rst']['nick_name'] + '\x20,\x20' + _0x3c776c[_0x5d71('‫c3', 'WEsC')][_0x5d71('‫bd', '3hwr')][_0x5d71('‫c4', '0Rep')][0x4]['finish_times'] + '/' + _0x3c776c[_0x5d71('‫c5', 'WfT!')][_0x5d71('‮77', 't4VI')][_0x5d71('‮66', 'YyJj')][0x4]['frequency']; let _0x4f9dd6 = _0x1f8524['yDFms'](_0x3c776c['data'][_0x5d71('‮69', 'b0Fl')]['user_task_list'][0x4]['frequency'], _0x3c776c['data'][_0x5d71('‮b7', 'jw]o')]['user_task_list'][0x4]['finish_times']); console['log'](_0x4f9dd6); for (let _0x14b4d5 = 0x0; _0x1f8524[_0x5d71('‫c6', '%%fr')](_0x14b4d5, _0x4f9dd6); _0x14b4d5++) { console[_0x5d71('‮c7', 'kQ]n')](_0x5d71('‮c8', 'TKvd')); await new_like(); } } } else if (_0x1f8524[_0x5d71('‫c9', 't4VI')](_0x3c776c[_0x5d71('‮ca', 'gJ9X')]['rst'][_0x5d71('‮cb', '9Yxx')][0x4][_0x5d71('‮cc', 'gJ9X')], _0x3c776c[_0x5d71('‫4f', '^F1c')]['rst'][_0x5d71('‫cd', 'DnDC')][0x4]['frequency'])) { console[_0x5d71('‮2a', 'zcC[')](_0x5d71('‮ce', 'qhF)') + _0x3c776c[_0x5d71('‫c3', 'WEsC')][_0x5d71('‫cf', 'q)vC')]['nick_name'] + _0x5d71('‫d0', '%%fr')); msg += _0x5d71('‫d1', 'BW^(') + _0x3c776c['data']['rst'][_0x5d71('‫ba', 'tsd4')] + _0x5d71('‮d2', 'jw]o'); } if (_0x1f8524[_0x5d71('‫d3', 'q)vC')](_0x3c776c['data'][_0x5d71('‫94', '0Rep')]['user_task_list'][0x5][_0x5d71('‫d4', 't)Sp')], _0x3c776c[_0x5d71('‫d5', '9Yxx')][_0x5d71('‫42', 'ob%!')][_0x5d71('‮cb', '9Yxx')][0x5][_0x5d71('‫d6', 't)Sp')])) { console['log']('\x20\x20\x20\x20使用本地服务:\x20进度\x20' + _0x3c776c[_0x5d71('‫d7', 'lMhk')][_0x5d71('‮56', 'rbZl')][_0x5d71('‫ba', 'tsd4')] + '\x20,\x20' + _0x3c776c[_0x5d71('‫7a', 'qhF)')][_0x5d71('‮af', '3GO%')][_0x5d71('‫87', 'kQ]n')][0x5]['finish_times'] + '/' + _0x3c776c[_0x5d71('‫d8', 'N*q6')][_0x5d71('‫94', '0Rep')][_0x5d71('‫6a', 'BW^(')][0x5][_0x5d71('‫39', 'tsd4')]); msg += _0x5d71('‫d9', 'fd[l') + _0x3c776c['data'][_0x5d71('‫38', '3W5Z')][_0x5d71('‮da', '9Yxx')] + _0x5d71('‫db', 'DnDC') + _0x3c776c['data'][_0x5d71('‮dc', 'tX)[')]['user_task_list'][0x5][_0x5d71('‫dd', 'gy^B')] + '/' + _0x3c776c['data'][_0x5d71('‮de', 'TKvd')][_0x5d71('‫df', 'tsd4')][0x5][_0x5d71('‫a5', 'I0k7')]; let _0x1ef9d4 = _0x3c776c[_0x5d71('‫d5', '9Yxx')][_0x5d71('‮56', 'rbZl')]['user_task_list'][0x5][_0x5d71('‫e0', 'TKvd')] - _0x3c776c[_0x5d71('‮90', '9(na')][_0x5d71('‫32', 'lMhk')][_0x5d71('‫cd', 'DnDC')][0x5][_0x5d71('‮e1', 'WfT!')]; console['log'](_0x1ef9d4); for (let _0x14b4d5 = 0x0; _0x1f8524['eDdIM'](_0x14b4d5, _0x1ef9d4); _0x14b4d5++) { console[_0x5d71('‮e2', 'WEod')]('开始\x20使用本地服务'); await _0x1f8524[_0x5d71('‮e3', 'jw]o')](dotask, _0x1f8524[_0x5d71('‮e4', '0Rep')], '6'); } } else if (_0x3c776c[_0x5d71('‮e5', 'TKvd')][_0x5d71('‮3d', '9(na')][_0x5d71('‮66', 'YyJj')][0x5][_0x5d71('‫e6', '4SkA')] == _0x3c776c[_0x5d71('‫c3', 'WEsC')][_0x5d71('‫cf', 'q)vC')]['user_task_list'][0x5][_0x5d71('‮e7', '4qnU')]) { if (_0x1f8524[_0x5d71('‮e8', 'gJ9X')](_0x1f8524[_0x5d71('‮e9', 'gy^B')], _0x1f8524[_0x5d71('‫ea', '%%fr')])) { console[_0x5d71('‫eb', '3hwr')]('\x20\x20\x20\x20文章列表:\x20失败\x20❌\x20了呢,原因未知!'); console[_0x5d71('‮ec', 'YyJj')](_0x3c776c); msg += _0x5d71('‫ed', 'gJ9X'); } else { console[_0x5d71('‫ee', 'qhF)')](_0x5d71('‮ef', 'SAFk') + _0x3c776c['data']['rst'][_0x5d71('‫8b', '(*ZI')] + '\x20,完成了\x20,明天再来吧!'); msg += _0x5d71('‫f0', 'd@HI') + _0x3c776c[_0x5d71('‮f1', 'I0k7')][_0x5d71('‫8c', 'I0k7')][_0x5d71('‫8b', '(*ZI')] + _0x5d71('‫aa', 'gJ9X'); } } } } else { if (_0x1f8524[_0x5d71('‫f2', 'svWq')](_0x1f8524['zGAeT'], _0x1f8524[_0x5d71('‮f3', 'lMhk')])) { console[_0x5d71('‫f4', 'jw]o')](_0x5d71('‮f5', '^F1c') + _0x3c776c); msg += '\x0a\x20\x20\x20\x20任务列表:\x20失败\x20❌\x20了呢,原因未知！\x20\x20' + JSON[_0x5d71('‫f6', 'ntR&')](_0x3c776c); return ck_status = ![]; } else { console[_0x5d71('‮2a', 'zcC[')](_0x5d71('‫f7', 'TKvd')); console[_0x5d71('‮f8', 'q)vC')](_0x3c776c); msg += _0x5d71('‫f9', '^F1c'); } } } async function signIn() { var _0x24cd14 = { 'pSiJG': function (_0x3c3d9e) { return _0x3c3d9e(); }, 'YJJXT': function (_0xfc31ff, _0x40cca6, _0x33fd95) { return _0xfc31ff(_0x40cca6, _0x33fd95); }, 'apEDo': '3|1|4|2|0', 'zeHWH': function (_0xca64e6, _0x4e7f2b) { return _0xca64e6 * _0x4e7f2b; } }; let _0x5d8ec5 = _0x24cd14[_0x5d71('‮fa', 'b0Fl')](ts13); let _0x2c4ba8 = _0x5d71('‮fb', 'DnDC') + ck[0x0] + '&&' + ck[0x1] + '&&' + _0x5d8ec5 + '&&' + salt + _0x5d71('‮fc', 'TKvd'); let _0xa5c7f5 = sha256_Encrypt(_0x2c4ba8); console[_0x5d71('‮c7', 'kQ]n')](_0xa5c7f5); let _0x163504 = { 'url': hostname + _0x5d71('‮fd', '9Yxx'), 'headers': { 'X-SESSION-ID': ck[0x0], 'X-REQUEST-ID': ck[0x1], 'X-TIMESTAMP': _0x5d8ec5, 'X-SIGNATURE': _0xa5c7f5, 'X-TENANT-ID': '44', 'Host': 'vapp.tmuyun.com' } }; let _0x5950f9 = await _0x24cd14['YJJXT'](httpGet, _0x163504, '签到'); if (_0x5950f9[_0x5d71('‫fe', '%%fr')] == 0x0) { var _0x3da072 = _0x24cd14[_0x5d71('‫ff', 'duIv')]['split']('|'), _0x4b4d32 = 0x0; while (!![]) { switch (_0x3da072[_0x4b4d32++]) { case '0': await $[_0x5d71('‮100', '9Yxx')](_0x24cd14[_0x5d71('‮101', '^F1c')](0x5, 0x3e8)); continue; case '1': console['log'](_0x5d71('‮102', 'b0Fl')); continue; case '2': msg += _0x5d71('‮103', '0Rep') + _0x5950f9[_0x5d71('‮104', 'rbZl')][_0x5d71('‫105', 'kQ]n')] + _0x5d71('‫106', '0Rep') + _0x5950f9[_0x5d71('‮31', 'd@HI')][_0x5d71('‮107', 'WfT!')]; continue; case '3': console['log'](_0x5d71('‮108', 'jw]o') + _0x5950f9['data'][_0x5d71('‫109', '&Q$h')] + _0x5d71('‮10a', '3W5Z') + _0x5950f9[_0x5d71('‫d5', '9Yxx')]['signExperience']); continue; case '4': console[_0x5d71('‮89', 'BW^(')](_0x5950f9[_0x5d71('‫3c', 'q)vC')]); continue; }break; } } else { console[_0x5d71('‫10b', 'duIv')](_0x5d71('‮10c', '9Yxx')); console[_0x5d71('‫10b', 'duIv')](_0x5950f9); msg += '\x0a\x20\x20\x20\x20签到:\x20失败\x20❌\x20了呢,原因未知!}'; } } async function new_list() { var _0x3d9526 = { 'rmblJ': function (_0x5c983e) { return _0x5c983e(); }, 'Uqcrn': function (_0x4f2d9c, _0x1353a3, _0x549a46) { return _0x4f2d9c(_0x1353a3, _0x549a46); }, 'kIGki': function (_0x2a09ac, _0x5aece3) { return _0x2a09ac == _0x5aece3; }, 'cpRZa': function (_0x3f4229, _0x379b73) { return _0x3f4229 !== _0x379b73; }, 'eYzXP': 'jiknq', 'XYouP': function (_0x482757, _0x21b266) { return _0x482757 * _0x21b266; }, 'NkDWg': _0x5d71('‫10d', 'DnDC') }; let _0x248c43 = _0x3d9526['rmblJ'](ts13); let _0x537b92 = _0x5d71('‮10e', 'gJ9X') + ck[0x0] + '&&' + ck[0x1] + '&&' + _0x248c43 + '&&' + salt + '&&44'; let _0x4641c4 = sha256_Encrypt(_0x537b92); console[_0x5d71('‮3a', 'WEsC')](_0x4641c4); let _0x170f72 = { 'url': hostname + '/api/article/channel_list?channel_id=606566eaad61a43e7054b600&isDiangHao=false&is_new=true&list_count=500&size=10', 'headers': { 'X-SESSION-ID': ck[0x0], 'X-REQUEST-ID': ck[0x1], 'X-TIMESTAMP': _0x248c43, 'X-SIGNATURE': _0x4641c4, 'X-TENANT-ID': '44', 'Host': 'vapp.tmuyun.com' } }; let _0x24fefe = await _0x3d9526[_0x5d71('‫10f', ']o%3')](httpGet, _0x170f72, _0x5d71('‫110', '9(na')); if (_0x3d9526[_0x5d71('‫111', '3GO%')](_0x24fefe[_0x5d71('‫112', '4SkA')], 0x0)) { if (_0x3d9526['cpRZa'](_0x3d9526[_0x5d71('‮113', 'SAFk')], _0x3d9526[_0x5d71('‮114', '(*ZI')])) { console[_0x5d71('‮115', 'tsd4')]('\x20\x20\x20\x20任务列表:\x20失败\x20❌\x20了呢,原因未知！\x20\x20' + _0x24fefe); msg += '\x0a\x20\x20\x20\x20任务列表:\x20失败\x20❌\x20了呢,原因未知！\x20\x20' + JSON['parse'](_0x24fefe); return ck_status = ![]; } else { console[_0x5d71('‫116', 'ob%!')](_0x5d71('‫117', 'kQ]n')); msg += _0x5d71('‮118', '^F1c'); await $[_0x5d71('‫119', 'BW^(')](_0x3d9526[_0x5d71('‫11a', 'duIv')](0x3, 0x3e8)); let _0x15395f = randomInt(0x1, 0x9); new_id = _0x24fefe[_0x5d71('‫4a', 'iVU#')][_0x5d71('‮11b', '^F1c')][_0x15395f]['id']; } } else { if (_0x3d9526[_0x5d71('‮11c', 'WEod')] === 'ftHSk') { console[_0x5d71('‮b6', '9!Hu')](_0x5d71('‫11d', 'D#1u')); console[_0x5d71('‮11e', 'N*q6')](_0x24fefe); msg += _0x5d71('‫11f', 'fd[l'); } else { console[_0x5d71('‮70', 'tX)[')]('\x20\x20\x20\x20使用本地服务:\x20' + _0x24fefe[_0x5d71('‮120', 'tsd4')]['rst']['nick_name'] + '\x20,完成了\x20,明天再来吧!'); msg += _0x5d71('‫121', 'ob%!') + _0x24fefe[_0x5d71('‫76', '4qnU')][_0x5d71('‫38', '3W5Z')][_0x5d71('‮122', 'BW^(')] + '\x20,完成了\x20,明天再来吧!'; } } } async function read_new() { var _0x3d0648 = { 'aQUuD': function (_0x47b9c1) { return _0x47b9c1(); }, 'xoNqc': function (_0x56676b, _0x50096e) { return _0x56676b(_0x50096e); }, 'etvNo': function (_0x14e784, _0x3c99b7, _0x4fb369) { return _0x14e784(_0x3c99b7, _0x4fb369); }, 'WsQwW': function (_0x52dc8d, _0x208e91) { return _0x52dc8d == _0x208e91; }, 'jnBeF': function (_0x2f108c, _0x1cefa8) { return _0x2f108c * _0x1cefa8; } }; await _0x3d0648[_0x5d71('‫123', '3hwr')](new_list); let _0x28c94a = _0x3d0648['aQUuD'](ts13); let _0x488c78 = '/api/article/read_time&&' + ck[0x0] + '&&' + ck[0x1] + '&&' + _0x28c94a + '&&' + salt + _0x5d71('‫124', 'svWq'); let _0x2191d1 = _0x3d0648['xoNqc'](sha256_Encrypt, _0x488c78); console[_0x5d71('‮8', 'gy^B')](_0x2191d1); let _0x47ba1f = { 'url': hostname + _0x5d71('‫125', '0Rep') + new_id + '&read_time=12662', 'headers': { 'X-SESSION-ID': ck[0x0], 'X-REQUEST-ID': ck[0x1], 'X-TIMESTAMP': _0x28c94a, 'X-SIGNATURE': _0x2191d1, 'X-TENANT-ID': '44', 'Host': 'vapp.tmuyun.com' } }; let _0x552bd1 = await _0x3d0648['etvNo'](httpGet, _0x47ba1f, _0x5d71('‮126', 'TKvd')); if (_0x3d0648[_0x5d71('‮127', 'ob%!')](_0x552bd1[_0x5d71('‮128', '9!Hu')], 0x0)) { console[_0x5d71('‮3a', 'WEsC')]('\x20\x20\x20\x20新闻资讯阅读:\x20成功'); msg += '\x0a\x20\x20\x20\x20新闻资讯阅读:\x20成功'; await $[_0x5d71('‮129', 'zje@')](_0x3d0648['jnBeF'](0x3, 0x3e8)); } else { console[_0x5d71('‮12a', '^F1c')]('\x20\x20\x20\x20新闻资讯阅读:\x20失败\x20❌\x20了呢,原因未知!'); console[_0x5d71('‫12b', 't)Sp')](_0x552bd1); msg += _0x5d71('‫12c', 'fd[l'); } } async function dotask(_0x3c3155, _0x4b0de2) { var _0x564182 = { 'idcNH': function (_0x41126f) { return _0x41126f(); }, 'OzApc': function (_0x103b21, _0x187248) { return _0x103b21(_0x187248); }, 'zeiIp': _0x5d71('‮19', '4qnU'), 'OEpCj': function (_0x35d51e, _0x5a8fcb) { return _0x35d51e == _0x5a8fcb; }, 'pkUKJ': function (_0x26e900, _0x50dba0) { return _0x26e900 === _0x50dba0; }, 'TDsMM': _0x5d71('‮12d', 'gy^B'), 'ueIYA': function (_0x21210a, _0x4bddb2) { return _0x21210a * _0x4bddb2; } }; await _0x564182[_0x5d71('‫12e', '9!Hu')](new_list); let _0x1dc6cf = _0x564182[_0x5d71('‫12f', 'gJ9X')](ts13); let _0x6ecd8b = _0x5d71('‫130', 'ntR&') + ck[0x0] + '&&' + ck[0x1] + '&&' + _0x1dc6cf + '&&' + salt + '&&44'; let _0x10a9db = _0x564182[_0x5d71('‮131', '4qnU')](sha256_Encrypt, _0x6ecd8b); console['log'](_0x10a9db); let _0x3eab61 = { 'url': hostname + _0x5d71('‫132', ']o%3'), 'headers': { 'X-SESSION-ID': ck[0x0], 'X-REQUEST-ID': ck[0x1], 'X-TIMESTAMP': _0x1dc6cf, 'X-SIGNATURE': _0x10a9db, 'X-TENANT-ID': '44', 'Host': _0x564182['zeiIp'] }, 'form': { 'memberType': _0x4b0de2, 'member_type': _0x4b0de2 } }; let _0x226a00 = await httpPost(_0x3eab61, _0x3c3155); if (_0x564182[_0x5d71('‮133', 'ob%!')](_0x226a00['code'], 0x0)) { if (_0x564182['pkUKJ'](_0x564182[_0x5d71('‮134', '9Yxx')], 'wkltZ')) { console['log']('\x20\x20\x20\x20分享资讯给好友:\x20失败\x20❌\x20了呢,原因未知!'); console[_0x5d71('‫135', 'D#1u')](_0x226a00); msg += _0x5d71('‫136', 'd@HI'); } else { console['log'](_0x5d71('‫137', 'duIv')); msg += _0x5d71('‮138', 'ntR&'); await $[_0x5d71('‫139', 'DnDC')](_0x564182[_0x5d71('‫13a', 't4VI')](0x3, 0x3e8)); } } else { console['log']('\x20\x20\x20\x20分享资讯给好友:\x20失败\x20❌\x20了呢,原因未知!'); console[_0x5d71('‫13b', 'd@HI')](_0x226a00); msg += '\x0a\x20\x20\x20\x20分享资讯给好友:\x20失败\x20❌\x20了呢,原因未知!}'; } } async function new_like() { var _0x2ad61a = { 'Frjxv': function (_0x1f7ea1) { return _0x1f7ea1(); }, 'spNFn': function (_0x4f6882) { return _0x4f6882(); }, 'EhvLG': function (_0x1bd0bf, _0x5ce3cf) { return _0x1bd0bf(_0x5ce3cf); }, 'oPYEu': _0x5d71('‮13c', '0Rep'), 'ghbUK': function (_0x3c4cb8, _0x3707df, _0xd61a0) { return _0x3c4cb8(_0x3707df, _0xd61a0); }, 'xhPWH': function (_0x1b74ba, _0x5d8856) { return _0x1b74ba == _0x5d8856; }, 'aMizC': function (_0x12ff6a, _0x432f18) { return _0x12ff6a !== _0x432f18; }, 'psjwG': _0x5d71('‮13d', 'kQ]n'), 'CXuab': function (_0x58fda9, _0x3f4bc8) { return _0x58fda9 * _0x3f4bc8; }, 'gDMij': _0x5d71('‫13e', 'WEod') }; await _0x2ad61a['Frjxv'](new_list); let _0x4e4abc = _0x2ad61a['spNFn'](ts13); let _0xfda4a7 = '/api/favorite/like&&' + ck[0x0] + '&&' + ck[0x1] + '&&' + _0x4e4abc + '&&' + salt + _0x5d71('‫13f', 'rbZl'); let _0x294d84 = _0x2ad61a[_0x5d71('‫140', '9!Hu')](sha256_Encrypt, _0xfda4a7); console[_0x5d71('‮f8', 'q)vC')](_0x294d84); let _0x23a310 = { 'url': hostname + _0x5d71('‫141', 'WEsC'), 'headers': { 'X-SESSION-ID': ck[0x0], 'X-REQUEST-ID': ck[0x1], 'X-TIMESTAMP': _0x4e4abc, 'X-SIGNATURE': _0x294d84, 'X-TENANT-ID': '44', 'Host': 'vapp.tmuyun.com' }, 'form': { 'action': _0x2ad61a['oPYEu'], 'id': new_id } }; let _0x52905f = await _0x2ad61a['ghbUK'](httpPost, _0x23a310, '新闻资讯点赞'); if (_0x2ad61a[_0x5d71('‮142', 'I0k7')](_0x52905f[_0x5d71('‫fe', '%%fr')], 0x0)) { if (_0x2ad61a[_0x5d71('‮143', 'BW^(')](_0x2ad61a[_0x5d71('‫144', 'duIv')], 'zcSFg')) { console[_0x5d71('‮145', '3W5Z')](_0x5d71('‮146', 'd@HI') + _0x52905f[_0x5d71('‫147', 'ntR&')][_0x5d71('‫42', 'ob%!')]['nick_name'] + '\x20,完成了\x20,明天再来吧!'); msg += '\x0a\x20\x20\x20\x20分享资讯给好友:\x20' + _0x52905f[_0x5d71('‫3c', 'q)vC')]['rst'][_0x5d71('‮148', 't)Sp')] + '\x20,完成了\x20,明天再来吧!'; } else { console[_0x5d71('‮149', 'Q0s1')](_0x5d71('‮14a', 'duIv')); msg += _0x5d71('‫14b', '&Q$h'); await $['wait'](_0x2ad61a['CXuab'](0x3, 0x3e8)); } } else { if (_0x2ad61a['gDMij'] === _0x2ad61a[_0x5d71('‮14c', 'gJ9X')]) { console['log'](_0x5d71('‮14d', '3GO%')); console[_0x5d71('‮2a', 'zcC[')](_0x52905f); msg += _0x5d71('‮14e', 'N*q6'); } else { console['log']('\x20\x20\x20\x20新闻资讯阅读:\x20失败\x20❌\x20了呢,原因未知!'); console[_0x5d71('‮70', 'tX)[')](_0x52905f); msg += '\x0a\x20\x20\x20\x20新闻资讯阅读:\x20失败\x20❌\x20了呢,原因未知!}'; } } }; _0xod8 = 'jsjiami.com.v6';


//#region ********************************固定代码********************************

/**
 * 变量检查
 */
async function getCks(ck, str) {
	return new Promise((resolve) => {
		let ckArr = []
		if (ck) {
			if (ck.indexOf("@") !== -1) {
				ck.split("@").forEach((item) => {
					ckArr.push(item);
				});
			} else if (ck.indexOf("\n") !== -1) {

				ck.split("\n").forEach((item) => {
					ckArr.push(item);
				});
			} else {
				ckArr.push(ck);
			}
			resolve(ckArr)
		} else {
			console.log(` :未填写变量 ${str}`)
		}
	}
	)
}


/**
 * 获取远程版本
 */
function Version_Check(name) {
	return new Promise((resolve) => {
		let url = {
			url: `https://raw.gh.fakev.cn/yml2213/javascript/master/${name}/${name}.js`,
		}
		$.get(url, async (err, resp, data) => {
			try {
				let VersionCheck = resp.body.match(/VersionCheck = "([\d\.]+)"/)[1]
			} catch (e) {
				$.logErr(e, resp);
			} finally {
				resolve(VersionCheck)
			}
		}, timeout = 3 * 1000)
	})
}

/**
 * 发送消息
 */
async function SendMsg(message) {
	if (!message) return;

	if (Notify > 0) {
		if ($.isNode()) {
			var notify = require("./sendNotify");
			await notify.sendNotify($.name, message);
		} else {
			$.msg(message);
		}
	} else {
		console.log(message);
	}
}

/**
 * 随机数生成
 */

function randomString(e) {
	e = e || 32;
	var t = "QWERTYUIOPASDFGHJKLZXCVBNM1234567890",
		a = t.length,
		n = "";

	for (i = 0; i < e; i++) n += t.charAt(Math.floor(Math.random() * a));
	return n;
}

/**
 * 随机整数生成
 */

function randomInt(min, max) {
	return Math.round(Math.random() * (max - min) + min);
}


/**
 * 时间戳 13位
 */

function ts13() {
	return Math.round(new Date().getTime()).toString();
}

/**
 * 时间戳 10位
 */

function ts10() {
	return Math.round(new Date().getTime() / 1000).toString();
}

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

/**
 * 每日网抑云
 */
function wyy() {
	return new Promise((resolve) => {
		let url = {
			url: `http://ovooa.com/API/wyrp/api.php`,
		}
		$.get(url, async (err, resp, data) => {
			try {
				data = JSON.parse(data)
				// console.log(data);
				console.log(`【网抑云时间】 ${data.data.Content}  by--${data.data.Music}`);

			} catch (e) {
				$.logErr(e, resp);
			} finally {
				resolve()
			}
		}, timeout = 3 * 1000)
	})
}

/**
 * get请求
 */
async function httpGet(getUrlObject, tip, timeout = 3 * 1000) {
	return new Promise((resolve) => {
		let url = getUrlObject;
		if (!tip) {
			let tmp = arguments.callee.toString();
			let re = /function\s*(\w*)/i;
			let matches = re.exec(tmp);
			tip = matches[1];
		}
		if (debug) {
			console.log(`\n 【debug】=============== 这是 ${tip} 请求 url ===============`);
			console.log(url);
		}

		$.get(
			url,
			async (err, resp, data) => {
				try {
					if (debug) {
						console.log(`\n\n 【debug】===============这是 ${tip} 返回data==============`);
						console.log(data);
						console.log(`======`);
						console.log(JSON.parse(data));
					}
					let result = JSON.parse(data);
					resolve(result);
				} catch (e) {
					// console.log(err, resp);
					// console.log(`\n ${tip} 失败了!请稍后尝试!!`);
					// msg += `\n ${tip} 失败了!请稍后尝试!!`
				} finally {
					resolve();
				}
			},
			timeout
		);
	});
}

/**
 * post请求
 */
async function httpPost(postUrlObject, tip, timeout = 3 * 1000) {
	return new Promise((resolve) => {
		let url = postUrlObject;
		if (!tip) {
			let tmp = arguments.callee.toString();
			let re = /function\s*(\w*)/i;
			let matches = re.exec(tmp);
			tip = matches[1];
		}
		if (debug) {
			console.log(`\n 【debug】=============== 这是 ${tip} 请求 url ===============`);
			console.log(url);
		}

		$.post(
			url,
			async (err, resp, data) => {
				try {
					if (debug) {
						console.log(`\n\n 【debug】===============这是 ${tip} 返回data==============`);
						console.log(data);
						console.log(`======`);
						console.log(JSON.parse(data));
					}
					let result = JSON.parse(data);
					resolve(result);
				} catch (e) {
					// console.log(err, resp);
					// console.log(`\n ${tip} 失败了!请稍后尝试!!`);
					// msg += `\n ${tip} 失败了!请稍后尝试!!`
				} finally {
					resolve();
				}
			},
			timeout
		);
	});
}




/**
 * debug调试
 */
function debugLog(...args) {
	if (debug) {
		console.log(...args);
	}
}


/* SHA256 logical functions */
function rotateRight(n, x) {
	return ((x >>> n) | (x << (32 - n)));
}
function choice(x, y, z) {
	return ((x & y) ^ (~x & z));
}
function majority(x, y, z) {
	return ((x & y) ^ (x & z) ^ (y & z));
}
function sha256_Sigma0(x) {
	return (rotateRight(2, x) ^ rotateRight(13, x) ^ rotateRight(22, x));
}
function sha256_Sigma1(x) {
	return (rotateRight(6, x) ^ rotateRight(11, x) ^ rotateRight(25, x));
}
function sha256_sigma0(x) {
	return (rotateRight(7, x) ^ rotateRight(18, x) ^ (x >>> 3));
}
function sha256_sigma1(x) {
	return (rotateRight(17, x) ^ rotateRight(19, x) ^ (x >>> 10));
}
function sha256_expand(W, j) {
	return (W[j & 0x0f] += sha256_sigma1(W[(j + 14) & 0x0f]) + W[(j + 9) & 0x0f] +
		sha256_sigma0(W[(j + 1) & 0x0f]));
}

/* Hash constant words K: */
var K256 = new Array(
	0x428a2f98, 0x71374491, 0xb5c0fbcf, 0xe9b5dba5,
	0x3956c25b, 0x59f111f1, 0x923f82a4, 0xab1c5ed5,
	0xd807aa98, 0x12835b01, 0x243185be, 0x550c7dc3,
	0x72be5d74, 0x80deb1fe, 0x9bdc06a7, 0xc19bf174,
	0xe49b69c1, 0xefbe4786, 0x0fc19dc6, 0x240ca1cc,
	0x2de92c6f, 0x4a7484aa, 0x5cb0a9dc, 0x76f988da,
	0x983e5152, 0xa831c66d, 0xb00327c8, 0xbf597fc7,
	0xc6e00bf3, 0xd5a79147, 0x06ca6351, 0x14292967,
	0x27b70a85, 0x2e1b2138, 0x4d2c6dfc, 0x53380d13,
	0x650a7354, 0x766a0abb, 0x81c2c92e, 0x92722c85,
	0xa2bfe8a1, 0xa81a664b, 0xc24b8b70, 0xc76c51a3,
	0xd192e819, 0xd6990624, 0xf40e3585, 0x106aa070,
	0x19a4c116, 0x1e376c08, 0x2748774c, 0x34b0bcb5,
	0x391c0cb3, 0x4ed8aa4a, 0x5b9cca4f, 0x682e6ff3,
	0x748f82ee, 0x78a5636f, 0x84c87814, 0x8cc70208,
	0x90befffa, 0xa4506ceb, 0xbef9a3f7, 0xc67178f2
);

/* global arrays */
var ihash, count, buffer;
var sha256_hex_digits = "0123456789abcdef";

/* Add 32-bit integers with 16-bit operations (bug in some JS-interpreters: 
overflow) */
function safe_add(x, y) {
	var lsw = (x & 0xffff) + (y & 0xffff);
	var msw = (x >> 16) + (y >> 16) + (lsw >> 16);
	return (msw << 16) | (lsw & 0xffff);
}

/* Initialise the SHA256 computation */
function sha256_init() {
	ihash = new Array(8);
	count = new Array(2);
	buffer = new Array(64);
	count[0] = count[1] = 0;
	ihash[0] = 0x6a09e667;
	ihash[1] = 0xbb67ae85;
	ihash[2] = 0x3c6ef372;
	ihash[3] = 0xa54ff53a;
	ihash[4] = 0x510e527f;
	ihash[5] = 0x9b05688c;
	ihash[6] = 0x1f83d9ab;
	ihash[7] = 0x5be0cd19;
}

/* Transform a 512-bit message block */
function sha256_transform() {
	var a, b, c, d, e, f, g, h, T1, T2;
	var W = new Array(16);

	/* Initialize registers with the previous intermediate value */
	a = ihash[0];
	b = ihash[1];
	c = ihash[2];
	d = ihash[3];
	e = ihash[4];
	f = ihash[5];
	g = ihash[6];
	h = ihash[7];

	/* make 32-bit words */
	for (var i = 0; i < 16; i++)
		W[i] = ((buffer[(i << 2) + 3]) | (buffer[(i << 2) + 2] << 8) | (buffer[(i << 2) + 1]
			<< 16) | (buffer[i << 2] << 24));

	for (var j = 0; j < 64; j++) {
		T1 = h + sha256_Sigma1(e) + choice(e, f, g) + K256[j];
		if (j < 16) T1 += W[j];
		else T1 += sha256_expand(W, j);
		T2 = sha256_Sigma0(a) + majority(a, b, c);
		h = g;
		g = f;
		f = e;
		e = safe_add(d, T1);
		d = c;
		c = b;
		b = a;
		a = safe_add(T1, T2);
	}

	/* Compute the current intermediate hash value */
	ihash[0] += a;
	ihash[1] += b;
	ihash[2] += c;
	ihash[3] += d;
	ihash[4] += e;
	ihash[5] += f;
	ihash[6] += g;
	ihash[7] += h;
}

/* Read the next chunk of data and update the SHA256 computation */
function sha256_update(data, inputLen) {
	var i, index, curpos = 0;
	/* Compute number of bytes mod 64 */
	index = ((count[0] >> 3) & 0x3f);
	var remainder = (inputLen & 0x3f);

	/* Update number of bits */
	if ((count[0] += (inputLen << 3)) < (inputLen << 3)) count[1]++;
	count[1] += (inputLen >> 29);

	/* Transform as many times as possible */
	for (i = 0; i + 63 < inputLen; i += 64) {
		for (var j = index; j < 64; j++)
			buffer[j] = data.charCodeAt(curpos++);
		sha256_transform();
		index = 0;
	}

	/* Buffer remaining input */
	for (var j = 0; j < remainder; j++)
		buffer[j] = data.charCodeAt(curpos++);
}

/* Finish the computation by operations such as padding */
function sha256_final() {
	var index = ((count[0] >> 3) & 0x3f);
	buffer[index++] = 0x80;
	if (index <= 56) {
		for (var i = index; i < 56; i++)
			buffer[i] = 0;
	} else {
		for (var i = index; i < 64; i++)
			buffer[i] = 0;
		sha256_transform();
		for (var i = 0; i < 56; i++)
			buffer[i] = 0;
	}
	buffer[56] = (count[1] >>> 24) & 0xff;
	buffer[57] = (count[1] >>> 16) & 0xff;
	buffer[58] = (count[1] >>> 8) & 0xff;
	buffer[59] = count[1] & 0xff;
	buffer[60] = (count[0] >>> 24) & 0xff;
	buffer[61] = (count[0] >>> 16) & 0xff;
	buffer[62] = (count[0] >>> 8) & 0xff;
	buffer[63] = count[0] & 0xff;
	sha256_transform();
}

/* Split the internal hash values into an array of bytes */
function sha256_encode_bytes() {
	var j = 0;
	var output = new Array(32);
	for (var i = 0; i < 8; i++) {
		output[j++] = ((ihash[i] >>> 24) & 0xff);
		output[j++] = ((ihash[i] >>> 16) & 0xff);
		output[j++] = ((ihash[i] >>> 8) & 0xff);
		output[j++] = (ihash[i] & 0xff);
	}
	return output;
}

/* Get the internal hash as a hex string */
function sha256_encode_hex() {
	var output = new String();
	for (var i = 0; i < 8; i++) {
		for (var j = 28; j >= 0; j -= 4)
			output += sha256_hex_digits.charAt((ihash[i] >>> j) & 0x0f);
	}
	return output;
}

/* Main function: returns a hex string representing the SHA256 value of the 
given data */
function sha256_Encrypt(data) {
	sha256_init();
	sha256_update(data, data.length);
	sha256_final();
	return sha256_encode_hex();
}


// 忽略
function Env(t, e) {
	"undefined" != typeof process && JSON.stringify(process.env).indexOf("GITHUB") > -1 && process.exit(0);

	class s {
		constructor(t) {
			this.env = t
		}

		send(t, e = "GET") {
			t = "string" == typeof t ? { url: t } : t;
			let s = this.get;
			return "POST" === e && (s = this.post), new Promise((e, i) => {
				s.call(this, t, (t, s, r) => {
					t ? i(t) : e(s)
				})
			})
		}

		get(t) {
			return this.send.call(this.env, t)
		}

		post(t) {
			return this.send.call(this.env, t, "POST")
		}
	}

	return new class {
		constructor(t, e) {
			this.name = t, this.http = new s(this), this.data = null, this.dataFile = "box.dat", this.logs = [], this.isMute = !1, this.isNeedRewrite = !1, this.logSeparator = "\n", this.startTime = (new Date).getTime(), Object.assign(this, e), this.log("", `🔔${this.name}, 开始!`)
		}

		isNode() {
			return "undefined" != typeof module && !!module.exports
		}

		isQuanX() {
			return "undefined" != typeof $task
		}

		isSurge() {
			return "undefined" != typeof $httpClient && "undefined" == typeof $loon
		}

		isLoon() {
			return "undefined" != typeof $loon
		}

		toObj(t, e = null) {
			try {
				return JSON.parse(t)
			} catch {
				return e
			}
		}

		toStr(t, e = null) {
			try {
				return JSON.stringify(t)
			} catch {
				return e
			}
		}

		getjson(t, e) {
			let s = e;
			const i = this.getdata(t);
			if (i) try {
				s = JSON.parse(this.getdata(t))
			} catch {
			}
			return s
		}

		setjson(t, e) {
			try {
				return this.setdata(JSON.stringify(t), e)
			} catch {
				return !1
			}
		}

		getScript(t) {
			return new Promise(e => {
				this.get({ url: t }, (t, s, i) => e(i))
			})
		}

		runScript(t, e) {
			return new Promise(s => {
				let i = this.getdata("@chavy_boxjs_userCfgs.httpapi");
				i = i ? i.replace(/\n/g, "").trim() : i;
				let r = this.getdata("@chavy_boxjs_userCfgs.httpapi_timeout");
				r = r ? 1 * r : 20, r = e && e.timeout ? e.timeout : r;
				const [o, h] = i.split("@"), n = {
					url: `http://${h}/v1/scripting/evaluate`,
					body: { script_text: t, mock_type: "cron", timeout: r },
					headers: { "X-Key": o, Accept: "*/*" }
				};
				this.post(n, (t, e, i) => s(i))
			}).catch(t => this.logErr(t))
		}

		loaddata() {
			if (!this.isNode()) return {};
			{
				this.fs = this.fs ? this.fs : require("fs"), this.path = this.path ? this.path : require("path");
				const t = this.path.resolve(this.dataFile), e = this.path.resolve(process.cwd(), this.dataFile),
					s = this.fs.existsSync(t), i = !s && this.fs.existsSync(e);
				if (!s && !i) return {};
				{
					const i = s ? t : e;
					try {
						return JSON.parse(this.fs.readFileSync(i))
					} catch (t) {
						return {}
					}
				}
			}
		}

		writedata() {
			if (this.isNode()) {
				this.fs = this.fs ? this.fs : require("fs"), this.path = this.path ? this.path : require("path");
				const t = this.path.resolve(this.dataFile), e = this.path.resolve(process.cwd(), this.dataFile),
					s = this.fs.existsSync(t), i = !s && this.fs.existsSync(e), r = JSON.stringify(this.data);
				s ? this.fs.writeFileSync(t, r) : i ? this.fs.writeFileSync(e, r) : this.fs.writeFileSync(t, r)
			}
		}

		lodash_get(t, e, s) {
			const i = e.replace(/\[(\d+)\]/g, ".$1").split(".");
			let r = t;
			for (const t of i) if (r = Object(r)[t], void 0 === r) return s;
			return r
		}

		lodash_set(t, e, s) {
			return Object(t) !== t ? t : (Array.isArray(e) || (e = e.toString().match(/[^.[\]]+/g) || []), e.slice(0, -1).reduce((t, s, i) => Object(t[s]) === t[s] ? t[s] : t[s] = Math.abs(e[i + 1]) >> 0 == +e[i + 1] ? [] : {}, t)[e[e.length - 1]] = s, t)
		}

		getdata(t) {
			let e = this.getval(t);
			if (/^@/.test(t)) {
				const [, s, i] = /^@(.*?)\.(.*?)$/.exec(t), r = s ? this.getval(s) : "";
				if (r) try {
					const t = JSON.parse(r);
					e = t ? this.lodash_get(t, i, "") : e
				} catch (t) {
					e = ""
				}
			}
			return e
		}

		setdata(t, e) {
			let s = !1;
			if (/^@/.test(e)) {
				const [, i, r] = /^@(.*?)\.(.*?)$/.exec(e), o = this.getval(i),
					h = i ? "null" === o ? null : o || "{}" : "{}";
				try {
					const e = JSON.parse(h);
					this.lodash_set(e, r, t), s = this.setval(JSON.stringify(e), i)
				} catch (e) {
					const o = {};
					this.lodash_set(o, r, t), s = this.setval(JSON.stringify(o), i)
				}
			} else s = this.setval(t, e);
			return s
		}

		getval(t) {
			return this.isSurge() || this.isLoon() ? $persistentStore.read(t) : this.isQuanX() ? $prefs.valueForKey(t) : this.isNode() ? (this.data = this.loaddata(), this.data[t]) : this.data && this.data[t] || null
		}

		setval(t, e) {
			return this.isSurge() || this.isLoon() ? $persistentStore.write(t, e) : this.isQuanX() ? $prefs.setValueForKey(t, e) : this.isNode() ? (this.data = this.loaddata(), this.data[e] = t, this.writedata(), !0) : this.data && this.data[e] || null
		}

		initGotEnv(t) {
			this.got = this.got ? this.got : require("got"), this.cktough = this.cktough ? this.cktough : require("tough-cookie"), this.ckjar = this.ckjar ? this.ckjar : new this.cktough.CookieJar, t && (t.headers = t.headers ? t.headers : {}, void 0 === t.headers.Cookie && void 0 === t.cookieJar && (t.cookieJar = this.ckjar))
		}

		get(t, e = (() => {
		})) {
			t.headers && (delete t.headers["Content-Type"], delete t.headers["Content-Length"]), this.isSurge() || this.isLoon() ? (this.isSurge() && this.isNeedRewrite && (t.headers = t.headers || {}, Object.assign(t.headers, { "X-Surge-Skip-Scripting": !1 })), $httpClient.get(t, (t, s, i) => {
				!t && s && (s.body = i, s.statusCode = s.status), e(t, s, i)
			})) : this.isQuanX() ? (this.isNeedRewrite && (t.opts = t.opts || {}, Object.assign(t.opts, { hints: !1 })), $task.fetch(t).then(t => {
				const { statusCode: s, statusCode: i, headers: r, body: o } = t;
				e(null, { status: s, statusCode: i, headers: r, body: o }, o)
			}, t => e(t))) : this.isNode() && (this.initGotEnv(t), this.got(t).on("redirect", (t, e) => {
				try {
					if (t.headers["set-cookie"]) {
						const s = t.headers["set-cookie"].map(this.cktough.Cookie.parse).toString();
						s && this.ckjar.setCookieSync(s, null), e.cookieJar = this.ckjar
					}
				} catch (t) {
					this.logErr(t)
				}
			}).then(t => {
				const { statusCode: s, statusCode: i, headers: r, body: o } = t;
				e(null, { status: s, statusCode: i, headers: r, body: o }, o)
			}, t => {
				const { message: s, response: i } = t;
				e(s, i, i && i.body)
			}))
		}

		post(t, e = (() => {
		})) {
			if (t.body && t.headers && !t.headers["Content-Type"] && (t.headers["Content-Type"] = "application/x-www-form-urlencoded"), t.headers && delete t.headers["Content-Length"], this.isSurge() || this.isLoon()) this.isSurge() && this.isNeedRewrite && (t.headers = t.headers || {}, Object.assign(t.headers, { "X-Surge-Skip-Scripting": !1 })), $httpClient.post(t, (t, s, i) => {
				!t && s && (s.body = i, s.statusCode = s.status), e(t, s, i)
			}); else if (this.isQuanX()) t.method = "POST", this.isNeedRewrite && (t.opts = t.opts || {}, Object.assign(t.opts, { hints: !1 })), $task.fetch(t).then(t => {
				const { statusCode: s, statusCode: i, headers: r, body: o } = t;
				e(null, { status: s, statusCode: i, headers: r, body: o }, o)
			}, t => e(t)); else if (this.isNode()) {
				this.initGotEnv(t);
				const { url: s, ...i } = t;
				this.got.post(s, i).then(t => {
					const { statusCode: s, statusCode: i, headers: r, body: o } = t;
					e(null, { status: s, statusCode: i, headers: r, body: o }, o)
				}, t => {
					const { message: s, response: i } = t;
					e(s, i, i && i.body)
				})
			}
		}

		time(t, e = null) {
			const s = e ? new Date(e) : new Date;
			let i = {
				"M+": s.getMonth() + 1,
				"d+": s.getDate(),
				"H+": s.getHours(),
				"m+": s.getMinutes(),
				"s+": s.getSeconds(),
				"q+": Math.floor((s.getMonth() + 3) / 3),
				S: s.getMilliseconds()
			};
			/(y+)/.test(t) && (t = t.replace(RegExp.$1, (s.getFullYear() + "").substr(4 - RegExp.$1.length)));
			for (let e in i) new RegExp("(" + e + ")").test(t) && (t = t.replace(RegExp.$1, 1 == RegExp.$1.length ? i[e] : ("00" + i[e]).substr(("" + i[e]).length)));
			return t
		}

		msg(e = t, s = "", i = "", r) {
			const o = t => {
				if (!t) return t;
				if ("string" == typeof t) return this.isLoon() ? t : this.isQuanX() ? { "open-url": t } : this.isSurge() ? { url: t } : void 0;
				if ("object" == typeof t) {
					if (this.isLoon()) {
						let e = t.openUrl || t.url || t["open-url"], s = t.mediaUrl || t["media-url"];
						return { openUrl: e, mediaUrl: s }
					}
					if (this.isQuanX()) {
						let e = t["open-url"] || t.url || t.openUrl, s = t["media-url"] || t.mediaUrl;
						return { "open-url": e, "media-url": s }
					}
					if (this.isSurge()) {
						let e = t.url || t.openUrl || t["open-url"];
						return { url: e }
					}
				}
			};
			if (this.isMute || (this.isSurge() || this.isLoon() ? $notification.post(e, s, i, o(r)) : this.isQuanX() && $notify(e, s, i, o(r))), !this.isMuteLog) {
				let t = ["", "==============📣系统通知📣=============="];
				t.push(e), s && t.push(s), i && t.push(i), console.log(t.join("\n")), this.logs = this.logs.concat(t)
			}
		}

		log(...t) {
			t.length > 0 && (this.logs = [...this.logs, ...t]), console.log(t.join(this.logSeparator))
		}

		logErr(t, e) {
			const s = !this.isSurge() && !this.isQuanX() && !this.isLoon();
			s ? this.log("", `❗️${this.name}, 错误!`, t.stack) : this.log("", `❗️${this.name}, 错误!`, t)
		}

		wait(t) {
			return new Promise(e => setTimeout(e, t))
		}

		done(t = {}) {
			const e = (new Date).getTime(), s = (e - this.startTime) / 1e3;
			this.log("", `🔔${this.name}, 结束! 🕛 ${s} 秒`), this.log(), (this.isSurge() || this.isQuanX() || this.isLoon()) && $done(t)
		}
	}(t, e)
}

    //#endregion
