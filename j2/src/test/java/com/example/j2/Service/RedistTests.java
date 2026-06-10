package com.example.j2.Service;


import org.junit.jupiter.api.Disabled;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.data.redis.core.RedisTemplate;

@SpringBootTest
public class RedistTests {

    @Autowired
    private RedisTemplate redisTemplate;


    @Disabled
    @Test
    void redischeck(){

        //Testing Local Redis working or not
        //Using Debugger
        redisTemplate.opsForValue().set("email","gmail@email.com");

        Object email = redisTemplate.opsForValue().get("email");

        //Serialization and Deserialization of redisTemplate


        Object salary = redisTemplate.opsForValue().get("salary");


        int a=1;
    }

}
