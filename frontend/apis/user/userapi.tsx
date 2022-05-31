import axios from "axios";
import { setCookie } from "../../util/cookie";

const URL = "http://localhost:5000/";

export const login = async (email: string, password: string) => {
  try {
    const result = await axios.post(
      URL + "user/login",
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
      URL + "user/register",
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
    const result = await axios.get(URL + "user/auth", {
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
    const result = await axios.get(URL + "user/logout", {
      withCredentials: true,
    });
    console.log("logout result", result);
    return result.data.success;
  } catch (e) {
    console.log("error", e);
  }
};
