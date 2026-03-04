import { useFormContext } from "react-hook-form";

export const Checkbox = ({ name, label }) => {
  const {
    register,
    formState: { errors },
  } = useFormContext();

  const error = name.split(".").reduce((obj, key) => obj?.[key], errors);

  return (
    <div className="checkbox-group">
      <label htmlFor={name}>
        <input id={name} type="checkbox" {...register(name)} />
        {label}
      </label>
      {error && <span className="error">{error.message}</span>}
    </div>
  );
};
