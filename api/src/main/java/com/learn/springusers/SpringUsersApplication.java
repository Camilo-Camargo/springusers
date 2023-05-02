package com.learn.springusers;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.web.bind.annotation.RequestMapping;

@SpringBootApplication
public class SpringUsersApplication {

	public static void main(String[] args) {
		SpringApplication.run(SpringUsersApplication.class, args);
	}

	@RequestMapping("/")
	public String forward() {
		return "";
	}
}
