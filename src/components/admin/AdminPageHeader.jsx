import React from "react";
import AdminButton from "./AdminButton";

const AdminPageHeader = ({
  title,
  subtitle,
  buttonText,
  onButtonClick,
}) => {
  return (
    <div className="mb-8 flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
      
      {/* Left Side */}
      <div>
        <h1 className="font-heading text-3xl md:text-4xl font-semibold text-darkText">
          {title}
        </h1>

        {subtitle && (
          <p className="mt-2 font-body text-sm md:text-base text-greyText">
            {subtitle}
          </p>
        )}
      </div>

      {/* Right Side */}
      {buttonText && (
        <AdminButton
          text={buttonText}
          onClick={onButtonClick}
          variant="primary"
        />
      )}
    </div>
  );
};

export default AdminPageHeader;