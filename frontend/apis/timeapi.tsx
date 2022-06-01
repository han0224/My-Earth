import axios from "axios";

const URL = "http://localhost:5000/";

export const saveTime = async (date: String, time: Number) => {
  try {
    const result = await axios.post(
      URL + "time/save",
      {
        date: date,
        time: time,
      },
      { withCredentials: true }
    );
    console.log(result);
    return result.data;
  } catch (e) {
    console.log("error", e);
  }
};
