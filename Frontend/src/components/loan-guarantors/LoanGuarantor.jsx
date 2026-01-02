import React from 'react'
import LoanGuarantorsBanner from './LoanGuarantorsBanner'
import GuarantorsForm from './GuarantorsForm'

const LoanGuarantor = () => {
  return (
    <div className='bg-gray-50 min-h-[calc(100vh-88px)]' >
        <div className='container mx-auto max-w-7xl p-12 flex flex-col gap-12'  >
            <LoanGuarantorsBanner/>
            <GuarantorsForm/>
        </div>
    </div>
  )
}

export default LoanGuarantor
