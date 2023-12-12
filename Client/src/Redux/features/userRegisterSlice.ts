import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

interface RegisterData {
  email: string;
  password: string;
  first_name: string;
  last_name: string;
}

interface RegisterState {
  status: "idle" | "loading" | "succeeded" | "rejected";
  error: string | undefined | null | unknown;
}

const initialState: RegisterState = {
  status: "idle",
  error: null,
};

export const registerUser = createAsyncThunk(
  "user/registerUser",
  async (registerData: RegisterData, { rejectWithValue }) => {
    try {
      const response = await axios.post("/register", registerData);
      return response.data;
    } catch (error) {
      let errorMessage = "Ocurrió un error desconocido";
      if (axios.isAxiosError(error)) {
        errorMessage = error.response?.data || errorMessage;
      }
      return rejectWithValue(errorMessage);
    }
  }
);

const userRegisterSlice = createSlice({
  name: "register",
  initialState,
  reducers: {
    resetState: (state) => {
      state.status = "idle";
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(registerUser.pending, (state) => {
        state.status = "loading";
      })
      .addCase(registerUser.fulfilled, (state) => {
        state.status = "succeeded";
      })
      .addCase(registerUser.rejected, (state, action) => {
        state.status = "rejected";
        state.error = action.payload;
      });
  },
});
export const { resetState } = userRegisterSlice.actions;

export default userRegisterSlice.reducer;
