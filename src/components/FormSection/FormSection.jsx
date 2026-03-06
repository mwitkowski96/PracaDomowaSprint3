import styles from "./FormSection.module.css";

export const FormSection = ({ title, children }) => {
  return (
    <section className={styles.section}>
      {title && <h2 className={styles.sectionTitle}>{title}</h2>}
      <div className={styles.wrapper}>{children}</div>
    </section>
  );
};
