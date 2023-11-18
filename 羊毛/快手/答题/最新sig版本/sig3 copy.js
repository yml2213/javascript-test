const request = require('request');

const options = {
  method: 'POST',
  url: 'http://81.70.196.85:7006/ksjsb/websig3',
  headers: {
    voucherCode: 'U1Kpq9/U0VxGOMTxVyRtrCnz27iquQCacF8SLPmuszOn5cBT8TnudMzQz5A85TEwiizbNLvMGykFjRhhl3+55Q==',
    'content-type': 'application/json'
  },
  body: {str: `appver=11.6.50.3205browseType=3c=adid=2F31A83F-5F45-47C7-8CC5-069AF4BF964Edid_tag=2egid=DFP176923A7B60DF758DE4E1E09B2068F4E506BDE6D7073D741BCBF28D9673BAgrant_browse_type=AUTHORIZEDkpf=IPADkpn=NEBULAlanguage=zh-Hans-CN%3Bq%3D1mod=iPad11%2C1oDid=D97F9124-A4EB-899A-EBB5-3108FB3ADC8Crdid=2F31A83F-5F45-47C7-8CC5-069AF4BF964EsigCatVer=1userId=3651627786userRecoBit=0{"roundId":"wYSnflALV_BuR7yAQRdkr1AMxgQDnXoW","index":0,"answer":1}`},
  json: true
};

request(options, function (error, response, body) {
  if (error) throw new Error(error);

  console.log(body);
});