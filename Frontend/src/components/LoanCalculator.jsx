
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
import { Input } from './ui/input'
import { Button } from './ui/button'
import { calculateLoan } from '@/utils/handlers/calculateLoan'
import numeral from 'numeral'

const LoanCalculator = () => {

  const [selectedCategory, setSelectedCategory] = useState("")
  const [loanCategory] = useState(loanData)
  const [loading, setLoading] = useState(false)

  console.log("Loan Category is => ", loanCategory)

  const [selectedSubCategory, setSelectedSubCategory] = useState("")

  // states for initial loan deposit and loan:

  const [initialDeposit, setInitialDeposit] = useState("")

  const [loanPeriod, setLoanPeriod] = useState("")

  // Loan Installment amount per month is => 
  const [installmentAmount, setInstallmentAmount] = useState("")

  const location = useLocation()

  const pathName = location.pathname
  console.log(pathName)

  return (
    <div className={`${pathName.includes("loan-calculator") ? "min-h-[calc(100dvh-88px)] pt-12" : ""}`} >
      <div className='max-w-7xl m-auto px-6 pb-16' >
        {/* Main Heading */}
        <h1 className="text-3xl sm:text-4xl font-bold text-center text-gray-800 mb-10">
          Loan Calculator
        </h1>

        <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-10' >

          <Select value={selectedCategory} onValueChange={value => {
            console.log("Value is -> ", value)
            setSelectedCategory(value)
            setLoanPeriod(loanCategory[value].loanPeriod)
            setSelectedSubCategory("");
          }} >
            <SelectTrigger className="w-auto" >
              <SelectValue placeholder="Select Loan Category" />
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                <SelectLabel>Loan Categories</SelectLabel>

                {

                  Object.keys(loanCategory).map((category, index) => <SelectItem key={index} value={category} > {category} </SelectItem>)

                }

              </SelectGroup>
            </SelectContent>
          </Select>

          <Select value={selectedSubCategory} onValueChange={(value) => setSelectedSubCategory(value)} disabled={!selectedCategory} >
            <SelectTrigger className="w-auto">
              <SelectValue placeholder="Select Loan Sub Category" />
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                <SelectLabel>Loan Sub Categories</SelectLabel>

                {
                  selectedCategory &&

                  loanCategory[selectedCategory].subcategories.map((subCategory, index) => <SelectItem key={index} value={subCategory} >
                    {subCategory}
                  </SelectItem>
                  )


                }


              </SelectGroup>
            </SelectContent>
          </Select>


          <Input onChange={(e) => setInitialDeposit(Number(e.target.value))} type="number" placeholder="Enter Initial Deposit" />

          <Input value={loanPeriod} placeholder="loan period (in Years)" />

          <div onClick={() => calculateLoan(loanPeriod, initialDeposit, setInstallmentAmount, setLoading)} >


            <Button className="w-full sm:w-auto flex items-center justify-center gap-2">
              {loading && (
                <svg
                  className="animate-spin h-5 w-5 text-white"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                >
                  <circle
                    className="opacity-25"
                    cx="12"
                    cy="12"
                    r="10"
                    stroke="currentColor"
                    strokeWidth="4"
                  ></circle>
                  <path
                    className="opacity-75"
                    fill="currentColor"
                    d="M4 12a8 8 0 018-8v8H4z"
                  ></path>
                </svg>
              )}
              {loading ? "Calculating..." : "Calculate"}
            </Button>




          </div>

          






        </div>

              {installmentAmount && (
             <div className="mt-12 flex flex-col gap-3 p-6 border rounded-xl shadow-sm bg-white max-w-md w-full mx-auto">
              <h2 className="text-xl font-semibold mb-4 text-gray-800 text-center">
                Loan Summary
              </h2>

              <div className="flex justify-between py-2 border-b gap-4">
                <span className="font-medium text-gray-600">Loan Period:</span>
                <span className="font-bold text-gray-800">
                  {loanCategory[selectedCategory].loanPeriod} Years
                </span>
              </div>

              <div className="flex justify-between py-2 border-b gap-4">
                <span className="font-medium text-gray-600">Maximum Loan Amount:</span>
                <span className="font-bold">
                  {/* PKR {numeral(loanCategory[selectedCategory].maxloan).format("0,0")} */}
                  PKR {numeral(loanCategory[selectedCategory].maxLoan).format("0,0")}
                </span>
              </div>

              <div className="flex justify-between py-2 border-b gap-4">
                <span className="font-medium text-gray-600">Initial Deposit:</span>
                <span className="font-bold">
                  PKR {numeral(initialDeposit).format("0,0")}
                </span>
              </div>

              <div className="flex justify-between py-2 gap-4">
                <span className="font-medium text-gray-600">Monthly Insallment:</span>
                <span className="font-bold">
                  PKR {numeral(installmentAmount).format("0,0")}
                </span>
              </div>

              <p className="text-sm text-gray-500 text-center">
                This is an estimated calculation based on the selected loan period.
              </p>
            <Button className = "cursor-pointer" onClick = { () => setInstallmentAmount("") } >
                Reset
            </Button>
            </div>
)}


      </div>
    </div>
  )
}

export default LoanCalculator

