const e = require("express");
const express = require("express");
const { auth } = require("../middleware/auth");
const { Time } = require("../models/Time");
const { User } = require("../models/User");
const timeRouter = express.Router();

const timeformat = (time) => {
  const ss = (time % 3600) % 60;
  const mm = Math.floor((time % 3600) / 60);
  const hh = Math.floor(time / 3600);
  console.log("timeformat", time, hh, mm, ss);
  return [hh, mm, ss];
};

timeRouter.get("/", (req, res) => {
  res.send("time");
});

//YYYY-MM-DD
timeRouter.get("/day", auth, (req, res) => {
  // 한루 단위로 시간 가져오기
  const body = req.body;
  const [year, month, day] = body.day.split("-");
  const user = req.user;
  user.study;
});

timeRouter.get("/month/:year-:month-:num", auth, async (req, res) => {
  const year = req.params.year;
  const month = req.params.month;
  const num = req.params.num;

  if (num > 12) {
    res.json({ success: false, message: "2년 이상 조회 불가" });
  }
  let call = "";
  for (let i = 0; i < num; i++) {
    let yy = year;
    if (+month + i > 12) {
      yy = +year + 1;
    }
    call += `${yy}.${+month + i}.* |`;
  }

  // const reg = new RegExp(`${year}.\[${month}-${month + num}\].*`);
  // const call = `${month}-${+month + +num}`;
  const reg = new RegExp(call);
  console.log(reg);

  const user = req.user;
  const usertime = [];

  const promises = user.study.map(async (v) => {
    const time = await Time.findOne({ _id: v })
      .exec()
      .then((result) => {
        console.log(result);
        if (result.date.match(reg)) {
          const day = result.date.replaceAll(".", "-");
          usertime.push({ value: result.time, day: day });
        }
      })
      .catch((e) => console.error(e));
  });
  await Promise.all(promises);
  console.log("!!!!!!", usertime);
  res.json({ success: true, data: usertime });
  // 한달 한위로 시간 가져오기
});

//req ) date:YYYY.MM.DD / time:초기준으로 숫자 /
timeRouter.post("/save", auth, async (req, res) => {
  const user = req.user;
  const body = req.body;
  const [year, month, day] = body.date.split(".");
  const key = `${year}.${month}.${day}`;
  const id = user.study[user.study.length - 1];
  console.log("id, key", id, key);
  Time.findOne({ date: key, _id: id }, (err, time) => {
    if (!time) {
      const t = new Time({ date: key, time: body.time });
      console.log("t id", t._id);
      user.study.push(t._id);
      t.save();
    } else {
      console.log(time);
      time.time += body.time;
      time.save();
    }
    const formattime = timeformat(body.time);
    const totaltime = user.totaltime.split(":").map((v) => +v);

    const newtime = [formattime[0] + totaltime[0]];
    console.log("new", newtime, formattime, totaltime);

    for (let i = 1; i < 3; i++) {
      newtime.push(formattime[i] + totaltime[i]);
      if (newtime[i] > 60) {
        newtime[i] -= 60;
        newtime[i - 1]++;
      }
    }

    console.log(formattime);
    console.log(newtime);
    // user.totaltime = totaltime;
    console.log("totaltime", user.totaltime, newtime, body, time);
    user.totaltime = newtime.join(":");
    user.save();
  });

  console.log(user.study);
  res.json({ success: true });
});

module.exports = timeRouter;
