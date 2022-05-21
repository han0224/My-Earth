import type { NextPage } from "next";
import styles from "../styles/Home.module.css";
import Earth from "../components/Earth";
import Layout from "../components/layout/Layout";
import Audios from "../components/Audios";

const Home: NextPage = () => {
  return (
    <Layout>
      <div className={styles.space}>
        <Earth />
        <div className={styles.sidebar}>
          <Audios />
        </div>
        <div className={styles.todo}>todo</div>
        <p className={styles.time}>TIME</p>
      </div>
    </Layout>
  );
};

export default Home;
