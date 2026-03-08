import { useFormContext } from "react-hook-form";
import { ErrorMessage } from "../ErrorMessage/ErrorMessage";
import styles from "./Input.module.css";

export const Input = ({
  name,
  label,
  type = "text",
  placeholder,
  labelSrOnly = false,
  ...props
}) => {
  const {
    register,
    formState: { errors },
  } = useFormContext();

  const hasError = name.split(".").reduce((obj, key) => obj?.[key], errors);

  return (
    <div className={styles.inputWrapper}>
      {label && (
        <label
          htmlFor={name}
          className={`${styles.label} ${labelSrOnly ? "sr-only" : ""}`}
        >
          {label}
        </label>
      )}

      <input
        id={name}
        type={type}
        placeholder={placeholder}
        {...register(name)}
        {...props}
        className={`${styles.inputField} ${hasError ? styles.inputError : ""}`}
      />

      <ErrorMessage name={name} />
    </div>
  );
};
