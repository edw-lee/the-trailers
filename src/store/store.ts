import { configureStore, combineReducers } from "@reduxjs/toolkit";
import homeReducer from "./slices/homeSlice";

import type { HomeState } from "./slices/homeSlice";

export interface RootState {
  home: HomeState;
}

const rootReducer = combineReducers({
  home: homeReducer,
});

export const makeStore = (preloadedState?: Partial<RootState>) => {
  return configureStore({
    reducer: rootReducer,
    ...(preloadedState && { preloadedState }),
    middleware: (getDefaultMiddleware) =>
      getDefaultMiddleware({
        serializableCheck: false,
      }),
  });
};

export type AppStore = ReturnType<typeof makeStore>;
export type AppDispatch = AppStore["dispatch"];
