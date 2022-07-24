import Layout from "../components/layout/Layout";
import styles from "../styles/User.module.css";
import React, { useState } from "react";
import Profile from "../components/Profile";
import Chart from "../components/Chart";

const User = () => {
  const [selected, setSelected] = useState("profile");

  const handleChange = (e: any) => {
    setSelected(e.target.value);
  };
  const testclick = () => {
    // test
  };

  return (
    <Layout>
      <div className={styles.userPage}>
        <div className={styles.erea}>
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
            {selected === "chart" ? <Chart></Chart> : <Profile />}
          </div>
          {/* <button onClick={testclick}>test</button> */}
        </div>
      </div>
    </Layout>
  );
};

export default User;
