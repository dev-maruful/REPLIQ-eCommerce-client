import React, { useEffect, useState } from "react";
import SectionHeader from "../components/SectionHeader";
import useAxios from "../hooks/useAxios";
import { useParams } from "react-router-dom";
import PrimaryButton from "../components/PrimaryButton";
import Rating from "react-rating";
import { FaRegStar, FaStar } from "react-icons/fa";

const ProductDetails = () => {
  const { id } = useParams();
  const API = useAxios();
  const [currentProduct, setCurrentProduct] = useState({});

  useEffect(() => {
    API(`/products/${id}`)
      .then((data) => {
        setCurrentProduct(data?.data);
      })
      .catch((err) => console.error(err));
  }, []);

  const { name, photo, price, quantity, ratings, description } = currentProduct;

  return (
    <div className="px-5 lg:px-0">
      <SectionHeader title={`Product Details`}></SectionHeader>
      <div className="card max-w-6xl mx-auto lg:card-side bg-base-100 shadow-xl mt-5">
        <figure className="lg:w-2/5 lg:px-5">
          <img className="rounded-xl" src={photo} alt="" />
        </figure>
        <div className="card-body lg:w-3/5">
          <h2 className="card-title">{name}</h2>
          <p>
            <span className="font-medium">Description:</span> <br />
            {description}
          </p>
          <p>
            <span className="font-medium">Price:</span> ${price}
          </p>
          <p>
            <span className="font-medium">quantity:</span> {quantity} pcs
          </p>
          <p>
            <span className="font-medium">Ratings:</span> {ratings}
          </p>
          <span className="text-base text-yellow-500">
            <Rating
              fullSymbol={<FaStar></FaStar>}
              emptySymbol={<FaRegStar></FaRegStar>}
              initialRating={ratings}
              readonly
            />
          </span>
          <div className="card-actions">
            <PrimaryButton name="Add to cart"></PrimaryButton>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetails;
