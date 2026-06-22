import React from "react";

const AdminPageHeader = ({
  title,
  subtitle,
  buttonText,
  onButtonClick,
}) => {
  return (
    <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-6">
      
      {/* Left Side */}
      <div>
        <h1 className="text-2xl md:text-3xl font-bold text-gray-800">
          {title}
        </h1>

        {subtitle && (
          <p className="text-sm text-gray-500 mt-1">
            {subtitle}
          </p>
        )}
      </div>

      {/* Right Side */}
      {buttonText && (
        <button
          onClick={onButtonClick}
          className="
            bg-indigo-600
            hover:bg-indigo-700
            text-white
            px-5
            py-2.5
            rounded-lg
            font-medium
            transition-all
            duration-300
            shadow-md
          "
        >
          {buttonText}
        </button>
      )}
    </div>
  );
};

export default AdminPageHeader;