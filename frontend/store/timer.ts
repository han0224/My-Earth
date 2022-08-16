export const SET_START = "timer/SET_START" as const;
export const SAVE_TIME = "timer/SAVE_TIME" as const;
export const SET_TIMER = "timer/SET_TIMER" as const;
export const SET_PRE_TIME = "timer/SET_PRE_TIME" as const;
export const SET_DATE = "timer/SET_DATE" as const;
export const INIT_TIMER = "timer/INIT_TIMER" as const;

export const setStart = (start: boolean) => ({
  type: SET_START,
  start: start,
});
export const saveTime = (time: number) => ({
  type: SAVE_TIME,
  time: time,
});
export const setTimer = (timer: NodeJS.Timer | undefined) => ({
  type: SET_TIMER,
  timer: timer,
});
export const setPreTime = (preTime: number) => ({
  type: SET_PRE_TIME,
  preTime: preTime,
});
export const setDate = (date: string) => ({
  type: SET_DATE,
  date: date,
});
export const initTimer = () => ({
  type: INIT_TIMER,
  start: false,
  preTime: 0,
  time: 0,
  timer: undefined,
  date: "",
});

type TimerActions =
  | ReturnType<typeof setStart>
  | ReturnType<typeof saveTime>
  | ReturnType<typeof setPreTime>
  | ReturnType<typeof setDate>
  | ReturnType<typeof setTimer>
  | ReturnType<typeof initTimer>;

export type TimerReduxState = {
  start: boolean;
  time: number;
  preTime: number;
  timer: undefined | number;
  date: string;
};
// 초기상태
const initialState: TimerReduxState = {
  start: false,
  preTime: 0,
  time: 0,
  timer: undefined,
  date: "",
};

export default function timerReducer(
  state = initialState,
  action: TimerActions
) {
  switch (action.type) {
    case SET_START:
      return {
        start: action.start,
        time: state.time,
        timer: state.timer,
        preTime: state.preTime,
        date: state.date,
      };
    case SAVE_TIME:
      return {
        start: state.start,
        time: action.time,
        timer: state.timer,
        preTime: state.preTime,
        date: state.date,
      };
    case SET_TIMER:
      return {
        start: state.start,
        time: state.time,
        timer: action.timer,
        preTime: state.preTime,
        date: state.date,
      };
    case SET_PRE_TIME:
      return {
        start: state.start,
        time: state.time,
        timer: state.timer,
        preTime: action.preTime,
        date: state.date,
      };
    case SET_DATE:
      return {
        start: state.start,
        time: state.time,
        timer: state.timer,
        preTime: state.preTime,
        date: action.date,
      };
    case INIT_TIMER:
      return {
        start: state.start,
        time: state.time,
        timer: state.timer,
        preTime: state.preTime,
        date: state.date,
      };
    default:
      return state;
  }
}
