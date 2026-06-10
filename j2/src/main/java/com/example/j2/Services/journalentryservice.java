package com.example.j2.Services;

import com.example.j2.Enum.Sentiment;
import com.example.j2.entity.User;
import com.example.j2.entity.journalentry;
import com.example.j2.repo.a1;
import org.bson.types.ObjectId;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;

@Service
public class journalentryservice {

    @Autowired
    private a1 repo;

    @Autowired
    private userservice us;

    private LocalDateTime date;
    
    @Transactional
    public void saveEntry(journalentry j1, String username) {
        try {
            User user = us.findByUsername(username);
            j1.setDate(LocalDateTime.now());
            String sentiment =
                    Sentiment.get(j1.getSentiment());

            System.out.println("Returned sentiment: " + sentiment);

            Sentiment enumSentiment = Sentiment.fromString(sentiment);

            System.out.println("Enum sentiment: " + enumSentiment);

            j1.setSentiment(enumSentiment);

            System.out.println("Journal sentiment: " + j1.getSentiment());

            journalentry saved = repo.save(j1);

            System.out.println("Saved sentiment: " + saved.getSentiment());
            user.getJournalentries().add(saved);
            us.saveEntry(user);
        } catch (Exception e) {
            throw new RuntimeException("Error occurred while saving journal entry", e);
        }
    }

    public void saveEntry(journalentry j1) {
        repo.save(j1);
    }

    public List<journalentry> getAll(){
        return repo.findAll();
    }

    public  Optional<journalentry> findbyid(ObjectId id){
        return repo.findById(id);
    }

    @Transactional
    public boolean findanddel(ObjectId id, String username) {
        boolean removed=false;
        try {
            User user = us.findByUsername(username);
            boolean b = user.getJournalentries().removeIf(entry -> entry.getId().equals(id));
            if(b){
                us.saveEntry(user);
                repo.deleteById(id);
                removed=true;
            }
        }catch (Exception e){
            System.out.println(e);
            throw new RuntimeException("An error while deleting the error..",e);
        }
        return removed;


    }

//    public List<journalentry> findbyusername(String username){
//
//    }

}