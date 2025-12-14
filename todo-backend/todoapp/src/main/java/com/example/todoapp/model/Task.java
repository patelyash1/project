package com.example.todoapp.model;

import jakarta.persistence.*;
import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;
import com.example.todoapp.model.SubTask; // Ensure this matches your SubTask file location

@Entity
@Table(name = "tasks")
public class Task {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String title;
    private boolean completed;
    private LocalDateTime dueDate;

    @Column(length = 2000)
    private String description;

    private String folder;

    // --- CHANGED SECTION START ---

    @ElementCollection
    @CollectionTable(name = "task_subtasks", joinColumns = @JoinColumn(name = "task_id"))
    // We removed @Column(name="subtask") because SubTask is an object with multiple fields, not a single string column.
    private List<SubTask> subtasks = new ArrayList<>();

    // --- CHANGED SECTION END ---

    // Default Constructor
    public Task() {}

    // Constructor - UPDATED to accept List<SubTask>
    public Task(String title, boolean completed, LocalDateTime dueDate, String description, String folder, List<SubTask> subtasks) {
        this.title = title;
        this.completed = completed;
        this.dueDate = dueDate;
        this.description = description;
        this.folder = folder;
        this.subtasks = subtasks;
    }

    // Getters and Setters

    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }

    public String getTitle() { return title; }
    public void setTitle(String title) { this.title = title; }

    public boolean isCompleted() { return completed; }
    public void setCompleted(boolean completed) { this.completed = completed; }

    public LocalDateTime getDueDate() { return dueDate; }
    public void setDueDate(LocalDateTime dueDate) { this.dueDate = dueDate; }

    public String getDescription() { return description; }
    public void setDescription(String description) { this.description = description; }

    public String getFolder() { return folder; }
    public void setFolder(String folder) { this.folder = folder; }

    // UPDATED Getter to return List<SubTask>
    public List<SubTask> getSubtasks() { return subtasks; }

    // UPDATED Setter to accept List<SubTask>
    public void setSubtasks(List<SubTask> subtasks) { this.subtasks = subtasks; }
}