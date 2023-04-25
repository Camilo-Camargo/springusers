package com.learn.springusers.services;

import com.learn.springusers.model.User;

public interface IUser{
	public User loginUser(String username, String password);
	public User createUser(User user);
	public void deleteUser(User user);
}
