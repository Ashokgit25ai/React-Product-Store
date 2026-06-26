import React, { useState, useEffect } from "react";
import "./App.css";
import axios from "axios";
import Loader from "./Loading/Loader";

const App = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [visibleCount, setVisibleCount] = useState(10);
  const [error, setError] = useState("");

  const fetchProducts = async () => {
    setLoading(true);
    setError("");
    setProducts([]);

    try {
      const res = await axios.get("https://fakestoreapi.com/products");
      setProducts(res.data);
    } catch (err) {
      setError("Failed to load products. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  const visibleProducts = products.slice(0, visibleCount);

  const showMore = () => {
    setVisibleCount((prev) => prev + 10);
  };

  return (
    <div className="products-container">
      <h2 className="title">API STORE</h2>
      <div>{error && <div>
         <h2 className="error">{error}</h2>
         <button onClick={fetchProducts} className="retry-btn">Retry</button>
        </div>
        
      }  
      </div>
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
        {visibleCount < products.length && (
          <button onClick={showMore} className="show-more-btn">
            Show More
          </button>
        )}
        <div>{loading && <Loader />}</div>
      </div>
    </div>
  );
};

export default App;
