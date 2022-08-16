// user 정보
// email, name, time

export const SET_USER = "user/SET_USER" as const;
export const DELETE_USER = "user/DELETE_USER" as const;
export const UPDATE_TIME = "user/UPDATE_USER" as const;

interface userI {
  email: string;
  name: string;
  time: string;
}
export const setUser = (user: userI) => ({
  type: SET_USER,
  isUser: true,
  email: user.email,
  name: user.name,
  time: user.time,
});
export const updateUser = (time: string) => ({
  type: UPDATE_TIME,
  time: time,
});

export const deleteUser = () => ({
  type: DELETE_USER,
  isUser: false,
  email: "",
  name: "",
  time: "",
});

type UserActions =
  | ReturnType<typeof setUser>
  | ReturnType<typeof deleteUser>
  | ReturnType<typeof updateUser>;

type UserReduxState = {
  isUser: boolean;
  email: string;
  name: string;
  time: string;
};
// 초기상태
const initialState: UserReduxState = {
  isUser: false,
  email: "",
  name: "",
  time: "",
};

export default function userReducer(state = initialState, action: UserActions) {
  switch (action.type) {
    case SET_USER:
      return {
        isUser: action.isUser,
        email: action.email,
        name: action.name,
        time: action.time,
      };
    case DELETE_USER:
      return {
        isUser: action.isUser,
        email: action.email,
        name: action.name,
        time: action.time,
      };
    case UPDATE_TIME:
      return {
        isUser: state.isUser,
        email: state.email,
        name: state.name,
        time: action.time,
      };
    default:
      return state;
  }
}
