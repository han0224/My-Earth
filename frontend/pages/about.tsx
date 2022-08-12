import { useState } from "react";
import HowTo from "../components/Howto";
import Introduction from "../components/Introduction";
import Layout from "../components/layout/Layout";
import styles from "../styles/About.module.css";

const About = () => {
  const [menu, setMenu] = useState("introduction");

  return (
    <Layout>
      <div className={styles.space}>
        <div className={styles.card}>
          <div className={styles.menu}>
            <button onClick={() => setMenu("introduction")}>
              Introduction
            </button>
            <button onClick={() => setMenu("How to")}>How to</button>
          </div>
          <div className={styles.content}>
            {menu === "introduction" ? <Introduction /> : <HowTo />}
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default About;
