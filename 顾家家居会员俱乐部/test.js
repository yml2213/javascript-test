var request = require('request');

var headers = {
	'Host': 'mc.kukahome.com',
	'content-type': 'application/json',
	'X-Customer': '1040387',
	'brandCode': 'K001'
};

var dataString = '{"identityType":"mobile","membershipId":"1040387","customerId":"1265135171338975232","authorization":"Bearer eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiIxNTMzOTk1NjY4MyIsImF1dGgiOiJkZXB0OmVkaXQsdXNlcjpsaXN0LHRhc2tzTGlzdGluZzpkZWwsZGVwdDphZGQsb3JkZXJMaW5lLG1lbnU6ZGVsLG1lbWJlckdyZWVuQ2hhbm5lbDpkZWwscm9sZXM6ZGVsLHVzZXI6ZGVsLG1haW50ZW5hbmNlSW1nOmRlbCx3b25kZXJmdWxQcm9qZWN0OmFkZCxjb21tb25Qcm9ibGVtczpsaXN0LGFjdGl2aXR5UnVsZXM6bGlzdCxkZXB0Omxpc3Qsam9iOmxpc3QsbWFpbnRlbmFuY2VJbWc6ZWRpdCxjb21tb25Qcm9ibGVtczplZGl0LGRpY3Q6bGlzdCxtYWludGVuYW5jZVByZXJvZ2F0aXZlOmRlbCxtYWludGVuYW5jZUltZzphZGQsd29uZGVyZnVsUHJvamVjdDpkZWwsb3JkZXJJbmZvOmxpc3QsdGFza3NMaXN0aW5nOmxpc3QscnVsZXNNZXNzYWdlOmxpc3QsY29tbW9uUHJvYmxlbXM6YWRkLHRhc2tzTGlzdGluZzphZGQsd29uZGVyZnVsUHJvamVjdDpsaXN0LG1lbWJlckdyZWVuQ2hhbm5lbDpsaXN0LG1lbWJlckdyZWVuQ2hhbm5lbDphZGQscm9sZXM6YWRkLHVzZXI6YWRkLG1haW50ZW5hbmNlUHJlcm9nYXRpdmU6ZWRpdCxtZW51OmVkaXQsbWVudTpsaXN0LGNvbW1vblByb2JsZW1zOmRlbCxtYWludGVuYW5jZUltZzpsaXN0LG1haW50ZW5hbmNlUHJlcm9nYXRpdmU6bGlzdCxyb2xlczpsaXN0LHdvbmRlcmZ1bFByb2plY3Q6ZWRpdCxtZW51OmFkZCxtZW1iZXJHcmVlbkNoYW5uZWw6ZWRpdCx1c2VyOmVkaXQscm9sZXM6ZWRpdCxtYWludGVuYW5jZVByZXJvZ2F0aXZlOmFkZCx0YXNrc0xpc3Rpbmc6ZWRpdCxkZXB0OmRlbCIsImV4cCI6MTY1NTE1NTA2NX0.8kbmnUaf6am5hBNzwZv6wTGwlCyyZZ9HVy8YtLcUraqGEiuj2nmNB7B-SfHBWrk59bW2zxIQxCvsUSQFRJCMZQ"}';

var options = {
	url: 'https://mc.kukahome.com/club-server/front/member/signIn',
	method: 'POST',
	headers: headers,
	body: dataString
};

function callback(error, response, body) {
	if (!error && response.statusCode == 200) {
		console.log(body);
	}
}

request(options, callback);
