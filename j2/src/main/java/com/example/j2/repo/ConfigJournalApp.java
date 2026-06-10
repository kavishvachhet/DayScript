package com.example.j2.repo;

import com.example.j2.entity.ConfigJournalAppEntity;
import com.example.j2.entity.journalentry;
import org.bson.types.ObjectId;
import org.springframework.data.mongodb.repository.MongoRepository;

public interface ConfigJournalApp extends MongoRepository<ConfigJournalAppEntity, ObjectId> {


}