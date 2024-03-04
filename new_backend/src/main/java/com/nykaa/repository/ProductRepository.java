package com.nykaa.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import com.nykaa.entities.Product;
@Repository
public interface ProductRepository extends JpaRepository<Product, Long>{
	@Query(value = "SELECT * FROM Product p WHERE LOWER(CAST(p.description AS NVARCHAR(MAX))) LIKE %:searchTerm%", nativeQuery = true)
	List<Product> findByDescriptionContainingIgnoreCase(@Param("searchTerm") String searchTerm);
	

}
