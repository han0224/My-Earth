const express = require("express");
const { auth } = require("../middleware/auth");
const { Time } = require("../models/Time");
const { User } = require("../models/User");
const timeRouter = express.Router();

const timeformat = (time) => {
  const ss = (time % 3600) % 60;
  const mm = Math.floor((time % 3600) / 60);
  const hh = Math.floor(time / 3600);
  return [hh, mm, ss];
};

timeRouter.get("/", (req, res) => {
  res.send("time");
});

//YYYY-MM-DD
timeRouter.get("/day", auth, (req, res) => {
  // 한루 단위로 시간 가져오기
  // const body = req.body;
  // const [year, month, day] = body.day.split("-");
  // const user = req.user;
  // user.study;
});

timeRouter.get("/today/:day", auth, async (req, res) => {
  const day = req.params.day;
  const user = req.user;
  const id = user.study[user.study.length > 0 ? user.study.length - 1 : -1];
  const time = await Time.findOne({ _id: id });
  if (time !== null && time.date === day) {
    return res.status(200).json({ time: time.time });
  } else {
    return res.status(200).json({ time: 0 });
  }
});

timeRouter.get("/month/:year-:month-:num", auth, async (req, res) => {
  const year = req.params.year;
  const month = req.params.month;
  const num = req.params.num;

  if (num > 12) {
    return res.status(400).json({ err: "2년 이상 조회 불가" });
  }
  let call = "";
  for (let i = 0; i < num; i++) {
    let yy = year;
    if (+month + i > 12) {
      yy = +year + 1;
    }
    call += `${yy}-${+month + i}-* |`;
  }

  // const reg = new RegExp(`${year}.\[${month}-${month + num}\].*`);
  // const call = `${month}-${+month + +num}`;
  const reg = new RegExp(call);

  const user = req.user;
  const usertime = [];
  if (user.study) {
    const promises = user.study.map(async (v) => {
      const time = await Time.findOne({ _id: v })
        .exec()
        .then((result) => {
          if (result.date.match(reg)) {
            // const day = result.date.replaceAll(".", "-");
            usertime.push({ value: result.time, day: result.date });
          }
        })
        .catch((e) => console.error(e));
    });
    await Promise.all(promises);
  }
  res.status(200).json({ data: usertime });
  // 한달 한위로 시간 가져오기
});

const savetotalTime = (time, user) => {};

//req ) date:YYYY-MM-DD / time:초기준으로 숫자 /
timeRouter.post("/save", auth, async (req, res) => {
  const user = req.user;
  const body = req.body;
  const key = body.date;

  try {
    let time;
    if (user.study.length === 0) {
      time = new Time({ date: key, time: body.time });
      user.study = [time._id];
      time.save();
    } else {
      const id = user.study[user.study.length - 1];
      time = await Time.findOne({ date: key, _id: id }, (err, time) => {
        if (err) {
          console.log("save: err");
          return res.status(500).json({ err: err });
        }
        if (time === null) {
          // 현재 시간에 저장이 되어있지 않으면
          // 새로운 객체를 만들어 저장
          const t = new Time({ date: key, time: body.time });
          user.study.push(t._id);
          t.save();
        } else {
          // 현재 시간이 저장되어 있으면
          // 해당 시간에 현재 시간 더하기
          time.time = body.time;
          time.save();
        }
      })
        .clone()
        .catch((e) => console.log(e));
    }

    // 전체 시간
    const formattime = timeformat(body.time);
    const totaltime = user.totaltime.split(":").map((v) => +v);

    const newtime = [formattime[0] + totaltime[0]];

    for (let i = 1; i < 3; i++) {
      newtime.push(formattime[i] + totaltime[i]);
      if (newtime[i] > 60) {
        newtime[i] -= 60;
        newtime[i - 1]++;
      }
    }
    user.totaltime = newtime.join(":");
    user.save();
    return res.status(204).end();
  } catch (e) {
    console.log("save: catch");

    return res.status(500).json({ err: e });
  }
});

module.exports = timeRouter;
