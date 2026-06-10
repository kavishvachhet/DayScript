package com.example.j2.AppCache;

import com.example.j2.entity.ConfigJournalAppEntity;
import com.example.j2.repo.ConfigJournalApp;
import jakarta.annotation.PostConstruct;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import java.util.HashMap;
import java.util.List;
import java.util.Map;


@Component
public class appcache {

    @Autowired
    private ConfigJournalApp configJournalApprepo;

    public Map<String,String> cache = new HashMap<>();

    @PostConstruct
    public void init() {
        System.out.println("AppCache init running");

        cache = new HashMap<>();

        List<ConfigJournalAppEntity> all = configJournalApprepo.findAll();

        System.out.println("Records found: " + all.size());

        for (ConfigJournalAppEntity entity : all) {
            System.out.println(entity.getKey() + " -> " + entity.getValue());
            cache.put(entity.getKey(), entity.getValue());
        }

        System.out.println(cache);
    }

}
