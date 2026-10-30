import { useEffect, useMemo, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { loadTeachers } from '../../redux/slices/teachersSlice';
import {
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
  const error = useSelector(selectTeachersError);
  const filters = useSelector(selectFilters);

  const [visibleCount, setVisibleCount] = useState(PAGE_SIZE);
  const [prevFilters, setPrevFilters] = useState(filters);

  // Filtreler değiştiğinde sayfalama sayacını doğrudan render sırasında 4'e sıfırla
  if (prevFilters !== filters) {
    setPrevFilters(filters);
    setVisibleCount(PAGE_SIZE);
  }

  useEffect(() => {
    if (teachers.length === 0) {
      dispatch(loadTeachers());
    }
  }, [dispatch, teachers.length]);

  const filteredTeachers = useMemo(() => {
    return applyFilters(teachers, filters);
  }, [teachers, filters]);

  const visibleTeachers = filteredTeachers.slice(0, visibleCount);
  const hasMore = visibleCount < filteredTeachers.length;
  const isInitialLoad = isLoading && teachers.length === 0;

  const handleLoadMore = () => {
    setVisibleCount((prev) => prev + PAGE_SIZE);
  };

  return (
    <div className={styles.page}>
      <div className={styles.container}>
        <FilterBar />

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
            : visibleTeachers.map((teacher) => (
                <li key={teacher.id}>
                  <TeacherCard teacher={teacher} />
                </li>
              ))}
        </ul>

        {filteredTeachers.length === 0 && !isInitialLoad && !error && (
          <div className={styles.empty}>
            <p className={styles.emptyTitle}>No teachers found for the selected filters.</p>
            <p className={styles.emptyHint}>Try adjusting or resetting your search criteria.</p>
          </div>
        )}

        {hasMore && !isInitialLoad && (
          <div className={styles.loadMoreWrapper}>
            <button
              type="button"
              className={styles.loadMoreBtn}
              onClick={handleLoadMore}
              id="load-more-btn"
            >
              Load more
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
