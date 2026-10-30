import { configureStore } from '@reduxjs/toolkit';
import authReducer from './slices/authSlice';
import teachersReducer from './slices/teachersSlice';
import favoritesReducer from './slices/favoritesSlice';
import { saveFavoritesToStorage } from './slices/favoritesSlice';
import filtersReducer from './slices/filtersSlice';

// Favori değişikliklerini localStorage'a kaydeden middleware
const favoritesLocalStorageMiddleware = (storeAPI) => (next) => (action) => {
  const result = next(action);
  const persistedActions = [
    'favorites/addFavorite',
    'favorites/removeFavorite',
    'favorites/setFavorites',
    'favorites/clearFavorites',
  ];
  if (persistedActions.includes(action.type)) {
    const state = storeAPI.getState();
    const uid = state.auth.user?.uid;
    saveFavoritesToStorage(uid, state.favorites.items);
  }
  return result;
};

export const store = configureStore({
  reducer: {
    auth: authReducer,
    teachers: teachersReducer,
    favorites: favoritesReducer,
    filters: filtersReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(favoritesLocalStorageMiddleware),
});
