import { CalendarDatum } from "@nivo/calendar";
import moment from "moment";
import dynamic from "next/dynamic";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { getMonth, saveTime } from "../apis/timeapi";
import { auth } from "../apis/userapi";
import styles from "../styles/Profile.module.css";
// import { MyResponsiveTimeRange } from "./nivoChart";

const MyResponsiveTimeRange = dynamic(() => import("../components/nivoChart"), {
  ssr: false,
});

const Profile = () => {
  type Data = { value: Number; day: String };
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [time, setTime] = useState("");
  const [data, setData] = useState<Data[]>([]);
  const [first, setFirst] = useState<CalendarDatum[]>([]);
  const [second, setSecond] = useState<CalendarDatum[]>([]);
  const [year, setYear] = useState(0);
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

  // const test = () => {
  //   // const res = getMonth("2022", "6", "12");
  // };

  const test = async () => {
    // console.log("savetime", startTime.toLocaleDateString());
    const start = new Date("2022-12-31 12:10:10");
    const end = new Date("2022-12-31 19:10:10");
    const res = await saveTime(start, end);
    if (!res.success) {
      alert("시간 저장에 실패했습니다.");
    } else {
      console.log("ok");
    }
    // console.log(res);
  };

  const getTime = async () => {
    // const today = new Date();
    // setYear(today.getFullYear())
    const res1 = await getMonth(year, 1, 6);
    setFirst(res1.data);
    const res2 = await getMonth(year, 6, 6);
    setSecond(res2.data);
    // console.log(moment(today).format("YYYY-MM-DD"));
    // console.log(today);
  };
  useEffect(() => {
    if (name === "") getAuth();

    const today = new Date();
    setYear(today.getFullYear());
    console.log(year);
  }, []);
  useEffect(() => {
    getTime();
    console.log("yaer useEffect", first, second);
  }, [year]);
  return (
    <div className={styles.profilePage}>
      <div className={styles.profile}>
        <div className={styles.profile_image}>
          <img src="/images/test.jpg"></img>
          <button onClick={test}>test</button>
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
        <div>
          <MyResponsiveTimeRange
            data={first}
            from={`${year - 1}-12-31`}
            to={`${year}-06-30`}
          />
        </div>
        <div>
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
