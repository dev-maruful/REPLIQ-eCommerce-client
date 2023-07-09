import React, { useEffect } from "react";
import PrimaryButton from "./PrimaryButton";
import Rating from "react-rating";
import { FaRegStar, FaStar } from "react-icons/fa";
import useAuth from "../hooks/useAuth";
import useAxios from "../hooks/useAxios";
import { toast } from "react-hot-toast";

const ProductCard = ({ name, photo, price, ratings }) => {
  const { user } = useAuth();
  const API = useAxios();

  // making cart data to send to server
  const cartProduct = { email: user?.email, name, photo, price, ratings };

  const handleAddToCart = () => {
    API.post("/cartProducts", cartProduct).then((res) => {
      if (res?.data?.insertedId) {
        toast.success("Product added to cart");
      } else if (res?.data?.message) {
        toast.error(res?.data?.message);
      }
    });
  };

  return (
    <div className="card card-compact w-full bg-base-100 shadow-xl py-5">
      <figure>
        <img className="w-3/4 h-60 rounded-lg" src={photo} alt="" />
      </figure>
      <div className="card-body">
        <h2 className="card-title">{name}</h2>
        <p className="text-base font-medium">Price: ${price}</p>
        <div className="flex items-center">
          <p className="text-base font-medium">Ratings: {ratings}</p>
          <span className="text-base text-yellow-500">
            <Rating
              fullSymbol={<FaStar></FaStar>}
              emptySymbol={<FaRegStar></FaRegStar>}
              initialRating={ratings}
              readonly
            />
          </span>
        </div>
        <div className="card-actions">
          <PrimaryButton
            name="Add to cart"
            event={handleAddToCart}
          ></PrimaryButton>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
