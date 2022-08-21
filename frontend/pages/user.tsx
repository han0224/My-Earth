import Layout from "../components/layout/Layout";
import styles from "../styles/User.module.css";
import React, { useState } from "react";
import Profile from "../components/Profile";
import Goal from "../components/Goal";

const User = () => {
  const [selected, setSelected] = useState("profile");

  const handleChange = (e: any) => {
    setSelected(e.target.value);
  };

  return (
    <Layout>
      <div className={styles.space}>
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
            id="goal"
            value="goal"
            name="select"
            onChange={handleChange}
          />
          <label htmlFor="goal">goal</label>
        </div>
        <div className={styles.userCard}>
          {selected === "goal" ? <Goal /> : <Profile />}
        </div>
      </div>
    </Layout>
  );
};

export default User;
