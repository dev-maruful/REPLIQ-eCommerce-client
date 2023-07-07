import React from "react";
import { useForm } from "react-hook-form";
import googleLogo from "../assets/icons/google_logo.png";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { toast } from "react-hot-toast";
import useAuth from "../hooks/useAuth";
import useAxios from "../hooks/useAxios";

const LoginForm = () => {
  const { login, loginWithGoogle } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const API = useAxios();

  // capturing the location path where user comes from
  const from = location.state?.from?.pathname || "/";

  // using react-hook-form's features to get data from the form
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  //   getting data from the form
  const onSubmit = (data) => {
    login(data?.email, data?.password)
      .then(() => {
        toast.success("User Login Successful");
        navigate(from, { replace: true });
      })
      .catch((err) => {
        toast.error(err.code);
      });
  };

  const handleGoogleLogin = () => {
    loginWithGoogle()
      .then((result) => {
        const saveUser = {
          name: result?.user?.displayName,
          email: result?.user?.email,
          photo: result?.user?.photoURL,
        };

        API.post("/users", saveUser)
          .then((data) => {
            if (data?.data?.insertedId || data?.data?.message) {
              toast.success("User logged in successfully");
              navigate(from, { replace: true });
            }
          })
          .catch((err) => {
            console.log(err);
          });
      })
      .catch((err) => {
        toast.error(err.code);
      });
  };

  return (
    <>
      <h3 className="text-center mb-5 text-lg font-semibold">Please Login</h3>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="max-w-sm mx-2 md:mx-auto mb-3"
      >
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
              pattern: { value: /^\d{11}$/, message: "Invalid phone number" },
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
        <div className="text-center">
          <button
            type="submit"
            className="bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-4 rounded-md w-full"
          >
            Login
          </button>
        </div>
      </form>
      <div
        onClick={handleGoogleLogin}
        className="flex items-center justify-center"
      >
        <button className="text-black font-semibold py-2 px-4 rounded-md w-full max-w-sm border-2 border-black hover:font-bold flex items-center justify-center gap-2 mb-5">
          <span>Login With</span>
          <img className="h-6 w-6 inline" src={googleLogo} alt="" />
        </button>
      </div>
      <p className="text-center text-sm">
        Don't have an account?{" "}
        <Link to="/register">
          <span className="underline">Register</span>
        </Link>
      </p>
    </>
  );
};

export default LoginForm;
