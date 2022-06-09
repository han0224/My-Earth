import axios from "axios";
import moment, { months } from "moment";

const URL = "http://localhost:5000/";

// day기준으로 day+num 날까지
//body{day:String, num:Number}
//res{success:true/false, time:[date:String, time:Number]} ->분기준
export const getDay = async (num: Number, day: string) => {};

// month 달부터 month+num달까지 res.data.time.time -> 분기준
// body{month:String, num:Number}
// res{success:true,false, time:[month:Number, time:Number]}
export const geMonth = async (month: String, num: Number) => {};

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
