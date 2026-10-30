import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  addFavorite,
  removeFavorite,
  selectIsFavorite,
} from '../../redux/slices/favoritesSlice';
import { selectIsLoggedIn } from '../../redux/slices/authSlice';
import { selectFilters } from '../../redux/slices/filtersSlice';
import Modal from '../Modal/Modal';
import LoginForm from '../LoginForm/LoginForm';
import styles from './TeacherCard.module.css';

export default function TeacherCard({ teacher }) {
  const dispatch = useDispatch();
  const isLoggedIn = useSelector(selectIsLoggedIn);
  const isFavorite = useSelector(selectIsFavorite(teacher.id));
  const filters = useSelector(selectFilters);
  const [expanded, setExpanded] = useState(false);
  const [showAuthModal, setShowAuthModal] = useState(false);

  const handleFavorite = (e) => {
    e.stopPropagation();
    if (!isLoggedIn) {
      setShowAuthModal(true);
      return;
    }
    if (isFavorite) {
      dispatch(removeFavorite(teacher.id));
    } else {
      dispatch(addFavorite(teacher));
    }
  };

  return (
    <>
      <article className={styles.card}>
        <div className={styles.avatarCol}>
          <div className={styles.avatarWrapper}>
            <img
              src={teacher.avatar_url}
              alt={`${teacher.name} ${teacher.surname}`}
              className={styles.avatar}
              loading="lazy"
            />
            <span className={styles.onlineDot} />
          </div>
        </div>

        <div className={styles.body}>
          <div className={styles.topRow}>
            <div className={styles.nameGroup}>
              <span className={styles.subtitle}>Languages</span>
              <h2 className={styles.name}>
                {teacher.name} {teacher.surname}
              </h2>
            </div>

            <div className={styles.meta}>
              <span className={styles.metaItem}>
                📚 Lessons online
              </span>
              <div className={styles.metaDivider} />
              <span className={styles.metaItem}>
                Lessons done: <strong>{teacher.lessons_done.toLocaleString()}</strong>
              </span>
              <div className={styles.metaDivider} />
              <span className={styles.metaItem}>
                ⭐ Rating: <strong>{teacher.rating.toFixed(1)}</strong>
              </span>
              <div className={styles.metaDivider} />
              <span className={styles.metaItem}>
                Price / 1 hour:{' '}
                <strong className={styles.price}>${teacher.price_per_hour}</strong>
              </span>

              <button
                type="button"
                className={`${styles.heartBtn} ${isFavorite ? styles.heartActive : ''}`}
                onClick={handleFavorite}
                title={
                  isLoggedIn
                    ? isFavorite
                      ? 'Remove from favorites'
                      : 'Add to favorites'
                    : 'Log in to save favorites'
                }
                aria-label={isFavorite ? 'Remove from favorites' : 'Add to favorites'}
                id={`favorite-btn-${teacher.id}`}
              >
                <svg
                  width="26"
                  height="26"
                  viewBox="0 0 26 26"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                  className={styles.heartIcon}
                >
                  <path
                    d="M15.9999 4.38281C13.8827 4.38281 12.8354 6.27315 12.5 6.90906C12.1646 6.27315 11.1173 4.38281 9.0001 4.38281C6.23868 4.38281 4 6.62149 4 9.38291C4 13.0645 8.16667 17.5 12.5 20.6172C16.8333 17.5 21 13.0645 21 9.38291C21 6.62149 18.7613 4.38281 15.9999 4.38281Z"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </button>
            </div>
          </div>

          <div className={styles.languages}>
            <span className={styles.infoLabel}>Speaks: </span>
            <span className={styles.infoValue}>
              {teacher.languages.map((lang, i) => (
                <span key={lang}>
                  <strong className={styles.underline}>{lang}</strong>
                  {i < teacher.languages.length - 1 && ', '}
                </span>
              ))}
            </span>
          </div>

          <div className={styles.infoRow}>
            <span className={styles.infoLabel}>Lesson Info: </span>
            <span className={styles.infoValue}>{teacher.lesson_info}</span>
          </div>

          <div className={styles.infoRow}>
            <span className={styles.infoLabel}>Conditions: </span>
            <span className={styles.infoValue}>{teacher.conditions.join('; ')}</span>
          </div>

          <div className={styles.levels}>
            {teacher.levels.map((level) => {
              const isSelected = filters.level === level;
              return (
                <span
                  key={level}
                  className={`${styles.levelBadge} ${isSelected ? styles.levelBadgeActive : ''}`}
                >
                  #{level}
                </span>
              );
            })}
          </div>

          {!expanded && (
            <button
              type="button"
              className={styles.readMore}
              onClick={() => setExpanded(true)}
            >
              Read more
            </button>
          )}

          {expanded && (
            <div className={styles.expanded}>
              <p className={styles.experience}>{teacher.experience}</p>

              <div className={styles.reviews}>
                {teacher.reviews.map((review, i) => (
                  <div key={i} className={styles.review}>
                    <div className={styles.reviewerRow}>
                      <div className={styles.reviewerAvatar}>
                        {review.reviewer_name[0]}
                      </div>
                      <div>
                        <p className={styles.reviewerName}>{review.reviewer_name}</p>
                        <div className={styles.reviewStars}>
                          {'⭐'.repeat(review.reviewer_rating)}
                          <span className={styles.reviewRating}>
                            {review.reviewer_rating.toFixed(1)}
                          </span>
                        </div>
                      </div>
                    </div>
                    <p className={styles.reviewComment}>{review.comment}</p>
                  </div>
                ))}
              </div>

              <button
                type="button"
                className={styles.bookBtn}
                id={`book-trial-btn-${teacher.id}`}
              >
                Book trial lesson
              </button>
            </div>
          )}
        </div>
      </article>

      {/* Yetkisiz kullanıcı için uyarı ve giriş modalı */}
      {showAuthModal && (
        <Modal onClose={() => setShowAuthModal(false)}>
          <div className={styles.authModalContent}>
            <h2 className={styles.authModalTitle}>Log in to save your favorites</h2>
            <p className={styles.authModalText}>
              To add teachers to your favorites list, please log in to your account.
              Only registered users can save and access their favorite teachers.
            </p>
            <LoginForm onClose={() => setShowAuthModal(false)} />
          </div>
        </Modal>
      )}
    </>
  );
}
