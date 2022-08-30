import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getGoal } from "../apis/goalapi";
import { RootState } from "../store";
import { setGoal } from "../store/goal";
import styles from "../styles/Goal.module.css";
import GoalContent from "./GoalContent";

const Goal = () => {
  const dispatch = useDispatch();
  const { email } = useSelector((state: RootState) => state.user);
  const [selected, setSelected] = useState("week");
  // .week, .month, .year, .final
  const getList = async () => {
    const result = await getGoal(email);
    if (!result.success) {
      console.log("err", result.err);
    } else if (result.data) {
      dispatch(setGoal(result.data));
    }
  };

  useEffect(() => {
    getList();
  }, []);

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
