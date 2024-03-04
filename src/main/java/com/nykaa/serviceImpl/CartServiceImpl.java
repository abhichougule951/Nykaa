package com.nykaa.serviceImpl;

import java.math.BigDecimal;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.nykaa.entities.Cart;
import com.nykaa.entities.CartItem;
import com.nykaa.repository.CartItemRepository;
import com.nykaa.repository.CartRepository;
import com.nykaa.service.CartService;

@Service
public class CartServiceImpl implements CartService {

    private final CartRepository cartRepository;
    private final CartItemRepository cartItemRepository;

    @Autowired
    public CartServiceImpl(CartRepository cartRepository, CartItemRepository cartItemRepository) {
        this.cartRepository = cartRepository;
        this.cartItemRepository = cartItemRepository;
    }

    @Override
    public Cart getCartById(Long cartId) {
    	
        return cartRepository.findById(cartId).orElse(null);
    }

    @Override
    public Cart createCart(Cart cart) {
        return cartRepository.save(cart);
    }

    @Override
    public void addToCart(Long cartId, Long productId, int quantity) {
        Cart cart = cartRepository.findById(cartId).orElseThrow(() -> new RuntimeException("Cart not found"));

       
    }

 
        
    @Override
    public double processCartDiscount(Long cartId, double totalPrice)  {
        try {
        	double discountedTotalPrice = 0.0;
        	 if (totalPrice > 0 && totalPrice < 5000) {
                 Cart cart = cartRepository.findById(cartId).orElseThrow(() -> new RuntimeException("Cart not found"));
                  discountedTotalPrice = totalPrice ;
                 
                 cart.setTotalPrice(discountedTotalPrice);
                 cartRepository.save(cart);
             }
        	 else if (totalPrice > 5000 && totalPrice < 10000) {
                Cart cart = cartRepository.findById(cartId).orElseThrow(() -> new RuntimeException("Cart not found"));
                 discountedTotalPrice = totalPrice - 200;
                cart.setTotalPrice(discountedTotalPrice);
                cartRepository.save(cart);
            } else if (totalPrice > 10000 && totalPrice < 15000) {
                Cart cart = cartRepository.findById(cartId).orElseThrow(() -> new RuntimeException("Cart not found"));
                 discountedTotalPrice = totalPrice - 500;
                cart.setTotalPrice(discountedTotalPrice);
                cartRepository.save(cart);
            } else if (totalPrice > 15000 && totalPrice < 20000) {
                Cart cart = cartRepository.findById(cartId).orElseThrow(() -> new RuntimeException("Cart not found"));
                 discountedTotalPrice = totalPrice - 900;
                cart.setTotalPrice(discountedTotalPrice);
                cartRepository.save(cart);
            } else if (totalPrice > 20000 && totalPrice < 30000) {
                Cart cart = cartRepository.findById(cartId).orElseThrow(() -> new RuntimeException("Cart not found"));
                 discountedTotalPrice = totalPrice - 2300;
                cart.setTotalPrice(discountedTotalPrice);
                cartRepository.save(cart);
            } else if(totalPrice > 30000 && totalPrice < 50000){
                Cart cart = cartRepository.findById(cartId).orElseThrow(() -> new RuntimeException("Cart not found"));
                
                 discountedTotalPrice = totalPrice - 5000;
                cart.setTotalPrice(discountedTotalPrice);
                cartRepository.save(cart);
            }
            else if(totalPrice > 50000 && totalPrice < 400000){
            	  Cart cart = cartRepository.findById(cartId).orElseThrow(() -> new RuntimeException("Cart not found"));
            	 discountedTotalPrice = totalPrice-10000;
                 cart.setTotalPrice(discountedTotalPrice);
                 cartRepository.save(cart);
            	
            }
            return discountedTotalPrice;
        } catch (Exception e) {
        	 return 0.0;
        }
    }


        
        
        
    //totalPrice

    @Override
    public BigDecimal calculateTotalPrice(Long cartId) {
        List<CartItem> cartItems = cartItemRepository.findByCartId(cartId);
        return cartItems.stream()
                .map(item -> item.getProduct().getPrice().multiply(BigDecimal.valueOf(item.getQuantity())))
                .reduce(BigDecimal.ZERO, BigDecimal::add);
    }
    
//
//    public BigDecimal calculateTotalPrice(Long cartId) {
//        List<CartItem> cartItems = cartItemRepository.findByCartId(cartId);
//        
//        BigDecimal totalPrice = BigDecimal.ZERO;
//        
//        for (CartItem item : cartItems) {
//            BigDecimal itemPrice = item.getProduct().getPrice().multiply(BigDecimal.valueOf(item.getQuantity()));
//            totalPrice = totalPrice.add(itemPrice);
//        }
//        
//        return totalPrice;
//    }

}
