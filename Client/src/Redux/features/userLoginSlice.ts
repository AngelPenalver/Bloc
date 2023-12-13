import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

interface UserData {
  token: string;
  status: "idle" | "loading" | "succeeded" | "rejected";
  isAuthenticated: boolean;
  error: string | undefined | null | unknown;
  userId: string | null;
}

// Inicializa el estado con los valores de localStorage si existen
const initialState: UserData = {
  token: localStorage.getItem('token') || "",
  isAuthenticated: localStorage.getItem('isAuthenticated') === 'true',
  status: "idle",
  userId: null,
  error: null,
};

interface InputData {
  email: string;
  password: string;
}

export const loginUser = createAsyncThunk(
  "user/fetchUser",
  async (userData: InputData, { rejectWithValue }) => {
    try {
      const response = await axios.post(
        "http://localhost:3001/login",
        userData
      );
      localStorage.setItem('token', response.data.token);
      localStorage.setItem('isAuthenticated', 'true');
      return response.data;
    } catch (error) {
      let errorMessage = "Ocurrió un error desconocido";
      if (axios.isAxiosError(error)) {
        errorMessage = error.response?.data || errorMessage;
      }
      localStorage.removeItem('token');
      localStorage.removeItem('isAuthenticated');
      return rejectWithValue(errorMessage);
    }
  }
);

const userLoginSlice = createSlice({
  name: "login",
  initialState,
  reducers: {
    logout: (state) => {
      state.error = null;
      state.token = "";
      state.isAuthenticated = false;
      state.status = "idle";
      state.error = null;
      state.userId = null
      localStorage.removeItem('token');
      localStorage.removeItem('isAuthenticated');
    },
    authenticatedLoginStatus: (state, action) => {
      state.token = action.payload.token;
      state.isAuthenticated = action.payload.isAuthenticated
    },
    resetState: (state) => {
      state.status = "idle";
    },
    setUserId: (state, action) => {
      state.userId = action.payload
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(loginUser.pending, (state) => {
        state.status = "loading";
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.isAuthenticated = true;
        state.token = action.payload.token;
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.status = "rejected";
        state.error = action.payload;
        state.isAuthenticated = false;
      });
  },
});

export const { logout, authenticatedLoginStatus, resetState, setUserId } = userLoginSlice.actions;
export default userLoginSlice.reducer;
