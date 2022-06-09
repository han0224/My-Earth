import axios from "axios";
import moment, { months } from "moment";

const URL = "http://localhost:5000/";

interface monthProps {
  day: String;
}
export const getDay = async (month: monthProps) => {};

// body: {date: 'YYYY.MM.DD', time:Number (초)}
// res:{success: true/false}
export const saveTime = async (startTime: Date, endTime: Date) => {
  const ss = Math.floor((endTime.getTime() - startTime.getTime()) / 1000);
  try {
    const result = await axios.post(
      URL + "time/save",
      {
        date: moment(startTime).format("YYYY.MM.DD"),
        time: ss,
      },
      { withCredentials: true }
    );
    console.log(result);
    return result.data;
  } catch (e) {
    console.log("error", e);
  }
};
