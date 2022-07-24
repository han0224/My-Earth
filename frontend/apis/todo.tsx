import axios from "axios";
import { config } from "../config";

const URL = config.URL + "todo/";

export const saveTodo = async (title: string) => {
  const result = await axios
    .post(
      URL + "savetodo",
      {
        title: title,
      },
      { withCredentials: true }
    )
    .then((response) => {
      return { success: true, err: "" };
    })
    .catch((e) => {
      if (e.response.status === 401) {
        return { success: false, err: e.response.data.err };
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

export const todoList = async () => {
  const result = await axios
    .get(URL + "todolist", { withCredentials: true })
    .then((response) => {
      return { success: true, data: response.data, err: "" };
    })
    .catch((e) => {
      if (e.response.status === 401) {
        return { success: false, data: [], err: e.response.data.err };
      } else if (e.response.status === 500) {
        return { success: false, data: [], err: e.response.data.err };
      } else {
        return { success: false, data: [], err: e.message };
      }
    });
  return result;
};

export const todoDelete = async (id: string) => {
  const result = await axios
    .post(
      URL + "delete",
      {
        id: id,
      },
      { withCredentials: true }
    )
    .then((response) => {
      return { success: true, err: "" };
    })
    .catch((e) => {
      if (e.response.status === 401) {
        return { success: false, err: e.response.data.err };
      } else if (e.response.status === 500) {
        return { success: false, err: e.response.data.err };
      } else {
        return { success: false, err: e.message };
      }
    });
  return result;
  // if (result.status === 204) {
  //   return result.data;
  // } else {
  //   return null;
  // }
};

export const setstatus = async (id: string, status: number) => {
  const result = await axios
    .post(
      URL + "setstatus",
      {
        id: id,
        status: status,
      },
      { withCredentials: true }
    )
    .then((response) => {
      return { success: true, err: "" };
    })
    .catch((e) => {
      if (e.response.status === 401) {
        return { success: false, err: e.response.data.err };
      } else if (e.response.status === 500) {
        return { success: false, err: e.response.data.err };
      } else {
        return { success: false, err: e.message };
      }
    });
  return result;
  // if (result.status === 204) {
  //   return result.data;
  // } else {
  //   return null;
  // }
};
