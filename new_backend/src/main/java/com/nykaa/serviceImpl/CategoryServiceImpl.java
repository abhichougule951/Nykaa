package com.nykaa.serviceImpl;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.nykaa.entities.Category;
import com.nykaa.exception.NotFoundException;
import com.nykaa.repository.CategoryRepository;
import com.nykaa.service.CategoryService;

import java.util.List;

@Service
public class CategoryServiceImpl implements CategoryService {

    private final CategoryRepository categoryRepository;

    @Autowired
    public CategoryServiceImpl(CategoryRepository categoryRepository) {
        this.categoryRepository = categoryRepository;
    }

    /**
     * Retrieve all categories.
     *
     * @return List of categories
     */
    @Override
    public List<Category> getAllCategories() {
        return categoryRepository.findAll();
    }

    /**
     * Retrieve a category by its ID.
     *
     * @param id The ID of the category to retrieve
     * @return The category with the given ID
     * @throws NotFoundException if the category is not found
     */
    @Override
    public Category getCategoryById(Long id) {
        return categoryRepository.findById(id)
                .orElseThrow(() -> new NotFoundException("Category not found with id: " + id));
    }

    /**
     * Create a new category.
     *
     * @param category The category to create
     * @return The created category
     */
    @Override
    public Category createCategory(Category category) {
        return categoryRepository.save(category);
    }

    /**
     * Update an existing category by its ID.
     *
     * @param id       The ID of the category to update
     * @param category The updated category information
     * @return The updated category
     * @throws NotFoundException if the category is not found
     */
    @Override
    public Category updateCategory(Long id, Category category) {
        Category existingCategory = getCategoryById(id);
        existingCategory.setId(id);
        return categoryRepository.save(existingCategory);
    }

    /**
     * Delete a category by its ID.
     *
     * @param id The ID of the category to delete
     * @throws NotFoundException if the category is not found
     */
    @Override
    public void deleteCategory(Long id) {
        Category category = getCategoryById(id);
        categoryRepository.delete(category);
    }
}
