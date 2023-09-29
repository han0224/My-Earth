import { apiInstance } from ".";

const api = apiInstance();

// day기준으로 day+num 날까지
//body{day:String, num:Number}
//res{success:true/false, time:[date:String, time:Number]} ->분기준
export const getDay = async (num: Number, day: string) => {};

export const todayTime = async (today: string) => {
  const result = await api
    .get("today/" + today, {
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
};

// start 달부터 end달까지 res.data.time.time -> 분기준
// body{month:String, num:Number}
// res{success:true,false, time:[month:Number, time:Number]}
//`${year}-${month}-${num}`
export const getMonth = async (year: Number, month: Number) => {
  const result = await api
    .get("time/" + "month/" + `${year}/${month}`, {
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
};

export const getYear = async (year: Number) => {
  const result = await api
    .get("time/" + "year/" + `${year}`, {
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
};

// body: {date: 'YYYY.MM.DD', time:Number (초)}
// res:{success: true/false}
export const saveTime = async (date: String, time: Number) => {
  const result = await api
    .post(
      "time/" + "save",
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
};

export const updateTotalTime = async () => {
  const resut = api
    .post("time/" + "/update/totalTime", {}, { withCredentials: true })
    .then((response) => {
      return { success: true, err: "" };
    })
    .catch((e) => {
      if (e.response.status === 500) {
        return { success: false, err: e.response.data.err };
      } else {
        return { success: false, err: e.message };
      }
    });
};
