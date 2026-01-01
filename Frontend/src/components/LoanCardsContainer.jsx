import { loanCategories } from '@/data/loanCategories'
import React from 'react'
import LoanCard from './LoanCard'
import { useLocation } from 'react-router-dom'

const LoanCardsContainer = () => {

  let location = useLocation()

  let pathName = location.pathname

  return (
    <div className={` flex items-center justify-center flex-col ${pathName.includes("loan-categories") ? "min-h-[calc(100dvh-88px)]" : ""}`} >

            <h1 className="text-3xl sm:text-4xl font-bold text-center text-gray-800 mb-10">
        Explore Our Loan Categories
      </h1>


      <div className={`container max-w-7xl px-6 card-container grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 `}>

        {
          loanCategories.map((category) => <LoanCard key={category.id} category={category.category} subcategories={category.subcategories} description={category.description} maxLoan={category.maxLoan} loanPeriod={category.loanPeriod} />)
        }

      </div>

    </div>

  )
}

export default LoanCardsContainer
