import React from 'react'
import RegisterUserPopup from './RegisterUserPopup'

const ApplyForLoan = () => {
  return (
    <div className='min-h-[calc(100vh-88px)] max-w-7xl m-auto px-6 py-16 flex flex-col items-center'>

      <h3 className="text-lg sm:text-xl lg:text-2xl font-bold text-center text-gray-800 mb-5">
        Register Yourself By Applying Proceed Button
      </h3>
      
      <RegisterUserPopup/>

    </div>
  )
}

export default ApplyForLoan
