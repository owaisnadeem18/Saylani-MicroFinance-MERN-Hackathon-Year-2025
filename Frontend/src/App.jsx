import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Header from "./components/Header";
import HeroSection from "./components/HeroSection";

function App() {
  const isLoggedIn = false;

  return (
    <Router>
      {/* Header MUST be inside Router */}
      <Header isLoggedIn={isLoggedIn} />

      {/* <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/dashboard" element={<Dashboard />} />
      </Routes> */}

      <HeroSection />

    </Router>
  );
}

export default App;
