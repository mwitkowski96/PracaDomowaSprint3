import { useFormContext } from "react-hook-form";

export const Select = ({ name, label, options }) => {
  const {
    register,
    formState: { errors },
  } = useFormContext();
  const error = name.split(".").reduce((obj, key) => obj?.[key], errors);

  return (
    <div className="select-group">
      {label && <label htmlFor={name}>{label}</label>}
      <select id={name} {...register(name)}>
        {options.map((option) => (
          <option key={option} value={option}>
            {option}
          </option>
        ))}
      </select>
      {error && <span className="error">{error.message}</span>}
    </div>
  );
};
