const express = require("express");
const { auth } = require("../middleware/auth");
const timeRouter = express.Router();
const { User } = require("../models/User");

timeRouter.get("/", (req, res) => {
  res.send("time");
});

timeRouter.get("/day", auth, (req, res) => {
  // 한루 단위로 시간 가져오기
  const monday = req.body.monday;
  const user = req.user;
  console.log(user, typeof user);
  monday.forEach((v) => {
    console.log(v);
    console.log(typeof v);
    console.log(user.study);
  });
  res.json({ success: true });
});

timeRouter.get("/month", (req, res) => {
  // 한달 한위로 시간 가져오기
});

//req ) date:0000.00.00 / time:hh:mm:ss / end:YYYY.MM.DD
timeRouter.post("/save", auth, (req, res) => {
  const user = req.user;
  const body = req.body;
  // const find =
  //   req.user.study[req.user.study.length - 1]?.date === req.body.date;
  // console.log("body", find, req.body);
  // const body = req.body;
  // if (find) {
  //   req.user.study[req.user.study.length - 1].timeinfo.push({
  //     time: body.time,
  //     start: body.start,
  //     end: body.end,
  //   });
  // } else {
  //   req.user.study.push({
  //     date: body.date,
  //     timeinfo: {
  //       time: body.time,
  //       start: body.start,
  //       end: body.end,
  //     },
  //   });
  // }
  // console.log(req.user.study);
  // const time = req.user.totaltime.split(":").map((v) => +v);
  // const reqTime = body.time.split(":").map((v) => +v);
  // for (let i = 1; i < 3; i++) {
  //   console.log(i);
  //   time[i] += reqTime[i];
  //   if (time[i] > 60) {
  //     time[i] %= 60;
  //     time[i - 1]++;
  //   }
  // }
  // req.user.totaltime = time.join(":");
  // console.log(time, reqTime);
  // req.user.save();
  // res.json({ success: true });
});

module.exports = timeRouter;
