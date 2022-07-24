import axios from "axios";
import { config } from "../config";
import { useDispatch, useSelector } from "react-redux";
import { deleteUser } from "../store/user";
import { initTimer } from "../store/timer";

const URL = config.URL + "time/";

// day기준으로 day+num 날까지
//body{day:String, num:Number}
//res{success:true/false, time:[date:String, time:Number]} ->분기준
export const getDay = async (num: Number, day: string) => {};

export const todayTime = async (today: string) => {
  const result = await axios
    .get(URL + "today/" + today, {
      withCredentials: true,
    })
    .then((response) => {
      return { success: true, data: response.data, err: "" };
    })
    .catch((e) => {
      if (e.response.status === 401) {
        return { success: false, data: "", err: e.response.data.err };
      } else {
        return { success: false, data: "", err: e.message };
      }
    });
  return result;
  // if (result.status === 200) {
  //   return { success: true, data: result.data.time };
  // } else if (result.status === 401) {
  //   const dispatch = useDispatch();
  //   dispatch(deleteUser());
  //   dispatch(initTimer());
  //   return { success: false, message: result.data.err };
  // } else {
  //   return { success: false, message: "오류 발생" };
  // }
};

// start 달부터 end달까지 res.data.time.time -> 분기준
// body{month:String, num:Number}
// res{success:true,false, time:[month:Number, time:Number]}
//`${year}-${month}-${num}`
export const getMonth = async (year: Number, month: Number, num: Number) => {
  const result = await axios
    .get(URL + "month/" + `${year}-${month}-${num}`, {
      withCredentials: true,
    })
    .then((response) => {
      return { success: true, data: response.data, err: "" };
    })
    .catch((e) => {
      if (e.response.status === 401) {
        return { success: false, data: "", err: e.response.data.err };
      } else {
        return { success: false, data: "", err: e.message };
      }
    });
  return result;
  // if (result.status === 200) {
  //   return { success: true, data: result.data.data };
  // } else if (result.status === 500) {
  //   return { success: false, err: result.data.err };
  // } else {
  //   return null;
  // }
};

// body: {date: 'YYYY.MM.DD', time:Number (초)}
// res:{success: true/false}
export const saveTime = async (date: String, time: Number) => {
  const result = await axios
    .post(
      URL + "save",
      {
        date: date,
        time: time,
      },
      { withCredentials: true }
    )
    .then((response) => {
      return { success: true, err: "" };
    })
    .catch((e) => {
      if (e.response.status === 401) {
        return { success: true, err: e.response.data.err };
      } else if (e.response.status === 500) {
        return { success: false, err: e.response.data.err };
      } else {
        return { success: false, err: e.message };
      }
    });
  return result;
  // if (result.status === 204) {
  //   return { success: true, data: result.data };
  // } else if (result.status === 500) {
  //   return { success: false, err: result.data.err };
  // } else {
  //   return null;
  // }
};
