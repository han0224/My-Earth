import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { auth } from "../apis/user/userapi";
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
  useEffect(() => {
    getAuth();
  });
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
          <span>{time}</span>
        </div>
      </div>
    </div>
  );
};

export default Profile;
