Personalized Learning Progress & Recommendation System

A full-stack intelligent quiz platform that tracks user performance, analyzes accuracy, and recommends personalized learning content based on weak areas.

Built with a clean professional UI and real-time analytics.

⸻

Live Demo
	•	Frontend: https://personalized-learning-system.vercel.app/
	•	Backend API: https://quiz-backend-fpns.onrender.com

⸻

Key Features

Authentication
	•	User Signup & Login
	•	Secure password hashing using bcrypt
	•	Persistent login with localStorage
	•	Protected routes

Smart Quiz Engine
	•	Mini quiz with multiple questions
	•	Automatic score calculation
	•	Accuracy computation
	•	Multiple attempts tracking

Progress Dashboard
	•	Real-time performance tracking
	•	Bar chart visualization using Recharts
	•	Attempts vs Accuracy analytics
	•	Responsive and mobile-friendly

Intelligent Recommendations
	•	Weak-area detection
	•	Topic-based recommendations
	•	YouTube learning video suggestions
	•	Personalized learning path

Professional UI
	•	Clean modern layout
	•	Responsive mobile design
	•	Top navigation bar
	•	Smooth user experience


Tech Stack

Frontend
	•	React (Class Components)
	•	Vite
	•	Recharts
	•	CSS3

Backend
	•	Node.js
	•	Express.js
	•	MySQL
	•	bcrypt

Deployment
	•	Frontend: Vercel
	•	Backend: Render
	•	Database: Railway MySQL

Project Structure

FullStack_project/
│
├── Backend/
│   ├── routes/
│   ├── config/
│   ├── server.js
│   └── setupTables.js
│
└── Frontend/
    └── Personalized_Learning_Progress_Recommendation_System/
        ├── src/
        │   ├── components/
        │   ├── api.js
        │   └── App.jsx

Local Setup

Clone the repository

git clone https://github.com/sriram21b/Personalized-learning-system
cd FullStack_project

Backend Setup

cd Backend
npm install
npm run dev

Create .env:

DB_HOST=your_host
DB_USER=your_user
DB_PASSWORD=your_password
DB_NAME=your_database
DB_PORT=your_port
PORT=5001

Frontend Setup

cd Frontend/Personalized_Learning_Progress_Recommendation_System
npm install
npm run dev

Create .env:

VITE_API_BASE_URL=http://localhost:5001/api

Production Environment

.env.production

VITE_API_BASE_URL=https://quiz-backend-fpns.onrender.com/api

Screenshots

Login Page

Progress Dashboard

Recommendation Section

API Endpoints

Auth
	•	POST /api/auth/signup
	•	POST /api/auth/login

Quiz
	•	POST /api/quiz/submit

Progress
	•	GET /api/quiz/progress/:userId

Recommendations
	•	GET /api/recommendations/:userId


Future Improvements
	•	JWT authentication
	•	Attempt history chart
	•	Difficulty-adaptive quizzes
	•	Leaderboard
	•	Admin dashboard
	•	Question bank from database

Author

Sriram
Full Stack Developer

⸻

If you like this project

Give it a Star on GitHub — it motivates me to build more!