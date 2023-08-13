let curl = 'curl -H "Host: qfapi.dazouping.com" --data-binary "{\"encode\":1,\"password\":\"eW1sMTIzNDU2\n\",\"black_box\":\"\",\"username\":\"yml\"}" --compressed "https://qfapi.dazouping.com/v5_0/user/login"'

let result = curl.replace(/\n/g, '')
console.log(result)
