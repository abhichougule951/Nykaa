package com.nykaa.controller;

import java.util.Map;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.stripe.Stripe;
import com.stripe.exception.StripeException;
import com.stripe.model.PaymentIntent;
import com.stripe.param.PaymentIntentCreateParams;

@RestController
@RequestMapping("/api/payment")
@CrossOrigin(origins = "*")
public class PaymentController {

    @Value("${stripe.secret.key}")
    private String stripeSecretKey;

    @PostMapping
    public ResponseEntity<String> handlePayment(@RequestBody Map<String, Object> payload) {
        Stripe.apiKey = stripeSecretKey;
        Double discountedTotalPrice = ((Number) payload.get("discountedTotalPrice")).doubleValue();

        try {
           
        	PaymentIntentCreateParams createParams = PaymentIntentCreateParams.builder()
        	        .setCurrency("inr")
        	        .setAmount(Math.round(discountedTotalPrice * 100))
        	        .setDescription("Payment for Nykaa service")
        	        .setPaymentMethod(payload.get("token").toString()) 
        	        .setConfirmationMethod(PaymentIntentCreateParams.ConfirmationMethod.AUTOMATIC)
        	        .setConfirm(true)
        	        .setReturnUrl("http://localhost:3000") 
        	        .build();



            PaymentIntent paymentIntent = PaymentIntent.create(createParams);

            
            System.out.println("Token Details: " + payload.get("token").toString());
            System.out.println("PaymentIntent Status: " + paymentIntent.getStatus());
            System.out.println("PaymentIntent Client Secret: " + paymentIntent.getClientSecret());

            
            if ("requires_action".equals(paymentIntent.getStatus())) {
                return ResponseEntity.status(HttpStatus.OK).body(paymentIntent.getClientSecret());
            } else if ("succeeded".equals(paymentIntent.getStatus())) {
                return ResponseEntity.ok("Payment Successful!");
            } else {
                return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Payment Failed. Status: " + paymentIntent.getStatus());
            }
        } catch (Exception e) {
            
            e.printStackTrace();
          
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Error processing payment. Please try again.");
        }
    }
}
