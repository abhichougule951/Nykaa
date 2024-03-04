package com.nykaa.service;

import java.util.List;

import com.nykaa.entities.Coupon;
import com.nykaa.exception.CouponExpiredException;
import com.nykaa.exception.CouponNotFoundException;

public interface CouponService {

	List<Coupon> getAllCoupons();

	Coupon getOneCoupon(Long id);

	Coupon hostCoupon(Coupon coupon);

	void deleteExpiredCoupons();

	boolean deleteCoupon(Long id);

	double applyCoupon(String couponCode) throws CouponNotFoundException, CouponExpiredException;

}
