import { useEffect, useState } from "react";
import styles from "../styles/Chart.module.css";
import { MyResponsiveTimeRange } from "./nivoChart";

// make sure parent container have a defined height when using
// responsive component, otherwise height will be 0 and
// no chart will be rendered.
// website examples showcase many properties,
// you'll often use just a few of them.

// data {vale, day} 로 하면 calendarDatum 의 속성 전부 없게 오류

const Chart = () => {
  useEffect(() => {}, []);
  const [option, setOption] = useState("week");
  const data = [
    { value: 10, day: "2022-06-01" },
    { value: 10, day: "2022-01-01" },
    { value: 10, day: "2022-01-02" },
    { value: 8, day: "2022-06-02" },
    { value: 2, day: "2022-06-03" },
    { value: 4, day: "2022-06-04" },
    { value: 11, day: "2022-06-05" },
    { value: 3, day: "2022-06-06" },
    { value: 6, day: "2022-06-07" },
    { value: 6, day: "2022-07-01" },
  ];
  const changeOption = (e) => {
    setOption(e.target.value);
    console.log(option);
  };

  return (
    <div className={styles.chartComponent}>
      {/* <div className={styles.option}>
        <div className={styles.optionBtn}>
          <input
            type="radio"
            name="option"
            id="week"
            value="week"
            onClick={changeOption}
            defaultChecked
          />
          <label htmlFor="week">week</label>
          <input
            type="radio"
            name="option"
            id="month"
            value="month"
            onClick={changeOption}
          />
          <label htmlFor="month">month</label>
        </div>
        <div className={styles.detailOption}>
          {option === "week" ? <div>week!</div> : <div>month!</div>}
        </div>
      </div>
      <div className={styles.myresponsiver}>
        <MyResponsiveTimeRange data={data} />
      </div> */}
    </div>
  );
};

export default Chart;
