import { createSlice } from '@reduxjs/toolkit';

const favoritesSlice = createSlice({
  name: 'favorites',
  initialState: {
    items: [],
  },
  reducers: {
    setFavorites(state, action) {
      state.items = action.payload;
    },
    addFavorite(state, action) {
      const exists = state.items.find((t) => t.id === action.payload.id);
      if (!exists) {
        state.items.push(action.payload);
      }
    },
    removeFavorite(state, action) {
      state.items = state.items.filter((t) => t.id !== action.payload);
    },
    clearFavorites(state) {
      state.items = [];
    },
  },
});

export const { setFavorites, addFavorite, removeFavorite, clearFavorites } =
  favoritesSlice.actions;

export const selectFavorites = (state) => state.favorites.items;
export const selectIsFavorite = (id) => (state) =>
  state.favorites.items.some((t) => t.id === id);

export default favoritesSlice.reducer;
