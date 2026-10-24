import { Outlet } from 'react-router-dom';
import { useSelector } from 'react-redux';
import Header from '../Header/Header';
import { useAuth } from '../../hooks/useAuth';
import { selectIsRefreshing } from '../../redux/slices/authSlice';

export default function Layout() {
  useAuth();
  const isRefreshing = useSelector(selectIsRefreshing);

  if (isRefreshing) return null;

  return (
    <>
      <Header />
      <main>
        <Outlet />
      </main>
    </>
  );
}
