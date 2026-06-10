package com.example.j2.Controller;


import com.example.j2.AppCache.appcache;
import com.example.j2.Services.userservice;
import com.example.j2.entity.User;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/admin")
public class Admincontroller {


    @Autowired
    private userservice us;
    @Autowired
    private appcache appcache;

    @GetMapping("/all-users")
    public ResponseEntity<?> getAllusers(){
        List<User> all = us.getAll();
        if(all != null && !all.isEmpty()){
            return new ResponseEntity<>(all, HttpStatus.OK);
        }
        return new ResponseEntity<>(HttpStatus.NOT_FOUND);
    }

    @PostMapping("/create-admin-user")
    public void createuser(@RequestBody User user){
        us.saveAdmin(user);

    }

    @GetMapping("/clear-cache")
    public String clearappcache(){
        appcache.init();
        return "Cleared Cached and Got New Ones For you...";
    }
}
