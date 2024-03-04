package com.nykaa.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.nykaa.entities.Address;
@Repository
public interface AddressRepository extends JpaRepository<Address, Long>{

}
