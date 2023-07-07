import React from "react";

const SummaryItem = ({ icon, name, quantity }) => {
  return (
    <div className="h-40 w-40 flex flex-col gap-1 items-center justify-center border-2 border-blue-500 rounded-lg">
      <div className="text-5xl">{icon}</div>
      <h3 className="uppercase font-medium text-blue-500">{name}</h3>
      <h3 className="text-4xl">{quantity}</h3>
    </div>
  );
};

export default SummaryItem;
