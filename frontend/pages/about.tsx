import { useState } from "react";
import HowTo from "../components/HowTo";
import Introduction from "../components/Introduction";
import Layout from "../components/layout/Layout";
import styles from "../styles/About.module.css";

const About = () => {
  const [menu, setMenu] = useState("introduction");

  const handleChange = (menu: string) => {
    setMenu(menu);
  };
  return (
    <Layout>
      <div className={styles.space}>
        <div className={styles.menu}>
          <input
            type="radio"
            id="introduction"
            value="introduction"
            name="select"
            onChange={() => handleChange("introduction")}
            defaultChecked
          />
          <label htmlFor="introduction">Introduction</label>
          <input
            type="radio"
            id="how to"
            value="how to"
            name="select"
            onChange={() => handleChange("how to")}
          />
          <label htmlFor="how to">How to</label>
        </div>
        <div className={styles.card}>
          <div className={styles.content}>
            {menu === "introduction" ? <Introduction /> : <HowTo />}
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default About;
