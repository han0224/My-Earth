import { CalendarDatum } from "@nivo/calendar";
import dynamic from "next/dynamic";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { getMonth, saveTime, updateTotalTime } from "../apis/timeapi";
import { auth } from "../apis/userapi";
import styles from "../styles/Profile.module.css";

import { AiFillCaretLeft, AiFillCaretRight } from "react-icons/ai";
import { GoInfo } from "react-icons/go";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../store";
// import { MyResponsiveTimeRange } from "./nivoChart";

const MyResponsiveTimeRange = dynamic(() => import("../components/nivoChart"), {
  ssr: false,
});

const Profile = () => {
  const { isUser, name, email, time } = useSelector(
    (state: RootState) => state.user
  );

  // 보여줄 년도
  const [year, setYear] = useState(new Date().getFullYear());
  const [data, setData] = useState<CalendarDatum[]>([]);

  const router = useRouter();

  const formatTime = () => {
    console.log("timetimetime", time);
    const format = time.split(":").map((v) => +v);
    return `${`0${format[0]}`.slice(-2)}:${`0${format[1]}`.slice(-2)}:${`0${
      format[2] % 60
    }`.slice(-2)}`;
  };

  const getTime = async () => {
    const res = await getMonth(year, 1, 12);
    if (res === null) {
      setData([]);
    } else {
      setData(res.success ? res.data.data : []);
    }
  };

  const yearMinus = () => {
    setYear(year - 1);
  };
  const yearPlus = () => {
    setYear(year + 1);
  };

  const changeProfile = async () => {
    console.log("click");
    const res = await updateTotalTime();

    // 프로필 이미지 변경할 수 있도록
  };

  useEffect(() => {
    if (!isUser) {
      alert("로그인 후 이용해 주세요");
      router.push("/");
    }
  }, []);

  useEffect(() => {
    getTime();
  }, [year]);

  return (
    <div className={styles.profilePage}>
      <div className={styles.profile}>
        <div className={styles.profile_image}>
          <img src="/images/profile.jpg" onClick={changeProfile}></img>
        </div>
        <div className={styles.table}>
          <div className={styles.tbody}>
            <div>name</div>
            <span>{name}</span>
          </div>
          <div className={styles.tbody}>
            <div>email</div>
            <span>{email}</span>
          </div>
          <div className={styles.tbody}>
            <div>time</div>
            <span>{formatTime()}</span>
            <button className={styles.infoBtn}>
              <GoInfo size={20} />
              <p className={styles.infoBox}>늦게 반영될 수 있습니다.</p>
            </button>
          </div>
        </div>
      </div>
      <div className={styles.chart}>
        <div className={styles.chartTitle}>
          <button onClick={yearMinus}>
            <AiFillCaretLeft size={30} />
          </button>
          <p>{year}</p>
          <button onClick={yearPlus}>
            <AiFillCaretRight size={30} />
          </button>
        </div>
        <div className={styles.timerageChart}>
          <MyResponsiveTimeRange
            data={data}
            from={`${year - 1}-12-31`}
            to={`${year}-06-30`}
          />
        </div>
        <div className={styles.timerageChart}>
          <MyResponsiveTimeRange
            data={data}
            from={`${year}-06-30`}
            to={`${year}-12-31`}
          />
        </div>
      </div>
    </div>
  );
};

export default Profile;
