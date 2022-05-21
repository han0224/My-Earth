import type { NextPage } from "next";
import styles from "../styles/Home.module.css";
import Earth from "../components/Earth";
import Layout from "../components/layout/Layout";
import Audios from "../components/Audios";
import React, { useEffect, useRef, useState } from "react";

const Home: NextPage = () => {
  const [start, setStart] = useState(false);

  const btnHandle = (e) => {
    setStart(!start);
    if (start) {
      e.target.src = "/images/pause.png";
    } else {
      e.target.src = "/images/play.png";
    }
    console.log("startBtn Click", e);
  };

  return (
    <Layout>
      <div className={styles.space}>
        <Earth />
        <div className={styles.sidebar}>
          <Audios />
        </div>
        <div className={styles.todo}>todo</div>
        <div className={styles.time}>
          <div className={styles.timer}>Time</div>
          <img
            src="/images/play.png"
            className={styles.btn}
            onClick={btnHandle}
          ></img>
        </div>
      </div>
    </Layout>
  );
};

export default Home;
