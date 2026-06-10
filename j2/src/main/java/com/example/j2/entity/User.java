package com.example.j2.entity;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.databind.annotation.JsonSerialize;
import com.fasterxml.jackson.databind.ser.std.ToStringSerializer;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.NonNull;
import org.bson.types.ObjectId;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.index.Indexed;
import org.springframework.data.mongodb.core.mapping.DBRef;
import org.springframework.data.mongodb.core.mapping.Document;

import java.util.ArrayList;
import java.util.List;

@Document(collection = "users")
@Data
@NoArgsConstructor
@AllArgsConstructor
public class User {

    @Id
    @JsonIgnore
    private ObjectId id;

    @com.fasterxml.jackson.annotation.JsonProperty("id")
    public String getIdString() {
        return id != null ? id.toHexString() : null;
    }

    @Indexed(unique = true)
    @NonNull
    private String username;
    private String email;
    private Boolean SentimentAnalysis;
    @NonNull
    private String password;

    @DBRef
    private List<journalentry> journalentries = new ArrayList<>();
    private List<String> roles;
}