import React, { useEffect, useState } from "react";
import { Link, NavLink } from "react-router-dom";
import useAuth from "../hooks/useAuth";
import { toast } from "react-hot-toast";
import useAxios from "../hooks/useAxios";

const Navbar = () => {
  const { user, logout } = useAuth();
  const API = useAxios();
  const [currentUser, setCurrentUser] = useState({});

  // toggle the navbar for responsive display
  const [isOpen, setIsOpen] = useState(false);

  // getting current user data from server
  useEffect(() => {
    API(`/users/${user?.email}`).then((data) => {
      setCurrentUser(data.data);
    });
  }, [user]);

  // user logout functionality
  const handleLogout = () => {
    logout()
      .then(() => {
        toast.success("User logged out");
      })
      .catch((err) => {
        toast.error(err.code);
      });
  };

  //   navbar menu items
  const navItems = (
    <>
      <NavLink
        to="/"
        className={({ isActive }) =>
          isActive
            ? "text-white font-bold px-3 py-2 rounded-md text-sm"
            : "text-gray-300 hover:text-white px-3 py-2 rounded-md text-sm font-medium"
        }
      >
        Home
      </NavLink>

      {/* making dynamic route based on user's role */}
      {user && currentUser?.role === "admin" ? (
        <NavLink
          to="/dashboard"
          className={({ isActive }) =>
            isActive
              ? "text-white font-bold px-3 py-2 rounded-md text-sm"
              : "text-gray-300 hover:text-white px-3 py-2 rounded-md text-sm font-medium"
          }
        >
          Dashboard
        </NavLink>
      ) : (
        user && (
          <NavLink
            to="/cart"
            className={({ isActive }) =>
              isActive
                ? "text-white font-bold px-3 py-2 rounded-md text-sm"
                : "text-gray-300 hover:text-white px-3 py-2 rounded-md text-sm font-medium"
            }
          >
            Cart
          </NavLink>
        )
      )}
      {user && currentUser?.role !== "admin" && (
        <NavLink
          to="/checkout"
          className={({ isActive }) =>
            isActive
              ? "text-white font-bold px-3 py-2 rounded-md text-sm"
              : "text-gray-300 hover:text-white px-3 py-2 rounded-md text-sm font-medium"
          }
        >
          Checkout
        </NavLink>
      )}
      {user ? (
        <NavLink
          onClick={handleLogout}
          to="/login"
          className={({ isActive }) =>
            isActive
              ? "text-white font-bold px-3 py-2 rounded-md text-sm"
              : "text-gray-300 hover:text-white px-3 py-2 rounded-md text-sm font-medium"
          }
        >
          Logout
        </NavLink>
      ) : (
        <NavLink
          to="/login"
          className={({ isActive }) =>
            isActive
              ? "text-white font-bold px-3 py-2 rounded-md text-sm"
              : "text-gray-300 hover:text-white px-3 py-2 rounded-md text-sm font-medium"
          }
        >
          Login
        </NavLink>
      )}
    </>
  );

  return (
    <nav className="bg-gray-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center">
            <div className="flex-shrink-0">
              <Link to="/">
                <span className="text-white text-xl uppercase font-semibold tracking-wider">
                  Replica
                </span>
              </Link>
            </div>
          </div>
          <div className="hidden md:block">
            <div className="ml-4 flex items-center">
              <ul className="flex space-x-4">{navItems}</ul>
            </div>
          </div>
          <div className="md:hidden">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-white hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-800 focus:ring-white"
              aria-expanded={isOpen}
            >
              <span className="sr-only">Open main menu</span>
              {!isOpen ? (
                <svg
                  className="block h-6 w-6"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  aria-hidden="true"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M4 6h16M4 12h16M4 18h16"
                  />
                </svg>
              ) : (
                <svg
                  className="block h-6 w-6"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  aria-hidden="true"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              )}
            </button>
          </div>
        </div>
      </div>
      {isOpen && (
        <div className="md:hidden">
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
            <ul className="flex flex-col">{navItems}</ul>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
