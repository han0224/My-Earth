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
      <div>
        {list.map((v) => (
          <input type={"checkbox"} />
        ))}
      </div>
    </div>
  );
};

export default GoalContent;
