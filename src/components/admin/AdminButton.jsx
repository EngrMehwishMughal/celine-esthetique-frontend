import React from "react";

const AdminButton = ({
  text,
  onClick,
  type = "button",
  variant = "primary",
  disabled = false,
}) => {
  const styles = {
    primary: "bg-indigo-600 hover:bg-indigo-700 text-white",
    secondary: "bg-gray-200 hover:bg-gray-300 text-gray-800",
    success: "bg-green-600 hover:bg-green-700 text-white",
    danger: "bg-red-600 hover:bg-red-700 text-white",
    warning: "bg-yellow-500 hover:bg-yellow-600 text-white",
  };

  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      className={`
        px-4 py-2
        rounded-lg
        font-medium
        transition-all duration-300
        shadow-sm
        ${styles[variant]}
        ${disabled ? "opacity-50 cursor-not-allowed" : ""}
      `}
    >
      {text}
    </button>
  );
};

export default AdminButton;