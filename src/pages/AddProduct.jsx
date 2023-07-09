import React from "react";
import AddProductForm from "../components/AddProductForm";
import SectionHeader from "../components/SectionHeader";

const AddProduct = () => {
  return (
    <>
      <SectionHeader title="Please add a product"></SectionHeader>
      <AddProductForm></AddProductForm>
    </>
  );
};

export default AddProduct;
