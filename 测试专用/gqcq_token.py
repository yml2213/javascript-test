# !/bin/env python3
# -*- coding: utf-8 -*
"""
广汽传祺  短信验证码登陆   获取 token

运行需要 python3 环境， 直接 python3 xxx   文件路径+文件名 即可

需要安装 requests 依赖
"""
# ================================= 以下代码不懂不要随便乱动 ====================================
try:
    import requests, json, sys, os, re, time, random, hashlib
except Exception as e:
    print(e)
requests.packages.urllib3.disable_warnings()


def MD5(content):
    md_obj = hashlib.md5()
    md_obj.update(content.encode("utf-8"))
    md_res = md_obj.hexdigest()
    return md_res


reqTs = str(int(round(time.time() * 1000)))
reqNonc = str(random.randint(100000, 999999))
salt = "17aaf8118ffb270b766c6d6774317a133.8.0"
reqSign = MD5(f"signature{reqNonc}{reqTs}{salt}")


def getToken(phone, code, name="获取token"):
    url = "https://gsp.gacmotor.com/gateway/app-api/login/mobile"
    headers = {"Content-Type": "application/x-www-form-urlencoded;charset=utf-8"}
    payload = f"mobile={phone}&smsCode={code}"
    # print(url)
    # print(payload)
    try:
        res = requests.request("POST", url, headers=headers, data=payload).json()
        # res.close()
        # print(res)
        if res["errorCode"] == "200":
            print(f"{name}: 成功  \n您的token:    {res['data']['token']}")
        else:
            print(f"{name}: 失败, 请稍后再试!")
            print(res)
    except Exception as err:
        print(err)


def getCode(phone, name="获取验证码"):
    url = f"https://gsp.gacmotor.com/gateway/app-api/message/sendSmsByPlatform?mobile={phone}&code=3&ts={reqTs}&sign={reqSign}&platform=app"
    # print(url)
    try:
        res = requests.request("GET", url, headers={}, data={}).json()
        # res.close()
        # print("==========")
        print(res["errorCode"] == "200")
        if res["errorCode"] == "200":
            print(f"{name}: 成功, 时间:{res['systemDate']}")
            time.sleep(3)

            code = input("请输入验证码：")
            if len(code) == 4:
                getToken(phone, code)
            else:
                code = input("请输入正确的验证码：")

        else:
            print(f"{name}: 失败, 请稍后再试!")
            print(res)
    except Exception as err:
        print(err)


# 1. 获取输入的 手机号
phone = input("请输入手机号：")
if len(phone) == 11:
    getCode(phone)

else:
    phone = input("请输入正确的手机号：")
