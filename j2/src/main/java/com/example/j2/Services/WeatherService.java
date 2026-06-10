package com.example.j2.Services;

import com.example.j2.AppCache.appcache;
import com.example.j2.Constants.Placeholders;
import com.example.j2.entity.Weather_external_api;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpMethod;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Component;
import org.springframework.web.client.RestTemplate;

@Component
public class WeatherService {

    @Value("${weather.api.key}")
    private String API_KEY;

    @Autowired
    private RestTemplate restTemplate;

    @Autowired
    private appcache cac;


    @Autowired
    private RedisService redisService;

//    private static final String API =
//            "http://api.weatherstack.com/current?access_key=API_KEY&query=CITY";

    public Weather_external_api getWeather(String city) {

//        String url = API.replace("CITY", city)
//                .replace("API_KEY", API_KEY);
        Weather_external_api weatheresponse = redisService.get("weather_of" + city, Weather_external_api.class);

        if(weatheresponse!=null){
            return weatheresponse;
        }else{


//            System.out.println("API_KEY = " + API_KEY);
//            System.out.println("Template = " + cac.cache.get("weather_api"));
//            System.out.println("CITY Placeholder = " + Placeholders.CITY);
//            System.out.println("API Placeholder = " + Placeholders.API_KEY);
//            String url = cac.cache.get("weather_api")
//                    .replace(Placeholders.CITY, city)
//                    .replace(Placeholders.API_KEY, API_KEY);

            String url = "http://api.weatherstack.com/current?access_key=<apikey>&query=<city>"
                    .replace("<apikey>", API_KEY)
                    .replace("<city>", city);

            System.out.println(url);

            try {
                ResponseEntity<Weather_external_api> response =
                        restTemplate.exchange(
                                url,
                                HttpMethod.GET,
                                null,
                                Weather_external_api.class
                        );

                Weather_external_api body = response.getBody();
                if(body!=null) {
                    redisService.set("weather_of" + city, body, 300L);
                }
                return body;
            } catch (Exception e) {
                System.out.println("Weather API error (rate limit exceeded or offline): " + e.getMessage());
                return null;
            }
        }
    }
}