import React, { useEffect, useState } from "react";
import PrimaryButton from "./PrimaryButton";
import Rating from "react-rating";
import { FaRegStar, FaStar } from "react-icons/fa";
import useAuth from "../hooks/useAuth";
import useAxios from "../hooks/useAxios";
import { toast } from "react-hot-toast";
import { Link } from "react-router-dom";

const ProductCard = ({ name, photo, price, ratings, id }) => {
  const { user } = useAuth();
  const API = useAxios();
  const [currentUser, setCurrentUser] = useState({});

  // making cart data to send to server
  const cartProduct = { email: user?.email, name, photo, price, ratings };

  // product adding to cart
  const handleAddToCart = () => {
    API.post("/cartProducts", cartProduct).then((res) => {
      if (res?.data?.insertedId) {
        toast.success("Product added to cart");
      } else if (res?.data?.message) {
        toast.error(res?.data?.message);
      }
    });
  };

  // getting user information to verify if the user is admin or not
  useEffect(() => {
    API(`/users/${user?.email}`)
      .then((res) => {
        console.log(res.data);
        setCurrentUser(res.data);
      })
      .catch((err) => console.log(err));
  }, [user]);

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
          <Link to={`/dashboard/allProducts/productDetails/${id}`}>
            <PrimaryButton name="See details"></PrimaryButton>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
