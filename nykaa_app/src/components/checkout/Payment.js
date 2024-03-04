import React, { useEffect, useState } from "react";
import { FaCreditCard } from "react-icons/fa";
import { CardElement, useStripe, useElements } from "@stripe/react-stripe-js";
import Swal from "sweetalert2";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useCart } from "../CartProvider";
import axios from "axios";

const Payment = ({ nextStep, prevStep }) => {
  const stripe = useStripe();
  const elements = useElements();
  let timeInHours = 48;

  const [selectedPayment, setSelectedPayment] = useState("card");
  const [isCardNumberValid, setIsCardNumberValid] = useState(true);

  const { totalPrice, discountedTotalPrice } = useCart();

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!stripe || !elements) {
      return;
    }

    switch (selectedPayment) {
      case "card":
        try {
          const { paymentMethod, error } = await stripe.createPaymentMethod({
            type: "card",
            card: elements.getElement(CardElement),
          });

          if (error) {
            console.error("Error creating payment method:", error);
          } else {
            const response = await fetch("http://localhost:8080/api/payment", {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
              },
              body: JSON.stringify({
                token: paymentMethod.id,
                discountedTotalPrice,
              }),
            });

            if (response.ok) {
              console.log("Payment Successful!");
              Swal.fire(
                "Payment Successful!",
                ` ₹${discountedTotalPrice.toFixed(2)}! `,
                "success"
              );
              toast.success("Order placed successfully!");
              let couponCode = generateRandomCouponCode();
              let amount;

              if (discountedTotalPrice > 10000) {
                amount = generateRandomAmount(500, 1000);
              } else if (discountedTotalPrice > 5000) {
                amount = generateRandomAmount(200, 500);
              } else if (discountedTotalPrice > 15000) {
                amount = generateRandomAmount(1000, 3000);
              } else {
                amount = 0;
              }
              try {
                if (discountedTotalPrice > 5000) {
                  await axios.post("http://localhost:8080/api/coupons", {
                    couponCode,
                    amount: parseFloat(amount),
                    timeInHours: parseInt(timeInHours, 10),
                  });
                  Swal.fire({
                    icon: "success",
                    title: "Congrats!",
                    text: `You won ₹${amount} off on your next purchase valid for 2 days .`,
                    showConfirmButton: false,
                    timer: 7000,
                    toast: true,
                    position: "center",
                    background: "#FF69B4",
                    timerProgressBar: true,
                  });
                }
                const cartId = Number(sessionStorage.getItem("cartId"));
                const cartItemsResponse = await axios.get(
                  `http://localhost:8080/api/carts/${cartId}/cartItems`
                );
                const cartItems = cartItemsResponse.data;

                console.log(cartItems);

                console.log(cartItems);

                // const postData = {
                //   cartItems: formattedCartItems,
                // };
                console.log(cartItems);

                axios
                  .post(
                    `http://localhost:8080/api/order-history/add/${cartId}`,
                    cartItems
                  )
                  .then((response) => {
                    console.log("Order placed successfully:", response.data);
                  })
                  .catch((error) => {
                    console.error("Error posting order history:", error);
                  });

                await axios.delete(`http://localhost:8080/api/carts/${cartId}`);
              } catch (error) {
                console.log("Error Posting coupon");
              }
            } else {
              console.error("Payment Failed.");
            }
            function generateRandomAmount(min, max) {
              return (Math.random() * (max - min) + min).toFixed(2);
            }
          }
        } catch (err) {
          console.error("Error submitting payment:", err);
        }
        break;
      case "upi":
        console.log("UPI payment logic placeholder");
        break;
      case "cod":
        console.log("Cash on Delivery logic placeholder");
        break;
      default:
        break;
    }
  };
  function generateRandomCouponCode() {
    const characters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
    let couponCode = "";

    for (let i = 0; i < 6; i++) {
      const randomIndex = Math.floor(Math.random() * characters.length);
      couponCode += characters.charAt(randomIndex);
    }

    return couponCode;
  }
  const randomCouponCode = generateRandomCouponCode();
  console.log(randomCouponCode);

  const renderPaymentFields = () => {
    switch (selectedPayment) {
      case "card":
        return (
          <div>
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                <FaCreditCard className="inline mr-2" /> Card Details:
              </label>
              <CardElement
                options={{
                  style: {
                    fontSize: "16px",
                    color: "#424770",
                    "::placeholder": {
                      color: "#aab7c4",
                    },
                  },
                }}
              />
              {!isCardNumberValid && (
                <p className="text-red-500 text-sm">
                  Please enter a valid card number.
                </p>
              )}
            </div>
          </div>
        );
      case "upi":
        return (
          <div>
            <p>Enter your UPI id:</p>

            <input type="text" placeholder="UPI ID" />
          </div>
        );
      case "cod":
        return (
          <div>
            <p>Thank You :)</p>
          </div>
        );
      default:
        return null;
    }
  };



  return (
    <div className="bg-white p-8 rounded-md shadow-md">
      <h2 className="text-xl font-bold mb-4">Payment</h2>
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700">
            Select Payment Method:
          </label>
          <select
            className="mt-1 p-2 w-full border border-gray-300 rounded-md focus:outline-none focus:ring focus:border-blue-300"
            value={selectedPayment}
            onChange={(e) => setSelectedPayment(e.target.value)}
          >
            <option value="card">Credit/Debit Card</option>
            <option value="upi">UPI</option>
            <option value="cod">Cash on Delivery</option>
          </select>
        </div>

        {renderPaymentFields()}

        <div className="flex justify-between mt-8">
          <button
            onClick={prevStep}
            className="bg-gray-500 text-white px-4 py-2 rounded-md hover:bg-gray-600 focus:outline-none focus:ring focus:border-blue-300"
          >
            Previous
          </button>
          <button
            type="submit"
            className="bg-green-600 text-white font-serif py-2 px-4 text-xs hover:bg-green-300 ml-2"
            disabled={!stripe || !isCardNumberValid}
          >
            Pay Now
          </button>
        </div>
      </form>
    </div>
  );
};

export default Payment;
