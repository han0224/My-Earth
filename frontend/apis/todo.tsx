import axios from "axios";
import moment from "moment";
import { config } from "../config";

const URL = config.URL + "todo/";

export const saveTodo = async (title: string) => {
  try {
    const res = await axios.post(
      URL + "savetodo",
      {
        title: title,
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

export const todoDelete = async (id: string) => {
  try {
    const res = await axios.post(
      URL + "delete",
      {
        id: id,
      },
      { withCredentials: true }
    );
    console.log(res.data);
    console.log(typeof res.data);

    return res.data;
  } catch (e) {
    console.log("err", e);
  }
};

export const setstatus = async (id: string, status: number) => {
  try {
    const res = await axios.post(
      URL + "setstatus",
      {
        id: id,
        status: status,
      },
      { withCredentials: true }
    );
    console.log(res.data);
    console.log(typeof res.data);

    return res.data;
  } catch (e) {
    console.log("err", e);
  }
};
