import { createSlice } from '@reduxjs/toolkit';

// localStorage helpers — uid bazlı anahtar
export const getFavoritesKey = (uid) => `ll_favorites_${uid}`;

export const loadFavoritesFromStorage = (uid) => {
  if (!uid) return [];
  try {
    const serialized = localStorage.getItem(getFavoritesKey(uid));
    return serialized ? JSON.parse(serialized) : [];
  } catch {
    return [];
  }
};

export const saveFavoritesToStorage = (uid, items) => {
  if (!uid) return;
  try {
    localStorage.setItem(getFavoritesKey(uid), JSON.stringify(items));
  } catch {
    // storage hatalarını sessizce geç
  }
};

const favoritesSlice = createSlice({
  name: 'favorites',
  initialState: {
    items: [],
  },
  reducers: {
    setFavorites(state, action) {
      state.items = action.payload || [];
    },
    addFavorite(state, action) {
      const teacher = action.payload;
      const exists = state.items.some((t) => String(t.id) === String(teacher.id));
      if (!exists) {
        state.items.push(teacher);
      }
    },
    removeFavorite(state, action) {
      const id = String(action.payload);
      state.items = state.items.filter((t) => String(t.id) !== id);
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
  state.favorites.items.some((t) => String(t.id) === String(id));

export default favoritesSlice.reducer;
