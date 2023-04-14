package com.learn.sprintusers;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.web.bind.annotation.RequestMapping;

@SpringBootApplication
public class SprintUsersApplication {

	public static void main(String[] args) {
		SpringApplication.run(SprintUsersApplication.class, args);
	}

	@RequestMapping("/")
	public String index() {
		return "";
	}
}
