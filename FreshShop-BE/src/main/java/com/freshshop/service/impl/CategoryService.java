package com.freshshop.service.impl;

import com.freshshop.entity.product.Category;
import com.freshshop.repository.ICategoryRepository;
import com.freshshop.service.ICategoryService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class CategoryService implements ICategoryService {
    @Autowired
    private ICategoryRepository categoryRepository;

    @Override
    public List<Category> categoryList() {
        return categoryRepository.findAll();
    }
}
