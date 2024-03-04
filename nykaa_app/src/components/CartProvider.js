import React, { createContext, useContext, useState, useEffect } from 'react';
import axios from 'axios';

const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const [totalPrice, setTotalPrice] = useState(0);
  const [discountedTotalPrice, setDiscountedTotalPrice] = useState(null);

  useEffect(() => {
    const fetchCartData = async () => {
      try {
        const cartId = Number(sessionStorage.getItem('cartId'));
        if (!cartId) {
          console.warn('Cart ID is null.');
          return;
        }

        const cartItemsResponse = await axios.get(`http://localhost:8080/api/carts/${cartId}/cartItems`);
        const cartItems = cartItemsResponse.data || [];

        const totalPriceResponse = await axios.get(`http://localhost:8080/api/carts/${cartId}/totalPrice`);
        const totalPrice = totalPriceResponse.data;

        const discountResponse = await axios.post(`http://localhost:8080/api/carts/${cartId}/processDiscount`, {
          totalPrice: totalPriceResponse.data,
        });

        const newDiscountedTotalPrice = discountResponse.data;

        console.log('New discounted total price:', newDiscountedTotalPrice);

        setTotalPrice(totalPrice);
        setDiscountedTotalPrice(newDiscountedTotalPrice);
      } catch (error) {
        console.error('Error fetching cart data:', error);
      }
    };

    fetchCartData();
  }, []); // No dependencies for initial fetch

  const updateTotalPrice = (newTotalPrice) => {
    setTotalPrice(newTotalPrice);
  };

  const updateDiscountedTotalPrice = (newDiscountedTotalPrice) => {
    setDiscountedTotalPrice(newDiscountedTotalPrice);
  };

  const values = {
    totalPrice,
    discountedTotalPrice,
    updateTotalPrice,
    updateDiscountedTotalPrice,
  };

  return <CartContext.Provider value={values}>{children}</CartContext.Provider>;
};

export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
};
