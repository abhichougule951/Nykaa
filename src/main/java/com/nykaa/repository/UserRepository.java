package com.nykaa.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.nykaa.dto.UserDTO;
import com.nykaa.entities.User;
@Repository
public interface UserRepository extends JpaRepository<User, Long>{
	 boolean existsByEmail(String email);

}
