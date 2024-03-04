package com.nykaa.serviceImpl;

import java.util.List;
import java.util.stream.Collectors;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.nykaa.entities.BeautyAdvice;
import com.nykaa.entities.Product;
import com.nykaa.exception.BeautyAdviceException;
import com.nykaa.repository.BeautyAdviceRepository;
import com.nykaa.service.BeautyAdviceService;

@Service
public class BeautyAdviceServiceImpl implements BeautyAdviceService {

    // SLF4J logger for logging messages
    private static final Logger log = LoggerFactory.getLogger(BeautyAdviceServiceImpl.class);

    private final BeautyAdviceRepository repository;

    @Autowired
    public BeautyAdviceServiceImpl(BeautyAdviceRepository repository) {
        this.repository = repository;
    }

    /**
     * Retrieve all data from the database.
     * 
     * @return List of BeautyAdvice objects.
     */
    @Override
    public List<BeautyAdvice> getAllFormData() {
        try {
            return repository.findAll();
        } catch (Exception e) {
            // Log the exception and rethrow a custom exception
            log.error("Error while retrieving all beauty advice data", e);
            throw new BeautyAdviceException("Error while retrieving all beauty advice data", e);
        }
    }

    /**
     * Retrieve the object of BeautyAdvice based on the provided ID.
     * 
     * @param id The ID of the BeautyAdvice object to retrieve.
     * @return BeautyAdvice object or null if not found.
     */
    @Override
    public BeautyAdvice getFormDataById(Long id) {
        try {
            return repository.findById(id).orElse(null);
        } catch (Exception e) {
            // Log the exception and rethrow a custom exception
            log.error("Error while retrieving beauty advice data by ID: " + id, e);
            throw new BeautyAdviceException("Error while retrieving beauty advice data by ID: " + id, e);
        }
    }

    /**
     * Save a BeautyAdvice object.
     * 
     * @param formData The BeautyAdvice object to be saved.
     * @return Saved BeautyAdvice object.
     */
    @Override
    public BeautyAdvice saveFormData(BeautyAdvice formData) {
        try {
            return repository.save(formData);
        } catch (Exception e) {
            // Log the exception and rethrow a custom exception
            log.error("Error while saving beauty advice data", e);
            throw new BeautyAdviceException("Error while saving beauty advice data", e);
        }
    }

    /**
     * Retrieve all products by the provided skin type.
     * 
     * @param skinType    The skin type for filtering products.
     * @param productType The product type for filtering products.
     * @return List of Product objects associated with the given skin type and product type.
     */
    @Override
    public List<Product> getProductsBySkinTypeAndProductType(String skinType, String productType) {
        try {
            List<BeautyAdvice> beautyAdvices = repository.findBySkinTypeAndProductType(skinType, productType);

            // Assuming BeautyAdvice has a 'product' property representing the associated product
            List<Product> products = beautyAdvices.stream()
                    .map(BeautyAdvice::getProduct)
                    .collect(Collectors.toList());

            return products;
        } catch (Exception e) {
            // Log the exception and rethrow a custom exception
            log.error("Error while retrieving products by skin type and product type: " + skinType + ", " + productType, e);
            throw new BeautyAdviceException("Error while retrieving products by skin type and product type: " + skinType + ", " + productType, e);
        }
    }
}
