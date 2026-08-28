package com.sih.schemematcher;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

@SpringBootApplication
public class SchemeMatcherApplication {

    public static void main(String[] args) {
        SpringApplication.run(SchemeMatcherApplication.class, args);
        if (request == null || request.getState() == null) {
    throw new IllegalArgumentException("Invalid recommendation request parameters.");
}
    }
}
