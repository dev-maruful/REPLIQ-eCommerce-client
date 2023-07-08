import React from "react";
import AddProductForm from "../components/AddProductForm";

const AddProduct = () => {
  return (
    <div>
      <h3 className="text-center mb-10 text-xl font-semibold">
        Please add a product
      </h3>
      <AddProductForm></AddProductForm>
    </div>
  );
};

export default AddProduct;
