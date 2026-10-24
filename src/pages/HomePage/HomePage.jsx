import styles from './HomePage.module.css';

export default function HomePage() {
  return (
    <section className={styles.hero}>
      <div className={styles.container}>
        <div className={styles.content}>
          <h1 className={styles.title}>
            Unlock your potential with the best{' '}
            <span className={styles.highlight}>language</span> tutors
          </h1>
          <p className={styles.description}>
            Embark on an Exciting Language Journey with Expert Language Tutors:
            Elevate your language proficiency to new heights by connecting with
            highly qualified and experienced tutors.
          </p>
          <a href="/teachers" className={styles.cta}>
            Get started
          </a>
        </div>
        <div className={styles.imageWrapper}>
          <div className={styles.imagePlaceholder} />
        </div>
      </div>

      <div className={styles.stats}>
        <div className={styles.statItem}>
          <span className={styles.statNumber}>32,000+</span>
          <span className={styles.statLabel}>Experienced tutors</span>
        </div>
        <div className={styles.divider} />
        <div className={styles.statItem}>
          <span className={styles.statNumber}>300,000+</span>
          <span className={styles.statLabel}>5-star tutor reviews</span>
        </div>
        <div className={styles.divider} />
        <div className={styles.statItem}>
          <span className={styles.statNumber}>120+</span>
          <span className={styles.statLabel}>Subjects taught</span>
        </div>
        <div className={styles.divider} />
        <div className={styles.statItem}>
          <span className={styles.statNumber}>200+</span>
          <span className={styles.statLabel}>Tutor nationalities</span>
        </div>
      </div>
    </section>
  );
}
