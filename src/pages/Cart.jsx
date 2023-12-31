import React, { useEffect, useState } from "react";
import SectionHeader from "../components/SectionHeader";
import useAxios from "../hooks/useAxios";
import useAuth from "../hooks/useAuth";
import { toast } from "react-hot-toast";
import PrimaryButton from "../components/PrimaryButton";
import { Link } from "react-router-dom";

const Cart = () => {
  const API = useAxios();
  const { user } = useAuth();
  const [cartProducts, setCartProducts] = useState([]);

  //   getting products added by current user
  useEffect(() => {
    API(`/cartProducts/${user?.email}`)
      .then((res) => {
        setCartProducts(res?.data);
      })
      .catch((err) => console.error(err));
  }, [user]);

  //   delete product from cart
  const handleDelete = (id) => {
    API.delete(`/cartProducts/${id}`)
      .then((res) => {
        if (res.data.deletedCount) {
          toast.success("Product deleted successfully");
          const existingProducts = cartProducts.filter(
            (product) => product._id !== id
          );
          setCartProducts(existingProducts);
        }
      })
      .catch((err) => console.error(err));
  };

  //   calculating total price of cart products
  const total = cartProducts.reduce((sum, item) => item.price + sum, 0);

  return (
    <>
      <SectionHeader title="My Cart"></SectionHeader>
      <div className="flex items-center gap-5 justify-end mb-5">
        <p className="text-lg font-semibold">Total: ${total}</p>
        <Link to="/cart/checkout" state={total}>
          <PrimaryButton name="Checkout"></PrimaryButton>
        </Link>
      </div>
      <div className="overflow-x-auto max-w-6xl mx-auto">
        <table className="table">
          {/* head */}
          <thead>
            <tr>
              <th></th>
              <th>Product Name</th>
              <th>Product Price</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {cartProducts.map((product, index) => (
              <tr key={product._id}>
                <th>{index + 1}</th>
                <td>{product.name}</td>
                <td>${product.price}</td>
                <td>
                  <button
                    onClick={() => handleDelete(product._id)}
                    className="px-5 py-2 border-2 border-red-500 uppercase font-medium hover:bg-red-500 cursor-pointer hover:text-white"
                  >
                    delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
};

export default Cart;
