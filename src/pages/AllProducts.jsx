import React from "react";
import SectionHeader from "../components/SectionHeader";
import { Link, useLocation } from "react-router-dom";
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
      <div className="overflow-x-auto max-w-5xl mx-auto px-5 lg:px-0">
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
                  <Link to={`/productDetails/${product._id}`}>
                    <PrimaryButton name="See details"></PrimaryButton>
                  </Link>
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
