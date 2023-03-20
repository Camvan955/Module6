package com.freshshop.service;

import com.freshshop.entity.account.Role;
import com.freshshop.entity.account.RoleName;

import java.util.Optional;

public interface IRoleService {
    Optional<Role> findByName(RoleName name);
}
