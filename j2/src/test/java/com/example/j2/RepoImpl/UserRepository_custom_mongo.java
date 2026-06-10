package com.example.j2.RepoImpl;


import com.example.j2.repo.UserImpl_custom_mongo;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;

@SpringBootTest
public class UserRepository_custom_mongo {

    @Autowired
    private UserImpl_custom_mongo userImplCustomMongo;


    @Test
    public void testcustom_mongoquery(){
        userImplCustomMongo.getUserforSA();
    }
}
