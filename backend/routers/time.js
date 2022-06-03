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
  const find =
    req.user.study[req.user.study.length - 1]?.date === req.body.date;
  // console.log(
  //   find,
  //   req.user.study[req.user.study.length - 1]?.date,
  //   req.body.date,
  //   req.user.study
  // );
  console.log("body", find, req.body);
  const body = req.body;
  if (find) {
    req.user.study[req.user.study.length - 1].timeinfo.push({
      time: body.time,
      start: body.start,
      end: body.end,
    });
    // conosle.log(test);
  } else {
    req.user.study.push({
      date: body.date,
      timeinfo: {
        time: body.time,
        start: body.start,
        end: body.end,
      },
    });
  }
  console.log(req.user.study);
  const time = req.user.totaltime.split(":").map((v) => +v);
  const reqTime = body.time.split(":").map((v) => +v);
  for (let i = 1; i < 3; i++) {
    console.log(i);
    time[i] += reqTime[i];
    if (time[i] > 60) {
      time[i] %= 60;
      time[i - 1]++;
    }
  }
  req.user.totaltime = time.join(":");
  console.log(time, reqTime);

  req.user.save();
  res.json({ success: true });
});

module.exports = timeRouter;
