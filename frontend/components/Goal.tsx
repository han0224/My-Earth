import { useEffect, useState } from "react";
import styles from "../styles/Goal.module.css";
import GoalContent from "./GoalContent";

const Goal = () => {
  const [selected, setSelected] = useState("profile");

  return (
    <div className={styles.goalComponent}>
      <div className={styles.menu}>
        <div>
          <input
            type="radio"
            id="week"
            value="week"
            name="goalSelect"
            onChange={() => setSelected("week")}
            defaultChecked
          />
          <label htmlFor="week">week</label>
        </div>
        <div>
          <input
            type="radio"
            id="month"
            value="month"
            name="goalSelect"
            onChange={() => setSelected("month")}
          />
          <label htmlFor="month">month</label>
        </div>
        <div>
          <input
            type="radio"
            id="year"
            value="year"
            name="goalSelect"
            onChange={() => setSelected("year")}
          />
          <label htmlFor="year">year</label>
        </div>
        <div>
          <input
            type="radio"
            id="final"
            value="final"
            name="goalSelect"
            onChange={() => setSelected("final")}
          />
          <label htmlFor="final">final</label>
        </div>
      </div>
      <div className={styles.content}>
        <GoalContent goal={selected}></GoalContent>
      </div>
    </div>
  );
};

export default Goal;
