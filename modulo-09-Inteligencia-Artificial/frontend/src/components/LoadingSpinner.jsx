import styles from "../styles/LoadingSpinner.module.css";

export function LoadingSpinner() {
  return (
    <div className={styles.spinnerContainer}>
      <div className={styles.demo}>
        {Array.from({ length: 5 }).map((_, i) => (
          <div key={i} className={styles.circle}>
            <div className={styles.inner}></div>
          </div>
        ))}
      </div>
    </div>
  );
}
