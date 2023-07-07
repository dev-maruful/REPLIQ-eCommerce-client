import React, { useEffect, useState } from "react";
import useAxios from "../hooks/useAxios";
import useAuth from "../hooks/useAuth";
import SummaryItem from "../components/SummaryItem";
import { FaBoxOpen, FaPaperPlane, FaUsers } from "react-icons/fa";
import AdminButton from "../components/AdminButton";

const Dashboard = () => {
  const API = useAxios();
  const { user } = useAuth();
  const [currentUser, setCurrentUser] = useState({});

  // get user details from server
  useEffect(() => {
    API(`/users/${user?.email}`).then((data) => {
      setCurrentUser(data?.data);
    });
  }, [user]);

  return (
    <div className="flex items-center justify-center">
      <div className="text-center">
        <h3 className="text-xl font-semibold mb-2">Overview</h3>
        <h4 className="font-medium">
          Welcome back,{" "}
          <span className="text-blue-500">{currentUser?.name}!</span>
        </h4>
        <div className="mt-10 flex gap-20">
          <div className="flex gap-5">
            <SummaryItem
              icon={<FaUsers></FaUsers>}
              name="customers"
              quantity={10}
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
            <AdminButton name="add product"></AdminButton>
            <AdminButton name="all products"></AdminButton>
            <AdminButton name="orders"></AdminButton>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
