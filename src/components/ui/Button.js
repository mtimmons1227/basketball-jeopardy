import React from "react";

const Button = ({ children, className, onClick }) => {
  return (
    <button
      className={`px-4 py-2 rounded-md font-semibold text-white ${className}`}
      onClick={onClick}
    >
      {children}
    </button>
  );
};

export default Button; 
