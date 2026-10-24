import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  addFavorite,
  removeFavorite,
  selectIsFavorite,
} from '../../redux/slices/favoritesSlice';
import { selectIsLoggedIn } from '../../redux/slices/authSlice';
import styles from './TeacherCard.module.css';

export default function TeacherCard({ teacher }) {
  const dispatch = useDispatch();
  const isLoggedIn = useSelector(selectIsLoggedIn);
  const isFavorite = useSelector(selectIsFavorite(teacher.id));
  const [expanded, setExpanded] = useState(false);

  const handleFavorite = () => {
    if (!isLoggedIn) return;
    if (isFavorite) {
      dispatch(removeFavorite(teacher.id));
    } else {
      dispatch(addFavorite(teacher));
    }
  };

  return (
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
              className={`${styles.heartBtn} ${isFavorite ? styles.heartActive : ''}`}
              onClick={handleFavorite}
              title={isLoggedIn ? 'Add to favorites' : 'Log in to save'}
              aria-label="Toggle favorite"
              id={`favorite-btn-${teacher.id}`}
            >
              {isFavorite ? '♥' : '♡'}
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
          {teacher.levels.map((level) => (
            <span key={level} className={styles.levelBadge}>
              #{level}
            </span>
          ))}
        </div>

        {!expanded && (
          <button
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
              className={styles.bookBtn}
              id={`book-trial-btn-${teacher.id}`}
            >
              Book trial lesson
            </button>
          </div>
        )}
      </div>
    </article>
  );
}
