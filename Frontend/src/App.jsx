import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Header from "./components/Header";
import HeroSection from "./components/HeroSection";
import LoanCard from "./components/LoanCard";
import { loanCategories } from "./data/loanCategories";

function App() {
  const isLoggedIn = false;

  return (
    <Router>
      {/* Header MUST be inside Router */}
      <Header isLoggedIn={isLoggedIn} />

    <Routes>
        <Route path="/" element={ 
            <>
              <HeroSection/>

                  <div className="container max-w-7xl m-auto px-6 card-container grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">


              {
                loanCategories.map((category) => <LoanCard key={category.id} category={category.category} subcategories={category.subcategories} description={category.description} maxLoan = {category.maxLoan} loanPeriod = {category.loanPeriod} /> )
              }

              </div>

            </>

         } />
        {/* <Route path="/calculator" element={<Calculator />} /> */}
    </Routes>


    </Router>
  );
}

export default App;
