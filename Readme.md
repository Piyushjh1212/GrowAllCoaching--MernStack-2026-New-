# Grow All Coaching – Full Stack Web Application

[![License](https://img.shields.io/badge/License-MIT-blue.svg)](LICENSE)
[![React](https://img.shields.io/badge/React-17.0.2-blue?logo=react)](https://reactjs.org/)
[![NodeJS](https://img.shields.io/badge/Node.js-18-green?logo=node.js)](https://nodejs.org/)
[![MongoDB](https://img.shields.io/badge/MongoDB-6.0-green?logo=mongodb)](https://www.mongodb.com/)
[![Razorpay](https://img.shields.io/badge/Razorpay-Payment-blue)](https://razorpay.com/)

---

## Project Overview
**GrowAll Coaching** is a scalable full-stack EdTech platform built to provide students with seamless access to online courses. The platform allows real-time course tracking, progress management, secure authentication, and integrated payment options. Admins can manage courses, users, and analytics efficiently.

This project was developed to provide a comprehensive online learning experience for students.

---

## Features

### User Features
- Browse and enroll in online courses.
- Track learning progress in real-time.
- Secure login and registration using JWT and bcrypt.
- Role-Based Access Control (RBAC) for students and admins.

### Admin Features
- Add, update, and remove courses.
- Manage users and monitor activity.
- View analytics for course performance and user engagement.

### Payment Integration
- Secure payments using Razorpay.
- Handles multiple transactions with automatic verification.

### Internship / Team Management
- Assign tasks and manage interns for content and platform support.

---

## Tech Stack
- **Frontend:** React.js, HTML5, CSS3, JavaScript (ES6+)
- **Backend:** Node.js, Express.js
- **Database:** MongoDB
- **Authentication:** JWT, bcrypt, RBAC
- **Payment Gateway:** Razorpay
- **Cloud & Tools:** AWS, Cloudinary, Git, VS Code

---

## Project Structure

```text
GrowAll-Coaching/
├── client/                  # React frontend
│   ├── public/
│   └── src/
├── server/                  # Node.js backend
│   ├── controllers/
│   ├── models/
│   ├── routes/
│   └── utils/
├── README.md
├── package.json
└── .env

|__ Admin 
---



## Installation & Setup

### Prerequisites
- Node.js (v16+)
- MongoDB database
- npm or yarn
- Razorpay account (for payments)

### Steps
1. **Clone the repository**
```bash
git clone https://github.com/Piyushjh1212/GrowAll-Coaching.git
cd GrowAll-Coaching


Install backend dependencies

cd server
npm install

Install frontend dependencies

cd ../client
npm install

Configure Environment Variables
Create a .env file in the server folder:

PORT=5000
MONGO_URI=your_mongodb_uri
JWT_SECRET=your_jwt_secret
RAZORPAY_KEY_ID=your_razorpay_key
RAZORPAY_KEY_SECRET=your_razorpay_secret

Start the application

# Start backend
cd server
npm run dev

# Start frontend
cd ../client
npm start

The application should now be running at http://localhost:3000

Contributing

Contributions are welcome!

Fork the repository

Create your branch (git checkout -b feature/xyz)

Commit your changes (git commit -m "Add some feature")

Push to the branch (git push origin feature/xyz)

Open a Pull Request