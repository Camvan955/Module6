package com.freshshop.service.impl;

import com.freshshop.repository.ICategoryRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class CategoryServiceImpl {
    @Autowired
    private ICategoryRepository categoryRepository;
}
