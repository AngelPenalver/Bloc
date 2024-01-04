import { configureStore } from "@reduxjs/toolkit";
import { userLoginReducer, getDataUserReducer } from './features/userLoginSlice'
import registerUserReducer from "./features/userRegisterSlice";
import notesReducer from "./features/postSlice";

export const store = configureStore({
  reducer: {
    login: userLoginReducer,
    userData: getDataUserReducer,
    register: registerUserReducer,
    notes: notesReducer
  },
});
export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
