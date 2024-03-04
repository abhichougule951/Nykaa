package com.nykaa.serviceImpl;

//CartItemServiceImpl.java
import com.nykaa.entities.Cart;
import com.nykaa.entities.CartItem;
import com.nykaa.entities.Product;
import com.nykaa.exception.ProductNotFoundException;
import com.nykaa.repository.CartItemRepository;
import com.nykaa.service.CartItemService;
import com.nykaa.service.ProductService;

import jakarta.transaction.Transactional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
@Transactional
public class CartItemServiceImpl implements CartItemService {

	private final CartItemRepository cartItemRepository;
	private final ProductService productService;

	@Autowired
	public CartItemServiceImpl(CartItemRepository cartItemRepository, ProductService productService) {
		this.cartItemRepository = cartItemRepository;
		this.productService = productService;
	}
	
	/**
	 * To fetch all cartItem list in a given cartId->provided cartId.
	 */

	@Override
	public List<CartItem> getCartItemsByCartId(Long cartId) {

		return cartItemRepository.findByCartId(cartId);
	}
	
	/**
	 * Add Item in a cart with below all attributes
	 */

	@Override
	public CartItem addToCart(Cart cart, Long productId, int quantity, String imageUrl) {

		Optional<CartItem> existingCartItem = cartItemRepository.findByCartAndProduct_Id(cart, productId);

		if (existingCartItem.isPresent()) {
           
			CartItem cartItem = existingCartItem.get();
			cartItem.setQuantity(cartItem.getQuantity() + quantity);
			cartItemRepository.save(cartItem);
			return cartItem;
		} else {

			Product product = productService.getProductById(productId);

			if (product == null) {
				throw new ProductNotFoundException("Product not found with id: " + productId);
			}

			CartItem cartItem = new CartItem(cart, product, quantity, (imageUrl != null) ? imageUrl : "");
			cartItemRepository.save(cartItem);
			return cartItem;
		}
	}

	@Override
	public CartItem updateCartItemQuantity(Long cartId, Long itemId, int quantity) {
		try {

			CartItem cartItem = cartItemRepository.findById(itemId)
					.orElseThrow(() -> new RuntimeException("Cart item not found"));

			cartItem.setQuantity(quantity);
			cartItem = cartItemRepository.save(cartItem);
			
			if(quantity<1) {
				cartItemRepository.delete(cartItem);
			}

			return cartItem;
		} catch (Exception e) {
			System.err.println("Error updating cart item quantity");
			e.printStackTrace();
			throw new RuntimeException("Error updating cart item quantity", e);
		}
	}

	 @Override
	    public void deleteCartItemsByCartId(Long cartId) {
	        cartItemRepository.deleteByCartId(cartId);
	    }

}
