const { User } = require("../models/User");

let auth = (req, res, next) => {
  // 인증 처리
  //   console.log(req.cookies);
  let token = req.cookies.x_auth;

  User.findToken(token, (err, user) => {
    if (err) throw err;
    if (!user) return res.json({ isAuth: false, error: true });

    req.token = token;
    req.user = user;

    // next: 현재 라우터에서 판단하지 않고 다음 라우터로 넘기겠다.
    next();
  });
};

module.exports = { auth };
