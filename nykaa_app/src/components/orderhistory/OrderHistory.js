import React, { useState, useEffect } from "react";
import axios from "axios";

const OrderHistory = () => {
  const [orderHistory, setOrderHistory] = useState([]);
  const [showReturnForm, setShowReturnForm] = useState(false);
  const [returnReason, setReturnReason] = useState("");

  const cartId = Number(sessionStorage.getItem("cartId"));

  useEffect(() => {
    const fetchOrderHistory = async () => {
      try {
        const response = await axios.get(
          `http://localhost:8080/api/order-history/cart/${cartId}`
        );
        setOrderHistory(response.data);
      } catch (error) {
        console.error("Error fetching order history:", error);
      }
    };

    fetchOrderHistory();
  }, [cartId]);
console.log(orderHistory)
  const handleReturnProduct = (orderId) => {
    console.log(`Returning product with orderId: ${orderId}`);
    setShowReturnForm(true);
  };

  const handleReturnFormClose = () => {
    setShowReturnForm(false);
  };

  const handleReturnReasonChange = (event) => {
    setReturnReason(event.target.value);
  };

  const handleReturnSubmit = async () => {
    try {
      const response = await axios.post("http://localhost:8080/returns", {
        productId:  orderHistory[0].product.id,  
        status: "returned",  
        returnReason: returnReason,
      });
  
      console.log("Return request submitted successfully:", response.data);
      console.log("Hi" ,orderHistory);
     
  
    } catch (error) {
      console.error("Error submitting return request:", error);
     
    } finally {
      setShowReturnForm(false);
      setReturnReason("");
    }
  };
  

  return (
    <div>
      <h2 style={{ textAlign: "center" }}>Order History</h2>
      {orderHistory.map((order) => (
        <div key={order.id} style={orderItemStyle}>
          <img src={order.imageUrl} alt="Product" style={productImageStyle} />
          <div style={orderDetailsStyle}>
            <p>
              <strong>Order Date:</strong>{" "}
              {new Date(order.orderDateTime).toLocaleString()}
            </p>
            <p>
              <strong>Product:</strong> {order.product.name} (
              {order.product.brand})
            </p>
            <p>
              <strong>Quantity:</strong> {order.quantity}
            </p>
            <p>
              <strong>Total Price:</strong> ₹{order.totalPrice}
            </p>
            <button
              type="button"
              className="bg-red-500 hover-green text-white px-3 py-2 rounded-md focus:outline-none focus:shadow-outline-green active:bg-green-800 mr-2"
              onClick={() => handleReturnProduct(order.id)}
            >
              Return Product
            </button>
          </div>
        </div>
      ))}

      
      {showReturnForm && (
        <div className="fixed inset-0 flex items-center justify-center">
          <div className="absolute inset-0 bg-gray-800 opacity-75"></div>
          <div className="relative bg-white rounded-lg p-10 w-100% h-80%">
    
            <h2 className="text-2xl font-bold mb-4">Return Product Form</h2>
            <div className="mb-4">
              <label
                className="block text-sm font-bold mb-2"
                htmlFor="returnReason"
              >
                Select a reason for return:
              </label>
              <select
                id="returnReason"
                className="w-full border p-2 rounded"
                onChange={handleReturnReasonChange}
                value={returnReason}
              >
                <option value="" disabled>
                  Select a reason
                </option>
                <option value="Damaged">Product Arrived Damaged</option>
                <option value="Wrong Product">
                  Received the Wrong Product
                </option>
                <option value="Not Satisfied">
                  Not Satisfied with Product Quality
                </option>
                <option value="Allergic Reaction">
                  Experienced Allergic Reaction
                </option>
                <option value="Expired Product">
                  Received Expired Product
                </option>
                <option value="Color Mismatch">
                  Color Mismatch with Expectations
                </option>
                <option value="Not as Described">
                  Product Not as Described on the Website
                </option>
                <option value="Changed Mind">
                  Changed Mind, No Longer Needed
                </option>
                <option value="Other">
                 Other
                </option>
              </select>
            </div>
            <button
              className="bg-green-500 text-white px-3 py-2 rounded-md hover:bg-green-700"
              onClick={handleReturnSubmit}
            >
              Submit Return
            </button>
            <button
              className="bg-red-500 text-white px-3 py-2 rounded-md ml-2 hover:bg-red-700"
              onClick={handleReturnFormClose}
            >
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

const orderItemStyle = {
  display: "flex",
  border: "1px solid #ccc",
  margin: "10px",
  padding: "10px",
};

const productImageStyle = {
  width: "100px",
  height: "100px",
  objectFit: "cover",
  marginRight: "10px",
};

const orderDetailsStyle = {
  flexGrow: 1,
};

export default OrderHistory;
