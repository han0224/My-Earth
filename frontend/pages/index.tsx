import type { NextPage } from "next";
import styles from "../styles/Home.module.css";
import Earth from "../components/Earth";
import Layout from "../components/layout/Layout";
import Audios from "../components/Audios";
import React, { useEffect, useRef, useState } from "react";
import Timer from "../components/Timer";
import Todo from "../components/Todo";

const Home: NextPage = () => {
  return (
    <Layout>
      <div className={styles.space}>
        <Earth />
        {/* <div className={styles.sidebar}>
          <Audios />
        </div> */}
        <div className={styles.todo}>
          <Todo />
        </div>
        <div className={styles.time}>
          <div className={styles.timer}>
            <Timer />
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Home;
