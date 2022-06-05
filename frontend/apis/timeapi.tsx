import axios from "axios";

const URL = "http://localhost:5000/";

export const saveTime = async (
  date: String,
  startTime: Date,
  endTime: Date
) => {
  const ss = ((endTime.getTime() - startTime.getTime()) / 1000) % 60;
  const mm = Math.floor(
    ((endTime.getTime() - startTime.getTime()) / (1000 * 60)) % 60
  );
  const hh = Math.floor(
    ((endTime.getTime() - startTime.getTime()) / (1000 * 60 * 60)) % 60
  );
  console.log("time api");
  console.log(startTime, startTime.getTime());
  console.log(endTime, endTime.getTime());
  console.log(hh, mm, ss);
  try {
    const result = await axios.post(
      URL + "time/save",
      {
        date: date,
        time: `${hh}:${mm}:${ss}`,
        end: endTime,
      },
      { withCredentials: true }
    );
    console.log(result);
    return result.data;
  } catch (e) {
    console.log("error", e);
  }
};
