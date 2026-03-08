import { useFormContext } from "react-hook-form";
import { ErrorMessage } from "../ErrorMessage/ErrorMessage";
import styles from "./CheckboxGroup.module.css";

export const CheckboxGroup = ({ name, label, options }) => {
  const { register, getValues, setValue } = useFormContext();

  const handleKeyDown = (e, option) => {
    if (e.key === "Enter") {
      e.preventDefault();
      const currentValues = getValues(name) || [];
      const newValues = currentValues.includes(option)
        ? currentValues.filter((val) => val !== option)
        : [...currentValues, option];

      setValue(name, newValues, { shouldValidate: true, shouldDirty: true });
    }
  };

  return (
    <div className={styles.checkboxGroup}>
      <h3 className="form-subheading">{label}</h3>
      <div className={styles.tilesContainer}>
        {options.map((option) => (
          <label key={option} className={styles.tileItem}>
            <input
              type="checkbox"
              value={option}
              {...register(name)}
              onKeyDown={(e) => handleKeyDown(e, option)}
              className="sr-only"
            />
            <span className={styles.tileText}>{option}</span>
          </label>
        ))}
      </div>
      <ErrorMessage name={name} />
    </div>
  );
};
