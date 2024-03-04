package com.nykaa.controller;

import com.nykaa.entities.OrderHistory;
import com.nykaa.service.OrderHistoryService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/order-history")
@CrossOrigin(origins = "*")
public class OrderHistoryController {

    private final OrderHistoryService orderHistoryService;

    @Autowired
    public OrderHistoryController(OrderHistoryService orderHistoryService) {
        this.orderHistoryService = orderHistoryService;
    }

    @GetMapping("/cart/{cartId}")
    public List<OrderHistory> getOrderHistoryByCartId(@PathVariable Long cartId) {
        return orderHistoryService.getOrderHistoryByCartId(cartId);
    }

    @PostMapping("/add/{cartId}")
    public ResponseEntity<List<OrderHistory>> createOrders(
            @PathVariable Long cartId,
            @RequestBody List<OrderHistory> orderHistories
    ) {
        List<OrderHistory> createdOrderHistories = orderHistoryService.saveOrderHistory(cartId, orderHistories);
        return new ResponseEntity<>(createdOrderHistories, HttpStatus.CREATED);
    }
}
