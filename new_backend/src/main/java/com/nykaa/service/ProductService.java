package com.nykaa.service;

import java.util.List;

import com.nykaa.entities.Product;

public interface ProductService {

    List<Product> getAllProducts();

    Product getProductById(Long productId);

    Product addProduct(Product product);

    Product updateProduct(Long productId, Product updatedProduct);

    void deleteProduct(Long productId);
    
    List<Product> searchProducts(String searchTerm);

    List<Product> getProductsBySkinTypeAndProductType(String skinType, String productType);

	
}