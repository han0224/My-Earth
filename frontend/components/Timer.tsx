import React, { useEffect, useRef, useState } from "react";
import styles from "../styles/Timer.module.css";
import { VscDebugStart } from "react-icons/vsc";
import { saveTime } from "../apis/timeapi";
import { useDispatch, useSelector } from "react-redux";
import { setStart, saveTime as savetime, setTimer } from "../store/timer";
import { RootState } from "../store";

const Timer = () => {
  const dispatch = useDispatch();
  const { start, time, timer } = useSelector((state: RootState) => state.timer);
  const [opacity, setOpacity] = useState(1);
  const [startTime, setStartTime] = useState(new Date());
  const [preTime, setPreTime] = useState(0);
  const increment = useRef<ReturnType<typeof setInterval>>();

  const ondispatch = (e: React.MouseEvent) => {
    console.log("ondispatch", start, time);
    if (start) {
      dispatch(setStart(false));
      setOpacity(1);
      savetimeapi();
      console.log("clearinterval", increment);
      clearInterval(timer);
      setPreTime(time);
    } else {
      setStartTime(new Date());
      console.log("click", startTime);
      setOpacity(0);
      // console.log("시작 전", startTime);
      increment.current = setInterval(() => {
        const currnettime = new Date();
        const newDate = Math.floor(
          (currnettime.getTime() - startTime.getTime()) / 1000
        );
        dispatch(savetime(newDate + preTime));
        console.log("increment", time, currnettime, startTime);
      }, 1000);
      dispatch(setTimer(increment.current));

      dispatch(setStart(true));
    }
  };

  const savetimeapi = async () => {
    console.log("savetime", startTime.toLocaleDateString());
    const res = await saveTime(startTime, new Date());
    if (!res.success) {
      alert("시간 저장에 실패했습니다.");
    }
    // console.log(res);
  };

  const formatTime = (time: number) => {
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
