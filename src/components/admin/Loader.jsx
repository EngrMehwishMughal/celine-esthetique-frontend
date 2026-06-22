import React from "react";

const Loader = ({ text = "Loading..." }) => {
  return (
    <div className="flex min-h-[300px] items-center justify-center">
      <div className="text-center">
        <div className="mx-auto h-12 w-12 animate-spin rounded-full border-4 border-gray-200 border-t-indigo-600"></div>

        <p className="mt-4 text-sm font-medium text-gray-500">
          {text}
        </p>
      </div>
    </div>
  );
};

export default Loader;