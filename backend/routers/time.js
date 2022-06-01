const express = require("express");
const { auth } = require("../middleware/auth");
const timeRouter = express.Router();
const { User } = require("../models/User");

timeRouter.get("/", (req, res) => {
  res.send("time");
});

timeRouter.get("/day", (req, res) => {
  // 하루 단위로 시간 가져오기
});

timeRouter.get("/month", (req, res) => {
  // 한달 한위로 시간 가져오기
});

timeRouter.post("/save", auth, (req, res) => {
  //   console.log(req.user);
  //   console.log(req.body.date);
  // const find =
  //   req.user.study[req.user.study.length - 1]?.date === req.body.date;
  // console.log(find);
  // if (find) {
  //   const test = req.user.find({ date: req.body.date });
  //   conosle.log(test);
  // } else {
  //   req.user.study.push({ date: req.body.date, time: req.body.time });
  // }
  //   //Object.keys(req.user).includes(req.body.date);
  //   //req.user.includes(req.body.date);
  //   //   console.log(req.user.study[req.user.study.length - 1].date);
  //   console.log(find);
  //   if (find) {
  //     req.user.study.push({
  //       time: { $each: req.body.time, $position: req.user.study.length - 1 },
  //     });
  //   } else {
  //     req.user.study.push({ date: req.body.date, time: req.body.time });
  //   }
  //   req.user.totaltime += req.body.time;
  //   req.user.save();
  //   res.json({ success: true });
  // 시간 저장
});

module.exports = timeRouter;
