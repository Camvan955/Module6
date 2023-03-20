package com.freshshop.repository;

import com.freshshop.entity.account.Role;
import com.freshshop.entity.account.RoleName;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface IRoleRepository extends JpaRepository<Role, Integer> {
    Optional<Role> findByName(RoleName name);
}
