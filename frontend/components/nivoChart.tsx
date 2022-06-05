import { ResponsiveTimeRange } from "@nivo/calendar";
import { useEffect, useState } from "react";

export const MyResponsiveTimeRange = ({ data }: any) => {
  const [fromDay, setFromDay] = useState(new Date());
  const [toDay, setToDay] = useState(new Date());
  const [day, setDay] = useState(new Date());
  useEffect(() => {
    const date = new Date();
    if (day.toLocaleDateString() !== date.toLocaleDateString()) {
      console.log("!!!!!!!");
      setDay(date);
    }
  }, []);

  useEffect(() => {
    // const arr = day.split(".").map((v) => +v);
    const now = new Date();
    const month = new Date(now.setMonth(now.getMonth() - 6));
    console.log("month", month.getFullYear(), month.getMonth());
    setToDay(day);
    setFromDay(month);
  }, [day]);

  return (
    <ResponsiveTimeRange
      data={data}
      from={fromDay.toISOString()}
      to={toDay.toISOString()}
      emptyColor="#eeeeee"
      colors={["#61cdbb", "#97e3d5", "#e8c1a0", "#f47560"]}
      margin={{ top: 40, right: 40, bottom: 100, left: 40 }}
      dayBorderWidth={2}
      dayBorderColor="#ffffff"
    />
  );
};
