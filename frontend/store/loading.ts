export const UPDATE_WEEK = "goal/UPDATE_WEEK" as const;
export const UPDATE_MONTH = "goal/UPDATE_MONTH" as const;
export const UPDATE_YEAR = "goal/UPDATE_YEAR" as const;
export const UPDATE_FINAL = "goal/UPDATE_FINAL" as const;
export const SET_GOAL = "goal/SET_GOAL" as const;

export const SET_LOADING = "loading/SET_LOADING" as const;

export const setLoading = (newStatus: boolean) => ({
  type: SET_LOADING,
  status: newStatus,
});

type UserActions = ReturnType<typeof setLoading>;

type UserReduxState = {
  status: boolean;
};
// 초기상태
const initialState: UserReduxState = {
  status: false,
};

export default function userReducer(state = initialState, action: UserActions) {
  switch (action.type) {
    case SET_LOADING:
      return {
        status: action.status,
      };
    default:
      return state;
  }
}
