//支付宝小程序抓包ad.zyxdit.com域名的header中的token，变量qqzbtapp，小程序名：钱钱赚不停，点点赚小钱,小钱赚赚赚，多多攒小钱，轻松领奖励，天天必领红包，赚一点小钱，天天赚小钱钱，这几个选6到8个，能达到一个号4块，多了就只有3块。
//抓一个换行抓另外一个就行
// 多多赚小钱，来赚小钱钱，小小摇钱树，天天小赚，点点赚小钱,钱钱赚不停，
NAME = "钱钱赚不停";
VALY = ["qqzbtapp"];
LOGS = 0;
CK = "";
var userList = [];
usid = 0;
let dldz = process.env.qqzbtdldz;

class Bar {
    constructor(_0x5be082) {
        this.token = _0x5be082.split("#")[0];
        this.num = ++usid;
        this.headers = {
            "Host": "ad.zyxdit.com",
            "withcredentials": "1",
            "Accept-Charset": "utf-8",
            "Accept-Language": "zh-CN,en-US;q=0.8",
            "Accept-Encoding": "gzip, deflate, br",
            "token": this.token,
            "Content-Type": "application/x-www-form-urlencoded",
            "Content-Length": "168",
            "User-Agent": "Mozilla/5.0 (iPhone; CPU iPhone OS 14_3 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Mobile/18C66 Ariver/1.1.0 AliApp(AP/10.3.70.6200) Nebula WK RVKType(0) AlipayDefined(nt:WIFI,ws:414|896|2.0) AlipayClient/10.3.70.6200 Language/zh-Hans Region/CN NebulaX/1.0.0 XRiver/10.2.58.1"
        };
    }

    async ["hqdl"]() {
        let _0x5b00e8 = await task("get", dldz, {
            "User-Agent": "Mozilla/5.0 (Linux; Android 6.0; Nexus 5 Build/MRA58N) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/111.0.0.0 Mobile Safari/537.36"
        });

        this.dlip = _0x5b00e8.split("\n")[0];
        console.log("账号" + this.num + "：获取代理IP成功：" + this.dlip);
    }

    async ["start"]() {
        dldz == undefined ? (await this.tasklist(), await this.account()) : (await this.hqdl(), await this.tasklist());
    }

