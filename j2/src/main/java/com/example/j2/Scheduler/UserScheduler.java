package com.example.j2.Scheduler;

import com.example.j2.Enum.Sentiment;
import com.example.j2.Services.EmailService;
import com.example.j2.Services.SentimentAnalysis;
import com.example.j2.entity.User;
import com.example.j2.entity.journalentry;
import com.example.j2.repo.UserImpl_custom_mongo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Component;

import java.time.LocalDateTime;
import java.time.temporal.ChronoUnit;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.Objects;
import java.util.stream.Collectors;


@Component
//@SpringBot
public class UserScheduler {

    @Autowired
    private EmailService emailService;

    @Autowired
    private UserImpl_custom_mongo userImplCustomMongo;

    @Autowired
    private SentimentAnalysis sentimentAnalysis;

//    @Scheduled(cron = "0 0 9 * * SUN")
//    @Scheduled(cron = "0 * * ? * *")
//    public void fetchusersandsendSAmail(){
//        List<User> users = userImplCustomMongo.getUserforSA();
//        for(User user : users){
//            List<journalentry> journalentries = user.getJournalentries();
//            List<String> contents = user.getJournalentries()
//                    .stream()
//                    .filter(entry ->
//                            entry.getDate().isAfter(
//                                    LocalDateTime.now().minusDays(7)
//                            )
//                    ).map(x-> x.getContent()).collect(Collectors.toList());
//            String entry = String.join(" ",contents);
//            String sentiment = sentimentAnalysis.getSentiment(entry);
////            emailService.sendEmail(user.getEmail(),"Sentiment For Last 7 Days",
////                    sentiment);
//        }
//    }
@Scheduled(cron = "0 0 9 * * SUN")
public void fetchUsersAndSendSAMail() {

        List<User> users = userImplCustomMongo.getUserforSA();

        for (User user : users) {

            List<Sentiment> sentiments = user.getJournalentries()
                    .stream()
                    .filter(entry ->
                            entry.getDate().isAfter(
                                    LocalDateTime.now().minusDays(7)
                            )
                    )
                    .map(journalentry::getSentiment)
                    .filter(Objects::nonNull)
                    .collect(Collectors.toList());

            Map<Sentiment, Integer> sentimentCounts = new HashMap<>();

            for (Sentiment sentiment : sentiments) {
                sentimentCounts.put(
                        sentiment,
                        sentimentCounts.getOrDefault(sentiment, 0) + 1
                );
            }

            Sentiment mostFrequentSentiment = null;
            int maxCount = 0;

            for (Map.Entry<Sentiment, Integer> entry : sentimentCounts.entrySet()) {

                if (entry.getValue() > maxCount) {
                    maxCount = entry.getValue();
                    mostFrequentSentiment = entry.getKey();
                }
            }

            if (mostFrequentSentiment != null) {
                emailService.sendEmail(
                        user.getEmail(),
                        "Sentiment For Last 7 Days",
                        mostFrequentSentiment.toString()
                );
            }
        }
    }
}
