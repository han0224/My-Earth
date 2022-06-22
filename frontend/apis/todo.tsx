import axios from "axios";
import moment from "moment";
import { config } from "../config";

const URL = config.URL + "todo/";

export const saveTodo = async () => {
  try {
    const res = await axios.post(
      URL + "savetodo",
      {
        title: "test",
      },
      { withCredentials: true }
    );
    console.log(res);
    return res.data;
  } catch (e) {
    console.log("err", e);
  }
};

export const todoList = async () => {
  try {
    const res = await axios.get(
      URL + "todolist",

      { withCredentials: true }
    );
    console.log(res.data);
    console.log(typeof res.data);

    return res.data;
  } catch (e) {
    console.log("err", e);
  }
};
