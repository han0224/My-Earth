import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { saveTime } from "../apis/timeapi";
import { auth } from "../apis/userapi";
import styles from "../styles/Profile.module.css";

const Profile = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [time, setTime] = useState("");
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

  useEffect(() => {
    if (name === "") getAuth();
  }, []);
  return (
    <div className={styles.profile}>
      <div className={styles.profile_image}>
        <img src="/images/test.jpg"></img>
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
  );
};

export default Profile;
