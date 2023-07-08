import React from "react";

const PrimaryButton = ({ name }) => {
  return (
    <button className="w-40 py-2 border-2 border-blue-500 uppercase font-medium hover:bg-blue-500 cursor-pointer hover:text-white">
      {name}
    </button>
  );
};

export default PrimaryButton;
