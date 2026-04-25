# 🏥 Smart Hospital Management System

A full-stack **MERN (MongoDB, Express.js, React.js, Node.js)** based Smart Hospital Management System that digitizes hospital workflows by connecting **patients** and **doctors** on a single platform.

The system enables appointment booking, digital prescriptions, doctor scheduling, patient record access, and role-based dashboards with a modern healthcare UI.

---

## 🚀 Features

## 👤 Patient Module
- User registration and secure login
- View all doctors
- Filter doctors by specialization
- View doctor details
- Book appointments
- Cancel appointments
- View appointment history
- View digital prescriptions
- Manage profile

---

## 👨‍⚕️ Doctor Module
- Doctor registration with clinic details
- Set availability (days, slots, timings)
- Doctor dashboard
- View today's appointments
- See:
  - confirmed appointments
  - cancelled appointments
  - completed appointments
- Write digital prescriptions
- Manage profile

---

## 💊 Prescription Module
Doctors can write:
- Diagnosis
- Medicines
- Dosage
- Instructions

Patients can:
- View prescriptions
- See doctor details
- Access prescription history

---

## 🔐 Authentication & Authorization
- JWT Authentication
- Role-based access:
  - Patient
  - Doctor
- Protected API routes
- Secure login session handling

---

## 🎨 Frontend UI
Modern responsive UI built using:
- React.js
- Bootstrap
- Custom CSS
- Glassmorphism cards
- Futuristic landing page
- Responsive dashboard layouts

---

## 🛠️ Tech Stack

### Frontend
- React.js
- React Router DOM
- Axios
- Bootstrap
- CSS3

### Backend
- Node.js
- Express.js
- MongoDB
- Mongoose
- JWT
- bcrypt.js

---

## 📂 Project Structure

```bash
smart-hospital-management/
│
├── backend/
│   ├── Controller/
│   ├── Model/
│   ├── Routes/
│   ├── middleware/
│   ├── server.js
│   └── .env
│
├── frontend/
│   ├── src/
│   │   ├── Pages/
│   │   ├── components/
│   │   ├── styles/
│   │   ├── App.jsx
│   │   └── main.jsx
│   │
│   └── package.json
│
└── README.md
```

---

## ⚙️ Installation

## 1) Clone repository

```bash
git clone https://github.com/YOUR_USERNAME/smart-hospital-management.git
cd smart-hospital-management
```

---

## 2) Backend setup

```bash
cd backend
npm install
```

Create `.env`

```env
PORT=5000
MONGO_URI=your_mongodb_connection
JWT_SECRET_KEY=your_secret_key
```

Run backend:

```bash
npm start
```

---

## 3) Frontend setup

```bash
cd frontend
npm install
npm run dev
```

Frontend runs on:

```txt
http://localhost:5173
```

Backend runs on:

```txt
http://localhost:5000
```

---

## API Endpoints

### Auth
- POST `/api/auth/signup`
- POST `/api/auth/login`

### Doctors
- GET `/api/doctors/all`
- GET `/api/doctors/:id`

### Appointments
- POST `/api/appointments/book`
- GET `/api/appointments/show`
- GET `/api/appointments/doctor`
- DELETE `/api/appointments/cancel/:appointmentId`

### Prescriptions
- POST `/api/prescriptions`
- GET `/api/prescriptions/my`

---

## Future Enhancements
- Admin dashboard
- Video consultation
- Lab report uploads
- Online payments
- Notifications
- AI symptom checker
- Hospital analytics dashboard

---

## Screenshots
Add screenshots here:

- Landing page
- Login page
- Signup page
- Patient dashboard
- Doctor dashboard
- Prescription page

Example:

```md
![Landing Page](screenshots/landing.png)
```

---

## Author
Developed as a **Smart Healthcare Digital Platform** project using MERN Stack.

---

## License
MIT License
