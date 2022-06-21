export const SET_START = "timer/SET_START" as const;
export const SAVE_TIME = "timer/SAVE_TIME" as const;
export const SET_TIMER = "timer/SET_TIMER" as const;

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

type TimerActions =
  | ReturnType<typeof setStart>
  | ReturnType<typeof saveTime>
  | ReturnType<typeof setTimer>;

type TimerReduxState = {
  start: boolean;
  time: number;
  timer: typeof setInterval | undefined;
};
// 초기상태
const initialState: TimerReduxState = {
  start: false,
  time: 0,
  timer: undefined,
};

export default function reducer(state = initialState, action: TimerActions) {
  switch (action.type) {
    case SET_START:
      return { start: action.start, time: state.time, timer: state.timer };
    case SAVE_TIME:
      return { start: state.start, time: action.time, timer: state.timer };
    case SET_TIMER:
      return { start: state.start, time: state.time, timer: action.timer };
    default:
      return state;
  }
}
