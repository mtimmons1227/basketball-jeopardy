import React from "react";

const Button = ({ children, onClick, className = "", ...props }) => {
  return (
    <button
      onClick={onClick}
      className={`p-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition ${className}`}
      {...props}
    >
      {children}
    </button>
  );
};

export default Button;  // 🔹 Default Export
