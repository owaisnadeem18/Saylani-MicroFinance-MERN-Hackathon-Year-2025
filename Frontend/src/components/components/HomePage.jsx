import React from 'react'
import HeroSection from './HeroSection'
import LoanCardsContainer from './loan/LoanCardsContainer'
import LoanCalculator from './loan/LoanCalculator' 

const HomePage = () => {
    return (
        <>
            <HeroSection />
            <LoanCardsContainer />
            <LoanCalculator />
        </>
    )
}

export default HomePage
