import { config } from "../config";
import axios, { AxiosResponse } from "axios";

export const apiInstance = () => {
  const instance = axios.create({
    baseURL: config.URL,
    headers: {
      "Content-Type": "application/json;charset=utf-8",
    },
    withCredentials: true,
  });

  instance.defaults.timeout = Number(process.env.NEXT_PUBLIC_TIMEOUT);

  instance.interceptors.response.use(
    (res: AxiosResponse) => {
      return res;
    },
    (err) => {
      if (err.code === "ECONNABORTED") {
        err.message = "timeout";
        return Promise.reject(err);
      } else {
        return Promise.reject(err);
      }
    }
  );
  return instance;
};
