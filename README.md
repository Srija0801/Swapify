# Swapify – Skill Exchange Platform

Swapify is a full-stack web application that enables users to exchange skills with each other. Users can teach skills they are proficient in and learn new skills from others through a collaborative platform.



## Features

### User Features
- User authentication (JWT based)
- Create and manage skill profiles
- Browse available skills
- Send and manage skill exchange requests
- Real-time chat between users
- Profile setup and skill management

###  Admin Features
- Admin authentication
- Manage users
- Block / unblock accounts
- Monitor requests and exchanges



##  Tech Stack

### Frontend
- React (Vite)
- Tailwind CSS
- Axios

### Backend
- Node.js
- Express.js
- MongoDB (Mongoose)
- JWT Authentication
- Cloudinary (image upload)
- Socket.io (real-time chat)



## Project Structure



Swapify/
├── skill-swap-client/
├── skill-swap-server/
└── .gitignore




##  Installation

### 1️.Clone the Repository


git clone https://github.com/Srija0801/Swapify.git
cd Swapify
### 2️.Install Dependencies
Frontend
cd skill-swap-client
npm install
npm run dev

Backend
cd skill-swap-server
npm install
npm run dev


### 3.Environment Variables

Create a .env file inside skill-swap-server and add:

PORT=5000
MONGODB_URI=your_mongodb_uri
JWT_SECRET=your_secret
CLOUDINARY_CLOUD_NAME=your_cloud
CLOUDINARY_API_KEY=your_key
CLOUDINARY_API_SECRET=your_secret
