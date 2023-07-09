import React from "react";
import SectionHeader from "../components/SectionHeader";
import { Link, useLocation } from "react-router-dom";
import PrimaryButton from "../components/PrimaryButton";

const AllCustomers = () => {
  const location = useLocation();
  const customers = location?.state;

  return (
    <>
      <SectionHeader
        title={`Total customers: ${customers?.length}`}
      ></SectionHeader>
      <div className="text-end mb-5">
        <PrimaryButton name="add new customer"></PrimaryButton>
      </div>
      <div className="overflow-x-auto max-w-3xl mx-auto">
        <table className="table">
          {/* head */}
          <thead>
            <tr>
              <th></th>
              <th>Name</th>
              <th>Email</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {customers.map((customer, index) => (
              <tr key={customer._id}>
                <th>{index + 1}</th>
                <td>{customer.name}</td>
                <td>{customer.email}</td>
                <td>
                  <Link
                    to={`/dashboard/allCustomers/customerDetails/${customer._id}`}
                  >
                    <PrimaryButton name="see details"></PrimaryButton>
                  </Link>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
};

export default AllCustomers;
