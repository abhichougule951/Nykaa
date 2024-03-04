package com.nykaa.entities;

import java.time.LocalDateTime;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;


@Entity
public class Coupon {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String couponCode;
    private double amount;
    private int timeInHours;
    private LocalDateTime createdAt;

    

    public Coupon() {
        this.createdAt = LocalDateTime.now();
    }

    public Coupon(String couponCode, double amount, int timeInHours, LocalDateTime createdAt) {
        this.couponCode = couponCode;
        this.amount = amount;
        this.timeInHours = timeInHours;
        this.createdAt = LocalDateTime.now();
        
        System.out.println("Coupon created - Coupon Code: " + couponCode + ", Created At: " + createdAt + ", Time in Hours: " + timeInHours);
    }
    


    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getCouponCode() {
        return couponCode;
    }

    public void setCouponCode(String couponCode) {
        this.couponCode = couponCode;
    }

    public double getAmount() {
        return amount;
    }

    public void setAmount(double amount) {
        this.amount = amount;
    }

    public int getTimeInHours() {
        return timeInHours;
    }

    public void setTimeInHours(int timeInHours) {
        this.timeInHours = timeInHours;
    }

    public LocalDateTime getCreatedAt() {
        return createdAt;
    }

    public LocalDateTime getExpiryTime() {
        if (createdAt != null && timeInHours > 0) {
            return createdAt.plusHours(timeInHours);
        } else {
            return null;
        }
    }
}
