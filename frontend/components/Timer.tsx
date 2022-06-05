import React, { useEffect, useRef, useState } from "react";
import styles from "../styles/Timer.module.css";
import { VscDebugStart } from "react-icons/vsc";
import { saveTime } from "../apis/timeapi";

// 시간 1 초마다 timer 를 증가시키는 방법으로
// 아주 매우 정확하지는 않음
// 시작 전 로그인 여부 확인 후 로그인 권유
const Timer = () => {
  const [time, setTime] = useState(0);
  const [start, setStart] = useState(false);
  const [opacity, setOpacity] = useState(1);
  const [startTime, setStartTime] = useState(new Date());
  const increment = useRef<ReturnType<typeof setInterval>>();

  const btnHandle = (e: React.MouseEvent) => {
    setStart(!start);
    if (start) {
      setOpacity(1);
      clearInterval(increment.current);
      savetimeapi();
      console.log("increment", increment, typeof increment);
    } else {
      setOpacity(0);
      setStartTime(new Date());
      increment.current = setInterval(() => {
        setTime((time) => time + 1);
      }, 1000);
    }
  };

  const stop = () => {
    setTime(0);
    setOpacity(1);
    clearInterval(increment.current);
    if (start) {
      savetimeapi();
      setStart(false);
    }
  };

  const savetimeapi = async () => {
    console.log("savetime", startTime.toLocaleDateString());
    const res = await saveTime(
      startTime.toLocaleDateString(),
      startTime,
      new Date()
    );
    if (!res.success) {
      alert("시간 저장에 실패했습니다.");
    }
    // console.log(res);
  };

  const formatTime = () => {
    return `${`0${Math.floor(time / 3600)}`.slice(-2)}:${`0${
      Math.floor(time / 60) % 60
    }`.slice(-2)}:${`0${time % 60}`.slice(-2)}`;
  };

  return (
    <div className={styles.timer}>
      <div>{formatTime()}</div>
      <button onClick={stop}>중지</button>
      <div className={styles.btn} style={{ opacity: opacity }}>
        <VscDebugStart onClick={btnHandle} size={80} />
        {/* <img src="/images/play.png" onClick={btnHandle}></img> */}
      </div>
    </div>
  );
};

export default Timer;
