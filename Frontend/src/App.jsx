import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Header from "./components/Header";
import LoanCardsContainer from "./components/LoanCardsContainer";
import Footer from "./components/Footer";
import ApplyForLoan from "./components/ApplyForLoan";
import LoanCalculator from "./components/LoanCalculator";
import { ToastContainer } from "react-toastify";
import HomePage from "./components/HomePage";
import ChangePassword from "./components/ChangePassword";
import UserLogin from "./components/user/UserLogin";
import UserProfile from "./components/UserProfile";

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
