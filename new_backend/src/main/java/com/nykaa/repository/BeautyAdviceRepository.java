package com.nykaa.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import com.nykaa.entities.BeautyAdvice;
import com.nykaa.entities.Product;


public interface BeautyAdviceRepository extends JpaRepository<BeautyAdvice, Long> {
	List<BeautyAdvice> findBySkinType(String skinType);
//	
//	 @Query(value = "SELECT DISTINCT p.* FROM product p " +
//	            "JOIN beauty_advice b ON p.id = b.product_id " +
//	            "WHERE (:skinType IS NULL OR b.skin_type = :skinType) " +
//	            "AND (:sensitive IS NULL OR b.sensitive = :sensitive) " +
//	            "AND (:acneProne IS NULL OR b.acne_prone = :acneProne) " +
//	            "AND (:aging IS NULL OR b.aging = :aging) " +
//	            "AND (:skinTone IS NULL OR b.skin_tone = :skinTone) " +
//	            "AND (:productType IS NULL OR b.product_type = :productType) " +
//	            "AND (:sensitive = TRUE OR :acneProne = TRUE OR :aging = TRUE)",
//	            nativeQuery = true)

	List<BeautyAdvice> findBySkinTypeAndProductType(String skinType, String productType);
	
}
