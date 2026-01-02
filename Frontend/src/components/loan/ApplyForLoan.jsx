import React from 'react'
import RegisterUserPopup from '../user/RegisterUserPopup' 
import { useSelector } from 'react-redux'
import ApplyForLoanForm from './ApplyForLoanForm' 

const ApplyForLoan = () => {

  const isUser = useSelector(store => store?.auth?.user)

  return (

    <div className='bg-gray-50' >
      <div className= {`min-h-[calc(100dvh-88px)] max-w-7xl m-auto px-6 ${isUser ? "py-0" : "py-16" }  flex flex-col items-center`} >

        {
          !isUser ?
          <>
        <h3 className="text-lg sm:text-xl lg:text-2xl font-bold text-center text-gray-800 mb-5">
          Register Yourself By Applying Proceed Button
        </h3>
                                      
          <RegisterUserPopup/>
          </>
        
        : <ApplyForLoanForm/>    
        
      }
            
      </div>
    </div>
  )
}

export default ApplyForLoan