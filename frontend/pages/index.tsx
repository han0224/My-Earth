import type { NextPage } from "next";
import styles from "../styles/Home.module.css";
import Earth from "../components/Earth";
import Layout from "../components/layout/Layout";

const Home: NextPage = () => {
  return (
    <Layout>
      <Earth />
      <div className={styles.space}>
        <div className={styles.sidebar}>side</div>
        <p className={styles.time}>TIME</p>
      </div>
    </Layout>
  );
};

export default Home;
