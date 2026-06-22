import React from "react";

const EmptyState = ({
  title = "No Data Found",
  message = "There is nothing to display right now.",
}) => {
  return (
    <div className="flex min-h-[300px] items-center justify-center">
      <div className="text-center bg-white p-8 rounded-2xl shadow-md max-w-md w-full">
        
        {/* Icon */}
        <div className="text-5xl mb-4">📂</div>

        {/* Title */}
        <h2 className="text-xl font-semibold text-gray-800">
          {title}
        </h2>

        {/* Message */}
        <p className="text-gray-500 mt-2 text-sm">
          {message}
        </p>
      </div>
    </div>
  );
};

export default EmptyState;