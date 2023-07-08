import React from "react";
import { useForm } from "react-hook-form";

const AddProductForm = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = (data) => {
    console.log(data);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="max-w-sm mx-auto">
      <div className="mb-4">
        <label
          htmlFor="name"
          className="block text-gray-700 text-sm font-bold mb-2"
        >
          Name
        </label>
        <input
          type="text"
          id="name"
          {...register("name", { required: "Name is required" })}
          className={`border border-gray-300 rounded-md p-2 w-full ${
            errors.name ? "border-red-500" : ""
          }`}
        />
        {errors.name && (
          <p className="text-red-500 text-xs mt-1">{errors.name.message}</p>
        )}
      </div>
      <div className="mb-4">
        <label
          htmlFor="price"
          className="block text-gray-700 text-sm font-bold mb-2"
        >
          Price
        </label>
        <input
          type="text"
          id="price"
          {...register("price", {
            required: "Price is required",
            min: { value: 0, message: "Price must be a positive number" },
          })}
          className={`border border-gray-300 rounded-md p-2 w-full ${
            errors.price ? "border-red-500" : ""
          }`}
        />
        {errors.price && (
          <p className="text-red-500 text-xs mt-1">{errors.price.message}</p>
        )}
      </div>
      <div className="mb-4">
        <label
          htmlFor="photo"
          className="block text-gray-700 text-sm font-bold mb-2"
        >
          Photo
        </label>
        <input
          type="file"
          id="photo"
          {...register("photo", { required: "Photo is required" })}
          className={`border border-gray-300 rounded-md p-2 w-full ${
            errors.photo ? "border-red-500" : ""
          }`}
        />
        {errors.photo && (
          <p className="text-red-500 text-xs mt-1">{errors.photo.message}</p>
        )}
      </div>
      <div className="mb-4">
        <label
          htmlFor="quantity"
          className="block text-gray-700 text-sm font-bold mb-2"
        >
          Quantity
        </label>
        <input
          type="number"
          id="quantity"
          {...register("quantity", {
            required: "Quantity is required",
            min: { value: 0, message: "Quantity must be a positive number" },
          })}
          className={`border border-gray-300 rounded-md p-2 w-full ${
            errors.quantity ? "border-red-500" : ""
          }`}
        />
        {errors.quantity && (
          <p className="text-red-500 text-xs mt-1">{errors.quantity.message}</p>
        )}
      </div>
      <div className="mb-4">
        <label
          htmlFor="ratings"
          className="block text-gray-700 text-sm font-bold mb-2"
        >
          Ratings
        </label>
        <input
          type="text"
          id="ratings"
          {...register("ratings", {
            required: "Ratings is required",
            min: { value: 0, message: "Ratings must be a positive number" },
            max: {
              value: 5,
              message: "Ratings must be less than or equal to 5",
            },
          })}
          className={`border border-gray-300 rounded-md p-2 w-full ${
            errors.ratings ? "border-red-500" : ""
          }`}
        />
        {errors.ratings && (
          <p className="text-red-500 text-xs mt-1">{errors.ratings.message}</p>
        )}
      </div>
      <div className="text-center">
        <button
          type="submit"
          className="w-full bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-4 rounded-md"
        >
          Add Product
        </button>
      </div>
    </form>
  );
};

export default AddProductForm;
