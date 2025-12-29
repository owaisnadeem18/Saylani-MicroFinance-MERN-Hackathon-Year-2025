import React from 'react'
import { saylaniLogo } from '@/assets'


const LoanFormBanner = () => {
    return (
        <section className="py-4 md:py-8">
            <div className="max-w-4xl mx-auto text-center">


                <div className='flex flex-col gap-2 justify-center' >

                    {/* Logo */}
                    <img
                        src={saylaniLogo}
                        alt="Saylani"
                        className="mx-auto w-32 md:w-40" // Adjust width for responsiveness
                    />
                    {/* Heading */}
                    <h1 className="text-3xl sm:text-4xl font-bold text-center text-gray-800 ">
                        Loan Application Form
                    </h1>
                    {/* Subtext */}
                    <p className="text-gray-500 text-sm md:text-base">
                        Services - Microfinance - Qarze Hasana Program
                    </p>
                </div>
            </div>
        </section>
    )
}

export default LoanFormBanner
