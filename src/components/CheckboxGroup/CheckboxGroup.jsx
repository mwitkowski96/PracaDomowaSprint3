import { useFormContext } from "react-hook-form";

export const CheckboxGroup = ({ name, label, options }) => {
  const {
    register,
    formState: { errors },
  } = useFormContext();
  const error = name.split(".").reduce((obj, key) => obj?.[key], errors);

  return (
    <div className="checkbox-group-container">
      <h3>{label}</h3>
      <div className="tiles-container">
        {options.map((option) => (
          <label key={option} className="tile-item">
            <input
              type="checkbox"
              value={option}
              {...register(name)}
              className="sr-only"
            />
            <span className="tile-text">{option}</span>
          </label>
        ))}
      </div>
      {error && <span className="error">{error.message}</span>}
    </div>
  );
};
