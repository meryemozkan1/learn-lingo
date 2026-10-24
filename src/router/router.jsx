import { createBrowserRouter } from 'react-router-dom';
import Layout from '../components/Layout/Layout';
import HomePage from '../pages/HomePage/HomePage';
import TeachersPage from '../pages/TeachersPage/TeachersPage';
import FavoritesPage from '../pages/FavoritesPage/FavoritesPage';
import NotFoundPage from '../pages/NotFoundPage/NotFoundPage';
import PrivateRoute from '../components/PrivateRoute/PrivateRoute';

export const router = createBrowserRouter([
  {
    path: '/',
    element: <Layout />,
    children: [
      {
        index: true,
        element: <HomePage />,
      },
      {
        path: 'teachers',
        element: <TeachersPage />,
      },
      {
        path: 'favorites',
        element: (
          <PrivateRoute>
            <FavoritesPage />
          </PrivateRoute>
        ),
      },
    ],
  },
  {
    path: '*',
    element: <NotFoundPage />,
  },
]);
