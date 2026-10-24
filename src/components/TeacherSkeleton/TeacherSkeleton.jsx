import styles from './TeacherSkeleton.module.css';

export default function TeacherSkeleton() {
  return (
    <div className={styles.card} aria-hidden="true">
      <div className={styles.avatar} />
      <div className={styles.body}>
        <div className={styles.row}>
          <div className={`${styles.block} ${styles.nameBlock}`} />
          <div className={`${styles.block} ${styles.metaBlock}`} />
        </div>
        <div className={`${styles.block} ${styles.lineBlock}`} />
        <div className={`${styles.block} ${styles.lineBlock}`} />
        <div className={styles.badgeRow}>
          {[1, 2, 3].map((i) => (
            <div key={i} className={`${styles.block} ${styles.badge}`} />
          ))}
        </div>
      </div>
    </div>
  );
}
