package com.example.j2.Controller;

import org.springframework.data.mongodb.core.MongoTemplate;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;


@RestController
public class check2 {
    private final MongoTemplate mongoTemplate;

    public check2(MongoTemplate mongoTemplate) {
        this.mongoTemplate = mongoTemplate;
    }

    @GetMapping("/dbinfo")
    public String dbInfo() {
        return mongoTemplate.getDb().getName();
    }
}
