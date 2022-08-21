import { useEffect, useState } from "react";
import styles from "../styles/GoalContent.module.css";

interface Pros {
  goal: string;
}
const GoalContent = (pros: Pros) => {
  const [list, setList] = useState<Array<string>>([]);

  useEffect(() => {
    setList(["1", "2", "3", "4", "5", "6"]);
  }, []);
  return (
    <div className={styles.contentComponent}>
      <div className={styles.todo}>
        <h1>todo</h1>
        <div className={styles.items}>
          <div className={styles.item}>
            <input type="checkbox" id="one" />
            <label htmlFor="one">oneoneoneoneoneoneoneoneoneoneoneone</label>
            <p>sdfjklsdfjklsdfjklsdfjklsdfjklsdfjklsdfjkl</p>
          </div>
          <div className={styles.item}>
            <input type="checkbox" id="two" />
            <label htmlFor="two">oneoneoneoneoneoneoneoneoneoneoneone</label>
            <p>sdfjklsdfjklsdfjklsdfjklsdfjklsdfjklsdfjkl</p>
          </div>
        </div>
      </div>
      <div className={styles.do}>
        <h1>do</h1>
      </div>
      <div className={styles.done}>
        <h1>done</h1>
      </div>
    </div>
  );
};

export default GoalContent;
