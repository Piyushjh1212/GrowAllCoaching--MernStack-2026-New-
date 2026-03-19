# Grow All Coaching – Web Application

![License](https://img.shields.io/badge/License-All%20Rights%20Reserved-red)
![Frontend](https://img.shields.io/badge/Frontend-React-blue?logo=react)
![Backend](https://img.shields.io/badge/Backend-Node.js-green?logo=node.js)
![Database](https://img.shields.io/badge/Database-MongoDB-green?logo=mongodb)
![Payments](https://img.shields.io/badge/Payments-Razorpay-blue)
![Cloud](https://img.shields.io/badge/Cloud-AWS-orange?logo=amazonaws)
![Security](https://img.shields.io/badge/Security-High-brightgreen)
![Status](https://img.shields.io/badge/Status-Production%20Ready-success)

---

## Project Overview
**Grow All Coaching** is a scalable full-stack EdTech platform built to provide students with seamless access to online courses. The platform allows real-time course tracking, progress management, secure authentication, and integrated payment options. Admins can manage courses, users, and analytics efficiently.

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

---

## Tech Stack

- **Frontend:** React.js, HTML5, CSS3, JavaScript (ES6+)
- **Backend:** Node.js, Express.js
- **Database:** MongoDB
- **Authentication & Security:** JWT, bcrypt, Role-Based Access Control (RBAC)
- **Payment Gateway:** Razorpay
- **Cloud & Tools:** AWS, Cloudinary, Git, VS Code

## 🔐 Security

This application is fully protected with industry-standard security practices, including:

- Secure Authentication using JWT
- Password Hashing with bcrypt
- Role-Based Access Control (RBAC)
- Protected API Routes
- Secure Payment Integration (Razorpay)
- Environment Variables for Sensitive Data
- Cloud Security with AWS

---

## Project Structure

|__ Admin /
GrowAll-Coaching/
├── Backend/                  # React frontend
│   ├── Config/
│   |── Controllers/
│   |── Helpers/
│   |── Middlewear/
│   |── Modals/
│   |── Routes/
│   |── Services/
│   |── Utils/
│   ---- server.js            # main file...
|
├── Frontend/                 # Node.js backend
│   ├── Public/
│   ├── src/
│       |── Components/
│       |── HomePage/
│       |── Utils
│   |── routes/
├── README.md
├── package.json
└── .env

---

## ⚙️ Installation & Setup

### 🔑 Prerequisites

Make sure you have the following installed and configured:

- Node.js (v16 or higher)
- MongoDB (Local or Atlas Cluster)
- npm or yarn
- Razorpay Account (for payment integration)
- AWS Account (for cloud services)
- Cloudinary Account (for media storage)

---

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

The application should now be running at http://localhost:5000

Contributing

Contributions are welcome!

Fork the repository

Create your branch (git checkout -b feature/xyz)

Commit your changes (git commit -m "Add some feature")

Push to the branch (git push origin feature/xyz)

Open a Pull Request