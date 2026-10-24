import { useCallback, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { loadTeachers, resetTeachers } from '../../redux/slices/teachersSlice';
import {
  selectHasMore,
  selectTeachers,
  selectTeachersError,
  selectTeachersLoading,
} from '../../redux/slices/teachersSlice';
import { selectFilters } from '../../redux/slices/filtersSlice';
import FilterBar from '../../components/FilterBar/FilterBar';
import TeacherCard from '../../components/TeacherCard/TeacherCard';
import TeacherSkeleton from '../../components/TeacherSkeleton/TeacherSkeleton';
import styles from './TeachersPage.module.css';

const PAGE_SIZE = 4;

function applyFilters(teachers, filters) {
  return teachers.filter((t) => {
    const langMatch = !filters.language || t.languages.includes(filters.language);
    const levelMatch = !filters.level || t.levels.includes(filters.level);
    const priceMatch = !filters.price || t.price_per_hour <= Number(filters.price);
    return langMatch && levelMatch && priceMatch;
  });
}

export default function TeachersPage() {
  const dispatch = useDispatch();
  const teachers = useSelector(selectTeachers);
  const isLoading = useSelector(selectTeachersLoading);
  const hasMore = useSelector(selectHasMore);
  const error = useSelector(selectTeachersError);
  const filters = useSelector(selectFilters);

  useEffect(() => {
    dispatch(loadTeachers());
    return () => {
      dispatch(resetTeachers());
    };
  }, [dispatch]);

  const handleFilterChange = useCallback(() => {
    dispatch(loadTeachers());
  }, [dispatch]);

  const handleLoadMore = () => {
    dispatch(loadTeachers());
  };

  const filteredTeachers = applyFilters(teachers, filters);
  const isInitialLoad = isLoading && teachers.length === 0;

  return (
    <div className={styles.page}>
      <div className={styles.container}>
        <FilterBar onFilterChange={handleFilterChange} />

        {error && (
          <div className={styles.error}>
            <p>⚠️ {error}</p>
          </div>
        )}

        <ul className={styles.list}>
          {isInitialLoad
            ? Array.from({ length: PAGE_SIZE }).map((_, i) => (
                <li key={i}>
                  <TeacherSkeleton />
                </li>
              ))
            : filteredTeachers.map((teacher) => (
                <li key={teacher.id}>
                  <TeacherCard teacher={teacher} />
                </li>
              ))}
        </ul>

        {filteredTeachers.length === 0 && !isLoading && !error && (
          <div className={styles.empty}>
            <p>No teachers found for the selected filters.</p>
            <p className={styles.emptyHint}>Try adjusting your search criteria.</p>
          </div>
        )}

        {hasMore && !isInitialLoad && (
          <div className={styles.loadMoreWrapper}>
            <button
              className={styles.loadMoreBtn}
              onClick={handleLoadMore}
              disabled={isLoading}
              id="load-more-btn"
            >
              {isLoading ? (
                <span className={styles.spinner} />
              ) : (
                'Load more'
              )}
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
