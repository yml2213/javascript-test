# !/bin/env python3
# -*- coding: utf-8 -*
"""
    new Env("格林酒店")
    Name: 格林酒店   app   
    Author: yml
    Date: 2022.8.22
    cron: 4 7,12 * * *    gljd.py

    地址: https://app.xilaidengjiudiana.com/   邀请码:6e8dd9

    ================== 青龙--配置文件 ==================
    变量格式: export gljd_data=" phone & pwd @ phone & pwd "    多账号用 换行 或 @ 分割

"""
# ================================= 以下代码不懂不要随便乱动 ====================================
try:
    import requests, json, sys, os, re, time, random
except Exception as e:
    print(e)
requests.packages.urllib3.disable_warnings()
# --------------------------------------------------------------------------------------------
Script_Name = "格林酒店"
Name_Pinyin = "gljd"
Script_Change = "资金盘,0薅就行,坑了被找我"
Script_Version = "0.1.1"
# --------------------------------------------------------------------------------------------

def _env():  # 环境配置
    # mac_env(f"{Name_Pinyin}_data")
    ql_env(f"{Name_Pinyin}_data")


def start():
    for inx, data in enumerate(ckArr):
        msg("=============== 开始第" + str(inx + 1) + "个账号 ===============")
        ck = data.split("&")
        # print(ck)
        # print(ck[0])
        # print(ck[1])
        gljd = Script(ck[0], ck[1])
        gljd.login("登录")
        gljd.sign_info("签到查询")
        gljd.prize_info("转盘次数")
        gljd.user_info("用户信息")


class Script:
    def __init__(self, num, pwd):
        self.num = num
        self.pwd = pwd

# https://app.gelinjiuidnaq.com
    def url(self, name):  # hostname + xxxx   
        url = f"https://app.gelinjiuidnaq.com/api/v1/{name}"
        return url

    def headers(self):
        headers = {
            "content-type": "application/json; charset=utf-8",
            "authorization": f"Bearer {token_y}",
        }
        # print(headers)
        return headers

    def headers2(self):
        headers = {
            "content-type": "application/json; charset=utf-8",
        }
        # print(headers)
        return headers

    def login(self, name="登录"):
        global token_y
        try:
            data = {"password": self.pwd, "username": self.num}
            resp = requests.post(
                url=self.url("user/login"),
                headers=self.headers2(),
                data=json.dumps(data),
                verify=False,
            )
            result = resp.json()
            resp.close()
            # print(result)
            if result["expire_sec"]:
                msg(f"{name}: 成功,  时间:{result['expire_time']}")
                time.sleep(3)
                token_y = result["token"]
            elif result["error"]:
                msg(f"{name}: 失败, {result['msg']}")
            else:
                msg(f"{name}: 失败, 请稍后再试!")
                print(result)
        except Exception as err:
            print(err)

    def sign_info(self, name="签到查询"):
        try:
            resp = requests.get(
                url=self.url("sign"),
                headers=self.headers(),
                verify=False,
            )
            result = resp.json()
            resp.close()
            # print(result)
            if not result["is_today_sign"]:
                msg(f"{name}: 没有签到,去签到")
                time.sleep(1)
                self.do_sign()()
            elif result["is_today_sign"]:
                msg(f"{name}: 已签到")
            else:
                msg(f"{name}: 失败, 请稍后再试!")
                print(result)
        except Exception as err:
            print(err)

    def prize_info(self, name="转盘次数"):
        try:
            resp = requests.get(
                url=self.url("user-prize-num"),
                headers=self.headers(),
                verify=False,
            )
            result = resp.json()
            resp.close()
            # print(result)
            if result["count"] > 0:
                msg(f"{name}: {result['count']}次")
                time.sleep(1)
                self.do_prize()()
            elif result["count"] == 0:
                msg(f"{name}: {result['count']}次")
            else:
                msg(f"{name}: 失败, 请稍后再试!")
                print(result)
        except Exception as err:
            print(err)

    def do_sign(self, name="执行签到"):
        try:
            data = {}
            resp = requests.post(
                url=self.url("sign"),
                headers=self.headers(),
                data=data,
                verify=False,
            )
            result = resp.json()
            resp.close()
            # print(result)
            if "error" not in result:
                msg(f"{name}, 获得{result['msg']}元")
            elif result["error"] == 3:
                msg(f"{result['msg']}")
            else:
                msg(f"{name}: 失败, 请稍后再试!")
                print(result)
        except Exception as err:
            print(err)

    def do_prize(self, name="执行转盘"):
        try:
            data = {}
            resp = requests.post(
                url=self.url("user-prize"),
                headers=self.headers(),
                data=data,
                verify=False,
            )
            result = resp.json()
            resp.close()
            # print(result)
            if result["id"]:
                msg(f"{name}, 获得{result['remarks']}-{result['integral']}元")
            elif result["error"] == 3:
                msg(f"{result['msg']}")
            else:
                msg(f"{name}: 失败, 请稍后再试!")
                print(result)
        except Exception as err:
            print(err)

    def user_info(self, name="用户信息"):
        try:
            resp = requests.get(url=self.url("user/center"), headers=self.headers())
            result = resp.json()
            resp.close()
            # print(result)
            if result["account"]:
                msg(
                    f"{name}: 成功!\n欢迎:{result['account']}, 余额:{(result['balance'])}元, 可提现余额:{(result['cash_balance'])}元, 邀请码:{(result['code'])}"
                )
            elif result["status"] == 0:
                msg(f"{name}: 失败, 请检查变量&脚本更新到最新再试试")
            else:
                msg(f"{name}: 失败, 请稍后再试!")
                print(result)
        except Exception as err:
            print(err)


