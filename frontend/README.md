# React + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react) uses [Oxc](https://oxc.rs)
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react-swc) uses [SWC](https://swc.rs/)

## React Compiler

The React Compiler is not enabled on this template because of its impact on dev & build performances. To add it, see [this documentation](https://react.dev/learn/react-compiler/installation).

## Expanding the ESLint configu# 🚀 ResumeX AI

An AI-powered Resume Analyzer built using the MERN Stack that helps users upload resumes, receive ATS scores, analyze strengths and weaknesses, and prepare for interviews.

---

## 📌 Features

- 🔐 User Authentication (Register/Login)
- 👤 User Profile Management
- 📄 Upload Resume (PDF/DOCX)
- ☁️ Cloudinary File Storage
- 🤖 AI Resume Analysis
- 📊 ATS Score Calculation
- ✅ Strengths Detection
- ❌ Weaknesses Detection
- 🔑 Missing Keywords Analysis
- 💡 AI Suggestions
- 📥 Download AI Analysis Report (PDF)
- 📂 Resume Management
- 🎤 AI Interview Preparation
- 📈 Dashboard with Resume Statistics
- 🌐 Fully Deployed on Render

---

## 🛠 Tech Stack

### Frontend
- React.js
- Vite
- Tailwind CSS
- React Router
- Axios
- jsPDF

### Backend
- Node.js
- Express.js
- MongoDB Atlas
- Mongoose
- JWT Authentication
- Multer
- Cloudinary
- Google Gemini AI

---

## 📂 Project Structure

```
ResumeX-AI
│
├── frontend
│   ├── src
│   ├── public
│   └── package.json
│
├── backend
│   ├── controllers
│   ├── routes
│   ├── models
│   ├── middleware
│   ├── config
│   └── server.js
│
└── README.md
```

---

## 🚀 Installation

### Clone Repository

```bash
git clone https://github.com/nihal4678-hash/resumex-AI.git
```

### Install Backend

```bash
cd backend
npm install
```

### Install Frontend

```bash
cd ../frontend
npm install
```

---

## Environment Variables

### Backend (.env)

```env
PORT=5000

MONGO_URI=your_mongodb_connection

JWT_SECRET=your_secret

GOOGLE_API_KEY=your_gemini_api_key

CLOUDINARY_CLOUD_NAME=your_cloud_name

CLOUDINARY_API_KEY=your_api_key

CLOUDINARY_API_SECRET=your_api_secret

CLIENT_URL=http://localhost:5173
```

---

## Run Backend

```bash
cd backend
npm run dev
```

---

## Run Frontend

```bash
cd frontend
npm run dev
```

---

## Deployment

### Backend

Render

### Frontend

Render

### Database

MongoDB Atlas

### File Storage

Cloudinary

---

## Screenshots

### Home Page

(Add Screenshot)

### Dashboard

(Add Screenshot)

### Resume Upload

(Add Screenshot)

### AI Resume Analysis

(Add Screenshot)

### Interview Module

(Add Screenshot)

---

## Future Enhancements

- Resume Templates
- Job Description Matching
- AI Mock Interviews
- Email Verification
- Forgot Password
- Dark Mode
- Resume Version History

---

## Author

**Nihal**

GitHub:
https://github.com/nihal4678-hash

---

## License

This project is licensed under the MIT License.ration

If you are developing a production application, we recommend using TypeScript with type-aware lint rules enabled. Check out the [TS template](https://github.com/vitejs/vite/tree/main/packages/create-vite/template-react-ts) for information on how to integrate TypeScript and [`typescript-eslint`](https://typescript-eslint.io) in your project.
