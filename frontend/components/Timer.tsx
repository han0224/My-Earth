import React, { useEffect, useRef, useState } from "react";
import styles from "../styles/Timer.module.css";
import { VscDebugStart } from "react-icons/vsc";
import { saveTime } from "../apis/timeapi";
import { useDispatch, useSelector } from "react-redux";
import {
  setStart,
  saveTime as savetime,
  setTimer,
  setPreTime,
  setDate,
} from "../store/timer";
import { RootState } from "../store";
import moment from "moment";

const Timer = () => {
  const dispatch = useDispatch();
  const { start, time, timer, preTime, date } = useSelector(
    (state: RootState) => state.timer
  );
  const [opacity, setOpacity] = useState(1);
  const increment = useRef<ReturnType<typeof setInterval>>();

  const ondispatch = (e: React.MouseEvent) => {
    console.log("ondispatch", start, time);
    if (start) {
      dispatch(setStart(false));
      dispatch(setPreTime(time));
      setOpacity(1);
      savetimeapi();
      clearInterval(timer);
    } else {
      const startTime = moment();
      console.log("click", startTime);
      setOpacity(0);
      increment.current = setInterval(() => {
        const currnettime = moment();
        const newDate = moment
          .duration(currnettime.diff(startTime))
          .asSeconds();
        dispatch(savetime(Math.floor(newDate) + preTime));
        console.log("increment", time, currnettime, startTime, preTime);
      }, 1000);
      dispatch(setTimer(increment.current));
      dispatch(setStart(true));
    }
  };

  const savetimeapi = async () => {
    console.log("savetime", date, time);
    const res = await saveTime(date, time);
    if (!res.success) {
      alert("시간 저장에 실패했습니다.");
    }
    // console.log(res);
  };

  const formatTime = (time: number) => {
    console.log("formattime", time);
    // 오늘 하루 시간 더하기
    const min = time / 60;
    const hour = min / 60;
    const sec = time % 60;
    return `${`0${Math.floor(hour)}`.slice(-2)}:${`0${
      Math.floor(min) % 60
    }`.slice(-2)}:${`0${sec}`.slice(-2)}`;
  };

  useEffect(() => {
    if (start) {
      setOpacity(0);
    }
    if (time === 0) {
      const date = moment().format("YYYY-MM-DD");
      dispatch(setDate(date));
    }
  }, []);

  return (
    <div className={styles.timer}>
      <div>{formatTime(time)}</div>
      <button onClick={ondispatch}>중지</button>
      <div className={styles.btn} style={{ opacity: opacity }}>
        <VscDebugStart onClick={ondispatch} size={80} />
        {/* <img src="/images/play.png" onClick={btnHandle}></img> */}
      </div>
    </div>
  );
};

export default Timer;
