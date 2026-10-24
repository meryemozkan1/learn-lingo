import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { fetchTeachersPage } from '../../services/teachersService';

export const loadTeachers = createAsyncThunk(
  'teachers/loadTeachers',
  async (_, { getState, rejectWithValue }) => {
    try {
      const { lastKey } = getState().teachers;
      const result = await fetchTeachersPage(lastKey);
      return result;
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
    lastKey: null,
    hasMore: true,
  },
  reducers: {
    resetTeachers(state) {
      state.items = [];
      state.lastKey = null;
      state.hasMore = true;
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
        state.items = [...state.items, ...action.payload.teachers];
        state.lastKey = action.payload.nextKey;
        state.hasMore = action.payload.hasMore;
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
export const selectHasMore = (state) => state.teachers.hasMore;

export default teachersSlice.reducer;
