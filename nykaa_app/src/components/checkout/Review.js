import React, { useState, useEffect } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useCart } from "../CartProvider";
import { FaDollarSign, FaTags, FaMoneyBill, FaMinus } from "react-icons/fa";

const Review = ({ nextStep, prevStep }) => {
  const { totalPrice, discountedTotalPrice } = useCart();
  const [orderDetails, setOrderDetails] = useState([]);
  const [couponCode, setCouponCode] = useState("");
  const [couponAmount, setCouponAmount] = useState(0);
  const [couponAmountTime, setCouponAmountTime] = useState(0);
  const [availableCoupons, setAvailableCoupons] = useState([]);


  const cartId = Number(sessionStorage.getItem("cartId"));
  const endpoint = `http://localhost:8080/api/carts/${cartId}/cartItems`;
  const couponsEndpoint = "http://localhost:8080/api/coupons";

  useEffect(() => {
    const fetchOrderDetails = async () => {
      try {
        const response = await fetch(endpoint);
        const data = await response.json();
        setOrderDetails(data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    const fetchAvailableCoupons = async () => {
      try {
        const response = await fetch(couponsEndpoint);
        const data = await response.json();
        setAvailableCoupons(data);
        console.log(data);
      } catch (error) {
        console.error("Error fetching coupons:", error);
      }
    };

    fetchOrderDetails();
    fetchAvailableCoupons();
  }, [endpoint, couponsEndpoint]);

  const handleConfirmOrder = () => {
    const savedAmount = totalPrice - discountedTotalPrice + couponAmount;
    toast.success(`You saved ₹${savedAmount}! 😊`, {
      position: toast.POSITION.TOP_CENTER,
      autoClose: 2000,
    });

    nextStep();
  };

  const handleApplyCoupon = async () => {
    if (discountedTotalPrice>=5000){
    try {
      const response = await fetch(`http://localhost:8080/api/coupons/apply`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ couponCode }),
      });
      

      if (response.ok) {
        setCouponAmountTime(couponAmountTime + 1);
        if (couponAmountTime === 0) {
          const couponAmount = await response.json();
          setCouponAmount(couponAmount);
          toast.success(
            `Coupon applied successfully! You saved ₹${couponAmount}! 😊`,
            {
              position: toast.POSITION.TOP_CENTER,
              autoClose: 2000,
            }
          );
        }
      } 
    else {
        toast.error("Sorry, no valid coupon found or it has expired. 😔", {
          position: toast.POSITION.TOP_CENTER,
          autoClose: 2000,
        });
      }
    } catch (error) {
      console.error("Error applying coupon:", error);
    }
  }
  else {
    toast.error("All coupons are applicable on buying product min. ₹5000 ", {
      position: toast.POSITION.TOP_CENTER,
      autoClose: 2000,
    });
  }
  };

  

  return (
    <div>
      <h2
        style={{
          fontSize: "1.25rem",
          fontWeight: "bold",
          marginBottom: "1rem",
          fontFamily: "Assistant, sans-serif",
        }}
      >
        Review & Confirm
      </h2>

      <div style={{ marginBottom: "1rem" }}>
        {orderDetails.map((item) => (
          <div
            key={item.id}
            style={{
              marginBottom: "1rem",
              padding: "1rem",
              border: "1px solid #ccc",
              borderRadius: "0.25rem",
              fontFamily: "Assistant, sans-serif",
              transition: "background 0.3s ease-in-out",
            }}
            className="product-item"
            onMouseOver={(e) => (e.currentTarget.style.background = "#f0f0f0")}
            onMouseOut={(e) => (e.currentTarget.style.background = "white")}
          >
            <div
              style={{
                display: "flex",
                alignItems: "center",
              }}
            >
              <img
                src={item.imageUrl}
                alt={item.name}
                style={{
                  width: "4rem",
                  height: "4rem",
                  marginRight: "1rem",
                  borderRadius: "0.25rem",
                  transition: "transform 0.2s ease-in-out",
                }}
                className="product-image"
                onMouseOver={(e) =>
                  (e.currentTarget.style.transform = "scale(1.2)")
                }
                onMouseOut={(e) =>
                  (e.currentTarget.style.transform = "scale(1)")
                }
              />
              <div>
                <p style={{ fontSize: "1.1rem", fontWeight: "bold" }}>
                  {item.product.name}
                </p>
                <p>Quantity: {item.quantity}</p>
                <p>Total Price: {item.product.price * item.quantity}</p>
              </div>
            </div>
          </div>
        ))}
      </div>

      <div
        style={{
          backgroundColor: "#f0f0f0",
          padding: "1rem",
          borderRadius: "0.25rem",
          marginTop: "1rem",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <p style={{ fontSize: "1.2rem", color: "#4CAF50" }}>
          <FaDollarSign style={{ marginRight: "0.5rem" }} />
          Total Amount: ₹{totalPrice}
          <span style={{ color: "#FF9800" }}>
            <FaTags style={{ marginRight: "0.5rem" }} />
            Discounted Total Amount: ₹{discountedTotalPrice - couponAmount}
          </span>{" "}
          <span style={{ color: "#F44336" }}>
            <FaMinus style={{ marginRight: "0.5rem" }} />
            Discount Amount: ₹{totalPrice - discountedTotalPrice + couponAmount}
          </span>
        </p>
      </div>

      <input
        type="text"
        placeholder="Enter Coupon Code"
        value={couponCode}
        onChange={(e) => setCouponCode(e.target.value)}
        style={{
          padding: "0.5rem",
          marginRight: "1rem",
          borderRadius: "0.25rem",
        }}
      />
      <button
        onClick={handleApplyCoupon}
        style={{
          backgroundColor: "#0d8050",
          color: "#fff",
          padding: "0.5rem 1rem",
          borderRadius: "0.25rem",
          cursor: "pointer",
          overflow: "hidden",
          transition: "background 0.3s ease-in-out",
        }}
        onMouseOver={(e) => (e.currentTarget.style.background = "#903233")}
        onMouseOut={(e) => (e.currentTarget.style.background = "#903233")}
      >
        Apply Coupon
      </button>
      {/* <p>All coupons are applicable on buying product min. ₹5000 </p> */}

      <div style={{ marginBottom: "1rem" }}>
  <h3 style={{ marginBottom: "0.5rem", color: "#4CAF50", fontFamily: "Arial, sans-serif" }}>
    Available Coupons:
  </h3>
  <div style={{ display: "flex", flexWrap: "wrap" }}>
    {availableCoupons.map((coupon) => (
      <div
        key={coupon.id}
        style={{
          border: "1px solid #ccc",
          borderRadius: "0.25rem",
          padding: "1rem",
          margin: "0.5rem",
          fontFamily: "Arial, sans-serif",
          transition: "background 0.3s ease-in-out",
          boxShadow: "0px 0px 10px 0px rgba(0,0,0,0.2)",
          cursor: "pointer",
        }}
        onMouseOver={(e) => (e.currentTarget.style.background = "#f0f0f0")}
        onMouseOut={(e) => (e.currentTarget.style.background = "white")}
      >
        <p style={{ marginBottom: "0.5rem", fontWeight: "bold" }}>
          {coupon.couponCode}
        </p>
        <p style={{ color: "#FF9800", marginBottom: "0.5rem" }}>
          Discount: ₹{coupon.amount}
        </p>
       
      </div>
    ))}
  </div>
</div>

      <div style={{ display: "flex", justifyContent: "space-between" }}>
        <button
          onClick={prevStep}
          style={{
            backgroundColor: "#903233",
            color: "#fff",
            padding: "0.5rem 1rem",
            borderRadius: "0.25rem",
            cursor: "pointer",
          }}
        >
          Previous
        </button>
        <button
          onClick={handleConfirmOrder}
          style={{
            backgroundColor: "#0d8050",
            color: "#fff",
            padding: "0.5rem 1rem",
            borderRadius: "0.25rem",
            cursor: "pointer",
            position: "relative",
            overflow: "hidden",
            transition: "background 0.3s ease-in-out",
          }}
          onMouseOver={(e) => (e.currentTarget.style.background = "#903233")}
          onMouseOut={(e) => (e.currentTarget.style.background = "#903233")}
        >
          Confirm Order
        </button>
      </div>
      <ToastContainer />
    </div>
  );
};
export default Review;
