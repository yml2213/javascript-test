import requests

url = "https://oshwhub.com/api/gift/exchangeGift"

payload = 'gift_uuid=097613c5def44c22b420cc599045a511'
headers = {
    'authority': 'oshwhub.com',
    'pragma': 'no-cache',
    'x-requested-with': 'XMLHttpRequest',
    'Cookie': 'oshwhubReferer=eyJpdiI6Ijg3Z2dHOUNnSFBqcUliMm9hYWMwd0E9PSIsInZhbHVlIjoiZjA4RHIyZEF3Smw3UmpRQ05xQ0o5QWhVXC9WK1g1MjRCTG5WMXZtM2NzbWxaTmZxN1RiREc3b1RLUzFJV3pYQ1J4anFRS1lnY0pGb0owZno5YWdoak04WFA1c1M1N1wvXC84alRlOFduUGhiWVdqcGN2M3pPcnhtcDVkNU16ak5ZZWYiLCJtYWMiOiI5NjVkMTBmNTIxOTUxYjEyZDdiNDQxNzVjZGVlYTUzMzA1NmFiNGIxZTc0NTg5NDc4OGIzNWNkNmM5YmQ2ZmZiIn0%3D; acw_tc=76b20fe516817055861212642e30a75aeb497fd41ed494db1b8a91284c4132; Hm_lvt_ce257455315c373d95fb598829d3cd09=1681705588; CASAuth=k7kiu4g80lt8e12imgd1mpaji7; Hm_lpvt_ce257455315c373d95fb598829d3cd09=1681705697; oshwhub_session=eyJpdiI6InQxKzA3TmlxQm81WWEzdmtQQjhiRHc9PSIsInZhbHVlIjoic3B2QkVYMzJYSDJVSDRQUjYxSmhSNU4yMGdNSkVzT1VXcU9WUzdVdjNGSmd4U3NuemlUZFZtNXlHYThISDdFZiIsIm1hYyI6IjJlNzNkNWM5ZDkzZjNjNTA3NzJhYWIxOTAyYTRmODdlYWExYTZhY2YzNTIxNWM4NWEzNTQ2M2Y3OWNjOGU0ODcifQ%3D%3D',
    'User-Agent': 'Apifox/1.0.0 (https://www.apifox.cn)',
    'content-type': 'application/x-www-form-urlencoded; charset=UTF-8'
}

response = requests.request("POST", url, headers=headers, data=payload)

print(response.text)
