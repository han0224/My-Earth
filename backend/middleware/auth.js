const { User } = require("../models/User");

const auth = (req, res, next) => {
  if (req.session.userEmail) {
    User.findOne({ email: req.session.userEmail }, (err, user) => {
      if (user) {
        req.user = user;
        next();
      }
    });
  } else {
    return res
      .status(401)
      .json({ success: false, err: "로그인되어 있지 않음" });
  }
};

module.exports = { auth };
