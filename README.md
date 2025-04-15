# 📋 To-Do List & Task Manager App

A full-stack MERN application that allows users to create, edit, delete, and manage to-do tasks with reminders, categories, due dates, and completion status. Users also get **reminder popups** when a task is due.

---

## 🚀 Features

- Add, edit, delete tasks
- Add task categories
- Set due date and reminder date
- Mark tasks as completed
- One-time popup reminder for due tasks
- Responsive and stylish UI using Bootstrap

---

## 📸 Wireframe

![Wireframe of To-Do App](./A_wireframe_displays_a_"To-Do_List_&_Task_Manager".png)

---

## 🧰 Tech Stack

| Layer       | Tech Used              |
|-------------|------------------------|
| Frontend    | React, Bootstrap       |
| Backend     | Node.js, Express       |
| Database    | MongoDB (Mongoose)     |
| Versioning  | Git, GitHub            |

---

## 📂 Folder Structure

todo-app/ │ 
├── frontend/ # React frontend │ 
    ├── public/ │   
    ├── src/ 
    │ └── package.json │ 
├── backend/ # Express backend │   
    ├── index.js 
    │ └── package.json 
│ └── README.md

## ⚙️ Setup Instructions

### 🔧 Backend Setup (Express + MongoDB)

```bash
cd backend
npm install
npm start

### Make sure MongoDB is running on your local machine at
mongodb://127.0.0.1:27017/todo_db

cd frontend
npm install
npm start


App will run on: http://localhost:3000

📝 API Endpoints
Method	Endpoint	Description
GET	/tasks	Get all tasks
POST	/tasks	Add a new task
PUT	/tasks/:id	Update a task
DELETE	/tasks/:id	Delete a task

Deployment
Deploy this app using platforms like:
Frontend: GitHub Pages
Backend: Github

🤝 Collaboration
Used VS Code Live Share and GitHub for collaboration with pair programming.

✅ Extreme Programming Practices
User Stories: Clearly defined task flows
Refactoring: Clean code across versions
TDD: Backend APIs tested before integration
Pair Programming: Real-time code sharing via VS Code Live Share





