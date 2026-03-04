import { useFormContext } from "react-hook-form";
import styles from "./CheckboxGroup.module.css";

export const CheckboxGroup = ({ name, label, options }) => {
  const {
    register,
    formState: { errors },
  } = useFormContext();
  const error = name.split(".").reduce((obj, key) => obj?.[key], errors);

  return (
    <div className={styles.checkboxGroupContainer}>
      <h3>{label}</h3>
      <div className={styles.tilesContainer}>
        {options.map((option) => (
          <label key={option} className={styles.tileItem}>
            <input
              type="checkbox"
              value={option}
              {...register(name)}
              className={styles.srOnly}
            />
            <span className={styles.tileText}>{option}</span>
          </label>
        ))}
      </div>
      {error && <span className={styles.error}>{error.message}</span>}
    </div>
  );
};
