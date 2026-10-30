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
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const closeModal = () => setActiveModal(null);
  const toggleMobileMenu = () => setMobileMenuOpen((prev) => !prev);
  const closeMobileMenu = () => setMobileMenuOpen(false);

  const handleLogout = async () => {
    closeMobileMenu();
    await logoutUser();
    dispatch(clearUser());
  };

  return (
    <>
      <header className={styles.header}>
        <div className={styles.container}>
          <NavLink to="/" className={styles.logo} onClick={closeMobileMenu}>
            <span>learn</span>Lingo
          </NavLink>

          {/* Desktop Nav */}
          <nav className={styles.desktopNav}>
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

          {/* Desktop Actions */}
          <div className={styles.desktopActions}>
            {isLoggedIn ? (
              <div className={styles.userArea}>
                <span className={styles.userName}>
                  👋 {user?.displayName ?? user?.email}
                </span>
                <button
                  type="button"
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
                  type="button"
                  className={styles.btnOutline}
                  onClick={() => setActiveModal('login')}
                  id="open-login-btn"
                >
                  Log in
                </button>
                <button
                  type="button"
                  className={styles.btnFilled}
                  onClick={() => setActiveModal('register')}
                  id="open-register-btn"
                >
                  Registration
                </button>
              </>
            )}
          </div>

          {/* Mobile Menu Toggle Button */}
          <button
            type="button"
            className={styles.menuToggle}
            onClick={toggleMobileMenu}
            aria-label="Toggle menu"
            aria-expanded={mobileMenuOpen}
          >
            {mobileMenuOpen ? '✕' : '☰'}
          </button>
        </div>

        {/* Mobile Navigation Drawer */}
        {mobileMenuOpen && (
          <div className={styles.mobileDrawer}>
            <nav className={styles.mobileNav}>
              <NavLink
                to="/"
                className={({ isActive }) =>
                  isActive ? `${styles.link} ${styles.active}` : styles.link
                }
                onClick={closeMobileMenu}
                end
              >
                Home
              </NavLink>
              <NavLink
                to="/teachers"
                className={({ isActive }) =>
                  isActive ? `${styles.link} ${styles.active}` : styles.link
                }
                onClick={closeMobileMenu}
              >
                Teachers
              </NavLink>
              {isLoggedIn && (
                <NavLink
                  to="/favorites"
                  className={({ isActive }) =>
                    isActive ? `${styles.link} ${styles.active}` : styles.link
                  }
                  onClick={closeMobileMenu}
                >
                  Favorites
                </NavLink>
              )}
            </nav>

            <div className={styles.mobileActions}>
              {isLoggedIn ? (
                <div className={styles.mobileUserArea}>
                  <span className={styles.userName}>
                    👋 {user?.displayName ?? user?.email}
                  </span>
                  <button
                    type="button"
                    className={styles.btnOutline}
                    onClick={handleLogout}
                  >
                    Log out
                  </button>
                </div>
              ) : (
                <div className={styles.mobileAuthBtns}>
                  <button
                    type="button"
                    className={styles.btnOutline}
                    onClick={() => {
                      closeMobileMenu();
                      setActiveModal('login');
                    }}
                  >
                    Log in
                  </button>
                  <button
                    type="button"
                    className={styles.btnFilled}
                    onClick={() => {
                      closeMobileMenu();
                      setActiveModal('register');
                    }}
                  >
                    Registration
                  </button>
                </div>
              )}
            </div>
          </div>
        )}
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
