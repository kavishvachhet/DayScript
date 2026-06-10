package com.example.j2.Service;

import com.example.j2.Services.EmailService;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;


@SpringBootTest
public class EmailServiceTest {

    @Autowired
    private EmailService emailService;

    @Test
    void testmail(){
        emailService.sendEmail("kavishvachheta2@gmail.com",
                "Testing Mail Sender","How R U ?");
    }

}
