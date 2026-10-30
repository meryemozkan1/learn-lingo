import { useSelector } from 'react-redux';
import { Navigate } from 'react-router-dom';
import { selectIsLoggedIn, selectIsRefreshing } from '../../redux/slices/authSlice';

export default function PrivateRoute({ children }) {
  const isLoggedIn = useSelector(selectIsLoggedIn);
  const isRefreshing = useSelector(selectIsRefreshing);

  if (isRefreshing) {
    return null;
  }

  return isLoggedIn ? children : <Navigate to="/" replace />;
}
