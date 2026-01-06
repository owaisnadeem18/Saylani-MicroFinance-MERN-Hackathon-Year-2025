import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import HomePage from "./components/HomePage";
import LoanCardsContainer from "./components/loan/LoanCardsContainer";
import ApplyForLoan from "./components/loan/ApplyForLoan";
import LoanCalculator from "./components/loan/LoanCalculator";
import ChangePassword from "./components/ChangePassword";
import UserLogin from "./components/user/UserLogin";
import UserProfile from "./components/user/UserProfile";
import LoanGuarantor from "./components/loan-guarantors/LoanGuarantor";
import UserLayout from "./layouts/UserLayout";
import AdminLayout from "./layouts/AdminLayout";
import AdminDashboard from "./components/admin/AdminDashboard";
import AdminLoans from "./components/admin/AdminLoans";

function App() {

  return (
    <Router>
      <ToastContainer
        position="bottom-right"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />

      <Routes>

        {/* User Routes: */}
        <Route element={<UserLayout />} >

          <Route path="/" element={<HomePage />} />
          <Route path="/loan-categories" element={<LoanCardsContainer />} />
          <Route path="/apply-for-loan" element={<ApplyForLoan />} />
          <Route path="/loan-calculator" element={<LoanCalculator />} />
          <Route path="/user/:id/change-password" element={<ChangePassword />} />
          <Route path="/user/login" element={<UserLogin />} />
          <Route path="/profile/user/:id" element={<UserProfile />} />
          <Route path="/loan/:id/guarantors" element={<LoanGuarantor />} />

        </Route>

        {/* Admin Routes: */}
        <Route path="/admin" element = {<AdminLayout/>} >
          <Route path="dashboard" element = {<AdminDashboard/>} />
          <Route path="loans" element = {<AdminLoans/>} />
        </Route>                  

      </Routes>

    </Router>
  );
}

export default App;
