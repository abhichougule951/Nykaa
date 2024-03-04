package com.nykaa.service;

import com.nykaa.entities.OrderHistory;

import java.util.List;

public interface OrderHistoryService {

    List<OrderHistory> getOrderHistoryByCartId(Long cartId);

    List<OrderHistory> saveOrderHistory(Long cartId, List<OrderHistory> orderHistories);
}
