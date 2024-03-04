package com.nykaa.service;

import java.util.List;

import com.nykaa.entities.BeautyAdvice;
import com.nykaa.entities.Product;

public interface BeautyAdviceService {

    List<BeautyAdvice> getAllFormData();

    BeautyAdvice getFormDataById(Long id);

    BeautyAdvice saveFormData(BeautyAdvice formData);
    
    
    
    List<Product> getProductsBySkinTypeAndProductType(String skinType, String productType);

}

