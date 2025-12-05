package com.example.todoapp.controller;

import com.example.todoapp.model.Task;
import com.example.todoapp.repository.TaskRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;
@RestController
@RequestMapping("/tasks")
@CrossOrigin(origins = "http://localhost:3000") // allow React frontend
public class TaskController {

    @Autowired
    private TaskRepository taskRepository;

    // ✅ GET all tasks
    @GetMapping
    public List<Task> getAllTasks() {
        return taskRepository.findAll();
    }

    // ✅ POST: Add new task
    @PostMapping
    public Task createTask(@RequestBody Task task) {
        return taskRepository.save(task);
    }

    // ✅ PUT: Update (mark complete/incomplete)
    @PutMapping("/{id}")
    public Task updateTask(@PathVariable Long id, @RequestBody Task updatedTask) {
        Optional<Task> optionalTask = taskRepository.findById(id);
        if (optionalTask.isPresent()) {
            Task existingTask = optionalTask.get();
            existingTask.setTitle(updatedTask.getTitle());
            existingTask.setCompleted(updatedTask.isCompleted());
            return taskRepository.save(existingTask);
        }
        return null;
    }

    // ✅ DELETE: Remove task
    @DeleteMapping("/{id}")
    public void deleteTask(@PathVariable Long id) {
        taskRepository.deleteById(id);
    }
}
