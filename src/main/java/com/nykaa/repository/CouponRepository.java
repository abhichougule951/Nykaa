package com.nykaa.repository;

import com.nykaa.entities.Coupon;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface CouponRepository extends JpaRepository<Coupon, Long> {

	@Query(value = "SELECT amount FROM coupon WHERE coupon_code = ?1", nativeQuery = true)
	Optional<Double> findAmountByCouponCode(String couponCode);



}
