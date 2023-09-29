import { apiInstance } from ".";

const URL = "user/";
const api = apiInstance();
export const login = async (email: string, password: string) => {
  const result = await api
    .post(URL + "login", {
      email: email,
      password: password,
    })
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
};

export const register = async (
  name: string,
  email: string,
  password: string
) => {
  const result = await api
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
};

export const auth = async () => {
  const result = await api
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
};

export const logout = async () => {
  const result = await api
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
};

export const getImg = async () => {
  const result = await api
    .get(URL + "image", { withCredentials: true })
    .then((response) => {
      return { success: true, data: response.data, err: "" };
    })
    .catch((e) => {
      if (e.response.status === 500) {
        return { success: false, data: "", err: e.response.data.err };
      } else {
        return { success: false, data: "", err: e.message };
      }
    });
  return result;
};
