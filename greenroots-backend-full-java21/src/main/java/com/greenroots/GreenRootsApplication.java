package com.greenroots;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.autoconfigure.domain.EntityScan;
import org.springframework.data.jpa.repository.config.EnableJpaRepositories;

@EntityScan(basePackages = "com.greenroots.model")
@EnableJpaRepositories(basePackages = "com.greenroots.repository")

@SpringBootApplication
public class GreenRootsApplication {
    public static void main(String[] args) {
        SpringApplication.run(GreenRootsApplication.class, args);
    }
}
