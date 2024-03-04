import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link, useLocation } from "react-router-dom";
import "./ProductDetails.css";

const ProductDetails = ({ onClose }) => {
  const location = useLocation();
  const [quantity, setQuantity] = useState(1);
  const [review, setReview] = useState("");
  const [product, setProduct] = useState(null);

  const cartId = Number(sessionStorage.getItem("cartId"));

  useEffect(() => {
    const fetchProductDetails = async () => {
      try {
        const productId = location.pathname.split("/").pop();
        const response = await axios.get(
          `http://localhost:8080/api/products/${productId}`
        );
        setProduct(response.data);
      } catch (error) {
        console.error("Error fetching product details:", error);
      }
    };

    fetchProductDetails();
  }, [location.pathname]);

  const handleAddToCart = async (product) => {
    try {
      await axios.post(`http://localhost:8080/api/carts/${cartId}/addToCart`, {
        productId: product.id,
        quantity: 1,
        imageUrl: product.imageUrl,
      });
      alert("Product added to cart successfully:", product);
    } catch (error) {
      console.error("Error adding product to cart:", error);
    }
  };

  if (!product) {
    return <div>Loading...</div>;
  }

  return (
    <div className="product-details-container">
      <div
        className="product-details"
        style={{
          background: "#fff",
          boxShadow: "0 0 10px rgba(0, 0, 0, 0.1)",
          padding: "20px",
          borderRadius: "10px",
          fontFamily: "Arial, sans-serif",
          color: "#333",
          
        }}
      >
        <Link to={"/"}>
          <div
            className="close-btn"
            onClick={onClose}
            style={{
              cursor: "pointer",
              fontSize: "18px",
              marginBottom: "10px",
              color: "#333",
            }}
          >
            &#10006; Close
          </div>
        </Link>
        <div className="details-container" style={{ display: "flex",marginBottom:'100px' }}>
          <div
            className="product-image"
            style={{ flex: "1", marginRight: "20px" }}
          >
            <img
              src={product.imageUrl}
              alt={product.name}
              style={{
                width: "50%",
                height: "100%",
                borderRadius: "8px",
                boxShadow: "0 0 5px rgba(0, 0, 0, 0.1)",
              }}
            />
          </div>
          <div className="product-info" style={{ flex: "1", color: "#333" }}>
            <h2
              style={{
                fontSize: "24px",
                fontWeight: "bold",
                marginBottom: "10px",
              }}
            >
              {product.name}
            </h2>
            <p
              className="price"
              style={{
                fontSize: "18px",
                fontWeight: "bold",
                marginBottom: "10px",
              }}
            >
              MRP: {product.price}
            </p>
            <p
              className="description"
              style={{ fontSize: "16px", marginBottom: "20px" }}
            >
              {product.description}
            </p>
           
            <div
              className="add-to-cart"
              style={{ color: "#333", position: "relative" }}
            >
              <div
                className="quantity-input"
                style={{ marginBottom: "10px", color: "#333" }}
              >
                <label style={{ fontSize: "16px", marginRight: "10px" }}>
                  Quantity:
                </label>
                <input
                  type="number"
                  value={quantity}
                  onChange={(e) =>
                    setQuantity(Math.max(1, parseInt(e.target.value)))
                  }
                  style={{ fontSize: "16px", padding: "8px", width: "50px" }}
                />
              </div>
              <button
                className="btn btn-primary add-to-cart-btn"
                onClick={() => handleAddToCart(product)}
                style={{
                  fontSize: "16px",
                  marginRight: "10px",
                  width: "100%",
                  background: "#ff69b4",
                  backgroundImage:
                    "linear-gradient(to right, #ff69b4, #ffc0cb)" ,
                  transition:
                    "background 0.3s" ,
                }}
                onMouseOver={(e) =>
                  (e.currentTarget.style.background = "#ffd6e1")
                } 
                onMouseOut={(e) =>
                  (e.currentTarget.style.background =
                    "linear-gradient(to right, #ff69b4, #ffc0cb)")
                }
              >
                Add to Cart
              </button>

    
              <div
                className="review-section"
                style={{
                  display: "block",
                  position: "absolute",
                  top: "100%",
                  left: 0,
                  width: "100%",
                  background: "#fff",
                  padding: "10px",
                  borderRadius: "8px",
                  boxShadow: "0 0 5px rgba(0, 0, 0, 0.1)",
                  marginTop: "10px",
                }}
              >
                <textarea
                  rows="4"
                  placeholder="Write your review here..."
                  value={review}
                  onChange={(e) => setReview(e.target.value)}
                  style={{
                    fontSize: "16px",
                    padding: "10px",
                    width: "100%",
                    marginBottom: "10px",
                    height: "80px",
                  }}
                ></textarea>
                <button
                  className="btn btn-pink submit-review-btn"
                  onClick={() => console.log("Review submitted:", review)}
                  style={{ fontSize: "16px", width: "100%" }}
                >
                  Submit Review
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetails;
