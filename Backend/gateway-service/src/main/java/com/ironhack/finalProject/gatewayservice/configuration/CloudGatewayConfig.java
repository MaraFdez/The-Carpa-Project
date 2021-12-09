package com.ironhack.finalProject.gatewayservice.configuration;

import org.springframework.cloud.gateway.route.RouteLocator;
import org.springframework.cloud.gateway.route.builder.RouteLocatorBuilder;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.web.bind.annotation.CrossOrigin;

@Configuration
public class CloudGatewayConfig {

    @Bean
    public RouteLocator gatewayRouter(RouteLocatorBuilder builder){
        return builder.routes()
                        .route(p -> p.path("/file/**")
                                .uri("lb://file-service"))
                        .route(p -> p.path("/details/**")
                                .uri("lb://detail-service"))
                        .route(p -> p.path("/catalog/**")
                                .uri("lb://catalog-service"))
                        .route(p -> p.path("/user/**")
                                .uri("lb://user-service"))
                        .route(p -> p.path("/payment/**")
                                .uri("lb://payment-service"))
                        .build();
    }

}
