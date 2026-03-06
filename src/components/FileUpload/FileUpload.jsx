import { useFormContext } from "react-hook-form";
import { ErrorMessage } from "../ErrorMessage/ErrorMessage";
import styles from "./FileUpload.module.css";

export const FileUpload = ({ name, label }) => {
  const {
    register,
    setValue,
    formState: { errors },
  } = useFormContext();

  const error = name.split(".").reduce((obj, key) => obj?.[key], errors);

  return (
    <div className={styles.fileContainer}>
      <label htmlFor={name} className={styles.label}>
        {label}
      </label>

      <input
        id={name}
        type="file"
        accept=".jpeg,.png"
        {...register(name)}
        className={error ? styles.inputError : styles.input}
      />

      <ErrorMessage name={name} />

      {error && (
        <button
          type="button"
          onClick={() => setValue(name, null)}
          className={styles.clearBtn}
        >
          Usuń błędny plik
        </button>
      )}
    </div>
  );
};
