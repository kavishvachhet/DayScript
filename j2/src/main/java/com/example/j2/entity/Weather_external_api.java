package com.example.j2.entity;

import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.Data;

import java.util.List;

@Data
public class Weather_external_api {

    private Location location;
    private Current current;

    @Data
    public static class Location {
        private String name;
        private String country;
    }

    @Data
    public static class Current {
        private int temperature;

        @JsonProperty("weather_descriptions")
        private List<String> weatherDescriptions;

        private int humidity;
        private int feelslike;
    }
}