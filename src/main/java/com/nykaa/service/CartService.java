package com.nykaa.service;

import java.math.BigDecimal;

import com.nykaa.entities.Cart;


public interface CartService {

 Cart getCartById(Long cartId);

 Cart createCart(Cart cart);

 void addToCart(Long cartId, Long productId, int quantity);

 double processCartDiscount(Long cartId, double totalPrice);

 BigDecimal calculateTotalPrice(Long cartId);




}

