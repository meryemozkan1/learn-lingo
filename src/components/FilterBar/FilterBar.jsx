import { useDispatch, useSelector } from 'react-redux';
import { resetTeachers } from '../../redux/slices/teachersSlice';
import { selectFilters, setFilter } from '../../redux/slices/filtersSlice';
import styles from './FilterBar.module.css';

const LANGUAGES = [
  'English', 'French', 'German', 'Spanish', 'Portuguese',
  'Japanese', 'Mandarin', 'Arabic', 'Russian', 'Swedish',
  'Norwegian', 'Hindi', 'Italian',
];

const LEVELS = [
  'A1 Beginner', 'A2 Elementary', 'B1 Intermediate',
  'B2 Upper-Intermediate', 'C1 Advanced', 'C2 Proficient',
];

const PRICES = ['10', '20', '30', '40'];

export default function FilterBar({ onFilterChange }) {
  const dispatch = useDispatch();
  const filters = useSelector(selectFilters);

  const handleChange = (key, value) => {
    dispatch(setFilter({ key, value }));
    dispatch(resetTeachers());
    onFilterChange();
  };

  return (
    <div className={styles.bar}>
      <div className={styles.group}>
        <label className={styles.label} htmlFor="filter-language">Languages</label>
        <select
          id="filter-language"
          className={styles.select}
          value={filters.language}
          onChange={(e) => handleChange('language', e.target.value)}
        >
          <option value="">All Languages</option>
          {LANGUAGES.map((lang) => (
            <option key={lang} value={lang}>{lang}</option>
          ))}
        </select>
      </div>

      <div className={styles.group}>
        <label className={styles.label} htmlFor="filter-level">Level of knowledge</label>
        <select
          id="filter-level"
          className={styles.select}
          value={filters.level}
          onChange={(e) => handleChange('level', e.target.value)}
        >
          <option value="">All Levels</option>
          {LEVELS.map((level) => (
            <option key={level} value={level}>{level}</option>
          ))}
        </select>
      </div>

      <div className={styles.group}>
        <label className={styles.label} htmlFor="filter-price">Price per hour</label>
        <select
          id="filter-price"
          className={styles.select}
          value={filters.price}
          onChange={(e) => handleChange('price', e.target.value)}
        >
          <option value="">Any Price</option>
          {PRICES.map((price) => (
            <option key={price} value={price}>${price}</option>
          ))}
        </select>
      </div>
    </div>
  );
}
