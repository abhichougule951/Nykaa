package com.nykaa.serviceImpl;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Service;

import com.nykaa.entities.Coupon;
import com.nykaa.exception.CouponExpiredException;
import com.nykaa.exception.CouponNotFoundException;
import com.nykaa.repository.CouponRepository;
import com.nykaa.service.CouponService;

@Service
public class CouponServiceImpl implements CouponService {

    private final CouponRepository couponRepository;

    @Autowired
    public CouponServiceImpl(CouponRepository couponRepository) {
        this.couponRepository = couponRepository;
    }
    
    /**
     * To fetch all Coupons from backend
     */
    @Override
    public List<Coupon> getAllCoupons() {
        return couponRepository.findAll();
    }
    
    /**
     * To fetch coupons based on coupon id 
     */

    @Override
    public Coupon getOneCoupon(Long id) {
        return couponRepository.findById(id).orElse(null);
    }

    /**
     * To host coupons in Database.(Add coupons)
     */
    @Override
    public Coupon hostCoupon(Coupon coupon) {
     
        return couponRepository.save(coupon);
    }
    
    /**
     * Based on Time Duration execute this method on every hour 
     * where expired coupons automatically deleted from database 
     */

    @Override
    public void deleteExpiredCoupons() {
    	System.out.println("Called");
        List<Coupon> coupons = couponRepository.findAll();
        LocalDateTime currentDateTime = LocalDateTime.now();

        for (Coupon coupon : coupons) {
            LocalDateTime expirationDateTime = coupon.getCreatedAt().plusHours(coupon.getTimeInHours());

            if (currentDateTime.isAfter(expirationDateTime)) {
                
                couponRepository.deleteById(coupon.getId());
            }
        }
    }
    
    

    /**
     * . The cron expression "0 0 * * * *" specifies that the task should run every hour.

         Inside this scheduled method, it calls the deleteExpiredCoupons() method to perform the actual deletion of expired coupons.
     */
    @Scheduled(cron = "0 0 * * * *")
    public void scheduledDeleteExpiredCoupons() {
        deleteExpiredCoupons();
    }
    @Override
    public double applyCoupon(String couponCode) throws CouponNotFoundException, CouponExpiredException {
        Optional<Double> optionalAmount = couponRepository.findAmountByCouponCode(couponCode);
        System.out.println("Inside applyCoupon");

        if (optionalAmount.isPresent()) {
            double discountAmount = optionalAmount.get();
            return discountAmount;
        } else {
            throw new CouponNotFoundException();
        }
    }

    
    @Override
    public boolean deleteCoupon(Long id) {
    	
    	return false;
    }
}