    async ["tasklist"]() {
        let _0x8542bd = await this.task("post", "https://ad.zyxdit.com/api/task/list/v2", this.headers, "");

        if (_0x8542bd.code == 0) {
            for (let _0x59498e = 0; _0x59498e < _0x8542bd.data.list.length; _0x59498e++) {
                if (_0x8542bd.data.list[_0x59498e].taskType == "denghuoInfo") {
                    let _0xcb423d = _0x8542bd.data.list[_0x59498e].appPath.match(/[?&]k=([^&#]*)/)[1];

                    await this.detail(_0xcb423d);
                    await wait(3);

                    if (this.xjpd == 0) {
                        break;
                    }
                } else {
                    if (_0x8542bd.data.list[_0x59498e].taskType == "huanliang" || _0x8542bd.data.list[_0x59498e].taskType == "denghuoVideo" || _0x8542bd.data.list[_0x59498e].taskType == "denghuoPlaque") {
                        await this.rewardAmount(_0x8542bd.data.list[_0x59498e].taskNo);
                        await wait(3);

                        if (this.xjpd == 0) {
                            break;
                        }
                    }
                }
            }

            this.xjpd == 0 && (this.xjpd = 1, await this.tasklist());
        } else console.log("账号" + this.num + "：" + _0x8542bd.msg);
    }

    async ["detail"](_0x472bc3) {
        let _0x4e22c9 = await this.task("post", "https://ad.zyxdit.com/api/denghuoInfo/detail", this.headers, "taskKey=" + _0x472bc3);

        if (_0x4e22c9.code == 0) {
            console.log("账号" + this.num + "：本次任务需要浏览" + _0x4e22c9.data.clickNum + "商品，每个商品浏览" + _0x4e22c9.data.browseTimes + "秒");
            if (_0x4e22c9.data.clickNum == 0) await wait(_0x4e22c9.data.browseTimes), await wait(5), await this.notify(_0x4e22c9.data.taskNo), await wait(1), await this.rewardAmount(_0x4e22c9.data.taskNo);
            else {
                for (let _0x22caa5 = 0; _0x22caa5 < _0x4e22c9.data.clickNum; _0x22caa5++) {
                    await wait(_0x4e22c9.data.browseTimes);
                    await this.notify(_0x4e22c9.data.taskNo);
                    await wait(1);
                }

                await this.rewardAmount(_0x4e22c9.data.taskNo);
            }
        } else console.log("账号" + this.num + "：" + _0x4e22c9.msg);
    }

    async ["notify"](_0x12c077) {
        let _0x4e19be = await this.task("post", "https://ad.zyxdit.com/api/denghuoInfo/notify", this.headers, "taskNo=" + _0x12c077);

        if (_0x4e19be.code == 0) console.log("账号" + this.num + "：" + _0x4e19be.msg); else {
            console.log("账号" + this.num + "：" + _0x4e19be.msg);
        }
    }

    async ["rewardAmount"](_0x2290c0) {
        let _0x5f542d = await this.task("post", "https://ad.zyxdit.com/api/task/rewardAmount", this.headers, "taskNo=" + _0x2290c0);

        _0x5f542d.code == 0 ? (console.log("账号" + this.num + "：" + _0x5f542d.msg + "，获得" + _0x5f542d.data.rewardWayStr + "奖励" + _0x5f542d.data.rewardAmount), _0x5f542d.data.isRemove == "N" || _0x5f542d.data.rewardAmount == 0 ? this.xjpd = 0 : this.xjpd = 1) : console.log("账号" + this.num + "：" + _0x5f542d.msg);
    }

    async ["account"]() {
        let _0x405004 = await this.task("post", "https://ad.zyxdit.com/api/member/account", this.headers, "token=" + this.token);

        if (_0x405004.code == 0) {
            console.log("账号" + this.num + "：当前拥有" + _0x405004.data.balanceAmount + "元");
            await wait(1);
            await this.apply(_0x405004.data.balanceAmount);
        } else console.log("账号" + this.num + "：" + _0x405004.msg);
    }

    async ["apply"](_0x430824) {
        let _0x3acf78 = await this.task("post", "https://ad.zyxdit.com/api/withdrawal/apply", this.headers, "amount=" + _0x430824);

        _0x3acf78.code == 0 ? console.log("账号" + this.num + "：" + _0x3acf78.msg + _0x3acf78.data.amount + "元") : console.log("账号" + this.num + "：" + _0x3acf78.msg);
    }

    async ["task"](_0x234ace, _0x3dc451, _0x45d988, _0x3c9fa0) {
        _0x234ace == "delete" ? _0x234ace = _0x234ace.toUpperCase() : _0x234ace = _0x234ace;

        const _0x1337dc = require("request");

        _0x234ace == "post" && (delete _0x45d988["Content-Type"], delete _0x45d988["content-type"], delete _0x45d988["Content-Length"], delete _0x45d988["content-length"], safeGet(_0x3c9fa0) ? _0x45d988["Content-Type"] = "application/json" : _0x45d988["Content-Type"] = "application/x-www-form-urlencoded", _0x3c9fa0 && (_0x45d988["Content-Length"] = lengthInUtf8Bytes(_0x3c9fa0)));
        _0x234ace == "get" && (delete _0x45d988["Content-Type"], delete _0x45d988["content-length"], delete _0x45d988["content-type"], delete _0x45d988["Content-Length"]);
        _0x45d988.Host = _0x3dc451.replace("//", "/").split("/")[1];

        if (_0x234ace.indexOf("T") < 0) {
            var _0x12975a = {
                "url": _0x3dc451,
                "headers": _0x45d988,
                "body": _0x3c9fa0,
                "followRedirect": false,
                "timeout": 20000
            };
        } else {
            var _0x12975a = {
                "url": _0x3dc451,
                "headers": _0x45d988,
                "form": JSON.parse(_0x3c9fa0),
                "followRedirect": false,
                "timeout": 20000
            };
        }

        return dldz !== undefined && (_0x12975a.proxy = "http://" + this.dlip), new Promise(async _0x3bba49 => {
            _0x1337dc[_0x234ace.toLowerCase()](_0x12975a, async (_0x36dabf, _0x31abc9, _0x2837e9) => {
                try {
                    if (LOGS == 1) {
                        console.log("==================请求==================");
                        console.log(JSON.stringify(_0x12975a));
                        console.log("==================返回==================");
                        console.log(_0x36dabf);
                        console.log(JSON.stringify(_0x31abc9));
                    }
                } catch (_0x495329) {
                } finally {
                    return !_0x36dabf ? safeGet(_0x2837e9) ? _0x2837e9 = JSON.parse(_0x2837e9) : _0x2837e9 = _0x2837e9 : dldz == undefined ? _0x2837e9 = await this.task(_0x234ace, _0x3dc451, _0x45d988, _0x3c9fa0) : (await this.hqdl(), _0x2837e9 = await this.task(_0x234ace, _0x3dc451, _0x45d988, _0x3c9fa0)), _0x3bba49(_0x2837e9);
                }
            });
        });
    }

}

(async () => {
    const _0x464779 = "0.0.2";
    console.log(NAME);
    console.log("北京时间：" + formatDate());

    let _0x36ee9b = await task("get", "http://118.123.3.235:2298/js/v", {});
    if (_0x36ee9b?.["code"] == 200) {
        let _0x907200 = _0x36ee9b?.["data"]?.["qqzbt"];
        console.log("当前版本号：" + _0x464779 + "，最新版本号：" + _0x907200);

        if (_0x907200 == _0x464779) {
            checkEnv();
            dldz === undefined ? console.log("当前使用本地网络运行脚本") : console.log("当前使用代理网络运行脚本");
            const _0x25bf25 = 100;
            await startWithConcurrency(userList, _0x25bf25);
        } else {
            if (_0x907200 == undefined) console.log("无当前脚本版本号，请联系作者"); else {
                console.log("低于最新版本号，开始更新");
                let _0x4b04c5 = await task("get", "http://118.123.3.235:2298/js/qqzbt.js", {});
                const _0x2a2634 = require("fs").promises,
                    _0x2911f6 = process.argv[1];
                await _0x2a2634.writeFile(_0x2911f6, _0x4b04c5);
                console.log("脚本更新完成，请重新运行脚本");
            }
        }
    } else console.log("请检查网络，如无用请联系作者");
})().catch(_0x54a55b => {
    console.log(_0x54a55b);
});

async function startWithConcurrency(_0x279aac, _0x3b422b) {
    const _0x42d0f1 = [..._0x279aac];

    async function _0x33af5e() {
        if (_0x42d0f1.length === 0) return;

        const _0x5e9553 = _0x42d0f1.shift();

        try {
            await _0x5e9553.start();
        } catch (_0x2b5a74) {
            console.log(_0x2b5a74);
        }

        _0x42d0f1.length > 0 && (await _0x33af5e());
    }

    const _0x348be0 = Array.from({
        "length": _0x3b422b
    }, _0x33af5e);

    await Promise.all(_0x348be0);
}

function randomInt(_0x379394, _0xd1b7f1) {
    return Math.round(Math.random() * (_0xd1b7f1 - _0x379394) + _0x379394);
}

function randomUUID() {
    return randomPattern("xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx");
}

function randomPattern(_0x3ca8fd, _0x15d731 = "abcdef0123456789") {
    let _0x4821ef = "";

    for (let _0x4093b6 of _0x3ca8fd) {
        if (_0x4093b6 == "x") _0x4821ef += _0x15d731.charAt(Math.floor(Math.random() * _0x15d731.length)); else {
            if (_0x4093b6 == "X") {
                _0x4821ef += _0x15d731.charAt(Math.floor(Math.random() * _0x15d731.length)).toUpperCase();
            } else {
                _0x4821ef += _0x4093b6;
            }
        }
    }

    return _0x4821ef;
}

function randomString(_0x26f6c8, _0x2b9701) {
    _0x26f6c8 = _0x26f6c8 || 32;
    let _0x53c029 = "";
    if (_0x2b9701 == 0) _0x53c029 += "0123456789"; else {
        if (_0x2b9701 == 1) _0x53c029 += "0123456789", _0x53c029 += "abcdef"; else {
            if (_0x2b9701 == 2) _0x53c029 += "abcdefghijklmnopqrstuvwxyz", _0x53c029 += "ABCDEFGHIJKLMNOPQRSTUVWXYZ"; else _0x2b9701 == 2 && (_0x53c029 += "0123456789", _0x53c029 += "abcdefghijklmnopqrstuvwxyz", _0x53c029 += "ABCDEFGHIJKLMNOPQRSTUVWXYZ");
        }
    }
    const _0x4f01d1 = _0x53c029.length;
    let _0x31b49d = "";

    for (let _0x180caa = 0; _0x180caa < _0x26f6c8; _0x180caa++) {
        _0x31b49d += _0x53c029.charAt(Math.floor(Math.random() * _0x4f01d1));
    }

    return _0x31b49d;
}

async function task(_0x1c3f2c, _0x3e1a18, _0x27a211, _0x5a2b0a) {
    _0x1c3f2c == "delete" ? _0x1c3f2c = _0x1c3f2c.toUpperCase() : _0x1c3f2c = _0x1c3f2c;

    const _0x4a55a5 = require("request");

    if (_0x1c3f2c == "post") {
        delete _0x27a211["Content-Type"];
        delete _0x27a211["content-type"];
        delete _0x27a211["Content-Length"];
        delete _0x27a211["content-length"];

        if (safeGet(_0x5a2b0a)) {
            _0x27a211["Content-Type"] = "application/json";
        } else _0x27a211["Content-Type"] = "application/x-www-form-urlencoded";

        if (_0x5a2b0a) {
            _0x27a211["Content-Length"] = lengthInUtf8Bytes(_0x5a2b0a);
        }
    }

    _0x1c3f2c == "get" && (delete _0x27a211["Content-Type"], delete _0x27a211["content-length"], delete _0x27a211["content-type"], delete _0x27a211["Content-Length"]);
    _0x27a211.Host = _0x3e1a18.replace("//", "/").split("/")[1];

    if (_0x1c3f2c.indexOf("T") < 0) {
        var _0x2f1808 = {
            "url": _0x3e1a18,
            "headers": _0x27a211,
            "body": _0x5a2b0a,
            "followRedirect": false,
            "timeout": 20000
        };
    } else {
        var _0x2f1808 = {
            "url": _0x3e1a18,
            "headers": _0x27a211,
            "form": JSON.parse(_0x5a2b0a),
            "followRedirect": false,
            "timeout": 20000
        };
    }

    return new Promise(async _0x1ae804 => {
        _0x4a55a5[_0x1c3f2c.toLowerCase()](_0x2f1808, async (_0x5de758, _0x55d35a, _0x79148c) => {
            try {
                if (LOGS == 1) {
                    console.log("==================请求==================");
                    console.log(JSON.stringify(_0x2f1808));
                    console.log("==================返回==================");
                    console.log(_0x5de758);
                    console.log(JSON.stringify(_0x55d35a));
                }
            } catch (_0x565187) {
            } finally {
                if (!_0x5de758) {
                    if (safeGet(_0x79148c)) _0x79148c = JSON.parse(_0x79148c); else {
                        _0x79148c = _0x79148c;
                    }
                } else await wait(60), _0x79148c = await this.task(_0x1c3f2c, _0x3e1a18, _0x27a211, _0x5a2b0a);

                return _0x1ae804(_0x79148c);
            }
        });
    });
}

function timestamp(_0x2bec43) {
    const _0x584c36 = new Date().getTime();

    return Math.round(_0x584c36 / 10 ** (13 - _0x2bec43)).toString();
}

function formatDate() {
    let _0x2c4d31 = new Date();

    const _0x153194 = _0x2c4d31.getFullYear(),
        _0x41ee53 = padZero(_0x2c4d31.getMonth() + 1),
        _0x4ad340 = padZero(_0x2c4d31.getDate()),
        _0x4a456f = padZero(_0x2c4d31.getHours()),
        _0x43f19f = padZero(_0x2c4d31.getMinutes()),
        _0x59313f = padZero(_0x2c4d31.getSeconds());

    return _0x153194 + "-" + _0x41ee53 + "-" + _0x4ad340 + " " + _0x4a456f + ":" + _0x43f19f + ":" + _0x59313f;
}

function padZero(_0x5bb7af) {
    return _0x5bb7af.toString().padStart(2, "0");
}

function safeGet(_0x55911d) {
    try {
        if (typeof JSON.parse(_0x55911d) == "object") return true;
    } catch (_0x574aaa) {
        return false;
    }
}

function wait(_0x11a8a1) {
    return new Promise(function (_0x1bbf8b) {
        setTimeout(_0x1bbf8b, _0x11a8a1 * 1000);
    });
}

function lengthInUtf8Bytes(_0x36e041) {
    let _0x1ca5a0 = encodeURIComponent(_0x36e041).match(/%[89ABab]/g);

    return _0x36e041.length + (_0x1ca5a0 ? _0x1ca5a0.length : 0);
}

async function checkEnv() {
    let _0x285106 = process.env[VALY] || CK,
        _0x5e459f = 0;

    if (_0x285106) {
        for (let _0x205366 of _0x285106.split("\n").filter(_0x7b471 => !!_0x7b471)) {
            userList.push(new Bar(_0x205366));
        }

        _0x5e459f = userList.length;
    } else console.log("【" + NAME + "】：未填写变量: " + VALY), process.exit();

    return console.log("共找到" + _0x5e459f + "个账号"), userList;
}