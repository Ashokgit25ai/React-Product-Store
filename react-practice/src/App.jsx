import React, { useState, useEffect } from "react";
import "./App.css";
import axios from "axios";
import Loader from "./Loading/Loader";

const App = () => {
  const [products, setProducts] = useState([]);
  const [loading,setLoading] = useState(true);
  const [error,setError] = useState(null);

  useEffect(() => {
    // fetch("https://fakestoreapi.com/products")
    //   .then((res) => res.json())
    //   .then((data) => setProducts(data))
    //   .catch((err)=>console.log("Error"));

    axios
      .get("https://fakestoreapi.com/products")
      .then((res) => {
        setProducts(res.data);
        setLoading(false);
      })
      .catch((err) => {
        setLoading(false)
        setError("Please Try After Sometime!")
      });
  }, []);

  return (
    <div className="products-container">
      <h2 className="title">Products List </h2>
      <div>
        <div className="products-grid">
          {products.map((product) => (
            <div className="product-card" key={product.id}>
              <img className="product-image" src={product.image} alt="" />
              <h3 className="product-title">{product.title}</h3>
              <p className="product-price">{product.price}</p>
              <p className="product-rating">
                ⭐ {product.rating.rate} - {product.rating.count}
              </p>
            </div>
          ))}
        </div>
        <div>
          {
            loading && <Loader/>
          }
        </div>
        <div>
          {
            error && <h1>{error}</h1>
          }
        </div>
      </div>
    </div>
  );
};

export default App;
