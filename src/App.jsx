import React, { useState, useEffect } from "react";
import "./App.css";
import axios from "axios";
import Loader from "./Loading/Loader";

const App = () => {
  const [products, setProducts] = useState([]);
  const [loading,setLoading] = useState(null);
  const [visibleCount, setVisibleCount] = useState(10);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const res = await axios.get("https://fakestoreapi.com/products");
        setProducts(res.data);
      } catch (err) {
        setError("Failed to load page");
      }
    };
    fetchProducts();
  }, []);

  const visibleProducts = products.slice(0,visibleCount)

  const showMore = () =>{
    setVisibleCount((prev)=>prev+10);
  }

  return (
    <div className="products-container">
      <h2 className="title">Products List </h2>
      <div>{error && <h1>{error}</h1>}</div>
      <div>
        <div className="products-grid">
          {visibleProducts.map((product) => (
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
        {
          visibleCount < products.length && (
            <button onClick={showMore} className="show-more-btn">
              Show More
            </button>
          )
        }
        <div>{loading && <Loader />}</div>
        
      </div>
    </div>
  );
};

export default App;
