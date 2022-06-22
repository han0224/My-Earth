export const SET_USER = "user/SET_USER" as const;

export const setUser = (isUser: boolean) => ({
  type: SET_USER,
  isUser: isUser,
});

type UserActions = ReturnType<typeof setUser>;

type UserReduxState = {
  isUser: boolean;
  statue: number;
};
// 초기상태
const initialState: UserReduxState = {
  isUser: false,
  statue: 0,
};

export default function userReducer(state = initialState, action: UserActions) {
  switch (action.type) {
    case SET_USER:
      return { isUser: action.isUser, statue: state.statue };
    default:
      return state;
  }
}
