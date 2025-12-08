import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Header from "./components/Header";
import HeroSection from "./components/HeroSection";
import LoanCardsContainer from "./components/LoanCardsContainer";
import Footer from "./components/Footer";
import ApplyForLoan from "./components/ApplyForLoan";

function App() {
  const isLoggedIn = false;

  return (
    <Router>
      {/* Header MUST be inside Router */}
      <Header isLoggedIn={isLoggedIn} />

      <Routes>

        <Route path="/" element={
          <>
            {/* Home Page components */}
            <HeroSection />
            <LoanCardsContainer/>
          </>

        } />
        

        <Route path="/loan-categories" element = {<LoanCardsContainer/>} />
        <Route path="/apply-for-loan" element = {<ApplyForLoan/>} />

      </Routes>

<Footer/>


    </Router>
  );
}

export default App;
