import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { getMonth, getYear, updateTotalTime } from "../apis/timeapi";
import styles from "../styles/Profile.module.css";
import { GoInfo } from "react-icons/go";
import { useSelector } from "react-redux";
import { RootState } from "../store";
import StudyChart from "./charts/StudyChart";
import ArrowForwardIosSharpIcon from "@mui/icons-material/ArrowForwardIosSharp";
import ArrowBackIosNewSharpIcon from "@mui/icons-material/ArrowBackIosNewSharp";
const Profile = () => {
  const { isUser, name, email, time } = useSelector(
    (state: RootState) => state.user
  );

  const date = new Date();
  // 보여줄 년도
  const [year, setYear] = useState(date.getFullYear());
  const [month, setMonth] = useState(date.getMonth());
  const [data, setData] = useState([]);

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
    const res = await getMonth(year, month + 1);
    if (res === null) {
      setData([]);
    } else {
      setData(res.success ? res.data.data : []);
    }
  };

  const monthMinus = () => {
    setMonth((pre) => {
      if (pre < 1) {
        setYear((preY) => preY - 1);
        return 11;
      } else {
        return pre - 1;
      }
    });
  };
  const monthPlus = () => {
    setMonth((pre) => {
      if (pre > 10) {
        setYear((preY) => preY + 1);
        return 0;
      } else {
        return pre + 1;
      }
    });
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
  }, [month]);

  return (
    <div className={styles.profilePage}>
      <div className={styles.profile}>
        {/* <div className={styles.profile_image}>
          <input type="file" accept="image/*" id="profileImg" />
          <label htmlFor="profileImg">
            <img src={profileImg}></img>
          </label>
        </div> */}
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
          <button onClick={monthMinus}>
            <ArrowBackIosNewSharpIcon />
          </button>
          <p>
            {year}/{`0${month + 1}`.slice(-2)}
          </p>
          <button onClick={monthPlus}>
            <ArrowForwardIosSharpIcon />
          </button>
        </div>
        <div className={styles.timerageChart}>
          <StudyChart data={data} />
        </div>
      </div>
    </div>
  );
};

export default Profile;
