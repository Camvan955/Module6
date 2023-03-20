package com.freshshop.service.impl;

import com.freshshop.entity.account.Role;
import com.freshshop.entity.account.RoleName;
import com.freshshop.repository.IRoleRepository;
import com.freshshop.service.IRoleService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
public class RoleServiceImpl implements IRoleService {
    @Autowired
    private IRoleRepository iRoleRepository;


    @Override
    public Optional<Role> findByName(RoleName name) {
        return iRoleRepository.findByName(name);
    }
}
