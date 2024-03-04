package com.nykaa.entities;

import java.math.BigDecimal;
import java.time.LocalDateTime;

import jakarta.persistence.*;

@Entity
@Table(name = "order_history")
public class OrderHistory {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne
    @JoinColumn(name = "product_id")
    private Product product;

    @Column(name = "image_url")
    private String imageUrl;

    private int quantity;

    @Column(name = "total_price")
    private BigDecimal totalPrice;

    @Column(name = "order_date_time")
    private LocalDateTime orderDateTime;

    @Column(name = "cart_id")
    private Long cartId;

    @ManyToOne
    @JoinColumn(name = "cart_id", insertable = false, updatable = false)
    private Cart cart;

    public OrderHistory() {
        this.orderDateTime = LocalDateTime.now();
        recalculateTotalPrice();
    }

 

    public Long getId() {
		return id;
	}



	public void setId(Long id) {
		this.id = id;
	}



	public Product getProduct() {
		return product;
	}



	public void setProduct(Product product) {
	    this.product = product;
	    recalculateTotalPrice();
	}



	public String getImageUrl() {
		return imageUrl;
	}



	public void setImageUrl(String imageUrl) {
		this.imageUrl = imageUrl;
	}



	public int getQuantity() {
		return quantity;
	}



	public void setQuantity(int quantity) {
	    this.quantity = quantity;
	    recalculateTotalPrice();
	}


	public BigDecimal getTotalPrice() {
		return totalPrice;
	}



	public void setTotalPrice(BigDecimal totalPrice) {
		this.totalPrice = totalPrice;
	}



	public LocalDateTime getOrderDateTime() {
		return orderDateTime;
	}



	public void setOrderDateTime(LocalDateTime orderDateTime) {
		this.orderDateTime = orderDateTime;
	}



	public Long getCartId() {
		return cartId;
	}



	public void setCartId(Long cartId) {
		this.cartId = cartId;
	}



	public Cart getCart() {
		return cart;
	}



	public void setCart(Cart cart) {
		this.cart = cart;
	}



	private void recalculateTotalPrice() {
        if (this.product != null && this.quantity > 0) {
            this.totalPrice = this.product.getPrice().multiply(BigDecimal.valueOf(this.quantity));
        } else {
            this.totalPrice = BigDecimal.ZERO;
        }
    }
}
