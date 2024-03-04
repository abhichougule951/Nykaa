package com.nykaa.service;

import java.util.List;

import com.nykaa.dto.UserDTO;
import com.nykaa.entities.Address;
import com.nykaa.entities.User;

public interface UserService {
    List<User> getAllUsers();

    User getUserById(Long userId);

    User addUser(User user);

    User updateUser(Long userId, User updatedUser);

    void deleteUser(Long userId);

    String sendOtp(String email);

	User saveAddresses(Long userId, List<Address> addresses);

	List<Address> getAddresses(Long userId);
}
