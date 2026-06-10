package com.example.j2.Enum;


import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.stereotype.Component;



public enum Sentiment {
    HAPPY,
    SAD,
    ANGRY,
    ANXIOUS;

    public static Sentiment fromString(String value) {
        try {
            return Sentiment.valueOf(value.trim().toUpperCase());
        } catch (Exception e) {
            return null;
        }
    }

    public static String get(Sentiment sentiment) {
        return sentiment == null ? null : sentiment.name();
    }
}
