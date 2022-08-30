// goal 정보
// week, month, year, final

import { dataType, itemType } from "../types/GoalType";

export const UPDATE_WEEK = "goal/UPDATE_WEEK" as const;
export const UPDATE_MONTH = "goal/UPDATE_MONTH" as const;
export const UPDATE_YEAR = "goal/UPDATE_YEAR" as const;
export const UPDATE_FINAL = "goal/UPDATE_FINAL" as const;
export const SET_GOAL = "goal/SET_GOAL" as const;

export const setGoal = (goal: dataType) => ({
  type: SET_GOAL,
  week: goal.week,
  month: goal.month,
  year: goal.year,
  final: goal.final,
});
export const updateWeek = (goal: Array<itemType>) => ({
  type: UPDATE_WEEK,
  week: goal,
});
export const updatMonth = (goal: Array<itemType>) => ({
  type: UPDATE_MONTH,
  month: goal,
});
export const updateYear = (goal: Array<itemType>) => ({
  type: UPDATE_YEAR,
  year: goal,
});
export const updateFinal = (goal: Array<itemType>) => ({
  type: UPDATE_FINAL,
  final: goal,
});
type UserActions =
  | ReturnType<typeof updateWeek>
  | ReturnType<typeof updatMonth>
  | ReturnType<typeof updateYear>
  | ReturnType<typeof updateFinal>
  | ReturnType<typeof setGoal>;

type UserReduxState = {
  week: Array<itemType>;
  month: Array<itemType>;
  year: Array<itemType>;
  final: Array<itemType>;
  // 인덱스 시그니처
  [prop: string]: any;
};
// 초기상태
const initialState: UserReduxState = {
  week: [{ title: "", content: "" }],
  month: [{ title: "", content: "" }],
  year: [{ title: "", content: "" }],
  final: [{ title: "", content: "" }],
};

export default function userReducer(state = initialState, action: UserActions) {
  switch (action.type) {
    case UPDATE_WEEK:
      return {
        week: action.week,
        month: state.month,
        year: state.year,
        final: state.final,
      };
    case UPDATE_MONTH:
      return {
        week: state.week,
        month: action.month,
        year: state.year,
        final: state.final,
      };
    case UPDATE_YEAR:
      return {
        week: state.week,
        month: state.month,
        year: action.year,
        final: state.final,
      };
    case UPDATE_FINAL:
      return {
        week: state.week,
        month: state.month,
        year: state.year,
        final: action.final,
      };
    case SET_GOAL:
      return {
        week: action.week,
        month: action.month,
        year: action.year,
        final: action.final,
      };
    default:
      return state;
  }
}
