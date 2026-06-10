# DayScript 📝☀️

DayScript is a full-stack journaling application that helps you track your thoughts, emotions, and local weather.

## Features ✨

- **User Authentication:** Secure login and registration using JWT (JSON Web Tokens) and Spring Security.
- **Journal Entries:** Create, edit, delete, and view your daily journal entries.
- **Sentiment Tracking:** Tag your entries with how you're feeling (Happy, Sad, Angry, Anxious).
- **Weather Integration:** Automatically fetches the current weather for your location using the WeatherStack API.
- **Redis Caching:** Accelerates external API calls and improves performance.
- **Modern UI:** Built with React and Vite for a lightning-fast, beautiful, glassmorphism-styled frontend.

## Technology Stack 🛠️

### Frontend
- **React (Vite):** Lightning fast modern frontend framework.
- **Vanilla CSS:** Beautiful custom styling with responsive design and glassmorphism UI.
- **React Router:** For seamless navigation.
- **Axios:** For communicating with the backend APIs.

### Backend
- **Java Spring Boot:** Robust RESTful API architecture.
- **Spring Security:** For securing endpoints and handling JWT authentication.
- **MongoDB:** NoSQL database for fast and flexible storage of users and journal entries.
- **Redis:** Used for caching data to reduce load times.
- **Lombok:** Reduces boilerplate code.

## Getting Started 🚀

### Prerequisites
- Node.js & npm (for the frontend)
- Java 21 & Maven (for the backend)
- MongoDB instance (Local or Atlas)
- Redis server (Local or Cloud)

### Backend Setup
1. Navigate to the backend directory:
   ```bash
   cd j2
   ```
2. Set up your environment variables in `src/main/resources/application.properties`:
   - Set `spring.mongodb.uri` to your MongoDB connection string.
   - Set `weather.api.key` to your WeatherStack API key.
   - Set `spring.data.redis.url` to your Redis connection URL.
3. Start the Spring Boot server:
   ```bash
   .\mvnw.cmd spring-boot:run
   ```
   *(The backend runs on port 8080)*

### Frontend Setup
1. Navigate to the frontend directory:
   ```bash
   cd frontend
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Start the Vite development server:
   ```bash
   npm run dev
   ```
   *(The frontend runs on port 5173)*

### Configuration
The frontend automatically proxies API requests to the backend. This is configured in `frontend/vite.config.js`.

## Author
[Kavish Vachheta](https://github.com/kavishvachhet)
