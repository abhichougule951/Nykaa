package com.nykaa.exception;

public class CouponExpiredException extends RuntimeException{
	public CouponExpiredException() {
        super("Coupon Expired");
    }

}
