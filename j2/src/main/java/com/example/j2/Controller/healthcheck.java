package com.example.j2.Controller;

import com.example.j2.Services.journalentryservice;
import com.example.j2.entity.journalentry;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;


@RestController
public class healthcheck {

    @Autowired
    private journalentryservice jes;

    @GetMapping("/test")
    public String test() {
        // jes.saveEntry(j);
        return "Backend Running on port 8080";
    }
}
