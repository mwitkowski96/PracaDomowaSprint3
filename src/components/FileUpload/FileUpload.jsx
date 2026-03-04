import { useFormContext } from "react-hook-form";

export const FileUpload = ({ name, label }) => {
  const {
    register,
    formState: { errors },
  } = useFormContext();

  const error = name.split(".").reduce((obj, key) => obj?.[key], errors);

  return (
    <div className="file-upload-group">
      <label htmlFor={name}>{label}</label>
      <input id={name} type="file" {...register(name)}></input>
      {error && <span className="error">{error.message}</span>}
    </div>
  );
};
