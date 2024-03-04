import React, { useState, useEffect } from "react";
import axios from "axios";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHeart } from "@fortawesome/free-solid-svg-icons";
import Swal from "sweetalert2";
import Navigation from "../headernavigation/Navigation";
import DarkVariantExample from "./Carousels";
import { BrowserRouter as Router, Route, Routes, Link } from "react-router-dom";
import { FaStar, FaStarHalfAlt } from "react-icons/fa";
import ProductDetails from "./ProductDetails";



// #E80071

//#6f42c1;





const ProductCard = ({ product, addToCart }) => {
  const [quantity, setQuantity] = useState(1);
  const [isAddedToCart, setAddedToCart] = useState(false);
  const [isProductDetailsOpen, setProductDetailsOpen] = useState(false);

  const handleAddToCart = () => {
    addToCart({
      id: product.id,
      name: product.name,
      imageUrl: product.imageUrl,
      price: product.price,
      quantity: quantity,
    });
    setAddedToCart(true);
  };

  const openProductDetails = () => {
    setProductDetailsOpen(true);
  };

  const closeProductDetails = () => {
    setProductDetailsOpen(false);
  };

  return (
    <div
      className={`card ${isAddedToCart ? "hover:shadow-md" : ""}`}
      style={{
        borderRadius: "10px",
        border: "1px solid #ddd",
        overflow: "hidden",
      }}
    >
      <Link to={{ pathname: `/products/${product.id}`, state: { product } }}>
        <img
          src={product.imageUrl}
          className="card-img-top zoom"
          alt="Product"
          style={{
            maxHeight: "34vh",
            marginBottom: "0",
            width: "100%",
            transition: "transform 0.2s",
            cursor: "pointer",
            borderRadius: "10px 10px 0 0",
          }}
          onMouseOver={(e) => (e.currentTarget.style.transform = "scale(1.2)")}
          onMouseOut={(e) => (e.currentTarget.style.transform = "scale(1)")}
          onClick={openProductDetails}
        />
      </Link>
      <div
        className="card-body"
        style={{ maxHeight: "34vh", marginTop: "0", padding: "10px" }}
      >
        <h6
          className="fw-bold"
          style={{
            marginBottom: "5px",
            fontFamily: "Your-Product-Name-Font-Family, Arial, sans-serif",
            fontSize: "16px",
          }}
        >
          {product.name}
        </h6>
        <p
          className="fw-bold"
          style={{
            marginBottom: "5px",
            fontFamily: "Your-MRP-Font-Family, Arial, sans-serif",
            opacity: "0.8",
            fontSize: "14px",
          }}
        >
          MRP: {product.price}
        </p>
        {isProductDetailsOpen && (
          <ProductDetails product={product} onClose={closeProductDetails} />
        )}
        {isAddedToCart ? (
          <Link to="/cart">
            <button className="bg-pink-600 text-white font-serif py-2 px-2 text-xs hover:bg-pink-700 mt-1 shadow-md">
              Go To Cart
            </button>
          </Link>
        ) : (
          <button
            className={`bg-pink-600 text-white font-serif py-2 px-2 text-xs mt-1 ${
              isAddedToCart
                ? "cursor-not-allowed opacity-50"
                : "hover:bg-pink-700 shadow-md"
            }`}
            onClick={handleAddToCart}
            disabled={isAddedToCart}
          >
            {isAddedToCart ? "Added to Cart" : "Add to Cart"}
          </button>
        )}
      </div>
    </div>
  );
};  





const Card = () => {
  const [products, setProducts] = useState([]);
  const [cartItems, setCartItems] = useState([]);

  const cartId = Number(sessionStorage.getItem("cartId"));

  useEffect(() => {
    axios
      .get("http://localhost:8080/api/products")
      .then((response) => setProducts(response.data))
      .catch((error) => console.error("Error fetching product data:", error));
  }, []);

  const handleSearch = (searchTerm) => {
    if (searchTerm.trim() !== "") {
      axios
        .get(
          `http://localhost:8080/api/products/searchByTerm?searchTerm=${searchTerm}`
        )
        .then((response) => {
          console.log("Search Results:", response.data);
          setProducts(response.data);
        })
        .catch((error) =>
          console.error("Error fetching search results:", error)
        );
    }
  };

  const addToCart = (product) => {
    console.log("Product with Image URL:", product);
    axios
      .post(`http://localhost:8080/api/carts/${cartId}/addToCart`, {
        productId: product.id,
        quantity: product.quantity,
        imageUrl: product.imageUrl,
      })
      .then((response) => {
        setCartItems([...cartItems, response.data]);
        localStorage.setItem(
          "cartItems",
          JSON.stringify([...cartItems, response.data])
        );
        Swal.fire({
          title: "Added to Cart!",
          text: `${product.name} added to cart with quantity: ${product.quantity}`,
          icon: "success",
          confirmButtonText: "Ok",
        });
      })
      .catch((error) => {
        console.error("Error adding to cart:", error);
        Swal.fire({
          title: "Error",
          text: "Failed to add product to cart. Please try again.",
          icon: "error",
          confirmButtonText: "Ok",
        });
      });
  };

  return (
    <div>
      <Navigation onSearch={handleSearch} />
      <DarkVariantExample />
      <div
        className="row"
        style={{
          marginBottom: "10px",
          backgroundColor: "rgb(243, 243, 243)", 
        }}
      >
        {products.map((product) => (
          <div key={product.id} className="col-md-3 mb-3">
            <ProductCard product={product} addToCart={addToCart} />
          </div>
        ))}
      </div>
    </div>
  );
};

export default Card;
