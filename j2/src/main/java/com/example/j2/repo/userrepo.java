package com.example.j2.repo;

import com.example.j2.entity.User;
import org.bson.types.ObjectId;
import org.springframework.data.mongodb.repository.MongoRepository;

public interface userrepo extends MongoRepository<User, ObjectId> {
    User findByusername(String username);

    void deleteByusername(String name);
//    User findByUserName(String )

}
