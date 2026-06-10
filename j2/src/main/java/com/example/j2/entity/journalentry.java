package com.example.j2.entity;

import com.example.j2.Enum.Sentiment;
import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.databind.annotation.JsonSerialize;
import com.fasterxml.jackson.databind.ser.std.ToStringSerializer;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.bson.types.ObjectId;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

import java.time.LocalDateTime;

@Document(collection = "journaldb")
@Data
@NoArgsConstructor
public class journalentry {
    @Id
    @JsonIgnore
    private ObjectId id;

    @com.fasterxml.jackson.annotation.JsonProperty("id")
    public String getIdString() {
        return id != null ? id.toHexString() : null;
    }
    private String title;
    private String content;
    private LocalDateTime date;
    private Sentiment sentiment;
}