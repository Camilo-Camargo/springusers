package com.learn.springusers;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.Bean;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.cors.CorsConfiguration;
import org.springframework.web.cors.UrlBasedCorsConfigurationSource;
import org.springframework.web.filter.CorsFilter;

@SpringBootApplication
public class SpringUsersApplication {

	public static void main(String[] args) {
		SpringApplication.run(SpringUsersApplication.class, args);
	}

	@RequestMapping("/")
	public String forward() {
		return "";
	}

	@Bean
	public CorsFilter corsFilter() {
		CorsConfiguration config = new CorsConfiguration();
		config.addAllowedOrigin("*"); // Allow all origins
		config.addAllowedHeader("*"); // Allow all headers
		config.addAllowedMethod("*"); // Allow all methods

		UrlBasedCorsConfigurationSource source = new UrlBasedCorsConfigurationSource();
		source.registerCorsConfiguration("/**", config);
		
		return new CorsFilter(source);
	}
}
