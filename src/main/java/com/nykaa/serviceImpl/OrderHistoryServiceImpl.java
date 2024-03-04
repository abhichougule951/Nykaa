package com.nykaa.serviceImpl;

import com.nykaa.entities.OrderHistory;
import com.nykaa.repository.OrderHistoryRepository;
import com.nykaa.service.OrderHistoryService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class OrderHistoryServiceImpl implements OrderHistoryService {

    private final OrderHistoryRepository orderHistoryRepository;

    @Autowired
    public OrderHistoryServiceImpl(OrderHistoryRepository orderHistoryRepository) {
        this.orderHistoryRepository = orderHistoryRepository;
    }

    @Override
    public List<OrderHistory> getOrderHistoryByCartId(Long cartId) {
        return orderHistoryRepository.findByCartId(cartId);
    }

    @Override
    public List<OrderHistory> saveOrderHistory(Long cartId, List<OrderHistory> orderHistories) {
        orderHistories.forEach(orderHistory -> orderHistory.setCartId(cartId));
        return orderHistoryRepository.saveAll(orderHistories);
    }
}
