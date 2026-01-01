import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import Header from "./components/ui/shared/Header";
import HomePage from "./components/HomePage";
import LoanCardsContainer from "./components/loan/LoanCardsContainer";
import ApplyForLoan from "./components/loan/ApplyForLoan";
import LoanCalculator from "./components/loan/LoanCalculator";
import ChangePassword from "./components/ChangePassword";
import UserLogin from "./components/user/UserLogin";
import UserProfile from "./components/user/UserProfile";
import Footer from "./components/ui/shared/Footer";

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
      <Header />

      <Routes>

        <Route path="/" element={<HomePage/>} />
        <Route path="/loan-categories" element = {<LoanCardsContainer/>} />
        <Route path="/apply-for-loan" element = {<ApplyForLoan/>} />
        <Route path="/loan-calculator" element = {<LoanCalculator/>} />
        <Route path="/user/:id/change-password" element = {<ChangePassword/>} />
        <Route path="/user/login" element = {<UserLogin />} />
        <Route path="/profile/user/:id" element = {<UserProfile />} />

      </Routes>

<Footer/>


    </Router>
  );
}

export default App;
