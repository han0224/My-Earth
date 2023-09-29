import React from "react";
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import { formatTime, getHourAndMin } from "../../util/format";

const renderTooltip = (props: any) => {
  const { active, payload } = props;

  if (active && payload && payload.length) {
    const data = payload[0] && payload[0].payload;

    return (
      <div
        style={{
          backgroundColor: "#fff",
          border: "1px solid #999",
          margin: 0,
          padding: 10,
        }}
      >
        <p>{data.day}</p>
        <p>
          <span>time: </span>
          {formatTime(data.value)}
        </p>
      </div>
    );
  }
};
interface timeData {
  value: number;
  day: string;
}
interface props {
  data: Array<timeData>;
}
export default function StudyChart(props: props) {
  const { data } = props;

  const toTime = (value: number) => getHourAndMin(value);
  const toDay = (date: string) => `${date.split("-").pop()}일`;
  const render = () => {
    return (
      <ResponsiveContainer width="100%" height="100%">
        <AreaChart
          width={500}
          height={400}
          data={data}
          margin={{
            top: 10,
            right: 30,
            left: 30,
            bottom: 0,
          }}
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="day" tickFormatter={toDay} />
          <YAxis tickCount={3} tickFormatter={toTime} />
          <Tooltip
            cursor={{ strokeDasharray: "3 3" }}
            wrapperStyle={{ zIndex: 100 }}
            content={renderTooltip}
          />
          <Area
            type="monotone"
            dataKey="value"
            stroke="#8884d8"
            fill="#8884d8"
          />
        </AreaChart>
      </ResponsiveContainer>
    );
  };

  return render();
}
