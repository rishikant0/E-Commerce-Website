# 🛒 E-Commerce Website

A full-stack e-commerce platform built with modern web technologies. The application provides a complete shopping experience with user authentication, product management, cart, orders, and an admin dashboard.

## ✨ Features

* 🔐 User Registration & Login
* 👤 User Profile Management
* 🛍️ Browse Products
* 🔎 Product Search
* 🛒 Add to Cart
* 💳 Payment Integration
* 📦 Order Management
* 👨‍💼 Admin Dashboard
* 📱 Responsive Design
* 🔒 Secure Authentication

## 🛠️ Tech Stack

### Frontend

* React.js
* JavaScript
* HTML5
* CSS3

### Backend

* Node.js
* Express.js
* REST API

### Database

* MongoDB

### Tools

* Git
* GitHub
* npm

## 📁 Project Structure

```text
E-Commerce-Website/
│
├── frontend/
│   ├── src/
│   ├── public/
│   └── package.json
│
├── Backend/
│   ├── routes/
│   ├── controllers/
│   ├── models/
│   └── package.json
│
├── admin/
│   ├── src/
│   └── package.json
│
├── .gitignore
└── README.md
```

## 🚀 Getting Started

### 1. Clone the repository

```bash
git clone https://github.com/rishikant0/E-Commerce-Website.git
cd E-Commerce-Website
```

### 2. Install dependencies

For the backend:

```bash
cd Backend
npm install
```

For the frontend:

```bash
cd ../frontend
npm install
```

For the admin panel:

```bash
cd ../admin
npm install
```

### 3. Configure environment variables

Create a `.env` file in the backend directory and add your required configuration:

```env
PORT=5000
MONGODB_URI=your_mongodb_connection_string
JWT_SECRET=your_secret_key
```

### 4. Start the application

Backend:

```bash
npm start
```

Frontend:

```bash
npm run dev
```

Admin:

```bash
npm run dev
```

## 🔑 Main Modules

### 👤 User

* Register and login
* Manage profile
* Browse products
* Add products to cart
* Place orders
* Track orders

### 👨‍💼 Admin

* Manage products
* Manage users
* Manage orders
* View application data

## 🚀 Future Improvements

* Product reviews and ratings
* Wishlist
* Advanced search and filters
* Email notifications
* Docker deployment
* CI/CD pipeline
* AWS deployment

## 👨‍💻 Author

**Rishikant Kumar**

Software Engineer | DevOps Engineer

* GitHub: https://github.com/rishikant0
* LinkedIn: https://www.linkedin.com/in/rishikant-kumar-aa7bb3314

---

⭐ If you like this project, consider giving it a star!
