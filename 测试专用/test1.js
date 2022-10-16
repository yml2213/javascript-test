
var a = n("1da1")
  , c = n("5530")
  , i = (n("96cf"),
    n("d3b7"),
    n("25f0"),
    n("d81d"),
    n("4e82"),
    n("b64b"),
    n("6821"))
  , o = n.n(i)
  , r = n("bc3a")
  , u = n.n(r)
  , s = n("4360")
  , l = n("d399")
  , d = n("a18c")
  , p = n("f524")
  , h = n("4328")

function md5(e) {
  for (var t = "0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ", n = "", a = 0; a < 8; a++)
    n += t.substr(Math.floor(Math.random() * t.length), 1);
  var i = Object(c["a"])(Object(c["a"])({}, e), {}, {
    appId: "tea",
    time: Math.round((new Date).getTime() / 1e3).toString(),
    nonceStr: n
  })
    , r = {};
  Object.keys(i).sort().map((function (e) {
    r[e] = i[e]
  }
  ));
  var u = ""
    , s = parseInt(Object.keys(r).length);
  for (e in r)
    s--,
      u += e + "=" + r[e] + (0 === s ? "" : "&");
  return "?" + u + "&sign=" + o()(u + "e3de382b2bab1232s")
}

console.log(md5('111'));

