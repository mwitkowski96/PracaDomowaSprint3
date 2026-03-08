import { useFormContext } from "react-hook-form";
import { ErrorMessage } from "../ErrorMessage/ErrorMessage";
import styles from "./Radio.module.css";

export const Radio = ({ name, label, options = [] }) => {
  const { register, setValue } = useFormContext();

  const handleKeyDown = (e, value) => {
    if (e.key === "Enter") {
      e.preventDefault();
      setValue(name, value, { shouldValidate: true, shouldDirty: true });
    }
  };

  return (
    <div className={styles.radioGroup}>
      <h3 className="form-subheading">{label}</h3>
      <div className={styles.wrapper}>
        {options.map((option) => (
          <label key={option.value} className={styles.radioLabel}>
            <input
              type="radio"
              value={option.value}
              {...register(name)}
              onKeyDown={(e) => handleKeyDown(e, option.value)}
              className="sr-only"
            />
            <span className={styles.customCircle}></span>
            <span className={styles.labelText}>{option.label}</span>
          </label>
        ))}
      </div>
      <ErrorMessage name={name} />
    </div>
  );
};
