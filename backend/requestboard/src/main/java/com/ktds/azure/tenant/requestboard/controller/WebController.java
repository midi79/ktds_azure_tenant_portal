package com.ktds.azure.tenant.requestboard.controller;

import org.springframework.boot.web.servlet.error.ErrorController;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;

@Controller
public class WebController implements ErrorController {

    @GetMapping({
            "/dash/**"
    })

    public String index() {
        return "index.html";
    }
}
