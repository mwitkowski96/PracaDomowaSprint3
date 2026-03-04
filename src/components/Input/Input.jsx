import { useFormContext } from "react-hook-form";

export const Input = ({ name, label, registerOptions, ...props }) => {
  const {
    register,
    formState: { errors },
  } = useFormContext();
  const error = name.split(".").reduce((obj, key) => obj?.[key], errors);

  return (
    <div className="input-container">
      {label && <label>{label}</label>}
      <input {...register(name, registerOptions)} {...props} />
      {error && <span className="error">{error.message}</span>}
    </div>
  );
};
