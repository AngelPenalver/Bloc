import { createAsyncThunk } from "@reduxjs/toolkit";
import { DataForgotPassword, DataSendMailForgotPassword, InputData, changePasswordAttribute, deleteAccountAttribute, deleteSendCodeAttribute } from "./interfaces";
import axios from "axios";

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
  export const changePassword = createAsyncThunk(
    "user/changePassword",
    async (data: changePasswordAttribute, { rejectWithValue }) => {
      try {
        const response = await axios.put(`/changePassword/${data.userId}`, data);
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
  export const sendDeleteCode = createAsyncThunk(
    "user/sendDeleteCode",
    async (data: deleteSendCodeAttribute, { rejectWithValue }) => {
      try {
        const response = await axios.put(`/delete/${data.userId}`);
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
  export const deleteAccount = createAsyncThunk(
    "user/deleteAccount",
    async (data: deleteAccountAttribute, { rejectWithValue }) => {
      try {
        const response = await axios.delete(`/delete/${data.userId}`, {
          data: { verificationCode: data.verificationCode },
        });
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
  export const sendMailForgotPassword = createAsyncThunk(
    "user/mailForgotPassword",
    async (data: DataSendMailForgotPassword, { rejectWithValue }) => {
      try {
        const response = await axios.put(`/forgotPassword`, data);
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
  
  export const forgotPassword = createAsyncThunk(
    "user/forgotPassword",
    async (data: DataForgotPassword, { rejectWithValue }) => {
      try {
        const response = await axios.put(`/forgotPassword`, data);
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
  