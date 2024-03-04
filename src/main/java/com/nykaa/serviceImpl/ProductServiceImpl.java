package com.nykaa.serviceImpl;

import java.util.List;
import java.util.stream.Collectors;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.nykaa.entities.BeautyAdvice;
import com.nykaa.entities.Product;
import com.nykaa.exception.BeautyAdviceException;
import com.nykaa.exception.NotFoundException;
import com.nykaa.exception.ProductNotFoundException;
import com.nykaa.repository.BeautyAdviceRepository;
import com.nykaa.repository.ProductRepository;
import com.nykaa.service.ProductService;

@Service
public class ProductServiceImpl implements ProductService {

    @Autowired
    private ProductRepository productRepository;
    
    @Autowired
    private BeautyAdviceRepository beautyAdviceRepository;
    
    
    /**
     * Fetch all products from Database.
     */
    @Override
    public List<Product> getAllProducts() {
        return productRepository.findAll();
    }

    /**
     * Get product by Id from Database.
     */
    @Override
    public Product getProductById(Long productId) {
        return productRepository.findById(productId)
                .orElseThrow(() -> new ProductNotFoundException("Product not found with id: " + productId));
    }
    
    /**
     * Add new Product in Database.
     */

    @Override
    public Product addProduct(Product product) {
        
        return productRepository.save(product);
    }
    /**
     * If product already exists then Update an existing product 
     */
    @Override
    public Product updateProduct(Long productId, Product updatedProduct) {
        Product existingProduct = getProductById(productId);

    
        existingProduct.setName(updatedProduct.getName());
        existingProduct.setBrand(updatedProduct.getBrand());
        existingProduct.setDescription(updatedProduct.getDescription());
        existingProduct.setPrice(updatedProduct.getPrice());
        existingProduct.setCategory(updatedProduct.getCategory());

        return productRepository.save(existingProduct);
    }
    /**
     * Delete a product based on provided Product_id
     */
    @Override
    public void deleteProduct(Long productId) {
        Product product = getProductById(productId);
        productRepository.delete(product);
    }
    
    /**
     * Search product matches with Term("searched term in search Term")
     */
    
    @Override
    public List<Product> searchProducts(String searchTerm) {
        searchTerm = searchTerm.toLowerCase(); 

        return productRepository.findByDescriptionContainingIgnoreCase(searchTerm);
    }
    
    /**
     * Fetch all product related to given skinType,productType
     */
    @Override
    public List<Product> getProductsBySkinTypeAndProductType(String skinType, String productType) {
        try {
            List<BeautyAdvice> beautyAdvices = beautyAdviceRepository.findBySkinTypeAndProductType(skinType, productType);

            // Assuming BeautyAdvice has a 'product' property representing the associated product
            List<Product> products = beautyAdvices.stream()
                    .map(BeautyAdvice::getProduct)
                    .collect(Collectors.toList());

            return products;
        } 
            // Log the exception or rethrow a custom exception
            // log.error("Error while retrieving products by skin type and product type: " + skinType + ", " + productType, e);
        	catch (Exception e) {
                throw new ProductNotFoundException("Error retrieving products by skin type and product type", e);
            }
        
    }
}