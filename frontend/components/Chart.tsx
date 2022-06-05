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
  const data = [
    { value: 32, day: "2022-07-24" },
    {
      value: 85,
      day: "2022-01-03",
    },
    {
      value: 327,
      day: "2022-04-25",
    },
    {
      value: 353,
      day: "2015-07-13",
    },
    {
      value: 144,
      day: "2015-07-06",
    },
    {
      value: 2,
      day: "2015-07-20",
    },
    {
      value: 342,
      day: "2016-11-14",
    },
    {
      value: 245,
      day: "2016-08-04",
    },
    {
      value: 252,
      day: "2017-05-16",
    },
    {
      value: 225,
      day: "2015-12-22",
    },
    {
      value: 35,
      day: "2017-01-30",
    },
    {
      value: 280,
      day: "2016-12-30",
    },
    {
      value: 355,
      day: "2017-10-23",
    },
    {
      value: 116,
      day: "2016-08-13",
    },
    {
      value: 273,
      day: "2017-06-22",
    },
    {
      value: 106,
      day: "2015-04-09",
    },
    {
      value: 108,
      day: "2018-04-25",
    },
    {
      value: 20,
      day: "2018-01-28",
    },
    {
      value: 356,
      day: "2015-09-12",
    },
    {
      value: 251,
      day: "2018-06-08",
    },
    {
      value: 34,
      day: "2018-01-01",
    },
    {
      value: 60,
      day: "2017-09-23",
    },
    {
      value: 261,
      day: "2015-04-22",
    },
    {
      value: 356,
      day: "2016-09-14",
    },
    {
      value: 248,
      day: "2016-06-10",
    },
    {
      value: 139,
      day: "2018-02-13",
    },
    {
      value: 89,
      day: "2016-08-27",
    },
    {
      value: 240,
      day: "2017-12-02",
    },
    {
      value: 303,
      day: "2018-04-15",
    },
    {
      value: 202,
      day: "2017-02-16",
    },
    {
      value: 359,
      day: "2018-02-28",
    },
    {
      value: 180,
      day: "2015-05-03",
    },
    {
      value: 71,
      day: "2016-05-13",
    },
    {
      value: 98,
      day: "2017-06-16",
    },
    {
      value: 336,
      day: "2017-04-22",
    },
    {
      value: 136,
      day: "2015-09-05",
    },
    {
      value: 132,
      day: "2015-07-14",
    },
    {
      value: 55,
      day: "2017-12-12",
    },
    {
      value: 95,
      day: "2018-06-05",
    },
    {
      value: 294,
      day: "2017-01-27",
    },
    {
      value: 239,
      day: "2016-06-11",
    },
    {
      value: 59,
      day: "2016-02-02",
    },
    {
      value: 386,
      day: "2017-05-25",
    },
    {
      value: 119,
      day: "2018-06-14",
    },
    {
      value: 333,
      day: "2017-08-07",
    },
    {
      value: 195,
      day: "2017-06-11",
    },
    {
      value: 193,
      day: "2017-09-08",
    },
    {
      value: 352,
      day: "2017-08-18",
    },
    {
      value: 161,
      day: "2017-04-07",
    },
    {
      value: 360,
      day: "2016-12-20",
    },
    {
      value: 267,
      day: "2016-07-01",
    },
    {
      value: 158,
      day: "2015-09-04",
    },
    {
      value: 105,
      day: "2017-09-28",
    },
  ];
  return (
    <div className={styles.chartComponent}>
      <div className={styles.optionBtn}>
        <input type="radio" name="option" defaultChecked />
        <label>week</label>
        <input type="radio" name="option" />
        <label>6 month</label>
      </div>
      <div className={styles.myresponsiver}>
        <MyResponsiveTimeRange data={data} />
      </div>
    </div>
  );
};

export default Chart;
