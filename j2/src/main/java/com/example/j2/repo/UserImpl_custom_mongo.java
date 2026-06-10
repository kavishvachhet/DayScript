package com.example.j2.repo;

import com.example.j2.entity.User;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.mongodb.core.MongoTemplate;
import org.springframework.data.mongodb.core.query.Criteria;
import org.springframework.data.mongodb.core.query.Query;
import org.springframework.stereotype.Component;

import java.util.List;

@Component
public class UserImpl_custom_mongo {


    @Autowired
    private MongoTemplate mongoTemplate;

    public List<User> getUserforSA(){
        Query query = new Query();
        //And queries
        query.addCriteria(Criteria.where("username").is("Kavish"));
        query.addCriteria(Criteria.where("SentimentAnalysis").is(true));

        //OR queries
//        Criteria criteria = new Criteria();
//        query.addCriteria(criteria.orOperator(
//                Criteria.where("username").exists(true),
//                Criteria.where("SentimentAnalysis").is(true)
//        ));

        List<User> users = mongoTemplate.find(query, User.class);
        return users;
    }
}
