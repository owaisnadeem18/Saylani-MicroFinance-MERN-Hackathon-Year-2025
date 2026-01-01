import { userApplyLoanForm } from '@/utils/schemas/loan/UserApplyLoanForm'
import { zodResolver } from '@hookform/resolvers/zod'
import React, { useState } from 'react'
import { Controller, useForm } from 'react-hook-form'
import { Label } from '../ui/label'
import { Input } from '../ui/input' 
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../ui/select" 
import { ApplyLoanFormCategories } from '@/data/loanApplyFormCategories' 
import { Button } from '../ui/button' 
import { toast } from 'react-toastify'
import useApplyLoan from '@/hooks/loan/useApplyLoan'

const LoanApplicationForm = () => {

    // call the custom hook: 

    const {loading , LoanFormHandler} = useApplyLoan()

    const [selectedCategory, setSelectedCategory] = useState(null)

    // react hook form setup: 

    const {
        register,
        handleSubmit,
        reset,
        control,
        setValue,
        formState: { errors }
    } = useForm({
        resolver: zodResolver(userApplyLoanForm)
    })

    const onSubmit = async (data) => {

        alert("Submitted")

        try {
            const apiResponse = await LoanFormHandler(data)

            if (apiResponse?.success) {
                reset()
                console.log(data)
            }


        }

        catch (err) {
            console.log(err)
            toast.error(err?.resp)
        }

        
    }

    return (

        <form className='grid grid-cols-1 md:grid-cols-2 gap-6 bg-white p-8 shadow-md rounded-lg w-full md:w-[70%] ' onSubmit={handleSubmit(onSubmit)} >

            <div className='flex gap-2 flex-col' >
                <Label htmlFor="LoanCategory" >  Loan Category  </Label>

                <Controller
                    name="category" // make sure this matches your schema
                    control={control}
                    defaultValue=""
                    render={({ field }) => (
                        <Select {...field} onValueChange={(val) => {
                            field.onChange(val)
                            setSelectedCategory(val)


                            setValue("subcategory", "")

                            setValue("loanPeriod", ApplyLoanFormCategories.find((loan) => loan.name == val)?.maxPeriod)

                        }} >
                            <SelectTrigger>
                                <SelectValue placeholder="Select Loan Category" />
                            </SelectTrigger>
                            <SelectContent>
                                {ApplyLoanFormCategories.map((loan) => <SelectItem key={loan?.id} value={loan?.name} > {loan?.name} </SelectItem>)}
                            </SelectContent>
                        </Select>
                    )}
                />

                {errors.category && (
                    <p className="text-red-500 text-sm">{errors.category.message}</p>
                )}

            </div>

            <div className='flex gap-2 flex-col' >
                <Label htmlFor="LoanSubcategory" > Select Loan Subcategory </Label>

                <Controller
                    name='subcategory'
                    control={control}
                    defaultValue=""
                    render={({ field }) =>
                        <Select {...field} onValueChange={field.onChange} disabled={!selectedCategory} >
                            <SelectTrigger>
                                <SelectValue placeholder="Select Loan Subcategory" />
                            </SelectTrigger>

                            <SelectContent>
                                {selectedCategory && ApplyLoanFormCategories.find((loan) => loan.name == selectedCategory)?.subCategories.map(subCategory =>
                                    <SelectItem value={subCategory} key={subCategory} name={subCategory} >
                                        {subCategory}

                                    </SelectItem>
                                )

                                }
                            </SelectContent>

                        </Select>
                    }

                />

                
                {errors.subcategory && (
                    <p className="text-red-500 text-sm">{errors.subcategory.message}</p>
                )}

            </div>

            <div className='flex gap-2 flex-col' >
                <Label htmlFor="loanAmount" > Loan Amount </Label>
                <Input type = "number" placeholder="Please Enter Loan Amount" {...register("loanAmount") } />

                    
                {
                    errors?.loanAmount && (
                    <p className="text-red-500 text-sm">{errors.loanAmount.message}</p>
                )
                
                }

            </div>

            <div className='flex gap-2 flex-col' >
                <Label htmlFor="loanPeriod" > Loan Period </Label>
                <Input 
                    placeholder="Loan Period"
                    {...register("loanPeriod")}
                    readOnly
                />


            </div>

            <div className='md:col-span-2 flex justify-center' >

                <Button type="submit" className="w-full md:w-1/3 cursor-pointer" >
                    {
                        loading ? "Applying..." : "Apply"
                    } 
                </Button>
            </div>

        </form>

    )
}

export default LoanApplicationForm
