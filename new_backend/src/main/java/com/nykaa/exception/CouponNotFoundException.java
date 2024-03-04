package com.nykaa.exception;

public class CouponNotFoundException extends RuntimeException{
	public CouponNotFoundException() {
        super("Coupon not found");
    }
	public CouponNotFoundException(String message,Throwable cause) {
		super(message,cause);
	}

}
