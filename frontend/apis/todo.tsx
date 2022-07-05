import axios from "axios";
import { config } from "../config";

const URL = config.URL + "todo/";

export const saveTodo = async (title: string) => {
  try {
    const result = await axios.post(
      URL + "savetodo",
      {
        title: title,
      },
      { withCredentials: true }
    );
    if (result.status === 204) {
      return { success: true, data: result.data };
    } else if (result.status === 500) {
      return { success: false, err: result.data.err };
    } else {
      return null;
    }
  } catch (e) {
    console.log("error", e);
    return null;
  }
};

export const todoList = async () => {
  try {
    const result = await axios.get(
      URL + "todolist",

      { withCredentials: true }
    );
    if (result.status === 200) {
      return { success: true, data: result.data };
    } else if (result.status === 500) {
      return { success: false, err: result.data.err };
    } else {
      return null;
    }
  } catch (e) {
    console.log("error", e);
    return null;
  }
};

export const todoDelete = async (id: string) => {
  try {
    const result = await axios.post(
      URL + "delete",
      {
        id: id,
      },
      { withCredentials: true }
    );
    if (result.status === 204) {
      return result.data;
    } else {
      return null;
    }
  } catch (e) {
    console.log("error", e);
    return null;
  }
};

export const setstatus = async (id: string, status: number) => {
  try {
    const result = await axios.post(
      URL + "setstatus",
      {
        id: id,
        status: status,
      },
      { withCredentials: true }
    );
    if (result.status === 204) {
      return result.data;
    } else {
      return null;
    }
  } catch (e) {
    console.log("error", e);
    return null;
  }
};
