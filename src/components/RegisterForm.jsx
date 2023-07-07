import React from "react";
import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import useAxios from "../hooks/useAxios";
import { toast } from "react-hot-toast";
import useAuth from "../hooks/useAuth";

const RegisterForm = () => {
  const { createUser, updateUserProfile } = useAuth();
  const navigate = useNavigate();
  const API = useAxios();

  // using react-hook-form's features to get data from the form
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  //   getting data from the form
  const onSubmit = (data) => {
    createUser(data?.email, data?.password).then(() => {
      updateUserProfile(data?.name, data?.photoUrl)
        .then(() => {
          // gathering user's info to send it to the server
          const saveUser = {
            name: data?.name,
            email: data?.email,
            photo: data?.photoUrl,
            phone: data?.phone,
          };

          // sending data to the server
          API.post("/users", saveUser)
            .then((data) => {
              data?.data?.insertedId &&
                toast.success("User successfully registered");
              navigate("/");
            })
            .catch((err) => {
              console.log(err);
              toast.error(err.code);
            });
        })
        .catch((error) => {
          console.log(error);
          toast.error(error.code);
        });
    });
  };

  return (
    <>
      <h3 className="text-center mb-5 text-lg font-semibold">Register Here</h3>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="max-w-sm mx-2 md:mx-auto mb-3"
      >
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
            htmlFor="email"
            className="block text-gray-700 text-sm font-bold mb-2"
          >
            Email
          </label>
          <input
            type="email"
            id="email"
            {...register("email", {
              required: "Email is required",
              pattern: {
                value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                message: "Invalid email address",
              },
            })}
            className={`border border-gray-300 rounded-md p-2 w-full ${
              errors.email ? "border-red-500" : ""
            }`}
          />
          {errors.email && (
            <p className="text-red-500 text-xs mt-1">{errors.email.message}</p>
          )}
        </div>
        <div className="mb-4">
          <label
            htmlFor="phone"
            className="block text-gray-700 text-sm font-bold mb-2"
          >
            Phone
          </label>
          <input
            type="text"
            id="phone"
            {...register("phone", {
              required: "Phone is required",
              pattern: {
                value: /^\d{11}$/,
                message: "Only 11 digits acceptable",
              },
            })}
            className={`border border-gray-300 rounded-md p-2 w-full ${
              errors.phone ? "border-red-500" : ""
            }`}
          />
          {errors.phone && (
            <p className="text-red-500 text-xs mt-1">{errors.phone.message}</p>
          )}
        </div>
        <div className="mb-4">
          <label
            htmlFor="password"
            className="block text-gray-700 text-sm font-bold mb-2"
          >
            Password
          </label>
          <input
            type="password"
            id="password"
            {...register("password", {
              required: "Password is required",
              minLength: {
                value: 6,
                message: "Password should be at least 6 characters long",
              },
            })}
            className={`border border-gray-300 rounded-md p-2 w-full ${
              errors.password ? "border-red-500" : ""
            }`}
          />
          {errors.password && (
            <p className="text-red-500 text-xs mt-1">
              {errors.password.message}
            </p>
          )}
        </div>
        <div className="mb-4">
          <label
            htmlFor="photoUrl"
            className="block text-gray-700 text-sm font-bold mb-2"
          >
            Photo URL
          </label>
          <input
            type="text"
            id="photoUrl"
            {...register("photoUrl", { required: "Photo URL is required" })}
            className={`border border-gray-300 rounded-md p-2 w-full ${
              errors.photoUrl ? "border-red-500" : ""
            }`}
          />
          {errors.photoUrl && (
            <p className="text-red-500 text-xs mt-1">
              {errors.photoUrl.message}
            </p>
          )}
        </div>
        <div className="text-center">
          <button
            type="submit"
            className="bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-4 rounded-md w-full"
          >
            Register
          </button>
        </div>
      </form>
      <p className="text-center text-sm">
        Already have an account?{" "}
        <Link to="/login">
          <span className="underline">Login</span>
        </Link>
      </p>
    </>
  );
};

export default RegisterForm;
