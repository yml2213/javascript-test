const {
  getEnvsByName,
  DisableCk,
  EnableCk
} = require("./ql");

const {
  wait,
  checkCk,
  validateCarmeWithType,
  invalidCookieNotify,
  getUserInfo,
  runOne
} = require("./common.js");

function getRandom(_0x202a24, _0x454cf5) {
  return Math.floor(Math.random() * (_0x454cf5 - _0x202a24 + 1) + _0x202a24);
}

(async function a() {
  const _0x20fa7d = process.env.ELE_CARME;
  await validateCarmeWithType(_0x20fa7d, 1);

  const _0x46b0b6 = await getEnvsByName("elmck");

  for (let _0x32ba57 = 0; _0x32ba57 < _0x46b0b6.length; _0x32ba57++) {
    let _0x2e9db3 = _0x46b0b6[_0x32ba57].value;

    if (!_0x2e9db3) {
      console.log(" ❌无效用户信息, 请重新获取ck");
    } else {
      try {
        var _0x24a833 = 0;

        if (_0x46b0b6[_0x32ba57]._id) {
          _0x24a833 = _0x46b0b6[_0x32ba57]._id;
        }

        if (_0x46b0b6[_0x32ba57].id) {
          _0x24a833 = _0x46b0b6[_0x32ba57].id;
        }

        _0x2e9db3 = _0x2e9db3.replace(" ", "");

        let _0x4f0fb6 = await checkCk(_0x2e9db3, _0x32ba57);

        if (!_0x4f0fb6) {
          let _0x38cd3d = await runOne(_0x2e9db3);

          if (_0x38cd3d && _0x38cd3d.indexOf("刷新成功") !== -1) {
            await EnableCk(_0x24a833);
            console.log("第", _0x32ba57 + 1, "账号正常😁\n");
          } else {
            const _0x4a4c48 = await DisableCk(_0x24a833);

            if (_0x4a4c48.code === 200) {
              console.log("第", _0x32ba57 + 1, "账号失效！已🈲用");
            } else {
              console.log("第", _0x32ba57 + 1, "账号失效！请重新登录！！！😭");
            }

            await invalidCookieNotify(_0x2e9db3, _0x46b0b6[_0x32ba57].remarks);
          }
        } else {
          let _0x1d1109 = await getUserInfo(_0x2e9db3);

          if (!_0x1d1109.username) {
            let _0x36ae5a = await runOne(_0x2e9db3);

            if (_0x36ae5a && _0x36ae5a.indexOf("刷新成功") !== -1) {
              await EnableCk(_0x24a833);
              console.log("第", _0x32ba57 + 1, "账号正常😁\n");
            } else {
              const _0x537d98 = await DisableCk(_0x24a833);

              if (_0x537d98.code === 200) {
                console.log("第", _0x32ba57 + 1, "账号失效！已🈲用");
              } else {
                console.log("第", _0x32ba57 + 1, "账号失效！请重新登录！！！😭");
              }
            }

            await invalidCookieNotify(_0x2e9db3, _0x46b0b6[_0x32ba57].remarks);
          } else {
            await runOne(_0x2e9db3);
            await EnableCk(_0x24a833);
            console.log("第", _0x32ba57 + 1, "账号正常😁\n");
          }
        }
      } catch (_0x4bdf90) {
        console.log(_0x4bdf90);
      }
    }

    await wait(getRandom(2, 3));
  }

  process.exit(0);
})();