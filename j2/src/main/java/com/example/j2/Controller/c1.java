package com.example.j2.Controller;

import com.example.j2.Services.Userdetailserviceimpl;
import com.example.j2.Services.journalentryservice;
import com.example.j2.Services.userservice;
import com.example.j2.entity.User;
import com.example.j2.entity.journalentry;
import org.bson.types.ObjectId;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Component;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Component
@RestController
@RequestMapping("/journal")
public class c1 {

    @Autowired
    private journalentryservice jes;

    @Autowired
    private userservice us;

    @GetMapping("/app")
    public String dum(){
        return "Hello";
    }

//    @GetMapping("{username}")
//    public List<journalentry> getAll(@PathVariable String username) {
//        User user = us.findByUsername(username);
//        List<journalentry> all = user.getJournalentries();
//        if(all != null && !all.isEmpty()){
//            return new ResponseEntity<>(all, HttpStatus.OK).getBody();
//        }
//        return ;
////        return jes.getByUser(user);
//    }

    @GetMapping()
    public ResponseEntity<?> getAll() {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        String username = authentication.getName();
        User user = us.findByUsername(username);
        List<journalentry> all = user.getJournalentries();
        if(all != null && !all.isEmpty()){
            return new ResponseEntity<>(all, HttpStatus.OK);
        }
        return new ResponseEntity<>(HttpStatus.NOT_FOUND);
    //        return jes.getByUser(user);
    }

//    @PostMapping("")
//    public ResponseEntity<journalentry> create(@RequestBody journalentry j2) {
//        jes.saveEntry(j2);
//        return new ResponseEntity<>(j2, HttpStatus.CREATED);
//    }

    @PostMapping()
    public ResponseEntity<journalentry> create(@RequestBody journalentry j2){
        try {
            Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
            String username = authentication.getName();
            jes.saveEntry(j2,username);
            return new ResponseEntity<>(j2,HttpStatus.CREATED);
        } catch (Exception e) {
            return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
        }
    }

    @GetMapping("/id/{var}")
    public ResponseEntity<journalentry> getById(@PathVariable ObjectId var) {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        String username = authentication.getName();
        User user = us.findByUsername(username);

        List<journalentry> collect = user.getJournalentries().stream().filter(x -> x.getId().equals(var))
                .collect(Collectors.toList());

        if(collect!=null){
            Optional<journalentry> e1 = jes.findbyid(var);
            if(e1.isPresent()) {
                return new ResponseEntity<>(e1.get(), HttpStatus.OK);
            }
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
//        User user = Userdetailserviceimpl.findB
//        if (e1.isPresent()) {
//
//        }
        return new ResponseEntity<>(HttpStatus.NOT_FOUND);
    }

//    @DeleteMapping("/id/{myid}")
//    public ResponseEntity<Void> deleteById(@PathVariable ObjectId myid) {
//        boolean findanddel = jes.findanddel(myid, username);
//        if(findanddel){
//            return  ResponseEntity.noContent().build();
//        }
//        return  ResponseEntity.notFound().build();
////        return findanddel;
//    }

    @DeleteMapping("/id/{myid}")
    public ResponseEntity<?> deleteById(@PathVariable ObjectId myid) {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        String username = authentication.getName();
        boolean f = jes.findanddel(myid, username);
        if(f){
            return new ResponseEntity<>(HttpStatus.NO_CONTENT);
        }
        return new ResponseEntity<>(HttpStatus.NOT_FOUND);
    }


    @PutMapping("/id/{myid}")
    public ResponseEntity<journalentry> update(@PathVariable ObjectId myid,
                               @RequestBody journalentry jt) {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        String username = authentication.getName();
        User user = us.findByUsername(username);

        boolean belongsToUser = user.getJournalentries().stream().anyMatch(x -> x.getId().equals(myid));

        if(belongsToUser) {
            Optional<journalentry> e1 = jes.findbyid(myid);
            if (e1.isPresent()) {
                journalentry existing = e1.get();
                existing.setTitle(jt.getTitle() != null && !jt.getTitle().equals("") ? jt.getTitle() : existing.getTitle());
                existing.setContent(jt.getContent() != null && !jt.getContent().equals("") ? jt.getContent() : existing.getContent());
                if (jt.getSentiment() != null) {
                    existing.setSentiment(jt.getSentiment());
                }
                jes.saveEntry(existing);
                return new ResponseEntity<>(existing, HttpStatus.OK);
            }
        }
        return new ResponseEntity<>(HttpStatus.NOT_FOUND);
    }




//    @PutMapping("/id/{myid}")
//    public ResponseEntity<journalentry> update(@PathVariable ObjectId myid,
//                               @RequestBody journalentry jt) {
//        Optional<journalentry> entry = jes.findbyid(myid);
//        if(entry.isEmpty()){
//            return  ResponseEntity.notFound().build();
//        }
//
//        journalentry oldone = entry.get();
//        oldone.setTitle(jt.getTitle());
//        oldone.setContent(jt.getContent());
//        jes.saveEntry(oldone, user);
//        return new ResponseEntity<>(oldone, HttpStatus.OK);
//    }

}
