import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { fetchTeachers } from '../../services/teachersService';

export const loadTeachers = createAsyncThunk(
  'teachers/loadTeachers',
  async (_, { rejectWithValue }) => {
    try {
      const teachers = await fetchTeachers();
      return teachers;
    } catch (err) {
      return rejectWithValue(err.message);
    }
  }
);

const teachersSlice = createSlice({
  name: 'teachers',
  initialState: {
    items: [],
    isLoading: false,
    error: null,
  },
  reducers: {
    resetTeachers(state) {
      state.items = [];
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(loadTeachers.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(loadTeachers.fulfilled, (state, action) => {
        state.isLoading = false;
        state.items = action.payload;
      })
      .addCase(loadTeachers.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      });
  },
});

export const { resetTeachers } = teachersSlice.actions;

export const selectTeachers = (state) => state.teachers.items;
export const selectTeachersLoading = (state) => state.teachers.isLoading;
export const selectTeachersError = (state) => state.teachers.error;

export default teachersSlice.reducer;
