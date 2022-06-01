import Layout from "../components/layout/Layout";
import styles from "../styles/User.module.css";
import React, { useEffect, useRef, useState } from "react";
import { auth } from "../apis/userapi";
import { useRouter } from "next/router";
import Profile from "../components/Profile";

const User = () => {
  const [selected, setSelected] = useState("profile");

  const router = useRouter();

  const isLogin = async () => {
    const res = await auth();
    if (res.success) {
      console.log("로그인 중", res);
    } else {
      window.localStorage.setItem("isLogin", "false");
      alert("로그인이 필요합니다.");
      router.push("/");
    }
  };

  const handleChange = (e) => {
    setSelected(e.target.value);
    console.log(e.target);
    console.log(selected);
  };
  const testclick = () => {
    if (selected === "profile") {
      setSelected("study");
    } else {
      setSelected("profile");
    }
  };
  useEffect(() => {
    // isLogin();
  }, []);

  return (
    <Layout>
      <div className={styles.userPage}>
        <div className={styles.erea}>
          {/* {selected === "chart" && (
            <div className={styles.study_menu}>
              <button>year</button>
              <button>month</button>
              <button>day</button>
            </div>
          )} */}
          <div className={styles.userCard}>
            <div className={styles.menu}>
              <input
                type="radio"
                id="profile"
                value="profile"
                name="select"
                onChange={handleChange}
                defaultChecked
              />
              <label htmlFor="profile">profile</label>
              <input
                type="radio"
                id="chart"
                value="chart"
                name="select"
                onChange={handleChange}
              />
              <label htmlFor="chart">study chart</label>
            </div>
            {selected === "chart" ? <></> : <Profile />}
            {/* <Profile /> */}
          </div>
        </div>
        {/* <button onClick={testclick}>onClick</button> */}
      </div>
    </Layout>
  );
};

export default User;
