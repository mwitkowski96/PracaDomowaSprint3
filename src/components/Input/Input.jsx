import { useFormContext } from "react-hook-form";

import styles from "./Input.module.css";

export const Input = ({ name, label, registerOptions, ...props }) => {
  const {
    register,
    formState: { errors },
  } = useFormContext();
  const error = name.split(".").reduce((obj, key) => obj?.[key], errors);

  return (
    <>
      {label && <label className={styles.srOnly}>{label}</label>}
      <input
        className={styles.input}
        {...register(name, registerOptions)}
        {...props}
      />
      {error && <span className={styles.error}>{error.message}</span>}
    </>
  );
};
