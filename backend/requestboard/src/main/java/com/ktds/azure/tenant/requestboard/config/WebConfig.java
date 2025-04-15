package com.ktds.azure.tenant.requestboard.config;

import org.springframework.context.annotation.Configuration;
import org.springframework.web.servlet.config.annotation.CorsRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

@Configuration
public class WebConfig implements WebMvcConfigurer {
    @Override
    public void addCorsMappings(CorsRegistry registry) {
        registry.addMapping("/dash/api/**")
                .allowedOrigins("http://localhost:3000", "https://atportal.cbiz.kubepia.net", "https://atportal-dev.cbiz.kubepia.net")
                .allowedMethods("GET", "POST", "PUT", "DELETE", "PATCH")
                .allowedHeaders("*")
                .allowCredentials(true);

        registry.addMapping("/qna/api/**")
                .allowedOrigins("http://localhost:3000", "https://atportal.cbiz.kubepia.net", "https://atportal-dev.cbiz.kubepia.net")
                .allowedMethods("GET", "POST", "PUT", "DELETE", "PATCH")
                .allowedHeaders("*")
                .allowCredentials(true);
    }
}
