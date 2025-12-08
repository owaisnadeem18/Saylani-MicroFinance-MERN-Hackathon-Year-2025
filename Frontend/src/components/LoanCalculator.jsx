import React from 'react'
import { useLocation } from 'react-router-dom'

const LoanCalculator = () => {

  const location = useLocation()

  const pathName = location.pathname
  console.log(pathName)

  return (
    <div className={`${pathName.includes("loan-calculator") ? "min-h-[calc(100vh-88px)]" : "" }  flex justify-center items-center`} >
      <div className='max-w-7xl px-6 pb-16' >
          Lorem ipsum dolor sit amet consectetur, adipisicing elit. Repudiandae nostrum deleniti corporis aspernatur, delectus illo perspiciatis, at aperiam hic reiciendis ratione sint. Cupiditate, amet accusantium saepe doloribus est quasi labore!
      </div>
    </div>
  )
}

export default LoanCalculator
