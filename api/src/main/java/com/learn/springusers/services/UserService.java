package com.learn.springusers.services;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.learn.springusers.model.User;
import com.learn.springusers.repositories.UserRepository;

@Service
public class UserService implements IUser {
	@Autowired
	private UserRepository userRepository;

	@Override
	public User createUser(User user) {
		return this.userRepository.save(user);
	}

	@Override
	public void deleteUser(User user) {
		this.userRepository.delete(user);
	}

	@Override
	public User loginUser(User user) {
		return (User) this.userRepository.findById(user.id).get();
	}
}
