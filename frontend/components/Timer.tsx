import React, { useEffect, useRef, useState } from "react";
import styles from "../styles/Timer.module.css";

// 시간 1 초마다 timer 를 증가시키는 방법으로
// 아주 매우 정확하지는 않음
// 시작 전 로그인 여부 확인 후 로그인 권유
const Timer = () => {
  const [time, setTime] = useState(0);
  const [start, setStart] = useState(false);
  const [opacity, setOpacity] = useState(1);
  const increment = useRef(null);

  const btnHandle = (e: React.MouseEvent<HTMLImageElement>) => {
    setStart(!start);
    if (start) {
      e.target.src = "/images/play.png";
      setOpacity(1);
      clearInterval(increment.current);
    } else {
      e.target.src = "/images/pause.png";
      setOpacity(0);
      increment.current = setInterval(() => {
        setTime((time) => time + 1);
      }, 1000);
    }
    console.log("startBtn Click", e.target);
  };

  const formatTime = () => {
    return `${`0${Math.floor(time / 3600)}`.slice(-2)}:${`0${
      Math.floor(time / 60) % 60
    }`.slice(-2)}:${`0${time % 60}`.slice(-2)}`;
  };

  return (
    <div className={styles.timer}>
      <div>{formatTime()}</div>
      <div className={styles.btn} style={{ opacity: opacity }}>
        <img src="/images/play.png" onClick={btnHandle}></img>
      </div>
    </div>
  );
};

export default Timer;
