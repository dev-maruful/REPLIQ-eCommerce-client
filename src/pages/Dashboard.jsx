import React, { useEffect, useState } from "react";
import useAxios from "../hooks/useAxios";
import useAuth from "../hooks/useAuth";
import SummaryItem from "../components/SummaryItem";
import { FaBoxOpen, FaPaperPlane, FaUsers } from "react-icons/fa";
import AdminButton from "../components/AdminButton";
import { Link } from "react-router-dom";

const Dashboard = () => {
  const API = useAxios();
  const { user } = useAuth();
  const [currentUser, setCurrentUser] = useState({});
  const [allUsers, setAllUsers] = useState([]);
  const [customers, setCustomers] = useState([]);

  // get user details from server
  useEffect(() => {
    // get current user details
    API(`/users/${user?.email}`)
      .then((data) => {
        setCurrentUser(data?.data);
      })
      .catch((err) => console.log(err));

    API("/users")
      .then((data) => {
        setAllUsers(data?.data);

        // filtering customers from all users
        const normalUsers = allUsers.filter((user) => user?.role !== "admin");
        setCustomers(normalUsers);
      })
      .catch((err) => {
        console.log(err);
      });
  }, [user]);

  console.log(customers);

  return (
    <div className="flex items-center justify-center">
      <div className="text-center">
        <h3 className="text-xl font-semibold mb-2">Overview</h3>
        <h4 className="font-medium">
          Welcome back,{" "}
          <span className="text-blue-500">{currentUser?.name}!</span>
        </h4>
        <div className="mt-10 flex items-center gap-20">
          <div className="flex gap-5">
            <SummaryItem
              icon={<FaUsers></FaUsers>}
              name="customers"
              quantity={customers?.length}
            ></SummaryItem>
            <SummaryItem
              icon={<FaBoxOpen></FaBoxOpen>}
              name="products"
              quantity={10}
            ></SummaryItem>
            <SummaryItem
              icon={<FaPaperPlane></FaPaperPlane>}
              name="orders"
              quantity={10}
            ></SummaryItem>
          </div>
          <div className="flex flex-col gap-3">
            <Link to="/dashboard/addProduct">
              <AdminButton name="add product"></AdminButton>
            </Link>
            <AdminButton name="all products"></AdminButton>
            <AdminButton name="orders"></AdminButton>
            <AdminButton name="add customer"></AdminButton>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
