import { useState } from "react";
import { useFormContext } from "react-hook-form";
import { ErrorMessage } from "../ErrorMessage/ErrorMessage";
import styles from "./FileUpload.module.css";

export const FileUpload = ({ name, label }) => {
  const { register, watch, setValue } = useFormContext();
  const [isDragging, setIsDragging] = useState(false);

  const fileList = watch(name);
  const selectedFile =
    fileList instanceof FileList && fileList.length > 0 ? fileList[0] : null;

  const { ref, ...rest } = register(name);

  const handleDragEnter = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(true);
  };

  const handleDragLeave = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);
  };

  const handleDragOver = (e) => {
    e.preventDefault();
    e.stopPropagation();
  };

  const handleDrop = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);
    if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
      setValue(name, e.dataTransfer.files, { shouldValidate: true });
    }
  };

  const handleRemoveFile = (e) => {
    e.preventDefault();
    setValue(name, null, { shouldValidate: true });
  };

  return (
    <div className={styles.fileUploadContainer}>
      <label
        htmlFor={name}
        className={`${styles.dropZone} ${
          isDragging ? styles.dropZoneDragging : ""
        }`}
        onDragEnter={handleDragEnter}
        onDragLeave={handleDragLeave}
        onDragOver={handleDragOver}
        onDrop={handleDrop}
      >
        <input
          id={name}
          type="file"
          className="sr-only"
          accept="image/jpeg, image/png"
          {...rest}
          ref={ref}
        />

        {selectedFile ? (
          <div className={styles.fileInfo}>
            <span className={styles.fileName}>{selectedFile.name}</span>
            <button
              type="button"
              onClick={handleRemoveFile}
              className={styles.removeButton}
              aria-label="Remove file"
            >
              &times;
            </button>
          </div>
        ) : (
          <>
            <span className={styles.icon}>📤</span>
            <span className={styles.promptText}>Przeciągnij i upuść plik</span>
            <span className={styles.subText}>
              lub kliknij, aby wybrać. {label}
            </span>
          </>
        )}
      </label>
      <ErrorMessage name={name} />
    </div>
  );
};
