import { useFormContext } from "react-hook-form";
import { ErrorMessage } from "../ErrorMessage/ErrorMessage";
import styles from "./FileUpload.module.css";

export const FileUpload = ({ name, label }) => {
  const { register } = useFormContext(); //

  return (
    <div className={styles.fileUploadContainer}>
      <label htmlFor={name}>{label}</label>
      <input id={name} type="file" {...register(name)} />
      <ErrorMessage name={name} />
    </div>
  );
};
