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
    console.log(result);
    return result.data;
  } catch (e) {
    console.log("error", e);
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

    console.log(result);
    return result.data.success;
  } catch (e) {
    console.log("error", e);
  }
};

export const auth = async () => {
  try {
    const result = await axios.get(URL + "auth", {
      withCredentials: true,
    });
    console.log(result);
    return result.data;
  } catch (e) {
    console.log("error", e);
  }
};

export const logout = async () => {
  try {
    const result = await axios.get(URL + "logout", {
      withCredentials: true,
    });
    console.log("logout result", result);
    return result.data.success;
  } catch (e) {
    console.log("error", e);
  }
};
