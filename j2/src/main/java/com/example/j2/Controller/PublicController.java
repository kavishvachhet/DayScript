package com.example.j2.Controller;


import com.example.j2.Services.Userdetailserviceimpl;
import com.example.j2.Services.userservice;
import com.example.j2.Utils.JwtUtils;
import com.example.j2.entity.User;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/public")
@Slf4j
public class PublicController {

    @Autowired
    private AuthenticationManager authenticationManager;

    @Autowired
    private Userdetailserviceimpl userdetailserviceimpl;

    @Autowired
    private JwtUtils jwtUtils;

    @Autowired
    private userservice us;
//    @GetMapping("/")
    @PostMapping("/create-user")
    public void createuser(@RequestBody User user){
        us.saveNewEntry(user);
    }

    @PostMapping("/signup")
    public void Creteuser(@RequestBody User user){

    }

    @PostMapping("/login")
    public ResponseEntity<String> loginuser(@RequestBody User user){
        try{
            authenticationManager.authenticate(new UsernamePasswordAuthenticationToken(
                    user.getUsername(),user.getPassword()
            ));
            UserDetails userDetails = userdetailserviceimpl.loadUserByUsername(user.getUsername());
            String jwt = jwtUtils.generateToken(userDetails.getUsername());
            return new ResponseEntity<>(jwt, HttpStatus.OK);
        }catch (Exception e){
            log.error("Exception occured while createAuthentication Token", e);
            return new ResponseEntity<>("Incorrect Username or Password",
                    HttpStatus.BAD_REQUEST);
        }
//        return null;
    }
}
