//package com.example.j2.Controller;
//
//import org.springframework.beans.factory.annotation.Value;
//import org.springframework.boot.CommandLineRunner;
//import org.springframework.data.mongodb.core.MongoTemplate;
//import org.springframework.stereotype.Component;
//
//@Component
//public class startupcheck implements CommandLineRunner {
//
//    private final MongoTemplate mongoTemplate;
//
//    public startupcheck(MongoTemplate mongoTemplate) {
//        this.mongoTemplate = mongoTemplate;
//    }
//
//    @Value("${spring.data.mongodb.uri}")
//    private String uri;
//
//    @Override
//    public void run(String... args) {
//        System.out.println("URI = " + uri);
//        System.out.println("DB = " + mongoTemplate.getDb().getName());
//    }
//}