import { useFormContext } from "react-hook-form";
import { ErrorMessage } from "../ErrorMessage/ErrorMessage";
import styles from "./Input.module.css";

export const Input = ({
  name,
  label,
  type = "text",
  placeholder,
  ...props
}) => {
  const {
    register,
    formState: { errors },
  } = useFormContext();

  const hasError = name.split(".").reduce((obj, key) => obj?.[key], errors);

  return (
    <>
      {label && (
        <label htmlFor={name} className={styles.label}>
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
    </>
  );
};
