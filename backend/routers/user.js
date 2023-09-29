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
  // 저장, 에러시 json 형식으로 전달
  try {
    user.save();
    return res.status(204).end();
  } catch (e) {
    return res.status(500).json({ err: e });
  }
});

userRouter.post("/login", async (req, res) => {
  const userInfo = User.findOne({ email: req.body.email }, (err, user) => {
    if (!user) {
      return res.status(401).json({
        err: "로그인 오류",
      });
    }

    user.comparePassword(req.body.password, (err, isMath) => {
      if (!isMath) {
        return res.status(401).json({
          err: "로그인 오류",
        });
      }
      req.session.userEmail = user.email;
      return res.status(200).json({
        email: req.session.userEmail,
        name: user.name,
        time: user.totaltime,
      });
    });
  });
});

userRouter.get("/auth", auth, (req, res) => {
  res.status(200).json({
    email: req.user.email,
    name: req.user.name,
    time: req.user.totaltime,
  });
});

userRouter.get("/logout", (req, res) => {
  if (req.session.userEmail) {
    req.session.destroy((err) => {
      if (err) {
        return res.status(500).json({ err: err });
      }
      return res.status(200).end();
    });
  } else {
    res.status(401).json({ err: "로그인 중이 아님" });
  }
});

userRouter.get("/image", auth, (req, res) => {
  // 1. 이미지를 기본이미지로 전부 저장해두기
  // 2. 이미지가 없으면 빈 문자열을 반환해 프론트에서 처리하기
  try {
    const img = req.user.image || "";
    return res.status(200).json({ data: img });
  } catch (e) {
    return res.status(500).json({ err: e });
  }
});

userRouter.post("/set/image", auth, (req, res) => {
  const body = req.body;
  const user = req.user;
  try {
    user.image = body.image;
    user.save();
    return res.status(204).end();
  } catch (e) {
    return res.status(500).json({ err: e });
  }
});
module.exports = userRouter;
