import requests
import random


# ========================== 配置区域 ==============================
reg_num = "3"  # 注册数量
regcode = "207194"  # 邀请码
pw = "jzt123654"  # 密码

# ========================== 配置区域 ==============================


proxy = {"http": "183.129.190.172:9091", "https": "124.71.186.187:3128"}

response = requests.get("https://httpbin.org/ip", proxies=proxy, verify=False)
print("当前ip: ", response.json()["origin"])


# 获取验证码
code_url = "https://api.jiuzhitangfre.com//verify"
response = requests.get(code_url, proxies=proxy, verify=False)
# print(response.json())
result = response.json()
code = result["data"]["captcha"]
print(code)


def RandomPhone():
    prelist = [
        "130",
        "131",
        "132",
        "133",
        "134",
        "135",
        "136",
        "137",
        "138",
        "139",
        "147",
        "150",
        "151",
        "152",
        "153",
        "155",
        "156",
        "157",
        "158",
        "159",
        "186",
        "187",
        "188",
    ]
    randomPre = random.choice(prelist)
    Number = "".join(random.choice("0123456789") for i in range(8))
    phoneNum = randomPre + Number
    return phoneNum


# 注册
reg_url = "http://api.jiuzhitangfre.com//register"
phone_code = RandomPhone()
# payload =f"username={phone_code}&captcha={code}&password={pw}&password2={pw}&code={regcode}"

# response = requests.post(reg_url, data=payload, proxies=proxy)
# result = response.json()
# print(result)

url = "https://api.jiuzhitangfre.com//register"

payload = (
    f"username={phone_code}&captcha={code}&password={pw}&password2={pw}&code=207194"
)

response = requests.request("POST", url, data=payload, verify=False)

print(response.text)
print(response['code'])
# print(response.json())
