# 📝 Full Stack To-Do App

A robust, feature-rich Task Management application built to demonstrate full-stack development capabilities. This project connects a modern React frontend with a powerful Spring Boot backend and persists data using PostgreSQL.

## ✨ Features
* **Full CRUD Operations:** Create, Read, Update, and Delete tasks seamlessly.
* **Smart Date Management:** Add due dates to tasks with a visual calendar picker.
* **Dark Mode:** A sleek, neon-accented dark theme (toggleable).
* **Gamification:** Confetti explosion effect upon completing tasks! 🎉
* **Bulk Actions:** "Clear Completed" button to keep the list tidy.
* **Responsive Design:** Looks great on desktop and mobile.

## 🛠️ Tech Stack
**Frontend:**
* React.js (Hooks, Functional Components)
* Axios (API Integration)
* Canvas Confetti (Visual Effects)
* CSS3 (Custom Dark Theme)

**Backend:**
* Java (JDK 17+)
* Spring Boot (REST API)
* Spring Data JPA (Hibernate)
* PostgreSQL (Database)

## 🚀 How to Run Locally

### 1. Prerequisites
Ensure you have the following installed:
* Node.js & npm
* Java Development Kit (JDK)
* PostgreSQL (running on port 5432)

### 2. Backend Setup (Spring Boot)
1.  Navigate to the backend folder:
    ```bash
    cd todo-backend
    ```
2.  Update `src/main/resources/application.properties` with your Postgres username/password.
3.  Run the application using your IDE (IntelliJ) or Maven:
    ```bash
    ./mvnw spring-boot:run
    ```
The server will start on `http://localhost:8080`.

### 3. Frontend Setup (React)
1.  Open a new terminal and navigate to the frontend folder:
    ```bash
    cd todo-frontend
    ```
2.  Install dependencies:
    ```bash
    npm install
    ```
3.  Start the development server:
    ```bash
    npm start
    ```
The app will open at `http://localhost:3000`.

