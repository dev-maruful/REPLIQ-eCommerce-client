import React from "react";
import useAuth from "../hooks/useAuth";

const PrimaryButton = ({ name, event, width }) => {
  const { user } = useAuth();

  return (
    <button
      disabled={!user}
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
