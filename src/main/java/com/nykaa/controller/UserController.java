package com.nykaa.controller;

import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.nykaa.entities.Address;
import com.nykaa.entities.Cart;
import com.nykaa.entities.User;
import com.nykaa.exception.CustomerNotFoundException;
import com.nykaa.repository.UserRepository;
import com.nykaa.service.UserService;

@RestController
@RequestMapping("/api/users")
@CrossOrigin(origins = "*")
public class UserController {
    @Autowired
    private UserService userService;

    @Autowired
    private UserRepository userRepository;

    @GetMapping
    public ResponseEntity<List<User>> getAllUsers() {
        try {
            List<User> users = userService.getAllUsers();
            return ResponseEntity.ok(users);
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(null);
        }
    }

    @GetMapping("/{userId}")
    public ResponseEntity<User> getUserById(@PathVariable Long userId) {
        try {
            User user = userService.getUserById(userId);
            return ResponseEntity.ok(user);
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(null);
        }
    }

    @PostMapping
    public ResponseEntity<User> addUser(@RequestBody User user) {
        try {
            Cart cart = new Cart();
            cart.setUser(user);
            user.setCart(cart);
            User addedUser = userService.addUser(user);
            return ResponseEntity.ok(addedUser);
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(null);
        }
    }
    
    @PostMapping("/{userId}")
    public ResponseEntity<User> updateUser(@PathVariable Long userId, @RequestBody User updatedUser) {
        try {
            User updatedUserData = userService.updateUser(userId, updatedUser);
            
            if (updatedUserData != null) {
                return new ResponseEntity<>(updatedUserData, HttpStatus.OK);
            } else {
                return new ResponseEntity<>(HttpStatus.NOT_FOUND);
            }
        } catch (CustomerNotFoundException e) {
            return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
    @PostMapping("/{userId}/addresses")
    public ResponseEntity<User> saveAddresses(@PathVariable Long userId, @RequestBody List<Address> addresses) {
        try {
            Optional<User> userOptional = userRepository.findById(userId);

            if (userOptional.isPresent()) {
                User existingUser = userOptional.get();

              
                if (addresses != null) {
                 
                    addresses.forEach(address -> address.setUser(existingUser));

                 
                    existingUser.setAddresses(addresses);

                    
                    userRepository.save(existingUser);

                    return new ResponseEntity<>(existingUser, HttpStatus.OK);
                }
            }

            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        } catch (Exception e) {
            return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
    
    @GetMapping("/{userId}/addresses")
    public ResponseEntity<List<Address>> getAddresses(@PathVariable Long userId) {
        try {
            Optional<User> userOptional = userRepository.findById(userId);

            if (userOptional.isPresent()) {
                User existingUser = userOptional.get();
                List<Address> addresses = existingUser.getAddresses();

                return new ResponseEntity<>(addresses, HttpStatus.OK);
            }

            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        } catch (Exception e) {
            return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @PostMapping("/checkEmail")
    public ResponseEntity<Map<String, Boolean>> checkEmail(@RequestBody Map<String, String> requestBody) {
        try {
            String email = requestBody.get("email");
            boolean isRegistered = userRepository.existsByEmail(email);

            Map<String, Boolean> response = new HashMap<>();
            response.put("isRegistered", isRegistered);

            return ResponseEntity.ok(response);
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(null);
        }
    }

    @PostMapping("/sendOtp")
    public ResponseEntity<Map<String, String>> sendOtp(@RequestParam String email) {
        try {
            String generatedOtp = userService.sendOtp(email);
            Map<String, String> response = new HashMap<>();
            response.put("otp", generatedOtp);

            if (generatedOtp != null) {
                return ResponseEntity.ok(response);
            } else {
                return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(null);
            }
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(null);
        }
    }
}
