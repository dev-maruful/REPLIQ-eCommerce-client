import React from "react";
import SectionHeader from "../components/SectionHeader";
import { useLocation } from "react-router-dom";
import PrimaryButton from "../components/PrimaryButton";

const AllProducts = () => {
  const location = useLocation();
  const products = location?.state;
  console.log(products);

  return (
    <div>
      <SectionHeader
        title={`Total Products: ${products.length}`}
      ></SectionHeader>
      <div className="overflow-x-auto max-w-5xl mx-auto">
        <table className="table">
          {/* head */}
          <thead>
            <tr>
              <th></th>
              <th>Name</th>
              <th>Price</th>
              <th>Quantity</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {products.map((product, index) => (
              <tr key={product._id}>
                <th>{index + 1}</th>
                <td>{product.name}</td>
                <td>${product.price}</td>
                <td>{product.quantity} pcs</td>
                <td>
                  <PrimaryButton name="See details"></PrimaryButton>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AllProducts;
