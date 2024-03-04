package com.nykaa.entities;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.OneToOne;

@Entity

public class BeautyAdvice {
	
	@Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
	
	private String skinType;
    private boolean sensitive;
    private boolean acneProne;
    private boolean aging;
    private String skinTone;
    private String productType;
    
    public String getProductType() {
		return productType;
	}
	public void setProductType(String productType) {
		this.productType = productType;
	}
	@OneToOne 
    @JoinColumn(name = "product_id")
    private Product product;
    
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
	public String getSkinType() {
		return skinType;
	}
	public void setSkinType(String skinType) {
		this.skinType = skinType;
	}
	public boolean isSensitive() {
		return sensitive;
	}
	public void setSensitive(boolean sensitive) {
		this.sensitive = sensitive;
	}
	public boolean isAcneProne() {
		return acneProne;
	}
	public void setAcneProne(boolean acneProne) {
		this.acneProne = acneProne;
	}
	public boolean isAging() {
		return aging;
	}
	public void setAging(boolean aging) {
		this.aging = aging;
	}
	public String getSkinTone() {
		return skinTone;
	}
	public void setSkinTone(String skinTone) {
		this.skinTone = skinTone;
	}
    

}
