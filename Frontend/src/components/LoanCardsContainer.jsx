import { loanCategories } from '@/data/loanCategories'
import React from 'react'
import LoanCard from './LoanCard'
import { useLocation } from 'react-router-dom'

const LoanCardsContainer = () => {
    
    let location = useLocation()

    let pathName = location.pathname

    console.log(pathName)
  
    return (
        <div className={`${pathName.includes("loan-categories") ? "min-h-[calc(100vh-88px)] flex items-center justify-center" : "flex items-center justify-center pb-16" }`} >

    
            <div className={`container max-w-7xl px-6 card-container grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 `}>

              {
                  loanCategories.map((category) => <LoanCard key={category.id} category={category.category} subcategories={category.subcategories} description={category.description} maxLoan={category.maxLoan} loanPeriod={category.loanPeriod} />)
                }

            </div>
        </div>

  )
}

export default LoanCardsContainer
