import { configureStore } from "@reduxjs/toolkit";
import usersListReducer from "./usersListSlice";

const store = configureStore({
  reducer: {
    usersList: usersListReducer,
  },
});

export default store;
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export type AppStore = typeof store