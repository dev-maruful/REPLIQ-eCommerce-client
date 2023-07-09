import React, { useEffect, useState } from "react";
import useAxios from "../hooks/useAxios";
import useAuth from "../hooks/useAuth";
import SummaryItem from "../components/SummaryItem";
import { FaBoxOpen, FaPaperPlane, FaUsers } from "react-icons/fa";
import PrimaryButton from "../components/PrimaryButton";
import { Link } from "react-router-dom";
import SectionHeader from "../components/SectionHeader";

const Dashboard = () => {
  const API = useAxios();
  const { user } = useAuth();
  const [currentUser, setCurrentUser] = useState({});
  const [customers, setCustomers] = useState([]);
  const [products, setProducts] = useState([]);

  // get user details from server
  useEffect(() => {
    // get current user details
    API(`/users/${user?.email}`)
      .then((data) => {
        setCurrentUser(data?.data);
      })
      .catch((err) => console.log(err));

    // get all users data
    API("/users")
      .then((data) => {
        // filtering customers from all users
        const normalUsers = data?.data?.filter(
          (user) => user?.role !== "admin"
        );
        setCustomers(normalUsers);
      })
      .catch((err) => {
        console.log(err);
      });

    // get products data
    API("/products")
      .then((data) => {
        setProducts(data?.data);
      })
      .catch((err) => console.log(err));
  }, [user]);

  console.log(customers);

  return (
    <div className="flex items-center justify-center">
      <div className="text-center">
        <h4 className="font-medium mb-2">
          Welcome back,{" "}
          <span className="text-blue-500">{currentUser?.name}!</span>
        </h4>
        <SectionHeader title="Overview"></SectionHeader>
        <div className="mt-10 flex flex-col lg:flex-row items-center gap-20">
          <div className="flex flex-col md:flex-row gap-5">
            <SummaryItem
              icon={<FaUsers></FaUsers>}
              name="customers"
              quantity={customers?.length}
            ></SummaryItem>
            <SummaryItem
              icon={<FaBoxOpen></FaBoxOpen>}
              name="products"
              quantity={products.length}
            ></SummaryItem>
            <SummaryItem
              icon={<FaPaperPlane></FaPaperPlane>}
              name="orders"
              quantity={10}
            ></SummaryItem>
          </div>
          <div className="flex flex-col gap-3">
            <Link to="/dashboard/allProducts" state={products}>
              <PrimaryButton name="all products" width={44}></PrimaryButton>
            </Link>
            <Link to="/dashboard/allCustomers" state={customers}>
              <PrimaryButton name="All customers" width={44}></PrimaryButton>
            </Link>
            <Link to="/dashboard/allOrders">
              <PrimaryButton name="All orders" width={44}></PrimaryButton>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
