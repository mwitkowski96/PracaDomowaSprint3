import { useFormContext } from "react-hook-form";

export const Radio = ({ name, label, options = [] }) => {
  const {
    register,
    formState: { errors },
  } = useFormContext();
  const error = name.split(".").reduce((obj, key) => obj?.[key], errors);

  return (
    <div className="radio-group">
      <span>{label}</span>
      {options.map((option) => (
        <label key={option.value}>
          <input type="radio" value={option.value} {...register(name)} />
          {option.label}
        </label>
      ))}
      {error && <span className="error">{error.message}</span>}
    </div>
  );
};
