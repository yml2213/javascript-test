import http.client
import json

conn = http.client.HTTPSConnection("wxblog.xyz")
payload = json.dumps({
   "messages": [
      {
         "role": "user",
         "content": "你是谁"
      }
   ],
   "stream": True,
   "model": "gpt-3.5-turbo",
   "temperature": 0.5,
   "presence_penalty": 2
})
headers = {
   'Authorization': 'Bearer TWpJeE16STVNREl3TVVCeGNTNWpiMjA9',
   'User-Agent': 'Apifox/1.0.0 (https://apifox.com)',
   'Content-Type': 'application/json'
}
conn.request("POST", "/api/blog/free/v1/chat/completions", payload, headers)
res = conn.getresponse()
data = res.read()
print(data.decode("utf-8"))