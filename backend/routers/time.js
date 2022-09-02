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

  try {
    Time.findOne({ email: user.email }, (err, time) => {
      if (err) {
        return res.status(500).json({ err: err });
      } else if (time === null) {
        const time = new Time({ email: user.email });
        time.save();
        return res.status(200).json({ time: 0 });
      } else {
        const index = time.time.findIndex((value) => value.date === day);
        if (index === -1) return res.status(200).json({ time: 0 });
        else return res.status(200).json({ time: time.time[index].time });
      }
    });
  } catch (err) {
    return res.status(500).json({ err: err });
  }
});

// 한달 찾기
timeRouter.get("/month/:year/:month", auth, async (req, res) => {
  const year = req.params.year;
  const month = req.params.month;
  const user = req.user;

  try {
    await Time.findOne({ email: user.email }, (err, time) => {
      if (err) {
        return res.status(500).json({ err: err });
      } else if (time === null) {
        const newTime = new Time({
          email: user.email,
          time: [],
        });
        newTime.save();
        return res.status(200).json({ data: [] });
      } else {
        const data = time.time.map((v) => {
          const yy = +v.date.split("-")[0];
          const mm = +v.date.split("-")[1];
          if (+year === yy && +month === mm) {
            return { value: v.time, day: v.date };
          }
          return null;
        });
        return res.status(200).json({ data: data.filter((v) => v != null) });
      }
    })
      .clone()
      .catch(function (err) {
        console.log(err);
      });
  } catch (e) {
    return res.status(500).json({ err: e });
  }
});

// 일년 찾기
timeRouter.get("/year/:year", auth, async (req, res) => {
  const { year } = req.params;
  const user = req.user;

  try {
    await Time.findOne({ email: user.email }, (err, time) => {
      if (err) {
        return res.status(500).json({ err: err });
      } else if (time === null) {
        const newTime = new Time({
          email: user.email,
          time: [],
        });
        newTime.save();
        return res.status(200).json({ data: [] });
      } else {
        const data = time.time.map((v) => {
          const yy = +v.date.split("-")[0];
          if (+year === yy) {
            return { value: v.time, day: v.date };
          }
          return null;
        });
        return res.status(200).json({ data: data.filter((v) => v != null) });
      }
    })
      .clone()
      .catch(function (err) {
        console.log(err);
      });
  } catch (e) {
    console.log("!", e);
    return res.status(500).json({ err: e });
  }
});

timeRouter.post("/save", auth, async (req, res) => {
  const user = req.user;
  const body = req.body;
  try {
    await Time.findOne({ email: user.email }, (err, time) => {
      console.log(err, time);
      if (err) {
        return res.status(500).json({ err: err });
      } else if (time === null) {
        // 첫 저장
        const newTime = new Time({
          email: user.email,
          time: [{ date: body.date, time: body.time }],
        });
        newTime.save();
        return res.status(204).end();
      } else {
        const index = time.time.findIndex((obj) => obj.date === body.date);
        if (index === -1) time.time.push({ date: body.date, time: body.time });
        else time.time[index].time = body.time;
        time.save();
        return res.status(204).end();
      }
    });
  } catch (err) {
    return res.status(500).json({ err: err });
  }
});

// 수정 필요
timeRouter.post("/update/totalTime", auth, async (req, res) => {
  // total time 수정
  // 현재 db에 있는 몇 데이터의 totaltime이 이상함
  const user = req.user;
  const body = req.body;
  let totalTime = 0;
  try {
    await Time.findOne({ email: user.email }, (err, time) => {
      if (err) {
        return res.status(500).json({ err: err });
      } else if (time === null) {
        const newTime = new Time({
          email: user.email,
          time: [{ date: body.date, time: body.time }],
        });
        newTime.save();
        return res.status(204).end();
      } else {
        time.time.forEach((v) => {
          totalTime += v.time;
          console.log("!!!!", v);
        });
        console.log("pre", user.totaltime);
        user.totaltime = timeformat(totalTime).join(":");
        console.log("end", user.totaltime);
        user.save();
        return res.status(204).end();
      }
    })
      .clone()
      .catch((e) => console.log("totlatime err: ", e));
  } catch (err) {
    return res.status(500).json({ err: err });
  }
});

module.exports = timeRouter;
