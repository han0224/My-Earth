import axios from "axios";
import { useSelector } from "react-redux";
import { config } from "../config";
import { RootState } from "../store";
import { itemType } from "../types/GoalType";

const URL = config.URL + "goal/";

export const getGoal = async (email: string) => {
  const result = await axios
    .get(URL + `get/${email}`, {
      withCredentials: true,
    })
    .then((response) => {
      const data = {
        week: response.data.data.week,
        month: response.data.data.month,
        year: response.data.data.year,
        final: response.data.data.final,
      };
      return { success: true, data: data, err: "" };
    })
    .catch((e) => {
      if (e.response.status === 500) {
        return { success: false, data: null, err: e.response.data.err };
      } else {
        return { success: false, data: null, err: e.message };
      }
    });
  return result;
};

// [week / month / year / final] data: [{title:String, content:String}]
export const saveGoal = async (
  body: Array<itemType>,
  email: string,
  type: string
) => {
  const result = await axios
    .post(
      URL + `save/${type}/${email}`,
      {
        data: body,
      },
      { withCredentials: true }
    )
    .then((response) => {
      return { success: true, err: "" };
    })
    .catch((e) => {
      if (e.response.status === 500) {
        return { success: true, err: e.response.data.err };
      } else {
        return { success: false, err: e.message };
      }
    });
  return result;
};
