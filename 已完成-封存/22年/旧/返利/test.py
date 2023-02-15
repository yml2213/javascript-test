# !/bin/env python3
# -*- coding: utf-8 -*
"""
    new Env("返利")
    Name: 返利app   
    Author: yml
    Date: 2022.8.20
    cron: 4 7-20 * * *    fanli.py

    邀请链接: http://m.wan9pi.cn/Invite/promotion?id=775&spm=page_name.h5.pty-wxzcpv~std-65354&go=http%3A%2F%2Fhuodong.wan9pi.cn%2Fh5%2FInvitefriendsreward%2FregisterCallback%3Fuserid%3D100675915%26id%3D775%26sn%3D5501ae41c9033682618f33b76c1c9f53
    
    感谢支持


    8.20    每日签到, 看视频 任务列表(新手任务不会做)
    ================== 青龙--配置文件 ==================
    变量格式: export fanli_data=" PHPSESSID @ PHPSESSID "    多账号用 换行 或 @ 分割

    教程:  取 huodong.fanli.com  域名的包, cookie中 PHPSESSID  只要这一个就行
"""
# ================================= 以下代码不懂不要随便乱动 ====================================
try:
    import requests, json, sys, os, re, time, random
except Exception as e:
    print(e)
requests.packages.urllib3.disable_warnings()
# --------------------------------------------------------------------------------------------
Script_Name = "返利"
Name_Pinyin = "fanli"
Script_Change = "每日签到, 看视频 任务列表(新手任务不会做)"
Script_Version = "0.1.1"
# --------------------------------------------------------------------------------------------


def _env():  # 环境配置
    # mac_env(f"{Name_Pinyin}_data")
    ql_env(f"{Name_Pinyin}_data")


def start():
    for inx, data in enumerate(ckArr):
        msg("=============== 开始第" + str(inx + 1) + "个账号 ===============")
        ck = data.split("&")
        # print(ck[0])
        # print(ck[1])
        fanli = Script(ck[0])
        fanli.user_info("用户信息")
        fanli.do_sign("签到")
        fanli.video("看视频得金币")
        fanli.task_list("任务列表")
        fanli.check_coin("查金币")


class Script:
    def __init__(self, PHPSESSID):
        self.PHPSESSID = PHPSESSID

    def url(self, name):  # hostname + xxxx
        url = f"https://huodong.fanli.com/{name}"
        return url

    def headers(self):
        headers = {
            "accept": "application/json, text/javascript, */*; q=0.01",
            "cookie": f"PHPSESSID={self.PHPSESSID}",
            "User-Agent": "Mozilla/5.0 (Linux; Android 12; M2102J2SC Build/SKQ1.211006.001; wv) AppleWebKit/537.36 (KHTML, like Gecko) Version/4.0 Chrome/96.0.4664.104 Mobile Safari/537.36 Fanli/7.19.28.6 (ID:2-560135116-66740356908189-4-0; WVC:WV; SCR:1080*2340-2.75)",
        }
        # print(headers)
        return headers

    def headers2(self):
        global cookie_y, token_y
        headers = {
            "accept": "application/json, text/plain, */*",
            "cookie": cookie_y,
            "user-agent": "Mozilla/5.0 (Linux; Android 6.0; Nexus 5 Build/MRA58N) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/104.0.0.0 Mobile Safari/537.36",
            "CSRF-TOKEN": token_y,
        }
        # print(headers)
        return headers

    def do_sign(self, name="签到"):  # 执行签到奖励
        try:
            response = requests.get(
                url=self.url("sign82580/ajaxSetUserSign"),
                headers=self.headers(),
                verify=False,
            )
            result = response.json()
            # print(result)
            if result["status"] == 1 and result["data"]["reward"] != 0:
                msg(f"{name}: 成功, 获得{result['data']['reward']}金币!")
                time.sleep(3)
            elif result["data"]["reward"] == 0:
                msg(f"{name}: 今天已签到,明天再来吧!")
            else:
                msg(f"{name}: 失败, 请稍后再试!")
                print(result)
        except Exception as err:
            print(err)

    def video(self, name="看视频得金币"):  # 看视频得金币
        try:
            response = requests.get(
                url=self.url("sign82580/ajaxSetUserTask?id=19&pos=1"),
                headers=self.headers(),
                verify=False,
            )
            result = response.json()
            # print(result)
            if result["status"] == 1:
                msg(f"{name}: 成功!")
                msg("冷却100秒...")
                time.sleep(100)
                self.video()
            elif result["status"] == 0:
                msg(f"{name}: {result['info']}")
            else:
                msg(f"{name}: 失败, 请稍后再试!")
                print(result)
        except Exception as err:
            print(err)

    def user_info(self, name="用户信息"):  # 用户信息
        try:
            response = requests.get(
                url=self.url("sign82580/ajaxMainInit"), headers=self.headers()
            )
            result = response.json()
            # print(result)
            if result["status"] == 1:
                task_list = result["data"]["task_list"]["daily_task"]
                msg(
                    f"{name}: 成功!\n欢迎:{result['data']['userid']}, 金币余额: {float(result['data']['points'])}"
                )
                # print(task_list)
                return task_list
                # time.sleep(3)
            elif result["status"] == 0:
                msg(f"{name}: 失败, 请检查变量&脚本更新到最新再试试")
            else:
                msg(f"{name}: 失败, 请稍后再试!")
                print(result)
        except Exception as err:
            print(err)

    def task_list(self, name="任务列表"):  # 任务列表
        try:
            tasks = self.user_info()
            # print(task_list)
            if tasks:
                for task in tasks:
                    if task["id"] == "17":
                        print(task["title"])
                        time_list = [7, 8, 9, 10, 11, 12, 13, 14, 17, 18, 19, 20]
                        time_hour = time.localtime().tm_hour
                        if time_hour in time_list:
                            self.do_task(task["id"], task["title"])

                    elif task["id"] != "17" and task["is_finish"] == 0:
                        print(task["title"], "未完成")
                        self.do_task(task["id"], task["title"])
                    else:
                        print(task["title"], ": 完成")

            else:
                msg(f"{name}: 失败, 请稍后再试!")
                # print(result)
        except Exception as err:
            print(err)

    def do_task(self, id, name="做任务"):  # 做任务
        try:
            response = requests.get(
                url=self.url(f"sign82580/ajaxSetUserTask?id={id}&pos="),
                headers=self.headers(),
                verify=False,
            )
            result = response.json()
            # print(result)
            if result["status"] == 1:
                msg(f"{name}: 成功!")
                time.sleep(5)
            elif result["status"] == 0:
                msg(f"{name}: {result['info']}")
            else:
                msg(f"{name}: 失败, 请稍后再试!")
                print(result)
        except Exception as err:
            print(err)

    def check_coin(self, name="查金币"):  # 查金币
        try:
            response = requests.get(
                url=self.url("sign82580/ajaxMainInit"), headers=self.headers()
            )
            result = response.json()
            # print(result)
            if result["status"] == 1:
                msg(f"{name}: 余额: {float(result['data']['points'])}")
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
        response = requests.get(url=_url, headers=_headers, verify=False)
        result = response.text
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
            r = re.compile(r'fanli_data="(.*?)"', re.M | re.S | re.I)
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
                response = requests.get(url)
                with open("sendNotify.py", "w+", encoding="utf-8") as f:
                    f.write(response.text)
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
    global ckArr, msg_info, cookie_y, token_y
    _env()
    tip()
    start()
    send(f"{Script_Name}", msg_info)
