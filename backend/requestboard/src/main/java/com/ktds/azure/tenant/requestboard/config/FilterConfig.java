package com.ktds.azure.tenant.requestboard.config;

import com.ktds.azure.tenant.requestboard.util.JwtExtractionFilter;
import org.springframework.boot.web.servlet.FilterRegistrationBean;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

@Configuration
public class FilterConfig {

    @Bean
    public FilterRegistrationBean<JwtExtractionFilter> jwtExtractionFilter() {
        FilterRegistrationBean<JwtExtractionFilter> registrationBean = new FilterRegistrationBean<>();
        registrationBean.setFilter(new JwtExtractionFilter());
        registrationBean.addUrlPatterns("/*"); // Apply to all URLs
        return registrationBean;
    }
}