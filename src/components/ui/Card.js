import React from "react";

export function Card({ children }) {
  return (
    <div className="p-4 bg-white shadow-lg rounded-lg">
      {children}
    </div>
  );
}
