import { useFormContext } from "react-hook-form";
import { ErrorMessage } from "../ErrorMessage/ErrorMessage";

import styles from "./Input.module.css";

export const Input = ({ name, label, registerOptions, ...props }) => {
  const { register } = useFormContext();

  return (
    <>
      {label && <label className={styles.srOnly}>{label}</label>}
      <input
        className={styles.input}
        {...register(name, registerOptions)}
        {...props}
      />
      <ErrorMessage name={name} />
    </>
  );
};
