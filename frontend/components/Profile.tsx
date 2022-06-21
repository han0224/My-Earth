import { CalendarDatum } from "@nivo/calendar";
import moment from "moment";
import dynamic from "next/dynamic";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { getMonth, saveTime } from "../apis/timeapi";
import { auth } from "../apis/userapi";
import styles from "../styles/Profile.module.css";

import { AiFillCaretLeft, AiFillCaretRight } from "react-icons/ai";
// import { MyResponsiveTimeRange } from "./nivoChart";

const MyResponsiveTimeRange = dynamic(() => import("../components/nivoChart"), {
  ssr: false,
});

const Profile = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [time, setTime] = useState("");
  // 1~6월 데이터를 저장할 변수
  const [first, setFirst] = useState<CalendarDatum[]>([]);
  // 7~12월 데이터를 저장할 변수
  const [second, setSecond] = useState<CalendarDatum[]>([]);
  // 보여줄 년도
  const [year, setYear] = useState(new Date().getFullYear());
  const [studyTime, setStudyTime] = useState(0);
  const router = useRouter();

  const getAuth = async () => {
    const res = await auth();
    if (res.success) {
      console.log(res);
      setName(res.name);
      setTime(res.time);
      setEmail(res.email);
    } else {
      window.localStorage.setItem("isLogin", "false");
      router.push("/");
    }
  };

  const formatTime = () => {
    const format = time.split(":").map((v) => +v);
    return `${`0${format[0]}`.slice(-2)}:${`0${format[1]}`.slice(-2)}:${`0${
      format[2] % 60
    }`.slice(-2)}`;
  };

  const getTime = async () => {
    const res1 = await getMonth(year, 1, 6);
    setFirst(res1.data);
    const res2 = await getMonth(year, 6, 6);
    setSecond(res2.data);
    let study = 0;
    for (let i of res1.data) {
      study += i.value;
    }
    for (let i of res2.data) {
      study += i.value;
    }
    setStudyTime(study);
  };

  const yearMinus = () => {
    setYear(year - 1);
  };
  const yearPlus = () => {
    setYear(year + 1);
  };

  const changeProfile = () => {
    console.log("click");
    // 프로필 이미지 변경할 수 있도록
  };

  useEffect(() => {
    if (name === "") getAuth();
  }, []);

  useEffect(() => {
    getTime();
    console.log("yaer useEffect", first, second);
  }, [year]);

  return (
    <div className={styles.profilePage}>
      <div className={styles.profile}>
        <div className={styles.profile_image}>
          <img src="/images/profile.jpg" onClick={changeProfile}></img>
          {/* <button onClick={test}>test</button> */}
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
          {studyTime}
        </div>
        <div className={styles.timerageChart}>
          <MyResponsiveTimeRange
            data={first}
            from={`${year - 1}-12-31`}
            to={`${year}-06-30`}
          />
        </div>
        <div className={styles.timerageChart}>
          <MyResponsiveTimeRange
            data={second}
            from={`${year}-06-30`}
            to={`${year}-12-31`}
          />
        </div>
      </div>
    </div>
  );
};

export default Profile;
