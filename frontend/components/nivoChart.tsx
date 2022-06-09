import {
  CalendarDatum,
  DateOrString,
  ResponsiveTimeRange,
} from "@nivo/calendar";
import { useEffect, useState } from "react";

interface chartProps {
  data: CalendarDatum[];
  from: DateOrString | undefined;
  to: DateOrString | undefined;
}
export const MyResponsiveTimeRange = ({ data, from, to }: chartProps) => {
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
    const month = new Date(now.setMonth(now.getMonth() - 1));
    console.log("month", month.getFullYear(), month.getMonth());
    setToDay(day);
    setFromDay(month);
    console.log("from", data, from, to);
  }, [day]);

  return (
    <ResponsiveTimeRange
      data={data}
      // from={"2021-12-31"}
      // to={"2022-06-30"}
      from={from}
      to={to}
      emptyColor="#eeeeee"
      colors={["#61cdbb", "#97e3d5", "#e8c1a0", "#f47560"]}
      margin={{ top: 40, right: 40, bottom: 40, left: 40 }}
      weekdayTicks={[]}
      weekdayLegendOffset={0}
      dayBorderWidth={2}
      dayBorderColor="#ffffff"
    />
  );
};
