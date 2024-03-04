package com.nykaa.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.nykaa.entities.ReturnProduct;
@Repository
public interface ReturnRepository extends JpaRepository<ReturnProduct, Long>{

}
