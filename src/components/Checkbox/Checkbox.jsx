import { useFormContext } from "react-hook-form";
import { ErrorMessage } from "../ErrorMessage/ErrorMessage";

import styles from "../FormSection/FormSection.module.css";

export const Checkbox = ({ name, label }) => {
  const { register } = useFormContext();

  return (
    <div className={styles.wrapper}>
      <label className={styles.label}>
        <input type="checkbox" {...register(name)} className={styles.input} />
        {label}
      </label>

      <ErrorMessage name={name} />
    </div>
  );
};
