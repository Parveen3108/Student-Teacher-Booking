# 🚀 Student–Teacher Booking Appointment System

A web-based appointment booking system where **students can search teachers, book appointments, and send messages**, while **teachers manage appointments** and **admin controls approvals**.  
This project simplifies communication and scheduling in educational institutions.

---

## 📸 Demo / Live Link

🔗 **Live Preview:**  
https://parveen3108.github.io/Student-Teacher-Booking/

📂 **Repository Link:**  
https://github.com/Parveen3108/Student-Teacher-Booking

---

## ✨ Features

### 👨‍🎓 Student
- ✅ Register & Login
- ✅ Search teachers
- ✅ Book appointments
- ✅ Send messages to teachers
- ✅ View appointment status

### 👨‍🏫 Teacher
- ✅ Secure login
- ✅ View all appointments
- ✅ View student messages

### 🛡️ Admin
- ✅ Admin login
- ✅ Approve student registrations
- ✅ Add teachers
- ✅ View messages & appointments

### 🌐 General
- ✅ Role-based authentication
- ✅ Protected routes
- ✅ Responsive UI

---

## 🛠️ Tech Stack

| Technology | Used For |
|----------|----------|
| React.js (Vite) | Frontend |
| React Router | Routing |
| Tailwind CSS | Styling |
| Firebase Authentication | Login / Signup |
| Firebase Realtime Database | Data Storage |
| GitHub Pages | Deployment |

---

## 📦 Installation & Setup

```bash
# Clone repository
git clone https://github.com/Parveen3108/Student-Teacher-Booking.git

# Move to project folder
cd Student-Teacher-Booking

# Install dependencies
npm install

# Run development server
npm run dev

📁 Folder Structure
src/
 ┣ components/
 ┃ ┣ Navbar.jsx
 ┃ ┗ ProtectedRoute.jsx
 ┣ pages/
 ┃ ┣ Admin/
 ┃ ┣ Student/
 ┃ ┗ Teacher/
 ┣ firebase/
 ┃ ┗ config.js
 ┣ App.jsx
 ┗ main.jsx

🔐 Authentication Flow

Firebase Authentication is used for login/signup

Realtime Database stores role-based data

Protected routes ensure secure access

Admin adds teachers (Auth + DB synced via UID)

🧠 Future Improvements

🔔 Email / notification system

📅 Calendar-based appointment view

📱 Enhanced mobile UI

🧑‍💻 Admin analytics dashboard

📧 Contact 

Parveen Solath
📩 Email: parveensolath205@gmail.com

💼 GitHub: https://github.com/Parveen3108

⭐ Support

If you like this project, please ⭐ star the repository.
It motivates me to build more projects like this 🙌
