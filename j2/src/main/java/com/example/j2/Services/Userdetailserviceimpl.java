package com.example.j2.Services;

import com.example.j2.entity.User;
import com.example.j2.repo.userrepo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Component;


@Component
public class Userdetailserviceimpl implements UserDetailsService {

    @Autowired
    private userrepo u1;

    @Override
    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
        User user = u1.findByusername(username);

        if(user!=null){
            UserDetails userDetails = org.springframework.security.core.userdetails.User.builder().
                    username(user.getUsername()).password(user.getPassword())
                    .roles(user.getRoles().toArray(new String[0])).build();
            return  userDetails;
        }
        throw  new UsernameNotFoundException("User Not Found "+username);
//        return null;
    }
}
