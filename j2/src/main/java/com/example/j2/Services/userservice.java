package com.example.j2.Services;


import com.example.j2.entity.User;
import com.example.j2.repo.userrepo;
import org.bson.types.ObjectId;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Component;

import java.util.Arrays;
import java.util.List;
import java.util.Optional;

@Component
public class userservice {

    @Autowired
    private  userrepo repo;

    private static final PasswordEncoder pass = new BCryptPasswordEncoder();

    public void saveNewEntry(User user) {
        user.setPassword(pass.encode(user.getPassword()));
        user.setRoles(Arrays.asList("USER"));
        repo.save(user);
    }

    public void saveEntry(User user) {
        repo.save(user);
    }

    public List<User> getAll(){
        return repo.findAll();
    }

    public Optional<User> findbyId(ObjectId id) {
        return repo.findById(id);
    }

    public void deletebyid(ObjectId id){
        repo.deleteById(id);
    }

    public User findByUsername(String username){
        return repo.findByusername(username);
    }

    public void saveAdmin(User user) {
        user.setPassword(pass.encode(user.getPassword()));
        user.setRoles(Arrays.asList("USER","ADMIN"));
        repo.save(user);
    }
}
