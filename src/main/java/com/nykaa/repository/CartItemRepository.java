package com.nykaa.repository;

import com.nykaa.entities.Cart;
import com.nykaa.entities.CartItem;

import jakarta.transaction.Transactional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;
import java.util.Optional;

public interface CartItemRepository extends JpaRepository<CartItem, Long> {
	
	@Modifying
	@Transactional
	@Query("UPDATE CartItem ci SET ci.quantity = :quantity WHERE ci.id = :itemId")
	void updateCartItemQuantity(@Param("itemId") Long itemId, @Param("quantity") int quantity);


    
    @Query("SELECT ci FROM CartItem ci WHERE ci.cart.id = :cartId")
    List<CartItem> findByCartId(Long cartId);



	Optional<CartItem> findByCartAndProduct_Id(Cart cart, Long productId);
	
	void deleteByCartId(Long cartId);
}
