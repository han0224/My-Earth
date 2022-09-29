import { CalendarDatum } from "@nivo/calendar";
import dynamic from "next/dynamic";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { getMonth, getYear, updateTotalTime } from "../apis/timeapi";
import styles from "../styles/Profile.module.css";
import { AiFillCaretLeft, AiFillCaretRight } from "react-icons/ai";
import { GoInfo } from "react-icons/go";
import { useSelector } from "react-redux";
import { RootState } from "../store";

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

  const [profileImg, setProfileImg] = useState();
  const [file, setFile] = useState({ profileImg: "" });

  const router = useRouter();

  const formatTime = () => {
    const format = time.split(":").map((v) => +v);
    return `${`0${format[0]}`.slice(-2)}:${`0${format[1]}`.slice(-2)}:${`0${
      format[2] % 60
    }`.slice(-2)}`;
  };

  const getTime = async () => {
    const res = await getYear(year);
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

  // const changeProfile = async (e) => {
  //   console.log("changeProfile: ", e.target.files[0], e);
  //   setFile({ profileImg: e.target.files[0] });
  //   // const formData = new FormData();
  //   // formData.append("profileImg", profileImg);

  //   console.log("click", e);
  //   // const res = await updateTotalTime();
  //   // const res = await saveTime("2022-08-28", 20);
  //   // const res = await todayTime("2022-08-31");
  //   // const res = await getMonth(2022, 9);
  //   // const res = await getGoal("dbn02@naver.com");
  //   // const res = await getImg();
  //   // 이미지 올리기
  //   submit(e);
  // };

  // const submit = (e) => {
  //   console.group("onsubmit");
  //   const formData = new FormData();
  //   formData.append("profileImg", file.profileImg);

  //   const res = setImg(file.profileImg);
  // };

  useEffect(() => {
    if (!isUser) {
      alert("로그인 후 이용해 주세요");
      router.push("/");
    } else updateTotalTime();
  }, []);

  useEffect(() => {
    getTime();
  }, [year]);

  return (
    <div className={styles.profilePage}>
      <div className={styles.profile}>
        <div className={styles.profile_image}>
          <input type="file" accept="image/*" id="profileImg" />
          <label htmlFor="profileImg">
            <img src={profileImg}></img>
          </label>
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
