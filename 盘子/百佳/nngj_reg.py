import requests


user_name = "qwer123"
pwd = "qwer1234"
invite_code = ""  # 邀请码 50314875
reg_num = "2"


def get_code(url):
    api_url = "http://81.70.196.85:9898/ocr/file"
    headers = {
        "Content-Type": "application/x-www-form-urlencoded; charset=UTF-8",
        "User-Agent": "Mozilla/5.0 (Windows NT 10.0; WOW64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/86.0.4195.1 Safari/537.36",
    }
    resp = requests.get(
        url,
        headers=headers,
        verify=False,
    )
    captcha_img = resp.content
    # 识别
    resp = requests.post(api_url, files={"image": captcha_img})
    # print("验证码结果", resp.text)
    code = resp.text
    return code


# 获取验证码
code = get_code("http://niunai.mkjng.top:1003/captcha/flat?MpKTuXFp")
print(code)


def reg():
    url = "http://niunai.mkjng.top:1003/register.html"

    payload = f"username={user_name}&phone=13754658888&password={pwd}&pwdconfirm={pwd}&yaoqingren={invite_code}&captcha={code}&_token=N4gANmIkE7fDhRZdXioyaPbEOMjlGDCySjlZ7fPL"
    headers = {"Content-Type": "application/x-www-form-urlencoded; charset=UTF-8"}

    response = requests.request("POST", url, headers=headers, data=payload)

    print(response.text)
