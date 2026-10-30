import { useMemo } from 'react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { selectFavorites } from '../../redux/slices/favoritesSlice';
import { selectFilters } from '../../redux/slices/filtersSlice';
import FilterBar from '../../components/FilterBar/FilterBar';
import TeacherCard from '../../components/TeacherCard/TeacherCard';
import styles from './FavoritesPage.module.css';

function applyFilters(teachers, filters) {
  return teachers.filter((t) => {
    const langMatch = !filters.language || t.languages.includes(filters.language);
    const levelMatch = !filters.level || t.levels.includes(filters.level);
    const priceMatch = !filters.price || t.price_per_hour <= Number(filters.price);
    return langMatch && levelMatch && priceMatch;
  });
}

export default function FavoritesPage() {
  const favorites = useSelector(selectFavorites);
  const filters = useSelector(selectFilters);

  const filteredFavorites = useMemo(() => {
    return applyFilters(favorites, filters);
  }, [favorites, filters]);

  const hasAnyFilter = Boolean(filters.language || filters.level || filters.price);

  return (
    <div className={styles.page}>
      <div className={styles.container}>
        <div className={styles.headerArea}>
          <h1 className={styles.title}>Favorites</h1>
          <p className={styles.subtitle}>
            {favorites.length > 0
              ? `${favorites.length} teacher${favorites.length > 1 ? 's' : ''} saved`
              : 'Your saved teachers will appear here'}
          </p>
        </div>

        {favorites.length === 0 ? (
          <div className={styles.empty}>
            <span className={styles.emptyIcon}>🤍</span>
            <p className={styles.emptyTitle}>No favorites yet</p>
            <p className={styles.emptyHint}>
              Browse our teachers and click the heart icon on any card to save your favorites.
            </p>
            <Link to="/teachers" className={styles.browseBtn} id="browse-teachers-btn">
              Browse Teachers
            </Link>
          </div>
        ) : (
          <>
            <FilterBar />

            {filteredFavorites.length === 0 ? (
              <div className={styles.empty}>
                <p className={styles.emptyTitle}>No matches found</p>
                <p className={styles.emptyHint}>
                  {hasAnyFilter
                    ? 'No favorite teachers match your selected filters. Try adjusting or resetting your filters.'
                    : 'No favorite teachers found.'}
                </p>
              </div>
            ) : (
              <ul className={styles.list}>
                {filteredFavorites.map((teacher) => (
                  <li key={teacher.id}>
                    <TeacherCard teacher={teacher} />
                  </li>
                ))}
              </ul>
            )}
          </>
        )}
      </div>
    </div>
  );
}
