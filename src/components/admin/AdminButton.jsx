const AdminButton = ({
  text,
  onClick,
  type = "button",
  variant = "primary",
  disabled = false,
}) => {
  const styles = {
    primary: "bg-primaryPink text-white hover:opacity-90",

    secondary:
      "border border-primaryPink bg-white text-primaryPink hover:bg-softPink",

    success: "bg-gold text-darkText hover:brightness-95",

    danger: "bg-danger text-white hover:opacity-90",

    warning: "bg-softPink text-primaryPink hover:opacity-90",
  };

  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      className={`
        rounded-full
        px-6 py-3
        font-body
        text-sm md:text-base
        font-semibold
        shadow-sm
        focus:outline-none
        focus:ring-2
        focus:ring-primaryPink/40
        ${styles[variant] || styles.primary}
        ${
          disabled
            ? "cursor-not-allowed opacity-50"
            : "cursor-pointer transition-all duration-300 hover:scale-[1.02]"
        }
      `}
    >
      {text}
    </button>
  );
};

export default AdminButton;