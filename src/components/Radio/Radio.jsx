import { useFormContext } from "react-hook-form";
import styles from "./Radio.module.css";

export const Radio = ({ name, label, options = [] }) => {
  const { register } = useFormContext();

  return (
    <div className={styles.radioGroup}>
      <span className={styles.subHeading}>{label}</span>
      <div className={styles.optionsContainer}>
        {options.map((option) => (
          <label key={option.value} className={styles.radioLabel}>
            <input
              type="radio"
              value={option.value}
              {...register(name)}
              className={styles.radioInput}
            />
            <span className={styles.customCircle}></span>
            <span className={styles.labelText}>{option.label}</span>
          </label>
        ))}
      </div>
    </div>
  );
};
