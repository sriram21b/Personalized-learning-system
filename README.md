# Personalized Learning Progress Recommendation System

An AI-assisted full-stack web application that analyzes student quiz performance and generates personalized learning recommendations to improve learning outcomes.

🔗 **Live Demo (Frontend):** https://personalized-learning-system.vercel.app/ 
🔗 **Backend API:** https://quiz-backend-fpns.onrender.com

---

## Project Overview

This system allows students to attempt quizzes, tracks their performance, calculates progress metrics, and intelligently recommends the next learning topic based on accuracy and performance trends.

The goal is to simulate a **data-driven personalized learning platform** similar to modern ed-tech systems.

---

## Key Features

- Mini quiz system for students  
- Automatic progress calculation  
- AI-based learning recommendations  
- Performance level classification (Beginner / Intermediate / Advanced)  
- Difficulty adjustment suggestions  
- Fully deployed full-stack application  
- RESTful API architecture  
- MySQL relational database design  

---

## AI / Recommendation Logic

The system uses a **rule-based heuristic model** to simulate intelligent recommendations:

- Calculates quiz accuracy  
- Classifies student level:
  - Beginner (< 40%)  
  - Intermediate (40% – 75%)  
  - Advanced (> 75%)  
- Recommends next topic difficulty  
- Suggests difficulty adjustment  

This demonstrates applied AI logic suitable for adaptive learning systems.



## Tech Stack

### Frontend
- React (Vite)  
- JavaScript (ES6)  
- CSS3  

### Backend
- Node.js  
- Express.js  
- MySQL2  
- dotenv  
- CORS  

### Database
- MySQL (Railway)

### Deployment
- Frontend → Vercel  
- Backend → Render  
- Database → Railway  


## Database Schema

**Tables:**

- users  
- topics  
- quiz_attempts  

**Relationships:**

- Users → Quiz Attempts (1:N)  
- Topics → Quiz Attempts (1:N)  


## API Endpoints

### Submit Quiz
POST /api/quiz/submit

**Request Body**
```json
{
  "user_id": 1,
  "topic_id": 1,
  "score": 3,
  "total_questions": 5
}
```

---

### Get User Progress
GET /api/progress/:userId

---

### Get Recommendation
GET /api/recommendation/:userId

---

## Screenshots

### Mini Quiz Interface
![Mini Quiz](./screenshots/quiz.png)

---

### Progress Dashboard
![Progress Dashboard](./screenshots/progress.png)

---

### Recommendation Result
![Recommendation](./screenshots/recommendation.png)

---

## Local Setup

### Clone the repository

```bash
git clone <your-repo-url>
cd FullStack_project
```

---

### Backend Setup

```bash
cd Backend
npm install
npm run dev
```

Create a `.env` file inside **Backend/** with:

```
DB_HOST=your_host
DB_USER=your_user
DB_PASSWORD=your_password
DB_NAME=your_db
DB_PORT=your_port
PORT=5001
```

---

### Frontend Setup

Open a new terminal:

```bash
cd Frontend/Personalized_Learning_Progress_Recommendation_System
npm install
npm run dev
```

Frontend runs on:

```
http://localhost:5173
```

Backend runs on:

```
http://localhost:5001
```

---

## Future Improvements

- User authentication (JWT)  
- Progress charts & analytics  
- Real ML model integration  
- Dynamic quiz question bank  
- Instructor dashboard  
- Mobile responsive enhancements  


## Author

**Sriram**  
Full Stack Developer


If you found this project helpful, consider giving it a star!
