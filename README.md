Work Management System
A role-based web application for managing work assignments, tracking progress, and monitoring task completion in a structured workflow. It supports Admin, Manager, and Member roles, each with specific permissions.

Features
User Authentication

Login system using JWT & cookies
Secure authentication for all roles

Protected Routes
Unauthorized users cannot access dashboards

Role-based route protection:
Admin → /admin/*
Manager → /manager/*
Member → /member/*

Admin Panel

Create, edit, and delete work
View work details
Assign work to Managers
Manage users: view, assign members to managers, edit assignments, remove members

Manager Dashboard

View works assigned by Admin
Create, assign, edit, and delete own works
Track team members and view completed tasks

Member Dashboard

View assigned tasks
Update work status
Mark tasks as completed

Workflow
Admin → Assign Work → Manager → Assign Work → Member → Complete Task

Smart Work Tracking
Work status: pending | assigned | in-progress | completed
Real-time updates in dashboards

Responsive UI
Clean black, white & grey theme

Mobile & desktop responsive design
Built with Tailwind CSS

Tech Stack
Frontend:
EJS (Template Engine)
Tailwind CSS
HTML5, JavaScript

Backend:
Node.js, Express.js
MongoDB, Mongoose ODM
JWT Authentication, Cookie Parser
dotenv for environment variables

Project Structure
config/        → Database connection
controllers/  → Admin, Manager, Member & Auth controllers
middlewares/  → Auth & Role protection middleware
models/       → User & Work schemas
routes/       → Admin, Manager, Member & Auth routes
views/        → EJS templates (admin, manager, member, auth, home)
public/       → Static assets (CSS, images, JS)
index.js      → Main server entry file

How to Run
Clone Repository

git clone <your-repo-url>
cd Work-Manage-System

Install Dependencies
npm install

Setup Environment Variables
Create .env file in root:
PORT=7000
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_secret_key

Run Server
nodemon .\index.js

Open in Browser
http://localhost:7000
