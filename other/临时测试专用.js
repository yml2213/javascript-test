let ary = ['eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJVU0VSX0lEIjoiNjg5MDQ0MTYxMzE3NzU4OTc2MS1XRUIiLCJleHAiOjE2NDQ5OTE5NTl9.uZ-6fmExOsAQoqTl7aTpGy-uS38BPEV3RrR89YLVfuc&eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJVU0VSX0lEIjoiNjg5MDQ0MTYxMzE3NzU4OTc2MS1XRUIiLCJleHAiOjE2NDQ5OTQ2MzV9.72rW4JHQ4Y3NhXqp7J1-QMj9BLh1TyaD2AL3wskSLZ0@123&456'];
// var citrus = aa.at(0);

if (ary && ary.indexOf('@') > -1) {
    wx_yml_ksf_data = ary.split('@');

} else {
    wx_yml_ksf_data = ary.split();
}
;

console.log(wx_yml_ksf_data);



