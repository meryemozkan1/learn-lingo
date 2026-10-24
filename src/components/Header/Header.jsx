import { useState } from 'react';
import { NavLink } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { selectIsLoggedIn, selectUser } from '../../redux/slices/authSlice';
import { logoutUser } from '../../services/authService';
import { clearUser } from '../../redux/slices/authSlice';
import Modal from '../Modal/Modal';
import LoginForm from '../LoginForm/LoginForm';
import RegisterForm from '../RegisterForm/RegisterForm';
import styles from './Header.module.css';

export default function Header() {
  const dispatch = useDispatch();
  const isLoggedIn = useSelector(selectIsLoggedIn);
  const user = useSelector(selectUser);
  const [activeModal, setActiveModal] = useState(null);

  const closeModal = () => setActiveModal(null);

  const handleLogout = async () => {
    await logoutUser();
    dispatch(clearUser());
  };

  return (
    <>
      <header className={styles.header}>
        <div className={styles.container}>
          <NavLink to="/" className={styles.logo}>
            <span>learn</span>Lingo
          </NavLink>

          <nav className={styles.nav}>
            <NavLink
              to="/"
              className={({ isActive }) =>
                isActive ? `${styles.link} ${styles.active}` : styles.link
              }
              end
            >
              Home
            </NavLink>
            <NavLink
              to="/teachers"
              className={({ isActive }) =>
                isActive ? `${styles.link} ${styles.active}` : styles.link
              }
            >
              Teachers
            </NavLink>
            {isLoggedIn && (
              <NavLink
                to="/favorites"
                className={({ isActive }) =>
                  isActive ? `${styles.link} ${styles.active}` : styles.link
                }
              >
                Favorites
              </NavLink>
            )}
          </nav>

          <div className={styles.actions}>
            {isLoggedIn ? (
              <div className={styles.userArea}>
                <span className={styles.userName}>
                  👋 {user?.displayName ?? user?.email}
                </span>
                <button
                  className={styles.btnOutline}
                  onClick={handleLogout}
                  id="logout-btn"
                >
                  Log out
                </button>
              </div>
            ) : (
              <>
                <button
                  className={styles.btnOutline}
                  onClick={() => setActiveModal('login')}
                  id="open-login-btn"
                >
                  Log in
                </button>
                <button
                  className={styles.btnFilled}
                  onClick={() => setActiveModal('register')}
                  id="open-register-btn"
                >
                  Registration
                </button>
              </>
            )}
          </div>
        </div>
      </header>

      {activeModal === 'login' && (
        <Modal onClose={closeModal}>
          <LoginForm onClose={closeModal} />
        </Modal>
      )}

      {activeModal === 'register' && (
        <Modal onClose={closeModal}>
          <RegisterForm onClose={closeModal} />
        </Modal>
      )}
    </>
  );
}
