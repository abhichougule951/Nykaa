package com.nykaa.entities;


import java.math.BigDecimal;

import com.fasterxml.jackson.annotation.JsonBackReference;
import com.fasterxml.jackson.annotation.JsonIgnore;

import jakarta.persistence.*;

@Entity
public class CartItem {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne
    @JoinColumn(name = "product_id", nullable = false)
    private Product product;

    @ManyToOne
    
    @JoinColumn(name = "cart_id", nullable = false)
    @JsonBackReference
    private Cart cart;

    @Column(name = "quantity", nullable = false)
    private int quantity;
    
    @Column(name = "image_url", nullable = true) 
    private String imageUrl;
    
   
    
  

    

    
   



   


  
    
    public String getImageUrl() {
		return imageUrl;
	}

    public void setImageUrl(String imageUrl) {
        this.imageUrl = (imageUrl != null) ? imageUrl : "";
    }

	public CartItem () {
    
    }
    
    public CartItem(Cart cart, Product product, int quantity,String imageUrl) {
        this.cart = cart;
        this.product = product;
        this.quantity = quantity;
        this.imageUrl = imageUrl;
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
    }

    public Cart getCart() {
        return cart;
    }

    public void setCart(Cart cart) {
        this.cart = cart;
    }

    public int getQuantity() {
        return quantity;
    }

    public void setQuantity(int quantity) {
        this.quantity = quantity;
    }
}

