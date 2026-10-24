import { configureStore } from '@reduxjs/toolkit';
import authReducer from './slices/authSlice';
import teachersReducer from './slices/teachersSlice';
import favoritesReducer from './slices/favoritesSlice';
import filtersReducer from './slices/filtersSlice';

export const store = configureStore({
  reducer: {
    auth: authReducer,
    teachers: teachersReducer,
    favorites: favoritesReducer,
    filters: filtersReducer,
  },
});
