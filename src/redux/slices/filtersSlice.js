import { createSlice } from '@reduxjs/toolkit';

const filtersSlice = createSlice({
  name: 'filters',
  initialState: {
    language: '',
    level: '',
    price: '',
  },
  reducers: {
    setFilter(state, action) {
      const { key, value } = action.payload;
      state[key] = value;
    },
    resetFilters(state) {
      state.language = '';
      state.level = '';
      state.price = '';
    },
  },
});

export const { setFilter, resetFilters } = filtersSlice.actions;

export const selectFilters = (state) => state.filters;

export default filtersSlice.reducer;
