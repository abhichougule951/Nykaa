package com.nykaa.serviceImpl;

import org.springframework.beans.factory.annotation.Autowired;


import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.stereotype.Service;

import com.nykaa.entities.Address;
import com.nykaa.entities.Cart;
import com.nykaa.entities.User;
import com.nykaa.exception.CustomerNotFoundException;
import com.nykaa.exception.DuplicateEmailException;
import com.nykaa.repository.UserRepository;
import com.nykaa.service.UserService;

import java.util.Collections;
import java.util.List;
import java.util.Optional;
import java.util.Random;
import java.util.stream.Collectors;

@Service
public class UserServiceImpl implements UserService {

    private final UserRepository userRepository;
    private final JavaMailSender javaMailSender;

    @Autowired
    public UserServiceImpl(UserRepository userRepository, JavaMailSender javaMailSender) {
        this.userRepository = userRepository;
        this.javaMailSender = javaMailSender;
    }

    /**
     * Retrieves all users.
     *
     * @return List of User entities.
     * @throws CustomerNotFoundException if an error occurs while retrieving users.
     */
    @Override
    public List<User> getAllUsers() {
        try {
            return userRepository.findAll();
        } catch (Exception e) {
            throw new CustomerNotFoundException("Error while retrieving all users", e);
        }
    }

    /**
     * Retrieves a user by their ID.
     *
     * @param userId The ID of the user to retrieve.
     * @return The User entity if found, otherwise null.
     * @throws CustomerNotFoundException if an error occurs while retrieving the user.
     */
    @Override
    public User getUserById(Long userId) {
        try {
            Optional<User> userOptional = userRepository.findById(userId);
            return userOptional.orElse(null);
        } catch (Exception e) {
            throw new CustomerNotFoundException("Error while retrieving data for Id", e);
        }
    }

    /**
     * Adds a new user.
     *
     * @param user The User entity to be added.
     * @return The added User entity.
     * @throws CustomerNotFoundException if an error occurs while adding the user.
     */
    @Override
    public User addUser(User user) {
        try {
            Cart cart = user.getCart();
            cart.setUser(user);
            user.setCart(cart);
            return userRepository.save(user);
        } catch (Exception e) {
            throw new CustomerNotFoundException("Error while adding a user", e);
        }
    }

    /**
     * Updates an existing user.
     *
     * @param userId       The ID of the user to be updated.
     * @param updatedUser  The updated User entity.
     * @return The updated User entity if the user is found, otherwise null.
     * @throws CustomerNotFoundException if an error occurs while updating the user.
     */
    @Override
    public User updateUser(Long userId, User updatedUser) {
        try {
            Optional<User> userOptional = userRepository.findById(userId);

            if (userOptional.isPresent()) {
                User existingUser = userOptional.get();

                if (updatedUser.getEmail() != null) {
                    existingUser.setEmail(updatedUser.getEmail());
                }

                if (updatedUser.getUsername() != null) {
                    existingUser.setUsername(updatedUser.getUsername());
                }

                List<Address> updatedAddresses = updatedUser.getAddresses();
                if (updatedAddresses != null) {
                   
                    updatedAddresses = updatedAddresses.stream()
                            .filter(address -> address != null)
                            .collect(Collectors.toList());

                   
                    updatedAddresses.forEach(address -> address.setUser(existingUser));

                    existingUser.setAddresses(updatedAddresses);
                }

                return userRepository.save(existingUser);
            }

            return null;
        } catch (Exception e) {
            throw new CustomerNotFoundException("Error while updating user", e);
        }
    }
    
    /**
     * Save Address for particular User One User can Save Many-Addresses
     */
    @Override
    public User saveAddresses(Long userId, List<Address> addresses) {
        try {
            Optional<User> userOptional = userRepository.findById(userId);

            if (userOptional.isPresent()) {
                User existingUser = userOptional.get();

                if (addresses != null) {
                    addresses.forEach(address -> address.setUser(existingUser));
                    existingUser.setAddresses(addresses);

                    return userRepository.save(existingUser);
                }
            }

            return null;
        } catch (Exception e) {
            throw new CustomerNotFoundException("Error while saving addresses", e);
        }
    }
    /**
     * Fetch an Address from Database linking of Addresses. 
     */
    @Override
    public List<Address> getAddresses(Long userId) {
        Optional<User> userOptional = userRepository.findById(userId);

        if (userOptional.isPresent()) {
            User existingUser = userOptional.get();
            return existingUser.getAddresses();
        }

        return Collections.emptyList();
    }


    /**
     * Deletes a user by their ID.
     *
     * @param userId The ID of the user to be deleted.
     * @throws CustomerNotFoundException if an error occurs while deleting the user.
     */
    @Override
    public void deleteUser(Long userId) {
        try {
            userRepository.deleteById(userId);
        } catch (Exception e) {
            throw new CustomerNotFoundException("Error while deleting user", e);
        }
    }

    /**
     * Sends an OTP to the specified email address.
     *
     * @param email The email address to which the OTP will be sent.
     * @return The generated OTP.
     * @throws CustomerNotFoundException if an error occurs while sending the OTP.
     */
    @Override
    public String sendOtp(String email) {
        try {
            if (userRepository.existsByEmail(email)) {
                String otp = generateOtp();
                sendOtpEmail(email, otp);
                return otp;
            } else {
                return null;
            }
        } catch (Exception e) {
            throw new CustomerNotFoundException("Error while sending OTP", e);
        }
    }

    private String generateOtp() {
        Random random = new Random();
        int otpNumber = random.nextInt(9000) + 1000;
        return String.valueOf(otpNumber);
    }

    private void sendOtpEmail(String to, String otp) {
        try {
            SimpleMailMessage message = new SimpleMailMessage();
            message.setTo(to);
            message.setSubject("Your OTP for Registration");
            message.setText("You’re just a step away from accessing your Nykaa account.\r\n"
                    + "Your OTP for login is :\r\n" + otp + "\r\n"
                    + " Please note that this code is valid for 5 minutes and can be used only once. For optimum security, please don’t share your OTP with anyone.\r\n"
                    + "Love,\r\n"
                    + "Team Nykaa ");

            javaMailSender.send(message);
        } catch (Exception e) {
            throw new DuplicateEmailException("Error while sending OTP email");
        }
    }
}
