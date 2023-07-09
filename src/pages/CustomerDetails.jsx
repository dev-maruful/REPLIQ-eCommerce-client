import React, { useEffect, useState } from "react";
import useAxios from "../hooks/useAxios";
import { useParams } from "react-router-dom";

const CustomerDetails = () => {
  const { id } = useParams();
  const API = useAxios();
  const [customer, setCustomer] = useState({});

  //   get specific customer details
  useEffect(() => {
    API(`/usersId/${id}`)
      .then((res) => {
        console.log(res.data);
        setCustomer(res.data);
      })
      .catch((err) => console.log(err));
  }, []);

  const { name, photo, email, phone } = customer;

  return (
    <div className="flex items-center justify-center">
      <div className="card w-96 bg-base-100 shadow-xl">
        <figure className="px-10 pt-10">
          <img src={photo} alt="" className="rounded-xl w-52 h-52" />
        </figure>
        <div className="card-body items-center text-center">
          <h2 className="card-title">{name}</h2>
          <p className="font-medium">Email: {email}</p>
          {phone && <p className="font-medium">Phone: {phone}</p>}
        </div>
      </div>
    </div>
  );
};

export default CustomerDetails;
