export const loanData = {
  
  // 1. Wedding Loans
  "Wedding": {
    subcategories: ["Valima", "Furniture", "Valima Food", "Jahez"],
    maxLoan: 500000, // 5 lac
    loanPeriod: 3 // years
  },

  // 2. Home Construction Loans
  "Home Construction": {
    subcategories: ["Structure", "Finishing"],
    maxLoan: 1000000, // 10 lac
    loanPeriod: 5 // years
  },

  // 3. Business Startup Loans
  "Business Startup": {
    subcategories: ["Buy Stall", "Advance Rent for Shop", "Shop Assets", "Shop Machinery"],
    maxLoan: 1000000, // 10 lac
    loanPeriod: 5 // years
  },

  // 4. Education Loans 
  "Education": {
    subcategories: ["University Fees", "Child Fees Loan"],
    maxLoan: "variable", // Based on requirement
    loanPeriod: 4 // years
  }
};
