import { createWrapper, HYDRATE } from "next-redux-wrapper";
import {
  applyMiddleware,
  combineReducers,
  legacy_createStore as createStore,
} from "redux";
import timer from "./timer";
import user from "./user";
// ducks type으로 제작된 reducer들을 하나의 reducer로
const rootReducer = combineReducers({
  timer,
  user,
});

// 합쳐진 리듀서에 next redux wrapper haydrate 타입 리듀서 추가
// hydrate는 서버에서 생성된 디럭스 스토어를 클라이언트에서 사용할 수 있도록 전달해 주는 역할
const reducer = (state, action) => {
  if (action.type === HYDRATE) {
    const nextState = {
      ...state,
      ...action.payload,
    };
    return nextState;
  }
  return rootReducer(state, action);
};

export type RootState = ReturnType<typeof rootReducer>;

// middlewre 적용을 위한 store enhancer
// reudx middle는 액션에 디스패치 되어 리듀서에서 처리하기 위해 사전에 지정된 작업물
// 리덕스 데브툴즈 확장 프로그램을 사용하기 위해서 미들웨어에 리덕스 데브툴즈를 사용하도록 하는 코드

const bindMiddleware = (middleware: any) => {
  if (process.env.NODE_ENV !== "production") {
    const { composeWithDevTools } = require("redux-devtools-extension");
    return composeWithDevTools(applyMiddleware(...middleware));
  }
  return applyMiddleware(...middleware);
};

const initStore = () => {
  return createStore(reducer, bindMiddleware([]));
};

export const wrapper = createWrapper(initStore);
