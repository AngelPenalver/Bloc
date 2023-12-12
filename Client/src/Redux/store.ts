import { configureStore } from "@reduxjs/toolkit";
import userLoginReducer from "./features/userLoginSlice";
import  registerUserReducer from "./features/userRegisterSlice";

export const store = configureStore({
    reducer: {
       login: userLoginReducer,
       register: registerUserReducer
    }
})
export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;