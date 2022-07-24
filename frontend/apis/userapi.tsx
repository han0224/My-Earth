import axios from "axios";
import { config } from "../config";

const URL = config.URL + "user/";

export const login = async (email: string, password: string) => {
  const result = await axios
    .post(
      URL + "login",
      {
        email: email,
        password: password,
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
  // if (result.status === 200) {
  //   return { success: true, data: result.data };
  // } else {
  //   return { success: false, message: "다시 한번 입력해 주세요" };
  // }
};

export const register = async (
  name: string,
  email: string,
  password: string
) => {
  const result = await axios
    .post(
      URL + "register",
      {
        name: name,
        email: email,
        password: password,
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
  //   return result;
  // } else {
  //   return null;
  // }
};

export const auth = async () => {
  const result = await axios
    .get(URL + "auth", {
      withCredentials: true,
    })
    .then((response) => {
      return { success: true, data: response.data, err: "" };
    })
    .catch((e) => {
      if (e.response.status === 401) {
        return { success: false, data: "", err: e.response.data.err };
      } else if (e.response.status === 500) {
        return { success: false, data: "", err: e.response.data.err };
      } else {
        return { success: false, data: "", err: e.message };
      }
    });
  return result;
  // if (result.status === 200) {
  //   return result.data;
  // } else {
  //   return null;
  // }
};

export const logout = async () => {
  const result = await axios
    .get(URL + "logout", {
      withCredentials: true,
    })
    .then((response) => {
      return { success: true, data: response.data, err: "" };
    })
    .catch((e) => {
      if (e.response.status === 401) {
        return { success: false, data: "", err: e.response.data.err };
      } else if (e.response.status === 500) {
        return { success: false, data: "", err: e.response.data.err };
      } else {
        return { success: false, data: "", err: e.message };
      }
    });
  return result;
  // if (result.status === 200) {
  //   return result;
  // } else {
  //   return null;
  // }
};
