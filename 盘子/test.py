import base64
import json
import requests

print(" ")
# ******************OCR识别部分开始******************
host = "http://81.70.196.85:9898"
# 目标检测就把ocr改成det,其他相同
# 方式一
# file = open(r"test.jpg", "rb").read()
# file = open(r'test_calc.png', 'rb').read()




with open("./11.txt", "r") as file:
    print(file.read())


# api_url = f"{host}/ocr/b64/json"
# resp = requests.post(api_url, data=base64.b64encode(file).decode())
# print(f"{api_url=}, {resp.text=}")
