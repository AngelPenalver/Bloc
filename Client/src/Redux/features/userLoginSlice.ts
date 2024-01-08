import { createSlice } from "@reduxjs/toolkit";
import { UserData } from "../services/interfaces";
import {
  forgotPassword,
  changePassword,
  deleteAccount,
  getUserData,
  loginUser,
  sendDeleteCode,
  sendMailForgotPassword,
} from "../services/funtionsAsync";

// Definición de las interfaces

// Estado inicial
const initialState: UserData = {
  token: localStorage.getItem("token") || "",
  isAuthenticated: localStorage.getItem("isAuthenticated") === "true",
  status: "idle",
  userId: null,
  error: null,
  userData: null,
  status_deleteAccount: "idle",
  status_deleteCode: "idle",
  status_ForgotPassword: "idle",
  status_mailForgotPassword: "idle",
};

// Reductores
const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    logout: (state) => {
      state.error = null;
      state.token = "";
      state.isAuthenticated = false;
      state.status = "idle";
      state.userId = null;
      localStorage.removeItem("token");
      localStorage.removeItem("isAuthenticated");
    },
    authenticatedLoginStatus: (state, action) => {
      state.token = action.payload.token;
      state.isAuthenticated = action.payload.isAuthenticated;
    },
    resetState: (state) => {
      state.status = "idle";
      state.status_deleteAccount = "idle";
      state.status_deleteCode = "idle";
      state.status_ForgotPassword = "idle";
      state.status_mailForgotPassword = "idle";
    },
    setUserId: (state, action) => {
      state.userId = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(loginUser.pending, (state) => {
      state.status = "loading";
    });
    builder.addCase(loginUser.fulfilled, (state, action) => {
      state.status = "succeeded";
      state.isAuthenticated = true;
      state.token = action.payload.token;
    });
    builder.addCase(loginUser.rejected, (state, action) => {
      state.status = "rejected";
      state.error = action.payload;
      state.isAuthenticated = false;
    });
    builder.addCase(getUserData.pending, (state) => {
      state.userData = null;
    });
    builder.addCase(getUserData.fulfilled, (state, action) => {
      state.userData = action.payload;
    });
    builder.addCase(getUserData.rejected, (state, action) => {
      state.error = action.payload;
    });
    builder.addCase(changePassword.pending, (state) => {
      state.status = "loading";
    });
    builder.addCase(changePassword.fulfilled, (state) => {
      state.status = "succeeded";
    });
    builder.addCase(changePassword.rejected, (state, action) => {
      state.status = "rejected";
      state.error = action.payload;
    });
    builder.addCase(deleteAccount.pending, (state) => {
      state.status_deleteAccount = "loading";
    });
    builder.addCase(deleteAccount.fulfilled, (state) => {
      state.status_deleteAccount = "succeeded";
    });
    builder.addCase(deleteAccount.rejected, (state, action) => {
      state.status_deleteAccount = "rejected";
      state.error = action.payload;
    });
    builder.addCase(sendDeleteCode.pending, (state) => {
      state.status_deleteCode = "loading";
    });
    builder.addCase(sendDeleteCode.fulfilled, (state) => {
      state.status_deleteCode = "succeeded";
    });
    builder.addCase(sendDeleteCode.rejected, (state, action) => {
      state.status_deleteCode = "rejected";
      state.error = action.payload;
    });
    builder.addCase(sendMailForgotPassword.pending, (state) => {
      state.status_mailForgotPassword = "loading";
    });
    builder.addCase(sendMailForgotPassword.fulfilled, (state) => {
      state.status_mailForgotPassword = "succeeded";
    });
    builder.addCase(sendMailForgotPassword.rejected, (state, action) => {
      state.status_mailForgotPassword = "rejected";
      state.error = action.payload;
    });
    builder.addCase(forgotPassword.pending, (state) => {
      state.status_ForgotPassword = "loading";
    });
    builder.addCase(forgotPassword.fulfilled, (state) => {
      state.status_ForgotPassword = "succeeded";
    });
    builder.addCase(forgotPassword.rejected, (state, action) => {
      state.status_ForgotPassword = "rejected";
      state.error = action.payload;
    });
  },
});

// Exportación de las acciones y los reductores
export const { logout, authenticatedLoginStatus, resetState, setUserId } =
  userSlice.actions;
export default userSlice.reducer;
