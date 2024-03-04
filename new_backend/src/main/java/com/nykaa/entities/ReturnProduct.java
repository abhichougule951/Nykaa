package com.nykaa.entities;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;


@Entity
public class ReturnProduct {
 @Id
 @GeneratedValue(strategy = GenerationType.IDENTITY)
 private Long id;

 private Long productId;
 private String status;
 private String returnReason;
public Long getId() {
	return id;
}
public void setId(Long id) {
	this.id = id;
}
public Long getProductId() {
	return productId;
}
public void setProductId(Long productId) {
	this.productId = productId;
}
public String getStatus() {
	return status;
}
public void setStatus(String status) {
	this.status = status;
}
public String getReturnReason() {
	return returnReason;
}
public void setReturnReason(String returnReason) {
	this.returnReason = returnReason;
}


}
