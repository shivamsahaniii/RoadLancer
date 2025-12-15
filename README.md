# RoadLancer 🚗🛠️

**RoadLancer** is a MERN stack–based web application developed as an **academic project**. The platform connects users with nearby **roadside assistance and transportation service providers**, enabling quick help during vehicle breakdowns or transportation needs.

---

## 📌 Project Description

RoadLancer aims to digitalize and simplify roadside assistance by providing a single platform where users can:

* Request roadside help
* Connect with service providers
* Track service status
* Manage transportation-related services efficiently

The system is designed using modern full-stack technologies and follows RESTful API principles.

---

## 🛠️ Tech Stack

### Frontend

* React.js
* HTML5
* CSS3
* JavaScript (ES6+)
* Axios

### Backend

* Node.js
* Express.js

### Database

* MongoDB (Mongoose ODM)

### Other Tools & Libraries

* JWT (Authentication & Authorization)
* bcrypt (Password encryption)
* Git & GitHub
* Postman (API testing)

---

## ✨ Features

### User Module

* User registration & login
* Request roadside or transportation services
* View request history
* Track service status

### Admin / Service Provider Module

* Admin authentication
* Manage service requests
* Assign service providers
* Update request status
* View overall system data

---

## 📁 Project Structure

```
RoadLancer/
├── backend/        # Node.js + Express backend
│   ├── controllers/
│   ├── models/
│   ├── routes/
│   ├── middleware/
│   ├── config/
│   └── server.js
│
├── frontend/       # React frontend
│   ├── src/
│   ├── public/
│   └── package.json
│
└── README.md
```

---

## ⚙️ Installation & Setup

### Prerequisites

* Node.js
* MongoDB
* Git

---

### Step 1: Clone the Repository

```bash
git clone https://github.com/shivamsahaniii/RoadLancer.git
```

---

### Step 2: Backend Setup

```bash
cd RoadLancer/backend
npm install
```

Create a `.env` file inside the `backend` folder and configure:

```
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_secret_key
PORT=5000
```

Start the backend server:

```bash
npm start
```

---

### Step 3: Frontend Setup

```bash
cd RoadLancer/frontend
npm install
npm start
```

Open your browser and visit:

```
http://localhost:3000
```

---

## 🔐 Authentication & Security

* JWT-based authentication
* Encrypted passwords using bcrypt
* Role-based access control (User / Admin)

---

## 📊 Future Enhancements

* Real-time GPS tracking
* In-app chat between user and service provider
* Online payment integration
* Ratings & reviews system
* Mobile application support

---

## 🎓 Academic Purpose

This project was developed as part of an **academic curriculum** to gain practical experience in:

* MERN stack development
* RESTful API design
* Authentication & authorization
* Database modeling with MongoDB

---

## 📜 License

This project is intended for **educational purposes only**.

---

## 👨‍💻 Author

**Shivam Sahani**
MERN Stack Developer
Academic Project
