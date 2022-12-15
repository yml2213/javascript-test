# -*- coding: utf-8 -*



import requests

url = "https://gsp.gacmotor.com/gateway/app-api/login/mobile"

payload='mobile=15339956683&smsCode=2764'
headers = {
   'Content-Type': 'application/x-www-form-urlencoded;charset=utf-8'
}

response = requests.request("POST", url, headers=headers, data=payload)

print(response.text)
