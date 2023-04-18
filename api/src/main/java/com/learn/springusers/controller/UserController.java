package com.learn.springusers.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.bind.annotation.RequestMethod;

import com.learn.springusers.model.User;
import com.learn.springusers.services.UserService;

@RestController
public class UserController{
	@Autowired
	private UserService userService;

	@GetMapping
	@RequestMapping(value = "create", method = RequestMethod.POST)
	public void create(@RequestBody User user){
		this.userService.createUser(user);
	}

	@GetMapping
	@RequestMapping(value = "login", method = RequestMethod.GET)
	public ResponseEntity<User> login(@RequestBody User user){
		User user2 = userService.loginUser(user);
		return ResponseEntity.status(HttpStatus.CREATED).body(user2);
	}
}
