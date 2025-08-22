# Saylani Microfinance App

A **full-stack MERN (MongoDB, Express.js, React.js, Node.js) application** developed during a 12-hour hackathon. The app provides a **digital solution for Saylani Welfare’s Qarze Hasana program**, allowing users to apply for various microfinance loans efficiently while enabling admins to manage applications and appointments.

---

## 🏆 Hackathon Overview
- **Duration:** 12 hours  
- **Participants:** Students who completed a 13-month MERN course  
- **Objective:** Build a functional microfinance application for Saylani Welfare  
- **Outcome:** A fully functional app with user and admin workflows, loan calculator, and appointment scheduling

---

## 💰 Loan Categories

| Category                | Subcategories                                    | Max Loan       | Loan Period |
|-------------------------|-------------------------------------------------|----------------|------------|
| **Wedding Loans**       | Valima, Furniture, Valima Food, Jahez          | PKR 5 Lakh     | 3 years    |
| **Home Construction**   | Structure, Finishing, Loan                      | PKR 10 Lakh    | 5 years    |
| **Business Startup**    | Buy Stall, Advance Rent, Shop Assets, Machinery | PKR 10 Lakh    | 5 years    |
| **Education Loans**     | University Fees, Child Fees Loan                | Based on need  | 4 years    |

---

## 🧭 User Journey

### Landing Page
- Displays loan categories and subcategories  
- Loan calculator with:
  - Category and subcategory selection
  - Initial deposit input
  - Loan period selection
  - Estimated loan breakdown  

### Application Process
1. **Proceed Action**
   - Users click "Proceed" → popup form:
     - CNIC, Email, Name  
2. **Account Creation**
   - Email sent with password  
   - User logs in and generates a new password  
3. **Loan Request Submission**
   - Provide guarantor details (2 persons)  
   - Optional documents: Statement, salary sheet  
   - Personal info: Address, Phone number  
4. **Slip Generation**
   - System generates:
     - Token number
     - QR code
     - Appointment details (date, time, office)  
   - Users can download the slip  

---

## 🛠 Admin Panel

### Features
- **Application Management:** View, filter (City/Country), assign token numbers  
- **Loan Details:** See requested loan info and guarantor details  
- **Appointment Scheduling:** Automatic scheduling based on available slots  

---

## 💻 Development Structure

### Frontend
- **Technologies:** React.js  
- **Pages:**
  - Landing Page
  - Calculator Page
  - User Registration/Login
  - Loan Request Form
  - User & Admin Dashboards

### Backend
- **Technologies:** Node.js, Express.js  
- **Database:** MongoDB  
- **Features:**
  - User Authentication
  - Loan Request Handling
  - Guarantor Information Storage
  - Appointment Scheduling  

### API Endpoints
**User Endpoints:**
- POST `/register` → Register user  
- POST `/loan-request` → Submit loan request  
- POST `/guarantor` → Add guarantor info  
- GET `/loan-details` → Fetch loan details  
- GET `/generate-slip` → Generate QR code & appointment  

**Admin Endpoints:**
- GET `/applications` → View all applications  
- PUT `/update-application` → Update status  
- POST `/assign-token` → Add token numbers  
- GET `/filter-applications` → Filter by city/country  

---

## ⏱ Hackathon Workflow

| Hours       | Tasks                                                                 |
|------------|----------------------------------------------------------------------|
| 1-3        | Project setup, basic frontend/backend integration, landing page & calculator |
| 4-6        | User registration/login, loan request form                             |
| 7-9        | QR code generation, slip download, admin panel features               |
| 10-12      | Full app testing, deployment, presentation preparation                |

---

## ✅ Expected Deliverables
- Fully functional microfinance app  
- User-friendly landing page with loan calculator  
- Complete user journey for loan requests  
- Admin panel for application management  
- Deployed app ready for demonstration  

---

## 📜 Hackathon Rules
- Teams: 4-5 members  
- All code must be written during hackathon  
- Pre-built templates/libraries must be disclosed  
- Judging criteria:
  - Functionality
  - User Experience (UX)
  - Code Quality
  - Presentation  

---

## 🎯 Conclusion
This project aims to **simplify the loan application process for users** while ensuring **efficient application management for Saylani Welfare**. It is a practical demonstration of **MERN stack expertise** applied to a real-world microfinance solution.

---

## 🔗 Deployment
- The app can be deployed on **Vercel, AWS, or Heroku**.  

---

