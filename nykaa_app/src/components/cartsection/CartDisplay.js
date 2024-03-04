import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Swal from 'sweetalert2';
import ProductCart from './ProductCart';
import { Link, Navigate, useNavigate } from 'react-router-dom';



const CartDisplay = () => {
  const [cartItems, setCartItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [totalPrice, setTotalPrice] = useState(0);
  const [discountedTotalPrice, setDiscountedTotalPrice] = useState(null);
  const isCartEmpty = totalPrice === 0;
  const navigate = useNavigate()
  const cartId = Number(sessionStorage.getItem('cartId'));

  useEffect(() => {
    const fetchData = async () => {
      try {
        if (!cartId) {
          console.warn('Cart ID is null.');
          return;
        }

        const response = await axios.get(`http://localhost:8080/api/carts/${cartId}/cartItems`);
        console.log('API Response:', response.data);
        console.log("hey"+cartId)
        setCartItems(response.data || []);
        setLoading(false);
        calculateTotalPrice(response.data);
      } catch (error) {
        console.error('Error fetching cart items:', error);
        setLoading(false);
      }
    };

    fetchData();
  }, [cartId]);

  useEffect(() => {
    console.log('cartItems:', cartItems);
  }, [cartItems]);

  const calculateTotalPrice = async (items) => {
    try {
      if (!Array.isArray(items)) {
        console.error('Error: items is not an array');
        return;
      }

      const totalPriceResponse = await axios.get(`http://localhost:8080/api/carts/${cartId}/totalPrice`);
      console.log('Total price response data:', totalPriceResponse.data);
      setTotalPrice(totalPriceResponse.data);
      

      const updatedItems = await Promise.all(
        items.map(async (item) => {
          const productInfoResponse = await axios.get(`http://localhost:8080/api/products/${item.product.id}`);
          const itemPrice = productInfoResponse.data.price;

          return {
            ...item,
            price: itemPrice,
          };
        })
      );

      console.log('Updated items:', updatedItems);
      setCartItems(updatedItems);

      const discountResponse = await axios.post(`http://localhost:8080/api/carts/${cartId}/processDiscount`, {
        totalPrice: totalPriceResponse.data,
        
      });

      const newDiscountedTotalPrice = discountResponse.data;

      console.log('New discounted total price:', newDiscountedTotalPrice);
      setDiscountedTotalPrice(newDiscountedTotalPrice);
      
    } catch (error) {
      console.error('Error calculating total price:', error);
    }
  };

  const handleQuantityChange = async (itemId, newQuantity) => {
    try {
      if (newQuantity >= 0) {
        const response = await axios.put(
          `http://localhost:8080/api/carts/${cartId}/${itemId}?quantity=${newQuantity}`
        );
  
        setCartItems((prevCartItems) =>
          prevCartItems.map((item) =>
            item.id === itemId ? { ...item, quantity: newQuantity } : item
          )
        );
  
        const cartItemsResponse = await axios.get(
          `http://localhost:8080/api/carts/${cartId}/cartItems`
        );
  
        calculateTotalPrice(cartItemsResponse.data);
      } else {
        console.log('Quantity cannot be negative');
      }
    } catch (error) {
      console.error('Error updating quantity:', error);
    }
  };
  
  
  

  const handleCheckDiscount = () => {
    if (discountedTotalPrice >= 5000) {
      const difference = totalPrice - discountedTotalPrice;

      Swal.fire({
        icon: 'success',
        title: 'Congratulations!',
        text: `You got a discount of ₹${difference.toFixed(2)}! 💃🎉`,
        confirmButtonColor: '#42a5f5',
        confirmButtonText: 'Awesome!',
        allowOutsideClick: false,
        showCloseButton: true,
      });
    } else {
      Swal.fire({
        icon: 'info',
        title: 'Check Discount',
        text: 'No discount applied yet.',
      });
    }
  };
  const cartContainerStyle = {
    background: isCartEmpty ? 'url(https://www.seensil.com/assets/images/cart-empty.jpg) center/cover' : 'none',
    borderRadius: '8px',
    padding: '20px',
    boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',
    backgroundSize: '80% 100%', 
  };
  const handleProceed = () => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      window.location.reload(); 
      navigate('/checkout'); 
    }, 100); 
  };


  return (
    <div className="container mt-4">
      <div style={cartContainerStyle} className="bg-white p-4 rounded shadow-md">
        <h2 className="text-xl font-bold mb-4">Shopping Cart</h2>
        {loading ? (
          <p>Loading...</p>
        ) : (
          <>
            <ul className="list-group">
              {cartItems.filter((item) => item.quantity > 0).map((item) => (
                <ProductCart key={item.id} item={item} handleQuantityChange={handleQuantityChange} />
              ))}
            </ul>
  
            <div className="mt-4">
              <p className="text-lg font-semibold">Total Price: ₹{totalPrice}</p>
              {discountedTotalPrice > 0 && (
                <p className="text-lg font-semibold">Discounted Total Price: ₹{discountedTotalPrice}</p>
              )}
              <button className="bg-pink-600 text-white font-serif py-2 px-4 text-xs hover:bg-pink-400 ml-2" onClick={handleCheckDiscount}>
                Check Discount
              </button>
              
              {totalPrice > 0 && ( // Only render if the cart is not empty
                <Link to="/checkout">
                  <button className="bg-pink-600 text-white font-serif py-2 px-4 text-xs hover:bg-pink-400 ml-2"  onClick={handleProceed}>
                    Proceed
                  </button>
                </Link>
              )}
            </div>
          </>
        )}
      </div>
    </div>
  );
              }  

export default CartDisplay;