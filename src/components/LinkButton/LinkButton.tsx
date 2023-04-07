import styles from "./LinkButton.module.scss";

const LinkButton = ({ title }: { title: string }) => {
  return (
    <button className={`${styles.button} ${styles.learn_more}`}>
      <span className={styles.circle} aria-hidden="true">
        <span className={`${styles.icon} ${styles.arrow}`}></span>
      </span>
      <span className={styles.button_text}>{title}</span>
    </button>
  );
};

export default LinkButton;
