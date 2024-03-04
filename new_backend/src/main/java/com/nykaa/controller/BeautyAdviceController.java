package com.nykaa.controller;


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

import com.nykaa.entities.BeautyAdvice;
import com.nykaa.entities.Product;
import com.nykaa.service.BeautyAdviceService;
import com.nykaa.service.ProductService;
import java.util.List;

@RestController
@RequestMapping("/api/beauty-advice")
@CrossOrigin(origins = "*")
public class BeautyAdviceController {

    private final BeautyAdviceService beautyAdviceService;
    private final ProductService productService;

    @Autowired
    public BeautyAdviceController(BeautyAdviceService beautyAdviceService, ProductService productService) {
        this.beautyAdviceService = beautyAdviceService;
        this.productService = productService;
    }

  

    @PostMapping("/add")
    public ResponseEntity<BeautyAdvice> addBeautyAdvice(
            @RequestBody BeautyAdvice beautyAdvice,
            @RequestParam("product_id") Long productId) {

       
        Product product = productService.getProductById(productId);

       
        beautyAdvice.setProduct(product);

        BeautyAdvice savedBeautyAdvice = beautyAdviceService.saveFormData(beautyAdvice);
        return new ResponseEntity<>(savedBeautyAdvice, HttpStatus.CREATED);
    }
  

//    @GetMapping("/by-skin-type/{skinType}")
//    public List<Product> getProductsBySkinType(@PathVariable String skinType) {
//        return beautyAdviceService.getProductsBySkinType(skinType);
//    }
//    @GetMapping("/by-skin-type/{productType}")
//    public List<Product> getProductsByProductType(@PathVariable String productType) {
//        return beautyAdviceService.getProductsBySkinType(productType);
//    }

    
}