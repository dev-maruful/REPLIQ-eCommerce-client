import React from "react";
import PrimaryButton from "./PrimaryButton";
import Rating from "react-rating";
import { FaRegStar, FaStar } from "react-icons/fa";

const ProductCard = ({ name, photo, price, ratings }) => {
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
          <PrimaryButton name="Add to cart"></PrimaryButton>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
