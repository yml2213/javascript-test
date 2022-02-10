/*
const arr = ['abc&def', '123&456' ];

for (var i = 0; i < arr.length; i++) {
    x= arr[i].split('&')[0];
    console.log(x);


}
*/

a = 'abc&def@123&456'
b = a.split('@')
for(let i=0; i<2; i++) {
    c = b[i].split('&')
    console.log(c[0])
}