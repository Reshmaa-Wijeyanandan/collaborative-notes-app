# Collaborative Notes App

A full-stack collaborative note-taking web application built with the MERN stack (MongoDB, Express, React, Node.js) and styled using Tailwind CSS.

The application allows users to create, search, and manage notes with a rich text editor, share notes with collaborators, and securely authenticate using JSON Web Tokens (JWT).

## Features

* User authentication using JWT (Register / Login / Logout)
* Create and delete personal notes
* Rich text editing with formatting support
* Full-text search for quick note retrieval
* Collaborator management (share notes with other users)
* Access control so users only see their own notes or notes shared with them
* Responsive UI built with Tailwind CSS

## Tech Stack

### Frontend

* React
* Vite
* Tailwind CSS
* Axios
* React Router
* React Quill (Rich Text Editor)

### Backend

* Node.js
* Express.js
* MongoDB (Atlas)
* Mongoose
* JSON Web Token (JWT)
* bcryptjs

## Project Structure

collaborative-notes-app
│
├── backend
│   ├── config
│   │   └── db.js
│   ├── controllers
│   │   └── noteController.js
│   ├── middleware
│   │   └── authMiddleware.js
│   ├── models
│   │   ├── User.js
│   │   └── Note.js
│   ├── routes
│   │   ├── authRoutes.js
│   │   └── noteRoutes.js
│   └── server.js
│
├── frontend
│   ├── src
│   │   ├── pages
│   │   │   ├── Login.jsx
│   │   │   ├── Register.jsx
│   │   │   └── Dashboard.jsx
│   │   ├── services
│   │   │   └── api.js
│   │   └── App.jsx
│
├── README.md
└── .env.example

## Setup Instructions

### 1. Clone the Repository

git clone <repository-url>
cd collaborative-notes-app

### 2. Install Backend Dependencies

cd backend
npm install

### 3. Install Frontend Dependencies

cd ../frontend
npm install

### 4. Configure Environment Variables

Create a `.env` file inside the **backend** directory and add the following variables.

Example:

PORT=5000
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_secret_key

You can use the `.env.example` file as a reference.

### 5. Run the Backend Server

From the backend folder:

npm run dev

The server will start on:

http://localhost:5000

### 6. Run the Frontend

From the frontend folder:

npm run dev

The frontend will start on:

http://localhost:5173

## API Endpoints

### Authentication

Register

POST /api/auth/register

Login

POST /api/auth/login

### Notes

Create Note

POST /api/notes

Get Notes (with pagination)

GET /api/notes?page=1&limit=10

Update Note

PUT /api/notes/:id

Delete Note

DELETE /api/notes/:id

Search Notes

GET /api/notes/search?query=keyword

Add Collaborator

POST /api/notes/:id/collaborators

## Security

* Passwords are hashed using **bcryptjs**
* JWT tokens protect private routes
* Notes are accessible only to:

  * the note owner
  * collaborators added to the note

## Environment Variables

The application requires the following environment variables:

PORT
MONGO_URI
JWT_SECRET

These should be placed in a `.env` file in the backend directory.
