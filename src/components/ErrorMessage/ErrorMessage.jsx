import { useFormContext } from "react-hook-form";
import styles from "./ErrorMessage.module.css";

export const ErrorMessage = ({ name }) => {
  const {
    formState: { errors },
  } = useFormContext();

  const error = name.split(".").reduce((obj, key) => obj?.[key], errors);

  if (!error || !error.message) return null;

  return <span className={styles.error}>{error.message}</span>;
};