# ====================================================================
def last_version(name, mold):
    url = ""
    if mold == 1:
        url = f"https://raw.gh.fakev.cn/yml2213/Python/master/{name}/{name}.py"

    elif mold == 2:
        url = f"http://yml-gitea.ml:2233/yml/Python/raw/branch/master/{name}.py"
    try:
        _url = url
        _headers = {}
        resp = requests.get(url=_url, headers=_headers, verify=False)
        result = resp.text
        r = re.compile(r'Script_Version = "(.*?)"')
        _data = r.findall(result)
        if not _data:
            return "出现未知错误 ,请稍后重试!"
        else:
            return _data[0]
    except Exception as err:
        print(err)


def mac_env(name):
    global ckArr
    pwd = os.path.dirname(os.path.abspath(__file__)) + os.sep
    path = pwd + ".env"
    with open(path, "r+") as f:
        env = f.read()
        if name in env:
            r = re.compile(r'gljd_data="(.*?)"', re.M | re.S | re.I)
            result = r.findall(env)
            # print(data[0])
            if "@" in result[0]:
                _ck = result[0].split("@")
                ckArr = _ck
            elif "\n" in result[0]:
                _ck = result[0].splitlines()
                ckArr = _ck
            else:
                ckArr = result
        else:
            print(f"检查变量 {name} 是否已填写")


def ql_env(name):
    global ckArr
    if name in os.environ:
        ckArr = []
        _data = os.environ[name]
        if "@" in _data:
            _ck = _data.split("@")
            ckArr = _ck
        elif "\n" in _data:
            _ck = _data.splitlines()
            ckArr = _ck
        else:
            ckArr = _data.split("@")


# 通知服务
class Msg(object):
    def __init__(self, m=""):
        self.str_msg = m
        self.message()

    # noinspection PyMethodMayBeStatic
    def get_sendnotify(self):
        if not os.path.exists("sendNotify.py"):
            cur_path = os.getcwd()
            print(f"未找到通知依赖文件,将于脚本执行目录({cur_path})新建:sendNotify.py ")
            try:
                url = "https://raw.gh.fakev.cn/yml2213/Python/master/sendNotify.py"
                resp = requests.get(url)
                with open("sendNotify.py", "w+", encoding="utf-8") as f:
                    f.write(resp.text)
            except Exception as err:
                print(err)
        else:
            print("文件已存在,跳过")

    def message(self):
        global msg_info
        print(self.str_msg)
        try:
            msg_info = f"{msg_info}\n{self.str_msg}"
        except Exception as err:
            # print(err)
            msg_info = "{}".format(self.str_msg)
        sys.stdout.flush()

    def main(self):
        global send
        cur_path = os.getcwd()
        if os.path.exists(cur_path + "/sendNotify.py"):
            try:
                from sendNotify import send
            except Exception as err:
                self.get_sendnotify()
                print(err)
                try:
                    from sendNotify import send
                except Exception as err:
                    print(err)
                    print("加载通知服务失败~")
        else:
            self.get_sendnotify()
            try:
                from sendNotify import send
            except Exception as err:
                print(err)
                print("加载通知服务失败~")


Msg().main()


def msg(data):
    Msg(data)


def tip():
    print("================ 脚本只支持青龙面板 =================")
    print("============ 具体教程以请自行查看顶部教程 =============\n")
    msg(f"🔔 {Script_Name} ,开始! ")
    origin_version = last_version(Name_Pinyin, 1)
    msg(f"📌 本地脚本: {Script_Version}      远程仓库版本: V {origin_version}")
    msg(f"📌 🆙 更新内容: {Script_Change}")
    msg(f"共发现 {str(len(ckArr))} 个账号")


if __name__ == "__main__":
    global ckArr, msg_info, token_y
    _env()
    tip()
    start()
    send(f"{Script_Name}", msg_info)
