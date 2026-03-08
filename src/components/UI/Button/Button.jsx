import styles from "./Button.module.css";

export const Button = ({
  children,
  variant = "primary",
  type = "button",
  className = "",
  ...props
}) => {
  const variantClass = styles[variant] || styles.primary;

  return (
    <button
      type={type}
      className={`${styles.button} ${variantClass} ${className}`}
      {...props}
    >
      {children}
    </button>
  );
};
