package com.nykaa;

import org.springframework.boot.SpringApplication;

import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.scheduling.annotation.EnableScheduling;

@SpringBootApplication
@EnableScheduling
public class NykaaApplication {

	public static void main(String[] args) {
		SpringApplication.run(NykaaApplication.class, args);
	}

}
