# 🌙 Saylani Microfinance & Qarze Hasana Loan System  
### ⚡ Full-Stack MERN Application — Built in 12 Hours Hackathon

---

## 📖 Overview
Saylani Microfinance App is a digital solution developed for **Saylani Welfare International Trust** that enables people to apply for **Qarze Hasana (interest-free loans)** through an online and automated system.  
It eliminates paperwork, enables instant verification, guarantor approval & admin appointment scheduling — fully digital, smooth & scalable.

---

## 🚀 Tech Stack

| Layer | Technologies |
|------|--------------|
| Frontend | React.js, React Router, Context API, Axios |
| Backend | Node.js, Express.js |
| Database | MongoDB + Mongoose |
| Auth | JWT + bcrypt |
| Extras | QR Generation, Multer Uploads, Email System, Toast Alerts |

---

## 💰 Loan Categories

| Category | Sub-Types | Max Amount | Duration |
|---------|------------|-------------|----------|
| Wedding Loan | Valima, Furniture, Food, Jahez | PKR 5,00,000 | 3 Years |
| Home Construction | Structure, Finishing, Material | PKR 10,00,000 | 5 Years |
| Business Startup | Stall Setup, Rent, Machinery | PKR 10,00,000 | 5 Years |
| Education Loan | University/Child Fee Support | Need Based | 4 Years |

---

## 🧭 User Journey Flow

```
Landing Page → Loan Calculator → Register → Login
→ Apply for Loan → Add Two Guarantors → Upload Documents
→ Loan Request Submitted → System Generates Token + QR Slip
→ Auto Appointment Based on Slot Availability → Visiting Day
```

---

## 🧑‍💻 Features for Users

✔ Online Account Creation  
✔ Loan Application Form  
✔ 2 Guarantor Identity Submission  
✔ CNIC/Email Verification  
✔ Optional Document Uploads  
✔ QR Slip & Token Number Auto-Generated  
✔ Status Checking Anytime

---

## 🛠 Admin Panel Features

| Feature | Description |
|--------|-------------|
| View All Applications | Sorted & paginated record |
| Status Update | Approve / Reject loan file |
| Token Assignment | Automatic or manual |
| Appointment Scheduling | Date/time slot allocation |
| Filters | City & Loan category-wise filtering |
| View Guarantor Details | Verification & authenticity check |

---

## 📡 API Endpoints

### USER ROUTES
| Method | Endpoint | Description |
|---|---|---|
| POST | `/api/user/register` | Register applicant |
| POST | `/api/loan/apply` | Submit loan application |
| POST | `/api/guarantor` | Save two guarantor details |
| GET | `/api/user/slip/:id` | Get QR + appointment slip |
| GET | `/api/user/status/:id` | Track application status |

### ADMIN ROUTES
| Method | Endpoint | Description |
|---|---|---|
| GET | `/api/admin/loans` | All submitted loan applications |
| GET | `/api/admin/filter` | Filter city/category wise |
| PUT | `/api/admin/loans/:id/status` | Approve/Reject loan |
| POST | `/api/admin/assign-token` | Generate user token # |

---

## 🔥 Hackathon Timeline Breakdown (12 HOURS)

| Time Block | Work Completed |
|---|---|
| 1–2 hr | Project setup + MongoDB Connection + Routes base |
| 2–4 hr | User Auth + Token + Controllers Testing |
| 4–6 hr | Loan + Guarantor APIs + Document Schema |
| 6–8 hr | QR Slip Generation + Email Send |
| 8–10 hr | Admin Dashboard + Status Control |
| 10–12 hr | UI Polishing + Full Testing + Final Build |

---

## 📁 File/Folder Architecture

```
/root
│── backend
│   ├── controllers
│   ├── models
│   ├── routes
│   ├── config/db.js
│   └── server.js
│
└── frontend
    ├── components/
    ├── pages/
    ├── context/
    └── App.jsx
```

---

## 🔐 Security Highlights

| Feature | Purpose |
|---|---|
| JWT Auth | Secured login session |
| bcrypt | Password encryption |
| Mongo Validation | Prevents broken payloads |
| API-Level Access Control | Admin/user separation |

---

## 🛠 Installation

### Backend
```bash
cd backend
npm install
npm start
```

### Frontend
```bash
cd frontend
npm install
npm run dev
```

---

## 🎯 Outcome
| Result | Impact |
|--|--|
| Paperless loan approval | Saves manual time & queue handling |
| QR verification system | Fast processing at Saylani Center |
| Admin Workflow Optimization | 5x faster loan file review |
| Fully deployable MERN SaaS | Ready for real-life integration |

---

## 👨‍💻 Developed & Designed By:
**OWAIS NADEEM — MERN Stack Engineer**

