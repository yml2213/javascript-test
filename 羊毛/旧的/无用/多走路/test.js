/*
const arr = ['abc&def', '123&456' ];

for (var i = 0; i < arr.length; i++) {
    x= arr[i].split('&')[0];
    console.log(x);


}
*/
/*

a = 'abc&def@123&456'
b = a.split('@')
for(let i=0; i<2; i++) {
    c = b[i].split('&')
    console.log(c[0])
}*/
/*
a=new Date().getTime()
// 1569507418772
console.log(a)
*/

// var obj = { "name":"runoob", "alexa":10000, "site":"www.runoob.com"};
// var myJSON = JSON.stringify(obj);

var arr = [ "Google", "Runoob", "Taobao", "Facebook" ];
var myJSON = JSON.stringify(arr);
console.log(arr)
console.log(myJSON)