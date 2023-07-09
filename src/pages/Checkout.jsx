import React from "react";
import SectionHeader from "../components/SectionHeader";
import { useLocation } from "react-router-dom";

const Checkout = () => {
  const location = useLocation();
  const total = location.state;

  return (
    <>
      <SectionHeader title="Checkout"></SectionHeader>
      <p className="text-center font-medium mb-5">Please Pay: ${total}</p>
      <form className="max-w-sm mx-auto">
        <div className="mb-4">
          <label htmlFor="cardNumber" className="block mb-1 font-bold">
            Card Number
          </label>
          <input
            type="text"
            id="cardNumber"
            placeholder="1234 5678 9012 3456"
            required
            className="w-full p-2 border border-gray-300 rounded"
          />
        </div>

        <div className="mb-4">
          <label htmlFor="cardName" className="block mb-1 font-bold">
            Cardholder Name
          </label>
          <input
            type="text"
            id="cardName"
            placeholder="John Doe"
            required
            className="w-full p-2 border border-gray-300 rounded"
          />
        </div>

        <div className="mb-4">
          <label htmlFor="expiry" className="block mb-1 font-bold">
            Expiry
          </label>
          <input
            type="text"
            id="expiry"
            placeholder="MM / YY"
            required
            className="w-full p-2 border border-gray-300 rounded"
          />
        </div>

        <div className="mb-4">
          <label htmlFor="cvc" className="block mb-1 font-bold">
            CVC
          </label>
          <input
            type="text"
            id="cvc"
            placeholder="123"
            required
            className="w-full p-2 border border-gray-300 rounded"
          />
        </div>

        <button
          type="submit"
          className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded"
        >
          Pay Now
        </button>
      </form>
    </>
  );
};

export default Checkout;
