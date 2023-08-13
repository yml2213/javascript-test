

const $ = new Env("安心记加班");

let today = `${$.ts('y')}-${$.ts('mo')}-${$.ts('d')}`
console.log(today);

// 新的 env 函数, 增加自定义功能 yml-11.12改   合并
function Env(name, env) {
    "undefined" != typeof process &&
        JSON.stringify(process.env).indexOf("GITHUB") > -1 &&
        process.exit(0);
    return new (class {
        constructor(name, env) {
            this.name = name;
            this.notifyStr = "";
            this.notifyFlag = false;
            this.startTime = new Date().getTime();
            Object.assign(this, env);
            console.log(`${this.name} 开始运行: \n`);
        }
        isNode() {
            return "undefined" != typeof module && !!module.exports;
        }
        send(options, e = () => { }) {
            let m = options.method.toLowerCase();
            let t = options;
            if (m != "get" && m != "post" && m != "put" && m != "delete") {
                console.log(`无效的http方法: ${m}`);
                return;
            }
            if (m == "get" && t.headers) {
                // delete t.headers["Content-Type"];
                delete t.headers["Content-Length"];
            } else if (t.body && t.headers) {
                if (t.headers["content-type"]) {
                    let tem = t.headers["content-type"];
                    delete t.headers["content-type"];
                    t.headers["Content-Type"] = tem;
                } else if (t.body && t.headers) {
                    if (!t.headers["Content-Type"])
                        t.headers["Content-Type"] = "application/x-www-form-urlencoded";
                }
            }
            if (this.isNode()) {
                this.request = this.request ? this.request : require("request");
                this.request(options, function (error, response) {
                    if (error) throw new Error(error);
                    let res_body = response.body;
                    let res = response;
                    try {
                        if (typeof res_body == "string") {
                            if ($.isJsonStr(res_body)) {
                                res_body = JSON.parse(res_body);
                                let res_format = $.formatJson(response.body);
                                e(null, res_body, res_format, res);
                            } else e(null, res_body, res_format, res);
                        } else e(null, res_body, res_format, res);
                    } catch (error) {
                        console.log(error);
                        let a = `ENV -- request 请求错误, 检查点1\n${error}`;
                        e(a, null, null, null);
                    }
                });
            }
        }
        isJsonStr(str) {
            if (typeof str == "string") {
                try {
                    if (typeof JSON.parse(str) == "object") {
                        return true;
                    }
                } catch (e) {
                    return false;
                }
            }
            return false;
        }
        mergeObjs(def, obj) {
            if (!obj) {
                return def;
            } else if (!def) {
                return obj;
            }
            for (var i in obj) {
                if (obj[i] != null && obj[i].constructor == Object) {
                    def[i] = $.mergeObjs(def[i], obj[i]);
                } else if (
                    obj[i] != null &&
                    obj[i] instanceof Array &&
                    obj[i].length > 0
                ) {
                    if (obj[i][0].constructor == Object) {
                        var newobjs = [];
                        var objids = {};
                        for (var x = 0, l = def[i].length; x < l; x++) {
                            objids[def[i][x].id] = x;
                        }
                        for (var x = 0, l = obj[i].length; x < l; x++) {
                            var newobj = obj[i][x];
                            if (objids[newobj.id] !== undefined) {
                                def[i][x] = $.mergeObjs(def[i][x], newobj);
                            } else {
                                newobjs.push(newobj);
                            }
                        }
                        for (var x = 0, l = newobjs.length; x < l; x++) {
                            def[i].push(newobjs[x]);
                        }
                    } else {
                        for (var x = 0; x < obj[i].length; x++) {
                            var idxObj = obj[i][x];
                            if (def[i].indexOf(idxObj) === -1) {
                                def[i].push(idxObj);
                            }
                        }
                    }
                } else {
                    def[i] = obj[i];
                }
            }
            return def;
        }
        formatJson(value) {
            var json = value;
            var i = 0,
                len = 0,
                tab = "    ",
                targetJson = "",
                indentLevel = 0,
                inString = false,
                currentChar = null;
            for (i = 0, len = json.length; i < len; i += 1) {
                currentChar = json.charAt(i);
                switch (currentChar) {
                    case "{":
                    case "[":
                        if (!inString) {
                            targetJson += currentChar + "\n" + repeat(tab, indentLevel + 1);
                            indentLevel += 1;
                        } else {
                            targetJson += currentChar;
                        }
                        break;
                    case "}":
                    case "]":
                        if (!inString) {
                            indentLevel -= 1;
                            targetJson += "\n" + repeat(tab, indentLevel) + currentChar;
                        } else {
                            targetJson += currentChar;
                        }
                        break;
                    case ",":
                        if (!inString) {
                            targetJson += ",\n" + repeat(tab, indentLevel);
                        } else {
                            targetJson += currentChar;
                        }
                        break;
                    case ":":
                        if (!inString) {
                            targetJson += ": ";
                        } else {
                            targetJson += currentChar;
                        }
                        break;
                    case " ":
                    case "\n":
                    case "\t":
                        if (inString) {
                            targetJson += currentChar;
                        }
                        break;
                    case '"':
                        if (i > 0 && json.charAt(i - 1) !== "\\") {
                            inString = !inString;
                        }
                        targetJson += currentChar;
                        break;
                    default:
                        targetJson += currentChar;
                        break;
                }
            }
            function repeat(s, count) {
                return new Array(count + 1).join(s);
            }
            function repeat(s, count) {
                return new Array(count + 1).join(s);
            }
            return targetJson;
        }
        type(str) {
            if (this.strCode(str) > 20) {
                return console.log(`数据类型是: ${typeof str}`);
            }
            return console.log(`${str}数据类型是: ${typeof str}`);
        }
        strCode(str) {
            var count = 0;
            if (str) {
                let len = str.length;
                for (var i = 0; i < len; i++) {
                    if (str.charCodeAt(i) > 255) {
                        count += 2;
                    } else {
                        count++;
                    }
                }
                return count;
            } else return 0;
        }
        async SendMsg(message) {
            if (!message) return;
            if (Notify > 0) {
                if ($.isNode()) {
                    var notify = require("./sendNotify");
                    await notify.sendNotify($.name, message);
                } else {
                    console.log($.name, "", message);
                }
            } else {
                console.log(message);
            }
        }
        getMin(a, b) {
            return a < b ? a : b;
        }
        getMax(a, b) {
            return a < b ? b : a;
        }
        json2str(obj, c, encodeUrl = false) {
            let ret = [];
            for (let keys of Object.keys(obj).sort()) {
                let v = obj[keys];
                if (v && encodeUrl) v = encodeURIComponent(v);
                ret.push(keys + "=" + v);
            }
            return ret.join(c);
        }
        str2json(str, decodeUrl = false) {
            let ret = {};
            for (let item of str.split("&")) {
                if (!item) continue;
                let idx = item.indexOf("=");
                if (idx == -1) continue;
                let k = item.substr(0, idx);
                let v = item.substr(idx + 1);
                if (decodeUrl) v = decodeURIComponent(v);
                ret[k] = v;
            }
            return ret;
        }
        randomStr(len, up = false, charset = "abcdef0123456789") {
            let str = "";
            for (let i = 0; i < len; i++) {
                str += charset.charAt(Math.floor(Math.random() * charset.length));
            }
            if (!up) {
                return str;
            }
            return str.toUpperCase();
        }
        phoneNum(phone_num) {
            if (phone_num.length == 11) {
                let data = phone_num.replace(/(\d{3})\d{4}(\d{4})/, "$1****$2");
                return data;
            } else {
                return phone_num;
            }
        }
        randomInt(min, max) {
            return Math.round(Math.random() * (max - min) + min);
        }
        async yiyan() {
            this.request = this.request ? this.request : require("request");
            return new Promise((resolve) => {
                var options = {
                    method: "GET",
                    url: "https://v1.hitokoto.cn/",
                    headers: {},
                };
                this.request(options, function (error, response) {
                    let data = JSON.parse(response.body);
                    let data_ = `[一言]: ${data.hitokoto}  by--${data.from}`;
                    resolve(data_);
                });
            });
        }
        wait(t) {
            return new Promise((e) => setTimeout(e, t * 1000));
        }
        ts(type = false, _data = "") {
            let myDate = new Date();
            let a = "";
            switch (type) {
                case 10:
                    a = Math.round(new Date().getTime() / 1000).toString();
                    break;
                case 13:
                    a = Math.round(new Date().getTime()).toString();
                    break;
                case "h":
                    a = myDate.getHours();
                    break;
                case "m":
                    a = myDate.getMinutes();
                    break;
                case "y":
                    a = myDate.getFullYear();
                    break;
                case "h":
                    a = myDate.getHours();
                    break;
                case "mo":
                    a = myDate.getMonth();
                    break;
                case "d":
                    a = myDate.getDate();
                    break;
                case "ts2Data":
                    if (_data != "") {
                        time = _data;
                        if (time.toString().length == 13) {
                            let date = new Date(time + 8 * 3600 * 1000);
                            a = date.toJSON().substr(0, 19).replace("T", " ");
                        } else if (time.toString().length == 10) {
                            time = time * 1000;
                            let date = new Date(time + 8 * 3600 * 1000);
                            a = date.toJSON().substr(0, 19).replace("T", " ");
                        }
                    }
                    break;
                default:
                    a = "未知错误,请检查";
                    break;
            }
            return a;
        }
        async done(t = {}) {
            await $.SendMsg(msg);
            const e = new Date().getTime(),
                s = (e - this.startTime) / 1e3;
            console.log(`\n${this.name} 运行结束，共运行了 ${s} 秒！`);
        }
    })(name, env);
}