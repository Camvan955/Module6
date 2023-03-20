package com.freshshop.service;

import com.freshshop.entity.account.Account;

import java.util.Optional;

public interface IAccountService {
    Optional<Account> findByUsername(String username);


    Boolean existsAccountByUsername(String username);

    Boolean existsAccountByEmail( String email);

    void save(Account account);

}
