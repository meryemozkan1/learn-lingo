import styles from './FavoritesPage.module.css';

export default function FavoritesPage() {
  return (
    <div className={styles.page}>
      <div className={styles.container}>
        <h1 className={styles.title}>Favorites</h1>
        <p className={styles.subtitle}>Your saved teachers will appear here</p>
      </div>
    </div>
  );
}
