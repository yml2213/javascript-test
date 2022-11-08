
/**
 * @fileoverview Template to compose HTTP reqeuest.
 * 
 */

const url = `http://www.zeguoren.com/plugin.php?id=it618_credits:ajax&formhash=497ce2d2&ac=qd`;
const method = `GET`;
const headers = {

'Cookie' : `3XBO_2132_connect_is_bind=0; 3XBO_2132_lastact=1663384144%09plugin.php%09; 3XBO_2132_lip=119.126.25.17%2C1663380418; 3XBO_2132_sid=fgj4WD; 3XBO_2132_forum_lastvisit=D_276_1663380421; 3XBO_2132_st_t=21447%7C1663380421%7C46e258e398c12c9630c74d2e398a8f48; 3XBO_2132_auth=0006ByMPMCXAgZcfpSveZ%2FWbODMbQOZRv2fNZGZVAfPxDvBpO0E64HDGoO1qebQ0lnqWqWMUVFsThkj3Ewr9piFMCQ; 3XBO_2132_lastcheckfeed=21447%7C1663380418; 3XBO_2132_ulastactivity=be3f1x7N8BDLLB4fm8U2mh%2BxdTXvZinOaZiHwiJHDHv%2Bsnc37aeM; 3XBO_2132_lastvisit=1663376773; 3XBO_2132_saltkey=HNBObV6P; 3XBO_2132_visitedfid=276`
};
const body = ``;

const myRequest = {
    url: url,
    method: method,
    headers: headers,
    body: body
};

$task.fetch(myRequest).then(response => {
    console.log(response.statusCode + "\n\n" + response.body);
}, reason => {
    console.log(reason.error);
});
