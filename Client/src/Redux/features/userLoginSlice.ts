import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

// Definición de las interfaces
interface UserAttributesData {
  email: string;
  password: string;
  first_name: string;
  last_name: string;
}

interface UserData {
  token: string;
  status: "idle" | "loading" | "succeeded" | "rejected";
  isAuthenticated: boolean;
  error: string | undefined | null | unknown;
  userId: string | null;
  userData: UserAttributesData | null;
}

interface InputData {
  email: string;
  password: string;
}

// Estado inicial
const initialState: UserData = {
  token: localStorage.getItem("token") || "",
  isAuthenticated: localStorage.getItem("isAuthenticated") === "true",
  status: "idle",
  userId: null,
  error: null,
  userData: null,
};

// Acciones asíncronas
export const loginUser = createAsyncThunk(
  "user/login",
  async (userData: InputData, { rejectWithValue }) => {
    try {
      const response = await axios.post("/login", userData);
      localStorage.setItem("token", response.data.token);
      localStorage.setItem("isAuthenticated", "true");
      return response.data;
    } catch (error) {
      let errorMessage = "Ocurrió un error desconocido";
      if (axios.isAxiosError(error)) {
        errorMessage = error.response?.data || errorMessage;
      }
      localStorage.removeItem("token");
      localStorage.removeItem("isAuthenticated");
      return rejectWithValue(errorMessage);
    }
  }
);

export const getUserData = createAsyncThunk(
  "user/getData",
  async (id: string, { rejectWithValue }) => {
    try {
      const response = await axios.get(`/user/${id}`);
      const { email, first_name, last_name, password } = response.data;
      return { email, first_name, last_name, password };
    } catch (error) {
      let errorMessage = "Ocurrió un error desconocido";
      if (axios.isAxiosError(error)) {
        errorMessage = error.response?.data || errorMessage;
      }
      return rejectWithValue(errorMessage);
    }
  }
);

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
  },
});

// Exportación de las acciones y los reductores
export const { logout, authenticatedLoginStatus, resetState, setUserId } = userSlice.actions;
export default userSlice.reducer;
