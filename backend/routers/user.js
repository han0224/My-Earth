const express = require("express");
const userRouter = express.Router();
const { User } = require("../models/User");
const { auth } = require("../middleware/auth");

userRouter.get("/", (req, res) => {
  res.send("user");
});

userRouter.post("/register", (req, res) => {
  // 회원가입시 필요한 정보들을 client 에서 가져오면
  // db에 넣어줌
  const user = new User(req.body);
  console.log(user, req.body);
  // 저장, 에러시 json 형식으로 전달
  user.save((err, userInfo) => {
    if (err) {
      return res.json({ success: false, err });
    } else {
      return res.status(200).json({ success: true });
    }
  });
});

userRouter.post("/login", async (req, res) => {
  const userInfo = User.findOne({ email: req.body.email }, (err, user) => {
    console.log("user", user);
    if (!user) {
      return res.json({
        success: false,
        message: "유저가 없습니다",
      });
    }

    user.comparePassword(req.body.password, (err, isMath) => {
      if (!isMath) {
        return res.json({
          success: false,
          message: "비밀번호가 틀렸습니다.",
          error: isMath,
        });
      }

      req.session.save(function () {
        req.session.userEmail = user.email;
        res.json({ success: true });
        if (err) console.log(err);
      });
    });
  });

  console.log("userinfo", userInfo);
});

userRouter.get("/auth", auth, (req, res) => {
  res.json({
    success: true,
    email: req.user.email,
    name: req.user.name,
    time: req.user.totaltime,
  });
});

userRouter.get("/logout", (req, res) => {
  console.log(req.session);
  if (req.session.userEmail) {
    req.session.destroy((err) => {
      if (err) throw err;
      res.json({ success: true });
    });
  } else {
    res.json({ success: false });
  }
});

module.exports = userRouter;
