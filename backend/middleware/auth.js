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

    next();
  });
};

module.exports = { auth };
