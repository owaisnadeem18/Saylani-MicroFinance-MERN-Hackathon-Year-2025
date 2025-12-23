import React from 'react'
import RegisterUserPopup from './RegisterUserPopup'
import { useSelector } from 'react-redux'
import { store } from '@/store'
import ApplyForLoanForm from './ApplyForLoanForm'

const ApplyForLoan = () => {

  const isUser = useSelector(store => store?.auth?.user)

  const userRegistration = useSelector(store => store?.auth?.user?.mustChangePassword)

  return (
    <div className='min-h-[calc(100dvh-88px)] max-w-7xl m-auto px-6 py-16 flex flex-col items-center'>

      <h3 className="text-lg sm:text-xl lg:text-2xl font-bold text-center text-gray-800 mb-5">
        Register Yourself By Applying Proceed Button
      </h3>

      {
        !isUser ? <RegisterUserPopup/> : <ApplyForLoanForm/>    
      }             
      
      
          
    </div>
  )
}

export default ApplyForLoan
