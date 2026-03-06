import { useFormContext } from "react-hook-form";
import { ErrorMessage } from "../ErrorMessage/ErrorMessage";
import styles from "./CheckboxGroup.module.css";

export const CheckboxGroup = ({ name, label, options }) => {
  const { register } = useFormContext();

  return (
    <div className={styles.checkboxGroup}>
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
      <ErrorMessage name={name} />
    </div>
  );
};
