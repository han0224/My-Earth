const { User } = require("../models/User");

const auth = (req, res, next) => {
  console.log("auth");
  if (req.session.userEmail) {
    User.findOne({ email: req.session.userEmail }, (err, user) => {
      if (user) {
        console.log("middleware", typeof user);
        req.user = user;
        next();
      }
    });
  } else {
    return res.json({ success: false, message: "nonauth" });
  }
};

module.exports = { auth };
