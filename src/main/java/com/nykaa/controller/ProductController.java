package com.nykaa.controller;

import java.util.Collections;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.nykaa.entities.Product;
import com.nykaa.exception.NotFoundException;
import com.nykaa.exception.ProductNotFoundException;
import com.nykaa.service.BeautyAdviceService;
import com.nykaa.service.ProductService;


@RestController
@RequestMapping("/api/products")
@CrossOrigin(origins = "*")
public class ProductController {

    @Autowired
    private ProductService productService;

    @Autowired
    private BeautyAdviceService beautyAdviceService;

    @GetMapping
    public List<Product> getAllProducts() {
        try {
            return productService.getAllProducts();
        } catch (Exception e) {
            handleException(e);
            return Collections.emptyList(); // or null, depending on your requirements
        }
    }

    @GetMapping("/{productId}")
    public ResponseEntity<Object> getProductById(@PathVariable Long productId) {
        try {
            Product product = productService.getProductById(productId);
            return ResponseEntity.ok(product);
        } catch (Exception e) {
            handleException(e);
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Error retrieving product");
        }
    }

    @PostMapping
    public ResponseEntity<Object> addProduct(@RequestBody Product product) {
        try {
            Product addedProduct = productService.addProduct(product);
            return ResponseEntity.status(HttpStatus.CREATED).body(addedProduct);
        } catch (Exception e) {
            handleException(e);
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Error adding product");
        }
    }

    @PutMapping("/{productId}")
    public ResponseEntity<Object> updateProduct(@PathVariable Long productId, @RequestBody Product updatedProduct) {
        try {
            Product product = productService.updateProduct(productId, updatedProduct);
            return ResponseEntity.ok(product);
        } catch (Exception e) {
            handleException(e);
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Error updating product");
        }
    }

    @DeleteMapping("/{productId}")
    public ResponseEntity<String> deleteProduct(@PathVariable Long productId) {
        try {
            productService.deleteProduct(productId);
            return ResponseEntity.ok("Product deleted successfully");
        } catch (Exception e) {
            handleException(e);
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Error deleting product");
        }
    }

    @GetMapping("/searchByTerm")
    public ResponseEntity<Object> searchProducts(@RequestParam String searchTerm) {
        try {
            List<Product> products = productService.searchProducts(searchTerm);
            return ResponseEntity.ok(products);
        } catch (Exception e) {
            handleException(e);
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Error searching products");
        }
    }

    @GetMapping("/by-skin-type-and-product-type")
    public ResponseEntity<List<Product>> getProductsBySkinTypeAndProductType(
            @RequestParam("skinType") String skinType,
            @RequestParam("productType") String productType) {
        try {
            List<Product> products = productService.getProductsBySkinTypeAndProductType(skinType, productType);
            return new ResponseEntity<>(products, HttpStatus.OK);
        } catch (ProductNotFoundException e) {
           
            handleProductServiceException(e);
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(Collections.emptyList());
        } 
    }



    
    private void handleProductServiceException(ProductNotFoundException e) {
        
        e.printStackTrace();
    }






    
    private void handleException(Exception e) {
        e.printStackTrace(); 
    }
}
