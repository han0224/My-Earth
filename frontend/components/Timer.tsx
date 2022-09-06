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
  TimerReduxState,
} from "../store/timer";
import { RootState } from "../store";
import moment from "moment";
import { auth } from "../apis/userapi";
import { setUser, updateUser } from "../store/user";

const Timer = () => {
  const dispatch = useDispatch();
  const { start, time, timer, preTime, date }: TimerReduxState = useSelector(
    (state: RootState) => state.timer
  );
  const { isUser } = useSelector((state: RootState) => state.user);
  const [opacity, setOpacity] = useState(1);
  const increment = useRef<ReturnType<typeof setInterval>>();

  const ondispatch = (e: React.MouseEvent) => {
    if (!isUser) {
      alert("로그인 후 이용해 주세요");
      return;
    }
    if (start) {
      // 중지
      dispatch(setStart(false));
      dispatch(setPreTime(time));
      setOpacity(1);
      savetimeapi();
      clearInterval(timer);
    } else {
      // 시작
      const startTime = moment();
      setOpacity(0);
      increment.current = setInterval(() => {
        const currnettime = moment();
        const newDate = moment
          .duration(currnettime.diff(startTime))
          .asSeconds();
        dispatch(savetime(Math.floor(newDate) + preTime));
      }, 1000);
      dispatch(setTimer(increment.current));
      dispatch(setStart(true));
    }
  };

  const savetimeapi = async () => {
    const res = await saveTime(date, time);
    if (res !== null) {
      if (!res.success) {
        alert("시간 저장에 실패했습니다.");
      } else {
        const user = await auth();
        if (user.success) {
          dispatch(updateUser(user.data.time));
        }
      }
    } else {
      alert("네트워크 문제 발생");
    }
  };

  const formatTime = (Numtime: number) => {
    // 오늘 하루 시간 더하기
    console.log("time", time, Numtime);
    if (isNaN(Numtime)) {
      Numtime = 0;
    }
    const min = Numtime / 60;
    const hour = min / 60;
    const sec = Numtime % 60;
    return `${`0${Math.floor(hour)}`.slice(-2)}:${`0${
      Math.floor(min) % 60
    }`.slice(-2)}:${`0${sec}`.slice(-2)}`;
  };

  useEffect(() => {
    if (start) {
      setOpacity(0);
    }
    const date = moment().format("YYYY-MM-DD");
    dispatch(setDate(date));
  }, []);

  return (
    <div className={styles.timer}>
      <div>{formatTime(time)}</div>
      <div className={styles.btn} style={{ opacity: opacity }}>
        <VscDebugStart onClick={ondispatch} size={80} />
      </div>
    </div>
  );
};

export default Timer;
