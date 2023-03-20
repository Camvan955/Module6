package com.freshshop.service.impl;

import com.freshshop.entity.account.Account;
import com.freshshop.repository.IAccountRepository;
import com.freshshop.service.IAccountService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
public class AccountServiceImpl implements IAccountService {
    @Autowired
    private IAccountRepository iAccountRepository;

    /**
     * Created by: SyTV
     * Date created: 27/02/2023
     *
     * @param username
     * @return account
     */
    @Override
    public Optional<Account> findByUsername(String username) {
        return iAccountRepository.findByUsername(username);
    }

    @Override
    public Boolean existsAccountByUsername(String username) {
        return iAccountRepository.existsAccountByUsername(username);
    }

    @Override
    public Boolean existsAccountByEmail(String email) {
        return iAccountRepository.existsAccountByEmail(email);
    }

    @Override
    public void save(Account account) {
        iAccountRepository.save(account);
    }

}
