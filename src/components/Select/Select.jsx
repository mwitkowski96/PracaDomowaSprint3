import { useFormContext } from "react-hook-form";
import { ErrorMessage } from "../ErrorMessage/ErrorMessage";
import styles from "./Select.module.css";

export const Select = ({ name, label, options = [], ...props }) => {
  const { register } = useFormContext();

  return (
    <div className={styles.selectWrapper}>
      <label htmlFor={name}>{label}</label>
      <select
        {...register(name)}
        {...props}
        id={name}
        className={styles.select}
      >
        <option value="">Wybierz...</option>
        {options.map((opt) => {
          const val = typeof opt === "string" ? opt : opt.value;
          const lbl = typeof opt === "string" ? opt : opt.label;

          return (
            <option key={val} value={val}>
              {lbl}
            </option>
          );
        })}
      </select>
      <ErrorMessage name={name} />
    </div>
  );
};
