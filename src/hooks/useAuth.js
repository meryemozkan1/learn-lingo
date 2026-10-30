import { onAuthStateChanged } from 'firebase/auth';
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { auth } from '../services/firebase';
import { clearUser, setUser } from '../redux/slices/authSlice';
import {
  clearFavorites,
  loadFavoritesFromStorage,
  setFavorites,
} from '../redux/slices/favoritesSlice';

export function useAuth() {
  const dispatch = useDispatch();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (firebaseUser) => {
      if (firebaseUser) {
        dispatch(
          setUser({
            uid: firebaseUser.uid,
            email: firebaseUser.email,
            displayName: firebaseUser.displayName,
          })
        );
        // Bu kullanıcının localStorage favorilerini Redux'a yükle
        const saved = loadFavoritesFromStorage(firebaseUser.uid);
        dispatch(setFavorites(saved));
      } else {
        dispatch(clearUser());
        dispatch(clearFavorites());
      }
    });

    return () => unsubscribe();
  }, [dispatch]);
}

