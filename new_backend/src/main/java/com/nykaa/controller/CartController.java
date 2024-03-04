package com.nykaa.controller;

import java.math.BigDecimal;
import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.nykaa.entities.Cart;
import com.nykaa.entities.CartItem;
import com.nykaa.service.CartItemService;
import com.nykaa.service.CartService;

@RestController

@RequestMapping("/api/carts")
@CrossOrigin(origins = "*")
public class CartController {

    private final CartService cartService;
    private final CartItemService cartItemService;

    @Autowired
    public CartController(CartService cartService, CartItemService cartItemService) {
        this.cartService = cartService;
        this.cartItemService = cartItemService;
    }

    @GetMapping("/{cartId}")
    public ResponseEntity<Cart> getCartById(@PathVariable Long cartId) {
        Cart cart = cartService.getCartById(cartId);
        return ResponseEntity.ok(cart);
    }

    @PostMapping
    public ResponseEntity<Cart> createCart(@RequestBody Cart cart) {
        Cart createdCart = cartService.createCart(cart);
        return ResponseEntity.status(HttpStatus.CREATED).body(createdCart);
    }

    @GetMapping("/{cartId}/cartItems")
    public ResponseEntity<List<CartItem>> getCartItemsByCartId(@PathVariable Long cartId) {
        List<CartItem> cartItems = cartItemService.getCartItemsByCartId(cartId);
        return ResponseEntity.ok(cartItems);
    }

    @PostMapping("/{cartId}/addToCart")
    public ResponseEntity<CartItem> addToCart(
            @PathVariable Long cartId,
            @RequestBody Map<String, Object> requestData) {
        Long productId = ((Number) requestData.get("productId")).longValue();
        int quantity = ((Number) requestData.get("quantity")).intValue();
        String imageUrl = requestData.get("imageUrl").toString();

        Cart cart = cartService.getCartById(cartId);
        if (cart == null) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).build();
        }

        CartItem cartItem = cartItemService.addToCart(cart, productId, quantity,imageUrl);
        return ResponseEntity.status(HttpStatus.CREATED).body(cartItem);
    }

   

    @GetMapping("/{cartId}/totalPrice")
    public ResponseEntity<BigDecimal> getTotalPrice(@PathVariable Long cartId) {
        BigDecimal totalPrice = cartService.calculateTotalPrice(cartId);
        return ResponseEntity.ok(totalPrice);
    }

    @PostMapping("/{cartId}/processDiscount")
    public ResponseEntity<Double> processCartDiscount(@PathVariable Long cartId, @RequestBody Map<String, Object> requestBody) {
        double totalPrice = ((Number) requestBody.get("totalPrice")).doubleValue();
        double discountedTotalPrice = cartService.processCartDiscount(cartId, totalPrice);
        cartService.processCartDiscount(cartId, totalPrice);
//        return ResponseEntity.ok("Discount processed successfully");
        return ResponseEntity.ok(discountedTotalPrice);
    }
    
    @PutMapping("{cartId}/{itemId}")
    public ResponseEntity<CartItem> updateCartItemQuantity(
            @PathVariable Long cartId,
            @PathVariable Long itemId,
            @RequestParam int quantity) {
        try {
            System.out.println("Received request to update cart item quantity - CartId: " + cartId + ", ItemId: " + itemId + ", Quantity: " + quantity);

            CartItem updatedCartItem = cartItemService.updateCartItemQuantity(cartId, itemId, quantity);

            System.out.println("Updated cart item quantity successfully: " + updatedCartItem);

            return ResponseEntity.ok(updatedCartItem);
        } catch (Exception e) {
            System.err.println("Error updating cart item quantity");
            e.printStackTrace();
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
        }
    }
    @DeleteMapping("{cartId}")
    public ResponseEntity<Void> deleteCartItemsByCartId(@PathVariable Long cartId) {
        cartItemService.deleteCartItemsByCartId(cartId);
        return new ResponseEntity<>(HttpStatus.NO_CONTENT);
    }

}
