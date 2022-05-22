import { useEffect, useState } from "react";
import styles from "../styles/Timer.module.css";

// 시간이 아직 부정확함
// 포맷
const Timer = () => {
  const [time, setTime] = useState(0);
  const [start, setStart] = useState(false);

  const btnHandle = (e) => {
    setStart(!start);
    if (start) {
      e.target.src = "/images/pause.png";
    } else {
      e.target.src = "/images/play.png";
    }
    console.log("startBtn Click", e.target);
  };

  useEffect(() => {
    if (start) {
      const timerId = setTimeout(() => {
        setTime(time + 1);
      }, 1000);
      return () => clearTimeout(timerId);
    }
  }, [time, start]);

  return (
    <div>
      <div>{time}</div>
      <img
        src="/images/play.png"
        className={styles.btn}
        onClick={btnHandle}
      ></img>
    </div>
  );
};

export default Timer;
