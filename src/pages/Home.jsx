import React, { useEffect, useState } from "react";
import useAxios from "../hooks/useAxios";
import ProductCard from "../components/ProductCard";

const Home = () => {
  const API = useAxios();
  const [products, setProducts] = useState([]);

  useEffect(() => {
    // get all products
    API("/products")
      .then((data) => {
        setProducts(data.data);
      })
      .catch((err) => console.log(err));
  }, []);

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10 max-w-7xl mx-auto px-5 lg:px-0">
      {products.map((product) => (
        <ProductCard
          key={product._id}
          name={product.name}
          photo={product.photo}
          price={product.price}
          ratings={product.ratings}
        ></ProductCard>
      ))}
    </div>
  );
};

export default Home;
