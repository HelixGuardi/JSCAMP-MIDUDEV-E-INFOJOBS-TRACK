import { useEffect, useState } from "react";
import styles from "./404.module.css";

export default function NotFoundPage() {
  const [digit1, setDigit1] = useState("");
  const [digit2, setDigit2] = useState("");
  const [digit3, setDigit3] = useState("");

  useEffect(() => {
    const randomNum = () => Math.floor(Math.random() * 9) + 1;

    let i = 0;
    const time = 30;

    const loop3 = setInterval(() => {
      if (i > 40) {
        clearInterval(loop3);
        setDigit3(4);
      } else {
        setDigit3(randomNum());
        i++;
      }
    }, time);

    const loop2 = setInterval(() => {
      if (i > 80) {
        clearInterval(loop2);
        setDigit2(0);
      } else {
        setDigit2(randomNum());
        i++;
      }
    }, time);

    const loop1 = setInterval(() => {
      if (i > 100) {
        clearInterval(loop1);
        setDigit1(4);
      } else {
        setDigit1(randomNum());
        i++;
      }
    }, time);

    return () => {
      clearInterval(loop1);
      clearInterval(loop2);
      clearInterval(loop3);
    };
  }, []);

  return (
    <main className={styles.notFound}>
      <div className={styles.error}>
        <div className={styles.containerFloud}>
          <div
            className={`${styles.colXs12} ${styles.groundColor} ${styles.textCenter}`}
          >
            <div className={styles.containerError404}>
              <div className={styles.clip}>
                <div className={styles.shadow}>
                  <span className={`${styles.digit} ${styles.thirdDigit}`}>
                    {digit3}
                  </span>
                </div>
              </div>
              <div className={styles.clip}>
                <div className={styles.shadow}>
                  <span className={`${styles.digit} ${styles.secondDigit}`}>
                    {digit2}
                  </span>
                </div>
              </div>
              <div className={styles.clip}>
                <div className={styles.shadow}>
                  <span className={`${styles.digit} ${styles.firstDigit}`}>
                    {digit1}
                  </span>
                </div>
              </div>
              <div className={styles.msg}>
                OH!<span className={styles.triangle}></span>
              </div>
            </div>
            <h2 className={styles.h1}>Sorry! Page not found</h2>
            <a
              href="/"
              style={{
                textDecoration: "none",
                color: "var(--text-muted)",
                padding: "10px",
                border: "2px solid var(--primary-light)",
                borderRadius: "20px",
              }}
            >
              Back To Home
            </a>
          </div>
        </div>
      </div>
    </main>
  );
}
