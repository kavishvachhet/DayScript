package com.example.j2.Controller;


import com.example.j2.Services.WeatherService;
import com.example.j2.Services.userservice;
import com.example.j2.entity.User;
import com.example.j2.entity.Weather_external_api;
import com.example.j2.repo.userrepo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/user")
public class usercontroller {

    @Autowired
    private userservice us;

    @Autowired
    private userrepo u1;

    @Autowired
    private WeatherService ws;

    @GetMapping
    public List<User> getAll(){
        return us.getAll();
    }
    @PutMapping()
    public ResponseEntity<?> updateUser(@RequestBody User user){
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        String username = authentication.getName();
        User userindb = us.findByUsername(username);
//        if(userindb != null){
            userindb.setUsername(user.getUsername());
            userindb.setPassword(user.getPassword());
            us.saveNewEntry(userindb);
//        }
        return new ResponseEntity<>(HttpStatus.NO_CONTENT);
    }

    @DeleteMapping()
    public ResponseEntity<?> deletebyUserId(){
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        u1.deleteByusername(authentication.getName());
        return new ResponseEntity<>(HttpStatus.NO_CONTENT);
    }



    //External API Testing
    //GET request to get weather temperature for particular city
    @GetMapping("/external-api")
    public ResponseEntity<?> check(){
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        Weather_external_api mumbai = ws.getWeather("Mumbai");
        String greet="";
        if(mumbai!=null){
            greet=", Weather feels like " +mumbai.getCurrent().getFeelslike();
        }
        return new ResponseEntity<>("Hi "+authentication.getName()
                + greet, HttpStatus.OK);
    }
//    public R

//    @PutMapping
//    public R
}
