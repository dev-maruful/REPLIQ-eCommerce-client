import React, { useEffect, useState } from "react";
import SectionHeader from "../components/SectionHeader";
import { Link } from "react-router-dom";
import PrimaryButton from "../components/PrimaryButton";
import useAxios from "../hooks/useAxios";

const AllProducts = () => {
  const [products, setProducts] = useState([]);
  const API = useAxios();

  useEffect(() => {
    API("/products")
      .then((res) => {
        setProducts(res.data);
      })
      .catch((err) => console.error(err));
  }, []);

  return (
    <>
      <SectionHeader
        title={`Total Products: ${products.length}`}
      ></SectionHeader>
      <div className="text-end mb-5">
        <Link to="/dashboard/allProducts/addProduct">
          <PrimaryButton name="add product"></PrimaryButton>
        </Link>
      </div>
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
                  <Link
                    to={`/dashboard/allProducts/productDetails/${product._id}`}
                  >
                    <PrimaryButton name="See details"></PrimaryButton>
                  </Link>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
};

export default AllProducts;
