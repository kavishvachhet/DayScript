package com.example.j2.Services;


import com.example.j2.entity.Weather_external_api;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.redis.core.RedisTemplate;
import org.springframework.stereotype.Service;
import tools.jackson.core.JacksonException;
import tools.jackson.databind.ObjectMapper;

import java.util.concurrent.TimeUnit;

@Service
@Slf4j
public class RedisService {

    @Autowired
    private RedisTemplate redisTemplate;

    public <T> T get(String key, Class<T> entity){
        try {
            Object o = redisTemplate.opsForValue().get(key);
            if (o == null) return null;
            ObjectMapper mapper = new ObjectMapper();
            return mapper.readValue(o.toString(),entity);
        } catch (Exception e) {
            log.error("Exception : ",e);
            return  null;
//            throw new RuntimeException(e);
        }

    }

    public void set(String key,Object o,Long ttl){
        try {
            ObjectMapper mapper = new ObjectMapper();
            String jsonValue = mapper.writeValueAsString(o);
            redisTemplate.opsForValue().set(key,jsonValue,ttl, TimeUnit.SECONDS);
        } catch (Exception e) {
            log.error("Exception : ",e);
//            return  null;
//            throw new RuntimeException(e);
        }

    }

}
