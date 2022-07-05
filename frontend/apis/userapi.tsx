import axios from "axios";
import { config } from "../config";

const URL = config.URL + "user/";

export const login = async (email: string, password: string) => {
  try {
    const result = await axios.post(
      URL + "login",
      {
        email: email,
        password: password,
      },
      { withCredentials: true }
    );
    if (result.status === 204) {
      return { success: true, data: result.data };
    } else if (result.status === 401) {
      return { success: false, err: "다시 입력해 주세요" };
    } else {
      return null;
    }
  } catch (e) {
    console.log("error", e);
    return null;
  }
};

export const register = async (
  name: string,
  email: string,
  password: string
) => {
  try {
    const result = await axios.post(
      URL + "register",
      {
        name: name,
        email: email,
        password: password,
      },
      { withCredentials: true }
    );

    if (result.status === 204) {
      return result;
    } else {
      return null;
    }
  } catch (e) {
    console.log("error", e);
    return null;
  }
};

export const auth = async () => {
  try {
    const result = await axios.get(URL + "auth", {
      withCredentials: true,
    });
    if (result.status === 200) {
      return result.data;
    } else {
      return null;
    }
  } catch (e) {
    console.log("error", e);
    return null;
  }
};

export const logout = async () => {
  try {
    const result = await axios.get(URL + "logout", {
      withCredentials: true,
    });
    if (result.status === 200) {
      return result;
    } else {
      return null;
    }
  } catch (e) {
    console.log("error", e);
    return null;
  }
};
