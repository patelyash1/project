package com.example.todoapp.model; // Updated package to match your Task class

import jakarta.persistence.Embeddable;

@Embeddable
public class SubTask {
    private String text;
    private boolean completed;

    // Default Constructor (Required by JPA)
    public SubTask() {}

    // Constructor used for creating new subtasks easily
    public SubTask(String text, boolean completed) {
        this.text = text;
        this.completed = completed;
    }

    // Getters
    public String getText() {
        return text;
    }

    public boolean isCompleted() {
        return completed;
    }

    // Setters
    public void setText(String text) {
        this.text = text;
    }

    public void setCompleted(boolean completed) {
        this.completed = completed;
    }
}