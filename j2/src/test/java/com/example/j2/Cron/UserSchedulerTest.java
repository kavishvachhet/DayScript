package com.example.j2.Cron;


import com.example.j2.Scheduler.UserScheduler;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;

@SpringBootTest
public class UserSchedulerTest {

    @Autowired
    private UserScheduler userScheduler;

    @Test
    public void testFetchUsersAndsendSAmail(){
        userScheduler.fetchUsersAndSendSAMail();
    }
}
