import React from "react";
import SectionHeader from "../components/SectionHeader";
import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import useAxios from "../hooks/useAxios";
import { toast } from "react-hot-toast";

const AddCustomer = () => {
  //   const { createUser, updateUserProfile } = useAuth();
  const navigate = useNavigate();
  const API = useAxios();

  // hosting url for image to imgbb
  const image_hosting_url = `https://api.imgbb.com/1/upload?key=${
    import.meta.env.VITE_Image_Upload_token
  }`;

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  const onSubmit = (data) => {
    // destructuring form data properties
    const { name, email, phone } = data;

    // get image from form data
    const formData = new FormData();
    formData.append("image", data.photo[0]);

    // storing image in image hosting website
    API.post(image_hosting_url, formData).then((data) => {
      if (data?.data?.success) {
        const photoUrl = data?.data?.data?.display_url;

        // gathering user's info to send it to the server
        const saveUser = {
          name,
          email,
          photo: photoUrl,
          phone,
        };

        // sending user's info to server
        API.post("/users", saveUser)
          .then((res) => {
            console.log(res.data);
            if (res?.data?.insertedId) {
              toast.success("User added successfully");
              navigate("/dashboard/allCustomers");
            }
          })
          .catch((err) => console.log(err));
      }
    });
  };

  return (
    <div>
      <SectionHeader title="Add a customer"></SectionHeader>
      <>
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
              <p className="text-red-500 text-xs mt-1">
                {errors.email.message}
              </p>
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
              <p className="text-red-500 text-xs mt-1">
                {errors.phone.message}
              </p>
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
              <p className="text-red-500 text-xs mt-1">
                {errors.photo.message}
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
    </div>
  );
};

export default AddCustomer;
