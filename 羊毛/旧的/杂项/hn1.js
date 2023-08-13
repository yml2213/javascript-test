function test(n, i, e) {
	"use strict";
	e.d(i, {
		_n: function () {
			return S
		},
		ZP: function () {
			return Y
		}
	});
	e(5563),
		e(24124);
	var a = e(30052)
		, o = e.n(a)
		, u = e(46796)
		, t = e(16249)
		, r = e(64434)
		, s = e(28324)
		, h = (e(69934),
			e(90515))
		, g = e.n(h)
		, l = (e(56081),
			e(92951),
			e(28274),
			e(49594),
			e(76299),
			e(90567),
			e(75868))
		, c = e.n(l)
		, m = "eb15bc2f2b6a1ec91c2411be7a1501a5";
	function Z(n) {
		var i, e = "";
		e = "/" === (null === (i = n.url.toLocaleLowerCase()) || void 0 === i ? void 0 : i[0]) ? "/api" + n.url.toLocaleLowerCase() : "/api/" + n.url.toLocaleLowerCase();
		var a = Math.round((new Date).getTime() / 1e3).toString()
			, o = d();
		console.log(o);
		var u = "0"
			, t = c()(e + "-" + a + "-" + o + "-" + u + "-" + m);
		n.params = g()(g()({}, n.params), {}, {
			b8ef038bdc27fc47a5087ce0f63e7622: "".concat(a, "-").concat(o, "-").concat(u, "-").concat(t)
		})
	}
	function d() {
		for (var n = [], i = "0123456789abcdef", e = 0; e < 36; e++)
			n[e] = i.substr(Math.floor(16 * Math.random()), 1);
		n[14] = "4",
			n[19] = i.substr(3 & n[19] | 8, 1);
		var a = n.join("");
		return a
	}
	var D = "https://api.hinan8.com/api"
		, S = D;
	o().defaults.baseURL = S,
		o().defaults.withCredentials = !0,
		o().defaults.headers["X-Requested-With"] = "XMLHttpRequest",
		o().defaults.headers.post["Content-Type"] = "application/json",
		o().interceptors.request.use((function (n) {
			return console.log(n.data),
				void 0 != n.data && (console.log("发送HTTP"),
					console.log(n.data)),
				n.loading && (console.log("记载中"),
					t.Z.show({
						message: "加载中...",
						boxClass: "bg-grey-2 text-grey-9 loadingShow",
						spinnerColor: "primary"
					})),
				n
		}
		)),
		o().interceptors.request.use((function (n) {
			return n.headers["token"] = localStorage.getItem("token") || "",
				n.headers["Accept-Language"] = (0,
					s.getLanguage)(),
				Z(n),
				n
		}
		)),
		o().interceptors.response.use((function (n) {
			var i, e, a;
			return console.log("res", n),
				t.Z.hide(),
				200 !== (null === n || void 0 === n || null === (i = n.data) || void 0 === i ? void 0 : i.code) ? (console.log("失败的请求"),
					r.Z.create({
						type: "negative",
						spinner: !1,
						message: null === n || void 0 === n || null === (a = n.data) || void 0 === a ? void 0 : a.msg,
						timeout: 1e3,
						position: "center"
					}),
					Promise.reject(n.data)) : null === (e = n.data) || void 0 === e ? void 0 : e.data
		}
		), (function (n) {
			var i = n.response;
			return t.Z.hide(),
				401 === i.status && (localStorage.clear("token"),
					u.F.push("/login")),
				Promise.reject(i.data)
		}
		));
	var Y = o()
}