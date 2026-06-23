const AdminButton = ({
  text,
  onClick,
  type = "button",
  variant = "primary",
  disabled = false,
}) => {
  const styles = {
    primary:
      "bg-primaryPink text-white hover:bg-pink-600",

    secondary:
      "bg-white border border-primaryPink text-primaryPink hover:bg-softPink",

    success:
      "bg-gold text-darkText hover:brightness-95",

    danger:
      "bg-danger text-white hover:bg-red-900",

    warning:
      "bg-softPink text-primaryPink hover:opacity-90",
  };

  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      className={`
        px-6 py-3
        rounded-full
        font-body
        font-semibold
        text-sm md:text-base
        shadow-sm
        transition-all duration-300
        hover:scale-[1.02]
        focus:outline-none
        focus:ring-2
        focus:ring-primaryPink/40
        ${styles[variant]}
        ${disabled ? "opacity-50 cursor-not-allowed hover:scale-100" : ""}
      `}
    >
      {text}
    </button>
  );
};

export default AdminButton;