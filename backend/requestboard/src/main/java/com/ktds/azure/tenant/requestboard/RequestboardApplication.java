package com.ktds.azure.tenant.requestboard;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.autoconfigure.security.servlet.SecurityAutoConfiguration;

@SpringBootApplication(exclude = SecurityAutoConfiguration.class)
public class RequestboardApplication {

	public static void main(String[] args) {
		SpringApplication.run(RequestboardApplication.class, args);
	}

}
