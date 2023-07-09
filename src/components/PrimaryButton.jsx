import React from "react";

const PrimaryButton = ({ name, event, width }) => {
  return (
    <button
      onClick={event && event}
      className={`${
        width ? `w-44` : ""
      } px-5 py-2 border-2 border-blue-500 uppercase font-medium hover:bg-blue-500 cursor-pointer hover:text-white`}
    >
      {name}
    </button>
  );
};

export default PrimaryButton;
