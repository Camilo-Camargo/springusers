package com.learn.springusers.repositories;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import com.learn.springusers.model.User;

public interface UserRepository extends JpaRepository<User, Long> {
	@Query("SELECT u FROM User u WHERE u.username = :username AND u.password = :password")
	User findUserByUsernameAndPassword(
			@Param("username") String username,
			@Param("password") String password
			);
}
