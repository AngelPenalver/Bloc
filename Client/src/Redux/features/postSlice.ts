import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
interface NoteAttribute {
  title: string;
  userId: string | null;
  description: string;
  noteId: string;
}
interface NoteDetailAttribute {
  title: string;
  description: string;
  id: string;
  userId: string;
  createdAt: string;
  updateAt: string;
}
interface PostData {
  status: "idle" | "success" | "loading" | "rejected";
  error: null | string | unknown;
  notes: [];
  noteDetail: NoteDetailAttribute | null;
  status_create_note: "idle" | "success" | "loading" | "rejected";
  status_getNoteForId: "idle" | "success" | "loading" | "rejected";
  status_deleteNote: "idle" | "success" | "loading" | "rejected";
}
const initialState: PostData = {
  status_create_note: "idle",
  status_getNoteForId: "idle",
  status_deleteNote: "idle",
  noteDetail: null,
  status: "idle",
  error: null,
  notes: [],
};
export const createNote = createAsyncThunk(
  "noteCreate/fetchNote",
  async (input: NoteAttribute, { rejectWithValue }) => {
    try {
      const response = await axios.post("/notes/create", input);
      return response.data;
    } catch (error) {
      let errorMessage = "Ocurrió un error desconocido";
      if (axios.isAxiosError(error)) {
        errorMessage = error.response?.data.error || errorMessage;
      }
      return rejectWithValue(errorMessage);
    }
  }
);
export const saveNote = createAsyncThunk(
  "note/saveNote",
  async (input: NoteAttribute, { rejectWithValue }) => {
    try {
      const response = await axios.put(`/notes/update/${input.noteId}`, input);
      return response.data;
    } catch (error) {
      let errorMessage = "Ocurrió un error desconocido";
      if (axios.isAxiosError(error)) {
        errorMessage = error.response?.data.error || errorMessage;
      }
      return rejectWithValue(errorMessage);
    }
  }
);
export const deleteNote = createAsyncThunk(
  "note/deleteNote",
  async (id: number, { rejectWithValue }) => {
    try {
      const response = await axios.delete(`/notes/${id}`);
      return response.data;
    } catch (error) {
      let errorMessage = "Ocurrió un error desconocido";
      if (axios.isAxiosError(error)) {
        errorMessage = error.response?.data.error || errorMessage;
      }
      return rejectWithValue(errorMessage);
    }
  }
);
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
export const getNoteForId = createAsyncThunk(
  "noteGet/fetchNoteGet",
  async (id: string, { rejectWithValue }) => {
    try {
      const response = await axios.get(`notes/${id}`);
      console.log(response);

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
  reducers: {
    reseatStatus: (state) => {
      state.status = "idle";
      state.error = null;
      state.status_create_note = "idle";
      state.status_getNoteForId = "idle";
      state.status_deleteNote = 'idle';
    },
    resetDetail: (state) => {
      state.status_getNoteForId = "idle";
      state.noteDetail = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getNote.pending, (state) => {
        state.status = "loading";
      })
      .addCase(getNote.fulfilled, (state, action) => {
        state.notes = action.payload;
        state.status = "success";
        state.error = null;
      })
      .addCase(getNote.rejected, (state, action) => {
        state.status = "rejected";
        state.error = action.payload;
      })
      .addCase(saveNote.pending, (state) => {
        state.status = "loading";
      })
      .addCase(saveNote.fulfilled, (state) => {
        state.status = "success";
      })
      .addCase(saveNote.rejected, (state, action) => {
        state.status = "rejected";
        state.error = action.payload;
      })
      .addCase(createNote.pending, (state) => {
        state.status_create_note = "loading";
      })
      .addCase(createNote.fulfilled, (state) => {
        state.status_create_note = "success";
        state.error = null;
      })
      .addCase(createNote.rejected, (state, action) => {
        state.status_create_note = "rejected";
        state.error = action.payload;
      })
      .addCase(getNoteForId.pending, (state) => {
        state.status_getNoteForId = "loading";
      })
      .addCase(getNoteForId.fulfilled, (state, action) => {
        state.status_getNoteForId = "success";
        state.noteDetail = action.payload;
      })
      .addCase(getNoteForId.rejected, (state, action) => {
        state.error = action.payload;
        state.status_getNoteForId = "rejected";
      })
      .addCase(deleteNote.pending, (state) => {
        state.status_deleteNote = "loading";
      })
      .addCase(deleteNote.fulfilled, (state) => {
        state.status_deleteNote = "success";
      })
      .addCase(deleteNote.rejected, (state, action) => {
        state.status_deleteNote = "rejected";
        state.error = action.payload;
      });
  },
});

export const { reseatStatus, resetDetail } = noteSlice.actions;

export default noteSlice.reducer;
