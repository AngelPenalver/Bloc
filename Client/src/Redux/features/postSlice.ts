import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

interface PostData {
  status: "idle" | "success" | "loading" | "rejected";
  error: null | string | unknown;
  notes: [];
}
const initialState: PostData = {
  status: "idle",
  error: null,
  notes: [],
};
// export const createNote
export const getNote = createAsyncThunk(
  "note/fetchNote",
  async (userId: string, { rejectWithValue }) => {
    try {
      const response = await axios.get(`/notes/user/${userId}`);
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
const noteSlice = createSlice({
  name: "note",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getNote.pending, (state) => {
        console.log('pending');
        
        state.status = "loading";
      })
      .addCase(getNote.fulfilled, (state, action) => {
        state.notes = action.payload;
        state.status = "success";
        state.error = null;
      })
      .addCase(getNote.rejected, (state, action) => {
        console.log('rejected');
        
        state.status = "rejected";
        state.error = action.payload;
      });
  },
});

export default noteSlice.reducer;
