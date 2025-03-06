import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import client from "../../utils/axios/create.js";

// 🔹 fetch all notes 
export const fetchNotes = createAsyncThunk(
    "notes/fetchNotes",
    async (_, { rejectWithValue }) => {
        try {
            console.log('fetchNotes');
            const { data } = await client.get("/notes");
            return data.data; // Returns the authenticated user object
        } catch (error) {
            return rejectWithValue(error.response.data.message || "Fetching notes failed");
        }
    }
);

// 🔹 Register User
export const addNote = createAsyncThunk(
    "notes/addNote",
    async (noteData, { rejectWithValue }) => {
        try {
            console.log('addNote');
            const { data } = await client.post("/notes", noteData);
            console.log("data after add :", data);
            return data.data; // Returns note data after adding
        } catch (error) {
            return rejectWithValue(error.response.data.message || "Adding note failed");
        }
    }
);

// 🔹 Login User
export const updateNote = createAsyncThunk(
    "notes/updateNote",
    async ({ noteData, noteID }, { rejectWithValue }) => {
        try {
            console.log("Updating note...");
            const { data } = await client.patch(`/notes/${noteID}`, noteData);
            return data.data; // ✅ Returns updated note data
        } catch (error) {
            console.error("Update Error:", error);
            return rejectWithValue(error.response?.data?.message || "Updating note failed");
        }
    }
);


// 🔹 Logout User
export const deleteNote = createAsyncThunk(
    "notes/deleteNote",
    async (noteID, { rejectWithValue }) => {
        try {
            console.log('deleteNote');
            const { data } = await client.delete(`/notes/${noteID}`);
            return data.data; // Clears the user state on success
        } catch (error) {
            return rejectWithValue(error.response?.data.message || "Deleing note failed");
        }
    }
);

// 🔹 User Slice
const noteSlice = createSlice({
    name: "notes",
    initialState: {
        notes: [],
        loading: false,
        error: null
    },
    reducers: {

        reArrange:(state, action) => {

            state.notes = state.notes.sort((a, b) => new Date(b.updatedAt) - new Date(a.updatedAt));
        }
    }, // No synchronous reducers needed
    extraReducers: (builder) => {
        builder
            // ✅ Initialize User
            .addCase(fetchNotes.fulfilled, (state, action) => {
                state.notes = action.payload;
            })

            // ✅ Register User
            .addCase(addNote.fulfilled, (state, action) => {
                state.notes.unshift(action.payload);
            })

            // ✅ Login User
            .addCase(updateNote.fulfilled, (state, action) => {
                state.notes = state.notes.map(note => note._id === action.payload._id ? action.payload : note);
            })

            // ✅ Logout User
            .addCase(deleteNote.fulfilled, (state, action) => {
                state.notes = state.notes.filter(note => note._id !== action.payload._id);
            })

            // ✅ Loading & Error Handling
            .addMatcher((action) => action.type.startsWith("notes/") &&  action.type.endsWith("/pending"), (state) => {
                state.loading = true;
                state.error = null;
            })
            .addMatcher((action) => action.type.startsWith("notes/") &&  action.type.endsWith("/fulfilled"), (state) => {
                state.loading = false;
            })
            .addMatcher((action) => action.type.startsWith("notes/") &&  action.type.endsWith("/rejected"), (state, action) => {
                state.loading = false;
                console.log(action.payload);
                state.error = action.payload;
            });
    }
});

export const { reArrange } = noteSlice.actions;
// Export Reducer
export default noteSlice.reducer;
