# MERN Auth App (with Role-Based Access Control)

This is a secure and modern MERN (MongoDB, Express, React, Node.js) full-stack authentication app featuring:

-  JWT Authentication using HttpOnly Cookies
-  Role-Based Access Control (`admin`, `user`)
-  Password Reset via Email (Nodemailer)
-  Google OAuth Integration
-  RESTful API Architecture
-  Input Validation
-  Rate Limiting for Auth Endpoints

---

##  Tech Stack

**Frontend**:
- React
- React Router DOM
- Axios
- Context API

**Backend**:
- Node.js
- Express.js
- MongoDB with Mongoose
- JSON Web Tokens (JWT)
- Nodemailer

---

##  Project Structure

```bash
mern-auth-app/
├── backend/
│   ├── controllers/
│   ├── middleware/
│   ├── models/
│   ├── routes/
│   ├── utils/
│   ├── config/
│   └── server.js
└── frontend/
    ├── components/
    ├── hooks/
    ├── pages/
    ├── context/
    ├── utils/
    └── App.jsx
