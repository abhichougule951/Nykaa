
package com.nykaa.service;

import com.nykaa.entities.Cart;
import com.nykaa.entities.CartItem;

import java.util.List;

import org.springframework.http.ResponseEntity;

public interface CartItemService {

    List<CartItem> getCartItemsByCartId(Long cartId);

    CartItem addToCart(Cart cart, Long productId, int quantity,String imageUrl);

	CartItem updateCartItemQuantity(Long cartId, Long itemId, int quantity);

	 void deleteCartItemsByCartId(Long cartId);

   
}
