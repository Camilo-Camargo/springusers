package com.learn.springusers.repositories;

import org.springframework.data.repository.CrudRepository;

import com.learn.springusers.model.User;

public interface UserRepository extends CrudRepository<User, Long> {
}
