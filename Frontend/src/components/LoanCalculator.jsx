import React, { useState } from 'react'
import { useLocation } from 'react-router-dom'
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { loanData } from '@/data/selectBoxLoans'

const LoanCalculator = () => {

  const [selectedCategory , setSelectedCategory] = useState(null) 
  const [loanCategory , setLoanCategory] = useState(loanData)
  const [loanSubCategory , setLoanSubCategory] = useState([]) 

  const location = useLocation()

  const pathName = location.pathname
  console.log(pathName)

  return (
    <div className={`${pathName.includes("loan-calculator") ? "min-h-[calc(100vh-88px)]" : ""}`} >
      <div className='max-w-7xl m-auto px-6 pb-16' >
        {/* Main Heading */}
        <h1 className="text-3xl sm:text-4xl font-bold text-center text-gray-800 mb-10">
          Loan Calculator
        </h1>

        <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-4 gap-10' >

          <Select onValueChange={value => setSelectedCategory(value)} >
            <SelectTrigger className= "w-auto" >
              <SelectValue placeholder="Select Loan Category" />
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                <SelectLabel>Loan Categories</SelectLabel>
                
                {

                  Object.keys(loanCategory).map(category => <SelectItem value={category} > {category}
                    
                    {console.log(selectedCategory)}
                   </SelectItem>) 



                
                }
                  
                
              </SelectGroup>
            </SelectContent>
          </Select>

          <Select disabled = {!selectedCategory} >
            <SelectTrigger className="w-auto">
              <SelectValue placeholder="Select Loan Sub Category" />
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                <SelectLabel>Loan Sub Categories</SelectLabel>
                
                {
                  selectedCategory && 
                  loanCategory[selectedCategory].map((subCategory , index) =>  <SelectItem key={index} value = {subCategory} >
                      { subCategory }
                    </SelectItem>
                   )
                   
                  
                }
                

              </SelectGroup>
            </SelectContent>
          </Select>


        </div>



      </div>
    </div>
  )
}

export default LoanCalculator
