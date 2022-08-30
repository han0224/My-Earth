// redux-persist, localstorage에 저장
import AsyncStorage from "@react-native-community/async-storage";
import { persistReducer, persistStore } from "redux-persist";
import storage from "redux-persist/lib/storage";
import { createWrapper, HYDRATE } from "next-redux-wrapper";
import thunkMiddleware from "redux-thunk";
import {
  applyMiddleware,
  combineReducers,
  legacy_createStore as createStore,
} from "redux";
import timer from "./timer";
import user from "./user";
import goal from "./goal";

// reducer들을 하나의 reducer로
const rootReducer = combineReducers({
  timer,
  user,
  goal,
});

// 합쳐진 리듀서에 next redux wrapper haydrate 타입 리듀서 추가
// hydrate는 서버에서 생성된 디럭스 스토어를 클라이언트에서 사용할 수 있도록 전달해 주는 역할
export const reducer = (state: any, action: any) => {
  if (action.type === HYDRATE) {
    const nextState = {
      ...state,
      ...action.payload,
    };
    return nextState;
  }
  return rootReducer(state, action);
};

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
const persistConfig = {
  key: "root",
  storage: AsyncStorage,
  whitelist: ["user", "timer"],
};

// createStore는 Store를 만들어주는 역할
// Store는 앱 전체 상태를 저장하고 있는 창고
// React는 하나의 저장소만 있어야함
// Next를 사용하면 Reducer Store가 여러개가 될 수 있음
// Next.js는 유저가 요청할 때마다 reudx stroe를 새로 생성함
const makeStore = () => {
  const isServer = typeof window === "undefined";
  console.log("serverss", isServer);
  if (isServer) {
    return createStore(reducer, bindMiddleware([]));
  } else {
    const persistedReducer = persistReducer(persistConfig, reducer);
    const store = createStore(
      persistedReducer,
      bindMiddleware([thunkMiddleware])
    );
    return store;
  }
};

export const wrapper = createWrapper(makeStore, {
  debug: process.env.NODE_ENV !== "production",
});

export const persistedReducer = persistReducer(persistConfig, reducer);
export const store = makeStore();
console.log("sotre", store);
export type RootState = ReturnType<typeof rootReducer>;
